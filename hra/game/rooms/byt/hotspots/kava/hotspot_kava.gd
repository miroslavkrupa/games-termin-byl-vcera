# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Hrnek kávy na stole (prototyp byt.kava): učí sebrat; po sebrání ze stolu zmizí


func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	await C.player.animuj_akci("zvednuti")
	await C.player.say("ch1_byt_kava_vzit")
	R.Byt.state.kava_vzata = true
	R.Byt.nastav_veci()
	await I.Kava.add()


func _on_right_click() -> void:
	await C.player.face_clicked()
	await C.player.say("predmet_kava_prohlednout")


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
