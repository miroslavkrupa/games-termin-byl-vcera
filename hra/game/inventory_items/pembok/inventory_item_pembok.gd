# @popochiu-docs-ignore-class
extends PopochiuInventoryItem

const Data := preload('inventory_item_pembok_state.gd')

var state: Data = load("res://game/inventory_items/pembok/inventory_item_pembok.tres")


#region Virtual ####################################################################################
# Called when the item is clicked in the inventory
func _on_click() -> void:
	# Pembok se nepoužívá na jiné věci: klepnutím se otevře a poradí (nápověda v kapitole).
	# V bytě (úvod) je kniha ještě v celofánu a mlčí; otevře se až na náměstí (prototyp).
	if R.current.script_name == "Byt" and not R.Namesti.state.pembok_otevren:
		await C.player.say("ch1_byt_kniha_mlci")
		return
	await napoveda()


# Called when the item is right-clicked in the inventory
func _on_right_click() -> void:
	await C.player.say("predmet_pembok_prohlednout")


# Called when the item is middle-clicked in the inventory
func _on_middle_click() -> void:
	# Replace the call to E.command_fallback() to implement your code.
	E.command_fallback()


# Called when the item is clicked while another inventory item is selected
func _on_item_used(_item: PopochiuInventoryItem) -> void:
	match _item:
		I.Karta:
			await kombinace_karta()
		_:
			E.command_fallback()


# Called when the item is added to the inventory
func _on_added_to_inventory() -> void:
	# Replace the call to `super()` to implement custom behavior.
	# Calling `super()` preserves default behavior as well.
	super()


# Called when the item is discarded from the inventory
func _on_discard() -> void:
	# Replace the call to `super()` to implement custom behavior.
	# Calling `super()` preserves default behavior as well.
	super()


#endregion


#region Public #####################################################################################

## Nápověda Prof. Pemboka podle stavu kapitoly 1 (definice hotového: každý puzzle má nápovědu).
## Jako v prototypu (kapitola1.js, `napovedy`): radí k prvnímu puzzlu v seznamu, jehož podmínka
## platí, a každé další zeptání na týž puzzle posune nápovědu o stupeň blíž k řešení.
func napoveda() -> void:
	var stav = R.Namesti.state
	if not stav.pembok_otevren:
		stav.pembok_otevren = true
		await _kniha().rekni("ch1_pembok_ukol")
		await C.player.say("ch1_pembok_ukol_ruda")
		await _kniha().rekni("ch1_pembok_ukol_2")
		await _kniha().rekni("ch1_pembok_001")
		_kniha().uklid()
		return
	for n in _napovedy():
		if not n.kdy.call():
			continue
		var i: int = state.stupne.get(n.id, 0)
		state.stupne[n.id] = i + 1
		var stupne: Array = n.stupne
		var klic = stupne[mini(i, stupne.size() - 1)]
		# Stupeň může být i funkce, která klíč vybere podle stavu (3. stupeň u starosty)
		await _kniha().rekni(klic.call() if klic is Callable else klic)
		break
	_kniha().uklid()


## Jedna rada mimo pořadí nápověd (např. před prvním soubojem se starostou, P1.8, nebo v M02);
## [param dosad] jsou hodnoty za %s v textu
func rada(klic: String, dosad: Variant = null) -> void:
	await _kniha().rekni(klic, dosad)
	_kniha().uklid()


## Karta poučení + Pembok ★ (matice předmětů)
func kombinace_karta() -> void:
	await _kniha().rekni("ch1_kombinace_karta_pembok")
	_kniha().uklid()


## Seznam nápověd v pořadí z prototypu: id, podmínka a stupně (klíče textů, nebo funkce vracející
## klíč).
func _napovedy() -> Array:
	var stav = R.Namesti.state
	var archiv = R.Archiv.state
	var pracovna = R.Pracovna.state
	var komise = R.Komise.state
	# „Papir“ je papír o Arše z M01 (I5)
	var ma := func(p: String) -> bool: return I.is_item_in_inventory(p)
	return [
		{id = "vratny", kdy = func(): return not stav.vratny_rekl_starosta,
			stupne = ["ch1_pembok_rada_vratny_1", "ch1_pembok_rada_vratny", "ch1_pembok_rada_vratny_3"]},
		{id = "bara", kdy = func(): return not Globals.c1_cislo_projektu and not stav.bara_mluvila,
			stupne = ["ch1_pembok_rada_bara", "ch1_pembok_rada_bara_2", "ch1_pembok_rada_bara_3"]},
		{id = "stanek", kdy = func(): return not Globals.c1_cislo_projektu and not stav.plakat_videl,
			stupne = ["ch1_pembok_rada_bara_prerusena", "ch1_pembok_rada_stanek", "ch1_pembok_rada_stanek"]},
		{id = "zmena", kdy = func(): return not Globals.c1_cislo_projektu and not ma.call("KavovePero"),
			stupne = ["ch1_pembok_rada_zmena_1", "ch1_pembok_rada_zmena_2", "ch1_pembok_rada_zmena_2"]},
		{id = "zmena_pero", kdy = func(): return not Globals.c1_cislo_projektu,
			stupne = ["ch1_pembok_rada_zmena_1", "ch1_pembok_rada_zmena_3", "ch1_pembok_rada_zmena_3"]},
		# Archiv (I2): vstup (P1.4), tlačítko (P1.6), zadání (P1.5), karta (P1.7)
		{id = "archiv", kdy = func(): return not archiv.archiv_vstup,
			stupne = ["ch1_pembok_rada_archiv_1", "ch1_pembok_rada_archiv_2", "ch1_pembok_rada_archiv"]},
		{id = "tlacitko", kdy = func(): return not Globals.tlacitko_zapojeno,
			stupne = ["ch1_pembok_rada_tlacitko_1", "ch1_pembok_rada_tlacitko_2", "ch1_pembok_rada_tlacitko_3"]},
		{id = "zadani", kdy = func(): return not ma.call("Zadani") and not ma.call("Papir"),
			stupne = ["ch1_pembok_rada_kartoteka_1", "ch1_pembok_rada_kartoteka_2", "ch1_pembok_rada_kartoteka_3"]},
		{id = "karta", kdy = func(): return archiv.karta_pozadana and not archiv.karta_pujcena,
			stupne = ["ch1_pembok_rada_karta_1", "ch1_pembok_rada_karta_2", "ch1_pembok_rada_zmena_2"]},
		# Starosta (I3): rada před prvním soubojem (P1.8), po prohře tři stupně k argumentům
		{id = "starosta_pred", kdy = func(): return not ma.call("Podpis") and not ma.call("Papir") and not pracovna.starosta_prohra,
			stupne = ["ch1_pembok_rada_starosta_pred"]},
		{id = "starosta", kdy = func(): return not ma.call("Podpis") and not ma.call("Papir"),
			stupne = ["ch1_pembok_rada_starosta_1", "ch1_pembok_rada_starosta_2", _rada_starosta_3]},
		# Komise (I5): papír o Arše (P1.11), fronta na frontu (P1.11)
		{id = "papir", kdy = func(): return not ma.call("Papir"),
			stupne = ["ch1_pembok_rada_papir_1", "ch1_pembok_rada_papir_2", "ch1_pembok_rada_papir_3"]},
		{id = "fronta", kdy = func(): return not komise.fronta_hotova,
			stupne = ["ch1_pembok_rada_fronta"]},
		# Babička (I4, P1.10): odhalená v M02, ale ještě nevyslechnutá ani neodmítnutá
		{id = "babicka", kdy = func(): return Globals.c1_babicka == "odhalena",
			stupne = ["ch1_pembok_rada_babicka_1", "ch1_pembok_rada_babicka_2", "ch1_pembok_rada_babicka_3"]},
		# Razítko (I5, P1.13): 2. stupeň podle toho, jestli Ruda má podušku, nebo ví o babičce
		{id = "razitko", kdy = func(): return not komise.razitko_hotovo,
			stupne = ["ch1_pembok_rada_razitko_1", _rada_razitko_2, "ch1_pembok_rada_razitko_3"]},
		{id = "nic", kdy = func(): return true, stupne = ["ch1_pembok_rada_nic"]},
	]


## 3. stupeň nápovědy k souboji (P1.8): konkrétně podle chybějící repliky
func _rada_starosta_3() -> String:
	if not I.is_item_in_inventory("Zadani"):
		return "ch1_pembok_rada_starosta_3_zadani"
	if not I.is_item_in_inventory("Karta"):
		return "ch1_pembok_rada_starosta_3_karta"
	return "ch1_pembok_rada_starosta_3_bara"


## 2. stupeň nápovědy k razítku (P1.13): poduška v inventáři, odhalená babička, nebo káva
func _rada_razitko_2() -> String:
	if I.is_item_in_inventory("Poduska"):
		return "ch1_pembok_rada_razitko_2_poduska"
	if Globals.c1_babicka == "spojenec" and not R.Chaloupka.state.poduska_vzata:
		return "ch1_pembok_rada_razitko_2_lavicka"
	if Globals.c1_babicka == "odhalena":
		return "ch1_pembok_rada_razitko_2_babicka"
	return "ch1_pembok_rada_razitko_2"


## Postava Pemboka; C.Pembok vrací jen postavu, která už v místnosti stojí
func _kniha() -> PopochiuCharacter:
	return C.get_character("Pembok")


#endregion
