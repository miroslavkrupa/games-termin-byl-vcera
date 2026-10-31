@tool
extends "res://addons/popochiu/engine/interfaces/i_inventory.gd"

# classes ----
const PIIPropiska := preload("res://game/inventory_items/propiska/inventory_item_propiska.gd")
const PIIKava := preload("res://game/inventory_items/kava/inventory_item_kava.gd")
const PIIKavovePero := preload("res://game/inventory_items/kavove_pero/inventory_item_kavove_pero.gd")
const PIIDekret := preload("res://game/inventory_items/dekret/inventory_item_dekret.gd")
const PIIPembok := preload("res://game/inventory_items/pembok/inventory_item_pembok.gd")
const PIIPlakat := preload("res://game/inventory_items/plakat/inventory_item_plakat.gd")
const PIIPozadavek := preload("res://game/inventory_items/pozadavek/inventory_item_pozadavek.gd")
# ---- classes

# nodes ----
var Propiska: PIIPropiska : get = get_Propiska
var Kava: PIIKava : get = get_Kava
var KavovePero: PIIKavovePero : get = get_KavovePero
var Dekret: PIIDekret : get = get_Dekret
var Pembok: PIIPembok : get = get_Pembok
var Plakat: PIIPlakat : get = get_Plakat
var Pozadavek: PIIPozadavek : get = get_Pozadavek
# ---- nodes

# functions ----
func get_Propiska() -> PIIPropiska: return get_item_instance("Propiska")
func get_Kava() -> PIIKava: return get_item_instance("Kava")
func get_KavovePero() -> PIIKavovePero: return get_item_instance("KavovePero")
func get_Dekret() -> PIIDekret: return get_item_instance("Dekret")
func get_Pembok() -> PIIPembok: return get_item_instance("Pembok")
func get_Plakat() -> PIIPlakat: return get_item_instance("Plakat")
func get_Pozadavek() -> PIIPozadavek: return get_item_instance("Pozadavek")
# ---- functions

