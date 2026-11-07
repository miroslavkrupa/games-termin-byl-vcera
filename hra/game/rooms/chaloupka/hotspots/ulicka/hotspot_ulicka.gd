# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Ulička z chaloupky zpátky na náměstí (východ do S1). Leží na levém okraji; na obrazovce 3:2 je
# vidět jen její pravá část (pás od x = 0), na širší obrazovce i cesta v křídle pozadí.


#region Virtual ####################################################################################
# When the hotspot is clicked
func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	R.goto_room("Namesti")


# When the hotspot is right clicked
func _on_right_click() -> void:
	# Prototyp nemá vlastní repliku: výchozí reakce z GUI
	PopochiuUtils.e.command_fallback()


# Called when the hotspot is double-clicked
func _on_double_click() -> void:
	PopochiuUtils.e.command_fallback()


# Called when the hotspot is middle clicked
func _on_middle_click() -> void:
	PopochiuUtils.e.command_fallback()


# Called when the hotspot is clicked and there is an inventory item selected
func _on_item_used(_item: PopochiuInventoryItem) -> void:
	PopochiuUtils.e.command_fallback()


#endregion
