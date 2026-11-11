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
	t.tween_method(_skok.bind(C.player.position, C.player.scale), 0.0, 1.0, 0.7) \
		.set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_OUT)
	t.tween_property(C.player, "modulate:a", 0.0, 0.3).set_delay(0.45)
	await C.player.say("ch1_byt_skluz")
	R.goto_room("Namesti")


# Skok do díry obloukem: nahoru a dopředu, postava se přitom zmenšuje a naklání (k = 0–1).
# Natočení a velikost vrátí náměstí při přistání.
func _skok(k: float, odkud: Vector2, meritko: Vector2) -> void:
	C.player.position = odkud + Vector2(60.0 * k, -230.0 * k + 110.0 * k * k)
	C.player.scale = meritko * lerpf(1.0, 0.6, k)
	C.player.rotation = 0.5 * k


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
