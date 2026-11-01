# Kapitola 1: karty puzzlů

> Krok N3c [postupu návrhu](../12-postup-navrhu.md). Jedna karta na každý puzzle z
> [grafu závislostí](01-iniciace.md#graf-závislostí-puzzlů). Scény a předměty jsou
> v [obsahu místností](01-mistnosti.md).
> Stav: **návrh**, verze 0.1

Nápověda Prof. Pemboka má tři stupně: **1** náznak, **2** směr, **3** skoro řešení. Pembok
radí podle stavu hry k tomu puzzlu, který je nejblíž splnění (tak už funguje v I1).
Ve hře se nejmenují odborné pojmy (D26). Sloupec „Co nese“ je jen pro autory.

## Přehled

| # | Puzzle | Scéna | Povinný | Co nese |
|---|---|---|---|---|
| P1.0 | Útěk z bytu | Ú | ano | ovládání; V01 projekt vs. provoz (volitelně) |
| P1.1 | Kdo tu rozhoduje | S2 | ano | V04 stakeholdeři |
| P1.2 | Číslo od Báry (R1.3) | S1 | jedna z cest | V05 komunikace, V14 hodnota |
| P1.3 | Číslo od Pana Změny | S1 | jedna z cest | zárodek V15 řízení změn |
| P1.4 | Vstup do archivu | S3 | ano | – |
| P1.5 | Původní zadání | S3 | ano | V02 proč, V22 poučení |
| P1.6 | Tlačítko „2“ | S3, S2 | ano | – |
| P1.7 | Karta poučení | S3 | ne (lepší souboj) | V22 poučení |
| P1.8 | Souboj se starostou (M03, R1.1) | S4 | ano | V05 komunikace, V02 |
| P1.9 | Kdo tu vlastně velí (M02) | S5 | ano | V04 stakeholdeři |
| P1.10 | Babička (R1.2) | S6 | ne | V04 přehlížený stakeholder |
| P1.11 | Charter (M01) a fronta | S5 | ano | V03 charter |
| P1.12 | Skrytá přihrádka (za Báru) | S3 | ano | V14 hodnota, měření |
| P1.13 | Razítko a „následné fáze“ (R1.4) | S5 | ano | V03 rozsah |

---

### P1.0 Útěk z bytu
- **Cíl hráče:** dostat se z bytu, než se věřitelé probourají dovnitř.
- **Překážka:** u dveří stojí věřitelé, Ruda nemá nic.
- **Řešení:** sebrat kávu, propisku a knihu; promluvit s věřiteli přes dveře (pode dveřmi
  prostrčí „stížnost“, Ruda ji podepíše a polije kávou: vznikne dekret); slézt dírou ve zdi
  po skluzu na suť.
- **Stopy ve světě:** díra ve zdi je vidět od začátku; Ruda u dveří řekne „tudy ne“ a pohlédne
  ke zdi; skluz je při prohlédnutí díry vidět.
- **Chybné, ale logické pokusy:** jít dveřmi (věřitelé), výtah (jede jen do 3½. patra),
  schovat se (Ruda: „Hrdinové se neschovávají. Hrdinové utíkají.“).
- **Nápověda:** Pembok ještě mlčí (otevře se až na náměstí). Nápovědu dává sám Ruda podle toho,
  co chybí („Bez kávy nikam.“).
- **Příznaky:** žádné.
- **Co nese:** ovládání; zeď slávy volitelně V01.
- **Riziko:** zdržuje. Nejvýš 2–3 minuty, jinak zkrátit.

### P1.1 Kdo tu rozhoduje
- **Cíl hráče:** zjistit, kdo je sponzor Archy.
- **Překážka:** dekret podepsal „zástupce zástupce starosty“.
- **Řešení:** zeptat se vrátného ve vestibulu: starosta Bohumil, 2. patro; výtah jezdí do 1½.
- **Stopy ve světě:** prohlédnutí dekretu („zástupce zástupce“); Pembok k vrátnému.
- **Chybné, ale logické pokusy:** zeptat se Báry (pošle za vrátným: „ten ví, kdo kudy chodí“),
  Pana Změny (každou chvíli někdo jiný).
- **Nápověda:** 1 „Kdo podepsal tvůj dekret?“ · 2 „Kdo tu doopravdy rozhoduje, ví ten, kdo
  celý den sedí u dveří.“ (hotovo v I1) · 3 „Zeptej se vrátného ve vestibulu.“
- **Příznaky:** `vratny_rekl_starosta` (stav místnosti).
- **Co nese:** V04, skrytě: oficiální podpis ≠ skutečná moc.
- **Riziko:** žádné, je to rozjezd.

### P1.2 Číslo od Báry (R1.3)
- **Cíl hráče:** získat číslo projektu, bez kterého Lumír nepustí do archivu.
- **Překážka:** Bára začne větu a Ruda má chuť jí skočit do řeči.
- **Řešení:** v prvním rozhovoru ji třikrát nechat domluvit. Řekne číslo 94/017 i kritéria
  (4 812 lidí, kajuty jen pro polovinu).
- **Stopy ve světě:** Bára mluví věcně a nedokončí větu; volba „(Nechat ji domluvit.)“ je vždy
  první; Pembok „Lidé, kteří měří, většinou vědí víc“.
- **Chybné, ale logické pokusy:** skočit do řeči. Není to chyba hry, ale volba s následkem:
  Bára odejde a číslo nedá, pošle Rudu k Panu Změnovi (cesta B).
- **Nápověda:** 1 „Ta žena u kašny měří.“ · 2 „Lidé, kteří měří, vědí víc než lidé, kteří
  slibují.“ · 3 „Nech ji jednou domluvit.“ (po přerušení: „Zkus to jinak: Pan Změna.“)
- **Příznaky:** nastaví `c1_bara_vyslechnuta` (0–3), `c1_bara_kriteria`, `c1_cislo_projektu`.
- **Co nese:** V05, V14; hlavní zkouška Rudovy vady „neposlouchá“.
- **Riziko:** hráč nepozná, že jde o volbu. Proto Bára po přerušení reaguje viditelně chladně.
- **Stav:** hotovo v I1.

### P1.3 Číslo od Pana Změny
- **Cíl hráče:** získat starý plakát Archy s číslem projektu.
- **Překážka:** Pan Změna za plakát chce pokaždé něco jiného.
- **Řešení:** propiska + káva = kávové pero; kávovým perem na stánek: Ruda přání zapíše a dá
  podepsat. S podepsaným požadavkem Pan Změna přestane měnit názor a plakát vydá.
- **Stopy ve světě:** prohlédnutí stánku (plakát pod okurkou); Ruda po druhém přání: „Kdyby
  to tak měl černé na bílém. A podepsané.“; propiska je „bez inkoustu“, káva „hnědá a tekutá“.
- **Chybné, ale logické pokusy:** dát mu kávu („Svoji kávu nikomu nedám.“), propisku
  („Prázdnou propiskou nic nezapíšu.“), dekret ★, ukrást plakát (Ruda: „Kradu jen nápady.“).
- **Nápověda:** tři stupně hotové v I1 (`ch1_pembok_rada_zmena_1–3`).
- **Příznaky:** `c1_zmena_dohoda`, `c1_cislo_projektu`, `plakat_videl`.
- **Co nese:** zárodek řízení změn: zapsaný a podepsaný požadavek se přestane měnit.
- **Riziko:** může působit jako trest za přerušení Báry. Odpověď: kávové pero je potřeba
  i pro kartu poučení (P1.7), takže tahle cesta není zdržení navíc.
- **Stav:** hotovo v I1.

### P1.4 Vstup do archivu
- **Cíl hráče:** dostat se do archivu ve sklepě.
- **Překážka:** archivář Lumír bez čísla projektu nepustí „ani myš“.
- **Řešení:** říct Lumírovi číslo 94/017 (volba v dialogu, jen když `c1_cislo_projektu`),
  nebo ukázat plakát.
- **Stopy ve světě:** vrátný o Lumírovi a myši; Bára i plakát.
- **Chybné, ale logické pokusy:** vymyslet číslo (Lumír: „To je číslo projektu Kašna. Ten
  je ve fázi 2.“), ukázat dekret (skvrna).
- **Nápověda:** 1 „Archiv má svá pravidla.“ · 2 „Bez čísla projektu to nepůjde.“ · 3 podle
  stavu: „Číslo zná Bára“ / „Prohlédni si stánek“.
- **Příznaky:** `archiv_navstiven`.
- **Co nese:** –
- **Riziko:** žádné. **Dopad na I1:** dveře radnice už nehlídá vrátný, ale Lumír sklep.

### P1.5 Původní zadání (řazení kartotéky)
- **Cíl hráče:** najít původní zadání Archy.
- **Překážka:** kartotéka je seřazená podle *plánovaného* dokončení a u všech lístků stojí
  „příští rok“. Lístek Archy mezi nimi nejde najít.
- **Řešení:** podle Lumírovy knihy skutečných dat zahájení seřadit pět lístků (most 1974,
  výtah 1987, kašna 1994, Archa 1994, lešení radnice 1986) podle skutečného data. Archa
  a kašna mají stejný rok, rozhodne měsíc v knize. Za lístkem Archy je složené původní zadání.
  Lumír ho vydá, až když je lístek na svém místě: „Přílohy vydávám jen k lístkům, které jsou
  na svém místě.“
- **Ovládání:** překryvná obrazovka s pěti lístky, které se přetahují do řady; pořadí se
  kontroluje po každém přesunu. Je to malá hádanka, ne minihra.
- **Stopy ve světě:** prohlédnutí kartotéky („podle plánovaného dokončení“); Lumír: „Plány se
  mění. Data zahájení ne.“; kniha leží na pultu otevřená.
- **Chybné, ale logické pokusy:** řadit abecedně (Lumír: „Abecedně? Jsme archiv, ne
  telefonní seznam.“), vzít lístek Archy bez řazení (Lumír vydá přílohu jen k zařazenému lístku).
- **Nápověda:** 1 „Kartotéka lže. Plány tu vždycky lhaly.“ · 2 „Kdy projekty doopravdy
  začaly? To se nedá přeplánovat.“ · 3 „Seřaď lístky podle Lumírovy knihy.“
- **Příznaky:** předmět **původní zadání**.
- **Co nese:** V02 (proč Archa existuje: odvézt **všechny**), V22; skrytě: plán ≠ skutečnost.
- **Riziko:** řazení může být nudné. Jen 5 lístků a každý má vtipný popisek.

### P1.6 Tlačítko „2“
- **Cíl hráče:** dostat se výtahem do 2. patra ke starostovi.
- **Překážka:** výtah jezdí do 1½. patra, místo tlačítka „2“ je díra.
- **Řešení:** v kartotéce najít lístek „Modernizace výtahu (1987–dosud)“ s číslem krabice;
  požádat Lumíra o krabici; v ní je tlačítko „2“; použít ho na výtah.
- **Stopy ve světě:** díra místo tlačítka (prohlédnutí výtahu); lístek výtahu v kartotéce
  (hotovo v I1); Lumír vydává krabice „jen podle čísla, jako lidé“.
- **Chybné, ale logické pokusy:** jít po schodech (zatarasené), vyjet do 1½ a vylézt (Ruda:
  „Půl patra lezení. Na to nemám charter.“).
- **Nápověda:** 1 „Výtahy se tu modernizují dlouho.“ · 2 „V archivu je projekt Modernizace
  výtahu. Co v té krabici asi zbylo?“ · 3 „Řekni si Lumírovi o krabici výtahu.“
- **Příznaky:** tlačítko zůstane ve výtahu natrvalo.
- **Co nese:** –
- **Riziko:** žádné; hlavní vtip „projekt od 1987, hotové jedno tlačítko“.

### P1.7 Karta poučení
- **Cíl hráče:** získat kartu poučení „Most přes řeku (1974): zapomněli jsme se zeptat rybářů“
  z Lumírovy krabičky „Poučení“, kde je jediná. Lístek mostu v kartotéce zůstává pro řazení.
- **Překážka:** karta neopustí archiv bez podepsané výpůjčky a propiska nepíše.
- **Řešení:** kávovým perem podepsat Lumírovi výpůjčku.
- **Stopy ve světě:** lístek mostu („Pozn.: viz poučení“), krabička Poučení; Lumír: „Výpůjčka.
  Podpis. Čitelný.“; prázdná propiska u něj ★.
- **Chybné, ale logické pokusy:** podepsat propiskou (nic nezůstane), opsat si to (Ruda si
  nezapamatuje ani vlastní číslo bot).
- **Nápověda:** 1 „Lumír ti kartu půjčí. Formálně.“ · 2 „Potřebuješ něco, co píše.“ · 3 jako
  u P1.3, stupeň 2.
- **Příznaky:** předmět **karta poučení**.
- **Co nese:** V22, replika do M03.
- **Riziko:** volitelné; bez karty je souboj těžší, ne nemožný.

### P1.8 Souboj se starostou (M03, R1.1)
- **Cíl hráče:** získat podpis sponzora.
- **Překážka:** starosta chce „něco, co bude v novinách“ a vznáší námitky.
- **Řešení:** vyhrát M03 dobrými replikami: z původního zadání, karty poučení a Bářiných
  kritérií. Nebo vyhrát „rychlými“ sliby (R1.1).
- **Pravidla:** 5 kol, výhra = aspoň 3 vyhraná kola. Dobrá replika se ukáže jen s podkladem
  (kolo 2 zadání, kolo 3 karta poučení, kolo 5 Bářina čísla), kola 1 a 4 ji mají vždy. Rychlá
  replika kolo vyhraje a přičte 1 k `c1_slib_vseho`, slabá kolo prohraje. Bez Báry i bez karty
  jde vyhrát poctivě (kola 1, 2, 4).
- **Stopy ve světě:** noviny na stole, fotky se stuhami; Pembok před soubojem: „Starosta
  chce noviny. Dej mu titulek, který je pravda.“
- **Chybné, ale logické pokusy:** slíbit všechno: vyhraje, ale zvýší `c1_slib_vseho`.
  Prohrát: starosta pošle Rudu pryč a hráč se může vrátit s lepšími replikami.
- **Nápověda:** 1 „Chybí ti argumenty.“ · 2 „Co víš o tom, proč Archa vznikla, a o mostu
  z roku 1974?“ · 3 konkrétně podle chybějící repliky.
- **Příznaky:** `c1_slib_vseho` (0–5 = počet rychlých replik; od 3 je to R1.1 „slíbit všechno“), předmět
  **podpis sponzora**, útržek termínu (30 dní).
- **Co nese:** V05, V02.
- **Riziko:** nejdražší na texty. Začít se 4 koly (ukázková v [návrhu](01-iniciace.md)).

### P1.9 Kdo tu vlastně velí (M02)
- **Cíl hráče:** na Pembokovu radu si před Komisí nakreslit, kdo o čem rozhoduje.
- **Překážka:** bez znalosti postav nejde umístit; babička je skrytá.
- **Řešení:** umístit 6 postav do mřížky vliv × zájem. Babičku jde umístit jen s katastrální
  mapou nebo po prohlédnutí kocourova obojku.
- **Stopy ve světě:** mapa v archivu, obojek kocoura, rozhovory s postavami.
- **Chybné, ale logické pokusy:** dát Předsedu doprostřed (Pembok: „Jsi si jistý?“), vynechat
  babičku. Minihra jde dokončit i bez ní (R1.2 „neodhalena“).
- **Nápověda:** v minihře; Pembok ukáže, o kom hráč ví málo.
- **Příznaky:** odemkne téma pozemku u babičky (`c1_babicka` = `odhalena`).
- **Co nese:** V04.
- **Riziko:** správné umístění musí jít odvodit ze hry, ne z teorie (zásada M02).

### P1.10 Babička (R1.2, volitelné)
- **Cíl hráče:** zjistit, komu patří pozemek pod rampou, a získat ji na svou stranu.
- **Překážka:** babičky se nikdo nikdy na nic nezeptal, takže se jí nikdo nezeptá ani teď.
- **Řešení:** přijít do chaloupky s mapou nebo se znalostí z obojku a **vyslechnout ji**.
  Dostane se spojenkyně a funkční razítková poduška.
- **Stopy ve světě:** mapa (pozemek Pozemková), obojek, rampa trčí nad chaloupkou.
- **Chybné, ale logické pokusy:** chtít podpis hned (babička: „Nejdřív buchtu.“), slíbit jí
  něco (přehlédne to a zavře okno).
- **Nápověda:** 1 „Na mapě je jméno.“ · 2 „Pozemek pod rampou je něčí.“ · 3 „Zajdi za babičkou
  uličkou k rampě a poslouchej ji.“
- **Příznaky:** `c1_babicka` = `spojenec` / `odmitnuta` (spěchal nebo slíbil; okno zůstane
  zavřené do konce kapitoly a poduška se nedá získat) / `prehlizena` (nenavštívena po M02) /
  `neodhalena`.
- **Co nese:** V04; následek v kap. 4.
- **Riziko:** hráč ji vynechá, aniž by věděl, že něco vynechal. To je záměr. Následek v kap. 4
  musí být fér: kocour i mapa jsou výrazné.

### P1.11 Charter (M01) a fronta na frontu
- **Cíl hráče:** sestavit charter, aby ho Komise mohla orazítkovat.
- **Překážka:** útržky jsou rozházené po celé kapitole, mezi nimi nesmysly.
- **Řešení:** M01: do kolonek dát správné útržky (cíl ze zadání, termín od starosty, kritéria
  od Báry, kdo rozhoduje z podpisu). Pak se postavit do fronty na frontu.
- **Stopy ve světě:** každý útržek hráč dostal s replikou, kterou si může vybavit. Útržky nejsou
  předměty: hra si pamatuje, co hráč slyšel, a M01 nabídne jen tyto útržky.
- **Chybné, ale logické pokusy:** nesmysly Pana Změny a Předsedy vyplní kolonku, ale sníží
  kvalitu. Bez Bářiných kritérií zbude jen „Všichni budou spokojení“.
- **Nápověda:** v minihře.
- **Příznaky:** `c1_charter_kvalita` (0–3), předmět **charter**.
- **Co nese:** V03.
- **Riziko:** může působit jako formulář. Humor v útržcích.

### P1.12 Skrytá přihrádka (za Báru)
- **Cíl hráče (Bára):** ověřit, kolik lidí má Archa doopravdy uvézt.
- **Překážka:** v archivu o tom nejsou čísla, jen odhady.
- **Řešení:** změřit metrem hluboký regál zvenku a zevnitř: zvenku je o 30 cm hlubší. Za zadní
  stěnou je přihrádka se seznamem pasažérů: jen Komise a jejich rodiny.
- **Stopy ve světě:** Bára regál prohlédne jinak než Ruda („Tenhle regál je zvenku delší.“);
  Lumír: „Ten regál nikdo nesmí stěhovat. Rozkaz Komise z roku 1994.“
- **Chybné, ale logické pokusy:** zeptat se Lumíra (neví), odhadnout (Bára: „Neodhaduju.“).
- **Nápověda:** Pembok je u Rudy. Báře radí její vlastní metr: první prohlédnutí regálu už
  napoví, druhé řekne „změř ho“.
- **Příznaky:** `c1_seznam_pasazeru` (Bára má seznam; kap. 4, D59).
- **Co nese:** V14; skrytě: měření odhalí víc než sliby.
- **Riziko:** úsek musí být krátký (3–5 min) a ukázat, že Bára řeší věci jinak.

### P1.13 Razítko a „následné fáze“ (R1.4)
- **Cíl hráče:** dostat razítko Komise a klíč od hangáru.
- **Překážka:** poduška na razítka je vyschlá, „inkoust je ve fázi 2“. A Předseda chce do
  charteru připsat „a následné fáze“.
- **Řešení:** razítková poduška od babičky (modré razítko), nebo káva na podušku (hnědé razítko,
  platí, ale Předseda se mračí). Na „následné fáze“ odpovědět: odmítnout s odkazem na rozsah,
  nebo přijmout (R1.4).
- **Stopy ve světě:** prohlédnutí podušky; Ruda: „Hnědé a tekuté by tu chtělo…“
- **Chybné, ale logické pokusy:** kávové pero na razítko (★ „Pero není razítko.“), podepsat
  se místo razítka (Předseda: „Podpis bez razítka je jen kresba.“).
- **Nápověda:** 1 „Razítko bez barvy nic neorazítkuje.“ · 2 „Co tu máš hnědého a tekutého?“
  (nebo „Kdo ve městě má něco dokončeného, i podušku?“; s poduškou „Máš babiččinu podušku.“)
  · 3 „Polij podušku kávou.“ Kávu jde na podušku nalít i dřív, razítko pak čeká na papír.
- **Příznaky:** `c1_razitko` = `poduska` / `kava`, `c1_faze2`, předmět **klíč od hangáru**.
- **Co nese:** V03 (rozsah má hranice).
- **Riziko:** R1.4 musí být čitelná jako volba, ne jako nevinná formalita. Předseda ji nabídne
  až moc vlídně.
