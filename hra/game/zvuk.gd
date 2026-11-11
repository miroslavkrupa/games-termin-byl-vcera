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

var _hudba: AudioStreamPlayer
var _hraje := ""
var _mistnost := ""
var _efekty := {}        # název -> AudioStream
var _posledni_klik := 0


func _ready() -> void:
	process_mode = Node.PROCESS_MODE_ALWAYS
	var parametry := Array(OS.get_cmdline_user_args())
	var ladici: bool = parametry.has("pruchod") \
		or parametry.any(func(a: String) -> bool: return a.begins_with("snimek="))
	if ladici and not parametry.has("zvuk=1"):
		AudioServer.set_bus_mute(0, true)
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
	return "hudba %s, běžících efektů %d, ztlumeno %s" % [hudba_text, get_child_count() - (1 if is_instance_valid(_hudba) else 0),
		"ano" if AudioServer.is_bus_mute(0) else "ne"]


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
