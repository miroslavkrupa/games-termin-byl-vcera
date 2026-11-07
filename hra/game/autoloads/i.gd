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
const PIITlacitko := preload("res://game/inventory_items/tlacitko/inventory_item_tlacitko.gd")
const PIIZadani := preload("res://game/inventory_items/zadani/inventory_item_zadani.gd")
const PIIKarta := preload("res://game/inventory_items/karta/inventory_item_karta.gd")
const PIIMapa := preload("res://game/inventory_items/mapa/inventory_item_mapa.gd")
const PIIPodpis := preload("res://game/inventory_items/podpis/inventory_item_podpis.gd")
const PIIPoduska := preload("res://game/inventory_items/poduska/inventory_item_poduska.gd")
const PIIPapir := preload("res://game/inventory_items/papir/inventory_item_papir.gd")
const PIIKlic := preload("res://game/inventory_items/klic/inventory_item_klic.gd")
const PIIMetr := preload("res://game/inventory_items/metr/inventory_item_metr.gd")
const PIISeznam := preload("res://game/inventory_items/seznam/inventory_item_seznam.gd")
# ---- classes

# nodes ----
var Propiska: PIIPropiska : get = get_Propiska
var Kava: PIIKava : get = get_Kava
var KavovePero: PIIKavovePero : get = get_KavovePero
var Dekret: PIIDekret : get = get_Dekret
var Pembok: PIIPembok : get = get_Pembok
var Plakat: PIIPlakat : get = get_Plakat
var Pozadavek: PIIPozadavek : get = get_Pozadavek
var Tlacitko: PIITlacitko : get = get_Tlacitko
var Zadani: PIIZadani : get = get_Zadani
var Karta: PIIKarta : get = get_Karta
var Mapa: PIIMapa : get = get_Mapa
var Podpis: PIIPodpis : get = get_Podpis
var Poduska: PIIPoduska : get = get_Poduska
var Papir: PIIPapir : get = get_Papir
var Klic: PIIKlic : get = get_Klic
var Metr: PIIMetr : get = get_Metr
var Seznam: PIISeznam : get = get_Seznam
# ---- nodes

# functions ----
func get_Propiska() -> PIIPropiska: return get_item_instance("Propiska")
func get_Kava() -> PIIKava: return get_item_instance("Kava")
func get_KavovePero() -> PIIKavovePero: return get_item_instance("KavovePero")
func get_Dekret() -> PIIDekret: return get_item_instance("Dekret")
func get_Pembok() -> PIIPembok: return get_item_instance("Pembok")
func get_Plakat() -> PIIPlakat: return get_item_instance("Plakat")
func get_Pozadavek() -> PIIPozadavek: return get_item_instance("Pozadavek")
func get_Tlacitko() -> PIITlacitko: return get_item_instance("Tlacitko")
func get_Zadani() -> PIIZadani: return get_item_instance("Zadani")
func get_Karta() -> PIIKarta: return get_item_instance("Karta")
func get_Mapa() -> PIIMapa: return get_item_instance("Mapa")
func get_Podpis() -> PIIPodpis: return get_item_instance("Podpis")
func get_Poduska() -> PIIPoduska: return get_item_instance("Poduska")
func get_Papir() -> PIIPapir: return get_item_instance("Papir")
func get_Klic() -> PIIKlic: return get_item_instance("Klic")
func get_Metr() -> PIIMetr: return get_item_instance("Metr")
func get_Seznam() -> PIISeznam: return get_item_instance("Seznam")
# ---- functions

