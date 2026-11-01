# Kapitola 3: osnovy dialogů

> Krok N3e [postupu návrhu](../12-postup-navrhu.md). Co která postava hráči řekne, za jakých
> podmínek a co se tím změní. Texty první verze (N6) se napíšou až před výrobou kapitoly 3.
> Stav: **schváleno** (D72), verze 0.1

**Poučení z kapitol 1 a 2:** kapitola 1 přetáhla odhad o 19 %, kapitola 2 o 3–4 % už při N4.
Rozpočet replik je vodítko, ne strop (D68). Bára mluví v kapitole 3 nejvíc z celé hry, proto
má i vlastní prohlížení a nápovědy.

## Úvod, Pembok a přepínání

| Téma | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| úvod | záběry 1–6 z [návrhu](03-realizace.md#úvod-ráno-na-staveništi): „Tohle umím.“ „Tohle opravdu umíš.“ „Napíšu ti, co máš dělat.“ „Nenapíšeš.“; Předseda a formuláře; kočka v koši | `c1_faze2`, `krysy` | – | 14 |
| přepínání | „Podívej se jejíma očima.“; připomínka, když jedna linka stojí: „Zkus to chvíli očima Báry.“ / „…Rudy.“ | – | – | 4 |
| pochvala | Pembok chválí Rudu poprvé (M13, rozpis na plotě): „Tohle ti jde. Nezvykej si.“ | po M13 | – | 3 |
| nápovědy | 3 stupně pro P3.1–P3.3, P3.8 (za Rudu), P3.9, P3.10, P3.12; 1 stupeň u P3.11 a P3.13 | podle stavu | – | 28 |
| chybějící vstupy | rozcestník před M13 a M14, místo pro počítač před R3.2, schválený poklop chybí | – | – | 4 |
| přeskočení minihry | M13 „podle Gantta“, M14 „všechno najednou“, M10 „všechno k posouzení“, M15 „všechno dovnitř“ | přeskočení | – | 4 |
| ★ Pembok | Norbert a mlčení („Budu mlčet.“ … „Teda…“), Rudův Gantt v aplikaci („projde tvoje přání stejnou bránou?“), posezení („Na kolika sis řekl, co příště jinak?“) | – | – | 4 |

## Bára (hraná postava)

| Téma | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| nápovědy (metr) | 3 stupně pro P3.4–P3.8 | podle stavu | – | 15 |
| prohlížení za Báru | Bára měří: dílna (tabule, háčky, police, mlha, počítač), náměstí (rybáři, babička, obyvatelé), staveniště a sklad jen tam, kde nese stopu | – | – | 25 |
| vedení porady | „Co dneska a co ti brání?“, utnutí odboček, poslat Rudu pryč na deset minut | P3.4 | porada | 8 |
| dílna | „Tři háčky. Ne šest.“, „Kdo dělá všechno, nedokončí nic.“, „Až něco dokončíme.“ | P3.5 | – | 5 |
| plán kola | „Co chceme na náměstí zjistit?“, „To není cíl, to je seznam.“, reakce na kartu navíc | P3.6 | `c3_dluh` | 6 |
| vada | „4 811. Kdo chybí?“; zápis; vyslechnutá: „Podle pořadí na lince pomoci ty.“; odbytá: „Stejně by mě neposlouchal.“; za Rudu pomalé vyprávění se třemi pauzami a „Nic. Neřeším.“ | P3.8, důvěra | `c3_vada_hlasena`, důvěra | 10 |
| seznam pasažérů | „Ještě ne.“ (D59) | seznam na Rudu | – | 2 |
| R3.2 | pustit: „…Dobře. Počítadlo do zavření. Navigace potom.“ / rozhodovat sám: „Dobře. Tvůj Gantt.“ | R3.2 | důvěra | 4 |
| změny | „Aplikace se dá předělat zítra. Trup ne.“; poklop: „Kdyby měl trup dvířka…“; papír o Arše a bazén | M10, `c1_mimo_rozsah` | – | 5 |
| Bára jako postava | když s ní mluví Ruda: Co děláš? (dílna), Jak šla porada?, Jak dopadla ukázka?, „Báro, něco tě trápí?“ (po odbytí), mikromanagement („Rudo.“) | – | – | 10 |
| konec | „Tohle není počítadlo.“ / odvrátí se; R3.2 = ano: krátký úsměv | konec | – | 3 |

Bářiny výchozí reakce (`bara_*`) z kapitoly 1 se použijí znovu.

## Ruda jako postava (když se hraje za Báru)

| Téma | Podstata | Podmínka | Odhad |
|---|---|---|---|
| vtrhne na poradu | „Tak. Rozdělím vám to. Pepa: odpočet…“; „Deset minut. Měřím to.“; při `gantt` s vytištěným Ganttem | P3.4 | 4 |
| odbytí | „Teď ne, Báro, mám jeřáb.“ | P3.8, nízká důvěra | 1 |
| návštěva v dílně (hraje-li se za Rudu, ★) | „Tohle dej sem. A tohle do úterý.“, „Můj model! Kdo ho tu rozdělal?“ | fáze A–B | 3 |

## Tým

Mluví jen ti, kdo jsou v `c2_tym`. Každý má repliku k posezení (R3.3) podle toho, co se v kapitole stalo.

| Postava | Témata | Podstata | Odhad |
|---|---|---|---|
| **Věra Výztužná** | bednění (M13), dopad změn (bazén, poklop, „Plech se nezkouší po kouskách.“), trup se zavírá, aplikace ven (M15), poklop bez výpočtu ★, posezení | „Trup se počítá, ne přeje.“; „Zítra zavírám. Kdo tu bude, zůstane.“ | 14 |
| **Pepa „Dva dny“** | porada (odbočka k automatu), nápad Had, kotva v M13, zápis vady ★, plán kola „To dáme, dva dny.“, posezení, konec „Dva dny.“ | | 12 |
| **Norbert Norma** | trup se zavírá jen podepsaný, panel bezpečnostního systému (varování při `c2_vyjimky`), posezení; bez Norberta v týmu: lavička na náměstí, norma o knihách, mlčící Pembok, podpis | | 14 |
| **Klára Maketová** | porada (kulaté kajuty), maketa, ukázka, posezení | „Nikdo neví, jak chce spát, dokud si nelehne. Tak si lehnou do makety.“ | 9 |
| **Zdenda Známý** | kafe na poradě, jeřábník („Znám chlapa, co má jeřáb.“ „To je náš jeřábník.“), posezení | | 6 |
| **Kryštof Krabička** | porada o poradách, lepicí lístky „Moje!“, posezení „příště“ | | 6 |

## Vrátný (jeřábník)

| Téma | Podstata | Podmínka | Odhad |
|---|---|---|---|
| uvítání | „Za třicet let poprvé vidím, kam jedu.“ | – | 2 |
| klíč od skladu | „Mám klíče od všeho. Nikdo se nikdy nezeptal.“ | – | 2 |
| lano | `lano`: „Nové. Voní.“ / jinak: „Drží. Zatím.“ | R2.3 | 2 |
| jeden jeřáb | „Jeden jeřáb, jeden den, jedna věc.“ (stopa M13) | – | 1 |
| výpočet statika | „Nad deset metrů jen podle výpočtu.“, přijetí výpočtu | bez Věry | 3 |
| ★ s předměty | káva „Za jízdy nepiju.“, krabice, rozpis | – | 2 |

## Předseda Věčný

| Téma | Podstata | Podmínka | Odhad |
|---|---|---|---|
| kontrolní návštěva | „Výborně. Pomalu.“ | fáze A–B | 2 |
| žádosti o změnu | „Změny přijdou. Vždycky přijdou.“; další kopie kdykoli | – | 3 |
| fáze 2 | analýza dopadu u každé změny; „Pozastavena… No ano. Prozatím.“ | `c1_faze2` | 4 |
| Framework | „Ing. Framework vás pozdravuje. Je teď u nás. Na zkoušku.“ (náznak pro kap. 4) | bez `krabice` | 1 |
| aktovka | „Výborně, výborně.“ odchod; v M10: „Moje aktovka je nějak živější.“ | P3.2 = aktovka | 3 |
| u přihrádky posouzení | „Ve třech kopiích, prosím.“, razítko, svačiny „za tři týdny“ | M10 | 4 |
| ★ úsměv | krabice od bot na Předsedu při `usmev`: „Zase ta krabice? Výborně.“ | `usmev` | 1 |

## Pan Změna

| Téma | Podstata | Podmínka | Odhad |
|---|---|---|---|
| stánek | „Dneska prodávám přání.“ | – | 2 |
| svačiny na ukázce | „A objednat svačinu by v tom nešlo?“ → narodí se Ještětoto | M14 | 2 |
| bazén | přání, výměna za nafukovací bazén („Do kajuty? Ale s vlnami.“), s papírem o Arše hned | M10 | 4 |
| dohoda | „Podepsal jsem to. Takže to opravdu chci.“ | `c1_zmena_dohoda` | 1 |
| bazén s vlnami | 3. kolo | bez dohody nebo bazén nevyjednán | 2 |
| bazén ven | urazí se (M15, bazén bez řízení) | M15 | 1 |
| ★ s předměty | žádosti, káva, rozpis | – | 2 |

## Ing. Framework (jen při `c2_rozdeleni` = `krabice`)

| Téma | Podstata | Odhad |
|---|---|---|
| úvod | na staveništi s kufrem: „Betonová kola po třech dnech. Každé kolo ukázka.“ | 2 |
| ukázky betonu (M13) | vložení karet, protest při odnesení („To je tak minulé čtvrtletí.“), rozdrolený beton („Ten beton nebyl připravený na ukázku.“) | 3 |
| seznam v krabici (M14) | „Pořadí je posvátné.“; vyndání: „Krabice se neotvírá. Krabice se obnovuje.“ | 3 |

## Ještětoto, kočka Riziková, babička, rybáři, obyvatelé, kocour

| Postava | Podstata | Podmínka | Odhad |
|---|---|---|---|
| Ještětoto | narození u stánku (Ruda, nebo Bára: „Co to je?“ Pan Změna: „Ještě tohle.“); prohlédnutí podle velikosti 0–4, jméno se natahuje (viz níže) | M14, `c3_creep` | 7 |
| kočka Riziková | příchod v koši; ve skladu: krysy si vezmou dovolenou; ★ s kocourem „Dva soudci. Jedno město.“ | `krysy` | 6 |
| babička | noviny s lupou; „Přišla jsem se podívat, jestli se tam vejdu. I s kocourem.“; podle `c1_babicka` (spojenec / odmítnutá / ostatní) | fáze B | 6 |
| rybáři | „Chytáme, co teče.“; „Na Archu? S udicemi, nebo vůbec.“ | – | 3 |
| obyvatelé s kufry | „Kudy se bude nastupovat?“ (pořád) | – | 3 |
| kocour | ★ s kočkou, ★ s krabicí („Tenhle soudí.“) | – | 2 |

## Scény s rozhodnutím

| Scéna | Podstata | Odhad |
|---|---|---|
| ranní porada | rámec scény mimo repliky týmu: minutka, úvod, konec včas / přetaženo, překážka | 6 |
| co příště jinak | rámec: volba, tři nabídnutá zlepšení podle kapitoly, „Nemáme čas. Stavíme.“ a mlčky odcházející tým | 8 |
| R3.2 | Ruda u Bářiných karet: dvě nevolitelné repliky vnitřního boje, volba | 4 |

## Ruda a prohlížení

| Skupina | Podstata | Odhad |
|---|---|---|
| prohlédnutí aktivních míst | podle [obsahu místností](03-mistnosti.md), asi 45 míst a 10 variant podle fáze (rampa, Archa, kalendář, Ještětoto) | 55 |
| prohlédnutí předmětů | 15 předmětů (Bářiny prohlíží Bára) | 15 |
| vlastní reakce ★ z matice | podle [matice předmětů](03-mistnosti.md#matice-předmětů) | 72 |
| krabice od bot | lístky krysy a lano jako nápověda; kometa a Ještětoto ★ | 4 |
| mikromanagement | Ruda v dílně a u Bářiných karet | 4 |
| střihy fází | „Zbývá 18.“, „Zbývá 12. Zítra se zavírá trup.“ a co se mezitím postavilo | 6 |
| konec kapitoly | proslov podle R3.2, tlačítko, „Dva dny.“ | 8 |
| výchozí reakce | sada z kap. 1 (`obecne_*`) se použije znovu | 0 |

## Minihry

| Minihra | Texty | Odhad |
|---|---|---|
| M13 Jeřábový balet | vrátný komentuje dny (6), zřícené bednění, fronta, „Nemáme bednění“, lano, oslava, zrání „jediná věc, co opravdu trvá dva dny“, zábradlí, výsledek (2) | 14 replik + 12 popisků |
| M14 Ukázka na náměstí | reakce na 8 karet, babička podle `c1_babicka`, rybáři, Ruda zakazuje ukázku (`gantt`), výsledek | 20 replik + 11 popisků |
| M10 Ještětoto | 6 karet × důvody cest, vyjednávání bazénu, Ještětoto roste | 22 replik + 10 popisků |
| M15 Než se zavře trup | Ruda „všechno dovnitř“, Bára „nic neslíbím“, Věra vrací aplikaci, bazén v cestě, zavření, výsledek | 16 replik + 14 popisků |

## Konec kapitoly a obrazovka následků

Obrazovka „Co si Nedostavěnice zapamatovala“ (popisky, ne repliky): rampa (3 varianty podle
rezervy), ukázka (3), Ještětoto (3), trup (3), pořadí práce (2), posezení (2), vada (2).
Celkem asi 18 vět.

## Součet

| Skupina | Odhad replik |
|---|---|
| úvod, Pembok, přepínání | 61 |
| Bára (hraná) | 93 |
| Ruda jako postava | 8 |
| tým | 61 |
| vrátný | 12 |
| Předseda | 18 |
| Pan Změna | 14 |
| Ing. Framework | 8 |
| Ještětoto, kočka, babička, rybáři, obyvatelé, kocour | 27 |
| scény s rozhodnutím | 18 |
| Ruda a prohlížení | 164 |
| minihry | 72 |
| **Celkem** | **≈ 556 na jazyk** |

Rozpočet je 450–550 (D56). Odhad je o 1 % nad horní mezí. K tomu asi 47 popisků miniher,
18 vět obrazovky následků a GUI. V jednom průchodu hráč slyší asi 420: varianty podle týmu,
`c2_rozdeleni`, kočky a babičky se vylučují. Když se v N6 ukáže, že je to moc, škrtají se
nejdřív vlastní reakce ★ (72) a prohlížení za Báru tam, kde nenese stopu.
