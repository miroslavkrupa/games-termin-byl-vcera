# @popochiu-docs-ignore-class
@tool
extends PopochiuRoom
# Hlavní menu (I6): první místnost hry. Pozadí je schválené večerní náměstí (D51), menu samo je
# překryvná obrazovka z Controlů (obrazovky/hlavni_menu.gd) pod vrstvou GUI, aby nad ním šla
# otevřít okna Popochiu (nastavení, načíst hru). Lišta s inventářem a ukazatel dnů jsou tu skryté.
# Ladicí běhy (nastroje/ladeni.gd se snímkem) menu přeskočí a jdou rovnou na náměstí jako dřív,
# nebo do místnosti z parametru start=; s parametrem menu=1 zůstanou v menu.

const Data := preload('room_menu_state.gd')
const HlavniMenu := preload("res://game/obrazovky/hlavni_menu.gd")

var state: Data = load("res://game/rooms/menu/room_menu.tres")


#region Virtual ####################################################################################
func _on_room_entered() -> void:
	G.hide_interface()
	if not Engine.is_editor_hint():
		add_child(HlavniMenu.new())


func _on_room_transition_finished() -> void:
	var ladeni := get_node_or_null("/root/Ladeni")
	var cil: String = ladeni.preskocit_menu() if ladeni else ""
	if not cil.is_empty():
		R.goto_room(cil)


func _on_room_exited() -> void:
	G.show_interface()


func _on_restore_from_savegame() -> void:
	pass


#endregion
