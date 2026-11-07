# @popochiu-docs-ignore-class
@tool
extends PopochiuRoom
# Ú Rudův byt (úvod kapitoly 1, I6; prototyp scéna „byt“ a start, návrh 01-mistnosti.md):
# karta kapitoly a telefonát, pak hráč učí ovládání: vezme hrnek kávy a knihu (Prof. Pembok, zatím
# mlčí), přes dveře mluví s věřiteli (dialog Veritel: s kávou podepíše „stížnost“, z níž je dekret,
# a dostane propisku) a dírou ve zdi sjede skluzem na náměstí. Přistání, rozhlas a první slova
# Pemboka jsou v místnosti Namesti (tahle místnost při přechodu zanikne).
# Pozadí je SVG skica (grafika/skici/byt_pozadi.svg), hrnek a kniha jsou kulisy, které zmizí.

const Data := preload('room_byt_state.gd')
const Karta := preload("res://game/obrazovky/karta.gd")
## Telefonát na začátku (prototyp start.akce)
const UVOD := ["ch1_uvod_001", "ch1_uvod_002", "ch1_uvod_003", "ch1_uvod_004", "ch1_uvod_005"]

var state: Data = load("res://game/rooms/byt/room_byt.tres")


#region Virtual ####################################################################################
func _on_room_entered() -> void:
	# Ruda stojí u stolu, kde právě telefonoval
	C.player.position = Vector2(600, 905)
	C.player.face_down()
	C.player.modulate = Color.WHITE
	nastav_veci()


func _on_room_transition_finished() -> void:
	if state.uvod_videl:
		return
	state.uvod_videl = true
	await Karta.ukaz("ch1_ui_kapitola")
	for klic in UVOD:
		await C.player.say(klic)


func _on_room_exited() -> void:
	pass


func _on_restore_from_savegame() -> void:
	pass


#endregion

#region Public #####################################################################################
## Hrnek a kniha zmizí, když je Ruda vezme (aktivní místo hrnku také)
func nastav_veci() -> void:
	get_prop("Hrnek").visible = not state.kava_vzata
	get_prop("Kniha").visible = not state.kniha_vzata
	var hrnek: PopochiuHotspot = get_hotspot("Kava")
	hrnek.visible = not state.kava_vzata
	hrnek.clickable = not state.kava_vzata


## Věřitelé mluví zpoza dveří (neviditelná postava u dveří)
func veritel(klic: String) -> void:
	await C.get_character("Veritel").hlas(klic)


#endregion
