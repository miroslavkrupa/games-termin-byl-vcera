# ☄️ Termín byl včera

*Komediální point & click adventura o projektovém manažerovi, který musí poprvé v životě něco dokončit.*

Sebestředný projektový manažer **Ruda Gantt** musí dokončit Archu dřív, než na město Nedostavěnice,
kde nebylo nikdy nic dokončeno, dopadne kometa **Deadline**. Hra je ve stylu *Deponie*: sarkastický
antihrdina, absurdní svět, fér puzzly a rozhodnutí, která se vracejí o kapitoly později.
Archa se skládá z částí různé povahy: některé potřebují plán, jiné zkoušení s lidmi. Ruda
zosobňuje svět plánu, parťačka Bára svět iterací a uspějí, až se naučí spolupracovat.
Mimochodem a nenásilně učí projektové řízení – iniciaci, plánování, Scrum, řízení rizik a změn,
komunikaci se stakeholdery – a to mechanikami a minihrami, ne přednáškami.

Hra je pro **co nejširší publikum** milovníků adventur a vzniká **v angličtině i češtině zároveň**
(anglicky pracovně *Deadline Was Yesterday*). Bude **zdarma** s možností dobrovolného příspěvku,
pro **PC, Mac a mobily**.

> Stav: **návrh a technický prototyp** (pracovní název; hratelný prototyp ve složce `hra/`)

▶ **[Hrát prototyp online](https://miroslavkrupa.github.io/termin-byl-vcera/)** (prohlížeč na počítači i telefonu, asi 20 MB ke stažení)

## Návrhová dokumentace

| Dokument | Obsah |
|---|---|
| [Záznam rozhodnutí](docs/00-rozhodnuti.md) | co bylo rozhodnuto, kdy a co z toho plyne |
| [Koncepce: Dva světy, jedna Archa](docs/07-dva-svety.md) | jednotící myšlenka: hybridní řízení jako páteř hry, čtyři patra, postavy jako dva světy, metodický oblouk, konce |
| [Vize](docs/01-vize.md) | návrh na jednu stránku: pilíře, cílová skupina, co si hráč odnese, co hra není |
| [Výuková matice](docs/02-vyukova-matice.md) | PM témata → kapitola → mechanika → důkaz pochopení; pokrytí domén PMBOK |
| [Příběhová bible](docs/03-pribehova-bible.md) | svět, postavy, dějový oblouk, osnova kapitol, stavové proměnné, následky, konce |
| [Minihry](docs/04-minihry.md) | 14 miniher ve čtyřech patrech koncepce, zásady, specifikace, pořadí prototypů, šablona |
| [Produkce](docs/05-produkce.md) | rozsah pro jednoho autora, platformy a ovládání, příspěvky, AI grafika, příprava na dabing, jazyky |
| [Stylová bible](docs/06-stylova-bible.md) | výtvarný styl podobný Deponii, pravidla, schválená varianta A (večer a krize C), zadání pro AI a automatické generování vzorků |
| [Animace postav](docs/styl/animace-postav.md) | model postavy a zadání všech animací pro ChatGPT, pravidla a zpracování |
| [Stylové ukázky](docs/styl/ukazky.html) | vizuální porovnání variant (otevřít v prohlížeči) |
| [Prototyp Náměstí](docs/08-prototyp-namesti.md) | technický prototyp v Godot 4.7 + Popochiu: otázky, rozsah, kroky K0–K10, rizika |
| [Vyhodnocení prototypu](docs/09-vyhodnoceni-prototypu.md) | odpovědi O1–O8, změřené časy, odhad rozsahu hry, doporučení |
| [Plán výroby kapitoly 1](docs/10-plan-kapitoly-1.md) | fáze F0–F5, iterace I1–I6, rozhodnutí na začátek, rizika, záznam času |
| [Kapitola 1: Iniciace](docs/kapitoly/01-iniciace.md) | vertical slice: scény, puzzly, graf závislostí, rozhodnutí, minihry, ukázkové dialogy CS/EN |
| [Postup návrhu](docs/12-postup-navrhu.md) | nejdřív celá hra na papíře, potom texty, potom výroba: kroky N0–N9, šablony, brány A a B |

## Postup návrhu

Nejdřív celá hra do detailu na papíře, potom texty, teprve potom výroba v Godotu (D54, D55).
Podrobně v [postupu návrhu](docs/12-postup-navrhu.md):

1. **N0 Rozsah celé hry:** délka, počet kapitol a miniher, rozpočet každé kapitoly
2. **N1 Příběh celé hry:** kontrola příběhové bible
3. **N2 Kostry kapitol 2–5** a mapa následků
4. **N3 Každá kapitola do detailu** (1, pak 2–5): obsah místností, průchod, karty puzzlů, matice předmětů, osnovy dialogů
5. **N4 Papírový průchod** každé kapitoly s 2–3 lidmi
6. **N5 Celá hra dohromady:** příznaky, konce, tempo, rozsah → brána A: celá hra uzamčena
7. **N6 Texty první verze** kapitoly v obou jazycích → brána B
8. **N7 Výroba v Godotu** (iterace I2–I6) s automatickým průchodem
9. **N8 Playtest** s 5 hráči, **N9 ladění a vydání**; další kapitoly opakují N6–N9

## Technologie

Godot 4.7 + Popochiu 2.2 (framework pro point & click adventury), texty v tabulkách řetězců (D35).
Godot exportuje na Windows, macOS, Android, iOS i do prohlížeče. Volbu ověřuje
[technický prototyp Náměstí](docs/08-prototyp-namesti.md).
