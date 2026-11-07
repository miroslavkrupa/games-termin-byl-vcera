# Společný vzhled obrazovek rámce hry (hlavní menu, titulky, konec kapitoly, nabídka po ťuknutí):
# paleta stylové bible (okr, rez, vybledlá petrolejová, žlutý stavební akcent, tmavě hnědé obrysy)
# a tlačítka jako papírové štítky. Písmo dává téma GUI (Patrick Hand). Jen statické funkce.
extends RefCounted

const PAPIR := Color("f3e4c2")
const OBRYS := Color("4a2e14")
const TEXT := Color("3a2614")
const PETROLEJ := Color("3f7d76")
const REZ := Color("c9743a")
const ZLUTA := Color("e9b52a")
const TEMA := "res://game/gui/resources/gui_theme.tres"


## Rámeček s výplní a obrysem (podklad oken a tlačítek)
static func ramecek(vypln: Color, obrys: Color, sirka := 4, zaobleni := 14,
		okraj := Vector2(24, 8)) -> StyleBoxFlat:
	var s := StyleBoxFlat.new()
	s.bg_color = vypln
	s.border_color = obrys
	s.set_border_width_all(sirka)
	s.set_corner_radius_all(zaobleni)
	s.content_margin_left = okraj.x
	s.content_margin_right = okraj.x
	s.content_margin_top = okraj.y
	s.content_margin_bottom = okraj.y
	return s


## Tlačítko jako štítek. [param text] je klíč textu: Godot ho přeloží sám a po změně jazyka
## i znovu, takže tlačítko v menu se přepne hned po volbě jazyka.
static func tlacitko(text: String, velikost := 36, barva := REZ, svetly_text := true) -> Button:
	var b := Button.new()
	b.text = text
	b.custom_minimum_size = Vector2(0, velikost * 1.9)
	b.add_theme_font_size_override("font_size", velikost)
	b.add_theme_stylebox_override("normal", ramecek(barva, OBRYS))
	b.add_theme_stylebox_override("hover", ramecek(barva.lightened(0.15), OBRYS))
	b.add_theme_stylebox_override("pressed", ramecek(barva.darkened(0.15), OBRYS))
	b.add_theme_stylebox_override("focus", ramecek(barva, ZLUTA, 4))
	b.add_theme_stylebox_override("disabled", ramecek(barva.lerp(Color("9a8a70"), 0.7), OBRYS))
	var pismo := Color.WHITE if svetly_text else TEXT
	for stav in ["font_color", "font_hover_color", "font_pressed_color", "font_focus_color",
			"font_hover_pressed_color"]:
		b.add_theme_color_override(stav, pismo)
	b.add_theme_color_override("font_disabled_color", Color(1, 1, 1, 0.55))
	return b


## Popisek s barvou a velikostí písma; [param text] může být klíč textu (přeloží se sám)
static func popisek(text: String, velikost: int, barva := TEXT,
		zarovnani := HORIZONTAL_ALIGNMENT_CENTER) -> Label:
	var l := Label.new()
	l.text = text
	l.add_theme_font_size_override("font_size", velikost)
	l.add_theme_color_override("font_color", barva)
	l.horizontal_alignment = zarovnani
	l.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	l.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	return l


## Kořen obrazovky přes celé okno s tématem GUI; pohltí klepnutí, aby nešla do scény pod ním
static func koren() -> Control:
	var k := Control.new()
	k.set_anchors_preset(Control.PRESET_FULL_RECT)
	k.theme = load(TEMA)
	k.mouse_filter = Control.MOUSE_FILTER_STOP
	return k
