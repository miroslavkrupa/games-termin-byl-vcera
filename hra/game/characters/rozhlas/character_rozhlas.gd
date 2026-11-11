# @popochiu-docs-ignore-class
@tool
extends PopochiuCharacter
# Městský rozhlas na náměstí (amplion na lampě): jen hlas, postava není vidět. Než promluví,
# přenese se neviditelně k amplionu, aby se replika ukázala u něj (stejně jako Pembok u Rudy).
# Hlásí kometu a Rudovo jmenování při přistání na náměstí (úvod, I6).

const Data := preload('character_rozhlas_state.gd')
## Kde hlas zní (souřadnice místnosti) a o kolik vedle mluví druhý hlas
const KDE := Vector2(1430, 240)
const DRUHY := Vector2(0, 0)

var state: Data = load("res://game/characters/rozhlas/character_rozhlas.tres")


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
	if not druhy:
		Zvuk.efekt("rozhlas")
	await say(klic)
	if get_parent() == R.current.get_node("Characters"):
		R.current.remove_character(self)


#endregion
