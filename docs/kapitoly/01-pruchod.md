# Kapitola 1: průchod hrou

> Krok N3b [postupu návrhu](../12-postup-navrhu.md). Každá akce hráče na samostatném řádku.
> Z průchodu vznikne v kroku N7 automatický test pro `ladeni.gd`. Scény a předměty jsou
> v [obsahu místností](01-mistnosti.md), puzzly v [kartách](01-puzzly.md).
> Stav: **návrh**, verze 0.1

Formát: `č. scéna · kdo · akce → výsledek · příznak`. Akce: *prohlédni*, *použij*, *mluv*,
*vezmi*, *použij X na Y*, *jdi*.

## 1. Nejkratší cesta (přes Báru)

```text
 1. Ú · Ruda · vezmi Hrnek kávy na stole → káva
 2. Ú · Ruda · vezmi Knihu → Prof. Pembok
 3. Ú · Ruda · mluv Dveře → věřitelé prostrčí „stížnost“ a propisku, Ruda podepíše, propiska nepíše a ukápne káva → dekret, propiska
 4. Ú · Ruda · použij Díru ve zdi → skluz na suť → S1
 5. S1 · cutscéna · amplion ohlásí kometu za 30 dní a jmenování Rudy; Pembok se poprvé otevře a vysvětlí úkol
 6. S1 · Ruda · mluv Bára → nechat domluvit ×3 → číslo 94/017, kritéria · c1_bara_vyslechnuta=3, c1_bara_kriteria, c1_cislo_projektu
 7. S1 · Ruda · použij Propiska na Káva → kávové pero
 8. S1 · Ruda · jdi Dveře radnice → S2
 9. S2 · Ruda · mluv Vrátný → „Kdo rozhoduje?“ → starosta, 2. patro, výtah do 1½ · vratny_rekl_starosta
10. S2 · Ruda · jdi Schody do sklepa → S3
11. S3 · Ruda · mluv Lumír → „94/017“ → vstup · archiv_navstiven
12. S3 · Ruda · použij Kartotéka → lístek Modernizace výtahu, krabice č. 87/3
13. S3 · Ruda · mluv Lumír → „Krabici 87/3, prosím.“ → tlačítko „2“
14. S3 · Ruda · prohlédni Lumírova kniha → skutečná data zahájení
15. S3 · Ruda · použij Kartotéka → seřadit 5 lístků podle knihy → Lumír vydá přílohu: původní zadání
16. S3 · Ruda · použij Kávové pero na Lumír → výpůjčka z krabičky Poučení → karta poučení
17. S3 · Ruda · vezmi Mapník → katastrální mapa
18. S3 · Ruda · jdi Schody → S2
19. S2 · Ruda · použij Tlačítko „2“ na Výtah → výtah do 2. patra → S4
20. S4 · Ruda · mluv Starosta → M03 Souboj argumenty, dobré repliky (zadání, karta, kritéria) → 4–5 vyhraných kol z 5 → podpis sponzora, termín 30 dní · c1_slib_vseho=0
21. S4 · Ruda · použij Výtah → 1½ → S5
22. S5 · Ruda · použij Stůl pro žadatele → Pembok: „Nejdřív si nakresli, kdo tu velí.“ → M02, babička umístěna podle mapy · c1_babicka=odhalena (bez návštěvy S6 na konci `prehlizena`)
23. S5 · Ruda · použij Stůl pro žadatele → M01 Charter z trosek (cíl, termín, kritéria) → charter · c1_charter_kvalita=3
24. S5 · Ruda · použij Fronta na frontu → Ruda čeká, Framework nabízí „frontu 2.0“
25. S3 · Bára · prohlédni Hluboký regál → „Zvenku je delší.“
26. S3 · Bára · použij Metr na Hluboký regál → skrytá přihrádka → seznam pasažérů · c1_seznam_pasazeru
27. S5 · Ruda · mluv Předseda → razítko nemá barvu
28. S5 · Ruda · použij Káva na Razítko → hnědé razítko · c1_razitko=kava
29. S5 · Ruda · mluv Předseda → „…a následné fáze?“ → odmítnout s odkazem na rozsah · c1_faze2=false
30. S5 · cutscéna · klíč od hangáru; kometa je větší; Předseda zamlženě telefonuje (D44) · konec kapitoly
```

30 kroků, odhad 35–45 minut.

## 2. Úplná cesta

Navíc proti nejkratší cestě (vloženo na místa, kde dává smysl):

```text
 Ú · Ruda · prohlédni Zeď slávy → 14 diplomů, „týdenní výměna žárovek“ (V01)
 Ú · Ruda · mluv Dveře → všechny tři volby s věřiteli
 S1 · Ruda · použij Kašna, Budka, prohlédni Kometa, Amplion → vtipy (budka 4 812)
 S1 · Ruda · prohlédni Kocour → obojek: „Pozemková, pozemek pod rampou“
 S1 · Ruda · mluv Pan Změna → přání se mění; použij Kávové pero na Stánek → požadavek, plakát · c1_zmena_dohoda
 S1 · Ruda · mluv Bára (2.) → „Co do Archy nepatří?“ → útržek mimo rozsah (bazén, terasa, fontána)
 S2 · Ruda · mluv Vrátný → křížovka („dokončení“)
 S2 · Ruda · prohlédni Úřední deska, Schody nahoru
 S4 · Ruda · prohlédni Noviny, Fotky, Okno
 S1 · Ruda · jdi Ulička k rampě → S6
 S6 · Ruda · mluv Babička → s mapou: téma pozemek → vyslechnout → razítková poduška · c1_babicka=spojenec
 S6 · Ruda · sedni Lavička → buchta
 S5 · Ruda · mluv Framework (ve frontě) → všechny volby
 S3 · Bára · mluv Lumír → hrdost na lístek z roku 1998
 S5 · Ruda · použij Razítková poduška na Razítko → modré razítko · c1_razitko=poduska
```

Odhad úplné cesty 50–60 minut (rozpočet 40–60, D56).

## 3. Varianty

| Varianta | Odlišné kroky | Příznaky a následek |
|---|---|---|
| **A Bára přerušená** (cesta B k číslu) | 6: skočit do řeči → Bára odejde; prohlédni Stánek → plakát; mluv Pan Změna ×2; použij Kávové pero na Stánek → požadavek, plakát; 11: Lumír + plakát | `c1_bara_vyslechnuta`=0, bez `c1_bara_kriteria`; v M01 chybí kritéria → `c1_charter_kvalita` ≤ 2; v kap. 2–3 Bára méně pomáhá |
| **B Bára přerušená napůl** | 6: nechat domluvit jednou nebo dvakrát | podle toho kritéria ano/ne, číslo jen při třetím; jinak cesta B |
| **C Prohraný souboj** | 20: špatné repliky → starosta pošle pryč; doplnit repliky (karta, Bára) a vrátit se | žádný trvalý následek, jen čas |
| **D Slíbit všechno** (R1.1) | 20: tři rychlé repliky | `c1_slib_vseho`=3; kap. 2 a 4 tvrdší |
| **E Babička neodhalená** | bez mapy i obojku; v M02 babička chybí | `c1_babicka`=`neodhalena`; kap. 4 blokuje rampu |
| **F Babička odhalená, nenavštívená** | M02 s babičkou, ale bez S6 | `c1_babicka`=`prehlizena`; kap. 4 blokuje rampu |
| **J Babička odbytá** (R1.2) | S6: spěchat nebo slíbit → okno se zavře | `c1_babicka`=`odmitnuta`; razítko jen kávou; kap. 4 blokuje rampu |
| **G Následné fáze přijaty** (R1.4) | 29: přijmout | `c1_faze2`=true; kap. 2–3 Předseda má páku |
| **H Razítko poduškou** | 28: poduška místo kávy | `c1_razitko`=`poduska`; v kap. 2 bez formuláře navíc |
| **I Bez karty poučení** | vynechat 16 | souboj těžší (jedna dobrá replika chybí) |

**Automatický test (N7):** nejkratší cesta a varianty A, C, D, E, G jako samostatné sekvence
pro `ladeni.gd`. Každá končí kontrolou příznaků.

## Kontrola slepých uliček

- [x] Číslo projektu má dvě nezávislé cesty (Bára, Pan Změna). I úplně přerušená Bára pošle
  Rudu k Panu Změnovi.
- [x] Kávové pero jde vyrobit kdykoli a potřebuje ho cesta B i karta poučení. Káva je nekonečná.
- [x] Souboj jde opakovat; prohra nic nebere.
- [x] M01 i M02 jdou dokončit i s horšími útržky (R1.3, R1.2 jsou volby, ne zámky).
- [x] Razítko má dvě cesty (poduška, káva). Zavřené okno babičky ho nezablokuje, zbývá káva.
- [x] Žádný předmět se nedá ztratit ani dát pryč ([předměty](01-mistnosti.md#předměty)).
- [x] Do Komise jde přijet dřív než ke starostovi: Předseda bez podpisu sponzora „nemůže
  zařadit ani do fronty“. Není to slepá ulička.
- [x] Do chaloupky jde kdykoli; bez znalosti pozemku je babička jen milá paní s prádlem.

## Šířka grafu

| Úsek | Rozdělané úkoly |
|---|---|
| po úvodu (S1) | Bára, Pan Změna, vrátný (3) |
| v archivu (S3) | tlačítko, zadání, karta, mapa (4) |
| po starostovi | M02, babička, charter (2–3) |
| fronta → Bára → Předseda | 1 (lineární závěr, záměrně krátký) |
