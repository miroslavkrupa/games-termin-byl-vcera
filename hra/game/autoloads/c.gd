@tool
extends "res://addons/popochiu/engine/interfaces/i_character.gd"

# classes ----
const PCRuda := preload("res://game/characters/ruda/character_ruda.gd")
const PCPanZmena := preload("res://game/characters/pan_zmena/character_pan_zmena.gd")
const PCBara := preload("res://game/characters/bara/character_bara.gd")
const PCVratny := preload("res://game/characters/vratny/character_vratny.gd")
const PCPembok := preload("res://game/characters/pembok/character_pembok.gd")
# ---- classes

# nodes ----
var Ruda: PCRuda : get = get_Ruda
var PanZmena: PCPanZmena : get = get_PanZmena
var Bara: PCBara : get = get_Bara
var Vratny: PCVratny : get = get_Vratny
var Pembok: PCPembok : get = get_Pembok
# ---- nodes

# functions ----
func get_Ruda() -> PCRuda: return get_runtime_character("Ruda")
func get_PanZmena() -> PCPanZmena: return get_runtime_character("PanZmena")
func get_Bara() -> PCBara: return get_runtime_character("Bara")
func get_Vratny() -> PCVratny: return get_runtime_character("Vratny")
func get_Pembok() -> PCPembok: return get_runtime_character("Pembok")
# ---- functions

