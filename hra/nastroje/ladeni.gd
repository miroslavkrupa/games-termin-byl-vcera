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
# kliky = x,y;x,y;… simulovaná klepnutí po všech krocích (0,7 s mezi nimi; p3 = pauza 3 s); fungují
#        na vlastní překryvná okna z Controlů (řazení kartotéky, souboj), ne na aktivní místa Popochiu;
#        s kliky= se po volbách nečeká na konec dialogu (souboj M03 se otevírá uvnitř volby)
# Při zobrazení nabídky voleb se do výstupu vypíší viditelné volby ([volby] id, id, …),
# každá replika jako [replika] Postava: text
# Příprava stavu před akcí (po čekání cekej, v tomto pořadí):
#   priznaky=c1_cislo_projektu=1,c1_babicka=spojenec  příznaky v Globals (1/0 = true/false, číslo, jinak text)
#   stav=Archiv.archiv_vstup=1,Namesti.bara_mluvila=1  proměnné stavu místností (R.<Mistnost>.state)
#   predmety=Plakat,KavovePero                         přidá předměty do inventáře
#   mistnost=Archiv                                    přejde do místnosti (počká na přechod)
# Rámec hry (I6): hra začíná v hlavním menu (místnost Menu). Ladicí běh se snímkem menu přeskočí
# a jde rovnou na náměstí jako dřív (výchozí věci a Pembok jako před úvodem), takže starší běhy
# fungují beze změny. Další parametry:
#   menu=1        zůstat v hlavním menu (snímek menu, klepnutí na jeho tlačítka přes kliky=)
#   start=Byt     přeskočit menu do jiné místnosti než náměstí (úvod v bytě); bez nulování stavu;
#                 funguje i bez snímku (godot --path hra -- start=Namesti)
#   nova_hra=1    jako tlačítko Nová hra v menu (vynulovat stav, úvod v bytě), hned po startu
#   nacti=<1–4>   načíst uloženou hru z pozice (jako Pokračovat / Načíst), před přípravou stavu
#   uloz=<1–4>    po všech krocích uložit hru do pozice (jako okno Uložit), pak teprve snímek
#   titulky=1     otevřít titulky; konec_obrazovka=1 rovnou závěrečnou obrazovku kapitoly
#   ramec=menu,nova_hra,… po ostatních krocích akce rámce: menu = zpět do hlavního menu,
#                 nova_hra = Nová hra (vynulovat, úvod v bytě); každá počká, až se hra uklidní
#   stavy=1       výpis po akci navíc vypíše stavy všech místností, postav a předmětů (kontrola nulování)
#   dotyk=x,y[:drz];… simulovaný dotyk prstem (emulace myši jako na telefonu); :drz = podržet 0,9 s,
#                 p2 = pauza 2 s; nabidka=1 zapne nabídku po ťuknutí (D43) jen pro tento běh
# Na macOS spouštěj s --always-on-top: zakryté okno se nepřekresluje a snímek by nevznikl.
#
# Zakládání objektů Popochiu (viz nastroje/vytvor.gd):
#   godot --headless --path hra -- vytvor <příkaz> <argumenty>
#
# Kontrola skriptů v exportu (spouští ji nastroje/nasad_web.sh přes šablonu bez editoru):
#   <hra exportovaná šablonou> --headless -- kontrola_skriptu
# Po startu hry načte všechny skripty z res://game/ a skončí kódem 1, když některý nejde přeložit.
# Ve hře spuštěné z editoru Godotu jsou k dispozici třídy editoru, takže tam se taková chyba neukáže.
#
# Automatický průchod kapitolou (krok N7 postupu, spouští ho nastroje/pruchod.sh):
#   godot --path hra -- pruchod <soubor> [varianta=A] [rychlost=4] [jazyk=en]
# Kroky jsou v nastroje/pruchody/<soubor>.txt, jeden na řádku (formát v README.md vedle nich).
# Hra začne v hlavním menu a kroky se provedou za sebou v jednom běhu, bez podstrkování stavu.
# Běh skončí kódem 0, když všechny kontroly sedí, jinak kódem 1 s řádkem, na kterém se zasekl.
extends Node


func _ready() -> void:
	var args := OS.get_cmdline_user_args()
	if args.size() > 0 and args[0] == "vytvor":
		var ok: bool = load("res://nastroje/vytvor.gd").new().spust(args.slice(1))
		get_tree().quit(0 if ok else 1)
		return
	if args.size() > 0 and args[0] == "kontrola_skriptu":
		_kontrola_skriptu()
		return
	if args.size() > 1 and args[0] == "pruchod":
		_pruchod(args[1], args.slice(2))
		return
	var p := {}
	for arg in OS.get_cmdline_user_args():
		var c := arg.split("=", true, 1)
		if c.size() == 2:
			p[c[0]] = c[1]
	_p = p
	if p.has("jazyk"):
		TranslationServer.set_locale(p["jazyk"])
	if not p.has("snimek"):
		return
	_nastav_ladici_beh()
	if p.has("nabidka"):
		load("res://game/gui/dotyk.gd").nabidka_po_tuknuti = p["nabidka"] == "1"
	if p.has("nova_hra"):
		# Jako tlačítko Nová hra v hlavním menu (počká, až menu naběhne)
		await get_tree().create_timer(1.0).timeout
		load("res://game/obrazovky/ramec.gd").nova_hra()
	await get_tree().create_timer(float(p.get("cekej", "3"))).timeout
	if p.has("nacti"):
		await load("res://game/obrazovky/ramec.gd").nacti(int(p["nacti"]))
		await _az_bude_klid()
	await _priprav_stav(p)
	_vypis("před akcí")
	if p.has("nastaveni"):
		get_node("/root/G").popup_requested.emit("SimpleClickSettings")
		await get_tree().create_timer(1.0).timeout
	if p.has("prepni"):
		# Stejně jako volba v nastavení, ale bez uložení (ladění nemá měnit hráčovo nastavení)
		TranslationServer.set_locale(p["prepni"])
		get_node("/root/Jazyk").zmenen.emit(p["prepni"])
		await get_tree().create_timer(0.5).timeout
	if p.has("titulky"):
		load("res://game/obrazovky/titulky.gd").ukaz()
		await get_tree().create_timer(1.0).timeout
	if p.has("konec_obrazovka"):
		load("res://game/obrazovky/konec_kapitoly.gd").ukaz_obrazovku()
		await get_tree().create_timer(1.0).timeout
	if p.has("pismo"):
		var tema: Theme = load("res://game/gui/resources/gui_theme.tres")
		tema.default_font = load(p["pismo"])
		tema.default_font_size = int(p.get("velikost", str(tema.default_font_size)))
	if p.has("rekni"):
		get_node("/root/C").player.say(p["rekni"])
	if p.has("animace"):
		# Přehraje animaci akce hráčovy postavy (zvednuti, pouziti) a hned bere snímky
		get_node("/root/C").player.animuj_akci(p["animace"])
	# Kroky se provedou v tomto pořadí: dojdi / klik, akce, volby, pouzij, kliky, dotyk
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
			var chyba := _akce(kroky[i])
			if chyba:
				print("[akce] ", chyba)
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
			# Volba jako klepnutím v nabídce (nabídka se tím i schová), jinak přímo signálem
			var nabidka := _nabidka_voleb()
			if nabidka:
				nabidka._on_option_clicked(volba)
			else:
				d.option_selected.emit(volba)
		# S kliky= se na konec dialogu nečeká: překryvné okno (souboj M03) se otevírá uvnitř volby
		if d.current_dialog and not p.has("kliky"):
			await d.dialog_finished
	if p.has("pouzij"):
		for krok in p["pouzij"].split(","):
			var c: PackedStringArray = krok.split(":")
			await _az_bude_klid()
			await _pouzij(c[0], c[1])
	if p.has("kliky"):
		# Překryvné okno se otevře, až postava dojde a domluví
		await _az_domluvi()
		await get_tree().create_timer(1.0).timeout
		for krok in p["kliky"].split(";"):
			if krok.begins_with("p"):
				# Pauza v sekundách (p3), např. když okno čeká, až postava domluví
				await get_tree().create_timer(float(krok.substr(1))).timeout
				continue
			var xy: PackedStringArray = krok.split(",")
			_klepnout(Vector2(float(xy[0]), float(xy[1])))
			await get_tree().create_timer(0.7).timeout
	if p.has("dotyk"):
		await get_tree().create_timer(0.5).timeout
		for krok in p["dotyk"].split(";"):
			if krok.begins_with("p"):
				await get_tree().create_timer(float(krok.substr(1))).timeout
				continue
			var c: PackedStringArray = krok.split(":")
			var xy: PackedStringArray = c[0].split(",")
			await _dotknout(Vector2(float(xy[0]), float(xy[1])), c.size() > 1 and c[1] == "drz")
			await get_tree().create_timer(1.0).timeout
	if p.has("ramec"):
		var ramec = load("res://game/obrazovky/ramec.gd")
		for krok in p["ramec"].split(","):
			if krok == "menu":
				ramec.do_menu()
			elif krok == "nova_hra":
				ramec.nova_hra()
			await _az_bude_klid()
			print("[rámec] %s → místnost %s" % [krok, get_node("/root/R").current.script_name])
	if p.has("dojdi") or p.has("akce") or p.has("pouzij") or p.has("klik") or p.has("animace") or p.has("rekni") or p.has("kliky") or p.has("dotyk") or p.has("ramec"):
		if not p.has("dojdi") and not p.has("klik") and not p.has("hned") and not p.has("animace") and not p.has("rekni"):
			await _az_bude_klid()
		await get_tree().create_timer(float(p.get("po", "3"))).timeout
		_vypis("po akci")
	if p.has("serie"):
		for i in int(p["serie"]):
			# Jako u závěrečného snímku: vynutit vykreslení (zakryté okno na macOS samo nekreslí)
			await get_tree().process_frame
			RenderingServer.force_draw()
			get_viewport().get_texture().get_image().save_png(p["snimek"].get_basename() + "_%02d.png" % (i + 1))
			var h = get_node("/root/C").player
			print("[serie %02d] hráč %s měřítko %.3f stav %s %s fáze %s" % [i + 1, h.position, h.scale.x, h.get("_stav"), h.get("_pohled"), h.get("_faze")])
			await get_tree().create_timer(float(p.get("rozestup", "0.12"))).timeout
	if p.has("uloz"):
		get_node("/root/E").save_game(int(p["uloz"]), "ladění %s" % Time.get_datetime_string_from_system())
		print("[uloženo] pozice %s" % p["uloz"])
		await get_tree().create_timer(1.0).timeout
	# Vynutit vykreslení aktuálního stavu (jinak může snímek zachytit starší obraz; čekání na
	# frame_post_draw se někdy nedočkalo, když okno zrovna nekreslilo)
	await get_tree().process_frame
	RenderingServer.force_draw()
	get_viewport().get_texture().get_image().save_png(p["snimek"])
	print("Snímek uložen: ", p["snimek"])
	get_tree().quit()


## Ladicí běh: repliky do výstupu, rychlé a samy se posouvají (hráč je posouvá klepnutím)
func _nastav_ladici_beh() -> void:
	# Úsporný režim kreslí jen při změně; u nehybné scény by snímek nikdy nevznikl
	OS.low_processor_usage_mode = false
	get_node("/root/C").character_spoke.connect(
		func(postava: PopochiuCharacter, text: String) -> void:
			print("[replika] %s: %s" % [postava.script_name, text])
	)
	get_node("/root/E").settings.auto_continue_text = true
	get_node("/root/E").text_speed = 0.005


## Klepnutí na aktivní místo, postavu nebo předmět v inventáři jako od hráče
## ([code]Misto:pouzit|prohlednout|najet[/code]); vrátí popis chyby, nebo prázdný text
func _akce(krok: String) -> String:
	var c: PackedStringArray = krok.split(":")
	if c.size() != 2 or not c[1] in ["pouzit", "prohlednout", "najet"]:
		return "akce %s má mít tvar Misto:pouzit|prohlednout|najet" % krok
	var misto: PopochiuClickable = get_node("/root/R").current.get_hotspot(c[0])
	if misto and not (misto.visible and misto.clickable):
		return "místo %s teď nejde použít (není vidět)" % c[0]
	if not misto:
		misto = get_node("/root/C").get_runtime_character(c[0])
		# Pembok po nápovědě z místnosti zmizí, ale zůstane registrovaný: pak je to zase předmět
		if misto and not misto.is_inside_tree():
			misto = null
	if not misto:
		# Předmět v inventáři: klepnutí jako od hráče
		if not get_node("/root/I").is_item_in_inventory(c[0]):
			return "%s tu není (místo, postava ani předmět v inventáři)" % c[0]
		var predmet: PopochiuInventoryItem = get_node("/root/I").get_item_instance(c[0])
		if c[1] == "prohlednout":
			predmet._on_right_click()
		else:
			predmet._on_click()
		return ""
	if c[1] == "najet":
		get_node("/root/G").hover_text_shown.emit(misto.get_description())
	else:
		get_node("/root/E").clicked = misto
		var tlacitko := MOUSE_BUTTON_RIGHT if c[1] == "prohlednout" else MOUSE_BUTTON_LEFT
		# Výchozí reakce GUI (E.command_fallback) se řídí posledním tlačítkem, které jinak
		# nastavuje až skutečné klepnutí
		misto.last_click_button = tlacitko
		misto.handle_command(tlacitko)
	return ""


var _menu_preskoceno := false
var _p := {}


## Místnost, kam má hlavní menu hned přejít (ladicí běh se snímkem bez menu=1), jinak "".
## Jen při startu: návrat do menu za běhu (konec kapitoly, volba v nastavení) už menu ukáže.
func preskocit_menu() -> String:
	if _menu_preskoceno:
		return ""
	_menu_preskoceno = true
	var p := {}
	for arg in OS.get_cmdline_user_args():
		var c := arg.split("=", true, 1)
		if c.size() == 2:
			p[c[0]] = c[1]
	if p.has("menu") or p.has("nova_hra") or p.has("nacti"):
		return ""
	# Bez snímku jen s výslovným start= (hraní rovnou od vybrané místnosti)
	if not p.has("snimek") and not p.has("start"):
		return ""
	return p.get("start", "Namesti")


# Připraví stav hry podle parametrů priznaky, stav, predmety a mistnost (viz hlavička)
func _priprav_stav(p: Dictionary) -> void:
	if p.has("priznaky"):
		var g = get_node("/root/Globals")
		for z in p["priznaky"].split(","):
			var c: PackedStringArray = z.split("=")
			g.set(c[0], _hodnota(c[1]))
	if p.has("stav"):
		for z in p["stav"].split(","):
			var c: PackedStringArray = z.split("=")
			var cesta: PackedStringArray = c[0].split(".")
			get_node("/root/R").get(cesta[0]).state.set(cesta[1], _hodnota(c[1]))
	if p.has("predmety"):
		for nazev in p["predmety"].split(","):
			await get_node("/root/I").get_item_instance(nazev).add()
	if p.has("mistnost"):
		var r = get_node("/root/R")
		if r.current.script_name != p["mistnost"]:
			r.goto_room(p["mistnost"])
			# _az_bude_klid počká, až je hra zase v místnosti a GUI odblokované
			await _az_bude_klid()


# Hodnota z příkazové řádky: 1/0 jako true/false, číslo, jinak text (c1_babicka=spojenec)
func _hodnota(text: String) -> Variant:
	if text == "1":
		return true
	if text == "0":
		return false
	if text.is_valid_int():
		return int(text)
	return text


# Počká, až hra dokončí rozběhnutou akci: je v místnosti, GUI není blokované a nikdo nemluví
func _az_bude_klid() -> void:
	var e = get_node("/root/E")
	var g = get_node("/root/G")
	var klidnych := 0
	var cekam := 0
	await get_tree().create_timer(0.5).timeout
	while klidnych < 15:
		await get_tree().create_timer(0.1).timeout
		var mluvi := false
		var kdo := ""
		for c in get_tree().get_nodes_in_group("PopochiuClickable"):
			if c is PopochiuCharacter and (c.is_talking or c.is_moving):
				mluvi = true
				kdo = "%s %s" % [c.script_name, "mluví" if c.is_talking else "jde"]
		klidnych = klidnych + 1 if e.in_room and not g.is_blocked and not mluvi else 0
		cekam += 1
		if cekam % 50 == 0:
			# Dlouhé čekání: vypsat, na co se čeká (pomáhá najít zaseknutí)
			print("[čekám] v místnosti %s, GUI blokované %s, %s" % [e.in_room, g.is_blocked, kdo])


# Najde nabídku voleb dialogu v GUI (součást DialogMenu)
func _nabidka_voleb() -> Node:
	for n in get_tree().root.find_children("*", "Control", true, false):
		if n.has_method("_on_option_clicked") and n.has_method("show_options"):
			return n
	return null


# Počká, až žádná postava nejde ani nemluví (GUI může zůstat blokované překryvným oknem)
func _az_domluvi() -> void:
	var klidnych := 0
	await get_tree().create_timer(0.5).timeout
	while klidnych < 5:
		await get_tree().create_timer(0.1).timeout
		var rusno := false
		for c in get_tree().get_nodes_in_group("PopochiuClickable"):
			if c is PopochiuCharacter and (c.is_talking or c.is_moving):
				rusno = true
		klidnych = klidnych + 1 if not rusno else 0


# Počká, až se zobrazí nabídka voleb: dialogu (PopochiuDialog), nebo přímo ze skriptu
func _az_budou_volby() -> void:
	var d = get_node("/root/D")
	var stav := {"hotovo": false}
	var hotovo := func(volby = null) -> void:
		stav.hotovo = true
		if volby is Array:
			var ids := []
			for v in volby:
				if v is PopochiuDialogOption and v.visible and not v.disabled:
					ids.append(v.id)
			print("[volby] ", ", ".join(ids))
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
	if not misto:
		# Cílem může být i postava v místnosti (Lumir)
		misto = get_node("/root/C").get_runtime_character(cil)
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


## Klepnutí rovnou do herního okna v souřadnicích hry; funguje i bez okna (--headless), kde
## Input.parse_input_event nic nedoručí. Míří jen na překryvná okna z Controlů (minihry).
func _klepnout_primo(kde: Vector2) -> void:
	var pohyb := InputEventMouseMotion.new()
	pohyb.position = kde
	pohyb.global_position = kde
	get_viewport().push_input(pohyb, true)
	for stisk in [true, false]:
		var e := InputEventMouseButton.new()
		e.button_index = MOUSE_BUTTON_LEFT
		e.pressed = stisk
		e.position = kde
		e.global_position = kde
		get_viewport().push_input(e, true)


# Dotyk prstem jako na telefonu: Godot z něj sám udělá emulovanou myš (zařízení -1), kterou
# zpracuje game/gui/dotyk.gd (podržení = prohlédnout, nabídka po ťuknutí)
func _dotknout(kde: Vector2, drzet: bool) -> void:
	var okno := Vector2(get_window().size)
	var hra := Vector2(
		ProjectSettings.get_setting("display/window/size/viewport_width"),
		ProjectSettings.get_setting("display/window/size/viewport_height")
	)
	var pozice: Vector2 = kde * minf(okno.x / hra.x, okno.y / hra.y)
	for stisk in [true, false]:
		var e := InputEventScreenTouch.new()
		e.index = 0
		e.pressed = stisk
		e.position = pozice
		Input.parse_input_event(e)
		if stisk:
			await get_tree().create_timer(0.9 if drzet else 0.12).timeout


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
	if _p.has("stavy") and kdy == "po akci":
		# Proměnné stavů všech objektů Popochiu (kromě základních), pro kontrolu nové hry a načtení
		for druh in ["rooms", "characters", "inventory_items"]:
			for cesta: String in PopochiuResources.get_section(druh):
				var data: Resource = load(cesta)
				var hodnoty := {}
				for v in data.get_script().get_script_property_list():
					if v.usage & PROPERTY_USAGE_SCRIPT_VARIABLE and not v.name in ["script_name", "scene", "props", "hotspots", "walkable_areas", "regions", "characters"]:
						hodnoty[v.name] = data.get(v.name)
				print("[stav %s] %s %s" % [druh, data.get("script_name"), hodnoty])
		for cesta: String in PopochiuResources.get_section("dialogs"):
			var dialog: PopochiuDialog = load(cesta)
			var volby := []
			for v in dialog.options:
				volby.append("%s:%s%s%s" % [v.id, "v" if v.visible else "-", "d" if v.disabled else "", "u" if v.used else ""])
			print("[stav dialogs] %s %s" % [dialog.script_name, " ".join(volby)])
		for nazev in ["Ruda", "Bara"]:
			print("[inventář] %s %s" % [nazev, get_node("/root/C").get_character(nazev).inventory.keys()])
	var pozadi = room.get_prop("Background") if room else null
	print("[%s] barva hráče %s, pozadí %s" % [kdy, hrac.modulate if hrac else "?", pozadi.texture.resource_path if pozadi and pozadi.texture else "?"])
	print("[%s] místnost %s, hráč %s, měřítko %s, inventář %s, stav %s, okno %s, viditelná oblast %s, kamera %s" % [
		kdy, room.script_name if room else "?", hrac.position if hrac else "?", hrac.scale if hrac else "?", inventar, stav, get_window().size,
		get_viewport().get_visible_rect(), kamera.get_screen_center_position() if kamera else "žádná"
	])


## Načte všechny skripty hry až po startu (jádro Popochiu je už připravené) a vypíše výsledek.
func _kontrola_skriptu() -> void:
	await get_tree().create_timer(1.0).timeout
	var skripty: Array[String] = []
	_najdi_skripty("res://game", skripty)
	var chyby: Array[String] = []
	for cesta in skripty:
		var skript := ResourceLoader.load(cesta, "", ResourceLoader.CACHE_MODE_REUSE) as Script
		if skript == null or not skript.can_instantiate():
			chyby.append(cesta)
			print("[kontrola skriptů] nejde přeložit: %s" % cesta)
	print("[kontrola skriptů] načteno %d skriptů, chyb %d" % [skripty.size(), chyby.size()])
	get_tree().quit(1 if chyby else 0)


## V exportu jsou skripty uložené jako <jméno>.gd.remap, ResourceLoader je načte pod jménem .gd.
func _najdi_skripty(slozka: String, vysledek: Array[String]) -> void:
	for podslozka in DirAccess.get_directories_at(slozka):
		_najdi_skripty(slozka.path_join(podslozka), vysledek)
	for soubor in DirAccess.get_files_at(slozka):
		var jmeno := soubor.trim_suffix(".remap")
		if jmeno.ends_with(".gd") and not vysledek.has(slozka.path_join(jmeno)):
			vysledek.append(slozka.path_join(jmeno))


#region Automatický průchod ########################################################################
## Nabídka voleb čeká na výběr a co v ní je (id voleb dialogu, u nabídky ze skriptu pořadí od nuly)
var _volby_cekaji := false
var _nabidnute: Array[String] = []
var _kontrol := 0


## Automatický průchod kapitolou: kroky ze souboru nastroje/pruchody/<soubor>.txt jeden po druhém
## v jednom běhu hry. Při chybě vypíše řádek a stav hry a skončí kódem 1.
func _pruchod(soubor: String, parametry: Array) -> void:
	for arg: String in parametry:
		var c := arg.split("=", true, 1)
		if c.size() == 2:
			_p[c[0]] = c[1]
	if _p.has("jazyk"):
		TranslationServer.set_locale(_p["jazyk"])
	var cesta := soubor if soubor.begins_with("res://") else "res://nastroje/pruchody/" + soubor
	if not cesta.ends_with(".txt"):
		cesta += ".txt"
	if not FileAccess.file_exists(cesta):
		print("[průchod] soubor %s neexistuje" % cesta)
		get_tree().quit(1)
		return
	_nastav_ladici_beh()
	# Bez okna (--headless) má okno 64 × 64 px a překryvná okna miniher by se rozložila jinak než
	# ve hře, takže by klepnutí mířila vedle
	get_window().size = Vector2i(
		ProjectSettings.get_setting("display/window/size/viewport_width"),
		ProjectSettings.get_setting("display/window/size/viewport_height")
	)
	print("[průchod] okno %s, viditelná oblast %s" % [get_window().size, get_viewport().get_visible_rect().size])
	# Zrychlení hry: časovače, chůze i repliky běží rychleji, pořadí kroků zůstane
	Engine.time_scale = float(_p.get("rychlost", "1"))
	var d = get_node("/root/D")
	d.dialog_options_requested.connect(_na_volby)
	d.inline_dialog_requested.connect(_na_volby)
	var zacatek := Time.get_ticks_msec()
	# Hlavní menu musí naběhnout
	await get_tree().create_timer(1.0).timeout
	var varianta: String = _p.get("varianta", "zaklad")
	var radky := FileAccess.get_file_as_string(cesta).split("\n")
	var kroku := 0
	for i in radky.size():
		var radek := radky[i].get_slice("#", 0).strip_edges()
		if radek.is_empty():
			continue
		if radek.begins_with("varianty "):
			if not varianta in radek.split(" ", false).slice(1):
				print("[průchod] varianta %s v souboru není (%s)" % [varianta, radek])
				get_tree().quit(1)
				return
			continue
		# Štítek na konci řádku: @A jen ve variantě A, @!A,E ve všech kromě A a E
		var zavinac := radek.rfind(" @")
		if zavinac >= 0:
			var stitek := radek.substr(zavinac + 2).strip_edges()
			radek = radek.substr(0, zavinac).strip_edges()
			if (varianta in stitek.trim_prefix("!").split(",")) == stitek.begins_with("!"):
				continue
		kroku += 1
		print("[průchod] řádek %d: %s" % [i + 1, radek])
		var chyba := await _krok_pruchodu(radek)
		if chyba:
			print("[průchod] CHYBA na řádku %d (%s): %s" % [i + 1, radek, chyba])
			_vypis("chyba")
			get_tree().quit(1)
			return
	print("[průchod] HOTOVO %s, varianta %s: %d kroků, %d kontrol, %d s" % [
		cesta.get_file(), varianta, kroku, _kontrol, (Time.get_ticks_msec() - zacatek) / 1000
	])
	get_tree().quit(0)


## Jeden krok průchodu (formát v nastroje/pruchody/README.md); vrátí popis chyby, nebo prázdný text
func _krok_pruchodu(radek: String) -> String:
	var c := radek.split(" ", false, 1)
	var arg := c[1].strip_edges() if c.size() > 1 else ""
	var chyba := ""
	match c[0]:
		"nova_hra":
			load("res://game/obrazovky/ramec.gd").nova_hra()
			return await _cekej_klid()
		"akce":
			for krok in arg.split(","):
				chyba = await _cekej_klid()
				if not chyba:
					chyba = _akce(krok)
				if chyba:
					return chyba
		"volby":
			for id in arg.split(","):
				chyba = await _cekej_volby()
				if chyba:
					return chyba
				if not id in _nabidnute:
					return "volba %s není v nabídce (nabízí %s)" % [id, ", ".join(_nabidnute)]
				_vyber_volbu(id)
		"pouzij":
			for krok in arg.split(","):
				chyba = await _cekej_klid()
				if chyba:
					return chyba
				var pc := krok.split(":")
				if pc.size() != 2:
					return "použití %s má mít tvar Predmet:Cil" % krok
				if not get_node("/root/I").is_item_in_inventory(pc[0]):
					return "předmět %s hráč nemá" % pc[0]
				await _pouzij(pc[0], pc[1])
		"klepni":
			for polozka in arg.split(";"):
				chyba = await _klepni_v_okne(polozka.strip_edges())
				if chyba:
					return chyba
		"mistnost", "hrac":
			chyba = await _cekej_klid()
			if chyba:
				return chyba
			_kontrol += 1
			var je: String = (
				get_node("/root/R").current.script_name if c[0] == "mistnost"
				else get_node("/root/C").player.script_name
			)
			if je != arg:
				return "%s je %s, ne %s" % ["místnost" if c[0] == "mistnost" else "hráč", je, arg]
		"priznak":
			chyba = await _cekej_klid()
			if chyba:
				return chyba
			var g = get_node("/root/Globals")
			for z in arg.split(","):
				var pz := z.split("=", true, 1)
				if pz.size() != 2 or not pz[0] in g:
					return "příznak %s v Globals není" % pz[0]
				_kontrol += 1
				if not _stejne(g.get(pz[0]), pz[1]):
					return "příznak %s je %s, ne %s" % [pz[0], g.get(pz[0]), pz[1]]
		"ma", "nema":
			chyba = await _cekej_klid()
			if chyba:
				return chyba
			for nazev in arg.split(","):
				_kontrol += 1
				var ma: bool = get_node("/root/I").is_item_in_inventory(nazev)
				if ma != (c[0] == "ma"):
					return "hráč %s předmět %s" % ["nemá" if c[0] == "ma" else "pořád má", nazev]
		"konec":
			return await _konec_kapitoly(arg)
		_:
			return "neznámý krok %s" % c[0]
	return ""


## Zapamatuje si nabídku voleb dialogu (i nabídku přímo ze skriptu) a vypíše ji
func _na_volby(volby = null) -> void:
	_nabidnute.clear()
	if volby is Array:
		for i in volby.size():
			var v = volby[i]
			if not v is PopochiuDialogOption:
				_nabidnute.append(str(i))
			elif v.visible and not v.disabled:
				_nabidnute.append(v.id)
	print("[volby] ", ", ".join(_nabidnute))
	_volby_cekaji = true


## Vybere volbu jako klepnutím v nabídce; u nabídky ze skriptu je id pořadí od nuly
func _vyber_volbu(id: String) -> void:
	var d = get_node("/root/D")
	_volby_cekaji = false
	var volba: PopochiuDialogOption = d.current_dialog.get_option(id) if d.current_dialog else null
	if not volba:
		volba = PopochiuDialogOption.new()
		volba.id = id
	var nabidka := _nabidka_voleb()
	if nabidka:
		nabidka._on_option_clicked(volba)
	else:
		d.option_selected.emit(volba)


## Počká jako _az_bude_klid, až hra dokončí rozběhnutou akci. Chyba, když místo klidu čeká
## nabídka voleb, nebo když se hra do [param limit] sekund hry neuklidní.
func _cekej_klid(limit := 120.0) -> String:
	var e = get_node("/root/E")
	var g = get_node("/root/G")
	var klidnych := 0
	var cekam := 0
	await get_tree().create_timer(0.5).timeout
	while klidnych < 15:
		await get_tree().create_timer(0.1).timeout
		if _volby_cekaji:
			return "čeká nabídka voleb (%s), chybí krok volby" % ", ".join(_nabidnute)
		var kdo := _kdo_mluvi()
		klidnych = klidnych + 1 if e.in_room and not g.is_blocked and kdo.is_empty() else 0
		cekam += 1
		if cekam % 100 == 0:
			print("[čekám] v místnosti %s, GUI blokované %s, %s" % [e.in_room, g.is_blocked, kdo])
		if cekam > limit * 10:
			return "hra se neuklidnila (v místnosti %s, GUI blokované %s, %s)" % [e.in_room, g.is_blocked, kdo]
	return ""


## Počká na nabídku voleb dialogu
func _cekej_volby(limit := 120.0) -> String:
	var cekam := 0
	while not _volby_cekaji:
		await get_tree().create_timer(0.1).timeout
		cekam += 1
		if cekam > limit * 10:
			return "nabídka voleb se neukázala"
	# Nabídka se dokreslí, jako když ji vidí hráč
	await get_tree().create_timer(0.8).timeout
	return ""


## Kdo právě mluví nebo jde (prázdný text, když nikdo)
func _kdo_mluvi() -> String:
	for c in get_tree().get_nodes_in_group("PopochiuClickable"):
		if c is PopochiuCharacter and (c.is_talking or c.is_moving):
			return "%s %s" % [c.script_name, "mluví" if c.is_talking else "jde"]
	return ""


## Hodnota příznaku proti textu ze souboru průchodu (1/0 i true/false u přepínačů)
func _stejne(hodnota: Variant, text: String) -> bool:
	if hodnota is bool:
		return hodnota == (text in ["1", "true"])
	if hodnota is int:
		return text.is_valid_int() and hodnota == int(text)
	return str(hodnota) == text


## Konec kapitoly: počká na obrazovku paměti, porovná paměť s [param ocekavana] (klíče bez
## předpony ch1_pamet_, oddělené čárkou) a tlačítky Dál a Hlavní menu dojde do hlavního menu
func _konec_kapitoly(ocekavana: String) -> String:
	var dal := await _cekej_tlacitko("ui_dal")
	if not dal:
		return "obrazovka paměti kapitoly se neukázala"
	var pamet: Array[String] = []
	for klic: String in load("res://game/obrazovky/konec_kapitoly.gd").pamet_kapitoly():
		if klic != "ch1_pamet_pokracovani":
			pamet.append(klic.trim_prefix("ch1_pamet_"))
	var chce: Array[String] = []
	for klic in ocekavana.split(","):
		chce.append(klic.strip_edges())
	pamet.sort()
	chce.sort()
	_kontrol += 1
	if pamet != chce:
		return "paměť kapitoly je %s, ne %s" % [", ".join(pamet), ", ".join(chce)]
	dal.pressed.emit()
	var menu := await _cekej_tlacitko("ui_hlavni_menu")
	if not menu:
		return "obrazovka Pokračování příště se neukázala"
	menu.pressed.emit()
	var cekam := 0
	while not (get_node("/root/E").in_room and get_node("/root/R").current.script_name == "Menu"):
		await get_tree().create_timer(0.1).timeout
		cekam += 1
		if cekam > 300:
			return "hra se nevrátila do hlavního menu"
	_kontrol += 1
	return ""


## Počká na viditelné tlačítko s textem [param klic] (klíč nebo jeho překlad), případně jen
## na takové, které jde stisknout
func _cekej_tlacitko(klic: String, limit := 120.0, jen_aktivni := false) -> Button:
	for i in int(limit * 10):
		for n: Button in get_tree().root.find_children("*", "Button", true, false):
			if n.is_visible_in_tree() and n.text in [klic, tr(klic)] and not (jen_aktivni and n.disabled):
				return n
		await get_tree().create_timer(0.1).timeout
	return null


## Klepnutí v překryvném okně minihry: tlačítko podle klíče textu, pole minihry (pole:<id>),
## souřadnice hry (x,y) nebo pauza (p2 = 2 s hry)
func _klepni_v_okne(polozka: String) -> String:
	if polozka.begins_with("p") and polozka.substr(1).is_valid_float():
		await get_tree().create_timer(float(polozka.substr(1))).timeout
		return ""
	var kde: Vector2
	var xy := polozka.split(",")
	if xy.size() == 2 and xy[0].is_valid_float() and xy[1].is_valid_float():
		await _az_domluvi()
		kde = Vector2(float(xy[0]), float(xy[1]))
	elif polozka.begins_with("pole:"):
		var pole := await _cekej_pole(polozka.substr(5))
		if not pole:
			return "pole %s v okně minihry není" % polozka.substr(5)
		# Pravý dolní roh pole: uprostřed už můžou ležet karty a klepnutí by je vybralo
		kde = pole.get_global_rect().end - Vector2(18, 18)
	else:
		var b := await _cekej_tlacitko(polozka, 120.0, true)
		if not b:
			return "tlačítko %s se neukázalo nebo nejde stisknout" % polozka
		# Okno ukázané po replice se ještě rozkládá
		await get_tree().create_timer(0.3).timeout
		if not b.is_visible_in_tree():
			return "tlačítko %s zmizelo dřív, než šlo stisknout" % polozka
		kde = b.get_global_rect().get_center()
	_klepnout_primo(kde)
	await get_tree().create_timer(0.7).timeout
	return ""


## Počká na pole minihry: překryvné okno pod kořenem stromu s polem [code]_pole[/code] (pole
## kontejnerů M02 podle pořadí, slovník kolonek M01 podle id). Vrátí rámeček pole.
func _cekej_pole(id: String, limit := 60.0) -> Control:
	for i in int(limit * 10):
		for okno in get_tree().root.get_children():
			if not (okno is CanvasLayer and okno.visible and "_pole" in okno):
				continue
			var pole = okno.get("_pole")
			var obsah: Control = null
			if pole is Array and id.is_valid_int() and int(id) < pole.size():
				obsah = pole[int(id)]
			elif pole is Dictionary and pole.has(id):
				obsah = pole[id]
			if obsah and obsah.is_visible_in_tree():
				return obsah.get_parent()
		await get_tree().create_timer(0.1).timeout
	return null


#endregion
