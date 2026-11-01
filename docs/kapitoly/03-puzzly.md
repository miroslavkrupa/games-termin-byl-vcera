# Kapitola 3: karty puzzlů

> Krok N3c [postupu návrhu](../12-postup-navrhu.md). Jedna karta na každý puzzle z
> [grafu závislostí](03-realizace.md#graf-závislostí-puzzlů). Scény a předměty jsou
> v [obsahu místností](03-mistnosti.md).
> Stav: **schváleno** (D72), verze 0.2 (zapracována autorská kontrola, D73)

Nápověda má tři stupně: **1** náznak, **2** směr, **3** skoro řešení. Rudovi radí Prof. Pembok,
Báře její metr (vlastní poznámky při měření, jako v kap. 1). Radí se k puzzlu, který je
nejblíž splnění, u postavy, za kterou se právě hraje. Když jedna linka uvízne a druhá ne,
první stupeň nápovědy řekne „Zkus to chvíli očima Báry.“ (nebo Rudy). Ve hře se nejmenují
odborné pojmy (D26). Sloupec „Co nese“ je jen pro autory.

## Přehled

| # | Puzzle | Kdo | Scéna | Fáze | Povinný | Co nese |
|---|---|---|---|---|---|---|
| P3.1 | Jeřábový balet (M13) | Ruda | S1 | A | ano | V23 harmonogram |
| P3.2 | Krysy ve skladu | Ruda | S1, S5 | A–B | ano | V09 rizika (vrací se) |
| P3.3 | Chybějící dovednost | Ruda | S1, S5, S3 | A–C | jen při `c2_tym_pokryti` < 3 | V10 tým (následek) |
| P3.4 | Ranní porada | Bára | S4 | A | ano | V13 ranní porada |
| P3.5 | Zahlcená dílna | Bára | S4 | A | ano | V16 rozpracovaná práce |
| P3.6 | Plán kola | Bára | S4 | A | ano | V12 plán do kapacity |
| P3.7 | Ukázka na náměstí (M14) | Bára | S3 | B | ano | V24 ukázka, V14 hodnota |
| P3.8 | Vada v počítadle | Bára, Ruda | S4 | B–C | ne (následek v kap. 4) | V14, V20; R1.3 |
| P3.9 | Ještětoto (M10, R3.1) | Ruda | S2 | B | ano | V15 změny |
| P3.10 | Servisní poklop | Ruda | S5, S6 | B–C | ne (bez něj je M15 těžší) | V25 příprava |
| P3.11 | Bára a pořadí práce (R3.2) | Ruda | S4 | B (konec) | ano | V14, V20 |
| P3.12 | Než se zavře trup (M15) | Ruda a Bára | S6 | C | ano | V25 integrace |
| P3.13 | Co příště jinak (R3.3) | Ruda | S2 | C | ano | V19 poučení |

---

### P3.1 Jeřábový balet (M13)
- **Cíl hráče:** dostavět horní polovinu rampy, než dojdou dny.
- **Překážka:** jeden jeřáb, dvě sady bednění a beton, který zraje dva dny a na který se nesmí
  stavět, dokud nedozraje.
- **Řešení:** použít jeřáb (vrátný: „Začneme?“) → M13: oba pilíře co nejdřív, dráha hned
  po jejich dozrání, plošina hned po dráze, lávka do dnů, kdy jeřáb stojí. Nejlepší plán
  skončí 14. den ([pravidla](03-realizace.md#m13-jeřábový-balet), [rozpis](03-pruchod.md#rozpis-m13)).
- **Stopy ve světě:** výkres rampy z roku 1994 na plotě (pořadí pilíře → dráha → plošina);
  vrátný: „Jeden jeřáb, jeden den, jedna věc.“; cedule na domíchávači „Beton zraje dva dny.
  I v Nedostavěnici.“; Věra (v týmu): „Bednění máme dvoje. Kdo ho nevrátí, nestaví.“
- **Chybné, ale logické pokusy:** dvě karty do jednoho dne (karta se vrátí: „Jeden jeřáb.“),
  bednění dráhy před dozráním pilířů (při přehrání zřícené bednění), třetí sada bednění
  (★ vrátný: „Třetí sada je ve fázi 2.“), káva na beton (★ „Beton se neprobouzí.“).
- **Nápověda:** 1 „Tohle umíš. Co musí stát, než postavíš další kus?“ · 2 „Pilíře co nejdřív,
  dráha hned po nich. Lávka se vejde, kdy jeřáb nemá co dělat.“ · 3 v minihře ukáže den,
  kam patří další karta kritické cesty.
- **Příznaky:** `c3_rezerva`, `c3_drolivy` (jen `krabice`); předmět **rozpis rampy**.
- **Co nese:** V23; skrytě: kritická cesta a sdílený zdroj. Rudův způsob tu funguje.
- **Riziko:** suché. Vrátný komentuje každý den, zřícené bednění je gag a Pembok chválí bez ironie.

### P3.2 Krysy ve skladu
- **Cíl hráče:** dostat se ke plechům na trup (a k servisnímu poklopu).
- **Překážka:** sklad je zamčený a uvnitř sedí krysy na hnízdě z papírů z roku 1994.
- **Řešení:**
  - **Bez kočky** (`c2_riziko_predem` ≠ `krysy`): vzít od vrátného **klíč od skladu**,
    otevřít dveře skladu, položit **žádosti o změnu** jako stopu od dveří k Předsedově
    otevřené aktovce (použít žádosti na otevřené dveře skladu, nebo na aktovku). Krysy vyrazí po čerstvém
    papíře do aktovky. Předseda ji zavře: „Výborně, výborně.“ a odejde. Aktovka se hýbe.
  - **S kočkou:** klíč od skladu, promluvit s kočkou Rizikovou („Pojď.“), ta se ve dveřích
    podívá na krysy a krysy si vezmou dovolenou. Kočka zůstane ve skladu hlídat.
- **Stopy ve světě:**
  - hnízdo: „Krysy tu jedí papír. Ve městě, kde je papíru víc než sýra.“;
  - žádosti o změnu: „Tři kopie: pro Komisi, pro archiv a pro krysy.“;
  - aktovka: „Plná papíru. Krysám by se tam líbilo.“;
  - lístek „krysy“ v krabici od bot (`c2_rizika_zapsana`): krabice na krysy: „Zapsal jsem si:
    žerou kabely a papír.“;
  - Pembok.
- **Chybné, ale logické pokusy:** vejít mezi krysy („Mají většinu.“), káva na krysy (★ „Teď
  budou krysy čilé.“), krabice od bot na krysy (nápověda výše), babiččin kocour (★ „Tenhle
  krysy nehoní. Ten soudí lidi.“, jako v kap. 2), žádosti o změnu rovnou na krysy uvnitř
  (★ „Krysy si je vzaly a zůstaly. Potřebují je dostat ven.“, formuláře se vrátí),
  žádosti na Předsedu (★ „Další kopie? Jistě.“), žádosti na aktovku, dokud je sklad zamčený
  (★ „Krysy jsou pořád zamčené.“, žádosti zůstanou, K15).
- **Nápověda:** 1 „Co krysy v tomhle městě jedí?“ · 2 „Papír. Kdo tu nosí nejvíc papíru?“ ·
  3 „Otevři sklad a udělej krysám stopu ze žádostí až k Předsedově aktovce.“ (s kočkou:
  1 „Někdo ti poslal pomoc v koši.“ · 3 „Vezmi kočku ke skladu.“)
- **Příznaky:** `c3_krysy` = `kocka` / `aktovka`; stav `sklad_volny`.
- **Co nese:** V09; skrytě: riziko připravené předem stojí minutu, nepřipravené puzzle.
- **Riziko:** bez kočky delší (5–8 min). Proto tři stopy v jedné scéně (aktovka, žádosti,
  hnízdo) a Předseda stojí hned vedle skladu.

### P3.3 Chybějící dovednost (jen při `c2_tym_pokryti` < 3)
- **Cíl hráče:** udělat práci, kterou měl dělat člověk, který v týmu chybí.
- **Varianty:**
  - **Bez stavby (bez Věry):** jeřábník horní dráhu nezačne: „Nad deset metrů jen podle výpočtu
    statika.“ Výpočet z roku 1994 leží v krysím hnízdě ve skladu. **Řešení:** P3.2, vzít
    z hnízda **výpočet statika**, dát ho vrátnému → M13 jde potvrdit, osa je o den kratší.
  - **Bez podpisu startu (bez Norberta):** trup se podle normy zavírá jen podepsaný. Norbert
    sedí od fáze B na lavičce na náměstí a čte normu o lavičkách. Podepíše jen to, co viděl,
    ale do trupu nepůjde, „dokud tu mluví kniha. To odporuje normě o knihách.“ **Řešení:**
    použít **Pemboka** na Norberta: Pembok slíbí mlčet (a vydrží to přesně jednu repliku),
    Norbert jde do trupu a podepíše. `c3_rezerva` −1.
  - **Bez zkoušení (ani Pepa, ani Klára):** žádný puzzle, Bára má v plánu kola i v M14
    kapacitu 2 („Dělám sama za dva. Takže za jednoho.“).
- **Stopy ve světě:** cedule na jeřábu; Věra v hospodě v kap. 2 („všechno chce mít na razítku“),
  tady nahrazená výpočtem; Norbert v kap. 2 („jediný smí podepsat start“); Pembok: „Kdo ti
  tu chybí? Někdo, koho jsi nevzal.“
- **Chybné, ale logické pokusy:** podepsat výpočet sám (★ „Statik jsem nebyl ani ve snu.“),
  Zdenda (★ „Znám chlapa, co zná statika. Teda znal.“), Kryštof (★ „Výpočet? Svolám poradu.“),
  plán cesty místo podpisu (★ Norbert: „Razítko Komise není podpis podle normy.“).
- **Nápověda:** 1 „Na tohle jsi potřeboval člověka, kterého nemáš.“ · 2 „Výpočty z roku 1994
  jsou ve skladu.“ / „Norbert sedí na náměstí. Vadí mu ale něco, co máš v kapse.“ · 3 „Vezmi
  výpočet z hnízda a dej ho jeřábníkovi.“ / „Dej Norbertovi Pemboka. Slíbím, že budu mlčet.“
- **Příznaky:** `c3_rezerva` −1 za každou okliku (bez Věry den na ose M13, bez Norberta den
  na konci).
- **Co nese:** následek R2.1; skrytě: chybějící role se dá obejít, ale stojí čas.
- **Riziko:** dvojí varianta zdvojnásobí texty. Každá má nejvýš 6 replik.

### P3.4 Ranní porada (za Báru)
- **Cíl hráče (Bára):** za patnáct minut zjistit, co kdo dnes dělá a co mu brání.
- **Překážka:** každý odbočí a uprostřed vtrhne Ruda.
- **Řešení:** použít kuchyňskou minutku → scéna. Každý z týmu v dílně (Pepa, Klára, Kryštof,
  podle týmu, plus Zdenda kvůli kafi) řekne svou větu a Bára vybere odpověď:
  - odbočku utnout („Automat potom. Co dneska?“), nebo nechat běžet (minutka −5 min),
  - **překážku** vzít: „Nemám na čem zkoušet, zkušební sloupek je zavalený.“ → „Vyřešíme hned
    po poradě.“,
  - **Ruda** vtrhne a chce rozdělit práci podle Gantta: „Rudo, za deset minut ti řeknu, na čem
    jsme se domluvili.“ (Ruda: „Deset minut. Měřím to.“), nebo „Dobře, rozděl nám to.“ (Ruda
    vloží odpočet do 1. kola, minutka −5 min).
- **Výsledek:** porada do 15 minut = v 1. kole kapacita 3; přetažená = kapacita 2.
- **Stopy ve světě:** minutka („Patnáct minut. Ani o minutu víc.“); Bára sama: „Porada je na
  to, co dneska a co nám brání. Ne na automat.“; při `c2_rozdeleni` = `gantt` přinese Ruda
  vytištěný Gantt.
- **Chybné, ale logické pokusy:** nechat Kryštofa svolat poradu o poradě (−5 min, ★), nechat
  Rudu (viz výše), skončit hned (★ „Nevíme, co komu brání.“ porada pokračuje).
- **Nápověda (metr):** 1 „Patnáct minut. Kolik jich už uběhlo?“ · 2 „Co dneska a co komu brání.
  Zbytek potom.“ · 3 „Utni odbočky, vezmi překážku a Rudu pošli na deset minut pryč.“
- **Příznaky:** stav `porada_na_cas`; při „rozděl nám to“ odpočet v 1. kole.
- **Co nese:** V13; skrytě: porada je na překážky, ne na hlášení šéfovi.
- **Riziko:** dialogový kvíz. Proto krátké (3 min) a s vtipnými odbočkami, které se vyplatí
  slyšet aspoň jednou.

### P3.5 Zahlcená dílna (za Báru)
- **Cíl hráče (Bára):** uvolnit zkušební sloupek, aby šlo začít nové kolo.
- **Překážka:** na tabuli „Dělám“ jsou tři háčky a visí na nich šest lístků (sedm při
  `c2_rozpad` ≥ 2). Dokud je jich víc než tři, Bára nic nového nezačne („Kdo dělá všechno,
  nedokončí nic.“).
- **Řešení:** dvě věci dokončit, dvě odložit:
  - vzít **kabel** zpod makety, použít ho na zkušební sloupek → sloupek hotový,
  - vzít **lepicí lístky** z krabičky, použít je na maketu kajuty → maketa hotová,
  - půlku čidla odložit na polici „Někdy“,
  - Rudův model rampy odložit na polici (nebo dát Rudovi, když je v dílně),
  - Pepa (Klára, Kryštof) přijde s novým nápadem („Hra Had na sloupek! Dva dny.“) → „Až něco
    dokončíme.“ Kdo nápad přijme, má na háčku lístek navíc.
  Na háčcích zůstane nejvýš tři. Při `c2_rozpad` ≥ 2 je navíc „dvakrát nakrájený plech“, ten
  patří Rudovi (odložit).
- **Stopy ve světě:** tabule se třemi háčky; Bára: „Tři háčky. Ne šest.“; kabel vykukuje
  zpod makety; maketa je rozlepená a lístky lepí; police „Někdy“.
- **Chybné, ale logické pokusy:** začít plán kola dřív (★ „Nejdřív dokončit. Pak začít.“),
  všechno odložit na polici (★ „Odložit se dá jen to, na co nikdo nečeká. Na sloupek čekáme.“),
  vyhodit Rudův model (★ „Pak by mi ho Ruda kreslil na zeď.“), kabel na maketu (★).
- **Nápověda (metr):** 1 „Šest lístků, tři háčky.“ · 2 „Dvě věci jdou dokončit hned, na dvě
  nikdo nečeká.“ · 3 „Zapoj kabel do sloupku, slep maketu lístky a čidlo s modelem dej na polici.“
- **Příznaky:** stav `dilna_volna`.
- **Co nese:** V16; skrytě: nejdřív dokončit, pak začít nové.
- **Riziko:** inventářový puzzle bez pointy. Pointa je Pepův nápad: hráč, který ho přijme,
  vidí, jak se háčky znovu plní.

### P3.6 Plán kola (za Báru)
- **Cíl hráče (Bára):** naplánovat, co se do ukázky na náměstí stihne. Kolo trvá tři dny
  (zbývá 24 → 21), ukázka je na jeho konci (K1).
- **Překážka:** karet je víc, než se vejde, a nahoře je Rudův odpočet.
- **Řešení:** použít Bářinu tabuli seznamu práce → scéna:
  - **cíl kola** ze tří: „Jestli lidi najdou cestu“ ✔ / „Ať to vypadá hotově“ / „Všechno najednou“,
  - **karty** do kapacity (3, nebo 2 po přetažené poradě a bez zkoušení): dobré jsou šipky,
    mapa kajut a maketa s palandou (cíl „Jestli lidi najdou cestu“ je zvýrazní),
  - karta nad kapacitu jde přidat (Pepa: „To dáme, dva dny.“) → `c3_dluh` +1 za každou.
- **Stopy ve světě:** obyvatelé s kufry z kap. 2 a lístek „nástup“ (*Zkusíme*) v krabici od
  bot; Klára (kap. 2): „Nikdo neví, jak chce spát, dokud si nelehne.“ (maketa); Bára: „Co
  chceme na náměstí zjistit?“
- **Chybné, ale logické pokusy:** cíl „Všechno najednou“ (★ Bára: „To není cíl, to je seznam.“
  a cíl se vrátí), samé Rudovy karty (projde; v M14 je ukázka slabá).
- **Nápověda (metr):** 1 „Tři karty. Co chceme na náměstí zjistit?“ · 2 „Nejdřív to, na co se
  lidé ptají: kudy a kde budou spát.“ · 3 „Cíl ‚Jestli lidi najdou cestu‘: šipky, mapa kajut,
  maketa.“
- **Příznaky:** obsah 1. kola M14, `c3_dluh`.
- **Co nese:** V12; skrytě: plán do kapacity a s cílem.
- **Riziko:** zdvojuje M14. Proto je to krátká scéna a další kola se plánují už v M14.

### P3.7 Ukázka na náměstí (M14)
- **Cíl hráče (Bára):** zjistit, co lidé na Arše opravdu potřebují, a podle toho přerovnat práci.
- **Překážka:** odhady v seznamu práce jsou odhady. Skutečnost se ukáže až na náměstí.
- **Řešení:** ve fázi B použít stánek s ukázkou → M14
  ([pravidla](03-realizace.md#m14-ukázka-na-náměstí)): ukázat po každém kole, karty bez hodnoty
  vyhodit, nahoru dát to, co lidé chtějí (velká tlačítka, udice, kocour).
- **Stopy ve světě:** babička čte noviny s lupou (plot v S1, náměstí); rybáři s udicemi u kašny;
  obyvatelé s kufry; lístek *Zkusíme* z kap. 2; Bára: „Neodhadujeme. Ukážeme.“
- **Chybné, ale logické pokusy:** neukazovat po 2. kole (výsledek horší, ★ Bára: „Takže jsme
  se dozvěděli… nic.“), nechat heslo (babička neprojde), odpočet nahoru (nikoho nezajímá).
- **Nápověda (metr):** 1 „Kdo tu dnes stojí a co drží v ruce?“ · 2 „Ukazuj po každém kole.
  Co nikdo nechce, vyhoď.“ · 3 v minihře zvýrazní kartu, kterou reakce otočila nejvýš.
- **Příznaky:** `c3_hodnota`, `c3_dluh`; Ještětoto se narodí ve střihu po M14 (svačiny Pana
  Změny), i když hráč minihru přeskočí (K14).
- **Co nese:** V24, V14.
- **Riziko:** skrytá informace jako náhoda. Každá reakce má stopu ve scéně dřív, než padne.

### P3.8 Vada v počítadle
- **Cíl hráče (Bára):** ověřit, jestli se na Archu vejdou všichni, a když ne, říct to Rudovi.
- **Překážka:** počítadlo se zastaví na 4 811. Ruda Báru v kapitole 1 (možná) nenechal domluvit.
- **Řešení:** po M14 použít zkušební počítač („Babička se ptala, jestli se vejdou všichni.“)
  → vada → **zápis vady**. Pak dvě cesty:
  - **za Báru:** dát zápis Rudovi. Při **vysoké důvěře** (`c1_bara_vyslechnuta` ≥ 2 a
    `c2_rozdeleni` ≠ `gantt`) ji Ruda vyslechne: „Kdo se nevejde?“ „Podle pořadí na lince
    pomoci ty.“ „…Oprav to.“ Při nízké ji odbyde: „Teď ne, Báro, mám jeřáb.“ a zápis se vrátí;
  - **za Rudu** (hned po nalezení vady, bez ohledu na pokus za Báru, K4): Bára se v dílně
    mračí do počítače. Ruda: „Báro, něco tě trápí?“
    Bára mluví pomalu a Ruda má tři příležitosti skočit jí do řeči („Rychle, mám jeřáb.“). Když
    mlčí, dozví se to. Když skočí do řeči, Bára: „Nic. Neřeším.“ a znovu se to nabídne až v kap. 4.
- **Stopy ve světě:** babiččina otázka v M14 („Vejdeme se všichni? I s kocourem?“); amplion
  a linka pomoci „4 812“; Bára se od nalezení vady mračí do počítače; Pembok: „Bára něco ví. Zeptej
  se. A pak mlč.“
- **Chybné, ale logické pokusy:** opravit to potichu (★ Bára: „Opravím to. Ale on to má vědět.“),
  dát zápis Pepovi (★ „Dva dny.“), dát Rudovi seznam pasažérů (★ „Ještě ne.“).
- **Nápověda:** Bára (metr): 1 „4 811. Kdo chybí?“ · 2 „Tohle musí vědět Ruda.“ · 3 „Dej Rudovi
  zápis vady.“ Ruda (Pembok, od nalezení vady): 1 „Bára se mračí.“ · 2 „Zeptej se jí, co se děje.“ ·
  3 „Zeptej se a nech ji domluvit. Celou dobu.“
- **Příznaky:** `c3_vada_hlasena`; Bářina důvěra (+ při vyslechnutí).
- **Co nese:** V14, V20; navazuje na R1.3: kdo poslouchá, dozví se, co se pokazilo.
- **Riziko:** hráč vadu přehlédne. Není povinná a nese ji kap. 4, takže je to v pořádku. Konec
  kapitoly (Bára se odvrátí) dá najevo, že něco zůstalo neřečeno.

### P3.9 Ještětoto (M10, R3.1)
- **Cíl hráče:** vyřídit přání a změny, aby Archa nebobtnala.
- **Překážka:** Pan Změna chce bazén v trupu a svačiny v aplikaci, Předseda chce ke každé
  změně formulář a Ještětoto roste.
- **Řešení:** ve fázi B (po M13 a M14) použít rozcestník změn → M10
  ([pravidla](03-realizace.md#m10-ještětoto-scope-creep)): bazén posoudit a vyjednat (nafukovací
  bazén do kajuty), svačiny a tlačítko *Zpět* do Bářina seznamu, servisní poklop posoudit
  a schválit, Rudův Gantt v aplikaci odmítnout. Při `c1_faze2` předtím ukázat Předsedovi plán
  cesty s „fáze 2: pozastavena“.
- **Stopy ve světě:** tabule z kap. 2 se dvěma sloupci; Věra: „Trup se počítá, ne přeje.“;
  Bára: „Aplikace se dá předělat zítra. Trup ne.“; Ještětoto viditelně roste; při `c1_mimo_rozsah`
  papír o Arše (bazén mezi věcmi, které nepatří).
- **Chybné, ale logické pokusy:** všechno *Ne* (Ještětoto nevyroste, ale Pan Změna se vrátí
  s větším přáním a obyvatelé jsou naštvaní), všechno k posouzení (svačiny čekají tři týdny),
  poklop do Bářina seznamu (Věra vrátí), Gantt v aplikaci rovnou („Je to přece můj nápad.“).
- **Nápověda:** 1 „Přání nejsou stejná. Co stojí víc předělat: trup, nebo aplikaci?“ · 2 „Trup
  posuď a vyjednej, aplikaci dej Báře. A neříkej všemu ne.“ · 3 v minihře ukáže přihrádku pro
  aktuální kartu.
- **Příznaky:** `c3_creep`, `c3_bazen`, `c3_svaciny`, `c3_poklop` (schválení).
- **Co nese:** V15.
- **Riziko:** kvíz. Ke každé přihrádce je slyšet důvod (Věra počítá, Bára řadí, Předseda
  razítkuje) a dobrá změna (poklop) ukáže, že posouzení není zákaz.

### P3.10 Servisní poklop
- **Cíl hráče:** dostat do trupu dvířka, kudy půjdou programy i po zavření.
- **Překážka:** poklop není na výkresu, leží ve skladu za krysami a zabudovat se smí jen schválený.
- **Řešení:** po P3.2 vzít poklop ve skladu; v M10 ho schválit (posoudit a vyjednat); v trupu
  použít poklop na otvor v boku.
- **Stopy ve světě:** Bára: „Kdyby měl trup dvířka, nahrála bych programy i potom.“ (v dílně
  i v M10); otvor v boku trupu („Bude z ní poklop, nebo nýty.“); poklop ve skladu s cedulkou
  „B. B. 1994“.
- **Chybné, ale logické pokusy:** nasadit poklop před schválením (★ Věra: „Bez výpočtu do mého
  trupu nic nevrtám.“), schválit ho „rovnou“ (projde, ale netěsní, `netesni`).
- **Nápověda:** 1 „Bára chtěla do trupu dvířka.“ · 2 „Poklop je ve skladu, ale do trupu jen
  schválený.“ · 3 „Pošli poklop k posouzení a pak ho nasaď do otvoru v trupu.“
- **Příznaky:** `c3_poklop` = `ano` / `netesni` / `ne`.
- **Co nese:** příprava V25: místo, kde se oba světy můžou potkat i po milníku.
- **Riziko:** hráč poklop odmítne v M10 a M15 je pak těžší. Není to slepá ulička, jen následek.

### P3.11 Bára a pořadí práce (R3.2)
- **Cíl hráče:** vědět, co bude v trupu, až se zavře.
- **Překážka:** Rudovi se nelíbí, že pořadí v Bářině seznamu není podle jeho Gantta.
- **Řešení:** na konci fáze B (po M10, zbývá 15) vejít jako Ruda do dílny → scéna (Bára přijde,
  když tam není): Ruda přinese svůj Gantt přepsaný na papír a sáhne po kartách. Rozhodne
  se pořadí 4. kola, ve kterém se dělá řídicí systém (K1). Volba:
  - „Pořadí je tvoje. Řekni mi jen, co bude hotové, až se zavře trup.“ → `c3_bara_priority` =
    ano; Bára: „…Dobře. Počítadlo do zavření. Navigace potom.“,
  - „Pořadí určuju já.“ → ne; Ruda dá nahoru odpočet a heslo; Bára: „Dobře. Tvůj Gantt.“
  Mezi tím Ruda může jen přemýšlet nahlas (dvě nevolitelné repliky, kde se v něm pere mikromanažer).
- **Stopy ve světě:** výsledek M14 (lidé přerovnali seznam sami); Pembok: „Kdo ví víc o tom,
  co chtějí lidi: ty, nebo ta, co se jich ptala?“; Rudův Gantt v dílně („Řádek 112:
  naprogramovat řízení: úterý.“).
- **Chybné, ale logické pokusy:** – (rozhodnutí, obě volby jdou).
- **Nápověda:** jen 1. stupeň (rozhodnutí se neradí): „Tohle je tvoje volba. Ale vzpomeň si
  na náměstí.“
- **Příznaky:** `c3_bara_priority`; Bářina důvěra, Rudův vývoj +1 (vada „mikromanažuje“).
- **Co nese:** V14, V20.
- **Riziko:** volba vypadá jako test se správnou odpovědí. Rudova volba proto není hloupá:
  má jasnou výhodu („Aspoň vím, na čem jsem.“) a v M15 je odpočet hotový jako první.

### P3.12 Než se zavře trup (M15)
- **Cíl hráče:** zavřít trup se vším, co v něm musí být, a nic víc.
- **Překážka:** Ruda chce všechno dovnitř, Bára nechce nic slíbit; některé programy do zavření
  hotové nebudou.
- **Řešení:** ve fázi C (po R3.2) použít místo pro počítač → M15 (Bára přijde do trupu, K6)
  ([pravidla](03-realizace.md#m15-než-se-zavře-trup-integrační-okno)): všechny tři přípojky
  dovnitř, start motorů a počítadlo dovnitř (pokud bude hotové), navigaci poklopem, aplikaci
  ven. Bez mostu *zkouška nástupu* dát Báře rozpis rampy.
- **Stopy ve světě:** přípojky v trupu („Tudy povedou programy. Pokud tu budou kabely.“);
  Věra: „Zítra zavírám. Kdo tu bude, zůstane.“; plán cesty z kap. 2 (mosty); Bára: „Navigace
  do zavření nebude. Ale dvířka by stačila.“
- **Chybné, ale logické pokusy:** všechno dovnitř (nehotová navigace uvnitř), všechno později
  (přípojky venku), aplikace dovnitř (Věra vrátí: „To běží venku.“), zapomenout na den lávky.
- **Nápověda:** 1 „Co se po zavření už nedá natáhnout?“ · 2 „Kabely dovnitř vždycky. Programy
  jen ty, které budou hotové a které potřebuje nejbližší zkouška.“ · 3 v minihře ukáže jednu
  špatně umístěnou kartu.
- **Příznaky:** `c3_integrace`, `c3_odchazi` (kdo dostane klíč od poklopu, bez poklopu plán
  zapojení trupu, K2).
- **Co nese:** V25.
- **Riziko:** abstraktní. Řez skutečným trupem, Věra s nýtovačkou a tři druhy chyb, které se
  vrátí jako tři krize kapitoly 4.

### P3.13 Co příště jinak (R3.3)
- **Cíl hráče:** pokračovat ve stavbě. Otázka je, jestli se předtím zastavit.
- **Překážka:** zbývá 9 dní a všichni chtějí stavět.
- **Řešení:** po M15 v hangáru tým čeká. Volba:
  - „Sedneme si a řekneme si, co příště jinak.“ → krátká scéna: každý z týmu řekne jednu věc,
    která se v kapitole pokazila (podle toho, co se stalo: lano, krysy, Ještětoto, porada, vada).
    Hráč vybere **jedno zlepšení** ze tří, které se z toho nabízejí → `c3_retro`, `c3_zlepseni`.
    Kryštof (v týmu): „Navrhuju, abychom si co příště jinak řekli příště.“ ★
  - „Nemáme čas. Stavíme.“ → konec kapitoly hned; tým mlčky odchází (`c3_retro` = ne).
- **Stopy ve světě:** tým sedí na bednách a nikdo nezačíná; Bára: „Než začneme dál, mohli
  bychom si říct, co se pokazilo.“; Pembok: „Čtrnáct projektů. Na kolika sis řekl, co příště
  jinak?“ Ruda: „Na žádném. Nebylo příště.“
- **Chybné, ale logické pokusy:** – (rozhodnutí).
- **Nápověda:** jen 1. stupeň: „Rozhodni se. Kometa nečeká, ale chyby taky ne.“
- **Příznaky:** `c3_retro`, `c3_zlepseni`; morálka.
- **Co nese:** V19; skrytě: zastavit se a poučit je práce, ne ztráta času.
- **Riziko:** nuda. Scéna má nejvýš 6 replik a každá připomene konkrétní vtip z kapitoly.
