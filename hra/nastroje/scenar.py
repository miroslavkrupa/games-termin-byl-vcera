#!/usr/bin/env python3
"""Přehled scénáře kapitoly z tabulky textů, pro čtení nahlas a kontrolu (krok N6).

Spuštění z kořene repozitáře:  python3 hra/nastroje/scenar.py [číslo kapitoly]
Bez argumentu vygeneruje všechny kapitoly, které mají texty. Zapíše docs/kapitoly/0N-scenar.md.
Soubor se generuje, ručně se neupravuje: zdrojem textů zůstává hra/texty/texty.csv.

Texty se řadí do scén podle předpony klíče (nejdelší shoda vyhrává), uvnitř scény
v pořadí tabulky. Co nepatří nikam, skončí v části „Nezařazené“. Předměty a postavy
(klíče predmet_, postava_, obecne_) patří kapitole, která je v seznamu scén jmenuje;
kapitola 1 dostane všechny nejmenované.
"""
import csv
import pathlib
import sys

KOREN = pathlib.Path(__file__).resolve().parent.parent.parent
TABULKA = KOREN / "hra" / "texty" / "texty.csv"
SPOLECNE = ("predmet_", "obecne_", "postava_")

SCENY_1 = [
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

SCENY_2 = [
    ("Úvod a náměstí", [
        "ch2_ui_", "ch2_uvod_", "ch2_kometa_", "ch2_krabice_kometa", "ch2_amplion_", "ch2_kasna_", "ch2_budka_",
        "ch2_stanek_", "ch2_zmena_", "ch2_volba_konec", "ch2_hs_obyvatele", "ch2_obyvatele_", "ch2_obalka_zkusime",
        "ch2_krabice_zapisu", "ch2_listek_nastup_", "ch2_hs_ulice_", "ch2_ulice_", "ch2_hs_ulicka_rampa", "ch2_ulicka_",
        "ch2_dvere_prohlednout", "ch2_vytah_strih",
    ]),
    ("Staveniště rampy a brána hangáru, M04", [
        "ch2_staveniste_", "ch2_hs_rampa", "ch2_rampa_", "ch2_hs_jerab", "ch2_jerab_", "ch2_hs_lano", "ch2_lano_",
        "ch2_listek_lano_", "ch2_obalka_lano_", "ch2_hs_domichavac", "ch2_domichavac_", "ch2_hs_brana", "ch2_brana_",
        "ch2_hs_slon", "ch2_slon_", "ch2_hs_plot", "ch2_plot_", "ch2_kocour_", "ch2_hs_dvere_skladu", "ch2_sklad_",
        "ch2_hs_ulicka_namesti", "ch2_m04_",
    ]),
    ("Hangár s Archou, tabule a M07", [
        "ch2_hangar_", "ch2_bara_", "ch2_predseda_navsteva", "ch2_predseda_formular_1", "ch2_predseda_formular_2",
        "ch2_hs_archa", "ch2_archa_", "ch2_hs_kokpit", "ch2_kokpit_", "ch2_hs_kabely", "ch2_kabely_", "ch2_listek_krysy_",
        "ch2_hs_vykresy", "ch2_vykresy_", "ch2_hs_gantt", "ch2_gantt_", "ch2_hs_tabule", "ch2_tabule_", "ch2_framework_",
        "ch2_hs_cil", "ch2_cil_", "ch2_hs_kalendar", "ch2_kalendar_", "ch2_hs_stul", "ch2_stul_", "ch2_podpis_bara",
        "ch2_formular_", "ch2_predseda_prohlednout", "ch2_listek_usmev_", "ch2_predseda_obalka", "ch2_predseda_kava",
        "ch2_predseda_klic", "ch2_predseda_hangar_", "ch2_predseda_vse", "ch2_predseda_volba_co", "ch2_predseda_volba_formular",
        "ch2_hs_dilna", "ch2_dilna_", "ch2_hs_zebrik", "ch2_zebrik_", "ch2_hs_zadni_vrata", "ch2_vrata_", "ch2_magnet_", "ch2_m07_",
    ]),
    ("Hospoda U Odhadu: nábor, odhad a formulář", [
        "ch2_hospoda_", "ch2_hs_tabule_odhad", "ch2_tabule_odhad_", "ch2_kreda_", "ch2_hs_sazky", "ch2_sazky_", "ch2_listek_odhad_",
        "ch2_hs_vycep", "ch2_vycep_", "ch2_tacky_", "ch2_hs_stamgasti", "ch2_stamgasti_", "ch2_ruda_vratny_pozdeji", "ch2_sazka_",
        "ch2_kombinace_kreda_tacky", "ch2_hs_automat", "ch2_automat_", "ch2_hs_viklavy_stul", "ch2_viklavy_", "ch2_hs_hasicak",
        "ch2_hasicak_", "ch2_hs_lavice", "ch2_lavice_", "ch2_hs_inzerat", "ch2_inzerat_", "ch2_hs_dvere_hospody", "ch2_dvere_nejdriv_",
        "ch2_tym_", "ch2_kandidat_", "ch2_pepa_", "ch2_tacek_", "ch2_podpis_", "ch2_vera_", "ch2_norbert_", "ch2_klara_",
        "ch2_zdenda_", "ch2_krystof_",
    ]),
    ("Mlžná pláň a M06", [
        "ch2_plan_", "ch2_hs_mlha", "ch2_mlha_", "ch2_hs_rozcestnik", "ch2_rozcestnik_", "ch2_hs_kamen", "ch2_kamen_",
        "ch2_mapa_chybi_", "ch2_bara_mapa_", "ch2_bara_plan_", "ch2_m06_",
    ]),
    ("Kancelář Komise", [
        "ch2_komise_", "ch2_fronta_", "ch2_razitko_", "ch2_telefon_", "ch2_vytah_dolu", "ch2_predseda_", "ch2_predseda_kopie",
    ]),
    ("Nápovědy Prof. Pemboka", ["ch2_rada_"]),
    ("Předměty a kombinace", [
        "ch2_kava_prohlednout", "ch2_klic_prohlednout", "predmet_kreda", "predmet_tacky", "predmet_odhad", "predmet_krabice",
        "predmet_obalka", "predmet_formular", "predmet_list", "predmet_plan", "predmet_buchta", "ch2_buchta_", "predmet_kopie",
        "ch2_kopie_", "ch2_kombinace_",
    ]),
    ("Konec kapitoly", ["ch2_konec_", "ch2_pamet_"]),
    ("Postavy", ["postava_pepa", "postava_vera", "postava_norbert", "postava_klara", "postava_zdenda", "postava_krystof"]),
]

KAPITOLY = {1: SCENY_1, 2: SCENY_2}


def scena(sceny, klic):
    nejlepsi, delka = None, 0
    for i, (_, predpony) in enumerate(sceny):
        for p in predpony:
            if klic.startswith(p) and len(p) > delka:
                nejlepsi, delka = i, len(p)
    return nejlepsi


def jmenovane(sceny):
    """Předpony společných klíčů (predmet_, postava_, obecne_), které seznam scén jmenuje výslovně."""
    return [p for _, pp in sceny for p in pp if p.startswith(SPOLECNE) and p not in SPOLECNE]


def patri(cislo, klic):
    if klic.startswith(f"ch{cislo}_"):
        return True
    if not klic.startswith(SPOLECNE):
        return False
    if any(klic.startswith(p) for p in jmenovane(KAPITOLY[cislo])):
        return True
    # nejmenované společné klíče patří kapitole 1
    return cislo == 1 and not any(klic.startswith(p) for c, s in KAPITOLY.items() if c != 1 for p in jmenovane(s))


def bunka(text):
    return text.replace("|", "\\|")


def generuj(cislo):
    sceny = KAPITOLY[cislo]
    vystup = KOREN / "docs" / "kapitoly" / f"{cislo:02d}-scenar.md"
    radky = [r for r in csv.DictReader(TABULKA.open(encoding="utf-8")) if patri(cislo, r["keys"])]
    skupiny = {i: [] for i in range(len(sceny))}
    skupiny[None] = []
    for r in radky:
        skupiny[scena(sceny, r["keys"])].append(r)

    def soucty(rr):
        mluvene = [r for r in rr if r["_mluvci"] and "_volba_" not in r["keys"]]
        volby = [r for r in rr if "_volba_" in r["keys"]]
        return len(mluvene), len(volby), len(rr) - len(mluvene) - len(volby)

    out = [
        f"# Kapitola {cislo}: scénář",
        "",
        "> Generováno z `hra/texty/texty.csv` skriptem `hra/nastroje/scenar.py`. Neupravovat ručně:",
        "> texty se mění v tabulce a přehled se vygeneruje znovu. Krok N6",
        f"> [postupu návrhu](../12-postup-navrhu.md); osnovy jsou v [dialozích]({cislo:02d}-dialogy.md).",
        "",
        "Repliky = mluvené texty bez voleb dialogu. Popisky = názvy aktivních míst, postav a předmětů,",
        "útržky a texty miniher a GUI.",
        "",
        "| Scéna | Repliky | Volby | Popisky |",
        "|---|---|---|---|",
    ]
    celkem = [0, 0, 0]
    poradi = [*range(len(sceny)), None]
    for i in poradi:
        if not skupiny[i]:
            continue
        s = soucty(skupiny[i])
        celkem = [a + b for a, b in zip(celkem, s)]
        nazev = sceny[i][0] if i is not None else "Nezařazené"
        out.append(f"| {nazev} | {s[0]} | {s[1]} | {s[2]} |")
    out.append(f"| **Celkem** | **{celkem[0]}** | **{celkem[1]}** | **{celkem[2]}** |")

    for i in poradi:
        if not skupiny[i]:
            continue
        out += ["", f"## {sceny[i][0] if i is not None else 'Nezařazené'}", "",
                "| ID | Kdo | Emoce | Čeština | English | Poznámka |", "|---|---|---|---|---|---|"]
        for r in skupiny[i]:
            out.append("| " + " | ".join(bunka(x) for x in (
                f"`{r['keys']}`", r["_mluvci"], r["_emoce"], r["cs"], r["en"], r["_poznamka"])) + " |")
    vystup.write_text("\n".join(out) + "\n", encoding="utf-8")
    print(f"{vystup.relative_to(KOREN)}: {len(radky)} textů, {celkem[0]} replik")


def main():
    cisla = [int(a) for a in sys.argv[1:]] or sorted(KAPITOLY)
    for cislo in cisla:
        generuj(cislo)


if __name__ == "__main__":
    main()
