# @popochiu-docs-ignore-class
@tool
extends PopochiuCharacter
# Starosta Bohumil (S4). Chce „něco, co bude v novinách“: podpis sponzora dá až po vyhraném souboji
# argumenty (M03, P1.8). Zatím nehybný obrázek ze schváleného listu (výřez z prototypu).

const Data := preload('character_starosta_state.gd')

var state: Data = load("res://game/characters/starosta/character_starosta.tres")


#region Virtual ####################################################################################
# Called when the room where this character is located has finished being added to the scene tree.
func _on_room_set() -> void:
	pass


# Called when the character is clicked
func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	if I.is_item_in_inventory("Podpis") or I.is_item_in_inventory("Papir"):
		# Po podpisu už starosta jen posílá na Komisi (prototyp: ch1_starosta_po_podpisu)
		await say("ch1_starosta_po_podpisu")
		return
	D.Starosta.start()


# Called when the character is double-clicked
func _on_double_click() -> void:
	E.command_fallback()


# Called when the character is right-clicked
func _on_right_click() -> void:
	await C.player.face_clicked()
	await C.player.say("ch1_starosta_prohlednout")


# Called when the character is middle clicked
func _on_middle_click() -> void:
	E.command_fallback()


# Called when the character is clicked while an inventory item is selected
func _on_item_used(_item: PopochiuInventoryItem) -> void:
	# Reakce podle matice předmětů (01-mistnosti.md): zadání a karta ✔ jsou repliky v M03,
	# mimo souboj je starosta odmítne; ostatní ★
	match _item:
		I.Dekret:
			await _dojit()
			await say("ch1_starosta_dekret")
		I.Kava:
			await _dojit()
			await say("ch1_starosta_kava")
		I.KavovePero:
			await _dojit()
			await say("ch1_starosta_kavove_pero")
		I.Plakat:
			await _dojit()
			await say("ch1_starosta_plakat")
		I.Zadani, I.Karta:
			await _dojit()
			await say("ch1_starosta_argument")
		I.Podpis:
			await _dojit()
			await say("ch1_starosta_podpis_predmet")
		_:
			E.command_fallback()


# Override this to alter the idle animation or hook custom logic to it.
func _play_idle() -> void:
	super()


# Override this to alter the walk animation or hook custom logic to it.
func _play_walk(target_pos: Vector2) -> void:
	super(target_pos)


# Override this to alter the talk animation or hook custom logic to it.
func _play_talk() -> void:
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
## Ruda dojde ke starostovi a otočí se k němu
func _dojit() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()


#endregion
