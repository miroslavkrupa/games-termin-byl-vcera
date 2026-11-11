# Malovaný vzhled horní lišty a oken šablony Popochiu (nastavení, uložit a načíst, historie,
# potvrzení návratu do menu): stejné prvky jako okna miniher (game/obrazovky/styl.gd, D89).
# Scény šablony se nemění, vzhled se nasadí za běhu: gui.gd zavolá lista() a okno() po startu
# a okno() znovu při každém otevření okna, protože některé prvky vznikají až za běhu (řádky
# historie, posuvníky hlasitosti). Jen statické funkce.
extends RefCounted

const Styl := preload("res://game/obrazovky/styl.gd")
const TLACITKO_NASTAVENI := "res://grafika/gui/tlacitko_nastaveni%s.png"
const TLACITKO_DENIK := "res://grafika/gui/tlacitko_denik%s.png"
## Značka, že prvek už malovaný vzhled má
const HOTOVO := "malovany_vzhled"

static var _jezdec: Texture2D


## Horní lišta s inventářem: petrolejový smaltovaný štítek, vpravo tlačítko nastavení
static func lista(lista_uzel: Control) -> void:
	var panel := lista_uzel.get_node_or_null("PanelContainer") as PanelContainer
	if panel == null:
		return
	panel.self_modulate = Color.WHITE
	panel.add_theme_stylebox_override("panel", Styl.malovany("stitek_petrolej", Vector2(26, 10)))
	var nastaveni := panel.get_node_or_null("HBoxContainer/SettingsBtn") as TextureButton
	if nastaveni:
		nastaveni.texture_normal = load(TLACITKO_NASTAVENI % "")
		nastaveni.texture_hover = load(TLACITKO_NASTAVENI % "_najeti")
		nastaveni.texture_pressed = load(TLACITKO_NASTAVENI % "_stisk")
		nastaveni.custom_minimum_size = Vector2(96, 0)


## Přidá do lišty vlevo od nastavení tlačítko deníku (kniha); vrátí ho, aby ho rozhraní mohlo
## schovávat, dokud deník nemá co ukázat
static func tlacitko_deniku(lista_uzel: Control, otevri: Callable) -> TextureButton:
	var rada := lista_uzel.get_node_or_null("PanelContainer/HBoxContainer")
	var nastaveni := rada.get_node_or_null("SettingsBtn") if rada else null
	if nastaveni == null:
		return null
	var b := TextureButton.new()
	b.name = "DenikBtn"
	b.texture_normal = load(TLACITKO_DENIK % "")
	b.texture_hover = load(TLACITKO_DENIK % "_najeti")
	b.texture_pressed = load(TLACITKO_DENIK % "_stisk")
	b.custom_minimum_size = Vector2(96, 0)
	b.stretch_mode = TextureButton.STRETCH_KEEP_CENTERED
	b.pressed.connect(otevri)
	b.mouse_entered.connect(func() -> void: PopochiuUtils.g.show_hover_text("ui_denik"))
	b.mouse_exited.connect(func() -> void: PopochiuUtils.g.show_hover_text())
	rada.add_child(b)
	rada.move_child(b, nastaveni.get_index())
	return b


## Okno šablony: papír na kartonu, tmavé písmo, tlačítka jako štítky a lístky
static func okno(okno_uzel: Control) -> void:
	var panel := okno_uzel.get_node_or_null("Overlay/PanelContainer") as PanelContainer
	if panel:
		panel.add_theme_stylebox_override("panel", Styl.malovany("okno", Vector2(58, 48)))
	_projdi(okno_uzel)
	# Nastavení: pravý sloupec měl větší písmo než tlačítka vlevo a působil roztahaně;
	# všechno v něm má teď stejnou velikost jako tlačítka
	var sloupec := okno_uzel.get_node_or_null("Overlay/PanelContainer/VBoxContainer/BodyContainer/RightContainer")
	if sloupec:
		sloupec.add_theme_constant_override("separation", 6)
		_velikost_pisma(sloupec, 34)


static func _velikost_pisma(uzel: Node, velikost: int) -> void:
	for dite in uzel.get_children():
		if dite is Label or dite is Button or dite is LinkButton:
			# nápověda kláves je drobnější poznámka pod nastavením
			dite.add_theme_font_size_override("font_size", 26 if dite.name == "Klavesy" else velikost)
		_velikost_pisma(dite, velikost)


static func _projdi(uzel: Node) -> void:
	for dite in uzel.get_children():
		if not dite.has_meta(HOTOVO):
			dite.set_meta(HOTOVO, true)
			_prvek(dite)
		_projdi(dite)


static func _prvek(u: Node) -> void:
	if u is CheckButton:
		# Přepínač má bílé ikony ze šablony: na papíře ztmavnou
		u.modulate = Styl.TEXT
	elif u is Button:
		_tlacitko(u)
	elif u is TextureButton:
		u.modulate = Styl.OBRYS
	elif u is LinkButton:
		for barva in ["font_color", "font_hover_color", "font_pressed_color", "font_focus_color"]:
			u.add_theme_color_override(barva, Styl.TEXT)
	elif u is Label:
		u.add_theme_color_override("font_color", Styl.TEXT)
	elif u is RichTextLabel:
		u.add_theme_color_override("default_color", Styl.TEXT)
	elif u is TextureRect:
		u.modulate = Styl.TEXT
	elif u is HSlider:
		_posuvnik(u)
	elif u is VSeparator or u is HSeparator:
		var cara := StyleBoxLine.new()
		cara.color = Color(Styl.OBRYS, 0.45)
		cara.thickness = 3
		cara.vertical = u is VSeparator
		u.add_theme_stylebox_override("separator", cara)


# Tlačítko akce je štítek (OK petrolejový, ostatní rezavé) s bílým písmem; přepínací tlačítko
# (jazyk, dotyk, pozice uložené hry) je lístek s tmavým písmem, zvolený zežloutne.
static func _tlacitko(b: Button) -> void:
	var obsah := Vector2(24, 10)
	if b.toggle_mode:
		Styl.malovane_tlacitko(b, "listek", obsah)
		var zvoleny := Styl.malovany("listek", obsah, Styl.ODSTIN_VYBER)
		b.add_theme_stylebox_override("pressed", zvoleny)
		b.add_theme_stylebox_override("hover_pressed", zvoleny)
		_pismo(b, Styl.TEXT)
		return
	Styl.malovane_tlacitko(b, "stitek_petrolej" if b.name == "Ok" else "stitek_rez", obsah)
	_pismo(b, Color.WHITE)


static func _pismo(b: Button, barva: Color) -> void:
	for stav in ["font_color", "font_hover_color", "font_pressed_color", "font_focus_color",
			"font_hover_pressed_color", "icon_normal_color", "icon_hover_color",
			"icon_pressed_color", "icon_focus_color", "icon_hover_pressed_color"]:
		b.add_theme_color_override(stav, barva)
	b.add_theme_color_override("font_disabled_color", Color(barva, 0.5))
	b.add_theme_color_override("icon_disabled_color", Color(barva, 0.5))


# Posuvník: tmavá drážka, rezavá vyplněná část, jezdec z malovaného tlačítka
static func _posuvnik(p: HSlider) -> void:
	p.add_theme_stylebox_override("slider", _drazka(Color(Styl.OBRYS, 0.4)))
	p.add_theme_stylebox_override("grabber_area", _drazka(Styl.REZ))
	p.add_theme_stylebox_override("grabber_area_highlight", _drazka(Styl.REZ.lightened(0.12)))
	if _jezdec == null:
		var obrazek: Image = (load(Styl.GUI % "tlacitko") as Texture2D).get_image()
		obrazek.resize(40, 40, Image.INTERPOLATE_LANCZOS)
		_jezdec = ImageTexture.create_from_image(obrazek)
	for ikona in ["grabber", "grabber_highlight", "grabber_disabled"]:
		p.add_theme_icon_override(ikona, _jezdec)


static func _drazka(barva: Color) -> StyleBoxFlat:
	var s := StyleBoxFlat.new()
	s.bg_color = barva
	s.set_corner_radius_all(6)
	s.content_margin_top = 6
	s.content_margin_bottom = 6
	return s
