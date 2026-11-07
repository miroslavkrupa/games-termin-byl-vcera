# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Hluboký regál se skrytou přihrádkou (P1.12): Ruda si ničeho nevšimne. V úseku za Báru (I5) si
# Bára všimne, že je zvenku delší než zevnitř (dvě prohlédnutí jako nápověda), odhad odmítne a
# metrem najde přihrádku se seznamem pasažérů (prototyp: bara_prohlednout, bara_pouzit, bara_na).


#region Virtual ####################################################################################
# When the hotspot is clicked
func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	if R.Archiv.hraje_bara():
		await C.player.say("ch1_usek_regal_odhad")
		return
	E.command_fallback()


# When the hotspot is right clicked
func _on_right_click() -> void:
	await C.player.face_clicked()
	if R.Archiv.hraje_bara():
		# Prototyp: stridat, dokola false (první věta jednou, pak už jen druhá)
		var stav = R.Archiv.state
		if stav.regal_bara_prohlednuto == 0:
			await C.player.say("ch1_usek_regal_1")
		else:
			await C.player.say("ch1_usek_regal_2")
		stav.regal_bara_prohlednuto += 1
		return
	await C.player.say("ch1_hluboky_regal_prohlednout")


# Called when the hotspot is double-clicked
func _on_double_click() -> void:
	PopochiuUtils.e.command_fallback()


# Called when the hotspot is middle clicked
func _on_middle_click() -> void:
	PopochiuUtils.e.command_fallback()


# Called when the hotspot is clicked and there is an inventory item selected
func _on_item_used(_item: PopochiuInventoryItem) -> void:
	if R.Archiv.hraje_bara() and _item == I.Metr:
		await C.player.walk_to_clicked()
		await C.player.face_clicked()
		await C.player.say("ch1_usek_regal_mereni_1")
		await C.player.say("ch1_usek_regal_mereni_2")
		await C.player.say("ch1_usek_seznam_1")
		await C.player.say("ch1_usek_seznam_2")
		await C.player.say("ch1_usek_seznam_3")
		await I.Seznam.add()
		Globals.c1_seznam_pasazeru = true
		await R.Archiv.konec_useku_bary()
		return
	PopochiuUtils.e.command_fallback()


# Called when the hotspot starts moving
func _on_movement_started() -> void:
	pass


# Called when the hotspot stops moving
func _on_movement_ended() -> void:
	pass


#endregion
