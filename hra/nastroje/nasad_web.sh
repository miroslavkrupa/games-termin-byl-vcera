#!/bin/sh
# Vyexportuje webovou verzi hry a nahraje ji do větve gh-pages (GitHub Pages).
# Spuštění z kořene repozitáře:  sh hra/nastroje/nasad_web.sh
# Hra pak běží na https://<uživatel>.github.io/<repozitář>/ (Pages mají HTTPS, které Godot na webu vyžaduje).
set -e

KOREN=$(git rev-parse --show-toplevel)
cd "$KOREN"
VERZE=$(git rev-parse --short HEAD)
DOCASNA=$(mktemp -d)
trap 'git worktree remove --force "$DOCASNA" 2>/dev/null; rm -rf "$DOCASNA"' EXIT

echo "Kontrola textů…"
python3 hra/nastroje/kontrola_textu.py > /dev/null

echo "Export webové verze…"
mkdir -p hra/export/web
# Godot nemá exportované soubory importovat jako součást projektu
touch hra/export/.gdignore
rm -f hra/export/web/*.import
godot --headless --path hra --import > /dev/null 2>&1
godot --headless --path hra --export-release "Web" export/web/index.html > /dev/null 2>&1
test -f hra/export/web/index.pck

echo "Kontrola skriptů v exportu…"
sh hra/nastroje/kontrola_exportu.sh hra/export/web/index.pck

echo "Příprava větve gh-pages…"
git fetch -q origin gh-pages 2>/dev/null || true
if git show-ref -q --verify refs/remotes/origin/gh-pages; then
	git worktree add -q -B gh-pages "$DOCASNA" origin/gh-pages
else
	git worktree add -q --orphan -b gh-pages "$DOCASNA"
fi
find "$DOCASNA" -mindepth 1 -not -path "$DOCASNA/.git*" -delete
find hra/export/web -maxdepth 1 -type f ! -name "*.import" -exec cp {} "$DOCASNA/" \;
touch "$DOCASNA/.nojekyll"

cd "$DOCASNA"
git add -A
git commit -q -m "Webová verze hry z $VERZE"
git push -q origin gh-pages
echo "Nahráno do gh-pages (verze $VERZE)."
