#!/usr/bin/env python3
"""Generuje dabing replik z hra/texty/texty.csv přes TTS službu (OpenAI nebo ElevenLabs).

Použití:
  python3 tools/dabing.py --dry-run                # vypíše repliky vzorku „uvod“ a odhad ceny
  python3 tools/dabing.py                          # vygeneruje vzorek „uvod“ v obou jazycích
  python3 tools/dabing.py --vzorek uvod --jazyk cs # jiný vzorek / jen jeden jazyk
  python3 tools/dabing.py --sluzba elevenlabs      # jiná služba než v hlasy.json
  python3 tools/dabing.py --only ch2_uvod_budka    # jen vybrané repliky (lze opakovat)
  python3 tools/dabing.py --kapitola 2 --hra       # celá kapitola 2 do hra/zvuk/<jazyk>/<id>.mp3
  python3 tools/dabing.py --hlasy                  # vypíše hlasy, které služba nabízí
  python3 tools/dabing.py --casting                # kandidáti hlasů pro postavy (tools/dabing/casting.json)
  python3 tools/dabing.py --prehrat                # po vygenerování přehraje (macOS afplay)

Vzorky se ukládají do docs/dabing/vzorky/<sluzba>/<jazyk>/<id>.mp3 a k nim <id>.json s tím,
z čeho zvuk vznikl. Stejná replika se podruhé negeneruje, dokud se nezmění text, hlas nebo
emoce (--znovu to vynutí). Po každém běhu se obnoví docs/dabing/vzorky/index.html k poslechu.

Mapa mluvčí → hlas a emoce → pokyn je v tools/dabing/hlasy.json, seznamy vzorků
v tools/dabing/vzorky.json. Casting (tools/dabing/casting.json) namluví pro každou postavu
jednu repliku několika kandidáty do docs/dabing/vzorky/casting/ a přehled casting.html. Závorky v textu, např. „(kreslí do vzduchu)“, jsou scénické
poznámky a nenamlouvají se. Repliky se zástupným %s se přeskakují.

API klíč se čte z proměnné prostředí OPENAI_API_KEY nebo ELEVENLABS_API_KEY, případně ze souboru
.env v kořeni projektu. Soubor .env je v .gitignore a nikdy se necommituje.
"""
import argparse
import csv
import datetime
import hashlib
import html
import json
import os
import pathlib
import re
import subprocess
import sys
import urllib.error
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
TEXTY = ROOT / "hra" / "texty" / "texty.csv"
HLASY = ROOT / "tools" / "dabing" / "hlasy.json"
VZORKY = ROOT / "tools" / "dabing" / "vzorky.json"
CASTING = ROOT / "tools" / "dabing" / "casting.json"
OUT_VZORKY = ROOT / "docs" / "dabing" / "vzorky"
OUT_HRA = ROOT / "hra" / "zvuk"

KLICE = {"openai": "OPENAI_API_KEY", "elevenlabs": "ELEVENLABS_API_KEY"}
# Orientační cena v USD za 1000 znaků; před větším generováním ověřit v ceníku služby
CENA = {"openai": 0.02, "elevenlabs": 0.22}
ZAVORKY = re.compile(r"\s*\([^)]*\)")


class ChybaAPI(Exception):
    pass


def load_key(name):
    key = os.environ.get(name)
    env = ROOT / ".env"
    if not key and env.exists():
        for line in env.read_text().splitlines():
            if line.strip().startswith(name + "="):
                key = line.split("=", 1)[1].strip().strip('"').strip("'")
    return key


def nacti_texty():
    with TEXTY.open(encoding="utf-8") as f:
        return {r["keys"]: r for r in csv.DictReader(f)}


def mluveny_text(text):
    return re.sub(r"\s{2,}", " ", ZAVORKY.sub("", text)).strip()


def send(req):
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            return r.read()
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")
        raise ChybaAPI(f"Chyba API {e.code}: {body}")
    except urllib.error.URLError as e:
        raise ChybaAPI(f"Nepodařilo se spojit s API: {e.reason}")


def emoce_en(cfg, emoce):
    """Anglický pokyn k emoci z mapy v hlasy.json; neznámou emoci předá česky."""
    if not emoce:
        return ""
    return cfg["emoce"].get(emoce) or cfg["emoce"].get(emoce.split(",")[0].strip()) or emoce


def pokyny_openai(cfg, postava, emoce, jazyk):
    popis = cfg["postavy"].get(postava, {}).get("popis", postava)
    return cfg["openai"]["pokyny"].format(jazyk=cfg["jazyky"][jazyk], postava=popis,
                                          emoce=emoce_en(cfg, emoce) or "neutral")


def tag_elevenlabs(cfg, emoce):
    tag = emoce_en(cfg, emoce)
    return f"[{tag}] " if tag and tag != emoce else ""


def zadani(cfg, sluzba, radek, jazyk, hlas=None):
    """Sestaví, co se službě pošle. Vrací slovník s popisem i hashem pro cache."""
    postava = radek["_mluvci"].strip()
    emoce = radek["_emoce"].strip()
    text = mluveny_text(radek[jazyk])
    if hlas is None:
        hlas = cfg["postavy"].get(postava, {}).get(sluzba, "")
    z = {"id": radek["keys"], "sluzba": sluzba, "model": cfg[sluzba]["model"], "jazyk": jazyk,
         "postava": postava, "emoce": emoce, "hlas": hlas, "text": text}
    if sluzba == "openai":
        z["pokyny"] = pokyny_openai(cfg, postava, emoce, jazyk)
    else:
        z["text"] = tag_elevenlabs(cfg, emoce) + text
    z["hash"] = hashlib.sha256(json.dumps(z, ensure_ascii=False, sort_keys=True).encode()).hexdigest()[:16]
    return z


def generuj(cfg, z, key):
    if z["sluzba"] == "openai":
        payload = {"model": z["model"], "voice": z["hlas"], "input": z["text"],
                   "instructions": z["pokyny"], "response_format": cfg["openai"]["format"]}
        req = urllib.request.Request("https://api.openai.com/v1/audio/speech",
                                     data=json.dumps(payload).encode(),
                                     headers={"Authorization": f"Bearer {key}",
                                              "Content-Type": "application/json"})
    else:
        payload = {"text": z["text"], "model_id": z["model"]}
        req = urllib.request.Request(
            f"https://api.elevenlabs.io/v1/text-to-speech/{z['hlas']}"
            f"?output_format={cfg['elevenlabs']['format']}",
            data=json.dumps(payload).encode(),
            headers={"xi-api-key": key, "Content-Type": "application/json"})
    return send(req)


def vypis_hlasy(sluzba, key):
    if sluzba == "openai":
        print("OpenAI (gpt-4o-mini-tts): alloy, ash, ballad, coral, echo, fable, nova, onyx, sage, "
              "shimmer, verse, marin, cedar. Ukázky: https://www.openai.fm")
        return
    req = urllib.request.Request("https://api.elevenlabs.io/v1/voices", headers={"xi-api-key": key})
    data = json.loads(send(req))
    for v in data.get("voices", []):
        labels = ", ".join(f"{k}: {val}" for k, val in (v.get("labels") or {}).items())
        print(f"{v['voice_id']}  {v['name']:20} {labels}")


def prehled_html():
    """Obnoví docs/dabing/vzorky/index.html se všemi vygenerovanými vzorky k poslechu."""
    polozky = {}
    for meta in sorted(OUT_VZORKY.glob("*/*/*.json")):
        if meta.parts[-4] == "casting":
            continue
        z = json.loads(meta.read_text(encoding="utf-8"))
        zvuk = meta.with_suffix(".mp3")
        if not zvuk.exists():
            continue
        polozky.setdefault(z["sluzba"], {}).setdefault(z["id"], {})[z["jazyk"]] = (z, zvuk)
    casti = ["<!doctype html><html lang='cs'><meta charset='utf-8'>",
             "<title>Vzorky dabingu</title>",
             "<style>body{font-family:sans-serif;max-width:60em;margin:1em auto;padding:0 1em}"
             "table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid #ccc;"
             "padding:.4em;vertical-align:top;text-align:left}audio{width:14em}"
             "small{color:#666}</style>",
             "<h1>Vzorky dabingu</h1><p>Generováno skriptem <code>tools/dabing.py</code>. "
             f"Obnoveno {datetime.date.today().isoformat()}.</p>"]
    for sluzba, repliky in polozky.items():
        casti.append(f"<h2>{html.escape(sluzba)}</h2><table><tr><th>Kdo</th><th>Čeština</th>"
                     "<th>English</th></tr>")
        for rid, jazyky in repliky.items():
            z = next(iter(jazyky.values()))[0]
            bunky = []
            for jazyk in ("cs", "en"):
                if jazyk in jazyky:
                    zz, zvuk = jazyky[jazyk]
                    bunky.append(f"<td>{html.escape(zz['text'])}<br>"
                                 f"<audio controls preload='none' src='{zvuk.relative_to(OUT_VZORKY)}'>"
                                 f"</audio><br><small>{html.escape(zz['hlas'])}</small></td>")
                else:
                    bunky.append("<td></td>")
            casti.append(f"<tr><td><b>{html.escape(z['postava'])}</b><br><small>{html.escape(z['emoce'])}"
                         f"<br><code>{html.escape(rid)}</code></small></td>{''.join(bunky)}</tr>")
        casti.append("</table>")
    casti.append("</html>")
    OUT_VZORKY.mkdir(parents=True, exist_ok=True)
    (OUT_VZORKY / "index.html").write_text("\n".join(casti) + "\n", encoding="utf-8")


def vyrob(cfg, z, cil, key, znovu):
    """Vygeneruje jednu nahrávku do cíle, pokud tam už není stejná. Vrací True, když se generovalo."""
    meta = cil.with_suffix(".json")
    if cil.exists() and meta.exists() and not znovu:
        if json.loads(meta.read_text(encoding="utf-8")).get("hash") == z["hash"]:
            return False
    data = generuj(cfg, z, key)
    cil.parent.mkdir(parents=True, exist_ok=True)
    cil.write_bytes(data)
    meta.write_text(json.dumps({**z, "datum": datetime.date.today().isoformat()},
                               ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return True


def casting(cfg, sluzba, texty, jazyky, key, dry_run, znovu):
    spec = json.loads(CASTING.read_text(encoding="utf-8"))
    out = OUT_VZORKY / "casting" / sluzba
    ukoly = []
    for postava, p in spec["postavy"].items():
        r = texty.get(p["replika"])
        if not r:
            sys.exit(f"Casting: replika {p['replika']} není v texty.csv")
        for jmeno, hlas in p["kandidati"].items():
            for jazyk in jazyky:
                z = zadani(cfg, sluzba, r, jazyk, hlas)
                z["kandidat"] = jmeno
                z["postava_casting"] = postava
                ukoly.append((z, out / jazyk / f"{p['replika']}__{jmeno}.mp3"))
    znaku = sum(len(z["text"]) for z, _ in ukoly)
    print(f"casting: {len(ukoly)} nahrávek, služba {sluzba}, {znaku} znaků, "
          f"odhad ≈ ${znaku / 1000 * CENA[sluzba]:.2f}")
    if dry_run:
        for z, cil in ukoly:
            print(f"  {z['postava_casting']:10} {z['kandidat']:8} [{z['jazyk']}] {z['text']}")
        return
    if not key:
        sys.exit(f"Chybí API klíč {KLICE[sluzba]}.")
    for z, cil in ukoly:
        try:
            if vyrob(cfg, z, cil, key, znovu):
                print(f"→ {z['postava_casting']} / {z['kandidat']} [{z['jazyk']}] uloženo", flush=True)
        except ChybaAPI as e:
            print(f"✗ {z['postava_casting']} / {z['kandidat']} [{z['jazyk']}] přeskočen: "
                  f"{str(e).splitlines()[0][:160]}")
    casting_html(spec)
    print(f"přehled castingu: {(OUT_VZORKY / 'casting.html').relative_to(ROOT)}")


def casting_html(spec):
    """Obnoví docs/dabing/vzorky/casting.html: postava × kandidáti, každá služba zvlášť."""
    casti = ["<!doctype html><html lang='cs'><meta charset='utf-8'><title>Casting hlasů</title>",
             "<style>body{font-family:sans-serif;max-width:70em;margin:1em auto;padding:0 1em}"
             "table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid #ccc;"
             "padding:.4em;vertical-align:top;text-align:left}audio{width:12em}small{color:#666}"
             ".k{display:inline-block;margin:0 1em .5em 0}</style>",
             f"<h1>Casting hlasů</h1><p>Obnoveno {datetime.date.today().isoformat()}. "
             "Vybraný hlas se zapíše do <code>tools/dabing/hlasy.json</code>.</p>"]
    for sl_dir in sorted((OUT_VZORKY / "casting").glob("*")):
        if not sl_dir.is_dir():
            continue
        casti.append(f"<h2>{html.escape(sl_dir.name)}</h2><table><tr><th>Postava</th><th>Kandidáti</th></tr>")
        for postava, p in spec["postavy"].items():
            bunky = []
            for jmeno in p["kandidati"]:
                audia = []
                for jazyk in ("cs", "en"):
                    f = sl_dir / jazyk / f"{p['replika']}__{jmeno}.mp3"
                    if f.exists():
                        audia.append(f"<small>{jazyk}</small> <audio controls preload='none' "
                                     f"src='{f.relative_to(OUT_VZORKY)}'></audio>")
                if audia:
                    bunky.append(f"<span class='k'><b>{html.escape(jmeno)}</b><br>{'<br>'.join(audia)}</span>")
            text = html.escape(mluveny_text(nacti_texty()[p["replika"]]["cs"]))
            casti.append(f"<tr><td><b>{html.escape(postava)}</b><br><small>{text}</small></td>"
                         f"<td>{''.join(bunky)}</td></tr>")
        casti.append("</table>")
    casti.append("</html>")
    (OUT_VZORKY / "casting.html").write_text("\n".join(casti) + "\n", encoding="utf-8")


def main():
    ap = argparse.ArgumentParser(description="Generuje dabing replik přes TTS službu.")
    ap.add_argument("--vzorek", default="uvod", help="název vzorku z vzorky.json (výchozí: uvod)")
    ap.add_argument("--kapitola", type=int, help="všechny repliky kapitoly N místo vzorku")
    ap.add_argument("--only", action="append", help="id repliky (lze opakovat)")
    ap.add_argument("--jazyk", choices=["cs", "en"], help="jen jeden jazyk")
    ap.add_argument("--sluzba", choices=sorted(KLICE), help="přepíše službu z hlasy.json")
    ap.add_argument("--hra", action="store_true", help="ukládat do hra/zvuk/ místo docs/dabing/vzorky/")
    ap.add_argument("--znovu", action="store_true", help="generovat i už hotové repliky")
    ap.add_argument("--dry-run", action="store_true", help="jen vypsat zadání a odhad ceny")
    ap.add_argument("--hlasy", action="store_true", help="vypsat hlasy, které služba nabízí")
    ap.add_argument("--casting", action="store_true", help="kandidáti hlasů pro postavy z casting.json")
    ap.add_argument("--prehrat", action="store_true", help="po vygenerování přehrát (afplay)")
    args = ap.parse_args()

    cfg = json.loads(HLASY.read_text(encoding="utf-8"))
    sluzba = args.sluzba or cfg["sluzba"]
    key = load_key(KLICE[sluzba])

    if args.hlasy:
        if sluzba != "openai" and not key:
            sys.exit(f"Chybí API klíč {KLICE[sluzba]}.")
        vypis_hlasy(sluzba, key)
        return

    texty = nacti_texty()
    jazyky = [args.jazyk] if args.jazyk else ["cs", "en"]
    if args.casting:
        casting(cfg, sluzba, texty, jazyky, key, args.dry_run, args.znovu)
        return
    if args.kapitola:
        ids = [k for k in texty if k.startswith(f"ch{args.kapitola}_")]
    else:
        vz = json.loads(VZORKY.read_text(encoding="utf-8"))
        if args.vzorek not in vz:
            sys.exit(f"Neznámý vzorek {args.vzorek}. Známé: {', '.join(sorted(vz))}")
        ids = vz[args.vzorek]["repliky"]
    if args.only:
        ids = args.only
    chybi = [i for i in ids if i not in texty]
    if chybi:
        sys.exit(f"Repliky nejsou v texty.csv: {', '.join(chybi)}")

    ukoly, preskoceno = [], []
    for i in ids:
        r = texty[i]
        postava = r["_mluvci"].strip()
        if not postava or postava not in cfg["postavy"] or "%s" in r["cs"] or "%s" in r["en"]:
            preskoceno.append(i)
            continue
        # Volba dialogu, která je celá scénická poznámka („(odejít)“), nemá co namluvit
        if not any(re.search(r"\w", mluveny_text(r[j])) for j in jazyky):
            preskoceno.append(i)
            continue
        if not cfg["postavy"][postava].get(sluzba):
            sys.exit(f"Postava „{postava}“ nemá v hlasy.json hlas pro službu {sluzba} (replika {i}). "
                     f"Hlasy vypíše: python3 tools/dabing.py --hlasy --sluzba {sluzba}")
        for jazyk in jazyky:
            ukoly.append(zadani(cfg, sluzba, r, jazyk))

    out = OUT_HRA if args.hra else OUT_VZORKY / sluzba
    znaku = sum(len(z["text"]) for z in ukoly)
    print(f"{len(ukoly)} nahrávek ({len(ids) - len(preskoceno)} replik × {len(jazyky)} jaz.), "
          f"služba {sluzba}, model {cfg[sluzba]['model']}, {znaku} znaků, "
          f"odhad ≈ ${znaku / 1000 * CENA[sluzba]:.2f}")
    if preskoceno:
        ukazka = ", ".join(preskoceno[:5]) + (", …" if len(preskoceno) > 5 else "")
        print(f"přeskočeno {len(preskoceno)} (bez mluvčího, mluvčí mimo hlasy.json, zástupné %s nebo jen "
              f"scénická poznámka): {ukazka}")
    if args.dry_run:
        for z in ukoly:
            print(f"\n=== {z['id']} [{z['jazyk']}] {z['postava']} ({z['emoce'] or '–'}) hlas {z['hlas']} ===")
            print(z["text"])
            if "pokyny" in z:
                print(f"  pokyny: {z['pokyny']}")
        return

    if not key:
        sys.exit(f"Chybí API klíč: nastav {KLICE[sluzba]} nebo ho zapiš do souboru .env "
                 f"v kořeni projektu ({KLICE[sluzba]}=...).")

    hotove, chyby = [], 0
    for z in ukoly:
        cil = out / z["jazyk"] / f"{z['id']}.mp3"
        try:
            if vyrob(cfg, z, cil, key, args.znovu):
                print(f"→ {z['id']} [{z['jazyk']}] {z['postava']} uloženo: {cil.relative_to(ROOT)}", flush=True)
            hotove.append(cil)
        except SystemExit as e:
            # Jedna nepovedená replika nemá zastavit celou dávku; vyčerpaný kredit ano
            chyby += 1
            print(f"✗ {z['id']} [{z['jazyk']}] {z['postava']} přeskočeno: {str(e)[:200]}", flush=True)
            if "quota" in str(e).lower() or chyby >= 5:
                print("Končím: vyčerpaný kredit nebo opakované chyby.")
                break

    if not args.hra:
        prehled_html()
        print(f"přehled k poslechu: {(OUT_VZORKY / 'index.html').relative_to(ROOT)}")
    if args.prehrat:
        for cil in hotove:
            print(f"♪ {cil.relative_to(ROOT)}")
            subprocess.run(["afplay", str(cil)], check=False)


if __name__ == "__main__":
    try:
        main()
    except ChybaAPI as e:
        sys.exit(str(e))
