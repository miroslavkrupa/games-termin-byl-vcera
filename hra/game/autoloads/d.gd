@tool
extends "res://addons/popochiu/engine/interfaces/i_dialog.gd"

# classes ----
const PDPanZmena := preload("res://game/dialogs/pan_zmena/dialog_pan_zmena.gd")
const PDVratny := preload("res://game/dialogs/vratny/dialog_vratny.gd")
const PDBara := preload("res://game/dialogs/bara/dialog_bara.gd")
const PDLumir := preload("res://game/dialogs/lumir/dialog_lumir.gd")
const PDStarosta := preload("res://game/dialogs/starosta/dialog_starosta.gd")
const PDVytah := preload("res://game/dialogs/vytah/dialog_vytah.gd")
const PDBabicka := preload("res://game/dialogs/babicka/dialog_babicka.gd")
const PDPredseda := preload("res://game/dialogs/predseda/dialog_predseda.gd")
const PDFaze := preload("res://game/dialogs/faze/dialog_faze.gd")
const PDFramework := preload("res://game/dialogs/framework/dialog_framework.gd")
const PDUsekLumir := preload("res://game/dialogs/usek_lumir/dialog_usek_lumir.gd")
const PDVeritel := preload("res://game/dialogs/veritel/dialog_veritel.gd")
# ---- classes

# nodes ----
var PanZmena: PDPanZmena : get = get_PanZmena
var Vratny: PDVratny : get = get_Vratny
var Bara: PDBara : get = get_Bara
var Lumir: PDLumir : get = get_Lumir
var Starosta: PDStarosta : get = get_Starosta
var Vytah: PDVytah : get = get_Vytah
var Babicka: PDBabicka : get = get_Babicka
var Predseda: PDPredseda : get = get_Predseda
var Faze: PDFaze : get = get_Faze
var Framework: PDFramework : get = get_Framework
var UsekLumir: PDUsekLumir : get = get_UsekLumir
var Veritel: PDVeritel : get = get_Veritel
# ---- nodes

# functions ----
func get_PanZmena() -> PDPanZmena: return get_instance("PanZmena")
func get_Vratny() -> PDVratny: return get_instance("Vratny")
func get_Bara() -> PDBara: return get_instance("Bara")
func get_Lumir() -> PDLumir: return get_instance("Lumir")
func get_Starosta() -> PDStarosta: return get_instance("Starosta")
func get_Vytah() -> PDVytah: return get_instance("Vytah")
func get_Babicka() -> PDBabicka: return get_instance("Babicka")
func get_Predseda() -> PDPredseda: return get_instance("Predseda")
func get_Faze() -> PDFaze: return get_instance("Faze")
func get_Framework() -> PDFramework: return get_instance("Framework")
func get_UsekLumir() -> PDUsekLumir: return get_instance("UsekLumir")
func get_Veritel() -> PDVeritel: return get_instance("Veritel")
# ---- functions

