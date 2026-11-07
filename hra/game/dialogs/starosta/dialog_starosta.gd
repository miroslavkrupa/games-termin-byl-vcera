# @popochiu-docs-ignore-class
@tool
extends PopochiuDialog
# Rozhovor se starostou Bohumilem (R1.1, P1.8). Volba „Přesvědčit starostu“ spouští souboj
# argumenty M03 (minihry/souboj/souboj.gd); po souboji rozhovor končí (výhra: podpis sponzora,
# prohra: „Vraťte se, až budete mít argumenty.“ a souboj jde zkusit znovu). Jako v prototypu
# (kapitola1.js, dialog starosta).


#region Virtual ####################################################################################
func _on_start() -> void:
	var stav = R.Pracovna.state
	if not stav.starosta_uvital:
		stav.starosta_uvital = true
		await C.Starosta.say("ch1_starosta_uvod_1")
		await C.player.say("ch1_starosta_uvod_ruda")
		await C.Starosta.say("ch1_starosta_uvod_2")
	else:
		await E.get_tree().process_frame


func _option_selected(_opt: PopochiuDialogOption) -> void:
	# Každá volba má vlastní funkci _on_option_<id>
	pass


## Souboj argumenty: volba v závorkách se neříká (prototyp). Pembok poradí jen před prvním
## soubojem, pak starosta vznese první námitku a otevře se okno M03.
func _on_option_souboj(_opt: PopochiuDialogOption) -> void:
	var stav = R.Pracovna.state
	if not stav.souboj_rada:
		stav.souboj_rada = true
		await I.Pembok.rada("ch1_pembok_rada_starosta_pred")
	await C.Starosta.say("ch1_m03_k1_namitka")
	await R.Pracovna.otevri_souboj()
	stop()


func _on_option_noviny(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Starosta.say("ch1_starosta_noviny_1")
	await C.Starosta.say("ch1_starosta_noviny_2")
	turn_off_forever_options(["Noviny"])


func _on_option_konec(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await C.Starosta.say("ch1_starosta_konec")
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
