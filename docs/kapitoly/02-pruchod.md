# Kapitola 2: průchod hrou

> Krok N3b [postupu návrhu](../12-postup-navrhu.md). Každá akce hráče na samostatném řádku.
> Z průchodu vznikne v kroku N7 automatický test pro `ladeni.gd`. Scény a předměty jsou
> v [obsahu místností](02-mistnosti.md), puzzly v [kartách](02-puzzly.md).
> Stav: **schváleno** (D69), verze 0.2 (zapracována autorská kontrola, D68)

Formát: `č. scéna · kdo · akce → výsledek · příznak`. Akce: *prohlédni*, *použij*, *mluv*,
*vezmi*, *použij X na Y*, *jdi*.

**Výchozí stav nejkratší cesty:** „dobrá“ kapitola 1: `c1_bara_vyslechnuta`=3, `c1_slib_vseho`=0,
`c1_mimo_rozsah`, `c1_faze2`=false, `c1_razitko`=`poduska`, `c1_babicka`=`spojenec`.

## 1. Nejkratší cesta

```text
 1. S1 · cutscéna · titulek; Ruda vyleze z budky; amplion: 27 dní a starostův vzkaz; „Vždyť bylo třicet!“ „Fronta na frontu trvala dva dny.“; Pembok: plán, lidi, razítko
 2. S1 · Ruda · jdi Ulice k hospodě → S4
 3. S4 · Ruda · vezmi Tabule „Odhad dne“ → křída
 4. S4 · Ruda · vezmi Výčep → tácky
 5. S4 · Ruda · mluv Pepa → „Co byste udělal s automatem?“ → „dva dny“, za minutu hraje
 6. S4 · Ruda · mluv Věra → zkouška: viklavý stůl
 7. S4 · Ruda · mluv Norbert → zkouška: hasicí přístroj; „Bezpečnostní systém se mění jen s novým podpisem.“
 8. S4 · Ruda · mluv Klára → zkouška: lavice u okna; „Nikdo neví, jak chce spát, dokud si nelehne.“
 9. S4 · Ruda · jdi Dveře → S1 → Ulička k rampě → S2
10. S2 · Ruda · použij Klíč od hangáru na Brána → slon
11. S2 · Ruda · použij Křída na Slon → M04: kamenná půlka bez mezer a překryvů, mlžná jen nejbližší kousky · c2_rozpad=0
12. S2 · Ruda · jdi Brána → S3; Ruda kreslí zbytkem křídy Gantt na stěnu; Bára měří (přišla zadem přes mlhu); Předseda u vrat
13. S3 · Ruda · vezmi Kokpit Archy → krabice od bot, obálka „Na nepředvídané“
14. S3 · Ruda · prohlédni Kabely pod Archou → lístek „krysy“
15. S3 · Ruda · prohlédni Předseda → lístek „úsměv“
16. S3 · Ruda · jdi Brána → S2
17. S2 · Ruda · prohlédni Lano jeřábu → lístek „lano“
18. S2 · Ruda · jdi Ulička → S1 → Ulice k hospodě → S4
19. S4 · Ruda · mluv Pepa, Věra, Norbert, Klára → „Chcete do týmu?“ ×4
20. S4 · Ruda · jdi Dveře → „Tým: Věra, Pepa, Norbert, Klára. Platí?“ → ano · c2_tym, c2_tym_pokryti=3
21. S4 · Ruda · použij Sázková tabule → štamgasti a Pepa: „dva dny“ (kotva)
22. S4 · Ruda · použij Tácky na Věra, Pepa, Norbert, Klára → odhady potají: 12 (Ruda), 14, 15, 15, 18 → odhad na tácku „15“ · c2_odhad=realny
23. S4 · Ruda · jdi Dveře → S1 → S2 → S3; tým přijde z hospody
24. S3 · Ruda · použij Tabule → Framework přijde s kufrem; Bára: „Ptej se, jestli víme, co lidi chtějí, a kolik stojí to předělat.“
25. S3 · Ruda · použij Tabule → Rozdělit část po části → řídicí systém, aplikace, nástup, interiér k Báře; rampa, trup, pohon, bezpečnostní systém k Rudovi; odmítnout krabici; potvrdit · c2_rozdeleni=povaha, c2_vyjimky=2; Předseda a Framework odejdou
26. S3 · Ruda · použij Krabice od bot na Stůl → M07: obálka na lano · c2_riziko_predem=lano, c2_rizika_zapsana=[krysy, usmev, lano]
27. S3 · Ruda · jdi Zadní vrata → S5
28. S5 · Ruda · použij Místo na mapu → M06 s Bárou: cesta 5 sloupců, řeka nahrubo, 3 mosty · c2_mosty=3 → plán cesty ke startu
29. S5 · Ruda · jdi Zadní vrata → S3 → S2 → S1
30. S1 · Ruda · jdi Dveře radnice → S6
31. S6 · Ruda · použij Plán cesty na Předseda → „Vítám. Vítám.“ → razítko
32. S2 · cutscéna · beton čeká, jeřáb stojí; vrátný přijde sám; první beton; kometa je větší; obrazovka následků · konec kapitoly
```

32 kroků. Tým jde potvrdit až po prvním příchodu do hangáru (K2), proto se hráč do hospody vrací. Odhad 50–60 minut: hospoda (6 kandidátů) a tři minihry jsou delší než kroky
kapitoly 1. Přesně se délka změří až v N8 (D66).

## 2. Úplná cesta

Navíc proti nejkratší cestě (vloženo na místa, kde dává smysl):

```text
 S1 · Ruda · použij Telefonní budka → linka pomoci, 4 812. v pořadí
 S1 · Ruda · prohlédni Kometa, Kašna, Amplion
 S1 · Ruda · mluv Pan Změna → modrá (s dohodou z kap. 1), nebo pokaždé jiná Archa
 S1 · Ruda · mluv Obyvatelé s kufry → „Kudy se nastupuje?“ „To nám řekněte vy.“
 S1 · Ruda · prohlédni Obyvatelé s kufry (s krabicí) → lístek „nástup“
 S4 · Ruda · mluv Zdenda → všechna témata; „Průkaz na jeřáb má v tomhle městě jeden člověk. Hlídá dveře.“ Ruda: „Zeptám se ho, až bude jeřáb potřeba.“
 S4 · Ruda · mluv Kryštof → porada o tom, kdy bude porada
 S4 · Ruda · prohlédni Inzerát → kočka „na všechno připravená“
 S4 · Ruda · prohlédni Pepa (s krabicí) → lístek „odhad“
 S2 · Ruda · prohlédni Rampa, Jeřáb, Domíchávač, Babiččin plot → buchta (spojenec); použij Krabice na Kocour → ★
 S3 · Ruda · prohlédni Archa, Výkresy z roku 1994, Rudův Gantt, Kalendář
 S3 · Ruda · mluv Bára → všechna témata („Jak jste se sem dostala?“); použij Krabice na Bára → „Tu krabici jsem zakládala já.“
 S3 · Ruda · mluv Framework → všechny krabice („Beton v krabici“, „Rampa každé dva týdny nová“)
 S3 · Ruda · mluv Předseda → kontrolní návštěva
 S5 · Ruda · prohlédni Mlha, Rozcestník
 S6 · Ruda · prohlédni Fronta, Razítko
```

Odhad úplné cesty 65–75 minut (rozpočet 55–75, D56).

## 3. Varianty

### Volby v kapitole 2

| Varianta | Odlišné kroky | Příznaky a následek |
|---|---|---|
| **A Gantt na všechno** (R2.2) | 25: „Nechat, jak to je“ a potvrdit | `c2_rozdeleni`=`gantt`, `c2_vyjimky`=0; Bára odejde od tabule; M06 bez řeky, `c2_mosty` ≤ 1 |
| **B Krabice na všechno** (R2.2) | 25: přijmout krabici | `c2_rozdeleni`=`krabice`; M06 bez pevných bodů, `c2_mosty` ≤ 1; kap. 3 sprinty betonování |
| **C „Železo k Rudovi“** (R2.2) | 25: bezpečnostní systém k Báře, interiér k Rudovi | `povaha`, `c2_vyjimky`=0; v M06 bezpečnostní systém nestihne podpis a interiér se překresluje |
| **D Kotva** (P2.3) | 22: přijmout „dva dny“ | `c2_odhad`=`kotva`; v M06 se rampa natáhne až po odkrytí 2. sloupce („…a ještě třináct“), most *zkouška nástupu* nemá pevný bod, `c2_mosty` ≤ 2 |
| **E Tým z kamarádů** (R2.1) | 19: Zdenda a Kryštof místo Norberta a Kláry | `c2_tym_pokryti`=2 (chybí podpis startu); na tácky Zdenda „zeptám se chlapa“, Kryštof „po poradě“, prostřední z čísel je 15; Kryštof u tabule radí krabici |
| **F Bez statičky** (R2.1) | 19: bez Věry | `c2_tym_pokryti`=2 (chybí stavba, K17); v kap. 3 puzzle oklikou |
| **G Riziko předem: krysy / úsměv** (R2.3) | 26: obálka na jiný lístek | `c2_riziko_predem`=`krysy` (kočka v kap. 3) / `usmev` (kopie, kap. 4); lano zůstane prasklé, vrátný na konci: „Lano? Drží. Zatím.“ |
| **H Hledání minimum** (M07) | jen 3 lístky | `c2_rizika_zapsana` má 3 položky; v kap. 3–4 nezapsané věci zaskočí |
| **I Přeskočené minihry** | 11, 28: přeskočit | `c2_rozpad`=3, `c2_mosty`=1 |

### Stav z kapitoly 1 („špatná“ kapitola 1)

Výchozí stav: `c1_bara_vyslechnuta`=0, `c1_slib_vseho`=4, bez `c1_mimo_rozsah`, `c1_faze2`=true,
`c1_razitko`=`kava`, `c1_babicka`=`prehlizena`.

| Krok | Odlišnost |
|---|---|
| 1 | amplion: „Starosta vzkazuje: všechno, hned, a ještě fontánu.“ |
| 12 | Předseda u vrat předá formulář „k uznání hnědé barvy“ |
| 12, 24 | Bára měří a mlčí; u tabule nic neporadí; v M06 kreslí řeku mlčky; nad tabulí nevisí cíl z papíru o Arše |
| 25 | na tabuli navíc Fontána, Bazén, Terasa; hráč je musí sundat (Pembok: „Tohle přišlo od starosty. Od tebe, vlastně.“) |
| po 23 | použij Formulář na tři z týmu → podepsaný formulář (P2.6) |
| 31 | Předseda: „A fáze 2 za start.“ → jdi S3, vezmi Kalendář → list „Den dopadu“ → S6, použij List na Předseda → „fáze 2: pozastavena“ → razítko |
| S2 | babiččin plot: jen prádlo, nikdo nemává |

Kapitola jde dohrát; „špatná“ kapitola 1 ji prodlouží asi o 10 minut (formulář, fáze 2,
nesmysly na tabuli) a bez Bářiných rad je těžší R2.2 a M06.

**Automatický test (N7):** nejkratší cesta, „špatná“ kapitola 1 a varianty A, B, D, E, I jako
samostatné sekvence pro `ladeni.gd`. Každá končí kontrolou příznaků.

## Kontrola slepých uliček

- [x] Křída a tácky leží v hospodě od začátku a jdou vzít znovu. M04 jde přeskočit.
- [x] Tabuli nejde potvrdit bez týmu, ale tým jde sestavit kdykoli po prvním příchodu do hangáru;
  hospoda je otevřená celou kapitolu.
- [x] Odhad má dvě cesty (tácky, kotva); kotva jen zhorší M06.
- [x] M07 jde otevřít se třemi lístky z pěti; aspoň jeden z nich je vždy krysy, lano, nebo úsměv,
  takže R2.3 má vždy volbu.
- [x] Předseda odejde z hangáru po R2.2. Kdo si do té doby nezapsal úsměv, má ještě 4 jiné
  lístky. Formulář předá Předseda hned při prvním příchodu do hangáru, takže ho nejde minout.
- [x] M06 jde dokončit s jakýmkoli R2.2 i s kotvou (s kotvou nejvýš 2 mosty, s Ganttem nebo
  krabicí nejvýš 1). Jde přeskočit.
- [x] Fáze 2: list kalendáře leží v hangáru, hangár je otevřený celou kapitolu.
- [x] Formulář: tým má vždy 4 lidi, podpisy stačí 3.
- [x] Do Komise jde kdykoli; bez plánu Předseda jen „vítá“ a pošle Rudu pryč. Není to slepá ulička.

## Šířka grafu

| Úsek | Rozdělané úkoly |
|---|---|
| po úvodu | slon (křída), hospoda (3 úkoly v jedné scéně: nábor, křída, tácky) (2) |
| po otevření hangáru | nábor (teď jde potvrdit), odhad, krabice a hledání, rozdělení (3–4) |
| po R2.1 a R2.2 | M07, odhad, formulář (1–3) |
| Mlžná pláň → Komise → konec | 1 (lineární závěr, záměrně krátký) |
