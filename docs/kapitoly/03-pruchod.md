# Kapitola 3: průchod hrou

> Krok N3b [postupu návrhu](../12-postup-navrhu.md). Každá akce hráče na samostatném řádku.
> Z průchodu vznikne automatický test (šedý prototyp D70, později `ladeni.gd`). Scény a předměty
> jsou v [obsahu místností](03-mistnosti.md), puzzly v [kartách](03-puzzly.md).
> Stav: **schváleno** (D72), verze 0.2 (zapracována autorská kontrola, D73)

Formát: `č. scéna · kdo · akce → výsledek · příznak`. Akce: *prohlédni*, *použij*, *mluv*,
*vezmi*, *použij X na Y*, *jdi*, *přepni* (portrét druhé postavy).

**Výchozí stav nejkratší cesty:** „dobrá“ kapitola 1 a 2 podle jejich nejkratších cest:
`c1_bara_vyslechnuta`=3, `c1_faze2`=false, `c1_zmena_dohoda`, `c1_mimo_rozsah`,
`c1_babicka`=`spojenec`; `c2_tym`=[Věra, Pepa, Norbert, Klára], `c2_tym_pokryti`=3,
`c2_rozdeleni`=`povaha`, `c2_vyjimky`=2, `c2_riziko_predem`=`lano`,
`c2_rizika_zapsana`=[krysy, usmev, lano], `c2_odhad`=`realny`, `c2_rozpad`=0,
`c2_mosty`=[trup, nastup, start]. Bářina důvěra je vysoká.

## 1. Nejkratší cesta

```text
 1. S1 · cutscéna · titulek; zbývá 24; Ruda: „Tohle umím.“ Pembok: „Tohle opravdu umíš.“; Bára odchází do dílny; Předseda dá žádosti o změnu; Pembok ukáže portrét Báry
 2. S1 · Ruda · použij Jeřáb → M13: nejlepší plán, konec 14. den · c3_rezerva=2 → rozpis rampy
 3. S1 · Ruda · přepni → Bára v S4
 4. S4 · Bára · použij Kuchyňská minutka → ranní porada: utnout Pepu, utnout Kláru, vzít překážku (sloupek), Rudu poslat na deset minut pryč · porada_na_cas
 5. S4 · Bára · vezmi Maketa kajuty → kabel
 6. S4 · Bára · použij Kabel na Zkušební sloupek → sloupek hotový
 7. S4 · Bára · vezmi Krabička lepicích lístků → lepicí lístky
 8. S4 · Bára · použij Lepicí lístky na Maketa kajuty → maketa hotová
 9. S4 · Bára · použij Půlka čidla na Police „Někdy“; použij Rudův model rampy na Police „Někdy“
10. S4 · Bára · Pepa: „Hra Had na sloupek!“ → „Až něco dokončíme.“ · dilna_volna
11. S4 · Bára · použij Bářina tabule seznamu práce → plán kola: cíl „Jestli lidi najdou cestu“; šipky, mapa kajut, maketa · c3_dluh=0
12. S1 · cutscéna · zbývá 21; pilíře stojí v bednění; vrátný slezl z jeřábu: „Mám chvíli. Kdo potřebuje klíče, ví, kde mě najde.“; kometa je větší
13. S4 · Bára · přepni → Ruda v S1
14. S1 · Ruda · mluv Vrátný → „Klíč od skladu?“ → klíč od skladu (ve fázi A: „Až budou pilíře v bednění.“, D75)
15. S1 · Ruda · použij Klíč od skladu na Dveře skladu → otevřeno; krysy na hnízdě
16. S1 · Ruda · použij Žádosti o změnu na Dveře skladu → stopa k aktovce; krysy do aktovky; Předseda: „Výborně, výborně.“ odchází · c3_krysy=aktovka
17. S1 · Ruda · jdi Dveře skladu → S5
18. S5 · Ruda · vezmi Servisní poklop → servisní poklop; tým odveze plechy pláště; jdi Dveře → S1
19. S1 · Ruda · přepni → Bára v S4
20. S4 · Bára · jdi → S2 → S1 → S3
21. S3 · Bára · použij Stánek s ukázkou → M14 (ukázky na zbývá 21, 18, 15): 1. kolo šipky, mapa, maketa; babička: velká tlačítka a kocour; rybáři: udice; Pan Změna: svačiny → narodí se Ještětoto; 2. kolo tlačítka, udice, kocour; heslo a odpočet vyhodit · c3_hodnota=3
22. S3 · Bára · jdi → S1 → S2 → S4
23. S4 · Bára · použij Zkušební počítač → počítadlo skončí na 4 811 → zápis vady
24. S4 · Bára · jdi → S2 → S1 (Ruda tam stojí)
25. S1 · Bára · použij Zápis vady na Ruda → „Kdo se nevejde?“ „Podle pořadí na lince pomoci ty.“ „…Oprav to.“ · c3_vada_hlasena
26. S1 · Bára · přepni → Ruda v S1
27. S1 · Ruda · jdi Brána → S2; Pan Změna přichází s přáními; Bára přijde ze staveniště
28. S2 · Ruda · použij Rozcestník změn → M10: bazén posoudit a vyjednat (papír o Arše; nafukovací bazén do kajuty); svačiny do Bářina seznamu; poklop posoudit, schváleno; tlačítko Zpět do Bářina seznamu; Gantt v aplikaci ne; 3. kolo odpadá (dohoda) · c3_creep=0, c3_bazen=vyjednan, c3_svaciny=seznam, c3_poklop schválen
29. S2 · Ruda · jdi Boční dveře → S4 (zbývá 15; Bára přijde z hangáru); Ruda přinese Gantt na papíře a sáhne po kartách → „Pořadí je tvoje. Řekni mi jen, co bude hotové, až se zavře trup.“ · c3_bara_priority
30. S4 · cutscéna · zbývá 12; „Zítra se zavírá trup.“
31. S4 · Ruda · jdi → S2 → Žebřík do trupu → S6
32. S6 · Ruda · použij Servisní poklop na Otvor v boku → poklop nasazený · c3_poklop=ano
33. S6 · Ruda · použij Místo pro počítač → Bára přijde do trupu → M15: tři přípojky dovnitř, start motorů a počítadlo dovnitř, navigace poklopem, aplikace ven (den lávky Bára zná z mostu) · c3_integrace=0, c3_odchazi=Pepa (klíč od poklopu); Věra trup zanýtuje
34. S2 · Ruda · tým čeká → „Sedneme si a řekneme si, co příště jinak.“ → Věra, Pepa, Norbert, Klára řeknou po jedné věci; zlepšení „Ptát se Báry dřív“ · c3_retro, c3_zlepseni
35. S2 · cutscéna · zbývá 9; Archa smontovaná; „Já… teda my…“; červené tlačítko, nic; Pepa: „Dva dny.“; obrazovka následků · konec kapitoly
```

35 kroků. Odhad 70–80 minut: čtyři minihry (asi 35 minut), krysy bez kočky (5–8 minut), dílna
s poradou a plánem kola (10 minut) a chození mezi pěti scénami. Přesně se délka změří až v N8 (D66).

## 2. Úplná cesta

Navíc proti nejkratší cestě (vloženo na místa, kde dává smysl):

```text
 S1 · Ruda · prohlédni Rampa, Lano, Domíchávač, Kometa, Babiččin plot (noviny s lupou, buchta), Kocour
 S1 · Ruda · mluv Vrátný → všechna témata (lano, „Nikdo se nikdy nezeptal“, jeden jeřáb); klíč ve fázi A: „Až budou pilíře v bednění.“
 S1 · Ruda · mluv Předseda → kontrolní návštěva; „Ing. Framework vás pozdravuje. Je teď u nás. Na zkoušku.“
 S1 · Ruda · prohlédni Aktovka, Žádosti o změnu („pro krysy“)
 S5 · Ruda · prohlédni Hnízdo, Regály, Okousané kabely; použij Krabice od bot na Krysy (před P3.2) → „Zapsal jsem si: žerou papír.“
 S1 · Ruda · prohlédni Rozpis rampy na plotě → Pembok chválí podruhé
 S4 · Ruda · jdi do dílny ve fázi A → přinese Gantt přepsaný na papír: „Ať to máš po ruce.“; „Tohle dej sem. A tohle do úterý.“ Bára: „Rudo.“ (mikromanagement, ★)
 S4 · Bára · prohlédni Tabule „Dělám / Hotovo“, Mlha v rohu, Police „Někdy“
 S4 · Bára · použij Seznam pasažérů na Ruda (kdekoli) → „Ještě ne.“
 S3 · Bára · mluv Rybáři, Obyvatelé s kufry, Babička (před M14)
 S3 · Ruda · použij Telefonní budka → „Jste 4 812. v pořadí.“
 S3 · Ruda · mluv Pan Změna → „Dneska prodávám přání.“
 S2 · Ruda · prohlédni Ještětoto, Kalendář, Tabule z kap. 2, Zadní vrata
 S2 · Ruda · mluv Bára (kdekoli) → všechna témata (dílna, porada, ukázka)
 S6 · Ruda · prohlédni Přípojky, Panel bezpečnostního systému, Okénko; mluv Věra, Norbert
```

Odhad úplné cesty 85–95 minut (rozpočet 70–90, D56). Mírné překročení vědomě nechávám: úplná
cesta za dvě postavy prochází pět scén dvakrát. Když se v N8 potvrdí, zkrátí se chození
(přímý východ z dílny na staveniště).

## 3. Varianty

### Volby v kapitole 3

| Varianta | Odlišné kroky | Příznaky a následek |
|---|---|---|
| **A Bazén bez řízení** (R3.1) | 28: bazén *Rovnou udělat* | `c3_bazen`=`bez_rizeni`, Ještětoto +2; v M15 bazén zabere místo kabelu k navigaci: buď bazén ven (Ještětoto +1), nebo kabel venku (`c3_integrace` +1) |
| **B Bazén odmítnut** (R3.1) | 28: bazén *Ne* | `odmitnut`, Ještětoto +1; ve 3. kole se Pan Změna vrátí s „bazénem s vlnami“ i s dohodou (nebyl vyjednán) |
| **C Svačiny k posouzení** (R3.1) | 28: svačiny *Posoudit a vyjednat* | `c3_svaciny`=`schvalovani`; Předseda razítkuje, obyvatelé: „Svačina za tři týdny?“ (kap. 4 důvěra) |
| **D Poklop odmítnut / rovnou** | 28 | `ne`: krok 32 odpadá, v M15 chybí přihrádka *Později*, navigace uvnitř nehotová (`c3_integrace` ≥ 1); `netesni`: krok 32 projde, poklop netěsní (kap. 4) |
| **E Pořadí určuje Ruda** (R3.2) | 29: „Pořadí určuju já.“ | `c3_bara_priority`=ne; v M15 je hotový odpočet a počítadlo až po zavření: musí poklopem, jinak nehotové uvnitř; na konci „Já jsem postavil Archu.“ |
| **F Bez posezení** (R3.3) | 34: „Nemáme čas. Stavíme.“ | `c3_retro`=ne; tým mlčky odchází; v kap. 4 odejde ten, kdo drží klíč od poklopu |
| **G Neukázat po 2. kole** (M14) | 21 | `c3_hodnota` ≤ 2 |
| **H Přeplněné kolo** | 11, 21: karty nad kapacitu | `c3_dluh` 1–3; dílna na konci chátrá (kulisa) |
| **I Přetažená porada** | 4: nechat odbočky, nechat Rudu rozdělovat | 1. kolo kapacita 2 a s odpočtem; `c3_hodnota` nejspíš 2 |
| **J Vada přes Rudu** | 25 neproběhne (hráč zápis nedá) → 26: za Rudu „Báro, něco tě trápí?“, nechat domluvit | `c3_vada_hlasena`; když Ruda skočí do řeči, = ne |
| **K Vada zamlčena** | 23–25 vynechat | `c3_vada_hlasena`=ne; na konci se Bára odvrátí |
| **L Přeskočené minihry** | 2, 21, 28, 33: přeskočit | `c3_rezerva`=0, `c3_hodnota`=1, `c3_creep`=1 (bazén `odmitnut`, svačiny `schvalovani`, poklop schválen), `c3_integrace`=2 |

### Stav z kapitol 1 a 2

| Varianta | Odlišné kroky | Následek |
|---|---|---|
| **M Kočka Riziková** (`c2_riziko_predem`=`krysy`) | 1: kurýr přinese kočku; 16: místo žádostí mluv Kočka → jde ke skladu → krysy pryč | `c3_krysy`=`kocka`; Předseda zůstane u jeřábu do konce fáze B; v M13 lano praskne 9. a 10. den (zapsané v krabici → vidět dopředu; nejlepší plán dá lávku hned po pilířích) |
| **N Kotva** (`c2_odhad`=`kotva`) | 2: první den oslava „rampy za dva dny“ | `c3_rezerva` ≤ 1; Pepa: „Dva dny. Říkal jsem to.“ |
| **O Krabice na všechno** (`c2_rozdeleni`=`krabice`) | 2: v M13 karty *Ukázka betonu* 3., 6., 9., 12. den → odnést do kufru; 21: seznam v krabici → vyndat; Framework je v úvodu na staveništi | `c3_drolivy`, když hráč ukázky nechá; Bára: „Tak to si budu zkoušet sama.“ (z kap. 2), důvěra se ale počítá jen podle `c1_bara_vyslechnuta` a `gantt` |
| **P Gantt na všechno** (`c2_rozdeleni`=`gantt`) | 4: Ruda přinese vytištěný Gantt; 11: 1. kolo nadiktované (odpočet, heslo, mapa); 21: ukázka po 2. kole zakázaná; důvěra nízká → 25 nevyjde, varianta J | `c3_hodnota` nejvýš 2; R3.2 má pro Báru větší váhu |
| **Q Bez statičky** (`c2_tym` bez Věry) | 2 je zamčené: cedule „Nad deset metrů jen podle výpočtu“ → vrátný dá klíč hned („Bez výpočtu do kabiny nesednu. Tak mám čas.“, D75) → 14–17 už ve fázi A, pak S5 vezmi Hnízdo → výpočet statika → použij Výpočet na Vrátný → 2 s osou o den kratší | `c3_rezerva` ≤ 1; v trupu nýtuje Ruda sám („Nýtovačka. Jak těžké to může být.“) |
| **R Bez certifikátora** (`c2_tym` bez Norberta) | před 33: S3 mluv Norbert (lavička) → „Dokud tu mluví kniha…“ → použij Pembok na Norbert → Norbert jde do trupu a podepíše | `c3_rezerva` −1 |
| **S Bez zkoušení** (bez Pepy i Kláry) | 4: porada jen s Kryštofem a Zdendou; 11, 21: kapacita 2 | `c3_hodnota` nejvýš 2; `c3_odchazi`=Věra |
| **T Fáze 2** (`c1_faze2`) | 1: Předseda chce i analýzy dopadu; 28: před M10 použij Plán cesty na Předseda → „Pozastavena… No ano. Prozatím.“ | bez toho každá posouzená karta stojí den (`c3_rezerva` −1 za každou, nejvýš −2) |
| **U Bez dohody** (bez `c1_zmena_dohoda`) | 28: 3. kolo „bazén s vlnami“ | Ještětoto roste snáz |
| **V Lano nepřipravené a nezapsané** | 2: výpadek 9. a 10. den až při přehrání | nejspíš `c3_rezerva` 0–1 |
| **W Babička odmítnutá** (`c1_babicka`=`odmitnuta`) | 21: babička mlčí do 2. kola | kocour se objeví až po 2. ukázce |
| **X Rozpad** (`c2_rozpad` ≥ 1 / ≥ 2) | 2: zábradlí při přehrání; 9: navíc dvakrát nakrájený plech (odložit) | `c3_rezerva` −1 |
| **Y Bez mostů** (`c2_mosty` bez `trup` / `nastup`) | 33: Bára u počítadla „Před zavřením. Možná.“; bez `nastup` před M15 použij Rozpis rampy na Bára | bez rozpisu `c3_integrace` +1 |

### „Špatné“ kapitoly 1 a 2 dohromady

Výchozí stav: `c1_bara_vyslechnuta`=0, `c1_faze2`, bez dohody, bez `c1_mimo_rozsah`,
`c1_babicka`=`prehlizena`; `c2_tym`=[Zdenda, Kryštof, Pepa, Věra] (bez podpisu startu),
`c2_rozdeleni`=`gantt`, `c2_riziko_predem`=`usmev`, `c2_rizika_zapsana`=[usmev, kabely, lano],
`c2_odhad`=`kotva`, `c2_rozpad`=3, `c2_mosty`=[start].

| Krok | Odlišnost |
|---|---|
| 1 | Předseda chce analýzy dopadu na fázi 2; Ruda přinese do dílny vytištěný Gantt |
| 2 | oslava 1. den, lano praskne 10.–11. den (při kotvě o den později, D72; zapsané, vidět dopředu), zábradlí; nejlepší výsledek `c3_rezerva`=0: plán 2 posunutý o den skončí 15. den (výpadek padne na dny, kdy jeřáb stojí), zábradlí přidá 16. den |
| 15–16 | bez kočky; lístek „krysy“ v krabici je (kabely) → nápověda |
| 4 | porada: Pepa, Kryštof (porada o poradě), Zdenda (kafe); Ruda s Ganttem |
| 9 | navíc dvakrát nakrájený plech |
| 11 | 1. kolo nadiktované Ganttem |
| 21 | ukázka po 2. kole zakázaná; babička normální; `c3_hodnota` nejvýš 2 |
| 25 | Ruda Báru odbyde → varianta J (za Rudu se zeptat a nechat domluvit) |
| 28 | plán cesty s „fáze 2: pozastavena“ na Předsedu; 3. kolo s bazénem s vlnami; bazén bez papíru o Arše |
| před 33 | Norbert na lavičce, Pembok na Norberta (`c3_rezerva` −1, celkem −1) |
| 33 | bez mostů: počítadlo nejisté, rozpis rampy pro Báru |

Kapitola jde dohrát; špatné kapitoly 1 a 2 ji prodlouží asi o 10–15 minut (porada, Gantt,
fáze 2, Norbert, vada přes Rudu). Při nejlepší hře v M13 skončí `c3_rezerva` na −1 (kotva,
zábradlí a Norbert stojí po dni). Původně se oslava a výpadek lana sčítaly a rampa měla zpoždění
i při nejlepší hře; proto při kotvě praskne lano o den později (D72). Plán 2 posunutý o den má
10. a 11. den volné (dráha se betonuje 9. den, plošina se bední až 12.).

**Automatický test:** nejkratší cesta, „špatné“ kapitoly 1 a 2 a varianty A, D, E, F, J, L, M,
O, Q, R jako samostatné sekvence. Každá končí kontrolou příznaků.

## Rozpis M13

Ruční ověření pravidel M13 ([návrh](03-realizace.md#m13-jeřábový-balet)). Betonáž v den *d*
znamená dozrálý beton na konci dne *d + 2*; sada bednění je volná od dalšího dne.

**Nejlepší plán 1 (pilíře souběžně, lávka s dráhou):**

| Den | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Jeřáb | LP bed. | PP bed. | LP bet. | PP bet. | – | lávka bed. | dráha bed. | dráha bet. | lávka bet. | – | plošina bed. | plošina bet. | – | – |
| Sady | A, B | | | | A volná od 6 | A | B (PP dozrál 6.) | | | | B volná od 11 | | | plošina dozrála |

**Nejlepší plán 2 (pilíře po sobě, lávka hned po nich; jediný, který projde výpadkem lana 9.–10. den):**

| Den | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Jeřáb | LP bed. | LP bet. | PP bed. | PP bet. | lávka bed. | lávka bet. | dráha bed. | dráha bet. | (lano) | (lano) | plošina bed. | plošina bet. | – | – |

Oba končí dozráním plošiny na konci 14. dne: `c3_rezerva` = 16 − 14 = 2. Kritická cesta:
poslední pilíř (betonáž 4. den) → dráha (7., 8.) → plošina (11., 12.). Rychleji to nejde:
dvě betonáže pilířů a dvě bednění potřebují čtyři dny jeřábu, pak vždy dva dny zrání.

## Kontrola slepých uliček

- [x] Klíč od skladu dá vrátný ve fázi B (bez Věry hned) a ve střihu „zbývá 21“ to sám řekne. Žádosti o změnu dá Předseda znovu, kdykoli s ním Ruda
  mluví. Předseda stojí u jeřábu, dokud krysy nejsou pryč.
- [x] Bez Věry: výpočet je v hnízdě, hnízdo je přístupné po krysách, krysy nepotřebují M13 a klíč od skladu je bez Věry k dispozici hned.
- [x] Bez Norberta: Norbert sedí na náměstí od fáze B do konce kapitoly; Pemboka má Ruda vždy.
- [x] Dílna: kabel a lepicí lístky jsou v dílně jen jednou a jinde se spotřebovat nedají.
  Přijatý Pepův nápad jde odložit na polici.
- [x] Plán kola jde potvrdit s jakýmkoli výběrem; přeplnění jen zvedne `c3_dluh`.
- [x] M14 a M10 jdou přeskočit. M10 se nabídne až po M13 a M14 (Pembok u rozcestníku řekne,
  co chybí).
- [x] Poklop: když ho M10 neschválí, M15 jde dohrát bez přihrádky *Později* (horší výsledek).
  Schválený, ale nevzatý poklop: Věra před M15 „Schválený poklop, a kde je?“ → sklad je otevřený.
- [x] Rozpis rampy zůstane Rudovi, takže ho jde dát Báře i během M15.
- [x] Vada: nepovinná; odbytí za Báru otevře cestu za Rudu; skočit do řeči je volba s následkem.
- [x] Fáze C je lineární, ale každý krok má jen jednu podmínku (R3.2 → M15 → R3.3).
- [x] Přepínání: když hráč uvízne v jedné lince, druhá má vždy co dělat až do konce fáze B.

## Šířka grafu

| Úsek | Rozdělané úkoly |
|---|---|
| fáze A, Ruda | M13 (bez Věry: klíč, krysy, výpočet, teprve M13) (1, bez Věry řetěz) |
| fáze A, Bára | porada a dílna souběžně (v dílně kabel, lístky, čidlo, model) → plán kola (2–5) |
| fáze A celkem | 3–6 |
| fáze B | Ruda klíč → krysy → poklop, Bára M14 → vada (volitelná), obě linky se sejdou v M10 a R3.2; Norbert (bez něj) (2–4; dřív měl Ruda ve fázi B nic povinného, D75) |
| fáze C | poklop → M15 → R3.3 (1, záměrně lineární závěr) |
