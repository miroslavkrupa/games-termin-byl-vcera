# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Stůl pro žadatele (S5): tady se skládá jeden papír o Arše. Bez podpisu starosty a původního
# zadání nic; jinak nejdřív M02 Kdo tu vlastně velí (P1.9) a po ní M01 Jeden papír o Arše (P1.11).
# Pořadí a repliky podle prototypu (kapitola1.js, místo stul); logiku stolu má KdoVeli.u_stolu().

## Minihra M02 a logika stolu pro žadatele
const KdoVeli := preload("res://game/minihry/kdo_veli/kdo_veli.gd")


#region Virtual ####################################################################################
# When the hotspot is clicked
func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	if not await KdoVeli.u_stolu():
		return
	if I.is_item_in_inventory("Papir"):
		await C.player.say("ch1_stul_hotovo")
	else:
		await R.Komise.otevri_papir()


# When the hotspot is right clicked
func _on_right_click() -> void:
	await C.player.face_clicked()
	await C.player.say("ch1_stul_prohlednout")


# Called when the hotspot is double-clicked
func _on_double_click() -> void:
	PopochiuUtils.e.command_fallback()


# Called when the hotspot is middle clicked
func _on_middle_click() -> void:
	PopochiuUtils.e.command_fallback()


# Called when the hotspot is clicked and there is an inventory item selected
func _on_item_used(_item: PopochiuInventoryItem) -> void:
	PopochiuUtils.e.command_fallback()


# Called when the hotspot starts moving
func _on_movement_started() -> void:
	pass


# Called when the hotspot stops moving
func _on_movement_ended() -> void:
	pass


#endregion
