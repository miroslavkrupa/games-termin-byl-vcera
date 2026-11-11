# @popochiu-docs-ignore-class
@tool
extends PopochiuRoom
# Archiv zkrachovalých projektů (S3). Dokud Lumír Rudu nepustí (P1.4), zastaví ho u každého prvku.
# Puzzly: P1.5 řazení kartotéky (původní zadání), P1.6 krabice výtahu (tlačítko „2“),
# P1.7 výpůjčka karty poučení, mapník (katastrální mapa pro P1.9). Úsek za Báru (I5, P1.12):
# zatímco Ruda stojí ve frontě na frontu, Bára tu metrem změří hluboký regál a najde seznam
# pasažérů; aktivní místa mají pro Báru vlastní repliky (prototyp: bara_prohlednout, bara_pouzit).

const Data := preload('room_archiv_state.gd')
## Překryvné okno řazení kartotéky (P1.5)
const Razeni := preload("res://game/minihry/razeni/razeni.gd")
## Titulková karta („Hraješ za Báru“)
const Karta := preload("res://game/obrazovky/karta.gd")

var state: Data = load("res://game/rooms/archiv/room_archiv.tres")


#region Virtual ####################################################################################
# Called when Popochiu loads the room. At this point the room is in the scene tree but not yet
# visible.
# Add any code you want to setup the stage before the room is shown to the player (e.g. setting
# character position and facing direction, active walkable area, props visibility, etc.).
func _on_room_entered() -> void:
	# Kdo zrovna není hráčova postava, v archivu nestojí: Ruda čeká ve frontě v Komisi a Bára
	# je po svém úseku zpátky na náměstí. Stav místnosti si je ale pamatuje z doby, kdy tu byli
	# jako hráč, a Popochiu by je sem při vstupu vrátil.
	for jmeno in ["Ruda", "Bara"]:
		var postava: PopochiuCharacter = C.get_character(jmeno)
		if postava != C.player and postava.get_parent() == $Characters:
			remove_character(postava)
	# Ruda (nebo Bára v úseku za Báru) přichází po schodech
	C.player.position = Vector2(340, 700)
	C.player.face_down_right()


# Called after the room transition completes; the room is now visible.
# Implement this to start cutscenes, play sounds, etc.
# NOTE: this is NOT called when loading a saved game. Use [_on_restore_from_savegame] for that.
func _on_room_transition_finished() -> void:
	if hraje_bara():
		if not state.usek_uvod:
			# Začátek úseku za Báru (prototyp: karta ch1_ui_hraje_bara, ch1_usek_uvod)
			state.usek_uvod = true
			await Karta.ukaz("ch1_ui_hraje_bara")
			await C.player.say("ch1_usek_uvod")
		return
	if not R.Namesti.state.archiv_navstiven:
		R.Namesti.state.archiv_navstiven = true
		await C.player.say("ch1_archiv_prichod")


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
## Hraje Bára (úsek za Báru, P1.12)
func hraje_bara() -> bool:
	return C.player.script_name == "Bara"


## Zámek archivu (prototyp: `archiv(akce)`): bez vstupu Lumír řekne „Číslo projektu.“ a vrátí true,
## takže aktivní místo nic dalšího neudělá. Báru Lumír zná, tu nezastaví.
func lumir_zastavi() -> bool:
	if state.archiv_vstup or hraje_bara():
		return false
	await C.Lumir.say("ch1_lumir_stop_1")
	return true


## Otevře řazení kartotéky (P1.5); samotné vyhodnocení je v razeni.gd
func otevri_razeni() -> void:
	var okno: CanvasLayer = Razeni.new()
	get_tree().root.add_child(okno)
	await okno.spust()


## Konec úseku za Báru (prototyp: ch1_usek_konec, ~ruda, >komise, …): Bára má seznam, Ruda je
## na řadě ve frontě. Karta „Hraješ za Rudu“ a „Jsem na řadě!“ jsou v Komisi (tato místnost
## při přechodu zanikne).
func konec_useku_bary() -> void:
	await C.player.say("ch1_usek_konec")
	R.Komise.state.fronta_hotova = true
	Globals.dny = 28
	C.player = C.get_character("Ruda")
	R.goto_room("Komise")


#endregion
