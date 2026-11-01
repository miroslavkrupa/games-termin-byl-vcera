# Postup návrhu: nejdřív papír, potom texty, potom výroba

> Jak dokončit návrh celé hry dřív, než začne technická výroba v Godotu. Všechny kapitoly se
> navrhnou do detailu a autor je sám zkontroluje (D54, D55, D66). Mění pořadí fází
> v [plánu výroby kapitoly 1](10-plan-kapitoly-1.md): iterace I2–I6 počkají, až bude celá hra
> na papíře a kapitola 1 bude mít první verzi textů.
> Stav: **návrh ke schválení**, verze 0.3

## Proč

- **Výroba předběhla návrh.** Kapitola 1 má graf závislostí, scény, průběh ve 12 krocích,
  rozhodnutí a pravidla miniher. Chybí ale podklady, podle kterých se dá stavět bez improvizace:
  úplný průchod hrou, karty puzzlů s nápovědami, obsah místností, matice předmětů, osnovy dialogů
  a texty. Kapitoly 2–5 mají jen osnovu v [příběhové bibli](03-pribehova-bible.md).
- **Kód je levný, obsah drahý.** Prototyp změřil, že nejvíc stojí texty ve dvou jazycích, grafika
  a minihry ([vyhodnocení](09-vyhodnoceni-prototypu.md)). Chyba návrhu objevená v Godotu znamená
  přepsat kód, texty v obou jazycích a někdy i grafiku. Na papíře znamená přepsat řádek.
- **Hra stojí na následcích napříč kapitolami.** R1.1–R1.4 se vracejí ve 3. a 4. kapitole,
  R2.2 rozhoduje o koncích, předměty a postavy přecházejí mezi kapitolami. Jestli to celé drží
  pohromadě, jde ověřit jen na návrhu celé hry.

## Zásady

1. **Každý krok má výstup a bránu.** Dokud výstup není hotový a schválený autorem, nejde se dál.
2. **Celá hra do detailu, než začne technická výroba (D55).** Nejdřív kostry všech kapitol
   (celek), potom každá kapitola do detailu, nakonec kontrola celé hry dohromady.
3. **Pořadí výroby a vydání se nemění.** Kapitola 1 se vyrobí a vydá první (D38), další kapitoly
   po ní. Texty první verze se píšou vždy pro kapitolu, která jde do výroby (viz N6).
4. **Od konce k začátku.** Hra se navrhuje od konců zpět ke kapitole 1, každý puzzle od cíle
   zpět, dialog od informace, kterou má hráči předat.
5. **Nejdřív logika, potom vtip.** Osnovy dialogů říkají, *co* se hráč dozví. Vtipné repliky se
   píšou v N6 a dolaďují po playtestu.
6. **Návrh žije v dokumentech, ne v hlavě ani v kódu.** Co se změní, změní se nejdřív na papíře.
   Rozhodnutí patří do [záznamu rozhodnutí](00-rozhodnuti.md).
7. **Hotové se nezahazuje.** Grafika kapitoly 1 (milník MC) i iterace I1 zůstávají, jen se
   zkontrolují podle nového návrhu.
8. **Uzamčený neznamená zabetonovaný.** Po bráně A se návrh nemění potichu. Když playtest
   kapitoly 1 ukáže problém, opraví se i návrh dalších kapitol, ale vědomě a se záznamem.

## Přehled kroků

| Krok | Co | Výstup | Stav (2026-10-31) | Odhad |
|---|---|---|---|---|
| **N0** | Rozsah celé hry | rozhodnutí o délce, počtu kapitol a miniher | ✅ 4–5 h v 5 kapitolách, 11 miniher, rozpočty kapitol (D56–D58) | 1–2 h |
| **N1** | Příběh celé hry | kontrola [příběhové bible](03-pribehova-bible.md), osnova kapitol | ✅ hotovo: kapitoly v kostce, D59–D61 | 2–4 h |
| **N2** | Kostry kapitol 2–5 | kostry a mapa následků (celek dřív než detail) | ✅ kostry a mapa následků schváleny (D62) | 4–8 h |
| **N3** | Každá kapitola do detailu | pro kapitoly 1–5: obsah místností, průchod, karty puzzlů, matice předmětů, osnovy dialogů, úvod a konec | ⚠️ kapitola 1 hotová, kapitola 2 [ke schválení](kapitoly/02-planovani.md), 3–5 chybí | 50–95 h |
| **N4** | Autorská kontrola každé kapitoly | autor projde kapitolu sám, opravy | ⚠️ kapitola 1 ✅ ([kontrola](kapitoly/01-kontrola.md), D67), kapitola 2 ✅ ([kontrola](kapitoly/02-kontrola.md), D68), 3–5 čekají na N3; papírový průchod s hráči zrušen (D66) | 5–10 h |
| **N5** | Celá hra dohromady | kontrola napříč kapitolami → **brána A** | ❌ | 4–8 h |
| **N6** | Texty první verze | repliky kapitoly v CS i EN v `texty.csv` → **brána B** | ⚠️ kapitola 1: první verze všech textů (540 replik, 712 textů), předsunuto před N4 (D65); brána B až po N4 a N5 | 15–25 h na kapitolu 1 |
| **N7** | Výroba v Godotu | iterace I2–I6, kontrola I1 → milník **MD** | ⏸️ I1 hotová, I2+ čekají na bránu B | 40–65 h |
| **N8** | Playtest | 5 hráčů, opravy → milník **ME** | – | 8–15 h |
| **N9** | Ladění a vydání | vtipy, zvuk, animace, itch.io → milník **MF** | – | 8–12 h |

**Papírová část N0–N5 vychází zhruba na 65–125 h**, při 5–8 hodinách týdně na 3–6 měsíců před
prvním dalším krokem v Godotu. Odhad N3 počítá s kapitolou 1 za 8–15 h a s kapitolami 2–5
za 10–20 h každou, protože kapitoly 2 a 3 jsou větší. Zpřesní se po kapitole 1.

Vztah k [plánu kapitoly 1](10-plan-kapitoly-1.md): F0–F2 jsou hotové. N0–N6 se vkládají mezi F2
a F3, N7 je F3, N8 je F4, N9 je ladění z F4 a vydání F5. Kapitoly 2–5 pak opakují N6–N9.

---

## N0 Rozsah celé hry

**Proč první:** detailní návrh všech kapitol je velká práce. Navrhovat kapitoly nebo minihry,
které pak vypadnou, by byla ztráta.

- Rozhodnout cílovou délku: 8–12 h podle [vize](01-vize.md), nebo 4–6 h podle doporučení
  z [vyhodnocení](09-vyhodnoceni-prototypu.md).
- Rozhodnout počet miniher (14, nebo 8–10) a které vypadnou (kandidáti M05, M12).
- Rozhodnout, jestli se kapitoly 2 a 3 sloučí nebo zkrátí.
- Rozhodnout, jestli je prolog samostatná část, nebo úvod kapitoly 1 (otevřená otázka
  v [kapitole 1](kapitoly/01-iniciace.md)).
- Stanovit **rozpočet kapitoly**: kolik scén, postav, předmětů, replik a miniher smí mít.
  Detailní návrh ho pak hlídá.

**Výstup:** nové řádky v záznamu rozhodnutí, upravená vize, seznam miniher a rozpočty kapitol.

**✅ Hotovo (2026-10-31):** 4–5 hodin v 5 kapitolách, kapitoly 2 a 3 zůstávají oddělené (D56);
prolog je úvodem kapitoly 1 (D57); vyřazeny M05, M08 a M12, zůstává 11 miniher (D58).
[Rozpočty kapitol](05-produkce.md#rozpočty-kapitol) jsou v produkčních zásadách.

## N1 Příběh celé hry

Bible už má dějový oblouk, osnovu kapitol, stavové proměnné, následky i konce. Zbývá:

- uzavřít [otevřené otázky bible](03-pribehova-bible.md#otevřené-otázky): hraní za Báru v dalších
  kapitolách, romantická linka v koncích, tajný konec (prahy konců počkají na playtesty),
- ke každé kapitole doplnit jednou větou **začátek, cíl, zvrat a konec** (beat sheet), aby šlo
  zkontrolovat tempo celé hry,
- upravit osnovu podle N0.

**Výstup:** aktualizovaná bible.

**✅ Hotovo (2026-10-31):** [kapitoly v kostce](03-pribehova-bible.md#kapitoly-v-kostce) v bibli;
za Báru se hraje i v kapitole 4 (D59), romance mění epilog (D60), tajný konec je scéna po
titulcích (D61). Prahy konců počkají na playtesty.

## N2 Kostry kapitol 2–5

Než se jde do detailu, vznikne celek: každá kapitola dostane kostru na 1–2 strany
v `docs/kapitoly/0X-nazev.md`. Kostra se v N3 rozroste v úplný návrh, stejně jako
[kapitola 1](kapitoly/01-iniciace.md).

```markdown
# Kapitola X: Název
- **Cíl hráče:** jedna věta
- **Místa:** nová / převzatá z dřívějších kapitol (grafika je drahá, opakovat se vyplatí)
- **Postavy:** nové / vracející se
- **Hlavní graf:** 5–10 uzlů v Mermaidu (jen hlavní linka)
- **Minihry:** které a kde
- **Rozhodnutí:** RX.Y, příznak a kde se vrátí
- **Čte příznaky:** které příznaky z dřívějška tu mají následek a jaký
- **Hraní za Báru:** ano / ne, kde
- **Rozpočet:** scény, postavy, předměty, repliky (z N0)
```

**Mapa následků:** k tabulce [rozhodnutí a následků](03-pribehova-bible.md#rozhodnutí-a-jejich-pozdější-následky)
v bibli doplnit sloupce *příznak*, *nastaví se v* a *čte se v*. Kontrola: každé rozhodnutí má
následek, každý následek má zdroj.

**Výstup:** čtyři kostry a doplněná mapa následků. Autor je schválí, než začne N3.

**Stav (2026-10-31):** kostry [2](kapitoly/02-planovani.md), [3](kapitoly/03-realizace.md),
[4](kapitoly/04-krize.md) a [5](kapitoly/05-uzavreni.md) a
[mapa následků](03-pribehova-bible.md#rozhodnutí-a-jejich-pozdější-následky) schváleny (D62).

## N3 Každá kapitola do detailu

Pořadí: **kapitola 1** (je nejdál), potom **2 → 3 → 4 → 5**. Po každé kapitole se aktualizuje
mapa následků a kostry dalších kapitol, pokud se něco změnilo.

Pro každou kapitolu X vzniknou ve složce `docs/kapitoly/` tyto části. Základem je návrh
kapitoly (`0X-nazev.md`: scény, graf, rozhodnutí, minihry), ostatní jsou samostatné soubory.

### N3a Obsah místností → `0X-mistnosti.md`

Pro každou scénu jedna tabulka:

| Prvek | Druh | Prohlédnout (podstata) | Použít / mluvit | Podmínka | Poznámka |
|---|---|---|---|---|---|
| Kašna | aktivní místo | rezavá, místo vody kafe? | nic | – | popředí (D50) |
| Bára | postava | … | dialog `bara_1` | – | R1.3 |
| Východ do vestibulu | východ | … | přechod S2 | dveře hlídá vrátný | |

Plus seznam **předmětů k sebrání** (kde leží, kdy se objeví) a **východů** (kam vedou, kdy
jsou zamčené). U místa převzatého z dřívější kapitoly: co se na něm změnilo.

### N3b Průchod hrou (walkthrough) → `0X-pruchod.md`

Každá akce hráče na samostatném řádku, od začátku po konec kapitoly. Ve třech verzích:

1. **Nejkratší cesta:** co nejméně kroků.
2. **Úplná cesta:** včetně všech volitelných věcí a úseků za Báru.
3. **Varianty:** náhradní cesty, prohrané nebo přeskočené minihry, všechny volby rozhodnutí
   a **různé stavy na začátku kapitoly** podle rozhodnutí z dřívějška (např. kapitola 4
   s babičkou jako spojencem i jako překážkou).

Formát řádku: `12. S3 Archiv · Ruda · použij Metr na Regál → najde přihrádku · nastaví c1_…`

Ze stejného průchodu se v N7 udělá automatický test (viz níže).

**Kontrola slepých uliček:** u každého předmětu, kde vznikne, kde se spotřebuje a jestli ho jde
ztratit dřív, než je potřeba.

### N3c Karty puzzlů → `0X-puzzly.md`

Jedna karta na každý puzzle z grafu:

```markdown
### PX.y Název
- **Cíl hráče:** co chce Ruda (Bára) dosáhnout, jeho slovy
- **Překážka:** proč to nejde hned
- **Řešení:** přesné kroky
- **Stopy ve světě:** odkud může hráč řešení odvodit (prohlédnutí, replika, obrázek); aspoň dvě
- **Chybné, ale logické pokusy:** co hráče napadne a jak hra odpoví (vlastní reakce, ne výchozí)
- **Nápověda Prof. Pemboka:** 1. náznak / 2. směr / 3. skoro řešení
- **Příznaky:** co nastaví a co čte
- **Co nese (skrytě):** téma z výukové matice; ve hře se nejmenuje (D26)
- **Riziko:** „moon logic“, nuda, pracnost
```

### N3d Matice předmětů → v `0X-mistnosti.md`

Tabulka **předmět × cíl** (aktivní místa, postavy, jiné předměty):

| | Kašna | Bára | Pan Změna | Káva | … |
|---|---|---|---|---|---|
| Propiska | – | ★ | ★ | ✔ kávové pero | |
| Dekret | – | ★ | – | – | |

✔ = řešení, ★ = vlastní vtip, – = výchozí reakce. Cíl: každá kombinace, kterou zkouší víc
lidí, má ★. Matice se doplní po playtestu prototypu (N8) podle toho, co hráči
skutečně zkoušeli.

### N3e Osnovy dialogů → `0X-dialogy.md`

Pro každou postavu bez finálního textu:

| Téma (volba) | Podstata odpovědi | Podmínka | Mění | Odhad replik |
|---|---|---|---|---|
| Kdo rozhoduje o Arše? | starosta, 2. patro | – | – | 4 |
| Číslo projektu | řekne ho, jen když ji Ruda nechal domluvit | `c1_bara_vyslechnuta` | – | 6 |

Součet odhadů replik se porovná s rozpočtem kapitoly z N0.

### N3f Minihry kapitoly

Pravidla podle [šablony miniher](04-minihry.md#šablona-pro-novou-minihru) a papírový model.
Kapitola 1 je má hotová (D53). Minihry všech kapitol se testují až ve hře (D53, D66). U M13
a M14, které nesou rozdíl mezi světy, autor v N4 aspoň projde pravidla krok za krokem.

### N3g Úvod a konec kapitoly

- **Úvod:** osnova po záběrech (kde, kdo, co se stane). U kapitoly 1 i to, co se hráč naučí ovládat.
- **Konec:** závěrečná scéna a co si hra zapamatovala. U kapitoly 5 všechny konce z bible.

### N3h Kontrola kapitoly proti zásadám

Před N4 projít kapitolu podle tohoto seznamu:

- [ ] pilíře [vize](01-vize.md): nejdřív hra, učí mechanika, rozhodnutí mají váhu, absurdní ale fér
- [ ] žádné slovo agilní, prediktivní ani hybridní, žádné odborné pojmy (D26)
- [ ] žádný puzzle na jazykové hříčce (D03)
- [ ] nic nezávisí na najetí myší (D04)
- [ ] žádná slepá ulička, minihry přeskočitelné (D12)
- [ ] hráč má většinou rozdělané 2–3 úkoly najednou (graf není čára)
- [ ] každý puzzle má aspoň dvě stopy ve světě a tři stupně nápovědy (D10)
- [ ] PEGI 12 (D11)
- [ ] kapitola se vejde do rozpočtu z N0
- [ ] uzavřené otevřené otázky kapitoly

## N4 Autorská kontrola každé kapitoly

Ověří logiku kapitoly bez kódu a bez hráčů. Autor ji dělá sám hned po N3 dané kapitoly.
Testování s lidmi se dělá až na prototypu v Godotu (N8, D66).

- **Průchod:** projít nejkratší cestu a všechny varianty z `0X-pruchod.md` krok za krokem proti
  kartám puzzlů a obsahu místností. Ke každému kroku musí existovat stopa ve světě.
- **Pohled nováčka:** u každého puzzlu si říct, co by zkusil hráč, který o projektovém řízení
  nic neví, a jestli na to matice předmětů odpoví.
- **Stav na začátku:** u kapitol 2–5 projít aspoň jednu cestu s „dobrými“ a jednu se „špatnými“
  volbami z dřívějška.
- **Po kontrole:** opravit N3 dané kapitoly, zapsat rozhodnutí. Odhad délky kapitoly je jen
  odhad, změří se až v N8.

## N5 Celá hra dohromady

Po poslední kapitole se ověří, že hra drží pohromadě:

- [ ] **Příznaky:** každý příznak se nastaví dřív, než se čte, a každý nastavený příznak se
  někde čte (mapa následků)
- [ ] **Konce:** ke každému konci existuje cesta; spočítat, jaké volby k němu vedou
- [ ] **Předměty a postavy mezi kapitolami:** co si hráč nese dál a co se s tím stane
- [ ] **Tempo:** odhadované délky kapitol, střídání puzzlů, miniher, dialogů a úseků za Báru
- [ ] **Výuková matice:** každé téma z [matice](02-vyukova-matice.md) má mechaniku a místo ve hře
- [ ] **Metodický oblouk:** kapitoly sledují [koncepci](07-dva-svety.md) (společný základ →
  rozdělení → dva světy → krize na rozhraní → integrace)
- [ ] **Opakující se vtipy** rozložené přes celou hru
- [ ] **Rozsah:** součet scén, postav, replik a miniher proti N0; odhad hodin výroby celé hry

**Brána A, celá hra uzamčena:** všechny kapitoly prošly autorskou kontrolou (N4), kontrolní seznamy
N3h a N5 jsou odškrtnuté, autor návrh schválil.

## N6 Texty první verze

Píšou se pro kapitolu, která jde do výroby: nejdřív kapitola 1, další kapitoly vždy před svou
výrobou. Osnovy dialogů a karty puzzlů z N3 už jsou hotové, takže texty jen plní uzamčený návrh.

Píše se rovnou do `hra/texty/texty.csv`, které zůstává jediným zdrojem textů. Řádky jsou
seřazené podle scén a ID mají předponu (`ch1_bara_…`). Pro čtení si jde nechat vygenerovat
přehled scénáře.

**Pořadí psaní:**
1. hlavní linka a informace, které hráč potřebuje k puzzlům (z osnov dialogů),
2. prohlédnutí všech aktivních míst a předmětů,
3. vlastní reakce ★ z matice předmětů,
4. výchozí reakce (sada pro Rudu i Báru, každá jinak),
5. nápovědy Prof. Pemboka (tři stupně u každého puzzlu),
6. texty miniher,
7. úvod, konec a obrazovka následků,
8. GUI.

**Pravidla:** stabilní ID, mluvčí, emoce a poznámka u každé repliky (příprava na dabing, D07);
čeština i angličtina zároveň a vtipy jako transkreace (D03); repliky krátké, aby se vešly na
telefon (délku ověřit na prvních scénách v N7).

**Kontrola:** `python3 hra/nastroje/kontrola_textu.py` bez chyb; autor přečte kapitolu nahlas
v obou jazycích; kontrola slovníku podle D26.

**Brána B, texty kapitoly první verze:** všechny repliky kapitoly existují v obou jazycích
a sedí na průchod. Vtipy nemusejí být finální, doladí se v N9.

## N7 Výroba v Godotu

Iterace I2–I6 podle [plánu](10-plan-kapitoly-1.md) s jediným rozdílem: staví se podle
průchodu, karet puzzlů, obsahu místností a textů, ne podle odstavce v návrhu kapitoly.

- **Nejdřív kontrola I1:** porovnat náměstí s obsahem místností, maticí a texty a doplnit, co chybí.
- **Automatický průchod:** z `01-pruchod.md` vznikne sekvence pro `ladeni.gd` (akce, volby,
  použití předmětů), která projde kapitolu od začátku do konce. Po každé iteraci se spustí
  a odhalí rozbité cesty. Varianty z průchodu jsou samostatné sekvence.
- Platí **definice hotového** z plánu (oba jazyky, myš i prst, nápověda, žádná slepá ulička, čas).

## N8 Playtest

- **5 hráčů**, aspoň 2 bez znalosti PM, ideálně i jeden na telefonu.
- **Autor mlčí a nenapovídá.** Hráč může mluvit nahlas, co si myslí.
- **Záznamový arch:** čas na každý puzzle; kde hráč víc než 3 minuty nepostoupil; kolik a kterých
  nápověd použil; co zkoušel (nápady do matice); kde se smál a kde se nudil.
- **Cíle:** kapitolu dohraje bez pomoci autora; žádný puzzle nevyžaduje u většiny hráčů 3. stupeň
  nápovědy; délka podle rozpočtu kapitoly (u kapitoly 1 40–60 minut).
- Po každých 1–2 hráčích opravit a teprve pak pozvat dalšího.
- **Poučení přenést do návrhu dalších kapitol** (zásada 8).

## N9 Ladění a vydání

- **Vtipy a texty** podle reakcí z playtestu, druhé kolo transkreace.
- **Animace** vedlejších postav (stání, mluvení) a **zvuk** (D46).
- **Vydání** podle F5: itch.io, web, PC, Mac (D45).
- **Retrospektiva:** skutečný čas proti odhadu a co změnit v návrhu dalších kapitol.

Další kapitoly pak opakují N6 → N7 → N8 → N9.

---

## Kdo co dělá

| Krok | Claude | Autor |
|---|---|---|
| N0–N2 | navrhne varianty s dopady, kostry kapitol, mapu následků, kontroluje konzistenci | rozhoduje a schvaluje |
| N3 | sepíše první verze průchodu, karet, matice a osnov; kontroluje graf × průchod × matice | vymýšlí puzzly a vtipy, škrtá |
| N4 | porovná průchod s kartami, maticí a obsahem místností, hlásí mezery | projde kapitolu sám, rozhodne opravy |
| N5 | projde příznaky, konce a rozsah napříč kapitolami | schvaluje bránu A |
| N6 | píše první verzi textů v obou jazycích (D09), hlídá ID a kontroly | upravuje humor a hlas postav, čte nahlas |
| N7 | staví místnosti a logiku, píše automatický průchod | zkouší v editoru a na telefonu |
| N8 | připraví arch, vyhodnotí záznamy | vede playtesty |
| N9 | opravy, export, nasazení | ladí vtipy, vydává |

## Brány a milníky

| Brána | Po kroku | Podmínka |
|---|---|---|
| **A Celá hra uzamčena** | N5 | všechny kapitoly prošly autorskou kontrolou (N4), kontroly N3h a N5 splněny, schváleno autorem |
| **B Texty kapitoly první verze** | N6 | všechny repliky kapitoly v obou jazycích, `kontrola_textu.py` bez chyb, přečteno nahlas |
| **MD** | N7 | kapitola dohratelná v Godotu, automatický průchod projde |
| **ME** | N8 | playtest splnil cíle |
| **MF** | N9 | vydáno |
