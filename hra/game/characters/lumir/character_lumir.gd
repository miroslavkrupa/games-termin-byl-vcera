# @popochiu-docs-ignore-class
@tool
extends PopochiuCharacter
# Archivář Lumír (S3). Bez čísla projektu nepustí ani myš (P1.4); po vstupu vydává krabice podle
# čísla (P1.6) a půjčuje kartu poučení za podpis (P1.7). Zatím nehybný obrázek ze schváleného listu.

const Data := preload('character_lumir_state.gd')
## Mluvení fázemi úst
const Usta := preload("res://game/spolecne/usta.gd")

var state: Data = load("res://game/characters/lumir/character_lumir.tres")
var _usta = null


#region Virtual ####################################################################################
# Called when the room where this character is located has finished being added to the scene tree.
func _on_room_set() -> void:
	_usta = Usta.pripoj(self, _usta, "lumir")


# Called when the character is clicked
func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	if R.Archiv.hraje_bara():
		# Úsek za Báru (I5): Lumír Báru zná
		D.UsekLumir.start()
		return
	# Jeden dialog pro obě fáze: před vstupem jen číslo projektu, po vstupu všechna témata
	D.Lumir.start()


# Called when the character is double-clicked
func _on_double_click() -> void:
	# Replace the call to E.command_fallback() with your code.
	E.command_fallback()
	# Example: teleport the player to the character.
#	C.player.teleport_to_character(self)


# Called when the character is right-clicked
func _on_right_click() -> void:
	await C.player.face_clicked()
	if R.Archiv.hraje_bara():
		await C.player.say("ch1_usek_lumir_prohlednout")
		return
	await C.player.say("ch1_lumir_prohlednout")


# Called when the character is middle clicked
func _on_middle_click() -> void:
	# Replace the call to E.command_fallback() to implement your code.
	E.command_fallback()
	# Example: make the player say something without facing the character.
#	await C.player.say("I don't want to talk to this guy")


# Called when the character is clicked while an inventory item is selected
func _on_item_used(_item: PopochiuInventoryItem) -> void:
	# Reakce podle matice předmětů (01-mistnosti.md): ✔ plakát a kávové pero, ★ ostatní
	var stav = R.Archiv.state
	if R.Archiv.hraje_bara():
		# Bářiny věci (metr, seznam) Lumírovi nepatří: výchozí reakce Báry
		E.command_fallback()
		return
	match _item:
		I.Plakat:
			await _dojit()
			await say("ch1_lumir_plakat")
			stav.archiv_vstup = true
		I.KavovePero:
			await _dojit()
			if await R.Archiv.lumir_zastavi():
				return
			if stav.karta_pujcena:
				await say("ch1_lumir_karta_vratit")
				return
			await C.player.animuj_akci("pouziti")
			await say("ch1_lumir_karta_pero_1")
			await say("ch1_lumir_karta_pero_2")
			await I.Karta.add()
			stav.karta_pujcena = true
		I.Propiska:
			await _dojit()
			await say("ch1_lumir_propiska")
		I.Dekret:
			await _dojit()
			await say("ch1_lumir_dekret")
		I.Kava:
			await _dojit()
			await say("ch1_lumir_kava")
		I.Pozadavek:
			await _dojit()
			await say("ch1_lumir_pozadavek")
		I.Zadani:
			await _dojit()
			await say("ch1_lumir_zadani")
		I.Karta:
			await _dojit()
			await say("ch1_lumir_karta_vratit")
		_:
			E.command_fallback()


# Override this to alter the idle animation or hook custom logic to it.
# By default, it plays the "idle" animation from the character's Sprite.
func _play_idle() -> void:
	Usta.mlc(_usta)
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
	Usta.mluv(_usta)
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

#region Private ####################################################################################
## Ruda dojde k Lumírovi a otočí se k němu (předmět se podává z ruky do ruky)
func _dojit() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()


#endregion
