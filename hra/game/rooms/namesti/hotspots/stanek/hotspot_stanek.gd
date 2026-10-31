# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# You can use `E.queue([])` in any of the methods in this script to trigger a sequence of events.
# Use `await E.queue([])` to pause execution until the sequence completes.


#region Virtual ####################################################################################
# When the hotspot is clicked
func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	D.PanZmena.start()


# Called when the hotspot is double-clicked
func _on_double_click() -> void:
	# Replace the call to E.command_fallback() with your own logic.
	PopochiuUtils.e.command_fallback()
	# Example: on an exit hotspot you could instantly change rooms instead of waiting for the player
	# to walk there.
#	await R.current = R.NewRoom


# When the hotspot is right clicked
func _on_right_click() -> void:
	await C.player.face_clicked()
	await C.player.say("ch1_stanek_prohlednout")
	await C.player.say("ch1_stanek_plakat")
	R.Namesti.state.plakat_videl = true


# Called when the hotspot is middle clicked
func _on_middle_click() -> void:
	# Replace the call to E.command_fallback() with your own logic.
	PopochiuUtils.e.command_fallback()


# Called when the hotspot is clicked and there is an inventory item selected
func _on_item_used(item: PopochiuInventoryItem) -> void:
	match item:
		I.KavovePero:
			await C.player.walk_to_clicked()
			await C.player.face_clicked()
			await C.player.animuj_akci("pouziti")
			await _dohoda()
		I.Propiska:
			await C.player.say("ch1_stanek_propiska")
		I.Kava:
			await C.player.say("ch1_stanek_kava")
		_:
			E.command_fallback()


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


#region Private ####################################################################################
# Ruda zapíše požadavek Pana Změny kávovým perem a nechá ho podepsat (zárodek řízení změn)
func _dohoda() -> void:
	if Globals.c1_zmena_dohoda:
		await C.PanZmena.say("ch1_zmena_dohoda_uz")
		return
	await C.player.say("ch1_zmena_dohoda_ruda_1")
	await C.PanZmena.say("ch1_zmena_dohoda_1")
	await C.player.say("ch1_zmena_dohoda_ruda_2")
	await C.PanZmena.say("ch1_zmena_002")
	await C.player.say("ch1_zmena_dohoda_ruda_3")
	Globals.c1_zmena_dohoda = true
	# S podepsaným požadavkem přestane měnit názor a plakát vydá (návrh kapitoly 1, puzzle 3)
	await C.PanZmena.say("ch1_zmena_plakat_1")
	await I.Pozadavek.add()
	await I.Plakat.add()
	R.Namesti.state.plakat_videl = true
	Globals.c1_cislo_projektu = true
	await C.player.say("ch1_plakat_cislo")
