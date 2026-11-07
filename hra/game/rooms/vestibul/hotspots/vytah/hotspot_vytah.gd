# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Výtah ve vestibulu: tlačítka pater nabízí dialog Vytah (jako v prototypu). Tlačítko „2“ z archivu
# na výtah ✔ (P1.6): zůstane v něm natrvalo, příznak Globals.tlacitko_zapojeno čtou vrátný, Lumír
# i Pembok. Prohlédnutí střídá dvě repliky (stopa: díra po dvojce).


#region Virtual ####################################################################################
# When the hotspot is clicked
func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	D.Vytah.start()


# When the hotspot is right clicked
func _on_right_click() -> void:
	await C.player.face_clicked()
	var stav = R.Vestibul.state
	await C.player.say("ch1_ruda_010" if stav.vytah_prohlednuti % 2 == 0 else "ch1_vytah_prohlednout_2")
	stav.vytah_prohlednuti += 1


# Called when the hotspot is double-clicked
func _on_double_click() -> void:
	PopochiuUtils.e.command_fallback()


# Called when the hotspot is middle clicked
func _on_middle_click() -> void:
	PopochiuUtils.e.command_fallback()


# Called when the hotspot is clicked and there is an inventory item selected
func _on_item_used(_item: PopochiuInventoryItem) -> void:
	match _item:
		I.Tlacitko:
			await C.player.walk_to_clicked()
			await C.player.face_clicked()
			await C.player.animuj_akci("pouziti")
			Globals.tlacitko_zapojeno = true
			R.Vestibul.nastav_tlacitka()
			await C.player.say("ch1_vytah_tlacitko")
			await C.player.say("ch1_vytah_tlacitko_2")
			await I.Tlacitko.remove()
		_:
			PopochiuUtils.e.command_fallback()


# Called when the hotspot starts moving
func _on_movement_started() -> void:
	pass


# Called when the hotspot stops moving
func _on_movement_ended() -> void:
	pass


#endregion
