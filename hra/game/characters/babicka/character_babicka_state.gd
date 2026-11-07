# @popochiu-docs-ignore-class
extends PopochiuCharacterData
# Stav babičky Pozemkové. Stav vztahu (c1_babicka) je v Globals, protože ho čte M02, Pembok,
# konec kapitoly a další kapitoly.

## Babička už Rudu uvítala („Zase někdo z radnice?“)
var uvitala := false


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
