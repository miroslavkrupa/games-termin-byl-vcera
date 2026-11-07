# Konec kapitoly 1 (prototyp KONEC_KAPITOLY a „*konec“): po klíči od hangáru se zapíše stav
# babičky, Ruda se vrátí na večerní náměstí (klíč, kometa, Bára), pak zpátky do Komise, kde
# Předseda telefonuje („Pustil jsem ho dál…“), a nakonec překryvná obrazovka „Co si Nedostavěnice
# zapamatovala“ s pamětí kapitoly (ch1_pamet_*). Tlačítkem Dál se přejde na závěrečnou obrazovku
# „Pokračování příště“ (I6) s názvem kapitoly 2, odkud vedou tlačítka na titulky a do hlavního
# menu (tam jde začít novou hru, stav se vynuluje). Sekvence běží v uzlu pod kořenem stromu,
# protože místnosti se mění a jejich skripty při přechodu zanikají. Paleta stylové bible,
# písmo GUI, myš i dotyk.
extends CanvasLayer

const Styl := preload("res://game/obrazovky/styl.gd")
const Ramec := preload("res://game/obrazovky/ramec.gd")
const Titulky := preload("res://game/obrazovky/titulky.gd")

## Paměť kapitoly (prototyp `pamet`): klíč textu a podmínka, kdy se ukáže
const PAMET := [
	{klic = "ch1_pamet_bara_3", kdy = "bara_3"},
	{klic = "ch1_pamet_bara_castecne", kdy = "bara_castecne"},
	{klic = "ch1_pamet_bara_0", kdy = "bara_0"},
	{klic = "ch1_pamet_slib_0", kdy = "slib_0"},
	{klic = "ch1_pamet_slib", kdy = "slib"},
	{klic = "ch1_pamet_babicka_spojenec", kdy = "babicka_spojenec"},
	{klic = "ch1_pamet_babicka_odmitnuta", kdy = "babicka_odmitnuta"},
	{klic = "ch1_pamet_babicka_prehlizena", kdy = "babicka_prehlizena"},
	{klic = "ch1_pamet_babicka_neodhalena", kdy = "babicka_neodhalena"},
	{klic = "ch1_pamet_faze2_ano", kdy = "faze2_ano"},
	{klic = "ch1_pamet_faze2_ne", kdy = "faze2_ne"},
	{klic = "ch1_pamet_zmena", kdy = "zmena"},
	{klic = "ch1_pamet_razitko_kava", kdy = "razitko_kava"},
	{klic = "ch1_pamet_seznam", kdy = "seznam"},
	{klic = "ch1_pamet_pokracovani", kdy = "vzdy"},
]

const BARVA_PAPIR := Color("f3e4c2")
const BARVA_OBRYS := Color("4a2e14")
const BARVA_TEXT := Color("3a2614")
const BARVA_REZ := Color("c9743a")


var _koren: Control
## Jen závěrečná obrazovka bez sekvence (ladění: parametr konec_obrazovka=1)
var _jen_obrazovka := false


func _init() -> void:
	layer = 13
	add_to_group(Ramec.SKUPINA_PREKRYVU)


func _ready() -> void:
	if _jen_obrazovka:
		G.block()
		_postav_obrazovku()
	else:
		_sekvence()


#region Public #####################################################################################
## Spustí závěrečnou sekvenci kapitoly 1 (volá dialog Faze po předání klíče)
static func spust() -> void:
	var okno: CanvasLayer = load("res://game/obrazovky/konec_kapitoly.gd").new()
	PopochiuUtils.e.get_tree().root.add_child(okno)


## Jen obrazovka paměti a pokračování, bez závěrečné sekvence (ladicí běhy)
static func ukaz_obrazovku() -> void:
	var okno: CanvasLayer = load("res://game/obrazovky/konec_kapitoly.gd").new()
	okno._jen_obrazovka = true
	PopochiuUtils.e.get_tree().root.add_child(okno)


## Klíče paměti kapitoly, které platí pro současný stav (stejné podmínky jako prototyp)
static func pamet_kapitoly() -> Array:
	var g = PopochiuUtils.e.get_node("/root/Globals")
	var plati := {
		"bara_3": g.c1_bara_vyslechnuta >= 3,
		"bara_castecne": g.c1_bara_vyslechnuta >= 1 and g.c1_bara_vyslechnuta < 3,
		"bara_0": g.c1_bara_vyslechnuta == 0,
		"slib_0": g.c1_slib_vseho < 3,
		"slib": g.c1_slib_vseho >= 3,
		"babicka_spojenec": g.c1_babicka == "spojenec",
		"babicka_odmitnuta": g.c1_babicka == "odmitnuta",
		"babicka_prehlizena": g.c1_babicka == "prehlizena",
		"babicka_neodhalena": g.c1_babicka == "neodhalena",
		"faze2_ano": g.c1_faze2,
		"faze2_ne": not g.c1_faze2,
		"zmena": g.c1_zmena_dohoda,
		"razitko_kava": g.c1_razitko == "kava",
		"seznam": g.c1_seznam_pasazeru,
		"vzdy": true,
	}
	var klice := []
	for p in PAMET:
		if plati[p.kdy]:
			klice.append(p.klic)
	return klice


#endregion

#region Private ####################################################################################
func _sekvence() -> void:
	G.block()
	# Babička, o které hra ví, ale Ruda se nezastavil, čeká dál; o neznámé se neví
	if Globals.c1_babicka == "odhalena":
		Globals.c1_babicka = "prehlizena"
	elif Globals.c1_babicka.is_empty():
		Globals.c1_babicka = "neodhalena"
	# Večer na náměstí (schválené pozadí c-namesti-vecer, D51)
	R.Namesti.state.vecer = true
	await _prejdi("Namesti")
	await C.player.say("ch1_konec_ruda_1")
	await C.player.say("ch1_konec_kometa")
	if Globals.c1_bara_vyslechnuta >= 3:
		await C.Bara.say("ch1_bara_konec_kapitoly_duvera")
	else:
		await C.Bara.say("ch1_bara_konec_kapitoly_mereni")
	await C.player.say("ch1_konec_ruda_2")
	await _prejdi("Komise")
	await C.Predseda.say("ch1_predseda_telefon_1")
	await C.Predseda.say("ch1_predseda_telefon_2")
	await C.Predseda.say("ch1_predseda_telefon_3")
	G.block()
	_postav_obrazovku()
	print("[konec kapitoly] paměť: %s" % [", ".join(pamet_kapitoly())])


## Přejde do místnosti a počká, až je hra zase v ní; GUI zůstane blokované
func _prejdi(mistnost: String) -> void:
	R.goto_room(mistnost)
	while not E.in_room:
		await get_tree().process_frame
	G.block()
	await get_tree().create_timer(0.4).timeout


func _postav_obrazovku() -> void:
	var koren := Control.new()
	koren.set_anchors_preset(Control.PRESET_FULL_RECT)
	koren.theme = load("res://game/gui/resources/gui_theme.tres")
	add_child(koren)
	_koren = koren
	var stin := ColorRect.new()
	stin.color = Color(0, 0, 0, 0.7)
	stin.set_anchors_preset(Control.PRESET_FULL_RECT)
	stin.mouse_filter = Control.MOUSE_FILTER_STOP
	koren.add_child(stin)

	var stred := CenterContainer.new()
	stred.set_anchors_preset(Control.PRESET_FULL_RECT)
	stred.mouse_filter = Control.MOUSE_FILTER_IGNORE
	koren.add_child(stred)
	var okno := PanelContainer.new()
	okno.add_theme_stylebox_override("panel", _ramecek(BARVA_PAPIR, BARVA_OBRYS, 6, 22))
	okno.custom_minimum_size = Vector2(1180, 0)
	stred.add_child(okno)
	var okraj := MarginContainer.new()
	for strana in ["left", "right", "top", "bottom"]:
		okraj.add_theme_constant_override("margin_" + strana, 30)
	okno.add_child(okraj)
	var sloupec := VBoxContainer.new()
	sloupec.add_theme_constant_override("separation", 14)
	okraj.add_child(sloupec)

	sloupec.add_child(_popisek(tr("ch1_pamet_nadpis"), 46, HORIZONTAL_ALIGNMENT_CENTER))
	# „Pokračování příště“ (poslední řádek paměti) má vlastní závěrečnou obrazovku
	for klic: String in pamet_kapitoly():
		if klic == "ch1_pamet_pokracovani":
			continue
		sloupec.add_child(_popisek(tr(klic), 28, HORIZONTAL_ALIGNMENT_LEFT))

	var tlacitka := HBoxContainer.new()
	tlacitka.alignment = BoxContainer.ALIGNMENT_CENTER
	sloupec.add_child(tlacitka)
	var b := Button.new()
	b.text = tr("ui_dal")
	b.custom_minimum_size = Vector2(260, 66)
	b.add_theme_font_size_override("font_size", 30)
	b.add_theme_stylebox_override("normal", _ramecek(BARVA_REZ, BARVA_OBRYS, 4, 14))
	b.add_theme_stylebox_override("hover", _ramecek(BARVA_REZ.lightened(0.15), BARVA_OBRYS, 4, 14))
	b.add_theme_stylebox_override("pressed", _ramecek(BARVA_REZ.darkened(0.15), BARVA_OBRYS, 4, 14))
	b.add_theme_stylebox_override("focus", _ramecek(BARVA_REZ, BARVA_OBRYS, 4, 14))
	for stav in ["font_color", "font_hover_color", "font_pressed_color", "font_focus_color"]:
		b.add_theme_color_override(stav, Color.WHITE)
	b.pressed.connect(_pokracovani)
	tlacitka.add_child(b)

	koren.modulate = Color(1, 1, 1, 0)
	var t := create_tween()
	t.tween_property(koren, "modulate", Color.WHITE, 0.6)


## Závěrečná obrazovka „Pokračování příště“ s názvem další kapitoly; z ní titulky a hlavní menu
func _pokracovani() -> void:
	var t := create_tween()
	t.tween_property(_koren, "modulate", Color(1, 1, 1, 0), 0.5)
	await t.finished
	_koren.queue_free()

	_koren = Styl.koren()
	add_child(_koren)
	var stin := ColorRect.new()
	stin.color = Color(0.05, 0.03, 0.02, 0.94)
	stin.set_anchors_preset(Control.PRESET_FULL_RECT)
	stin.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_koren.add_child(stin)
	var stred := CenterContainer.new()
	stred.set_anchors_preset(Control.PRESET_FULL_RECT)
	stred.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_koren.add_child(stred)
	var sloupec := VBoxContainer.new()
	sloupec.custom_minimum_size = Vector2(1000, 0)
	sloupec.add_theme_constant_override("separation", 26)
	stred.add_child(sloupec)

	var nadpis := Styl.popisek("ch1_pamet_pokracovani", 104, Styl.PAPIR)
	nadpis.add_theme_constant_override("outline_size", 18)
	nadpis.add_theme_color_override("font_outline_color", Styl.OBRYS)
	sloupec.add_child(nadpis)
	sloupec.add_child(Styl.popisek("ch2_ui_kapitola", 46, Styl.ZLUTA))
	var mezera := Control.new()
	mezera.custom_minimum_size = Vector2(0, 40)
	sloupec.add_child(mezera)

	var tlacitka := HBoxContainer.new()
	tlacitka.alignment = BoxContainer.ALIGNMENT_CENTER
	tlacitka.add_theme_constant_override("separation", 30)
	sloupec.add_child(tlacitka)
	var titulky := Styl.tlacitko("ui_menu_titulky", 34, Styl.PETROLEJ)
	titulky.custom_minimum_size.x = 300
	titulky.pressed.connect(func(): Titulky.ukaz())
	tlacitka.add_child(titulky)
	var menu := Styl.tlacitko("ui_hlavni_menu", 34)
	menu.custom_minimum_size.x = 300
	menu.pressed.connect(_do_menu)
	tlacitka.add_child(menu)
	menu.grab_focus.call_deferred()

	_koren.modulate = Color(1, 1, 1, 0)
	create_tween().tween_property(_koren, "modulate", Color.WHITE, 0.8)
	print("[konec kapitoly] pokračování příště")


## Do hlavního menu; tahle obrazovka se zavře spolu s ostatními překryvy rámce
func _do_menu() -> void:
	Ramec.do_menu()


func _popisek(text: String, velikost: int, zarovnani: HorizontalAlignment) -> Label:
	var l := Label.new()
	l.text = text
	l.add_theme_font_size_override("font_size", velikost)
	l.add_theme_color_override("font_color", BARVA_TEXT)
	l.horizontal_alignment = zarovnani
	l.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	l.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	return l


func _ramecek(vypln: Color, obrys: Color, sirka: int, zaobleni: int) -> StyleBoxFlat:
	var s := StyleBoxFlat.new()
	s.bg_color = vypln
	s.border_color = obrys
	s.set_border_width_all(sirka)
	s.set_corner_radius_all(zaobleni)
	s.content_margin_left = 24
	s.content_margin_right = 24
	s.content_margin_top = 8
	s.content_margin_bottom = 8
	return s


#endregion
