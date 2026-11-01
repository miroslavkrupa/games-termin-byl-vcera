# Kapitola 2: osnovy dialogů

> Krok N3e [postupu návrhu](../12-postup-navrhu.md). Co která postava hráči řekne, za jakých
> podmínek a co se tím změní. Texty první verze (N6) se napíšou až před výrobou kapitoly 2.
> Stav: **schváleno** (D69), verze 0.2 (zapracována autorská kontrola, D68)

**Poučení z kapitoly 1:** odhad 460 replik skončil na 546, tedy o 19 % víc. Rozpočet replik je
vodítko, ne strop: mírné překročení nevadí, když repliky nesou hru (autor, 2026-11-01).

## Úvod: amplion a Pembok

| Téma | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| budka | Ruda vyleze: „Nejlepší ubytování ve městě. Má dveře.“ | – | – | 2 |
| amplion | „Dnů do dopadu komety: 27.“ + starostův vzkaz: „všechno, hned, a ještě fontánu“ / „hlavně ať je to v novinách“ | `c1_slib_vseho` | – | 4 |
| tři dny pryč | Ruda: „Dvacet sedm? Vždyť bylo třicet!“ Pembok: „Fronta na frontu trvala dva dny. Stál jsi v ní.“ (K8) | – | – | 2 |
| Pembok | plán, lidi, razítko; „Plán mám.“ „Na co?“ „Na všechno.“ | – | – | 5 |

## Prof. Pembok (nápověda)

| Téma | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| nápovědy | 3 stupně pro P2.1–P2.8 podle [karet puzzlů](02-puzzly.md) | podle stavu | – | 24 |
| chybějící vstupy M06 | co ještě chybí: rozdělení, krabice, odhad | u zadních vrat | – | 3 |
| nesmysly na tabuli | „Tohle přišlo od starosty. Od tebe, vlastně.“ | `c1_slib_vseho` ≥ 3, bez `c1_mimo_rozsah` | – | 2 |
| fontána mimo | „Fontánu máš v papíru mezi věcmi, které na Archu nepatří. Aspoň něco.“ (K12) | `c1_slib_vseho` ≥ 3 a `c1_mimo_rozsah` | – | 1 |
| přeskočení minihry | M04: naporcuje „tak nějak“; M06: „rovná čára“ | přeskočení | – | 2 |

## Bára

| Téma (volba) | Podstata odpovědi | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| první setkání v hangáru | vysoká důvěra: kývne, „Trup je o 40 cm kratší než na výkresu. Aspoň něco víme.“ / nízká: měří a neodpoví | `c1_bara_vyslechnuta` | – | 4 |
| Jak jste se sem dostala? | „Zadem. Přes mlhu. Tudy nikdo jiný nechodí.“ (K1) | – | – | 2 |
| Co měříte? | trup, výkresy, rozdíl mezi nimi | – | – | 3 |
| krabice od bot | „Tu krabici jsem zakládala já. Nikdo mi do ní nedovolil nic napsat.“ (K14) | krabice | – | 2 |
| Gantt na stěně | „Úterý? Řídicí systém do úterý? Kterého roku?“ | po Ganttu | – | 3 |
| kandidáti | „Ptej se, co umějí. Ne jestli jsou milí.“ | ≥ 2, před R2.1 | – | 3 |
| tabule | „Neptej se, z čeho to je. Ptej se, jestli víme, co lidi chtějí, a kolik stojí to předělat.“ | ≥ 2, u tabule | – | 3 |
| reakce na R2.2 | `povaha`: první úsměv; `gantt`: odejde od tabule; `krabice`: „Tak to si budu zkoušet sama.“ | po R2.2 | Bářina důvěra | 4 |
| odhad | „Když se zeptáš všech najednou, odpoví ti první, kdo promluví.“ | ≥ 2, před P2.3 | – | 2 |
| Mlžná pláň | vysvětlí první kolo M06 na příkladu | M06 | – | 4 |
| rady v M06 | „Řeku dál než kousek nekresli.“, „Tady se musíme potkat.“ (most) | ≥ 2 | – | 6 |
| po M06 | „Zbývá dvacet pět. …Uvidíme.“ (zárodek, ne slib; termín poprvé řekne až v epilogu, D60, K9) | `c2_mosty` ≥ 2 | Bářina důvěra | 2 |
| formulář | „Podepíšu, až ho přeměřím.“ (podepíše) | formulář | – | 2 |

## Kandidáti do týmu

Každý kandidát: uvítání, „Co umíte?“, zkouška u věci v hospodě, „Chcete do týmu?“, reakce
na přijetí a odmítnutí. Pro členy týmu navíc 1–2 repliky u tabule a podpis formuláře.

| Postava | Témata a zkouška | Podstata | Mění | Odhad |
|---|---|---|---|---|
| **Pepa „Dva dny“** | Co umíte? / automat / kolik to potrvá / do týmu | „Dva dny.“ na všechno; automat opraví po kouskách za minutu; „Ty dva dny jsou na jistotu.“ | `c2_tym` | 16 |
| **Věra Výztužná** | Co umíte? / viklavý stůl / razítka / do týmu | spočítá podložku na milimetr a chce na ni razítko; u tabule hájí rampu a trup | `c2_tym` | 14 |
| **Norbert Norma** | Co umíte? / hasicí přístroj / bezpečnostní systém / do týmu | mluví v normách („Podle normy o normách…“); jediný smí podepsat start; „Bezpečnostní systém se mění jen s novým podpisem. Podpis trvá tři týdny.“ (stopa R2.2) | `c2_tym` | 15 |
| **Klára Maketová** | Co umíte? / lavice u okna / kajuty / do týmu | ptá se štamgastů každého zvlášť (stopa P2.3), postaví maketu z tácků, nerozhodne se; „Nikdo neví, jak chce spát, dokud si nelehne.“ (stopa R2.2) | `c2_tym` | 15 |
| **Zdenda Známý** | Odkud se známe? / viklavý stůl / jeřáb / do týmu | „Znám chlapa, co zná truhláře.“; ví, že průkaz na jeřáb má vrátný (stopa ke konci) | `c2_tym` | 13 |
| **Kryštof Krabička** | Co umíte? / porada / Framework / do týmu | rozdává lepicí lístky, svolá poradu o tom, kdy bude porada; s Frameworkem „dva v jednom“ | `c2_tym` | 12 |
| potvrzení týmu | u dveří: „Tým: …, platí?“; Ruda vyhlásí tým; před hangárem: „Nejdřív se podívám, co ta Archa vůbec potřebuje.“ (K2) | 4 vybraní | `c2_tym_pokryti` | 4 |
| tácky týmu | každý člen píše odhad po svém; Zdenda „zeptám se chlapa“, Kryštof „po poradě“ (K3) | P2.3 | – | 6 |
| tým u tabule | 1 věta každého člena k rozdělení podle role | po R2.1 | – | 8 |
| podpisy formuláře | každý podepíše po svém | P2.6 | – | 4 |

## Štamgasti

| Téma | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| uvítání | odhadují všechno, hlavně cizí práci | – | – | 3 |
| sázka na rampu | Pepa „dva dny“, ostatní „tři?“, „dva a půl!“ | po R2.1 | – | 5 |
| tácky | štamgasti nedostanou: „Oni rampu stavět nebudou.“; tým otočí tácky: 12 (Ruda), 14, 15, 15, 18; Ruda: „Patnáct.“ | tácky | `c2_odhad`=`realny` | 5 |
| přijmout kotvu | Ruda: „Slyšeli jste. Dva dny.“ štamgasti si připíjejí | volba | `c2_odhad`=`kotva` | 2 |
| jeřáb | „Průkaz má jen jeden člověk. A ten hlídá dveře.“; Ruda: „Zeptám se ho, až bude jeřáb potřeba.“ (K15) | – | stopa ke konci | 3 |

## Ing. Framework

| Téma (volba) | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| příchod k tabuli | kufr krabic: „Beton v krabici“, „Rampa každé dva týdny nová“ (K7) | první použití tabule | – | 3 |
| Co je v krabici? | jedna krabice na všechno, „každé dva týdny ji přejmenujeme“ | – | – | 3 |
| A na beton? | „Beton taky jen potřebuje víc porad.“ | – | – | 2 |
| krabice přijata | přikryje tabuli: „Teď je všechno v krabici. Hlavně se do ní nedívejte.“ | volba | `c2_rozdeleni`=`krabice` | 2 |
| krabice odmítnuta | „Tak příště. Já mám čas. Vy ne.“; odchází „za jedním klientem nahoru“ (náznak, kap. 4) | po R2.2 | – | 2 |
| Kryštof v týmu | „Kryštof vám ji tam stejně nastěhuje.“ | Kryštof v `c2_tym` | – | 1 |
| ★ s předměty | obálka (chce ji), káva, plán | | | 3 |

## Předseda Věčný

| Téma (volba) | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| kontrolní návštěva v hangáru | „Výborně, výborně. Nespěchejte.“ (úsměv) | do R2.2 | – | 3 |
| formulář | „Ještě drobnost, kvůli tomu hnědému razítku.“ | `c1_razitko`=`kava` | formulář | 3 |
| Co tu děláte? | „Jen se dívám, jak to jde. Pomalu? Výborně.“ | – | – | 2 |
| po R2.2 | zapíše si rozdělení do notýsku a odejde | po R2.2 | – | 2 |
| Komise bez plánu | „Vítám. Ale co mám orazítkovat? Vaše nadšení?“ | bez plánu | – | 2 |
| plán cesty | „Vítám. Vítám.“; k mostům: „Mosty se u nás staví v páté fázi.“ | plán | – | 4 |
| fáze 2 | „Máte podepsáno: …a následné fáze. Připíšu fázi 2 za start.“ / „Já mám papír, vy máte názor.“ | `c1_faze2` | – | 4 |
| list „Den dopadu“ | „To by byla krátká fáze.“ „fáze 2: pozastavena“ | list | – | 3 |
| formulář odevzdán | „Tři podpisy. Hnědá je tímto uznána. Prozatím.“ | formulář | – | 2 |
| razítko | „Vítám.“ (konec kapitoly) | – | `plan_orazitkovan` | 1 |

## Pan Změna

| Téma (volba) | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| Co prodáváte? | dnes jen věci, které nemá | – | – | 2 |
| Archa | s dohodou: „Modrou. Pořád. Podepsal jsem to.“ / bez dohody: dnes ji chce se střechou, bez střechy | `c1_zmena_dohoda` | – | 3 |
| ★ obálka | „Prodávám jen to, co dnes nemám.“ | | | 1 |

## Obyvatelé s kufry, vrátný, babička

| Postava | Podstata | Podmínka | Odhad |
|---|---|---|---|
| obyvatelé s kufry | „Kudy se nastupuje?“ „To nám řekněte vy.“; s krabicí lístek | – | 4 |
| vrátný (konec) | „Nikdo se nikdy nezeptal. Tak jsem přišel sám.“, se stopou „Prý jste se chtěl zeptat. To je víc, než kolik jsem slyšel za třicet let.“ (K15); o laně podle R2.3, prasklé: „Lano? Drží. Zatím.“ (K18) | konec | 7 |
| babiččin plot | `spojenec` mávání a buchta / `odmitnuta` zatažená záclona / `prehlizena`, `neodhalena` prádlo (K10) | `c1_babicka` | 4 |
| kocour | krabice nebo obálka: „Tenhle krysy nehoní. Ten soudí lidi.“ (K11) | – | 2 |

## Ruda a prohlížení

| Skupina | Podstata | Odhad |
|---|---|---|
| prohlédnutí aktivních míst ve všech scénách | podle [obsahu místností](02-mistnosti.md), asi 45 míst | 48 |
| prohlédnutí předmětů | 13 předmětů (4 z kap. 1 mají nový popis) | 13 |
| zapsání do krabice | „To si zapíšu.“ + 5 lístků + kometa a slon | 8 |
| vlastní reakce ★ z matice | podle [matice předmětů](02-mistnosti.md#matice-předmětů) | 52 |
| cíl nad tabulí | „Všechny. Ne jen ty, co umějí číst výkresy.“ (K13) | 1 |
| Gantt zbytkem křídy | „Kousek zbyl. Na Gantt vždycky zbyde.“ (K19) | 1 |
| Gantt na stěně, tabule, potvrzení R2.2 | „Gantt na všechno. Jako vždycky.“, vracení magnetů | 12 |
| výchozí reakce | sada z kap. 1 (`obecne_*`) se použije znovu | 0 |
| konec kapitoly | beton, jeřáb, „Fáze 1 začala.“ | 5 |

## Minihry

| Minihra | Texty | Odhad |
|---|---|---|
| M04 Jak sníst slona | 18 karet kusů (popisky), reakce na mezeru, překryv, velký kus a mlhu | 12 replik + 18 popisků |
| M07 Krabice od bot | 5 lístků (popisky), reakce na obálku a *Zkusíme* | 10 replik + 6 popisků |
| M06 Mapa do neznáma | dlaždice a mosty (popisky), reakce na rozplynutí, most drží / nedrží; kotva: „Dva dny… a ještě třináct.“ (K5) | 14 replik + 20 popisků |

## Konec kapitoly a obrazovka následků

Obrazovka „Co si Nedostavěnice zapamatovala“ (popisky, ne repliky): tým (2 varianty podle
pokrytí), rozdělení (3), riziko předem (3), mapa (2), odhad (2). Celkem asi 12 vět.

## Součet

| Skupina | Odhad replik |
|---|---|
| úvod a Pembok | 45 |
| Bára | 40 |
| kandidáti a tým | 107 |
| štamgasti | 18 |
| Ing. Framework | 16 |
| Předseda | 26 |
| Pan Změna, obyvatelé, vrátný, babička, kocour | 23 |
| Ruda a prohlížení | 140 |
| minihry | 36 |
| **Celkem** | **≈ 451 na jazyk** |

Rozpočet je 400–500 (D56). K tomu asi 44 popisků miniher, 12 vět obrazovky následků a GUI.
Nejdražší je nábor (107 replik). Když se v N6 ukáže, že je to moc, škrtají se nejdřív třetí
témata kandidátů a vlastní reakce ★.
