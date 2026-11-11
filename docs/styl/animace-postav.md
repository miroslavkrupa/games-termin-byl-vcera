# Animace postav: model a zadání

> Jak vyrobit animace postav přes ChatGPT tak, aby k sobě všechny seděly. Platí pro Rudu i další
> postavy (D41). Nahrazuje dílčí zadání [fází chůze](vzorky/zadani-faze-chuze.md).
> Stav: **schváleno a zapojeno u Rudy**, verze 1.1

## Princip

1. **Model postavy** (stání zepředu, z boku, zezadu) ve finálních proporcích je jediná předloha.
   Vzniká jako první a všechny animace se kreslí podle něj.
2. **Každá animace je samostatný obrázek** s fázemi v mřížce. Ne všechno najednou: v jednom obrázku
   by byla postava malá a rozmazaná a jedna chyba by znamenala začít znovu.
3. **Všechno ve stejné konverzaci ChatGPT.** Když se konverzace hodně protáhne (desítky obrázků),
   začni novou a nahraj do ní model.
4. **Ke každému zadání se připojí stejná pravidla** (níže). Hlídají to, co se zatím pokazilo:
   prohozené předměty mezi rukama, jiná velikost hlavy, jiné proporce.
5. **Jen animace, které hra opravdu potřebuje.** Skok, montáž a podobně až u scény, která je vyžaduje.

## Pravidla (připojit za každé zadání)

```
RULES: Draw exactly the same character as the model sheet earlier in this conversation. Same scale and proportions in every frame: the head is about one third of the total height, same body width, same leg length, same shoe size as the model sheet.
The props never switch hands: the coffee mug is always in the hand farther from the viewer and the clipboard always in the hand closer to the viewer, held the same way in every frame. In front view the mug is on the viewer's left and the clipboard on the viewer's right.
All frames in an even grid, read left to right and top to bottom, the feet of every frame on that row's baseline, figures never touching or overlapping.
Same line work, shading and colors as the model sheet. Transparent background, no ground, no shadows, no text, no numbers, no frame borders.
```

## Zadání

Všechny obrázky jsou na šířku (3:2). Ukládej do `docs/styl/vzorky/` jako `<postava>-<animace>_v01.png`,
další pokus `_v02`.

### 0. Model postavy (`ruda-model_v01.png`)

```
Draw the model sheet of this character: standing still in three views, front view, side view facing right, back view, left to right. Relaxed neutral pose, holding the coffee mug and the clipboard. Use exactly the proportions of the walk cycle frames from earlier in this conversation: head about one third of the total height, the same body width, leg length and shoe size.
```
+ pravidla

### 1. Chůze bokem, 12 fází (`ruda-chuze-bok_v02.png`)

```
Draw a walk cycle of this character in side view walking to the right: 12 frames in 3 rows of 4.
Frames 1-6 are one step with the near leg: 1 contact (near leg forward, heel touching), 2 down, 3 early passing, 4 passing, 5 up, 6 reaching forward. Frames 7-12 are the same step with the far leg.
Classic hand-drawn 2D adventure game animation: lively, slightly exaggerated, knees bend, arms swing opposite to the legs, hair and tie bounce a little. The head moves up and down only slightly, keep it at almost the same height in all frames.
```
+ pravidla

### 1b. Chůze bokem v03 (`ruda-chuze-bok_v03.png`)

Oprava v02: předměty skákaly mezi rukama dopředu a dozadu, obě poloviny cyklu vypadaly stejně
(jako by krokovala pořád jedna noha) a Ruda byl jinak vysoký a měl jiné vlasy než při stání.
Pokračuj ve stejné konverzaci jako stání a mluvení.

```
Redraw the side view walk cycle, 12 frames in 3 rows of 4, walking to the right, with these fixes:
1. Use the side view standing frames from the idle animation sheet as the exact reference: the same height when the legs pass each other, the same head size, the same hair shape and the same body width.
2. The two halves of the cycle must clearly differ: in frames 1-6 the leg closer to the viewer steps forward, in frames 7-12 the far leg steps forward. Draw the far leg and far arm slightly darker so the legs are easy to tell apart.
3. The arm with the mug and the arm with the clipboard stay almost still in front of the body in every frame, with only a very small swing. The mug and the clipboard never jump from front to back. Only the legs and the body move.
4. Frame 12 must flow smoothly back into frame 1 (seamless loop).
```
+ pravidla

Tmavší vzdálená noha (bod 2) ve hře rušila, proto ji zpracování zesvětlí
(`hra/nastroje/zesvetli_nohavice.gd`). U dalších postav bod 2 vynech nebo napiš
„the far leg only very slightly darker“.

### Sjednocení podle chůze (stání v2, mluvení v2, akce v2)

Chůze bokem v03 a chůze k divákovi a od diváka jsou nejpovedenější, proto jsou **nová hlavní
předloha**. Stání, mluvení a akce se překreslí podle nich, aby se při přechodu nelišily vlasy
a velikost hlavy. Do konverzace nahraj (nebo v ní už jsou) **`ruda-chuze-bok_v03.png`**
a **`ruda-chuze-predu_v01.png`** a před každé ze zadání 4, 5 a 6 vlož tuto větu:

```
Use the walk cycle sheets as the exact reference for the head, hair and body: copy the hair shape and every hair spike exactly from frame 1 of the side walk sheet (for side views) and frame 1 of the front walk sheet (for front views), with the same head size relative to the body and the same height when standing with feet together as the walk frames where the legs pass each other.
```

Ulož jako `ruda-stani_v02.png`, `ruda-mluveni_v02.png`, `ruda-akce_v02.png`. Stání zezadu bere hra
přímo z chůze od diváka, takže pohled zezadu se překreslovat nemusí.

### 2. Chůze k divákovi, 8 fází (`ruda-chuze-predu_v01.png`)

```
Draw a walk cycle of this character in front view walking toward the viewer, walking in place (the figure does not get bigger or move): 8 frames in 2 rows of 4. Frames 1-4 one step with his right leg, frames 5-8 with his left leg: contact, down, passing, up. Arms swing slightly, the head stays at almost the same height.
```
+ pravidla

### 3. Chůze od diváka, 8 fází (`ruda-chuze-zezadu_v01.png`)

```
Draw a walk cycle of this character in back view walking away from the viewer, walking in place (the figure does not get smaller or move): 8 frames in 2 rows of 4. Frames 1-4 one step with his right leg, frames 5-8 with his left leg: contact, down, passing, up. Arms swing slightly, the head stays at almost the same height.
```
+ pravidla

### 4. Stání, 2 × 4 fáze (`ruda-stani_v01.png`)

```
Draw an idle animation of this character standing still: 2 rows of 4 frames. Top row: side view facing right; bottom row: front view. A slow subtle loop: breathing, a small shift of weight, one blink, a tiny sip of coffee in one frame. The feet stay in place.
```
+ pravidla

### 5. Mluvení, 2 × 6 fází (`ruda-mluveni_v01.png`)

```
Draw a talking animation of this character: 2 rows of 6 frames. Top row: side view facing right; bottom row: front view. Different mouth shapes in each frame (closed, open, wide, round), lively eyebrows, and a self-confident gesture with the hand holding the mug. The feet stay in place.
```
+ pravidla

### 6. Sebrání a použití, 2 × 6 fází (`ruda-akce_v01.png`)

```
Draw two short actions of this character in side view facing right: 2 rows of 6 frames.
Top row: picking something up from the ground: he tucks the clipboard under his near arm, bends down, picks up a small object with the near hand and straightens up.
Bottom row: using something at hand height in front of him: he tucks the clipboard under his near arm, reaches forward with the near hand, does a short twisting motion and pulls the hand back.
The feet stay in place.
```
+ pravidla (u této animace se desky smí přesunout pod paži, jak říká zadání)

## Kontrola každého obrázku

- [ ] správný počet fází a mřížka, žádné dvě postavy se nedotýkají
- [ ] průhledné pozadí (na zeleném podkladu bez bílého lemu)
- [ ] hrnek i desky jsou ve všech fázích ve stejné ruce
- [ ] velikost hlavy a proporce jako na modelu
- [ ] žádná čísla, popisky ani podložka

Když něco nesedí, oprav to ve stejné konverzaci jednou větou, například:
*„In frames 3 to 6 the mug and the clipboard switched hands. Redraw the whole sheet with the mug always in the hand farther from the viewer.“*

## Zpracování (Claude)

1. `hra/nastroje/rozdel_casti.gd` rozřeže obrázek na fáze (po řádcích, zleva doprava).
2. `hra/nastroje/sestav_faze.gd` je zarovná (chodidla na jednu čáru, trup na jednu svislici)
   a u chůze změří krok, aby nohy neklouzaly.
3. Fáze se uloží do `hra/grafika/postavy/<postava>_<animace>/` a zapojí do hry.

Celé zpracování jedním příkazem (z každého listu vezme nejnovější verzi):

```bash
sh hra/nastroje/zpracuj_animace.sh ruda
```

## Stav u Rudy (2026-10-31)

| Animace | List | Ve hře | Poznámka |
|---|---|---|---|
| model | `ruda-model_v01` | ne (jen záloha) | jiné proporce než animace (poměr výška/hlava 3,5) |
| chůze bokem | `ruda-chuze-bok_v03` (12 fází) | ✅ | hlavní předloha pro vlasy a proporce |
| chůze k divákovi | `ruda-chuze-predu_v01` | ✅ | hlavní předloha zepředu |
| chůze od diváka | `ruda-chuze-zezadu_v01` | ✅ | fáze 2 slouží i jako stání a mluvení zezadu |
| stání | `ruda-stani_v02` | ✅ bokem (usrknutí), zepředu (mrknutí) | překresleno podle chůze |
| mluvení | `ruda-mluveni_v02` | ✅ bokem i zepředu, náhodné fáze úst | překresleno podle chůze |
| sebrání a použití | `ruda-akce_v02` | ✅ použití u kašny, budky, stánku a kartotéky; sebrání připravené | překresleno podle chůze; v sebrání je nakreslený šroubek |

**Proporce mezi listy** (poměr výšky postavy a šířky hlavy) jsou po překreslení podle chůze
skoro stejné: 2,8–3,0 u všech animací. Hra přesto každou sadu škáluje (`_meritko_sady`:
bokem a akce podle výšky, zepředu a zezadu podle průměru výšky a hlavy, `POMER_HLAVY = 2,9`),
aby drobné rozdíly mezi listy nebyly vidět.

## Mluvení vedlejších postav přes API (D89)

Vedlejší postavy stojí na místě, při řeči jim stačí hýbat pusou. Překreslení celého listu fází
(jako u Rudy) se u nich neosvědčilo: fáze k sobě seděly, ale postava vyšla jiná než schválená
(`vratny-mluveni_v01`). Používá se úprava schváleného obrázku:

1. `tools/grafika/usta.py predloha` složí list se třemi kopiemi stojícího obrázku na purpurové.
2. API (gpt-image-2, úprava obrázku) změní jen obličeje: ústa dokořán (A), malá kulatá (O),
   pootevřená se zuby (E). Zadání `<postava>-mluveni-uprava` v `tools/vzorky/zadani-kap1.json`.
3. `tools/grafika/usta.py sloz` vezme z každé kopie jen oblast obličeje, která se změnila,
   a vloží ji s měkkým okrajem do původního obrázku. Tělo je ve všech fázích na pixel stejné.
4. Fáze jsou v `hra/grafika/postavy/<postava>_mluveni/faze_01–03.png`, stejně velké jako stojící
   obrázek. Hra při řeči náhodně střídá tři fáze a zavřenou pusu (`hra/game/spolecne/usta.gd`).

Jedna postava stojí asi 0,05 USD. Hotovo u babičky, Báry, Frameworka, kocoura, Lumíra, Předsedy,
starosty, vrátného a Pana Změny.

**Výřezy z bílého pozadí:** Bára byla nakreslená na bílém pozadí a ve výřezu zůstaly zbytky
(stín pod botami, bílá mezi prameny vlasů). Dočištěno nástrojem `tools/grafika/docisti_vyrez.py`;
nehodí se pro postavy s bílou nebo šedou na obrysu (tenisky, šedé vlasy, cenovky).

## Chůze Báry přes API (D89)

Bára chodí jen v úseku, kde ji ovládá hráč (archiv). Listy vznikly přes API podle jejího
referenčního listu (`bara-list_v02`), každý 8 fází ve 2 řadách po 4 na purpurovém pozadí:
`bara-chuze-bok`, `bara-chuze-predu`, `bara-chuze-zezadu` (zadání v `tools/vzorky/zadani-kap1.json`).

```bash
sh tools/grafika/zpracuj_chuzi.sh bara <python s Pillow, numpy a scipy>
```

Skript list rozřeže (`rozrez_list.py`), u chůze bokem přebarví červené šmouhy na nohavici, které
model přidal do fází 3 a 4 (`odbarvi_skvrny.py`), a fáze zarovná a změří krok (`sestav_faze.gd`).

- Stání zepředu a mluvení zůstává schválený obrázek s fázemi úst; stání bokem a zezadu je
  nehybná fáze chůze.
- Chůze má 8 fází (Ruda 12), střídají se tedy pomaleji. Když to bude ve hře působit trhaně,
  dá se list bokem vygenerovat znovu s 12 fázemi.
- Ruda i Bára používají společný skript `hra/game/spolecne/postava_faze.gd`; postava v něm
  nastaví jen cestu k sadám, výšku a poměr hlavy.

## Ruda v malířském stylu přes API (D92)

Ruda z ChatGPT měl plošší stínování a světlejší barvy než vedlejší postavy z gpt-image-2 a ve
scéně působil jako z jiné hry. Animace (počet fází, pózy, zarovnání) ale byly odladěné, proto
se nekreslily znovu, jen se **přemalovaly**:

1. Schválený vzor stylu: `ruda-novy-styl_v01` (tři pohledy, přemalovaný model podle vrátného,
   Báry a starosty).
2. `tools/grafika/ruda_listy.py listy` složí z fází ve hře listy na purpurovém pozadí, každá fáze
   v buňce 512 × 512 (chůze bokem 12 fází, zepředu 8, zezadu 8, stání 4 + 4, akce 6 + 6).
3. API dostane list a vzor stylu se zadáním „přemaluj, pózy a místa nech“ (vzorky `ruda-styl-*`).
   Model pózy i pozice dodržel, takže chůze bokem má dál 12 fází a stejný rytmus kroku.
4. `sh tools/grafika/zpracuj_rudu.sh <python>` listy rozřeže podle mřížky a zarovná
   (`sestav_faze.gd`), model vezme ze vzoru stylu.

**Mluvení** už není samostatný list: tělo je při řeči na pixel stejné jako při stání a mění se
jen obličej a ruka s hrnkem. `tools/grafika/ruda_mluveni.py` složí z první fáze stání list tří
kopií, API ho upraví dvakrát (jen ústa A, O, E; jen ruka s hrnkem: dole, výš, u hrudi) a z obou
úprav se vezmou jen změněné oblasti. Bokem vznikne 8 fází (hrnek dole a výš × ústa zavřená, A, O, E),
zepředu 9 (tři výšky hrnku × A, O, E; zavřená ústa tam chybí, protože model u otevřených zvedl
obočí a to by při řeči poskakovalo). Hra střídá ústa rychle uvnitř jednoho gesta a gesto mění
po 0,9–2,4 s o jeden stupeň (`postava_faze.gd`; velikost skupiny je ve `faze.json` sady).

Z listu úst se bere jen obličej (pleť s očima, obočím a ústy) a kousek pod bradou, ne vlasy:
model při úpravě přemaluje celou hlavu a vlasy by se při řeči vlnily (D93). Místa, která se
nezměnila, zůstávají na pixel stejná jako stojící fáze.

Původní listy z ChatGPT (`ruda-chuze-bok_v03` atd.) a skript `hra/nastroje/zpracuj_animace.sh`
zůstávají jako záloha; ve hře jsou sady z listů `ruda-styl-*`.

## Jak to hra používá

- **Pohled** podle směru: při chůzi podle směru pohybu (bokem, kdykoli jde aspoň trochu do strany),
  při stání a mluvení podle toho, kam se Ruda naposledy otočil (Popochiu `_looking_dir`;
  aktivní místa mají `look_at_point` v těžišti obrysu).
- **Chůze** se přepíná podle ušlé vzdálenosti (bokem podle změřeného kroku, obrázek během fáze
  stojí); stání podle času (dlouhá klidová fáze a krátký pohyb); mluvení náhodnými fázemi úst.
- **Akce:** `await C.player.animuj_akci("pouziti")` nebo `"zvednuti"` v kódu aktivního místa.
