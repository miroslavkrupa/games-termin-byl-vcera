# Mluvení vedlejší postavy kreslenými fázemi úst.
# Fáze jsou stejně velké jako stojící obrázek postavy a liší se od něj jen obličejem
# (grafika/postavy/<postava>_mluveni/faze_NN.png), takže se při řeči jen střídá textura.
# Použití ve skriptu postavy:
#   const Usta := preload("res://game/spolecne/usta.gd")
#   var _usta = null
#   func _on_room_set() -> void:      _usta = Usta.pripoj(self, _usta, "vratny")
#   func _play_talk() -> void:        Usta.mluv(_usta); super()
#   func _play_idle() -> void:        Usta.mlc(_usta); super()
extends Node

const SLOZKA := "res://grafika/postavy/%s_mluveni/"
## Délka jedné fáze úst v sekundách (stejná jako u Rudy)
const FAZE := 0.11

var _sprite: Sprite2D
var _snimky: Array[Texture2D] = []   # fáze úst a na konci stojící obrázek (zavřená pusa)
var _mluvi := false
var _cas := 0.0
var _index := 0


## Připojí k postavě uzel s fázemi úst (jen jednou; `stavajici` je dříve vrácený uzel nebo null).
## Parametry jsou bez typu: při změně místnosti Popochiu uzel postavy uvolní a skript pak drží
## odkaz na uvolněný objekt, který by typovaný parametr odmítl.
## Když postava fáze nemá, vrátí null a postava při řeči dál stojí.
static func pripoj(postava: Node, stavajici: Variant, nazev: String) -> Node:
	if Engine.is_editor_hint() or is_instance_valid(stavajici):
		return stavajici
	var sprite := postava.get_node_or_null("Sprite2D") as Sprite2D
	if sprite == null:
		return null
	var slozka: String = SLOZKA % nazev
	var snimky: Array[Texture2D] = []
	var i := 1
	while ResourceLoader.exists(slozka + "faze_%02d.png" % i):
		snimky.append(load(slozka + "faze_%02d.png" % i))
		i += 1
	if snimky.is_empty():
		return null
	# Stojící obrázek si postava pamatuje: při opakovaném připojení může mít zrovna fázi úst
	if not postava.has_meta("usta_stoji"):
		postava.set_meta("usta_stoji", sprite.texture)
	sprite.texture = postava.get_meta("usta_stoji")
	snimky.append(sprite.texture)
	var usta := new()
	usta.name = "Usta"
	usta._sprite = sprite
	usta._snimky = snimky
	postava.add_child(usta)
	return usta


static func mluv(usta: Variant) -> void:
	if is_instance_valid(usta):
		usta._zacni()


static func mlc(usta: Variant) -> void:
	if is_instance_valid(usta):
		usta._skonci()


func _ready() -> void:
	set_process(false)


func _zacni() -> void:
	_mluvi = true
	_cas = 0.0
	_index = randi() % (_snimky.size() - 1)
	_sprite.texture = _snimky[_index]
	set_process(true)


func _skonci() -> void:
	if not _mluvi:
		return
	_mluvi = false
	_sprite.texture = _snimky[-1]
	set_process(false)


func _process(delta: float) -> void:
	_cas += delta
	if _cas < FAZE:
		return
	_cas = 0.0
	# Náhodná další fáze (ne stejná), ať pusa nepůsobí jako smyčka
	_index = (_index + 1 + randi() % (_snimky.size() - 1)) % _snimky.size()
	_sprite.texture = _snimky[_index]
