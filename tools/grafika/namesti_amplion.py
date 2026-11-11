"""Přidá na lampu na náměstí amplion městského rozhlasu (denní i večerní pozadí).

Použití: namesti_amplion.py <list amplionu.png> <den původní.png> <večer původní.png> <složka hry>

List je z gpt-image-2 na purpurovém pozadí (vzorek namesti-amplion). Amplion se vyřízne, zmenší,
nakloní podle sloupu lampy a vloží do obou pozadí; večerní verze se obarví podle toho, jak se
liší barva sloupu ve dne a večer. Potřebuje Pillow, numpy a scipy (viz vyrez.py)."""
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import numpy as np
from PIL import Image

from vyrez import vyrez

STRED = (1855, 300)     # kde je na sloupu objímka (pixely širokého denního pozadí)
STRED_VECER = (1877, 300)   # večerní pozadí je jiná kresba, sloup je o kus vedle
MERITKO = 0.2           # sloup v listu je široký asi 85 px, ve scéně 18 px
NAKLON = 10.5           # sloup je nakloněný, nahoře víc vlevo
SLOUP = (1822, 150, 1884, 450)   # výřez sloupu pro porovnání barev den / večer


def amplion(list_png):
    im = vyrez(Image.open(list_png))
    a = np.asarray(im).astype(float)
    h = a.shape[0]
    # sloupek nad a pod ampliony zkrátit a nechat do ztracena, aby navázal na sloup lampy
    od, do = int(h * 0.07), int(h * 0.80)
    r = np.ones(h)
    r[:od] = 0
    r[do:] = 0
    r[od:od + 60] = np.linspace(0, 1, 60)
    r[do - 60:do] = np.linspace(1, 0, 60)
    a[..., 3] *= r[:, None]
    # Lampa stojí u pravého okraje záběru 3:2, pravá trouba by byla za okrajem obrazovky.
    # Proto se pravá trouba zrcadlí kolem sloupku doleva (za levou troubu): obě míří do náměstí.
    w = a.shape[1]
    osa, pul = int(w * 0.482), int(w * 0.045)
    prava = a.copy()
    prava[:, :osa + pul] = 0
    zrcadlo = np.zeros_like(a)
    for x in range(osa + pul, w):
        cil = 2 * osa - x
        if 0 <= cil < w:
            zrcadlo[:, cil] = prava[:, x]
    leva = a.copy()
    leva[:, osa + pul:] = 0
    k = leva[..., 3:4] / 255.0
    a = leva * k + zrcadlo * (1 - k)
    a[..., 3] = np.maximum(leva[..., 3], zrcadlo[..., 3])
    im = Image.fromarray(a.clip(0, 255).astype(np.uint8), "RGBA")
    # střed objímky v listu
    stred = (int(im.width * 0.482), int(im.height * 0.44))
    im = im.rotate(NAKLON, resample=Image.BICUBIC, center=stred)
    w, hh = round(im.width * MERITKO), round(im.height * MERITKO)
    return im.resize((w, hh), Image.LANCZOS), (round(stred[0] * MERITKO), round(stred[1] * MERITKO))


def vloz(pozadi, kus, stred, odstin=(1, 1, 1), kam=STRED):
    k = np.asarray(kus).astype(float)
    k[..., :3] *= np.array(odstin)
    kus = Image.fromarray(k.clip(0, 255).astype(np.uint8), "RGBA")
    out = pozadi.convert("RGBA")
    out.alpha_composite(kus, (kam[0] - stred[0], kam[1] - stred[1]))
    return out.convert("RGB")


if __name__ == "__main__":
    if len(sys.argv) < 5:
        sys.exit(__doc__)
    kus, stred = amplion(sys.argv[1])
    den = Image.open(sys.argv[2]).convert("RGB")
    vecer = Image.open(sys.argv[3]).convert("RGB")
    cil = pathlib.Path(sys.argv[4])
    pomer = (np.asarray(vecer.crop(SLOUP)).reshape(-1, 3).mean(0)
             / np.asarray(den.crop(SLOUP)).reshape(-1, 3).mean(0))
    vloz(den, kus, stred).save(cil / "namesti_den_siroke.png")
    vloz(vecer, kus, stred, pomer, STRED_VECER).save(cil / "namesti_vecer_siroke.png")
    print(f"amplion {kus.size}, střed {stred}, večerní odstín {np.round(pomer, 2)}")
