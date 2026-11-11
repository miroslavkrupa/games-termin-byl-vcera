# Hlavní menu (I6): název hry, kapitola a tlačítka Pokračovat (nejnovější uložená hra), Nová hra,
# Načíst, Nastavení, Titulky a Konec (na webu chybí). Vpravo nahoře rychlá volba jazyka.
# Leží nad pozadím místnosti Menu (večerní náměstí) a pod vrstvou GUI (vrstva 10), aby okna
# Popochiu (nastavení, načtení) byla nad ním. Vytváří se celé v kódu, ovládání myší i prstem.
extends CanvasLayer

const Styl := preload("res://game/obrazovky/styl.gd")
const Ramec := preload("res://game/obrazovky/ramec.gd")
const Titulky := preload("res://game/obrazovky/titulky.gd")

var _tlacitka: Array[Button] = []
var _cestina: Button
var _english: Button


func _init() -> void:
	layer = 5


func _ready() -> void:
	var koren := Styl.koren()
	add_child(koren)

	# Ztmavení náměstí, víc vlevo pod nápisem a tlačítky
	var prechod := Gradient.new()
	prechod.set_color(0, Color(0.06, 0.04, 0.08, 0.82))
	prechod.set_color(1, Color(0.06, 0.04, 0.08, 0.12))
	var textura := GradientTexture2D.new()
	textura.gradient = prechod
	textura.fill_from = Vector2(0.1, 0)
	textura.fill_to = Vector2(0.85, 0)
	var stin := TextureRect.new()
	stin.texture = textura
	stin.stretch_mode = TextureRect.STRETCH_SCALE
	stin.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
	stin.set_anchors_preset(Control.PRESET_FULL_RECT)
	stin.mouse_filter = Control.MOUSE_FILTER_IGNORE
	koren.add_child(stin)

	var sloupec := VBoxContainer.new()
	sloupec.anchor_bottom = 1.0
	sloupec.offset_left = 110
	sloupec.offset_top = 56
	sloupec.offset_right = 110 + 760
	sloupec.offset_bottom = -50
	sloupec.add_theme_constant_override("separation", 12)
	koren.add_child(sloupec)

	var nazev := Styl.popisek("ui_nazev_hry", 108, Styl.PAPIR, HORIZONTAL_ALIGNMENT_LEFT)
	nazev.add_theme_constant_override("outline_size", 22)
	nazev.add_theme_color_override("font_outline_color", Styl.OBRYS)
	nazev.add_theme_constant_override("line_spacing", -26)
	sloupec.add_child(nazev)
	var kapitola := Styl.popisek("ch1_ui_kapitola", 46, Styl.ZLUTA, HORIZONTAL_ALIGNMENT_LEFT)
	kapitola.add_theme_constant_override("outline_size", 12)
	kapitola.add_theme_color_override("font_outline_color", Styl.OBRYS)
	sloupec.add_child(kapitola)

	var mezera := Control.new()
	mezera.custom_minimum_size = Vector2(0, 14)
	sloupec.add_child(mezera)

	var posledni := Ramec.posledni_pozice()
	if posledni > 0:
		_pridej(sloupec, "ui_menu_pokracovat", _pokracovat.bind(posledni), Styl.PETROLEJ)
	_pridej(sloupec, "ui_menu_nova_hra", _nova_hra)
	var nacist := _pridej(sloupec, "ui_menu_nacist", _nacist)
	nacist.disabled = not range(1, Ramec.POZIC + 1).any(
		func(i): return FileAccess.file_exists(Ramec.SOUBOR % i))
	_pridej(sloupec, "ui_nastaveni", _nastaveni)
	_pridej(sloupec, "ui_menu_titulky", _titulky)
	if not OS.has_feature("web"):
		_pridej(sloupec, "ui_menu_konec", _konec)

	# Rychlá volba jazyka (názvy jazyků se nepřekládají, každý je ve svém jazyce)
	var jazyky := HBoxContainer.new()
	jazyky.set_anchors_preset(Control.PRESET_TOP_RIGHT)
	jazyky.grow_horizontal = Control.GROW_DIRECTION_BEGIN
	jazyky.offset_right = -40
	jazyky.offset_top = 36
	jazyky.add_theme_constant_override("separation", 12)
	koren.add_child(jazyky)
	_cestina = _jazyk(jazyky, "Čeština", "cs")
	_english = _jazyk(jazyky, "English", "en")
	Jazyk.zmenen.connect(func(_j): _oznac_jazyk())
	_oznac_jazyk()

	if not _tlacitka.is_empty():
		_tlacitka[0].grab_focus.call_deferred()

	koren.modulate = Color(1, 1, 1, 0)
	create_tween().tween_property(koren, "modulate", Color.WHITE, 0.5)


#region Private ####################################################################################
func _pridej(kam: Control, text: String, akce: Callable, barva := Styl.REZ) -> Button:
	var b := Styl.tlacitko(text, 36, barva)
	b.custom_minimum_size.x = 470
	b.size_flags_horizontal = Control.SIZE_SHRINK_BEGIN
	b.pressed.connect(akce)
	kam.add_child(b)
	_tlacitka.append(b)
	return b


func _jazyk(kam: Control, nazev: String, jazyk: String) -> Button:
	var b := Styl.tlacitko(nazev, 28, Styl.PAPIR, false)
	b.auto_translate_mode = Node.AUTO_TRANSLATE_MODE_DISABLED
	b.toggle_mode = true
	b.add_theme_stylebox_override("pressed", Styl.podle_barvy(Styl.ZLUTA, Styl.OBRYS, 4, 14, Vector2(24, 8)))
	b.add_theme_stylebox_override("hover_pressed", Styl.podle_barvy(Styl.ZLUTA, Styl.OBRYS, 4, 14, Vector2(24, 8)))
	b.pressed.connect(func(): Jazyk.nastav(jazyk))
	kam.add_child(b)
	return b


func _oznac_jazyk() -> void:
	_cestina.set_pressed_no_signal(Jazyk.aktualni() == "cs")
	_english.set_pressed_no_signal(Jazyk.aktualni() == "en")


## Po volbě, která spouští hru, se tlačítka zablokují (dvojí klepnutí by hru spustilo dvakrát)
func _zablokuj() -> void:
	for b in _tlacitka:
		b.disabled = true


func _nova_hra() -> void:
	_zablokuj()
	await Ramec.nova_hra()


func _pokracovat(pozice: int) -> void:
	_zablokuj()
	await Ramec.nacti(pozice)


func _nacist() -> void:
	G.popup_requested.emit("LoadPopup")


func _nastaveni() -> void:
	G.popup_requested.emit("SimpleClickSettings")


func _titulky() -> void:
	Titulky.ukaz()


func _konec() -> void:
	get_tree().quit()


#endregion
