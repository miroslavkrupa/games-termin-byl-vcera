# @popochiu-docs-ignore-class
@tool
extends PopochiuRoom
# Babiččina chaloupka pod rampou (S6): babička Pozemková na zápraží, kocour na plotě, lavička,
# plot a rampa. Puzzle P1.10 (rozhovor R1.2) o pozemek pod rampou a razítkovou podušku.
# Ulička vlevo vede zpátky na náměstí. Podle prototypu (kapitola1.js, scéna chaloupka).

const Data := preload('room_chaloupka_state.gd')

var state: Data = load("res://game/rooms/chaloupka/room_chaloupka.tres")


#region Virtual ####################################################################################
# Called when Popochiu loads the room. At this point the room is in the scene tree but not yet
# visible.
func _on_room_entered() -> void:
	# Uličkou z náměstí: Ruda přichází zleva po cestě
	C.player.position = Vector2(170, 900)
	C.player.face_right()


# Called after the room transition completes; the room is now visible.
func _on_room_transition_finished() -> void:
	if not state.navstivena:
		state.navstivena = true
		await C.player.say("ch1_chaloupka_prichod")


# Called before Popochiu unloads the room.
func _on_room_exited() -> void:
	pass


# Called after loading a saved game.
func _on_restore_from_savegame() -> void:
	pass


#endregion
