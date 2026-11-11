#!/usr/bin/env python3
"""Generuje grafiku přes OpenAI Images API podle souboru zadání (výchozí tools/vzorky/zadani.json).

Použití:
  python3 tools/generuj_vzorky.py --dry-run           # jen vypíše zadání a odhad ceny
  python3 tools/generuj_vzorky.py                     # vygeneruje všechny vzorky
  python3 tools/generuj_vzorky.py --only ruda-list    # jen vybrané (--only lze opakovat)
  python3 tools/generuj_vzorky.py --quality high      # jiná kvalita (low / medium / high)
  python3 tools/generuj_vzorky.py --spec tools/vzorky/zadani-kap1.json --only a-byt-siroke

API klíč se čte z proměnné prostředí OPENAI_API_KEY nebo ze souboru .env v kořeni projektu
(řádek OPENAI_API_KEY=...). Soubor .env je v .gitignore a nikdy se necommituje.
Jiný klíč (např. firemní) se uloží do .env pod jiným názvem a vybere se volbou --klic:
  python3 tools/generuj_vzorky.py --klic OPENAI_API_KEY_FIRMA --overit    # zdarma: platí klíč a vidí model?
  python3 tools/generuj_vzorky.py --klic OPENAI_API_KEY_FIRMA --spec … --only …

Typ s "pruhledne": true se u modelů gpt-image-1 generuje s průhledným pozadím (PNG). Model
gpt-image-2 průhledné pozadí neumí (D88): k zadání se přidá věta o jednolitém purpurovém pozadí
a obrázek se vyřízne až při zpracování do hry.

Velikost je u gpt-image-2 volná (např. 2224x1024 pro široké pozadí 19,5:9, strany po 16 px).
Vzorek může mít místo typu a palety celé zadání v poli "zadani" (použije se beze změny).
Pole "parametry" (slovník) se u vzorku s předlohou přidá k parametrům volání API.
Pole "maska" (cesta k PNG stejné velikosti jako první předloha) omezí úpravu na průhledná místa
masky; neprůhledná část první předlohy má zůstat (rozšíření pozadí do stran).

Vzorek může mít v zadání "reference": seznam cest k obrázkům (relativně ke kořeni projektu).
Pak se použije endpoint pro úpravy a model obrázky vezme jako předlohu, např. referenční list
postavy pro konzistentní vzhled. S "predloha": true se na začátek zadání přidá věta
"predloha_stylu": z předlohy se převezme jen styl, ne postava.
"""
import argparse
import base64
import datetime
import json
import os
import pathlib
import re
import sys
import urllib.error
import urllib.request
import uuid

ROOT = pathlib.Path(__file__).resolve().parent.parent
SPEC = ROOT / "tools" / "vzorky" / "zadani.json"
OUT = ROOT / "docs" / "styl" / "vzorky"
LOG = OUT / "README.md"
API = "https://api.openai.com/v1/images"

# Orientační cena za obrázek 1536×1024 v USD (gpt-image-2, bez vstupních předloh); před větším
# generováním ověřit v ceníku OpenAI
PRICE = {"low": 0.005, "medium": 0.04, "high": 0.17}
# Orientační cena za milion tokenů v USD (gpt-image-2): podle ní se počítá skutečná útrata
# z údaje "usage" v odpovědi
TOKENY = {"text": 5.0, "obraz_vstup": 8.0, "obraz_vystup": 30.0}
# Věta pro typy s "pruhledne" u modelů, které průhledné pozadí neumí
KLIC = ("plain flat solid pure magenta (#FF00FF) background everywhere around the subject, "
        "no ground, no shadows, no gradient")


def load_key(nazev="OPENAI_API_KEY"):
    key = os.environ.get(nazev)
    env = ROOT / ".env"
    if not key and env.exists():
        for line in env.read_text().splitlines():
            if line.strip().startswith(nazev + "="):
                key = line.split("=", 1)[1].strip().strip('"').strip("'")
    return key


def bez_klice(text):
    """Chybové hlášky API někdy opakují část klíče; do výpisu nepatří ani ta."""
    return re.sub(r"sk-[A-Za-z0-9_*\-]+", "sk-…", text)


def overit(key, model):
    """Zdarma ověří, že klíč platí a má přístup k modelu (nic negeneruje)."""
    req = urllib.request.Request(f"https://api.openai.com/v1/models/{model}",
                                 headers={"Authorization": f"Bearer {key}"})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            info = json.load(r)
        print(f"Klíč platí a model {info.get('id', model)} je pro něj dostupný "
              f"(vlastník modelu: {info.get('owned_by', '?')}).")
        return True
    except urllib.error.HTTPError as e:
        try:
            chyba = json.loads(e.read().decode(errors="replace")).get("error", {})
        except ValueError:
            chyba = {}
        duvod = {401: "klíč je neplatný nebo zrušený",
                 403: "klíč nemá k modelu nebo k této části API oprávnění",
                 404: "model pro tento klíč (organizaci, projekt) neexistuje nebo není povolený",
                 429: "vyčerpaný limit nebo kredit"}.get(e.code, "neznámá chyba")
        print(f"Neprošlo, HTTP {e.code}: {duvod}.")
        if chyba.get("message"):
            print("Hláška API:", bez_klice(chyba["message"]))
        return False
    except urllib.error.URLError as e:
        print(f"Nepodařilo se spojit s API: {e.reason}")
        return False


def umi_pruhledne(model):
    return model.startswith("gpt-image-1")


def pruhledne(spec, item):
    return bool(item.get("pruhledne", spec["typy"].get(item.get("typ"), {}).get("pruhledne")))


def build_prompt(spec, item, model):
    if "zadani" in item:
        parts = [item["zadani"]]
    else:
        typ = spec["typy"][item["typ"]]
        parts = [typ["uvod"], item["popis"], spec["palety"][item["paleta"]], typ["zaver"]]
        if item.get("predloha"):
            parts.insert(0, spec["predloha_stylu"])
    if pruhledne(spec, item) and not umi_pruhledne(model):
        parts = [p.replace("transparent background", KLIC) for p in parts]
        if KLIC not in " ".join(parts):
            parts.append(KLIC)
    return ",\n".join(p.strip().rstrip(",") for p in parts)


def cena(usage):
    """Útrata v USD podle tokenů z odpovědi API (None, když je API nevrátí)."""
    if not usage:
        return None
    detail = usage.get("input_tokens_details", {})
    text = detail.get("text_tokens", 0)
    obraz = detail.get("image_tokens", usage.get("input_tokens", 0) - text)
    return (text * TOKENY["text"] + obraz * TOKENY["obraz_vstup"]
            + usage.get("output_tokens", 0) * TOKENY["obraz_vystup"]) / 1e6


def send(req):
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")
        sys.exit(f"Chyba API {e.code}: {bez_klice(body)}")
    except urllib.error.URLError as e:
        sys.exit(f"Nepodařilo se spojit s API: {e.reason}")


def post_json(url, payload, key):
    req = urllib.request.Request(url, data=json.dumps(payload).encode(), headers={
        "Authorization": f"Bearer {key}", "Content-Type": "application/json"})
    return send(req)


def post_multipart(url, fields, files, key):
    boundary = uuid.uuid4().hex
    body = bytearray()
    for name, value in fields.items():
        body += (f'--{boundary}\r\nContent-Disposition: form-data; name="{name}"\r\n\r\n'
                 f'{value}\r\n').encode()
    for name, path in files:
        mime = "image/jpeg" if path.suffix.lower() in (".jpg", ".jpeg") else "image/png"
        body += (f'--{boundary}\r\nContent-Disposition: form-data; name="{name}"; '
                 f'filename="{path.name}"\r\nContent-Type: {mime}\r\n\r\n').encode()
        body += path.read_bytes() + b"\r\n"
    body += f"--{boundary}--\r\n".encode()
    req = urllib.request.Request(url, data=bytes(body), headers={
        "Authorization": f"Bearer {key}",
        "Content-Type": f"multipart/form-data; boundary={boundary}"})
    return send(req)


def next_path(item_id):
    n = 1
    while (OUT / f"{item_id}_v{n:02d}.png").exists():
        n += 1
    return OUT / f"{item_id}_v{n:02d}.png"


def main():
    ap = argparse.ArgumentParser(description="Generuje stylové vzorky přes OpenAI Images API.")
    ap.add_argument("--only", action="append", help="id vzorku ze zadani.json (lze opakovat)")
    ap.add_argument("--quality", choices=sorted(PRICE), help="přepíše kvalitu ze zadani.json")
    ap.add_argument("--model", help="přepíše model ze zadani.json")
    ap.add_argument("--spec", help="soubor zadání (výchozí tools/vzorky/zadani.json)")
    ap.add_argument("--klic", default="OPENAI_API_KEY",
                    help="název proměnné s API klíčem v prostředí nebo v .env (výchozí OPENAI_API_KEY)")
    ap.add_argument("--overit", action="store_true",
                    help="jen ověří, že klíč platí a vidí model (zdarma), nic negeneruje")
    ap.add_argument("--dry-run", action="store_true", help="jen vypíše zadání, nic negeneruje")
    args = ap.parse_args()

    spec = json.loads(pathlib.Path(args.spec).read_text() if args.spec else SPEC.read_text())
    model = args.model or spec.get("model", "gpt-image-2")
    quality = args.quality or spec.get("kvalita", "medium")
    if args.overit:
        key = load_key(args.klic)
        if not key:
            sys.exit(f"Chybí API klíč: v prostředí ani v .env není proměnná {args.klic}.")
        sys.exit(0 if overit(key, model) else 1)
    known = {i["id"] for i in spec["vzorky"]}
    unknown = set(args.only or []) - known
    if unknown:
        sys.exit(f"Neznámé vzorky: {', '.join(sorted(unknown))}. Známé: {', '.join(sorted(known))}")
    items = [i for i in spec["vzorky"] if not args.only or i["id"] in args.only]
    for i in items:
        for ref in i.get("reference", []):
            if not (ROOT / ref).exists():
                sys.exit(f"Vzorek {i['id']}: referenční obrázek {ref} neexistuje")

    print(f"{len(items)} vzorků, model {model}, kvalita {quality}, "
          f"odhad ≈ ${len(items) * PRICE[quality]:.2f}")
    if args.dry_run:
        for i in items:
            print(f"\n=== {i['id']} ({i['velikost']}) ===\n{build_prompt(spec, i, model)}")
        return

    key = load_key(args.klic)
    if not key:
        sys.exit(f"Chybí API klíč: nastav {args.klic} nebo ho zapiš do souboru .env "
                 f"v kořeni projektu ({args.klic}=...).")

    OUT.mkdir(parents=True, exist_ok=True)
    celkem = 0.0
    for i in items:
        prompt = build_prompt(spec, i, model)
        refs = [ROOT / r for r in i.get("reference", [])]
        extra = ({"background": "transparent", "output_format": "png"}
                 if pruhledne(spec, i) and umi_pruhledne(model) else {})
        print(f"→ {i['id']} …", flush=True)
        if refs:
            res = post_multipart(f"{API}/edits",
                                 {"model": model, "prompt": prompt, "size": i["velikost"],
                                  "quality": quality, **extra, **i.get("parametry", {})},
                                 [("image[]", r) for r in refs]
                                 + ([("mask", ROOT / i["maska"])] if i.get("maska") else []), key)
        else:
            res = post_json(f"{API}/generations",
                            {"model": model, "prompt": prompt, "size": i["velikost"],
                             "quality": quality, "n": 1, **extra}, key)
        path = next_path(i["id"])
        path.write_bytes(base64.b64decode(res["data"][0]["b64_json"]))
        usd = cena(res.get("usage"))
        celkem += usd or PRICE[quality]
        meta = {"id": i["id"], "model": model, "kvalita": quality, "velikost": i["velikost"],
                "paleta": i.get("paleta"), "reference": i.get("reference", []),
                "datum": datetime.date.today().isoformat(), "zadani": prompt}
        if usd is not None:
            meta["cena_usd"] = round(usd, 4)
        path.with_suffix(".json").write_text(json.dumps(meta, ensure_ascii=False, indent=2) + "\n")
        with LOG.open("a") as f:
            f.write(f"| {path.name} | {model} ({quality}) | {path.with_suffix('.json').name} | ☐ |\n")
        print(f"  uloženo: {path.relative_to(ROOT)}" + (f", ≈ ${usd:.3f}" if usd is not None else ""))
    print(f"Celkem ≈ ${celkem:.2f}")


if __name__ == "__main__":
    main()
