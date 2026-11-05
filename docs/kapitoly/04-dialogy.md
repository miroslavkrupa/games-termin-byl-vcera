# Kapitola 4: osnovy dialogů

> Krok N3e [postupu návrhu](../12-postup-navrhu.md). Co která postava hráči řekne, za jakých
> podmínek a co se tím změní. Texty první verze (N6) se napíšou až před výrobou kapitoly 4.
> Stav: **hotovo**, verze 0.2 (tvar D77, kontrola N4 zapracována v D78)

**Rozpočet:** 400–500 replik na jazyk (D56), překročení schválené (D77), návrh odhadoval 650–700.
Rozpočet replik je vodítko, ne strop (D68). Kapitola 4 má nejvíc variant z celé hry: šest
ukazatelů ve dvou až třech barvách, dva poslové a následky kapitol 1–3.

## Úvod, Pembok, přepínání a vysílačky

| Téma | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| úvod | záběry 1–4 z [návrhu](04-krize.md#úvod-večer-ve-věži-23-min): amplion „sedm“, „Bylo devět!“, „Kometa nečte Gantty.“, Zelenka „Všechno zelené. Jako vždycky.“, Pan Změna z okna „Můžu objednat ohňostroj?“, štítek Rampy, „Zelená je barva naděje. Ne stavu.“, úkol | – | – | 14 |
| hlášení lístků | postava nahlásí lístek vysílačkou: 6 lístků ve 2–3 barvách („Věž, tady Ruda. Rampa: plošina chybí.“) | po ověření | `c4_listky` | 15 |
| přepínání a posel | „Podívej se jejíma očima.“; v aktu B „Zeptej se posla, co dělá Bára.“ (nebo Ruda) | – | – | 4 |
| nápovědy | 3 stupně pro P4.1, P4.2, P4.6, P4.8, P4.10–P4.17, P4.29–P4.31; 1. a 3. stupeň pro P4.18 (puzzly na jeden krok, D78); 1 stupeň u R4.1–R4.3; před usmířením bez plošiny „Rampa nemá kde skončit. Vrátný to ví.“ | podle stavu | – | 51 |
| chybějící vstupy | poctivá zpráva se 3 lístky („Na poctivou zprávu víš málo.“), co chybí k nástupu (babička, plošina, drolení, den lávky), k poklopu (páska, oprava, bazén „Kabel vede přes bazén.“), k usmíření (která linka) | – | – | 8 |
| přeskočení minihry | M03 „rychlé repliky“, M11 „Jedna tabule pro oba“ | přeskočení | – | 2 |
| ★ Pembok | povolení („Tohle razítko nedostaneš. A on to ví.“), pomník („Pomník za projekt, který neodletěl?“), vysílačka v aktu B („Je vypnutá. Ona ne.“), konfrontace („Já jsem jen schvaloval. Taky jsem tak začínal.“) | – | – | 4 |

## Bára (hraná postava)

| Téma | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| nápovědy (metr) | 3 stupně pro P4.3, P4.4, P4.5, P4.19, P4.20, P4.22; 1. a 3. stupeň pro P4.16, P4.21, P4.23, P4.24, P4.25 (D78); 1 pro P4.26 | podle stavu | – | 30 |
| štítky | co který štítek znamená: „Pytle nejsou rampa.“, „Odškrtnuté není zapojené.“, „Sedadla nenastupují. Lidé ano.“, „Prázdný šuplík. Tak žádné změny.“, docházka „Všechny podpisy psal Kryštof.“ | – | – | 6 |
| prohlížení za Báru | Bára měří: věž, hangár, dílna, archiv, Komise (kufr „kajuta jedna“), staveniště (prasklina, poklop „o dva milimetry“) jen tam, kde nese stopu | – | – | 30 |
| akt B | ignoruje Rudu („S Rudou teď nemluvím.“), „Kdyby mě tehdy nechal domluvit.“ (vada), „Aplikace neví, kdy je lávka. Ruda to ví.“ | akt B | – | 4 |
| archiv a kometa | „Spí. Potřebovala bych něco, co zvoní.“, „Měřím.“, „Ruda to tu jednou seřadil podle skutečnosti.“, „Duben. Měsíc před Archou.“ | P4.19–P4.20 | – | 8 |
| plán Komise | „Seznam z roku 1994. Kometa v dubnu, Archa v květnu. Seznam psali mezi tím.“, „Chtěli odletět sami.“ | P4.21 | – | 3 |
| vzkaz Rudovi (D59) | vysoká důvěra: „Vyřiďte Rudovi, co vím o Předsedovi. Hned.“; nízká: „Ještě ne.“ | P4.26 | `c4_bara_rekla` | 4 |
| seznam pasažérů | „Ještě ne.“ (D59) do P4.21 | seznam na Rudu nebo posla | – | 2 |
| konec | `priznal`: „Zítra.“; `trval`: mlčí na druhém konci rampy; žárovka natřená nažluto pro Zelenku („Natřená. Svítí míň. Ale svítí.“) | konec | – | 3 |

Bářiny výchozí reakce (`bara_*`) z kapitoly 1 se použijí znovu.

## Ruda jako postava (když se hraje za Báru)

| Téma | Podstata | Podmínka | Odhad |
|---|---|---|---|
| akt A | návštěva dílny: „Kolik lístků máš?“ | akt A | 3 |
| akt B | „Vyřiďte Báře, že nemluvím.“; za ní v Komisi stojí zády | akt B | 3 |

## Dispečer Zelenka (nová postava)

| Téma | Podstata | Podmínka | Odhad |
|---|---|---|---|
| uvítání | „Všechno zelené. Jako vždycky.“, „Zelená je klidná barva.“, kšilt | – | 3 |
| co světla měří | neví, ale ochotně ukáže štítek; „Já je jen rozsvěcuju.“ | – | 6 |
| žárovky | „Týdenní výměna žárovek. Zásoba na třicet let. Jen zelené.“ (Rudova zeď slávy) | – | 3 |
| vysílačky | „Hlásit se do věže. Rád slyším dobré zprávy.“ | úvod | 2 |
| komentáře lístků | ke každému lístku podle barvy: „Žlutá? Tu jsem tu ještě neviděl.“, „Červená. Hm. To je… výrazné.“; lístek přes sklo: „Zelená pod žlutým papírem. Pořád zelená. Ale pravdivá.“ | po lístku | 13 |
| R4.1 | poctivá: „Žlutá ve zprávě? To se tu ještě nestalo.“; zelená: „Výborně. Jako vždycky.“ | P4.7 | 2 |
| akt B a C | „Lístky jsem nechal viset. Kvůli výhledu.“, v nástupní zkoušce z věže „Žlutá!… Zelená!“ | – | 3 |
| konec | vymění poslední zelenou žárovku za Bářinu natřenou | konec | 2 |

## Starosta Bohumil

| Téma | Podstata | Podmínka | Odhad |
|---|---|---|---|
| příjezd | po poctivé: „Proč to není zelené?“; po zelené: s nůžkami „Kde se stříhá?“ | P4.8 | 2 |
| R4.2 | „To ne!“ u věcí nad `c4_souboj` − 2; u pomníku „Ten se mi líbil.“; nafukovací bazén s „co nepatří“: „Bazén nepatří. To jsem podepsal.“ | P4.9 | 4 |
| podpis | „Komise je pozastavena. Do fáze 2.“; po zelené váhá: „Před pěti dny jste mi hlásil zelenou.“ a podepíše s lístky / s Bářinými čísly | P4.32 | 4 |

## Vrátný (jeřábník)

| Téma | Podstata | Podmínka | Odhad |
|---|---|---|---|
| uvítání | „Večer jezdím pomaleji. Kvůli výhledu.“ | – | 2 |
| deník | „Píšu si všechno. Nikdo se nikdy nezeptal.“, předání | P4.1 | 3 |
| palivo | „Sud? Dovnitř? Konečně něco dovnitř.“ | akt B | 3 |
| plošina | „Bednění stojí. Beton zraje dva dny. Do usmíření to stihnu.“ | bez plošiny, akt B | 3 |
| Archa ven | v závěrečném střihu: „Konečně něco ven.“ | konec | 1 |
| startovací klíč | „Mám klíče od všeho. Tenhle taky.“ | bez Norberta | 2 |
| drolení s deníkem | „Tady to mám: ukázka, ukázka, ukázka. Namíchám to, jak to bylo předtím.“ | `c3_drolivy` bez Věry | 3 |
| ★ s předměty | káva „Za jízdy nepiju.“, startovací klíč „Ten jsem neměl. Jediný.“ | – | 2 |

## Předseda Věčný

| Téma | Podstata | Podmínka | Odhad |
|---|---|---|---|
| povolení ke startu | „Formulář 3-F. Analýza dopadu startu na fázi 3. Fronta je tamhle.“; po frontě „Fáze 3 ještě nezačala, dopad tedy nelze posoudit.“; „Komise úřaduje v noci. Ve dne je fáze 2.“ | P4.11 | 6 |
| konfrontace | tři výmluvy, „Fáze 2.“ na špatný důkaz (3 obměny), antiklimax „Já? Já jsem jen schvaloval.“, kufr, „Kajuta jedna. Prozatím.“ | P4.31 | 11 |
| ★ | plán cesty „Start je ve fázi 3.“, kopie podpisů „Výborně. Další kopie.“, záznam „To je soukromé pozorování.“, kočka | – | 4 |
| konec | ve frontě s kufrem: „Kdo je poslední?“ | konec | 1 |

## Ing. Framework

| Téma | Podstata | Podmínka | Odhad |
|---|---|---|---|
| reference a smlouva | „Reference? Jistě!“, „Krabice Věčnost. Na zkoušku navždy.“, „Kopii? Pro srovnání? Jistě.“ | P4.22 | 5 |
| odešlý člen | „Kolega je u nás na zkoušku. Velmi perspektivní.“; po návratu „To je tak minulé čtvrtletí.“ | P4.12 | 2 |
| konfrontace | „Já jsem jen prodával krabice.“, krabice „Krize“, „Teď je v akci.“ | P4.31 | 3 |
| ★ | metr „Měříte krabice? To je metodika!“, krabice od bot „Krabice! Kolega!“ | – | 2 |

## Lumír

| Téma | Podstata | Podmínka | Odhad |
|---|---|---|---|
| spí | „Číslo projektu… chrr.“ | do P4.19 | 2 |
| probuzení | „V noci vydávám jen lidem, kteří měří.“, „Budík. Konečně.“ | P4.19 | 3 |
| kartotéka | „Přišel včera. Bez data.“, „Rok nestačí. Měsíc.“, vydání přílohy | P4.20 | 4 |
| krabička Poučení | „Poslal jsem ji dál.“ | – | 1 |
| ★ | důkazy „Přílohu vrátit do konce fáze.“, smlouva „Ta tu ještě není. Bude.“ | – | 3 |

## Babička, obyvatelé, rybáři, Pan Změna, Ještětoto a zvířata

| Postava | Podstata | Podmínka | Odhad |
|---|---|---|---|
| babička | `spojenec`: buchta, noviny s lupou, v konfrontaci „Na pozemek se mě nikdo neptal. Kromě něj.“; jinak na lehátku: „Lístek na Archu mi nikdo nedal. Tak tu ležím. Když nepoletím já, nepoletí nikdo.“, lístek „Se jménem. …Tak jo.“; `odmitnuta`: „Kocour se ztratil.“ | `c1_babicka` | 15 |
| obyvatelé s kufry | „Kudy se nastupuje?“ (0–3 ví); `gantt` „Aplikaci nevěříme.“; `c3_svaciny` = `schvalovani` „Svačina za tři týdny?“; nástupní zkouška k obrysu dveří: první krok na lávku, „Mám kajutu s oknem!“ | P4.4, P4.30 | 9 |
| rybáři | „Na Archu s udicemi, nebo vůbec.“, udice o zábradlí; po P4.17 „Konečně ryby. Kafe nebralo.“ | P4.4, P4.30, P4.17 | 5 |
| Pan Změna | úvod z okna; bazén pro všechny (2 pauzy, nechat domluvit), kašna „V kašně má být voda. Od roku 1994 v ní teče kafe.“, „Voda v kašně! Konečně fáze 3.“, „Pak chci dva.“, kajuta ★ „Bazén do kajuty se nevejde. Zkoušel jsem.“ | P4.17 | 12 |
| Ještětoto | olizuje světlo, nechá se měřit nerado, zmenší se po R4.2 | – | 4 |
| kocour | na palubě; jde s Rudou | `odmitnuta` | 2 |
| kočka Riziková | v konfrontaci; Předseda: „Ta kočka tu nemá razítko.“ | `kocka` | 2 |
| krysy | sežerou Předsedovi poznámky (popisek a jedna replika) | `aktovka` | 1 |

## Tým

Mluví jen ti, kdo jsou v `c2_tym` a v aktu B v týmu (bez odešlého). Kdo je poslem, mluví jako
posel i jako člen týmu. Poslové se určí při rozkolu a do usmíření se nemění (D78).

| Téma | Podstata | Odhad |
|---|---|---|
| „Jak se máš?“ (P4.6) | každý ze šesti jednou repliku s posezením a jednou bez něj, s odkazem na kap. 3 (Věra „Zanýtovala jsem trup. Nikdo se nepodíval dovnitř.“, Pepa „Dva dny spánku by bodly.“, Kryštof „Podepsal jsem, že jsem spokojený.“) | 12 |
| posel: předání | jedna replika na každého z pěti, kdo může být poslem (Klára „Zabalím to, ať se to nepomačká.“, Kryštof „Podepíšete předávací protokol? Ne? Tak nic.“, Zdenda „Znám chlapa, co to donese. Já.“, Pepa „Za dva dny.“ a doběhne hned, Norbert „Předávám podle normy o předávání.“); Věra poslem být nemůže | 5 |
| posel: co dělá ta druhá | podle stavu druhé linky, společné pro všechny posly („Tiskne. A mračí se u toho.“, „Je v archivu. Prý tam spí nějaký pán.“, „Stojí u motorů a nemluví.“, „Byl v Komisi. Vrátil se rychle.“), požadavky („Ruda chce něco na poklop.“, „Bára neví, kdy je lávka.“, „Ruda má rozpis pořád v kapse.“) | 11 |
| klíč od poklopu | otevření poklopu v aktu A („Klíč nedám. Ale otevřu.“), předání ve střihu „Zbývá 2“ („Teď ho budete potřebovat oba.“) | 4 |
| Norbert, Věra v aktu B a C | startovací klíč („Podle normy jen se svědkem. Svědčím.“), drolení („Bez ukázek. Jen beton.“), vrtání trupu | 6 |
| odešlý člen (P4.12) | za každého ze tří možných (Pepa, Klára, Věra; Norbert odejít nemůže) tři vlastní repliky; společné: Gantt ★, slib ★, přiznání, dvě pauzy, svědectví | 15 |

## Scény s rozhodnutím

| Scéna | Podstata | Odhad |
|---|---|---|
| R4.1 | rámec telegrafu, dvě volby, varianty z lístků (popisky) | 4 |
| R4.2 | rámec tabule rozsahu, pomník („Ten se počítá jako motivace.“), „Nevejde se.“, „To lidi chtěli.“ | 6 |
| rozkol | „Od teď nic neměníme. Zamykám.“ „Počítadlo a nástup se musí přepracovat.“ „Ne.“; tichá verze (vysoká důvěra) a hlasitá (nízká); karta „Zbývá 5. Dva dny spolu nepromluvili.“ | 8 |
| R4.3 | Bára v hangáru, Ruda přijde střihem k tichým motorům; dvě volby, odpověď na každou, Bára řekne o Předsedovi nebo položí desky, vysílačka „Příjem.“ | 10 |
| konfrontace | rámec: starosta přichází, Bára přijde / přijde až na konec, palubní lístek z Bářina balíku „Jeden navíc. Pro jistotu.“, „Archa veze všechny. Fronta je tamhle.“ | 7 |

## Ruda a prohlížení

| Skupina | Podstata | Odhad |
|---|---|---|
| prohlédnutí aktivních míst | podle [obsahu místností](04-mistnosti.md), asi 55 míst a 10 variant (rampa, lávka, poklop, Ještětoto, kalendář) | 65 |
| prohlédnutí předmětů | 21 předmětů (Bářiny prohlíží Bára) | 21 |
| vlastní reakce ★ z matice | podle [matice předmětů](04-mistnosti.md#matice-předmětů) | 115 |
| střihy aktů | „Zbývá 5.“, „Zbývá 2.“, co se mezitím stalo | 6 |
| obrys dveří | nástupní zkouška nanečisto: „Tady budou dveře. Zítra.“ | 1 |
| konec kapitoly | Archa vyjede na plošinu, rampa v noci, kufry v řadě, „Zítra.“, Předseda ve frontě | 10 |
| výchozí reakce | sada z kap. 1 (`obecne_*`) se použije znovu | 0 |

## Minihry a malé hádanky

| Minihra | Texty | Odhad |
|---|---|---|
| M03 Souboj se starostou | 5 námitek ve dvou verzích (po poctivé a po zelené), fontána, dobré / rychlé / slabé repliky podle lístků, výsledek | 30 replik + 6 popisků |
| M11 Plachetnice | karty událostí (10), karta zlepšení z kap. 3 („Minule jsme si sedli. Pomohlo to.“), lahve s poučením (3), tři zlepšení, rámec, odešlý člen, nebo Pembok „Někdo tu chybí.“ | 22 replik + 12 popisků |
| P4.29 nahrávání poklopem | „Drž. Ještě. Ještě.“, kabel, svítí / nesvítí, „Stačí. Zavírám.“, vrtání | 10 replik + 4 popisky |
| tabule ukazatelů a rozsahu | štítky, dílky (popisky) | 0 replik + 20 popisků |

## Konec kapitoly a obrazovka následků

Obrazovka „Co si Nedostavěnice zapamatovala“ (popisky, ne repliky): zpráva starostovi (2),
co se obětovalo (3), usmíření (2), zlepšení (3), nástupní zkouška (3), kdo odhalil Předsedu (2).
Celkem asi 15 vět.

## Součet

| Skupina | Odhad replik |
|---|---|
| úvod, Pembok, přepínání, vysílačky | 98 |
| Bára (hraná) | 90 |
| Ruda jako postava | 6 |
| Zelenka | 34 |
| starosta | 10 |
| vrátný | 19 |
| Předseda | 22 |
| Ing. Framework | 12 |
| Lumír | 13 |
| babička, obyvatelé, rybáři, Pan Změna, Ještětoto, zvířata | 50 |
| tým (včetně poslů a odešlého člena) | 53 |
| scény s rozhodnutím | 35 |
| Ruda a prohlížení | 218 |
| minihry a nahrávání | 62 |
| **Celkem** | **≈ 722 na jazyk** |

Odhad je asi o 3 % nad horní mezí návrhu (650–700; po kontrole N4 o 9 replik víc, D78) a o 44 % nad rozpočtem D56; překročení
schválil autor (D77). K tomu asi 42 popisků miniher a tabulí, 15 vět obrazovky následků a GUI.
V jednom průchodu hráč uslyší asi **475** replik: varianty barev, babičky, odešlého člena, poslů
a následků se vylučují. Když se v N6 ukáže, že je to moc, škrtají se nejdřív vlastní reakce ★
(115) a prohlížení za Báru tam, kde nenese stopu.
