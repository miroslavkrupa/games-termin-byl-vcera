# @popochiu-docs-ignore-class
@tool
extends PopochiuDialog
# Rozhovor s archivářem Lumírem. Jeden dialog pro obě fáze z prototypu (lumir_stop a lumir):
# dokud Lumír Rudu nepustil (P1.4), nabízí jen číslo projektu; po vstupu témata archivu.
# Volby se zobrazují podle stavu archivu (R.Archiv.state), volby „jednou“ po použití zmizí.


#region Virtual ####################################################################################
func _on_start() -> void:
	var stav = R.Archiv.state
	if not stav.archiv_vstup:
		# Zastavení u vchodu: celý úvod jen poprvé, pak jen „Číslo projektu.“
		if stav.lumir_zastavil:
			await C.Lumir.say("ch1_lumir_stop_1")
		else:
			stav.lumir_zastavil = true
			await C.Lumir.say("ch1_lumir_stop_1")
			await C.player.say("ch1_lumir_stop_ruda")
			await C.Lumir.say("ch1_lumir_stop_2")
	elif not stav.lumir_uvital:
		stav.lumir_uvital = true
		await C.Lumir.say("ch1_lumir_001")
	else:
		await E.get_tree().process_frame
	if _nastav_volby():
		# Nic nového: Lumír to řekne a rozhovor skončí. Zavřít až odloženě, protože _start()
		# teprve po návratu z _on_start() začne čekat na konec dialogu.
		await C.Lumir.say("ch1_lumir_vse")
		stop.call_deferred()


func _option_selected(_opt: PopochiuDialogOption) -> void:
	# Každá volba má vlastní funkci _on_option_<id>
	pass


# --- před vstupem (P1.4) ---
func _on_option_cislo(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Lumir.say("ch1_lumir_cislo_1")
	await C.Lumir.say("ch1_lumir_cislo_2")
	R.Archiv.state.archiv_vstup = true
	# Hned navazuje uvítání (prototyp: '#lumir')
	R.Archiv.state.lumir_uvital = true
	await C.Lumir.say("ch1_lumir_001")
	await _po_volbe()


func _on_option_vymyslet(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Lumir.say("ch1_lumir_spatne_cislo")
	await _po_volbe()


# --- po vstupu ---
func _on_option_krabice(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Lumir.say("ch1_lumir_krabice_1")
	await C.Lumir.say("ch1_lumir_krabice_2")
	await C.player.say("ch1_lumir_krabice_ruda")
	await C.Lumir.say("ch1_lumir_krabice_3")
	await I.Tlacitko.add()
	await _po_volbe()


func _on_option_krabice_bez(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Lumir.say("ch1_lumir_krabice_bez")
	await _po_volbe()


func _on_option_kartoteka(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Lumir.say("ch1_lumir_kartoteka_1")
	await C.player.say("ch1_lumir_kartoteka_ruda")
	await C.Lumir.say("ch1_lumir_kartoteka_2")
	await _po_volbe()


func _on_option_karta(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Lumir.say("ch1_lumir_karta_1")
	R.Archiv.state.karta_pozadana = true
	await _po_volbe()


func _on_option_mapy(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Lumir.say("ch1_lumir_mapy")
	await _po_volbe()


func _on_option_regal(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Lumir.say("ch1_lumir_regal")
	await _po_volbe()


func _on_option_ty(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Lumir.say("ch1_lumir_002")
	await C.Lumir.say("ch1_lumir_hrdost_2")
	await _po_volbe()


func _on_option_konec(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Lumir.say("ch1_lumir_konec")
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

#region Private ####################################################################################
## Zobrazí volby podle stavu archivu a vrátí true, když po vstupu zbylo jen rozloučení
## (prototyp: `vycerpano`).
func _nastav_volby() -> bool:
	var stav = R.Archiv.state
	var vstup: bool = stav.archiv_vstup
	# Před vstupem: číslo projektu (jen když ho Ruda zná), nebo ho jednou zkusit vymyslet
	_ukaz("Cislo", not vstup and Globals.c1_cislo_projektu)
	_ukaz("Vymyslet", not vstup and not Globals.c1_cislo_projektu, true)
	# Po vstupu
	_ukaz("Krabice", vstup and stav.listky_ctene and not I.is_item_in_inventory("Tlacitko")
		and not Globals.tlacitko_zapojeno)
	_ukaz("KrabiceBez", vstup and not stav.listky_ctene, true)
	_ukaz("Kartoteka", vstup, true)
	_ukaz("Karta", vstup and (stav.listky_ctene or stav.pouceni_videl) and not stav.karta_pujcena)
	_ukaz("Mapy", vstup and not I.is_item_in_inventory("Mapa"), true)
	_ukaz("Regal", vstup, true)
	_ukaz("Ty", vstup, true)
	if vstup:
		var zbyva := 0
		for opt in options:
			if opt.visible and opt.id != "Konec":
				zbyva += 1
		return zbyva == 0
	return false


## Po volbě: když už není o čem mluvit, Lumír to řekne a rozhovor skončí
func _po_volbe() -> void:
	if _nastav_volby():
		await C.Lumir.say("ch1_lumir_vse")
		stop()


## Nastaví viditelnost volby; volba „jednou“ se po použití už nenabídne
func _ukaz(id: String, podminka: bool, jednou := false) -> void:
	var opt := get_option(id)
	opt.visible = podminka and not (jednou and opt.used)


#endregion
