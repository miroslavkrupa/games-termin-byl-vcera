# @popochiu-docs-ignore-class
@tool
extends PopochiuDialog
# Tlačítka výtahu (vestibul, pracovna, Komise) jako nabídka voleb: jako v prototypu
# (kapitola1.js, dialog vytah) se nabízí jen patra, kde Ruda zrovna není; do 2. patra až
# s tlačítkem „2“ (P1.6). Popisky nejsou repliky, proto se volby neříkají nahlas.


#region Virtual ####################################################################################
func _on_start() -> void:
	var tady: String = R.current.script_name
	var dvojka: bool = Globals.tlacitko_zapojeno
	get_option("Prizemi").visible = tady != "Vestibul"
	get_option("Komise").visible = tady != "Komise"
	get_option("Starosta").visible = tady != "Pracovna" and dvojka
	get_option("Dva").visible = not dvojka
	get_option("Vylezt").visible = tady == "Komise" and not dvojka
	await E.get_tree().process_frame


func _option_selected(_opt: PopochiuDialogOption) -> void:
	# Každá volba má vlastní funkci _on_option_<id>
	pass


func _on_option_prizemi(_opt: PopochiuDialogOption) -> void:
	await C.player.say("ch1_vytah_dolu")
	stop()
	R.goto_room("Vestibul")


func _on_option_komise(_opt: PopochiuDialogOption) -> void:
	await C.player.say("ch1_vytah_jet_1p5")
	stop()
	R.goto_room("Komise")


func _on_option_starosta(_opt: PopochiuDialogOption) -> void:
	await C.player.say("ch1_vytah_jet_2")
	stop()
	R.goto_room("Pracovna")


## Díra místo dvojky (P1.6)
func _on_option_dva(_opt: PopochiuDialogOption) -> void:
	await C.player.say("ch1_vytah_bez_tlacitka")


## Chybný pokus P1.6: vylézt z 1½ o půl patra
func _on_option_vylezt(_opt: PopochiuDialogOption) -> void:
	await C.player.say("ch1_vytah_vylezt")


func _on_option_zustat(_opt: PopochiuDialogOption) -> void:
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
