@tool
extends "simple_click_settings_popup.gd"

# Přepínač jazyka (krok K6 prototypu). Názvy jazyků se nepřekládají, každý je ve svém jazyce.
# Dotyk (D43, I6): podržení prstu = prohlédnout (výchozí), nebo nabídka po ťuknutí (game/gui/dotyk.gd).
# V hlavním menu (I6) chybí levý sloupec (uložit, načíst, historie, hlavní menu): menu má vlastní
# tlačítka a uložit tam není co. Tlačítko „Hlavní menu“ (dřív Quit) se zeptá a vrátí hru do menu.

const Dotyk := preload("res://game/gui/dotyk.gd")

@onready var cestina: Button = %Cestina
@onready var english: Button = %English
@onready var podrzet: Button = %Podrzet
@onready var nabidka: Button = %Nabidka
@onready var levy_sloupec: Control = $Overlay/PanelContainer/VBoxContainer/BodyContainer/LeftContainer
@onready var oddelovac: Control = $Overlay/PanelContainer/VBoxContainer/BodyContainer/VSeparator


func _ready() -> void:
	super()
	if Engine.is_editor_hint(): return
	cestina.pressed.connect(_vyber_jazyk.bind("cs"))
	english.pressed.connect(_vyber_jazyk.bind("en"))
	Jazyk.zmenen.connect(func(_jazyk): _oznac_jazyk())
	_oznac_jazyk()
	podrzet.pressed.connect(_vyber_dotyk.bind(false))
	nabidka.pressed.connect(_vyber_dotyk.bind(true))
	_oznac_dotyk()
	# Rychlost textu slovy: šablona ukazovala sekundy na znak jako „0.10x“, což nic neříká
	text_speed.value_changed.connect(func(_hodnota: float) -> void: _popis_rychlost())
	text_speed_label.custom_minimum_size = Vector2(150, 0)
	text_speed_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
	_popis_rychlost()
	# Nápověda klávesových zkratek pod nastavením (jen s klávesnicí)
	if not DisplayServer.is_touchscreen_available():
		var klavesy := Label.new()
		klavesy.name = "Klavesy"
		klavesy.text = "ui_klavesy"
		klavesy.modulate = Color(1, 1, 1, 0.75)
		klavesy.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		$Overlay/PanelContainer/VBoxContainer/BodyContainer/RightContainer.add_child(klavesy)


func _open() -> void:
	_popis_rychlost()
	var v_menu: bool = is_instance_valid(R.current) and R.current.script_name == "Menu"
	levy_sloupec.visible = not v_menu
	oddelovac.visible = not v_menu
	_oznac_dotyk()


# E.text_speed jsou sekundy na jeden znak: 0,1 je nejpomalejší, 0 ukáže celý text hned
func _popis_rychlost() -> void:
	var na_znak: float = E.text_speed
	var klic := "ui_rychlost_hned"
	if na_znak >= 0.07:
		klic = "ui_rychlost_pomalu"
	elif na_znak >= 0.035:
		klic = "ui_rychlost_stredne"
	elif na_znak > 0.005:
		klic = "ui_rychlost_rychle"
	text_speed_label.text = klic


func _vyber_jazyk(jazyk: String) -> void:
	Jazyk.nastav(jazyk)


func _oznac_jazyk() -> void:
	cestina.button_pressed = Jazyk.aktualni() == "cs"
	english.button_pressed = Jazyk.aktualni() == "en"


func _vyber_dotyk(nabidka_po_tuknuti: bool) -> void:
	Dotyk.nastav_nabidku(nabidka_po_tuknuti)
	_oznac_dotyk()


func _oznac_dotyk() -> void:
	podrzet.set_pressed_no_signal(not Dotyk.nabidka_po_tuknuti)
	nabidka.set_pressed_no_signal(Dotyk.nabidka_po_tuknuti)
