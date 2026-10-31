# Vize hry – *Termín byl včera*

> Dokument na jednu stránku. Každé návrhové rozhodnutí se má dát obhájit odkazem na tuto stránku.
> Stav: **koncept**, verze 0.1

## V jedné větě

Komediální point & click adventura ve stylu *Deponie*, ve které sebestředný projektový manažer
Ruda Gantt musí dokončit první projekt v dějinách města Nedostavěnice dřív, než dopadne kometa
jménem Deadline – a hráč se mimochodem naučí řídit projekty.

## Základní údaje

| | |
|---|---|
| **Žánr** | 2D point & click adventura, komedie, s minihrami |
| **Délka** | ✅ 4–5 hodin v 5 kapitolách, úvod je součástí kapitoly 1 (D56, D57); rozpočty kapitol v [produkci](05-produkce.md#rozpočty-kapitol) |
| **Jazyk** | ✅ angličtina a čeština, vždy oba jazyky zároveň (viz Jazyky) |
| **Platforma** | ✅ PC (Windows), Mac a mobily (Android, iOS); ovládání myší i dotykem |
| **Model** | ✅ zdarma, s možností dobrovolného příspěvku (donate) |
| **Cílová skupina** | ✅ co nejširší publikum: všichni, kdo mají rádi adventury, bez ohledu na znalost PM |
| **Hodnocení** | ✅ PEGI 12 |
| **Grafika** | ✅ AI, připravená na pozdější výměnu za ručně kreslenou |
| **Dabing** | ✅ zatím ne, hra připravená na jeho pozdější přidání |
| **Tým** | ✅ autor sám (+ Claude jako spoluautor textů), bez rozpočtu, pro radost a potenciálně pro výuku |
| **Engine** | ✅ Godot 4.7 + Popochiu 2.2 (D35), ověřuje se [prototypem](08-prototyp-namesti.md) |

Podrobnosti k platformám, grafice, dabingu a jazykům jsou v [produkčních zásadách](05-produkce.md).

## Hlavní myšlenka: Dva světy, jedna Archa

Archa se skládá z částí různé povahy: rampa a trup potřebují plán, řídicí systém a nástup
obyvatel potřebují zkoušení s lidmi. Ruda Gantt zosobňuje svět plánu, Bára Backlogová svět
iterací a pravý konec nastane, až se naučí spolupracovat. Hra tak nenásilně učí hybridní řízení:
přístup se volí podle povahy práce. Podrobně v [koncepci](07-dva-svety.md).

## Pilíře

1. **Nejdřív hra, potom výuka.** Hraje se kvůli příběhu, postavám a humoru. Když minihra nebo
   puzzle nebaví, vyhodí se, i kdyby učily sebelépe.
2. **Učí mechanika, ne text – nenásilně.** Žádné kvízy, přednášky ani vysvětlující okna uprostřed hry.
   Lekci nese to, co hráč dělá, a to, co se mu pak stane. Hráč, který o projektovém řízení nikdy
   neslyšel, si nesmí všimnout, že se něco učí. Odborné pojmy se ve hře neobjevují nevyžádaně.
3. **Rozhodnutí mají váhu.** Volby se vracejí o kapitoly později. Hráč pozná, že to, co zanedbal
   v iniciaci, ho dohnalo v krizi.
4. **Absurdní, ale fér.** Svět je praštěný, logika puzzlů musí jít zpětně obhájit. Rádce
   s nápovědou (dá se vypnout) hlídá, aby hráč nikdy neuvízl natrvalo.

## Co si hráč odnese

- Projekt je o **lidech a hodnotě**, ne o plánu. Plán je nástroj.
- Kdo přeskočí **iniciaci** (proč, pro koho, kdo rozhoduje), zaplatí za to později.
- **Přístup se volí podle povahy práce.** Co je jasné a nevratné, se plánuje; co je nejisté,
  se zkouší. Většina velkých projektů potřebuje obojí a spojení mezi tím.
- **Nejistotu** je třeba řídit: rizika, plánování po vlnách, krátké iterace a zpětná vazba.
- **Změna** není nepřítel, nepřítel je změna bez řízení.
- Projektový manažer nemá být hrdina, ale **servant leader** svého týmu.

## Zážitek, o který usilujeme

Po dohrání by hráč měl říct: *„Ruda je idiot – a já jsem v práci dělal přesně to samé.“*

Humor má **dvě vrstvy**: první funguje pro každého (situace, postavy, absurdita), druhá je navíc
pro ty, kdo projekty zažili. Žádný vtip nesmí stát jen na znalosti odborného pojmu.

Míra humoru odpovídá **PEGI 12**: sarkasmus ano, vulgarity a krutost ne. Tvrdší vtip projde jen
tehdy, když má skvělou pointu.

## Jazyky

- Každý text (dialogy, popisky, UI, názvy) vzniká **v angličtině i češtině zároveň**. Žádný jazyk
  není překlad toho druhého a nic se nedodává jen v jednom jazyce.
- **Vtipy se nepřekládají, ale píšou** pro každý jazyk zvlášť (transkreace). Slovní hříčka, která
  v jednom jazyce nefunguje, se nahradí jinou se stejnou funkcí ve scéně.
- Jména postav, míst a název hry mají vlastní verzi v každém jazyce, pokud nesou vtip.
- Puzzly nesmějí stát na slovní hříčce jednoho jazyka; řešení musí fungovat v obou.
- Technicky: všechny texty v tabulkách řetězců, nic natvrdo v kódu ani v obrázcích.

## Co hra není

- Není to simulátor ani manažerská strategie s tabulkami.
- Není to e-learning převlečený za hru a nemá test na konci.
- Není to satira jedné metodiky. Smějeme se antivzorcům, ne Scrumu, vodopádu nebo PRINCE2.

## Inspirace

*Deponia* (antihrdina, sarkasmus), *Monkey Island* (souboj urážkami → souboj argumenty),
*Day of the Tentacle* (puzzly s následky napříč časem), *Thimbleweed Park* (graf závislostí
puzzlů), *Papers, Please* (mechanika jako sdělení).

## Otevřené otázky

Rozhodnuté otázky jsou v [záznamu rozhodnutí](00-rozhodnuti.md).

- [ ] Konečný název v obou jazycích (pracovně *Termín byl včera* / *Deadline Was Yesterday*)
- [x] Výtvarný styl: varianta A, večerní a krizové scény C (D21)
- [ ] Referenční listy postav a první vzorky přes AI
- [ ] Kanály distribuce a příspěvků (viz [produkční zásady](05-produkce.md))
