# @popochiu-docs-ignore-class
@tool
extends PopochiuRoom
# Kancelář Komise (S5, 1½. patro): Předseda Věčný, Ing. Framework ve frontě, stůl pro žadatele
# (M02, pak M01 Jeden papír o Arše), fronta na frontu (úsek za Báru, P1.11/P1.12), razítko a
# poduška (P1.13) a rozhovor R1.4 „…a následné fáze“, kterým kapitola 1 končí. Výtah = levá stěna.

const Data := preload('room_komise_state.gd')
## Překryvné okno M01 Jeden papír o Arše
const Papir := preload("res://game/minihry/papir/papir.gd")
## Titulková karta („Hraješ za Rudu“, cedule)
const Karta := preload("res://game/obrazovky/karta.gd")

var state: Data = load("res://game/rooms/komise/room_komise.tres")


#region Virtual ####################################################################################
# Called when Popochiu loads the room. At this point the room is in the scene tree but not yet
# visible.
func _on_room_entered() -> void:
	if C.player.last_room == "Archiv":
		# Po úseku za Báru je Ruda na řadě: stojí u fronty
		C.player.position = get_hotspot("Fronta").walk_to_point
		C.player.face_up()
	else:
		# Ruda vystoupí z výtahu (levá stěna)
		C.player.position = Vector2(150, 800)
		C.player.face_right()


# Called after the room transition completes; the room is now visible.
func _on_room_transition_finished() -> void:
	if not state.navstivena:
		state.navstivena = true
		await C.player.say("ch1_komise_prichod")
	if state.fronta_hotova and not state.fronta_navrat:
		# Návrat z úseku za Báru (prototyp: karta ch1_ui_hraje_ruda, ch1_fronta_konec)
		state.fronta_navrat = true
		await Karta.ukaz("ch1_ui_hraje_ruda")
		await C.player.say("ch1_fronta_konec")


# Called before Popochiu unloads the room.
func _on_room_exited() -> void:
	pass


# Called after loading a saved game.
func _on_restore_from_savegame() -> void:
	pass


#endregion


#region Public #####################################################################################
## Otevře M01 Jeden papír o Arše a počká na zavření; vyhodnocení je v papir.gd
func otevri_papir() -> void:
	var okno: CanvasLayer = Papir.new()
	get_tree().root.add_child(okno)
	await okno.spust()


## Razítko kávou (prototyp RAZITKO_KAVOU): hnědé razítko platí, Předseda si to pamatuje, a hned
## nabídne „…a následné fáze“ (R1.4)
func razitko_kavou() -> void:
	await C.Predseda.say("ch1_predseda_002")
	await C.Predseda.say("ch1_razitko_kava_2")
	Globals.c1_razitko = "kava"
	state.razitko_hotovo = true
	faze()


## Razítko babiččinou poduškou (modré, P1.13 ✔)
func razitko_poduskou() -> void:
	await C.player.say("ch1_razitko_poduska_1")
	await C.Predseda.say("ch1_razitko_poduska_2")
	await I.Poduska.remove()
	Globals.c1_razitko = "poduska"
	state.razitko_hotovo = true
	faze()


## Otevře rozhovor R1.4 (dialog Faze); případný otevřený rozhovor s Předsedou se nejdřív zavře
func faze() -> void:
	if D.current_dialog:
		D.current_dialog.stop()
	await get_tree().process_frame
	D.Faze.start()


## Fronta na frontu (P1.11): s papírem se Ruda postaví do fronty a hra přepne na Báru v archivu
## (prototyp: ch1_ruda_090, ch1_fronta_cekani, ~bara, +metr, >archiv). Karta „Hraješ za Báru“
## a první replika úseku jsou v archivu, protože tato místnost při přechodu zanikne.
func postavit_se_do_fronty() -> void:
	await C.player.say("ch1_ruda_090")
	await C.player.say("ch1_fronta_cekani")
	var bara: PopochiuCharacter = C.get_character("Bara")
	C.player = bara
	await I.Metr.add()
	R.goto_room("Archiv")


#endregion
