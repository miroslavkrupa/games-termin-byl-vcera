# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Fronta na frontu (S5, P1.11): bez papíru nemá smysl, s papírem se Ruda postaví a hra přepne na
# Báru v archivu (úsek za Báru, P1.12); po vystátí už je to jen fronta k prohlédnutí.


#region Virtual ####################################################################################
# When the hotspot is clicked
func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	if not I.is_item_in_inventory("Papir"):
		await C.player.say("ch1_fronta_bez_papiru")
	elif not R.Komise.state.fronta_hotova:
		await R.Komise.postavit_se_do_fronty()
	else:
		await C.player.say("ch1_fronta_prohlednout")


# When the hotspot is right clicked
func _on_right_click() -> void:
	await C.player.face_clicked()
	await C.player.say("ch1_fronta_prohlednout")


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
