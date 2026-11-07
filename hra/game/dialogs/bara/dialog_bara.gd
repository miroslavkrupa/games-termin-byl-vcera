# @popochiu-docs-ignore-class
@tool
extends PopochiuDialog
# Další rozhovory s Bárou; první rozhovor (R1.3) je ve skriptu postavy Báry.


#region Virtual ####################################################################################
func _on_start() -> void:
	await C.player.say("ch1_bara_znovu_ruda")
	await C.Bara.say("ch1_bara_znovu")
	var rozsah := get_option("Rozsah")
	rozsah.visible = not rozsah.used and (I.is_item_in_inventory("Zadani") or I.is_item_in_inventory("Papir"))


func _option_selected(_opt: PopochiuDialogOption) -> void:
	# Každá volba má vlastní funkci _on_option_<id>
	pass


func _on_option_mereni(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Bara.say("ch1_bara_mereni_1")
	await C.player.say("ch1_bara_mereni_ruda")
	await C.Bara.say("ch1_bara_mereni_2")


func _on_option_cislo(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	if R.Namesti.state.bara_rekla_cislo:
		await C.Bara.say("ch1_bara_cislo_znovu")
	elif Globals.c1_cislo_projektu:
		await C.Bara.say("ch1_bara_cislo_plakat")
	else:
		# Kdo jí skočil do řeči, číslo od ní nedostane; pošle ho ale k plakátu (žádná slepá ulička)
		await C.Bara.say("ch1_bara_cislo_ne")
		await C.Bara.say("ch1_bara_cislo_zmena")


## Co na Archu nepatří (jen se zadáním nebo papírem; jednou): dobrý útržek „mimo rozsah“ pro M01 (I5)
func _on_option_rozsah(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Bara.say("ch1_bara_rozsah_1")
	await C.player.say("ch1_bara_rozsah_ruda")
	await C.Bara.say("ch1_bara_rozsah_2")
	await C.Bara.say("ch1_bara_rozsah_utrzek")
	R.Namesti.state.utrzek_mimo = true
	turn_off_forever_options(["Rozsah"])


func _on_option_konec(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Bara.say("ch1_bara_konec")
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
