"""Mluvení Rudy: mění se jen obličej a ruka s hrnkem, tělo je na pixel stejné jako při stání (D92).

Dřív měl Ruda mluvení jako samostatný list fází a celé tělo se při řeči mírně pohupovalo.
Teď se fáze skládají z první fáze stání (hra/grafika/postavy/ruda_stani_<pohled>/faze_01.png):

1. `ruda_mluveni.py predloha <složka sady stání> <předloha.png>` složí list se třemi kopiemi
   stojící fáze na purpurovém pozadí (stejně jako usta.py u vedlejších postav).
2. API (gpt-image-2, úprava obrázku) list upraví dvakrát:
   - vzorek ruda-mluveni-<pohled>-usta: jen obličeje (ústa A, O, E),
   - vzorek ruda-mluveni-<pohled>-gesta: jen ruka s hrnkem (beze změny, trochu výš, k hrudi).
3. `ruda_mluveni.py sloz <složka sady stání> <list úst> <list gest> <výstupní složka> [gesta] [zavřená]`
   vezme z obou listů jen oblasti, které se změnily, a složí fáze: gesta ruky × tvary úst.
   `gesta` jsou čísla kopií z listu gest, které se použijí (výchozí 1,2; kopie 0 je klid),
   `zavřená` = 1 přidá ke tvarům A, O, E i zavřená ústa ze stání (výchozí), 0 ne.
   Fáze mají stejný rozměr jako stání a popis fází (faze.json) se převezme ze sady stání, aby se
   při začátku řeči nezměnila velikost; navíc nese počet tvarů úst v jednom gestu („skupina“).

Ruda: bokem gesta 1 (při gestu 2 model zvedl hrnek až před obličej) a zavřená ústa ano;
zepředu gesta 1,2 a zavřená ústa ne (model u otevřených úst zvedl obočí, se zavřenými by
obočí při řeči poskakovalo).

Z listu úst se bere jen obličej (pleť s očima, obočím a ústy), ne vlasy: model přemaluje
celou hlavu a vlasy by se při řeči vlnily.

Hra střídá ústa rychle uvnitř jednoho gesta a gesto mění pomalu
(hra/game/spolecne/postava_faze.gd).
Potřebuje Pillow, numpy a scipy (viz vyrez.py)."""
import json
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import numpy as np
from PIL import Image
from scipy import ndimage

import usta
from vyrez import vyrez

HLAVA = 0.36     # podíl výšky fáze, kde končí hlava (ústa nad ním, ruka s hrnkem pod ním)


def _kopie(list_png, velky, i):
    """Výřez i-té kopie z upraveného listu jako RGBA s průhledným pozadím."""
    x0, y0 = usta.roh(velky, i)
    cele = vyrez(Image.open(list_png))
    return np.asarray(cele.crop((x0, y0, x0 + velky.width, y0 + velky.height))).astype(float)


def _na_purpurove(rgba):
    k = rgba[..., 3:4] / 255.0
    return rgba[..., :3] * k + np.array([255.0, 0.0, 255.0]) * (1 - k)


def _zmena(a, b, radky):
    """Maska oblasti, kde se kopie b liší od stojící fáze a; jen v řádcích podle řezu radky."""
    d = np.abs(_na_purpurove(a) - _na_purpurove(b)).mean(-1)
    d = ndimage.gaussian_filter(d, 3)
    m = d > 18
    m = ndimage.binary_opening(m, iterations=2)
    m = ndimage.binary_dilation(m, iterations=10)
    m = ndimage.binary_fill_holes(m)
    omez = np.zeros_like(m)
    omez[radky] = True
    return ndimage.gaussian_filter((m & omez).astype(float), 3)[..., None]


def _plet(rgba):
    """Pleť obličeje: světlá, teplá barva (ne krémová košile, ne hnědé vlasy)."""
    r, g, b, al = rgba[..., 0], rgba[..., 1], rgba[..., 2], rgba[..., 3]
    return (al > 200) & (r > 165) & (g > 95) & (r - b > 45) & (r - g > 20)


def _oblicej(a, radky):
    """Oblast, kde se smí měnit mimika: obličej stojící fáze (největší souvislá plocha pleti
    s vyplněnými dírami: oči, obočí, ústa) a okolí, kam může klesnout brada, ale bez vlasů.
    Model při úpravě úst přemaluje celou hlavu a vlasy vyjdou pokaždé trochu jinak; kdyby se
    braly i ty, při řeči by se vlnily."""
    omez = np.zeros(a.shape[:2], bool)
    omez[radky] = True
    plet = ndimage.binary_opening(_plet(a) & omez, iterations=1)
    lab, n = ndimage.label(plet)
    if n:
        velikosti = ndimage.sum(plet, lab, range(1, n + 1))
        plet = lab == (int(np.argmax(velikosti)) + 1)
    tvar = ndimage.binary_fill_holes(ndimage.binary_closing(plet, iterations=6))
    r, g, b, al = a[..., 0], a[..., 1], a[..., 2], a[..., 3]
    vlasy = (al > 200) & ~_plet(a) & (r < 175) & (r > b) & ~tvar & omez
    m = ndimage.binary_dilation(tvar, iterations=18) & ~ndimage.binary_dilation(vlasy, iterations=3)
    return ndimage.gaussian_filter(m.astype(float), 2)[..., None]


def _smichej(a, b, m):
    """a i b jsou RGBA; míchá se s předem vynásobenou průhledností, aby nevznikl lem."""
    ka, kb = a[..., 3:4] / 255.0, b[..., 3:4] / 255.0
    rgb = a[..., :3] * ka * (1 - m) + b[..., :3] * kb * m
    alfa = ka * (1 - m) + kb * m
    out = np.zeros_like(a)
    out[..., :3] = rgb / np.maximum(alfa, 1e-6)
    out[..., 3:4] = alfa * 255.0
    return out


def sloz(sada_stani, list_ust, list_gest, cil, gesta=(1, 2), zavrena=True):
    sada_stani, cil = pathlib.Path(sada_stani), pathlib.Path(cil)
    stoji = Image.open(sada_stani / "faze_01.png").convert("RGBA")
    velky = usta.zvetseny(stoji)
    a = np.asarray(velky).astype(float)
    rez = int(velky.height * HLAVA)
    hlava, telo = slice(0, rez), slice(rez, velky.height)
    # gesta: kopie 0 je beze změny (bere se přímo stojící fáze), kopie 1 a 2 mají hrnek výš
    nic = np.zeros(a.shape[:2] + (1,))
    tela = [(a, nic)]
    for i in gesta:
        b = _kopie(list_gest, velky, i)
        m = _zmena(a, b, telo)
        tela.append((_smichej(a, b, m), m))
        print(f"gesto {i}: změněno {m.mean() * 100:.1f} % plochy")
    # ústa: zavřená (beze změny) a tři tvary z listu úst
    oblicej = _oblicej(a, hlava)
    tvary = [None] if zavrena else []
    for i in range(3):
        b = _kopie(list_ust, velky, i)
        # jen mimika: změna se bere pouze z obličeje, vlasy a uši zůstanou ze stojící fáze
        m = _zmena(a, b, hlava) * oblicej
        tvary.append((b, m))
        print(f"ústa {i + 1}: změněno {m.mean() * 100:.1f} % plochy")
    cil.mkdir(parents=True, exist_ok=True)
    for stary in cil.glob("faze_*.png"):
        stary.unlink()
    n = 0
    puvodni = np.asarray(stoji).astype(float)
    for telo_rgba, m_telo in tela:
        for tvar in tvary:
            out = telo_rgba if tvar is None else _smichej(telo_rgba, tvar[0], tvar[1])
            zmena = m_telo if tvar is None else np.maximum(m_telo, tvar[1])
            n += 1
            # Zmenšit jen změněná místa; zbytek je na pixel stejný jako stojící fáze, takže
            # při začátku řeči se nezmění ani ostrost kresby
            maly = np.asarray(Image.fromarray(out.clip(0, 255).astype(np.uint8), "RGBA")
                              .resize(stoji.size, Image.LANCZOS)).astype(float)
            mm = np.asarray(Image.fromarray((zmena[..., 0] * 255).astype(np.uint8))
                            .resize(stoji.size, Image.LANCZOS)).astype(float)[..., None] / 255.0
            mm = np.clip(mm * 1.5, 0, 1)
            Image.fromarray(_smichej(puvodni, maly, mm).clip(0, 255).astype(np.uint8),
                            "RGBA").save(cil / f"faze_{n:02d}.png")
    # popis fází podle stání: stejné měřítko ve hře, žádný posun chodidel
    popis = json.loads((sada_stani / "faze.json").read_text())
    vyska, hlavy = max(popis["vysky"]), sorted(popis["hlavy"])
    json.dump({"skupina": len(tvary), "hlavy": [hlavy[len(hlavy) // 2]] * n, "posuny": [0.0] * n,
               "vyska": popis["vyska"],
               "vyska_prumer": float(vyska), "vysky": [vyska] * n},
              open(cil / "faze.json", "w"), indent=2)
    print(f"{cil}: {n} fází ({len(tela)} gesta × {len(tvary)} tvary úst)")


if __name__ == "__main__":
    if len(sys.argv) >= 4 and sys.argv[1] == "predloha":
        usta.predloha(pathlib.Path(sys.argv[2]) / "faze_01.png", sys.argv[3])
    elif len(sys.argv) >= 6 and sys.argv[1] == "sloz":
        sloz(*sys.argv[2:6],
             gesta=tuple(int(g) for g in sys.argv[6].split(",")) if len(sys.argv) > 6 else (1, 2),
             zavrena=sys.argv[7] != "0" if len(sys.argv) > 7 else True)
    else:
        sys.exit(__doc__)
