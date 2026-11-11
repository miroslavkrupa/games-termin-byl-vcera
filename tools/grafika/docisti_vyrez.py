"""Dočistí výřez postavy, která byla nakreslená na bílém (neprůhledném) pozadí: odstraní zbytky
bílé mezi prameny vlasů a na obrysu a světlé šedé tahy stínu pod botami.

Použití: docisti_vyrez.py <vstup.png> <výstup.png> [podíl výšky, kde se hledá stín pod botami]

Pozadí = světlé málo syté pixely, které sousedí s průhlednou plochou (přímo nebo přes jiné takové
pixely). Bílé plochy uvnitř kresby (bělmo, lesky, papír) s průhlednou plochou nesousedí, zůstanou.
POZOR: nehodí se pro postavy, které mají na obrysu něco bílého nebo šedého (bílé tenisky, šedé
vlasy, cenovky, papíry): to by nástroj odstranil také. Po použití vždy porovnat s původním výřezem.
Potřebuje Pillow, numpy a scipy (viz vyrez.py)."""
import sys

import numpy as np
from PIL import Image
from scipy import ndimage


def docisti(img, stin_od=0.92):
    a = np.asarray(img.convert("RGBA")).astype(np.float32)
    rgb, al = a[..., :3], a[..., 3]
    mn, mx = rgb.min(-1), rgb.max(-1)
    syt = (mx - mn) / np.maximum(mx, 1)
    pruhl = al < 40
    # 1) bílá spojená s průhlednou plochou
    bila = (mn > 185) & (syt < 0.16) & ~pruhl
    lab, n = ndimage.label(bila | pruhl)
    dotyk = np.unique(lab[pruhl])
    pozadi = np.isin(lab, dotyk[dotyk > 0]) & bila
    # 2) stín pod botami: ve spodním pásu vše, co není pevná kresba (poloprůhledné tahy a světlé
    #    našedlé plochy), pokud to sousedí s průhlednou plochou; 1 px u pevné kresby zůstane
    #    jako vyhlazení hrany
    y = np.arange(a.shape[0])[:, None] >= a.shape[0] * stin_od
    nasedla = (syt < 0.32) & (mn > 70)
    pevna = (al >= 200) & ~nasedla
    kand = y & ~pruhl & ~pevna
    lab2, n2 = ndimage.label(kand | pruhl)
    dotyk2 = np.unique(lab2[pruhl])
    stin = np.isin(lab2, dotyk2[dotyk2 > 0]) & kand
    stin &= ~ndimage.binary_dilation(pevna, iterations=1)
    pozadi |= stin
    # 2b) drobné neutrálně bílé ostrůvky uzavřené ve vlasech (okolí je sytě barevné, ne pleť ani sklo)
    lab3, n3 = ndimage.label((mn > 200) & (syt < 0.06) & ~pruhl & ~pozadi)
    for i, sl in enumerate(ndimage.find_objects(lab3), 1):
        ostrov = lab3 == i
        if ostrov.sum() > 40:
            continue
        okoli = ndimage.binary_dilation(ostrov, iterations=2) & ~ostrov & ~pruhl
        if okoli.any() and syt[okoli].mean() > 0.5:
            pozadi |= ostrov
    al = np.where(pozadi, 0, al)
    # 2c) skoro průhledné zbytky daleko od kresby
    al = np.where((al < 40) & ~ndimage.binary_dilation(al >= 200, iterations=2), 0, al)
    # 3) lem: v pásu 2 px od průhledné plochy převést bílou složku na průhlednost
    pruhl = al < 40
    pas = ndimage.binary_dilation(pruhl, iterations=2) & ~pruhl
    belost = np.clip((mn - 150) / 90, 0, 1) * (syt < 0.3)
    al = np.where(pas, al * (1 - belost), al)
    rgb = rgb.copy()
    k = np.where(pas, belost, 0)[..., None]
    # barva bez bílé příměsi: c = (pixel - bílá * k) / (1 - k)
    rgb = np.where(k < 0.95, (rgb - 255 * k) / np.maximum(1 - k, 0.05), rgb)
    out = np.concatenate([rgb.clip(0, 255), al[..., None]], -1).astype(np.uint8)
    return Image.fromarray(out, "RGBA"), int(pozadi.sum())


if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    vysledek, n = docisti(Image.open(sys.argv[1]), float(sys.argv[3]) if len(sys.argv) > 3 else 0.92)
    vysledek.save(sys.argv[2])
    print(f"odstraněno {n} pixelů pozadí")
