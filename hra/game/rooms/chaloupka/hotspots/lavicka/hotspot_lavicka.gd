# @popochiu-docs-ignore-class
@tool
extends PopochiuHotspot
# Lavička u dveří chaloupky: natřená, což tohle město nezná. Sednout si jde, až je babička
# spojenkyně (R1.2): nabídne buchtu (gag z návrhu kapitoly 1).


#region Virtual ####################################################################################
# When the hotspot is clicked
func _on_click() -> void:
	await C.player.walk_to_clicked()
	await C.player.face_clicked()
	if Globals.c1_babicka == "spojenec":
		await C.Babicka.say("ch1_lavicka_buchta_1")
		await C.player.say("ch1_lavicka_buchta_ruda")
	else:
		await C.player.say("ch1_lavicka_pouzit")


# When the hotspot is right clicked
func _on_right_click() -> void:
	await C.player.face_clicked()
	await C.player.say("ch1_lavicka_prohlednout")


# Called when the hotspot is double-clicked
func _on_double_click() -> void:
	PopochiuUtils.e.command_fallback()


# Called when the hotspot is middle clicked
func _on_middle_click() -> void:
	PopochiuUtils.e.command_fallback()


# Called when the hotspot is clicked and there is an inventory item selected
func _on_item_used(_item: PopochiuInventoryItem) -> void:
	PopochiuUtils.e.command_fallback()


#endregion
