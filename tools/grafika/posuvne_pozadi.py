"""Posuvné pozadí (D96): rozšíří hotové široké pozadí o pruh vlevo a vpravo, střed zůstane původní.

Použití: posuvne_pozadi.py <původní.png> <levá z API.png> <pravá z API.png> <výstup.png>
                           [--vecer <původní večerní.png> <výstup večerní.png>] [--nahled <švy.png>]

Každou stranu domaloval model (gpt-image-2, vzorky namesti-posuvne-vlevo / -vpravo) k velkému
kusu původního obrazu: plátno 2224 × 1024, z toho PAS pixelů prázdný pruh a zbytek původní obraz.
Model kus původního obrazu překreslí (někdy zmenšený a posunutý, o něco světlejší), takže nové
a původní se na sebe musí napasovat:
1. zarovnání: shodné body (SIFT), nejdřív podobnostní transformace celého kusu, pak afinní
   doladění jen z bodů u okraje, kde šev vznikne,
2. barvy: nový obrázek se přebarví podle toho, jak se jeho překreslený kus liší od originálu,
3. šev: nevede rovně, ale cestou nejmenšího rozdílu v pásu ZONA pixelů u okraje původního obrazu
   (dynamické programování po řádcích), takže neprotíná místa, kde se obě kresby liší,
4. doladění jasu: zbylý pomalý rozdíl barev na švu se odečte od nové strany a do dálky se
   postupně vytratí, na švu se prolíná jen pár pixelů.
Oba pruhy jsou stejně široké, aby střed pozadí zůstal na x = 768 místnosti (kamera Popochiu
počítá meze posuvné místnosti souměrně kolem středu). Pravá strana se počítá zrcadlově.

Večerní verze nemá vlastní domalované strany: strany se přebarví podle toho, jak se v původní
dvojici obrázků liší večer ode dne, a použije se stejný šev.
Potřebuje numpy, scipy a opencv-python-headless."""
import sys

import cv2
import numpy as np
from scipy import ndimage

PLATNO, PAS = 2224, 608
ZONA = 250          # jak hluboko do původního obrazu smí šev zajít
DOJEZD = 380.0      # na jakou vzdálenost od švu se vytratí doladění jasu
PROLNUTI = 2.0      # měkkost švu (sigma v pixelech)


def _body(kus, nove):
    sift = cv2.SIFT_create(6000)
    k1, d1 = sift.detectAndCompute(cv2.cvtColor(kus, cv2.COLOR_BGR2GRAY), None)
    k2, d2 = sift.detectAndCompute(cv2.cvtColor(nove, cv2.COLOR_BGR2GRAY), None)
    dvojice = cv2.BFMatcher().knnMatch(d1, d2, k=2)
    dobre = [a for a, b in dvojice if a.distance < 0.7 * b.distance]
    return (np.float32([k1[x.queryIdx].pt for x in dobre]), np.float32([k2[x.trainIdx].pt for x in dobre]))


def zarovnej(kus, nove):
    """Transformace kus → nový obrázek; přesná hlavně u levého okraje kusu, kde bude šev."""
    odkud, kam = _body(kus, nove)
    a, uvnitr = cv2.estimateAffinePartial2D(odkud, kam, method=cv2.RANSAC, ransacReprojThreshold=6)
    meritko = float(np.hypot(a[0, 0], a[0, 1]))
    blizko = (odkud[:, 0] < 3 * ZONA) & (uvnitr.ravel() == 1)
    if blizko.sum() >= 30:
        b, uvnitr2 = cv2.estimateAffine2D(odkud[blizko], kam[blizko], method=cv2.RANSAC, ransacReprojThreshold=2.5)
        if b is not None and uvnitr2.sum() >= 20:
            chyba = np.linalg.norm(odkud[blizko] @ b[:, :2].T + b[:, 2] - kam[blizko], axis=1)[uvnitr2.ravel() == 1]
            print(f"  doladění u okraje: {int(uvnitr2.sum())} bodů, střední odchylka {np.median(chyba):.2f} px")
            a = b
    return a, meritko


def prebarveni(odkud, kam):
    """Funkce, která obrázek přebarví tak, jak se liší `kam` od `odkud` (kvadratická regrese
    barev na rozmazaných zmenšeninách; druhé kolo bez míst, která sedí nejhůř)."""
    def rysy(x):
        r, g, b = x[..., 0], x[..., 1], x[..., 2]
        return np.stack([np.ones_like(r), r, g, b, r * r, g * g, b * b, r * g, r * b, g * b], -1)
    maly = lambda im: cv2.GaussianBlur(cv2.resize(im, None, fx=0.125, fy=0.125, interpolation=cv2.INTER_AREA),
                                       (0, 0), 3).reshape(-1, 3).astype(float) / 255.0
    x, y = rysy(maly(odkud)), maly(kam)
    koef, *_ = np.linalg.lstsq(x, y, rcond=None)
    chyba = np.abs(x @ koef - y).sum(-1)
    dobre = chyba < np.quantile(chyba, 0.8)
    koef, *_ = np.linalg.lstsq(x[dobre], y[dobre], rcond=None)
    return lambda im: (rysy(im.astype(float) / 255.0) @ koef * 255.0).clip(0, 255)


def nova_strana(puvodni, nove):
    """Nová strana v souřadnicích původního obrazu: sloupce -PAS … ZONA (levý okraj je x = 0),
    barevně srovnaná s původním obrazem."""
    kus = puvodni[:, :PLATNO - PAS]
    a, meritko = zarovnej(kus, nove)
    def vyrez(od, sirka):
        m = a.copy()
        m[:, 2] = a[:, 2] + a[:, 0] * od
        return cv2.warpAffine(nove, m, (sirka, puvodni.shape[0]),
                              flags=cv2.INTER_LANCZOS4 | cv2.WARP_INVERSE_MAP, borderMode=cv2.BORDER_REPLICATE)
    barvi = prebarveni(vyrez(0, kus.shape[1]), kus)
    print(f"  měřítko překresleného kusu {meritko:.4f}")
    return barvi(vyrez(-PAS, PAS + ZONA))


def sev(a_zona, b_zona):
    """Cesta švu zónou: pro každý řádek sloupec, kde se původní a nový obraz liší nejméně."""
    rozdil = np.abs(a_zona.astype(float) - b_zona).mean(-1)
    rozdil = cv2.GaussianBlur(rozdil, (0, 0), 1.5)
    h, w = rozdil.shape
    cena = rozdil + 0.01 * np.arange(w)[None, :]          # při shodě radši blíž okraji
    cena[:, :6] = 1e6
    cena[:, -6:] = 1e6
    soucet = cena.copy()
    for y in range(1, h):
        p = soucet[y - 1]
        nej = np.minimum(p, np.minimum(np.roll(p, 1), np.roll(p, -1)))
        soucet[y] += nej
    cesta = np.zeros(h, int)
    cesta[-1] = int(np.argmin(soucet[-1]))
    for y in range(h - 2, -1, -1):
        x = cesta[y + 1]
        okoli = soucet[y, max(x - 1, 0):x + 2]
        cesta[y] = max(x - 1, 0) + int(np.argmin(okoli))
    print(f"  šev: sloupce {cesta.min()}–{cesta.max()} zóny, střední rozdíl na švu "
          f"{rozdil[np.arange(h), cesta].mean():.1f} (v zóně {rozdil.mean():.1f})")
    return cesta


def spoj(puvodni, strana, cesta):
    """Složí levou část: PAS sloupců nové strany + původní obraz, se švem po cestě."""
    h, w = puvodni.shape[:2]
    a_zona = puvodni[:, :ZONA].astype(float)
    b = strana.astype(float).copy()
    # pomalý rozdíl barev na švu: odečíst od nové strany, do dálky od švu vytratit
    pomaly = cv2.GaussianBlur(a_zona - b[:, PAS:], (0, 0), 18)
    na_svu = pomaly[np.arange(h), cesta]                              # (h, 3)
    na_svu = ndimage.gaussian_filter1d(na_svu, 12, axis=0)
    x = np.arange(PAS + ZONA)[None, :]
    od_svu = (PAS + cesta)[:, None] - x                                # > 0 vlevo od švu
    vaha = np.clip(1.0 - od_svu / DOJEZD, 0.0, 1.0)
    vaha = vaha * vaha * (3 - 2 * vaha)                                # hladký dojezd
    b += na_svu[:, None, :] * np.where(od_svu >= 0, vaha, 1.0)[..., None]
    maska = (od_svu > 0).astype(float)                                 # 1 = nová strana
    maska = ndimage.gaussian_filter1d(maska, PROLNUTI, axis=1)[..., None]
    out = np.zeros((h, PAS + w, 3), float)
    out[:, PAS:] = puvodni
    out[:, :PAS + ZONA] = b * maska + out[:, :PAS + ZONA] * (1 - maska)
    return out


def rozsir(puvodni, leva, prava, vecer=None):
    """Vrátí široký obraz (a večerní, když je zadaný původní večerní)."""
    vysledky = []
    casti = {}
    for nazev, nove, zrcadlit in (("vlevo", leva, False), ("vpravo", prava, True)):
        print(f"{nazev}:")
        o = np.ascontiguousarray(puvodni[:, ::-1]) if zrcadlit else puvodni
        n = np.ascontiguousarray(nove[:, ::-1]) if zrcadlit else nove
        strana = nova_strana(o, n)
        cesta = sev(o[:, :ZONA], strana[:, PAS:])
        casti[nazev] = (strana, cesta)
    for obraz, barvi in ((puvodni, None), (vecer, None if vecer is None else prebarveni(puvodni, vecer))):
        if obraz is None:
            continue
        w = obraz.shape[1]
        cely = np.zeros((obraz.shape[0], w + 2 * PAS, 3), float)
        for nazev, zrcadlit in (("vlevo", False), ("vpravo", True)):
            strana, cesta = casti[nazev]
            if barvi is not None:
                strana = barvi(strana.astype(np.uint8))
            o = np.ascontiguousarray(obraz[:, ::-1]) if zrcadlit else obraz
            cast = spoj(o, strana, cesta)[:, :PAS + w // 2]
            if zrcadlit:
                cely[:, PAS + w - w // 2:] = cast[:, ::-1][:, :w // 2 + PAS]
            else:
                cely[:, :PAS + w // 2] = cast
        vysledky.append(cely.clip(0, 255).astype(np.uint8))
    return vysledky


if __name__ == "__main__":
    arg = sys.argv[1:]
    if len(arg) < 4:
        sys.exit(__doc__)
    den = cv2.imread(arg[0])
    vecer = cv2.imread(arg[arg.index("--vecer") + 1]) if "--vecer" in arg else None
    obrazy = rozsir(den, cv2.imread(arg[1]), cv2.imread(arg[2]), vecer)
    cv2.imwrite(arg[3], obrazy[0])
    print(f"{arg[3]}: {obrazy[0].shape[1]} × {obrazy[0].shape[0]}")
    if vecer is not None:
        cv2.imwrite(arg[arg.index("--vecer") + 2], obrazy[1])
    if "--nahled" in arg:
        s, w = PAS, den.shape[1]
        cv2.imwrite(arg[arg.index("--nahled") + 1],
                    np.hstack([obrazy[0][:, s - 200:s + ZONA + 60], obrazy[0][:, s + w - ZONA - 60:s + w + 200]]))
