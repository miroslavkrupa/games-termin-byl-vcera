# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Předsedův telefon (S5): bez číselníku; na konci kapitoly do něj Předseda říká „Pustil jsem ho dál…“


#region Virtual ####################################################################################
# When the hotspot is clicked
func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	await C.player.say("ch1_telefon_pouzit")


# When the hotspot is right clicked
func _on_right_click() -> void:
	await C.player.face_clicked()
	await C.player.say("ch1_telefon_prohlednout")


# Called when the hotspot is double-clicked
func _on_double_click() -> void:
	PopochiuUtils.e.command_fallback()


# Called when the hotspot is middle clicked
func _on_middle_click() -> void:
	PopochiuUtils.e.command_fallback()


# Called when the hotspot is clicked and there is an inventory item selected
func _on_item_used(_item: PopochiuInventoryItem) -> void:
	PopochiuUtils.e.command_fallback()


# Called when the hotspot starts moving
func _on_movement_started() -> void:
	pass


# Called when the hotspot stops moving
func _on_movement_ended() -> void:
	pass


#endregion
