"""Vyříznutí objektů z jednolitého purpurového pozadí (gpt-image-2 neumí průhledné, D88).
vyrez(img) -> RGBA; objekty(rgba) -> seznam výřezů zleva doprava; zmensi(im, výška).

Potřebuje Pillow, numpy a scipy (python3 -m venv venv && venv/bin/pip install pillow numpy scipy)."""
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage


def vyrez(img, bile_sklo=False):
    a = np.asarray(img.convert("RGB")).astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    # podobnost s purpurovou: hodně R a B, málo G
    purp = np.clip((np.minimum(r, b) - g) / 255.0, 0, 1)
    pozadi_kand = (purp > 0.55) & (r > 170) & (b > 170)
    # pozadí = purpurová spojená s okrajem obrázku
    lab, n = ndimage.label(pozadi_kand)
    okraj = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
    pozadi = np.isin(lab, okraj[okraj > 0])
    # uzavřené ostrůvky čisté purpurové uvnitř (ucho hrnku) jsou také pozadí
    cista = (purp > 0.9) & (g < 40)
    pozadi |= cista
    if not bile_sklo:
        # výrazně purpurové plochy uzavřené v kresbě (sklo brýlí z profilu, mezera mezi nohama):
        # žádná postava purpurovou nemá, je to vždy prosvítající pozadí
        pozadi |= (purp > 0.4) & (r > 140) & (b > 140)
    alfa = np.where(pozadi, 0.0, 1.0)
    rgb = a.copy()
    uvnitr = ~pozadi & (purp > 0.12) & (r > 150) & (b > 150)
    if bile_sklo:
        # průsvitný celofán na purpurové: barva = bílá * k + purpurová * (1 - k), k = G / 255
        k = np.clip(g / 255.0, 0, 1)
        rgb[uvnitr] = 255
        alfa = np.where(uvnitr, np.clip(k * 1.15, 0.25, 1), alfa)
        # růžový závoj celofánu přes knihu: ubrat přebytek R a B nad G
        m = ~pozadi & ~uvnitr
        e = np.clip(np.minimum(r, b) - g, 0, None)
        rgb[m, 0] = r[m] - e[m] * 0.85
        rgb[m, 2] = b[m] - e[m] * 0.85
    else:
        # zbytky purpurové na hraně: ubrat R a B na úroveň G
        m = ~pozadi & (purp > 0.12)
        rgb[m, 0] = np.minimum(r[m], g[m] + 20)
        rgb[m, 2] = np.minimum(b[m], g[m] + 20)
    # hrana: o pixel stáhnout a vyhladit
    al = Image.fromarray((alfa * 255).astype(np.uint8))
    tvrda = Image.fromarray(((alfa > 0) * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    al = Image.fromarray(np.minimum(np.asarray(al), np.asarray(tvrda)))
    out = Image.fromarray(rgb.clip(0, 255).astype(np.uint8)).convert("RGBA")
    out.putalpha(al)
    return out


def objekty(rgba, min_plocha=2000):
    al = np.asarray(rgba)[..., 3] > 40
    lab, n = ndimage.label(ndimage.binary_dilation(al, iterations=6))
    out = []
    for i, sl in enumerate(ndimage.find_objects(lab), 1):
        if (lab[sl] == i).sum() < min_plocha:
            continue
        kus = np.asarray(rgba)[sl].copy()
        kus[..., 3] = np.where(lab[sl] == i, kus[..., 3], 0)
        im = Image.fromarray(kus, "RGBA")
        out.append((sl[1].start, im.crop(im.getbbox())))
    return [im for _, im in sorted(out, key=lambda t: t[0])]


def zmensi(im, vyska):
    f = vyska / im.height
    # zmenšení s předem vynásobenou alfou, aby hrany nezesvětlaly
    a = np.asarray(im).astype(np.float32) / 255
    a[..., :3] *= a[..., 3:4]
    w, h = max(1, round(im.width * f)), vyska
    vr = [np.asarray(Image.fromarray(a[..., i]).resize((w, h), Image.LANCZOS)) for i in range(4)]
    b = np.stack(vr, -1)
    al = np.clip(b[..., 3:4], 0, 1)
    rgb = np.where(al > 1e-3, b[..., :3] / np.maximum(al, 1e-3), 0)
    return Image.fromarray((np.clip(np.concatenate([rgb, al], -1), 0, 1) * 255).astype(np.uint8), "RGBA")
