@tool
extends "quit_popup.gd"

# Tlačítko „Hlavní menu“ v nastavení (I6, dřív Ukončit hru): po potvrzení se hra vrátí do hlavního
# menu. Neuložený postup zůstane jen do nové hry nebo načtení. Konec programu je v hlavním menu.

const Ramec := preload("res://game/obrazovky/ramec.gd")


func _on_ok() -> void:
	Ramec.do_menu.call_deferred()
