# @popochiu-docs-ignore-class
@tool
extends PopochiuDialog


#region Virtual ####################################################################################
func _on_start() -> void:
	await C.player.say("ch1_vratny_uvod_ruda")
	await C.Vratny.say("ch1_vratny_uvod")


func _option_selected(_opt: PopochiuDialogOption) -> void:
	# Každá volba má vlastní funkci _on_option_<id>
	pass


func _on_option_kdo(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Vratny.say("ch1_vratny_kdo_1")
	await C.player.say("ch1_vratny_kdo_ruda")
	# Po zapojení tlačítka „2“ (I3) jezdí výtah celý
	await C.Vratny.say("ch1_vratny_kdo_2_tlacitko" if Globals.tlacitko_zapojeno else "ch1_vratny_kdo_2")
	R.Namesti.state.vratny_rekl_starosta = true


func _on_option_dovnitr(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	if Globals.tlacitko_zapojeno:
		await C.Vratny.say("ch1_vratny_dovnitr_tlacitko")
	elif Globals.c1_cislo_projektu:
		await C.Vratny.say("ch1_vratny_dovnitr_cislo")
	else:
		await C.Vratny.say("ch1_vratny_dovnitr_1")
		await C.player.say("ch1_vratny_dovnitr_ruda")
		await C.Vratny.say("ch1_vratny_dovnitr_2")
	# Vrátný zmínil Lumíra: otevře se otázka, kdo to je (stopa P1.4)
	turn_on_options(["Lumir"])


func _on_option_lumir(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Vratny.say("ch1_vratny_lumir_1")
	await C.player.say("ch1_vratny_lumir_ruda")
	await C.Vratny.say("ch1_vratny_lumir_2")
	turn_off_forever_options(["Lumir"])


func _on_option_krizovka(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Vratny.say("ch1_vratny_krizovka_1")
	await C.player.say("ch1_vratny_krizovka_ruda")
	await C.Vratny.say("ch1_vratny_krizovka_2")


func _on_option_konec(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Vratny.say("ch1_vratny_konec")
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
