#!/bin/sh
# Zpracuje listy chůze postavy vygenerované přes API na purpurovém pozadí (D89) do sad fází:
# docs/styl/vzorky/<postava>-chuze-{bok,predu,zezadu}_vNN.png → hra/grafika/postavy/<postava>_chuze_*/.
# Spuštění z kořene repozitáře:  sh tools/grafika/zpracuj_chuzi.sh bara [python s Pillow, numpy a scipy]
# Kroky: rozřezání listu (rozrez_list.py), u chůze bokem přebarvení červených šmouh na nohavicích
# (odbarvi_skvrny.py), zarovnání a změření kroku (hra/nastroje/sestav_faze.gd).
set -e
POSTAVA=${1:?Zadej postavu, např. bara}
PY=${2:-python3}
KOREN=$(git rev-parse --show-toplevel)
DOC=$(mktemp -d)
trap 'rm -rf "$DOC"' EXIT
for POHLED in bok predu zezadu; do
	LIST=$(ls "$KOREN/docs/styl/vzorky/$POSTAVA-chuze-$POHLED"_v*.png 2>/dev/null | sort | tail -1)
	[ -n "$LIST" ] || { echo "Chybí list $POSTAVA-chuze-$POHLED, přeskakuji"; continue; }
	"$PY" "$KOREN/tools/grafika/rozrez_list.py" "$LIST" "$DOC/$POHLED"
	[ "$POHLED" = bok ] && "$PY" "$KOREN/tools/grafika/odbarvi_skvrny.py" "$DOC/$POHLED" | grep -v "přebarveno 0 " || true
	CIL="$KOREN/hra/grafika/postavy/${POSTAVA}_chuze_$POHLED"
	# Smazat jen obrázky a popis fází; soubory .import zůstanou, aby se neměnila UID v Godotu
	rm -f "$CIL"/faze_*.png "$CIL"/faze.json
	godot --headless --path "$KOREN/hra" --script res://nastroje/sestav_faze.gd -- "$DOC/$POHLED" "$CIL" 2>&1 | grep "^Fází" | sed "s/^/  chuze_$POHLED: /"
done
