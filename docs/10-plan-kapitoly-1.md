# Plán výroby kapitoly 1 (samostatná ukázka)

> Jak vyrobit a vydat kapitolu 1 jako samostatnou hratelnou ukázku (D38). Obsah kapitoly je
> v [návrhu kapitoly 1](kapitoly/01-iniciace.md), pracnost vychází z
> [vyhodnocení prototypu](09-vyhodnoceni-prototypu.md).
> Stav: **návrh ke schválení**, verze 0.1

## Cíl

Hratelná kapitola 1 (40–60 minut) v češtině i angličtině, zdarma ve webovém prohlížeči (počítač
i telefon) a jako stažení pro PC a Mac. Má ověřit tři věci:

1. **Zábavnost:** baví hra i lidi, kteří o projektovém řízení nic neví?
2. **Pracnost:** kolik hodin skutečně stojí jedna kapitola (podklad pro rozhodnutí o celé hře)?
3. **Zájem:** stojí lidé o pokračování?

**Mimo rozsah ukázky:** dabing, hudba na míru (stačí volně licencovaná), příspěvky (D19),
Android a iOS v obchodech (web na telefonu stačí), kapitoly 2–5.

## Přístup: plánované milníky, výroba v iteracích

Výrobu řídíme stejně, jak to hra učí (D22): pevný rámec s milníky a uvnitř krátké iterace,
které vždy končí hratelnou verzí.

- **Pevně naplánované:** rozhodnutí na začátku, grafický styl a rozsah kapitoly, milníky, vydání.
- **Iterativně:** samotná výroba scén, textů a miniher. Po každé iteraci autor hraje, zapíše
  čas a připomínky a podle nich se upraví další iterace.
- **Měří se čas** na každou iteraci (podklad pro D38 a pro rozhodnutí o celé hře).

## Fáze a milníky

| Fáze | Obsah | Odhad | Milník |
|---|---|---|---|
| **F0 Rozhodnutí** | otevřené otázky níže, zkouška popředí a širšího pozadí | 3–5 h | **MA:** pravidla grafiky a ovládání uzamčena |
| **F1 Papírové minihry** | M03 Souboj argumenty, M01 Charter, M02 Kdo velí na papíře, 3–5 testerů | 4–8 h | **MB:** pravidla miniher schválena (D53) |
| **F2 Grafika** | pozadí, referenční listy postav, ikony, části Rudy pro animaci | 10–15 h | **MC:** veškerá grafika schválena |
| **F3 Výroba** | iterace I1–I6 (viz níže) | 40–65 h | **MD:** kapitola dohratelná od začátku do konce |
| **F4 Testování** | 5 hráčů (aspoň 2 bez znalosti PM), opravy, vyvážení nápověd | 8–15 h | **ME:** připraveno k vydání |
| **F5 Vydání** | itch.io stránka, web + PC + Mac, krátké video, oznámení | 4–6 h | **MF:** vydáno |
| **Celkem** | | **≈ 70–115 h** | |

F1 a F2 mohou běžet souběžně. Iterace F3 se mohou s F2 překrývat: grafika se dodává scénu po scéně.

Při 5–8 hodinách týdně to vychází na **3–5 měsíců**.

**Materiály k F1:** [tiskový balíček](papirove-prototypy/kapitola-1.pdf) (průvodce testem, karty
a herní desky pro M03, M02 a M01; zdroj `papirove-prototypy/vytvor.py`).

**Milník MB splněn (2026-10-31):** pravidla miniher schválena podle papírových modelů bez
papírového testu (D53); zapracují se tak, jak jsou, a testovat se budou až ve hře.

## Iterace výroby (F3)

Každá iterace končí hratelnou verzí na webu, autor ji projde na počítači i telefonu.

| Iterace | Obsah (podle návrhu kapitoly 1) | Hotovo, když |
|---|---|---|
| **I1 Náměstí** | náměstí ve finální grafice, Bára (rozhovor R1.3), Pan Změna vidět, vrátný, plakát s číslem, kávové pero a podpis | obě cesty k číslu projektu fungují |
| **I2 Archiv** | archivář Lumír, kartotéka seřazená podle skutečného data (puzzle), tlačítko „2“, původní zadání, karta poučení, katastrální mapa | z archivu jde odnést všechno potřebné |
| **I3 Starosta** | vestibul s výtahem, starostova pracovna, **M03 Souboj argumenty**, R1.1 | souboj jde vyhrát poctivě i „sliby“ a příznak se uloží |
| **I4 Babička** | chaloupka, babička, kocour, **M02 Kdo velí**, R1.2, razítková poduška | babička jde odhalit, i přehlédnout |
| **I5 Komise** | kancelář Komise, fronta na frontu, **hratelný úsek za Báru**, **M01 Charter**, Předseda, R1.4, závěr kapitoly | kapitola jde dohrát; konec ukáže, co si hra zapamatovala |
| **I6 Rámec hry** | úvod (3–5 min), hlavní menu, ukládání, nastavení, titulky, závěrečná obrazovka „pokračování příště“ | hra je celá od spuštění po konec |

**Stav I1 (2026-10-31):** náměstí ve finální grafice (široké pozadí, nově vyříznutá kašna,
přenastavená aktivní místa a pochozí plocha). Bára, vrátný a Pan Změna stojí na náměstí jako
nehybné postavy ze schválených listů (animace stání a mluvení přijdou se zadáním pro ChatGPT).
Ruda začíná s dekretem, kávou, propiskou a Prof. Pembokem, který vysvětlí úkol a radí podle stavu
hry (u Pana Změny ve dvou stupních). Obě cesty k číslu projektu fungují a jsou ověřené ladicími
průchody: Bára ho řekne jen tomu, kdo ji v prvním rozhovoru nechá domluvit (R1.3), jinak pošle
Rudu k Panu Změnovi; ten za podepsaný požadavek kávovým perem vydá plakát s číslem. Ikony
předmětů jsou z listu `ikony-1`. **Dočasně:** dveře radnice hlídá vrátný (bez čísla nepustí),
než v I2 přibude Lumír. Čeká: projít na počítači a telefonu, nasadit na web.

Pro každou iteraci platí **definice hotového:**
- všechny texty v češtině i angličtině, `kontrola_textu.py` bez chyb,
- funguje myší i prstem, ve webové verzi i v editoru,
- každý puzzle má nápovědu (Prof. Pembok) a žádná slepá ulička,
- zapsaný čas a připomínky autora v tabulce níže.

## Rozhodnutí potřebná na začátku (F0)

| # | Otázka | Doporučení | Rozhodnutí |
|---|---|---|---|
| R1 | Poměr stran pozadí | širší pozadí (19,5:9), důležitý obsah v pásu 3:2 uprostřed | ✅ vyzkoušeno na náměstí (D49) |
| R2 | Postava za předmětem | vyzkoušet na kašně: popředí jako samostatná vrstva vyříznutá z pozadí | ✅ vyzkoušeno na kašně (D50) |
| R3 | Prohlédnutí na dotyku | dlouhé podržení prstu = prohlédnout; na počítači dál pravé tlačítko | ✅ podržení prstu; v nastavení nabídka po ťuknutí (D43) |
| R4 | Písmo | komiksové písmo s úplnou češtinou (licence OFL), barvy textu podle postav | ✅ Patrick Hand pro celé GUI (D48), [náhled](styl/vzorky/pisma-nahled_v01.png) |
| R5 | Předseda: záporák od začátku, nebo zvrat? | zvrat ve 4. kapitole; v kapitole 1 jen náznaky (závěrečný telefonát zamlžit) | ✅ zvrat ve 4. kapitole (D44) |
| R6 | Anglická jména a název | potvrdit tabulku v příběhové bibli | ✅ jména podle vtipu, město Scope Creek (D47) |
| R7 | Kde vydat | itch.io (hra zdarma, web i stažení, HTTPS a komprese zajištěné) | ✅ itch.io + GitHub Pages pro testery (D45) |
| R8 | Hudba a zvuky | volně licencované (CC0/CC-BY), seznam autorů v titulcích | ✅ CC0 / CC-BY (D46) |

## Grafika (F2)

| Položka | Počet | Poznámka |
|---|---|---|
| Pozadí | 6 (náměstí, vestibul, archiv, starostova pracovna, kancelář Komise, chaloupka) | náměstí a archiv lze převzít z prototypu, pokud se nezmění poměr stran |
| Večerní verze | 1–2 | jen kde to příběh potřebuje |
| Referenční listy postav | 7 nových (Předseda, starosta, Pan Změna, Lumír, babička, vrátný, Ing. Framework) + kocour | Ruda a Bára hotové (D30) |
| Ikony předmětů | cca 15 | ve stylu hry místo zástupných |
| Animace postav | Ruda hotový, ostatní v F3 | kreslené fáze podle [animací postav](styl/animace-postav.md) (D40–D42) |

**Zadání pro ChatGPT a stav výroby:** [Grafika kapitoly 1](11-grafika-kapitoly-1.md).

**Milník MC splněn (2026-10-31):** pozadí schválena (D51), listy postav a ikony 1–17 schváleny (D52).

## Rizika

| Riziko | Dopad | Opatření |
|---|---|---|
| Psaní textů ve dvou jazycích trvá déle, než se čeká | posun vydání | psát kapitolu po iteracích, měřit čas; vtipy dolaďovat v F4 |
| M03 Souboj argumenty je náročný na repliky | nejdražší minihra | papírový test v F1 jako první; začít s 8–10 kolama |
| AI postavy nebudou konzistentní napříč scénami | rozbitý dojem | referenční listy a předloha stylu (D30); kontrolní seznam |
| Rozšiřování rozsahu během výroby („ještě tohle“) | nekonečná výroba | nové nápady do seznamu pro další kapitoly, ne do kapitoly 1; změny rozsahu jen vědomě a zapsané |
| Autor nebude mít čas | výroba se zastaví | malé iterace, každá končí hratelnou verzí; pauza nic nerozbije |
| Hráči nepochopí puzzle | frustrace | nápovědy ve stupních, test s hráči bez znalosti PM |

## Záznam času a připomínek

| Iterace / fáze | Odhad | Skutečnost | Poznámky |
|---|---|---|---|
| F0 | 3–5 h | | |
| F1 | 4–8 h | | papírový test vynechán, modely schváleny (D53) |
| F2 | 10–15 h | | |
| I1 | 6–10 h | | |
| I2 | 6–10 h | | |
| I3 | 8–12 h | | |
| I4 | 6–10 h | | |
| I5 | 10–15 h | | |
| I6 | 5–8 h | | |
| F4 | 8–15 h | | |
| F5 | 4–6 h | | |

## Co bude po vydání

Vyhodnocení ukázky: skutečný čas proti odhadu, ohlasy hráčů, a podle toho rozhodnutí o rozsahu
celé hry (počet kapitol, miniher, délka) a o dalších platformách.
