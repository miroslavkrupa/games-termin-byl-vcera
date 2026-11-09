#!/bin/sh
# Automatický průchod kapitolou (krok N7 postupu): pustí hru bez okna s kroky ze souboru
# hra/nastroje/pruchody/<jméno>.txt, každou variantu ze směrnice „varianty“ zvlášť a všechny
# najednou. Průchod projde, když hra dojde až do hlavního menu za koncem kapitoly, všechny
# kontroly v souboru sedí a ve výpisu hry není chyba skriptu.
# Spuštění z kořene repozitáře:
#   sh hra/nastroje/pruchod.sh                  všechny soubory a všechny jejich varianty
#   sh hra/nastroje/pruchod.sh kapitola1        jeden soubor, všechny varianty
#   sh hra/nastroje/pruchod.sh kapitola1 A E    jen vybrané varianty
# RYCHLOST=1 pustí hru skutečnou rychlostí (výchozí je 4). Výpisy jsou v hra/export/pruchody/.
set -e

KOREN=$(git rev-parse --show-toplevel)
cd "$KOREN"
SLOZKA=hra/export/pruchody
mkdir -p "$SLOZKA"
# Godot nemá exportované soubory importovat jako součást projektu
touch hra/export/.gdignore

if [ $# -eq 0 ]; then
	SOUBORY=$(ls hra/nastroje/pruchody/*.txt | sed 's|.*/||; s|\.txt$||')
else
	SOUBORY=$1
	shift
fi
VYBRANE="$*"

# Import předem: souběžné běhy by jinak mohly importovat změněné soubory (a texty) naráz
echo "Import projektu…"
godot --headless --path hra --import > /dev/null 2>&1

behy=""
for soubor in $SOUBORY; do
	varianty=$(sed -n 's/#.*//; s/^varianty //p' "hra/nastroje/pruchody/$soubor.txt")
	[ -n "$varianty" ] || varianty=zaklad
	[ -z "$VYBRANE" ] || varianty=$VYBRANE
	for varianta in $varianty; do
		godot --headless --path hra -- pruchod "$soubor" varianta="$varianta" rychlost="${RYCHLOST:-4}" \
			> "$SLOZKA/${soubor}_$varianta.txt" 2>&1 &
		behy="$behy $!:$soubor:$varianta"
		echo "Spuštěn průchod $soubor, varianta $varianta"
	done
done

selhalo=0
for beh in $behy; do
	pid=${beh%%:*}
	zbytek=${beh#*:}
	soubor=${zbytek%%:*}
	varianta=${zbytek#*:}
	vypis="$SLOZKA/${soubor}_$varianta.txt"
	if wait "$pid" && ! grep -q "SCRIPT ERROR" "$vypis"; then
		echo "Prošel $soubor $varianta: $(grep -a '\[průchod\] HOTOVO' "$vypis" | sed 's/.*: //')"
	else
		echo "NEPROŠEL $soubor $varianta (výpis $vypis):"
		grep -a "\[průchod\] CHYBA\|\[průchod\] varianta\|\[průchod\] soubor\|SCRIPT ERROR" "$vypis" | head -5 | sed 's/^/  /'
		selhalo=1
	fi
done
exit $selhalo
