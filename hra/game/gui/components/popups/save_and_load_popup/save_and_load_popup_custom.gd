@tool
extends "save_and_load_popup.gd"

# Okno uložení a načtení hry (I6): ukládá Popochiu (E.save_game, 4 pozice). Texty šablony se
# překládají přes anglické klíče v tabulce (jako v I1), tlačítko OK nese název akce, prázdné
# pozice mají popisek a uložená hra se jmenuje podle data a času. Načtení jde přes rámec hry (Ramec.nacti), který
# před načtením vynuluje stav a zavře překryvné obrazovky.

const Ramec := preload("res://game/obrazovky/ramec.gd")


func _show_save(slot_text := "") -> void:
	super(slot_text)
	btn_ok.text = "Save"
	_popis_pozic()


func _show_load() -> void:
	super()
	btn_ok.text = "Load"
	_popis_pozic()


func _close() -> void:
	if not _slot: return
	slot_selected.emit()
	if _slot_name:
		PopochiuUtils.e.save_game(_slot, _slot_name)
	else:
		Ramec.nacti(_slot)


## Název uložené hry: datum a čas po česku (den. měsíc. rok hodina:minuta)
func _format_date(date: Dictionary) -> String:
	return "%d. %d. %d  %d:%02d" % [date.day, date.month, date.year, date.hour, date.minute]


## Prázdné pozice: „Volná pozice 1“ … (uložené mají název podle data)
func _popis_pozic() -> void:
	for btn: Button in slots.get_children():
		if not btn.get_meta("has_save", false) and btn != _current_slot:
			btn.auto_translate_mode = Node.AUTO_TRANSLATE_MODE_DISABLED
			btn.text = tr("ui_pozice_prazdna") % (btn.get_index() + 1)
