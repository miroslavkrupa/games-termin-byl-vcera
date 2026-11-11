# @popochiu-docs-ignore-class
@tool
extends PopochiuCharacter
# Kocour Mourek: zrzavý, s natrženým uchem, soudí. Toulá se u kašny na náměstí a sedí na plotě
# u chaloupky (v prototypu je v obou scénách). Obojek („Pozemková, pozemek pod rampou“) odhaluje
# babičku (P1.10): na náměstí ho Ruda přečte až napodruhé, v chaloupce hned. Nehybný obrázek ze
# schváleného listu (výřez z prototypu).

const Data := preload('character_kocour_state.gd')
## Mluvení fázemi úst
const Usta := preload("res://game/spolecne/usta.gd")

var state: Data = load("res://game/characters/kocour/character_kocour.tres")
var _usta = null


#region Virtual ####################################################################################
# Called when the room where this character is located has finished being added to the scene tree.
func _on_room_set() -> void:
	_usta = Usta.pripoj(self, _usta, "kocour")


# Called when the character is clicked
func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	await C.player.say("ch1_kocour_mluvit_ruda")
	Zvuk.efekt("kocour")
	await say("ch1_kocour_mluvit")
	await C.player.say("ch1_kocour_mluvit_ruda_2")


# Called when the character is double-clicked
func _on_double_click() -> void:
	E.command_fallback()


# Called when the character is right-clicked
func _on_right_click() -> void:
	await C.player.face_clicked()
	if R.current.script_name == "Chaloupka":
		# Na plotě: prototyp říká obě repliky najednou
		await C.player.say("ch1_kocour_plot")
		await C.player.say("ch1_kocour_obojek")
		Globals.obojek_videl = true
	elif not state.namesti_prohlednut:
		# Na náměstí: poprvé jen kocour, podruhé obojek (prototyp: stridat, dokola: false)
		state.namesti_prohlednut = true
		await C.player.say("ch1_kocour_prohlednout")
	else:
		await C.player.say("ch1_kocour_obojek")
		Globals.obojek_videl = true


# Called when the character is middle clicked
func _on_middle_click() -> void:
	E.command_fallback()


# Called when the character is clicked while an inventory item is selected
func _on_item_used(_item: PopochiuInventoryItem) -> void:
	# Matice předmětů: káva ★ (kocour pohrdá), ostatní výchozí reakce
	match _item:
		I.Kava:
			await C.player.walk_to_clicked()
			await C.player.face_clicked()
			await C.player.say("ch1_kocour_kava")
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
