#!/bin/sh
# Spustí vyexportovaný balíček hry šablonou Godotu bez editoru a ověří, že jdou přeložit všechny
# skripty hry (režim kontrola_skriptu v nastroje/ladeni.gd). Hra spuštěná z editoru má k dispozici
# třídy editoru, takže chyby, které se projeví jen v exportu, ladicí průchody nezachytí.
# Spuštění z kořene repozitáře:  sh hra/nastroje/kontrola_exportu.sh [balíček.pck]
# Bez parametru zkontroluje webový export hra/export/web/index.pck. Volá ho nasad_web.sh.
set -e

KOREN=$(git rev-parse --show-toplevel)
cd "$KOREN"
BALICEK=${1:-hra/export/web/index.pck}
test -f "$BALICEK"

VERZE=$(godot --version | sed -E 's/^([0-9.]+\.[a-z0-9]+)\..*/\1/')
case "$(uname -s)" in
Darwin) SABLONY="$HOME/Library/Application Support/Godot/export_templates/$VERZE" ;;
Linux) SABLONY="${XDG_DATA_HOME:-$HOME/.local/share}/godot/export_templates/$VERZE" ;;
*) echo "Kontrola exportu: neznámý systém, přeskočeno."; exit 0 ;;
esac

# Šablona se vybalí jednou a uloží do hra/export/kontrola (export/ je mimo git i mimo import)
SLOZKA=hra/export/kontrola
mkdir -p "$SLOZKA"
HRA="$SLOZKA/hra_$(echo "$VERZE" | tr . _)"
if [ ! -x "$HRA" ]; then
	echo "Vybaluji šablonu Godotu $VERZE…"
	case "$(uname -s)" in
	Darwin)
		unzip -o -q -j "$SABLONY/macos.zip" \
			"macos_template.app/Contents/MacOS/godot_macos_release.universal" -d "$SLOZKA"
		mv "$SLOZKA/godot_macos_release.universal" "$HRA"
		;;
	Linux)
		ARCH=$(uname -m | sed 's/aarch64/arm64/')
		cp "$SABLONY/linux_release.$ARCH" "$HRA"
		;;
	esac
	chmod +x "$HRA"
fi

# Šablona nepovoluje --main-pack; balíček si najde sama, když leží vedle ní pod stejným jménem
cp "$BALICEK" "$HRA.pck"
VYPIS="$SLOZKA/vypis.txt"
set +e
"$HRA" --headless --quit-after 100000 -- kontrola_skriptu > "$VYPIS" 2>&1
KOD=$?
set -e
rm -f "$HRA.pck"

# Chyby skriptů doplňku Popochiu z editoru (EditorInterface…) jsou v exportu běžné a hře nevadí;
# hlídají se jen skripty hry
SOUHRN=$(grep "^\[kontrola skriptů\] načteno" "$VYPIS" || true)
if [ "$KOD" -ne 0 ] || [ -z "$SOUHRN" ] || grep -q "res://game/" "$VYPIS"; then
	echo "Kontrola exportu NEPROŠLA (kód $KOD). Celý výpis: $VYPIS"
	grep -E "res://game/|kontrola skriptů" "$VYPIS" | head -20
	exit 1
fi
echo "Kontrola exportu prošla: ${SOUHRN#\[kontrola skriptů\] }."
grep "^\[kontrola dabingu\]" "$VYPIS" | sed 's/^\[kontrola dabingu\] /Dabing v exportu, /' || true
