# Záběr kamery u místností na jednu obrazovku (F0/R1): pozadí je širší než základní rozlišení
# (19,5:9 proti 3:2) a důležitý obsah leží v pásu 3:2 uprostřed. Kamera stojí uprostřed místnosti
# a na širší obrazovce ukáže víc z okrajů pozadí, místo šedých pruhů. Bez tohohle by kamera
# Popochiu jezdila za hráčem, jakmile je pozadí širší než obrazovka.
# Místnosti širší než obrazovka (posuvné, width > 1536) řídí kamera Popochiu: jede za hráčem
# v mezích pozadí (pozadí musí mít střed na x = 768 jako ostatní). Tady se jí jen přidá volné
# pásmo a plynulý dojezd (D96).
extends Node

const ZAKLAD := Vector2(1536, 1024)
## Posuvná místnost: jak velká část šířky obrazovky kolem středu je volné pásmo (0–1) a jak
## rychle kamera dojíždí za postavou
const VOLNE_PASMO := 0.3
const RYCHLOST_DOJEZDU := 3.5

var _mistnost := ""


func _ready() -> void:
	# Za okrajem pozadí (obrazovka širší než 19,5:9) je černá, ne šedá
	RenderingServer.set_default_clear_color(Color.BLACK)


func _process(_delta: float) -> void:
	var r = get_node("/root/R")
	var e = get_node("/root/E")
	if not is_instance_valid(r.current) or not is_instance_valid(e.camera):
		return
	var posuvna: bool = r.current.width > ZAKLAD.x
	_nastav_posouvani(e.camera, posuvna, r.current.script_name)
	if posuvna:
		return
	var viditelne := get_viewport().get_visible_rect().size
	var stred := ZAKLAD / 2.0
	# Meze přesně o velikosti obrazovky: kamera nemá kam ujet a záběr zůstane uprostřed
	e.camera.limit_left = int(stred.x - viditelne.x / 2.0)
	e.camera.limit_right = int(stred.x + viditelne.x / 2.0)
	e.camera.limit_top = int(stred.y - viditelne.y / 2.0)
	e.camera.limit_bottom = int(stred.y + viditelne.y / 2.0)


# Posuvná místnost (D96, náměstí): kamera Popochiu sedí přesně na hráči, takže by se obraz hýbal
# při každém kroku. Proto má kamera volné pásmo uprostřed (obraz se pohne, až když se postava
# přiblíží k okraji) a dojíždí plynule. Při vstupu do místnosti skočí rovnou na místo.
func _nastav_posouvani(kamera: Camera2D, posuvna: bool, mistnost: String) -> void:
	kamera.drag_horizontal_enabled = posuvna
	kamera.position_smoothing_enabled = posuvna
	if posuvna:
		kamera.drag_left_margin = VOLNE_PASMO
		kamera.drag_right_margin = VOLNE_PASMO
		kamera.position_smoothing_speed = RYCHLOST_DOJEZDU
	if mistnost != _mistnost:
		_mistnost = mistnost
		# až kamera v tomto snímku převezme polohu hráče
		kamera.reset_smoothing.call_deferred()
