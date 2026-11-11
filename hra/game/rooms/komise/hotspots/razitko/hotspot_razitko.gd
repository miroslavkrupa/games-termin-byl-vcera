# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Razítko a poduška (S5, P1.13): poduška je vyschlá („inkoust ve fázi 2“). Po Předsedově souhlasu
# ji obarví babiččina poduška (modré razítko ✔) nebo káva (hnědé razítko ✔, K12: kávu jde nalít
# i dřív, razítko pak přijde hned po souhlasu). Kávové pero ★. Podle prototypu (místo razitko).


#region Virtual ####################################################################################
# When the hotspot is clicked
func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	await C.player.say("ch1_razitko_pouzit")


# When the hotspot is right clicked
func _on_right_click() -> void:
	await C.player.face_clicked()
	var stav = R.Komise.state
	if stav.razitko_prohlednuto:
		# Druhé a další prohlédnutí: nápad (prototyp: stridat, dokola false)
		await C.player.say("ch1_razitko_napad")
	else:
		stav.razitko_prohlednuto = true
		await C.player.say("ch1_razitko_prohlednout")


# Called when the hotspot is double-clicked
func _on_double_click() -> void:
	PopochiuUtils.e.command_fallback()


# Called when the hotspot is middle clicked
func _on_middle_click() -> void:
	PopochiuUtils.e.command_fallback()


# Called when the hotspot is clicked and there is an inventory item selected
func _on_item_used(_item: PopochiuInventoryItem) -> void:
	var stav = R.Komise.state
	match _item:
		I.Kava:
			await _dojit()
			if stav.razitko_hotovo:
				await C.player.say("ch1_razitko_pouzit")
			elif stav.predseda_souhlas:
				await C.player.animuj_akci("pouziti")
				Zvuk.efekt("razitko")
				await C.player.say("ch1_razitko_kava_1")
				await R.Komise.razitko_kavou()
			else:
				await C.player.animuj_akci("pouziti")
				Zvuk.efekt("razitko")
				await C.player.say("ch1_razitko_kava_brzy")
				stav.poduska_mokra = true
		I.Poduska:
			await _dojit()
			if stav.predseda_souhlas and not stav.razitko_hotovo:
				await C.player.animuj_akci("pouziti")
				await R.Komise.razitko_poduskou()
			else:
				await C.player.say("ch1_razitko_pouzit")
		I.KavovePero:
			await _dojit()
			await C.player.say("ch1_razitko_kavove_pero")
		_:
			PopochiuUtils.e.command_fallback()


# Called when the hotspot starts moving
func _on_movement_started() -> void:
	pass


# Called when the hotspot stops moving
func _on_movement_ended() -> void:
	pass


#endregion

#region Private ####################################################################################
## Ruda dojde k razítku a otočí se k němu
func _dojit() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()


#endregion
