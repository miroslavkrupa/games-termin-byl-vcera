# Stylová bible

> Jak má hra vypadat. Zadání pro AI dnes a pro ilustrátora později: kdo obrázek vyrábí, musí
> podle tohoto dokumentu trefit stejný styl.
> Stav: **schváleno** (D21): varianta A jako hlavní styl, C pro večerní a krizové scény, verze 0.2

## Směr: ručně malovaná komiksová 2D adventura

Inspirací je *Deponia* (D20). Nekopírujeme ji, přebíráme vlastnosti jejího vizuálu a přenášíme je
do našeho světa: místo planety ze šrotu je tu město věčných staveb, lešení a jeřábů.

### Co dělá vizuál Deponie a co si bereme

| Vlastnost | Jak ji použijeme my |
|---|---|
| ručně kreslené, digitálně malované pozadí | malované pozadí s viditelným tahem štětce, žádné 3D ani pixel art (pixel art vyzkoušen a zamítnut, D88) |
| výrazná tmavá obrysová linka s proměnlivou tloušťkou | tmavě hnědá (ne černá) linka, silnější na obrysech, tenčí uvnitř |
| přehnané proporce postav | velké hlavy, dlouhé končetiny, výrazné nosy a ruce |
| přeplněné, detailní prostředí | každá scéna plná rozestavěných věcí, lešení, cedulí, provizorií |
| nic není rovné | budovy se kroutí, perspektiva je mírně opilá, lešení se prohýbá |
| teplá zemitá paleta s barevnými akcenty | rez, okr, vybledlá tyrkysová; akcenty ve žluté výstražné barvě stavby |
| hloubka vzduchem | vzdálené plány světlejší a modřejší, popředí tmavé a sytější |
| komiksová mimika | velké oči a obočí, výrazy čitelné i na mobilu |

### Náš vlastní podpis

- **Motiv nedokončenosti:** lešení, jeřáby, výstražné pásky, cedule „Fáze 2“, kužely, plachty.
  Je to vizuální vtip, který nese téma hry.
- **Kometa Deadline** je na obloze v každé venkovní scéně a s postupem hry se zvětšuje.
  Hráč tak vidí čas bez jakéhokoli ukazatele.
- **Žlutá výstražná barva** stavby je vyhrazená pro důležité věci (aktivní předměty, akcenty,
  Archa). Nepoužívat ji na nedůležité pozadí.
  Z postav ji nosí jen Ruda a Bára (žluté ponožky, D31): tichý symbol, že Archu dokončí právě oni.

### Doba a místo (D28)

**Současné zanedbané středoevropské maloměsto.** Staré domy se mísí s nedostavěnými šedými
paneláky, radnice ze 70. let je obalená lešením. Technika z let 1970–2000: tlačítkové výtahy,
telefonní budky, otočné telefony, zářivky, starý autobus. Postavy přitom normálně používají
tablet a kávu z hrnku: doba je současná, jen město se zaseklo ve „fázi 2“.
- **Ano:** paneláky, lešení, zrezivělé zábradlí, kašna bez vody, plechové cedule, jeřáby.
- **Ne:** gotika, hrady, středověk, fantasy, středomořská krajina, futuristické sci-fi.

### Archa (D29)

**Stará rezavá loď, ke které někdo přidělal raketové motory, křídla a anténu.** Leží na betonové
startovací rampě za městem, záplatovaná plachtami. Absurdní a okamžitě čitelná: „loď, která má
letět“. S postupem hry se na ní přibývá hotových částí (motory, okna kajut, nátěr), takže hráč
vidí pokrok stavby.

**Rampa je jediná rovná stavba ve městě** (D34). Postavili ji podle výkresů, je to stavba světa
plánu: přesná, rovná, s čistými hranami. Všechno kolem (bedny, lešení, boudy, město v dálce)
se kroutí jako zbytek Nedostavěnice. Kontrast je záměrný a nese koncepci [Dva světy, jedna
Archa](07-dva-svety.md). Výjimka z pravidla „nic není rovné“ platí jen pro rampu.

## Pravidla

### Linka
- Barva obrysu: tmavě hnědá až skoro černá, nikdy čistě černá.
- Tloušťka: vnější obrys postav 2–3× silnější než vnitřní kresba. Pozadí tenčí linka než postavy,
  aby postavy vystupovaly.
- Linka mírně roztřesená, ručně kreslená. Žádné dokonale rovné vektorové čáry.

### Barvy
- Paleta podle schválené varianty (viz níže), 5–7 základních barev scény + akcent.
- Postavy sytější a kontrastnější než pozadí, aby byly čitelné.
- Aktivní místa se nesmějí poznávat jen podle barvy (přístupnost); hra má tlačítko
  „ukaž aktivní místa“.

### Proporce postav
- Hlava zhruba 1/4 výšky postavy (komiksové zkreslení), u Rudy ještě o kus větší.
- Siluety musí být rozpoznatelné i jako černý stín: každá hlavní postava má jiný tvar
  (Ruda dlouhý a hubený, Bára menší a pevná, Předseda široký a hranatý).

### Prostředí
- Rozlišení scén 1920 × 1080, scény mohou být širší kvůli posouvání.
- Vrstvy: pozadí, střední plán, pochozí plocha, popředí (pro parallax a překrývání postav).
  ❓ Prototyp zatím nevyzkoušel, jak postava zajde za předmět. Před výrobou pozadí kapitoly 1
  rozhodnout, jestli se popředí generuje zvlášť, nebo vyřezává z pozadí.
- **Věrohodná perspektiva:** AI pozadí mívají přehnanou a nekonzistentní perspektivu, takže
  zmenšování postav do hloubky nesedí (prototyp, K1). Horizont a velikost dveří mají odpovídat
  postavě v popředí.
- ❓ **Poměr stran:** doporučeno širší pozadí (19,5:9) s důležitým obsahem v prostředním pásu 3:2
  ([vyhodnocení prototypu](09-vyhodnoceni-prototypu.md)).
- Žádný text v obrázcích. Cedule mají prázdné plochy, nápisy dodá engine v obou jazycích.
- Na mobilu musí být důležité objekty čitelné: nic důležitého menšího než zhruba 48 px v plném rozlišení.
- **Výjimka:** startovací rampa je rovná (D34), viz Archa výše.
- **Křiví se předměty, ne objektiv** (D33): budovy, lešení a nábytek se naklánějí, ale podlaha
  je rovná rovina bez efektu rybího oka. Postavy se při chůzi do hloubky zmenšují podle roviny
  podlahy a na prohnuté dlažbě by to vypadalo divně.
- **Postavy nesou denní světlo.** Do jiného světla scény (večer, noc, krize) je ladí engine
  tónováním a měkkým stínem pod nohama, viz [produkční zásady](05-produkce.md). Noční verze
  postav se nekreslí.

### Animace
- Postavy po částech (hlava, trup, ruce, nohy) pro kostrovou animaci.
- Výrazy tváře jako samostatné vrstvy (5–8 výrazů na hlavní postavu).

## Tři varianty ke schválení

Všechny tři dodržují pravidla výše, liší se paletou, náladou a sytostí. Vizuální porovnání je
v [ukázkách](styl/ukazky.html) (otevři v prohlížeči).

| | A: Rezavá Nedostavěnice | B: Slunné lešení | C: Soumrak termínu |
|---|---|---|---|
| **Nálada** | nejblíž Deponii: zaprášená, teplá, trochu zchátralá | veselejší, světlejší, rodinná | dramatická, večerní, kometa svítí |
| **Paleta** | okr, rez, vybledlá tyrkysová, olivová | sytá modrá obloha, terakota, svěží zelená | fialová, oranžová, tmavě modrá |
| **Kontrast** | střední | nízký až střední | vysoký |
| **Riziko** | při špatném zpracování může působit špinavě | méně osobitá, blíž běžným mobilním hrám | těžší čitelnost v tmavých scénách a na mobilu |
| **Rozhodnutí** | ✅ hlavní styl | – | ✅ večerní a krizové scény (kap. 4) |

✅ **Schváleno (D21): A jako hlavní styl, C pro večerní a krizové scény.** Kapitola 4 tak bude
vizuálně temnější, aniž by se změnil styl. Varianta B se nepoužívá.

### Kdy použít paletu C
- večerní a noční scény v kterékoli kapitole,
- krizové scény, hlavně celá kapitola 4 a řídicí věž,
- přechod mezi A a C může být plynulý (soumrak) a sám o sobě signalizovat, že se blíží potíže.

## Výroba obrázků přes AI

### Zásady
- **Nikdy nejmenovat cizí hru, studio ani výtvarníky v zadání.** Popisujeme vlastnosti stylu.
  Je to fér vůči autorům, bezpečnější z hlediska autorských práv a výsledek je víc náš.
- Nejdřív **referenční listy postav** (zepředu, z boku, zezadu, výrazy). Teprve s nimi
  generovat scény s postavami. Bez listů nebudou postavy konzistentní.
- Pozadí generovat **bez postav**. Postavy se vkládají v enginu.
- Každý vygenerovaný obrázek projde ruční úpravou: srovnat paletu, sjednotit linku, odstranit
  nesmysly (AI ráda přidá text, prsty navíc, nelogickou architekturu).
- Zaznamenat nástroj a zadání u každého finálního obrázku (Steam vyžaduje uvést použití AI).

Šablony prošly prvním kolem vzorků ([hodnocení kola 1](styl/vzorky/hodnoceni-kolo-1.md)).
Malířské stínování a bohaté detaily přebíjely linku, proto je zadání posunuté ke komiksu.
Úplná aktuální zadání jsou v `tools/vzorky/zadani.json`.

### Šablona zadání: pozadí (varianta A)

```
2D cartoon background for a classic point-and-click comedy adventure game, caricature style,
<popis scény>,
warm muted palette of ochre, rust and faded teal with yellow construction accents,
contemporary run-down Central European small town setting, simplified exaggerated shapes,
buildings leaning and bulging in different directions, nothing is straight,
bold thick dark-brown outlines around every object,
flat colors with simple soft shading and subtle hand-painted texture, moderate amount of detail,
clear open walkable floor in the lower third of the image, main objects large and easy to read,
flat even ground plane, no fisheye lens distortion, only the objects are crooked,
consistent believable perspective with a single horizon line, doors sized for a human figure,
not realistic, no gothic architecture, no medieval castles,
no text, no letters, no logos, no people
```

### Formát pozadí a popředí (D49, D50)

- **Pozadí je široké 19,5:9 (2218 × 1024 px).** Všechno důležité (aktivní místa, cesty, postavy)
  leží v **pásu 3:2 uprostřed** (1536 × 1024, od x = 341). Okraje vlevo a vpravo jen dokreslují
  scénu pro široké telefony a monitory; na obrazovce 3:2 nejsou vidět. Hra drží záběr uprostřed
  (`hra/game/zaber.gd`), u obrazovky 4:3 zůstanou nahoře a dole černé pruhy.
- **Rozšíření hotového obrázku 3:2** v ChatGPT (ve stejné konverzaci jako pozadí, nebo s nahraným
  obrázkem):

```
Extend this background image to the left and to the right to a 19.5:9 aspect ratio (2218 × 1024 pixels). Keep the original image exactly unchanged in the center. Continue the same street, buildings, pavement and sky naturally into the new side areas, with the same style, colors, lighting, perspective and horizon line. Put nothing important in the new side areas: no doors, no characters, no text.
```

  Ulož jako `<scéna>-siroke_vNN.png`. Pokud ChatGPT střed přesto pozmění, vloží se doprostřed
  původní obrázek 3:2, aby aktivní místa seděla (nástroj na to vznikne s prvním rozšířeným pozadím).
- **Popředí** (předmět, za který může postava zajít, např. kašna) se z pozadí vyřízne nástrojem
  `hra/nastroje/vyrez_popredi.gd` podle obrysu a vloží jako kulisa (prop) se `baseline` na hraně,
  za kterou postava mizí, a s `obstacle_polygon` půdorysu, který postava obchází. Pochozí cesty
  za popředím jen tam, kde předmět postavu nezakryje celou (nižší než asi polovina postavy).
  Oblast se zmenšováním do hloubky musí pokrývat **celou** pochozí plochu: mimo ni Popochiu vrátí
  postavě plnou velikost (při zkoušce Ruda za kašnou náhle vyrostl).

### Šablona zadání: referenční list postavy

```
full-body character turnaround sheet, front view, side view and back view of the same character,
<popis postavy včetně velikosti hlavy>,
warm muted palette of ochre, rust and faded teal with yellow construction accents,
classic point-and-click comedy adventure caricature style, exaggerated cartoon proportions,
bold thick dark-brown ink outlines with varying line weight, flat colors with soft cel shading,
neutral standing pose, plain white background, no text, no letters
```

### Předloha stylu

Rudův referenční list stylem sedí nejlépe, proto slouží jako **předloha stylu** pro ostatní
obrázky. Do zadání se přidá věta:

```
Match the drawing style, line work and coloring of the reference image exactly,
but do not include the character from it.
```

V ChatGPT se list nahraje do konverzace, ve skriptu se uvede v poli `reference`.

Pro variantu C se mění jen řádek s paletou:
- **C:** `dramatic dusk palette, purple and deep blue sky, orange glow from the comet, strong contrast`

## Automatické generování (D27)

Vzorky se generují přes **OpenAI Images API** skriptem `tools/generuj_vzorky.py`. Zadání jsou
v `tools/vzorky/zadani.json`: společný začátek a konec podle typu (pozadí / postava), palety A a C
a seznam vzorků. Ladí se úpravou tohoto souboru, ne ručním přepisováním promptů.

```bash
python3 tools/generuj_vzorky.py --dry-run
```

Suchý běh vypíše zadání a odhad ceny, nic negeneruje. Bez `--dry-run` skript obrázky vygeneruje
a uloží do `docs/styl/vzorky/` jako `<id>_v01.png`, `<id>_v02.png`… Další volby: `--only <id>`
(jen vybrané vzorky), `--quality low|medium|high`, `--model <model>`.

Novější model gpt-image-2 umí vlastní rozměr (např. 2224 × 1024), ale neumí průhledné pozadí:
postavy se pak kreslí na jednolitou barvu a vyříznou se (D88).

Vzorek s polem `"reference"` (seznam obrázků) se generuje podle předlohy, například scéna
s Rudou podle jeho schváleného referenčního listu. Tím se drží konzistence postav.

### Jak získat a nastavit API klíč

Předplatné ChatGPT **nezahrnuje** přístup k API. API se platí zvlášť, předplacenými kredity.

1. Přihlas se na **platform.openai.com** (stejný účet jako ChatGPT).
2. V **Settings → Billing** přidej platební kartu a dobij kredit (stačí minimum, na vzorky
   vystačí pár dolarů). Nastav si tam i **limit útraty**.
3. Pokud API při prvním generování ohlásí, že model vyžaduje ověření organizace, udělej ho
   v **Settings → Organization → General** (ověření totožnosti, trvá pár minut).
4. V **API keys** vytvoř nový tajný klíč a zkopíruj ho (zobrazí se jen jednou).
5. V kořeni projektu vytvoř soubor `.env` s jediným řádkem `OPENAI_API_KEY=` a za rovnítko
   vlož klíč. Soubor je v `.gitignore`, do gitu se nedostane.
6. Klíč nikdy nevkládej do chatu ani do jiných souborů.

## Schválené reference

| Co | Soubor | Použití |
|---|---|---|
| Ruda | `styl/vzorky/ruda-list_v02.png` | reference postavy a předloha stylu pro všechna pozadí |
| Bára | `styl/vzorky/bara-list_v02.png` | reference postavy |
| interiéry | `styl/vzorky/a-archiv_v02.png` | vzor pro všechny interiéry |
| exteriéry | `styl/vzorky/a-namesti_v03.png`, `c-namesti-vecer_v03.png` | reference exteriérů ve dne a večer, včetně míry křivosti (D33) |
| staveniště a Archa | `styl/vzorky/a-rampa_v03.png` | reference staveniště rampy a ustálený vzhled Archy (D34) |

## Další postup

1. ~~Vybrat variantu~~ ✅ A + C (D21).
2. Skriptem vygenerovat první sadu: 3 pozadí ve variantě A (náměstí, archiv, rampa), náměstí
   večer ve variantě C a referenční listy Rudy a Báry.
3. Společně je porovnáme s pravidly výše a doladíme zadání. Schválené vzorky se stanou
   referencí pro všechny další obrázky.

## Kontrolní seznam pro každý obrázek

- [ ] paleta odpovídá variantě
- [ ] linka hnědá, proměnlivá, ne čistě černá
- [ ] nic není dokonale rovné
- [ ] motiv nedokončenosti je ve scéně přítomný
- [ ] kometa na obloze (venkovní scény) ve velikosti podle kapitoly
- [ ] žádný text
- [ ] důležité objekty čitelné i zmenšené na mobil
- [ ] postava odpovídá referenčnímu listu
