# Titulky (I6): text pomalu odjíždí nahoru přes ztmavenou obrazovku; klepnutí nebo tlačítko
# Zavřít je ukončí dřív. Otevírají se z hlavního menu a ze závěrečné obrazovky kapitoly.
# Obsah je zatím jen to, co je jisté (autor, nástroje, písmo); konečné titulky doplní autor.
# Jména a názvy se nepřekládají, popisky řádků jsou klíče textů (ui_titulky_*).
# Použití: await Titulky.ukaz()
extends CanvasLayer

const Styl := preload("res://game/obrazovky/styl.gd")
const Ramec := preload("res://game/obrazovky/ramec.gd")

## Řádky titulků: [popisek (klíč textu, nebo ""), text bez překladu (nebo klíč, když přeložit = true)]
const RADKY := [
	{popisek = "", text = "ui_nazev_hry", velikost = 84, prelozit = true},
	{popisek = "", text = "ch1_ui_kapitola", velikost = 40, prelozit = true},
	{popisek = "ui_titulky_autor", text = "Miroslav Krupa"},
	{popisek = "ui_titulky_engine", text = "Godot Engine\nPopochiu (Carenalgas)"},
	{popisek = "ui_titulky_pismo", text = "Patrick Hand – Patrick Wagesreiter\n(SIL Open Font License)"},
	{popisek = "ui_titulky_hudba", text = "ui_titulky_hudba_tema", prelozit = true},
	{popisek = "ui_titulky_zvuky", text = "Kenney · IgnasD · fvcalderan · Dub\n(OpenGameArt.org, CC0)"},
	{popisek = "", text = "ui_titulky_dekujeme", velikost = 48, prelozit = true},
]
## Rychlost odjíždění (body za sekundu)
const RYCHLOST := 70.0

signal zavreno

var _text: VBoxContainer
var _zavira := false


func _init() -> void:
	layer = 13
	add_to_group(Ramec.SKUPINA_PREKRYVU)


func _ready() -> void:
	var koren := Styl.koren()
	koren.gui_input.connect(_vstup)
	koren.clip_contents = true
	add_child(koren)
	var stin := ColorRect.new()
	stin.color = Color(0.05, 0.03, 0.02, 0.9)
	stin.set_anchors_preset(Control.PRESET_FULL_RECT)
	stin.mouse_filter = Control.MOUSE_FILTER_IGNORE
	koren.add_child(stin)

	_text = VBoxContainer.new()
	_text.anchor_left = 0.5
	_text.anchor_right = 0.5
	_text.offset_left = -520
	_text.offset_right = 520
	_text.add_theme_constant_override("separation", 22)
	_text.mouse_filter = Control.MOUSE_FILTER_IGNORE
	koren.add_child(_text)
	for r in RADKY:
		if not r.popisek.is_empty():
			var p := Styl.popisek(r.popisek, 30, Styl.ZLUTA)
			_text.add_child(p)
		var l := Styl.popisek(r.text, r.get("velikost", 40), Styl.PAPIR)
		if not r.get("prelozit", false):
			l.auto_translate_mode = Node.AUTO_TRANSLATE_MODE_DISABLED
		_text.add_child(l)
		var mezera := Control.new()
		mezera.custom_minimum_size = Vector2(0, 40)
		mezera.mouse_filter = Control.MOUSE_FILTER_IGNORE
		_text.add_child(mezera)

	var zavrit := Styl.tlacitko("ui_zavrit", 30)
	zavrit.anchor_left = 1.0
	zavrit.anchor_top = 1.0
	zavrit.anchor_right = 1.0
	zavrit.anchor_bottom = 1.0
	zavrit.grow_horizontal = Control.GROW_DIRECTION_BEGIN
	zavrit.grow_vertical = Control.GROW_DIRECTION_BEGIN
	zavrit.offset_left = -40
	zavrit.offset_right = -40
	zavrit.offset_top = -36
	zavrit.offset_bottom = -36
	zavrit.pressed.connect(_zavrit)
	koren.add_child(zavrit)

	# Text začíná kousek pod horním okrajem, aby byl hned vidět, a pak odjíždí nahoru
	_text.position.y = 220
	koren.modulate = Color(1, 1, 1, 0)
	create_tween().tween_property(koren, "modulate", Color.WHITE, 0.4)


func _process(delta: float) -> void:
	if _zavira:
		return
	_text.position.y -= RYCHLOST * delta
	# Celý text odjel: titulky skončí samy
	if _text.position.y + _text.size.y < 0:
		_zavrit()


#region Public #####################################################################################
## Ukáže titulky a počká, až se zavřou
static func ukaz() -> void:
	var okno: CanvasLayer = load("res://game/obrazovky/titulky.gd").new()
	PopochiuUtils.e.get_tree().root.add_child(okno)
	await okno.zavreno


#endregion

#region Private ####################################################################################
func _vstup(udalost: InputEvent) -> void:
	if udalost is InputEventMouseButton and udalost.pressed:
		_zavrit()


func _zavrit() -> void:
	if _zavira:
		return
	_zavira = true
	var t := create_tween()
	t.tween_property(get_child(0), "modulate", Color(1, 1, 1, 0), 0.4)
	await t.finished
	zavreno.emit()
	queue_free()


#endregion
