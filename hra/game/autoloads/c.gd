@tool
extends "res://addons/popochiu/engine/interfaces/i_character.gd"

# classes ----
const PCRuda := preload("res://game/characters/ruda/character_ruda.gd")
const PCPanZmena := preload("res://game/characters/pan_zmena/character_pan_zmena.gd")
const PCBara := preload("res://game/characters/bara/character_bara.gd")
const PCVratny := preload("res://game/characters/vratny/character_vratny.gd")
const PCPembok := preload("res://game/characters/pembok/character_pembok.gd")
const PCLumir := preload("res://game/characters/lumir/character_lumir.gd")
const PCStarosta := preload("res://game/characters/starosta/character_starosta.gd")
const PCBabicka := preload("res://game/characters/babicka/character_babicka.gd")
const PCKocour := preload("res://game/characters/kocour/character_kocour.gd")
const PCPredseda := preload("res://game/characters/predseda/character_predseda.gd")
const PCFramework := preload("res://game/characters/framework/character_framework.gd")
const PCRozhlas := preload("res://game/characters/rozhlas/character_rozhlas.gd")
const PCVeritel := preload("res://game/characters/veritel/character_veritel.gd")
# ---- classes

# nodes ----
var Ruda: PCRuda : get = get_Ruda
var PanZmena: PCPanZmena : get = get_PanZmena
var Bara: PCBara : get = get_Bara
var Vratny: PCVratny : get = get_Vratny
var Pembok: PCPembok : get = get_Pembok
var Lumir: PCLumir : get = get_Lumir
var Starosta: PCStarosta : get = get_Starosta
var Babicka: PCBabicka : get = get_Babicka
var Kocour: PCKocour : get = get_Kocour
var Predseda: PCPredseda : get = get_Predseda
var Framework: PCFramework : get = get_Framework
var Rozhlas: PCRozhlas : get = get_Rozhlas
var Veritel: PCVeritel : get = get_Veritel
# ---- nodes

# functions ----
func get_Ruda() -> PCRuda: return get_runtime_character("Ruda")
func get_PanZmena() -> PCPanZmena: return get_runtime_character("PanZmena")
func get_Bara() -> PCBara: return get_runtime_character("Bara")
func get_Vratny() -> PCVratny: return get_runtime_character("Vratny")
func get_Pembok() -> PCPembok: return get_runtime_character("Pembok")
func get_Lumir() -> PCLumir: return get_runtime_character("Lumir")
func get_Starosta() -> PCStarosta: return get_runtime_character("Starosta")
func get_Babicka() -> PCBabicka: return get_runtime_character("Babicka")
func get_Kocour() -> PCKocour: return get_runtime_character("Kocour")
func get_Predseda() -> PCPredseda: return get_runtime_character("Predseda")
func get_Framework() -> PCFramework: return get_runtime_character("Framework")
func get_Rozhlas() -> PCRozhlas: return get_runtime_character("Rozhlas")
func get_Veritel() -> PCVeritel: return get_runtime_character("Veritel")
# ---- functions

