# @popochiu-docs-ignore-class
@tool
extends PopochiuDialog
# Rozhovor s Předsedou Věčným (S5, P1.13). Jako v prototypu (kapitola1.js, dialog predseda):
# bez podpisu sponzora nezařadí ani do fronty; po vystáté frontě souhlasí s razítkem, ale poduška
# je „ve fázi 2“ (řešení: poduška od babičky, nebo káva). Když je poduška už mokrá od kávy (K12),
# razítko přijde hned po souhlasu a otevře se R1.4 (dialog Faze). Termín a „kdo rozhoduje“ dávají
# nesmyslné útržky pro M01.


#region Virtual ####################################################################################
func _on_start() -> void:
	var stav = R.Komise.state
	if not stav.predseda_uvital:
		stav.predseda_uvital = true
		await C.Predseda.say("ch1_predseda_uvod_1")
		if not _ma_podpis():
			await C.player.say("ch1_predseda_bez_podpisu_ruda")
			await C.Predseda.say("ch1_predseda_bez_podpisu")
	if stav.fronta_hotova and not stav.predseda_dalsi:
		stav.predseda_dalsi = true
		await C.Predseda.say("ch1_predseda_dalsi")
	await E.get_tree().process_frame
	if _nastav_volby():
		await C.Predseda.say("ch1_predseda_vse")
		stop.call_deferred()


func _option_selected(_opt: PopochiuDialogOption) -> void:
	# Každá volba má vlastní funkci _on_option_<id>
	pass


## „Mám návrh na Archu.“ Bez podpisu odmítnutí, s podpisem odložení „do příští fáze“
func _on_option_navrh(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	var stav = R.Komise.state
	if not _ma_podpis():
		stav.navrh_bez_podpisu = true
		await C.Predseda.say("ch1_predseda_bez_podpisu")
	else:
		stav.navrh_s_podpisem = true
		await C.Predseda.say("ch1_predseda_001")
		await C.player.say("ch1_predseda_navrh_ruda")
		await C.Predseda.say("ch1_predseda_navrh_2")
	await _po_volbe()


func _on_option_termin(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Predseda.say("ch1_predseda_termin")
	R.Komise.state.utrzek_termin_nesmysl = true
	await _po_volbe()


func _on_option_kdo(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Predseda.say("ch1_predseda_kdo")
	R.Komise.state.utrzek_kdo_nesmysl = true
	await _po_volbe()


## „Potřebuju razítko.“ (P1.13): bez papíru nic, bez fronty Pembok poradí, pak souhlas
func _on_option_razitko(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	var stav = R.Komise.state
	if not I.is_item_in_inventory("Papir"):
		await C.Predseda.say("ch1_predseda_razitko_bez_papiru")
	elif not stav.fronta_hotova:
		await I.Pembok.rada("ch1_pembok_rada_fronta")
	elif stav.predseda_souhlas:
		await C.Predseda.say("ch1_predseda_razitko_1")
	else:
		await C.Predseda.say("ch1_predseda_razitko_1")
		await C.player.say("ch1_predseda_razitko_ruda")
		await C.Predseda.say("ch1_predseda_razitko_2")
		stav.predseda_souhlas = true
		if stav.poduska_mokra:
			# Káva už na podušce je (K12): hnědé razítko hned a R1.4
			await R.Komise.razitko_kavou()
			return
	await _po_volbe()


func _on_option_podpis(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Predseda.say("ch1_predseda_podpis")
	await _po_volbe()


func _on_option_konec(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Predseda.say("ch1_predseda_konec")
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
func _ma_podpis() -> bool:
	return I.is_item_in_inventory("Podpis") or I.is_item_in_inventory("Papir")


## Nastaví viditelnost voleb podle stavu; vrací true, když zbývá jen rozloučení (vyčerpáno)
func _nastav_volby() -> bool:
	var stav = R.Komise.state
	var podpis := _ma_podpis()
	# Prototyp má „Mám návrh“ jako dvě volby „jednou“: bez podpisu a s podpisem
	get_option("Navrh").visible = (not podpis and not stav.navrh_bez_podpisu) \
		or (podpis and not stav.navrh_s_podpisem)
	_ukaz("Termin", true, true)
	_ukaz("Kdo", true, true)
	_ukaz("Razitko", not stav.razitko_hotovo)
	_ukaz("Podpis", stav.predseda_souhlas and not stav.razitko_hotovo, true)
	var zbyva := 0
	for opt in options:
		if opt.visible and opt.id != "Konec":
			zbyva += 1
	return zbyva == 0


## Po volbě: když už není o čem mluvit, Předseda to řekne a rozhovor skončí
func _po_volbe() -> void:
	if _nastav_volby():
		await C.Predseda.say("ch1_predseda_vse")
		stop()


## Nastaví viditelnost volby; volba „jednou“ se po použití už nenabídne
func _ukaz(id: String, podminka: bool, jednou := false) -> void:
	var opt := get_option(id)
	opt.visible = podminka and not (jednou and opt.used)


#endregion
