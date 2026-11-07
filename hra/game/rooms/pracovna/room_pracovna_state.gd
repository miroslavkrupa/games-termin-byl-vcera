# @popochiu-docs-ignore-class
extends PopochiuRoomData
# Stav starostovy pracovny (kapitola 1, S4). Příznaky odpovídají šedému prototypu
# (prototyp/kapitola1.js, scéna pracovna a dialog starosta). Ukládají se s hrou.
# Výsledek souboje (c1_slib_vseho) je v Globals, protože ho čte zbytek kapitoly i další kapitoly.

## Ruda už v pracovně byl (replika při prvním příchodu)
var navstivena := false
## Starosta už Rudu uvítal („Potřebuju něco, co bude v novinách.“)
var starosta_uvital := false
## Pembok už před prvním soubojem poradil („Dej mu titulek, který je pravda.“)
var souboj_rada := false
## Ruda souboj M03 prohrál (Pembok pak radí k argumentům; další pokus je možný)
var starosta_prohra := false


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
