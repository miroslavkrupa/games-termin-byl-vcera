# @popochiu-docs-ignore-class
extends "res://addons/popochiu/engine/objects/gui/templates/simple_click_high_res/simple_click_high_res_gui.gd"


const Karta := preload("res://game/obrazovky/karta.gd")
const UkazatelDnu := preload("res://game/gui/ukazatel_dnu.gd")
const Dotyk := preload("res://game/gui/dotyk.gd")

## Ukazatel dnů do dopadu komety (I6) a dotykové ovládání (podržení, nabídka po ťuknutí, D43)
var ukazatel_dnu: Control
var dotyk: Node


#region Godot ######################################################################################
func _ready() -> void:
	super()
	# Na dotykovém zařízení je ukazatel myši schovaný pod prstem a jen překáží (krok K8)
	if DisplayServer.is_touchscreen_available():
		Cursor.visible = false
	ukazatel_dnu = UkazatelDnu.new()
	add_child(ukazatel_dnu)
	dotyk = Dotyk.new()
	dotyk.name = "Dotyk"
	add_child(dotyk)


#endregion

#region Virtual ####################################################################################
# Called when the GUI is blocked and should not handle input events.
func _on_blocked(props := { blocking = true }) -> void:
	super(props)


# Called when the GUI is unblocked and can handle input events again.
func _on_unblocked() -> void:
	super()


# Called to hide the GUI.
# Hlavní menu (I6) skryje lištu s inventářem, popisky a ukazatel dnů; okna (nastavení, načtení)
# zůstanou funkční.
func _on_hidden() -> void:
	super()
	_ukaz_hru(false)


# Called to show the GUI.
func _on_shown() -> void:
	super()
	_ukaz_hru(true)


# Called when `G.show_system_text()` is triggered.
# `super()` shows `msg` in the SystemText component. Override or extend if needed.
func _on_system_text_shown(msg: String) -> void:
	super(msg)


# Called when the player closes the SystemText component (for example by
# clicking the screen anywhere).
func _on_system_text_hidden() -> void:
	super()


# Called when the mouse enters (hovers) a `clickable`.
func _on_mouse_entered_clickable(clickable: PopochiuClickable) -> void:
	super(clickable)


# Called when the mouse exits a `clickable`.
func _on_mouse_exited_clickable(clickable: PopochiuClickable) -> void:
	super(clickable)


# Called when the mouse enters (hovers) an `inventory_item`.
func _on_mouse_entered_inventory_item(inventory_item: PopochiuInventoryItem) -> void:
	super(inventory_item)


# Called when the mouse exits an `inventory_item`.
func _on_mouse_exited_inventory_item(inventory_item: PopochiuInventoryItem) -> void:
	super(inventory_item)


# Called when a dialog line is spoken by a `PopochiuCharacter` (i.e. when
# `PopochiuCharacter.say()` is called).
func _on_dialog_line_started() -> void:
	super()


# Called when a dialog line finishes (for example after the player clicks the
# screen to dismiss it).
func _on_dialog_line_finished() -> void:
	super()


# Called when a `dialog` starts (after calling `PopochiuDialog.start()`).
func _on_dialog_started(dialog: PopochiuDialog) -> void:
	super(dialog)


# Called when a `dialog` finishes (after calling `PopochiuDialog.stop()`).
func _on_dialog_finished(dialog: PopochiuDialog) -> void:
	super(dialog)


# Called when an inventory `item` is selected (for example, by clicking it).
func _on_inventory_item_selected(item: PopochiuInventoryItem) -> void:
	super(item)


# Uložení a načtení hry (I6): místo anglických hlášek šablony krátká karta v jazyce hry
func _on_game_saved() -> void:
	Karta.ukaz("ui_hra_ulozena")


func _on_game_loaded(_loaded_game: Dictionary) -> void:
	await Karta.ukaz("ui_hra_nactena")
	G.load_feedback_finished.emit()


# Called by `PopochiuCursor` to get the name of the cursor texture to show.
func _get_cursor_name() -> String:
	return super()


#endregion


#region Private ####################################################################################
func _ukaz_hru(ukazat: bool) -> void:
	for nazev in ["SimpleClickBarHighRes", "HoverTextHighRes"]:
		var n := get_node_or_null(nazev)
		if n:
			n.visible = ukazat
	if ukazatel_dnu:
		ukazatel_dnu.skryto = not ukazat


#endregion
