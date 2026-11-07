# @popochiu-docs-ignore-class
extends PopochiuRoomData
# Add variables here that should be saved and restored with the room state.
# By default only Godot's built-in types are saved/loaded automatically.
# Use `save_custom` and `load_custom` to handle custom data types.
# Note: `script_name` and `scene` variables inherited from the base class are not saved.

## Ruda už dostal výchozí věci (dekret, káva, propiska, Pembok; návrh kapitoly 1, Výchozí stav)
var vybava_dana := false
## Ruda už byl v archivu
var archiv_navstiven := false
## Ruda už mluvil s Bárou (první rozhovor R1.3 je jen jeden)
var bara_mluvila := false
## Číslo projektu řekla Bára (ne plakát)
var bara_rekla_cislo := false
## Vrátný řekl, že o Arše rozhoduje starosta ve 2. patře
var vratny_rekl_starosta := false
## Ruda si všiml plakátu Archy, do kterého Pan Změna balí zboží
var plakat_videl := false
## Kolikrát se Ruda ptal Pana Změny, co chce za plakát (pokaždé chce něco jiného)
var zmena_prani := 0
## Pembok už vysvětlil úkol (poprvé otevřený)
var pembok_otevren := false
## Stupeň nápovědy k Panu Změnovi (0 = náznak, 1 = řešení)
var napoveda_zmena := 0
## Na náměstí je večer (prototyp K7: paleta C a tónování postav)
var vecer := false
## Pan Změna vyprávěl o Arše („Aby to bylo hezký“): nesmyslné útržky cíle a kritérií pro M01 (I5)
var slysel_zmena_archa := false
## Bára řekla, co na Archu nepatří (bazén, terasa, fontána): dobrý útržek „mimo rozsah“ pro M01 (I5)
var utrzek_mimo := false


#region Virtual ####################################################################################
# Return a Dictionary of custom data to save for this PopochiuRoom.
# The Dictionary must contain only JSON-supported types: bool, int, float, String.
func _on_save() -> Dictionary:
	return {}


# Called when the game is loaded.
# The `data` Dictionary should match the structure returned by `_on_save()`.
func _on_load(data: Dictionary) -> void:
	prints(data)


#endregion
