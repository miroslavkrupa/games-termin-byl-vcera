# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Zeď slávy (prototyp byt.zed, V01): čtrnáct diplomů; použití střídá tři repliky


const REPLIKY := ["ch1_byt_zed_pouzit_1", "ch1_byt_zed_pouzit_2", "ch1_byt_zed_pouzit_3"]


func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	var stav = R.Byt.state
	await C.player.say(REPLIKY[stav.zed_pouzita % REPLIKY.size()])
	stav.zed_pouzita += 1


func _on_right_click() -> void:
	await C.player.face_clicked()
	await C.player.say("ch1_byt_zed_prohlednout")


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
