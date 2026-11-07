@tool
extends "res://addons/popochiu/engine/interfaces/i_room.gd"

# classes ----
const PRNamesti := preload("res://game/rooms/namesti/room_namesti.gd")
const PRArchiv := preload("res://game/rooms/archiv/room_archiv.gd")
const PRVestibul := preload("res://game/rooms/vestibul/room_vestibul.gd")
const PRPracovna := preload("res://game/rooms/pracovna/room_pracovna.gd")
const PRChaloupka := preload("res://game/rooms/chaloupka/room_chaloupka.gd")
const PRKomise := preload("res://game/rooms/komise/room_komise.gd")
const PRByt := preload("res://game/rooms/byt/room_byt.gd")
const PRMenu := preload("res://game/rooms/menu/room_menu.gd")
# ---- classes

# nodes ----
var Namesti: PRNamesti : get = get_Namesti
var Archiv: PRArchiv : get = get_Archiv
var Vestibul: PRVestibul : get = get_Vestibul
var Pracovna: PRPracovna : get = get_Pracovna
var Chaloupka: PRChaloupka : get = get_Chaloupka
var Komise: PRKomise : get = get_Komise
var Byt: PRByt : get = get_Byt
var Menu: PRMenu : get = get_Menu
# ---- nodes

# functions ----
func get_Namesti() -> PRNamesti: return get_runtime_room("Namesti")
func get_Archiv() -> PRArchiv: return get_runtime_room("Archiv")
func get_Vestibul() -> PRVestibul: return get_runtime_room("Vestibul")
func get_Pracovna() -> PRPracovna: return get_runtime_room("Pracovna")
func get_Chaloupka() -> PRChaloupka: return get_runtime_room("Chaloupka")
func get_Komise() -> PRKomise: return get_runtime_room("Komise")
func get_Byt() -> PRByt: return get_runtime_room("Byt")
func get_Menu() -> PRMenu: return get_runtime_room("Menu")
# ---- functions

