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
import unicodedata
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
# Orientační cena v USD za 1000 znaků; před větším generováním ověřit v ceníku služby.
# ElevenLabs se platí kredity z předplatného: skutečný odečet za každou repliku vrací služba
# v odpovědi a skript ho vypisuje i ukládá do <id>.json („kredity“).
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
            return r.read(), r.headers
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


def zadani(cfg, sluzba, radek, jazyk, hlas=None, model=None):
    """Sestaví, co se službě pošle. Vrací slovník s popisem i hashem pro cache."""
    postava = radek["_mluvci"].strip()
    emoce = radek["_emoce"].strip()
    text = mluveny_text(radek[jazyk])
    if hlas is None:
        hlas = cfg["postavy"].get(postava, {}).get(sluzba, "")
    z = {"id": radek["keys"], "sluzba": sluzba, "model": model or cfg[sluzba]["model"], "jazyk": jazyk,
         "postava": postava, "emoce": emoce, "hlas": hlas, "text": text}
    if sluzba == "openai":
        z["pokyny"] = pokyny_openai(cfg, postava, emoce, jazyk)
    else:
        z["text"] = tag_elevenlabs(cfg, emoce) + text
    z["hash"] = hashlib.sha256(json.dumps(z, ensure_ascii=False, sort_keys=True).encode()).hexdigest()[:16]
    return z


def generuj(cfg, z, key):
    """Vrací zvuk a počet kreditů, které služba za repliku odečetla (None, když to neřekne)."""
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
    data, hlavicky = send(req)
    kredity = hlavicky.get("character-cost")
    return data, int(kredity) if kredity and kredity.isdigit() else None


def vypis_hlasy(sluzba, key):
    if sluzba == "openai":
        print("OpenAI (gpt-4o-mini-tts): alloy, ash, ballad, coral, echo, fable, nova, onyx, sage, "
              "shimmer, verse, marin, cedar. Ukázky: https://www.openai.fm")
        return
    req = urllib.request.Request("https://api.elevenlabs.io/v1/voices", headers={"xi-api-key": key})
    data = json.loads(send(req)[0])
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
    """Vygeneruje jednu nahrávku do cíle, pokud tam už není stejná. Vrací None, když už hotová
    je, jinak počet odečtených kreditů (0, když ho služba nesdělí)."""
    meta = cil.with_suffix(".json")
    if cil.exists() and meta.exists() and not znovu:
        if json.loads(meta.read_text(encoding="utf-8")).get("hash") == z["hash"]:
            return None
    data, kredity = generuj(cfg, z, key)
    cil.parent.mkdir(parents=True, exist_ok=True)
    cil.write_bytes(data)
    zapis = {**z, "datum": datetime.date.today().isoformat()}
    if kredity is not None:
        zapis["kredity"] = kredity
    meta.write_text(json.dumps(zapis, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return kredity or 0


def jmeno_ve_hre(postava):
    """Jméno mluvčího z tabulky textů, jak ho má postava ve hře (script_name malými písmeny)."""
    bez = unicodedata.normalize("NFD", postava)
    return "".join(c for c in bez if c.isalnum() and not unicodedata.combining(c)).lower()


def zapis_mluvci(cfg, texty):
    """Hra pozná nahrávku podle znění repliky. Když stejnou větu říkají dvě postavy
    („Děkuju, Lumíre.“ Ruda i Bára), musí vědět, čí která nahrávka je: hra/zvuk/mluvci.json
    má pro takové repliky klíč → mluvčí (hra/game/zvuk.gd)."""
    mluvci = {}
    for jazyk_dir in sorted(p for p in OUT_HRA.glob("*") if p.is_dir()):
        podle_zneni = {}
        for zvuk in sorted(jazyk_dir.glob("*.mp3")):
            r = texty.get(zvuk.stem)
            if r:
                podle_zneni.setdefault(r[jazyk_dir.name], []).append(zvuk.stem)
        for klice in podle_zneni.values():
            if len({texty[k]["_mluvci"].strip() for k in klice}) > 1:
                for k in klice:
                    mluvci[k] = jmeno_ve_hre(texty[k]["_mluvci"].strip())
    (OUT_HRA / "mluvci.json").write_text(
        json.dumps(mluvci, ensure_ascii=False, indent=1, sort_keys=True) + "\n", encoding="utf-8")


def casting(cfg, sluzba, texty, jazyky, key, dry_run, znovu, nazev="casting"):
    soubor = CASTING.with_name(nazev + ".json")
    if not soubor.exists():
        sys.exit(f"Chybí zadání {soubor.relative_to(ROOT)}")
    spec = json.loads(soubor.read_text(encoding="utf-8"))
    out = OUT_VZORKY / nazev / sluzba
    ukoly = []
    for postava, p in spec["postavy"].items():
        r = texty.get(p["replika"])
        if not r:
            sys.exit(f"Casting: replika {p['replika']} není v texty.csv")
        for jmeno, hlas in p["kandidati"].items():
            # kandidát je ID hlasu, nebo {"hlas": ID, "model": jiný model než v hlasy.json}
            model = hlas.get("model") if isinstance(hlas, dict) else None
            hlas = hlas["hlas"] if isinstance(hlas, dict) else hlas
            for jazyk in jazyky:
                z = zadani(cfg, sluzba, r, jazyk, hlas, model)
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
    kredity = 0
    for z, cil in ukoly:
        try:
            k = vyrob(cfg, z, cil, key, znovu)
            if k is not None:
                kredity += k
                print(f"→ {z['postava_casting']} / {z['kandidat']} [{z['jazyk']}] uloženo "
                      f"({len(z['text'])} znaků, {k} kreditů)", flush=True)
        except ChybaAPI as e:
            print(f"✗ {z['postava_casting']} / {z['kandidat']} [{z['jazyk']}] přeskočen: "
                  f"{str(e).splitlines()[0][:160]}")
    print(f"odečteno kreditů: {kredity}")
    casting_html(spec, nazev)
    print(f"přehled: {(OUT_VZORKY / (nazev + '.html')).relative_to(ROOT)}")


def casting_html(spec, nazev="casting"):
    """Obnoví docs/dabing/vzorky/<nazev>.html: postava × kandidáti, každá služba zvlášť."""
    nadpis = spec.get("nadpis", "Casting hlasů")
    casti = [f"<!doctype html><html lang='cs'><meta charset='utf-8'><title>{html.escape(nadpis)}</title>",
             "<style>body{font-family:sans-serif;max-width:70em;margin:1em auto;padding:0 1em}"
             "table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid #ccc;"
             "padding:.4em;vertical-align:top;text-align:left}audio{width:12em}small{color:#666}"
             ".k{display:inline-block;margin:0 1em .5em 0}</style>",
             f"<h1>{html.escape(nadpis)}</h1><p>Obnoveno {datetime.date.today().isoformat()}. "
             "Vybraný hlas se zapíše do <code>tools/dabing/hlasy.json</code>.</p>"
             + (f"<p>{html.escape(spec['uvod'])}</p>" if spec.get("uvod") else "")]
    for sl_dir in sorted((OUT_VZORKY / nazev).glob("*")):
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
    (OUT_VZORKY / (nazev + ".html")).write_text("\n".join(casti) + "\n", encoding="utf-8")


def main():
    ap = argparse.ArgumentParser(description="Generuje dabing replik přes TTS službu.")
    ap.add_argument("--vzorek", default="uvod", help="název vzorku z vzorky.json (výchozí: uvod)")
    ap.add_argument("--kapitola", type=int, help="všechny repliky kapitoly N místo vzorku")
    ap.add_argument("--spolecne", action="store_true",
                    help="repliky společné všem kapitolám (klíče bez chN_: předměty, obecné hlášky)")
    ap.add_argument("--only", action="append", help="id repliky (lze opakovat)")
    ap.add_argument("--jazyk", choices=["cs", "en"], help="jen jeden jazyk")
    ap.add_argument("--sluzba", choices=sorted(KLICE), help="přepíše službu z hlasy.json")
    ap.add_argument("--hra", action="store_true", help="ukládat do hra/zvuk/ místo docs/dabing/vzorky/")
    ap.add_argument("--dil", metavar="I/N", help="jen I-tý díl z N (každá N-tá replika): "
                    "víc běhů vedle sebe namluví kapitolu rychleji")
    ap.add_argument("--znovu", action="store_true", help="generovat i už hotové repliky")
    ap.add_argument("--dry-run", action="store_true", help="jen vypsat zadání a odhad ceny")
    ap.add_argument("--hlasy", action="store_true", help="vypsat hlasy, které služba nabízí")
    ap.add_argument("--casting", nargs="?", const="casting", metavar="ZADÁNÍ",
                    help="kandidáti hlasů pro postavy z tools/dabing/<ZADÁNÍ>.json (výchozí casting)")
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
        casting(cfg, sluzba, texty, jazyky, key, args.dry_run, args.znovu, args.casting)
        return
    if args.kapitola or args.spolecne:
        ids = [k for k in texty if (args.kapitola and k.startswith(f"ch{args.kapitola}_"))
               or (args.spolecne and not re.match(r"ch\d+_", k))]
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

    if args.dil:
        dil, z_kolika = (int(x) for x in args.dil.split("/"))
        ukoly = ukoly[dil - 1::z_kolika]
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

    hotove, chyby, kredity, novych = [], 0, 0, 0
    for z in ukoly:
        cil = out / z["jazyk"] / f"{z['id']}.mp3"
        try:
            k = vyrob(cfg, z, cil, key, args.znovu)
            if k is not None:
                kredity += k
                novych += 1
                print(f"→ {z['id']} [{z['jazyk']}] {z['postava']} uloženo: {cil.relative_to(ROOT)} "
                      f"({len(z['text'])} znaků, {k} kreditů)", flush=True)
            hotove.append(cil)
        except ChybaAPI as e:
            # Jedna nepovedená replika nemá zastavit celou dávku; vyčerpaný kredit ano
            chyby += 1
            print(f"✗ {z['id']} [{z['jazyk']}] {z['postava']} přeskočeno: {str(e)[:200]}", flush=True)
            if "quota" in str(e).lower() or chyby >= 5:
                print("Končím: vyčerpaný kredit nebo opakované chyby.")
                break

    print(f"nově namluveno {novych} replik, odečteno kreditů: {kredity}; "
          f"hotovo {len(hotove)} z {len(ukoly)}")
    if args.hra:
        zapis_mluvci(cfg, texty)
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
