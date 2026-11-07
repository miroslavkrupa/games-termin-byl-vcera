# @popochiu-docs-ignore-class
@tool
extends PopochiuDialog


#region Virtual ####################################################################################
func _on_start() -> void:
	await C.player.say("ch1_zmena_uvod_ruda")
	await C.PanZmena.say("ch1_zmena_uvod")
	# Na plakát se dá ptát, až si ho Ruda všimne
	get_option("Plakat").visible = R.Namesti.state.plakat_videl


func _option_selected(_opt: PopochiuDialogOption) -> void:
	# Každá volba má vlastní funkci _on_option_<id>; Ruda řekne text volby až v ní,
	# aby se repliky nepřekrývaly.
	pass


func _on_option_prodej(opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	# Pan Změna nikdy neprodává dvakrát to samé
	var odpovedi := ["ch1_zmena_prodej_1", "ch1_zmena_prodej_2", "ch1_zmena_001"]
	await C.PanZmena.say(odpovedi[(opt.used_times - 1) % odpovedi.size()])
	await C.player.say("ch1_zmena_prodej_ruda")


func _on_option_plakat(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	if Globals.c1_zmena_dohoda:
		await C.PanZmena.say("ch1_zmena_dohoda_uz")
		return
	# Za plakát chce pokaždé něco jiného (puzzle 3 v návrhu kapitoly 1)
	var stav = R.Namesti.state
	var prani := ["ch1_zmena_prani_1", "ch1_zmena_prani_2", "ch1_zmena_prani_3"]
	await C.PanZmena.say(prani[stav.zmena_prani % prani.size()])
	stav.zmena_prani += 1
	await C.player.say("ch1_zmena_prani_ruda")
	# Po druhém pokusu Ruda sám napoví, kudy na to
	if stav.zmena_prani == 2:
		await C.player.say("ch1_zmena_napad")


## Co si Pan Změna myslí o Arše (jednou): nesmyslné útržky cíle a kritérií pro M01 (I5)
func _on_option_archa(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.PanZmena.say("ch1_zmena_001")
	await C.PanZmena.say("ch1_zmena_archa_2")
	await C.PanZmena.say("ch1_zmena_archa_3")
	await C.player.say("ch1_zmena_archa_ruda")
	R.Namesti.state.slysel_zmena_archa = true
	turn_off_forever_options(["Archa"])


func _on_option_konec(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.PanZmena.say("ch1_zmena_konec")
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
