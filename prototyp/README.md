# Šedý prototyp

Kapitoly hratelné v prohlížeči dřív, než vznikne grafika a kód v Godotu. Slouží k autorské
kontrole (N4): logika, texty, nápovědy, minihry a následky voleb se dají projít klikáním
a stejná pravidla zkontroluje skript.

| Soubor | Obsah |
|---|---|
| `engine.js` | logika bez grafiky: scény, předměty, příznaky, dialogy, nápověda; běží v prohlížeči i v Node |
| `kapitola1.js`, `kapitola2.js` | kapitoly jako data: aktivní místa, dialogy, minihry, nápovědy, obrazovka následků a průchody; od kapitoly 2 i startovní stavy z předchozí kapitoly (`predvolby`) |
| `texty/kapitolaN.csv` | pracovní texty kapitol, které ještě nemají texty první verze (N6); jen česky, stejné sloupce jako `texty.csv` |
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
Kapitola 2 se zeptá, s jakým výsledkem kapitoly 1 začít (vlastní dohraná hra, dobré, nebo
špatné volby); po dohrání kapitoly 1 nabídne „Pokračovat kapitolou 2“. Panel autora ukazuje
záznam replik s klíči, stav příznaků a umí skočit na libovolný krok průchodu.

## Kapitola 2 v prototypu

Podle [návrhu](../docs/kapitoly/02-planovani.md) se třemi zjednodušeními, která se ověří až
v Godotu:
- **M06 Mapa do neznáma** se hraje po mostech: u každého z tří mostů hráč volí bod na cestě
  (přesný, nebo mlhavý) a dlaždici řeky (podrobnou, nebo hrubou). Posouvání mlhy po sloupcích
  není; pravidla mostů, kotvy (K5), výjimek a variant `gantt` / `krabice` platí.
- **Tácky (P2.3):** po čtvrtém tácku se otočí samy, bez návratu k sázkové tabuli.
- **Tým (R2.1)** se vybírá volbou „Chcete do týmu?“ u každého kandidáta a potvrzuje u dveří.

## Zápis dat

Akce jsou krátké řetězce, popis je v hlavičce `engine.js`: klíč textu se řekne, `+x` / `-x`
přidá / odebere předmět, `$x`, `$x=3`, `$x+1` nastaví příznak, `>scena`, `#dialog`, `@minihra`,
`~postava`. Podmínky jsou výrazy nad příznaky, např. `ma('kava') && c1_babicka=='spojenec'`;
seznamy v příznacích jsou řetězce s pomlčkami (`obsahuje(c2_mosty, 'trup')`, `pocet(c2_mosty)`).
Funkce `(h) => …` v akcích počítá příznaky, které zápis neunese (tým, pokrytí).

Data jsou zároveň podklad pro N7: stejné scény, aktivní místa a pravidla se přepíšou
do Popochiu a průchody poslouží jako automatický test pro `ladeni.gd`.
