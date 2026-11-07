# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Ulička k rampě (východ do S6, babiččina chaloupka): průchod vlevo za kašnou, nad ním trčí
# rampa, rovná jako pravítko. Do chaloupky jde kdykoli (01-pruchod.md).


#region Virtual ####################################################################################
# When the hotspot is clicked
func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	R.goto_room("Chaloupka")


# When the hotspot is right clicked
func _on_right_click() -> void:
	await C.player.face_clicked()
	await C.player.say("ch1_ulicka_prohlednout")


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
