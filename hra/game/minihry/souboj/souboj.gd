# Souboj argumenty se starostou (M03, P1.8, R1.1): překryvné okno s námitkou starosty a dvěma až
# třemi odpověďmi Rudy. Pravidla a texty podle prototypu (kapitola1.js, minihra m03): 5 kol, výhra
# od 3 vyhraných. Dobrá replika se nabízí jen s podkladem (kolo 2 původní zadání, kolo 3 karta
# poučení, kolo 5 Bářina kritéria), kola 1 a 4 ji mají vždy. Rychlá replika (slib) kolo vyhraje
# a přičte 1 ke Globals.c1_slib_vseho, slabá kolo prohraje. Pořadí odpovědí se v každém kole
# posouvá, aby dobrá nebyla vždy první. Okno se při replikách schová a po nich zase ukáže.
# Výhra vydá podpis sponzora (od 3 slibů s fontánou), prohra nastaví starosta_prohra a souboj
# jde zkusit znovu. Vytváří se celé v kódu (bez scény), ovládání myší i prstem.
extends CanvasLayer

signal zavreno

const KOL := 5
const DRUHY := ["dobra", "rychla", "slaba"]

# Paleta stylové bible: okr, rez, vybledlá petrolejová, tmavě hnědé obrysy, žlutý akcent
const Styl := preload("res://game/obrazovky/styl.gd")
const BARVA_PAPIR := Color("f3e4c2")
const BARVA_LISTEK := Color("fbf3dc")
const BARVA_OBRYS := Color("4a2e14")
const BARVA_TEXT := Color("3a2614")
const BARVA_VYBER := Color("e9b52a")
const BARVA_REZ := Color("c9743a")
const BARVA_PETROLEJ := Color("3f7d76")

var kolo := 1
var vyhrano := 0
var rychle := 0
## Druhy odpovědí v odehraných kolech (pro značky)
var _vysledky: Array = []

var _okno: Control
var _kolo_popis: Label
var _namitka: Label
var _odpovedi: VBoxContainer
var _znacky: Array = []


func _init() -> void:
	layer = 12


func _ready() -> void:
	_postav()
	_ukaz_kolo()


#region Public #####################################################################################
## Ukáže okno a počká, až souboj skončí (5 kol); zavřít dřív nejde, jako v prototypu
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

	var stred := CenterContainer.new()
	stred.set_anchors_preset(Control.PRESET_FULL_RECT)
	stred.mouse_filter = Control.MOUSE_FILTER_IGNORE
	koren.add_child(stred)
	_okno = PanelContainer.new()
	_okno.add_theme_stylebox_override("panel", _ramecek(BARVA_PAPIR, BARVA_OBRYS, 6, 22))
	_okno.custom_minimum_size = Vector2(1100, 0)
	stred.add_child(_okno)

	var okraj := MarginContainer.new()
	for strana in ["left", "right", "top", "bottom"]:
		okraj.add_theme_constant_override("margin_" + strana, 28)
	_okno.add_child(okraj)
	var sloupec := VBoxContainer.new()
	sloupec.add_theme_constant_override("separation", 14)
	okraj.add_child(sloupec)

	sloupec.add_child(_popisek(tr("ch1_m03_nazev"), 48, HORIZONTAL_ALIGNMENT_CENTER))
	sloupec.add_child(_popisek(tr("ch1_m03_navod"), 26, HORIZONTAL_ALIGNMENT_CENTER))

	# Řádek s číslem kola a značkami vyhraných a prohraných kol
	var radek := HBoxContainer.new()
	radek.add_theme_constant_override("separation", 12)
	radek.alignment = BoxContainer.ALIGNMENT_CENTER
	sloupec.add_child(radek)
	_kolo_popis = _popisek("", 30, HORIZONTAL_ALIGNMENT_LEFT)
	radek.add_child(_kolo_popis)
	for i in KOL:
		var z := Panel.new()
		z.custom_minimum_size = Vector2(34, 34)
		radek.add_child(z)
		_znacky.append(z)

	# Námitka starosty v petrolejovém rámečku (titulek mluvčího + text)
	var namitka_ram := PanelContainer.new()
	namitka_ram.add_theme_stylebox_override("panel", _ramecek(BARVA_PETROLEJ, BARVA_OBRYS, 4, 14))
	sloupec.add_child(namitka_ram)
	var namitka_sloupec := VBoxContainer.new()
	namitka_ram.add_child(namitka_sloupec)
	var mluvci := _popisek(tr("postava_starosta") + ":", 24, HORIZONTAL_ALIGNMENT_LEFT)
	mluvci.add_theme_color_override("font_color", BARVA_PAPIR)
	namitka_sloupec.add_child(mluvci)
	_namitka = _popisek("", 34, HORIZONTAL_ALIGNMENT_LEFT)
	_namitka.add_theme_color_override("font_color", Color.WHITE)
	namitka_sloupec.add_child(_namitka)

	_odpovedi = VBoxContainer.new()
	_odpovedi.add_theme_constant_override("separation", 10)
	# Pevná výška pro 3 odpovědi, aby okno (a tlačítka) neposkakovalo mezi koly se 2 a 3 odpověďmi
	_odpovedi.custom_minimum_size = Vector2(0, 320)
	sloupec.add_child(_odpovedi)


## Připraví kolo: námitka a odpovědi podle podkladů (prototyp: priprav)
func _ukaz_kolo() -> void:
	var podklad := {
		1: true,
		2: I.is_item_in_inventory("Zadani"),
		3: I.is_item_in_inventory("Karta"),
		4: true,
		5: Globals.c1_bara_kriteria,
	}
	var druhy: Array = DRUHY.filter(func(d: String) -> bool: return d != "dobra" or podklad[kolo])
	var posun: int = kolo % druhy.size()
	druhy = druhy.slice(posun) + druhy.slice(0, posun)

	_kolo_popis.text = tr("ch1_m03_kolo") % [kolo, KOL]
	_namitka.text = tr("ch1_m03_k%d_namitka" % kolo)
	for dite in _odpovedi.get_children():
		dite.queue_free()
	for d in druhy:
		var b := Button.new()
		b.text = tr("ch1_m03_k%d_%s" % [kolo, d])
		b.custom_minimum_size = Vector2(0, 100)
		b.alignment = HORIZONTAL_ALIGNMENT_LEFT
		b.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		b.add_theme_font_size_override("font_size", 30)
		for stav in ["normal", "hover", "pressed", "focus"]:
			b.add_theme_stylebox_override(stav, _ramecek(
				BARVA_LISTEK if stav != "hover" else BARVA_LISTEK.lightened(0.3),
				BARVA_VYBER if stav == "hover" else BARVA_OBRYS, 3, 10))
		for stav in ["font_color", "font_hover_color", "font_pressed_color", "font_focus_color"]:
			b.add_theme_color_override(stav, BARVA_TEXT)
		b.pressed.connect(_odpoved.bind(d))
		_odpovedi.add_child(b)
	_prekresli_znacky()
	visible = true


## Značky kol: hotová petrolejová (výhra) nebo rezavá (prohra), právě hrané žlutý rámeček
func _prekresli_znacky() -> void:
	for i in _znacky.size():
		var hotove: bool = i < kolo - 1
		var vyhra: bool = hotove and i < _vysledky.size() and _vysledky[i] != "slaba"
		var vypln := BARVA_PAPIR.darkened(0.08)
		if hotove:
			vypln = BARVA_PETROLEJ if vyhra else BARVA_REZ
		var aktualni: bool = i == kolo - 1
		_znacky[i].add_theme_stylebox_override("panel", _ramecek(
			vypln, BARVA_VYBER if aktualni else BARVA_OBRYS, 4 if aktualni else 3, 17))



## Odpověď Rudy: replika a reakce starosty, pak další kolo nebo vyhodnocení (prototyp: vyhodnot)
func _odpoved(druh: String) -> void:
	visible = false
	_vysledky.append(druh)
	Zvuk.efekt("spatne" if druh == "slaba" else "spravne")
	await C.player.say("ch1_m03_k%d_%s" % [kolo, druh])
	await C.Starosta.say("ch1_m03_k%d_%s_reakce" % [kolo, druh])
	if druh != "slaba":
		vyhrano += 1
	if druh == "rychla":
		rychle += 1
	if kolo < KOL:
		kolo += 1
		await C.Starosta.say("ch1_m03_k%d_namitka" % kolo)
		_ukaz_kolo()
		return
	var stav = R.Pracovna.state
	if vyhrano >= 3:
		Globals.c1_slib_vseho = rychle
		if rychle >= 3:
			# R1.1 „slíbit všechno“: starosta přidá fontánu
			await C.Starosta.say("ch1_starosta_slib_1")
			await C.player.say("ch1_starosta_slib_ruda")
		else:
			await C.Starosta.say("ch1_starosta_podpis_1")
			await C.Starosta.say("ch1_starosta_podpis_2")
			await C.player.say("ch1_starosta_podpis_ruda")
		await I.Podpis.add()
	else:
		await C.Starosta.say("ch1_starosta_prohra_1")
		await C.player.say("ch1_starosta_prohra_ruda")
		stav.starosta_prohra = true
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


func _ramecek(vypln: Color, obrys: Color, sirka: int, zaobleni: int) -> StyleBox:
	# Malované podklady společné pro minihry a obrazovky (D89)
	return Styl.podle_barvy(vypln, obrys, sirka, zaobleni)


#endregion
