# Společný vzhled obrazovek rámce hry (hlavní menu, titulky, konec kapitoly, nabídka po ťuknutí):
# paleta stylové bible (okr, rez, vybledlá petrolejová, žlutý stavební akcent, tmavě hnědé obrysy)
# a tlačítka jako papírové štítky. Písmo dává téma GUI (Patrick Hand). Jen statické funkce.
extends RefCounted

const PAPIR := Color("f3e4c2")
const LISTEK := Color("fbf3dc")
const POLE := Color("eddcb4")
const OBRYS := Color("4a2e14")
const TEXT := Color("3a2614")
const PETROLEJ := Color("3f7d76")
const REZ := Color("c9743a")
const ZLUTA := Color("e9b52a")
const TEMA := "res://game/gui/resources/gui_theme.tres"
## Malované prvky rozhraní (D89): okno, lístek, pole, štítky tlačítek a malé tlačítko
const GUI := "res://grafika/gui/%s.png"
## Okraje devítidílné textury v pixelech: rohy se neroztahují (připínáčky, nýty, ohnutý roh)
const OKRAJE := {"okno": 62, "listek": 10, "pole": 18, "stitek_rez": 18, "stitek_petrolej": 18,
	"tlacitko": 26}
## Odstíny stavů tlačítka (násobí barvu textury)
const ODSTIN_NAJETI := Color(1.1, 1.1, 1.1)
const ODSTIN_STISK := Color(0.85, 0.85, 0.85)
const ODSTIN_VYPNUTO := Color(0.82, 0.8, 0.76, 0.6)
const ODSTIN_VYBER := Color(1.0, 0.86, 0.45)


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


## Malovaný podklad z grafika/gui/<název>.png jako devítidílná textura; [param obsah] je
## vnitřní okraj textu, [param odstin] násobí barvu (stavy tlačítek, výběr).
static func malovany(nazev: String, obsah := Vector2(18, 8), odstin := Color.WHITE) -> StyleBoxTexture:
	var s := StyleBoxTexture.new()
	s.texture = load(GUI % nazev)
	s.set_texture_margin_all(OKRAJE.get(nazev, 16))
	s.modulate_color = odstin
	s.content_margin_left = obsah.x
	s.content_margin_right = obsah.x
	s.content_margin_top = obsah.y
	s.content_margin_bottom = obsah.y
	return s


## Malovaný podklad podle barvy, kterou měl dřív plochý rámeček (D89): okna a minihry tak
## dál říkají „papír“, „lístek“, „rez“ a vzhled se mění na jednom místě.
## - velké zaoblení (od 20) je okno, zaoblení 16–19 kulatá značka (ta zůstává plochá),
## - světlá krémová je lístek, barva pole a zásobníku zapuštěné pole, rez a petrolejová štítky,
## - odstín výplně proti základní barvě (zesvětlení při najetí, ztmavení při stisku) se přenese
##   jako násobek barvy textury; žlutý obrys (výběr) lístek zežloutne, štítek zesvětlí.
static func podle_barvy(vypln: Color, obrys: Color, sirka := 4, zaobleni := 14,
		obsah := Vector2(18, 8)) -> StyleBox:
	if zaobleni >= 20:
		return malovany("okno", Vector2(maxf(obsah.x, 30), maxf(obsah.y, 26)))
	if zaobleni >= 16:
		return ramecek(vypln, obrys, sirka, zaobleni, obsah)
	var nazev := "listek"
	var zaklad := LISTEK
	if _blizko(vypln, POLE) or _blizko(vypln, PAPIR.darkened(0.06)):
		nazev = "pole"
		zaklad = vypln
	elif vypln.v > 0.8 and vypln.s < 0.35:
		pass
	elif vypln.s > 0.6 and vypln.h > 0.08 and vypln.h < 0.17:
		# žlutá výplň (zvolený jazyk v menu): lístek ve žlutém odstínu
		zaklad = vypln
		obrys = ZLUTA
	elif vypln.g > vypln.r and vypln.b > vypln.r:
		nazev = "stitek_petrolej"
		zaklad = PETROLEJ
	else:
		nazev = "stitek_rez"
		zaklad = REZ
	var odstin := Color(
		clampf(vypln.r / maxf(zaklad.r, 0.01), 0.55, 1.2),
		clampf(vypln.g / maxf(zaklad.g, 0.01), 0.55, 1.2),
		clampf(vypln.b / maxf(zaklad.b, 0.01), 0.55, 1.2), vypln.a)
	if _blizko(obrys, ZLUTA):
		odstin *= ODSTIN_NAJETI if nazev.begins_with("stitek") else ODSTIN_VYBER
	if nazev.begins_with("stitek"):
		obsah.x = maxf(obsah.x, 24)
	return malovany(nazev, obsah, odstin)


static func _blizko(a: Color, b: Color) -> bool:
	return absf(a.r - b.r) + absf(a.g - b.g) + absf(a.b - b.b) < 0.06


## Nasadí na tlačítko malovaný podklad se stavy (najetí, stisk, vypnuto).
static func malovane_tlacitko(b: Button, nazev: String, obsah := Vector2(18, 8), odstin := Color.WHITE) -> void:
	b.add_theme_stylebox_override("normal", malovany(nazev, obsah, odstin))
	b.add_theme_stylebox_override("focus", malovany(nazev, obsah, odstin))
	b.add_theme_stylebox_override("hover", malovany(nazev, obsah, odstin * ODSTIN_NAJETI))
	b.add_theme_stylebox_override("pressed", malovany(nazev, obsah, odstin * ODSTIN_STISK))
	b.add_theme_stylebox_override("disabled", malovany(nazev, obsah, odstin * ODSTIN_VYPNUTO))


## Tlačítko jako štítek. [param text] je klíč textu: Godot ho přeloží sám a po změně jazyka
## i znovu, takže tlačítko v menu se přepne hned po volbě jazyka.
static func tlacitko(text: String, velikost := 36, barva := REZ, svetly_text := true) -> Button:
	var b := Button.new()
	b.text = text
	b.custom_minimum_size = Vector2(0, velikost * 1.9)
	b.add_theme_font_size_override("font_size", velikost)
	var okraj := Vector2(24, 8)
	b.add_theme_stylebox_override("normal", podle_barvy(barva, OBRYS, 4, 14, okraj))
	b.add_theme_stylebox_override("hover", podle_barvy(barva.lightened(0.15), OBRYS, 4, 14, okraj))
	b.add_theme_stylebox_override("pressed", podle_barvy(barva.darkened(0.15), OBRYS, 4, 14, okraj))
	b.add_theme_stylebox_override("focus", podle_barvy(barva, ZLUTA, 4, 14, okraj))
	b.add_theme_stylebox_override("disabled", podle_barvy(barva.lerp(Color("9a8a70"), 0.7), OBRYS, 4, 14, okraj))
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
