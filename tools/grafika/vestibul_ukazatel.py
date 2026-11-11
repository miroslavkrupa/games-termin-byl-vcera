"""Stojací ukazatel k archivu ve vestibulu (D93): plechová cedule se šipkou dolů na sloupku
s patkou. Dřív visela cedule na vrátnici a rohem zasahovala do skla.
Použití: vestibul_ukazatel.py <cedule.png> <výstup.png>   (cedule je výřez z listu vestibul-kulisy)
Potřebuje Pillow."""
import sys

from PIL import Image, ImageDraw, ImageFilter

OBRYS = (58, 36, 18, 255)
KOV = (96, 104, 100, 255)
KOV_SVETLO = (128, 136, 130, 255)
REZ = (140, 88, 52, 255)
Z = 4


def ukazatel(cedule_png, vystup_png, meritko=0.8, sloupek=150):
    c = Image.open(cedule_png).convert("RGBA")
    c = c.resize((round(c.width * meritko), round(c.height * meritko)), Image.LANCZOS)
    w, h = c.width + 16, c.height + sloupek + 14
    im = Image.new("RGBA", (w * Z, h * Z), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    sx = w * Z // 2
    # stín patky na podlaze
    stin = Image.new("L", im.size, 0)
    ImageDraw.Draw(stin).ellipse((sx - 44 * Z, (h - 16) * Z, sx + 44 * Z, (h - 1) * Z), fill=110)
    im.paste(Image.new("RGBA", im.size, (40, 22, 8, 255)), (0, 0), stin.filter(ImageFilter.GaussianBlur(4 * Z)))
    d = ImageDraw.Draw(im)
    # sloupek: lehce křivý, s obrysem a světlým pruhem
    nahore, dole = (c.height - 14) * Z, (h - 12) * Z
    d.polygon([(sx - 6 * Z, nahore), (sx + 5 * Z, nahore), (sx + 7 * Z, dole), (sx - 5 * Z, dole)],
              fill=KOV, outline=OBRYS, width=2 * Z)
    d.line((sx - 2 * Z, nahore + 6 * Z, sx - 1 * Z, dole - 6 * Z), fill=KOV_SVETLO, width=2 * Z)
    d.ellipse((sx - 3 * Z, nahore + 60 * Z, sx + 4 * Z, nahore + 78 * Z), fill=REZ)
    # patka
    d.rounded_rectangle((sx - 30 * Z, dole - 4 * Z, sx + 30 * Z, dole + 8 * Z), radius=5 * Z,
                        fill=KOV, outline=OBRYS, width=2 * Z)
    d.line((sx - 22 * Z, dole, sx + 20 * Z, dole), fill=KOV_SVETLO, width=2 * Z)
    im = im.resize((w, h), Image.LANCZOS)
    im.alpha_composite(c, ((w - c.width) // 2, 0))
    im.save(vystup_png)
    print(f"{vystup_png}: {im.size}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    ukazatel(sys.argv[1], sys.argv[2])
