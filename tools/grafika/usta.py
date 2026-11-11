"""Fáze mluvení vedlejší postavy ze schváleného stojícího obrázku.

Postup (vyzkoušeno na vrátném):
1. `usta.py predloha <stoji.png> <predloha.png>` složí list se třemi kopiemi stojícího obrázku
   na purpurovém pozadí (1536 × 1024, postava zvětšená tak, aby se do pole vešla, nejvýš 2×).
2. `tools/generuj_vzorky.py` pošle list do API se zadáním „změň jen obličeje“ (vzorek
   `vratny-mluveni-uprava` v tools/vzorky/zadani-kap1.json). Model postavu nepřekresluje,
   takže zůstane stejná jako schválená.
3. `usta.py sloz <stoji.png> <upravený list.png> <výstupní složka> [první číslo fáze] [podíl hlavy]`
   vezme z každé kopie jen oblast obličeje, která se opravdu změnila, a vloží ji s měkkým okrajem
   do původního obrázku. Tělo je ve všech fázích na pixel stejné jako při stání a fáze mají
   stejný rozměr jako stojící obrázek, takže hra při řeči jen střídá texturu
   (hra/game/spolecne/usta.gd).

Potřebuje Pillow, numpy a scipy (viz vyrez.py)."""
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import numpy as np
from PIL import Image
from scipy import ndimage

from vyrez import zmensi

LIST = (1536, 1024)       # rozměr předlohy i upraveného listu
PATA = 960                # y chodidel v předloze
ROZTEC = 512              # vodorovná vzdálenost kopií


def zvetseni(stoji):
    """Zvětšení postavy v předloze: co největší, aby se vešla do pole, po krocích 0,05, nejvýš 2×."""
    z = min(2.0, (ROZTEC - 22) / stoji.width, (PATA - 80) / stoji.height)
    return int(z * 20 + 1e-6) / 20


def zvetseny(stoji):
    z = zvetseni(stoji)
    return stoji.resize((round(stoji.width * z), round(stoji.height * z)), Image.LANCZOS)


def roh(velky, i):
    return ROZTEC // 2 + i * ROZTEC - velky.width // 2, PATA - velky.height


def predloha(stoji_png, vystup_png):
    velky = zvetseny(Image.open(stoji_png).convert("RGBA"))
    c = Image.new("RGBA", LIST, (255, 0, 255, 255))
    for i in range(3):
        c.alpha_composite(velky, roh(velky, i))
    c.convert("RGB").save(vystup_png)


def sloz(stoji_png, list_png, cil, prvni=1, hlava=0.34):
    stoji = Image.open(stoji_png).convert("RGBA")
    upraveny = Image.open(list_png).convert("RGB")
    cil = pathlib.Path(cil)
    cil.mkdir(parents=True, exist_ok=True)
    velky = zvetseny(stoji)
    a = np.asarray(velky).astype(float)
    for i in range(3):
        x0, y0 = roh(velky, i)
        b = np.asarray(upraveny.crop((x0, y0, x0 + velky.width, y0 + velky.height))).astype(float)
        d = np.abs(a[..., :3] - b).mean(-1) * (a[..., 3] > 200)
        d[int(velky.height * hlava):] = 0                       # jen hlava
        m = ndimage.gaussian_filter(d, 4) > 16
        m = ndimage.binary_opening(m, iterations=3)
        m = ndimage.binary_dilation(m, iterations=12)
        m = ndimage.binary_fill_holes(m)
        m &= ndimage.binary_erosion(a[..., 3] > 200, iterations=4)   # ne přes obrys postavy
        purp = (np.minimum(b[..., 0], b[..., 2]) - b[..., 1]) > 40      # purpurové pozadí listu
        m &= ~ndimage.binary_dilation(purp, iterations=6)
        mm = ndimage.gaussian_filter(m.astype(float), 4)[..., None]
        out = a.copy()
        out[..., :3] = a[..., :3] * (1 - mm) + b * mm
        im = Image.fromarray(out.clip(0, 255).astype(np.uint8), "RGBA")
        zmensi(im, stoji.height).resize(stoji.size, Image.LANCZOS).save(cil / f"faze_{prvni + i:02d}.png")
        print(f"fáze {prvni + i}: změněná plocha {m.mean() * 100:.1f} % obrázku")


if __name__ == "__main__":
    if len(sys.argv) >= 4 and sys.argv[1] == "predloha":
        predloha(sys.argv[2], sys.argv[3])
    elif len(sys.argv) >= 5 and sys.argv[1] == "sloz":
        sloz(sys.argv[2], sys.argv[3], sys.argv[4],
             int(sys.argv[5]) if len(sys.argv) > 5 else 1,
             float(sys.argv[6]) if len(sys.argv) > 6 else 0.34)
    else:
        sys.exit(__doc__)
