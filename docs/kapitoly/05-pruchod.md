# Kapitola 5: průchod hrou

> Krok N3b [postupu návrhu](../12-postup-navrhu.md). Každá akce hráče na samostatném řádku.
> Z průchodu vznikne automatický test (šedý prototyp D70, později `ladeni.gd`). Scény a předměty
> jsou v [obsahu místností](05-mistnosti.md), puzzly v [kartách](05-puzzly.md).
> Stav: **hotovo** (schváleno v D79), verze 0.1

Formát: `č. scéna · kdo · akce → výsledek · příznak`. Akce: *prohlédni*, *použij*, *mluv*,
*vezmi*, *použij X na Y*, *jdi*, *přepni* (portrét druhé postavy).

**Výchozí stav nejkratší cesty:** „dobré“ kapitoly 1–4 podle jejich nejkratších cest:
`c1_babicka`=`spojenec`, `c1_slib_vseho`=0; `c2_tym`=[Věra, Pepa, Norbert, Klára],
`c2_rozdeleni`=`povaha`, `c2_vyjimky`=2 (`bezp_u_rudy`, interiér u Báry), `c2_mosty`=[trup, nastup, start];
`c3_integrace`=0, `c3_bara_priority`, `c3_krysy`=`aktovka`; `c4_report`=`poctive`, `c4_listky`=4,
`c4_slib`=0, `c4_obet`=[pomnik, svaciny], `c4_creep`=0, `c4_usmireni`=`priznal`,
`c4_bara_rekla`=`hned`, `c4_zlepseni`=*Jedna tabule pro oba*, `c4_integrace`=0, `c4_nastup`=3.
Bářina důvěra je vysoká, sladění světů 7 ze 7, Rudův vývoj před R5.2 je 4.

## 1. Nejkratší cesta

```text
 1. S1 · cutscéna · titulek „Hotovo“; amplion „Dnů do dopadu: nula.“; Ruda: „Konečně termín, který nikdo neposune.“; Pembok: „Kometa se nepřeplánuje.“; fronta na lávce, Ještětoto ve dveřích; Bára vysílačkou: „Dobré ráno, rampo. Odpočet čeká na nástup.“
 2. S1 · Ruda · použij Páka u dveří → dveře se otevřou, Ještětoto se stáhne na práh; obyvatelé, rybáři i babička s kocourem nastoupí sami (c4_nastup=3)
 3. S1 · Ruda · přepni → Bára v S2
 4. S2 · Bára · použij Řídicí pult → Předstartovní kontrola → „4 811 / 4 812. Počítadlo je opravené. Takže to není chyba. Někdo chybí.“ → Seznam lístků → chybí Lumír; Bára vysílačkou Rudovi · c5_chybi_lumir
 5. S2 · Bára · přepni → Ruda v S1
 6. S1 · Ruda · jdi Na radnici → S3; mluv Lumír → „Bez archivu nejdu. A archiv se do Archy nevejde.“
 7. S3 · Ruda · vezmi Krabička Poučení; použij Krabička Poučení na Lumír → „Tohle je archiv. Zbytek jsou data.“ → Lumír jde nastoupit · c5_lumir
 8. S3 · Ruda · jdi Na radnici → S1 (Lumír projde frontou s krabičkou); přepni → Bára
 9. S2 · Bára · použij Řídicí pult → Uzavřít nástup → „4 812 / 4 812. Nástup uzavřen.“
10. S1 · cutscéna · odpočet: „Deset… devět…“ → na „tři“ stop: „Start zablokován. Nástup nepotvrzen.“; Bára: „Řídicí systém nástup potvrdil.“; Pembok: „Každý z vás vidí půlku.“
11. S2 · Bára · použij Kamera Lávka → „Na lávce stojí Pan Změna.“ (vysílačkou sama, priznal)
12. S2 · Bára · přepni → Ruda; S1 · Ruda · jdi Za Archou; mluv Pan Změna → „A ještě by se hodil…“ → „Po přistání. Zapíšu si to.“ → „Poprvé mi někdo řekl kdy.“ → nastoupí; pojistka Lávka volná zelená
13. S1 · Ruda · použij Páka u dveří → „Zavřeno.“; Bára sama: „Zamčeno. Ještětoto sedí uvnitř na sedadle.“; pojistka Dveře zelená (bez přání: c4_creep=0, c4_slib=0)
14. S1 · Ruda · použij Bezpečnostní pult (klíč) → „Báro. Na tři.“ → „Na tři.“ → oba najednou → „Pojistky uvolněny. Klíč předejte posádce.“ → startovací klíč
15. S1 · Ruda · použij Startovací klíč na Vrátný → R5.1 „Však vy si poradíte.“ → „Nikdo se mě nezeptal. Zase.“ · c5_predani=poradi
16. S1 · cutscéna · starosta na pódiu: „A teď ten, komu za to vděčíme!“ → R5.2 „My.“ → Ruda jmenuje tým a Báru; starosta: „Říkal jste mi pravdu. Bylo to nepříjemné.“ · c5_my, Rudův vývoj=5
17. S1 · cutscéna · start: Ruda a Bára nastoupí poslední; vrátný otočí klíčem; Pepa: „Vy máte stejné ponožky.“ Bára: „Všimli jste si až teď.“; „Tři. Dva. Jedna.“ → konec Tým: Archa nad mraky, kometa dopadne do Mlžné pláně metr za městem, přistání
18. S1, S3 · epilog · posádka hledá vypínač (poradi); obyvatelé: „Svačiny nebyly. Ale přistáli jsme.“; Bára: „Večeře. Pátek. Osm. A přijdeš včas.“; Lumír zakládá lístek „Archa. Zahájeno 1994. Dokončeno: dnes.“; hráč vybere poučení „Dva světy, jedna Archa.“; Předseda pomáhá zakládat · konec hry
```

18 kroků. Odhad **20–25 minut**: hádanky jsou krátké, nejdelší je finále (5–7 min), konec
a epilog (5 min). Bez návodu a zaučení není scéna po titulcích.

## 2. Úplná cesta

Navíc proti nejkratší cestě (vloží se kamkoli do části A, nebo i po finále před R5.1):

```text
 a. S1 · Ruda · mluv Věra → „Napiš stránku: co musí vědět ten, kdo to po nás převezme.“ → „Neopírat se o lávku.“ → stránka návodu · c5_manual=1
 b. S1 · Ruda · mluv Norbert → „Viz norma.“ → stránka · c5_manual=2
 c. S1 · Ruda · mluv Pepa → „Všechno trvá dva dny.“ → stránka · c5_manual=3
 d. S1 · Ruda · mluv Klára → „Kulaté kajuty jsou kulaté schválně.“ → stránka · c5_manual=4
 e. S1 · Ruda · použij Stránky návodu na Krabice od bot → provozní manuál („Návod v krabici od bot. Framework by to prodal.“)
 f. S1 · Ruda · mluv Vrátný → „Povedete Archu?“ → „Konečně se někdo zeptal.“ → slézá z jeřábu naposledy, jde do věže · c5_kapitan
 g. S1 · Ruda · přepni → Bára; S2 · Bára · použij Řídicí pult → Zkušební režim → vrátný: „Které je které? Všechna byla zelená.“
 h. S2 · Bára · použij Tabule ukazatelů → lístky skutečnosti → vrátnému jako legenda: „Zelená jet. Žlutá pozor. Červená stát.“ → druhý pokus projde · c5_zauceni
 i. ★ S1 · Ruda · prohlédni Gantt (plán cesty) na vrátného → „Řádek 214: start. Úterý. To je plán stavby, ne návod.“; mluv Framework → krabice „Předání“ „Návod na všechno. Je prázdná.“; babička → buchta na cestu
15'. S1 · Ruda · použij Startovací klíč na Vrátný → R5.1 „Předat s návodem a zaučením.“ → vrátný otevře první stránku a přikývne · c5_predani=poradne
18'. epilog · vrátný přistane hladce a na stránce Přistání najde „Díky, Věro.“; scéna po titulcích: z radnice sundávají lešení, vrátný: „Konečně něco dolů.“; Pembok: „Konečně kapitola, kterou nemusím opravovat.“
```

Úplná cesta má 27 kroků. Odhad **30–35 minut**. Je to **dokonalý průchod** (Tým, vysoká důvěra,
`poradne`, `poctive`, `hned`, `spojenec`), proto končí scénou po titulcích.

## 3. Varianty

### Volby v kapitole 5

| Varianta | Odlišné kroky | Příznaky a následek |
|---|---|---|
| **A Však vy si poradíte** (R5.1) | nejkratší cesta | `c5_predani`=`poradi`; epilog: posádka hledá vypínač; bez scény po titulcích |
| **B „Já.“** (R5.2) | 16: „Já.“ → medaile | `c5_my`=ne; vývoj 4 → konec **Hrdina**: tým se rozejde, Bára podle důvěry (vysoká: termín i tak, Ruda u pomníku neví, co říct) |
| **C Poslední přání splněné** | 12: „Dobře, uděláme to.“ | Ještětoto dostane kartičku navíc, Pan Změna stojí dál („A ještě…“); 13 pak potřebuje odložit přání (jako K) |
| **D Pořadí** | 11–14 v libovolném pořadí kromě „Na tři“, které je poslední | – |
| **E Poučení** | 18: kterákoli ze tří vět | jen text na lístku |

### Stav z kapitol 1–4

| Varianta | Odlišné kroky | Následek |
|---|---|---|
| **F Skupiny uvízly** (`c4_nastup` < 3) | 2: uvízne 3 − `c4_nastup` skupin v pořadí rybáři → obyvatelé → babička. Rybáři: mluv Rybáři → „Do kajuty se vejdou?“ → složí udice. Obyvatelé: přepni → Bára, použij Řídicí pult → Šipky na palubě. Babička: jdi lávkou dolů, mluv Kocour → jde s Rudou → babička nastoupí | každá skupina jeden krok; 4 počká, až skupiny nastoupí |
| **G Bez Norberta** (`c2_tym` bez Norberta) | před 9: mluv Norbert (ve frontě) → „Podepíšu jen to, co jsem viděl.“ → jde k pultu; použij Bezpečnostní pult → Zkouška pojistek → pečeť; b: stránku napíše jiný člen týmu | bez pečeti pult v 9 hlásí „Čeká na bezpečnostní systém“ |
| **H Bezpečnostní systém ve světě iterací** (bez `bezp_u_rudy`) | před 9: Norbert: „Včera to bylo jinak.“ → přepni → Bára, použij Řídicí pult → Zamknout verzi („Tahle verze. Žádná další.“) → Ruda použij Bezpečnostní pult → Zkouška pojistek → pečeť | s G dohromady: nejdřív verze, potom Norbert z fronty |
| **I Nesladěné body** (`c4_integrace` ≥ 1) | mezi 10 a 14: na pultu klepnout na rozdílnou hodnotu → Převzít z rampy (úhel, váha), nebo z věže (počet lidí); za každý bod jeden pár | špatná volba se vrátí; s *Jedna tabule pro oba* bez přepínání |
| **J Ještětoto ve dveřích** (`c4_creep` ≥ 1 nebo `c4_slib` ≥ 1) | 13: Bára: „Řídicí systém hlásí otevřeno.“ → kamera Dveře → „Ocas.“ → mluv Ještětoto → vzít přání po jednom → „Po přistání.“ (`c4_creep` kartiček + „Ohňostroj“ při `c4_slib` ≥ 1) → páka | s každou kartičkou se Ještětoto zmenší |
| **K Zelená zpráva** (`c4_report`=`zelene`) | mezi 10 a 14: pojistka Stav ověřen: Bára přečte lístky (nebo svá čísla) → Ruda zadá; 16: starosta „Hlásil jste zelenou, tak jsem to slíbil novinám.“ | vývoj o 1 nižší; bez scény po titulcích |
| **L Trval na svém** (`c4_usmireni`=`trval`) | 1: Bára „Věž.“; 4, 11, 13: Bára hlásí jen na otázku (přepnout, nebo Ruda „Věži, co vidíš?“); 14: „Na čí tři?“ → „Na moje.“ („Tak počkáme.“) / „Na tvoje.“ → „Tři.“ | sladění −1 |
| **M Ptát se dřív, než se zamkne** | kdykoli v části A: použij Bezpečnostní pult → Zkouška pojistek → ukáže Pana Změnu na lávce, ocas ve dveřích, rozdílné hodnoty; jdou vyřešit hned | finále po odpočtu jen „Na tři“ |
| **N Říct to nahlas** | finále: u každého pultu stojí člen týmu a říká, co pojistka chce | nápověda 2. stupně zdarma |
| **O Velká tlačítka obětovaná** (`c4_obet`) | h: vrátný nenajde Start → Bára vezmi Plechovka žluté barvy, použij na Řídicí pult (tlačítko) → třetí pokus projde | – |
| **P Bára až po usmíření** (`c4_bara_rekla`=`po_usmireni`) | 1: Předseda s kufrem „kajuta č. 1“ zkouší předběhnout, fronta ho vrátí; epilog: sám ve frontě na „fázi 3“ | bez scény po titulcích |
| **Q Vrácený člen** (`c4_clen_zpet`) | a–d: vrácený člen připíše „Proč jsem odešel“ ★ (stránka se počítá) | – |
| **R Interiér u Rudy** (`interier_u_rudy`) | F, rybáři: kajuty bez místa na udice → Ruda: „Jako anténa.“ → přivážou udice zvenku | jen text |
| **S Babička bez spojenectví** | 1: babička s kufrem, bez buchty; epilog bez svědectví | bez scény po titulcích |
| **T Pomník neobětovaný** | 16: pomník stojí u pódia, Pembok: „Stojíš vedle sebe.“ | – |
| **U Kočka Riziková** (`kocka`) | kočka sedí na bezpečnostním pultu, při „Na tři“ seskočí | vtip |

### Konce

| Stav | Konec |
|---|---|
| nejkratší cesta (sladění 7, vývoj 5) | **Tým** |
| B „Já.“ | **Hrdina** |
| `gantt`, nízké sladění (viz špatné kapitoly níže) | **Pomník** |
| `krabice`, `c2_mosty` ≤ 1, `c3_integrace` ≥ 2, `c4_integrace` ≥ 1 (sladění 0–1) | **Druhá etapa** (Archa visí metr nad plošinou) |
| sladění vysoké, vývoj 2–3 a „my“ | **Hrdina** s „my“: „Tým už je na jiných projektech.“ |

### „Špatné“ kapitoly 1–4 dohromady

Výchozí stav: `c1_babicka`=`prehlizena`, `c1_slib_vseho`=3; `c2_tym`=[Zdenda, Kryštof, Pepa, Věra],
`c2_rozdeleni`=`gantt` (bezpečnostní systém u Rudy), `c2_mosty`=[start]; `c3_integrace`=3,
`c3_retro`=ne (Pepa odešel a vrátil se, `c4_clen_zpet`); `c4_report`=`zelene`, `c4_listky`=0,
`c4_slib`=3, `c4_obet`=[bazen, pomnik], `c4_creep`=2, `c4_usmireni`=`trval`,
`c4_bara_rekla`=`po_usmireni`, `c4_zlepseni`=*Jedna tabule pro oba* (přeskočeno), `c4_integrace`=2,
`c4_nastup`=1. Bářina důvěra je nízká, sladění 0, vývoj před R5.2 je 0.

| Krok | Odlišnost |
|---|---|
| 1 | Bára „Věž.“; Předseda s kufrem předbíhá |
| 2 | uvíznou rybáři a obyvatelé (F): dva kroky navíc, šipky přes Báru |
| 4 | Bára hlásí Lumíra jen na otázku (L) |
| před 9 | Norbert z fronty a zkouška pojistek (G) |
| 11–14 | Pan Změna (Bára hlásí na otázku), ocas ve dveřích se třemi kartičkami (dvě přání a ohňostroj), dva páry hodnot, Stav ověřen z Bářiných čísel (lístky nejsou), „Na čí tři?“ |
| 15 | bez návodu a kapitána jen „Však vy si poradíte.“ (návod a kapitán jdou i tak) |
| 16 | starosta: „Hlásil jste zelenou, tak jsem to slíbil novinám. A ohňostroj?“ Ruda: „Po přistání.“ |
| 17 | konec **Pomník**: Archa obletí město a přistane, kde začala; uvnitř nikdo neví, kde sedí; nedokončený pomník |
| 18 | Bára odchází na jiný projekt, Ruda na rampě sám; Lumír: „Dokončeno: skoro.“; Předseda ve frontě na „fázi 3“ |

Kapitola jde dohrát; špatné kapitoly 1–4 ji prodlouží asi o **10 minut** (Norbert, dvě skupiny,
tři kartičky, dva páry hodnot, stav, „Na čí tři“). Úkoly navíc jsou **souběžné**: graf má ve špatném
stavu stejný nejkratší sled a víc kroků v kole ([rozbor](../13-graf-zavislosti.md#kapitola-5-uzavření)).

**Automatický test:** nejkratší cesta, úplná cesta, „špatné“ kapitoly 1–4 a varianty B, C, F, G, H,
I, J, K, L, M, O jako samostatné sekvence. Každá končí kontrolou příznaků a jména konce.

## Kontrola slepých uliček

- [x] Dveře jdou otevřít vždy; každá uvízlá skupina má jeden krok a Bára v kameře řekne, kdo stojí.
- [x] Lumír: krabička Poučení leží v archivu celou kapitolu; k Lumírovi jde Ruda kdykoli.
- [x] Pečeť: Norbert je vždy na rampě (v týmu, nebo ve frontě); verzi zamkne Bára kdykoli.
- [x] Odpočet počká na „tři“, kolik je potřeba (D12); kometa jen roste.
- [x] Pojistky: chybná hodnota se vrátí, splněné přání vrátí kartičku, „Na moje.“ se vrátí.
- [x] Návod, kapitán a zaučení jdou i po finále; R5.1 má volbu bez podmínky.
- [x] R5.2 a poučení nemají špatnou odpověď, jen jiný konec.

## Šířka grafu

Podle [rozboru grafu](../13-graf-zavislosti.md#kapitola-5-uzavření) (kroky k cíli v jednom kole):

| Úsek | Výchozí stav | Špatné kapitoly 1–4 |
|---|---|---|
| část A, začátek | 5 (dveře, kontrola, Lumír, kapitán, stránky) | 6 (navíc Norbert z fronty) |
| část A, nástup | 4 (Lumír chybí, krabička, manuál, zaučení) | 6 (navíc tři skupiny, natřené tlačítko) |
| uzavření nástupu | 1 (úzké hrdlo) | 1 |
| finále | 2 (lávka, dveře) | 4 (navíc hodnoty a stav), pak ocas a přání |
| „Na tři“, R5.1, R5.2 | 1 (úzká hrdla, R5.1 rozcestí) | 1 (navíc „Na čí tři?“ jako úzké hrdlo) |

Graf má ve výchozím stavu 18 kroků (12 povinných) a nejkratší sled 9 kol, ve špatném stavu
28 kroků (21 povinných) a 11 kol. Špatné kapitoly 1–4 tedy přidávají hlavně šířku: kola navíc
jsou jen přání Ještětota a „Na čí tři?“.
