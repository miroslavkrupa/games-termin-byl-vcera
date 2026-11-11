# @popochiu-docs-ignore-class
@tool
extends PopochiuRoom
# Vestibul radnice (S2): rozcestí mezi náměstím, archivem ve sklepě a výtahem. Výtah jezdí do 1½
# (Komise, I4); do 2. patra ke starostovi až po zapojení tlačítka „2“ z archivu (P1.6).
# Vrátný tu hlídá dveře, termosku a křížovku (P1.1).

const Data := preload('room_vestibul_state.gd')
## Panel tlačítek výtahu: bez dvojky (díra) a s dvojkou (malované kulisy, dvojka je složená z tlačítka 1)
const TLACITKA_BEZ := preload("res://grafika/mistnosti/vestibul_tlacitka_bez.png")
const TLACITKA_S := preload("res://grafika/mistnosti/vestibul_tlacitka_s.png")

var state: Data = load("res://game/rooms/vestibul/room_vestibul.tres")


#region Virtual ####################################################################################
# Called when Popochiu loads the room. At this point the room is in the scene tree but not yet
# visible.
func _on_room_entered() -> void:
	match C.player.last_room:
		"Archiv":
			# Po schodech ze sklepa: Ruda stojí vlevo u cedule
			C.player.position = Vector2(500, 885)
			C.player.face_right()
		"Pracovna", "Komise":
			# Výtahem: Ruda vystoupí před dveřmi výtahu
			C.player.position = Vector2(765, 770)
			C.player.face_down()
		_:
			# Z náměstí: Ruda vchází dveřmi dole uprostřed
			C.player.position = Vector2(768, 950)
			C.player.face_up()
	nastav_tlacitka()


# Called after the room transition completes; the room is now visible.
func _on_room_transition_finished() -> void:
	if not state.navstiven:
		state.navstiven = true
		await C.player.say("ch1_vestibul_prichod")


# Called before Popochiu unloads the room.
func _on_room_exited() -> void:
	pass


# Called after loading a saved game.
func _on_restore_from_savegame() -> void:
	nastav_tlacitka()


#endregion


#region Public #####################################################################################
## Panel výtahu ukáže dvojku, jakmile je tlačítko zapojené (P1.6)
func nastav_tlacitka() -> void:
	get_prop("TlacitkaVytahu").texture = TLACITKA_S if Globals.tlacitko_zapojeno else TLACITKA_BEZ


#endregion
