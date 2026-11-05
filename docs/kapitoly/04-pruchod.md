# Kapitola 4: průchod hrou

> Krok N3b [postupu návrhu](../12-postup-navrhu.md). Každá akce hráče na samostatném řádku.
> Z průchodu vznikne automatický test (šedý prototyp D70, později `ladeni.gd`). Scény a předměty
> jsou v [obsahu místností](04-mistnosti.md), puzzly v [kartách](04-puzzly.md).
> Stav: **hotovo**, verze 0.2 (tvar D77, kontrola N4 zapracována v D78)

Formát: `č. scéna · kdo · akce → výsledek · příznak`. Akce: *prohlédni*, *použij*, *mluv*,
*vezmi*, *použij X na Y*, *jdi*, *přepni* (portrét druhé postavy).

**Výchozí stav nejkratší cesty:** „dobré“ kapitoly 1–3 podle jejich nejkratších cest:
`c1_bara_vyslechnuta`=3, `c1_babicka`=`spojenec`, `c1_mimo_rozsah`, `c1_slib_vseho`=0;
`c2_tym`=[Věra, Pepa, Norbert, Klára], `c2_rozdeleni`=`povaha`, `c2_riziko_predem`=`lano`,
`c2_mosty`=[trup, nastup, start]; `c3_rezerva`=2, `c3_krysy`=`aktovka`, `c3_hodnota`=3,
`c3_vada_hlasena`, `c3_creep`=0, `c3_bazen`=`vyjednan`, `c3_poklop`=`ano`, `c3_bara_priority`,
`c3_integrace`=0 (`c3_nesladeno` prázdný), `c3_odchazi`=Pepa, `c3_retro`, `c3_dluh`=0, `c3_svaciny`=`seznam`.
Bářina důvěra je vysoká (`c1_bara_vyslechnuta` ≥ 2, bez `gantt`, vada nahlášená).
Poslové: Klára (dveře dílny), Pepa (staveniště).

## 1. Nejkratší cesta

```text
 1. S1 · cutscéna · titulek; amplion „Dnů do dopadu: sedm.“; Ruda: „Bylo devět!“; Zelenka: „Všechno zelené. Jako vždycky.“; Ještětoto olizuje světlo Změny; Bára čte štítek Rampy; Pembok: „Zelená je barva naděje. Ne stavu.“; Zelenka dá oběma vysílačky
 2. S1 · Ruda · jdi Schody → S2 → Brána → S3
 3. S3 · Ruda · mluv Pepa → „Otevřeš poklop?“ → „Klíč nedám. Ale otevřu.“ → Ruda se podívá dovnitř → vysílačkou lístek Trup: zelená („Navigace přijde poklopem.“) · c4_listky=1
 4. S3 · Ruda · mluv Věra, Norbert, Pepa, Klára → „Jak se máš?“ → lístek Tým: žlutá („Je nás čtyři. A jsme unavení.“) · c4_listky=2, morálka +1
 5. S3 · Ruda · přepni → Bára v S1
 6. S1 · Bára · jdi → S2 → S3; použij Metr na Ještětoto → lístek Změny: žlutá („Dvacet centimetrů. Malý, ale je.“) · c4_listky=3
 7. S3 · Bára · jdi Boční dveře → S4; použij Zkušební počítač → zkouška počítadla → lístek Počítadlo: zelená („4 812. Ověřeno.“) · c4_listky=4
 8. S4 · Bára · přepni → Ruda v S3
 9. S3 · Ruda · jdi → S2 → S1; použij Telegraf → „Skutečný stav a co s tím.“ (varianty ze Změn a Týmu) · c4_report=poctive
10. S1 · M03 · starosta přijede, Bára přijde střihem; 5 kol, každá námitka zodpovězena lístkem nebo variantou · c4_souboj=5, c4_slib=0
11. S1 · Ruda · použij Tabule rozsahu → R4.2: Rudův pomník (2) a svačiny v aplikaci (1) pod čáru · c4_obet=[pomnik, svaciny], c4_creep=0, morálka +1
12. S1 · cutscéna · rozkol: „Od teď nic neměníme. Zamykám.“ „Počítadlo a nástup se musí přepracovat.“ „Ne.“; Bára vypne vysílačku a odejde do dílny; Klára se postaví do dveří dílny, Pepa k východu Na radnici; „Zbývá 5. Dva dny spolu nepromluvili.“
13. S1 · Ruda · jdi → S2 → S3; mluv Norbert → „Zkusíme motory.“ → startovací klíč
14. S3 · Ruda · jdi → S2; mluv Vrátný → „Spustíte sud paliva do hangáru?“ → jeřáb spustí sud otvorem ve střeše
15. S2 · Ruda · jdi Na radnici → Komise (S7); mluv Předseda → „Povolení ke startu.“ → „Formulář 3-F.“; použij Fronta na frontu → „O hodinu později.“ → „Dopad nelze posoudit.“; Pembok: „Tohle razítko nedostaneš. A on to ví.“ · povoleni_odmitnuto
16. S7 · Ruda · jdi → S2 → S3; použij Startovací klíč na Zkušební pult → motory naskočí a zhasnou; „Řídicí systém nepotvrdil nástup.“ „…Báro?“ · motory_zkouseny
17. S3 · Ruda · přepni → Bára v S4
18. S4 · Bára · vezmi Kuchyňská minutka
19. S4 · Bára · použij Zkušební počítač → Vytisknout palubní lístky → palubní lístky (4 812)
20. S4 · Bára · jdi → S3 → S2 → Na radnici → Archiv (S6)
21. S6 · Bára · použij Kuchyňská minutka na Lumír → zazvoní; „V noci vydávám jen lidem, kteří měří.“; Bára ukáže metr · lumir_vzhuru
22. S6 · Bára · použij Kartotéka → přečte Lumírovu knihu (duben 1994) → lístek komety mezi výtah a Archu → Lumír vydá hvězdářský záznam; „Duben. Měsíc před Archou.“
23. S6 · Bára · použij Hvězdářský záznam na Seznam pasažérů → „Seznam z roku 1994. Kometa v dubnu, Archa v květnu.“ → plán Komise
24. S6 · Bára · jdi Schody → Na radnici: Komise (S7); mluv Framework → „Máte referenci?“ → kopie smlouvy na fázi 3
25. S7 · Bára · jdi → S2; mluv Pepa (posel) → „Vyřiď Rudovi, co vím o Předsedovi.“ → „Hned.“ · c4_bara_rekla=hned
26. S2 · Bára · jdi Brána → S3 (obě linky hotové, Bára v hangáru) → Ruda přijde k tichým motorům → R4.3 „Plán nestačí. Potřebuju tě.“ · c4_usmireni=priznal; Bára zapne vysílačku: „Příjem.“
27. S3 · M11 · na palubě Archy: kotvy (zelená světla, rozkol), vítr (posel, poctivá zpráva), útesy; první lahev karta poučení; zlepšení „Jedna tabule pro oba“ · c4_zlepseni
28. S3 · cutscéna · „Zbývá 2.“; Pepa dá Rudovi klíč od poklopu: „Teď ho budete potřebovat oba.“
29. S3 · Ruda · použij Klíč od poklopu na Servisní poklop → Bára přijde; Ruda drží, Bára v trupu (S5) nahraje navigaci; žádný nesladěný bod · c4_integrace=0
30. S3 · Bára · jdi → S2; použij Palubní lístky na Obyvatelé s kufry → Ruda přijde a nakreslí na plošinu křídou obrys dveří („Tady budou dveře. Zítra.“); obyvatelé, rybáři a babička s kocourem projdou lávkou k obrysu a zpátky; „Jediná fronta, kterou jsem kdy chtěl.“ · c4_nastup=3
31. S2 · Ruda · jdi Na radnici → S7; mluv Předseda → konfrontace (Bára a starosta přijdou): záznam, plán Komise, kopie smlouvy; „Já jsem jen schvaloval.“; palubní lístek z Bářina balíku, „Fronta je tamhle.“; krysy sežerou poznámky (Bára předkládá sama, `c4_bara_rekla`=hned)
32. S7 · cutscéna · starosta: „Komise je pozastavena. Do fáze 2.“ a podepíše start
33. S2 · cutscéna · konec: Archa vyjede z hangáru po dráze na plošinu, vrátný: „Konečně něco ven.“; zbývá 1, kufry v řadě; Zelenka vymění poslední zelenou žárovku za Bářinu natřenou nažluto; „Zítra.“ „Zítra.“; Předseda ve frontě s kufrem; obrazovka následků · konec kapitoly
```

33 kroků. Odhad **60–70 minut**: dvě minihry (asi 15 minut), konfrontace (5), šest lístků a čtyři
z nich nutné (10–12), archiv (6) a chození mezi sedmi scénami. Přesně se délka změří až v N8 (D66).

## 2. Úplná cesta

Navíc proti nejkratší cestě (vloženo na místa, kde dává smysl):

```text
 S1 · Ruda · prohlédni Tabule ukazatelů, všech šest štítků, Krabice žárovek, Okno; mluv Zelenka → všechna témata (co světla měří, žárovky z týdenní výměny, vysílačky)
 S1 · Bára · prohlédni štítky (Bára říká, co znamenají)
 S2 · Ruda · mluv Vrátný → deník jeřábu; použij Deník jeřábu na Rozpis rampy → lístek Rampa: zelená · c4_listky +1
 S2 · Bára · mluv Obyvatelé s kufry → „Kudy nastoupíte?“; použij Lávka → lístek Nástup: zelená (tři skupiny) · c4_listky +1
 S2 · Ruda · prohlédni Rampa, Lávka, Babička (za plotem s buchtou), Kocour, Dveře skladu („Krysy se odstěhovaly do Komise.“), Kometa
 S3 · Ruda · prohlédni Docházka, Motory, Otvor ve střeše, Kalendář; Bára: Docházka („Všechny podpisy psal Kryštof.“)
 S4 · Bára · vezmi Kuchyňská minutka v aktu A → „Na poradu teď není čas.“
 S2 · Ruda · mluv Pepa (posel) → „Co dělá Bára?“ → „Tiskne. A mračí se u toho.“
 S3 · Ruda · mluv Klára (posel ve dveřích) → „Vyřiď Báře, že nemluvím.“ → „To jí vyřídím. Asi.“
 S7 · Ruda · použij Hrnek kávy na Razítko → „Tentokrát ne. Poduška je zamčená.“
 S7 · Ruda · prohlédni Předsedův kufr, Předsedova aktovka (hýbe se)
 S6 · Bára · prohlédni Hluboký regál („Tady byl seznam. Teď je u mě.“), Krabička Poučení
 S7 · Bára · prohlédni Předsedův kufr („Kajuta jedna. Na seznamu je jako první.“)
 S1 · Ruda · jdi do věže v aktu B → Zelenka: „Lístky jsem nechal viset. Kvůli výhledu.“
```

Odhad úplné cesty **75–85 minut** (návrh 60–80, rozpočet 45–60 vědomě překročen, D77).

## 3. Varianty

### Volby v kapitole 4

| Varianta | Odlišné kroky | Příznaky a následek |
|---|---|---|
| **A Zelená zpráva** (R4.1) | 9 hned po 1: telegraf „Všechno zelené.“, lístky 3–7 se nedělají | `c4_report`=`zelene`, `c4_listky`=0; v M03 starosta s nůžkami („Tak ohňostroj, ne?“), dobré repliky jen z lístků, které hráč přesto sebere; v 32 starosta váhá a podepíše s Bářinými čísly |
| **B Málo lístků** | 9 se 3 lístky: poctivá volba šedá, Pembok „Na poctivou zprávu víš málo.“ | hráč dojde pro čtvrtý; `c4_listky` 4–6 |
| **C M03 prohraná nebo přeskočená** | 10: hráč souboj neopakuje, platí poslední výsledek | např. `c4_souboj`=2 (přeskočení 3, `c4_slib`=2); v 11 starosta „To ne!“ už u první oběti (při přeskočení u druhé), Ruda trvá na svém (důvěra stakeholderů −5 za každou) |
| **D Pomník zůstane** (R4.2) | 11: kulaté kajuty a svačiny pod čáru | bez morálky +1; Ruda: „Pomník zůstane. Kvůli motivaci.“ |
| **E Obětovaná velká tlačítka** | 11 | `c4_nastup` −1 (babička nenajde tlačítko); Bára: „To lidi chtěli.“ |
| **F Trval na svém** (R4.3) | 26: „Plán byl dobrý. Jen ho nikdo nedodržel.“ | `c4_usmireni`=`trval`; Bára zapne vysílačku bez „Příjem.“; na konci stojí každý na jiném konci rampy |
| **G Bára mlčí** | 25 vynechat (nebo nízká důvěra: „Ještě ne.“) | `c4_bara_rekla`=`po_usmireni`; v 26 Bára položí Rudovi desky s důkazy; v 31 předkládá Ruda sám, Bára přijde až na konec |
| **H „Stačí. Zavírám.“** | 29 (jen při `c3_integrace` ≥ 1): Ruda zavře poklop dřív | `c4_integrace` = zbylé body; Bára zevnitř: „Ještě jeden!“ (poklop se otevře, kdo zvolí znovu „Zavírám“, zavře) |
| **I Přeskočené minihry** | 10, 27 | `c4_souboj`=3, `c4_slib`=2; `c4_zlepseni`=*Jedna tabule pro oba* |
| **J Jiné lístky** | 3–7: libovolná čtveřice ze šesti | barvy podle stavu; varianty ve zprávě z červených a žlutých lístků |

### Stav z kapitol 1–3

| Varianta | Odlišné kroky | Následek |
|---|---|---|
| **K Bez posezení** (`c3_retro`=ne, odešel Pepa) | 3 nejde (Pepa s klíčem odešel), lístek Tým: „Chybí Pepa. Odešel k Frameworkovi.“; poslové Klára a Norbert; v aktu B (nebo C) v S7 mluv Pepa → Gantt ★, „Neposlouchal jsem. Promiň.“ → nechat domluvit → klíč od poklopu a svědectví; 28 bez předání klíče | `c4_clen_zpet`; svědectví nahradí smlouvu v 31; v M11 Pepa řekne první kartu, když už je zpátky: „Odešel jsem, protože jsme si nikdy nesedli.“ (jinak Pembok „Někdo tu chybí.“) |
| **L Babička bez spojenectví** (`prehlizena`, `neodhalena`) | lístky Rampa a Nástup červené; v aktu B S2 mluv Babička → „Lístek na Archu mi nikdo nedal. Tak tu ležím.“; S2 mluv Pepa (posel) → „Potřebuju lístek pro babičku.“; Bára použij Palubní lístky na Klára (posel); Ruda použij Palubní lístek na Babička → jde balit | bez toho 30 nejde („Lávka vede přes lehátko.“); důvěra stakeholderů +1 |
| **M Babička odmítnutá** (`odmitnuta`) | jako L, předtím S3 jdi Žebřík na palubu → mluv Kocour → jde s Rudou → S2 babička: „Kocour!“ | |
| **N Bez plošiny** (`c3_rezerva` < 0) | lístek Rampa žlutá; v aktu B S2 mluv Vrátný → „Plošina?“ → „Do usmíření to stihnu.“ | jen v aktu B; bez objednané plošiny nezačne usmíření (Pembok: „Rampa nemá kde skončit. Vrátný to ví.“) |
| **O Drolivá rampa** (`c3_drolivy`) | lístek Rampa červená; v aktu B S3 mluv Věra → „Rampa se drolí.“ → Věra zpevní (bez Věry použij Deník jeřábu na Vrátný) | bez toho 30 nejde |
| **P Netěsný poklop** (`netesni`) | v aktu B S3 mluv Klára (posel) → „Potřebuju něco na poklop.“; Bára vezmi Těsnicí páska, použij na Klára; Ruda použij Těsnicí páska na Servisní poklop | bez toho 29 nejde („Táhne.“) |
| **Q Bez poklopu** (`c3_poklop`=`ne`) | 3: člen týmu přinese plán zapojení, Ruda se dívá okénkem; 28: člen dá plán zapojení; 29: použij Plán zapojení na Věra → Věra navrtá trup (bez Věry vrtá Ruda: „Nýtovačka byla lehčí.“); vrtání úkon nepřidává | bez poklopu je navigace v `c3_nesladeno` vždy, takže nahrání má aspoň tenhle bod |
| **R Neopravená vada** (`c3_vada_hlasena`=ne) | 7: „4 811. Pořád.“ (červená); v aktu B S4 použij Zkušební počítač → Opravit počítadlo → oprava počítadla; 19 vytiskne 4 811 lístků a chybějící dotiskne po opravě; 29 nahraje i opravu | bez opravy 29 nejde („Počítadlo počítá o jednoho míň.“) |
| **S Bod `lavka`** (bez mostu *zkouška nástupu* a bez `c3_bara_zna_lavku`) | v aktu B S2 použij Rozpis rampy na Pepa (posel); Bára použij Rozpis rampy na Zkušební počítač | bez toho 30 nejde („Aplikace neví, kdy je lávka.“) |
| **T Bazén v trupu** (`c3_bazen_v_trupu`, v R4.2 neobětovaný) | v aktu B nebo C S3 mluv Pan Změna → nechat domluvit → „V kašně má být voda. Od roku 1994 v ní teče kafe.“ → vypustí bazén do kašny; rybáři: „Konečně ryby. Kafe nebralo.“ | bez toho 29 nejde („Kabel vede přes bazén.“, Věra: „Bazén v trupu neodletí. Ani s Archou.“); `c4_creep` −1 |
| **U Kopie podpisů** (`c2_riziko_predem`=`usmev`) | 31: kopie podpisů nahradí kterýkoli důkaz | konfrontace může začít jen se dvěma Bářinými důkazy |
| **V Gantt na všechno** (`c2_rozdeleni`=`gantt`) | lístek Nástup žlutá („Aplikaci nevěříme.“); 19: navíc použij Papír a nůžky → papírové lístky; Bářina důvěra nízká → varianta G | `c4_nastup` nejvýš 2 |
| **W Slib všeho** (`c1_slib_vseho` ≥ 3) | 10: kolo navíc „A fontánu jste slíbil.“ (dobrá replika jen z charteru); 11: fontána a terasa na tabuli rozsahu (jen bez `c1_mimo_rozsah`) | těžší R4.2 |
| **X Bez Norberta** | 13: startovací klíč dá vrátný („Mám klíče od všeho.“) | – |
| **Y Bez Věry** (nevybraná, nebo odešlá a nevrácená) | O: drolení zpevní vrátný podle deníku; Q: trup vrtá Ruda | – |
| **Z Přeplněná kola** (`c3_dluh` ≥ 2) | 7: „4 812, ale tři chyby.“ (žlutá); 19: první tisk s chybami, tisknout znovu | – |
| **Ž Ruda určoval pořadí** (`c3_bara_priority`=ne) | 3: lístek Trup žlutá („Odpočet je uvnitř. Počítadlo venku.“); 29: nehotové počítadlo je bod v `c3_nesladeno`, úkon navíc nepřidává | – |
| **Kočka Riziková** (`c3_krysy`=`kocka`) | 31: kočka přijde s Rudou, Předseda se schová za kufr | vtip, bez následku |

### „Špatné“ kapitoly 1–3 dohromady

Výchozí stav: `c1_bara_vyslechnuta`=0, `c1_babicka`=`prehlizena`, `c1_slib_vseho`=3, bez
`c1_mimo_rozsah`; `c2_tym`=[Zdenda, Kryštof, Pepa, Věra], `c2_rozdeleni`=`gantt`,
`c2_riziko_predem`=`usmev`, `c2_mosty`=[start]; `c3_rezerva`=−1, `c3_retro`=ne, `c3_odchazi`=Pepa,
`c3_poklop`=`ne`, `c3_vada_hlasena`=ne, `c3_bazen`=`bez_rizeni`, `c3_creep`=3, `c3_hodnota`=2,
`c3_dluh`=2, `c3_integrace`=3 (`c3_nesladeno`=[navigace, pocitadlo, lavka]), `c3_bazen_v_trupu`,
`c3_bara_priority`=ne, `c3_krysy`=`aktovka`. Bářina důvěra je
nízká. Poslové: Kryštof (dveře dílny), Zdenda (staveniště). Graf ve [scénáři](../13-graf-zavislosti.md#kapitola-4-krize)
počítá bez kopie podpisů; s ní je konfrontace o jeden důkaz volnější.

| Krok | Odlišnost |
|---|---|
| 3–7 | lístek Trup nejde (Pepa odešel); Rampa červená (babička, bez plošiny), Nástup červená (babička, `gantt`), Počítadlo červená (4 811 a chyby), Změny červená (tři metry), Tým červená (chybí Pepa); poctivá zpráva má pět variant |
| 10 | kolo navíc s fontánou; bez charteru „co nepatří“ jde 4. kolo jen s lístkem Změny |
| 11 | dílků je asi 11 (bazén v trupu, aplikace podle kap. 3, pomník, fontána a terasa), kapacita o 2 menší a Ještětoto zabere další 3; každá obětovaná věc ho zmenší o dílek, takže stačí obětovat dvě velké věci (bazén, pomník), s malými jich je víc; bazén se vyplatí (jinak varianta T) |
| 12 | rozkol hlasitý (nízká důvěra); poslové Kryštof („Podepíšete předávací protokol? Ne? Tak nic.“) a Zdenda |
| 13 | startovací klíč od vrátného (bez Norberta) |
| akt B Ruda | navíc P4.12 (Pepa v Komisi), P4.13 (babička, lístek přes posla), P4.14 (plošina), P4.17 (bazén, když zůstal), P4.18 (rozpis po poslovi) |
| akt B Bára | 19: tisk dvakrát, 4 811 lístků, papírové lístky; navíc oprava počítadla, den lávky; 25 nejde („Ještě ne.“) → varianta G |
| 29 | bez poklopu: Věra navrtá trup; nahrání navigace a úkon počítadlo (bod `lavka` se vyřešil v aktu B) |
| 31 | Ruda sám; kopie podpisů a svědectví nahradí, co chybí |
| 32 | po zelené zprávě (když ji hráč poslal) starosta váhá |

Kapitola jde dohrát; špatné kapitoly 1–3 ji prodlouží asi o **15–20 minut** (šest krátkých úkolů
v aktu B, dvojí tisk, vrtání). Úkoly navíc ale běží **souběžně**: graf má ve špatném stavu stejný
nejkratší sled (11 kol) a v jednom kole až 12 kroků k cíli místo 7.

**Automatický test:** nejkratší cesta, „špatné“ kapitoly 1–3 a varianty A, C, F, G, H, I, K, L, M,
P, Q, R, T, U jako samostatné sekvence. Každá končí kontrolou příznaků.

## Kontrola slepých uliček

- [x] Zelenou zprávu jde poslat kdykoli; poctivou se 4 lístky. Lístek Trup chybí jen bez posezení,
  ostatních pět jde vždy.
- [x] M03 a M11 jdou přeskočit. R4.2 jde potvrdit vždy, jen se Ruda může přít se starostou.
- [x] Startovací klíč: Norbert, bez Norberta vrátný. Palivo spustí vrátný vždy.
- [x] Povolení ke startu: Předseda ho odmítne vždy, a tím je P4.11 splněný.
- [x] Bára: minutka je v dílně od aktu B, Lumír je pak vzhůru do konce kapitoly; kartotéka,
  kniha i Framework jsou v radnici celou noc.
- [x] Posel: dva, oba v aktu B celou dobu na místě; donesou cokoli a nespotřebují nic.
- [x] Palubní lístky jdou tisknout znovu, takže lístek pro babičku nic nestojí.
- [x] Usmíření začne, když jsou obě linky hotové (při `c3_rezerva` < 0 i objednaná plošina) a Bára
  je v hangáru, ať do něj vejde, nebo v něm už stojí; Pembok a metr řeknou,
  co chybí, posel řekne Rudovi, že je Bára hotová.
- [x] Odešlý člen: P4.12 jde i v aktu C; klíč od poklopu jinak přinese člen týmu sám.
- [x] Konfrontace: pět až sedm důkazů na tři výmluvy, špatný důkaz se vrátí.
- [x] Nástupní zkouška a nahrání navigace řeknou, co chybí, a každá chybějící věc má úkol v aktu B,
  který jde dodělat i v aktu C. Výjimka je plošina: objednává se v aktu B a čeká na ni usmíření.

## Šířka grafu

Podle [rozboru grafu](../13-graf-zavislosti.md#kapitola-4-krize) (kroky k cíli v jednom kole):

| Úsek | Výchozí stav | Špatné kapitoly 1–3 |
|---|---|---|
| akt A (lístky, R4.1) | 6–7 (šest lístků za dvě postavy, zelená zpráva) | 6 |
| M03, R4.2 | 1 (úzká hrdla) | 1–2 |
| akt B, začátek | 6 (Ruda klíč, palivo, povolení; Bára minutka, smlouva, tisk) | 12 (navíc odešlý člen, babička, plošina, bazén, rozpis, oprava) |
| akt B, archiv | 1–2 (Lumír, kometa, plán Komise) | 2–4 |
| usmíření, M11 | 1 (úzká hrdla) | 1 (následky jdou dodělat i v aktu C) |
| akt C | 3 (poklop, nástup, konfrontace) | 3 |
