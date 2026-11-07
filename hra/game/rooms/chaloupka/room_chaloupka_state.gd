# @popochiu-docs-ignore-class
extends PopochiuRoomData
# Stav babiččiny chaloupky (kapitola 1, S6). Stav babičky (c1_babicka) a obojek kocoura jsou
# v Globals, protože je čte M02, Pembok a další kapitoly.

## Ruda už v chaloupce byl (replika při prvním příchodu)
var navstivena := false


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
