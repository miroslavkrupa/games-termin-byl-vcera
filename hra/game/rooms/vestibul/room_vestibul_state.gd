# @popochiu-docs-ignore-class
extends PopochiuRoomData
# Stav vestibulu radnice (kapitola 1, S2). Příznaky odpovídají šedému prototypu (prototyp/kapitola1.js,
# scéna vestibul). Ukládají se s hrou. Zapojení tlačítka „2“ je v Globals.tlacitko_zapojeno,
# protože ho čtou i Lumír, vrátný a Pembok.

## Ruda už ve vestibulu byl (replika při prvním příchodu)
var navstiven := false
## Kolikrát si Ruda prohlédl výtah (střídá dvě repliky: půl patra, díra po dvojce)
var vytah_prohlednuti := 0


#region Virtual ####################################################################################
# Return a Dictionary of custom data to save for this PopochiuRoom.
# The Dictionary must contain only JSON-supported types: bool, int, float, String.
func _on_save() -> Dictionary:
	return {}


# Called when the game is loaded.
# The `data` Dictionary should match the structure returned by `_on_save()`.
func _on_load(data: Dictionary) -> void:
	prints(data)


#endregion
