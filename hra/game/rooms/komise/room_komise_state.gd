# @popochiu-docs-ignore-class
extends PopochiuRoomData
# Stav kanceláře Komise (kapitola 1, S5). Příznaky odpovídají šedému prototypu
# (prototyp/kapitola1.js, scéna komise a dialogy predseda, faze). Ukládají se s hrou.
# Výsledky, které čtou další kapitoly (c1_razitko, c1_faze2, c1_charter_kvalita, c1_mimo_rozsah,
# c1_seznam_pasazeru), jsou v Globals.

## Ruda už v Komisi byl (replika při prvním příchodu)
var navstivena := false
## Předseda už Rudu uvítal („Vítejte v Komisi pro schvalování komisí.“)
var predseda_uvital := false
## Ing. Framework už se představil („Řeším fronty. Za poplatek.“)
var framework_uvital := false
## Předseda už po frontě řekl „Další, prosím. Zcela bez spěchu.“
var predseda_dalsi := false
## Předseda s razítkem souhlasí (P1.13): poduška je „ve fázi 2“, ale orazítkuje, co bude mokré
var predseda_souhlas := false
## Razítko je na papíru (modré poduškou, nebo hnědé kávou); otevírá R1.4
var razitko_hotovo := false
## Ruda polil podušku kávou dřív, než Předseda souhlasil (K12): razítko pak přijde hned po souhlasu
var poduska_mokra := false
## Předseda už připsal „…a následné fáze“ (úvod R1.4 jen jednou)
var faze_uvod := false
## Fronta na frontu je vystátá (po úseku za Báru, P1.11/P1.12)
var fronta_hotova := false
## Po návratu z úseku za Báru už proběhla karta „Hraješ za Rudu“ a „Jsem na řadě!“
var fronta_navrat := false
## Ruda si razítko prohlédl (druhé prohlédnutí: „Něco hnědého a tekutého by tu chtělo…“)
var razitko_prohlednuto := false
## Volba „Mám návrh na Archu“ použitá bez podpisu / s podpisem (prototyp: dvě volby „jednou“)
var navrh_bez_podpisu := false
var navrh_s_podpisem := false
## Předseda řekl nesmyslný termín („Až to bude.“): útržek pro M01
var utrzek_termin_nesmysl := false
## Předseda řekl, kdo rozhoduje („Komise pro schvalování komisí.“): nesmyslný útržek pro M01
var utrzek_kdo_nesmysl := false
## M01: rozpracované přiřazení útržků ke kolonkám (id kolonky → id útržku); zůstává i po zavření okna
var m01_prirazeni := {}


#region Virtual ####################################################################################
# Return a Dictionary of custom data to save for this PopochiuRoom.
# The Dictionary must contain only JSON-supported types: bool, int, float, String.
# Slovník rozpracovaného M01 Popochiu sám neuloží (I6), proto jde sem
func _on_save() -> Dictionary:
	return {m01_prirazeni = m01_prirazeni}


# Called when the game is loaded.
# The `data` Dictionary should match the structure returned by `_on_save()`.
func _on_load(data: Dictionary) -> void:
	m01_prirazeni = data.get("m01_prirazeni", {})


#endregion
