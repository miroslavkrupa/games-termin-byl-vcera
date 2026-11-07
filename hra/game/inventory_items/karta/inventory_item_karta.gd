# @popochiu-docs-ignore-class
extends PopochiuInventoryItem
# Karta poučení (Most 1974) z Lumírovy krabičky Poučení (P1.7): replika do M03 (I3).

const Data := preload('inventory_item_karta_state.gd')

var state: Data = load("res://game/inventory_items/karta/inventory_item_karta.tres")


#region Virtual ####################################################################################
# Called when the item is clicked in the inventory
func _on_click() -> void:
	# Replace the call to E.command_fallback() to implement your code.
	E.command_fallback()


# Called when the item is right-clicked in the inventory
func _on_right_click() -> void:
	await C.player.say("predmet_karta_prohlednout")


# Called when the item is middle-clicked in the inventory
func _on_middle_click() -> void:
	# Replace the call to E.command_fallback() to implement your code.
	E.command_fallback()


# Called when the item is clicked while another inventory item is selected
func _on_item_used(_item: PopochiuInventoryItem) -> void:
	match _item:
		I.Pembok:
			# Karta poučení + Pembok ★ (matice předmětů)
			await I.Pembok.kombinace_karta()
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
