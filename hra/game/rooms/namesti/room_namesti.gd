# @popochiu-docs-ignore-class
@tool
extends PopochiuRoom

const Data := preload('room_namesti_state.gd')

var state: Data = load("res://game/rooms/namesti/room_namesti.tres")

# Den a večer (paleta A a C, stylová bible). Postavy jsou kreslené v denním světle a do večerní
# scény je ladí barva světla (produkční zásady, Postavy ve scéně).
const POZADI_DEN := preload("res://grafika/mistnosti/namesti_den_siroke.png")
const POZADI_VECER := preload("res://grafika/mistnosti/namesti_vecer_siroke.png")
## Kašna jako popředí (postava za ní se schová), vyříznutá z pozadí nástrojem vyrez_popredi.gd
const KASNA_DEN := preload("res://grafika/mistnosti/namesti_den_kasna_popredi.png")
const KASNA_VECER := preload("res://grafika/mistnosti/namesti_vecer_kasna_popredi.png")
const SVETLO_DEN := Color(1, 1, 1)
const SVETLO_VECER := Color(0.66, 0.5, 0.64)


#region Virtual ####################################################################################
# Called when Popochiu loads the room. At this point the room is in the scene tree but not yet
# visible.
# Add any code you want to setup the stage before the room is shown to the player (e.g. setting
# character position and facing direction, active walkable area, props visibility, etc.).
func _on_room_entered() -> void:
	if C.player.last_room == "Archiv":
		# Návrat z archivu: Ruda stojí u dveří radnice
		C.player.position = Vector2(950, 748)
		C.player.face_down()
	else:
		# Začátek hry: Ruda stojí vpředu vedle kašny
		C.player.position = Vector2(640, 960)
	_nastav_svetlo()


# Called after the room transition completes; the room is now visible.
# Implement this to start cutscenes, play sounds, etc.
# NOTE: this is NOT called when loading a saved game. Use [_on_restore_from_savegame] for that.
func _on_room_transition_finished() -> void:
	# Výchozí věci z úvodu (návrh kapitoly 1, Výchozí stav); Pembok hned vysvětlí úkol
	if not state.vybava_dana:
		state.vybava_dana = true
		await I.Dekret.add()
		await I.Kava.add()
		await I.Propiska.add()
		await I.Pembok.add()
		await C.player.say("ch1_ruda_001")
		await I.Pembok.napoveda()


# Called before Popochiu unloads the room.
# At this point the screen is black, processing is disabled, and characters
# have been removed from the $Characters node.
# Implement cleanup code, handle custom data or states before leaving the room, etc. if needed.
func _on_room_exited() -> void:
	pass


# Called after loading a saved game. The state of the room and all its objects is
# completely restored at this point. Use this to resume ongoing events,
# re-establish connections, or restart ambient audio.
# NOTE: `_on_room_transition_finished()` is NOT called when loading a savegame.
# If you need to run its code when loading a savegame, you can call it explicitly from this method.
func _on_restore_from_savegame() -> void:
	pass


#endregion


#region Public #####################################################################################
## Přepne náměstí mezi dnem a večerem (s krátkým zatmíváním)
func prepni_den_vecer() -> void:
	var tween := create_tween()
	tween.tween_property(self, "modulate", Color.BLACK, 0.6)
	await tween.finished
	state.vecer = not state.vecer
	_nastav_svetlo()
	tween = create_tween()
	tween.tween_property(self, "modulate", Color.WHITE, 0.6)
	await tween.finished


#endregion

#region Private ####################################################################################
func _nastav_svetlo() -> void:
	get_prop("Background").texture = POZADI_VECER if state.vecer else POZADI_DEN
	get_prop("KasnaPopredi").texture = KASNA_VECER if state.vecer else KASNA_DEN
	var svetlo := SVETLO_VECER if state.vecer else SVETLO_DEN
	# Oblast Hloubka pokrývá celou dlažbu, takže její barva tónuje každou postavu na náměstí
	get_region("Hloubka").tint = svetlo
	for postava in get_characters():
		postava.modulate = svetlo


#endregion
