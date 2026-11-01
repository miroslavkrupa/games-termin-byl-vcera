# Šedý prototyp

Kapitola hratelná v prohlížeči dřív, než vznikne grafika a kód v Godotu. Slouží k autorské
kontrole (N4): logika, texty, nápovědy, minihry a následky voleb se dají projít klikáním
a stejná pravidla zkontroluje skript.

| Soubor | Obsah |
|---|---|
| `engine.js` | logika bez grafiky: scény, předměty, příznaky, dialogy, nápověda; běží v prohlížeči i v Node |
| `kapitola1.js` | kapitola 1 jako data: aktivní místa, dialogy, minihry, nápovědy, obrazovka následků a průchody |
| `prehravac.html` | přehrávač: šedé scény, titulky, inventář, minihry a panel autora |
| `obrazky/` | zmenšená pozadí náměstí a archivu a ikony předmětů z `hra/grafika` |
| `sestav.mjs` | složí vše do jednoho HTML souboru ve `vystup/` (není v gitu) |
| `kontrola.mjs` | automatická kontrola kapitoly |

Texty se berou z `hra/texty/texty.csv`. Data kapitoly obsahují jen klíče textů.

## Příkazy

Spouštějí se z kořene repozitáře (potřeba je Node 20).

```bash
node prototyp/sestav.mjs 1
```

```bash
node prototyp/kontrola.mjs 1
```

Kontrola ověří, že:
1. každý klíč textu v datech existuje v `texty.csv`,
2. průchody z `docs/kapitoly/01-pruchod.md` (nejkratší cesta a varianty) dojdou do konce
   s očekávanými příznaky,
3. náhodné hraní nenarazí na chybu a z nedohraných her jde vždy dojít do konce (hledání
   zaseknutí),
4. vypíše texty kapitoly, které data nepoužívají.

Přehrávač otevře `prototyp/vystup/kapitola1-lokalne.html` v prohlížeči. Panel autora ukazuje
záznam replik s klíči, stav příznaků a umí skočit na libovolný krok průchodu.

## Zápis dat

Akce jsou krátké řetězce, popis je v hlavičce `engine.js`: klíč textu se řekne, `+x` / `-x`
přidá / odebere předmět, `$x`, `$x=3`, `$x+1` nastaví příznak, `>scena`, `#dialog`, `@minihra`,
`~postava`. Podmínky jsou výrazy nad příznaky, např. `ma('kava') && c1_babicka=='spojenec'`.

Data jsou zároveň podklad pro N7: stejné scény, aktivní místa a pravidla se přepíšou
do Popochiu a průchody poslouží jako automatický test pro `ladeni.gd`.
