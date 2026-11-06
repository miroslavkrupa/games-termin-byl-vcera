# Koncepce: Dva světy, jedna Archa

> Jednotící myšlenka hry (D22). Podle ní se řadí minihry, kapitoly, postavy i konce. Když
> nějaký prvek hry do této koncepce nezapadá, je potřeba ho upravit, nebo vyřadit.
> Stav: **schváleno**, verze 1.0

## Myšlenka

**Archa se skládá z částí různé povahy a každá potřebuje jiný přístup.** Úspěch nepřinese
jednotná metodika, ale kombinace přístupů zvolená podle povahy práce, tedy hybridní řízení.

Hybridní řízení tu chápeme podle definice Krupa, Šimůnek a Hájek (2023): kombinace prvků
tradičního a agilního řízení s cílem získat výhody a potlačit nevýhody obou. Není to přizpůsobení
jednoho přístupu ani dočasný přechod od jednoho k druhému. Hra proto ukazuje kombinaci na dvou
úrovních:
- **společný rámec** celého projektu: charter, pevný termín komety, milníky, rozpočet;
- **dodávání podle povahy práce**, propojené spojovacími praktikami.

Zároveň ukazuje, že některé části jsou správně čistě prediktivní a jiné čistě agilní.

## Čtyři patra

| Patro | Části Archy | Povaha práce | Jak se pracuje |
|---|---|---|---|
| **Společný základ** | celý projekt | platí pro všechno | proč, pro koho, kdo rozhoduje, rizika, poučení |
| **Svět plánu** | rampa, trup, pohon, **startovací bezpečnostní systém** | jasné požadavky, drahé nebo nevratné změny, fyzikální a úřední omezení | plánovat dopředu, hlídat závislosti a kritickou cestu, měřit plnění plánu |
| **Svět iterací** | řídicí systém, evakuační aplikace, nástup obyvatel, **interiér Archy** | nejasné požadavky, uživatelé nevědí, co chtějí, levné změny | zkoušet v krátkých cyklech, ukazovat uživatelům, řadit podle hodnoty |
| **Spojka** | místa, kde se části potkávají | software musí být hotový, než se zavře trup; trup musí znát váhu zařízení | integrační milníky, společná roadmapa, sladění změn |

### Kritérium: povaha práce, ne obor (D24)

Hra schválně porušuje zjednodušení „železo plánem, software iteracemi“:
- **Startovací bezpečnostní systém** je software, ale má pevnou specifikaci a musí projít
  certifikací. Patří do **světa plánu**.
- **Interiér Archy** (kajuty, společné prostory) je fyzický, ale navrhuje se postupně
  s obyvateli na maketách. Patří do **světa iterací**.

Hráč, který si odvodil pravidlo „železo = plán“, na výjimkách narazí a pochopí skutečné
kritérium: jasnost požadavků, cenu změny a vratnost kroků.

### Vizuální symbol: rovná rampa (D34)

Startovací rampa je jediná rovná stavba v křivé Nedostavěnici. Je to stavba světa plánu:
přesná, podle výkresů, s čistými hranami. Hráč tak rozdíl mezi světy vidí i bez jediného slova.

## Postavy jako dva světy (D25)

| Postava | Svět | Síla | Vada |
|---|---|---|---|
| **Ruda Gantt** | plán | struktura, termíny, závazky, přehled o závislostech | plánuje i to, co se naplánovat nedá; slibuje přesné termíny tam, kde nikdo neví, co se staví |
| **Bára Backlogová** | iterace | zkouší, měří, ptá se uživatelů, ví, co má hodnotu | nerada se zavazuje k termínu; nejraději by zkoušela donekonečna („plány stejně nevyjdou“) |
| **Předseda Věčný** | zvrhlý plán | – | proces pro proces, nekonečné „následné fáze“, schvalování bez rozhodnutí |
| **Ing. Framework** | zvrhlé iterace | – | rituály bez smyslu, „agilní krabice“ na všechno, i na beton |

- **Romantická linka je metafora hybridu.** Dva světy se nejdřív nesnášejí, pak se naučí
  spolupracovat a každý přinese svou sílu. Pravý konec nastane, když se spojí.
- **Záporáci jsou zneužití, ne metodiky.** Hra se nesměje plánu ani iteracím, ale jejich
  zvrhlým podobám.

## Mechanika nese rozdíl

Hráč pozná rozdíl mezi světy rukama, ne z textu:
- **Minihry světa plánu jsou deterministické.** Pravidla jsou známá, pečlivé plánování dopředu
  se vyplatí, zapomenutá závislost se později vymstí.
- **Minihry světa iterací pracují se skrytou informací.** Skutečná hodnota se ukáže až po dodání
  nebo po ukázce uživatelům. Detailní plán dopředu je promarněná práce.
- **Minihry spojky** odměňují sladění obou rytmů: pevných milníků a průběžných verzí.

Přiřazení miniher k patrům je v [seznamu miniher](04-minihry.md).

## Metodický oblouk kapitol

| Kapitola | Patro v popředí | Co se děje |
|---|---|---|
| 1. Iniciace | společný základ | proč, pro koho, kdo rozhoduje; platí pro celou Archu. Ruda a Bára se poprvé střetnou: on slibuje, ona měří |
| 2. Plánování | rozdělení Archy | Ruda chce Gantt na všechno, Ing. Framework sprinty na všechno; hráč rozhodne, která část potřebuje jaký přístup |
| 3. Realizace | oba světy paralelně | hra střídá Rudu na rampě a Báru u softwaru a interiéru |
| 4. Krize | spojka | co se nesladilo, srazí se na rozhraní; vrcholí oba záporáci; Ruda s Bárou se rozkmotří, vztahová krize je zároveň metodická |
| 5. Uzavření | spojka | integrace a start; Ruda a Bára společně |

## Konce podle světů

| Konec | Co se stalo |
|---|---|
| **Pomník** (jen plán) | Archa odstartuje na vteřinu přesně, ale uvnitř nikdo neví, kde sedí; obletí město a přistane, kde začala |
| **Druhá etapa** (jen iterace) | skvělá aplikace a útulné kajuty, ale bezpečnostní systém z krabice má limit metr; Předseda vyhrál |
| **Hrdina** a **Tým** (spojení) | Archa letí a přistane; Ruda si připíše zásluhy, nebo řekne „my“ a tým jde na další projekt |

Přesné podmínky, epilog podle Bářiny důvěry (termín) a scéna po titulcích jsou v [bibli](03-pribehova-bible.md#konce)
a v [návrhu kapitoly 5](kapitoly/05-uzavreni.md#konce) (D79).

Konce kombinují metodickou osu s Rudovým osobním vývojem (viz [příběhová bible](03-pribehova-bible.md)).

## Slovník ve hře (D26)

Ve hře se nepoužívají slova agilní, prediktivní ani hybridní. Postavy mluví o „Rudově způsobu“
(plán, termín, harmonogram) a „Bářině způsobu“ (zkusit, ukázat, zeptat se). Odborné názvy se
objeví jen ve volitelném Deníku projektového manažera, až když je hráč zažil.
