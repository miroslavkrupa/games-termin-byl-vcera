# Rozřeže obrázek kurzorů šablony na samostatné ikony do grafika/gui/ikony/ (nápověda tlačítek myši
# pod popiskem, game/gui/gui.gd). Spuštění: godot --headless --path hra -s nastroje/ikony_kurzoru.gd
extends SceneTree
func _init() -> void:
	var nazvy := ["active", "down", "gui", "left", "look", "none", "normal", "right", "search", "talk", "up", "use", "wait"]
	var img := Image.new()
	img.load_svg_from_string(FileAccess.get_file_as_string("res://game/gui/images/simple_click_cursor_high_res.svg"), 1.0)
	print(img.get_size())
	for i in nazvy.size():
		var kus := img.get_region(Rect2i(i * 54, 0, 54, 54))
		kus.save_png("res://grafika/gui/ikony/%s.png" % nazvy[i])
	quit()
