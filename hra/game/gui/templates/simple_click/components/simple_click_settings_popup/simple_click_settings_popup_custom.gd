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


func _open() -> void:
	var v_menu: bool = is_instance_valid(R.current) and R.current.script_name == "Menu"
	levy_sloupec.visible = not v_menu
	oddelovac.visible = not v_menu
	_oznac_dotyk()


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
