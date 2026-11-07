# Šedý prototyp

Kapitoly hratelné v prohlížeči dřív, než vznikne grafika a kód v Godotu. Slouží k autorské
kontrole (N4): logika, texty, nápovědy, minihry a následky voleb se dají projít klikáním
a stejná pravidla zkontroluje skript.

| Soubor | Obsah |
|---|---|
| `engine.js` | logika bez grafiky: scény, předměty, příznaky, dialogy, nápověda; běží v prohlížeči i v Node |
| `kapitola1.js` až `kapitola5.js` | kapitoly jako data: aktivní místa, dialogy, minihry, nápovědy, obrazovka následků a průchody; od kapitoly 2 i startovní stavy z předchozí kapitoly (`predvolby`) |
| `texty/kapitolaN.csv` | pracovní texty kapitol, které ještě nemají texty první verze (N6); jen česky, stejné sloupce jako `texty.csv` (teď kapitoly 3, 4 a 5) |
| `prehravac.html` | přehrávač: přepínač kapitol, volba startu, šedé scény, titulky, inventář, minihry a panel autora |
| `obrazky/` | schválená pozadí scén (D51), postavy zepředu a ikony předmětů (D52) ze `docs/styl/vzorky` |
| `priprav_obrazky.gd` | vyřízne postavy a ikony ze vzorků (Godot); pozadí se převádí nástrojem `sips` |
| `sestav.mjs` | složí vše do jednoho HTML souboru ve `vystup/` (není v gitu) |
| `kontrola.mjs` | automatická kontrola kapitoly |

Texty se berou z `hra/texty/texty.csv` a z pracovních `texty/kapitolaN.csv`. Data kapitoly obsahují
jen klíče textů. Pracovní texty jsou podklad pro N6: přepíšou se do `texty.csv` v obou jazycích,
až kapitola půjde do výroby.

## Příkazy

Spouštějí se z kořene repozitáře (potřeba je Node 20).

```bash
node prototyp/sestav.mjs
```

```bash
node prototyp/kontrola.mjs 2
```

Kontrola ověří, že:
1. každý klíč textu v datech existuje v textech,
2. průchody z `docs/kapitoly/0N-pruchod.md` (nejkratší cesta a varianty) dojdou do konce
   s očekávanými příznaky; od kapitoly 2 se startem „dobra“ nebo „spatna“,
3. náhodné hraní (střídavě z dobrého a špatného startu) nenarazí na chybu a z nedohraných her
   jde vždy dojít do konce (hledání zaseknutí),
4. vypíše texty kapitoly, které data nepoužívají.

Sestavení vytvoří jednu stránku se všemi kapitolami: `prototyp/vystup/prototyp-lokalne.html`
otevře se přímo v prohlížeči, `prototyp.html` je verze pro artefakt. Kapitola se volí v hlavičce.
Kapitoly 2 a 3 se zeptají, s jakým výsledkem předchozí kapitoly začít (vlastní dohraná hra,
dobré, nebo špatné volby); po dohrání kapitoly nabídne „Pokračovat kapitolou N+1“. Panel autora ukazuje
záznam replik s klíči, stav příznaků a umí skočit na libovolný krok průchodu.

## Kapitola 2 v prototypu

Podle [návrhu](../docs/kapitoly/02-planovani.md); texty čte z `hra/texty/texty.csv` (N6, D83).
Tři zjednodušení, která se ověří až v Godotu:
- **M06 Mapa do neznáma** se hraje po mostech: u každého z tří mostů hráč volí bod na cestě
  (přesný, nebo mlhavý) a dlaždici řeky (podrobnou, nebo hrubou). Posouvání mlhy po sloupcích
  není; pravidla mostů, kotvy (K5), výjimek a variant `gantt` / `krabice` platí.
- **Tácky (P2.3):** po čtvrtém tácku se otočí samy, bez návratu k sázkové tabuli.
- **Tým (R2.1)** se vybírá volbou „Chcete do týmu?“ u každého kandidáta a potvrzuje u dveří.

## Kapitola 3 v prototypu

Podle [návrhu](../docs/kapitoly/03-realizace.md). Hraje se za Rudu i Báru: každá postava stojí
ve své scéně (`s.kde`), portrét v rohu scény (nebo klávesa X) přepne na druhou a ta zůstane,
kde byla. Báře radí metr (tlačítko „Metr radí“). Dílna, sklad a trup jsou šedé výkresy.
Zjednodušení, která se ověří až v Godotu:
- **Rozdělané věci v dílně (P3.5):** půlku čidla, Rudův model a plech Bára nejdřív vezme
  a pak použije na polici „Někdy“ (v návrhu se odkládá rovnou místo na místo).
- **M13 Jeřábový balet:** karty se dávají do dnů klepnutím (karta, pak den). Přehrání posune
  kartu, která na svůj den nemůže; když se stavělo na nezralém betonu, bednění spadne a den
  zabere úklid, další karty se posunou s ní. Bez Věry stojí jeřáb první den (hledání výpočtu).
- **M14 Ukázka:** karty do kola se vybírají zaškrtnutím, ne přerovnáním sloupce; při
  `krabice` se bere horních N karet, dokud Bára seznam nevyndá.
- **M15 Než se zavře trup:** Rudův a Bářin pohled se přepíná přepínačem v okně minihry
  (ne portrétem), karty se přiřazují klepnutím do přihrádky.
- **Ranní porada (P3.4)** je řada krátkých rozhovorů: každý z týmu v dílně, překážka, Ruda.

## Kapitola 4 v prototypu

Podle [návrhu](../docs/kapitoly/04-krize.md) (D85). Tři akty, hraní za oba, M03 Souboj argumenty
(s tlačítkem Přeskočit, D12), R4.2 jako tabule rozsahu (druh `plan_kola`: dílky s hvězdičkami
= velikost, „kapacita“ = kolik dílků obětovat) a M11 Plachetnice jako rozcestník (karty po jedné
do přihrádek kotva / vítr / útes, Pembok špatnou kartu jen přesune). Zjednodušení, která se
ověří až v Godotu:
- **Přechod „Na radnici“** jsou přímé východy ze staveniště do archivu a Komise (a mezi nimi),
  střih přes náměstí je jen text.
- **Starosta přijede a M03 začne hned po odeslání zprávy** (telegraf → souboj); po výhře se
  rovnou rozvine tabule rozsahu, po prohře ji hráč otevře sám nebo souboj zopakuje.
- **Usmíření:** když jsou obě linky aktu B hotové a Bára není v hangáru, přijde tam střihem.
- **P4.29** (navigace poklopem) je jeden dialog bez skutečného přepínání postav; navigace vždy
  první; bez poklopu vrtá Věra, bez Věry Ruda.
- **Lístek pro babičku, páska a rozpis** jdou v aktu B jen přes posla, v aktech A a C si je
  postavy předají přímo.
- Aktivní místa jsou rozdělená na Rudovu a Bářinu verzi (`id_r` / `id_b`), aby náhodné hraní
  v kontrole nezakrývalo Bářiny puzzly Rudovými návštěvami.
- Nepočítá se důvěra ani morálka (jako v kapitole 3); Bářina natřená žárovka je jen text;
  Zelenka komentuje lístky jen podle barvy.

## Kapitola 5 v prototypu

Podle [návrhu](../docs/kapitoly/05-uzavreni.md) (D85). Tři scény (rampa, věž, archiv), finále
„Dva klíče“ z existujících primitiv: pojistky jsou příznaky, kamery a pulty aktivní místa
a dialogy, „Na tři“ je volba v dialogu pultu; při `trval` se Ruda ptá „Na čí tři?“. Konec
se počítá v pevném pořadí (D80): body sladění, Rudův vývoj a Bářina důvěra dají `c5_konec`
(pomník / druhá etapa / hrdina / tým) a obrazovku „Co si Nedostavěnice zapamatovala“.
Zjednodušení:
- **Bára sejde z věže až po předání klíče (R5.1)**, ne po „Na tři“, aby šlo dodělat zaučení
  posádky po finále; přepínání portrétem se tím vypne.
- **Hodnoty (P5.12)** jsou společný dialog z obou pultů; váha jde jen deníkem jeřábu na Rudův
  pult, deník dá vrátný na požádání.
- **Šipky na palubě** dělá vždy Bára z věže; Lumíra při `trval` hlásí až na otázku vysílačkou
  (nové aktivní místo „Vysílačka“ na rampě).
- Volby u Pana Změny („Dobře, uděláme to“) a u přání („Splnit“ / „Zahodit“) jsou jednorázové;
  Ještětoto s kartičkou od Pana Změny vyleze zpátky do dveří.
- Přechod „Na radnici“ je jedna věta při prvním příchodu do archivu; krabička Poučení jde vzít
  až po rozhovoru s Lumírem.
- Scény jsou bez pozadí (šedé výkresy); velikost Ještětota je jen jméno v textu.

## Zápis dat

Akce jsou krátké řetězce, popis je v hlavičce `engine.js`: klíč textu se řekne, `+x` / `-x`
přidá / odebere předmět, `$x`, `$x=3`, `$x+1` nastaví příznak, `>scena`, `#dialog`, `@minihra`,
`~postava` (přepnout hranou postavu), `^bara=dilna` (přesunout postavu do scény). Podmínky jsou výrazy nad příznaky, např. `ma('kava') && c1_babicka=='spojenec'`;
seznamy v příznacích jsou řetězce s pomlčkami (`obsahuje(c2_mosty, 'trup')`, `pocet(c2_mosty)`),
`kde('bara')` vrátí scénu postavy. Průchod může předvolbu upravit (`priznaky`, např. jiný tým)
a krok `prepni` přepne postavu.
Funkce `(h) => …` v akcích počítá příznaky, které zápis neunese (tým, pokrytí).

Data jsou zároveň podklad pro N7: stejné scény, aktivní místa a pravidla se přepíšou
do Popochiu a průchody poslouží jako automatický test pro `ladeni.gd`.
