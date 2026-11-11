# @popochiu-docs-ignore-class
@tool
extends PopochiuCharacter
# Babička Pozemková (S6): jediná dokončená stavba ve městě je její. O pozemku pod rampou mluví
# jen s tím, kdo přijde s mapou nebo po přečtení kocourova obojku (P1.10, R1.2). Když Ruda spěchal
# nebo sliboval, okno je zavřené do konce kapitoly. Nehybný obrázek ze schváleného listu
# (výřez z prototypu).

const Data := preload('character_babicka_state.gd')
## Mluvení fázemi úst
const Usta := preload("res://game/spolecne/usta.gd")

var state: Data = load("res://game/characters/babicka/character_babicka.tres")
var _usta = null


#region Virtual ####################################################################################
# Called when the room where this character is located has finished being added to the scene tree.
func _on_room_set() -> void:
	_usta = Usta.pripoj(self, _usta, "babicka")


# Called when the character is clicked
func _on_click() -> void:
	await _dojit()
	if Globals.c1_babicka == "odmitnuta":
		await C.player.say("ch1_babicka_zavreno")
		return
	D.Babicka.start()


# Called when the character is double-clicked
func _on_double_click() -> void:
	E.command_fallback()


# Called when the character is right-clicked
func _on_right_click() -> void:
	await C.player.face_clicked()
	await C.player.say("ch1_babicka_prohlednout")


# Called when the character is middle clicked
func _on_middle_click() -> void:
	E.command_fallback()


# Called when the character is clicked while an inventory item is selected
func _on_item_used(_item: PopochiuInventoryItem) -> void:
	# Podle matice předmětů (01-mistnosti.md): mapa ✔ otevře téma pozemku, dekret, káva a karta ★
	match _item:
		I.Mapa:
			await _dojit()
			if Globals.c1_babicka == "odmitnuta":
				await C.player.say("ch1_babicka_zavreno")
			elif Globals.c1_babicka == "spojenec":
				await say("ch1_babicka_pozemek_1")
			else:
				await C.player.say("ch1_babicka_mapa")
				await D.Babicka.pozemek()
				# Po vyslechnutí navazuje rozhovor (prototyp: '#babicka')
				if Globals.c1_babicka == "spojenec":
					D.Babicka.start()
		I.Dekret:
			await _dojit()
			await say("ch1_babicka_dekret")
		I.Kava:
			await _dojit()
			await say("ch1_babicka_kava")
		I.Karta:
			await _dojit()
			await say("ch1_babicka_karta")
		_:
			E.command_fallback()


# Override this to alter the idle animation or hook custom logic to it.
func _play_idle() -> void:
	Usta.mlc(_usta)
	super()


# Override this to alter the walk animation or hook custom logic to it.
func _play_walk(target_pos: Vector2) -> void:
	super(target_pos)


# Override this to alter the talk animation or hook custom logic to it.
func _play_talk() -> void:
	Usta.mluv(_usta)
	super()


# Override this to alter the grab animation or hook custom logic to it.
func _play_grab() -> void:
	super()


# Called when the character starts moving.
func _on_movement_started() -> void:
	pass


# Called when the character stops moving
func _on_movement_ended() -> void:
	pass


# Called when this character's movement is blocked by a region with walkable = false.
func _on_blocked_by_region(_region: PopochiuRegion) -> void:
	pass


#endregion

#region Private ####################################################################################
## Ruda dojde před branku a otočí se k babičce
func _dojit() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()


#endregion
