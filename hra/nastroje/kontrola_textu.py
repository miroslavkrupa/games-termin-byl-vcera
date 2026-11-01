#!/usr/bin/env python3
"""Kontrola textů hry: chybějící překlady a nepoužité klíče (D3: oba jazyky zároveň).

Spuštění z kořene repozitáře:  python3 hra/nastroje/kontrola_textu.py
Vrací 1, když najde chybu (hodí se jako kontrola před commitem nebo při sestavení).

Chyby:
  - řádek tabulky bez češtiny nebo angličtiny, duplicitní klíč,
  - různý počet zástupných symbolů (%s, %d, {jmeno}) v češtině a angličtině,
  - ID textu použité ve skriptu nebo scéně, které v tabulce chybí,
  - popisek aktivního místa, postavy nebo předmětu a text volby dialogu, které nejsou v tabulce.
Varování:
  - text v uzlu GUI (text, title), který není v tabulce. Přeskakují se uzly s auto_translate_mode = 2,
    ukázkové texty šablony s BBCode a zástupné texty, které skripty za běhu přepíšou (PREPISUJE_SKRIPT),
  - klíč v tabulce, který se nikde nepoužívá. Texty se píšou před výrobou (krok N6), proto se
    standardně vypíše jen jejich počet; seznam vypíše přepínač --nepouzite.
"""
import csv
import pathlib
import re
import sys

HRA = pathlib.Path(__file__).resolve().parent.parent
TABULKA = HRA / "texty" / "texty.csv"
HRA_SLOZKA = HRA / "game"
# ID textů hry: předpona podle místa použití, pak malá písmena, číslice a podtržítka
KLIC = re.compile(r"^(ch\d+|predmet|postava|obecne|ui)_[a-z0-9_]+$")
ZASTUPNE = re.compile(r"%[sd]|\{[a-z_]+\}")
RETEZEC_GD = re.compile(r'"((?:[^"\\]|\\.)*)"')
# Zástupné texty šablony Popochiu, které za běhu přepíše skript (v editoru jen ukazují rozvržení)
PREPISUJE_SKRIPT = {"Title", "0x", "Popochiu: Hi!", "Choose a slot to...", "slot 1", "slot 2", "slot 3", "slot 4"}
VLASTNOST_SCENY = re.compile(r'^(description|text|title) = "((?:[^"\\]|\\.)*)"$')


def nacti_tabulku(chyby):
    radky = list(csv.reader(TABULKA.open(encoding="utf-8")))
    hlavicka = radky[0]
    if hlavicka[:3] != ["keys", "cs", "en"]:
        chyby.append(f"{TABULKA.name}: první sloupce musí být keys, cs, en (jsou {hlavicka[:3]})")
    klice = {}
    for cislo, r in enumerate(radky[1:], start=2):
        if len(r) != len(hlavicka):
            chyby.append(f"{TABULKA.name}:{cislo}: {len(r)} sloupců místo {len(hlavicka)}")
            continue
        klic, cs, en = r[0], r[1], r[2]
        if klic in klice:
            chyby.append(f"{TABULKA.name}:{cislo}: duplicitní klíč {klic}")
        klice[klic] = (cs, en)
        if not cs.strip():
            chyby.append(f"{TABULKA.name}:{cislo}: {klic} nemá češtinu")
        if not en.strip():
            chyby.append(f"{TABULKA.name}:{cislo}: {klic} nemá angličtinu")
        if sorted(ZASTUPNE.findall(cs)) != sorted(ZASTUPNE.findall(en)):
            chyby.append(f"{TABULKA.name}:{cislo}: {klic} má v češtině a angličtině jiné zástupné symboly")
    return klice


def bloky_sceny(soubor):
    """Rozdělí .tscn/.tres na bloky [uzel] s jejich vlastnostmi."""
    blok, hlava = [], ""
    for radek in soubor.read_text(encoding="utf-8").splitlines():
        if radek.startswith("["):
            if blok or hlava:
                yield hlava, blok
            hlava, blok = radek, []
        else:
            blok.append(radek)
    yield hlava, blok


def main():
    chyby, varovani = [], []
    klice = nacti_tabulku(chyby)
    pouzite = set()

    for gd in sorted(HRA_SLOZKA.rglob("*.gd")):
        for cislo, radek in enumerate(gd.read_text(encoding="utf-8").splitlines(), start=1):
            if radek.lstrip().startswith("#"):
                continue
            for retezec in RETEZEC_GD.findall(radek):
                if KLIC.match(retezec):
                    pouzite.add(retezec)
                    if retezec not in klice:
                        chyby.append(f"{gd.relative_to(HRA)}:{cislo}: text {retezec} chybí v tabulce")

    for scena in sorted([*HRA_SLOZKA.rglob("*.tscn"), *HRA_SLOZKA.rglob("*.tres")]):
        cesta = scena.relative_to(HRA).as_posix()
        hratelny = any(c in cesta for c in ("/hotspots/", "game/characters/", "game/inventory_items/", "game/dialogs/"))
        for hlava, blok in bloky_sceny(scena):
            if "auto_translate_mode = 2" in blok:
                continue
            for radek in blok:
                m = VLASTNOST_SCENY.match(radek)
                if not m:
                    continue
                vlastnost, hodnota = m.groups()
                if not re.search(r"[A-Za-zÀ-ž]", hodnota) or hodnota in PREPISUJE_SKRIPT or "[" in hodnota:
                    continue
                if hodnota in klice:
                    pouzite.add(hodnota)
                elif KLIC.match(hodnota) or (hratelny and vlastnost in ("description", "text")):
                    chyby.append(f"{cesta}: {vlastnost} „{hodnota}“ chybí v tabulce")
                elif cesta.startswith("game/gui/") and vlastnost in ("text", "title"):
                    varovani.append(f"{cesta}: {vlastnost} „{hodnota}“ není v tabulce (zůstane anglicky)")

    # Texty se píšou dopředu (N6), takže nepoužitých klíčů bývá hodně: vypíšou se jen s --nepouzite
    nepouzite = [k for k in sorted(klice) if KLIC.match(k) and k not in pouzite]
    if "--nepouzite" in sys.argv:
        varovani += [f"{TABULKA.name}: klíč {k} se nikde nepoužívá" for k in nepouzite]
    elif nepouzite:
        varovani.append(f"{TABULKA.name}: {len(nepouzite)} klíčů se zatím nikde nepoužívá (vypíše je --nepouzite)")

    for v in varovani:
        print("VAROVÁNÍ:", v)
    for c in chyby:
        print("CHYBA:", c)
    print(f"\n{len(klice)} textů v tabulce, {len(chyby)} chyb, {len(varovani)} varování")
    return 1 if chyby else 0


if __name__ == "__main__":
    sys.exit(main())
