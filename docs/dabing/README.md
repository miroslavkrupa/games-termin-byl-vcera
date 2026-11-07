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
| ElevenLabs | `eleven_v3` | ano, nejlepší | tagy v textu (`[dryly]`) | ≈ 0,22 USD / 1 000 znaků (tarif Creator) | `ELEVENLABS_API_KEY` v `.env`; hlasy vybrat z knihovny a zapsat `voice_id` do `hlasy.json`, seznam dá `--hlasy --sluzba elevenlabs` |

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

## Co bude dál, když vzorky obstojí

1. Hlasy pro všechny mluvčí, případně foneticky přepsaná jména.
2. `python3 tools/dabing.py --kapitola 1 --hra` uloží zvuk do `hra/zvuk/<jazyk>/<id>.mp3`
   (Godot umí MP3 i Ogg Vorbis, Opus ne; `ffmpeg` není potřeba).
3. V Godotu přehrávání podle ID a délka scény podle zvuku, když chybí, podle textu (D07).
4. Nové rozhodnutí nahrazující D07, včetně věty o generovaných hlasech v titulcích hry.
