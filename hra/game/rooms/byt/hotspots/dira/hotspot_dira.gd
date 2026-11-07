# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Díra ve zdi (prototyp byt.dira, P1.0): východ skluzem na suť na náměstí, jen jednou a jen
# s kávou, knihou a dekretem. Přistání a další úvod jsou v místnosti Namesti.


func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	if not I.is_item_in_inventory("Kava"):
		await C.player.say("ch1_byt_dira_bez_kavy")
		return
	if not I.is_item_in_inventory("Pembok"):
		await C.player.say("ch1_byt_dira_bez_knihy")
		return
	if not I.is_item_in_inventory("Dekret"):
		await C.player.say("ch1_byt_dira_bez_dekretu")
		return
	G.block()
	await C.player.say("ch1_byt_dira_pouzit")
	# Skluz: Ruda zmizí v díře („Jůůů…“) a místnost se přepne na náměstí
	var t := create_tween().set_parallel()
	t.tween_property(C.player, "position", C.player.position + Vector2(40, -150), 0.8)
	t.tween_property(C.player, "modulate:a", 0.0, 0.8)
	await C.player.say("ch1_byt_skluz")
	R.goto_room("Namesti")


func _on_right_click() -> void:
	await C.player.face_clicked()
	await C.player.say("ch1_byt_dira_prohlednout")


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
