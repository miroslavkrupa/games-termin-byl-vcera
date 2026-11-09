# Automatické průchody

Každý soubor `<jméno>.txt` projde jednu kapitolu od nové hry po konec, krok za krokem v jednom
běhu hry a bez podstrkování stavu. Kroky vycházejí z průchodu kapitoly
([kapitola 1](../../../docs/kapitoly/01-pruchod.md)). Spuštění z kořene repozitáře:

```bash
sh hra/nastroje/pruchod.sh
```

Jeden soubor nebo jen vybrané varianty: `sh hra/nastroje/pruchod.sh kapitola1 A E`. Hra běží bez
okna, čtyřikrát zrychleně a všechny varianty najednou; kapitola 1 trvá asi čtyři minuty.
`RYCHLOST=1` pustí hru skutečnou rychlostí. Výpisy her jsou v `hra/export/pruchody/`.

Průchod projde, když hra dojde až do hlavního menu za koncem kapitoly, všechny kontroly sedí
a ve výpisu není chyba skriptu. Jinak výpis končí řádkem
`[průchod] CHYBA na řádku N (krok): důvod` a stavem hry (místnost, inventář, příznaky).

## Kroky

Jeden krok na řádek, `#` začíná poznámku. Každý krok nejdřív počká, až hra dokončí předchozí:
nikdo nemluví ani nejde a GUI není blokované. Čeká nejvýš 120 sekund hry.

| Krok | Co dělá |
|---|---|
| `nova_hra` | jako tlačítko Nová hra v hlavním menu |
| `akce Misto:pouzit` | klepnutí na aktivní místo, postavu nebo předmět v inventáři; místo `pouzit` jde `prohlednout` (pravé tlačítko) nebo `najet`; víc akcí se odděluje čárkou |
| `volby Id,Id` | vybere volby dialogu, vždy když se nabídka ukáže; u nabídky přímo ze skriptu (Bára) je id pořadí od nuly |
| `pouzij Predmet:Cil` | použije předmět na aktivní místo, postavu nebo jiný předmět |
| `klepni a; b` | klepnutí v okně minihry: tlačítko podle klíče textu (`ui_m02_hotovo`), pole minihry (`pole:0` v M02 podle pořadí, `pole:cil` v M01 podle kolonky), souřadnice hry (`768,552`) nebo pauza (`p2`) |
| `mistnost Nazev` | kontrola: hra je v místnosti |
| `hrac Nazev` | kontrola: hraje se za postavu |
| `priznak nazev=hodnota` | kontrola příznaků v Globals, víc oddělených čárkou; přepínače `1` a `0`, za `=` nic znamená prázdný text |
| `ma Predmet` / `nema Predmet` | kontrola inventáře postavy, za kterou se hraje, víc oddělených čárkou |
| `konec klic,klic` | počká na obrazovku paměti kapitoly, porovná paměť (klíče bez `ch1_pamet_` a bez `pokracovani`) a tlačítky dojde do hlavního menu |

Když místo klidu čeká nabídka voleb, krok skončí chybou, protože v souboru chybí `volby`.
Tlačítko se hledá podle textu, takže úprava textu v `texty.csv` test nerozbije.

## Varianty

Řádek `varianty zaklad A C` na začátku souboru vyjmenuje varianty. Štítek na konci řádku omezí
krok: `@A` jen ve variantě A, `@A,E` v A a E, `@!A` ve všech kromě A. Řádek bez štítku platí
ve všech variantách.
