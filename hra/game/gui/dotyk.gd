# Dotykové ovládání (R3, D43; I6): podržení prstu = prohlédnout (jako pravé tlačítko myši),
# v nastavení jde přepnout na nabídku po ťuknutí (oko = prohlédnout, ruka = použít).
# Dotyk přichází od Godotu jako emulovaná myš (zařízení InputEvent.DEVICE_ID_EMULATION). Stisk se
# tu zadrží, dokud se nepozná, co prst dělá:
#   - pustí se do DOBA_PODRZENI   → obyčejné klepnutí (levé tlačítko) na stejném místě,
#   - drží se déle                → prohlédnout (pravé tlačítko; na předmětu v inventáři taky),
#   - posune se o víc než POSUN    → tažení (posuvník hlasitosti), stisk se pustí hned dál.
# S nabídkou po ťuknutí otevře ťuknutí na aktivní místo nebo postavu ve scéně malou nabídku;
# jinam (chůze, lišta, okna, rozhovor, vybraný předmět) jde ťuknutí rovnou jako klepnutí.
# Myš se nemění: zařízení myši tudy projde bez zdržení.
extends Node

const Styl := preload("res://game/obrazovky/styl.gd")
const DOBA_PODRZENI := 0.5
const POSUN := 24.0
const SOUBOR := "user://nastaveni.cfg"

## Nastavení D43: true = nabídka po ťuknutí, false = podržení prstu (výchozí)
static var nabidka_po_tuknuti := false

var _drzi := false
var _stisk: InputEventMouseButton
var _cas := 0.0
var _vyrizeno := false
var _nabidka: CanvasLayer


func _ready() -> void:
	var cfg := ConfigFile.new()
	if cfg.load(SOUBOR) == OK:
		nabidka_po_tuknuti = cfg.get_value("ovladani", "nabidka_po_tuknuti", false)


func _input(udalost: InputEvent) -> void:
	if not udalost is InputEventMouse or udalost.device != InputEvent.DEVICE_ID_EMULATION:
		return
	if is_instance_valid(_nabidka):
		# Nabídka je otevřená: ťuknutí patří jejím tlačítkům
		return
	if udalost is InputEventMouseButton and udalost.button_index == MOUSE_BUTTON_LEFT:
		get_viewport().set_input_as_handled()
		if udalost.pressed:
			_drzi = true
			_vyrizeno = false
			_cas = 0.0
			_stisk = udalost.duplicate()
		elif _drzi:
			_drzi = false
			if not _vyrizeno:
				_tuknuti()
	elif udalost is InputEventMouseMotion and _drzi and not _vyrizeno:
		if udalost.position.distance_to(_stisk.position) > POSUN:
			# Tažení: stisk projde hned, další pohyb i puštění prstu projdou samy
			_drzi = false
			_posli(_stisk.button_index, true)


func _process(delta: float) -> void:
	if not _drzi or _vyrizeno:
		return
	_cas += delta
	if _cas >= DOBA_PODRZENI:
		_vyrizeno = true
		_klepni(MOUSE_BUTTON_RIGHT)


#region Public #####################################################################################
## Uloží volbu D43 (nastavení, okno SimpleClickSettings)
static func nastav_nabidku(zapnout: bool) -> void:
	nabidka_po_tuknuti = zapnout
	var cfg := ConfigFile.new()
	cfg.load(SOUBOR)
	cfg.set_value("ovladani", "nabidka_po_tuknuti", zapnout)
	cfg.save(SOUBOR)


#endregion

#region Private ####################################################################################
func _tuknuti() -> void:
	if nabidka_po_tuknuti and _ma_nabidku():
		_otevri_nabidku()
	else:
		_klepni(MOUSE_BUTTON_LEFT)


## Klepnutí tlačítkem [param tlacitko] na místě zadrženého stisku: nejdřív pohyb (Popochiu pozná,
## nad čím prst je), pak stisk a puštění. Události jdou rovnou do okna jako od myši.
func _klepni(tlacitko: MouseButton) -> void:
	var pohyb := InputEventMouseMotion.new()
	pohyb.position = _stisk.position
	pohyb.global_position = _stisk.global_position
	get_viewport().push_input(pohyb, true)
	await get_tree().physics_frame
	await get_tree().physics_frame
	_posli(tlacitko, true)
	await get_tree().process_frame
	_posli(tlacitko, false)


func _posli(tlacitko: MouseButton, stisknuto: bool) -> void:
	var u: InputEventMouseButton = _stisk.duplicate()
	u.device = 0
	u.button_index = tlacitko
	u.pressed = stisknuto
	u.button_mask = (MOUSE_BUTTON_MASK_LEFT if tlacitko == MOUSE_BUTTON_LEFT \
		else MOUSE_BUTTON_MASK_RIGHT) if stisknuto else 0
	get_viewport().push_input(u, true)


## Nabídka má smysl jen nad aktivním místem nebo postavou ve scéně, když se hraje (ne v rozhovoru,
## v okně, s vybraným předmětem ani nad lištou s inventářem)
func _ma_nabidku() -> bool:
	if G.is_blocked or D.current_dialog or I.active or not E.in_room:
		return false
	var lista := G.gui.get_node_or_null("SimpleClickBarHighRes/%PanelContainer") as Control
	if lista and lista.is_visible_in_tree() and lista.get_global_rect().has_point(_stisk.position):
		return false
	var dotaz := PhysicsPointQueryParameters2D.new()
	dotaz.position = get_viewport().get_canvas_transform().affine_inverse() * _stisk.position
	dotaz.collide_with_areas = true
	dotaz.collide_with_bodies = false
	for zasah in get_viewport().world_2d.direct_space_state.intersect_point(dotaz, 16):
		var c = zasah.collider
		if c is PopochiuClickable and c.clickable and c.is_visible_in_tree() \
				and c != C.player:
			return true
	return false


func _otevri_nabidku() -> void:
	_nabidka = CanvasLayer.new()
	_nabidka.layer = 11
	add_child(_nabidka)
	var koren := Styl.koren()
	koren.gui_input.connect(func(u: InputEvent):
		if u is InputEventMouseButton and u.pressed:
			_zavri_nabidku())
	_nabidka.add_child(koren)
	var radek := HBoxContainer.new()
	radek.add_theme_constant_override("separation", 18)
	koren.add_child(radek)
	for volba in [["ui_prohlednout", MOUSE_BUTTON_RIGHT, "oko"], ["ui_pouzit", MOUSE_BUTTON_LEFT, "ruka"]]:
		var b := Styl.tlacitko(volba[0], 30, Styl.PAPIR, false)
		b.custom_minimum_size = Vector2(150, 150)
		b.vertical_icon_alignment = VERTICAL_ALIGNMENT_TOP
		b.icon_alignment = HORIZONTAL_ALIGNMENT_CENTER
		b.icon = _ikona(volba[2])
		b.pressed.connect(_vyber.bind(volba[1]))
		radek.add_child(b)
	# Nabídka nad místem ťuknutí, celá na obrazovce
	var velikost := radek.get_combined_minimum_size()
	var obrazovka := get_viewport().get_visible_rect().size
	radek.position = (_stisk.position - Vector2(velikost.x / 2.0, velikost.y + 40)).clamp(
		Vector2(10, 10), obrazovka - velikost - Vector2(10, 10))


func _zavri_nabidku() -> void:
	if is_instance_valid(_nabidka):
		_nabidka.queue_free()
	_nabidka = null


func _vyber(tlacitko: MouseButton) -> void:
	_zavri_nabidku()
	await get_tree().process_frame
	_klepni(tlacitko)


## Jednoduchá ikona oka nebo ruky (obrysy v barvě stylové bible)
func _ikona(druh: String) -> Texture2D:
	var obraz := Image.create(72, 56, false, Image.FORMAT_RGBA8)
	obraz.fill(Color(0, 0, 0, 0))
	var barva := Styl.OBRYS
	if druh == "oko":
		for x in 72:
			for y in 56:
				var p := Vector2((x - 36) / 32.0, (y - 28) / 18.0)
				var d := p.length()
				if absf(d - 1.0) < 0.12 or Vector2(x - 36, y - 28).length() < 9:
					obraz.set_pixel(x, y, barva)
	else:
		# Dlaň a čtyři prsty, palec do strany
		obraz.fill_rect(Rect2i(22, 26, 30, 26), barva)
		for i in 4:
			obraz.fill_rect(Rect2i(22 + i * 8, 6 + absi(i - 1) * 3, 6, 24), barva)
		obraz.fill_rect(Rect2i(10, 30, 14, 7), barva)
	return ImageTexture.create_from_image(obraz)


#endregion
