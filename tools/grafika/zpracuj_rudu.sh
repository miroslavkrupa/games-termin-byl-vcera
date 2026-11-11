#!/bin/sh
# Zpracuje přemalované listy Rudy (D92, vzorky ruda-styl-* na purpurovém pozadí) do sad fází ve hře:
# docs/styl/vzorky/ruda-styl-<list>_vNN.png → hra/grafika/postavy/ruda_<sada>/.
# Spuštění z kořene repozitáře:  sh tools/grafika/zpracuj_rudu.sh <python s Pillow, numpy a scipy> [list …]
# Bez názvů listů zpracuje všechny (chuze-bok chuze-predu chuze-zezadu stani akce).
# Kroky: rozřezání podle mřížky předlohy (ruda_listy.py rozrez), zarovnání a změření kroku
# (hra/nastroje/sestav_faze.gd). Model (tři pohledy) se bere z listu ruda-novy-styl.
set -e
PY=${1:?Zadej python s Pillow, numpy a scipy}
shift
KOREN=$(git rev-parse --show-toplevel)
cd "$KOREN"
DOC=$(mktemp -d)
trap 'rm -rf "$DOC"' EXIT
LISTY=${*:-chuze-bok chuze-predu chuze-zezadu stani akce model}
for NAZEV in $LISTY; do
	if [ "$NAZEV" = model ]; then
		LIST=$(ls docs/styl/vzorky/ruda-novy-styl_v*.png | sort | tail -1)
		"$PY" tools/grafika/rozrez_list.py "$LIST" "$DOC/model"
	else
		LIST=$(ls docs/styl/vzorky/ruda-styl-"$NAZEV"_v*.png 2>/dev/null | sort | tail -1)
		[ -n "$LIST" ] || { echo "Chybí list ruda-styl-$NAZEV, přeskakuji"; continue; }
		"$PY" tools/grafika/ruda_listy.py rozrez "$LIST" "$NAZEV" "$DOC"
	fi
done
for SADA in "$DOC"/*/; do
	SADA=$(basename "$SADA")
	CIL="hra/grafika/postavy/ruda_$SADA"
	# Smazat jen obrázky a popis fází; soubory .import zůstanou, aby se neměnila UID v Godotu
	rm -f "$CIL"/faze_*.png "$CIL"/faze.json
	godot --headless --path hra --script res://nastroje/sestav_faze.gd -- "$DOC/$SADA" "$KOREN/$CIL" 2>&1 | grep "^Fází" | sed "s/^/  $SADA: /"
done
