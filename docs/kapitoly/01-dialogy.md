# Kapitola 1: osnovy dialogů

> Krok N3e [postupu návrhu](../12-postup-navrhu.md). Co která postava hráči řekne, za jakých
> podmínek a co se tím změní. Texty první verze (N6) jsou v `hra/texty/texty.csv`, ke čtení
> v [scénáři](01-scenar.md).
> Stav: **návrh**, verze 0.2 (texty napsané, D65)

## Věřitelé (úvod, jen hlasy za dveřmi)

| Téma (volba) | Podstata odpovědi | Podmínka | Mění | Odhad replik |
|---|---|---|---|---|
| úvodní bušení | „Gantte, víme, že jste doma! Projekt 14 skončil, faktury ne.“ | – | – | 3 |
| „Tady nikdo nebydlí.“ | „Tak tu nikdo nepodepíše, že se odstěhoval.“ | – | – | 3 |
| „Kolik dlužím?“ | částka roste s každou větou, jako rozpočet | – | – | 3 |
| „Co chcete?“ | prostrčí „stížnost“ (ve skutečnosti jmenování) a propisku, Ruda podepíše, propiska nepíše, ukápne káva | káva v ruce | dekret, propiska | 6 |

## Městský rozhlas (úvod)

| Téma | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| hlášení | kometa Deadline dopadne za 30 dní; projektovým manažerem Archy jmenován… Ruda Gantt | příchod na náměstí | – | 4 |
| Rudova reakce | „Kdo? … Já?!“ a pak rychle: „Samozřejmě. Kdo jiný.“ | – | – | 2 |

## Prof. Pembok (nápověda)

| Téma | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| první otevření | papír od sponzora a razítko Komise, jinak klíč od hangáru nebude (hotovo v I1) | po hlášení | `pembok_otevren` | 4 |
| „Proč stavět Archu?“ | ironická otázka po smyslu (hotovo v I1) | – | – | 1 |
| nápovědy | 3 stupně pro P1.1–P1.13 podle [karet puzzlů](01-puzzly.md) | podle stavu | – | 39 |
| M02 výzva | „Než půjdeš ke Komisi, nakresli si, kdo tu velí.“ | u stolu v S5 | – | 2 |

## Bára

| Téma (volba) | Podstata odpovědi | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| první rozhovor | tři nedokončené věty: rampa, 4 812 lidí a kajuty pro polovinu, číslo projektu (hotovo v I1) | první setkání | `c1_bara_vyslechnuta`, `c1_bara_kriteria`, `c1_cislo_projektu` | 22 |
| Co měříte? | všechno, co ostatní odhadují (hotovo v I1) | – | – | 4 |
| Číslo projektu | podle R1.3 řekne / odmítne / pošle k Panu Změnovi (hotovo v I1) | – | – | 5 |
| Co do Archy nepatří? | bazén, vyhlídková terasa, fontána: „Archa má odvézt lidi, ne atrakce.“ | `c1_bara_vyslechnuta` ≥ 1 a hráč má zadání | útržek „mimo rozsah“ pro M01 | 4 |
| ukázat zadání | pozná ho: byla v původním týmu, ale nikdo ji nečetl | zadání | – | 3 |
| úsek za Báru: regál | „Tenhle regál je zvenku delší.“ / „Neodhaduju.“ | úsek za Báru | – | 6 |
| úsek za Báru: seznam | šokovaně, pak pevně: seznam si nechá | seznam | `c1_seznam_pasazeru` | 4 |
| úsek za Báru: Lumír | Lumír hrdě o lístku z roku 1998 | – | – | 3 |

## Pan Změna

| Téma (volba) | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| Co prodáváte? | pokaždé něco jiného (hotovo v I1) | – | – | 5 |
| Co chcete za plakát? | přání se mění při každém rozhovoru (hotovo v I1) | `plakat_videl` | `zmena_prani` | 6 |
| kávové pero na stánek | zapsat, podepsat, plakát (hotovo v I1) | kávové pero | `c1_zmena_dohoda`, `c1_cislo_projektu` | 8 |
| po dohodě | hrdý na první rozhodnutí v životě (hotovo v I1) | dohoda | – | 2 |
| Archa | chce ji modrou, ne, zelenou, s bazénem bez vody | – | nesmysl do M01 | 3 |

## Vrátný

| Téma (volba) | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| Kdo rozhoduje o Arše? | starosta, 2. patro, výtah do 1½ (hotovo v I1) | – | `vratny_rekl_starosta` | 4 |
| Můžu dovnitř? | do sklepa jen s číslem, nahoru nikdo; myš má číslo (hotovo v I1, přepsat: hlídá Lumír) | – | – | 5 |
| Co luštíte? | „věc, která se tu nikdy nestala“ = dokončení (hotovo v I1) | – | – | 4 |
| Lumír | „Archivář. Jediný, kdo tu něco dokončuje. Lístky.“ | – | – | 2 |
| průkaz na jeřáb | mimochodem: „Mám průkaz na jeřáb. Od roku 1994. Nikdy se nepoužil.“ | – | zárodek kap. 2–3 | 2 |

## Archivář Lumír

| Téma (volba) | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| uvítání | archiv všech projektů, tedy všech projektů (ukázka v návrhu) | – | – | 3 |
| číslo projektu | bez něj ani myš; s ním vstup | `c1_cislo_projektu` | `archiv_navstiven` | 4 |
| krabice podle čísla | vydá krabici výtahu, v ní tlačítko „2“ | číslo krabice z lístku | tlačítko | 4 |
| kartotéka | „Plány se mění. Data zahájení ne.“ | – | nápověda P1.5 | 3 |
| výpůjčka karty | „Výpůjčka. Podpis. Čitelný.“ | – | karta poučení | 5 |
| mapy | „Mapy nejsou projekty. Ty si vezměte.“ | – | – | 2 |
| hrdost | lístek dokončený v roce 1998 (ukázka v návrhu) | – | – | 2 |
| hluboký regál | „Nikdo ho nesmí stěhovat. Rozkaz Komise z roku 1994.“ | – | stopa P1.12 | 2 |

## Starosta Bohumil

| Téma (volba) | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| uvítání | chce „něco, co bude v novinách“ | – | – | 3 |
| M03 Souboj argumenty | 4–6 kol: námitka, dobrá replika, rychlá replika, reakce; repliky ze zadání, karty a Bářiných kritérií ([ukázková kola](01-iniciace.md#m03-souboj-argumenty-se-starostou-ukázková-kola)) | – | `c1_slib_vseho` | 30 |
| prohra | pošle Rudu pryč, „vraťte se s titulkem“ | prohra | – | 3 |
| podpis a termín | podepíše, 30 dní, pošle na Komisi; při slibu všeho přidá fontánu | výhra | podpis sponzora, útržek termínu | 5 |
| noviny, fotky | sám sebe chválí u každé nedokončené stavby | – | – | 4 |

## Předseda Věčný

| Téma (volba) | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| bez podpisu sponzora | „Nemohu vás zařadit ani do fronty.“ | bez podpisu | – | 3 |
| návrh | „Vynikající. Právě proto ho musíme důkladně odložit.“ (ukázka v návrhu) | – | – | 2 |
| razítko | poduška ve fázi 2; po kávě: „Hnědé razítko. Platné. Bohužel.“ | charter | `c1_razitko` | 5 |
| „a následné fáze“ | vlídně navrhne připsat; Ruda odmítne s odkazem na rozsah, nebo přijme | po razítku | `c1_faze2` | 6 |
| do kdy, kdo rozhoduje | „Až to bude.“ a „Komise pro schvalování komisí. Pokud schválí.“ (nesmysly do M01) | – | – | 4 |
| klíč | předá klíč od hangáru „s přáním hladké fáze 2“ | – | klíč | 3 |
| telefonát (konec) | zamlžený (D44): slyšíme jen „Ano… Pustil jsem ho dál… Nebojte se.“ a dveře se zavřou | konec | – | 3 |
| dekret, zadání ★ | u zadání krátce zbledne (náznak, D44) | předmět | – | 3 |

## Ing. Framework (jen ve frontě)

| Téma (volba) | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| fronta 2.0 | stejná fronta, každé dva týdny jinak pojmenovaná (ukázka v návrhu) | – | – | 4 |
| „A kdo to změřil?“ | „Měřit? To je tak minulé čtvrtletí.“ (ukázka; bez odborných slov, D63) | – | – | 2 |
| kufr | krabice „Beton v krabici“, „Metodika pro kočky“; zárodek kap. 2 | – | – | 4 |
| vizitka | nabídne služby „na fázi 2“ | – | – | 2 |

## Babička Pozemková

| Téma (volba) | Podstata | Podmínka | Mění | Odhad |
|---|---|---|---|---|
| uvítání | jediná dokončená stavba ve městě; nikdo s ní nemluví (ukázka v návrhu) | – | – | 3 |
| bez znalosti pozemku | jen prádlo, zahrádka, počasí | `c1_babicka` ≠ odhalena | – | 3 |
| pozemek pod rampou | „Konečně se někdo ptá.“ Vypráví o rampě, která jí stíní rajčata | mapa nebo obojek | – | 6 |
| vyslechnout / spěchat | vyslechnout → spojenkyně a poduška; spěchat nebo slibovat → zavře okno do konce kapitoly | – | `c1_babicka` = `spojenec` / `odmitnuta` | 6 |
| buchta, kocour | gagy | spojenec | – | 4 |

## Ruda a prohlížení

| Skupina | Podstata | Odhad |
|---|---|---|
| prohlédnutí aktivních míst ve všech scénách | podle [obsahu místností](01-mistnosti.md) | 45 |
| prohlédnutí předmětů | 17 předmětů (13 hotovo v I1) | 17 |
| vlastní reakce ★ z matice | podle [matice předmětů](01-mistnosti.md#matice-předmětů) | 45 |
| výchozí reakce | sada pro Rudu (10, 3 hotové) a pro Báru (6) | 16 |
| úvod: byt, zeď slávy, útěk | | 15 |
| konec kapitoly | klíč, kometa, poslední věta | 4 |

## Minihry

| Minihra | Texty | Odhad |
|---|---|---|
| M01 Charter z trosek | 6 kolonek, dobré útržky a nesmysly ([tabulka](01-iniciace.md#m01-charter-z-trosek-útržky)), reakce | 15 |
| M02 Kdo tu vlastně velí | 6 postav, popisky, reakce Pemboka | 10 |
| M03 | v osnově starosty | – |

## Součet

| Skupina | Odhad replik |
|---|---|
| postavy (věřitelé až babička) | 287 |
| Ruda a prohlížení | 142 |
| minihry M01, M02 | 25 |
| GUI kapitoly | 5 |
| **Celkem** | **≈ 460 na jazyk** |

Rozpočet je 400–500 (D56). Z toho asi 110 replik už je v I1. Když se v N6 ukáže, že je
to moc, škrtají se nejdřív vlastní reakce ★ s nejnižší pravděpodobností a gagy v úvodu.

## Skutečnost po N6 a N4 (2026-11-01)

| | Odhad | Napsáno |
|---|---|---|
| Repliky (mluvené, bez voleb) | ≈ 460 | 546 |
| Volby dialogů | v odhadu | 58 |
| Popisky, útržky, GUI | v odhadu | 117 |

Repliky jsou asi o 19 % nad odhadem a o 9 % nad horní hranicí rozpočtu. Navíc proti osnově jsou
hlavně pátá kola souboje M03, reakce mimo souboj, Bára v archivu a výchozí reakce Báry.
Asi 60 replik jsou vlastní reakce ★ a přečte je jen hráč, který zkouší kombinace, takže
běžný průchod je kratší. Škrtat jde už při autorské kontrole (N4), hlavně ale po playtestu
prototypu (N8), podle toho, co hráči opravdu zkusí.

**Návrhy názvů ke schválení** (D26, slovo charter ani odborné názvy se ve hře neobjeví):
- charter jako předmět: *Papír o Arše* / *The Ark Page*; M01: *Jeden papír o Arše* / *One Page About the Ark*,
- osy M02: *Může Archu zastavit* / *Can stop the Ark* a *Záleží mu na ní* / *Cares about it*,
- M03: *Souboj argumenty* / *War of Words*,
- titulek kapitoly: *Podepište tady* / *Sign Here* (místo pracovního „Iniciace“),
- kocour babičky: *Mourek* / *Marmalade*.
