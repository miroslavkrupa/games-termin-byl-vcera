# Příběhová bible

> Svět, postavy, dějový oblouk, osnova kapitol, rozhodnutí a konce. Zdroj pravdy pro scenáristy,
> výtvarníky i návrh puzzlů.
> Stav: **koncept**, verze 0.2 (zapracována koncepce [Dva světy, jedna Archa](07-dva-svety.md))

## Tón a humor

- **Sarkasmus a antihrdina** po vzoru *Deponie*: Ruda je nesnesitelný, ale máme ho rádi, protože
  ho svět trestá víc než my.
- **Humor z antivzorců ve dvou vrstvách:** každý gag stojí na něčem, co se v projektech opravdu
  děje, ale musí fungovat i pro hráče, který na projektu nikdy nepracoval. Kdo projekty zažil,
  má se smát dvakrát. Žádný vtip nesmí stát jen na znalosti odborného pojmu.
- **Oba jazyky zároveň:** dialogy se píšou anglicky i česky souběžně a vtipy se pro každý jazyk
  píšou zvlášť (transkreace). Jména postav s vtipem mají verzi pro každý jazyk (viz níže).
- **Nikdy nekázat.** Svět se nesměje metodikám, ale lidem, kteří je používají bez rozumu.
  Terčem jsou zvrhlé podoby obou světů: Předseda Věčný (proces pro proces) a Ing. Framework
  (rituály bez smyslu), ne plán ani iterace samy o sobě.
- Absurdní svět, ale vnitřně konzistentní: jeho pravidla platí pro puzzly i pro vtipy.

## Svět: Nedostavěnice

Město, ve kterém nebylo nikdy nic dokončeno. Mosty končí v půlce řeky, radnice má lešení
40 let a obyvatelé žijí v trvalé „druhé etapě“. Nedokončenost je tu tradice, kterou chrání
Komise pro schvalování komisí: dokud nic není hotové, rozpočty tečou.

**Hrozba:** kometa **Deadline** dopadne za 30 dní. Jediná záchrana je **Archa**, která leží
na rampě za městem od dob, kdy si na ni naposledy někdo vzpomněl.

**Jak Archa vypadá** (D29): stará rezavá loď, ke které někdo přidělal raketové motory, křídla
a anténu. Město je současné zanedbané středoevropské maloměsto se starými domy a nedostavěnými
paneláky (D28).

**Archa má dvě povahy** ([koncepce](07-dva-svety.md)): rampa, trup, pohon a startovací
bezpečnostní systém potřebují plán; řídicí systém, evakuační aplikace, nástup obyvatel
a interiér potřebují zkoušení s lidmi. Kde se části potkávají, musí se sladit.

### Lokace (pracovní)

| Lokace | Kapitola | Popis | PM vtip |
|---|---|---|---|
| Rudův byt v rozestavěném paneláku | 0 | chybí stěna, výtah vede jen do 3½. patra | věčná „fáze 2“ |
| Radnice / Komise | 1 | kanceláře, kde se schvaluje schvalování | byrokracie, řízení bez rozhodnutí |
| Archiv zkrachovalých projektů | 1, 5 | nekonečné regály projektů, které nikdy neskončily | lessons learned, které nikdo nečte |
| Pozemek pod rampou a babiččina chaloupka | 1, 4 | jediná dokončená stavba ve městě | přehlížený stakeholder |
| Staveniště rampy s jediným jeřábem | 2–4 | beton zraje, jeřáb je jen jeden, všichni ho chtějí | harmonogram, kritická cesta |
| Dílna a hangár Archy | 2–4 | hromady rozdělaných věcí; Bářin kout s prototypy a maketami kajut | WIP, technický dluh, prototypy |
| Hospoda U Odhadu | 2 | tady se odhaduje, sází a podvádí | planning poker, optimismus |
| Mlžná pláň | 2 | krajina, kterou nikdo nezmapoval | roadmapa, nejistota |
| Řídicí věž | 4 | dashboardy svítí zeleně, zatímco vše hoří | melounový reporting |
| Startovní rampa | 5 | finále | uzavření a předání |

## Postavy

### Ruda Gantt (hlavní hrdina)

- **Kdo to je:** samozvaný „nejlepší projekťák na světě“. Za sebou má 14 zkrachovalých projektů,
  podle něj vždy vinou ostatních.
- **Co chce:** slávu, pomník a aby mu všichni řekli, že měl pravdu.
- **Co potřebuje:** pochopit, že úspěch projektu je úspěch týmu.
- **Vady = antivzorce:** slibuje všechno všem, mikromanažuje, hraje si na hrdinu, ignoruje rizika,
  reportuje zeleně, plánuje do mlhy.
- **Oblouk:** z chaotického „hrdiny“ servant leader. Každá kapitola mu jednu vadu (nemusí) zlomit,
  podle toho, jak hráč volí.
- **Hlas:** sebevědomý, rychle mluví, plný manažerských frází, které používá špatně.
- **Svět plánu:** chce Ganttův diagram na všechno, i na software. Síla: struktura, termíny,
  přehled o závislostech. Vada: plánuje i to, co se naplánovat nedá, a slibuje přesné termíny
  tam, kde nikdo neví, co se staví. Na rampě (M13 Jeřábový balet) jeho způsob opravdu funguje.

### Bára Backlogová (parťačka, Product Ownerka)

- Tichá inženýrka, která jediná ví, k čemu má Archa sloužit a co je hodnota. Nikdo se jí neptá.
- Ruda ji zpočátku přehlíží. To, jak se k ní chová, je nejdůležitější skrytá proměnná hry.
- Je hlasem rozumu a partnerkou ve dvojici (obdoba Goal v *Deponii*).
- **Svět iterací:** zkouší, měří, ukazuje obyvatelům prototypy a ví, co má hodnotu.
  **Vada:** nerada se zavazuje k termínu a nejraději by zkoušela donekonečna („plány stejně
  nevyjdou“). Proti pevnému termínu komety to nefunguje a Ruda je v tom pro ni nutný.
- **Romantická linka:** ano. Roste s Rudovým vývojem a Bářinou důvěrou. Bára se nezamiluje
  do sebevědomého „hrdiny“, ale do člověka, který se naučí poslouchat. Linka může skončit
  i nenaplněná, podle hráčových voleb. Je to zároveň **metafora hybridu**: dva světy, které se
  nejdřív nesnášejí, se naučí spolupracovat a každý přinese svou sílu. Ruda se naučí poslouchat,
  Bára se naučí slíbit termín.
- **Žluté ponožky:** Bára i Ruda nosí žluté ponožky (D31). Nikdo to nekomentuje, dokud si toho
  v kap. 5 někdo nevšimne.
- **Hratelné úseky:** v některých kapitolách se hraje za Báru. Řeší puzzly jinak než Ruda:
  ptá se, měří, ověřuje a nespoléhá na blafování. V kapitole 3 se hra střídá: Ruda na rampě,
  Bára u řídicího systému a interiéru. Hráč tak oba světy zažije zevnitř.

### Předseda Věčný (antagonista)

- Předseda Komise pro schvalování komisí. Jeho moc stojí na tom, že nic není hotové.
- **Zvrhlý plán:** proces pro proces, nekonečné „následné fáze“, schvalování bez rozhodnutí.
- Nechce, aby Archa vzlétla, ale nikdy to neřekne nahlas. Sabotuje procesem: formuláři,
  schůzemi, změnovými požadavky a „ještě jednou analýzou“.
- Vrchol: odhalení, že kometu Deadline zná léta a projekt držel ve „fázi 2“ úmyslně.
- **Zvrat ve 4. kapitole** (D44): v kapitole 1 jen náznaky, vypadá jako dobrácký byrokrat.

### Ing. Framework (vedlejší záporák)

- Konzultant s kufrem plným krabic s metodikami. Každá řeší všechno.
- **Zvrhlé iterace:** rituály bez smyslu, „agilní krabice“ na všechno, i na beton. Na rampě
  zavádí dvoutýdenní sprinty betonování a nechápe, proč beton nezraje rychleji.
- Není zlý, jen prodává. Komický i varovný. Ve 2. kapitole svádí hráče k řešení „jedna
  metodika na všechno“ (R2.2), ve 4. kapitole se spojí s Předsedou, protože oba žijí z toho,
  že se nic nedokončí.

### Vedlejší postavy

| Postava | Archetyp | Funkce ve hře |
|---|---|---|
| **Pan Změna** | stakeholder, který mění zadání | v každé scéně chce něco jinak; živí Scope Creepa |
| **Pepa „Dva dny“** | vývojář | na všechno odhaduje dva dny; postava pro odhady |
| **Babička Pozemková** | tichý, ale mocný stakeholder | vlastní pozemek pod rampou; přehlédnutí se vymstí |
| **Sponzor, starosta Bohumil** | sponzor | chce výsledek, nerozumí mu, mění priority podle novin |
| **Prof. Pembok** | mluvící kniha, rádce | ironická nápověda a správce Deníku projektového manažera |
| **Scope Creep** | tvor | roste s každou přijatou neřízenou změnou; maskot hry |
| **Kočka Riziková** | mazlíček | získá ji jen ten, kdo zapsal riziko krys; ve 3. kapitole zachraňuje situaci |
| **Tým podivínů** | členové týmu | 6–8 kandidátů s vlastnostmi a vadami; hráč vybírá 4 |

## Hlavní dějový oblouk

| Dějství | Kapitoly | Co se děje | Rudův vnitřní stav |
|---|---|---|---|
| **I. Nástup** | 1 (s úvodem) | Ruda dostane funkci omylem, hledá skutečný cíl a sponzora | „Tohle zvládnu sám za týden.“ |
| **II. Stavba** | 2, 3 | plán, tým, sprinty, změny; Předseda škodí procesem | „Proč mě nikdo neposlouchá?“ |
| **III. Krize a dodávka** | 4, 5 | následky dohánějí, tým se rozpadá, odhalení Předsedy, start | „Možná to není o mně.“ |

Pod osobním obloukem běží **metodický oblouk** ([koncepce](07-dva-svety.md)): společný základ
(kap. 1) → rozdělení Archy (kap. 2) → dva světy paralelně (kap. 3) → krize na rozhraní (kap. 4)
→ integrace a start (kap. 5).

## Osnova kapitol

### Úvod kapitoly 1: Kdo jsem a proč tu jsem
- **Rozsah:** 3–5 minut, součást kapitoly 1, ne samostatný prolog (D57); nejvýš jedno nové pozadí.
- **Cíl:** naučit ovládání (inventář, kombinace, dialogy), představit svět a Rudu.
- **Děj:** Ruda je vyhozen z dalšího projektu. Při úprku před věřiteli omylem podepíše
  jmenování manažerem Velkého projektu (myslel si, že jde o stížnost).
- **Klíčové puzzly:** jeden jednoduchý puzzle na naučení ovládání; poznat, co je projekt a co ne (V01).
- **Konec:** Ruda se dozví o kometě. Odpočet 30 dní začíná.

### Kapitola 1: Iniciace
- **Podrobný návrh:** [kapitoly/01-iniciace.md](kapitoly/01-iniciace.md)
- **Cíl:** zjistit, proč Archa existuje, kdo o ní rozhoduje, a sepsat charter.
- **Puzzly:** dostat se ke sponzorovi přes Komisi; v archivu najít původní zadání (V02, V22).
- **Minihry:** *Charter z trosek*, *Kdo tu vlastně velí*, první *Souboj argumenty*.
- **Hlavní rozhodnutí:**
  - **R1.1** Komu slíbit co: realistický charter, nebo slíbit sponzorovi všechno (rozsah, termín
    i rozpočet pevně)?
  - **R1.2** Navštívit babičku Pozemkovou? (Jen když ji hráč odhalí v mapě stakeholderů.)
  - **R1.3** Jak se zachovat k Báře na první poradě: vyslechnout, nebo přeslechnout?
- **Bottleneck:** charter je podepsán (v jakékoli kvalitě).

### Kapitola 2: Plánování – rozdělení Archy
- **Cíl:** rozložit práci, sestavit tým, zmapovat rizika a hlavně **rozdělit Archu podle povahy
  práce**.
- **Střet:** Ruda chce Gantt na všechno, Ing. Framework sprinty na všechno, Bára by nejraději
  nic neplánovala. Hráč rozhoduje část po části.
- **Puzzly:** sestavení týmu (V10); **rozdělení Archy** (V11): každou část přiřadit ke světu plánu,
  nebo iterací. Výjimky (bezpečnostní systém, interiér) prověří, jestli hráč pochopil kritérium.
- **Minihry:** *Jak sníst slona* (kamenná a mlžná půlka), *Mapa do neznáma* (cesta a řeka),
  *Krabice od bot*. Odhady v hospodě U Odhadu jako dialog (bývalý *Poker s goblinem*, D58).
- **Hlavní rozhodnutí:**
  - **R2.1** Výběr 4 členů týmu z 6–8 kandidátů.
  - **R2.2** Rozdělení Archy: podle povahy práce, nebo jedna metodika na všechno (Rudův Gantt,
    nebo krabice Ing. Frameworka)?
  - **R2.3** Které zjištěné riziko řešit předem (rozpočet nestačí na všechna).
- **Bottleneck:** roadmapa s mosty schválena, start stavby.

### Kapitola 3: Realizace – dva světy paralelně
- **Cíl:** stavět rampu podle plánu a řídicí systém s interiérem po krátkých cyklech, ustát změny
  a Předsedovu sabotáž procesem.
- **Struktura:** hra střídá **Rudu na rampě** a **Báru u řídicího systému a interiéru**.
- **Puzzly:** zahlcená dílna (WIP, V16); krysy ve skladu (vrací se riziko z kap. 2).
- **Minihry:** *Jeřábový balet* (stavba rampy), *Ukázka na náměstí*, *Scope Creep* (změny do obou
  světů), *Integrační okno*. Ranní porada a plánování sprintu jako scéna s rozhodnutím (bývalý
  *Tetris kapacity*, D58). Retrospektiva (R3.3) jako krátká scéna.
- **Hlavní rozhodnutí:**
  - **R3.1** Pan Změna chce bazén v trupu a objednávku svačin v aplikaci. Kam který požadavek
    poslat a jak s ním naložit?
  - **R3.2** Pustit Báru k prioritám softwaru, nebo dál rozhodovat sám?
  - **R3.3** Udělat retrospektivu, nebo „nemáme čas, stavíme“?
- **Bottleneck:** trup je zavřený a Archa smontovaná, ale nefunguje.

### Kapitola 4: Krize
- **Cíl:** přežít následky dřívějších rozhodnutí a odhalit Předsedu.
- **Spouštěč:** kometa zrychlí, zbývá 7 dní. Řídicí věž hlásí, že je vše zelené.
- **Krize na rozhraní:** co se v kap. 2–3 nesladilo, se srazí (software nejde do trupu, trup
  neunese zařízení, nástupní aplikace neví o změně rampy). Večerní a krizové scény v paletě C.
- **Rozkol:** Ruda a Bára se pohádají: on chce všechno zamknout, ona všechno přepracovat.
  Vztahová krize je zároveň metodická.
- **Záporáci se spojí:** Předseda a Ing. Framework žijí z toho, že se nic nedokončí.
- **Puzzly a události** podle předchozích voleb (viz tabulka následků níže).
- **Minihry:** *Plachetnice* (retrospektiva po rozkolu), rozhodující *Souboj argumenty* se
  sponzorem. Zelený report v řídicí věži jako puzzle (bývalý *Dashboard lží*, D58).
- **Hlavní rozhodnutí:**
  - **R4.1** Eskalovat poctivě (s variantami), nebo dál reportovat zeleně?
  - **R4.2** Co obětovat z rozsahu, aby se stihl start?
  - **R4.3** Jak usmířit Báru: přiznat, že plán nestačí, nebo trvat na svém?
- **Bottleneck:** Předseda je odhalen, Archa je připravena ke startu.

### Kapitola 5: Uzavření
- **Cíl:** integrace, start, předání a poučení.
- **Puzzly:** finální spojení obou světů (V25), kde Ruda a Bára musí spolupracovat a hráč
  střídá obě postavy v jednom puzzle; předání Archy provozovatelům (V21); zapsat poučení
  do archivu (V22).
- **Konec:** podle stavových proměnných (viz Konce).

## Stavové proměnné

| Proměnná | Rozsah | Viditelná? | Co ji ovlivňuje |
|---|---|---|---|
| Rozsah / čas / rozpočet | 0–100 každá | ano, ve stavu projektu | sliby, změny, rizika |
| Důvěra stakeholderů | 0–100 | ne (náznaky v dialozích) | charter, komunikace, poctivost reportů |
| Morálka týmu | 0–100 | ne (nálada postav) | mikromanagement, retrospektivy, přetížení |
| Technický dluh | 0–100 | ne (dílna chátrá) | zkratky, přeplněné sprinty |
| Bářina důvěra | 0–100 | ne | jak s ní Ruda jedná |
| Rudův vývoj | 0–5 zlomených vad | ne | klíčové volby v každé kapitole |
| Sladění světů | 0–100 | ne (náznaky na mapě a v dílně) | rozdělení Archy (R2.2), mosty na roadmapě (M06), směrování změn (M10), integrační okno (M15) |

## Rozhodnutí a jejich pozdější následky

| Volba | Kde se vrátí | Následek |
|---|---|---|
| R1.1 slíbit všechno | kap. 4 | sponzor trvá na všem, krize je tvrdší, chybí prostor pro vyjednávání |
| R1.2 babička přehlédnuta | kap. 4 | babička zablokuje rampu, je nutný dlouhý vedlejší questline |
| R1.3 Bára přeslechnuta | kap. 3 | Bára mlčí o vadě v řídicím softwaru, ta se projeví v kap. 4 |
| R2.1 tým z kamarádů | kap. 3 | chybí klíčová schopnost, puzzle je nutné řešit oklikou |
| R2.2 jedna metodika na všechno | kap. 3–4 | Gantt na všechno: software se naplánuje dopředu a obyvatelé ho při ukázce odmítnou. Krabice Ing. Frameworka: rampa se staví po sprintech a betonáž se rozpadne |
| R2.2 výjimky zařazené špatně | kap. 4 | bezpečnostní systém bez certifikace nesmí startovat; interiér navržený od stolu nikdo nechce |
| M15 nesladěné integrační body | kap. 4 | krize na rozhraní: software nejde do zavřeného trupu, nutné drahé otevírání |
| R2.3 riziko krys zapsáno | kap. 3 | kočka Riziková vyřeší sklad za minutu, jinak dlouhé puzzle |
| R3.1 bazén přijat bez řízení | kap. 3–4 | Scope Creep vyroste a sežere kus kapacity |
| R3.3 retrospektiva vynechána | kap. 4 | opakují se stejné chyby, morálka padá, člen týmu odchází s klíčovým předmětem |
| R4.1 zelený report | kap. 5 | start proběhne na falešných datech, horší konec |

## Konce

Konce kombinují **metodickou osu** (sladění světů) s **osobní osou** (Rudův vývoj, Bářina důvěra).

| Konec | Podmínka (pracovní) | Popis |
|---|---|---|
| **Pomník** (jen plán) | převažuje svět plánu, sladění nízké | rampa je dokonalá, ale nikdo neví, jak nastoupit, a řídicí systém nefunguje. Archa odletí bez lidí. Rudovi postaví pomník – nedokončený |
| **Druhá etapa** (jen iterace) | převažuje svět iterací, sladění nízké | skvělá aplikace a útulné kajuty, ale rampa zůstala ve „fázi 2“. Kometa mine o metr, Komise vyhlásí „fázi 3“ a Předseda vyhrál |
| **Hrdina** | sladění vysoké, Rudův vývoj 2–3 | Archa letí, Ruda si připíše všechny zásluhy |
| **Tým** (pravý konec) | sladění vysoké, vývoj 4–5, Bářina důvěra vysoká | Archa letí, Ruda na pódiu poprvé řekne „my“ a Bára poprvé řekne termín. Tým jde rovnou na další projekt |
| **Tajný** | ❓ | např. Ruda rozpustí Komisi a Nedostavěnice poprvé něco dokončí |

## Opakující se vtipy

- Pepa na všechno odhaduje „dva dny“, i na Archu.
- Ing. Framework vytahuje z kufru stále absurdnější krabice metodik („Agilní beton“, „Scrum pro kočky“).
- Ruda kreslí Ganttův diagram na všechno, i na snídani.
- Scope Creep se objevuje v pozadí scén a pokaždé je o kus větší.
- Radniční výtah vede vždy jen do půlky patra.
- Rudův slovník manažerských frází, kterým nikdo nerozumí, včetně něj.

## Jména v obou jazycích

Jména postav, míst i název hry mají vlastní verzi v každém jazyce. Anglická jména schválena
v F0/R6 (D47): vtip má fungovat i anglicky, nejen být doslova přeložený.

| Čeština | Angličtina | Poznámka |
|---|---|---|
| Termín byl včera | Deadline Was Yesterday | název hry |
| Nedostavěnice | Scope Creek | město; narážka na *scope creep* (rozpínání rozsahu projektu) |
| Ruda Gantt | Rudy Gantt | Ganttův diagram funguje v obou jazycích |
| Bára Backlogová | Barb Backlog | kratší, aliterace, bez „á“ |
| Předseda Věčný | Chairman Evermore | zní jako jméno, „věčnost“ zůstává |
| Pan Změna | Mr. Change | *change* jsou i drobné, k jeho stánku sedí |
| Ing. Framework | Dr. Framework | titul Ing. angličtina nezná, doktor zní jako expert |
| Pepa „Dva dny“ | Two-Weeks Joe | anglický věčný odhad je „za dva týdny“ |
| Babička Pozemková | Granny Plotkins | *plot* je pozemek i úklad |
| Prof. Pembok | Prof. Pembok | narážka na PMBOK |
| Kočka Riziková | Risky the Cat | |
| Hospoda U Odhadu | The Rough Estimate | hospoda |

## Otevřené otázky

- [x] Jména v angličtině (tabulka výše, D47)
- [x] Jak moc otevřeně je Předseda záporák od začátku? → zvrat ve 4. kapitole, v kapitole 1 jen náznaky (D44)
- [ ] Přesné prahy stavových proměnných pro konce (vyladit při playtestech)
- [ ] Hraní za Báru: jisté jsou kap. 1 (archiv), kap. 3 (řídicí systém a interiér) a kap. 5 (finální spojení). Další místa?
- [ ] Jak se romantická linka promítne do konců?
