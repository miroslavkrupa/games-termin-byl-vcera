# @popochiu-docs-ignore-class
@tool
extends PopochiuRoom
# Starostova pracovna (S4, 2. patro): starosta Bohumil, noviny, fotky se stuhami, okno na kometu.
# Puzzle P1.8: souboj argumenty M03 (rozhovor R1.1) o podpis sponzora. Výtah = dveře vlevo.

const Data := preload('room_pracovna_state.gd')
## Překryvné okno souboje argumenty (M03)
const Souboj := preload("res://game/minihry/souboj/souboj.gd")

var state: Data = load("res://game/rooms/pracovna/room_pracovna.tres")


#region Virtual ####################################################################################
# Called when Popochiu loads the room. At this point the room is in the scene tree but not yet
# visible.
func _on_room_entered() -> void:
	# Ruda vystoupí z výtahu (dveře vlevo)
	C.player.position = Vector2(230, 790)
	C.player.face_right()


# Called after the room transition completes; the room is now visible.
func _on_room_transition_finished() -> void:
	if not state.navstivena:
		state.navstivena = true
		await C.player.say("ch1_pracovna_prichod")


# Called before Popochiu unloads the room.
func _on_room_exited() -> void:
	pass


# Called after loading a saved game.
func _on_restore_from_savegame() -> void:
	pass


#endregion


#region Public #####################################################################################
## Otevře souboj argumenty (M03) a počká na jeho konec; vyhodnocení je v souboj.gd
func otevri_souboj() -> void:
	var okno: CanvasLayer = Souboj.new()
	get_tree().root.add_child(okno)
	await okno.spust()


#endregion
