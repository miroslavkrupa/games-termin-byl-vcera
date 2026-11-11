# @popochiu-docs-ignore-class
@tool
extends PopochiuCharacter
# Postava animovaná kreslenými fázemi (D40, D41): společný základ pro Rudu a Báru.
# Sady fází jsou v grafika/postavy/<postava>_<sada>/ (faze_NN.png a faze.json). U Rudy vznikají
# z listů od ChatGPT nástrojem nastroje/zpracuj_animace.sh, u Báry z listů přes API nástrojem
# tools/grafika/zpracuj_chuzi.sh (D89). Fáze bokem jsou kreslené doprava, doleva se zrcadlí.
#
# Potomek přepíše _nastav_animace() a nastaví v ní proměnné níže (aspoň vzor_sad).
# Postava nemusí mít všechny sady:
# - bez sad stání a mluvení zepředu se ukáže klidový obrázek ze scény (Sprite2D), při řeči
#   s fázemi úst (usta_nazev, game/spolecne/usta.gd),
# - bez stání bokem a zezadu se ukáže nehybná fáze chůze,
# - bez sad akcí animuj_akci() nic neudělá.

const Usta := preload("res://game/spolecne/usta.gd")
const NAZVY_SAD := ["model", "chuze_bok", "chuze_predu", "chuze_zezadu", "stani_bok", "stani_predu",
	"mluveni_bok", "mluveni_predu", "zvednuti", "pouziti"]
## Délka fáze mluvení a akce v sekundách
const FAZE_MLUVENI := 0.11
const FAZE_AKCE := 0.11
## Chůze dopředu a dozadu: o kolik delší krok (a tedy pomalejší střídání fází) než bokem
const ZPOMALENI_PREDU_ZEZADU := 2.4
## Poměr vodorovné a svislé složky směru chůze: nad BOKEM_OD jde postava bokem, pod BOKEM_DO zase
## dopředu nebo dozadu (mezi nimi drží předchozí pohled). Na obrazovce je pohyb do hloubky
## zkrácený perspektivou, proto bokem až při chůzi, která je opravdu víc do strany než do hloubky.
const BOKEM_OD := 1.2
const BOKEM_DO := 0.8
const BOKEM_Z_KLIDU := 1.0

## Cesta ke složkám sad s %s místo názvu sady, např. "res://grafika/postavy/ruda_%s/"
var vzor_sad := ""
## Výška stojící postavy v souřadnicích postavy
var vyska_postavy := 988.0
## Poměr výška postavy / šířka hlavy, ke kterému se srovnávají sady (viz _meritko_sady)
var pomer_hlavy := 2.9
## Délky fází stání v sekundách (u Rudy bokem: usrknutí kávy, zepředu: mrknutí)
var stani_bok: Array = [2.6, 0.35, 0.8, 0.35]
var stani_predu: Array = [3.0, 0.25, 0.15, 0.25]
## Fáze chůze zezadu a bokem, která slouží jako stání (nohy nejblíž u sebe)
var stani_zezadu_faze := 1
var stani_bok_faze := 1
## Název postavy pro fáze úst na klidovém obrázku (grafika/postavy/<název>_mluveni/), "" = žádné
var usta_nazev := ""
## Když postavu neovládá hráč, stojí vždy na klidovém obrázku (vedlejší postava na místě)
var mimo_hru_klid := false
## Mluvení se skupinami gest: fáze sady mluvení jdou po skupinách (tvary úst) a každá skupina
## je jedno gesto ruky (hrnek dole, výš, nejvýš). Ústa se střídají rychle uvnitř skupiny, gesto
## se mění pomalu a jen o jeden stupeň. Tělo je ve všech fázích stejné jako při stání, takže se
## při řeči hýbe jen obličej a ruka s hrnkem. Velikost skupiny nese popis sady (faze.json,
## „skupina“, zapisuje ji tools/grafika/ruda_mluveni.py); sada bez ní střídá všechny fáze náhodně.
var _skupina := 0
## Za jak dlouho se při řeči změní gesto ruky (náhodně v tomto rozmezí, sekundy)
var gesto_od := 0.9
var gesto_do := 2.4

var _sady := {}                # název -> {snimky, meritko, vyska, posuny}
var _klid := {}                # klidový obrázek ze scény ve stejném tvaru jako sada
var _usta = null
var _stav := "stani"           # stani | chuze | mluveni | akce
var _pohled := "predu"         # bok | predu | zezadu
var _doleva := false
var _faze := 0
var _cas_ve_fazi := 0.0
var _usla_ve_fazi := 0.0
var _smer_chuze := Vector2.RIGHT
var _posledni_pozice := Vector2.ZERO
var _akce := ""
var _gesto := 0
var _cas_gesta := 0.0
var _dalsi_gesto := 1.5

signal akce_dokoncena


#region Virtual ####################################################################################
## Potomek tu nastaví vzor_sad a případně další proměnné animací.
func _nastav_animace() -> void:
	pass


func _on_room_set() -> void:
	_nacti_sady()
	if usta_nazev != "" and not _klid.is_empty():
		# Fáze úst patří ke klidovému obrázku, proto ho před připojením vrátit do Sprite2D
		$Sprite2D.texture = _klid.snimky[0]
		_usta = Usta.pripoj(self, _usta, usta_nazev)


# Popochiu volá při zastavení. Pohled podle směru, kam se postava naposledy otočila.
func _play_idle() -> void:
	if _stav == "akce":
		return
	_nastav_stav("stani", _pohled_ze_smeru_pohledu(true))


# Popochiu ji volá na začátku chůze a znovu na každém zlomu cesty: fáze se proto nastaví od začátku
# jen tehdy, když postava teprve vyráží nebo mění pohled, jinak by se chůze stále vracela na 1. fázi.
func _play_walk(target_pos: Vector2) -> void:
	var smer := target_pos - position
	if smer != Vector2.ZERO:
		_smer_chuze = smer.normalized()
		# Směr pohledu pro pozdější stání a mluvení (Popochiu ho při chůzi sám nemění)
		face_direction(target_pos)
	# Těsně před zlomem cesty je směr k němu nespolehlivý (krátký vektor), proto se pohled mění
	# s rezervou (hystereze): bokem až při výrazně šikmé chůzi, zpět dopředu/dozadu až při skoro svislé
	var pohled := _pohled if _stav == "chuze" else "bok"
	var pomer := absf(_smer_chuze.x) / maxf(absf(_smer_chuze.y), 0.001)
	if _stav != "chuze":
		pohled = "bok" if pomer > BOKEM_Z_KLIDU else ("predu" if _smer_chuze.y > 0.0 else "zezadu")
	elif smer.length() > 4.0:
		if pomer > BOKEM_OD:
			pohled = "bok"
		elif pomer < BOKEM_DO:
			pohled = "predu" if _smer_chuze.y > 0.0 else "zezadu"
	var doleva := _doleva
	if absf(smer.x) > 4.0 or _stav != "chuze":
		doleva = _smer_chuze.x < 0.0
	if _stav == "chuze" and _pohled == pohled and _doleva == doleva:
		# Popochiu před každým voláním vrací otočení obrázku na výchozí, proto ho obnovit
		$Sprite2D.flip_h = _doleva and _pohled == "bok"
		return
	_doleva = doleva
	_posledni_pozice = position
	_usla_ve_fazi = 0.0
	_nastav_stav("chuze", pohled)


func _play_talk() -> void:
	_nastav_stav("mluveni", _pohled_ze_smeru_pohledu(false))


func _play_grab() -> void:
	await animuj_akci("zvednuti")


#endregion

#region Public #####################################################################################
## Přehraje jednorázovou akci bokem ("zvednuti" nebo "pouziti") a počká na její konec.
func animuj_akci(nazev: String) -> void:
	_nacti_sady()
	if not _sady.has(nazev):
		return
	_akce = nazev
	_pohled_ze_smeru_pohledu(false)   # nastaví, jestli je otočený doleva
	_nastav_stav("akce", "bok")
	await akce_dokoncena
	_nastav_stav("stani", "bok")


#endregion

#region Private ####################################################################################
func _nacti_sady() -> void:
	if not _sady.is_empty() or Engine.is_editor_hint():
		return
	_nastav_animace()
	if vzor_sad == "":
		return
	if _klid.is_empty():
		var sprite: Sprite2D = $Sprite2D
		if sprite.texture != null:
			var klidove: Array[Texture2D] = [sprite.texture]
			var bez_posunu: Array[float] = []
			_klid = {snimky = klidove, meritko = sprite.scale.x, vyska = -sprite.offset.y * 2.0,
				posuny = bez_posunu}
	for nazev in NAZVY_SAD:
		var slozka: String = vzor_sad % nazev
		var popis_cesta := slozka + "faze.json"
		if not FileAccess.file_exists(popis_cesta):
			continue
		var popis: Dictionary = JSON.parse_string(FileAccess.get_file_as_string(popis_cesta))
		var snimky: Array[Texture2D] = []
		var i := 1
		while ResourceLoader.exists(slozka + "faze_%02d.png" % i):
			snimky.append(load(slozka + "faze_%02d.png" % i))
			i += 1
		var meritko := _meritko_sady(popis, nazev)
		var posuny: Array[float] = []
		for p in popis.posuny:
			posuny.append(p * meritko)
		_sady[nazev] = {snimky = snimky, meritko = meritko, vyska = float(popis.vyska), posuny = posuny,
			skupina = int(popis.get("skupina", 0))}


# AI kreslí každý list s trochu jinými proporcemi (u chůze má Ruda větší hlavu než při stání).
# Srovnává se podle výšky postavy i šířky hlavy a bere se střed mezi nimi: při přechodu mezi
# animacemi se pak ani výška, ani hlava nezmění skokem o víc než pár procent.
func _meritko_sady(popis: Dictionary, nazev: String) -> float:
	var vysky: Array = popis.vysky
	# Bokem se postava při přechodu chůze ↔ stání nejvíc porovná, proto tam rozhoduje výška
	if nazev.ends_with("_bok") or nazev in ["zvednuti", "pouziti"]:
		return vyska_postavy / float(vysky.max())
	var hlavy: Array = popis.hlavy.duplicate()
	hlavy.sort()
	var podle_vysky := vyska_postavy / float(vysky.max())
	var podle_hlavy := (vyska_postavy / pomer_hlavy) / float(hlavy[hlavy.size() / 2])
	return sqrt(podle_vysky * podle_hlavy)


# Popochiu směr pohledu (_looking_dir): 0 vpravo, 1 vpravo dolů, 2 dolů, … 6 nahoru, 7 vpravo nahoru
func _pohled_ze_smeru_pohledu(i_zezadu: bool) -> String:
	if mimo_hru_klid and C.player != self:
		return "predu"
	match _looking_dir:
		2:
			return "predu"
		6:
			return "zezadu" if i_zezadu else "bok"
	_doleva = _looking_dir in [3, 4, 5]
	return "bok"


func _nastav_stav(stav: String, pohled: String) -> void:
	_nacti_sady()
	# Popochiu po každé chůzi vypne _physics_process (_clear_navigation_path), a tím by zastavil
	# i animaci stání a akce; akce by pak nikdy neskončila. Bez cesty v něm Popochiu nic nedělá.
	set_physics_process(true)
	Usta.mlc(_usta)
	_stav = stav
	_pohled = pohled
	_faze = 0
	_cas_ve_fazi = 0.0
	var sada := _sada()
	if sada.is_empty():
		return
	if stav == "mluveni" and pohled != "zezadu":
		_skupina = sada.get("skupina", 0)
		if _ma_gesta(sada.snimky.size()):
			# Řeč začíná v klidovém gestu (hrnek dole jako při stání)
			_gesto = 0
			_cas_gesta = 0.0
			_dalsi_gesto = randf_range(gesto_od, gesto_do)
			_faze = randi() % _skupina
		else:
			_faze = randi() % sada.snimky.size()
	_zobraz()
	if stav == "mluveni" and _je_klid(sada):
		Usta.mluv(_usta)


func _ma_gesta(pocet: int) -> bool:
	return _skupina >= 2 and pocet >= 2 * _skupina


# Další fáze mluvení: jiná ústa ve stejném gestu; jednou za čas se gesto posune o stupeň
func _dalsi_faze_s_gestem(pocet: int) -> void:
	var gest := pocet / _skupina
	if _cas_gesta >= _dalsi_gesto:
		_cas_gesta = 0.0
		_dalsi_gesto = randf_range(gesto_od, gesto_do)
		if _gesto <= 0:
			_gesto = 1
		elif _gesto >= gest - 1:
			_gesto = gest - 2
		else:
			_gesto += 1 if randf() < 0.5 else -1
	var usta := _faze % _skupina
	usta = (usta + 1 + randi() % (_skupina - 1)) % _skupina
	_faze = _gesto * _skupina + usta


func _je_klid(sada: Dictionary) -> bool:
	return not _klid.is_empty() and is_same(sada, _klid)


func _sada() -> Dictionary:
	var nazev := ""
	match _stav:
		"chuze":
			nazev = "chuze_" + _pohled
		"stani":
			nazev = "stani_" + _pohled
		"mluveni":
			nazev = "mluveni_" + _pohled
		"akce":
			nazev = _akce
	if _sady.has(nazev):
		return _sady[nazev]
	# Stání a mluvení zezadu: nehybná fáze chůze zezadu (nohy u sebe). Model postavy má jiné
	# proporce než chůze, takže by Ruda při zastavení zezadu skokem změnil výšku i vlasy.
	if _pohled == "zezadu" and _sady.has("chuze_zezadu"):
		return _sady["chuze_zezadu"]
	if _sady.has("model"):
		return _sady["model"]
	# Postava bez modelu (Bára): stání bokem je nehybná fáze chůze, jinak klidový obrázek
	if _stav == "stani" and _pohled == "bok" and _sady.has("chuze_bok"):
		return _sady["chuze_bok"]
	return _klid


func _zobraz() -> void:
	var sada := _sada()
	if sada.is_empty():
		return
	var snimek: Texture2D = sada.snimky[_faze % sada.snimky.size()]
	if _stav != "chuze" and _sady.has("chuze_zezadu") and is_same(sada, _sady["chuze_zezadu"]):
		snimek = sada.snimky[stani_zezadu_faze]
	elif _stav != "chuze" and _sady.has("chuze_bok") and is_same(sada, _sady["chuze_bok"]):
		snimek = sada.snimky[stani_bok_faze]
	elif _sady.has("model") and is_same(sada, _sady["model"]):
		var index: int = {"predu": 0, "bok": 1, "zezadu": 2}.get(_pohled, 0)
		snimek = sada.snimky[mini(index, sada.snimky.size() - 1)]
	$Sprite2D.texture = snimek
	$Sprite2D.scale = Vector2(sada.meritko, sada.meritko)
	$Sprite2D.offset = Vector2(0, -sada.vyska / 2.0)
	$Sprite2D.flip_h = _zrcadlit(sada)
	$Sprite2D.position = Vector2.ZERO
	_posun_stin(Vector2.ZERO)


## Doleva se zrcadlí jen pohled bokem; klidový obrázek zepředu nikdy.
func _zrcadlit(sada: Dictionary) -> bool:
	return _doleva and _pohled == "bok" and not _je_klid(sada)


func _posun_stin(kam: Vector2) -> void:
	var stin := get_node_or_null("Stin") as Node2D
	if stin != null:
		stin.position = kam


# Popochiu postavám vypíná _process, proto se animace počítá v _physics_process, kde Popochiu
# postavu i posouvá.
func _physics_process(delta: float) -> void:
	super(delta)
	if Engine.is_editor_hint() or _sady.is_empty():
		return
	var pohyb := position - _posledni_pozice
	var usla := pohyb.length() / maxf(scale.x, 0.01)
	_posledni_pozice = position
	var sada := _sada()
	if sada.is_empty():
		return
	var pocet: int = sada.snimky.size()
	# Popochiu otočení obrázku při chůzi a otáčení resetuje, tady se vždy obnoví podle pohledu
	$Sprite2D.flip_h = _zrcadlit(sada)
	match _stav:
		"chuze":
			_animuj_chuzi(sada, usla, pohyb)
		"stani":
			var delky: Array = stani_bok if _pohled == "bok" else stani_predu
			if _pohled == "zezadu" or pocet < 2 or not _sady.has("stani_" + _pohled):
				return
			_cas_ve_fazi += delta
			if _cas_ve_fazi >= delky[_faze % delky.size()]:
				_cas_ve_fazi = 0.0
				_faze = (_faze + 1) % pocet
				_zobraz()
		"mluveni":
			if _pohled == "zezadu" or pocet < 2 or not _sady.has("mluveni_" + _pohled):
				return
			_cas_ve_fazi += delta
			_cas_gesta += delta
			if _cas_ve_fazi >= FAZE_MLUVENI:
				_cas_ve_fazi = 0.0
				if _ma_gesta(pocet):
					_dalsi_faze_s_gestem(pocet)
				else:
					# Náhodná další fáze (ne stejná), ať pusa nepůsobí jako smyčka
					_faze = (_faze + 1 + randi() % (pocet - 1)) % pocet
				_zobraz()
		"akce":
			_cas_ve_fazi += delta
			if _cas_ve_fazi >= FAZE_AKCE:
				_cas_ve_fazi = 0.0
				if _faze + 1 >= pocet:
					akce_dokoncena.emit()
				else:
					_faze += 1
					_zobraz()


# Další fáze chůze přijde, až postava ujde tolik, o kolik se ve fázi posune noha na zemi.
# Bokem obrázek během fáze stojí a poskočí až s další fází, takže noha na zemi neklouže.
# Dopředu a dozadu se fáze střídají po průměrném kroku chůze bokem.
func _animuj_chuzi(sada: Dictionary, usla: float, pohyb: Vector2) -> void:
	if usla <= 0.0:
		return
	_smer_chuze = pohyb.normalized()
	var krok: float
	if _pohled == "bok":
		krok = sada.posuny[_faze % sada.posuny.size()]
	else:
		var bok: Dictionary = _sady.get("chuze_bok", sada)
		krok = ZPOMALENI_PREDU_ZEZADU * bok.posuny.reduce(func(a, b): return a + b, 0.0) / maxi(bok.posuny.size(), 1)
	_usla_ve_fazi += usla
	var zmena := false
	while _usla_ve_fazi >= krok and krok > 0.0:
		_usla_ve_fazi -= krok
		_faze = (_faze + 1) % sada.snimky.size()
		zmena = true
		if _pohled == "bok":
			krok = sada.posuny[_faze % sada.posuny.size()]
	if zmena:
		_zobraz()
	if _pohled == "bok":
		$Sprite2D.position = -_smer_chuze * _usla_ve_fazi
		_posun_stin($Sprite2D.position)


#endregion
