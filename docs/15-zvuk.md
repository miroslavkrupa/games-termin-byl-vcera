# Zvuk: hudba a efekty

> Odkud zvuky jsou, kdo je udělal a kde ve hře hrají. Všechno je volně licencované (D46),
> staženo z OpenGameArt.org 2026-11-11 (D90). Stav: **kapitola 1 zapojena, čeká na poslech autora**

## Jak to hra používá

Zvuk řídí autoload `Zvuk` ([hra/game/zvuk.gd](../hra/game/zvuk.gd)). Soubory jsou v `hra/zvuk/hudba/`
a `hra/zvuk/efekty/`, všechny Ogg Vorbis. Dabing má vlastní složky `hra/zvuk/<jazyk>/` (D84).

- **Hudba** se přepíná sama podle místnosti, s prolnutím 1,2 s. Skladby jsou nahrané různě
  hlasitě, proto má každá vlastní hlasitost (`HLASITOST_HUDBY`).
- **Samo zazní:** klepnutí každého tlačítka, otevření a zavření okna minihry, sebrání předmětu,
  dveře, výtah a skluz při přechodu mezi místnostmi (`PRECHODY`).
- **Výslovně z kódu:** `Zvuk.efekt("razitko")`, `await Zvuk.klepani()`, `Zvuk.ztis(přehrávač)`.
- Hlasitost řídí posuvník v nastavení hry (všechno hraje přes hlavní sběrnici).
- Ladicí běhy se snímkem a automatický průchod jsou potichu; `zvuk=1` zvuk nechá. Stav zvuku
  vypisuje ladicí výpis (`[po akci] zvuk: …`).

## Hudba

Od D91 hraje ve hře vlastní téma. Skladby z OpenGameArt (D90) se autorovi při poslechu nelíbily
skoro v žádné scéně a chyběla jim společná linka, proto je nahradila jedna melodie v šesti
aranžích. Skládá a renderuje ji `tools/hudba/sloz.py` čistou syntézou (žádné stažené vzorky),
takže hudba nemá cizí licenci.

- **Téma:** 16 taktů ve 4/4 (díl A 8 taktů, díl B 4 takty, návrat 4 takty), F dur. Rytmus hlavního
  motivu skanduje název hry „Ter-mín byl vče-ra“ (osminka, čtvrtka, osminka, čtvrtka, čtvrtka);
  tóny prvního taktu jsou A C A G A, odpověď F A F E D.
- **Akordy dílu A:** Fmaj7, Dm7, Gm7, C7, Fmaj7, Dm7, Gm7/C7, F6. Mollové aranže hrají totéž
  ve f moll (Fm7, Db6/9, Bbm7, C7b9).
- **Tikot hodin** je v několika aranžích jako připomínka termínu.

| Soubor ve hře | Místnosti | Tempo | Aranž |
|---|---|---|---|
| `hudba/tema_menu.ogg` | hlavní menu | 100 | bossa: vibrafon, podruhé kytara; elektrické piano, kontrabas, šejkr |
| `hudba/tema_byt.ogg` | byt | 72 | pomalé a řídké: vibrafon, rozložené akordy piana, tiká budík |
| `hudba/tema_mesto.ogg` | náměstí, chaloupka | 108 | kytarové rozklady, marimba, podruhé hvízdání |
| `hudba/tema_radnice.ogg` | vestibul, pracovna | 104 | pochodové: staccato marimba, pizzicato, tikot v osminách |
| `hudba/tema_komise.ogg` | Komise | 116 | moll, rychleji: pizzicato a marimba, krátký bas, tikot |
| `hudba/tema_archiv.ogg` | archiv | 66 | moll, pomalu: osamělá kytara ve velkém dozvuku, dlouhý bas |

Všechny skladby mají stejnou hlasitost (RMS −20 dB) a ve hře hrají na −10 dB (`zvuk.gd`,
`HLASITOST_HUDBY_VSE`). Smyčky jsou bezešvé. Změřeno je ladění, harmonie pod melodií, špičky
a šev smyčky; poslechem hudbu nikdo z nás dvou zatím neověřil (Claude zvuk neslyší).

Úprava tématu: změnit noty nebo aranž v `tools/hudba/sloz.py` a spustit ho
(`<venv>/bin/python tools/hudba/sloz.py --kontrola`), pak `godot --headless --path hra --import`.

## Efekty

| Soubor ve hře | Kdy zazní | Původní soubor | Balíček a autor |
|---|---|---|---|
| `klik.ogg` | každé tlačítko | `click_001.ogg` | Interface Sounds, Kenney |
| `vybrat.ogg`, `polozit.ogg` | zatím nezapojeno (výběr a položení lístku) | `select_001.ogg`, `drop_002.ogg` | Interface Sounds, Kenney |
| `okno_otevrit.ogg`, `okno_zavrit.ogg` | okno minihry | `bookFlip1.ogg`, `bookClose.ogg` | 50 RPG sound effects, Kenney |
| `sebrat.ogg` | předmět přibude do inventáře | `pluck_002.ogg` | Interface Sounds, Kenney |
| `spravne.ogg`, `spatne.ogg` | výsledek minihry a kola souboje | `jingles_PIZZA02.ogg`, `jingles_PIZZA01.ogg` | 85 Short music jingles, Kenney |
| `konec_kapitoly.ogg` | závěrečná obrazovka | `jingles_SAX02.ogg` | 85 Short music jingles, Kenney |
| `dvere.ogg` | náměstí ↔ vestibul, náměstí ↔ chaloupka | `doorOpen_1.ogg` | 50 RPG sound effects, Kenney |
| `razitko.ogg` | razítko v Komisi | `bookPlace2.ogg` | 50 RPG sound effects, Kenney |
| `klepani.ogg` | věřitelé buší na dveře (třikrát za sebou) | `chop.ogg` | 50 RPG sound effects, Kenney |
| `skluz.ogg`, `dopad.ogg` | skluz z bytu na náměstí | `minimize_005.ogg`, `bookPlace3.ogg` | Interface Sounds a 50 RPG sound effects, Kenney |
| `rozhlas.ogg` | hlášení městského rozhlasu | `question_001.ogg` | Interface Sounds, Kenney |
| `vytah.ogg` | jízda výtahem | `elevatording_0.ogg` | [Elevator ding](https://opengameart.org/content/elevator-ding), fvcalderan |
| `telefon.ogg` | telefonát v úvodu | `doorbell-old-tring.ogg` | [Doorbell ring](https://opengameart.org/content/doorbell-ring), Dub (nahrál qubodup) |
| `kocour.ogg` | kocour promluví | `Meow.ogg` | [Meow](https://opengameart.org/content/meow), IgnasD |

Balíčky Kenney: [Interface Sounds](https://opengameart.org/content/interface-sounds),
[50 RPG sound effects](https://opengameart.org/content/50-rpg-sound-effects),
[85 Short music jingles](https://opengameart.org/content/85-short-music-jingles). Všechno CC0.

Stažený balíček [202 More Sound Effects](https://opengameart.org/content/202-more-sound-effects)
(OwlishMedia, CC0) se nepoužil: soubory jsou jen očíslované a bez poslechu z nich nejde vybrat.

## Co chybí a co ověřit poslechem

- Klepání, razítko, skluz a rozhlas jsou náhradní zvuky vybrané podle názvu a délky (sekání do
  dřeva, položení knihy, klesající tón, dvojtón). Jestli sedí, ukáže až poslech.
- Znělky „správně“ a „špatně“ jsou vybrané podle toho, jestli melodie stoupá, nebo klesá.
- Kroky, telefonní budka a ruch náměstí zatím nejsou.
- Hudba a efekty nemají vlastní posuvníky hlasitosti, jen společný.
- Vlastní téma (D91) čeká na poslech: jestli je melodie líbivá, jestli nástroje nezní uměle
  a jestli tikot a šejkr nejsou moc výrazné.
