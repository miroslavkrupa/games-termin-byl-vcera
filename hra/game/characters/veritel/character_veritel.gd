# @popochiu-docs-ignore-class
@tool
extends PopochiuCharacter
# Věřitelé za dveřmi Rudova bytu (úvod, I6): jen hlasy, postava není vidět. Než promluví,
# přenese se neviditelně ke dveřím bytu; druhý věřitel mluví o kousek vedle.

const Data := preload('character_veritel_state.gd')
## Kde hlas zní (souřadnice místnosti) a o kolik vedle mluví druhý hlas
const KDE := Vector2(1300, 470)
const DRUHY := Vector2(70, 60)

var state: Data = load("res://game/characters/veritel/character_veritel.tres")


#region Virtual ####################################################################################
func _on_room_set() -> void:
	pass


func _on_click() -> void:
	E.command_fallback()


func _on_right_click() -> void:
	E.command_fallback()


func _on_item_used(_item: PopochiuInventoryItem) -> void:
	E.command_fallback()


#endregion

#region Public #####################################################################################
## Řekne repliku [param klic] na svém místě v aktuální místnosti a zase zmizí;
## [param druhy] = mluví druhý hlas (o kousek vedle)
func hlas(klic: String, druhy := false) -> void:
	if get_parent() == null:
		R.current.add_character(self)
	position = KDE + (DRUHY if druhy else Vector2.ZERO)
	dialog_pos = Vector2(0, -20)
	await say(klic)
	if get_parent() == R.current.get_node("Characters"):
		R.current.remove_character(self)


#endregion
