# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Cedule Komise (S5): „Úřední hodiny: příští fáze.“ Text cedule se ukáže jako karta (prototyp:
# mluvčí „cedule“), pak ho Ruda okomentuje. Jen k prohlédnutí.

const Karta := preload("res://game/obrazovky/karta.gd")


#region Virtual ####################################################################################
# When the hotspot is clicked
func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	await _precist()


# When the hotspot is right clicked
func _on_right_click() -> void:
	await C.player.face_clicked()
	await _precist()


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

#region Private ####################################################################################
func _precist() -> void:
	await Karta.ukaz("ch1_ui_komise_cedule")
	await C.player.say("ch1_cedule_ruda")


#endregion
