# Kontrola celé hry (N5)

> Krok N5 [postupu návrhu](12-postup-navrhu.md): po autorské kontrole všech pěti kapitol
> (N4, D67–D80) se ověřuje, že hra drží pohromadě. Kontrola prošla seznam z N5 bod po bodu:
> příznaky, konce, předměty a postavy mezi kapitolami, tempo, výuková matice, metodický oblouk,
> opakující se vtipy a rozsah proti N0. Příznaky počítal skript nad daty prototypu (kap. 1–3)
> a návrhy (kap. 4–5), ostatní body prošla čtyři nezávislá čtení (autorské a tři, která návrh
> neznala); nálezy jsou sloučené a ověřené proti zdrojům.
> Stav: **opravy textu zapracovány** (D81), 2026-11-06. Brána A čeká na deset rozhodnutí autora
> (viz konec); H20 a H31 jsou úpravy návrhu, ne textu, proto čekají s nimi.

## Shrnutí

| Bod N5 | Výsledek |
|---|---|
| Příznaky | 65 příznaků `c1_*`–`c5_*`; každý čtený se nastaví dřív, než se čte. Mapa následků v bibli má zastaralý sloupec „Čte se“ u 12 řádků (H1); 2 příznaky prototypu kap. 3 se nikde nečtou (H2); Rudův vývoj a Bářina důvěra nemají úplná pravidla (H3–H5) |
| Konce | ke každému ze čtyř konců i ke scéně po titulcích vede cesta (H7); Gantt na všechno vede vždy k Pomníku a krabice vždy k Druhé etapě; u rozdělení podle povahy rozhoduje mezi nimi R4.3 (H8, otázka pro autora); koncepce Dva světy má konce z doby před D79 (H9) |
| Předměty a postavy | 14 předmětů přechází mezi kapitolami, žádný není mrtvá zátěž; dva vážné nálezy: deník jeřábu je v kap. 5 nutný, ale v kap. 4 jen volitelný (H10), kopie Předsedových podpisů nikde nevznikají (H11); postavy sedí, jen vrátný „dvacet let řídí jeřáb“, který stál od roku 1994 (H12) |
| Tempo | nejkratší průchod 3,9–4,7 h, úplný 5,1–5,8 h, se špatnými stavy až 6,5 h proti D56 3,8–5,3 h (H17); minihry nakupené na konci kap. 1 a dialogový start kap. 2 (H19, H20); kapitoly 3–5 mají stejný tvar (H21) |
| Výuková matice | 22 z 25 témat nese mechanika s důkazem; V01 má jen volitelné prohlédnutí (H28), Deník projektového manažera nemá kde se odemykat (H29), V19 má v kap. 3 jen volbu bez pojmenovaných následků (H31); sloupec Kap. nesedí u 10 řádků (H32) |
| Metodický oblouk | kapitoly sledují koncepci; kap. 3 už z poloviny hraje spojku a kap. 4 je z velké části detektivka (H22) |
| Opakující se vtipy | 4 812 drží ve všech kapitolách; Rudův slovník manažerských frází neexistuje nikde (H25), Gantt chybí v kap. 1 (H26) |
| Rozsah proti N0 | 16 nových pozadí ✓, 18 postav s listem ✓, 11 miniher ✓; repliky 2 605 v osnovách (v jednom průchodu ≈ 2 100) proti 1 850–2 350 (H18); odhad výroby 330–560 h sedí na D56, ale není kalibrovaný (H23) |
| D26 | ve hře žádný odborný pojem kromě vědomých výjimek; v kartě P1.6 zbyl „charter“ (H30) |

## Příznaky

Skript (`tools/`-nezávislý, jednorázový) prošel `prototyp/kapitola1–3.js` (nastavení `$cN_x`,
čtení všude jinde) a návrhy kapitol 4–5 (nastavení v tabulkách rozhodnutí a v kartách, čtení
každá zmínka) a porovnal je s [mapou následků](03-pribehova-bible.md#rozhodnutí-a-jejich-pozdější-následky).

**H1 Sloupec „Čte se“ v mapě následků je u 12 řádků zastaralý.**

| Příznak | Bible říká | Skutečnost |
|---|---|---|
| `c1_babicka` | kap. 2, 4 | i kap. 3 (plot, náměstí při M14) a 5 (epilog, scéna po titulcích) |
| `c1_bara_vyslechnuta` | kap. 2, 3 | i kap. 4 (pravidlo Bářiny důvěry, D78) |
| `c1_razitko` | kap. 2 | i kap. 4 (★ káva na podušku v P4.11) |
| `c2_tym_pokryti` | kap. 3, 4, 5 | jen kap. 3 (P3.3); prototyp čte přímo `c2_tym`; kap. 4 a 5 čtou `c2_tym` |
| `c2_vyjimky`, `c2_bezpecnost` | kap. 3, 4, 5 | kap. 3 čte `c2_interier` a `c2_bezpecnost` (v mapě chybí `c2_interier`), kap. 4 nic, kap. 5 `c2_vyjimky` (body sladění) a `c2_bezpecnost` (P5.4) |
| `c3_bazen`, `c3_svaciny`, `c3_creep`, `c3_bazen_v_trupu` | kap. 5 | kap. 5 čte jen `c4_obet` a `c4_creep`; tyhle čte kap. 4 |
| `c3_hodnota` | kap. 4, 5 | kap. 5 jen přes `c4_nastup_chybi` (D80) |
| `c3_odchazi` | jen v textu R3.3 | doplnit do sloupce Příznak (čte kap. 3, 4) |
| `c4_souboj` | kap. 4, 5 | jen kap. 4; kap. 5 čte `c4_slib` |

*Návrh:* přepsat sloupec podle tabulky; do R2.2 doplnit `c2_interier`.

**H2 Dva příznaky prototypu kap. 3 se nikde nečtou:** `c3_cil` (cíl plánu kola: *cesta* /
*hotové*, `kapitola3.js:871`) a `c3_gantt_v_aplikaci` (Gantt poslaný rovnou do aplikace v M10,
`kapitola3.js:1040`). Návrh kap. 3 je nezná. *Návrh:* `c3_gantt_v_aplikaci` přečíst v kap. 5
v konci Pomník („V aplikaci byl Gantt. Lidé ne.“) a v epilogu obyvatel; `c3_cil` buď škrtnout
z prototypu, nebo dát jednu repliku Báry v M15. Příznaky `c5_lumir`, `c5_pecet`,
`c5_chybi_lumir`, `c1_bara_kriteria`, `c1_cislo_projektu`, `c3_kolo1` jsou stavy uvnitř kapitoly,
v mapě být nemusí.

**H3 R4.3 „mění Rudův vývoj“, ale stupnice 0–5 má přesně pět zdrojů** (R1.1, R2.2, R3.2, R4.1,
R5.2; bible i kap. 5). Kap. 4 (`04-krize.md:255, 307`) tak přidává šestý. *Návrh:* R4.3 mění jen
Bářinu důvěru a sladění světů (jak to počítá kap. 5); škrtnout „Rudův vývoj“ z obou míst.

**H4 Práh R1.1 pro Rudův vývoj není nikde.** Kap. 1 o vývoji nemluví, kap. 5 říká „R1.1 bez
slibu všeho“, ale `c1_slib_vseho` je počet rychlých replik 0–5. *Návrh:* vývoj +1 při
`c1_slib_vseho` < 3 (stejný práh jako fontána v kap. 4); zapsat do kap. 1 a do kap. 5.

**H5 Bářina důvěra má definovanou jen hodnotu „vysoká“** (D78: `c1_bara_vyslechnuta` ≥ 2,
ne `gantt`, `c3_vada_hlasena`), epilog kap. 5 ale rozlišuje vysokou, střední a nízkou. *Návrh:*
body: ty tři podmínky po bodu, `c3_bara_priority` +1, `c4_usmireni` = `priznal` +1; vysoká ≥ 4,
střední 2–3, nízká ≤ 1. Kap. 4 (vzkaz po poslovi) čte jen první tři, jak je.

**H6 Mapa následků nemá `c2_interier`** (nastavuje R2.2, čte kap. 3 M14 a pravidlo
„interiér u Rudy“). Doplnit k R2.2.

## Konce

**H7 Ke každému konci vede cesta.** Body sladění (kap. 5): `povaha` +2, `c2_vyjimky` = 2 +1,
≥ 2 mosty +1, `c3_integrace` ≤ 1 +1, `c4_integrace` = 0 +1, `priznal` +1; vysoké ≥ 5.

| Konec | Nutné volby | Ověřeno |
|---|---|---|
| Pomník | `gantt` (sladění nejvýš 4, vždy), nebo `povaha` + `trval` + nejvýš dva další body | ✓ špatný průchod kap. 5 |
| Druhá etapa | `krabice` (vždy), nebo `povaha` + `priznal` + nejvýš jeden další bod | ✓ |
| Hrdina | `povaha` + sladění ≥ 5 + („já“, nebo vývoj ≤ 3) | ✓ varianta B |
| Tým | `povaha` + sladění ≥ 5 + „my“ + dva ze tří: R1.1, R3.2, R4.1 | ✓ nejkratší cesta kap. 5 |
| Scéna po titulcích | Tým + vysoká důvěra + `poradne` + `poctive` + `hned` + `spojenec` | ✓ úplná cesta kap. 5 |

Gantt nebo krabice na všechno tedy nikdy nedají pravý konec, i kdyby hráč dál hrál dobře.
To odpovídá koncepci (jen plán / jen iterace), ale hráč se to dozví až ve finále. *Návrh:*
nechat, jen v obrazovce následků kap. 2 to naznačit („Jedna metodika na všechno. Uvidíme.“).

**H8 U rozdělení podle povahy rozhoduje mezi Pomníkem a Druhou etapou R4.3,** tedy vztahová
volba, ne metodická. Hráč, který rozdělil Archu správně a jen hodně pokazil mosty a integraci,
dostane podle usmíření buď „jen plán“, nebo „jen iterace“, což nic neříká o tom, jak hrál.
*Otázka pro autora.* Možnost: při `povaha` rozhodnout podle výjimek (`c2_bezpecnost` = `bara`
→ Druhá etapa, `c2_interier` = `ruda` → Pomník, obojí nebo nic → podle R4.3).

**H9 Konce v koncepci [Dva světy](07-dva-svety.md#konce-podle-světů) jsou z doby před D79**
(Jen plán / Jen iterace / Spojení; „Bára poprvé řekne termín“ jako znak pravého konce, v kap. 5
je to epilog při vysoké důvěře). *Návrh:* odkázat na bibli a kap. 5, názvy sjednotit.

## Předměty a postavy mezi kapitolami

Čtrnáct předmětů přechází mezi kapitolami (Pembok, káva, pero, metr, seznam pasažérů, klíč
od hangáru, krabice od bot, plán cesty, kopie podpisů, rozpis rampy, deník jeřábu, startovací
klíč, plechovka, karta poučení jako motiv). Postavy sedí s tím, kde je předchozí kapitola
nechala; nikdo není na dvou místech.

**H10 Deník jeřábu je v kap. 5 nutný, ale v kap. 4 jen volitelný.** P5.12 řeší pár *váha*
(body `svaciny`, `bazen`) jen deníkem jeřábu; kap. 5 ho uvádí „z kap. 4“. V kap. 4 ale vzniká
jen v P4.1 (lístek Rampa), který na nejkratší cestě není (varianta J: libovolná čtveřice
lístků). Hráč s nesladěným bodem a bez deníku nemá řešení. *Návrh:* vrátný v kap. 5 dá deník
na požádání („Píšu si všechno. Nikdo se nezeptal.“ naposledy) a tabulka předmětů kap. 5 to
uvede; v P5.12 nápověda 3 „Vrátný má deník.“

**H11 Kopie Předsedových podpisů nikde nevznikají.** Kap. 4 je uvádí „z kap. 2“ (R2.3 úsměv),
ale tabulky předmětů kap. 2 a 3 je nemají a prototyp kap. 2 je nedává (`kapitola2.js`, žádné
`+kopie`; předvolba kap. 3 s `usmev` startuje bez nich). *Návrh:* vznik v konci kap. 2: při
`usmev` si Ruda u razítka vyžádá kopie („Obálka byla na úsměv. Kopie jsou zdarma.“), předmět
do tabulek kap. 2 a 3 a do prototypu kap. 2 (`+kopie`).

**H12 Vrátný „dvacet let řídí jediný jeřáb“** (kap. 5, P5.6 a Pembok), ale v kap. 2 je kabina
zamčená, lano měněné 1994 a vrátný k jeřábu přijde až na konci; v kap. 3 říká „Za třicet let
poprvé vidím, kam jedu.“ *Návrh:* „Třicet let měl průkaz a nikdo se nezeptal. Jeřáb řídí od
kapitoly 2.“; Pembok: „Kdo tu měl třicet let průkaz a nikdo se ho nezeptal?“

**H13 Kávové pero, nebo propiska.** Kap. 2 a 3 připouštějí, že hráč nese propisku bez kávy;
kap. 4 a 5 znají jen kávové pero. *Návrh:* „(nebo propiska)“ v kap. 4 a 5, matice se nemění.

**H14 Tabulka předmětů kap. 1 neříká, co se stane s nespotřebovanými předměty.** Dekret,
plakát, mapa, karta poučení a požadavek Pana Změny mají „ne“, kap. 2 je „uloží v budce“,
požadavek má „vrací se v kap. 3“, ale kap. 3 čte jen `c1_zmena_dohoda`. *Návrh:* u těchto pěti
„zůstane v kap. 1 (kap. 2 uloží)“, u karty poučení odkaz na M11 (první lahev vždy).

**H15 Klíče v prototypu proti dokumentu.** Klíč od hangáru: dokument „zůstane v zámku“,
prototyp kap. 2 ho neodebere; klíč od skladu: dokument „ne (zůstane v zámku)“ je protimluv,
prototyp `-klic_sklad`. Rizika v průchodu kap. 3 `[usmev, kabely, lano]`, lístek se jmenuje
`krysy`. *Návrh:* sjednotit na „ano, zůstane v zámku“, v prototypu kap. 2 `-klic`; `kabely` →
`krysy`.

**H16 Drobnosti:** součet předmětů kap. 5 je 10 z dřívějška a 3 nové (ne 9 a 4); ★ „Gantt jako
návod“ v kap. 5 míchá plán cesty z M06 s Ganttem na stěně hangáru („řádek 214“); telefon
v Komisi „zvoní v kap. 1 a 4“, ale S7 v kap. 4 ho nemá; startovací klíč „zamkl Norbert“ i bez
Norberta v týmu (bez něj vrátný); popisek Ještětota v hangáru kap. 4 čte po R4.2 pořád
`c3_creep`; Bářiny rozdělané věci jsou v dokumentu kap. 3 „ne předmět“, v prototypu předmět
(rozhodnout před N7).

## Tempo a rozsah

| Kap. | Délka: rozpočet → nejkratší / úplná (+ špatný stav) | Puzzly | Minihry | Za Báru | Nejdelší úsek bez puzzlu |
|---|---|---|---|---|---|
| 1 | 40–60 → 35–45 / 50–60 | 14 | 3 (M01, M02, M03) | 2 kroky | úvod 3–5 min; lineární závěr 7 kroků |
| 2 | 55–75 → 50–60 / 65–75 (+10) | 8 | 3 (M04, M07, M06) | 0 | hospoda: cutscéna a 4 zkoušky kandidátů |
| 3 | 70–90 → 70–80 / 85–95 (+10–15) | 13 | 4 (M13, M14, M10, M15) | ≈ ½ | fáze C: R3.2 → M15 → R3.3 → konec |
| 4 | 45–60 → 60–70 / 75–85 (+15–20, D77) | 32 (½ ve variantách) | 2 (M03, M11) | ≈ ½ | R4.1 → M03 → R4.2 → rozkol |
| 5 | 20–30 → 20–25 / 30–35 (+10) | 16 | 0 (finále) | ≈ ½ | část C a epilog ≈ 10 min |
| **Hra** | **3,8–5,3 h → 3,9–4,7 / 5,1–5,8 (až 6,5)** | 83 | 11 (12 výskytů) | | |

**H17 Délka hry překračuje D56 na úplné cestě** (5,1–5,8 h, se špatnými stavy až 6,5 h).
Nejvíc kap. 4 (schváleno D77) a kap. 3. *Otázka pro autora:* buď D56 přepsat na 4,5–6 h, nebo
před bránou A uplatnit „kde ušetřit“ z kap. 3 a 4 (M11 na tři karty, konfrontace na dvě výmluvy,
drolení a plošina do jednoho úkolu).

**H18 Repliky: osnovy 2 605 na jazyk** (460 + 454 + 564 + 722 + 405; kap. 1 má ve skutečnosti
546) proti 1 850–2 350; **v jednom průchodu ≈ 2 100**, tedy v rozpočtu. Texty jsou nejdražší
položka a rostou s každou variantou. *Návrh:* rozpočet D56 předefinovat na „repliky v jednom
průchodu“ a přidat strop na vlastní reakce ★ na kapitolu (dnes 73 / 115 / 55 v kap. 3–5).

**H19 Kap. 1 má minihry nakupené na konci:** M03, M02 a M01 během asi 15 minut, M02 a M01
u téhož stolu; archiv v první polovině je bez minihry. *Návrh:* nechat a změřit v N8 (graf váže
M02 na podpis sponzora, D76 lineární závěr je záměr).

**H20 Kap. 2 začíná osmi kroky bez puzzlu** (cutscéna a čtyři zkoušky kandidátů, 107 replik)
a M07 a M06 jdou za sebou. *Návrh:* zkoušky kandidátů až po slonovi (tým se stejně potvrzuje
po hangáru), M07 dřív (Pembok připomene krabici po třetím lístku).

**H21 Kapitoly 3, 4 a 5 mají stejný tvar** (tři fáze se střihy odpočtu, přepínání portrétem,
úzký závěr) a úvod „amplion: dnů X / Ruda: Bylo Y! / Pembok“ se opakuje čtyřikrát. *Návrh:*
opakování úvodu přiznat jako vtip (v kap. 5 Pembok: „Tohle už jsi říkal. Čtyřikrát.“); tvar
nechat, kap. 5 se liší finálem.

**H22 Metodický oblouk:** kap. 3 už z poloviny hraje spojku (M10, M15, R3.2, poklop) a kap. 4 je
z velké části detektivka (archiv, smlouva, konfrontace); metodická krize na rozhraní je v aktu C
malá vedle odhalení Předsedy. *Návrh:* v bibli pojmenovat „kap. 3: oba světy a první spojka,
kap. 4: spojka a odhalení“; nic nepřestavovat.

**H23 Odhad výroby 330–560 h** (texty 87–174, minihry, grafika, kód, test) sedí na D56
360–570 h, ale jen početně: tabulka „Skutečnost“ v [plánu kapitoly 1](10-plan-kapitoly-1.md)
je prázdná i po N6 kap. 1 (546 replik). *Návrh:* před bránou A doplnit skutečný čas N6 kap. 1
a přepočítat minuty na repliku; je to jediná měřitelná položka.

**H24 Rozpočet nepočítá varianty pozadí** (3 stavy rampy, 2 stavy Archy, 6 večerních verzí,
5 velikostí Ještětota, záběry čtyř konců; odhadem 10–20 h grafiky) a „předměty“ míchá nové
s přenesenými (nových 50 < 60, inventář kap. 4 je 21). *Návrh:* do [produkce](05-produkce.md)
řádek „varianty pozadí“ a metrika „nové předměty na kapitolu“.

Nízké: konec kap. 3 a úvod kap. 4 dávají 10–15 minut bez puzzlu (R3.3 na dvě repliky týmu);
hraní za Báru skáče z 2 kroků (kap. 1) přes nic (kap. 2) na polovinu kapitoly (kap. 3), D59
záměr; kap. 4 má 32 karet puzzlů a automatický test 14 sekvencí (riziko testování, ne tempa).

## Opakující se vtipy

| Vtip (bible) | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Pepa „dva dny“ | – | ✓ | ✓ | ✓ | jen úplná cesta |
| Frameworkovy krabice | ✓ | ✓ | jen `krabice` | ✓ | ✓ |
| Gantt na všechno | **–** | ✓ | ✓ | ✓ | ★ |
| Ještětoto roste | – | – | ✓ (rodí se) | ✓ | ✓ |
| Výtah do půlky patra | ✓ | střih | – | ✓ | – |
| Rudův slovník frází | **–** | **–** | **–** | **–** | **–** |
| 4 812 | ✓ | ✓ | ✓ | ✓ | ✓ |

**H25 Rudův slovník manažerských frází neexistuje** (jen v bibli). *Návrh:* škrtnout z bible,
nebo v N6 dát Rudovi jednu až dvě nesmyslné fráze na kapitolu do výchozích reakcí (bez
odborných pojmů, D26).

**H26 Gantt v kap. 1 chybí**, Rudova poznávací vada začíná až v kap. 2. *Návrh:* Gantt na zdi
slávy (výměna žárovek jako Gantt) a jedna ★ na náměstí („Gantt na frontu.“).

**H27 Drobnosti:** bible říká, že Ještětoto „se objevuje v pozadí scén“, ale rodí se až v kap. 3
(opravit bibli); Framework je v kap. 3 jen ve variantě `krabice`, kap. 4 pak staví na jeho
smlouvě (jedna replika na náměstí při M14 vždy); Pepa v kap. 5 jen na úplné cestě (při odpočtu
„Tři. Dva…“ Pepa: „Dny.“); v kap. 5 přechod přes vestibul bez výtahu („Do půlky patra. I dnes.“).

## Výuková matice

22 z 25 témat nese mechanika s důkazem pochopení (příznak, výsledek minihry, nebo volba).

**H28 V01 Projekt vs. provoz nemá mechaniku ani důkaz.** Matice slibuje P a „vybere Velký
projekt“, bible puzzle; ve hře je jen volitelné prohlédnutí zdi slávy („To nebyl projekt, to byl
provoz.“) a text matice („věčná oprava mostu“) neodpovídá. *Návrh:* buď snížit na D bez důkazu
a opravit text, nebo do P1.5 (řazení kartotéky) přidat lístek „Výměna žárovek (probíhá)“, který
do řady nepatří a hráč ho musí vyřadit (příznak `c1_provoz`).

**H29 Deník projektového manažera nemá kde se odemykat.** 25 pojmů v matici, pravidlo „až po
zážitku“, ale žádná karta ani návrh neříká kdy; jediné stopy jsou Pembok jako správce deníku
(bible) a „Pembok zaklapne deník“ (kap. 5). *Návrh:* do matice sloupec „odemkne příznak /
událost“ (např. V03 po M01, V17 po R4.1) a do karet řádek „Deník“; rozhodnout otevřenou otázku
matice (odborně, nebo hravě).

**H30 D26:** karta P1.6 má ★ „Na to nemám charter.“ (scénář už říká „papír o Arše“), předmět
se v kartách a místnostech kap. 1 a 4 dál jmenuje „charter“ (hrozí propsání do textů kap. 4);
Framework ★ „Měříte krabice? To je metodika!“ (kap. 4) je na hraně D63; **Gantt** zní
v replikách všech kapitol jako Rudův způsob, D26 ho nejmenuje. *Návrh:* P1.6 „Na to nemám
papír.“, v kartách „papír o Arše“; Gantt zapsat do D26 jako vědomou výjimku; „metodika“
rozhodnout.

**H31 V19 Retrospektiva: v kap. 3 je to volba, ne minihra, a `c3_zlepseni` nemá následek.**
Tři zlepšení z R3.3 nejsou pojmenovaná a v kap. 4 se projeví jen jako karta větru v M11.
*Návrh:* nosič R + M; pojmenovat tři zlepšení a dát každému jeden malý následek v kap. 4, jako
to dělá kap. 5 pro `c4_zlepseni`.

**H32 Sloupec Kap. a nosiče nesedí u 10 řádků:** V04 (1 → 1, 4), V05 (1–4: v kap. 2–3 nic), V11
(2 → 2, 5), V14 (3 → 1, 3–5), V15 (3 → 1, 3–5), V17 (4 → 4–5; důkaz „přiřadí správné měřítko“
hráč nedělá, skutečný je `c4_listky` ≥ 4 a `c4_report`), V19 (nosič R, M), V20 (2–5: v kap. 2
nic), V22 (1, 5 → 1, 4, 5), V23 (2–3 → 3–4). Tabulka pokrytí domén podle toho. *Návrh:* přepsat
podle karet.

**H33 Technický dluh nemá řádek.** `c3_dluh` nese následky ve třech kapitolách (plán kola, M14,
P4.3, P4.23), P4.15 má „Co nese: technický dluh“ bez kódu. *Návrh:* V26 Technický dluh (nosič
R, důkaz `c3_dluh` ≤ 1, deník „Technický dluh“).

**H34 Drobnosti:** matice používá autorské názvy miniher „Scope Creep“ a „Integrační okno“
(ve hře Ještětoto, *Než se zavře trup*); V07 deník „Planning poker“ při mechanice tichých
odhadů na táccích; V05 a V20 v kap. 2 nic nenese (P2.2 výběr týmu je i vedení).

## Co zbývá do brány A

Rozhodnutí autora (ostatní nálezy jsou opravy textu, které jdou zapracovat rovnou):

1. **H17 délka hry:** přepsat D56 na 4,5–6 h, nebo škrtat v kap. 3 a 4.
2. **H18 rozpočet replik:** počítat repliky v jednom průchodu a stropovat ★.
3. **H8 Pomník, nebo Druhá etapa při rozdělení podle povahy:** podle R4.3, nebo podle výjimek.
4. **H5 Bářina důvěra:** body a prahy.
5. **H28 V01:** snížit na dialog, nebo přidat lístek do P1.5.
6. **H29 Deník:** kdy a jak se pojmy odemykají, odborně nebo hravě.
7. **H25 Rudův slovník:** škrtnout, nebo psát v N6.
8. **H23:** doplnit skutečný čas N6 kap. 1 do plánu kapitoly 1.
9. **H20 začátek kap. 2:** přesunout zkoušky kandidátů za slona a M07 před M06 (mění graf i prototyp).
10. **H31 zlepšení z R3.3:** pojmenovat tři zlepšení a dát každému malý následek v kap. 4.

Zapracováno rovnou (D81): H1–H4, H6, H7, H9–H16, H21, H22, H24, H26, H27, H30, H32–H34;
H19 ponecháno (změří N8).

Po zapracování se odškrtne seznam N5 v [postupu návrhu](12-postup-navrhu.md) a hra je uzamčená
(brána A).
