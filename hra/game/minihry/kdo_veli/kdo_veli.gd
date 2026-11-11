# Kdo tu vlastně velí (M02, P1.9): překryvné okno s mřížkou vliv × zájem. Hráč rozmístí šest
# karet postav do čtyř polí: nahoru ty, kdo můžou Archu zastavit, doprava ty, komu na ní záleží.
# Pravidla a texty podle prototypu (kapitola1.js, minihra m02): babička se dá umístit jen
# s katastrální mapou nebo po přečtení kocourova obojku (jinak je to šedá karta „Někdo pod
# rampou?“), u starosty nezáleží na zájmu. Chybné pokusy: 1. a 2. obecně (Předseda uprostřed,
# chybějící babička), 3. a 4. Pembok ukáže kartu a osu, od 5. řekne, kam kartu dát. Bez babičky
# jde minihru dokončit (Pembok jednou upozorní), babička pak zůstane neodhalená. S babičkou
# nastaví c1_babicka = odhalena. Rozmístění a počet pokusů se pamatují v Globals, takže zavřené
# okno jde otevřít znovu. Ovládání klepnutím (myš i prst): klepnutí na kartu ji vybere, klepnutí
# do pole ji tam položí, klepnutí do zásobníku ji vrátí. Okno se při replikách schová a zase ukáže.
# Vytváří se celé v kódu (bez scény).
extends CanvasLayer

signal zavreno

## Karty v pořadí zásobníku a klíče jmen (Obyvatelé = vrátný, Lumír a ostatní)
const KARTY := ["starosta", "predseda", "babicka", "zmena", "bara", "obyvatele"]
const NAZVY := {
	"starosta": "postava_starosta",
	"predseda": "postava_predseda",
	"babicka": "postava_babicka",
	"zmena": "postava_pan_zmena",
	"bara": "postava_bara",
	"obyvatele": "ch1_m02_obyvatele",
}
## Správné umístění [může Archu zastavit, záleží mu na ní]; null = na téhle ose nezáleží
const SPRAVNE := {
	"starosta": [true, null],
	"predseda": [true, true],
	"babicka": [true, false],
	"zmena": [false, true],
	"bara": [false, true],
	"obyvatele": [false, true],
}
## Pořadí, v jakém se hledá první špatná karta (prototyp)
const KONTROLA := ["predseda", "starosta", "babicka", "zmena", "bara", "obyvatele"]
## Pole mřížky zleva nahoře po řádcích: [může zastavit, záleží mu]
const POLE := [[true, false], [true, true], [false, false], [false, true]]

# Paleta stylové bible: okr, rez, vybledlá petrolejová, tmavě hnědé obrysy, žlutý akcent
const Styl := preload("res://game/obrazovky/styl.gd")
const BARVA_PAPIR := Color("f3e4c2")
const BARVA_LISTEK := Color("fbf3dc")
const BARVA_POLE := Color("eddcb4")
const BARVA_OBRYS := Color("4a2e14")
const BARVA_TEXT := Color("3a2614")
const BARVA_VYBER := Color("e9b52a")
const BARVA_REZ := Color("c9743a")
const BARVA_PETROLEJ := Color("3f7d76")

## Babička je známá (mapa nebo obojek): karta jde položit
var znama := false
var _vybrana := ""
var _okno: Control
## Čtyři pole mřížky a zásobník: kontejnery, do kterých se karty přesouvají
var _pole: Array = []
var _zasobnik: HFlowContainer
var _karty: Dictionary = {}


func _init() -> void:
	layer = 12


func _ready() -> void:
	znama = I.is_item_in_inventory("Mapa") or Globals.obojek_videl
	_postav()
	_prekresli()


#region Public #####################################################################################
## Ukáže okno a počká, až ho hráč zavře nebo rozmístění dokončí
func spust() -> void:
	G.block()
	await zavreno
	G.unblock()
	queue_free()


## Stůl pro žadatele podle prototypu (scéna komise, místo stul) bez M01: bez podpisu starosty
## a původního zadání se nic neskládá, jinak Pembok vyzve k M02 a otevře ji. Vrací true, když je
## M02 hotová (I5 pak naváže M01). Papír o Arše (M01) zatím není, proto se zkouší jen jménem.
static func u_stolu() -> bool:
	var papir: bool = I.is_item_in_inventory("Papir")
	if not I.is_item_in_inventory("Podpis") and not papir:
		await C.player.say("ch1_stul_bez_podpisu")
		return false
	if not I.is_item_in_inventory("Zadani") and not papir:
		await C.player.say("ch1_stul_bez_zadani")
		return false
	if not Globals.m02_hotovo:
		await I.Pembok.rada("ch1_pembok_m02_vyzva")
		await C.player.say("ch1_pembok_m02_ruda")
		await I.Pembok.rada("ch1_pembok_m02_2")
		var okno: CanvasLayer = load("res://game/minihry/kdo_veli/kdo_veli.gd").new()
		E.get_tree().root.add_child(okno)
		await okno.spust()
	return Globals.m02_hotovo


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
	_okno.custom_minimum_size = Vector2(1340, 0)
	stred.add_child(_okno)

	var okraj := MarginContainer.new()
	for strana in ["left", "right", "top", "bottom"]:
		okraj.add_theme_constant_override("margin_" + strana, 24)
	_okno.add_child(okraj)
	var sloupec := VBoxContainer.new()
	sloupec.add_theme_constant_override("separation", 10)
	okraj.add_child(sloupec)

	sloupec.add_child(_popisek(tr("ch1_m02_nazev"), 44, HORIZONTAL_ALIGNMENT_CENTER))
	sloupec.add_child(_popisek(tr("ch1_m02_navod"), 26, HORIZONTAL_ALIGNMENT_CENTER))

	# Mřížka se svislou osou vlevo (otočený popisek) a vodorovnou osou pod ní
	var radek := HBoxContainer.new()
	radek.add_theme_constant_override("separation", 8)
	sloupec.add_child(radek)
	var osa_svisla := Control.new()
	osa_svisla.custom_minimum_size = Vector2(44, 0)
	osa_svisla.size_flags_vertical = Control.SIZE_EXPAND_FILL
	radek.add_child(osa_svisla)
	var svisly := _popisek(tr("ch1_m02_osa_vliv") + "  ↑", 26, HORIZONTAL_ALIGNMENT_CENTER)
	svisly.autowrap_mode = TextServer.AUTOWRAP_OFF
	svisly.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	svisly.rotation = -PI / 2
	osa_svisla.add_child(svisly)
	osa_svisla.resized.connect(func() -> void:
		svisly.size = Vector2(osa_svisla.size.y, 44)
		svisly.position = Vector2(0, osa_svisla.size.y)
	)

	var pravy := VBoxContainer.new()
	pravy.add_theme_constant_override("separation", 6)
	pravy.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	radek.add_child(pravy)
	var mrizka := GridContainer.new()
	mrizka.columns = 2
	mrizka.add_theme_constant_override("h_separation", 8)
	mrizka.add_theme_constant_override("v_separation", 8)
	pravy.add_child(mrizka)
	for i in POLE.size():
		var pole := PanelContainer.new()
		pole.custom_minimum_size = Vector2(610, 150)
		pole.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		pole.add_theme_stylebox_override("panel", _ramecek(BARVA_POLE, BARVA_OBRYS, 3, 12))
		pole.mouse_filter = Control.MOUSE_FILTER_STOP
		pole.gui_input.connect(_vstup_pole.bind(i))
		mrizka.add_child(pole)
		var karty := HFlowContainer.new()
		karty.add_theme_constant_override("h_separation", 8)
		karty.add_theme_constant_override("v_separation", 8)
		karty.mouse_filter = Control.MOUSE_FILTER_IGNORE
		pole.add_child(karty)
		_pole.append(karty)
	pravy.add_child(_popisek(tr("ch1_m02_osa_zajem") + "  →", 26, HORIZONTAL_ALIGNMENT_RIGHT))

	# Zásobník karet (dole); klepnutí do něj vrátí vybranou kartu z mřížky
	var zasobnik_ram := PanelContainer.new()
	zasobnik_ram.custom_minimum_size = Vector2(0, 90)
	zasobnik_ram.add_theme_stylebox_override("panel", _ramecek(BARVA_PAPIR.darkened(0.06), BARVA_OBRYS, 3, 12))
	zasobnik_ram.mouse_filter = Control.MOUSE_FILTER_STOP
	zasobnik_ram.gui_input.connect(_vstup_pole.bind(-1))
	sloupec.add_child(zasobnik_ram)
	_zasobnik = HFlowContainer.new()
	_zasobnik.add_theme_constant_override("h_separation", 8)
	_zasobnik.add_theme_constant_override("v_separation", 8)
	_zasobnik.mouse_filter = Control.MOUSE_FILTER_IGNORE
	zasobnik_ram.add_child(_zasobnik)

	for id in KARTY:
		var b := Button.new()
		b.custom_minimum_size = Vector2(0, 62)
		b.add_theme_font_size_override("font_size", 28)
		if id == "babicka" and not znama:
			b.text = tr("ch1_m02_neznamy")
			b.disabled = true
		else:
			b.text = tr(NAZVY[id])
			b.pressed.connect(_na_kartu.bind(id))
		_karty[id] = b
		_zasobnik.add_child(b)

	var tlacitka := HBoxContainer.new()
	tlacitka.add_theme_constant_override("separation", 16)
	tlacitka.alignment = BoxContainer.ALIGNMENT_END
	sloupec.add_child(tlacitka)
	tlacitka.add_child(_tlacitko(tr("ui_zavrit"), BARVA_REZ, _zavrit))
	tlacitka.add_child(_tlacitko(tr("ui_m02_hotovo"), BARVA_PETROLEJ, _vyhodnotit))


## Přesune karty do polí podle Globals.m02_umisteni a zvýrazní vybranou
func _prekresli() -> void:
	for id in KARTY:
		var b: Button = _karty[id]
		var cil: Control = _zasobnik
		var u = Globals.m02_umisteni.get(id)
		if u is Array and u.size() == 2:
			cil = _pole[POLE.find([u[0], u[1]])]
		if b.get_parent() != cil:
			b.get_parent().remove_child(b)
			cil.add_child(b)
		var vybrana: bool = id == _vybrana
		for stav in ["normal", "hover", "pressed", "focus", "disabled"]:
			b.add_theme_stylebox_override(stav, _ramecek(
				BARVA_PAPIR.darkened(0.08) if stav == "disabled" else (BARVA_LISTEK.lightened(0.3) if stav == "hover" else BARVA_LISTEK),
				BARVA_VYBER if vybrana else BARVA_OBRYS, 6 if vybrana else 3, 10))
		for stav in ["font_color", "font_hover_color", "font_pressed_color", "font_focus_color"]:
			b.add_theme_color_override(stav, BARVA_TEXT)
		b.add_theme_color_override("font_disabled_color", BARVA_TEXT.lightened(0.45))


## Klepnutí na kartu: vybere ji, nebo výběr zruší
func _na_kartu(id: String) -> void:
	_vybrana = "" if _vybrana == id else id
	_prekresli()


## Klepnutí do pole mřížky (i = 0–3) nebo do zásobníku (i = -1): položí tam vybranou kartu
func _vstup_pole(udalost: InputEvent, i: int) -> void:
	var klepnuti: bool = (udalost is InputEventMouseButton and udalost.pressed
		and udalost.button_index == MOUSE_BUTTON_LEFT) or (udalost is InputEventScreenTouch and udalost.pressed)
	if not klepnuti or _vybrana.is_empty():
		return
	if i < 0:
		Globals.m02_umisteni.erase(_vybrana)
	else:
		Globals.m02_umisteni[_vybrana] = POLE[i].duplicate()
	_vybrana = ""
	_prekresli()


## Které osy je karta špatně: 0 = může zastavit, 1 = záleží mu, -1 = sedí (prototyp: chyba)
func _chyba(id: String) -> int:
	var u = Globals.m02_umisteni.get(id)
	var ok: Array = SPRAVNE[id]
	if not (u is Array) or u[0] != ok[0]:
		return 0
	if ok[1] != null and u[1] != ok[1]:
		return 1
	return -1


## Odevzdání Pembokovi: první špatná karta určí radu podle počtu pokusů (prototyp: vyhodnot)
func _vyhodnotit() -> void:
	_vybrana = ""
	_prekresli()
	var spatne: Array = KONTROLA.filter(func(id: String) -> bool:
		return (id != "babicka" or znama) and _chyba(id) >= 0)
	if spatne.size() > 0:
		Zvuk.efekt("spatne")
		Globals.m02_pokusy += 1
		var id: String = spatne[0]
		var osa := _chyba(id)
		var pokusy: int = Globals.m02_pokusy
		var klic := "ch1_m02_spatne"
		if pokusy <= 2:
			if id == "predseda":
				klic = "ch1_m02_predseda_stred"
			elif id == "babicka" and not Globals.m02_umisteni.has("babicka"):
				klic = "ch1_m02_babicka_chybi"
			await _pembok(klic)
		elif pokusy <= 4:
			await _pembok("ch1_m02_rada_vliv" if osa == 0 else "ch1_m02_rada_zajem", [tr(NAZVY[id])])
		else:
			var ok: Array = SPRAVNE[id]
			if osa == 0:
				klic = "ch1_m02_rada_nahoru" if ok[0] else "ch1_m02_rada_dolu"
			else:
				klic = "ch1_m02_rada_doprava" if ok[1] else "ch1_m02_rada_doleva"
			await _pembok(klic, [tr(NAZVY[id])])
		return
	if not znama and not Globals.m02_babicka_upozorneni:
		# Bez mapy a obojku chybí karta pod rampou: Pembok jednou upozorní, pak to přijme
		Globals.m02_babicka_upozorneni = true
		await _pembok("ch1_m02_babicka_chybi")
		return
	visible = false
	Zvuk.efekt("spravne")
	await I.Pembok.rada("ch1_m02_hotovo")
	await C.player.say("ch1_m02_hotovo_ruda")
	await I.Pembok.rada("ch1_m02_hotovo_pembok")
	Globals.m02_hotovo = true
	if znama and Globals.c1_babicka.is_empty():
		Globals.c1_babicka = "odhalena"
	zavreno.emit()


## Pembokova replika: okno se schová, aby byla vidět, a pak zase ukáže
func _pembok(klic: String, dosad: Variant = null) -> void:
	visible = false
	await I.Pembok.rada(klic, dosad)
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


func _ramecek(vypln: Color, obrys: Color, sirka: int, zaobleni: int) -> StyleBox:
	# Malované podklady společné pro minihry a obrazovky (D89)
	return Styl.podle_barvy(vypln, obrys, sirka, zaobleni)


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
