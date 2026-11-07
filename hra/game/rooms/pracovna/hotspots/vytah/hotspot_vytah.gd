# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Výtah v pracovně (dveře vlevo): tlačítka pater nabízí dialog Vytah (přízemí, Komise v I4).


#region Virtual ####################################################################################
# When the hotspot is clicked
func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	D.Vytah.start()


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


# Called when the hotspot starts moving
func _on_movement_started() -> void:
	pass


# Called when the hotspot stops moving
func _on_movement_ended() -> void:
	pass


#endregion
