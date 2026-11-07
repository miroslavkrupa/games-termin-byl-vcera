# @popochiu-docs-ignore-class
extends PopochiuInventoryItem
# Razítková poduška od babičky Pozemkové (R1.2, jen spojenec): modrá, vlhká a funkční. Použije se
# na razítko Komise (P1.13, I5), kde se spotřebuje (c1_razitko = poduska).

const Data := preload('inventory_item_poduska_state.gd')

var state: Data = load("res://game/inventory_items/poduska/inventory_item_poduska.tres")


#region Virtual ####################################################################################
# Called when the item is clicked in the inventory
func _on_click() -> void:
	E.command_fallback()


# Called when the item is right-clicked in the inventory
func _on_right_click() -> void:
	await C.player.say("predmet_poduska_prohlednout")


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
