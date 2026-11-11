"""Překreslení animací Rudy do malířského stylu ostatních postav (D92).

Animace Rudy (chůze, stání, akce) jsou odladěné: počet fází, pózy i zarovnání. Nekreslí se proto
znovu, jen se přemalují. Postup:
1. `ruda_listy.py listy <složka předloh>` složí z dnešních fází ve hře listy na purpurovém pozadí:
   každá fáze má v mřížce vlastní buňku 512 × 512, chodidla na stejné čáře.
2. API (gpt-image-2, úprava obrázku) dostane list a schválený vzor nového stylu
   (ruda-novy-styl) se zadáním „přemaluj, pózy a místa nech“ (vzorky ruda-styl-* v
   tools/vzorky/zadani-kap1.json).
3. `ruda_listy.py rozrez <přemalovaný list> <název listu> <složka>` rozřeže list podle stejné
   mřížky do složek po sadách; ty pak zarovná a změří hra/nastroje/sestav_faze.gd
   (celé to pouští tools/grafika/zpracuj_rudu.sh).

Potřebuje Pillow, numpy a scipy (viz vyrez.py)."""
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from PIL import Image

from vyrez import vyrez

POSTAVY = pathlib.Path("hra/grafika/postavy")
BUNKA = 512
VYSKA = 470          # nejvyšší fáze sady je v buňce takhle vysoká
PATA = 496           # čára chodidel v buňce
# list: (sloupců, [(sada, počet fází), …]) – fáze jdou po řádcích zleva doprava
LISTY = {
    "chuze-bok": (4, [("chuze_bok", 12)]),
    "chuze-predu": (4, [("chuze_predu", 8)]),
    "chuze-zezadu": (4, [("chuze_zezadu", 8)]),
    "stani": (4, [("stani_bok", 4), ("stani_predu", 4)]),
    "akce": (4, [("zvednuti", 6), ("pouziti", 6)]),
}


def _faze(sada, pocet):
    return [Image.open(POSTAVY / f"ruda_{sada}" / f"faze_{i:02d}.png").convert("RGBA")
            for i in range(1, pocet + 1)]


def slozit(nazev):
    sloupcu, sady = LISTY[nazev]
    bunky = []
    for sada, pocet in sady:
        snimky = _faze(sada, pocet)
        z = min(VYSKA / max(s.height for s in snimky), (BUNKA - 24) / max(s.width for s in snimky))
        bunky += [s.resize((round(s.width * z), round(s.height * z)), Image.LANCZOS) for s in snimky]
    radku = -(-len(bunky) // sloupcu)
    c = Image.new("RGBA", (sloupcu * BUNKA, radku * BUNKA), (255, 0, 255, 255))
    for i, b in enumerate(bunky):
        x = (i % sloupcu) * BUNKA + (BUNKA - b.width) // 2
        y = (i // sloupcu) * BUNKA + PATA - b.height
        c.alpha_composite(b, (x, y))
    return c.convert("RGB")


def rozrez(list_png, nazev, cil):
    sloupcu, sady = LISTY[nazev]
    cele = vyrez(Image.open(list_png))
    cil = pathlib.Path(cil)
    i = 0
    for sada, pocet in sady:
        (cil / sada).mkdir(parents=True, exist_ok=True)
        for k in range(1, pocet + 1):
            x, y = (i % sloupcu) * BUNKA, (i // sloupcu) * BUNKA
            kus = cele.crop((x, y, x + BUNKA, y + BUNKA))
            kus.crop(kus.getbbox()).save(cil / sada / f"faze_{k:02d}.png")
            i += 1
        print(f"{nazev}: sada {sada}, {pocet} fází")


if __name__ == "__main__":
    if len(sys.argv) >= 3 and sys.argv[1] == "listy":
        cil = pathlib.Path(sys.argv[2])
        for nazev in LISTY:
            im = slozit(nazev)
            im.save(cil / f"ruda_{nazev.replace('-', '_')}_list.png")
            print(nazev, im.size)
    elif len(sys.argv) >= 5 and sys.argv[1] == "rozrez":
        rozrez(sys.argv[2], sys.argv[3], sys.argv[4])
    else:
        sys.exit(__doc__)
