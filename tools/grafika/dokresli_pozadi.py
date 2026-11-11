"""Vloží do hotového pozadí jen tu část, kterou model dokreslil (schody, výtah).

Použití: dokresli_pozadi.py <původní.png> <upravený list 2224×1024> <výstup.png> <x_od> <x_do> [náhled.png]

Model dostal pozadí rozšířené na 2224 × 1024 (3 px opakovaného okraje na každé straně) se
zadáním „změň jen tuhle část“. Vrácený obrázek je ale celý lehce jiný (zrno, barvy), proto se
z něj bere jen oblast, která se opravdu změnila, a jen ve sloupcích x_od–x_do původního pozadí.
Zbytek pozadí zůstane na pixel stejný. Potřebuje Pillow, numpy a scipy."""
import sys

import numpy as np
from PIL import Image
from scipy import ndimage


def dokresli(puvodni_png, upraveny_png, vystup_png, x_od, x_do, nahled=None):
    a_im = Image.open(puvodni_png).convert("RGB")
    b_im = Image.open(upraveny_png).convert("RGB")
    if b_im.width != a_im.width:
        okraj = (b_im.width - a_im.width) // 2
        b_im = b_im.crop((okraj, 0, okraj + a_im.width, a_im.height))
    a = np.asarray(a_im).astype(float)
    b = np.asarray(b_im).astype(float)
    d = np.abs(ndimage.gaussian_filter(a, (6, 6, 0)) - ndimage.gaussian_filter(b, (6, 6, 0))).mean(-1)
    d[:, :x_od] = 0
    d[:, x_do:] = 0
    m = d > 14
    m = ndimage.binary_opening(m, iterations=4)
    m = ndimage.binary_dilation(m, iterations=22)
    m = ndimage.binary_fill_holes(m)
    # jen největší souvislá oblast: drobné rozdíly jinde (zrno, lesk) se neberou
    lab, n = ndimage.label(m)
    if n > 1:
        vel = ndimage.sum(m, lab, range(1, n + 1))
        m = lab == (int(np.argmax(vel)) + 1)
    m[:, :x_od] = False
    m[:, x_do:] = False
    mm = ndimage.gaussian_filter(m.astype(float), 7)[..., None]
    out = a * (1 - mm) + b * mm
    Image.fromarray(out.clip(0, 255).astype(np.uint8)).save(vystup_png)
    ys, xs = np.nonzero(m)
    print(f"{vystup_png}: změněno x {xs.min()}–{xs.max()}, y {ys.min()}–{ys.max()}, "
          f"{m.mean() * 100:.1f} % plochy")
    if nahled:
        n_im = Image.fromarray((out * (0.35 + 0.65 * mm)).clip(0, 255).astype(np.uint8))
        n_im.resize((n_im.width // 2, n_im.height // 2)).save(nahled)


if __name__ == "__main__":
    if len(sys.argv) < 6:
        sys.exit(__doc__)
    dokresli(sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4]), int(sys.argv[5]),
             sys.argv[6] if len(sys.argv) > 6 else None)
