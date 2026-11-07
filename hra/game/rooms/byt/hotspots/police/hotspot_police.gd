# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Police s jedinou knihou (prototyp byt.police): vzít knihu → Prof. Pembok (zatím mlčí)


func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	if R.Byt.state.kniha_vzata:
		await C.player.say("ch1_byt_police_prohlednout")
		return
	await C.player.animuj_akci("zvednuti")
	await C.player.say("ch1_byt_kniha_vzit")
	R.Byt.state.kniha_vzata = true
	R.Byt.nastav_veci()
	await I.Pembok.add()


func _on_right_click() -> void:
	await C.player.face_clicked()
	await C.player.say("ch1_byt_police_prohlednout")


func _on_item_used(_item: PopochiuInventoryItem) -> void:
	PopochiuUtils.e.command_fallback()


func _on_double_click() -> void:
	PopochiuUtils.e.command_fallback()


func _on_middle_click() -> void:
	PopochiuUtils.e.command_fallback()


func _on_movement_started() -> void:
	pass


func _on_movement_ended() -> void:
	pass
