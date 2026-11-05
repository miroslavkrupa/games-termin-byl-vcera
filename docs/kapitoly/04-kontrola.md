# Kapitola 4: autorská kontrola (N4)

> Krok N4 [postupu návrhu](../12-postup-navrhu.md) bez hráčů (D66). Nejkratší cesta, varianty
> a „špatné“ kapitoly 1–3 z [průchodu](04-pruchod.md) prošly krok za krokem proti
> [kartám puzzlů](04-puzzly.md), [obsahu místností](04-mistnosti.md), pravidlům miniher
> v [návrhu](04-krize.md) a [grafu](../13-graf-zavislosti.md#kapitola-4-krize) (`tools/graf/k4.mjs`).
> Navíc kontrola proti kapitolám 1–3: návrhy, kontroly, texty kapitol 1–3 (scénář kapitoly 1,
> texty prototypu) a mapa následků v [bibli](../03-pribehova-bible.md#rozhodnutí-a-jejich-pozdější-následky).
> Stav: **zapracováno** (D78), 2026-11-05. Všechny návrhy K1–K31 autor schválil. Texty kapitoly 4 ještě nejsou (N6), takže se kontrolují
> jen osnovy.

## Shrnutí

| Oblast | Výsledek |
|---|---|
| Průchod krok za krokem | projde; 9 logických děr (K1–K9), nejvážnější je Archa v hangáru (K1) a M03 bez účinku (K2) |
| Soulad s kapitolami 1–3 | 11 nesouladů (K10–K20), nejvážnější: bazén mohl odejít už v M15 (K10) a nesladěné body se počítají dvakrát (K11) |
| Stav na začátku | „dobré“ i „špatné“ kapitoly 1–3 projdou; každý čtený příznak se v kap. 1–3 nastavuje, až na `bara_zna_lavku` (jen v prototypu, K11) |
| M03 a R4.2 | po K2 a K3 rozhoduje M03 o tom, kolik jde obětovat bez odporu; obětovat je potřeba vždy aspoň dva dílky |
| M11 | projde se všemi stavy; vrácený člen jen když už je zpátky (K24); nečte zlepšení z kap. 3 (K18) |
| Nápovědy | 3 stupně u 18 puzzlů, u 7 krátkých chybí 2. stupeň (K7); rozhodnutí mají 1. stupeň |
| Drobnosti | K21–K31 |
| Rozpočet | osnova ≈ 713 replik, po zapracování ≈ 722; překročení schváleno (D77) |
| Chyby v dokumentech | 1, opravená rovnou (D1) |

## Logické díry

**K1 Archa stojí v hangáru, ale nastupuje se na rampě.** Kapitola 3 končí Archou smontovanou
v hangáru a kapitola 4 s ní nikam nehne. Přitom nástupní zkouška (P4.30) vede obyvatele po lávce
na staveništi „do Archy a zpátky“ a konec kapitoly ukazuje „Archu na plošině“. Kapitola 5 začíná
nástupem na rampě, takže přesun musí proběhnout v kapitole 4.

*Návrh:*
- **Nástupní zkouška nanečisto.** Ruda nakreslí na plošinu křídou obrys dveří Archy („Tady
  budou dveře. Zítra.“). Obyvatelé projdou lávkou k obrysu a zpátky. Podmínky P4.30 se nemění.
- **Archa vyjede v závěrečném střihu.** Po podpisu starosty se Archa vyveze z hangáru po dráze
  rampy na plošinu. Vrátný: „Konečně něco ven.“ (odpověď na „Konečně něco dovnitř.“ z P4.10).
- Bez nové scény a bez nového kroku v grafu, 2 texty. Úprava v návrhu (bod 14 a konec), P4.30,
  S2 v místnostech a v průchodu (krok 30 a 33).

**K2 M03 se opakuje, dokud hráč nevyhraje, takže výsledek pro R4.2 skoro nic neznamená.**
Návrh kapitoly říká, že prohra „se jen opakuje“. `c4_souboj` je tak vždy aspoň 3 (přeskočení
dává taky 3). Ve výchozím stavu ale stačí obětovat 1–2 věci a ve špatném 3 velké. Starostovo
„To ne!“ se proto skoro nikdy neozve a výsledek M03 nemá kde se projevit. Varianta C v průchodu
navíc počítá s `c4_souboj` < 3, což podle pravidel nastat nemůže.

*Návrh:*
- **Jako v kapitole 1:** souboj jde opakovat, ale nemusí. Platí poslední výsledek, `c4_souboj`
  je opravdu 0–5.
- **Bez odporu jde obětovat `c4_souboj` − 2 věcí** (3 vyhraná kola: 1 věc, 4: 2 věci, 5: 3 věci).
  Přeskočení (`c4_souboj` = 3) dovolí jednu. Rychlé repliky (sliby) kolo vyhrají, takže kdo chce
  volnou ruku, zaplatí `c4_slib` v kapitole 5.
- Úprava v pravidlech M03, P4.8, P4.9 a v průchodu (varianta C).

**K3 Seznam práce v R4.2 se liší mezi návrhem a kartou a nečte kapitoly 2 a 3.**
- Návrh kapitoly nabízí k obětování „navigaci hned (místo později poklopem)“. To nejde: trup je
  zanýtovaný a navigace jde podle M15 vždy až po zavření. Karta P4.9 má místo ní kulaté kajuty.
- Návrh říká, že s „co nepatří“ (`c1_mimo_rozsah`) jde bazén obětovat „bez kola“ a fontánu
  s terasou jen „s vyhraným kolem“. Karta P4.9 ani jedno nezná.
- Fontána a terasa se objeví při `c1_slib_vseho` ≥ 3 vždy. Podle D68 je ale `c1_mimo_rozsah`
  schová i po slibu.
- Varianta E v průchodu obětuje velká tlačítka, ale na kartě nemají velikost.
- Svačiny, odpočet, tlačítko *Zpět* a kulaté kajuty jsou na seznamu vždy. Hráč je ale mohl
  v kapitole 3 odmítnout (M10) nebo zahodit (M14).
- Bazén má být na seznamu „jen když v Arše je“. Není řečeno, co to znamená při
  `c3_bazen` = `vyjednan` (podle M10 výměna za nafukovací bazén do kajuty).

*Návrh:* jediný zdroj je tabulka dílků na kartě P4.9:

| Dílek | Velikost | Kdy je na seznamu |
|---|---|---|
| Bazén v trupu | 2 | bazén v trupu po M15 (K10) |
| Nafukovací bazén do kajuty | 1 | `c3_bazen` = `vyjednan` |
| Svačiny, odpočet na celé obrazovce, tlačítko *Zpět*, velká tlačítka | po 1 | jen když jsou po kapitole 3 na Bářině seznamu práce (M10, M14; v prototypu `c3_svaciny` a `c3_hotove`) |
| Kulaté kajuty | 2 | stejně |
| Rudův pomník | 2 | vždy |
| Fontána, terasa | 1 + 1 | `c1_slib_vseho` ≥ 3 a bez `c1_mimo_rozsah` |

- **Kapacita je vždy o 2 dílky menší než seznam** (bez Ještětoto), aby šlo R4.2 vždy o něco,
  i když hráč v kapitole 3 hodně odmítl. Ještětoto přidá `c3_creep` dílků jako dosud.
- S `c1_mimo_rozsah` se nafukovací bazén do limitu `c4_souboj` − 2 nepočítá. Starosta podepsal,
  co do Archy nepatří. Pravidlo „fontána jen s vyhraným kolem“ odpadá, limit z K2 ho pokrývá.
- Obětovaná velká tlačítka: `c4_nastup` −1. Navigace ze seznamu v návrhu zmizí.
- Úprava v návrhu (bod 9 a výchozí stav), P4.9 a průchodu.

**K4 Usmíření se nespustí, když Bára už v hangáru stojí.** Usmíření začne, „jakmile Bára vejde
do hangáru“ s hotovými oběma linkami. Hráč může dodělat Bářinu linku dřív, dojít s ní do hangáru
a pak dokončit Rudovu linku (třeba zkouškou motorů přímo v hangáru). Pak se nic nespustí: Bára
musí odejít a vrátit se, a to nikdo nenapoví. Naopak když je Ruda v Komisi, Bára přijde do
prázdného hangáru k „Rudovi u tichých motorů“.

*Návrh:* usmíření začne, **když jsou obě linky hotové a Bára je v hangáru** (vejde do něj, nebo
v něm stojí ve chvíli, kdy se dokončí Rudova linka). Ruda přijde k motorům střihem, stejně jako
ve společných scénách. Vzkaz (P4.26) jde poslat kdykoli předtím, posel ve dveřích dílny je
vidět i z hangáru. Úprava v návrhu (bod 11), P4.27 a v kontrole slepých uliček v průchodu.

**K5 Plošina nestihne uzrát, když ji Ruda objedná až v aktu C.** Vrátný říká „Beton zraje dva
dny. Do usmíření to stihnu.“ Graf i průchod ale dovolují plošinu objednat i v aktu C (zbývá 2).
Pak by beton uzrál až v den dopadu a nástupní zkouška by nešla.

*Návrh:* při `c3_rezerva` < 0 čeká usmíření i na objednanou plošinu. Když chybí jen ona, Pembok
řekne: „Rampa nemá kde skončit. Vrátný to ví.“ Beton zraje během aktu B a v aktu C je hotový.
Babička, bazén, drolení a odešlý člen jdou dál dodělat i v aktu C. Tvrzení „ve špatném stavu
nejsou usmíření a M11 úzká hrdla“ proto platí dál. Úprava v grafu (`usmireni` čeká na
`plosina`, když je), P4.14, P4.27 a průchodu (varianta N); 1 text.

**K6 Bazén v trupu nemá místo, kde zastaví hru.** Graf čeká na vypuštění bazénu až v cíli
kapitoly a varianta T říká „bez toho konec nejde“ (Věra: „Bazén v trupu neodletí.“). Žádný krok
ale neříká, kdy a kde hra hráče zastaví. Kapitola 3 přitom určila, že bazén bez řízení zabere
místo, kudy vede kabel k navigaci.

*Návrh:* bazén zastaví **nahrání navigace (P4.29)**. Bára v trupu: „Kabel vede přes bazén.
Doufám, že nevede do bazénu.“ (replika už je v S5), Věrina replika zůstane jako nápověda.
V grafu se `bazen` přesune z `konec` do `programy`. Úprava v P4.29 a v průchodu (varianta T).

**K7 Krátké puzzly nemají 2. stupeň nápovědy.** Návrh v N3h tvrdí, že každý puzzle má tři
stupně. P4.16 za Báru, P4.18, P4.21, P4.23, P4.24, P4.25 a P4.28 mají jen 1. a 3. stupeň.
P4.24 má navíc jen jednu stopu ve světě.

*Návrh:*
- Doplnit pravidlo do N3h: „puzzle na jeden krok má 1. a 3. stupeň“ (jako K16 v kapitole 3
  pro rozhodnutí). Druhý stupeň by u nich jen opakoval třetí.
- P4.24 dostane druhou stopu: posel řekne „Ruda má rozpis pořád v kapse.“ (1 text).

**K8 Lávka „nebetonováno“.** Červený lístek Rampa při babičce říká „Lávka: nebetonováno. Na
pozemku leží paní.“ Obsah místností ale říká, že babička leží „přímo pod lávkou“, takže lávka
stojí. Kdyby nebyla hotová, chyběl by úkol, který ji dostaví.
*Návrh:* „Lávka hotová. Pod ní leží paní.“

**K9 Jak světlo změní barvu, když jsou ve městě jen zelené žárovky.** Zelenka má jen zelené
žárovky z týdenní výměny („jiné než zelené ve městě nejsou“), ale po každém lístku světlo
„změní barvu na tu skutečnou“. Na konci kapitoly pak Bára přinese žlutou žárovku, která podle
krabice neexistuje.

*Návrh:*
- Lístky skutečnosti jsou barevné papíry. Zelenka je připíná **přes sklo světla** a to svítí
  žlutě nebo červeně skrz („Zelená pod žlutým papírem. Pořád zelená. Ale pravdivá.“). Pravidlo
  „lístky nejsou předměty“ platí dál.
- Na konci Bára přinese žárovku, kterou v dílně natřela nažluto: „Natřená. Svítí míň. Ale svítí.“
- 2 texty, úprava v návrhu (Jak se hraje, konec), S1 v místnostech a P4.1.

## Nesoulad s kapitolami 1–3

**K10 Bazén mohl odejít z trupu už v kapitole 3.** Kapitola 4 bere `c3_bazen` = `bez_rizeni`
jako „bazén je v trupu“ (P4.17, S5, R4.2). V M15 ale hráč při bazénu bez řízení volí „bazén ven“
(Ještětoto +1), nebo „kabel venku“. Příznak `c3_bazen` se tím nezmění, takže kapitola 4 by
vyndaný bazén vrátila.
*Návrh:* M15 nastaví **`c3_bazen_v_trupu`** (jen při „kabel venku“). Kapitola 4 čte ten
a mapa následků ho uvede. Úprava v kap. 3 (M15, tabulka příznaků), bibli a všech místech
kap. 4, kde je `bez_rizeni`.

**K11 Nesladěné body se počítají dvakrát a `bara_zna_lavku` existuje jen v prototypu.**
`c3_integrace` počítá body „přípojka venku, nehotový program uvnitř, aplikace bez dne lávky,
program později bez poklopu“. Kapitola 4 je ale řeší i zvlášť:
- den lávky přes P4.18 a P4.24,
- nehotové počítadlo přes `c3_bara_priority` = ne (úkon navíc v P4.29, varianta Ž),
- program bez poklopu přes vrtání (úkon navíc, varianta Q).

Stejný bod tak stojí hráče dvakrát. Navíc P4.18 a P4.24 se spustí „bez mostu *zkouška
nástupu*“, i když Bára dostala rozpis od Rudy už v M15. To pozná jen příznak `bara_zna_lavku`,
který je v prototypu, ale ne v návrhu kapitoly 3 ani v mapě.

*Návrh:*
- Kapitola 3 uloží místo čísla **seznam `c3_nesladeno`** (`pripojka`, `program`, `lavka`,
  `pozdeji`); `c3_integrace` zůstane jako jeho délka. Příznak `bara_zna_lavku` se přejmenuje
  na **`c3_bara_zna_lavku`** a zapíše do návrhu kap. 3 a mapy.
- V kapitole 4 má každý bod jedno místo:
  - `pripojka` a `program` jsou úkony v P4.29,
  - `lavka` je P4.18 a P4.24,
  - `pozdeji` je vrtání bez poklopu.
- Úkon navíc ve variantách Ž a Q odpadá. P4.18 a P4.24 platí jen při bodu `lavka`.

**K12 Kašna nemá vodu, ale kafe.** P4.17 nabízí Panu Změnovi „kašnu bez vody“ a průchod
„prázdnou od roku 1994“. Od kapitoly 2 ale z kašny teče kafe a rybáři v ní chytají.
*Návrh:* Pan Změna bazén vypustí do kašny „pro všechny“ a kafe vystřídá voda. Rybáři: „Konečně
ryby. Kafe nebralo.“ Stopa zůstane: „Kašna má být s vodou. Od roku 1994 v ní teče kafe.“
Úprava v P4.17, průchodu (T) a dialozích; počet textů stejný.

**K13 Karta poučení a katastrální mapa zůstaly doma.** Na začátku kapitoly 2 hra uloží všechny
předměty kapitoly 1 kromě Pemboka, kávy, pera a klíče. M11 přesto pouští první lahev „když
kartu poučení hráč má“ a babička má ★ na katastrální mapu.
*Návrh:* první lahev s „Zapomněli jsme se zeptat rybářů.“ připluje vždy. Je to Lumírova krabička,
ne Rudův předmět. ★ s mapou odpadá. Krabička Poučení v archivu je prázdná vždy („Poslal jsem ji
dál.“).

**K14 Bářina důvěra nemá body.** Karty říkají „vysoká = stavová proměnná aspoň 60“, ale kapitoly
1–3 nikde nedávají body. Kapitola 3 místo toho čte zástupné pravidlo: `c1_bara_vyslechnuta` ≥ 2
a `c2_rozdeleni` ≠ `gantt`.
*Návrh:* kapitola 4 použije stejné pravidlo **a navíc `c3_vada_hlasena`**. Vada je v kapitole 3
zkouška důvěry, R3.2 se nepočítá, aby pravidlo nebylo moc přísné. Body na stupnici 0–100 počkají
na N7. Úprava v úvodu karet a v průchodu (výchozí stavy).

**K15 Odejít může i Věra.** `c3_odchazi` je Pepa, Klára, Věra, nebo Norbert. Kapitola 4 bere
„bez Věry“ jen podle `c2_tym`. Když odešla Věra a ještě se nevrátila, P4.15 a vrtání v P4.29
nemají koho poslat.
*Návrh:* „bez Věry“ znamená i „Věra odešla a P4.12 ještě nebylo“. Vrátný a Ruda zaskočí stejně
jako při `c2_tym`.

**K16 Seznam pasažérů nemá měsíc.** V kapitole 1 Bára čte „Seznam pasažérů Archy, rok 1994.“
Karta P4.21 se opírá o hlavičku „Sestaveno: duben 1994“ a zároveň říká, že Bára „připíše datum“.
*Návrh:* bez změny kapitoly 1. Bára spojí rok na seznamu s dubnem v záznamu: „Seznam z roku
1994. Kometa v dubnu, Archa v květnu. Seznam psali mezi tím.“ a připíše na něj „duben 1994“.
Hlavička „Sestaveno: duben 1994“ odpadá.

**K17 Výtah z archivu do Komise.** Kapitola 4 vede výtah přímo z archivu do Komise. V kapitole 1
se ale do archivu chodí po schodech z vestibulu a výtah jezdí z vestibulu do 1½. patra.
*Návrh:* archiv i Komise jsou jen za přechodem *Na radnici*. Z archivu do Komise se jde přes
nabídku přechodu, bez výtahu. Úprava v mapě scén, S6, S7 a v průchodu (krok 24).

**K18 Příznaky, které mapa slibuje kapitole 4, ale ta je nečte.**
- `c3_zlepseni`: mapa říká „zlepšení navazuje na M11“. *Návrh:* zlepšení z posezení připluje
  v M11 jako karta větru („Minule jsme si sedli. Pomohlo to.“), 1 text.
- `c3_svaciny`: mapa slibuje důvěru obyvatel. *Návrh:* stačí K3 (svačiny na seznamu práce);
  při `schvalovani` obyvatelé v P4.4 připomenou „Svačina za tři týdny?“ (replika z kap. 3).
- `c2_rizika_zapsana`: *Návrh:* z mapy škrtnout „kap. 4“, rizika se v kap. 4 vracejí přes
  `c3_rezerva` a `c3_drolivy`.

**K19 Časová slova nesedí na odpočet.** Starosta v P4.32 říká „Včera jste mi hlásil zelenou.“,
ale zpráva byla na zbývá 7 a podpis je na zbývá 2. Návrh kapitoly říká, že spolu Ruda a Bára
„dva dny nemluví“, ve skutečnosti od zbývá 7 do usmíření, skoro pět dní.
*Návrh:* „Před pěti dny jste mi hlásil zelenou.“; v části Místo v koncepci „pět dní spolu
nemluví“. Karta „Zbývá 5. Dva dny spolu nepromluvili.“ zůstává, ta platí.

**K20 Zpětné úpravy, které ještě nejsou zapsané.** Kapitola 4 s nimi počítá, ale v dřívějších
kapitolách chybí:
- Klíčník na konci kap. 3: „Nedám ho z ruky.“ (stopa P4.2), 1 text v kap. 3.
- Rudův pomník je jen v bibli. *Návrh:* Gantt v kap. 3 má řádek „Pomník (Ruda)“, Bára:
  „Ten je v Ganttu dřív než lávka.“ (1 text v kap. 3).
- Diplom na Rudově zdi slávy v kap. 1 neříká, že žárovky byly zelené. *Návrh:* přidat „zelené“
  do textu `ch1_byt_zed_pouzit_1` při N6 kapitoly 1.
- Mapa následků neuvádí kapitolu 4 u `c1_mimo_rozsah`, `c2_tym` a `c2_mosty`.

## Drobnosti

**K21 `c4_predseda` opakuje `c4_bara_rekla`.** `hned` vždy znamená `spolu` a `po_usmireni`
vždy `ruda`. *Návrh:* `c4_predseda` zrušit, kapitola 5 a bible čtou `c4_bara_rekla`.

**K22 Čí jsou důkazy v konfrontaci.** Při `hned` má Bára předkládat „svou půlku“. Hvězdářský
záznam, plán Komise i kopie smlouvy jsou ale všechny Bářiny, Rudovy jsou jen náhrady (kopie
podpisů, svědectví). *Návrh:* v konfrontaci jde použít předmět z inventáře obou postav. Při
`hned` předkládá tři hlavní důkazy Bára a náhrady Ruda, při `po_usmireni` všechno Ruda
(dostal desky při usmíření). Palubní lístek pro Předsedu mu podá Bára (lístky má ona),
při `po_usmireni` ho Ruda vezme z jejího balíku: „Jeden navíc. Pro jistotu.“ (1 text).

**K23 „Stačí. Zavírám.“ před navigací.** Karta dovoluje zavřít poklop po každém úkonu. Kdyby
šlo zavřít před nahráním navigace, Archa by neměla navigaci a kapitola 5 s tím nepočítá.
*Návrh:* navigace se nahraje vždy jako první, „Stačí. Zavírám.“ se nabídne až po ní.

**K24 Odešlý člen v M11 a ve střihu „Zbývá 2“.** M11 nechá vráceného člena říct první kartu
a střih „Zbývá 2“ ho nechá předat klíč. P4.12 jde ale udělat i v aktu C, takže při M11 nemusí
být zpátky. *Návrh:* obojí jen při `c4_clen_zpet`. Jinak první kartu řekne Pembok („Někdo
tu chybí.“) a klíč získá Ruda až v P4.12. 1 text.

**K25 Norbert jako posel.** Místnosti říkají „bez Norberta v hangáru dá klíč vrátný“. Když je
Norbert poslem (bez posezení, odešel Pepa), stojí na staveništi. *Návrh:* „bez Norberta
v týmu“; posel Norbert dá klíč na staveništi.

**K26 Poslové se po návratu nemění.** Když se odešlý člen vrátí (P4.12), pořadí poslů by se
mohlo posunout. *Návrh:* poslové se určí při rozkolu a do usmíření se nemění. Vrácený člen jde
do hangáru.

**K27 Repliky, které nikdy nezazní.** Norbert nemůže být `c3_odchazi`: tým čtyř ze šesti má
vždy Pepu, Kláru nebo Věru. Věra nemůže být poslem: před ní jsou v pořadí vždy aspoň dva.
*Návrh:* škrtnout 3 Norbertovy repliky odešlého člena a Věřinu repliku posla (−4).

**K28 Fronta na frontu „o hodinu později“.** V kapitole 1 stojí fronta dva dny (D68).
*Návrh:* „O dva dny později. …V noci jen hodinu.“ Zůstane vtip a nespotřebuje se den.

**K29 Vtipy z cest, které hráč nešel.** ★ Pana Změny „Už jednou jste mě uložili do kajuty.“
dává smysl jen při vyjednaném bazénu, ale P4.17 nastane jen bez řízení. Káva na podušku
(P4.11) navazuje na kap. 1 jen při `c1_razitko` = `kava`. *Návrh:* první ★ nahradit („Kajuta?
Bazén do kajuty se nevejde. Zkoušel jsem.“), druhý podmínit `c1_razitko`, jinak obecný ★.

**K30 Babička a seznam.** Babička říká „Na seznamu nejsem.“, ale o tajném seznamu Komise neví.
Cedule „Pozemek je můj.“ je v kap. 3 jen při `odmitnuta`, kap. 4 ji dává všem bez spojenectví.
*Návrh:* „Lístek na Archu mi nikdo nedal. Tak tu ležím.“ Cedule jen při `odmitnuta`,
`prehlizena` a `neodhalena` mají na lehátku noviny.

**K31 Kdo zanýtoval trup a čí je příznak.** Místnosti říkají „Věra zanýtovala“, bez Věry to
v kap. 3 byl Ruda. P4.16 přepisuje příznak kapitoly 3 (`c3_poklop` = `ano`). *Návrh:* „trup je
zanýtovaný“ bez jména; P4.16 nastaví vlastní stav `poklop_utesnen`.

## Pohled nováčka

| Puzzle | Co zkusí hráč bez znalosti řízení projektů | Odpoví hra? |
|---|---|---|
| P4.1–P4.6 Lístky | poslat zelenou hned, přebarvit světlo, vyměnit žárovku | ano, zelená jde (D12), ★ „Hnědá. To je ještě horší.“, krabice jen zelených |
| P4.7 Zpráva | poctivě se 3 lístky | ano, volba šedá a Pembok „Na poctivou zprávu víš málo.“ |
| P4.8 M03 | odpovídat sliby | ano, kolo vyhraje a `c4_slib` roste; po K2 volnější ruka v R4.2 |
| P4.9 R4.2 | neobětovat nic, obětovat, co chtěli lidé | ano, „Nevejde se.“; Bára „To lidi chtěli.“ |
| P4.10 Motory | klíč bez paliva, zvednout sud | ano, ★ u obou |
| P4.11 Povolení | kávu na razítko, čekat ve frontě | ano, ★ a Pembok řekne, že razítko nebude |
| P4.12 Odešlý člen | Gantt, slib | ano, ★ a kolo se opakuje |
| P4.13 Babička | Gantt, kávu | ano, ★ u obou |
| P4.19–P4.21 Archiv | zakřičet, zařadit podle roku, abecedně | ano, ★ a Lumír „Rok nestačí. Měsíc.“ |
| P4.27 Usmíření | čekat, že Bára přijde sama | ano, posel „Bára je hotová. Přepni se na ni.“; po K4 se spustí i bez odchodu z hangáru |
| P4.29 Poklop | lézt dovnitř za Rudu, zavřít hned | ano, ★ „Nevejdu se.“; past „Stačí. Zavírám.“ až po navigaci (K23) |
| P4.31 Konfrontace | zkoušet předměty naslepo | ano, špatný důkaz „Fáze 2.“ a nic se nestane |

## Stav na začátku

- **„Dobré“ kapitoly 1–3:** projdou podle nejkratší cesty. Po K1 se změní kroky 30 a 33 (obrys
  dveří na plošině, Archa vyjede v závěru), po K2 krok 10 (`c4_souboj` = 5 dovolí 3 oběti bez
  odporu, obětují se 2).
- **„Špatné“ kapitoly 1–3:** projdou. Po K3 je na seznamu práce bazén v trupu (při
  `c3_bazen_v_trupu`), aplikace podle stavu z kap. 3, fontána a terasa. S Ještětoto (3) je
  potřeba obětovat 3 velké věci nebo víc malých. Po K5 čeká usmíření i na plošinu, po K6 zastaví
  bazén nahrávání navigace, po K11 se každý nesladěný bod řeší jednou.
- **Příznaky z kap. 1–3:** všechny, které kapitola 4 čte, se v kap. 1–3 nastavují se stejnými
  jmény a hodnotami (`c1_babicka`, `c1_slib_vseho`, `c1_mimo_rozsah`, `c1_charter_kvalita`,
  `c1_seznam_pasazeru`, `c2_tym`, `c2_rozdeleni`, `c2_riziko_predem`, `c2_mosty`, `c3_rezerva`,
  `c3_drolivy`, `c3_poklop`, `c3_retro`, `c3_odchazi`, `c3_integrace`, `c3_vada_hlasena`,
  `c3_bara_priority`, `c3_hodnota`, `c3_creep`, `c3_bazen`, `c3_dluh`, `c3_krysy`). Výjimka je
  `bara_zna_lavku` (K11). Data v kartotéce, odpočet (9 → 7) i hláška „Dva dny.“ sedí.

## Rozpočet

Osnova má asi 713 replik. Návrhy K přidávají asi 11 textů v kapitole 4 (K1, K5, K7, K9, K18,
K22, K24) a škrtají 4 (K27), celkem asi **720**. Ostatní návrhy mění pravidla nebo přepisují
repliky bez změny počtu. Do kapitoly 3 přibudou 2 texty (K20). Překročení schválil autor (D77).
Škrtat navrhuji až v N6, nejdřív vlastní reakce ★.

## Opraveno rovnou

- **D1** Průchod (špatné kapitoly 1–3, krok 11) tvrdil, že je potřeba obětovat „asi pět věcí“.
  Při 11 dílcích a Ještětoto 3 stačí tři velké (bazén, pomník, kajuty), s malými jich je víc.
