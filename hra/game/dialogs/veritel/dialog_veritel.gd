# @popochiu-docs-ignore-class
@tool
extends PopochiuDialog
# Rozhovor s věřiteli přes dveře v Rudově bytě (úvod, prototyp dialogy.veritel; učí rozhovor).
# Poprvé věřitelé buší. „Tady nikdo nebydlí!“ a „Kolik vlastně dlužím?“ jen jednou. „Co chcete?“
# do dekretu: bez hrnku kávy Ruda nic nepodepíše, s kávou podepíše „stížnost“ (propiska nepíše,
# ukápne káva), a je z toho jmenovací dekret; propisku si nechá. Volba Konec napoví díru ve zdi.


func _on_start() -> void:
	if I.is_item_in_inventory("Dekret"):
		turn_off_options(["Co"])
	var byt = R.Byt.state
	if not byt.veritel_busil:
		byt.veritel_busil = true
		await R.Byt.veritel("ch1_veritel_buseni_1")
		await R.Byt.veritel("ch1_veritel_buseni_2")
		await C.player.say("ch1_veritel_buseni_ruda")


func _option_selected(_opt: PopochiuDialogOption) -> void:
	# Každá volba má vlastní funkci _on_option_<id>
	pass


func _on_option_nikdo(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await R.Byt.veritel("ch1_veritel_nikdo_1")
	await C.player.say("ch1_veritel_nikdo_ruda")
	await R.Byt.veritel("ch1_veritel_nikdo_2")
	turn_off_forever_options(["Nikdo"])


func _on_option_kolik(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await R.Byt.veritel("ch1_veritel_kolik_1")
	# Druhý věřitel opravuje (částka roste jako rozpočet)
	await C.get_character("Veritel").hlas("ch1_veritel_kolik_2", true)
	await R.Byt.veritel("ch1_veritel_kolik_3")
	await C.player.say("ch1_veritel_kolik_ruda")
	turn_off_forever_options(["Kolik"])


func _on_option_co(_opt: PopochiuDialogOption) -> void:
	await D.say_selected()
	await R.Byt.veritel("ch1_veritel_co_1")
	await C.player.say("ch1_veritel_co_ruda")
	await R.Byt.veritel("ch1_veritel_co_2")
	if not I.is_item_in_inventory("Kava"):
		await C.player.say("ch1_veritel_bez_kavy")
		return
	await C.player.say("ch1_veritel_podpis_ruda")
	await C.player.animuj_akci("pouziti")
	await C.player.say("ch1_veritel_podpis_kava")
	await C.player.say("ch1_veritel_podpis_cteni")
	await C.player.say("ch1_veritel_podpis_ruda_2")
	await R.Byt.veritel("ch1_veritel_odchod")
	await I.Dekret.add()
	await C.player.say("ch1_byt_propiska_vzit")
	await I.Propiska.add()
	R.Byt.state.dekret_prevzat = true
	turn_off_forever_options(["Co"])


func _on_option_konec(_opt: PopochiuDialogOption) -> void:
	# Text volby je v závorce (Ruda ustoupí od dveří), proto ho Ruda neříká nahlas
	await R.Byt.veritel("ch1_veritel_konec")
	await C.player.say("ch1_veritel_konec_ruda")
	stop()


func _on_save() -> Dictionary:
	return {}


func _on_load(_data: Dictionary) -> void:
	pass
