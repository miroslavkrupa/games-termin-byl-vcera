# Výuková matice

> Každé výukové téma musí mít ve hře **mechaniku**, která ho nese, a **důkaz pochopení**, podle
> kterého hra (nebo učitel) pozná, že hráč téma zvládl. Téma bez mechaniky do hry nepatří.
> Stav: **koncept**, verze 0.3 (koncepce [Dva světy, jedna Archa](07-dva-svety.md); sloupec Kap. a nosiče podle karet puzzlů, V26, N5 D81)

## Zdrojové rámce

- **PMBOK Guide**, 7. vydání: 12 principů a 8 výkonnostních domén (stakeholdeři, tým, přístup
  k vývoji a životní cyklus, plánování, projektová práce, dodávka, měření, nejistota).
  ❓ Ověřit soulad s 8. vydáním.
- **Scrum Guide 2020**: role, události, artefakty.
- **PRINCE2**: business case, řízení po etapách, řízení výjimkou, poučení z minulosti.
- **Kanban**: vizualizace toku, limity rozpracované práce (WIP).
- **Hybridní řízení** podle Krupa, Šimůnek a Hájek (2023): kombinace prvků tradičního a agilního
  řízení s cílem získat výhody a potlačit nevýhody obou; není to přizpůsobení jednoho přístupu ani
  dočasný přechod. Je to páteř celé hry ([koncepce](07-dva-svety.md)).

## Legenda

- **Nosič**: P = puzzle, M = minihra, R = rozhodnutí s následkem, D = dialog nebo postava
- **Důkaz pochopení**: chování ve hře, které ukazuje, že hráč téma zvládl, ne že ho umí odříkat
- **Deník**: pojem, který se hráči po zážitku odemkne v *Deníku projektového manažera*

## Matice

| ID | Téma | Rámec / doména | Kap. | Nosič | Jak to ve hře vypadá | Výukový cíl (hráč umí…) | Důkaz pochopení | Deník |
|---|---|---|---|---|---|---|---|---|
| V01 | Projekt vs. provoz | PMBOK: dodávka | 1 (úvod) | D, P | Ruda na zdi slávy zjistí, že „týdenní výměna žárovek“ nebyl projekt, ale provoz | odlišit dočasné úsilí s cílem od opakované práce | správně vybere, co je Velký projekt | Projekt |
| V02 | Business case, proč | PRINCE2, PMBOK: hodnota | 1 | P, R | Hledá se skutečný důvod Archy (nikdo ho neví) | ptát se po hodnotě dřív než po řešení | najde skutečný cíl dřív, než začne stavět | Business case |
| V03 | Project charter | PMBOK: plánování | 1 | M, R | *Charter z trosek* | pojmenovat cíl, rozsah, kritéria úspěchu, sponzora | charter bez nesmyslů a s měřitelným cílem | Charter |
| V04 | Identifikace stakeholderů | PMBOK: stakeholdeři | 1, 4 | M, R | *Kdo tu vlastně velí*, babička s pozemkem | najít i tiché a nepřímé stakeholdery | odhalí babičku v kap. 1 | Stakeholder |
| V05 | Komunikace se stakeholdery | PMBOK: stakeholdeři | 1, 4 | M | *Souboj argumenty* | volit argument podle zájmu a vlivu druhé strany | vyhraje souboj bez lží a slibů | Komunikační plán |
| V06 | Dekompozice práce | PMBOK: plánování | 2 | M | *Jak sníst slona* | rozložit cíl na pracovní balíky | WBS bez mezer a překryvů | WBS |
| V07 | Odhadování | Scrum, PMBOK: plánování | 2 | D, P | hospoda U Odhadu: Pepa „Dva dny“ a spol. kotví odhady a předhánějí se v optimismu (bývalá M05) | odhadovat relativně a rozpoznat kotvení a optimismus | odolá kotvě | Nezávislé odhady (planning poker) |
| V08 | Hybridní roadmapa a plánování po vlnách | PMBOK: plánování, nejistota | 2 | M | *Mapa do neznáma*: cesta (rampa) a řeka (software) se potkávají u mostů | plánovat blízké detailně a vzdálené nahrubo; pevnou část dál dopředu než nejistou; naplánovat body spojení | nekreslí detail řeky do mlhy, rozmístí mosty | Roadmapa |
| V09 | Řízení rizik | PMBOK: nejistota | 2→3,4 | M, R | *Krabice od bot*, krysy a kočka | identifikovat riziko a připravit reakci | zapsaná rizika se později vyplatí | Registr rizik |
| V10 | Sestavení týmu | PMBOK: tým | 2 | R, D | výběr podivínů do týmu | skládat tým podle schopností, ne sympatií | tým pokrývá potřebné role | Tým |
| V11 | Volba přístupu podle povahy práce | PMBOK: přístup k vývoji, hybridní řízení | 2, 5 | R, P | **rozdělení Archy**: každou část přiřadit ke světu plánu, nebo iterací, včetně dvou výjimek | rozhodovat podle jasnosti požadavků, ceny změny a vratnosti kroků, ne podle oboru | správně zařadí i bezpečnostní systém (plán) a interiér (iterace) | Hybridní řízení |
| V12 | Sprint planning | Scrum | 3 | D, R | scéna plánování sprintu za Báru po ranní poradě; přeplnění zvýší technický dluh (bývalá M08) | plánovat do kapacity se sprint goal | nepřeplní sprint | Sprint |
| V13 | Daily scrum | Scrum | 3 | D | scéna ranní porady před plánováním sprintu (bývalá minihra M09) | facilitovat, hlídat čas, řešit překážky | utne odbočky a vybere překážku | Daily |
| V14 | Product Owner a hodnota | Scrum | 1, 3–5 | D, R | tichá Bára ví, co je hodnota | dát prioritu podle hodnoty | začne se Báry ptát | Product Owner |
| V15 | Řízení změn ve dvou světech | PMBOK: projektová práce, Scrum | 1, 3–5 | M, R | *Scope Creep* (ve hře Ještětoto, D71): bazén v trupu vs. svačiny v aplikaci | drahou změnu posoudit a vyjednat, levnou zařadit do seznamu práce podle hodnoty | každý požadavek pošle správnou cestou | Změnové řízení, backlog |
| V16 | Vizualizace toku a WIP | Kanban | 3 | P | dílna zahlcená rozdělanými věcmi | omezit rozpracovanou práci | dokončuje dřív, než začne nové | WIP limit |
| V17 | Měření a reporting | PMBOK: měření | 4–5 | P, R | puzzle v řídicí věži: zelené ukazatele porovnat s tím, co je vidět ve scéně; podklad pro R4.1 (bývalá M12) | rozpoznat zavádějící ukazatele; plnění plánu měřit u rampy, dodanou hodnotu u softwaru | pošle poctivou zprávu: ověří aspoň 4 ze 6 ukazatelů (`c4_listky`) a R4.1 = poctivě; v kap. 5 zadá do pojistek skutečný stav | Earned value, dodaná hodnota |
| V18 | Eskalace a řízení výjimkou | PRINCE2 | 4 | R, D | kometa zrychlí, Ruda musí za sponzorem | eskalovat včas a s variantami | přijde s možnostmi, ne s problémem | Řízení výjimkou |
| V19 | Retrospektiva | Scrum | 3–4 | R, M | *Plachetnice* | pojmenovat příčiny a domluvit konkrétní zlepšení | zlepšení se projeví v další kapitole | Retrospektiva |
| V20 | Vedení a motivace týmu | PMBOK: tým, principy | 3–5 | R, D | Rudův oblouk od hrdiny k servant leaderovi | podporovat tým místo mikromanagementu | hraje na pravý konec | Servant leadership |
| V21 | Uzavření a předání | PMBOK: dodávka, PRINCE2 | 5 | P, R | předání Archy provozovateli | předat výstup s dokumentací a podporou | Archa po startu funguje | Uzavření projektu |
| V22 | Poučení z minulosti | PRINCE2 | 1, 4, 5 | P, D, M | archiv zkrachovalých projektů Nedostavěnice | využít minulé lekce na začátku a sepsat nové na konci | najde v archivu klíčovou radu | Lessons learned |
| V23 | Harmonogram a kritická cesta | PMBOK: plánování | 3–4 | M | *Jeřábový balet*: betonáže, zrání, jeden jeřáb | plánovat závislosti a sdílené zdroje, najít kritickou cestu | rampa bez zřícených bednění a front u jeřábu | Kritická cesta |
| V24 | Ukázka a zpětná vazba uživatelů | Scrum (sprint review) | 3 | M | *Ukázka na náměstí*: prototyp a maketa kajuty | ukazovat brzy a často a podle reakcí měnit pořadí práce | přeskládá seznam práce podle zjištění | Sprint review |
| V25 | Integrace dvou světů | hybridní řízení | 3–5 | M, R, P | *Integrační okno* (ve hře *Než se zavře trup*), finální spojení v kap. 5 | sladit pevné milníky s průběžnými verzemi, dohodnout nejmenší verzi pro milník | žádná krize na rozhraní v kap. 4 | Integrační milník |
| V26 | Technický dluh | Scrum, PMBOK: dodávka | 3–4 | R | plán kola nad kapacitu (`c3_dluh`): chyby v počítadle, lístky tisknuté dvakrát, drolivá rampa | nepřeplňovat kola; zkratky se vrátí jako práce navíc | `c3_dluh` ≤ 1 | Technický dluh |

## Témata podle pater

| Patro | Témata |
|---|---|
| Společný základ | V01, V02, V03, V04, V05, V09, V10, V18, V19, V20, V21, V22 |
| Svět plánu | V06, V17 (plnění plánu), V23 |
| Svět iterací | V07, V12, V13, V14, V16, V17 (dodaná hodnota), V24 |
| Spojka | V08, V11, V15, V25 |

## Pokrytí výkonnostních domén PMBOK

| Doména | Témata | Kapitoly |
|---|---|---|
| Stakeholdeři | V04, V05 | 1, 4 |
| Tým | V10, V20 | 2, 3–5 |
| Přístup k vývoji a životní cyklus | V11, V25 | 2–5 |
| Plánování | V03, V06, V07, V08, V23 | 1–3 |
| Projektová práce | V15, V16, V26 | 1, 3–5 |
| Dodávka | V01, V02, V21, V24, V26 | 1, 3–5 |
| Měření | V17 | 4–5 |
| Nejistota | V08, V09 | 2–4 |

## Pravidla pro práci s maticí

- Nové téma = nový řádek. Bez vyplněného nosiče a důkazu pochopení nejde do výroby.
- Jedno téma by mělo mít aspoň jeden **opožděný následek** (R), aby se lekce prožila dvakrát.
- Na hodinu hraní nejvýš 2–3 minihry. Zbytek učí puzzly, dialogy a rozhodnutí. Rozložení po
  kapitolách je v [rozpočtech kapitol](05-produkce.md#rozpočty-kapitol) (D56, D58).
- Pojem v deníku se odemkne až **po** zážitku, nikdy předem.
- **Ve hře se nepoužívají slova agilní, prediktivní ani hybridní** (D26), jen „Rudův způsob“
  a „Bářin způsob“. Vědomá výjimka je **Gantt**: Rudovo příjmení a jeho způsob, zní ve všech
  kapitolách (D81).
- **Hra je pro široké publikum, výuka musí být nenásilná.** Odborné pojmy a názvy rámců se ve hře
  samotné neobjevují. Matice je interní nástroj autorů, hráč ji nikdy nevidí.
- **Deník projektového manažera je volitelný a nenápadný.** Nikdy se sám neotevírá a neupozorňuje
  na sebe. Kdo o něj nestojí, nemusí o něm vůbec vědět.
- Každé téma musí být nejdřív **zábavné jako hra** pro někoho, kdo o PM nic neví. Výukový efekt je
  bonus, ne důvod, proč tam téma je.

## Otevřené otázky

- [x] Učitelský režim: zatím odložen (D17)
- [ ] Mají se pojmy v Deníku jmenovat odborně (WBS, Scrum), nebo hravě s odborným názvem v závorce?
