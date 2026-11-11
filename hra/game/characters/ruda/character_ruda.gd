# @popochiu-docs-ignore-class
@tool
extends "res://game/spolecne/postava_faze.gd"
# Ruda Gantt, hlavní postava. Animace kreslenými fázemi (chůze, stání, mluvení, akce) řeší společný
# základ game/spolecne/postava_faze.gd; sady jsou v grafika/postavy/ruda_<sada>/.
# (Loutka s klouby z D39 zůstává jako záloha v game/spolecne/kostra.gd.)

const Data := preload('character_ruda_state.gd')

var state: Data = load("res://game/characters/ruda/character_ruda.tres")


#region Virtual ####################################################################################
func _nastav_animace() -> void:
	vzor_sad = "res://grafika/postavy/ruda_%s/"
	vyska_postavy = 988.0
	pomer_hlavy = 2.9


# Called when the character is clicked
func _on_click() -> void:
	# Replace the call to E.command_fallback() with your own logic.
	E.command_fallback()
	# Example: make the player walk to this character, face them, then say a line.
#	await C.player.walk_to_clicked()
#	await C.player.face_clicked()
#	await C.player.say("Hi!")


# Called when the character is double-clicked
func _on_double_click() -> void:
	# Replace the call to E.command_fallback() with your code.
	E.command_fallback()
	# Example: teleport the player to the character.
#	C.player.teleport_to_character(self)


# Called when the character is right-clicked
func _on_right_click() -> void:
	# Replace the call to E.command_fallback() with your own logic.
	E.command_fallback()
	# Example: make the player face the character and describe them.
#	await C.player.face_clicked()
#	await C.player.say("Mmmh, dude looks rad...")


# Called when the character is middle clicked
func _on_middle_click() -> void:
	# Replace the call to E.command_fallback() to implement your code.
	E.command_fallback()
	# Example: make the player say something without facing the character.
#	await C.player.say("I don't want to talk to this guy")


# Called when the character is clicked while an inventory item is selected
func _on_item_used(_item: PopochiuInventoryItem) -> void:
	# Replace the call to E.command_fallback() with your own logic.
	E.command_fallback()
	# Example: if the player uses a Key on this character, make the player say something.
#	if _item == I.Key:
#		await C.player.say("I don't want to give my key away!")


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
