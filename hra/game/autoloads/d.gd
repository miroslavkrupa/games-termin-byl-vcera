@tool
extends "res://addons/popochiu/engine/interfaces/i_dialog.gd"

# classes ----
const PDPanZmena := preload("res://game/dialogs/pan_zmena/dialog_pan_zmena.gd")
const PDVratny := preload("res://game/dialogs/vratny/dialog_vratny.gd")
const PDBara := preload("res://game/dialogs/bara/dialog_bara.gd")
# ---- classes

# nodes ----
var PanZmena: PDPanZmena : get = get_PanZmena
var Vratny: PDVratny : get = get_Vratny
var Bara: PDBara : get = get_Bara
# ---- nodes

# functions ----
func get_PanZmena() -> PDPanZmena: return get_instance("PanZmena")
func get_Vratny() -> PDVratny: return get_instance("Vratny")
func get_Bara() -> PDBara: return get_instance("Bara")
# ---- functions

