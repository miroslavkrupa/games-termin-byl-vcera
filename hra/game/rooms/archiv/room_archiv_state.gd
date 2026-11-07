# @popochiu-docs-ignore-class
extends PopochiuRoomData
# Stav archivu (kapitola 1, S3). Příznaky odpovídají šedému prototypu (prototyp/kapitola1.js, scéna
# archiv). Ukládají se s hrou.

## Lumír pustil Rudu do archivu (P1.4): řekl číslo projektu, nebo ukázal plakát
var archiv_vstup := false
## Lumír už Rudu zastavil s celým úvodem („Číslo projektu.“ … „Úředně.“); dál jen krátce
var lumir_zastavil := false
## Lumír už Rudu uvítal (první otevření rozhovoru po vstupu)
var lumir_uvital := false
## Ruda si přečetl lístky kartotéky (výtah s krabicí 87/3, most s poučením); stopa P1.6 a P1.7
var listky_ctene := false
## Ruda četl Lumírovu knihu skutečných dat zahájení (klíč k P1.5)
var kniha_ctena := false
## Ruda si prohlédl krabičku Poučení (otevře volbu o výpůjčce karty)
var pouceni_videl := false
## Ruda požádal Lumíra o kartu poučení (Pembok pak radí k podpisu)
var karta_pozadana := false
## Lumír půjčil kartu poučení za podpis kávovým perem (P1.7)
var karta_pujcena := false
## Kartotéka je seřazená a Lumír vydal původní zadání (P1.5); puzzle se už neotevírá
var zadani_vydano := false
## Pořadí lístků v rozpracovaném řazení (id lístků), aby zůstalo i po zavření okna
var razeni_poradi: Array = []
## Úsek za Báru (I5, P1.12): karta „Hraješ za Báru“ a první replika už proběhly
var usek_uvod := false
## Kolikrát si Bára prohlédla hluboký regál (nápověda: „zvenku delší“, „to se dá změřit“)
var regal_bara_prohlednuto := 0
## Lumír už Báru uvítal („Vy jste ho psala.“)
var usek_lumir_uvital := false


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
