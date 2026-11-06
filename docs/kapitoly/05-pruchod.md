# Kapitola 5: průchod hrou

> Krok N3b [postupu návrhu](../12-postup-navrhu.md). Každá akce hráče na samostatném řádku.
> Z průchodu vznikne automatický test (šedý prototyp D70, později `ladeni.gd`). Scény a předměty
> jsou v [obsahu místností](05-mistnosti.md), puzzly v [kartách](05-puzzly.md).
> Stav: **hotovo** (schváleno v D79, kontrola N4 zapracována v D80), verze 0.2

Formát: `č. scéna · kdo · akce → výsledek · příznak`. Akce: *prohlédni*, *použij*, *mluv*,
*vezmi*, *použij X na Y*, *jdi*, *přepni* (portrét druhé postavy).

**Výchozí stav nejkratší cesty:** „dobré“ kapitoly 1–4 podle jejich nejkratších cest:
`c1_babicka`=`spojenec`, `c1_slib_vseho`=0; `c2_tym`=[Věra, Pepa, Norbert, Klára],
`c2_rozdeleni`=`povaha`, `c2_vyjimky`=2 (`c2_bezpecnost`=`ruda`, interiér u Báry), karta *udice* hotová, `c2_mosty`=[trup, nastup, start];
`c3_integrace`=0, `c3_bara_priority`, `c3_krysy`=`aktovka`; `c4_report`=`poctive`, `c4_listky`=4,
`c4_slib`=0, `c4_obet`=[pomnik, svaciny], `c4_creep`=0, `c4_usmireni`=`priznal`,
`c4_bara_rekla`=`hned`, `c4_zlepseni`=*Jedna tabule pro oba*, `c4_integrace`=0, `c4_nastup`=3.
Bářina důvěra je vysoká, sladění světů 7 ze 7, Rudův vývoj před R5.2 je 4.

## 1. Nejkratší cesta

```text
 1. S1 · cutscéna · titulek „Hotovo“; amplion „Dnů do dopadu: nula.“; Ruda: „Konečně termín, který nikdo neposune.“; Pembok: „Kometa se nepřeplánuje. A tohle už jsi říkal. Čtyřikrát.“; fronta na lávce, Ještětoto ve dveřích, vrátný v kabině jeřábu; Bára vysílačkou: „Dobré ráno, rampo. Odpočet čeká na nástup.“
 2. S1 · Ruda · použij Páka u dveří → dveře se otevřou, Ještětoto se stáhne na práh; fronta odbavuje lístky a nastupuje, obyvatelé, rybáři i babička s kocourem sami (c4_nastup_chybi prázdný); tým, vrátný, Zelenka a starosta odbaví lístek a čekají u pódia
 3. S1 · Ruda · přepni → Bára v S2
 4. S2 · Bára · použij Řídicí pult → Předstartovní kontrola → „4 809 odbaveno, 2 u startu.“ Bára: „Plus my dva. To je 4 811. Počítadlo je opravené. Takže to není chyba. Někdo chybí.“ → Seznam lístků → neodbavený Lumír; Bára vysílačkou Rudovi · c5_chybi_lumir
 5. S2 · Bára · přepni → Ruda v S1
 6. S1 · Ruda · jdi Na radnici → S3; mluv Lumír → „Bez archivu nejdu. A archiv se do Archy nevejde.“
 7. S3 · Ruda · vezmi Krabička Poučení; použij Krabička Poučení na Lumír → „Tohle je archiv. Zbytek jsou data.“ → Lumír jde nastoupit · c5_lumir
 8. S3 · Ruda · jdi Na radnici → S1 (Lumír odbaví lístek a projde s krabičkou); přepni → Bára
 9. S2 · Bára · použij Řídicí pult → Uzavřít nástup → „4 812 / 4 812. Nástup uzavřen. Kromě nás dvou.“
10. S1 · cutscéna · odpočet: „Deset… devět…“ → na „tři“ stop: „Start zablokován. Nástup nepotvrzen.“; Bára: „Řídicí systém nástup potvrdil.“; Pembok: „Každý z vás vidí půlku.“; vrátný sejde ke dveřím Archy; Bára sama (priznal): „Někdo odbavený je venku. Na lávce stojí Pan Změna.“
11. S1 · Ruda · jdi Za Archou; mluv Pan Změna → „A ještě by se hodil…“ → „Po přistání. Zapíšu si to.“ → „Poprvé mi někdo řekl kdy.“ → nastoupí; pojistka Lávka volná zelená
12. S1 · Ruda · použij Páka u dveří → „Zavřeno.“; Bára sama: „Zamčeno. Ještětoto sedí uvnitř na sedadle.“; pojistka Dveře zelená (bez přání: c4_creep=0, c4_slib=0)
13. S1 · Ruda · použij Bezpečnostní pult (klíč) → „Báro. Na tři.“ → „Na tři.“ → oba najednou → „Pojistky uvolněny. Klíč předejte posádce.“ → startovací klíč
14. S1 · Ruda · použij Startovací klíč na Vrátný (u dveří) → R5.1 „Však vy si poradíte.“ → „Nikdo se mě nezeptal. Zase.“ · c5_predani=poradi
15. S1 · cutscéna · starosta na pódiu: „A teď ten, komu za to vděčíme!“ → R5.2 „My.“ → Ruda jmenuje tým a Báru; starosta: „Říkal jste mi pravdu. Bylo to nepříjemné.“ · c5_my, Rudův vývoj=5
16. S1 · cutscéna · start: tým, starosta a Zelenka nastoupí; Ruda a Bára odbaví lístky 4 811 a 4 812 poslední → počítadlo v kokpitu „4 812 / 4 812“; vrátný zasune klíč a otočí jím; Pepa: „Vy máte stejné ponožky.“ Bára: „Všimli jste si až teď.“; „Tři. Dva…“ Pepa: „Dny.“ „…Jedna.“ → konec Tým: Archa nad mraky, kometa dopadne do Mlžné pláně metr za městem, přistání
17. S1, S3 · epilog · posádka hledá vypínač (poradi); obyvatelé: „Svačiny nebyly. Ale přistáli jsme.“; Bára: „Večeře. Pátek. Osm. A přijdeš včas.“; Lumír zakládá lístek „Archa. Zahájeno 1994. Dokončeno: dnes.“; hráč vybere poučení „Dva světy, jedna Archa.“; Předseda pomáhá zakládat · konec hry
```

17 kroků. Odhad **20–25 minut**: hádanky jsou krátké, nejdelší je finále (5–7 min), konec
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
 h. S2 · Bára · použij Tabule ukazatelů → legenda „Zelená jet. Žlutá pozor. Červená stát.“ s lístky skutečnosti → druhý pokus projde · c5_zauceni
 i. ★ S1 · Ruda · použij Plán cesty na Vrátný → „Poslední řádek: start. Splněno. Skoro. To je plán, ne návod.“; mluv Framework → krabice „Předání“ „Návod na všechno. Je prázdná.“; babička → buchta na cestu
14'. S1 · Ruda · použij Startovací klíč na Vrátný → R5.1 „Předat s návodem a zaučením.“ → vrátný otevře první stránku a přikývne · c5_predani=poradne
17'. epilog · vrátný přistane hladce a na stránce Přistání najde „Díky, Věro.“; scéna po titulcích: z radnice sundávají lešení, vrátný: „Konečně něco dolů.“; Pembok: „Konečně kapitola, kterou nemusím opravovat.“
```

Úplná cesta má 26 kroků. Odhad **30–35 minut**. Je to **dokonalý průchod** (Tým, vysoká důvěra,
`poradne`, `poctive`, `hned`, `spojenec`), proto končí scénou po titulcích.

## 3. Varianty

### Volby v kapitole 5

| Varianta | Odlišné kroky | Příznaky a následek |
|---|---|---|
| **A Však vy si poradíte** (R5.1) | nejkratší cesta | `c5_predani`=`poradi`; epilog: posádka hledá vypínač; bez scény po titulcích |
| **B „Já.“** (R5.2) | 15: „Já.“ → medaile | `c5_my`=ne; vývoj 4 → konec **Hrdina**: tým se rozejde, Bára podle důvěry (vysoká: termín i tak, Ruda s medailí na rampě neví, co říct) |
| **C Poslední přání splněné nebo odmítnuté** | 11: „Dobře, uděláme to.“, nebo „Ne.“ | „Dobře“: Ještětoto dostane kartičku navíc, Pan Změna stojí dál („A ještě…“) a 12 pak potřebuje odložit přání (jako J); „Ne.“: „Ne? A kdy?“, volba se vrátí |
| **D Pořadí** | 11–12 a pojistky z variant v libovolném pořadí, „Na tři“ poslední | – |
| **E Poučení** | 17: kterákoli ze tří vět | jen text na lístku |

### Stav z kapitol 1–4

| Varianta | Odlišné kroky | Následek |
|---|---|---|
| **F Skupiny uvízly** (`c4_nastup_chybi`) | 2: uvíznou skupiny ze seznamu. Rybáři (bez místa na udice): mluv Rybáři → „Kam s nimi?“ → „Přivažte je zvenku. Jako anténu.“. Obyvatelé (`gantt`, `c3_hodnota` ≤ 1): přepni → Bára, použij Řídicí pult → Šipky na palubě. Babička (obětovaná tlačítka): jdi lávkou dolů, mluv Kocour → jde s Rudou → Ruda potvrdí babičce lístek | každá skupina jeden krok; Lumíra Bára najde až po nich |
| **G Bez Norberta** (`c2_tym` bez Norberta) | Norbert ve frontě: ★ „Trup jsem podepsal z lavičky. Start vidím poprvé.“ a nastoupí; b: stránku napíše jiný člen týmu | pečeť je z kap. 3, žádný krok navíc (D80) |
| **H Bezpečnostní systém ve světě iterací** (`c2_bezpecnost`=`bara`, nebo `krabice`) | 2: Norbert (z týmu, nebo z fronty) zůstane u lávky: „Nastoupím, až uvidím zkoušku. Včera to bylo jinak.“; před 9: přepni → Bára, použij Řídicí pult → Zamknout verzi („Tahle verze. Žádná další.“) → Ruda mluv Norbert → k pultu → použij Bezpečnostní pult → Zkouška pojistek → pečeť | bez pečeti pult v 9 hlásí „Čeká na bezpečnostní systém“ |
| **I Nesladěné body** (`c4_integrace` ≥ 1) | mezi 10 a 13: za každý zbylý bod jeden pár: úhel rampy (`kabel`, `start`) → Převzít z rampy; počet míst (`pocitadlo`) → Převzít z věže; váha (`svaciny`, `bazen`) → použij Deník jeřábu na Bezpečnostní pult | špatná volba se vrátí; s *Jedna tabule pro oba* bez přepínání |
| **J Ještětoto ve dveřích** (`c4_creep` ≥ 1 nebo `c4_slib` ≥ 1) | 12: Bára: „Řídicí systém hlásí otevřeno. Ve dveřích je ocas.“ → mluv Ještětoto → vzít přání po jednom → „Po přistání.“ (`c4_creep` kartiček, nejvýš 3, + „Ohňostroj“ při `c4_slib` ≥ 1) → páka | s každou kartičkou se Ještětoto zmenší; zahozené přání se vrátí |
| **K Zelená zpráva** (`c4_report`=`zelene`) | mezi 10 a 13: pojistka Stav ověřen: Bára přečte lístky (nebo svá čísla) → Ruda zadá („Tohle jsem měl napsat před týdnem.“); 15: starosta „Hlásil jste zelenou, tak jsem to slíbil novinám.“ | vývoj o 1 nižší; bez scény po titulcích |
| **L Trval na svém** (`c4_usmireni`=`trval`) | 1: Bára „Věž.“; 4: Lumíra hlásí jen na otázku; 10–12: Pana Změnu a ocas Bára najde až kamerou Lávka a Dveře (přepnout), nebo na otázku „Věži, co vidíš?“; 13: „Na čí tři?“ → „Na moje.“ („Tak počkáme.“) / „Na tvoje.“ → „Tři.“ | sladění −1 |
| **M Ptát se dřív, než se zamkne** | kdykoli v části A: použij Bezpečnostní pult → Zkouška pojistek → ukáže i rozdílné hodnoty, stav a přání Ještětota; jdou vyřešit hned | po odpočtu zbude Lávka, zavřít dveře a „Na tři“ |
| **N Říct to nahlas** | finále: u každého pultu stojí člen týmu a říká, co pojistka chce | nápověda 2. stupně zdarma |
| **O Velká tlačítka obětovaná** (`c4_obet`) | h: vrátný nenajde Start → Bára vezmi Plechovka žluté barvy, použij na Řídicí pult (tlačítko) → třetí pokus projde | – |
| **P Bára až po usmíření** (`c4_bara_rekla`=`po_usmireni`) | 1: Předseda s kufrem (při `hned` s igelitkou, kufr má Lumír) „kajuta č. 1“ zkouší předběhnout, fronta ho vrátí; epilog: sám ve frontě na „fázi 3“ | bez scény po titulcích |
| **Q Vrácený člen** (`c4_clen_zpet`) | a–d: vrácený člen připíše „Proč jsem odešel“ ★ (stránka se počítá) | – |
| **R Bez místa na udice** (karta *udice* chybí v `c3_hotove`) | rybáři neprošli v kap. 4, takže uvíznou (F) | udice jako anténa i v konci |
| **S Babička bez spojenectví** | 1: babička s kufrem, bez buchty; epilog bez svědectví | bez scény po titulcích |
| **T Pomník neobětovaný** | 15: pomník stojí u pódia, Pembok: „Stojíš vedle sebe.“ | – |
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
`c2_rozdeleni`=`gantt` (bezpečnostní systém u Rudy), `c2_mosty`=[start]; `c3_integrace`=3
(`c3_nesladeno`=[navigace, pocitadlo, lavka]), karta *udice* nehotová, `c3_retro`=ne (Pepa odešel
a vrátil se, `c4_clen_zpet`); `c4_report`=`zelene`, `c4_listky`=0, `c4_slib`=3,
`c4_obet`=[bazen, pomnik], `c4_creep`=1, `c4_usmireni`=`trval`, `c4_bara_rekla`=`po_usmireni`,
`c4_zlepseni`=*Jedna tabule pro oba* (přeskočeno), `c4_integrace`=1 (zbyl bod `pocitadlo`),
`c4_nastup`=1, `c4_nastup_chybi`=[rybari, obyvatele]. Hodnoty jsou ze špatného průchodu kap. 4
(„Stačí. Zavírám.“ po navigaci). Bářina důvěra je nízká, sladění 0, vývoj před R5.2 je 0.

| Krok | Odlišnost |
|---|---|
| 1 | Bára „Věž.“; Předseda s kufrem předbíhá; Norbert ve frontě ★ „Trup jsem podepsal z lavičky.“ |
| 2 | uvíznou rybáři (bez místa na udice, anténa) a obyvatelé (`gantt`, šipky přes Báru): dva kroky navíc |
| 4 | Bára hlásí Lumíra jen na otázku (L) |
| 10–13 | Pan Změna a ocas až po kameře (L); ocas se dvěma kartičkami (přání a ohňostroj); jeden pár hodnot (počet míst, Převzít z věže); Stav ověřen z Bářiných čísel (lístky nejsou); „Na čí tři?“ |
| zaučení | bez lístků legenda na barvách žárovek a plechovky (P5.7) |
| 14 | bez návodu a kapitána jen „Však vy si poradíte.“ (návod a kapitán jdou i tak) |
| 15 | starosta: „Hlásil jste zelenou, tak jsem to slíbil novinám. A ohňostroj?“ Ruda: „Po přistání.“ |
| 16 | konec **Pomník**: Archa obletí město a přistane, kde začala; uvnitř nikdo neví, kde sedí; nedokončený pomník |
| 17 | Bára odchází na jiný projekt, Ruda na rampě sám; Lumír: „Dokončeno: skoro.“; Předseda ve frontě na „fázi 3“ |

Kapitola jde dohrát; špatné kapitoly 1–4 ji prodlouží asi o **8–10 minut** (dvě skupiny, dvě
kamery, dvě kartičky, pár hodnot, stav, „Na čí tři“). Úkoly navíc jsou **souběžné**
([rozbor](../13-graf-zavislosti.md#kapitola-5-uzavření)).

**Automatický test:** nejkratší cesta, úplná cesta, „špatné“ kapitoly 1–4 a varianty B, C, F, H,
I, J, K, L, M, O jako samostatné sekvence. Každá končí kontrolou příznaků a jména konce.

## Kontrola slepých uliček

- [x] Dveře jdou otevřít vždy; každá uvízlá skupina má jeden krok a Bára v kameře řekne, kdo stojí.
- [x] Lumír: krabička Poučení leží v archivu celou kapitolu; k Lumírovi jde Ruda kdykoli.
- [x] Pečeť: je z kap. 3; jen u systému ve světě iterací zůstane Norbert u lávky, dokud nepodepíše,
  a verzi zamkne Bára kdykoli.
- [x] Odpočet počká na „tři“, kolik je potřeba (D12); kometa jen roste.
- [x] Pojistky: chybná hodnota se vrátí, splněné i zahozené přání vrátí kartičku, „Na moje.“ se vrátí.
- [x] Návod, kapitán a zaučení jdou i po finále (vrátný čeká u dveří); R5.1 má volbu bez podmínky.
- [x] Zaučení jde i bez lístků skutečnosti (legenda na barvách).
- [x] R5.2 a poučení nemají špatnou odpověď, jen jiný konec.

## Šířka grafu

Podle [rozboru grafu](../13-graf-zavislosti.md#kapitola-5-uzavření) (kroky k cíli v jednom kole):

| Úsek | Výchozí stav | Špatné kapitoly 1–4 |
|---|---|---|
| část A, začátek | 5 (dveře, kontrola, Lumír, kapitán, stránky) | 5 (ve stavu *krabice* navíc zamčení verze: 6) |
| část A, nástup | 3 (krabička, manuál, zaučení) | 5 (navíc rybáři a šipky) |
| uzavření nástupu | 1 (úzké hrdlo) | 1 |
| finále | 2 (Pan Změna, dveře) | 4 (navíc hodnoty a stav), pak kamera, ocas a přání |
| „Na tři“, R5.1, R5.2 | 1 (úzká hrdla, R5.1 rozcestí) | 1 (navíc „Na čí tři?“ jako úzké hrdlo) |

Graf má ve výchozím stavu 17 kroků (10 povinných) a nejkratší sled 8 kol, ve špatném stavu
25 kroků (18 povinných) a 11 kol (D80). Špatné kapitoly 1–4 přidávají hlavně šířku: kola navíc
jsou kamery (Bára hlásí jen na otázku), přání Ještětota a „Na čí tři?“. Hledání Lumíra na
počítadle je volitelné: kdo pošle Rudu do archivu dřív, krok přeskočí.
