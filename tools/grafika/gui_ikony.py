"""Ikony rozhraní, které nejsou z listu gui-prvky: myš se zvýrazněným tlačítkem (nápověda pod
popiskem při najetí), šlápoty pro východy, tlačítka nastavení a deníku v horní liště a kulatá
značka aktivního místa.

Spouští se z kořene projektu po gui_prvky.py (potřebuje hra/grafika/gui/tlacitko.png).
Ikony kurzorů (ruka, oko, bublina …) vedle toho rozřeže hra/nastroje/ikony_kurzoru.gd.
Potřebuje Pillow."""
import math
import pathlib

from PIL import Image, ImageDraw, ImageEnhance

CIL = pathlib.Path("hra/grafika/gui")
OBRYS = (74, 46, 20, 255)
REZ = (201, 116, 58, 255)
Z = 4  # kreslí se čtyřikrát větší a zmenší se (hladké hrany)


def mys(leve):
    im = Image.new("RGBA", (54 * Z, 54 * Z), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    x0, y0, x1, y1 = 13 * Z, 5 * Z, 41 * Z, 49 * Z
    d.rounded_rectangle((x0, y0, x1, y1), radius=13 * Z, fill=(255, 255, 255, 255),
                        outline=(0, 0, 0, 255), width=4 * Z)
    stred, pul = (x0 + x1) // 2, y0 + 19 * Z
    maska = Image.new("L", im.size, 0)
    md = ImageDraw.Draw(maska)
    md.rounded_rectangle((x0 + 4 * Z, y0 + 4 * Z, x1 - 4 * Z, y1 - 4 * Z), radius=9 * Z, fill=255)
    md.rectangle((stred, 0, im.width, im.height) if leve else (0, 0, stred, im.height), fill=0)
    md.rectangle((0, pul, im.width, im.height), fill=0)
    im.paste(Image.new("RGBA", im.size, REZ), (0, 0), maska)
    d = ImageDraw.Draw(im)
    d.line((x0, pul, x1, pul), fill=(0, 0, 0, 255), width=3 * Z)
    d.line((stred, y0, stred, pul), fill=(0, 0, 0, 255), width=3 * Z)
    return im.resize((54, 54), Image.LANCZOS)


def ozubene_kolo(velikost):
    im = Image.new("RGBA", (velikost * Z, velikost * Z), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    s = velikost * Z / 2
    r_ven, r_zub, r_dira, zubu = 17 * Z, 23 * Z, 7 * Z, 8
    body = []
    for i in range(zubu * 4):
        u = 2 * math.pi * i / (zubu * 4) + math.pi / 16
        r = r_zub if i % 4 in (0, 1) else r_ven
        body.append((s + r * math.cos(u), s + r * math.sin(u)))
    d.polygon(body, fill=OBRYS)
    d.ellipse((s - r_dira, s - r_dira, s + r_dira, s + r_dira), fill=(0, 0, 0, 0))
    return im.resize((velikost, velikost), Image.LANCZOS)


def _na_bile(kresli, velikost=54):
    """Ikona ve stylu kurzorů šablony: bílá výplň, černý obrys. `kresli(d, barva, tloustka)`
    nakreslí tvar jednou barvou; obrys vznikne nakreslením tvaru silněji pod výplň."""
    im = Image.new("RGBA", (velikost * Z, velikost * Z), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    kresli(d, (0, 0, 0, 255), 3 * Z)
    kresli(d, (255, 255, 255, 255), 0)
    return im.resize((velikost, velikost), Image.LANCZOS)


def _slapota(d, cx, cy, barva, o):
    # podrážka a pata boty, mírně natočené do směru chůze (vpravo nahoru)
    d.ellipse((cx - 6 * Z - o, cy - 10 * Z - o, cx + 6 * Z + o, cy + 5 * Z + o), fill=barva)
    d.ellipse((cx - 5 * Z - o, cy + 7 * Z - o, cx + 5 * Z + o, cy + 15 * Z + o), fill=barva)


def jit():
    """Dvě šlápoty: východ ze scény (schody, výtah, dveře)."""
    def kresli(d, barva, o):
        _slapota(d, 18 * Z, 32 * Z, barva, o)
        _slapota(d, 36 * Z, 19 * Z, barva, o)
    return _na_bile(kresli).rotate(-22, resample=Image.BICUBIC)


def kniha(barva=OBRYS, velikost=84):
    """Otevřená kniha: tlačítko deníku v horní liště."""
    im = Image.new("RGBA", (velikost * Z, velikost * Z), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    s = velikost * Z // 2
    for strana in (-1, 1):
        x0, x1 = s + strana * 3 * Z, s + strana * 25 * Z
        d.polygon([(x0, 26 * Z), (x1, 22 * Z), (x1, 58 * Z), (x0, 62 * Z)], outline=barva, width=4 * Z)
        for y in (33, 41, 49):
            d.line((s + strana * 8 * Z, (y + 1) * Z, s + strana * 20 * Z, (y - 1) * Z), fill=barva, width=3 * Z)
    return im.resize((velikost, velikost), Image.LANCZOS)


def tlacitko_s_ikonou(ikona, nazev, velikost=84):
    zaklad = Image.open(CIL / "tlacitko.png").convert("RGBA").resize((velikost, velikost), Image.LANCZOS)
    zaklad.alpha_composite(ikona)
    for pripona, jas in (("", 1.0), ("_najeti", 1.1), ("_stisk", 0.85)):
        alfa = zaklad.getchannel("A")
        im = ImageEnhance.Brightness(zaklad.convert("RGB")).enhance(jas).convert("RGBA")
        im.putalpha(alfa)
        im.save(CIL / f"{nazev}{pripona}.png")


if __name__ == "__main__":
    (CIL / "ikony").mkdir(exist_ok=True)
    mys(True).save(CIL / "ikony" / "mys_leva.png")
    mys(False).save(CIL / "ikony" / "mys_prava.png")
    jit().save(CIL / "ikony" / "jit.png")
    tlacitko_s_ikonou(ozubene_kolo(84), "tlacitko_nastaveni")
    tlacitko_s_ikonou(kniha(), "tlacitko_denik")
    # kulatý podklad značky aktivního místa (zvýraznění mezerníkem)
    znacka = Image.new("RGBA", (64 * Z, 64 * Z), (0, 0, 0, 0))
    ImageDraw.Draw(znacka).ellipse((3 * Z, 3 * Z, 61 * Z, 61 * Z), fill=(233, 181, 42, 235),
                                   outline=OBRYS, width=4 * Z)
    znacka.resize((64, 64), Image.LANCZOS).save(CIL / "ikony" / "znacka.png")
    print("ikony uloženy do", CIL)
