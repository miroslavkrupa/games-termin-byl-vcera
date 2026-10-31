# @popochiu-docs-ignore-class
extends PopochiuInventoryItem

const Data := preload('inventory_item_pembok_state.gd')

var state: Data = load("res://game/inventory_items/pembok/inventory_item_pembok.tres")


#region Virtual ####################################################################################
# Called when the item is clicked in the inventory
func _on_click() -> void:
	# Pembok se nepoužívá na jiné věci: klepnutím se otevře a poradí (nápověda v kapitole)
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
	# Replace the call to E.command_fallback() with your own logic.
	E.command_fallback()
	# Example: if a Key is used on this item, make the player say something.
#	if _item == I.Key:
#		await C.player.say("This item has no lock!")


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

## Nápověda Prof. Pemboka podle toho, kde hráč v kapitole 1 je (definice hotového: každý puzzle
## má nápovědu). U Pana Změny radí ve dvou stupních, od náznaku k řešení.
func napoveda() -> void:
	var stav = R.Namesti.state
	if not stav.pembok_otevren:
		stav.pembok_otevren = true
		await _kniha().rekni("ch1_pembok_ukol")
		await C.player.say("ch1_pembok_ukol_ruda")
		await _kniha().rekni("ch1_pembok_ukol_2")
		await _kniha().rekni("ch1_pembok_001")
	elif not stav.vratny_rekl_starosta:
		await _kniha().rekni("ch1_pembok_rada_vratny")
	elif Globals.c1_cislo_projektu:
		await _kniha().rekni("ch1_pembok_rada_archiv")
	elif not stav.bara_mluvila:
		await _kniha().rekni("ch1_pembok_rada_bara")
	elif not stav.plakat_videl:
		await _kniha().rekni("ch1_pembok_rada_stanek")
	elif I.is_item_in_inventory("KavovePero"):
		await _kniha().rekni("ch1_pembok_rada_zmena_3")
	elif stav.napoveda_zmena == 0:
		stav.napoveda_zmena = 1
		await _kniha().rekni("ch1_pembok_rada_zmena_1")
	else:
		await _kniha().rekni("ch1_pembok_rada_zmena_2")
	_kniha().uklid()


## Postava Pemboka; C.Pembok vrací jen postavu, která už v místnosti stojí
func _kniha() -> PopochiuCharacter:
	return C.get_character("Pembok")


#endregion
