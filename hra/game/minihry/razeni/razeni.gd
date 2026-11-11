# Řazení kartotéky (P1.5, malá hádanka): překryvné okno s pěti lístky. Hráč je řadí podle
# skutečného data zahájení z Lumírovy knihy (šipkami, nebo klepnutím na dva lístky, které si
# vymění místo). Vyhodnocení podle prototypu (kapitola1.js, minihra `razeni`): správné pořadí vydá
# původní zadání, abecední pořadí okomentuje Lumír, prohozená kašna a Archa Ruda (rozhodne měsíc).
# Okno se při replikách schová, aby byly vidět, a po nich se zase ukáže; rozpracované pořadí
# zůstává ve stavu archivu i po zavření. Vytváří se celé v kódu (bez scény), ovládání myší i prstem.
extends CanvasLayer

signal zavreno

## Lístky v pořadí, v jakém leží v kartotéce na začátku (prototyp), s klíči textů
const LISTKY := {
	"kasna": "ch1_listek_kasna",
	"archa": "ch1_listek_archa",
	"vytah": "ch1_listek_vytah",
	"most": "ch1_listek_most",
	"leseni": "ch1_listek_leseni",
}
const SPRAVNE := ["most", "leseni", "vytah", "archa", "kasna"]
## Seřazeno abecedně podle názvů projektů (chybný pokus: „Jsme archiv, ne telefonní seznam.“)
const ABECEDNE := ["archa", "leseni", "vytah", "most", "kasna"]
## Kašna a Archa prohozené: oba projekty začaly 1994, rozhodne měsíc v knize
const STEJNY_ROK := ["most", "leseni", "vytah", "kasna", "archa"]

# Paleta stylové bible: okr, rez, tmavě hnědé obrysy, žlutý akcent
const Styl := preload("res://game/obrazovky/styl.gd")
const BARVA_PAPIR := Color("f3e4c2")
const BARVA_LISTEK := Color("fbf3dc")
const BARVA_OBRYS := Color("4a2e14")
const BARVA_TEXT := Color("3a2614")
const BARVA_VYBER := Color("e9b52a")
const BARVA_TLACITKO := Color("c9743a")
const BARVA_TLACITKO_HLAVNI := Color("3f7d76")

var poradi: Array = []
var _vybrany := -1
var _radky: Array = []
var _okno: Control


func _init() -> void:
	layer = 12


func _ready() -> void:
	var stav = R.Archiv.state
	poradi = stav.razeni_poradi.duplicate() if stav.razeni_poradi.size() == LISTKY.size() else LISTKY.keys()
	_postav()
	_prekresli()


#region Public #####################################################################################
## Ukáže okno a počká, až ho hráč zavře (nebo až lístky seřadí)
func spust() -> void:
	G.block()
	await zavreno
	G.unblock()
	queue_free()


#endregion

#region Private ####################################################################################
func _postav() -> void:
	var koren := Control.new()
	koren.set_anchors_preset(Control.PRESET_FULL_RECT)
	koren.theme = load("res://game/gui/resources/gui_theme.tres")
	add_child(koren)

	# Ztmavení scény; pohltí klepnutí, aby se nedostala k aktivním místům pod oknem
	var stin := ColorRect.new()
	stin.color = Color(0, 0, 0, 0.55)
	stin.set_anchors_preset(Control.PRESET_FULL_RECT)
	stin.mouse_filter = Control.MOUSE_FILTER_STOP
	koren.add_child(stin)

	# Okno uprostřed obrazovky (CenterContainer ho vystředí podle jeho skutečné velikosti)
	var stred := CenterContainer.new()
	stred.set_anchors_preset(Control.PRESET_FULL_RECT)
	stred.mouse_filter = Control.MOUSE_FILTER_IGNORE
	koren.add_child(stred)
	_okno = PanelContainer.new()
	_okno.add_theme_stylebox_override("panel", Styl.malovany("okno", Vector2(30, 26)))
	_okno.custom_minimum_size = Vector2(1060, 0)
	stred.add_child(_okno)

	var okraj := MarginContainer.new()
	for strana in ["left", "right", "top", "bottom"]:
		okraj.add_theme_constant_override("margin_" + strana, 28)
	_okno.add_child(okraj)
	var sloupec := VBoxContainer.new()
	sloupec.add_theme_constant_override("separation", 14)
	okraj.add_child(sloupec)

	var titulek := Label.new()
	titulek.text = tr("ch1_hs_kartoteka")
	titulek.add_theme_font_size_override("font_size", 48)
	titulek.add_theme_color_override("font_color", BARVA_TEXT)
	titulek.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	sloupec.add_child(titulek)

	var navod := Label.new()
	navod.text = tr("ch1_kartoteka_razeni_uvod")
	navod.add_theme_font_size_override("font_size", 30)
	navod.add_theme_color_override("font_color", BARVA_TEXT)
	navod.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	navod.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	sloupec.add_child(navod)

	var seznam := VBoxContainer.new()
	seznam.add_theme_constant_override("separation", 8)
	sloupec.add_child(seznam)
	for i in LISTKY.size():
		var radek := HBoxContainer.new()
		radek.add_theme_constant_override("separation", 10)
		seznam.add_child(radek)

		var cislo := Label.new()
		cislo.text = "%d." % (i + 1)
		cislo.custom_minimum_size = Vector2(56, 0)
		cislo.add_theme_font_size_override("font_size", 34)
		cislo.add_theme_color_override("font_color", BARVA_TEXT)
		cislo.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
		radek.add_child(cislo)

		var listek := Button.new()
		listek.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		listek.custom_minimum_size = Vector2(0, 74)
		listek.alignment = HORIZONTAL_ALIGNMENT_LEFT
		listek.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		listek.add_theme_font_size_override("font_size", 28)
		listek.pressed.connect(_na_listek.bind(i))
		radek.add_child(listek)

		var vys := _sipka("▲", _posun.bind(i, -1))
		radek.add_child(vys)
		var niz := _sipka("▼", _posun.bind(i, 1))
		radek.add_child(niz)
		_radky.append({listek = listek, vys = vys, niz = niz})

	var tlacitka := HBoxContainer.new()
	tlacitka.add_theme_constant_override("separation", 16)
	tlacitka.alignment = BoxContainer.ALIGNMENT_END
	sloupec.add_child(tlacitka)
	tlacitka.add_child(_tlacitko(tr("ui_zavrit"), BARVA_TLACITKO, _zavrit))
	tlacitka.add_child(_tlacitko(tr("ui_razeni_archa"), BARVA_TLACITKO, _vzit_archu))
	tlacitka.add_child(_tlacitko(tr("ui_razeni_hotovo"), BARVA_TLACITKO_HLAVNI, _vyhodnotit))


func _prekresli() -> void:
	for i in _radky.size():
		var r: Dictionary = _radky[i]
		var vybrany := i == _vybrany
		r.listek.text = tr(LISTKY[poradi[i]])
		Styl.malovane_tlacitko(r.listek, "listek", Vector2(18, 8),
			Styl.ODSTIN_VYBER if vybrany else Color.WHITE)
		for stav in ["font_color", "font_hover_color", "font_pressed_color", "font_focus_color"]:
			r.listek.add_theme_color_override(stav, BARVA_TEXT)
		r.vys.disabled = i == 0
		r.niz.disabled = i == _radky.size() - 1
	R.Archiv.state.razeni_poradi = poradi.duplicate()


## Klepnutí na lístek: první vybere, druhé prohodí s vybraným
func _na_listek(i: int) -> void:
	if _vybrany < 0 or _vybrany == i:
		_vybrany = -1 if _vybrany == i else i
	else:
		var p = poradi[_vybrany]
		poradi[_vybrany] = poradi[i]
		poradi[i] = p
		_vybrany = -1
	_prekresli()


func _posun(i: int, o: int) -> void:
	var j := i + o
	if j < 0 or j >= poradi.size():
		return
	var p = poradi[i]
	poradi[i] = poradi[j]
	poradi[j] = p
	_vybrany = -1
	_prekresli()


func _vyhodnotit() -> void:
	visible = false
	if poradi == SPRAVNE:
		Zvuk.efekt("spravne")
		await C.player.say("ch1_kartoteka_hotovo_1")
		await C.Lumir.say("ch1_kartoteka_hotovo_2")
		await I.Zadani.add()
		R.Archiv.state.zadani_vydano = true
		R.Archiv.state.razeni_poradi = []
		zavreno.emit()
		return
	Zvuk.efekt("spatne")
	if poradi == ABECEDNE:
		await C.Lumir.say("ch1_kartoteka_abecedne")
	elif poradi == STEJNY_ROK:
		await C.player.say("ch1_kartoteka_stejny_rok")
	else:
		await C.player.say("ch1_kartoteka_spatne")
	visible = true


## Vzít lístek Archy bez řazení: Lumír přílohu nevydá (chybný pokus z karty puzzlu)
func _vzit_archu() -> void:
	visible = false
	await C.Lumir.say("ch1_lumir_priloha_stop")
	visible = true


func _zavrit() -> void:
	zavreno.emit()


func _sipka(znak: String, akce: Callable) -> Button:
	var b := Button.new()
	b.text = znak
	b.custom_minimum_size = Vector2(74, 74)
	b.add_theme_font_size_override("font_size", 30)
	Styl.malovane_tlacitko(b, "tlacitko", Vector2(8, 4))
	b.add_theme_color_override("font_color", BARVA_TEXT)
	b.add_theme_color_override("font_hover_color", BARVA_TEXT)
	b.add_theme_color_override("font_pressed_color", BARVA_TEXT)
	b.add_theme_color_override("font_disabled_color", BARVA_TEXT.lightened(0.5))
	b.pressed.connect(akce)
	return b


func _tlacitko(text: String, barva: Color, akce: Callable) -> Button:
	var b := Button.new()
	b.text = text
	b.custom_minimum_size = Vector2(0, 70)
	b.add_theme_font_size_override("font_size", 30)
	Styl.malovane_tlacitko(b, "stitek_petrolej" if barva == BARVA_TLACITKO_HLAVNI else "stitek_rez",
		Vector2(26, 8))
	for stav in ["font_color", "font_hover_color", "font_pressed_color", "font_focus_color"]:
		b.add_theme_color_override(stav, Color.WHITE)
	b.pressed.connect(akce)
	return b


#endregion
