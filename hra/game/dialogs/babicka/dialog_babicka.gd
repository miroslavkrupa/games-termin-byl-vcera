# @popochiu-docs-ignore-class
@tool
extends PopochiuDialog
# Rozhovor s babičkou Pozemkovou (S6, P1.10). Témata dům, prádlo a počasí jsou jednorázová;
# téma pozemek se nabízí jen s mapou nebo po přečtení kocourova obojku a vede do rozhovoru R1.2
# (nabídka přímo ve skriptu: vyslechnout / spěchat / slíbit). Vyslechnutí dá podušku a spojenkyni,
# spěch nebo slib zavřou okno do konce kapitoly. Jako v prototypu (kapitola1.js, dialogy babicka
# a babicka_r12).


#region Virtual ####################################################################################
func _on_start() -> void:
	var stav = C.Babicka.state
	if not stav.uvitala:
		stav.uvitala = true
		await C.Babicka.say("ch1_babicka_uvod")
	else:
		await E.get_tree().process_frame
	if _nastav_volby():
		# Nic nového: babička to řekne a rozhovor skončí (prototyp: vycerpano)
		await C.Babicka.say("ch1_babicka_vse")
		stop.call_deferred()


func _option_selected(_opt: PopochiuDialogOption) -> void:
	# Každá volba má vlastní funkci _on_option_<id>
	pass


func _on_option_dum(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Babicka.say("ch1_babicka_001")
	await _po_volbe()


func _on_option_pradlo(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Babicka.say("ch1_babicka_pradlo")
	await _po_volbe()


func _on_option_pocasi(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Babicka.say("ch1_babicka_pocasi")
	await _po_volbe()


func _on_option_pozemek(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await pozemek()
	if Globals.c1_babicka == "odmitnuta":
		stop()
	else:
		await _po_volbe()


func _on_option_kocour(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Babicka.say("ch1_babicka_kocour")
	await _po_volbe()


func _on_option_konec(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Babicka.say("ch1_babicka_konec")
	stop()


# Return a Dictionary of custom data to save for this PopochiuDialog.
# The Dictionary must contain only JSON-supported types: bool, int, float, String.
func _on_save() -> Dictionary:
	return {}


# Called when the game is loaded.
# The `data` Dictionary should match the structure returned by `_on_save()`.
func _on_load(data: Dictionary) -> void:
	prints(data)


#endregion

#region Public #####################################################################################
## Téma pozemek pod rampou a navazující rozhovor R1.2. Volá se z volby i při použití mapy
## na babičku (skript postavy), proto je veřejné.
func pozemek() -> void:
	await C.Babicka.say("ch1_babicka_pozemek_1")
	await C.Babicka.say("ch1_babicka_pozemek_2")
	await C.Babicka.say("ch1_babicka_pozemek_3")
	await r12()


## R1.2: vyslechnout (volba v závorkách se neříká) → poduška a c1_babicka = spojenec;
## spěchat nebo slíbit → babička zavře okno, c1_babicka = odmitnuta.
func r12() -> void:
	var volba: PopochiuDialogOption = await D.show_inline_dialog([
		"ch1_babicka_volba_vyslechnout", "ch1_babicka_volba_spechat", "ch1_babicka_volba_slib"
	])
	match volba.id:
		"0":
			await C.Babicka.say("ch1_babicka_vyslechnout_1")
			await C.Babicka.say("ch1_babicka_vyslechnout_2")
			await C.player.say("ch1_babicka_vyslechnout_ruda")
			await C.Babicka.say("ch1_babicka_vyslechnout_3")
			await C.Babicka.say("ch1_babicka_poduska_1")
			await C.Babicka.say("ch1_babicka_poduska_2")
			Globals.c1_babicka = "spojenec"
			await I.Poduska.add()
		"1":
			await C.player.say("ch1_babicka_volba_spechat")
			await C.Babicka.say("ch1_babicka_spechat")
			Globals.c1_babicka = "odmitnuta"
			await C.player.say("ch1_babicka_zavreno")
		_:
			await C.player.say("ch1_babicka_volba_slib")
			await C.Babicka.say("ch1_babicka_slib")
			Globals.c1_babicka = "odmitnuta"
			await C.player.say("ch1_babicka_zavreno")


#endregion

#region Private ####################################################################################
## Zobrazí volby podle stavu a vrátí true, když zbylo jen rozloučení (prototyp: vycerpano)
func _nastav_volby() -> bool:
	_ukaz("Dum", true, true)
	_ukaz("Pradlo", true, true)
	_ukaz("Pocasi", true, true)
	_ukaz("Pozemek", (I.is_item_in_inventory("Mapa") or Globals.obojek_videl)
		and Globals.c1_babicka != "spojenec")
	_ukaz("Kocour", Globals.c1_babicka == "spojenec", true)
	var zbyva := 0
	for opt in options:
		if opt.visible and opt.id != "Konec":
			zbyva += 1
	return zbyva == 0


## Po volbě: když už není o čem mluvit, babička to řekne a rozhovor skončí
func _po_volbe() -> void:
	if _nastav_volby():
		await C.Babicka.say("ch1_babicka_vse")
		stop()


## Nastaví viditelnost volby; volba „jednou“ se po použití už nenabídne
func _ukaz(id: String, podminka: bool, jednou := false) -> void:
	var opt := get_option(id)
	opt.visible = podminka and not (jednou and opt.used)


#endregion
