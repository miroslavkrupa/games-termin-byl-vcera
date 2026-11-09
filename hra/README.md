# Hra – kapitola 1 v Godotu

Projekt Godot 4.7 s doplňkem Popochiu 2.2.1 (MIT, `addons/popochiu`). Kapitola 1 jde dohrát od
hlavního menu po konec, chybějící grafika je zatím zástupná (D87). Stav a plán výroby jsou
v [docs/10-plan-kapitoly-1.md](../docs/10-plan-kapitoly-1.md), začátky technického prototypu
v [docs/08-prototyp-namesti.md](../docs/08-prototyp-namesti.md).

## Otevření a spuštění

Godot → **Import** → `hra/project.godot` → *Import & Edit*. Z příkazové řádky hra začne hlavním
menu:

```bash
godot --path hra
```

Myší levé tlačítko použije a pravé prohlédne. Prstem ťuknutí použije a podržení prohlédne,
v nastavení jde zapnout nabídku po ťuknutí (D43). Nastavení, ukládání a návrat do menu jsou
pod ikonou v horní liště.

## Struktura

| Složka | Obsah |
|---|---|
| `addons/popochiu/` | doplněk Popochiu (neupravovat, při aktualizaci se přepíše) |
| `grafika/mistnosti/` | pozadí místností (kopie schválených vzorků z `docs/styl/vzorky/`) |
| `grafika/postavy/` | postavy vyříznuté z referenčních listů, s průhledným pozadím |
| `texty/` | tabulka řetězců CS/EN |
| `nastroje/` | pomocné skripty |
| `game/` | místnosti, postavy a předměty Popochiu (vytvoří průvodce nastavením) |
| `game/minihry/` | minihry jako překryvná okna (řazení kartotéky, M01–M03) |
| `game/obrazovky/` | hlavní menu, karty, konec kapitoly, titulky, ukládání a nová hra (`ramec.gd`) |
| `game/spolecne/` | skripty sdílené postavami (kostra, stín) |
| `grafika/predmety/` | ikony předmětů 128 px |
| `grafika/skici/` | zástupná grafika jako SVG skici v paletě stylové bible |

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

Ladicí běh menu přeskočí a začne na náměstí. Další parametry (výchozí místnost, příznaky,
předměty, klepnutí do miniher, ukládání a načítání, úvod přes `start=Byt`, výpis stavů) popisuje
hlavička `nastroje/ladeni.gd`.

Automatický průchod kapitolou 1 od nové hry po konec, nejkratší cestou i ve variantách
z průchodu kapitoly. Hra běží bez okna a zrychleně, trvá to asi čtyři minuty. Kroky a jejich
formát jsou v `nastroje/pruchody/`:

```bash
sh hra/nastroje/pruchod.sh
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

Nasazení webové verze na GitHub Pages (export, kontrola textů a skriptů, nahrání do větve `gh-pages`):

```bash
sh hra/nastroje/nasad_web.sh
```

Před nahráním skript spustí kontrolu exportu. Ta pustí vyexportovaný balíček šablonou Godotu bez
editoru a načte všechny skripty hry. Hra spuštěná z editoru má k dispozici třídy editoru, takže
chyby, které se projeví jen v exportu, ladicí průchody nezachytí. Kontrolu jde spustit i samostatně
po exportu (potřebuje nainstalované exportní šablony):

```bash
sh hra/nastroje/kontrola_exportu.sh
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
