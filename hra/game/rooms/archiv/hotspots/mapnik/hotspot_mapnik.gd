# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Mapník s katastrálními mapami: mapy nejsou projekty, Ruda si jednu vezme (P1.9).


#region Virtual ####################################################################################
# When the hotspot is clicked
func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	if R.Archiv.hraje_bara():
		E.command_fallback()
		return
	if await R.Archiv.lumir_zastavi():
		return
	if I.is_item_in_inventory("Mapa"):
		await C.player.say("ch1_mapnik_prohlednout")
		return
	await C.player.animuj_akci("zvednuti")
	await C.player.say("ch1_mapnik_vzit")
	await I.Mapa.add()


# When the hotspot is right clicked
func _on_right_click() -> void:
	await C.player.face_clicked()
	if R.Archiv.hraje_bara():
		await C.player.say("ch1_usek_mapnik")
		return
	await C.player.say("ch1_mapnik_prohlednout")


# Called when the hotspot is double-clicked
func _on_double_click() -> void:
	# Replace the call to E.command_fallback() with your own logic.
	PopochiuUtils.e.command_fallback()
	# Example: on an exit hotspot you could instantly change rooms instead of waiting for the player
	# to walk there.
#	await R.current = R.NewRoom


# Called when the hotspot is middle clicked
func _on_middle_click() -> void:
	# Replace the call to E.command_fallback() with your own logic.
	PopochiuUtils.e.command_fallback()


# Called when the hotspot is clicked and there is an inventory item selected
func _on_item_used(_item: PopochiuInventoryItem) -> void:
	# Replace the call to E.command_fallback() with your own logic.
	PopochiuUtils.e.command_fallback()
	# Example: if a Key is used here, make the player say something.
#	if _item == I.Key:
#		await C.player.say("No can do")


# Called when the hotspot starts moving
func _on_movement_started() -> void:
	pass


# Called when the hotspot stops moving
func _on_movement_ended() -> void:
	pass


#endregion

#region Public #####################################################################################
# Add functions here that are triggered by GUI commands.
#
# If you name the functions following the `on_<command_id>` pattern, they will be automatically
# called when the corresponding command is triggered in the GUI.
#
# For example, if your GUI provides a `look_at` command you could add:
#
#func on_look_at() -> void:
#	pass
#
# This function will be called whenever the `look_at` command is triggered in the GUI while this
# hotspot is the target.
# This keeps the code way more tidy and organized with GUIs with many different commands,
# as opposed to having a single `match` statement in the general-use methods.


#endregion
