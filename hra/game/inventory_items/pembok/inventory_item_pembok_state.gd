# @popochiu-docs-ignore-class
extends PopochiuInventoryItemData

## Kolikrát už Pembok radil ke každému puzzlu (id nápovědy → počet); další zeptání posune stupeň
var stupne := {}
# Add variables here that should be saved and loaded with the game state.
# By default only Godot's built-in types are automatically saved/loaded.
# Use `save_custom` and `load_custom` to handle custom types.
# Note: `script_name` and `scene` variables inherited from the base class are not saved.


#region Virtual ####################################################################################
# Return a Dictionary of custom data to save for this PopochiuInventoryItem.
# The Dictionary must contain only JSON-supported types: bool, int, float, String.
# Slovník stupňů nápovědy Popochiu sám neuloží (I6), proto jde sem
func _on_save() -> Dictionary:
	return {stupne = stupne}


# Called when the game is loaded.
# The `data` Dictionary should match the structure returned by `_on_save()`.
# JSON vrací čísla jako desetinná, stupně jsou celá čísla (indexy nápovědy)
func _on_load(data: Dictionary) -> void:
	stupne = {}
	var ulozene: Dictionary = data.get("stupne", {})
	for id in ulozene:
		stupne[id] = int(ulozene[id])


#endregion
