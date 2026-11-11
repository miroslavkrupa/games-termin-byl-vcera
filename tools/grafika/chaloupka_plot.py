"""Plot před zahrádkou u chaloupky jako popředí (D94): babička stojí za plotem u rajčat a laťky
ji mají zakrývat. Z pozadí se vyříznou jen světlé laťky plotu (s obrysem), mezery mezi nimi
zůstanou průhledné, takže je mezi laťkami vidět babiččina sukně.
Použití: chaloupka_plot.py <pozadí chaloupky.png> <výstup.png>   (spouští se z kořene projektu)
Výřez je část pozadí VYREZ (souřadnice obrázku); ve hře leží na stejném místě jako v pozadí.
Potřebuje Pillow, numpy a scipy."""
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

# výřez v souřadnicích širokého pozadí (místnost + 341): laťky vpravo od branky
VYREZ = (1141, 688, 1500, 800)
SPODEK = 790          # řádek obrázku, kde laťky končí


def plot(pozadi_png, vystup_png):
    kus = Image.open(pozadi_png).convert("RGB").crop(VYREZ)
    a = np.asarray(kus).astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    # laťka: světlé béžové dřevo (ne žlutá tráva v mezerách, ne zeleň, ne hlína)
    latka = (r > 200) & (g > 150) & (b > 70) & (r - g < 80)
    latka[SPODEK - VYREZ[1]:] = False          # pod laťkami je hlína stejné barvy
    latka = ndimage.binary_opening(latka, iterations=2)
    # jen velké souvislé plochy (laťky), ne světlé skvrny v zahrádce
    lab, n = ndimage.label(latka)
    velikosti = ndimage.sum(latka, lab, range(1, n + 1))
    latka = np.isin(lab, [i + 1 for i, v in enumerate(velikosti) if v > 400])
    latka = ndimage.binary_closing(latka, iterations=2)
    latka = ndimage.binary_dilation(latka, iterations=3)      # tmavý obrys laťky
    alfa = ndimage.gaussian_filter(latka.astype(float), 0.8)
    out = np.dstack([a, (alfa * 255).clip(0, 255)]).astype(np.uint8)
    Image.fromarray(out, "RGBA").save(vystup_png)
    stred = ((VYREZ[0] + VYREZ[2]) / 2 - 341, (VYREZ[1] + VYREZ[3]) / 2)
    print(f"{vystup_png}: {kus.size}, střed v místnosti {stred}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    plot(sys.argv[1], sys.argv[2])
