"""Rozřeže list fází na purpurovém pozadí (gpt-image-2, D88) na samostatné průhledné obrázky.

Použití: rozrez_list.py <list.png> <výstupní složka>

Fáze se číslují po řádcích shora dolů a zleva doprava (faze_01.png …). Výstup je vstupem pro
hra/nastroje/sestav_faze.gd, který fáze zarovná a u chůze změří krok.
Potřebuje Pillow, numpy a scipy (viz vyrez.py)."""
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import numpy as np
from PIL import Image
from scipy import ndimage

from vyrez import vyrez

MIN_PIXELU = 5000   # menší skvrny jsou nečistoty, ne postavy


def figury(list_png):
    cele = vyrez(Image.open(list_png))
    al = np.asarray(cele)[..., 3] > 40
    lab, _ = ndimage.label(ndimage.binary_dilation(al, iterations=5))
    out = []
    for i, sl in enumerate(ndimage.find_objects(lab), 1):
        if (lab[sl] == i).sum() < MIN_PIXELU:
            continue
        kus = np.asarray(cele)[sl].copy()
        kus[..., 3] = np.where(lab[sl] == i, kus[..., 3], 0)
        im = Image.fromarray(kus, "RGBA")
        out.append(((sl[0].start + sl[0].stop) / 2, sl[1].start, im.crop(im.getbbox())))
    vyska = np.median([o[2].height for o in out])
    out.sort(key=lambda o: (round(o[0] / vyska), o[1]))
    return [o[2] for o in out]


if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    cil = pathlib.Path(sys.argv[2])
    cil.mkdir(parents=True, exist_ok=True)
    figs = figury(sys.argv[1])
    for i, f in enumerate(figs, 1):
        f.save(cil / f"faze_{i:02d}.png")
    print(f"{pathlib.Path(sys.argv[1]).name}: {len(figs)} fází, velikosti {[f.size for f in figs]}")
