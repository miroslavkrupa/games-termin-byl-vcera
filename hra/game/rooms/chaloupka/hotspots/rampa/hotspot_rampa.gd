# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Rampa nad chaloupkou: jediná rovná stavba ve městě (D34), zárodek kapitoly 2. Jen k prohlédnutí.


#region Virtual ####################################################################################
# When the hotspot is clicked
func _on_click() -> void:
	# Prototyp nemá vlastní reakci na použití: výchozí reakce z GUI
	PopochiuUtils.e.command_fallback()


# When the hotspot is right clicked
func _on_right_click() -> void:
	await C.player.face_clicked()
	await C.player.say("ch1_rampa_prohlednout")


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
