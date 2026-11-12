# Zvuk hry (D46, D90, D91): hudba podle místnosti a zvukové efekty. Autoload „Zvuk“.
# Soubory jsou v res://zvuk/hudba/ (vlastní téma hry) a res://zvuk/efekty/ (volně licencované,
# CC0; autoři v titulcích a v docs/15-zvuk.md). Hraje se přes hlavní sběrnici, takže hlasitost řídí
# posuvník v nastavení hry.
#
# Co se děje samo:
# - hudba se přepne (s prolnutím), když se změní místnost,
# - při přechodu mezi místnostmi zazní dveře, výtah nebo skluz (PRECHODY),
# - každé tlačítko v rozhraní klepne, okno minihry zašustí při otevření a zavření,
# - sebrání předmětu cinkne.
# Ostatní efekty volá hra výslovně: Zvuk.efekt("razitko"), await Zvuk.klepani() apod.
#
# Dabing (D97): když postava promluví a pro repliku existuje nahrávka
# res://zvuk/<jazyk>/<klíč textu>.mp3 (vyrábí tools/dabing.py --hra), přehraje se. Titulky jsou
# vždy; replika bez nahrávky je jen titulek. Hudba při řeči ustoupí. Klíč repliky se hledá
# zpětně podle přeloženého textu, protože Popochiu posílá rozhraní už hotový text.
#
# Ladicí běhy se snímkem a automatický průchod jsou potichu (parametr zvuk=1 zvuk nechá).
extends Node

const HUDBA_CESTA := "res://zvuk/hudba/%s.ogg"
const EFEKT_CESTA := "res://zvuk/efekty/%s.ogg"
## Hudba podle místnosti (script_name místnosti -> název skladby). Všechny skladby jsou aranže
## jednoho tématu hry (tools/hudba/sloz.py, D91): rytmus motivu skanduje „Termín byl včera“.
const HUDBA := {
	"Menu": "tema_menu", "Byt": "tema_byt",
	"Namesti": "tema_mesto", "Chaloupka": "tema_mesto",
	"Vestibul": "tema_radnice", "Pracovna": "tema_radnice",
	"Komise": "tema_komise", "Archiv": "tema_archiv",
}
## Hlasitost hudby v dB: skladby jsou vyrovnané na stejnou hlasitost, ve hře hrají tiše pod řečí
const HLASITOST_HUDBY_VSE := -10.0
## Hlasitost efektů v dB (co tu není, hraje na 0 dB)
const HLASITOST_EFEKTU := {
	"klik": -8.0, "vybrat": -8.0, "polozit": -6.0, "okno_zavrit": -4.0, "sebrat": -4.0,
	"spravne": -8.0, "spatne": -8.0, "konec_kapitoly": -6.0, "dvere": -6.0, "razitko": -4.0,
	"klepani": -4.0, "vytah": -4.0, "telefon": -8.0, "rozhlas": -8.0, "skluz": -8.0, "dopad": -6.0,
}
## Zvuk při přechodu mezi místnostmi: "odkud>kam" -> efekt (obousměrné dvojice jsou zapsané dvakrát)
const PRECHODY := {
	"Byt>Namesti": "skluz",
	"Namesti>Vestibul": "dvere", "Vestibul>Namesti": "dvere",
	"Namesti>Chaloupka": "dvere", "Chaloupka>Namesti": "dvere",
	"Vestibul>Pracovna": "vytah", "Pracovna>Vestibul": "vytah",
	"Vestibul>Komise": "vytah", "Komise>Vestibul": "vytah",
	"Pracovna>Komise": "vytah", "Komise>Pracovna": "vytah",
}
const PROLNUTI := 1.2
const TICHO := -60.0
## Nahrávka repliky: jazyk a klíč textu
const DABING_CESTA := "res://zvuk/%s/%s.mp3"
## O kolik dB ustoupí hudba, když někdo mluví
const USTUP_HUDBY := -7.0

var _hudba: AudioStreamPlayer
var _hraje := ""
var _mistnost := ""
var _efekty := {}        # název -> AudioStream
var _posledni_klik := 0
var _hlas: AudioStreamPlayer
var _hlas_klic := ""
var _klice := {}         # jazyk -> {přeložený text -> [klíče textů]}
var _kdo_mluvi := {}     # klíč textu -> jméno postavy; jen u vět, které říká víc postav
var _mela_hlas := false  # právě říkaná replika má nahrávku
var _cekat_na_hlas := true
var _ladici := false
var _ustup: Tween


func _ready() -> void:
	process_mode = Node.PROCESS_MODE_ALWAYS
	var parametry := Array(OS.get_cmdline_user_args())
	var ladici: bool = parametry.has("pruchod") \
		or parametry.any(func(a: String) -> bool: return a.begins_with("snimek="))
	_ladici = ladici
	# Ladicí běhy mají zvuk ztlumený a na hlas nečekají (průchod by se zdržoval); hlas=1 čekání
	# zapne i tak, aby šlo vyzkoušet bez zvuku z reproduktorů
	_cekat_na_hlas = not ladici or parametry.has("zvuk=1") or parametry.has("hlas=1")
	if ladici and not parametry.has("zvuk=1"):
		AudioServer.set_bus_mute(0, true)
	var postavy := get_node_or_null("/root/C")
	if postavy != null and postavy.has_signal("character_spoke"):
		postavy.character_spoke.connect(_na_repliku)
	var rozhrani := get_node_or_null("/root/G")
	if rozhrani != null and rozhrani.has_signal("dialog_line_finished"):
		rozhrani.dialog_line_finished.connect(_konec_repliky)
	get_tree().node_added.connect(_na_novy_uzel)
	var inventar := get_node_or_null("/root/I")
	if inventar != null and inventar.has_signal("item_added"):
		inventar.item_added.connect(_na_predmet)


func _process(_delta: float) -> void:
	var r := get_node_or_null("/root/R")
	if r == null or not is_instance_valid(r.current):
		return
	var nazev: String = r.current.script_name
	if nazev == _mistnost:
		return
	var prechod := "%s>%s" % [_mistnost, nazev]
	_mistnost = nazev
	hudba(HUDBA.get(nazev, ""))
	if PRECHODY.has(prechod):
		efekt(PRECHODY[prechod])
		if PRECHODY[prechod] == "skluz":
			await get_tree().create_timer(0.55).timeout
			efekt("dopad")


#region Public #####################################################################################
## Přehraje efekt a vrátí jeho přehrávač (dá se zastavit přes ztis). Neznámý název nic neudělá.
func efekt(nazev: String) -> AudioStreamPlayer:
	if not _efekty.has(nazev):
		var cesta: String = EFEKT_CESTA % nazev
		_efekty[nazev] = load(cesta) if ResourceLoader.exists(cesta) else null
	if _efekty[nazev] == null:
		return null
	var p := AudioStreamPlayer.new()
	p.stream = _efekty[nazev]
	p.volume_db = HLASITOST_EFEKTU.get(nazev, 0.0)
	add_child(p)
	p.finished.connect(p.queue_free)
	p.play()
	return p


## Rychle ztiší běžící efekt (telefon přestane zvonit, když ho postava zvedne)
func ztis(prehravac: AudioStreamPlayer, doba := 0.15) -> void:
	if not is_instance_valid(prehravac):
		return
	var t := create_tween()
	t.tween_property(prehravac, "volume_db", TICHO, doba)
	t.tween_callback(prehravac.queue_free)


## Trojí zaklepání na dveře; počká, až dozní
func klepani() -> void:
	for i in 3:
		efekt("klepani")
		await get_tree().create_timer(0.22).timeout
	await get_tree().create_timer(0.3).timeout


## Stav zvuku jedním řádkem pro ladicí výpis (nastroje/ladeni.gd)
func popis() -> String:
	var hudba_text := "žádná"
	if is_instance_valid(_hudba):
		hudba_text = "%s (%s, %.1f s, %.0f dB)" % [_hraje, "hraje" if _hudba.playing else "stojí",
			_hudba.get_playback_position(), _hudba.volume_db]
	var hlas := 1 if is_instance_valid(_hlas) else 0
	return "hudba %s, běžících efektů %d, hlas %s, ztlumeno %s" % [hudba_text,
		get_child_count() - (1 if is_instance_valid(_hudba) else 0) - hlas,
		_hlas_klic if hlas else "žádný", "ano" if AudioServer.is_bus_mute(0) else "ne"]


## Přepne hudbu s prolnutím; "" hudbu ztiší. Stejná skladba hraje dál bez přerušení.
func hudba(nazev: String) -> void:
	if nazev == _hraje:
		return
	_hraje = nazev
	if is_instance_valid(_hudba):
		var stara := _hudba
		var t := create_tween()
		t.tween_property(stara, "volume_db", TICHO, PROLNUTI)
		t.tween_callback(stara.queue_free)
		_hudba = null
	var cesta: String = HUDBA_CESTA % nazev
	if nazev == "" or not ResourceLoader.exists(cesta):
		return
	var proud: AudioStream = load(cesta)
	if proud is AudioStreamOggVorbis:
		proud.loop = true
	_hudba = AudioStreamPlayer.new()
	_hudba.stream = proud
	_hudba.volume_db = TICHO
	add_child(_hudba)
	_hudba.play()
	create_tween().tween_property(_hudba, "volume_db", HLASITOST_HUDBY_VSE, PROLNUTI)


#endregion

#region Private ####################################################################################
# Postava promluvila: najít nahrávku repliky v jazyce hry a přehrát ji
func _na_repliku(postava: Node, text: String) -> void:
	_konec_repliky()
	_mela_hlas = false
	var jazyk := TranslationServer.get_locale().substr(0, 2)
	var klic := _klic_textu(jazyk, text, postava)
	if klic == "":
		return
	var cesta: String = DABING_CESTA % [jazyk, klic]
	if not ResourceLoader.exists(cesta):
		return
	_hlas = AudioStreamPlayer.new()
	_hlas.stream = load(cesta)
	add_child(_hlas)
	_hlas.finished.connect(_konec_repliky)
	_hlas.play()
	_mela_hlas = true
	_hlas_klic = klic
	_ustup_hudby(true)
	if _ladici:
		print("[hlas] %s/%s" % [jazyk, klic])


# Replika skončila (hráč ji odklepl, doběhla nebo začíná další): hlas utichne, hudba se vrátí
func _konec_repliky() -> void:
	if not is_instance_valid(_hlas):
		return
	var stary := _hlas
	_hlas = null
	_hlas_klic = ""
	if stary.playing:
		ztis(stary, 0.12)
	else:
		stary.queue_free()
	_ustup_hudby(false)


func _ustup_hudby(ustoupit: bool) -> void:
	if not is_instance_valid(_hudba) or _hraje == "":
		return
	if is_instance_valid(_ustup):
		_ustup.kill()
	_ustup = create_tween()
	_ustup.tween_property(_hudba, "volume_db",
		HLASITOST_HUDBY_VSE + (USTUP_HUDBY if ustoupit else 0.0), 0.25 if ustoupit else 0.6)


# Klíč textu podle přeloženého znění. Tabulka se sestaví jednou pro každý jazyk ze seznamu
# nahrávek (názvy souborů jsou klíče textů): přeložený text každé nahrané repliky → její klíče.
# Z překladu samotného seznam klíčů získat nejde (Godot ho ukládá zhuštěně). Repliky se
# zástupným %s se nenamlouvají, a i kdyby, hra by je nenašla (výsledný text je jiný).
# Stejnou větu můžou říkat dvě postavy („Děkuju, Lumíre.“ Ruda i Bára): pak rozhodne, kdo
# mluví, podle res://zvuk/mluvci.json (klíč → jméno postavy, zapisuje tools/dabing.py).
func _klic_textu(jazyk: String, text: String, postava: Node = null) -> String:
	if not _klice.has(jazyk):
		var mapa := {}
		var slozka: String = DABING_CESTA.get_base_dir() % jazyk
		for soubor in DirAccess.get_files_at(slozka):
			# v exportované hře jsou ve složce jen soubory .import
			var nazev := soubor.trim_suffix(".import")
			if not nazev.ends_with(".mp3"):
				continue
			var klic := nazev.get_basename()
			var zneni := tr(klic)
			if zneni == klic:
				continue
			if not mapa.has(zneni):
				mapa[zneni] = []
			if not mapa[zneni].has(klic):
				mapa[zneni].append(klic)
		_klice[jazyk] = mapa
	var klice: Array = _klice[jazyk].get(text, [])
	if klice.is_empty():
		return ""
	if klice.size() > 1 and postava != null and "script_name" in postava:
		var jmeno := String(postava.script_name).to_lower()
		for klic in klice:
			if _mluvci().get(klic, "") == jmeno:
				return klic
	return klice[0]


func _mluvci() -> Dictionary:
	if _kdo_mluvi.is_empty():
		_kdo_mluvi = {"": ""}
		var soubor := FileAccess.open(DABING_CESTA.get_base_dir().get_base_dir() + "/mluvci.json",
			FileAccess.READ)
		if soubor:
			var data = JSON.parse_string(soubor.get_as_text())
			if data is Dictionary:
				_kdo_mluvi.merge(data)
	return _kdo_mluvi


## Kolik replik má v daném jazyce nahrávku, kterou hra najde a umí načíst (kontrola exportu)
func nahravky(jazyk: String) -> String:
	var puvodni := TranslationServer.get_locale()
	TranslationServer.set_locale(jazyk)
	_klice.erase(jazyk)
	_klic_textu(jazyk, "")
	var klicu := 0
	var nactenych := 0
	for klice in _klice[jazyk].values():
		for klic in klice:
			klicu += 1
			if ResourceLoader.exists(DABING_CESTA % [jazyk, klic]):
				nactenych += 1
	TranslationServer.set_locale(puvodni)
	return "nahrávek %d, z toho k načtení %d, vět s více mluvčími %d" % [klicu, nactenych,
		_mluvci().size() - 1]


## Kolik sekund ještě poběží hlas právě říkané repliky (0, když replika nahrávku nemá nebo
## už dozněla). Podle toho titulky při samočinném pokračování počkají, až postava domluví.
func zbyva_hlasu() -> float:
	if not is_instance_valid(_hlas) or not _hlas.playing or _hlas.stream == null:
		return 0.0
	return maxf(_hlas.stream.get_length() - _hlas.get_playback_position(), 0.0)


## Jestli právě říkaná replika má (nebo měla) nahrávku, na kterou mají titulky čekat
func replika_s_hlasem() -> bool:
	return _mela_hlas and _cekat_na_hlas


func _na_novy_uzel(uzel: Node) -> void:
	if uzel is BaseButton:
		uzel.pressed.connect(_klik)
	elif uzel is CanvasLayer and uzel.get_script() != null \
			and String(uzel.get_script().resource_path).begins_with("res://game/minihry/"):
		efekt("okno_otevrit")
		uzel.tree_exiting.connect(efekt.bind("okno_zavrit"))


# Jedno klepnutí na snímek: přepínací tlačítka a skupiny hlásí stisk víckrát
func _klik() -> void:
	var snimek := Engine.get_process_frames()
	if snimek == _posledni_klik:
		return
	_posledni_klik = snimek
	efekt("klik")


func _na_predmet(_predmet, _postava) -> void:
	# Výchozí věci na začátku hry a při načtení pozice se přidávají potichu
	if _mistnost in ["", "Menu"]:
		return
	efekt("sebrat")


#endregion
