# @popochiu-docs-ignore-class
extends PopochiuInventoryItem
# Podpis sponzora (S4, po vyhraném souboji M03). Spotřebuje se v M01 (I4). Text při prohlédnutí
# závisí na tom, jestli Ruda slíbil všechno (Globals.c1_slib_vseho >= 3, R1.1).

const Data := preload('inventory_item_podpis_state.gd')

var state: Data = load("res://game/inventory_items/podpis/inventory_item_podpis.tres")


#region Virtual ####################################################################################
# Called when the item is clicked in the inventory
func _on_click() -> void:
	E.command_fallback()


# Called when the item is right-clicked in the inventory
func _on_right_click() -> void:
	await C.player.say(
		"predmet_podpis_prohlednout_slib" if Globals.c1_slib_vseho >= 3 else "predmet_podpis_prohlednout"
	)


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
