# Kapitola 5: osnovy dialogů

> Krok N3e [postupu návrhu](../12-postup-navrhu.md). Co která postava hráči řekne, za jakých
> podmínek a co se tím změní. Texty první verze (N6) se napíšou až před výrobou kapitoly 5.
> Stav: **hotovo** (schváleno v D79, kontrola N4 zapracována v D80), verze 0.2

**Rozpočet:** 200–300 replik na jazyk (D56). Rozpočet replik je vodítko, ne strop (D68).
Kapitola 5 má čtyři konce, tři varianty Bářina epilogu a scénu po titulcích. Ty v jednom
průchodu uslyší hráč jen jednou.

## Úvod, Pembok, přepínání a vysílačka

| Téma | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| úvod | záběry 1–4 z [návrhu](05-uzavreni.md#úvod-poslední-ráno-12-min): amplion „nula“, „Konečně termín, který nikdo neposune.“, „Kometa se nepřeplánuje.“, fronta, Bára z věže ve dvou verzích (`priznal` / `trval`), úkol | – | – | 10 |
| hlášení vysílačkou | Bára hlásí, co vidí: chybí Lumír, Pan Změna na lávce, ocas ve dveřích, skupina stojí, verze zamčená, hodnoty; Ruda „Věži, co vidíš?“ (při `trval` povinné) | podle stavu | – | 14 |
| nápovědy | 3 stupně pro P5.2–P5.5, P5.7, P5.8, P5.10–P5.12; 1. a 3. stupeň pro P5.1, P5.6, P5.9, P5.13, P5.14; 1 stupeň pro „Na čí tři?“, P5.15, P5.16 (D78) | podle stavu | – | 41 |
| chybějící vstupy | pult „Čeká na bezpečnostní systém“ (bez pečeti), šedá volba R5.1 („Návod bez zaučení je jen papír.“, „Zaučit, ale co mu necháš v ruce?“), „Na tři“ před ostatními pojistkami („Pojistky červené.“), *Předat palubě* dřív („Rampa neodjištěna.“) | – | – | 6 |
| ★ Pembok | „Každý z vás vidí půlku.“, pomník („Stojíš vedle sebe.“), „Tohle nejde sám. Celou dobu to nešlo.“, poslední stránka „Konečně kapitola, kterou nemusím opravovat.“ | – | – | 4 |

## Bára (hraná postava)

| Téma | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| kontrola a 4 811 | „Plus my dva. To je 4 811.“, „Počítadlo je opravené. Takže to není chyba. Někdo chybí.“, seznam lístků, „Lumír.“, uzavření „Kromě nás dvou.“ | P5.8, P5.9 | `c5_chybi_lumir` | 6 |
| kamery | lávka, dveře, paluba: co vidí (Pan Změna, ocas, kdo nemá šipky); „Někdo odbavený je venku.“ | – | – | 7 |
| zamknout verzi | „Tahle verze. Žádná další.“ (poprvé se k něčemu zaváže, ale bez slova termín, D60) | systém ve světě iterací | – | 2 |
| zaučení | „Nechám ho to zkusit.“, legenda „Zelená jet. Žlutá pozor. Červená stát.“, bez lístků „Zelenou mám. Žlutou natřu. Červenou… vypnu.“, natřené tlačítko | P5.7 | `c5_zauceni` | 7 |
| prohlížení věže | pult, kamery, tabule, Zelenka, okno, plechovka, metr | – | – | 10 |
| finále | „Řídicí systém nástup potvrdil.“, hodnoty („Co je z betonu, měř u tebe. Co dýchá, počítám já.“), „Na tři.“ / „Na čí tři?“ / „Tak počkáme.“ / „Tři.“ | – | – | 4 |

Bářiny výchozí reakce (`bara_*`) z kapitoly 1 se použijí znovu.

## Ruda jako postava (když se hraje za Báru)

| Téma | Podstata | Podmínka | Odhad |
|---|---|---|---|
| vysílačka | „Rampa. Co potřebuješ?“, při `trval` „Rampa.“, „Jdu.“ | – | 4 |

## Dispečer Zelenka

| Téma | Podstata | Podmínka | Odhad |
|---|---|---|---|
| ráno ve věži | „Dneska nesvítí nic zeleně. Je to krásné.“, kšilt v ruce | – | 3 |
| komentáře z okna | „Žlutá! Fronta stojí.“, „Zelená!“, 4 811 „Červená? Tu tu nemáme rádi.“ | – | 3 |
| zelená zpráva | „Zelená je klidná barva.“ (pojistka Stav) | `zelene` | 1 |
| plechovka | „Kšilt nechte.“ | ★ | 1 |

## Vrátný (kapitán)

| Téma | Podstata | Podmínka | Odhad |
|---|---|---|---|
| ráno | „Poslední jízda byla v pět. Nikdo nečekal.“ | – | 2 |
| kapitán (P5.6) | „Povedete Archu?“ → „Konečně se někdo zeptal.“, sleze z jeřábu; po odpočtu „Dole mě budou potřebovat.“; deník na požádání (D81) | – | 5 |
| zaučení (P5.7) | „Které je které? Všechna byla zelená.“, „Tohle si zapamatuju. Napíšu si to do deníku. Lodního.“, tlačítko | P5.6 | 4 |
| předání (R5.1) | `poradne`: přečte první stránku, přikývne; `poradi`: „Nikdo se mě nezeptal. Zase.“ | R5.1 | 3 |
| start a epilog | otočí klíčem; přistání hladce („Díky, Věro.“) / „Kde se to vypíná?“; po titulcích „Konečně něco dolů.“ | konec | 2 |

## Lumír

| Téma | Podstata | Podmínka | Odhad |
|---|---|---|---|
| odmítá (P5.3) | „Bez archivu nejdu. A archiv se do Archy nevejde.“, „Čtyřicet let nikdo nic nevrátil. Kromě poučení.“ | – | 4 |
| krabička | „Plná. Poprvé za čtyřicet let.“, „Tohle je archiv. Zbytek jsou data.“; Předsedův kufr „Kajuta č. 1. Založeno.“ (`hned`) | P5.3 | 3 |
| epilog | lístek Archy ve třech verzích („Dokončeno: dnes.“ / „skoro.“ / „Fáze 3.“), poučení, Předseda pomáhá | konec | 6 |

## Starosta Bohumil

| Téma | Podstata | Podmínka | Odhad |
|---|---|---|---|
| u pódia | nůžky na pentli, „Slavnostní start. Program: 1. Projev.“ | – | 2 |
| zpráva | `zelene`: „Hlásil jste zelenou, tak jsem to slíbil novinám.“; `poctive`: „Říkal jste mi pravdu. Bylo to nepříjemné.“ | R5.2 | 2 |
| sliby | „A ohňostroj?“ → Ruda: „Po přistání.“ | `c4_slib` ≥ 1 | 2 |
| R5.2 | „A teď ten, komu za to vděčíme!“, reakce na „já“ (medaile) a „my“ | R5.2 | 4 |

## Norbert (v týmu, nebo ve frontě)

| Téma | Podstata | Podmínka | Odhad |
|---|---|---|---|
| ve frontě | ★ „Trup jsem podepsal z lavičky. Start vidím poprvé.“ | bez Norberta v týmu | 2 |
| klíč | ráno zamkl startovací klíč do pultu: „Klíč patří do pojistek, dokud start nepovolí.“ | – | 1 |
| verze | „Nastoupím, až uvidím zkoušku.“, „Včera to bylo jinak. Tohle nikdo nepodepíše.“, po zamčení „Tahle se už nezmění? Pak ano.“ | systém ve světě iterací | 3 |
| zkouška a pečeť | odříká normu, připne pečeť; „Zelená ve zprávě není měření.“ (`zelene`) | P5.4 | 4 |

## Babička, obyvatelé, rybáři, Pan Změna, Ještětoto, Předseda, Framework

| Téma | Podstata | Podmínka | Odhad |
|---|---|---|---|
| fronta | „Až otevřete.“, obyvatelé „Kam?“, šipky „Aha.“ | – | 4 |
| rybáři | „Kam s nimi?“, „Přivažte je zvenku. Jako anténu.“, „Konečně anténa, která něco chytí.“ | skupina uvízne (bez místa na udice) | 4 |
| babička a kocour | kocour utekl, buchta na cestu (spojenec), epilog „Na pozemek se mě zeptal. Tak jsem letěla.“ | – | 5 |
| Pan Změna | plovací kruhy „Pro všechny.“, „A ještě by se hodil…“, „Poprvé mi někdo řekl kdy.“, ★ „A ještě…“, ★ „Ne? A kdy?“ | – | 6 |
| Ještětoto | kartičky přání, zmenšování (popisky jmen), ★ „Zahozené přání se vrací. Větší.“ | `c4_creep`, `c4_slib` | 4 |
| Předseda | `hned`: s igelitkou „Kufr si nechal archivář. Jako přílohu.“; `po_usmireni`: předbíhá, „Fronta je tamhle.“; epilog („Konečně něco dokončuju.“ / fronta na fázi 3) | – | 5 |
| Ing. Framework | krabice „Předání“: „Návod na všechno. Je prázdná.“, ★ „Kolega!“ | – | 4 |

## Tým

| Téma | Podstata | Odhad |
|---|---|---|
| stránky návodu | jedna věta od každého z šesti možných členů: Věra „Neopírat se o lávku.“, Norbert „Viz norma.“, Klára „Kulaté kajuty jsou kulaté schválně.“ (obětované: „Kajuty jsou hranaté. Bohužel.“), Pepa „Všechno trvá dva dny.“, Zdenda „Když nevíš, zavolej Rudovi.“, Kryštof „Předávací protokol. Konečně ho někdo chce.“; vrácený člen „Proč jsem odešel“ | 10 |
| „Říct to nahlas“ | u pultů hlásí, co pojistka chce | 4 |
| ponožky a odpočet | „Vy máte stejné ponožky.“ (první podle pořadí) a Bářina odpověď; Pepa při odpočtu „Dny.“ | 3 |
| R5.2 „my“ | reakce týmu na jména | 3 |

## Scény s rozhodnutím a střihy

| Scéna | Podstata | Odhad |
|---|---|---|
| odpočet | amplion „Deset… tři.“, „Start zablokován. Nástup nepotvrzen.“, „Řídicí systém nástup potvrdil.“, „Tak proč…“, „Každý z vás vidí půlku.“ | 6 |
| R5.1 | rámec u dveří, dvě volby, šedá volba, odpověď vrátného | 6 |
| R5.2 | pódium, dvě volby, „my“ se jmény (podle `c5_manual`, `c5_kapitan`), medaile | 8 |

## Ruda a prohlížení

| Skupina | Podstata | Odhad |
|---|---|---|
| prohlédnutí aktivních míst | podle [obsahu místností](05-mistnosti.md), asi 35 míst a varianty (Ještětoto, babička, Předseda) | 40 |
| prohlédnutí předmětů | 13 předmětů (metr a plechovku prohlíží Bára) | 13 |
| vlastní reakce ★ z matice | podle [matice předmětů](05-mistnosti.md#matice-předmětů), včetně rybářů a kocoura | 55 |

## Finále (popisky a repliky)

| Část | Texty | Odhad |
|---|---|---|
| pojistky | štítky pojistek (5), kartičky přání (4), páry hodnot (3) jako popisky; repliky při chybné hodnotě (metr, Pembok), „Po přistání.“ | 12 replik + 12 popisků |

## Konce a epilog

| Část | Podstata | Odhad |
|---|---|---|
| start | nástup posledních, počítadlo 4 812 / 4 812, ponožky, „Tři. Dva. Jedna.“ | 4 |
| konce | Pomník, Druhá etapa, Hrdina, Tým: každý 4 repliky a 1 popisek | 16 |
| epilog | předání (2 verze), obyvatelé podle `c4_obet` (6, s hranatými i kulatými kajutami), Bára ve třech verzích (D60), Lumír, Předseda | 19 |
| scéna po titulcích | lešení, vrátný, Pembok | 4 |
| obrazovka „Co si Nedostavěnice zapamatovala“ | popisky za celou hru (vady, sladění, Bára, předání, konec) | 0 replik + 15 vět |

## Součet

| Skupina | Odhad replik |
|---|---|
| úvod, Pembok, přepínání, vysílačka | 75 |
| Bára (hraná) | 36 |
| Ruda jako postava | 4 |
| Zelenka | 8 |
| vrátný | 16 |
| Lumír | 13 |
| starosta | 10 |
| Norbert | 10 |
| babička, obyvatelé, rybáři, Pan Změna, Ještětoto, Předseda, Framework | 32 |
| tým | 20 |
| scény s rozhodnutím a střihy | 20 |
| Ruda a prohlížení | 108 |
| finále | 12 |
| konce a epilog | 43 |
| **Celkem** | **≈ 408 na jazyk** |

Odhad je asi o 35 % nad horní mezí rozpočtu D56 (300; po kontrole N4 o 20 víc, D80). K tomu asi 12 popisků finále a 15 vět
obrazovky následků. V jednom průchodu hráč uslyší asi **265** replik: konce, verze epilogu,
skupiny ve frontě a pojistky se vylučují. Když se v N6 ukáže, že je to moc, škrtají se nejdřív
vlastní reakce ★ (55) a konce Pomník a Druhá etapa se zkrátí na jeden záběr s textem (−25).
