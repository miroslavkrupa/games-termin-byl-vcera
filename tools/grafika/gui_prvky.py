"""Malované prvky rozhraní z listu gui-prvky (D89): vyřízne je z purpurového pozadí, zmenší
a uloží do hra/grafika/gui/. Hra je používá jako devítidílné textury (hra/game/obrazovky/styl.gd).
Spouští se z kořene projektu. Potřebuje Pillow, numpy a scipy (viz vyrez.py)."""
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import numpy as np
from PIL import Image

from vyrez import vyrez, zmensi

LIST = "docs/styl/vzorky/gui-prvky_v01.png"
CIL = pathlib.Path("hra/grafika/gui")
# název: (výřez v listu, měřítko)
PRVKY = {
    "okno": ((55, 55, 890, 635), 0.6),
    "listek": ((915, 120, 1490, 293), 0.5),
    "pole": ((915, 450, 1490, 620), 0.5),
    "stitek_rez": ((55, 690, 590, 943), 0.4),
    "stitek_petrolej": ((640, 690, 1178, 943), 0.4),
    "tlacitko": ((1253, 720, 1458, 923), 0.5),
}


def ztlum_rez(im):
    """Štítek vyšel sytě oranžový; plocha (ne nýty a obrys) se posune k rezavé ze stylové bible."""
    hsv = np.asarray(im.convert("RGB").convert("HSV")).astype(float)
    plocha = (hsv[..., 1] > 150) & (hsv[..., 2] > 150) & (hsv[..., 0] < 24)
    hsv[..., 1] = np.where(plocha, hsv[..., 1] * 0.80, hsv[..., 1])
    hsv[..., 0] = np.where(plocha, hsv[..., 0] + 4, hsv[..., 0])
    hsv[..., 2] = np.where(plocha, hsv[..., 2] * 0.93, hsv[..., 2])
    out = Image.fromarray(hsv.clip(0, 255).astype(np.uint8), "HSV").convert("RGB").convert("RGBA")
    out.putalpha(im.getchannel("A"))
    return out


if __name__ == "__main__":
    cele = vyrez(Image.open(LIST))
    CIL.mkdir(parents=True, exist_ok=True)
    for nazev, (vyrez_v_listu, meritko) in PRVKY.items():
        im = cele.crop(vyrez_v_listu)
        im = im.crop(im.getbbox())
        im = zmensi(im, round(im.height * meritko))
        if nazev == "stitek_rez":
            im = ztlum_rez(im)
        im.save(CIL / f"{nazev}.png")
        print(nazev, im.size)
