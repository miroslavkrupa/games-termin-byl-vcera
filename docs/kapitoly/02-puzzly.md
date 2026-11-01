# Kapitola 2: karty puzzlů

> Krok N3c [postupu návrhu](../12-postup-navrhu.md). Jedna karta na každý puzzle z
> [grafu závislostí](02-planovani.md#graf-závislostí-puzzlů). Scény a předměty jsou
> v [obsahu místností](02-mistnosti.md).
> Stav: **schváleno** (D69), verze 0.2 (zapracována autorská kontrola, D68)

Nápověda Prof. Pemboka má tři stupně: **1** náznak, **2** směr, **3** skoro řešení. Radí k puzzlu,
který je nejblíž splnění. Ve hře se nejmenují odborné pojmy (D26). Sloupec „Co nese“ je jen
pro autory.

## Přehled

| # | Puzzle | Scéna | Povinný | Co nese |
|---|---|---|---|---|
| P2.1 | Slon v bráně (M04) | S2, S4 | ano | V06 rozpad práce |
| P2.2 | Nábor týmu (R2.1) | S4 | ano | V10 tým |
| P2.3 | Odhad bez kotvy | S4 | ano | V07 odhady |
| P2.4 | Rozdělení Archy (R2.2) | S3 | ano | V11 volba přístupu |
| P2.5 | Krabice od bot (M07, R2.3) | S1–S4 | ano | V09 rizika |
| P2.6 | Formulář na formulář | S3, S6 | jen při `c1_razitko` = `kava` | – (následek z kap. 1) |
| P2.7 | Mapa do neznáma (M06) | S5 | ano | V08 roadmapa, V11 |
| P2.8 | Schválení plánu cesty | S6 | ano | V08; s `c1_faze2` i V03 rozsah |

---

### P2.1 Slon v bráně (M04)
- **Cíl hráče:** dostat se do hangáru k Arše.
- **Překážka:** klíč pasuje, ale bránu zevnitř zatarasil slon z rozdělané práce.
- **Řešení:** vzít **křídu** z tabule v hospodě („Odhad dne: dva dny“), použít křídu na slona
  → M04: naporcovat kamennou půlku celou, mlžnou jen v nejbližší části.
- **Stopy ve světě:** prohlédnutí slona („Praská tam, kde na něm někdo nechal čáru. Z roku 1994
  je na něm jedna, pod uchem.“); stará čára křídou na slonovi; křída leží na tabuli v hospodě
  na očích; Pembok: „Jak se jí slon?“
- **Chybné, ale logické pokusy:** strčit do slona (★ „Hýbe se míň než Komise.“), klíč na slona
  (★ „Slon nemá zámek. Má jen váhu.“), kávové pero na slona (★ „Kávová čára se do slona vsákne. Je z papírů a papíry
  pijou všechno.“), káva na slona (★ „Neprobudí ho. Mě jo.“).
- **Nápověda:** 1 „Slon je moc velký na jedno sousto.“ · 2 „Praská tam, kde má čáru. Čím se
  dělají čáry na tabuli?“ · 3 „Vezmi křídu z tabule v hospodě a rozkresli ho.“
- **Příznaky:** `c2_rozpad` (0–3), stav `hangar_otevren`.
- **Co nese:** V06; mlžná půlka zasévá V08 a V11.
- **Riziko:** jediný začátek kapitoly; když hráč nenajde křídu, stojí. Proto je hospoda vidět
  z náměstí jako první východ a tabule s křídou je ve hospodě v popředí.

### P2.2 Nábor týmu (R2.1)
- **Cíl hráče:** sestavit tým čtyř lidí, se kterým se dá Archa postavit.
- **Překážka:** šest kandidátů, užiteční jsou otravní a sympatičtí neumějí nic.
- **Řešení:** promluvit s kandidáty, vyzkoušet je na věcech v hospodě (automat, viklavý stůl,
  hasicí přístroj, lavice u okna) a vybrat čtyři. Výběr se potvrdí u dveří hospody („Tým:
  …, platí?“), do té doby jde kandidáty měnit. Potvrdit jde až po prvním příchodu do hangáru;
  předtím Ruda u dveří: „Nejdřív se podívám, co ta Archa vůbec potřebuje.“ (K2)
- **Stopy ve světě:** každý kandidát má zkoušku, ve které se ukáže síla i vada; Bára při
  `c1_bara_vyslechnuta` ≥ 2: „Ptej se, co umějí. Ne jestli jsou milí.“; prohlédnutí Archy
  v hangáru (řídicí systém nikdo neumí, bezpečnostní systém „podpis start povolí“).
- **Chybné, ale logické pokusy:** vzít Zdendu, protože je kamarád (Zdenda: „Neboj, já tam
  někoho znám.“); vzít Kryštofa jako bonus k Frameworkovi; vybrat pět (★ „Čtyři. Víc lidí
  jen víc porad.“), Báru (★ „Já nejsem kandidátka. Já tu jsem od devadesátého čtvrtého.“).
- **Nápověda:** 1 „Archa potřebuje lidi, kteří něco umějí. Kamarádi počkají na oslavu.“ ·
  2 „Kdo postaví rampu, kdo naprogramuje řízení a kdo podepíše, že smíme startovat?“ ·
  3 „Statička, programátor nebo designérka a certifikátor. Zdenda a Kryštof jsou milí, ale…“
- **Příznaky:** `c2_tym` (seznam), `c2_tym_pokryti` (0–3: stavba = Věra, zkoušení = Pepa nebo
  Klára, podpis startu = Norbert).
- **Co nese:** V10; skrytě: tým podle schopností, ne sympatií.
- **Riziko:** šest rozhovorů je drahých na texty. Každý kandidát má nejvýš 3 témata a 1 zkoušku.

### P2.3 Odhad bez kotvy
- **Cíl hráče:** zjistit, kolik dní zabere dostavba rampy, aby šlo kreslit plán.
- **Překážka:** u sázkové tabule řekne Pepa první „dva dny“ a ostatní se přidají („tři?“,
  „dva a půl!“). Každý další odhad se točí kolem prvního.
- **Řešení:** vzít **tácky** z výčepu, dát je týmu a jeden si nechat, ať každý napíše odhad
  potají, a otočit je najednou. Odhaduje ten, kdo bude rampu stavět; štamgasti jen kotví (K3).
  Odhady se rozejdou (12 Ruda, 14, 15, 15, 18) a Ruda vezme prostřední: **15 dní**. Kdo v týmu
  nic neumí, napíše nesmysl (Zdenda „zeptám se chlapa“, Kryštof „po poradě“); prostřední
  z čísel je pořád 15. Vznikne předmět **odhad na tácku**.
- **Stopy ve světě:** sázková tabule (všechny minulé sázky „dva dny“, všechny prohrané);
  Klára při zkoušce na lavici staví maketu z tácků a ptá se každého zvlášť; Bára (≥ 2):
  „Když se zeptáš všech najednou, odpoví ti první, kdo promluví.“; prohlédnutí tácků
  („Dá se na ně psát. A dají se otočit.“).
- **Chybné, ale logické pokusy:** zeptat se Pepy (★ „Dva dny.“), zeptat se nahlas všech (kotva
  znovu), zeptat se Zdendy (★ „Znám chlapa, co to ví.“). **Volba s následkem:** Ruda může
  „dva dny“ přijmout („Slyšeli jste. Dva dny.“) → `c2_odhad` = `kotva`, předmět je tácek
  s „2“. V M06 se pak rampa natáhne pozdě a chybí jí most (nejvýš 2 mosty, K5); v kap. 3 se to
  připomene v M13.
- **Nápověda:** 1 „Všichni tu odhadujou totéž. Zajímavé, že?“ · 2 „Když první řekne dva dny,
  ostatní už jen přikyvují. Co kdyby nikdo neslyšel ostatní?“ · 3 „Dej tácek každému z týmu, ať
  napíše odhad potají, a otoč je najednou.“
- **Příznaky:** `c2_odhad` = `realny` / `kotva`; předmět **odhad na tácku**.
- **Co nese:** V07; skrytě: odhad ovlivňuje první vyslovené číslo.
- **Riziko:** hráč přijme „dva dny“ omylem. Volba je proto výrazná a Ruda u ní zaváhá.

### P2.4 Rozdělení Archy (R2.2)
- **Cíl hráče:** rozhodnout, jak se bude která část Archy stavět, aby šlo kreslit plán.
- **Překážka:** Ruda na tabuli dal všech osm magnetů do svého sloupce („Rudův způsob: výkres
  a termín“; druhý sloupec je „Bářin způsob: zkusit a ukázat“, K16).
  Ing. Framework nabízí jednu krabici na všechno. Bez týmu tabuli nejde potvrdit: „Rozdělit
  práci bez lidí, co ji budou dělat? To je zase jen Gantt.“
- **Řešení:** zvolit „Rozdělit část po části“; magnety se sundají doprostřed. Do Bářina sloupce
  dát řídicí systém, aplikaci, nástup a interiér; rampu, trup, pohon **a bezpečnostní systém**
  Rudovi. Sundat nesmysly (Fontána, Bazén, Terasa), pokud na tabuli jsou. Potvrdit.
- **Pravidla tabule:**
  - Tabule nabídne tři cesty (K4): „Nechat, jak to je“ = `gantt` (potvrdit jde kdykoli, i hned);
    přijmout Frameworkovu krabici = `krabice` (krabice přikryje celou tabuli); „Rozdělit část
    po části“ = `povaha`, všech osm magnetů se sundá doprostřed a hráč umístí každý sám.
  - Při rozdělování jde potvrdit, až jsou všechny magnety ve sloupcích. Když je některá
    **běžná** část ve špatném sloupci, ozve se ten, komu patří, a magnet vrátí **doprostřed**
    (rampa, trup, pohon: Ruda nebo Věra; řídicí systém, aplikace, nástup: Bára nebo Pepa, při
    nízké důvěře Pembok). Výjimky projdou bez námitky, na nich je volba.
  - `c2_vyjimky` = bezpečnostní systém u Rudy (+1) a interiér u Báry (+1).
- **Stopy ve světě:**
  - slon: bezpečnostní systém byl v kamenné půlce, interiér v mlžné;
  - výkresy z roku 1994 na stěně hangáru: rampa, trup, pohon a bezpečnostní systém mají výkres,
    řídicí systém a kajuty „dopracují se podle potřeb obyvatel“ (navazuje na zadání z kap. 1);
  - Norbert (v hospodě i v týmu): „Bezpečnostní systém se mění jen s novým podpisem. Podpis
    trvá tři týdny.“;
  - Klára: „Kajuty? Nikdo neví, jak chce spát, dokud si nelehne.“;
  - Bára při `c1_bara_vyslechnuta` ≥ 2 u tabule: „Neptej se, z čeho to je. Ptej se, jestli víme,
    co lidi chtějí, a kolik stojí to předělat.“;
  - při `c1_charter_kvalita` = 3 visí nad tabulí cíl z papíru o Arše „Odvézt všechny obyvatele“
    (K13): „Všechny. Ne jen ty, co umějí číst výkresy.“
- **Chybné, ale logické pokusy:** „železo k Rudovi, software k Báře“ dá bezpečnostní systém
  Báře a interiér Rudovi: projde, ale `c2_vyjimky` = 0 a M06 to hned ukáže; dát Frameworkovi
  krabici na jednu část (★ „Krabice je jen celá. Na všechno.“); kávové pero na tabuli
  (★ „Kávou na tabuli? To by tam bylo napořád. A tohle se ještě bude měnit.“).
- **Nápověda:** 1 „Osm částí, jeden sloupec. Opravdu se všechno staví stejně?“ · 2 „Na co máme
  výkres a co se nesmí měnit? A na co se musíme nejdřív zeptat lidí?“ · 3 „Řídicí systém,
  aplikaci, nástup a kajuty dej Báře. Bezpečnostní systém má výkres a podpis, ten zůstane
  Rudovi.“ (3. stupeň řekne obě výjimky, protože jsou jádrem kapitoly)
- **Příznaky:** `c2_rozdeleni` = `povaha` / `gantt` / `krabice`, `c2_vyjimky` (0–2).
- **Co nese:** V11; skrytě: kritérium je povaha práce, ne obor (D24).
- **Riziko:** hráč nepochopí, že potvrzení hned je volba. Ruda proto při potvrzení bez změn
  řekne nahlas „Gantt na všechno. Jako vždycky.“ a Bára odejde od tabule.

### P2.5 Krabice od bot (M07, R2.3)
- **Cíl hráče:** zapsat si, co se může pokazit, a na jednu věc se připravit předem.
- **Překážka:** krabice je prázdná a obálka „Na nepředvídané“ stačí jen na jednu věc.
- **Řešení:** vzít krabici z kokpitu Archy, s ní prohlédnout podezřelé věci (aspoň tři z pěti),
  pak u stolu v hangáru otevřít krabici, položit obálku na jeden lístek (krysy, lano, nebo
  úsměv); lístky z mlžné povahy dostanou razítko *Zkusíme*.
- **Stopy ve světě:** nápis na víku „Co se může pokazit“; Bára krabici pozná („Tu krabici jsem
  zakládala já. Nikdo mi do ní nedovolil nic napsat.“, K14); podezřelé věci jsou výrazná aktivní
  místa i bez krabice (Ruda je prohlédne s „hm“), s krabicí řekne „To si zapíšu.“; inzerát
  v hospodě „Daruji kočku. Na všechno připravená. Krmení na rok si platí nový majitel.“;
  cedule u jeřábu „Lano měněno: 1994“.
- **Chybné, ale logické pokusy:** zapsat kometu (★ „To není riziko. To je termín.“), zapsat
  slona po M04 (★ „Už snědený.“), obálku na Pepu nebo nástup (odmítne se, viz minihra),
  obálku utratit u Pana Změny (★ „Prodávám jen to, co dnes nemám.“), krabici nebo obálku
  na babiččina kocoura kvůli krysám (★ „Tenhle krysy nehoní. Ten soudí lidi.“, K11).
- **Nápověda:** 1 „Krabice na věci, které se můžou pokazit. Třicet let prázdná.“ · 2 „Choď
  s ní po městě a dívej se, co vypadá podezřele: kabely, lano, úsměvy.“ · 3 „Máš dost lístků.
  Otevři krabici u stolu v hangáru a rozhodni, na co dáš obálku.“
- **Příznaky:** `c2_riziko_predem` = `krysy` / `lano` / `usmev`, `c2_rizika_zapsana` (seznam).
- **Co nese:** V09; skrytě: předcházet stojí peníze, levný pokus ne.
- **Riziko:** pixel-hunting. Pět věcí v pěti scénách, každá s velkým aktivním místem.

### P2.6 Formulář na formulář (jen při kávovém razítku)
- **Cíl hráče:** aby Předseda plán cesty vůbec přijal.
- **Překážka:** kvůli hnědému razítku z kapitoly 1 chce Předseda „Žádost o uznání hnědé barvy“
  s podpisy tří členů týmu.
- **Řešení:** formulář dostane Ruda od Předsedy v hangáru; po R2.1 použít formulář na tři členy
  týmu (každý se podepíše po svém: Věra chce razítko, Norbert cituje normu, Pepa „za dva dny“
  a hned podepíše). Podepsaný formulář se odevzdá s plánem.
- **Stopy ve světě:** text formuláře („podpisy tří zaměstnanců projektu“); Předseda to řekne
  při předání.
- **Chybné, ale logické pokusy:** podepsat sám (★ „Jsem jeden. Na formuláři jsou tři řádky.“),
  dát podepsat Báře (★ „Podepíšu, až ho přeměřím.“ a podepíše jako první z tří), Frameworkovi
  (★ „Podepisuju jen za úplatu ve formě krabice.“).
- **Nápověda:** 1 „Formulář od Předsedy pořád čeká.“ · 2 „Tři podpisy. Máš tým.“ · 3 „Dej
  formulář podepsat třem lidem z týmu.“
- **Příznaky:** stav `formular_podepsan`.
- **Co nese:** následek `c1_razitko` z kapitoly 1, gag na byrokracii.
- **Riziko:** zdržuje. Je krátký a jde ho vyřídit kdykoli po náboru.

### P2.7 Mapa do neznáma (M06)
- **Cíl hráče:** nakreslit plán od dneška ke startu, který ukážou Komisi.
- **Překážka:** Mlžná pláň: cesta je vidět kousek, řeka skoro vůbec.
- **Řešení:** na Mlžné pláni použít tabuli s rozdělením (přenese se sama) a odhad na tácku →
  M06: cestu naplánovat dopředu, řeku jen nahrubo, rozmístit tři mosty.
- **Vstupy:** R2.2 (části na mapě), M07 hotová („Nejdřív víme, co se může pokazit, pak kudy
  půjdeme.“), odhad z P2.3. Bez nich Pembok u zadních vrat řekne, co ještě chybí.
- **Stopy ve světě:** Mlžná pláň je vidět ze zadních vrat hangáru; Bára (≥ 2) radí; mosty jsou
  na mapě předkreslené tečkovaně.
- **Chybné, ale logické pokusy:** kreslit řeku podrobně do mlhy (rozplyne se), mosty bez řeky
  (nedrží), rampa podle „dvou dnů“ (natáhne se pozdě a přijde o most, K5).
- **Nápověda:** 1 „Mlha je pro obě stejná. Jen cesta je v ní vidět dál.“ · 2 „Cestu plánuj
  dopředu, řeku jen kousek. Hlavně ať se potkají u mostů.“ · 3 v minihře: ukáže sloupec, kam
  patří nejbližší most.
- **Příznaky:** `c2_mosty` (seznam funkčních mostů, 0–3); předmět **plán cesty ke startu**.
- **Co nese:** V08, V11.
- **Riziko:** složitá pravidla. Bára je první kolo vysvětlí na příkladu, než hráč začne.

### P2.8 Schválení plánu cesty
- **Cíl hráče:** razítko Komise na plán, aby se mohlo začít stavět.
- **Překážka:** Předseda plán „vítá“. S `c1_faze2` chce za start připsat „fázi 2“. S kávovým
  razítkem chce podepsaný formulář (P2.6).
- **Řešení:** odevzdat plán (a formulář). S `c1_faze2`: použít **list z kalendáře** („Den dopadu“)
  z hangáru na Předsedu: fáze 2 by začala den po dopadu komety. Předseda: „To by byla krátká
  fáze.“ Napíše „fáze 2: pozastavena“ a orazítkuje.
- **Stopy ve světě:** kalendář v hangáru (poslední list je „Den dopadu“ a dá se utrhnout);
  Předseda: „Po startu přece něco následuje.“ Ruda: „Ano. Kometa.“ (vyhrkne, ale Předseda chce
  důkaz na papíře); Pembok.
- **Chybné, ale logické pokusy:** odmítnout ústně (Předseda: „Máte to podepsané. Já mám papír,
  vy máte názor.“), plán cesty na Předsedu znovu (★), kávu na plán (★ „Hnědá už jednou stačila.“).
- **Nápověda:** 1 „Předseda věří jen papírům.“ · 2 „Kdy by ta fáze 2 začala? Kalendář v hangáru
  to ví.“ · 3 „Utrhni v hangáru poslední list kalendáře a ukaž mu ho.“
- **Příznaky:** stav `plan_orazitkovan`; `c1_faze2` zůstává (páka v kap. 3).
- **Co nese:** V08 (plán má cíl a konec), V03 rozsah.
- **Riziko:** bez `c1_faze2` a bez formuláře je to jeden krok; to je v pořádku, je to odměna
  za kapitolu 1.
