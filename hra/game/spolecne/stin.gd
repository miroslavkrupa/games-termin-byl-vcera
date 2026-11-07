# Měkký stín pod nohama postavy (produkční zásady, část Postavy ve scéně).
# Kreslí se v souřadnicích postavy, takže se zmenšuje spolu s ní.
@tool
extends Node2D

@export var polomer := Vector2(120, 26)
@export var barva := Color(0.1, 0.06, 0.03, 0.5)


func _draw() -> void:
	# Elipsa z několika vrstev, aby měla měkký okraj
	for i in 4:
		var k := 1.0 - i * 0.18
		var c := barva
		c.a = barva.a * 0.4
		draw_set_transform(Vector2.ZERO, 0.0, Vector2(k, k * polomer.y / polomer.x))
		draw_circle(Vector2.ZERO, polomer.x, c)
