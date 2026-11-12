# Dabing přes AI

> Zkouška, jestli se dá dabing vyrobit převodem textu na řeč (TTS). Rozhodnutí D07 říká
> „dabing zatím ne, připravit na pozdější přidání“; tahle složka je ta příprava a zkouška.
> Postup je stejný jako u [grafiky](../06-stylova-bible.md#automatické-generování-d27): zadání
> v JSON, skript, vzorky, hodnocení, teprve pak rozhodnutí.

## Co už hra má

- Každá replika v `hra/texty/texty.csv` má stabilní ID, mluvčího, emoci a poznámku (D07).
  To je přesně vstup pro TTS.
- Zvuk se pojmenuje `<jazyk>/<id>.mp3` a engine ho přehraje, když existuje; jinak jen titulek.
  Titulky zůstávají vždy (viz [produkce](../05-produkce.md#priprava-na-dabing)).

## Jak se generují vzorky

```
python3 tools/dabing.py --dry-run      # vypíše repliky vzorku a odhad ceny, nic negeneruje
python3 tools/dabing.py                # vygeneruje vzorek „uvod“ v obou jazycích
python3 tools/dabing.py --prehrat      # a hned přehraje (macOS)
```

Vzorek „uvod“ (`tools/dabing/vzorky.json`): úvod kapitoly 2 (Ruda, Rozhlas, Pembok), Bára
v hangáru, Pan Změna a Předseda z kapitoly 1. 18 replik, obě verze, zhruba 1 700 znaků.

Výstup: `vzorky/<služba>/<jazyk>/<id>.mp3` a `<id>.json` (z čeho zvuk vznikl). Přehled
k poslechu: `vzorky/index.html` (otevřít v prohlížeči, obnoví se po každém běhu). Stejná
replika se podruhé negeneruje, dokud se nezmění text, hlas nebo emoce.

Hlasy a emoce jsou v `tools/dabing/hlasy.json`: u každého mluvčího krátký popis postavy
(anglicky, jde do pokynů pro model) a hlas pro každou službu; u emocí anglický pokyn
(`suše` → `dryly`). Ladí se úpravou tohoto souboru, ne skriptu.

Skript nenamlouvá scénické poznámky v závorkách, např. „(kreslí prstem do vzduchu Gantt)“,
a přeskakuje repliky se zástupným `%s` (například otázku na složení týmu v kapitole 2),
ty by se musely nahrát ve všech variantách nebo nechat bez hlasu.

## Služby

| Služba | Model | Čeština | Emoce | Cena orientačně | Klíč |
|---|---|---|---|---|---|
| OpenAI | `gpt-4o-mini-tts` | ano, lehký přízvuk | pokyn slovy (`instructions`) | ≈ 0,02 USD / 1 000 znaků | `OPENAI_API_KEY` v `.env` (stejný jako pro obrázky) |
| ElevenLabs | `eleven_v4` (dřív `eleven_v3`) | ano, nejlepší | tagy v textu (`[dryly]`) | 0,4 kreditu za znak; tarif Starter má 30 000 kreditů měsíčně | `ELEVENLABS_API_KEY` v `.env`; hlasy vybrat z knihovny a zapsat `voice_id` do `hlasy.json`, seznam dá `--hlasy --sluzba elevenlabs` |

Ceny ověřit v ceníku před větším generováním. Pravidla OpenAI vyžadují ve hře uvést, že hlasy
jsou generované. Kapitola 1 má asi 62 tisíc znaků v obou jazycích, kapitola 2 asi 45 tisíc
(jen klíče `chN_`, sdílené repliky předmětů a postav zatím nepočítané).

## Hodnocení vzorků

Autor poslechne `vzorky/index.html` v obou jazycích a zapíše sem:

| Postava | Hlas (openai) | Čeština | Angličtina | Poznámka |
|---|---|---|---|---|
| Ruda | ash | ☐ | ☐ | |
| Bára | sage | ☐ | ☐ | |
| Pembok | onyx | ☐ | ☐ | |
| Pan Změna | verse | ☐ | ☐ | |
| Předseda | echo | ☐ | ☐ | |
| Rozhlas | alloy | ☐ | ☐ | |

Na co se při poslechu ptát: Je to vtipné, nebo to vtip zabije? Sedí hlas k postavě? Jak zní
jména a termíny (Pembok, Gantt, Nedostavěnice, Scope Creek)? Dá se to poslouchat deset minut
v kuse? Co by chtělo foneticky přepsat (zvláštní sloupec v tabulce textů)?

## Stav 2026-11-12 (D97, D98)

- Služba: **ElevenLabs**, tarif Starter (30 000 kreditů měsíčně), model **`eleven_v4`**.
  Namlouvání stojí 0,4 kreditu za znak včetně značek emocí (`[dryly] `); skutečný odečet vrací
  služba u každé repliky, skript ho vypisuje a ukládá do `<id>.json` (pole `kredity`).
- Hlasy: **rodilé české hlasy z knihovny ElevenLabs**. Na placeném tarifu je API přijímá přímo
  podle ID, není potřeba je přidávat do „My Voices“. Autor hlasu ho může z knihovny stáhnout;
  pak by se postava musela přeobsadit a přemluvit.
- Srovnání k poslechu: `vzorky/srovnani.html` (zadání `tools/dabing/srovnani.json`, spouští se
  `python3 tools/dabing.py --casting srovnani --jazyk cs`): u každé postavy původní standardní
  hlas a české hlasy, vše v modelu v4. Starší casting standardních hlasů v modelu v3 je
  `vzorky/casting.html`.
- Klíč v `.env` umí jen generovat řeč. Seznam hlasů (`--hlasy`) ani zbývající kredit přečíst
  neumí, k tomu by potřeboval oprávnění `voices_read` a `user_read`. Seznam českých hlasů
  s ID je veřejně na https://json2video.com/ai-voices/elevenlabs/languages/czech/ (39 hlasů).

### Hlasy kapitoly 1 (D98)

Autor zadal povahu tří hlavních hlasů (Pembok hluboký a mentorující, Ruda namyšlený floutek,
Bára v pohodě a agilní) a že se hlasy nemají opakovat; konkrétní hlasy přidělil Claude podle
popisů v knihovně. Původní výběr autora pro model v3 (George, Lily, Callum…) zůstává
v `tools/dabing/hlasy.json` v polích `elevenlabs_v3`.

| Postava | Hlas | Popis v knihovně |
|---|---|---|
| Ruda | Johnny Castle | Confident and Smart |
| Bára | Marketa | Calm and Autentic, mladá, moravská |
| Pembok | Jiri | Deep, Reflective and Husky |
| Pan Změna | Michael Rig | Fairytale Narrator |
| Předseda | Romáro | starší, přátelský |
| Rozhlas | Petr Sovadina | Authoritative and Steady |
| Starosta | Pawel | Cinematic, Deep and Confident |
| Framework | Adam | Velvety and Conversational |
| Babička | Monica | Slow, Steady and Clean (starší ženský hlas v knihovně není) |
| Lumír | Zazy | Clear Audiobook Narrator |
| Vrátný | Stepan Bezec | Mature and Serious |
| Věřitel | Tomáš Nikl | padesátník, výklad |
| Druhý věřitel | Zdeněk | Strong and Deep |
| Kocour | Kami | Warm, Velvety and Soothing |

### Co je namluveno

Česky celá kapitola 1 a společné repliky: **625 replik**, 37 tisíc znaků, 14 800 kreditů,
v `hra/zvuk/cs/` (25 MB). Bez hlasu zůstávají repliky se zástupným `%s`, volby, které jsou
jen scénická poznámka, a texty bez mluvčího (názvy míst, rozhraní). Anglicky zatím nic.

Kredit za 2026-11-12 podle odpovědí služby: zbytek úvodu ve v3 336, srovnání hlasů 2 284
(z toho asi 440 omylem: ukázky v3 se po přepnutí modelu přegenerovaly), kapitola 14 800,
dohromady asi 17 500 z 30 000.

Namlouvá se příkazem (hotové repliky se přeskočí, dokud se nezmění text, hlas, model nebo
emoce; `--dil I/N` rozdělí práci mezi víc běhů vedle sebe):

```
python3 tools/dabing.py --kapitola 1 --spolecne --jazyk cs --hra
```

`--spolecne` jsou repliky společné všem kapitolám (klíče bez `chN_`: popisy předmětů, obecné
hlášky). Nahrávky jsou MP3 64 kb/s mono (`format` v `hlasy.json`).

### Jak to hraje hra

- `hra/game/zvuk.gd`: když postava promluví a existuje `hra/zvuk/<jazyk>/<klíč>.mp3`,
  přehraje se a hudba ustoupí. Nahrávka se hledá podle znění repliky; když stejnou větu říkají
  dvě postavy („Děkuju, Lumíre.“ Ruda i Bára), rozhodne mluvčí podle `hra/zvuk/mluvci.json`
  (zapisuje ho `tools/dabing.py --hra`).
- Samočinné pokračování („Samo“ v nastavení): replika s nahrávkou počká na konec hlasu
  a 0,6 s, replika bez nahrávky 3 s po vypsání jako dřív
  (`hra/game/gui/components/dialog_text/dialog_overhead/dialog_overhead_custom.gd`).
  Ladicí běhy a průchod na hlas nečekají; `hlas=1` čekání zapne i tam.

## Co bude dál, když vzorky obstojí

1. Hlasy pro všechny mluvčí, případně foneticky přepsaná jména.
2. `python3 tools/dabing.py --kapitola 1 --hra` uloží zvuk do `hra/zvuk/<jazyk>/<id>.mp3`
   (Godot umí MP3 i Ogg Vorbis, Opus ne; `ffmpeg` není potřeba).
3. V Godotu přehrávání podle ID a délka scény podle zvuku, když chybí, podle textu (D07).
4. Nové rozhodnutí nahrazující D07, včetně věty o generovaných hlasech v titulcích hry.
