# @popochiu-docs-ignore-class
@tool
extends PopochiuCharacter
# You can use `E.queue([])` in any of the methods in this script to trigger a sequence of events.
# Use `await E.queue([])` to pause execution until the sequence completes.

const Data := preload('character_ruda_state.gd')

var state: Data = load("res://game/characters/ruda/character_ruda.tres")

# Animace kreslenými fázemi (D40, D41): sady fází v grafika/postavy/ruda_<sada>/ vznikají z listů
# od ChatGPT nástrojem nastroje/zpracuj_animace.sh. Fáze bokem jsou kreslené doprava, doleva se zrcadlí.
# (Loutka s klouby z D39 zůstává jako záloha v game/characters/spolecne/kostra.gd.)
const SADY := "res://grafika/postavy/ruda_%s/"
const NAZVY_SAD := ["model", "chuze_bok", "chuze_predu", "chuze_zezadu", "stani_bok", "stani_predu",
	"mluveni_bok", "mluveni_predu", "zvednuti", "pouziti"]
## Výška stojící postavy v souřadnicích postavy
const VYSKA := 988.0
## Poměr výška postavy / šířka hlavy, ke kterému se srovnávají sady (viz _meritko_sady)
const POMER_HLAVY := 2.9
## Délky fází stání v sekundách (bokem: usrknutí kávy, zepředu: mrknutí)
const STANI_BOK := [2.6, 0.35, 0.8, 0.35]
const STANI_PREDU := [3.0, 0.25, 0.15, 0.25]
## Délka fáze mluvení a akce v sekundách
const FAZE_MLUVENI := 0.11
const FAZE_AKCE := 0.11
## Fáze chůze zezadu, která slouží jako stání zezadu (nohy nejblíž u sebe)
const STANI_ZEZADU_FAZE := 1
## Chůze dopředu a dozadu: o kolik delší krok (a tedy pomalejší střídání fází) než bokem
const ZPOMALENI_PREDU_ZEZADU := 2.4
## Poměr vodorovné a svislé složky směru chůze: nad BOKEM_OD jde Ruda bokem, pod BOKEM_DO zase
## dopředu nebo dozadu (mezi nimi drží předchozí pohled). Na obrazovce je pohyb do hloubky
## zkrácený perspektivou, proto bokem až při chůzi, která je opravdu víc do strany než do hloubky.
const BOKEM_OD := 1.2
const BOKEM_DO := 0.8
const BOKEM_Z_KLIDU := 1.0

var _sady := {}                # název -> {snimky, meritko, vyska, posuny}
var _stav := "stani"           # stani | chuze | mluveni | akce
var _pohled := "predu"         # bok | predu | zezadu
var _doleva := false
var _faze := 0
var _cas_ve_fazi := 0.0
var _usla_ve_fazi := 0.0
var _smer_chuze := Vector2.RIGHT
var _posledni_pozice := Vector2.ZERO
var _akce := ""

signal akce_dokoncena


#region Virtual ####################################################################################
# Called when the room where this character is located has finished being added to the scene tree.
func _on_room_set() -> void:
	_nacti_sady()


# Called when the character is clicked
func _on_click() -> void:
	# Replace the call to E.command_fallback() with your own logic.
	E.command_fallback()
	# Example: make the player walk to this character, face them, then say a line.
#	await C.player.walk_to_clicked()
#	await C.player.face_clicked()
#	await C.player.say("Hi!")


# Called when the character is double-clicked
func _on_double_click() -> void:
	# Replace the call to E.command_fallback() with your code.
	E.command_fallback()
	# Example: teleport the player to the character.
#	C.player.teleport_to_character(self)


# Called when the character is right-clicked
func _on_right_click() -> void:
	# Replace the call to E.command_fallback() with your own logic.
	E.command_fallback()
	# Example: make the player face the character and describe them.
#	await C.player.face_clicked()
#	await C.player.say("Mmmh, dude looks rad...")


# Called when the character is middle clicked
func _on_middle_click() -> void:
	# Replace the call to E.command_fallback() to implement your code.
	E.command_fallback()
	# Example: make the player say something without facing the character.
#	await C.player.say("I don't want to talk to this guy")


# Called when the character is clicked while an inventory item is selected
func _on_item_used(_item: PopochiuInventoryItem) -> void:
	# Replace the call to E.command_fallback() with your own logic.
	E.command_fallback()
	# Example: if the player uses a Key on this character, make the player say something.
#	if _item == I.Key:
#		await C.player.say("I don't want to give my key away!")


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


# Called when the character starts moving.
# Implement any logic you want to trigger at the start of movement here.
# For example, you could play a sound effect or make something happen in the room.
func _on_movement_started() -> void:
	pass


# Called when the character stops moving
# Implement any logic you want to trigger at the start of movement here.
# For example, you could play a sound effect or make something happen in the room.
func _on_movement_ended() -> void:
	pass


# Called when this character's movement is blocked by a region with walkable = false.
# Override to react to the event: play a sound, show a hint, trigger dialogue, etc.
# `_region` is the PopochiuRegion that stopped the character.
func _on_blocked_by_region(_region: PopochiuRegion) -> void:
	pass


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
	if not _sady.is_empty():
		return
	for nazev in NAZVY_SAD:
		var slozka: String = SADY % nazev
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
		_sady[nazev] = {snimky = snimky, meritko = meritko, vyska = float(popis.vyska), posuny = posuny}


# AI kreslí každý list s trochu jinými proporcemi (u chůze má Ruda větší hlavu než při stání).
# Srovnává se podle výšky postavy i šířky hlavy a bere se střed mezi nimi: při přechodu mezi
# animacemi se pak ani výška, ani hlava nezmění skokem o víc než pár procent.
func _meritko_sady(popis: Dictionary, nazev: String) -> float:
	var vysky: Array = popis.vysky
	# Bokem se Ruda při přechodu chůze ↔ stání nejvíc porovná, proto tam rozhoduje výška
	if nazev.ends_with("_bok") or nazev in ["zvednuti", "pouziti"]:
		return VYSKA / float(vysky.max())
	var hlavy: Array = popis.hlavy.duplicate()
	hlavy.sort()
	var podle_vysky := VYSKA / float(vysky.max())
	var podle_hlavy := (VYSKA / POMER_HLAVY) / float(hlavy[hlavy.size() / 2])
	return sqrt(podle_vysky * podle_hlavy)


# Popochiu směr pohledu (_looking_dir): 0 vpravo, 1 vpravo dolů, 2 dolů, … 6 nahoru, 7 vpravo nahoru
func _pohled_ze_smeru_pohledu(i_zezadu: bool) -> String:
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
	_stav = stav
	_pohled = pohled
	_faze = 0
	_cas_ve_fazi = 0.0
	if stav == "mluveni" and pohled != "zezadu":
		_faze = randi() % _sada().snimky.size()
	_zobraz()


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
	return _sady.get("model", {})


func _zobraz() -> void:
	var sada := _sada()
	if sada.is_empty():
		return
	var snimek: Texture2D = sada.snimky[_faze % sada.snimky.size()]
	if _stav != "chuze" and sada == _sady.get("chuze_zezadu", {}):
		snimek = sada.snimky[STANI_ZEZADU_FAZE]
	elif sada == _sady.get("model", {}):
		var index: int = {"predu": 0, "bok": 1, "zezadu": 2}.get(_pohled, 0)
		snimek = sada.snimky[mini(index, sada.snimky.size() - 1)]
	$Sprite2D.texture = snimek
	$Sprite2D.scale = Vector2(sada.meritko, sada.meritko)
	$Sprite2D.offset = Vector2(0, -sada.vyska / 2.0)
	$Sprite2D.flip_h = _doleva and _pohled == "bok"
	$Sprite2D.position = Vector2.ZERO
	$Stin.position = Vector2.ZERO


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
	$Sprite2D.flip_h = _doleva and _pohled == "bok"
	match _stav:
		"chuze":
			_animuj_chuzi(sada, usla, pohyb)
		"stani":
			var delky: Array = STANI_BOK if _pohled == "bok" else STANI_PREDU
			if _pohled == "zezadu" or pocet < 2:
				return
			_cas_ve_fazi += delta
			if _cas_ve_fazi >= delky[_faze % delky.size()]:
				_cas_ve_fazi = 0.0
				_faze = (_faze + 1) % pocet
				_zobraz()
		"mluveni":
			if _pohled == "zezadu":
				return
			_cas_ve_fazi += delta
			if _cas_ve_fazi >= FAZE_MLUVENI:
				_cas_ve_fazi = 0.0
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
		$Stin.position = $Sprite2D.position


#endregion
