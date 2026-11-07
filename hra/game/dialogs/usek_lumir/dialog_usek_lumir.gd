# @popochiu-docs-ignore-class
@tool
extends PopochiuDialog
# Rozhovor Báry s Lumírem během úseku za Báru (S3, P1.12). Lumír ji zná („Vy jste ho psala.“);
# o regálu řekne jen rozkaz Komise z roku 1994, lístek z roku 1998 má s překlepem. Každá volba
# jednou; když zbude jen rozloučení, Lumír řekne, že už nemá co dodat. Podle prototypu
# (kapitola1.js, dialog usek_lumir).


#region Virtual ####################################################################################
func _on_start() -> void:
	var stav = R.Archiv.state
	if not stav.usek_lumir_uvital:
		stav.usek_lumir_uvital = true
		await C.Lumir.say("ch1_usek_lumir_1")
		await C.player.say("ch1_usek_lumir_bara")
	else:
		await E.get_tree().process_frame
	if _nastav_volby():
		await C.Lumir.say("ch1_lumir_vse")
		stop.call_deferred()


func _option_selected(_opt: PopochiuDialogOption) -> void:
	# Každá volba má vlastní funkci _on_option_<id>
	pass


func _on_option_regal(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Lumir.say("ch1_lumir_regal")
	await _po_volbe()


func _on_option_listek(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Lumir.say("ch1_usek_lumir_listek")
	await C.player.say("ch1_usek_lumir_listek_bara")
	await _po_volbe()


func _on_option_konec(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Lumir.say("ch1_lumir_konec")
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
		await C.Lumir.say("ch1_lumir_vse")
		stop()


#endregion
