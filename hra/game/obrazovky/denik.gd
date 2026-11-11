# Deník projektového manažera (D93): přehled, kde Ruda v kapitole je. Otevírá se tlačítkem
# s knihou v horní liště nebo klávesou D (J). Tři části:
#   - úkol kapitoly a kroky: hotové jsou přeškrtnuté, k tomu první nehotový; další kroky se
#     neukazují, aby deník nevyzrazoval, co hráče čeká (nápovědy dává Pembok),
#   - kolik dní zbývá do dopadu komety,
#   - co si Nedostavěnice pamatuje z předchozích kapitol (v kapitole 1 zatím nic).
# Další oddíly (ocenění apod.) se sem dají přidat jako další blok v _obsah().
# Vytváří se celý v kódu jako ostatní překryvná okna; vzhled z game/obrazovky/styl.gd.
extends CanvasLayer

const Styl := preload("res://game/obrazovky/styl.gd")
const CESTA := "res://game/obrazovky/denik.gd"

var _koren: Control


func _init() -> void:
	layer = 13
	# Při návratu do menu nebo načtení hry se deník zavře spolu s ostatními překryvy (rámec, I6)
	add_to_group(&"prekryv_ramce")
	add_to_group(&"denik")


func _ready() -> void:
	_koren = Styl.koren()
	_koren.gui_input.connect(_vstup)
	add_child(_koren)

	var stin := ColorRect.new()
	stin.color = Color(0, 0, 0, 0.55)
	stin.set_anchors_preset(Control.PRESET_FULL_RECT)
	stin.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_koren.add_child(stin)

	var stred := CenterContainer.new()
	stred.set_anchors_preset(Control.PRESET_FULL_RECT)
	stred.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_koren.add_child(stred)
	var panel := PanelContainer.new()
	panel.add_theme_stylebox_override("panel", Styl.malovany("okno", Vector2(70, 52)))
	panel.custom_minimum_size = Vector2(980, 0)
	stred.add_child(panel)
	var sloupec := VBoxContainer.new()
	sloupec.add_theme_constant_override("separation", 10)
	panel.add_child(sloupec)
	_obsah(sloupec)

	var zavrit := Styl.tlacitko("ui_zavrit", 32)
	zavrit.size_flags_horizontal = Control.SIZE_SHRINK_END
	zavrit.pressed.connect(queue_free)
	sloupec.add_child(zavrit)

	_koren.modulate = Color(1, 1, 1, 0)
	create_tween().tween_property(_koren, "modulate", Color.WHITE, 0.2)


func _unhandled_key_input(udalost: InputEvent) -> void:
	if udalost.is_pressed() and not udalost.is_echo() \
			and udalost.keycode in [KEY_D, KEY_J, KEY_ESCAPE]:
		get_viewport().set_input_as_handled()
		queue_free()


#region Public #####################################################################################
## Otevře deník, nebo ho zavře, když už je otevřený
static func prepni() -> void:
	var strom: SceneTree = PopochiuUtils.e.get_tree()
	var otevreny := strom.get_first_node_in_group(&"denik")
	if otevreny:
		otevreny.queue_free()
	else:
		strom.root.add_child(load(CESTA).new())


## Kroky kapitoly 1 v pořadí, v jakém je hráč obvykle plní: klíč textu a jestli je krok hotový.
## Podmínky jsou stejné jako u nápověd Pemboka (inventory_item_pembok.gd).
static func kroky() -> Array:
	var namesti = PopochiuUtils.r.Namesti.state
	var archiv = PopochiuUtils.r.Archiv.state
	var komise = PopochiuUtils.r.Komise.state
	var g = PopochiuUtils.e.get_node("/root/Globals")
	var ma := func(p: String) -> bool: return PopochiuUtils.i.is_item_in_inventory(p)
	var papir: bool = ma.call("Papir") or komise.fronta_hotova or komise.razitko_hotovo
	return [
		{klic = "ch1_denik_krok_kdo", hotovo = namesti.vratny_rekl_starosta or g.c1_cislo_projektu},
		{klic = "ch1_denik_krok_cislo", hotovo = g.c1_cislo_projektu},
		{klic = "ch1_denik_krok_archiv", hotovo = archiv.archiv_vstup},
		{klic = "ch1_denik_krok_zadani", hotovo = ma.call("Zadani") or papir},
		{klic = "ch1_denik_krok_vytah", hotovo = g.tlacitko_zapojeno},
		{klic = "ch1_denik_krok_podpis", hotovo = ma.call("Podpis") or papir},
		{klic = "ch1_denik_krok_papir", hotovo = papir},
		{klic = "ch1_denik_krok_fronta", hotovo = komise.fronta_hotova},
		{klic = "ch1_denik_krok_razitko", hotovo = komise.razitko_hotovo},
	]


#endregion

#region Private ####################################################################################
func _obsah(sloupec: VBoxContainer) -> void:
	sloupec.add_child(Styl.popisek("ui_denik", 54))
	sloupec.add_child(_nadpis("ui_denik_ukol"))
	sloupec.add_child(Styl.popisek("ch1_ui_ukol", 36, Styl.TEXT, HORIZONTAL_ALIGNMENT_LEFT))

	var seznam := RichTextLabel.new()
	seznam.bbcode_enabled = true
	seznam.fit_content = true
	seznam.scroll_active = false
	seznam.auto_translate_mode = Node.AUTO_TRANSLATE_MODE_DISABLED
	seznam.add_theme_font_size_override("normal_font_size", 32)
	seznam.add_theme_color_override("default_color", Styl.TEXT)
	seznam.mouse_filter = Control.MOUSE_FILTER_IGNORE
	var radky: PackedStringArray = []
	var dalsi := ""
	for krok in kroky():
		if krok.hotovo:
			radky.append("[color=#8f7d60][s]%s[/s][/color]" % tr(krok.klic))
		elif dalsi == "":
			dalsi = tr(krok.klic)
	if dalsi != "":
		radky.append("» %s" % dalsi)
	else:
		radky.append(tr("ui_denik_vse_hotovo"))
	seznam.text = "\n".join(radky)
	sloupec.add_child(seznam)

	var dny := Styl.popisek("", 32, Styl.REZ.darkened(0.25), HORIZONTAL_ALIGNMENT_LEFT)
	dny.auto_translate_mode = Node.AUTO_TRANSLATE_MODE_DISABLED
	dny.text = tr("ch1_ui_kometa_dny") % Globals.dny
	sloupec.add_child(dny)

	sloupec.add_child(_nadpis("ui_denik_pamet"))
	# Kapitola 1 je první: paměť města se zapíše až na jejím konci (konec_kapitoly.gd)
	sloupec.add_child(Styl.popisek("ui_denik_pamet_nic", 32, Styl.TEXT, HORIZONTAL_ALIGNMENT_LEFT))


func _nadpis(klic: String) -> Label:
	var l := Styl.popisek(klic, 30, Styl.PETROLEJ.darkened(0.2), HORIZONTAL_ALIGNMENT_LEFT)
	l.add_theme_constant_override("line_spacing", 0)
	return l


# Klepnutí mimo okno deník zavře
func _vstup(udalost: InputEvent) -> void:
	if udalost is InputEventMouseButton and udalost.pressed:
		queue_free()


#endregion
