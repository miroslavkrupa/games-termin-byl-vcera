# Jeden papír o Arše (M01, P1.11): překryvné okno s pěti kolonkami (proč, do kdy, jak poznáme
# úspěch, co na Archu nepatří, kdo rozhoduje) a útržky toho, co Ruda v kapitole slyšel nebo má.
# Pravidla a texty podle prototypu (kapitola1.js, minihra m01): útržky se nabízejí jen podle stavu
# hry (zadání, podpis, Bářina kritéria, nesmysly Pana Změny a Předsedy, „co nepatří“ od Báry),
# útržek do cizí kolonky Ruda odmítne („Tohle je odpověď na jinou otázku.“), správná kolonka
# přijme dobrý útržek („Sedí.“) i nesmysl („Vejde se to tam…“). Odevzdání: musí být obsazené
# všechny kolonky, pro které nějaký útržek existuje; kvalita = kolik ze tří klíčových kolonek má
# dobrý útržek (c1_charter_kvalita), Bářin útržek v „co nepatří“ nastaví c1_mimo_rozsah. Zadání a
# podpis se spotřebují, vznikne předmět Papir. Rozpracované přiřazení zůstává ve stavu Komise.
# Ovládání klepnutím (myš i prst): klepnutí na útržek ho vybere, klepnutí do kolonky ho tam dá,
# klepnutí na útržek v kolonce ho vrátí (v zásobníku zůstává vybledlý, tlačítka se nepřeskupují). Okno se při replikách schová a zase ukáže.
# Vytváří se celé v kódu (bez scény).
extends CanvasLayer

signal zavreno

const KOLONKY := ["cil", "termin", "kriteria", "mimo", "kdo"]
## Tři klíčové kolonky, které určují kvalitu papíru
const KLICOVE := ["cil", "termin", "kriteria"]

# Paleta stylové bible: okr, rez, vybledlá petrolejová, tmavě hnědé obrysy, žlutý akcent
const BARVA_PAPIR := Color("f3e4c2")
const BARVA_LISTEK := Color("fbf3dc")
const BARVA_POLE := Color("eddcb4")
const BARVA_OBRYS := Color("4a2e14")
const BARVA_TEXT := Color("3a2614")
const BARVA_VYBER := Color("e9b52a")
const BARVA_REZ := Color("c9743a")
const BARVA_PETROLEJ := Color("3f7d76")

## Útržky dostupné v této hře: id → {kolonka, dobry, klic}
var utrzky := {}
var _vybrany := ""
var _okno: Control
## Kontejnery kolonek (id kolonky → HBoxContainer, kam se útržek přesune) a zásobník
var _pole: Dictionary = {}
var _zasobnik: HFlowContainer
var _tlacitka: Dictionary = {}


func _init() -> void:
	layer = 12


func _ready() -> void:
	utrzky = dostupne_utrzky()
	# Přiřazení, která už nedávají smysl (útržek zmizel), se zahodí
	var prirazeni: Dictionary = R.Komise.state.m01_prirazeni
	for kolonka in prirazeni.keys():
		if not utrzky.has(prirazeni[kolonka]):
			prirazeni.erase(kolonka)
	_postav()
	_prekresli()


#region Public #####################################################################################
## Ukáže okno a počká, až ho hráč zavře nebo papír odevzdá
func spust() -> void:
	G.block()
	await zavreno
	G.unblock()
	queue_free()


## Útržky podle stavu hry (prototyp: priprav)
static func dostupne_utrzky() -> Dictionary:
	var namesti = R.Namesti.state
	var komise = R.Komise.state
	var seznam := [
		["cil", "cil", true, I.is_item_in_inventory("Zadani")],
		["cil_nesmysl", "cil", false, namesti.slysel_zmena_archa],
		["termin", "termin", true, I.is_item_in_inventory("Podpis")],
		["termin_nesmysl", "termin", false, komise.utrzek_termin_nesmysl],
		["kriteria", "kriteria", true, Globals.c1_bara_kriteria],
		["kriteria_nesmysl", "kriteria", false, namesti.slysel_zmena_archa],
		["mimo", "mimo", true, namesti.utrzek_mimo],
		["mimo_nesmysl", "mimo", false, true],
		["kdo", "kdo", true, I.is_item_in_inventory("Podpis")],
		["kdo_nesmysl", "kdo", false, komise.utrzek_kdo_nesmysl],
	]
	var vysledek := {}
	for u in seznam:
		if u[3]:
			vysledek[u[0]] = {kolonka = u[1], dobry = u[2], klic = "ch1_m01_utrzek_%s" % u[0]}
	return vysledek


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

	var stred := CenterContainer.new()
	stred.set_anchors_preset(Control.PRESET_FULL_RECT)
	stred.mouse_filter = Control.MOUSE_FILTER_IGNORE
	koren.add_child(stred)
	_okno = PanelContainer.new()
	_okno.add_theme_stylebox_override("panel", _ramecek(BARVA_PAPIR, BARVA_OBRYS, 6, 22))
	_okno.custom_minimum_size = Vector2(1380, 0)
	stred.add_child(_okno)

	var okraj := MarginContainer.new()
	for strana in ["left", "right", "top", "bottom"]:
		okraj.add_theme_constant_override("margin_" + strana, 22)
	_okno.add_child(okraj)
	var sloupec := VBoxContainer.new()
	sloupec.add_theme_constant_override("separation", 8)
	okraj.add_child(sloupec)

	sloupec.add_child(_popisek(tr("ch1_m01_nazev"), 42, HORIZONTAL_ALIGNMENT_CENTER))
	sloupec.add_child(_popisek(tr("ch1_m01_navod"), 24, HORIZONTAL_ALIGNMENT_CENTER))

	# Kolonky papíru: název vlevo, místo pro útržek vpravo
	for id in KOLONKY:
		var radek := HBoxContainer.new()
		radek.add_theme_constant_override("separation", 10)
		sloupec.add_child(radek)
		var nazev := _popisek(tr("ch1_m01_kolonka_%s" % id), 26, HORIZONTAL_ALIGNMENT_RIGHT)
		nazev.size_flags_horizontal = Control.SIZE_FILL
		nazev.custom_minimum_size = Vector2(330, 0)
		nazev.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
		radek.add_child(nazev)
		var pole := PanelContainer.new()
		pole.custom_minimum_size = Vector2(0, 66)
		pole.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		pole.add_theme_stylebox_override("panel", _ramecek(BARVA_POLE, BARVA_OBRYS, 3, 12))
		pole.mouse_filter = Control.MOUSE_FILTER_STOP
		pole.gui_input.connect(_vstup_pole.bind(id))
		radek.add_child(pole)
		var obsah := HBoxContainer.new()
		obsah.mouse_filter = Control.MOUSE_FILTER_IGNORE
		pole.add_child(obsah)
		_pole[id] = obsah

	# Zásobník útržků (dole); klepnutí do něj vrátí vybraný útržek z kolonky
	var zasobnik_ram := PanelContainer.new()
	zasobnik_ram.custom_minimum_size = Vector2(0, 150)
	zasobnik_ram.add_theme_stylebox_override("panel", _ramecek(BARVA_PAPIR.darkened(0.06), BARVA_OBRYS, 3, 12))
	zasobnik_ram.mouse_filter = Control.MOUSE_FILTER_STOP
	zasobnik_ram.gui_input.connect(_vstup_pole.bind(""))
	sloupec.add_child(zasobnik_ram)
	_zasobnik = HFlowContainer.new()
	_zasobnik.add_theme_constant_override("h_separation", 8)
	_zasobnik.add_theme_constant_override("v_separation", 8)
	_zasobnik.mouse_filter = Control.MOUSE_FILTER_IGNORE
	zasobnik_ram.add_child(_zasobnik)

	for id in utrzky:
		var b := Button.new()
		b.custom_minimum_size = Vector2(0, 54)
		b.add_theme_font_size_override("font_size", 23)
		b.text = tr(utrzky[id].klic)
		b.pressed.connect(_na_utrzek.bind(id))
		_tlacitka[id] = b
		_zasobnik.add_child(b)

	var tlacitka := HBoxContainer.new()
	tlacitka.add_theme_constant_override("separation", 16)
	tlacitka.alignment = BoxContainer.ALIGNMENT_END
	sloupec.add_child(tlacitka)
	tlacitka.add_child(_tlacitko(tr("ui_zavrit"), BARVA_REZ, _zavrit))
	tlacitka.add_child(_tlacitko(tr("ui_m01_hotovo"), BARVA_PETROLEJ, _odevzdat))


## Ukáže útržky v kolonkách podle stavu Komise a zvýrazní vybraný. Zásobník se nepřeskupuje:
## použitý útržek v něm zůstane vybledlý, aby tlačítka nelétala (myš i prst míří najisto).
func _prekresli() -> void:
	var prirazeni: Dictionary = R.Komise.state.m01_prirazeni
	for kolonka in KOLONKY:
		var obsah: HBoxContainer = _pole[kolonka]
		for dite in obsah.get_children():
			obsah.remove_child(dite)
			dite.queue_free()
		if prirazeni.has(kolonka):
			var id: String = prirazeni[kolonka]
			var v := Button.new()
			v.custom_minimum_size = Vector2(0, 54)
			v.add_theme_font_size_override("font_size", 23)
			v.text = tr(utrzky[id].klic)
			v.pressed.connect(_vratit.bind(kolonka))
			_obarvi(v, false, false)
			obsah.add_child(v)
	for id in utrzky:
		var b: Button = _tlacitka[id]
		var pouzity: bool = prirazeni.values().has(id)
		b.disabled = pouzity
		_obarvi(b, id == _vybrany, pouzity)


## Vzhled útržku: lístek s hnědým obrysem, vybraný žlutě, použitý vybledlý
func _obarvi(b: Button, vybrany: bool, pouzity: bool) -> void:
	for stav in ["normal", "hover", "pressed", "focus", "disabled"]:
		b.add_theme_stylebox_override(stav, _ramecek(
			BARVA_PAPIR.darkened(0.08) if stav == "disabled" else (BARVA_LISTEK.lightened(0.3) if stav == "hover" else BARVA_LISTEK),
			BARVA_VYBER if vybrany else BARVA_OBRYS, 6 if vybrany else 3, 10))
	for stav in ["font_color", "font_hover_color", "font_pressed_color", "font_focus_color"]:
		b.add_theme_color_override(stav, BARVA_TEXT)
	b.add_theme_color_override("font_disabled_color", BARVA_TEXT.lightened(0.55) if pouzity else BARVA_TEXT)


## Klepnutí na útržek v zásobníku: vybere ho, nebo výběr zruší
func _na_utrzek(id: String) -> void:
	_vybrany = "" if _vybrany == id else id
	_prekresli()


## Klepnutí na útržek v kolonce: vrátí ho do zásobníku
func _vratit(kolonka: String) -> void:
	R.Komise.state.m01_prirazeni.erase(kolonka)
	_vybrany = ""
	_prekresli()


## Klepnutí do kolonky (id) nebo do zásobníku (""): dá tam vybraný útržek (prototyp: zkus)
func _vstup_pole(udalost: InputEvent, kolonka: String) -> void:
	var klepnuti: bool = (udalost is InputEventMouseButton and udalost.pressed
		and udalost.button_index == MOUSE_BUTTON_LEFT) or (udalost is InputEventScreenTouch and udalost.pressed)
	if not klepnuti or _vybrany.is_empty():
		return
	var id := _vybrany
	_vybrany = ""
	if kolonka.is_empty():
		_prekresli()
		return
	var u: Dictionary = utrzky[id]
	if u.kolonka != kolonka:
		_prekresli()
		await _ruda("ch1_m01_reakce_spatna_kolonka")
		return
	R.Komise.state.m01_prirazeni[kolonka] = id
	_prekresli()
	await _ruda("ch1_m01_reakce_dobra" if u.dobry else "ch1_m01_reakce_nesmysl")


## Odevzdání papíru (prototyp: vyhodnot s prirazeni)
func _odevzdat() -> void:
	_vybrany = ""
	_prekresli()
	var prirazeni: Dictionary = R.Komise.state.m01_prirazeni
	for kolonka in KOLONKY:
		var ma_utrzek := false
		for id in utrzky:
			if utrzky[id].kolonka == kolonka:
				ma_utrzek = true
		if ma_utrzek and not prirazeni.has(kolonka):
			await _ruda("ch1_m01_navod")
			return
	visible = false
	if not Globals.c1_bara_kriteria:
		await I.Pembok.rada("ch1_m01_pembok_kriteria")
	var kvalita := 0
	for kolonka in KLICOVE:
		if prirazeni.get(kolonka, "") == kolonka:
			kvalita += 1
	Globals.c1_charter_kvalita = kvalita
	Globals.c1_mimo_rozsah = prirazeni.get("mimo", "") == "mimo"
	await C.player.say("ch1_m01_hotovo" if kvalita == 3 else "ch1_m01_hotovo_slabe")
	await I.Zadani.remove()
	await I.Podpis.remove()
	await I.Papir.add()
	zavreno.emit()


## Rudova replika: okno se schová, aby byla vidět, a pak zase ukáže
func _ruda(klic: String) -> void:
	visible = false
	await C.player.say(klic)
	visible = true


func _zavrit() -> void:
	zavreno.emit()


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
	s.content_margin_left = 14
	s.content_margin_right = 14
	s.content_margin_top = 6
	s.content_margin_bottom = 6
	return s


func _tlacitko(text: String, barva: Color, akce: Callable) -> Button:
	var b := Button.new()
	b.text = text
	b.custom_minimum_size = Vector2(0, 66)
	b.add_theme_font_size_override("font_size", 30)
	b.add_theme_stylebox_override("normal", _ramecek(barva, BARVA_OBRYS, 4, 14))
	b.add_theme_stylebox_override("hover", _ramecek(barva.lightened(0.15), BARVA_OBRYS, 4, 14))
	b.add_theme_stylebox_override("pressed", _ramecek(barva.darkened(0.15), BARVA_OBRYS, 4, 14))
	b.add_theme_stylebox_override("focus", _ramecek(barva, BARVA_OBRYS, 4, 14))
	for stav in ["font_color", "font_hover_color", "font_pressed_color", "font_focus_color"]:
		b.add_theme_color_override(stav, Color.WHITE)
	b.pressed.connect(akce)
	return b


#endregion
