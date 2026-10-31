# Ladicí pomocník pro ověřování prototypu bez ručního klikání.
# Bez parametrů nedělá nic. Spuštění se snímkem obrazovky:
#   godot --path hra -- snimek=<soubor.png> [jazyk=cs|en] [cekej=3] [dojdi=x,y | klik=x,y | akce=…] [po=3]
# serie=N [rozestup=0.12] uloží po akci N snímků za sebou (snimek_01.png …) pro kontrolu animace
# animace=zvednuti|pouziti přehraje akci postavy
# pismo=<res://…ttf> [velikost=36] vymění písmo celého GUI (náhled písem), rekni=<text> nechá hráčovu postavu promluvit
# nastaveni=1 otevře okno nastavení, prepni=cs|en přepne jazyk za běhu (jako hráč v nastavení, ale volbu neukládá)
# cekej = sekundy před akcí, po = sekundy po akci; souřadnice hry (1536 × 1024)
# dojdi = hráčova postava dojde na místo (ověří navigaci a zmenšování)
# akce = <AktivniMisto>:pouzit|prohlednout|najet[,…] – klepnutí levým / pravým tlačítkem, nebo jen popisek jako při najetí
#        myší; další krok počká, až hra dokončí předchozí (i přes změnu místnosti). Místo aktivního
#        místa jde i postava v místnosti (Bara:pouzit) nebo předmět v inventáři (Pembok:pouzit)
# volby = <id>,<id>… – po akci vybírá volby dialogu, vždy jakmile se nabídka zobrazí; u nabídky
#        přímo ve skriptu (D.show_inline_dialog) je id pořadí volby od nuly
# pouzij = <Predmet>:<Cil>[,<Predmet>:<Cil>…] – použije předmět z inventáře na aktivní místo nebo jiný předmět
# po = sekundy čekání po posledním kroku (u akcí a předmětů se nejdřív počká, až hra domluví; hned=1 nečeká)
# klik = simulované klepnutí; Popochiu ale čte skutečnou pozici kurzoru, takže míří tam, kde je myš
# Na macOS spouštěj s --always-on-top: zakryté okno se nepřekresluje a snímek by nevznikl.
#
# Zakládání objektů Popochiu (viz nastroje/vytvor.gd):
#   godot --headless --path hra -- vytvor <příkaz> <argumenty>
extends Node


func _ready() -> void:
	var args := OS.get_cmdline_user_args()
	if args.size() > 0 and args[0] == "vytvor":
		var ok: bool = load("res://nastroje/vytvor.gd").new().spust(args.slice(1))
		get_tree().quit(0 if ok else 1)
		return
	var p := {}
	for arg in OS.get_cmdline_user_args():
		var c := arg.split("=", true, 1)
		if c.size() == 2:
			p[c[0]] = c[1]
	if p.has("jazyk"):
		TranslationServer.set_locale(p["jazyk"])
	if not p.has("snimek"):
		return
	# Úsporný režim kreslí jen při změně; u nehybné scény by snímek nikdy nevznikl
	OS.low_processor_usage_mode = false
	# Repliky se při ladění vypisují rychle a posouvají samy (hráč je posouvá klepnutím)
	get_node("/root/E").settings.auto_continue_text = true
	get_node("/root/E").text_speed = 0.005
	await get_tree().create_timer(float(p.get("cekej", "3"))).timeout
	_vypis("před akcí")
	if p.has("nastaveni"):
		get_node("/root/G").popup_requested.emit("SimpleClickSettings")
		await get_tree().create_timer(1.0).timeout
	if p.has("prepni"):
		# Stejně jako volba v nastavení, ale bez uložení (ladění nemá měnit hráčovo nastavení)
		TranslationServer.set_locale(p["prepni"])
		get_node("/root/Jazyk").zmenen.emit(p["prepni"])
		await get_tree().create_timer(0.5).timeout
	if p.has("pismo"):
		var tema: Theme = load("res://game/gui/resources/gui_theme.tres")
		tema.default_font = load(p["pismo"])
		tema.default_font_size = int(p.get("velikost", str(tema.default_font_size)))
	if p.has("rekni"):
		get_node("/root/C").player.say(p["rekni"])
	if p.has("animace"):
		# Přehraje animaci akce hráčovy postavy (zvednuti, pouziti) a hned bere snímky
		get_node("/root/C").player.animuj_akci(p["animace"])
	# Kroky se provedou v tomto pořadí: dojdi / klik, akce, volby, pouzij
	if p.has("dojdi"):
		# Více cílů oddělených středníkem: postava je obejde postupně, snímky se berou při posledním
		var cile: PackedStringArray = p["dojdi"].split(";")
		for i in cile.size():
			var xy: PackedStringArray = cile[i].split(",")
			var cil := Vector2(float(xy[0]), float(xy[1]))
			if i < cile.size() - 1:
				await get_node("/root/C").player.walk_to(cil)
			else:
				get_node("/root/C").player.walk_to(cil)
	elif p.has("klik"):
		var xy: PackedStringArray = p["klik"].split(",")
		_klepnout(Vector2(float(xy[0]), float(xy[1])))
	if p.has("akce"):
		var kroky: PackedStringArray = p["akce"].split(",")
		for i in kroky.size():
			if i > 0:
				await _az_bude_klid()
			var c: PackedStringArray = kroky[i].split(":")
			var misto: PopochiuClickable = get_node("/root/R").current.get_hotspot(c[0])
			if not misto:
				misto = get_node("/root/C").get_runtime_character(c[0])
			if not misto:
				# Předmět v inventáři: klepnutí jako od hráče
				var predmet: PopochiuInventoryItem = get_node("/root/I").get_item_instance(c[0])
				if c[1] == "prohlednout":
					predmet._on_right_click()
				else:
					predmet._on_click()
				continue
			if c[1] == "najet":
				get_node("/root/G").hover_text_shown.emit(misto.get_description())
			else:
				get_node("/root/E").clicked = misto
				misto.handle_command(MOUSE_BUTTON_RIGHT if c[1] == "prohlednout" else MOUSE_BUTTON_LEFT)
	if p.has("volby"):
		var d = get_node("/root/D")
		for id in p["volby"].split(","):
			await _az_budou_volby()
			await get_tree().create_timer(0.8).timeout
			var volba: PopochiuDialogOption = d.current_dialog.get_option(id) if d.current_dialog else null
			if not volba:
				# Nabídka ze skriptu (D.show_inline_dialog): volby jsou očíslované od nuly
				volba = PopochiuDialogOption.new()
				volba.id = id
			d.option_selected.emit(volba)
		if d.current_dialog:
			await d.dialog_finished
	if p.has("pouzij"):
		for krok in p["pouzij"].split(","):
			var c: PackedStringArray = krok.split(":")
			await _az_bude_klid()
			await _pouzij(c[0], c[1])
	if p.has("dojdi") or p.has("akce") or p.has("pouzij") or p.has("klik") or p.has("animace") or p.has("rekni"):
		if not p.has("dojdi") and not p.has("klik") and not p.has("hned") and not p.has("animace") and not p.has("rekni"):
			await _az_bude_klid()
		await get_tree().create_timer(float(p.get("po", "3"))).timeout
		_vypis("po akci")
	if p.has("serie"):
		for i in int(p["serie"]):
			await RenderingServer.frame_post_draw
			get_viewport().get_texture().get_image().save_png(p["snimek"].get_basename() + "_%02d.png" % (i + 1))
			var h = get_node("/root/C").player
			print("[serie %02d] hráč %s měřítko %.3f stav %s %s fáze %s" % [i + 1, h.position, h.scale.x, h.get("_stav"), h.get("_pohled"), h.get("_faze")])
			await get_tree().create_timer(float(p.get("rozestup", "0.12"))).timeout
	# Počkat na vykreslení aktuálního stavu (jinak může snímek zachytit starší obraz)
	await RenderingServer.frame_post_draw
	await RenderingServer.frame_post_draw
	get_viewport().get_texture().get_image().save_png(p["snimek"])
	print("Snímek uložen: ", p["snimek"])
	get_tree().quit()


# Počká, až hra dokončí rozběhnutou akci: je v místnosti, GUI není blokované a nikdo nemluví
func _az_bude_klid() -> void:
	var e = get_node("/root/E")
	var g = get_node("/root/G")
	var klidnych := 0
	await get_tree().create_timer(0.5).timeout
	while klidnych < 15:
		await get_tree().create_timer(0.1).timeout
		var mluvi := false
		for c in get_tree().get_nodes_in_group("PopochiuClickable"):
			if c is PopochiuCharacter and (c.is_talking or c.is_moving):
				mluvi = true
		klidnych = klidnych + 1 if e.in_room and not g.is_blocked and not mluvi else 0


# Počká, až se zobrazí nabídka voleb: dialogu (PopochiuDialog), nebo přímo ze skriptu
func _az_budou_volby() -> void:
	var d = get_node("/root/D")
	var stav := {"hotovo": false}
	var hotovo := func(_volby = null) -> void: stav.hotovo = true
	d.dialog_options_requested.connect(hotovo)
	d.inline_dialog_requested.connect(hotovo)
	while not stav.hotovo:
		await get_tree().process_frame
	d.dialog_options_requested.disconnect(hotovo)
	d.inline_dialog_requested.disconnect(hotovo)


# Použití předmětu jako od hráče: vybrat předmět, pak klepnout na cíl
func _pouzij(predmet: String, cil: String) -> void:
	var inv = get_node("/root/I")
	var aktivni: PopochiuInventoryItem = inv.get_item_instance(predmet)
	inv.active = aktivni
	var misto = get_node("/root/R").current.get_hotspot(cil)
	if misto:
		get_node("/root/E").clicked = misto
		misto.on_item_used(aktivni)
	else:
		var druhy: PopochiuInventoryItem = inv.get_item_instance(cil)
		inv.clicked = druhy
		druhy.on_item_used(aktivni)


# Klepnutí jako od hráče: souřadnice hry se převedou na souřadnice okna
func _klepnout(kde: Vector2) -> void:
	var okno := Vector2(get_window().size)
	var hra := Vector2(
		ProjectSettings.get_setting("display/window/size/viewport_width"),
		ProjectSettings.get_setting("display/window/size/viewport_height")
	)
	var pozice: Vector2 = kde * minf(okno.x / hra.x, okno.y / hra.y)
	for stisk in [true, false]:
		var e := InputEventMouseButton.new()
		e.button_index = MOUSE_BUTTON_LEFT
		e.pressed = stisk
		e.position = pozice
		e.global_position = pozice
		Input.parse_input_event(e)


func _vypis(kdy: String) -> void:
	var hrac = get_node("/root/C").player
	var kamera := get_viewport().get_camera_2d()
	var inventar: Array = hrac.inventory.keys() if hrac else []
	# Vlastní proměnné stavu aktuální místnosti (např. zmena_dohoda)
	var stav := {}
	var room = get_node("/root/R").current
	if room and room.get("state"):
		var zakladni := []
		for v in room.state.get_script().get_base_script().get_script_property_list():
			zakladni.append(v.name)
		for v in room.state.get_script().get_script_property_list():
			if v.usage & PROPERTY_USAGE_SCRIPT_VARIABLE and not v.name in zakladni:
				stav[v.name] = room.state.get(v.name)
	# Příznaky napříč místnostmi (Globals, např. c1_cislo_projektu)
	var globalni := {}
	var g = get_node("/root/Globals")
	for v in g.get_script().get_script_property_list():
		if v.usage & PROPERTY_USAGE_SCRIPT_VARIABLE:
			globalni[v.name] = g.get(v.name)
	stav["Globals"] = globalni
	var pozadi = room.get_prop("Background") if room else null
	print("[%s] barva hráče %s, pozadí %s" % [kdy, hrac.modulate if hrac else "?", pozadi.texture.resource_path if pozadi and pozadi.texture else "?"])
	print("[%s] místnost %s, hráč %s, měřítko %s, inventář %s, stav %s, okno %s, viditelná oblast %s, kamera %s" % [
		kdy, room.script_name if room else "?", hrac.position if hrac else "?", hrac.scale if hrac else "?", inventar, stav, get_window().size,
		get_viewport().get_visible_rect(), kamera.get_screen_center_position() if kamera else "žádná"
	])
