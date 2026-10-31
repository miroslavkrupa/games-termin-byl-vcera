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
