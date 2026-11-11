# Zvýraznění aktivních míst (D93): dokud hráč drží mezerník nebo tabulátor, nad každým místem,
# postavou a věcí, se kterou jde něco dělat, svítí žlutá kulatá značka s ikonou toho, co udělá
# levé tlačítko (ruka, bublina řeči, šlápoty u východu), a pod ní název. Značky lehce pulzují,
# aby byly vidět i na pestrém pozadí. Po puštění klávesy zmizí.
# Uzel se přidá do rozhraní (gui.gd) přes celou obrazovku a klepnutí propouští.
extends Control

const ZNACKA := preload("res://grafika/gui/ikony/znacka.png")
const IKONA := "res://grafika/gui/ikony/%s.png"
const OBRYS := Color(0.16, 0.09, 0.04)
## Výška značky s názvem pod ní: o tolik musí být středy značek svisle od sebe
const VYSKA_ZNACKY := 98.0

var _ukazane := false


func _ready() -> void:
	set_anchors_preset(Control.PRESET_FULL_RECT)
	mouse_filter = Control.MOUSE_FILTER_IGNORE
	theme = load("res://game/gui/resources/gui_theme.tres")


#region Public #####################################################################################
## Ukáže značky; [param ikona_pro] vrátí pro aktivní místo název ikony levého tlačítka
func ukaz(ikona_pro: Callable) -> void:
	if _ukazane:
		return
	_ukazane = true
	var na_obrazovku := get_viewport().get_canvas_transform()
	var obrazovka := get_viewport_rect().grow(-20)
	var mista: Array[Dictionary] = []
	for misto in get_tree().get_nodes_in_group("PopochiuClickable"):
		if not _je_aktivni(misto):
			continue
		var bod: Vector2 = na_obrazovku * _stred(misto)
		if not obrazovka.has_point(bod):
			continue
		mista.append({stred = bod, kde = bod, ikona = ikona_pro.call(misto),
			nazev = misto.get_description()})
	_rozestup(mista, obrazovka)
	for m in mista:
		add_child(_znacka(m.kde, m.stred, m.ikona, m.nazev))


func skryj() -> void:
	if not _ukazane:
		return
	_ukazane = false
	for dite in get_children():
		dite.queue_free()


#endregion

#region Private ####################################################################################
func _je_aktivni(misto: Node) -> bool:
	if not misto is PopochiuClickable or not misto.is_visible_in_tree() or not misto.clickable:
		return false
	if misto == C.player or String(misto.description).is_empty():
		return false
	return misto.get_node_or_null("InteractionPolygon") != null


# Střed obrysu aktivního místa ve světě (obrys může být posunutý i zmenšený s postavou)
func _stred(misto: Node) -> Vector2:
	var obrys: CollisionPolygon2D = misto.get_node("InteractionPolygon")
	var soucet := Vector2.ZERO
	for bod in obrys.polygon:
		soucet += bod
	return obrys.global_transform * (soucet / maxf(obrys.polygon.size(), 1))


# Místa, která leží těsně u sebe (poduška na lavičce), by měla značky i názvy přes sebe.
# Takové dvojice se od sebe odsunou svisle, dokud se nepřekrývají; odsunutou značku pak
# spojuje čárka se skutečným místem.
func _rozestup(mista: Array[Dictionary], obrazovka: Rect2) -> void:
	for _kolo in 16:
		var hnuto := false
		for i in mista.size():
			for j in range(i + 1, mista.size()):
				var a: Dictionary = mista[i]
				var b: Dictionary = mista[j]
				var d: Vector2 = b.kde - a.kde
				# šířka podle delšího z názvů (popisek je vystředěný pod značkou)
				var sirka := 44.0 + 7.5 * (String(a.nazev).length() + String(b.nazev).length())
				if absf(d.x) >= sirka or absf(d.y) >= VYSKA_ZNACKY:
					continue
				var chybi := (VYSKA_ZNACKY - absf(d.y)) / 2.0 + 1.0
				var smer := 1.0 if d.y >= 0.0 else -1.0
				a.kde.y = clampf(a.kde.y - smer * chybi, obrazovka.position.y + 30, obrazovka.end.y - 70)
				b.kde.y = clampf(b.kde.y + smer * chybi, obrazovka.position.y + 30, obrazovka.end.y - 70)
				hnuto = true
		if not hnuto:
			break


func _znacka(bod: Vector2, stred: Vector2, ikona: String, nazev: String) -> Control:
	var z := Control.new()
	z.position = bod
	z.mouse_filter = Control.MOUSE_FILTER_IGNORE
	if bod.distance_to(stred) > 6.0:
		# značka je odsunutá: čárka a tečka ukážou, ke kterému místu patří
		var cara := Line2D.new()
		cara.points = PackedVector2Array([Vector2.ZERO, stred - bod])
		cara.width = 4.0
		cara.default_color = OBRYS
		z.add_child(cara)
		var svetla := Line2D.new()
		svetla.points = cara.points
		svetla.width = 2.0
		svetla.default_color = Color("e9b52a")
		z.add_child(svetla)
	var kruh := TextureRect.new()
	kruh.texture = ZNACKA
	kruh.position = -ZNACKA.get_size() / 2.0
	kruh.pivot_offset = ZNACKA.get_size() / 2.0
	kruh.mouse_filter = Control.MOUSE_FILTER_IGNORE
	z.add_child(kruh)
	var obrazek := TextureRect.new()
	obrazek.texture = load(IKONA % ikona)
	obrazek.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
	obrazek.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
	obrazek.size = Vector2(42, 42)
	obrazek.position = (ZNACKA.get_size() - obrazek.size) / 2.0
	obrazek.mouse_filter = Control.MOUSE_FILTER_IGNORE
	kruh.add_child(obrazek)
	var popisek := Label.new()
	popisek.auto_translate_mode = Node.AUTO_TRANSLATE_MODE_DISABLED
	popisek.text = nazev
	popisek.add_theme_font_size_override("font_size", 26)
	popisek.add_theme_color_override("font_color", Color.WHITE)
	popisek.add_theme_color_override("font_outline_color", OBRYS)
	popisek.add_theme_constant_override("outline_size", 9)
	popisek.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	popisek.size = Vector2(320, 34)
	popisek.position = Vector2(-160, 30)
	popisek.mouse_filter = Control.MOUSE_FILTER_IGNORE
	z.add_child(popisek)
	# Pulzování: každá značka začne v jiné fázi, ať neblikají všechny naráz
	var t := kruh.create_tween().set_loops()
	t.tween_property(kruh, "scale", Vector2(1.14, 1.14), 0.45).set_trans(Tween.TRANS_SINE)
	t.tween_property(kruh, "scale", Vector2.ONE, 0.45).set_trans(Tween.TRANS_SINE)
	t.custom_step(randf() * 0.9)
	return z


#endregion
