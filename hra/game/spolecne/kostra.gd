# Postava složená z částí (hlava, trup, paže, předloktí, stehno, lýtko, bota) s klouby a procedurální
# animací chůze a stání. Pohled z boku, postava kreslená čelem doprava; doleva se zrcadlí.
# Části a body kloubů popisuje slovník předaný do sestav() (viz character_ruda.gd).
# Kloub = bod v pixelech obrázku části; obrázky se kladou tak, aby kloub ležel v místě otáčení.
extends Node2D

## Úhel švihu stehen při chůzi (rad)
@export var svih_nohou := 0.42
## Největší pokrčení kolene ve fázi švihu (rad)
@export var pokrceni_kolene := 0.85
## Úhel švihu paží (rad)
@export var svih_rukou := 0.32
## Předklon trupu při chůzi (rad)
@export var predklon := 0.05

var _faze := 0.0
var _chuze := 0.0          # 0 = stojí, 1 = jde (plynulý přechod)
var _cas := 0.0
var _delka_nohy := 0.0
var _klid := {}            # klidové úhly kloubů, aby noha a paže v klidu visely svisle

var _telo: Node2D
var _hlava: Node2D
var _nohy := []            # [{kycel, koleno, kotnik}] zadní, přední
var _ruce := []            # [{rameno, loket}] zadní, přední


## Postaví kostru podle popisu částí. Volá se jednou po vytvoření uzlu.
func sestav(popis: Dictionary) -> void:
	scale = Vector2.ONE * popis.meritko
	var c: Dictionary = popis.casti
	var trup: Dictionary = c.trup

	_telo = Node2D.new()
	_telo.name = "Telo"
	add_child(_telo)

	# Pořadí kreslení: zadní paže, zadní noha, hlava, trup, přední noha, přední paže
	_ruce.append(_ruka(c, popis.ruka_zadni, trup.rameno, true))
	_nohy.append(_noha(c, trup.kycel + Vector2(-12, -4), true))
	_hlava = _kloub(_telo, trup.krk - trup.kycel, c.hlava, "krk")
	_dil(_telo, c.trup, "kycel", "Trup")
	_nohy.append(_noha(c, trup.kycel + Vector2(10, 0), false))
	_ruce.append(_ruka(c, popis.ruka_predni, trup.rameno, false))

	_delka_nohy = (c.stehno.koleno - c.stehno.kycel).length() + (c.lytko.kotnik - c.lytko.koleno).length()
	# Chodidla mají stát na zemi (y = 0 uzlu)
	_telo.position.y = -(_delka_nohy + c.bota.obrazek.get_height() - c.bota.kotnik.y - 6)
	_klid.stehno = -atan2(c.stehno.koleno.x - c.stehno.kycel.x, c.stehno.koleno.y - c.stehno.kycel.y)
	_klid.lytko = -atan2(c.lytko.kotnik.x - c.lytko.koleno.x, c.lytko.kotnik.y - c.lytko.koleno.y)
	_klid.paze = -atan2(c.paze.loket.x - c.paze.rameno.x, c.paze.loket.y - c.paze.rameno.y)
	_klid.telo_y = _telo.position.y
	_animuj(0.0)


## Posune fázi chůze o ušlou vzdálenost (v pixelech kostry) a nastaví, jestli postava jde
func posun(usla: float, jde: bool, delta: float) -> void:
	_cas += delta
	_chuze = move_toward(_chuze, 1.0 if jde else 0.0, delta * 5.0)
	# Jeden krok = vzdálenost, kterou urazí chodidlo při švihu stehna tam a zpět
	var krok := 2.0 * _delka_nohy * sin(svih_nohou)
	_faze = fmod(_faze + usla / (2.0 * krok) * TAU, TAU)
	if not jde and _chuze <= 0.0:
		_faze = lerp_angle(_faze, 0.0, delta * 4.0)
	_animuj(_faze)


func _animuj(f: float) -> void:
	var k := _chuze
	for i in 2:
		# Zadní a přední noha jsou v protifázi; kladný úhel stehna = noha vzadu
		var fn := f + PI * i
		var stehno := svih_nohou * sin(fn) * k
		# Koleno se pokrčí ve fázi švihu dopředu (stehno se pohybuje dopředu, cos < 0)
		var koleno := pokrceni_kolene * pow(maxf(0.0, -cos(fn)), 1.6) * k + 0.06 * k
		_nohy[i].kycel.rotation = _klid.stehno + stehno
		_nohy[i].koleno.rotation = _klid.lytko - _klid.stehno + koleno
		# Chodidlo zůstává zhruba vodorovně, na konci kroku se odvíjí přes špičku
		_nohy[i].kotnik.rotation = -(stehno + koleno) - _klid.lytko + 0.35 * maxf(0.0, sin(fn)) * k
	# Tělo klesá, když jsou nohy rozkročené, a stoupá, když se míjejí
	var pokles := _delka_nohy * (1.0 - cos(svih_nohou * absf(sin(f)))) * k
	var dech := sin(_cas * 2.2) * 3.0 * (1.0 - k)
	_telo.position.y = _klid.telo_y + pokles + dech
	_telo.rotation = predklon * k + 0.015 * sin(2.0 * f) * k
	# Paže jdou proti nohám na stejné straně; zadní paže = proti přední noze
	for i in 2:
		var fr := f + PI * (1 - i)
		_ruce[i].rameno.rotation = _klid.paze + svih_rukou * sin(fr) * k + 0.03 * sin(_cas * 2.2) * (1.0 - k)
		_ruce[i].loket.rotation = -0.12 * sin(fr - 0.6) * k
	_hlava.rotation = -predklon * 0.6 * k + 0.035 * sin(2.0 * f - 0.7) * k + 0.02 * sin(_cas * 1.3) * (1.0 - k)


func _noha(c: Dictionary, kycel: Vector2, zadni: bool) -> Dictionary:
	var stehno := _kloub(_telo, kycel - c.trup.kycel, c.stehno, "kycel")
	var lytko := _kloub(stehno, c.stehno.koleno - c.stehno.kycel, c.lytko, "koleno")
	var bota := _kloub(lytko, c.lytko.kotnik - c.lytko.koleno, c.bota, "kotnik")
	if zadni:
		stehno.modulate = Color(0.78, 0.74, 0.72)
	return {kycel = stehno, koleno = lytko, kotnik = bota}


func _ruka(c: Dictionary, predlokti: String, rameno: Vector2, zadni: bool) -> Dictionary:
	var paze := _kloub(_telo, rameno - c.trup.kycel + (Vector2(10, 0) if zadni else Vector2.ZERO), c.paze, "rameno")
	var loket := _kloub(paze, c.paze.loket - c.paze.rameno, c[predlokti], "loket")
	if zadni:
		paze.modulate = Color(0.78, 0.74, 0.72)
	return {rameno = paze, loket = loket}


# Kloub: uzel v místě otáčení s obrázkem části posunutým tak, aby bod `bod` ležel v počátku
func _kloub(rodic: Node2D, kde: Vector2, cast: Dictionary, bod: String) -> Node2D:
	var kloub := Node2D.new()
	kloub.position = kde
	rodic.add_child(kloub)
	_dil(kloub, cast, bod, "Obrazek")
	return kloub


func _dil(rodic: Node2D, cast: Dictionary, bod: String, jmeno: String) -> Sprite2D:
	var s := Sprite2D.new()
	s.name = jmeno
	s.texture = cast.obrazek
	s.centered = false
	s.offset = -cast[bod]
	rodic.add_child(s)
	return s
