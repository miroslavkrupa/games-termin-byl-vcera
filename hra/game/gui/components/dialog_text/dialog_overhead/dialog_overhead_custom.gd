extends "dialog_overhead.gd"
# Titulky nad postavou. Při samočinném pokračování („Samo“ v nastavení) šablona nechá každou
# repliku po vypsání ještě 3 sekundy. S dabingem (D97) to nestačí i překáží: dlouhou repliku by
# utnula dřív, než postava domluví, krátká by zbytečně visela. Má-li replika nahrávku, čeká se
# proto na konec hlasu a chvilku po něm; repliky bez nahrávky se chovají jako dřív.

## Jak dlouho po doznění hlasu replika ještě zůstane (s)
const PO_HLASU := 0.6
## Nejkratší doba, po kterou vypsaná replika zůstane (s)
const NEJMENE := 1.0


func _show_icon() -> void:
	if not PopochiuUtils.e.settings.auto_continue_text or not Zvuk.replika_s_hlasem():
		await super()
		return
	if is_instance_valid(continue_icon_tween) and continue_icon_tween.is_running():
		continue_icon_tween.kill()
	var ukazatel := create_tween()
	continue_icon_tween = ukazatel
	continue_icon.value = 0.0
	continue_icon.position.y = size.y / 2.0
	ukazatel.tween_property(continue_icon, ^"value", 100.0,
		maxf(Zvuk.zbyva_hlasu() + PO_HLASU, NEJMENE)).from_current()
	ukazatel.finished.connect(_continue)
	ukazatel.pause()
	await get_tree().create_timer(0.2).timeout
	# hráč mezitím repliku odklepl: ukazatel už nemá co odpočítávat
	if continue_icon_tween != ukazatel or not _is_waiting_input:
		ukazatel.kill()
		return
	ukazatel.play()
	continue_icon.show()
