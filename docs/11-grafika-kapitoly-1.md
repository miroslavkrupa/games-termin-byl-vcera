# Grafika kapitoly 1 (F2): seznam a zadání

> Všechna grafika, kterou kapitola 1 potřebuje, s hotovými zadáními pro ChatGPT. Pořadí je
> doporučené: nejdřív se ověří postup pro široká pozadí, pak pozadí, postavy a ikony.
> Obrázky se ukládají do `docs/styl/vzorky/` (`<název>_v01.png`, další pokus `_v02`), Claude je
> zhodnotí a zpracuje do hry. Stav: **připraveno k výrobě**, verze 1.0

## Postup v ChatGPT

- **Jedna konverzace na jednu skupinu** (pozadí, postavy, ikony). V delší konverzaci se styl
  drží lépe, při desítkách obrázků začni novou a nahraj do ní předlohy znovu.
- **Předlohy nahraj na začátku konverzace:**
  - pozadí: `a-namesti_v03.png` a `a-archiv_v02.png` (exteriér a interiér);
  - postavy a ikony: `ruda-stoji_v01.png` (předloha stylu i velikosti: Ruda zepředu, z boku
    a zezadu ve stylu animací; starší `ruda-list_v03` je jemnější a vyšší, než jak Ruda vypadá ve hře).
- **Formát:** pozadí na šířku 3:2, postavy na šířku 3:2, ikony čtvercové.
- **Kontrola každého obrázku:** [kontrolní seznam ve stylové bibli](06-stylova-bible.md#kontrolní-seznam-pro-každý-obrázek);
  u postav navíc průhledné pozadí.

## Krok 1: zkouška širokého pozadí (náměstí)

Pozadí mají být 19,5:9 (D49). ChatGPT kreslí nativně jen 3:2, proto nejdřív zkouška na náměstí.
Do nové konverzace nahraj **`a-namesti_v03.png`** a vlož:

```
Extend this background image to the left and to the right to a 19.5:9 aspect ratio (2218 × 1024 pixels). Keep the original image exactly unchanged in the center. Continue the same street, buildings, pavement and sky naturally into the new side areas, with the same style, colors, lighting, perspective and horizon line. Put nothing important in the new side areas: no doors, no characters, no text.
```

Ulož jako `a-namesti-siroke_v01.png`.

**Večer až potom, podle denního rozšíření:** okraje se musí shodovat, jinak by se při setmění
domy po stranách proměnily. Ve stejné konverzaci nahraj **`c-namesti-vecer_v03.png`** a vlož:

```
This is the evening version of the same square. Extend it to the left and to the right exactly like the wide daytime image you just made: the same buildings, objects and shapes in the new side areas, in the same places, only in the evening colors and lighting of this image (dusk sky, glowing windows, orange light from the comet). Keep the original evening image exactly unchanged in the center. 19.5:9 aspect ratio (2218 × 1024 pixels), no text.
```

Ulož jako `c-namesti-vecer-siroke_v01.png`. Stejně se postupuje u každého pozadí s večerní verzí:
nejdřív den, pak večer podle něj.

- **Když vrátí široký obrázek** se zachovaným středem: postup platí a stejně se rozšíří
  i archiv a ostatní pozadí.
- **Když vrátí zase 3:2** (střed zmenšený): Claude obrázek ořízne nahoře a dole na 19,5:9 a zvětší.
  Pak je lepší kreslit další pozadí rovnou s rezervou nahoře a dole (věta v kroku 2).

## Krok 2: pozadí (4 nová + archiv)

Před každé zadání patří šablona pozadí A ze [stylové bible](06-stylova-bible.md#šablona-zadání-pozadí-varianta-a)
(je tu vložená celá). Za popis scény vždy platí: **důležité věci uprostřed, okraje volné**.

```
2D cartoon background for a classic point-and-click comedy adventure game, caricature style,
<POPIS SCÉNY>,
warm muted palette of ochre, rust and faded teal with yellow construction accents,
contemporary run-down Central European small town setting, simplified exaggerated shapes,
buildings leaning and bulging in different directions, nothing is straight,
bold thick dark-brown outlines around every object,
flat colors with simple soft shading and subtle hand-painted texture, moderate amount of detail,
clear open walkable floor in the lower third of the image, main objects large and easy to read,
all important objects in the central two thirds of the image, the left and right edges are quiet,
flat even ground plane, no fisheye lens distortion, only the objects are crooked,
consistent believable perspective with a single horizon line, doors sized for a human figure,
not realistic, no gothic architecture, no medieval castles,
no text, no letters, no logos, no people
Match the drawing style, line work and coloring of the reference images exactly.
```

| Soubor | Scéna | `<POPIS SCÉNY>` |
|---|---|---|
| `a-vestibul_v01.png` | S2 Vestibul radnice | `the shabby entrance hall of a crooked town hall, an old elevator with brass doors and a dial floor indicator that has half floors, a staircase in the background blocked with red and white barrier tape and a sawhorse, a porter's booth with a small glass window and a sleepy lamp on the left, peeling paint, indoor scaffolding along one wall, an empty notice board, a dusty rubber plant` |
| `a-pracovna_v01.png` | S4 Starostova pracovna | `the mayor's office on the second floor, a huge polished desk with a nameplate without letters, framed newspaper front pages with only pictures, giant ceremonial ribbon-cutting scissors on the wall, a red carpet path from the door to the desk, flags in stands, a big window showing the comet in the sky, a camera tripod in the corner ready for press photos` |
| `a-komise_v01.png` | S5 Kancelář Komise | `the committee office on the half floor, a long zigzag queue lane made of stanchions and ropes that winds back and forth, a row of service counters with closed shutters, towers of stamped paperwork, rubber stamps on hooks, a big wall clock, at the back an elevated desk on a podium like a judge's bench, low ceiling, flickering tube lights` |
| `a-chaloupka_v01.png` | S6 Babiččina chaloupka | `a small, neat, perfectly finished old cottage with a tidy vegetable garden and a picket fence, the only finished and well kept building in town, directly under a huge straight concrete launch ramp that towers above it from the right, construction debris stops exactly at the garden fence, a bench by the door, washing on a line, flowers in the windows` |
| `a-archiv-siroke_v01.png` | S3 Archiv | rozšíření schváleného `a-archiv_v02.png` zadáním z kroku 1 |

Večerní verze (paleta C) zatím jen u náměstí; další jen tam, kde to bude chtít příběh.

## Krok 3: referenční listy postav (7 + kocour)

Nová konverzace, nahraj **`ruda-stoji_v01.png`**. Každý list je model postavy podle [animací
postav](styl/animace-postav.md) (D41): zepředu, z boku, zezadu. Postavy jsou vedlejší, chodí
málo, takže z animací budou potřebovat hlavně stání a mluvení (vyrobí se v F3).

```
Draw the model sheet of a new character for the same game: standing still in three views, front view, side view facing right, back view, left to right, evenly spaced, not touching.
<POPIS POSTAVY>
Draw him or her at the same scale as the character on the reference sheet: <VÝŠKA>.
Match the drawing style, line work, shading and coloring of the reference sheet exactly, but do not include the character from it.
Classic point-and-click comedy adventure caricature style, exaggerated cartoon proportions, bold thick dark-brown ink outlines, flat colors with soft cel shading, warm muted palette of ochre, rust and faded teal.
Transparent background, no ground, no shadows, no text, no letters, no numbers.
```

| Soubor | Postava | `<POPIS POSTAVY>` | `<VÝŠKA>` |
|---|---|---|---|
| `predseda-list_v01.png` | Předseda Věčný | `The Chairman of the Committee for Approving Committees: a tall, thin, elderly bureaucrat in a slightly too large grey three-piece suit, a long narrow face with a calm, patient, grandfatherly smile, neatly combed grey hair, small round glasses, a watch chain, a large wooden rubber stamp hanging from his belt like a sheriff's badge, hands folded. He looks kind and harmless at first glance, only his eyes are a little too calm.` | `about a head taller than the reference character` |
| `starosta-list_v01.png` | starosta Bohumil | `The town mayor: a short, round, red-cheeked man with a shiny bald head and a few strands combed over, a big smile made for cameras, a brown suit with a mayoral chain and a ribbon sash, a rolled-up newspaper under one arm, giant ceremonial scissors in the other hand.` | `about a head shorter than the reference character, and much wider` |
| `zmena-list_v01.png` | Pan Změna | `A restless market stall vendor who changes his mind every minute: skinny, wild eyebrows, a flat cap worn sideways, a striped apron full of price tags, three pencils behind his ears, two different shoes, one hand raised mid-gesture as if he just had a new idea.` | `the same height as the reference character` |
| `lumir-list_v01.png` | archivář Lumír | `A monotonous town archivist who is quietly proud of cataloguing every failed project: pale, very neat, thick glasses, a grey cardigan with black sleeve protectors, a pencil behind the ear, holding a long wooden box of index cards with both hands, a small proud smile.` | `the same height as the reference character, but slimmer` |
| `babicka-list_v01.png` | babička Pozemková | `A tiny but sturdy old village grandmother who owns the land under the launch ramp: a flowered headscarf, a blue apron over a knitted cardigan, rubber boots, a garden fork in one hand, sharp clever eyes and a kind but stubborn face.` | `about two thirds of the height of the reference character` |
| `vratny-list_v01.png` | vrátný | `The sleepy town hall porter: a heavy middle-aged man with a big moustache, a uniform cap and a faded uniform jacket with brass buttons, holding a thermos flask and a folded crossword newspaper, half-closed eyes.` | `the same height as the reference character, but wider` |
| `framework-list_v01.png` | Ing. Framework | `A slick methodology consultant: a shiny blue suit with white sneakers, a headset microphone, a conference lanyard, a big smile, carrying an open suitcase stuffed with colourful boxes of different sizes.` | `slightly taller than the reference character` |
| `kocour-list_v01.png` | kocour babičky | `The grandmother's cat: a fat ginger tomcat with one torn ear and a deeply judgmental expression, sitting upright like he owns the place.` (nahradit „three views…“ za „three poses: sitting front view, sitting side view, walking side view“) | `about knee high to the reference character` |

Ruda a Bára mají listy hotové (D30); Bářiny animace přijdou s hratelným úsekem za Báru v I5.

## Krok 4: ikony předmětů (2 listy)

Nová konverzace (nebo konverzace s postavami), nahraj **`ruda-stoji_v01.png`**.

```
Draw a sheet of inventory item icons for the same point-and-click adventure game: <POČET> separate objects in an even grid of <MŘÍŽKA>, each object centered in its cell, large and easy to read at small size, slightly tilted three-quarter view, all at a similar size, objects never touching.
Match the drawing style, line work, shading and coloring of the reference sheet exactly, but do not include the character from it.
Bold thick dark-brown outlines, flat colors with soft cel shading, warm muted palette.
Transparent background, no shadows, no text, no letters, no numbers.
Objects, left to right, top to bottom: <SEZNAM>.
```

| Soubor | `<POČET>`, `<MŘÍŽKA>` | `<SEZNAM>` |
|---|---|---|
| `ikony-1_v01.png` | `9`, `3 rows of 3` | `1 an official certificate with a big brown coffee stain over its middle, 2 a white coffee mug with steam, 3 a cheap ballpoint pen, 4 the same pen dripping with brown coffee instead of ink, 5 a thick old talking book with a face on the cover and a bookmark like a tongue, 6 an old rolled-up poster of a rusty rocket ship, 7 a small sheet of paper with a scribbled signature, 8 an old elevator button with a large number two, 9 a yellowed folded document tied with a string` |
| `ikony-2_v01.png` | `8`, `2 rows of 4` | `1 an index card with a drawing of a broken bridge, 2 an old land registry map with a plot marked in red, 3 a rubber stamp ink pad in a tin box, 4 a document with a large wax seal and signature, 5 a one-page charter with boxes and a stamp, 6 a big old iron hangar key on a ring, 7 a yellow folding measuring rule, 8 a long old list on yellowed paper with many lines` |

Pořadí ikon: 1 dekret politý kávou, 2 hrnek kávy, 3 propiska bez inkoustu, 4 kávové pero,
5 Prof. Pembok, 6 plakát Archy, 7 podepsaný požadavek Pana Změny, 8 tlačítko „2“, 9 původní zadání
Archy; 10 karta poučení (most 1974), 11 katastrální mapa, 12 razítková poduška, 13 podpis sponzora,
14 charter, 15 klíč od hangáru, 16 Bářin metr, 17 seznam pasažérů.

## Krok 5: doplnění přes API (D89)

Zbylou grafiku kapitoly 1 generuje Claude přes OpenAI API (gpt-image-2). Zadání jsou
v `tools/vzorky/zadani-kap1.json`, předlohy v `tools/vzorky/predlohy/`:

```bash
python3 tools/generuj_vzorky.py --spec tools/vzorky/zadani-kap1.json --klic <NÁZEV_KLÍČE> --only <id>
```

- **Pozadí** (`a-byt-siroke`): model dostane rozvrženou skicu (co kde je) a dvě schválená pozadí
  jako vzor stylu a perspektivy, rozměr 2224 × 1024, do hry se ořízne na 2218 × 1024. Zadání musí
  říct, že skica určuje jen rozmístění; jinak model okopíruje i její plochý pohled (v01).
- **Kulisy** (`byt-kulisy`, `vestibul-kulisy`): na jednolitém purpurovém pozadí, vyříznutí
  `tools/grafika/vyrez.py`. Panel výtahu s tlačítkem 2 je složený z tlačítka 1, aby se při
  zapojení změnilo jen to jedno tlačítko. Cedule archivu má piktogram místo nápisu (žádný text,
  funguje i v angličtině).
- **Rozhraní** (`gui-prvky`): jeden list se šesti prázdnými prvky (papír na kartonu, lístek,
  zapuštěné pole, rezavý a petrolejový smaltovaný štítek, malé tlačítko). `tools/grafika/gui_prvky.py`
  je uloží do `hra/grafika/gui/`, hra je roztahuje jako devítidílné textury
  (`Styl.malovany` a `Styl.podle_barvy` v `hra/game/obrazovky/styl.gd`). Minihry a obrazovky dál
  říkají jen barvu (papír, lístek, rez), vzhled se mění na jednom místě.
- **Mluvení postav** (`<postava>-mluveni-uprava`): postup v [animacích postav](styl/animace-postav.md#mluvení-vedlejších-postav-přes-api-d89).

## Stav

| Krok | Soubory | Stav |
|---|---|---|
| 1 | `a-namesti-siroke`, `c-namesti-vecer-siroke` | ☑ hotovo, [hodnocení](styl/vzorky/hodnoceni-pozadi-kap1.md) |
| 2 | `a-vestibul`, `a-pracovna`, `a-komise`, `a-chaloupka`, `a-archiv-siroke` | ☑ hotovo, [hodnocení](styl/vzorky/hodnoceni-pozadi-kap1.md) |
| 3 | 7 listů postav + kocour | ☑ hotovo, [hodnocení](styl/vzorky/hodnoceni-postavy-ikony-kap1.md) |
| 4 | `ikony-1`, `ikony-2` | ☑ hotovo, [hodnocení](styl/vzorky/hodnoceni-postavy-ikony-kap1.md) |
| 5 | `a-byt-siroke` (v02), `byt-kulisy`, `vestibul-kulisy` | ☑ ve hře (D89) |
| 5 | mluvení 9 vedlejších postav (`<postava>-mluveni-uprava`) | ☑ ve hře (D89) |
| 5 | chůze Báry (`bara-chuze-bok`, `-predu`, `-zezadu`) | ☑ ve hře (D89) |
| 5 | malované prvky rozhraní (`gui-prvky`): okna miniher, karta kapitoly, tlačítka menu | ☑ ve hře (D89) |
| 6 | dokreslení pozadí (`vestibul-schody-podlaha`, `komise-vytah-prepazka`, `pracovna-vytah`), amplion (`namesti-amplion`) | ☑ ve hře (D92) |
| 6 | lišta a okna šablony v malovaném stylu, ikony nápovědy myši | ☑ ve hře (D92) |
| 6 | Ruda v malířském stylu ostatních postav (`ruda-novy-styl`, `ruda-styl-*`, `ruda-mluveni-*`) | ☑ ve hře (D92): chůze, stání, akce, mluvení s gesty |
| 7 | široký archiv (`archiv-rozsireni`), stojací ukazatel k archivu, kocour (`kocour-novy-styl`, `kocour-mluveni-uprava` v02) | ☑ ve hře (D93) |
| 7 | ikony: šlápoty u východů, tlačítko deníku, značka aktivního místa (`tools/grafika/gui_ikony.py`) | ☑ ve hře (D93) |
| 8 | plot u chaloupky jako popředí, poduška na lavičce, krabička Poučení (`archiv-krabicka-pouceni`) | ☑ ve hře (D94, D95) |
| – | zvuky a hudba | ☑ zapojeno, čeká na poslech ([zvuk](15-zvuk.md), D90, D91) |
