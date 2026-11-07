extends Node
# Stav hry, který platí napříč místnostmi a ukládá se s hrou (Popochiu ukládá všechny proměnné).
# Příznaky c1_* jsou z návrhu kapitoly 1 (docs/kapitoly/01-iniciace.md, Rozhodnutí kapitoly).

## Ruda zná číslo projektu (od Báry, nebo z plakátu Pana Změny)
var c1_cislo_projektu := false
## R1.3: kolikrát Ruda nechal Báru v prvním rozhovoru domluvit (0–3)
var c1_bara_vyslechnuta := 0
## Bára řekla, kolik lidí musí Archa uvézt (dobrý útržek „kritéria úspěchu“ pro M01)
var c1_bara_kriteria := false
## Pan Změna podepsal požadavek (přestal měnit názor)
var c1_zmena_dohoda := false
## Tlačítko „2“ je zapojené ve výtahu (P1.6; nastaví vestibul v I3). Čte ho Lumír a Pembokova nápověda.
var tlacitko_zapojeno := false
## P1.8 / R1.1: kolik replik v souboji M03 byly rychlé sliby (0–5); od 3 Ruda „slíbil všechno“
## (starosta přidá fontánu, podpis zní jinak, kapitola 3 to připomene). Nastaví souboj (I3).
var c1_slib_vseho := 0
## P1.9 / P1.10: stav babičky Pozemkové: "" (hra o ní ještě neví), "odhalena" (M02 s mapou nebo
## po obojku), "spojenec" (R1.2 vyslechnuta, dala podušku), "odmitnuta" (Ruda spěchal nebo
## sliboval, okno zůstane zavřené), "prehlizena" / "neodhalena" (nastaví konec kapitoly v I5).
## Čtou kapitoly 2 a 4. Nastavuje I4.
var c1_babicka := ""
## Ruda četl obojek kocoura („Pozemková, pozemek pod rampou“): odemyká téma pozemku u babičky
## a kartu babičky v M02 (náměstí i chaloupka, I4)
var obojek_videl := false
## M02 Kdo tu vlastně velí (P1.9): hotová (Pembok přijal rozmístění)
var m02_hotovo := false
## M02: Pembok už upozornil, že v mřížce chybí někdo pod rampou (bez mapy a obojku)
var m02_babicka_upozorneni := false
## M02: počet chybných pokusů (od 3. radí ke kartě, od 5. říká, kam ji dát)
var m02_pokusy := 0
## M02: rozmístění karet (id karty → [může Archu zastavit, záleží mu na ní]); zůstává i po zavření okna
var m02_umisteni := {}
## P1.13: čím je razítko Komise obarvené: "" (ještě není), "poduska" (modré, babiččina poduška),
## "kava" (hnědé, Předseda si to pamatuje). Nastaví Komise (I5), čte kapitola 2.
var c1_razitko := ""
## R1.4: Ruda přijal Předsedovo „…a následné fáze“ (true), nebo odmítl (false). Čte kapitola 2.
var c1_faze2 := false
## M01 (P1.11): kolik ze tří klíčových kolonek papíru (cíl, termín, kritéria) má dobrý útržek (0–3)
var c1_charter_kvalita := 0
## M01: v kolonce „co na Archu nepatří“ je útržek od Báry (bazén, terasa, fontána); v R1.4 pak jde
## odmítnout „následné fáze“ s odkazem na rozsah
var c1_mimo_rozsah := false
## P1.12: Bára má seznam pasažérů ze skryté přihrádky (čte kapitola 4, D59)
var c1_seznam_pasazeru := false
## Dny do dopadu komety (prototyp: 30 na začátku, 28 po frontě na frontu); ukazuje je
## gui/ukazatel_dnu.gd (I6)
var dny := 30


## Ukládání hry (I6): Popochiu ukládá proměnné jednoduchých typů sám, slovníky ne; ty jdou sem.
## Navíc verze uložené hry (obrazovky/ramec.gd, starší uložené hry se nenačítají).
func on_save() -> Dictionary:
	return {
		verze_ulozeni = preload("res://game/obrazovky/ramec.gd").VERZE_ULOZENI,
		m02_umisteni = m02_umisteni,
	}


func on_load(data: Dictionary) -> void:
	m02_umisteni = data.get("m02_umisteni", {})
