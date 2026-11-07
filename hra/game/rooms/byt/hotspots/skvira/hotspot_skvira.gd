# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Škvíra pode dveřmi (prototyp byt.skvira): jen k prohlédnutí, použití dá výchozí reakci


func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	PopochiuUtils.e.command_fallback()


func _on_right_click() -> void:
	await C.player.face_clicked()
	await C.player.say("ch1_byt_skvira_prohlednout")


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
