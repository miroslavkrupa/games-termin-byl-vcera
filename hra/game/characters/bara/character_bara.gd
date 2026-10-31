# @popochiu-docs-ignore-class
@tool
extends PopochiuCharacter
# You can use `E.queue([])` in any of the methods in this script to trigger a sequence of events.
# Use `await E.queue([])` to pause execution until the sequence completes.

const Data := preload('character_bara_state.gd')

var state: Data = load("res://game/characters/bara/character_bara.tres")


#region Virtual ####################################################################################
# Called when the room where this character is located has finished being added to the scene tree.
func _on_room_set() -> void:
	pass


# Called when the character is clicked
func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	if R.Namesti.state.bara_mluvila:
		D.Bara.start()
	else:
		await _prvni_rozhovor()


# Called when the character is double-clicked
func _on_double_click() -> void:
	# Replace the call to E.command_fallback() with your code.
	E.command_fallback()
	# Example: teleport the player to the character.
#	C.player.teleport_to_character(self)


# Called when the character is right-clicked
func _on_right_click() -> void:
	await C.player.face_clicked()
	await C.player.say("ch1_bara_prohlednout")


# Called when the character is middle clicked
func _on_middle_click() -> void:
	# Replace the call to E.command_fallback() to implement your code.
	E.command_fallback()
	# Example: make the player say something without facing the character.
#	await C.player.say("I don't want to talk to this guy")


# Called when the character is clicked while an inventory item is selected
func _on_item_used(_item: PopochiuInventoryItem) -> void:
	match _item:
		I.Dekret:
			await C.player.say("ch1_bara_dekret")
		_:
			E.command_fallback()


# Override this to alter the idle animation or hook custom logic to it. 
# By default, it plays the "idle" animation from the character's Sprite.
func _play_idle() -> void:
	# If you want to preserve the default idle behavior, make sure to keep
	# the call to `super()` in your override.
	super()


# Override this to alter the walk animation or hook custom logic to it. 
# `target_pos` can be used to determine the movement direction.
# By default, it plays the "walk" animation from the character's Sprite.
func _play_walk(target_pos: Vector2) -> void:
	# If you want to preserve the default walking behavior, make sure to keep
	# the call to `super(target_pos)` in your override.
	super(target_pos)


# Override this to alter the talk animation or hook custom logic to it.
# By default, it plays the "talk" animation from the character's Sprite.
func _play_talk() -> void:
	# If you want to preserve the default talk behavior, make sure to keep
	# the call to `super()` in your override.
	super()


# Override this to alter the grab animation or hook custom logic to it.
# By default, it plays the "grab" animation from the character's Sprite.
func _play_grab() -> void:
	# If you want to preserve the default grab behavior, make sure to keep
	# the call to `super()` in your override.
	super()


# Called when the character starts moving.
# Implement any logic you want to trigger at the start of movement here.
# For example, you could play a sound effect or make something happen in the room.
func _on_movement_started() -> void:
	pass


# Called when the character stops moving
# Implement any logic you want to trigger at the start of movement here.
# For example, you could play a sound effect or make something happen in the room.
func _on_movement_ended() -> void:
	pass


# Called when this character's movement is blocked by a region with walkable = false.
# Override to react to the event: play a sound, show a hint, trigger dialogue, etc.
# `_region` is the PopochiuRegion that stopped the character.
func _on_blocked_by_region(_region: PopochiuRegion) -> void:
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
# character is the target.
# This keeps the code way more tidy and organized with GUIs with many different commands,
# as opposed to having a single `match` statement in the general-use methods.


#endregion

#region Private ####################################################################################
# První rozhovor s Bárou (R1.3, návrh kapitoly 1): Bára třikrát začne větu a Ruda ji může nechat
# domluvit, nebo jí skočit do řeči. Číslo projektu řekne jen tomu, kdo ji nechal domluvit.
func _prvni_rozhovor() -> void:
	R.Namesti.state.bara_mluvila = true
	await C.player.say("ch1_bara_uvod_ruda")
	await say("ch1_bara_uvod")
	# 1. rampa
	await say("ch1_bara_001")
	if await _vyslechnout("ch1_ruda_020"):
		await say("ch1_bara_001_dokonci")
	else:
		await say("ch1_bara_001_prerusena")
	# 2. kolik lidí má Archa uvézt
	await say("ch1_bara_002")
	if await _vyslechnout("ch1_bara_skok_2"):
		await say("ch1_bara_002_dokonci")
		Globals.c1_bara_kriteria = true
	else:
		await say("ch1_bara_002_prerusena")
	if Globals.c1_bara_vyslechnuta == 0:
		await say("ch1_bara_odchod")
		return
	# 3. číslo projektu
	await say("ch1_bara_003")
	if await _vyslechnout("ch1_bara_skok_3"):
		await say("ch1_bara_003_dokonci")
		await C.player.say("ch1_bara_cislo_ruda")
		Globals.c1_cislo_projektu = true
		R.Namesti.state.bara_rekla_cislo = true
	else:
		await say("ch1_bara_odchod")


## Nabídne „nechat domluvit“ a „skočit do řeči“ (repliku [param skok]); vrací true, když Ruda poslouchal
func _vyslechnout(skok: String) -> bool:
	var volba: PopochiuDialogOption = await D.show_inline_dialog(["ch1_bara_volba_vyslechnout", skok])
	if volba.id == "0":
		Globals.c1_bara_vyslechnuta += 1
		return true
	await C.player.say(skok)
	return false


#endregion
