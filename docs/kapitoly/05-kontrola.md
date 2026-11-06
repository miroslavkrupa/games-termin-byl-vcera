# Kapitola 5: autorská kontrola (N4)

> Krok N4 [postupu návrhu](../12-postup-navrhu.md) bez hráčů (D66). Nejkratší cesta, úplná cesta,
> varianty a „špatné“ kapitoly 1–4 z [průchodu](05-pruchod.md) prošly krok za krokem proti
> [kartám puzzlů](05-puzzly.md), [obsahu místností](05-mistnosti.md), [návrhu](05-uzavreni.md)
> a [grafu](../13-graf-zavislosti.md#kapitola-5-uzavření) (`tools/graf/k5.mjs`). Navíc kontrola
> proti kapitolám 1–4: návrhy, průchody, data prototypu kapitol 2 a 3 (`prototyp/kapitola2.js`,
> `kapitola3.js`) a mapa následků v [bibli](../03-pribehova-bible.md#rozhodnutí-a-jejich-pozdější-následky).
> Kontrola měla dvě nezávislá čtení: autorské a druhé, které návrh neznalo; nálezy obou jsou
> sloučené a ověřené proti zdrojům.
> Stav: **zapracováno** (D80), 2026-11-05. Všechny návrhy K1–K29 autor schválil. Texty kapitoly 5
> ještě nejsou (N6), takže se kontrolují jen osnovy.

## Shrnutí

| Oblast | Výsledek |
|---|---|
| Průchod krok za krokem | nejkratší i úplná cesta projdou; 11 logických děr (K1–K11), nejvážnější je počítadlo 4 812 při uzavření nástupu, i když Ruda, Bára a tým ještě stojí venku (K1) |
| Soulad s kapitolami 1–4 | 10 nesouladů (K12–K21), nejvážnější: místo na udice podle špatného příznaku (K12) a podpis Norberta, který kapitola 3 už jednou vyřešila (K13) |
| Příznaky | všechny čtené příznaky se v kap. 2–4 nastavují se stejnými jmény; problém je jen ve významu `interier_u_rudy` (K12) a `bezp_u_rudy` (K13) |
| Graf | čísla sedí (18 kroků, 9 kol, až 5 v kole; špatný stav 28, 11, 6), ale tři uzly se liší od karet a scénář „špatný“ jiný stav než průchod (K7) |
| Nápovědy | P5.9 a P5.14 neodpovídají pravidlu D78 (K22) |
| Drobnosti | K22–K29 |
| Rozpočet | osnova ≈ 385 replik; po zapracování ≈ 405 (o 20 víc) |
| Chyby v dokumentech | 2, opravené rovnou (D1, D2) |

## Logické díry

**K1 Počítadlo hlásí 4 812 / 4 812, i když venku ještě stojí lidé.** P5.9 uzavře nástup na
4 812 a P5.8 tvrdí, že chybí jen Lumír. V tu chvíli ale stojí venku Ruda a Bára (nastoupí
poslední), tým u pódia, vrátný, starosta a Zelenka. Pan Změna navíc stojí po odpočtu na lávce.
Pointa D64 („nalodí se přesně 4 812“) tak neplatí.

*Návrh:*
- **Počítadlo počítá odbavené lístky, ne lidi v Arše.** Tým, vrátný, Zelenka a starosta si
  lístek odbaví u lávky předem a čekají u pódia. Ruda a Bára mají lístky **4 811 a 4 812**
  a odbaví je až ve střihu startu: počítadlo v kokpitu doskočí na 4 812 (pointa D64).
- Při uzavření nástupu tedy pult ukáže „4 810 na palubě, 2 u startu“ a Bára řekne „Kromě nás
  dvou.“ Chybějící Lumír je pak 4 809 + 2 („Někdo odbavený chybí.“).
- **Pan Změna je odbavený**, ale z Archy vylezl zadními dveřmi na lávku s posledním přáním.
  To je zároveň stopa pro P5.10 (Bára: „Někdo odbavený je venku.“).
- Úprava v P5.8, P5.9, P5.10, v návrhu (výchozí stav, start) a v průchodu (kroky 4, 9, 17).

**K2 Norbert ve frontě nastoupí s frontou, ale P5.4 ho potřebuje u pultu.** P5.1 pustí frontu
do Archy, varianta G ale mluví s Norbertem „ve frontě“ až potom. Stejné je to s Předsedou
a Frameworkem, kteří mají ve frontě gagy.

*Návrh:* Norbert zůstane u lávky, dokud nepodepíše: „Nastoupím, až uvidím zkoušku.“ Předseda
a Framework stojí na konci fronty a nastoupí s ní; jejich gagy jsou do P5.1 (po něm jen epilog).
Úprava v P5.1 a S1. Po K13 se týká jen varianty se systémem ve světě iterací.

**K3 Tlačítko *Zkouška pojistek* existuje jen se zlepšením *Ptát se dřív*, ale P5.4 ho potřebuje
vždy.** Varianta M navíc slibuje, že po odpočtu zbude jen „Na tři“. Pan Změna ale stojí na lávce
až po odpočtu a dveře nejde zamknout dřív, než nastoupí všichni.

*Návrh:* zkouška pojistek je na pultu vždy. Bez *Ptát se dřív* ukáže jen „Pečeť“. S *Ptát se
dřív* ukáže i hodnoty, stav a přání Ještětota a ty jde vyřešit předem. Lávka a zamčení dveří
zůstanou po odpočtu. Úprava v P5.4, v úvodu karet a ve variantě M.

**K4 Zaučení stojí na lístcích skutečnosti, které nemusí existovat.** Po zelené zprávě může být
`c4_listky` = 0 (špatný průchod) a tabule má jen zelená světla. Zaučení pak nejde a volba
`poradne` je tiše zamčená. Ani nejkratší cesta kap. 4 nemá červený lístek, přitom legenda zní
„Červená stát.“

*Návrh:* legendu napíše Bára vždy sama na papír a lístky z tabule ji jen doplní: „Zelená jet.
Žlutá pozor. Červená stát.“ Bez lístků použije žlutou barvu a Zelenkovu krabici žárovek
(„Zelenou mám. Žlutou natřu. Červenou… vypnu.“). `c4_listky` doplnit do tabulky výchozího
stavu. Úprava v P5.7 a S2.

**K5 U váhy si P5.12 protiřečí a páry neodpovídají bodům z kapitoly 3.** Pravidlo zní „fyzika
z rampy“, ale špatnou váhu má právě bezpečnostní pult na rampě. Matice přitom řeší váhu deníkem
jeřábu. Páry (úhel, počet míst, váha) navíc neodpovídají bodům v `c3_nesladeno` (`kabel`,
`start`, `navigace`, `pocitadlo`, `svaciny`, `bazen`), takže hráč nepozná, že jde o následek
„Stačí. Zavírám.“

*Návrh:* tabulka bod → pár. Zbylé body jsou konec seznamu `c3_nesladeno` (P4.29 je řeší
popořadě):

| Bod z kap. 3 | Pár ve finále | Platí |
|---|---|---|
| `kabel`, `start` | úhel rampy: rampa 12°, navigace 14° | rampa (beton) |
| `pocitadlo` | počet míst: výkres 4 812 sedadel, věž 4 812 lidí a kocour | věž (lidé) |
| `svaciny`, `bazen` | váha: pult počítá s nákladem, který v Arše není | deník jeřábu na pult (jen jedno řešení, bez dvou tlačítek) |
| `navigace` | nezbude nikdy (nahrává se vždy první) | – |

**K6 Při předání není jasné, kde stojí vrátný.** Po P5.6 jde vrátný do věže, ale P5.15 ho
čeká u dveří Archy.

*Návrh:* po odpočtu sejde vrátný ke dveřím sám („Dole mě budou potřebovat.“), zaučený nebo ne.
Úprava v S1, S2 a v průchodu (krok 15).

**K7 Graf `k5.mjs` a karty se rozcházejí.**
- `uzavreno` čeká na `chybi`. Když Lumír nastoupí dřív (riziko P5.3), počítadlo nic nehlásí
  a `chybi` nenastane. *Návrh:* `uzavreno` po `kontrola`, `nastoupeno`, `lumir_jde`, `pecet`;
  `chybi` jen měkce.
- Systém ve světě iterací s Norbertem v týmu: graf dá pečeť sám po `verze`, karta chce Rudův
  krok (přivést Norberta ke zkoušce). *Návrh:* uzel „Norbert u pultu: zkouška a pečeť“ pro
  `bezp_iterace` (po K13 je Norbert z fronty jen tady).
- Scénář „Špatné kapitoly 1–4“ zapíná obětovaná tlačítka a tři uvízlé skupiny, průchod má
  tlačítka neobětovaná a jednu skupinu prošlou. *Návrh:* průchod sladit se scénářem (po K15
  a K17 ho stejně přepíšu).
- `barva` je v grafu před zkušebním režimem, v kartě až po druhém pokusu. Stačí poznámka v datech.

**K8 Rozdíl mezi `priznal` a `trval` u kamer skoro mizí.** Při `priznal` má Bára hlásit sama,
nejkratší cesta ale kameru stejně ovládá.

*Návrh:* při `priznal` Bára po odpočtu sama ohlásí Pana Změnu i ocas, bez akce hráče. Uzly
`kamera_lavka` a `kamera_dvere` budou jen při `trval`. Nejkratší cesta se zkrátí o krok.

**K9 Ještětoto ve dveřích má v návrhu podmínku, kterou karta nezná.** Návrh říká, že uhne, „jen
když dveře otevře někdo, kdo se na něj podívá“. *Návrh:* větu škrtnout, zůstane ★ „Ty sedíš ve
dveřích.“

**K10 Varianta B mluví o pomníku, který v nejkratší cestě není** (obětovaný v R4.2). *Návrh:*
„Ruda s medailí na rampě neví, co říct.“

**K11 Podmínky konců se překrývají.** Hrdina platí i pro „já“ při nízkém sladění, kdy platí
i Pomník nebo Druhá etapa. *Návrh:* pořadí vyhodnocení výslovně: **1.** nízké sladění → Pomník,
nebo Druhá etapa; **2.** „my“ a vývoj ≥ 4 → Tým; **3.** jinak Hrdina.

## Nesoulad s kapitolami 1–4

**K12 Rybáři čtou špatný příznak.** P5.2 rozhoduje o místu na udice podle `interier_u_rudy`.
Místo na udice ale vznikne jen tehdy, když hráč v M14 kartu *udice* opravdu udělal (uloží se
do `c3_hotove`). `gantt` navíc `interier_u_rudy` nenastavuje, i když ho kapitola 3 bere jako
interiér u Rudy (`kapitola3.js`: `c2_interier=='ruda' || c2_rozdeleni=='gantt'`).

*Návrh:* podmínka „`udice` v `c3_hotove`“, jinak anténa. Úprava v P5.2, v tabulce výchozího stavu
a ve variantě R.

**K13 Podpis Norberta kapitola 3 už jednou vyřešila a u krabice se kap. 3 a 5 neshodnou.**
- Bez Norberta v týmu ho Ruda v kap. 3 přivede z lavičky na náměstí a Norbert trup podepíše
  (`c3_rezerva` −1). Panel bezpečnostního systému je v kap. 3 i 4 „zapečetěný“. Kap. 5 pak
  chce pečeť podruhé.
- Prototyp kap. 3 ukáže „předělává se každý týden“ jen při `c2_bezpecnost` = `bara`. Při
  `krabice` panel vypadá zapečetěně, ale kap. 5 bere `krabice` jako systém ve světě iterací.

*Návrh:*
- **Bez Norberta v týmu nic navíc.** Pečeť je z kap. 3, Norbert ve frontě má jen ★: „Trup jsem
  podepsal z lavičky. Start vidím poprvé.“
- **P5.4 jen pro systém ve světě iterací**, odvozený jedním pravidlem v kap. 3 i 5:
  `c2_bezpecnost` = `bara` nebo `c2_rozdeleni` = `krabice`. V prototypu kap. 3 upravit
  podmínku panelu na stejné pravidlo (jedna řádka).
- Bible: u R2.1 „bez certifikátora náhradní puzzle při startu“ odkáže na kap. 3.

**K14 Startovací klíč a bezpečnostní pult.** V kap. 4 zůstal klíč v pultu motorů v hangáru
a panel bezpečnostního systému je uvnitř trupu. Kap. 5 má klíč v bezpečnostním pultu na rampě
a na konci v kokpitu.

*Návrh:* jedna věta v úvodu kap. 5: zkušební pult vyjel s Archou z hangáru a stojí na rampě
jako bezpečnostní pult (spojený kabelem s panelem v trupu). Norbert do něj ráno zamkl klíč:
„Klíč patří do pojistek, dokud start nepovolí.“ Po „Na tři“ ho pult vydá a vrátný ho zasune
v kokpitu.

**K15 Pořadí uvízlých skupin neodpovídá příčinám z kap. 4.** V kap. 4 selže babička kvůli
obětovaným velkým tlačítkům a obyvatelé kvůli Ganttu. Kap. 5 má pevné pořadí.

*Návrh:* P4.30 uloží seznam skupin, které neprošly (`c4_nastup_chybi`, k `c4_nastup`), a kap. 5
ho přečte. Do P4.30 doplnit, která příčina zastaví kterou skupinu: tlačítka → babička, `gantt`
a `c3_hodnota` ≤ 1 → obyvatelé, bez místa na udice → rybáři.

**K16 Babička s prázdnou klecí.** Bez spojenectví má v S1 prázdnou klec vždy, ale kocour utíká,
jen když babička uvízne. *Návrh:* prázdná klec jen tehdy, když babička uvízne.

**K17 Hodnoty ve špatném průchodu nesedí na špatný průchod kap. 4.** Kap. 4 obětuje bazén
a pomník při Ještětotovi 3, takže `c4_creep` = 1. Nesladěné body jsou navigace, počítadlo
a lávka; lávka se řeší v aktu B a navigace vždy, takže `c4_integrace` ≤ 1. Kap. 5 uvádí 2 a 2
a „až šest přání“.

*Návrh:* špatný průchod převezme hodnoty z kap. 4 (`c4_creep` = 1, `c4_integrace` = 1) a karta
P5.11 řekne „nejvýš čtyři“ (`c4_creep` nejvýš 3 a ohňostroj). Dialogy: kartiček 4, ne 6.

**K18 Předseda bez kufru.** Kap. 4 končí Předsedou „ve frontě s kufrem“ v obou variantách.
*Návrh:* při `hned` si kufr nechal Lumír jako přílohu ke spisu („Kajuta č. 1. Založeno.“)
a Předseda stojí ve frontě s igelitkou. Jedna replika v S1.

**K19 „Před pěti dny“.** Zpráva šla při „zbývá 7“. *Návrh:* „Tohle jsem měl napsat před
týdnem.“

**K20 Nepoužité důkazy zůstanou v inventáři.** Kopie podpisů a svědectví se v konfrontaci
nemusí použít, kap. 5 ale tvrdí, že se ostatní předměty spotřebovaly. *Návrh:* na konci kap. 4
si nepoužité důkazy vezme starosta „pro noviny“ (jedna věta v konci kap. 4 a v kap. 5).

**K21 Mapa následků v bibli neodpovídá tomu, co kap. 5 čte.** Kap. 5 čte i `c1_babicka`,
`c1_slib_vseho`, `c2_mosty`, `c3_integrace`, `c3_bara_priority`, `c3_hotove`, `c3_krysy`
a `c4_listky`; bible u nich kap. 5 neuvádí. Naopak `c4_souboj` a `c3_hodnota` uvádí „čte kap. 5“,
ale kap. 5 je nečte. *Návrh:* sloupec „Čte se“ opravit; `c3_hodnota` v kap. 5 číst nemusí
(projeví se přes `c4_nastup`).

## Drobnosti

- **K22 Nápovědy proti D78.** P5.9 má jen 3. stupeň, dialogy uvádějí 1. a 3.: doplnit 1 „Všichni
  odbavení?“. P5.14 je puzzle (klíč v pultu), ne rozhodnutí: doplnit 3 „Otoč klíčem v pultu.“;
  jen volbě „Na čí tři?“ nechat 1. stupeň.
- **K23 Kávové razítko není předmět** (P5.4). *Návrh:* nahradit hrnkem kávy na pult (★ „Hnědá
  pečeť. Ne.“).
- **K24 Vrátný na jeřábu, nebo u něj?** P5.6 „slézá z jeřábu“, S1 „stojí u jeřábu“. *Návrh:*
  sedí v kabině jeřábu s prázdným hákem a sleze po otázce.
- **K25 Počty předmětů a původ barvy.** Startovací klíč je předmět z kap. 4, nových je tedy 4.
  Žárovku Bára natírala v dílně, plechovka ve věži v kap. 4 není. *Návrh:* „Bára ji ráno
  přinesla z dílny.“ a opravit počty v návrhu a místnostech.
- **K26 Matice nemá Rybáře a Kocoura.** Nováček zkusí krabici od bot na kocoura a metr nebo
  krabici na udice. *Návrh:* dva sloupce, asi 4 ★.
- **K27 Kulaté kajuty v epilogu.** „Kajuty byly kulaté. Točila se mi hlava.“ stojí mezi tím, co
  chybělo; platí ale pro kajuty neobětované. Klářina stránka „Kulaté kajuty jsou kulaté schválně“
  nedává smysl, když jsou obětované. *Návrh:* obě repliky jen při neobětovaných kajutách,
  jinak Klára „Kajuty jsou hranaté. Bohužel.“
- **K28 Chybí příznaky v tabulce.** `c5_lumir`, `c5_pecet`, `c5_chybi_lumir` doplnit do tabulky
  „Další příznaky“ jako stavy kapitoly.
- **K29 *Jedna tabule pro oba* se v nejkratší cestě neprojeví** (bez nesladěných bodů nemá co
  ukázat), přitom ji dává i přeskočení M11. *Návrh:* s tímto zlepšením vidí Ruda na svém pultu
  i kamery, takže lávku a ocas vidí sám.

## Pohled nováčka

| Puzzle | Co zkusí hráč bez znalosti řízení projektů | Odpoví hra? |
|---|---|---|
| P5.1 Nástup | strčit do Ještětota, nabídnout mu kafe, mluvit s frontou | ano, ★ |
| P5.2 Skupiny | udice nebo kocoura do krabice od bot, metr na udice | **ne**, matice nemá rybáře ani kocoura (K26) |
| P5.3 Lumír | naložit archiv, dát mu lístek, výpůjčka perem | ano |
| P5.4 Pečeť | podepsat sám, kafe na pult, zkouška bez Norberta | ano, po K3 je tlačítko vždy |
| P5.5 Návod | napsat sám, Gantt, Frameworkova krabice, stránky rovnou vrátnému | ano |
| P5.6 Kapitán | navrhnout sebe, Pepu, Pana Změnu | ano |
| P5.7 Zaučení | vysvětlit, dát manuál, metr | ano; po K4 i bez lístků |
| P5.8 Kontrola | spustit znovu, myslet si, že je to stará chyba | ano |
| P5.10 Lávka | jít za Archu dřív, Panu Změnovi rovnou odmítnout | z poloviny: chybí volba „Ne.“ s ★ (doplnit: Pan Změna „Ne? A kdy?“ a volba se vrátí) |
| P5.11 Dveře | splnit přání, nacpat Ještětota dovnitř, přání zahodit | z poloviny: „zahodit“ nemá reakci (doplnit ★ „Zahozené přání se vrací. Větší.“) |
| P5.12 Hodnoty | věřit vždy certifikovanému pultu, nebo vždy novějším datům | ano, po K5 i u váhy |
| P5.13 Stav | znovu zadat „zelená“ | ano |
| P5.14 Na tři | otočit klíčem dřív, než je všechno zelené | z poloviny: doplnit reakci pultu „Pojistky červené.“ a 3. stupeň (K22) |
| R5.1, R5.2 | – | ano, šedá volba řekne, co chybí |

## Stav na začátku

- **„Dobré“ kapitoly 1–4:** projdou podle nejkratší cesty. Po K1 se změní počty na počítadle,
  po K8 zmizí ovládání kamer (−1 krok), po K14 přibude věta o klíči v úvodu.
- **„Špatné“ kapitoly 1–4:** projdou. Po K13 bez kroku Norberta (Gantt má systém u Rudy), po
  K17 s jednou kartičkou Ještětota, ohňostrojem a jedním párem hodnot, po K15 uvíznou skupiny
  podle příčin (Gantt → obyvatelé, bez místa na udice → rybáři).
- **Příznaky z kap. 1–4:** jména sedí (`bezp_u_rudy`, `interier_u_rudy`, `c3_krysy`, `c4_*`).
  Po K12 a K13 se `interier_u_rudy` nečte a `bezp_u_rudy` nahradí odvozené pravidlo.

## Rozpočet

Osnova měla asi 385 replik. Po zapracování má asi **405**: nové repliky přidaly K1 (počítadlo),
K2 a K13 (Norbert), K4 (legenda bez lístků), K6 (vrátný), K14 (klíč), K18 (Předsedův kufr), K22
(nápovědy a reakce pultu), K26 (5 ★ s rybáři a kocourem), K27 (kajuty) a reakce z pohledu
nováčka; K17 ubral 2 popisky kartiček. Do kapitoly 4 přibyly 2 věty (K15, K20) a do prototypu
kapitoly 3 jedno pravidlo (K13). Škrtat navrhuji až v N6, nejdřív vlastní reakce ★.

## Opraveno rovnou

- **D1** Průchod, varianta C odkazovala na variantu K místo J (odložit přání Ještětota).
- **D2** Kryštofova stránka měla v kartě a v dialozích jinou repliku; sjednoceno na „Předávací
  protokol. Konečně ho někdo chce.“
