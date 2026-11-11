"""Přebarví načervenalé skvrny na kalhotách ve fázích animace na barvu okolní látky.

Použití: odbarvi_skvrny.py <složka s fázemi> [od] [do]   (od, do = pás výšky obrázku, výchozí 0.64–0.86)

Obrazový model občas přidá na nohavici červenou šmouhu (bara-chuze-bok_v01, fáze 3 a 4).
Skvrna = načervenalý pixel v pásu nohavic, který má blízko modrozelenou látku. Barva se vezme
z okolní látky a zachová se jas pixelu, takže záhyby a obrysy zůstanou.
Potřebuje Pillow, numpy a scipy (viz vyrez.py)."""
import pathlib
import sys

import numpy as np
from PIL import Image
from scipy import ndimage


def odbarvi(img, od=0.64, do=0.86):
    a = np.asarray(img.convert("RGBA")).astype(np.float32)
    r, g, b, al = (a[..., i] for i in range(4))
    h = a.shape[0]
    pas = np.zeros(a.shape[:2], bool)
    pas[int(h * od):int(h * do)] = True
    latka = (al > 200) & (np.maximum(g, b) > r + 8) & (r + g + b > 150)
    # okrový prach na látce má R jen o málo nad G; šmouha je výrazně červenější
    cervena = pas & (al > 200) & (r - g > 28) & ndimage.binary_dilation(latka, iterations=10)
    # žlutá a hnědá (ponožky, boty, metr) mají málo modré; skvrna na modrozelené látce ne
    cervena &= b > 0.55 * r
    cervena = ndimage.binary_opening(cervena, iterations=1)          # osamělé pixely nejsou šmouha
    cervena = ndimage.binary_dilation(cervena, iterations=3) & (al > 200) & (r > g + 6)
    if not cervena.any():
        return img, 0
    w = ndimage.gaussian_filter(latka.astype(np.float32), 8)
    out = a.copy()
    jas = a[..., :3].mean(-1)
    okoli = np.stack([ndimage.gaussian_filter(np.where(latka, a[..., i], 0), 8) / np.maximum(w, 1e-4) for i in range(3)], -1)
    jas_okoli = np.maximum(okoli.mean(-1), 1)
    k = np.clip(jas / jas_okoli, 0.3, 1.6)[..., None]
    out[..., :3] = np.where(cervena[..., None], np.clip(okoli * k, 0, 255), a[..., :3])
    return Image.fromarray(out.astype(np.uint8), "RGBA"), int(cervena.sum())


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    od = float(sys.argv[2]) if len(sys.argv) > 2 else 0.64
    do = float(sys.argv[3]) if len(sys.argv) > 3 else 0.86
    for f in sorted(pathlib.Path(sys.argv[1]).glob("faze_*.png")):
        vysledek, n = odbarvi(Image.open(f), od, do)
        if n:
            vysledek.save(f)
        print(f"{f.name}: přebarveno {n} pixelů")
