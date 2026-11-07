# @popochiu-docs-ignore-class
@tool
extends PopochiuDialog
# Rozhovor s Ing. Frameworkem (S5): fronta 2.0, kufr krabic, vizitka. Každá volba jednou; když
# zbude jen rozloučení, Framework řekne, že víc řekne jen za poplatek. Podle prototypu
# (kapitola1.js, dialog framework).


#region Virtual ####################################################################################
func _on_start() -> void:
	var stav = R.Komise.state
	if not stav.framework_uvital:
		stav.framework_uvital = true
		await C.Framework.say("ch1_framework_uvod")
	else:
		await E.get_tree().process_frame
	if _nastav_volby():
		await C.Framework.say("ch1_framework_vse")
		stop.call_deferred()


func _option_selected(_opt: PopochiuDialogOption) -> void:
	# Každá volba má vlastní funkci _on_option_<id>
	pass


func _on_option_fronta(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Framework.say("ch1_framework_001")
	await C.player.say("ch1_ruda_091")
	await C.Framework.say("ch1_framework_002")
	await _po_volbe()


func _on_option_kufr(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Framework.say("ch1_framework_kufr_1")
	await C.player.say("ch1_framework_kufr_ruda")
	await C.Framework.say("ch1_framework_kufr_2")
	await _po_volbe()


func _on_option_vizitka(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Framework.say("ch1_framework_vizitka")
	await C.player.say("ch1_framework_vizitka_ruda")
	await C.Framework.say("ch1_framework_vizitka_2")
	await _po_volbe()


func _on_option_konec(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Framework.say("ch1_framework_konec")
	stop()


# Return a Dictionary of custom data to save for this PopochiuDialog.
# The Dictionary must contain only JSON-supported types: bool, int, float, String.
func _on_save() -> Dictionary:
	return {}


# Called when the game is loaded.
# The `data` Dictionary should match the structure returned by `_on_save()`.
func _on_load(data: Dictionary) -> void:
	prints(data)


#endregion

#region Private ####################################################################################
## Volby „jednou“; vrací true, když zbývá jen rozloučení
func _nastav_volby() -> bool:
	var zbyva := 0
	for opt in options:
		if opt.id != "Konec":
			opt.visible = not opt.used
			if opt.visible:
				zbyva += 1
	return zbyva == 0


func _po_volbe() -> void:
	if _nastav_volby():
		await C.Framework.say("ch1_framework_vse")
		stop()


#endregion
