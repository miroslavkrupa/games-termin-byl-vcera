#!/usr/bin/env python3
"""Přehled scénáře kapitoly z tabulky textů, pro čtení nahlas a kontrolu (krok N6).

Spuštění z kořene repozitáře:  python3 hra/nastroje/scenar.py
Zapíše docs/kapitoly/01-scenar.md. Soubor se generuje, ručně se neupravuje: zdrojem textů
zůstává hra/texty/texty.csv.

Texty se řadí do scén podle předpony klíče (nejdelší shoda vyhrává), uvnitř scény
v pořadí tabulky. Co nepatří nikam, skončí v části „Nezařazené“.
"""
import csv
import pathlib

KOREN = pathlib.Path(__file__).resolve().parent.parent.parent
TABULKA = KOREN / "hra" / "texty" / "texty.csv"
VYSTUP = KOREN / "docs" / "kapitoly" / "01-scenar.md"

SCENY = [
    ("Úvod: Rudův byt", ["ch1_uvod_", "ch1_byt_", "ch1_hs_byt_", "ch1_veritel_"]),
    ("Náměstí", [
        "ch1_rozhlas_", "ch1_hs_amplion", "ch1_amplion_", "ch1_pembok_otevreni", "ch1_pembok_ukol",
        "ch1_pembok_001", "ch1_ruda_001", "ch1_ruda_002", "ch1_hs_kasna", "ch1_kasna_", "ch1_hs_budka",
        "ch1_budka_", "ch1_hs_dvere", "ch1_dvere_", "ch1_hs_kometa", "ch1_kometa_", "ch1_hs_stanek",
        "ch1_stanek_", "ch1_zmena_", "ch1_kombinace_pero", "ch1_plakat_", "ch1_hs_ulicka", "ch1_ulicka_",
        "ch1_kocour_", "ch1_bara_", "ch1_ruda_020",
    ]),
    ("Vestibul radnice", [
        "ch1_vestibul_", "ch1_vratny_", "ch1_hs_vytah", "ch1_vytah_", "ch1_ruda_010", "ch1_hs_schody_nahoru",
        "ch1_schody_nahoru_", "ch1_hs_deska", "ch1_deska_", "ch1_hs_schody_sklep", "ch1_schody_sklep_",
        "ch1_hs_ven",
    ]),
    ("Archiv", [
        "ch1_archiv_", "ch1_hs_schody", "ch1_schody_", "ch1_hs_kartoteka", "ch1_kartoteka_", "ch1_listek_",
        "ch1_hs_kniha", "ch1_kniha_", "ch1_hs_regal", "ch1_regal_", "ch1_hs_mapnik", "ch1_mapnik_",
        "ch1_hs_hluboky_regal", "ch1_hluboky_regal_", "ch1_hs_pouceni", "ch1_pouceni_", "ch1_lumir_",
        "postava_lumir",
    ]),
    ("Archiv: úsek za Báru", ["ch1_usek_", "obecne_bara_", "predmet_metr", "predmet_seznam"]),
    ("Starostova pracovna a M03", [
        "ch1_pracovna_", "ch1_starosta_", "postava_starosta", "ch1_hs_noviny", "ch1_noviny_", "ch1_hs_fotky",
        "ch1_fotky_", "ch1_hs_okno", "ch1_okno_", "ch1_m03_", "ch1_pembok_rada_starosta_pred",
    ]),
    ("Kancelář Komise, M01 a M02", [
        "ch1_komise_", "ch1_predseda_", "postava_predseda", "ch1_framework_", "postava_framework", "ch1_ruda_09",
        "ch1_hs_fronta", "ch1_fronta_", "ch1_hs_cedule", "ch1_cedule_", "ch1_ui_komise", "ch1_hs_razitko",
        "ch1_razitko_", "ch1_hs_stul", "ch1_stul_", "ch1_hs_telefon", "ch1_telefon_", "ch1_m01_", "ch1_m02_",
        "ch1_pembok_m02",
    ]),
    ("Babiččina chaloupka", [
        "ch1_chaloupka_", "ch1_babicka_", "postava_babicka", "ch1_hs_plot", "ch1_plot_", "ch1_hs_rampa",
        "ch1_rampa_", "ch1_hs_lavicka", "ch1_lavicka_", "ch1_hs_ulicka_zpet",
    ]),
    ("Nápovědy Prof. Pemboka", ["ch1_pembok_rada_"]),
    ("Předměty a kombinace", ["predmet_", "ch1_kombinace_", "ch1_dekret_"]),
    ("Konec kapitoly", ["ch1_konec_", "ch1_pamet_"]),
    ("Výchozí reakce, postavy a GUI", ["obecne_", "postava_", "ch1_ui_"]),
]


def scena(klic):
    nejlepsi, delka = None, 0
    for i, (_, predpony) in enumerate(SCENY):
        for p in predpony:
            if klic.startswith(p) and len(p) > delka:
                nejlepsi, delka = i, len(p)
    return nejlepsi


def bunka(text):
    return text.replace("|", "\\|")


def main():
    radky = [r for r in csv.DictReader(TABULKA.open(encoding="utf-8"))
             if r["keys"].startswith(("ch1_", "predmet_", "obecne_", "postava_"))]
    skupiny = {i: [] for i in range(len(SCENY))}
    skupiny[None] = []
    for r in radky:
        skupiny[scena(r["keys"])].append(r)

    def soucty(rr):
        mluvene = [r for r in rr if r["_mluvci"] and "_volba_" not in r["keys"]]
        volby = [r for r in rr if "_volba_" in r["keys"]]
        return len(mluvene), len(volby), len(rr) - len(mluvene) - len(volby)

    out = [
        "# Kapitola 1: scénář",
        "",
        "> Generováno z `hra/texty/texty.csv` skriptem `hra/nastroje/scenar.py`. Neupravovat ručně:",
        "> texty se mění v tabulce a přehled se vygeneruje znovu. Krok N6",
        "> [postupu návrhu](../12-postup-navrhu.md); osnovy jsou v [dialozích](01-dialogy.md).",
        "",
        "Repliky = mluvené texty bez voleb dialogu. Popisky = názvy aktivních míst, postav a předmětů,",
        "útržky a texty miniher a GUI.",
        "",
        "| Scéna | Repliky | Volby | Popisky |",
        "|---|---|---|---|",
    ]
    celkem = [0, 0, 0]
    poradi = [*range(len(SCENY)), None]
    for i in poradi:
        if not skupiny[i]:
            continue
        s = soucty(skupiny[i])
        celkem = [a + b for a, b in zip(celkem, s)]
        nazev = SCENY[i][0] if i is not None else "Nezařazené"
        out.append(f"| {nazev} | {s[0]} | {s[1]} | {s[2]} |")
    out.append(f"| **Celkem** | **{celkem[0]}** | **{celkem[1]}** | **{celkem[2]}** |")

    for i in poradi:
        if not skupiny[i]:
            continue
        out += ["", f"## {SCENY[i][0] if i is not None else 'Nezařazené'}", "",
                "| ID | Kdo | Emoce | Čeština | English | Poznámka |", "|---|---|---|---|---|---|"]
        for r in skupiny[i]:
            out.append("| " + " | ".join(bunka(x) for x in (
                f"`{r['keys']}`", r["_mluvci"], r["_emoce"], r["cs"], r["en"], r["_poznamka"])) + " |")
    VYSTUP.write_text("\n".join(out) + "\n", encoding="utf-8")
    print(f"{VYSTUP.relative_to(KOREN)}: {len(radky)} textů, {celkem[0]} replik")


if __name__ == "__main__":
    main()
