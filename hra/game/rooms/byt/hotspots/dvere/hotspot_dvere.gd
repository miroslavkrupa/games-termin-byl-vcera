# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Dveře, za kterými buší věřitelé (prototyp byt.dvere): rozhovor přes dveře (dialog Veritel);
# s dekretem už jen „Tudy ne“ (chybný pokus P1.0)


func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	if I.is_item_in_inventory("Dekret"):
		await C.player.say("ch1_byt_dvere_pouzit")
		return
	D.Veritel.start()


func _on_right_click() -> void:
	await C.player.face_clicked()
	await C.player.say("ch1_byt_dvere_prohlednout")


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
