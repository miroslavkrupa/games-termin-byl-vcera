# Hra – technický prototyp „Náměstí“

Projekt Godot 4.7 s doplňkem Popochiu 2.2.1 (MIT, `addons/popochiu`). Plán a otázky prototypu
jsou v [docs/08-prototyp-namesti.md](../docs/08-prototyp-namesti.md).

## Otevření

Godot → **Import** → `hra/project.godot` → *Import & Edit*.

## Struktura

| Složka | Obsah |
|---|---|
| `addons/popochiu/` | doplněk Popochiu (neupravovat, při aktualizaci se přepíše) |
| `grafika/mistnosti/` | pozadí místností (kopie schválených vzorků z `docs/styl/vzorky/`) |
| `grafika/postavy/` | postavy vyříznuté z referenčních listů, s průhledným pozadím |
| `texty/` | tabulka řetězců CS/EN |
| `nastroje/` | pomocné skripty |
| `game/` | místnosti, postavy a předměty Popochiu (vytvoří průvodce nastavením) |

## Nástroje

Všechny se spouštějí z kořene repozitáře.

Založení objektu Popochiu bez editoru (příkazy a souřadnice jsou v hlavičce skriptu):

```bash
godot --headless --path hra -- vytvor mistnost Archiv
```

Spuštění hry se snímkem obrazovky (pro ověřování; `dojdi` pošle hráčovu postavu na místo,
`akce` klepne na aktivní místo, `volby` vybírá volby dialogu, `pouzij` použije předmět, `animace` přehraje
akci postavy, `serie` uloží řadu snímků (s výpisem stavu animace),
`jazyk` přepne jazyk; kroky běží za sebou a každý počká, až hra dokončí předchozí):

```bash
godot --path hra -- snimek=/tmp/snimek.png jazyk=en cekej=3 akce=DvereRadnice:pouzit,Kartoteka:pouzit po=1
```

Texty jsou v `texty/texty.csv`; každý řádek musí mít češtinu i angličtinu. Po úpravě tabulky
je potřeba import (editor ho udělá sám, z příkazové řádky `godot --headless --path hra --import`)
a kontrola překladů:

```bash
python3 hra/nastroje/kontrola_textu.py
```

ID textů hry mají předponu podle místa použití (`ch1_`, `predmet_`, `postava_`, `obecne_`, `ui_`).
Texty šablony GUI Popochiu mají jako klíč svůj anglický text.

Zástupné ikony předmětů (do doby, než je nahradí AI grafika):

```bash
godot --headless --path hra --script res://nastroje/zastupne_ikony.gd
```

Nasazení webové verze na GitHub Pages (export, kontrola textů, nahrání do větve `gh-pages`):

```bash
sh hra/nastroje/nasad_web.sh
```

Hra pak běží na https://miroslavkrupa.github.io/games-termin-byl-vcera/ (nasazení trvá asi minutu).

Rozdělení listu s částmi postavy na samostatné obrázky (pak doplnit body kloubů do skriptu postavy,
viz `POPIS` v `game/characters/ruda/character_ruda.gd`):

```bash
godot --headless --path hra --script res://nastroje/rozdel_casti.gd -- <list.png> <složka> [předpona]
```

Zpracování všech animací postavy z listů v `docs/styl/vzorky/` (rozřezání, zarovnání, uložení do
`grafika/postavy/<postava>_<sada>/`):

```bash
sh hra/nastroje/zpracuj_animace.sh ruda
```

Zarovnání kreslených fází animace (chodidla na jednu čáru, trup na jednu svislici):

```bash
godot --headless --path hra --script res://nastroje/sestav_faze.gd -- <složka s fázemi> <výstupní složka>
```

Vyříznutí postavy z referenčního listu (odstraní bílé pozadí):

```bash
godot --headless --path hra --script res://nastroje/vyrez_postavy.gd -- <vstup.png> <výstup.png> <x> <y> <šířka> <výška>
```
