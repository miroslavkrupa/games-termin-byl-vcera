# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Amplion městského rozhlasu na lampě (prototyp namesti.amplion, I6): v úvodu ohlásí kometu
# a Rudovo jmenování (room_namesti.gd, _pristani), jinak jen vtipy při prohlédnutí a použití.


func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_up()
	await C.player.say("ch1_amplion_pouzit")


func _on_right_click() -> void:
	await C.player.face_up()
	await C.player.say("ch1_amplion_prohlednout")


func _on_double_click() -> void:
	PopochiuUtils.e.command_fallback()


func _on_middle_click() -> void:
	PopochiuUtils.e.command_fallback()


func _on_item_used(_item: PopochiuInventoryItem) -> void:
	PopochiuUtils.e.command_fallback()


func _on_movement_started() -> void:
	pass


func _on_movement_ended() -> void:
	pass
