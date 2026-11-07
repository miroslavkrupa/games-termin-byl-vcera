# @popochiu-docs-ignore-class
@tool
extends PopochiuDialog
# R1.4 „…a následné fáze“ (P1.13): po razítku Předseda vlídně připíše „a následné fáze“. Ruda
# odmítne (s odkazem na rozsah, pokud má na papíru Bářin útržek „co na Archu nepatří“), nebo
# přijme. Obojí končí předáním klíče od hangáru a koncem kapitoly 1 (prototyp KONEC_KAPITOLY,
# obrazovky/konec_kapitoly.gd). Rozhovor nejde zavřít bez volby, jako v prototypu.

const KonecKapitoly := preload("res://game/obrazovky/konec_kapitoly.gd")


#region Virtual ####################################################################################
func _on_start() -> void:
	var stav = R.Komise.state
	if not stav.faze_uvod:
		stav.faze_uvod = true
		await C.Predseda.say("ch1_predseda_faze_1")
		await C.Predseda.say("ch1_predseda_faze_2")
	else:
		await E.get_tree().process_frame
	get_option("OdmitnoutRozsah").visible = Globals.c1_mimo_rozsah


func _option_selected(_opt: PopochiuDialogOption) -> void:
	# Každá volba má vlastní funkci _on_option_<id>
	pass


func _on_option_odmitnout(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Predseda.say("ch1_predseda_odmitnuti")
	Globals.c1_faze2 = false
	await _konec()


func _on_option_odmitnout_rozsah(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Predseda.say("ch1_predseda_odmitnuti")
	Globals.c1_faze2 = false
	await _konec()


func _on_option_prijmout(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Predseda.say("ch1_predseda_prijeti")
	Globals.c1_faze2 = true
	await _konec()


# Return a Dictionary of custom data to save for this PopochiuDialog.
# The Dictionary must contain only JSON-supported types: bool, int, float, String.
func _on_save() -> Dictionary:
	return {}


# Called when the game is loaded.
# The `data` Dictionary should match the structure returned by `_on_save()`.
func _on_load(data: Dictionary) -> void:
	prints(data)


#endregion

#region Private ####################################################################################
## Klíč od hangáru a konec kapitoly (prototyp KONEC_KAPITOLY); zbytek sekvence vede
## KonecKapitoly, protože místnosti se při ní mění
func _konec() -> void:
	await C.Predseda.say("ch1_predseda_klic")
	await C.player.say("ch1_predseda_klic_ruda")
	await C.Predseda.say("ch1_predseda_klic_2")
	await I.Klic.add()
	stop()
	KonecKapitoly.spust()


#endregion
