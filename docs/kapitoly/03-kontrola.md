# Kapitola 3: autorská kontrola (N4)

> Krok N4 [postupu návrhu](../12-postup-navrhu.md) bez hráčů (D66). Nejkratší cesta, varianty
> a „špatné“ kapitoly 1 a 2 z [průchodu](03-pruchod.md) prošly krok za krokem proti
> [kartám puzzlů](03-puzzly.md), [obsahu místností](03-mistnosti.md) a pravidlům miniher
> v [návrhu](03-realizace.md). Navíc kontrola detailů proti kapitolám 1 a 2: návrhy, texty
> kapitoly 1 v `texty.csv` a mapa následků v [bibli](../03-pribehova-bible.md#rozhodnutí-a-jejich-pozdější-následky).
> Stav: **zapracováno** (D73), 2026-11-01. Všechny návrhy K1–K16 autor schválil. Texty kapitoly 3 ještě nejsou (N6), takže se
> kontrolují jen osnovy.

## Shrnutí

| Oblast | Výsledek |
|---|---|
| Průchod krok za krokem | projde; 6 logických děr (K1–K6), nejvážnější je časová osa kol (K1) |
| Soulad s kapitolami 1 a 2 | 4 nesoulady (K7–K10) |
| Stav na začátku | „dobré“ i „špatné“ kapitoly 1 a 2 projdou; každý čtený příznak se v kap. 1–2 nastavuje |
| M13 | rozpis ručně ověřen (nejlepší plán 14. den, s výpadkem lana jen plán 2); po D72 nejhorší start −1 |
| M14 | nejlepší výsledek 14 jde se všemi stavy babičky; bez druhé ukázky (`gantt`) nejvýš 2 |
| Nápovědy | 3 stupně u všech 11 puzzlů, 1 stupeň u dvou rozhodnutí (R3.2, R3.3) |
| Drobnosti | K11–K16 |
| Rozpočet | 556 replik, s návrhy K asi 565; rozpočet 450–550 je vodítko (D68) |
| Chyby v dokumentech | 3, opravené rovnou (D1–D3) |

## Logické díry

**K1 Časová osa kol nesedí.** Kolo za Báru nemá stanovenou délku a čísla kol se tlučou s fázemi:
- Plán kola je ve fázi A (zbývá 24), ukázka po 1. kole začíná fázi B (zbývá 18). Kolo by tedy
  trvalo 6 dní.
- M14 má ale další dvě kola s ukázkami. Při 6 dnech na kolo by skončila na zbývá 6, tedy až po konci
  kapitoly (zbývá 9).
- M15 počítá s tím, že se trup zavírá „na konci 2. kola“ a navigace je hotová „ve 3. kole“.
  Jenže 2. a 3. kolo už proběhla v M14, a to s jinými kartami (aplikace a kajuty).
- R3.2 je ve fázi C (zbývá 12) a má rozhodnout, co bude hotové k zavření trupu (zbývá 11).
  Na to už není čas, pořadí práce by se změnilo den před zavřením.

*Návrh:*
- **Kolo trvá 3 dny.** Fáze B začne na zbývá 21 (ukázka po 1. kole), M14 obsáhne ukázky po 1., 2.
  a 3. kole (zbývá 21, 18 a 15). Rampa na pozadí ve fázi B: pilíře v bednění.
- **R3.2 se přesune na konec fáze B** (zbývá 15, po M10). Fáze C začne střihem „Zbývá 12.
  Zítra se zavírá trup.“ Volba pořadí tak rozhodne 4. kolo (15 → 12), ve kterém se dělá řídicí
  systém. Bářin seznam práce po M14 obsahuje i karty řídicího systému (start motorů, počítadlo,
  navigace), které se na náměstí neukazují.
- **M15 bez čísel kol:** karty ukazují „hotové před zavřením“ nebo „hotové po zavření“.
  Počítadlo je hotové před zavřením jen při R3.2 = Bára a `c3_dluh` ≤ 1, jinak po zavření.
  Navigace je vždy po zavření.

Úprava v návrhu (fáze, M14, M15, graf), kartách P3.6, P3.11 a P3.12 a v průchodu (kroky 17, 27, 28).
D72 („R3.2 v dílně před M15“) platí dál.

**K2 Bez poklopu nemá kdo odejít s klíčem od poklopu.** `c3_klic_poklopu` určuje, kdo v kap. 4
odejde, když se neudělalo posezení. Při `c3_poklop` = `ne` ale žádný poklop ani klíč není.
*Návrh:* příznak přejmenovat na **`c3_odchazi`** (člen v pořadí Pepa, Klára, Věra, Norbert)
a předmět, který si odnese, určit podle poklopu: s poklopem **klíč od poklopu**, bez něj
**plán zapojení trupu** (bez něj nikdo neví, co je uvnitř, a trup se v kap. 4 otevírá naslepo).
Úprava v návrhu, M15, bibli a kostře kap. 4.

**K3 Kdy se vrátí bazén s vlnami.** Tabulka M10 říká, že 3. kolo je „jen bez dohody a když bazén
nebyl vyjednán“. Varianta B v průchodu tvrdí, že se Pan Změna po odmítnutí vrátí i s dohodou.
*Návrh:* 3. kolo **bez dohody vždy** (Pan Změna si to rozmyslí, i když bazén vyjednaný byl),
**s dohodou jen tehdy, když bazén nebyl vyjednán** (odmítnutý nebo přijatý rovnou). „O kolo
kratší“ pak platí pro toho, kdo má dohodu a bazén vyjedná.

**K4 Kdy se Ruda může zeptat na vadu.** Karta P3.8 nabídne Rudovi otázku „Báro, něco tě trápí?“
až po tom, co ho Bára neúspěšně zkusila oslovit. Varianta J v průchodu ji dává i hráči, který
za Báru zápis vůbec nenesl.
*Návrh:* otázka se nabídne **hned po nalezení vady** (Bára se mračí do počítače), bez ohledu na
pokus za Báru. Hráč za Rudu, který si všímá, má vždy šanci. Úprava v P3.8.

**K5 Kocour v M14 nedělá rozdíl.** Karta *Smí kocour?* se podle tabulky objeví po ukázce aplikace,
tedy v 1. kole u každého hráče. Výhoda spojenkyně babičky („hned v 1. kole“) proto neexistuje.
*Návrh:* běžná babička prozradí velká tlačítka po 1. ukázce a kocoura po 2.; spojenkyně obojí
po 1.; odmítnutá obojí až po 2. Nejlepší součet 14 jde dál se všemi stavy, liší se jen tím, kolik
ukázek je potřeba. Rozdíl je cítit při `gantt`, kde je ukázka po 2. kole zakázaná.

**K6 Kde stojí druhá postava při společných scénách.** M10 (hangár), R3.2 (dílna) a M15 (trup)
potřebují obě postavy, ale druhá zůstává tam, kde ji hráč nechal. V nejkratší cestě stojí Bára
na staveništi (krok 23), a přitom je v kroku 26 u rozcestníku a v kroku 28 v dílně.
*Návrh:* společná scéna začne krátkým střihem, který druhou postavu přivede („Bára přišla
z dílny.“). Po scéně zůstanou obě, kde scéna proběhla. Platí i pro rozhodnutí R3.3. Bez nových
replik, jen pravidlo v části „Jak se hraje za dva“.

## Nesoulad s kapitolami 1 a 2

**K7 Pembok už v kapitole 1 chválí.** Návrh kapitoly 3 opakuje, že Pembok Rudu u M13 „poprvé
pochválí“. V kapitole 1 ale už uznale říká „Zapsané a podepsané přání. Tohle bys měl dělat
častěji.“ (`ch1_kombinace_pozadavek_pembok`) a „Teď víš, s kým mluvit.“ (`ch1_m02_hotovo`).
*Návrh:* „poprvé pochválí Rudu za to, co opravdu umí“. Rudova replika „Počkej, to byla
pochvala?“ zůstane, vtip stojí na tom, že pochvala bez ironie je u Pemboka vzácná.

**K8 Pozadí kapitoly 2 neznají dveře dílny, skladu a žebřík do trupu.** Staveniště a hangár jsou
nová pozadí kapitoly 2, ještě nevyrobená. Kapitola 3 na nich potřebuje dveře skladu (staveniště),
boční dveře do dílny a žebřík do Archy (hangár). Když je zadání grafiky kap. 2 nebude mít,
pozadí se budou předělávat.
*Návrh:* doplnit do [obsahu místností kap. 2](02-mistnosti.md) jako prvky, které v kapitole 2
nic nedělají: dveře skladu („Zamčeno. Uvnitř něco šustí.“, stopa ke krysám), dveře dílny
(„Bářin kout. Zatím jen bedny.“), žebřík k Arše („Dovnitř zatím ne. Je tam hlavně rez.“).
3 texty v kap. 2.

**K9 Babička a rampa.** Rampa se v kapitole 3 dostavuje na babiččině pozemku a podle kapitoly 1
jí už teď stíní rajčata. Kapitola 4 nechá přehlédnutou babičku rampu zablokovat, ale kapitola 3
o tom mlčí, takže blokáda přijde bez varování.
*Návrh:* předzvěst na plotě podle `c1_babicka`: `prehlizena` a `neodhalena`: „Rajčata jsou
ještě bledší. Rampa roste.“; `odmitnuta`: cedule na plotě „Pozemek je můj.“; `spojenec`: na
ukázce „Konečně se někdo ptá.“ (návrat k její replice z kap. 1). 3 texty.

**K10 Rudův Gantt v dílně.** V kapitole 2 je Gantt nakreslený křídou na stěně hangáru. V R3.2
visí v dílně „vytištěná část“, aniž by hra vysvětlila, odkud se vzala.
*Návrh:* Ruda ji do dílny přinese sám, když se ve fázi A přijde podívat: „Přepsal jsem ti to
na papír. Ať to máš po ruce.“ Bára: „Rudo.“ Je to další kousek mikromanagementu. 1 text.

## Drobnosti

**K11 Předseda u jeřábu.** Obsah místností ho nechá stát u jeřábu, „dokud krysy nejsou pryč“,
varianta s kočkou do konce fáze B. *Návrh:* stojí tam do konce fáze B, při řešení aktovkou
odejde hned po něm. Do M10 přijde v obou případech.

**K12 Norbert v davu, nebo na lavičce.** Návrh kapitoly říká „v davu na náměstí“, místnosti
a karta P3.3 „na lavičce“. *Návrh:* na lavičce (je tam i mimo ukázku).

**K13 Bez Věry nýtuje Ruda.** Průchod (varianta Q) to říká, popis M15 počítá jen s Věrou.
*Návrh:* doplnit do M15: „bez Věry nýtuje Ruda“ („Nýtovačka. Jak těžké to může být.“).

**K14 Ještětoto při přeskočené M14.** Tvor se rodí z otázky Pana Změny uvnitř M14. *Návrh:* narození
je střih po M14, takže proběhne i při přeskočení.

**K15 Žádosti o změnu před otevřením skladu.** Karta P3.2 dovoluje použít žádosti na aktovku,
ale neříká, co se stane, když je sklad ještě zamčený. *Návrh:* ★ „Krysy jsou pořád zamčené.“
a žádosti zůstanou v inventáři.

**K16 Nápovědy u rozhodnutí.** N3h tvrdí, že každý puzzle má tři stupně nápovědy. R3.2 a R3.3
mají jeden, protože jsou to rozhodnutí. *Návrh:* upřesnit v N3h: „rozhodnutí mají jen
1. stupeň, nápověda neradí volbu“.

## Pohled nováčka

| Puzzle | Co zkusí hráč bez znalosti řízení projektů | Odpoví hra? |
|---|---|---|
| P3.1 M13 | dát práce hned za sebe bez zrání, třetí sadu bednění | ano, zřícené bednění a ★ „Třetí sada je ve fázi 2.“ |
| P3.2 Krysy | vejít, kávu, kocoura, žádosti rovnou krysám | ano, ★ u všech, žádosti se vrátí |
| P3.3 Chybějící dovednost | podepsat výpočet sám, poslat Zdendu | ano, ★ |
| P3.4 Porada | nechat všechny mluvit | ano, minutka uteče a kapacita klesne |
| P3.5 Dílna | začít plán kola hned, všechno odložit | ano, ★ „Nejdřív dokončit.“, „Na sloupek čekáme.“ |
| P3.6 Plán kola | vzít Rudovy karty, přidat pátou | ano, slabá ukázka, `c3_dluh` |
| P3.7 M14 | neukazovat, nechat heslo | ano, reakce babičky; po K5 je cítit i stav babičky |
| P3.8 Vada | opravit potichu | ano, ★ „Ale on to má vědět.“ |
| P3.9 M10 | všemu říct ne | ano, Pan Změna se vrátí a obyvatelé jsou naštvaní |
| P3.10 Poklop | nasadit bez schválení | ano, ★ Věra |
| P3.12 M15 | všechno dovnitř | ano, nehotová navigace uvnitř |

## Stav na začátku

- **„Dobré“ kapitoly 1 a 2:** projdou podle nejkratší cesty. Po K1 a K6 se změní kroky 17, 22–28
  (R3.2 před střihem na zbývá 12, Bára přichází ke společným scénám sama).
- **„Špatné“ kapitoly 1 a 2:** projdou. Bára mlčí, ale vada má cestu přes Rudu (K4), M10 má
  Pembokovu nápovědu, Norbert má okliku. Nejlepší výsledek M13 po D72 je `c3_rezerva` = −1.
- **Příznaky z kap. 1–2:** všechny, které kapitola 3 čte (`c1_bara_vyslechnuta`, `c1_faze2`,
  `c1_zmena_dohoda`, `c1_mimo_rozsah`, `c1_babicka`, `c2_tym`, `c2_tym_pokryti`, `c2_rozdeleni`,
  `c2_vyjimky`, `c2_riziko_predem`, `c2_rizika_zapsana`, `c2_odhad`, `c2_rozpad`, `c2_mosty`),
  se v kap. 1–2 nastavují. Mapa následků je uvádí (po N3 kap. 3).

## Rozpočet

Osnova má 556 replik. Návrhy K přidávají asi 9 textů (K7–K10, K13, K15), K1, K2 a K6 nemění počet
replik, jen pravidla. Celkem asi 565, tedy o 3 % nad horní mezí 550. Rozpočet je vodítko (D68),
škrtat navrhuji až v N6, nejdřív vlastní reakce ★.

## Opraveno rovnou

- **D1** Výchozí stav v návrhu odkazoval na špatné karty (vada je P3.8, fáze 2 je P3.9).
- **D2** Předmětů jen ve variantě je jeden (výpočet statika), ne dva: kočka není předmět.
- **D3** Varianta O (krabice) v průchodu tvrdila nižší Bářinu důvěru; podle definice ji snižuje
  jen `gantt`.
