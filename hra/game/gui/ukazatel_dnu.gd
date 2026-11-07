# Ukazatel dnů do dopadu komety (I6; prototyp: odpočet v hlavičce přehrávače, text
# ch1_ui_kometa_dny a příznak dny: 30 na začátku, 28 po frontě na frontu). Malý papírový štítek
# vpravo dole. Ukazuje se ve hře, až rozhlas ohlásil kometu a Pembok vysvětlil úkol (konec úvodu,
# Namesti.pembok_otevren); v hlavním menu, v bytě a se skrytým GUI ne. Klepnutí propouští.
extends PanelContainer

const Styl := preload("res://game/obrazovky/styl.gd")
## Místnosti, kde se ukazatel neukazuje
const BEZ_UKAZATELE := ["Menu", "Byt"]

## GUI je skryté (hlavní menu)
var skryto := false

## Stav náměstí (konec úvodu); stejný načtený zdroj jako R.Namesti.state, bez načtení místnosti
var _namesti: Resource = load("res://game/rooms/namesti/room_namesti.tres")

var _popisek: Label


func _ready() -> void:
	mouse_filter = Control.MOUSE_FILTER_IGNORE
	# Roh vpravo dole; velikost podle textu, roste doleva a nahoru
	anchor_left = 1.0
	anchor_top = 1.0
	anchor_right = 1.0
	anchor_bottom = 1.0
	grow_horizontal = Control.GROW_DIRECTION_BEGIN
	grow_vertical = Control.GROW_DIRECTION_BEGIN
	offset_left = -22
	offset_right = -22
	offset_top = -18
	offset_bottom = -18
	var pozadi := Styl.ramecek(Color(Styl.PAPIR, 0.92), Styl.OBRYS, 3, 12, Vector2(18, 2))
	add_theme_stylebox_override("panel", pozadi)
	_popisek = Styl.popisek("", 30, Styl.TEXT)
	_popisek.auto_translate_mode = Node.AUTO_TRANSLATE_MODE_DISABLED
	_popisek.autowrap_mode = TextServer.AUTOWRAP_OFF
	_popisek.size_flags_horizontal = Control.SIZE_SHRINK_END
	_popisek.mouse_filter = Control.MOUSE_FILTER_IGNORE
	add_child(_popisek)
	visible = false


func _process(_delta: float) -> void:
	var mistnost = PopochiuUtils.r.current
	var ukazat: bool = not skryto and is_instance_valid(mistnost) \
		and not mistnost.script_name in BEZ_UKAZATELE and _namesti.pembok_otevren
	visible = ukazat
	if ukazat:
		_popisek.text = tr("ch1_ui_kometa_dny") % Globals.dny
