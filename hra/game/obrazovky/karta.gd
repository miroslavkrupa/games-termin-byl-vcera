# Titulková karta (prototyp: „*karta:klic“): krátký text přes celou obrazovku, např. „Hraješ za
# Báru“, „Hraješ za Rudu“ nebo nápis na ceduli. Sama zmizí po chvíli, klepnutí (myš i prst) ji
# zavře dřív. Paleta stylové bible, písmo GUI. Vytváří se celá v kódu (bez scény).
# Použití: await Karta.ukaz("ch1_ui_hraje_bara")
extends CanvasLayer

signal zavrena

## Jak dlouho karta zůstane (s) a jak dlouho se rozplyne
const DOBA := 2.2
const ROZPLYNUTI := 0.5

const BARVA_PAPIR := Color("f3e4c2")
const BARVA_OBRYS := Color("4a2e14")
const BARVA_TEXT := Color("3a2614")

var _klic := ""
var _koren: Control
var _zavira := false


func _init(klic := "") -> void:
	layer = 14
	_klic = klic
	# Při návratu do menu nebo načtení hry se karta zavře spolu s ostatními překryvy (rámec, I6)
	add_to_group(&"prekryv_ramce")


func _ready() -> void:
	_koren = Control.new()
	_koren.set_anchors_preset(Control.PRESET_FULL_RECT)
	_koren.theme = load("res://game/gui/resources/gui_theme.tres")
	_koren.mouse_filter = Control.MOUSE_FILTER_STOP
	_koren.gui_input.connect(_vstup)
	add_child(_koren)

	var stin := ColorRect.new()
	stin.color = Color(0, 0, 0, 0.6)
	stin.set_anchors_preset(Control.PRESET_FULL_RECT)
	stin.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_koren.add_child(stin)

	var stred := CenterContainer.new()
	stred.set_anchors_preset(Control.PRESET_FULL_RECT)
	stred.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_koren.add_child(stred)
	var panel := PanelContainer.new()
	# Malovaný papír na kartonu, stejný jako okna miniher (D89)
	panel.add_theme_stylebox_override("panel",
		load("res://game/obrazovky/styl.gd").malovany("okno", Vector2(70, 44)))
	panel.mouse_filter = Control.MOUSE_FILTER_IGNORE
	stred.add_child(panel)
	var l := Label.new()
	l.text = tr(_klic)
	l.add_theme_font_size_override("font_size", 52)
	l.add_theme_color_override("font_color", BARVA_TEXT)
	l.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	l.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	l.custom_minimum_size = Vector2(900, 0)
	panel.add_child(l)

	_koren.modulate = Color(1, 1, 1, 0)
	var t := create_tween()
	t.tween_property(_koren, "modulate", Color.WHITE, 0.3)
	await get_tree().create_timer(DOBA).timeout
	_zavrit()


#region Public #####################################################################################
## Ukáže kartu s textem [param klic] a počká, až zmizí
static func ukaz(klic: String) -> void:
	var karta: CanvasLayer = load("res://game/obrazovky/karta.gd").new(klic)
	PopochiuUtils.e.get_tree().root.add_child(karta)
	await karta.zavrena


#endregion

#region Private ####################################################################################
func _vstup(udalost: InputEvent) -> void:
	var klepnuti: bool = (udalost is InputEventMouseButton and udalost.pressed) \
		or (udalost is InputEventScreenTouch and udalost.pressed)
	if klepnuti:
		_zavrit()


func _zavrit() -> void:
	if _zavira:
		return
	_zavira = true
	var t := create_tween()
	t.tween_property(_koren, "modulate", Color(1, 1, 1, 0), ROZPLYNUTI)
	await t.finished
	zavrena.emit()
	queue_free()


#endregion
