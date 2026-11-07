# @popochiu-docs-ignore-class
extends PopochiuRoomData
# Stav Rudova bytu (úvod kapitoly 1, prototyp scéna „byt“). Byt je jen jednou, skluzem se odchází.

## Úvodní karta kapitoly a telefonát už proběhly
var uvod_videl := false
## Ruda vzal hrnek kávy ze stolu (hrnek ze stolu zmizí)
var kava_vzata := false
## Ruda vzal knihu z police (Prof. Pembok; kniha z police zmizí)
var kniha_vzata := false
## Věřitelé prostrčili dekret a propisku (volba „Co chcete?“ s kávou v ruce)
var dekret_prevzat := false
## Věřitelé už buší (první rozhovor přes dveře proběhl)
var veritel_busil := false
## Kolikrát Ruda použil zeď slávy (repliky se střídají)
var zed_pouzita := 0


func _on_save() -> Dictionary:
	return {}


func _on_load(_data: Dictionary) -> void:
	pass
