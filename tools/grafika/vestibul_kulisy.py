"""Kulisy vestibulu z listu vestibul-kulisy (cedule archivu a panel výtahu, D89).
Panel s tlačítkem 2 se skládá z panelu bez něj: dráty pod dírou se zakryjí dokreslenou mosazí
a do díry se vloží kopie tlačítka 1 s přepsanou číslicí a žlutějším odstínem (nová součástka).
Spouští se z kořene projektu. Potřebuje Pillow, numpy, scipy a opencv-python-headless."""
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from vyrez import *
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from scipy import ndimage
import numpy as np
src = Image.open("docs/styl/vzorky/vestibul-kulisy_v01.png")
cele = vyrez(src)
p = np.asarray(cele).astype(int)
yy, xx = np.mgrid[: p.shape[0], : p.shape[1]]
luma = p[..., :3].mean(-1)
m = (np.hypot(xx - 822, yy - 357) < 62) & (luma > 175)
ys, xs = np.nonzero(m); cx, cy = (xs.min() + xs.max()) / 2, (ys.min() + ys.max()) / 2; r = (xs.max() - xs.min()) / 2
m = (np.hypot(xx - 822, yy - 675) < 70) & (luma < 60)
ys, xs = np.nonzero(m); hx = (xs.min() + xs.max()) / 2; hr = (xs.max() - xs.min()) / 2; hy = ys.min() + hr
R = round(r * 1.36)
# dráty pod dírou zakrýt mosazí z okolí
s = np.asarray(cele).copy()
import cv2
oblast = (xx > hx - 62) & (xx < hx + 28) & (yy > hy + 25) & (yy < hy + 132) | (np.hypot(xx - hx, yy - hy) < R - 4)
rgb = cv2.inpaint(np.ascontiguousarray(s[..., :3]), oblast.astype(np.uint8) * 255, 7, cv2.INPAINT_TELEA)
sum_ = ndimage.gaussian_filter(np.random.default_rng(1).normal(0, 22, s.shape[:2]), 1.5) * 1.6
s[oblast, :3] = (rgb[oblast] + sum_[oblast][:, None]).clip(0, 255)
cele_s = Image.fromarray(s, "RGBA")
tl = cele.crop((round(cx) - R, round(cy) - R, round(cx) + R, round(cy) + R)).copy()
t = np.asarray(tl).copy()
y2, x2 = np.mgrid[: 2 * R, : 2 * R]; d = np.hypot(x2 - R, y2 - R)
disk = d < r * 0.9
l2 = t[..., :3].mean(-1)
cislo = ndimage.binary_dilation(disk & (l2 < 150), iterations=3) & disk
barva_cisla = np.median(t[disk & (l2 < 90)][:, :3], 0)
okoli = disk & ~cislo
vypl = t[..., :3].astype(float).copy(); vypl[~okoli] = 0
w = ndimage.gaussian_filter(okoli.astype(float), 9)
for c in range(3):
    vypl[..., c] = ndimage.gaussian_filter(vypl[..., c], 9) / np.maximum(w, 1e-3)
t[cislo, :3] = vypl[cislo].clip(0, 255)
t[disk, 2] = (t[disk, 2] * 0.78).astype(np.uint8)   # nové tlačítko je žlutější
tl = Image.fromarray(t.astype(np.uint8), "RGBA")
f = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", round(r * 1.3))
vrstva = Image.new("RGBA", tl.size, (0, 0, 0, 0))
ImageDraw.Draw(vrstva).text((R, R), "2", font=f, anchor="mm", fill=tuple(int(v) for v in barva_cisla) + (255,))
tl.alpha_composite(vrstva.filter(ImageFilter.GaussianBlur(0.7)))
mk = Image.new("L", tl.size, 0); ImageDraw.Draw(mk).ellipse([2, 2, 2 * R - 3, 2 * R - 3], fill=255)
tl.putalpha(mk.filter(ImageFilter.GaussianBlur(1)))
cele_s.alpha_composite(tl, (round(hx) - R, round(hy) - R))
cedule, panel = objekty(cele); panel_s = objekty(cele_s)[1]
zmensi(cedule, 124).save("hra/grafika/mistnosti/vestibul_cedule_archiv.png")
zmensi(panel, 164).save("hra/grafika/mistnosti/vestibul_tlacitka_bez.png")
zmensi(panel_s, 164).save("hra/grafika/mistnosti/vestibul_tlacitka_s.png")
