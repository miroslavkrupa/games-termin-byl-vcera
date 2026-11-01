# Připraví obrázky šedého prototypu ze schválených vzorků (docs/styl/vzorky):
# ikony předmětů rozřeže podle mřížky a postavy vyřízne z referenčních listů (pohled zepředu).
# Spuštění z kořene repozitáře:
#   godot --headless --path hra --script ../prototyp/priprav_obrazky.gd
# Pozadí převádí sestav.mjs nástrojem sips, tady se neřeší.
extends SceneTree

const VZORKY := "../docs/styl/vzorky/"
const CIL := "../prototyp/obrazky/"
const IKONA := 96              # delší strana ikony v px
const POSTAVA := 420           # výška postavy v px

# Listy ikon: soubor, sloupce, řádky, předměty po řádcích (pořadí podle 01-mistnosti.md)
const IKONY := [
	["ikony-1_v01.png", 3, 3, ["dekret", "kava", "propiska", "kavove_pero", "pembok", "plakat", "pozadavek", "tlacitko", "zadani"]],
	["ikony-2_v01.png", 4, 2, ["karta", "mapa", "poduska", "podpis", "papir", "klic", "metr", "seznam"]],
]

# Postavy: listy se třemi pohledy, bere se první zleva (zepředu)
const POSTAVY := {
	"predseda": "predseda-list_v01.png",
	"starosta": "starosta-list_v01.png",
	"zmena": "zmena-list_v01.png",
	"lumir": "lumir-list_v01.png",
	"babicka": "babicka-list_v01.png",
	"framework": "framework-list_v01.png",
	"vratny": "vratny-list_v01.png",
	"kocour": "kocour-list_v01.png",
}


func _init() -> void:
	DirAccess.make_dir_recursive_absolute(ProjectSettings.globalize_path("res://" + CIL))
	for list in IKONY:
		var img := _nacti(VZORKY + list[0])
		var sirka: int = img.get_width() / list[1]
		var vyska: int = img.get_height() / list[2]
		for i in list[3].size():
			var bunka := img.get_region(Rect2i((i % list[1]) * sirka, (i / list[1]) * vyska, sirka, vyska))
			_uloz(_orizni(bunka), IKONA, "predmet_" + list[3][i])
	for id in POSTAVY:
		var img := _nacti(VZORKY + POSTAVY[id])
		_uloz(_orizni(_prvni_pohled(img)), POSTAVA, "postava_" + id, true)
	# Bára je už vyříznutá pro hru
	_uloz(_orizni(_nacti("grafika/postavy/bara_stoji/bara_stoji.png")), POSTAVA, "postava_bara", true)
	quit()


func _nacti(cesta: String) -> Image:
	var img := Image.load_from_file(ProjectSettings.globalize_path("res://" + cesta))
	img.convert(Image.FORMAT_RGBA8)
	return img


# Pohledy na listu dělí prázdné sloupce. Vrátí první souvislý pás sloupců s kresbou
# (pohled zepředu); prázdná mezera musí mít aspoň 6 px, aby ji nerozdělil tenký obrys.
func _prvni_pohled(img: Image) -> Image:
	var zacatek := -1
	var prazdnych := 0
	for x in img.get_width():
		var plny := false
		for y in range(0, img.get_height(), 2):
			if img.get_pixel(x, y).a > 0.5:
				plny = true
				break
		if plny:
			if zacatek < 0:
				zacatek = x
			prazdnych = 0
		elif zacatek >= 0:
			prazdnych += 1
			if prazdnych >= 6:
				return img.get_region(Rect2i(zacatek, 0, x - prazdnych - zacatek + 1, img.get_height()))
	return img


# Obdélník kolem pixelů s výraznou neprůhledností. get_used_rect() nestačí: listy mají
# v pozadí skoro průhledný šum, který by obdélník roztáhl přes celou buňku.
func _orizni(img: Image) -> Image:
	var x0 := img.get_width()
	var y0 := img.get_height()
	var x1 := -1
	var y1 := -1
	for y in img.get_height():
		for x in img.get_width():
			if img.get_pixel(x, y).a > 0.5:
				x0 = mini(x0, x)
				y0 = mini(y0, y)
				x1 = maxi(x1, x)
				y1 = maxi(y1, y)
	if x1 < 0:
		return img
	return img.get_region(Rect2i(x0, y0, x1 - x0 + 1, y1 - y0 + 1))


func _uloz(img: Image, velikost: int, jmeno: String, podle_vysky := false) -> void:
	var w := img.get_width()
	var h := img.get_height()
	var k := float(velikost) / (h if podle_vysky else maxi(w, h))
	img.resize(maxi(1, roundi(w * k)), maxi(1, roundi(h * k)), Image.INTERPOLATE_LANCZOS)
	img.save_png(ProjectSettings.globalize_path("res://" + CIL + jmeno + ".png"))
	print(jmeno, " ", img.get_width(), "×", img.get_height())
