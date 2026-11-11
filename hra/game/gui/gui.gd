# @popochiu-docs-ignore-class
extends "res://addons/popochiu/engine/objects/gui/templates/simple_click_high_res/simple_click_high_res_gui.gd"


const Karta := preload("res://game/obrazovky/karta.gd")
const UkazatelDnu := preload("res://game/gui/ukazatel_dnu.gd")
const Dotyk := preload("res://game/gui/dotyk.gd")
const Vzhled := preload("res://game/gui/vzhled.gd")
const Denik := preload("res://game/obrazovky/denik.gd")
const AktivniMista := preload("res://game/gui/aktivni_mista.gd")
## Klávesy, které drží zvýraznění aktivních míst (D93)
const KLAVESY_MIST := [KEY_SPACE, KEY_TAB]
## Nápověda tlačítek myši pod popiskem: levé tlačítko a co udělá (ikona kurzoru), pravé
## tlačítko a oko (prohlédnout)
const IKONA := "[img=34]res://grafika/gui/ikony/%s.png[/img]"
## Kurzory, které mají vlastní ikonu levého tlačítka; ostatní ukážou ukazující ruku
const IKONY_LEVE := ["talk", "use", "left", "right", "up", "down", "search", "jit"]
## Překryvná okna hry (minihry, karty, menu, titulky): v nich je kurzor vždy šipka
const OKNA := ["res://game/minihry/", "res://game/obrazovky/"]

## Ukazatel dnů do dopadu komety (I6) a dotykové ovládání (podržení, nabídka po ťuknutí, D43)
var ukazatel_dnu: Control
var dotyk: Node
var _otevrena_okna := 0
var _mista: Control
var _denik_tlacitko: BaseButton
var _lista_pripnuta := false


#region Godot ######################################################################################
func _ready() -> void:
	super()
	# Na dotykovém zařízení je ukazatel myši schovaný pod prstem a jen překáží (krok K8)
	if DisplayServer.is_touchscreen_available():
		Cursor.visible = false
	ukazatel_dnu = UkazatelDnu.new()
	add_child(ukazatel_dnu)
	dotyk = Dotyk.new()
	dotyk.name = "Dotyk"
	add_child(dotyk)
	# Malovaný vzhled lišty a oken šablony (D89); okna se dolaďují při každém otevření
	Vzhled.lista($SimpleClickBarHighRes)
	for okno: Control in get_tree().get_nodes_in_group("popochiu_gui_popup"):
		Vzhled.okno(okno)
		okno.visibility_changed.connect(Vzhled.okno.bind(okno))
	get_tree().node_added.connect(_na_novy_uzel)
	# Kurzor „jít“ (šlápoty) pro východy ze scény: schody, výtah, dveře (D93)
	var snimky: SpriteFrames = Cursor.main_cursor.sprite_frames
	if not snimky.has_animation(&"jit"):
		snimky.add_animation(&"jit")
		snimky.add_frame(&"jit", load("res://grafika/gui/ikony/jit.png"))
	_denik_tlacitko = Vzhled.tlacitko_deniku($SimpleClickBarHighRes, Denik.prepni)
	_mista = AktivniMista.new()
	_mista.name = "AktivniMista"
	add_child(_mista)


# V okně minihry nebo na kartě se čeká na klepnutí hráče, i když je hra pod ním zablokovaná:
# přesýpací hodiny by tam mátly, kurzor je šipka
func _process(_delta: float) -> void:
	if _otevrena_okna > 0 and Cursor.main_cursor.animation != &"gui":
		Cursor.show_cursor("gui", true)
	if _denik_tlacitko:
		_denik_tlacitko.visible = _denik_dostupny()
	if not _klavesy_povolene():
		_mista.skryj()
	_postavy_navrch()


# Popochiu při překryvu postavy a aktivního místa rozhoduje podle pořadí uzlu v rodiči, takže
# postava stojící před stánkem nebo plotem nešla oslovit: klepnutí bralo místo za ní.
# Tady se postava pod kurzorem vždy posune navrch fronty najetých míst (E.hovered = poslední).
func _postavy_navrch() -> void:
	var fronta: Array = E._hovered_queue
	if fronta.size() < 2 or not is_instance_valid(fronta[-1]) or fronta[-1] is PopochiuCharacter:
		return
	var postavy := fronta.filter(func(n: Variant) -> bool:
		return is_instance_valid(n) and n is PopochiuCharacter)
	if postavy.is_empty():
		return
	for postava in postavy:
		fronta.erase(postava)
		fronta.append(postava)
	G.mouse_entered_clickable.emit(fronta[-1])


# Klávesové zkratky (D93): I připne nebo schová lištu s inventářem, mezerník nebo tabulátor
# po dobu držení zvýrazní aktivní místa, D (J) otevře deník. Fungují jen ve hře, když hráč může
# hrát: ne v menu, při řeči, v dialogu, v okně minihry ani v nastavení.
func _unhandled_key_input(udalost: InputEvent) -> void:
	if not udalost is InputEventKey or udalost.is_echo():
		return
	if udalost.keycode in KLAVESY_MIST:
		if udalost.pressed and _klavesy_povolene():
			_mista.ukaz(_ikona_leve)
		elif not udalost.pressed:
			_mista.skryj()
		get_viewport().set_input_as_handled()
		return
	if not udalost.pressed or not _klavesy_povolene():
		return
	match udalost.keycode:
		KEY_I:
			_prepni_listu()
		KEY_D, KEY_J:
			if _denik_dostupny():
				Denik.prepni()
		_:
			return
	get_viewport().set_input_as_handled()


#endregion

#region Virtual ####################################################################################
# Called when the GUI is blocked and should not handle input events.
func _on_blocked(props := { blocking = true }) -> void:
	super(props)


# Called when the GUI is unblocked and can handle input events again.
func _on_unblocked() -> void:
	super()
	_kurzor_vychodu()


# Called to hide the GUI.
# Hlavní menu (I6) skryje lištu s inventářem, popisky a ukazatel dnů; okna (nastavení, načtení)
# zůstanou funkční.
func _on_hidden() -> void:
	super()
	_ukaz_hru(false)


# Called to show the GUI.
func _on_shown() -> void:
	super()
	_ukaz_hru(true)


# Called when `G.show_system_text()` is triggered.
# `super()` shows `msg` in the SystemText component. Override or extend if needed.
func _on_system_text_shown(msg: String) -> void:
	super(msg)


# Called when the player closes the SystemText component (for example by
# clicking the screen anywhere).
func _on_system_text_hidden() -> void:
	super()


# Called when the mouse enters (hovers) a `clickable`.
# Popisek je v jazyce hry i s vybraným předmětem (šablona ho skládala anglicky z klíčů textů)
# a bez vybraného předmětu pod ním ukáže, co dělá levé a co pravé tlačítko myši.
func _on_mouse_entered_clickable(clickable: PopochiuClickable) -> void:
	if G.is_blocked: return
	if not (I.active or is_showing_dialog_line):
		Cursor.show_cursor(_ikona_leve(clickable))
	if I.active:
		G.show_hover_text("ui_pouzit_na", [I.active.get_description(), clickable.get_description()])
	else:
		_popisek_s_napovedou(clickable.description, _ikona_leve(clickable))


# Called when the mouse exits a `clickable`.
func _on_mouse_exited_clickable(clickable: PopochiuClickable) -> void:
	super(clickable)


# Called when the mouse enters (hovers) an `inventory_item`.
func _on_mouse_entered_inventory_item(inventory_item: PopochiuInventoryItem) -> void:
	if G.is_blocked: return
	if not I.active:
		Cursor.show_cursor(Cursor.get_type_name(inventory_item.cursor))
		_popisek_s_napovedou(inventory_item.description, "active")
	elif I.active != inventory_item:
		G.show_hover_text("ui_pouzit_na", [I.active.get_description(), inventory_item.get_description()])
	else:
		G.show_hover_text(inventory_item.description)


# Called when the mouse exits an `inventory_item`.
func _on_mouse_exited_inventory_item(inventory_item: PopochiuInventoryItem) -> void:
	super(inventory_item)


# Called when a dialog line is spoken by a `PopochiuCharacter` (i.e. when
# `PopochiuCharacter.say()` is called).
func _on_dialog_line_started() -> void:
	super()


# Called when a dialog line finishes (for example after the player clicks the
# screen to dismiss it).
func _on_dialog_line_finished() -> void:
	super()
	_kurzor_vychodu()


# Called when a `dialog` starts (after calling `PopochiuDialog.start()`).
func _on_dialog_started(dialog: PopochiuDialog) -> void:
	super(dialog)


# Called when a `dialog` finishes (after calling `PopochiuDialog.stop()`).
func _on_dialog_finished(dialog: PopochiuDialog) -> void:
	super(dialog)


# Called when an inventory `item` is selected (for example, by clicking it).
func _on_inventory_item_selected(item: PopochiuInventoryItem) -> void:
	super(item)


# Uložení a načtení hry (I6): místo anglických hlášek šablony krátká karta v jazyce hry
func _on_game_saved() -> void:
	Karta.ukaz("ui_hra_ulozena")


func _on_game_loaded(_loaded_game: Dictionary) -> void:
	await Karta.ukaz("ui_hra_nactena")
	G.load_feedback_finished.emit()


# Called by `PopochiuCursor` to get the name of the cursor texture to show.
func _get_cursor_name() -> String:
	return super()


#endregion


#region Private ####################################################################################
# Popisek při najetí a pod ním nápověda: levé tlačítko = ikona akce, pravé = oko. Na dotykovém
# zařízení myš není, tam nápovědu nahrazuje podržení prstu nebo nabídka (dotyk.gd).
func _popisek_s_napovedou(popis: String, kurzor: String) -> void:
	G.show_hover_text(popis)
	if DisplayServer.is_touchscreen_available():
		return
	var stitek := get_node_or_null("HoverTextHighRes/RichTextLabel") as RichTextLabel
	if stitek == null:
		return
	var leva: String = kurzor if kurzor in IKONY_LEVE else "active"
	stitek.text = "[center]%s\n%s%s      %s%s[/center]" % [tr(popis), IKONA % "mys_leva",
		IKONA % leva, IKONA % "mys_prava", IKONA % "look"]


## Ikona (a kurzor) toho, co s aktivním místem udělá levé tlačítko: východ ze scény má šlápoty,
## jinak rozhoduje typ kurzoru nastavený u místa (ruka, bublina řeči …)
func _ikona_leve(clickable: Node) -> String:
	if clickable.get_meta("vychod", false):
		return "jit"
	var kurzor := Cursor.get_type_name(clickable.cursor)
	return kurzor if kurzor in IKONY_LEVE else "active"


# Šablona po řeči a po odblokování vrací kurzor podle typu místa; nad východem patří šlápoty
func _kurzor_vychodu() -> void:
	if is_instance_valid(E.hovered) and not I.active and not G.is_blocked \
			and not is_showing_dialog_line and E.hovered.get_meta("vychod", false):
		Cursor.show_cursor("jit")


func _klavesy_povolene() -> bool:
	if G.is_blocked or is_showing_dialog_line or _otevrena_okna > 0 or D.current_dialog:
		return false
	if not is_instance_valid(R.current) or R.current.script_name == "Menu":
		return false
	for okno: Control in get_tree().get_nodes_in_group("popochiu_gui_popup"):
		if okno.visible:
			return false
	return true


# Deník má co ukázat, až Pembok na náměstí vysvětlí úkol kapitoly (stejně jako ukazatel dnů)
func _denik_dostupny() -> bool:
	return is_instance_valid(R.current) and not R.current.script_name in ["Menu", "Byt"] \
		and R.Namesti.state.pembok_otevren


# Lišta s inventářem jinak vyjíždí jen po najetí myší k hornímu okraji; klávesa I ji připne
func _prepni_listu() -> void:
	var lista := $SimpleClickBarHighRes
	if lista.always_visible:
		return
	_lista_pripnuta = not _lista_pripnuta
	lista.set_process_input(not _lista_pripnuta)
	if _lista_pripnuta:
		lista._open()
	else:
		lista._close()


func _na_novy_uzel(uzel: Node) -> void:
	if not uzel is CanvasLayer or uzel.get_script() == null:
		return
	var cesta := String(uzel.get_script().resource_path)
	if not OKNA.any(func(zacatek: String) -> bool: return cesta.begins_with(zacatek)):
		return
	_otevrena_okna += 1
	uzel.tree_exited.connect(_okno_zavreno)


# Po zavření okna se vrátí kurzor, který patří ke stavu hry (hodiny, vybraný předmět, šipka)
func _okno_zavreno() -> void:
	_otevrena_okna -= 1
	if _otevrena_okna > 0:
		return
	if G.is_blocked:
		Cursor.show_cursor("wait", true)
	elif I.active:
		Cursor.hide_main_cursor()
		Cursor.show_secondary_cursor()
	else:
		Cursor.show_cursor(get_cursor_name())


func _ukaz_hru(ukazat: bool) -> void:
	for nazev in ["SimpleClickBarHighRes", "HoverTextHighRes"]:
		var n := get_node_or_null(nazev)
		if n:
			n.visible = ukazat
	if ukazatel_dnu:
		ukazatel_dnu.skryto = not ukazat


#endregion
