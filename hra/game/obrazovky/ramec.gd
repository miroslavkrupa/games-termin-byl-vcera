# Rámec hry (I6): nová hra, načtení uložené hry a návrat do hlavního menu. Ukládání a načítání
# dělá Popochiu (E.save_game / E.load_game, soubory user://save_<pozice>.json, 4 pozice): ukládá
# stavy místností, postav, předmětů a dialogů, inventář každé postavy, hranou postavu a Globals.
# Slovníky Popochiu sám neukládá, ty doplňují funkce on_save/_on_save (Globals, Komise, Pembok).
#
# Před novou hrou i před načtením se stav hry vynuluje (vynuluj): stav drží autoloady a načtené
# zdroje (.tres), které by jinak zůstaly z předchozí hry (po dohrání, po načtení jiné pozice).
# Jen statické funkce; překryvné obrazovky rámce jsou ve skupině SKUPINA_PREKRYVU.
extends RefCounted

## Skupina překryvných obrazovek (karty, konec kapitoly, titulky), které se při návratu do menu
## nebo při načtení zavřou
const SKUPINA_PREKRYVU := &"prekryv_ramce"
## Místnost s hlavním menu a místnost, kde začíná nová hra (úvod v Rudově bytě)
const MENU := "Menu"
const ZACATEK := "Byt"
const POZIC := 4
const SOUBOR := "user://save_%d.json"
## Verze uložené hry (zapisuje ji Globals.on_save). Starší uložené hry z prototypu (bez verze)
## mají jiné proměnné a Popochiu by je načetl jen napůl, proto se nenačítají.
const VERZE_ULOZENI := 1

const Karta := preload("res://game/obrazovky/karta.gd")


## Nová hra: vynulovat stav a začít úvodem v bytě
static func nova_hra() -> void:
	await vynuluj()
	PopochiuUtils.r.goto_room(ZACATEK)


## Načte uloženou hru z pozice [param pozice] (1–4)
static func nacti(pozice: int) -> void:
	if not nacitelna(pozice):
		Karta.ukaz("ui_hra_nejde_nacist")
		return
	await vynuluj()
	PopochiuUtils.e.game_load_started.connect(_oprav_nactene_stavy, CONNECT_ONE_SHOT)
	PopochiuUtils.e.load_game(pozice)


## Zpátky do hlavního menu (konec kapitoly, volba v nastavení); stav hry zůstane, vynuluje se
## až při nové hře nebo načtení
static func do_menu() -> void:
	_zavri_prekryvy()
	if PopochiuUtils.d.current_dialog:
		PopochiuUtils.d.current_dialog.stop()
	PopochiuUtils.r.goto_room(MENU)


## Pozice s nejnovější načitatelnou uloženou hrou (pro „Pokračovat“), 0 když žádná není
static func posledni_pozice() -> int:
	var nejnovejsi := 0
	var cas := -1
	for i in range(1, POZIC + 1):
		if nacitelna(i):
			var zmena := FileAccess.get_modified_time(SOUBOR % i)
			if zmena > cas:
				cas = zmena
				nejnovejsi = i
	return nejnovejsi


## Uložená hra v pozici [param pozice] existuje a je z této verze hry
static func nacitelna(pozice: int) -> bool:
	if not FileAccess.file_exists(SOUBOR % pozice):
		return false
	var data = JSON.parse_string(FileAccess.get_file_as_string(SOUBOR % pozice))
	if not data is Dictionary:
		return false
	var vlastni = data.get("globals", {}).get("custom_data", {})
	return vlastni is Dictionary and int(vlastni.get("verze_ulozeni", 0)) == VERZE_ULOZENI


## Vynuluje stav hry na začátek: Globals, stavy místností, postav, předmětů a dialogů, inventáře
## všech postav, hraná postava zase Ruda. Vychozí hodnoty se berou z čerstvě načtených .tres
## (bez mezipaměti), takže platí i to, co je nastavené v souborech, ne jen ve skriptech.
static func vynuluj() -> void:
	_zavri_prekryvy()
	if PopochiuUtils.d.current_dialog:
		PopochiuUtils.d.current_dialog.stop()
	PopochiuUtils.i.set_active_item(null)

	# Inventáře všech postav. I.clean_inventory() v Popochiu 2.2.1 odebírá vždy z inventáře hrané
	# postavy, proto ostatní postavy (Ruda v úseku za Báru) potichu bez lišty a hraná postava
	# s lištou (bez animací)
	for nazev: String in PopochiuResources.get_section_keys("characters"):
		var postava: PopochiuCharacter = PopochiuUtils.c.get_character(nazev)
		if is_instance_valid(postava) and postava != PopochiuUtils.c.player:
			PopochiuUtils.i.clean_inventory_bg(postava)
	PopochiuUtils.i.is_restoring = true
	await PopochiuUtils.i.clean_inventory(PopochiuUtils.c.player)
	PopochiuUtils.i.is_restoring = false

	# Hraná postava podle nastavení Popochiu (Ruda); v úseku za Báru to byla Bára
	var hrac: PopochiuCharacter = PopochiuUtils.c.get_character(
		PopochiuResources.get_data_value("setup", "pc", "")
	)
	if PopochiuUtils.c.player != hrac:
		PopochiuUtils.c.player = hrac

	# Globals: hodnoty z nové instance skriptu
	var g: Node = PopochiuUtils.globals
	var cisty: Node = g.get_script().new()
	_zkopiruj(cisty, g)
	cisty.free()

	# Stavy objektů Popochiu (.tres): místnosti, postavy, předměty, dialogy
	for druh in ["rooms", "characters", "inventory_items", "dialogs"]:
		for cesta: String in PopochiuResources.get_section(druh):
			var stav: Resource = load(cesta)
			var cerstvy: Resource = ResourceLoader.load(cesta, "", ResourceLoader.CACHE_MODE_IGNORE)
			_zkopiruj(cerstvy, stav)
			if druh == "rooms":
				# Uložené stavy kulis, aktivních míst a postav v místnosti: prázdné = jako ve scéně
				for kategorie in PopochiuResources.ROOM_CHILDREN:
					(stav.get(kategorie) as Dictionary).clear()
				(stav.get("characters") as Dictionary).clear()
				stav.set("visited_times", 0)
			elif druh == "dialogs":
				_obnov_volby(cerstvy, stav)

	# Zbytky rozehrané akce
	PopochiuUtils.e.clicked = null
	PopochiuUtils.e.loaded_game = {}


#region Private ####################################################################################
## Popochiu 2.2.1 uloží obrys pochozí plochy (Array[PackedVector2Array]) do JSON jako text a při
## návratu do místnosti ho nedokáže převést zpátky (chyba „Unable to convert … PackedVector2Array“).
## Obrysy se za hry nemění, proto se z načtených stavů vyřadí a zůstanou podle scény.
static func _oprav_nactene_stavy() -> void:
	for cesta: String in PopochiuResources.get_section("rooms"):
		var plochy: Dictionary = load(cesta).get("walkable_areas")
		for nazev in plochy:
			(plochy[nazev] as Dictionary).erase("interaction_polygon")


static func _zavri_prekryvy() -> void:
	for n in PopochiuUtils.e.get_tree().get_nodes_in_group(SKUPINA_PREKRYVU):
		n.queue_free()


## Zkopíruje proměnné skriptu ze [param zdroj] do [param cil] (kromě jména a scény objektu)
static func _zkopiruj(zdroj: Object, cil: Object) -> void:
	for p in zdroj.get_script().get_script_property_list():
		if not p.usage & PROPERTY_USAGE_SCRIPT_VARIABLE:
			continue
		if p.name in ["script_name", "scene", "options"]:
			continue
		var hodnota = zdroj.get(p.name)
		if hodnota is Dictionary or hodnota is Array:
			hodnota = hodnota.duplicate(true)
		cil.set(p.name, hodnota)


## Volby dialogu (viditelnost, použití) jako v souboru dialogu
static func _obnov_volby(zdroj: Resource, cil: Resource) -> void:
	for volba in cil.get("options"):
		for puvodni in zdroj.get("options"):
			if puvodni.id == volba.id:
				_zkopiruj(puvodni, volba)
				break


#endregion
