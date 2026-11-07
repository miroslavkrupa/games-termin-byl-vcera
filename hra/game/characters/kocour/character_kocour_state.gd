# @popochiu-docs-ignore-class
extends PopochiuCharacterData
# Stav kocoura Mourka. Přečtený obojek (obojek_videl) je v Globals, protože ho čte M02 a babička.

## Ruda si kocoura na náměstí už prohlédl (podruhé přečte obojek)
var namesti_prohlednut := false


#region Virtual ####################################################################################
# Return a Dictionary of custom data to save for this PopochiuCharacter.
# The Dictionary must contain only JSON-supported types: bool, int, float, String.
func _on_save() -> Dictionary:
	return {}


# Called when the game is loaded.
# The `data` Dictionary should match the structure returned by `_on_save()`.
func _on_load(data: Dictionary) -> void:
	prints(data)


#endregion
