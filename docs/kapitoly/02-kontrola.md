# Kapitola 2: autorská kontrola (N4)

> Krok N4 [postupu návrhu](../12-postup-navrhu.md) bez hráčů (D66). Nejkratší cesta, varianty
> a „špatná“ kapitola 1 z [průchodu](02-pruchod.md) prošly krok za krokem proti
> [kartám puzzlů](02-puzzly.md) a [obsahu místností](02-mistnosti.md). Navíc kontrola detailů
> proti kapitole 1: [návrh](01-iniciace.md), [místnosti](01-mistnosti.md), texty v `texty.csv`
> a mapa následků v [bibli](../03-pribehova-bible.md#rozhodnutí-a-jejich-pozdější-následky).
> Stav: **zapracováno** (D68), 2026-11-01. Všechny návrhy K1–K19 autor schválil. Texty kapitoly 2 ještě nejsou (N6), takže se
> kontrolují jen osnovy.

## Shrnutí

| Oblast | Výsledek |
|---|---|
| Průchod krok za krokem | projde; 5 logických děr (K1–K5) |
| Soulad s kapitolou 1 | 10 nesouladů (K6–K15) |
| Stav na začátku | „dobrá“ i „špatná“ kapitola 1 projdou; každý čtený příznak z kap. 1 se v kap. 1 nastavuje |
| Matice předmětů | 53 vlastních reakcí ★, odhad byl 40 |
| Nápovědy | 3 stupně u všech 8 puzzlů |
| Drobnosti | K16–K19 |
| Rozpočet | 429 replik (po opravě matice), s návrhy K asi 445; rozpočet 400–500 |
| Chyby v dokumentech | 7, opravené rovnou (D1–D7) |

## Logické díry

**K1 Jak se Bára dostala do hangáru?** Když Ruda po M04 poprvé vejde do hangáru, Bára už uvnitř
měří trup. Klíč má ale jen Ruda a bránu zevnitř blokoval slon.
*Návrh:* Bára přišla zadními vraty přes Mlžnou pláň. Na otázku „Jak jste se sem dostala?“
odpoví: „Zadem. Přes mlhu. Tudy nikdo jiný nechodí.“ (2 texty). Sedí k ní: do neznáma chodí
jen ona. Zároveň vysvětlí, proč jsou zadní vrata otevřená od začátku.

**K2 Tým se dá vybrat naslepo.** R2.1 jde potvrdit u dveří hospody dřív, než hráč viděl Archu,
výkresy a Báru. Nejkratší cesta to tak dělá (krok 10). Bářina rada „Ptej se, co umějí“
i prohlédnutí Archy jsou až v hangáru, za slonem. Jediná stopa před náborem je
Pembokovo „potřebuješ plán, lidi a razítko“.
*Návrh:* tým jde potvrdit až po prvním příchodu do hangáru. Předtím Ruda u dveří řekne:
„Nejdřív se podívám, co ta Archa vůbec potřebuje.“ (1 text). Kandidáty jde zkoušet hned.
Nejkratší cesta se změní: hospoda (křída, tácky, zkoušky) → slon → hangár → hospoda (tým,
odhad) → hangár. Přibude jedna cesta tam a zpátky, asi 2 minuty, a graf se rozšíří.

**K3 Odhad píšou štamgasti, ne lidé, kteří budou rampu stavět.** P2.3 učí odhad bez kotvy, ale
tácky dostanou hlavně štamgasti. Hráč si odnese, že stačí zeptat se kohokoli, jen potají.
Téma V07 přitom stojí i na tom, že odhaduje ten, kdo práci dělá. Podmínka „po R2.1“ pak
nemá důvod.
*Návrh:* štamgasti jen kotví („dva dny“, „tři?“). Tácky dostane tým a Ruda, tedy 5 tácků.
Čísla 12, 14, 15, 15, 18 zůstanou, 12 napíše Ruda. Kdo v týmu nic neumí, napíše nesmysl:
Zdenda „zeptám se chlapa“, Kryštof „po poradě“. Bere se prostřední z čísel, takže výsledek
je pořád 15. Úprava v P2.3, osnově štamgastů a průchodu (krok 12).

**K4 Tabule rozhodne za hráče.** Podle pravidel P2.4 vrátí běžnou část ve špatném sloupci ten,
komu patří, a to přímo do správného sloupce. Ruda na začátku dal všech osm do svého sloupce.
Z toho plynou dva problémy:
- Bezpečnostní systém je u Rudy už od začátku, takže výjimka je „správně“, aniž by o ní hráč
  přemýšlel. Kdo přesune jediný magnet, dostane zbytek seřazený sám.
- Pravidlo vracení se tluče s Ganttem: při potvrzení beze změn jsou čtyři běžné části
  ve špatném sloupci, a přesto to má být `gantt`, ne vracení.

*Návrh:* tabule nabídne tři cesty. „Nechat, jak to je“ je `gantt` a „Krabice“ je Frameworkova
nabídka. „Rozdělit část po části“ sundá všech osm magnetů doprostřed a hráč umístí každý
sám. Běžná část ve špatném sloupci dostane při potvrzení námitku a vrátí se **doprostřed**, ne
do správného sloupce. Výjimky projdou bez námitky. `c2_vyjimky` pak měří skutečnou volbu.
Úprava v P2.4, návrhu kapitoly (krok 7) a průchodu (krok 21).

**K5 Kotva nemá v M06 pravidlo.** Průchod (varianta D) říká, že rampa „nedojede k mostům, dokud
ji hráč neprodlouží“. Pravidla M06 ale prodlužování neznají a neříkají, kolik mostů kotva stojí.
*Návrh:* s odhadem „2“ má rampa na mapě 1 sloupec. Když mlha odkryje druhý sloupec, Ruda řekne:
„Dva dny… a ještě třináct.“ a rampa se natáhne na 5 sloupců, ale o sloupec později. Most
*zkouška nástupu na rampě* pak nemá pevný bod, takže s kotvou jsou nejvýš 2 mosty (2 texty).
Úprava v M06, P2.3 a průchodu (varianta D).

## Nesoulad s kapitolou 1

**K6 Kávové pero „nepíše“.** Dvě vlastní reakce kapitoly 2 tvrdí, že kávové pero nepíše:
„Pero čáru nenechá. Je prázdné i s kávou“ (slon) a „Pero na tabuli nepíše. Na nic nepíše.“
V kapitole 1 ale kávovým perem podepisuje Pan Změna i výpůjčka karty poučení.
*Návrh:*
- slon: „Kávová čára se do slona vsákne. Je z papírů a papíry pijou všechno.“
- tabule: „Kávou na tabuli? To by tam bylo napořád. A tohle se ještě bude měnit.“

Druhá replika zároveň nese téma kapitoly. Hráč s propiskou místo pera dostane výchozí reakci.

**K7 Two-Weeks Joe rozbije anglickou verzi odhadu.** D47 schválilo anglické jméno Two-Weeks Joe
s věčným odhadem „two weeks“. V P2.3 je ale kotva, která má být směšně nízká, a realistický odhad
je 15 dní. Anglická kotva „two weeks“ (14 dní) je skoro správně, takže puzzle v angličtině
nefunguje. Stejný problém má Frameworkova krabice „Rampa za dva týdny“: i česky je to skoro
správný odhad a vtip zapadne.
*Návrh:*
- EN jméno **Two-Day Joe** a kotva „two days“ (změna D47; vtip „Two days. Tops.“ funguje i anglicky),
- krabici přejmenovat na „Rampa každé dva týdny nová“ (nese Frameworkovo přejmenovávání z kap. 1).

**K8 Počítání dnů.** Kapitola 1 začíná na 30 dnech a končí „Zítra hangár.“, kapitola 2 ale
začíná na 27. Navíc kapitola 1 počítá dny nahoru („Start nejpozději 30. den.“), kapitola 2 dolů
a obojí míchá: „Den 25.“ (Bára, konec) a „den 25 → start“ (M06) jde číst jako 25. den, tedy
5 dní před dopadem.
*Návrh:*
- Rozdíl vysvětlí fronta na frontu z kapitoly 1. Amplion: „Dnů do dopadu komety: 27.“ Ruda:
  „Dvacet sedm? Vždyť bylo třicet!“ Pembok: „Fronta na frontu trvala dva dny. Stál jsi v ní.“
  (2 texty). Počítadlo v kap. 1 po frontě ukáže 28.
- Kapitola 2 mluví jen o tom, kolik dní zbývá: Bára „Zbývá dvacet pět.“, sloupce M06
  „zbývá 25 … zbývá 1“. Kalendář v hangáru je odtrhávací odpočet. „30. den“ zůstane jen
  u starosty v kap. 1.

**K9 Bára vysloví „termín“ příliš brzy.** Osnova dává Báře po M06 větu „Den 25. To je… termín.“
s poznámkou „poprvé vysloví datum, zárodek romance“. Podle D60 je ale chvíle, kdy Bára poprvé
řekne termín, vyvrcholení epilogu při vysoké důvěře. Kapitola 2 by ji vypotřebovala.
*Návrh:* po M06 jen „Zbývá dvacet pět. …Uvidíme.“ Je to zárodek, ale žádný slib. Bářin oblouk
„naučí se slíbit termín“ zůstane na konec.

**K10 Babička má čtyři stavy, kapitola 2 tři obrazy.** `c1_babicka` končí v kapitole 1 jako
`spojenec`, `odmitnuta`, `prehlizena` nebo `neodhalena`. Plot v kapitole 2 zná jen mávání,
zataženou záclonu a prádlo, bez přiřazení.
*Návrh:* `spojenec`: mává a nechá na plotě buchtu. `odmitnuta`: zatažená záclona („Babička
si pamatuje, že jsi spěchal.“). `prehlizena` a `neodhalena`: jen prádlo, nikdo nemává.

**K11 Kocour z kapitoly 1 zmizel, krysy řeší jiná kočka.** Babiččin zrzavý kocour se v kapitole 1
toulá u kašny a na plotě. Kapitola 2 o něm mlčí, a přitom na krysy nabízí kočku z inzerátu.
Hráč s lístkem „krysy“ zkusí nejdřív kocoura, kterého zná.
*Návrh:* kocour sedí na babiččině plotě v S2 (převzatý sprite). Krabice nebo obálka
na kocoura: „Tenhle krysy nehoní. Ten soudí lidi.“ (1–2 texty). Kočka z inzerátu zůstane
cestou ke kočce Rizikové. Vtip zároveň navazuje na krabici „Metodika pro kočky“ z kap. 1.

**K12 Kolonka „Co na Archu nepatří“ schová jen bazén.** Útržek z kapitoly 1 (Bára) zní „Bazén,
vyhlídková terasa, fontána.“, ale s `c1_mimo_rozsah` se v kapitole 2 neobjeví jen magnet Bazén.
Fontána a Terasa na tabuli přibudou, i když je hráč v charteru vyloučil.
*Návrh:* s `c1_mimo_rozsah` se neobjeví žádný ze tří magnetů. Slib všeho se pak projeví jen
amplionem („a ještě fontánu“) a Pembok poznamená: „Fontánu máš v papíru mezi věcmi, které na
Archu nepatří. Aspoň něco.“ (1 text). Úprava v návrhu kapitoly, P2.4 a v mapě následků.

**K13 Kvalitu charteru kapitola 2 nečte.** Mapa následků v bibli uvádí `c1_charter_kvalita` jako
čtenou v kap. 2 („snazší rozdělení“), ale návrh kapitoly 2 ji nepoužívá.
*Návrh:* s `c1_charter_kvalita` = 3 visí nad tabulí cíl z charteru „Odvézt všechny obyvatele“.
Prohlédnutí: „Všechny. Ne jen ty, co umějí číst výkresy.“ (1 text). Je to další stopa,
proč nástup a interiér patří Báře. Druhá možnost je škrtnout kap. 2 v mapě následků.
Doporučuji použít, stojí jeden text.

**K14 Bára byla v původním týmu, ale krabici od bot nepozná.** V kapitole 1 Bára zná číslo
projektu nazpaměť, protože byla v týmu z roku 1994. V kapitole 2 je krabice od bot „krabice
původního týmu, do které nikdo nic nenapsal“ a výkresy jsou z roku 1994. Bára ani jedno nepozná.
*Návrh:* krabice na Báru: „Tu krabici jsem zakládala já. Nikdo mi do ní nedovolil nic napsat.“
(2 texty). Sedí to k R1.3 (nikdo ji neposlouchá) a dá to krabici váhu.

**K15 Stopa k vrátnému nevede k činu.** Hráč se od Zdendy, štamgastů a z cedule dozví, že průkaz
na jeřáb má vrátný. Za vrátným ale nemůže, protože vestibul se přeskakuje. Hráč, který si
stopu spojil, bude vrátného hledat.
*Návrh:*
- Po stopě Ruda: „Vrátný? Zeptám se ho, až bude jeřáb potřeba.“ (1 text).
- Na konci, pokud hráč stopu slyšel, vrátný: „Prý jste se chtěl zeptat. To je víc, než kolik
  jsem slyšel za třicet let.“ (1 text). Pointa „Nikdo se nikdy nezeptal“ zůstane
  pro ty, kdo stopu nemají.

## Drobnosti

**K16 Nadpisy sloupců tabule.** Karta P2.4 má „Výkres a termín“ a „Zkusit a ukázat“, kontrola
N3h mluví o „Rudově“ a „Bářině způsobu“. *Návrh:* na tabuli „Rudův způsob: výkres a termín“
a „Bářin způsob: zkusit a ukázat“. Slovník D26 platí, hráč spojí jméno s povahou práce.

**K17 Pokrytí týmu počítá „plán“ dvakrát.** `c2_tym_pokryti` má složky plán, iterace a podpis
startu. Norbert je ale taky ze světa plánu, takže tým bez Věry (varianta F) má plán pokrytý
a pokrytí by bylo 3, ne 2. *Návrh:* složky jsou **stavba** (Věra), **zkoušení** (Pepa nebo Klára)
a **podpis startu** (Norbert).

**K18 Prasklé lano na konci.** Když obálka nešla na lano, jeřáb přesto nalije první beton.
*Návrh:* vrátný: „Lano? Drží. Zatím.“ (1 text). Je to předzvěst výpadku v M13 v kapitole 3.

**K19 Čím Ruda kreslí Gantt na stěnu?** Křída se spotřebuje v M04, a Ruda pak hned kreslí Gantt
na stěnu hangáru. *Návrh:* zbytkem křídy. „Kousek zbyl. Na Gantt vždycky zbyde.“ (1 text).

## Pohled nováčka

| Puzzle | Co zkusí hráč bez znalosti řízení projektů | Odpoví hra? |
|---|---|---|
| P2.1 Slon | strčit, klíč, kávu, pero | ano, ★ u všech (pero po K6) |
| P2.2 Nábor | vzít sympatické | ano, nápověda a následky; po K2 vidí Archu dřív, než volí |
| P2.3 Odhad | zeptat se Pepy, zeptat se všech nahlas | ano, kotva je výrazná volba |
| P2.4 Tabule | železo k Rudovi, software k Báře | ano, projde s `c2_vyjimky` = 0 a M06 to ukáže (po K4 je to skutečná volba) |
| P2.5 Krabice | zapsat kometu, obálku na nástup | ano, ★ a *Zkusíme* |
| P2.6 Formulář | podepsat sám, dát Báře | ano |
| P2.7 Mapa | kreslit řeku podrobně | ano, rozplyne se |
| P2.8 Fáze 2 | odmítnout ústně | ano, „Já mám papír, vy máte názor.“; stopy vedou ke kalendáři |

## Stav na začátku

- **„Dobrá“ kapitola 1:** projde podle nejkratší cesty. Po K2 a K3 se mění pořadí kroků 2–13.
- **„Špatná“ kapitola 1:** projde. Bára mlčí, ale P2.4 má dost jiných stop (slon, výkresy,
  Norbert, Klára), M06 má Pembokovu nápovědu. Formulář i fáze 2 mají stopy a tři stupně nápovědy.
- **Příznaky z kap. 1:** všechny, které kapitola 2 čte (`c1_bara_vyslechnuta`, `c1_slib_vseho`,
  `c1_mimo_rozsah`, `c1_faze2`, `c1_razitko`, `c1_babicka`, `c1_zmena_dohoda`), kapitola 1
  nastavuje. Mapa následků teď u `c1_babicka` a `c1_zmena_dohoda` uvádí i kap. 2 (D6).

## Rozpočet

Matice má 53 vlastních reakcí místo odhadovaných 40, takže osnova vychází na 429 replik.
Návrhy K1–K19 přidávají asi 16 textů, celkem asi 445. Kdyby se opakovala chyba odhadu
z kapitoly 1 (+19 %), vyjde asi 530. Škrtat navrhuji až v N6, nejdřív třetí témata kandidátů
a ★ (stejně jako u kapitoly 1).

## Opraveno rovnou

- **D1** Matice předmětů: formulář podepíšou i Zdenda a Kryštof, když jsou v týmu (byla ★).
- **D2** Počet vlastních reakcí v matici 40 → 53. Osnova dialogů a návrh kapitoly 416 → 429.
- **D3** Náměstí: „vrátný není“ vypuštěno, v kapitole 1 je vrátný ve vestibulu, ne na náměstí.
- **D4** Kancelář Komise: poduška není „nová“, je to poduška z kapitoly 1.
- **D5** Text inzerátu sjednocen („Krmení na rok si platí nový majitel.“).
- **D6** Mapa následků: `c1_babicka` a `c1_zmena_dohoda` se čtou i v kap. 2; kočka Riziková
  je za obálku na krysy (R2.3), ne jen za zapsání.
- **D7** Graf závislostí: doplněna tečkovaná cesta přes list kalendáře „Den dopadu“; `c2_rozpad`
  má horní mez 3.
