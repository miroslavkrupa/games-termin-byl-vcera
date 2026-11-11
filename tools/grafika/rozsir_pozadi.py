"""Rozšíří pozadí 1536 × 1024 do stran na 2218 × 1024 (široké obrazovky), střed zůstane původní.

Použití: rozsir_pozadi.py <původní.png> <rozšířené z API 2224×1024> <výstup.png> [náhled švů.png]

Model (gpt-image-2, vzorek archiv-rozsireni) dostane původní pozadí uprostřed širšího plátna
a má domalovat strany. Střed přitom překreslí o něco menší a posunutý (ani maska to nezastaví),
takže se nedá jen vlepit původní obrázek doprostřed. Postup:
1. najdou se shodné body původního a nového obrázku (SIFT) a z nich podobnostní transformace
   (zmenšení a posun),
2. nový obrázek se podle ní zvětší a posune tak, aby jeho střed seděl na původní obrázek,
3. střed se vezme z původního obrázku (na pixel stejný, aktivní místa platí dál), strany
   z nového, s krátkým prolnutím na švu.
Potřebuje Pillow, numpy a opencv-python-headless."""
import sys

import cv2
import numpy as np

SIRKA, OKRAJ, PROLNUTI = 2218, 341, 14


def rozsir(puvodni_png, nove_png, vystup_png, nahled=None):
    g, r = cv2.imread(puvodni_png), cv2.imread(nove_png)
    sift = cv2.SIFT_create(4000)
    k1, d1 = sift.detectAndCompute(cv2.cvtColor(g, cv2.COLOR_BGR2GRAY), None)
    k2, d2 = sift.detectAndCompute(cv2.cvtColor(r, cv2.COLOR_BGR2GRAY), None)
    dvojice = cv2.BFMatcher().knnMatch(d1, d2, k=2)
    dobre = [a for a, b in dvojice if a.distance < 0.7 * b.distance]
    odkud = np.float32([k1[x.queryIdx].pt for x in dobre])
    kam = np.float32([k2[x.trainIdx].pt for x in dobre])
    a, uvnitr = cv2.estimateAffinePartial2D(odkud, kam, method=cv2.RANSAC, ransacReprojThreshold=6)
    print(f"shodných bodů {int(uvnitr.sum())}, měřítko středu {np.hypot(a[0, 0], a[0, 1]):.4f}, "
          f"posun ({a[0, 2]:.1f}, {a[1, 2]:.1f})")
    # cíl (X, Y) = původní souřadnice (X - OKRAJ, Y); zdroj = a · původní souřadnice
    m = a.copy()
    m[:, 2] = a[:, 2] - a[:, 0] * OKRAJ
    siroke = cv2.warpAffine(r, m, (SIRKA, g.shape[0]), flags=cv2.INTER_LANCZOS4 | cv2.WARP_INVERSE_MAP,
                            borderMode=cv2.BORDER_REPLICATE).astype(float)
    vaha = np.ones(g.shape[1])
    vaha[:PROLNUTI] = np.linspace(0, 1, PROLNUTI)
    vaha[-PROLNUTI:] = np.linspace(1, 0, PROLNUTI)
    stred = siroke[:, OKRAJ:OKRAJ + g.shape[1]]
    siroke[:, OKRAJ:OKRAJ + g.shape[1]] = stred * (1 - vaha[None, :, None]) + g * vaha[None, :, None]
    out = siroke.clip(0, 255).astype(np.uint8)
    cv2.imwrite(vystup_png, out)
    if nahled:
        cv2.imwrite(nahled, np.hstack([out[:, OKRAJ - 220:OKRAJ + 220], out[:, OKRAJ + 1536 - 220:OKRAJ + 1536 + 220]]))


if __name__ == "__main__":
    if len(sys.argv) < 4:
        sys.exit(__doc__)
    rozsir(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4] if len(sys.argv) > 4 else None)
