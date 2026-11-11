"""Kocour Mourek v malířském stylu (D93): výřez z listu kocour-novy-styl do rámečku 315 × 420
a měkký stín pod ním, který ho usadí na dlažbu i na plot.
Spouští se z kořene projektu. Potřebuje Pillow, numpy a scipy (viz vyrez.py)."""
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from PIL import Image, ImageDraw, ImageFilter

from vyrez import vyrez

LIST = sorted(pathlib.Path("docs/styl/vzorky").glob("kocour-novy-styl_v*.png"))[-1]
CIL = pathlib.Path("hra/grafika/postavy/kocour_stoji/kocour_stoji.png")
RAM = (315, 420)

if __name__ == "__main__":
    k = vyrez(Image.open(LIST))
    k = k.crop(k.getbbox())
    z = min((RAM[0] - 8) / k.width, (RAM[1] - 10) / k.height)
    k = k.resize((round(k.width * z), round(k.height * z)), Image.LANCZOS)
    x, y = (RAM[0] - k.width) // 2, RAM[1] - 6 - k.height
    stin = Image.new("L", RAM, 0)
    ImageDraw.Draw(stin).ellipse((x + 10, RAM[1] - 28, x + k.width - 10, RAM[1] - 1), fill=150)
    stin = stin.filter(ImageFilter.GaussianBlur(5))
    out = Image.new("RGBA", RAM, (0, 0, 0, 0))
    out.paste(Image.new("RGBA", RAM, (45, 25, 10, 255)), (0, 0), stin)
    out.alpha_composite(k, (x, y))
    out.save(CIL)
    print(f"{CIL}: kocour {k.size} v rámečku {RAM}")
