# @popochiu-docs-ignore-class
extends PopochiuInventoryItem
# Seznam pasažérů Archy z roku 1994 (skrytá přihrádka, P1.12): jen Komise a jejich rodiny. V Bářině inventáři (kapitola 4, D59).

const Data := preload('inventory_item_seznam_state.gd')

var state: Data = load("res://game/inventory_items/seznam/inventory_item_seznam.tres")


#region Virtual ####################################################################################
# Called when the item is clicked in the inventory
func _on_click() -> void:
	E.command_fallback()


# Called when the item is right-clicked in the inventory
func _on_right_click() -> void:
	await C.player.say("predmet_seznam_prohlednout")


# Called when the item is middle-clicked in the inventory
func _on_middle_click() -> void:
	E.command_fallback()


# Called when the item is clicked while another inventory item is selected
func _on_item_used(_item: PopochiuInventoryItem) -> void:
	E.command_fallback()


# Called when the item is added to the inventory
func _on_added_to_inventory() -> void:
	super()


# Called when the item is discarded from the inventory
func _on_discard() -> void:
	super()


#endregion
