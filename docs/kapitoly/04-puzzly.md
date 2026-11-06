# Kapitola 4: karty puzzlů

> Krok N3c [postupu návrhu](../12-postup-navrhu.md). Jedna karta na každý puzzle z
> [návrhu](04-krize.md#průběh-a-puzzly) a z [grafu závislostí](../13-graf-zavislosti.md#kapitola-4-krize).
> Scény a předměty jsou v [obsahu místností](04-mistnosti.md).
> Stav: **hotovo**, verze 0.2 (tvar D77, kontrola N4 zapracována v D78)

Nápověda má tři stupně: **1** náznak, **2** směr, **3** skoro řešení. Rudovi radí Prof. Pembok,
Báře její metr. Radí se k puzzlu, který je nejblíž splnění, u postavy, za kterou se právě hraje.
V aktu B první stupeň nápovědy, když jedna linka stojí a druhá ne, zní: „Zeptej se posla, co
dělá Bára.“ (nebo Ruda). Rozhodnutí mají jen 1. stupeň (K16 z kap. 3), puzzly na jeden krok
1. a 3. stupeň (druhý by jen opakoval třetí, D78). Ve hře se nejmenují
odborné pojmy (D26). Sloupec „Co nese“ je jen pro autory.

**Bářina důvěra je vysoká** při `c1_bara_vyslechnuta` ≥ 2, `c2_rozdeleni` ≠ `gantt` a `c3_vada_hlasena`
(pravidlo kapitoly 3 a nahlášená vada, D78). V „dobrých“ kapitolách 1–3 je vysoká, ve „špatných“
nízká. Body na stupnici 0–100 počkají na N7.

## Přehled

| # | Puzzle | Kdo | Scéna | Akt | Povinný | Co nese |
|---|---|---|---|---|---|---|
| P4.1 | Lístek Rampa | Ruda | S2 | A | 4 ze 6 lístků | V17 měření (plán) |
| P4.2 | Lístek Trup | Ruda | S3 | A | 4 ze 6; jen s posezením | V17, V25 |
| P4.3 | Lístek Počítadlo | Bára | S4 | A | 4 ze 6 | V17 (hodnota) |
| P4.4 | Lístek Nástup | Bára | S2 | A | 4 ze 6 | V17, V14 |
| P4.5 | Lístek Změny | Bára | S3 | A | 4 ze 6 | V17, V15 |
| P4.6 | Lístek Tým | Ruda | S3 | A | 4 ze 6 | V17, V20 |
| P4.7 | Zpráva starostovi (R4.1) | Ruda | S1 | A | ano | V17, V18 |
| P4.8 | Souboj se starostou (M03) | spolu | S1 | A | ano | V05, V18 |
| P4.9 | Co obětovat (R4.2) | spolu | S1 | A | ano | V18 |
| P4.10 | Zkouška motorů | Ruda | S2, S3 | B | ano | V25 |
| P4.11 | Povolení ke startu | Ruda | S7 | B | ano | V18 |
| P4.12 | Odešlý člen týmu | Ruda | S7 | B–C | jen bez posezení | V20, V19 |
| P4.13 | Babička na lehátku | Ruda | S2, S3 | B–C | jen bez spojenectví | V04 |
| P4.14 | Plošina | Ruda | S2 | B | jen `c3_rezerva` < 0 | V23 |
| P4.15 | Drolivá rampa | Ruda | S2, S3 | B–C | jen `c3_drolivy` | technický dluh |
| P4.16 | Netěsný poklop | Ruda, Bára | S3, S4 | B–C | jen `netesni` | V25 |
| P4.17 | Bazén | Ruda | S3 | B–C | jen bazén v trupu po R4.2 | V15 |
| P4.18 | Rozpis po poslovi | Ruda | S2, S3 | B | jen bod `lavka` | V05, V25 |
| P4.19 | Archiv v noci | Bára | S4, S6 | B | ano | – |
| P4.20 | Kometa v kartotéce | Bára | S6 | B | ano | V22 (archiv), D59 |
| P4.21 | Plán Komise | Bára | S6 | B | ano | D59 |
| P4.22 | Smlouva | Bára | S7 | B | ano | – |
| P4.23 | Palubní lístky | Bára | S4 | B | ano | V14 |
| P4.24 | Den lávky | Bára | S4 | B | jen bod `lavka` | V25 |
| P4.25 | Oprava počítadla | Bára | S4 | B | jen neopravená vada | V14 |
| P4.26 | Zpráva Rudovi (D59) | Bára | S2, S3 | B | ne | V05 |
| P4.27 | Usmíření (R4.3) | spolu | S3 | B (konec) | ano | V20, V05 |
| P4.28 | Plachetnice (M11) | spolu | S3 | B (konec) | ano | V19 |
| P4.29 | Navigace poklopem | spolu | S3, S5 | C | ano | V25 |
| P4.30 | Nástupní zkouška | spolu | S2 | C | ano | V14, V25 |
| P4.31 | Konfrontace v Komisi | spolu | S7 | C | ano | D59 |
| P4.32 | Povolení ke startu podepsané | Ruda | S7 | C | ano | V18 |

Šest lístků (P4.1–P4.6) je jedno rozcestí „4 ze 6“: hráč si vybere, které ověří. Zelenou zprávu
jde poslat i bez nich.

---

## Akt A: Zelená věž

### P4.1 Lístek Rampa
- **Cíl hráče:** zjistit, jestli je rampa opravdu hotová.
- **Překážka:** světlo měří dodané pytle cementu, ne rampu.
- **Řešení:** mluvit s vrátným → „Píšete si, co se kdy postavilo?“ → **deník jeřábu** („Píšu si
  všechno. Nikdo se nikdy nezeptal.“). Použít deník na rozpis rampy (nebo naopak) → co se
  postavilo proti tomu, co se mělo → lístek Rampa vysílačkou.
  - **zelená:** „Všechno podle rozpisu. Rampa opravdu stojí.“
  - **žlutá** bez plošiny (`c3_rezerva` < 0): „Plošina chybí. Dva dny.“
  - **červená** při drolení („Ukázky betonu: tři. Praskliny: tři.“) nebo babičce na lehátku
    („Lávka hotová. Pod ní leží paní.“).
- **Stopy ve světě:** štítek *Dodané pytle cementu* (Bára: „Pytle nejsou rampa.“); rozpis rampy
  na plotě; vrátný píše do sešitu, kdykoli s ním Ruda mluví; Pembok.
- **Chybné, ale logické pokusy:** spočítat pytle (★ „Čtyři sta. A kde je rampa?“), rozpis rampy na
  Zelenku (★ „To je plán. Ne skutečnost.“), deník na Zelenku (★ „Tady je, co se opravdu stalo.“
  Zelenka: „To nemám kam připnout.“).
- **Nápověda:** 1 „Kdo na staveništi viděl každý den?“ · 2 „Vrátný si píše všechno. Porovnej to
  s tím, co jsi naplánoval.“ · 3 „Vezmi si od vrátného deník a dej ho k rozpisu rampy.“
- **Příznaky:** `c4_listky` +1; barva lístku Rampa.
- **Co nese:** V17; na stavbě dává smysl měřit plnění plánu, ale skutečného, ne dodávek.
- **Riziko:** dvojí měření (plán a deník) vypadá jako papírování. Pointa je vrátného „Nikdo se
  nikdy nezeptal.“, které se tu konečně vyplatí.

### P4.2 Lístek Trup (jen s posezením)
- **Cíl hráče:** zjistit, co je v zavřeném trupu opravdu zapojené.
- **Překážka:** světlo měří odškrtnuté řádky Gantta. Trup je zanýtovaný a klíč od poklopu drží
  člen týmu (`c3_odchazi`), který ho nedá z ruky.
- **Řešení:** mluvit s členem týmu, který má klíč → „Otevřeš poklop?“ → „Klíč nedám. Ale otevřu.“
  → Ruda se podívá dovnitř → lístek Trup. Bez poklopu člen týmu přinese plán zapojení
  a Ruda se dívá okénkem.
  - **zelená** při `c3_integrace` = 0: „Zapojené, co mělo být. Navigace přijde poklopem.“
  - **žlutá / červená** podle `c3_integrace` 1 / 2–3: kolik přípojek zůstalo venku.
  - **R3.2 = Ruda** přidá „Odpočet je uvnitř. Počítadlo venku.“ (nejméně žlutá).
- **Stopy ve světě:** štítek *Odškrtnuté řádky Gantta* (Bára: „Odškrtnuté není zapojené.“);
  člen týmu s klíčem na krku; Pepa (nebo kdo klíč má) na konci kap. 3: „Nedám ho z ruky.“;
  Pembok: „Odškrtl sis to. Viděl jsi to?“
- **Chybné, ale logické pokusy:** Gantt na stěně (★ „Řádek 140: zapojit. Odškrtnuto. Mnou.“),
  vzít klíč (★ „Z ruky ne. Řekl jsem to.“), zaťukat na trup (★ „Zní to hotově.“).
- **Nápověda:** 1 „Do trupu se už nikdo nepodíval.“ · 2 „Kdo má klíč od poklopu?“ · 3 „Popros
  člena týmu s klíčem, ať ti otevře poklop.“
- **Příznaky:** `c4_listky` +1.
- **Co nese:** V17, V25; odškrtnutý řádek není hotová práce.
- **Riziko:** bez posezení lístek nejde. Proto je lístků šest a stačí čtyři; lístek Tým pak
  řekne proč.

### P4.3 Lístek Počítadlo (za Báru)
- **Cíl hráče (Bára):** ověřit, kolik lidí Archa doopravdy uveze.
- **Překážka:** světlo měří sedadla na výkresu.
- **Řešení:** v dílně použít zkušební počítač → zkouška počítadla: pustí se všech 4 812 lidí
  z linky pomoci → lístek Počítadlo.
  - **zelená:** „4 812. Ověřeno.“ (vada opravená v kap. 3),
  - **červená:** „4 811. Pořád.“ (`c3_vada_hlasena` = ne),
  - **žlutá** při `c3_dluh` ≥ 2: „4 812, ale tři chyby. Babička má kajutu v bazénu.“
- **Stopy ve světě:** štítek *Sedadla na výkresu*; Bára: „Sedadla nenastupují. Lidé ano.“;
  amplion a linka pomoci „4 812“; metr.
- **Chybné, ale logické pokusy:** spočítat sedadla na výkresu (★ „4 812. To je výkres.“), metr na
  světlo (★ „Tři centimetry.“).
- **Nápověda (metr):** 1 „Kdo nastupuje: sedadla, nebo lidé?“ · 2 „Počítadlo jde vyzkoušet
  v dílně.“ · 3 „Pusť zkoušku počítadla na zkušebním počítači.“
- **Příznaky:** `c4_listky` +1; při 4 811 se odemkne P4.25.
- **Co nese:** V17; v softwaru se měří, co dostanou lidé, ne co je nakreslené.
- **Riziko:** krátké. Je to záměr: Bára ví, kam sáhnout. Pointa je v barvě podle kapitoly 3.

### P4.4 Lístek Nástup (za Báru)
- **Cíl hráče (Bára):** zjistit, jestli lidé vědí, kudy a jak nastoupit.
- **Překážka:** světlo měří vytištěné letáky.
- **Řešení:** mluvit s obyvateli s kufry → „Kudy nastoupíte?“ (podle `c3_hodnota` ukážou
  na lávku 0–3 skupiny) → použít lávku → „Zkusíme to.“: obyvatelé s kufry, rybáři s udicemi
  a babička s kocourem zkusí vyjít na lávku → lístek Nástup podle toho, kolik skupin projde.
  Babička na lehátku nejde („Já tu ležím.“). Při `gantt` obyvatelé: „Aplikaci nevěříme.“ Při
  `c3_svaciny` = `schvalovani` připomenou: „Svačina za tři týdny?“ (replika z kap. 3).
- **Stopy ve světě:** štítek *Vytištěné letáky*; letáky pod kufry („Sedí se na nich dobře.“);
  obyvatelé se ptají „Kudy se nastupuje?“ od kapitoly 2.
- **Chybné, ale logické pokusy:** rozdat palubní lístky (★ „Ještě nejsou. A nejdřív zjistit,
  jestli by vůbec šli.“), použít lávku před rozhovorem (★ „Nejdřív se jich zeptám.“).
- **Nápověda (metr):** 1 „Letáky jsou pod kufry.“ · 2 „Zeptej se jich a pak to s nimi zkus.“ ·
  3 „Promluv s obyvateli a pak je vezmi na lávku.“
- **Příznaky:** `c4_listky` +1.
- **Co nese:** V17, V14; hodnotu měří ten, kdo ji dostane.
- **Riziko:** žádné; skupiny na lávce jsou gag (udice se zasekne o zábradlí).

### P4.5 Lístek Změny (za Báru)
- **Cíl hráče (Bára):** zjistit, jestli opravdu nejsou žádné změny.
- **Překážka:** světlo měří formuláře v šuplíku Komise a šuplík je prázdný.
- **Řešení:** v hangáru použít metr na Ještětoto → lístek Změny. Délka podle `c3_creep`:
  „Dvacet centimetrů. Malý, ale je.“ (žlutá) až „Tři metry. Minulý týden měl metr.“ (červená).
  Zelená není nikdy: Ještětoto existuje vždy.
- **Stopy ve světě:** štítek *Formuláře v šuplíku Komise* (Bára: „Prázdný šuplík. Tak žádné
  změny.“); Ještětoto v úvodu olizuje světlo Změny; metr: „Roste. Měřitelně.“ (kap. 3).
- **Chybné, ale logické pokusy:** metr na Pana Změnu (★ „Ten neroste. Ten jen chce.“), metr na
  šuplík (★ „Prázdný. Přesně dvacet centimetrů prázdnoty.“).
- **Nápověda (metr):** 1 „Kdo tu roste ze změn?“ · 2 „Ještětoto je v hangáru.“ · 3 „Změř Ještětoto.“
- **Příznaky:** `c4_listky` +1.
- **Co nese:** V17, V15; změny nezmizí tím, že se nepíšou.
- **Riziko:** nejlehčí lístek. Nevadí: je to vtip a Ještětoto se nechá měřit nerado (★ animace).

### P4.6 Lístek Tým
- **Cíl hráče:** zjistit, jak na tom tým doopravdy je.
- **Překážka:** světlo měří podpisy na docházce a ty psal Kryštof (bez Kryštofa automat).
- **Řešení:** v hangáru mluvit s každým z týmu → „Jak se máš?“ (Ruda se ptá poprvé; každý
  odpoví podle morálky a jedné věci z kapitoly 3) → po posledním lístek Tým: „Spokojen pět z pěti?
  Je nás čtyři. A jeden je unavený.“ Bez posezení: „Chybí X. Odešel k Frameworkovi.“ (červená,
  a zároveň stopa k P4.12).
- **Stopy ve světě:** štítek *Podpisy na docházce*; docházka na stěně (Bára: „Všechny podpisy
  psal Kryštof.“); tým sedí na bednách a nikdo nezačíná; Pembok: „Kdy ses jich naposled zeptal?“
- **Chybné, ale logické pokusy:** zeptat se Kryštofa za všechny (★ Kryštof: „Podepíšu to.“),
  podepsat docházku sám (★ „Teď by bylo šest z pěti.“).
- **Nápověda:** 1 „Kdo ví, jak se má tým?“ · 2 „Tým. Zeptej se ho.“ · 3 „Zeptej se každého
  v hangáru, jak se má.“
- **Příznaky:** `c4_listky` +1; morálka +1 (zeptal se).
- **Co nese:** V17, V20; náladu týmu neměří docházka.
- **Riziko:** čtyři rozhovory za sebou. Každý má jednu repliku a dohromady dávají vtip z kap. 3.

### P4.7 Zpráva starostovi (R4.1)
- **Cíl hráče:** poslat starostovi zprávu, jak na tom Archa je.
- **Překážka:** Zelenka posílá jen zelenou a Ruda je zvyklý taky.
- **Řešení:** použít telegraf. Volba:
  - **„Skutečný stav a co s tím.“** (jen se 4 a více lístky): zpráva složená z lístků;
    z každého žlutého a červeného vznikne varianta („plošina za dva dny, nebo start z půlky
    rampy“). Zelenka: „Žlutá ve zprávě? To se tu ještě nestalo.“
  - **„Všechno zelené.“** (kdykoli, i bez lístků). Pembok: „Jsi si jistý? Ta světla jsi neviděl.“
  S méně než 4 lístky je první volba šedá a Pembok řekne: „Na poctivou zprávu víš málo.“
- **Stopy ve světě:** telegraf („Píše se do něj jen dobrá zpráva.“); tabule s lístky; Bára:
  „Když mu napíšeš zelenou, přijede stříhat pásku.“
- **Chybné, ale logické pokusy:** – (rozhodnutí).
- **Nápověda:** jen 1. stupeň: „Píšeš starostovi, ne Zelenkovi.“
- **Příznaky:** `c4_report` = `poctive` / `zelene`; `c4_listky` (0–6); důvěra stakeholderů,
  Rudův vývoj +1 jen za poctivou (vada „reportuje zeleně“).
- **Co nese:** V17, V18; eskalace s variantami místo dobré zprávy.
- **Riziko:** hráč pošle zelenou hned, protože jde. Je to dovolené (D12): M03 je pak těžší
  a v P4.32 starosta váhá.

### P4.8 Souboj se starostou (M03)
- **Cíl hráče:** ustát starostu, aby šlo vyjednat, co se obětuje.
- **Překážka:** starosta chce, co slíbil novinám.
- **Řešení:** M03 ([pravidla](04-krize.md#m03-souboj-argumenty-se-starostou)). Starosta přijede
  hned po zprávě, Bára přijde střihem. Dobré repliky se ukážou jen s podklady: lístky
  na tabuli, papír o Arše z kap. 1, varianty ze zprávy.
- **Stopy ve světě:** tabule za zády (podklady); Bára šeptá číslo z lístku Počítadlo; Pembok.
- **Chybné, ale logické pokusy:** rychlé repliky (sliby) kolo vyhrají a přičtou `c4_slib`.
- **Nápověda:** 1 „Ukaž mu, co víš. Za tebou visí.“ · 2 „Na každou námitku je lístek.“ · 3 v minihře
  zvýrazní repliku s podkladem.
- **Příznaky:** `c4_souboj` 0–5, `c4_slib` 0–5. Souboj jde opakovat, ale nemusí; platí poslední
  výsledek. Přeskočení: `c4_souboj` = 3, `c4_slib` = 2.
- **Co nese:** V05, V18.
- **Riziko:** opakuje M03 z kap. 1. Jiné jsou podklady (lístky místo charteru) a starosta má
  po zelené zprávě úplně jiné námitky.

### P4.9 Co obětovat (R4.2)
- **Cíl hráče:** vejít se se vší prací do startu.
- **Překážka:** práce je víc než dní; Ještětoto zabírá další dílky.
- **Řešení:** použít tabuli rozsahu: přetáhnout dílky pod čáru „Co se nevejde“. Dílky (jediný
  zdroj, D78):

  | Dílek | Velikost | Kdy je na tabuli |
  |---|---|---|
  | Bazén v trupu | 2 | `c3_bazen_v_trupu` |
  | Nafukovací bazén do kajuty | 1 | `c3_bazen` = `vyjednan` |
  | Svačiny, odpočet na celé obrazovce, tlačítko *Zpět*, velká tlačítka | po 1 | jen když jsou po kapitole 3 na Bářině seznamu práce (M10, M14; v prototypu `c3_svaciny` a `c3_hotove`) |
  | Kulaté kajuty | 2 | stejně |
  | **Rudův pomník na rampě** | 2 | vždy (v Ganttu od kap. 3) |
  | Fontána, terasa | 1 + 1 | `c1_slib_vseho` ≥ 3 a bez `c1_mimo_rozsah` |

  **Kapacita je vždy o 2 dílky menší než seznam** (bez Ještětoto), takže obětovat je potřeba
  vždy. Ještětoto přidá `c3_creep` dílků a každá obětovaná věc ho zmenší o jeden dílek.
  Bez odporu jde obětovat `c4_souboj` − 2 věcí; každá další vyvolá starostovo „To ne!“ a Ruda může
  trvat na svém (důvěra stakeholderů −5). S `c1_mimo_rozsah` se nafukovací bazén do limitu
  nepočítá („Bazén nepatří. To jsem podepsal.“). Obětovaná velká tlačítka: `c4_nastup` −1.
  Pomník obětuje Ruda nerad („Ten se počítá jako motivace.“).
- **Stopy ve světě:** výsledek M14 z kap. 3 (velká tlačítka a udice jsou dílky, které lidé chtěli:
  jdou obětovat, ale obyvatelé to v kap. 5 pocítí); papír o Arše: „co nepatří“; Věra: „Trup víc
  neunese.“
- **Chybné, ale logické pokusy:** obětovat nic (tabule nejde potvrdit: „Nevejde se.“), obětovat
  velká tlačítka (projde, Bára: „To lidi chtěli.“).
- **Nápověda:** jen 1. stupeň: „Co z toho chceš ty a co chtějí lidi?“
- **Příznaky:** `c4_obet` (seznam), `c4_creep` = `c3_creep` − počet obětovaných věcí (nejméně 0);
  pomník: morálka +1.
- **Co nese:** V18; obětovat rozsah, ne termín ani lidi.
- **Riziko:** zdvojuje M10 z kap. 3. Proto jsou dílky jiné a Rudův pomník je osobní oběť.

Po R4.2 následuje střih **rozkol** ([návrh](04-krize.md#akt-a-zelená-věž-ruda-i-bára), bod 10).

## Akt B: Každý sám (Ruda)

### P4.10 Zkouška motorů
- **Cíl hráče:** dokázat, že Ruda Archu nastartuje sám.
- **Překážka:** motory nemají palivo a pult nemá klíč.
- **Řešení:**
  - mluvit s Norbertem → **startovací klíč** („Podle normy jen se svědkem. Svědčím.“); bez
    Norberta v týmu dá klíč vrátný („Mám klíče od všeho.“); Norbert jako posel ho dá na staveništi,
  - mluvit s vrátným → „Spustíte sud paliva do hangáru?“ → jeřáb spustí sud otvorem ve střeše
    (vrátný: „Konečně něco dovnitř.“),
  - použít startovací klíč na zkušební pult → motory naskočí a zhasnou. Kontrolka: „Řídicí
    systém nepotvrdil nástup.“ Ruda: „…Báro?“ Ticho.
- **Stopy ve světě:** pult s klíčovou dírkou; otvor ve střeše; sud u brány; Norbert: „Startovací
  klíč mám já. Podle normy.“
- **Chybné, ale logické pokusy:** zvednout sud (★), klíč bez paliva (★ „Bez paliva startuje jen
  Gantt.“), káva do motoru (★ „Palivo to není. Skoro.“).
- **Nápověda:** 1 „Motor potřebuje dvě věci.“ · 2 „Klíč má Norbert, palivo stojí venku a jeřáb
  vidí do hangáru.“ · 3 „Vezmi si od Norberta klíč, ať vrátný spustí sud, a zkus pult.“
- **Příznaky:** stav `motory_zkouseny`.
- **Co nese:** V25; bez řídicího systému z Bářina světa Archa nevzlétne.
- **Riziko:** hráč čeká, že motory poběží. Zhasnutí je pointa a vede k usmíření.

### P4.11 Povolení ke startu
- **Cíl hráče:** dostat razítko Komise na start.
- **Překážka:** Předseda chce analýzu dopadu startu na fázi 3, která ještě nezačala.
- **Řešení:** v Komisi mluvit s Předsedou → „Povolení ke startu.“ → „Formulář 3-F. Analýza dopadu
  na fázi 3. Fronta je tamhle.“ → použít frontu na frontu → střih „O dva dny později. …V noci jen hodinu.“ → „Fáze 3 ještě
  nezačala, dopad tedy nelze posoudit.“ Pembok: „Tohle razítko nedostaneš. A on to ví.“
  Puzzle je splněný tím, že to Ruda ví (stav `povoleni_odmitnuto`).
- **Stopy ve světě:** razítko s vyschlou poduškou („Úmyslně.“); cedule „Úřední hodiny: příští
  fáze“; fronta na frontu z kap. 1.
- **Chybné, ale logické pokusy:** káva na podušku (★ při `c1_razitko` = `kava` „Tentokrát ne.
  Poduška je zamčená.“, vtip z kap. 1; jinak „Poduška je zamčená. Úmyslně.“), plán cesty (★ „Start je ve fázi 3.“), kávové pero na formulář (★ „Podepsat to můžu.
  Schválit ne.“).
- **Nápověda:** 1 „Kdo dává povolení ke startu?“ · 2 „Komise. Zkus to.“ · 3 „Požádej Předsedu
  o povolení a postav se do fronty.“
- **Příznaky:** stav `povoleni_odmitnuto`.
- **Co nese:** V18; když rozhoduje ten, kdo nechce, aby se rozhodlo, eskaluje se výš (P4.32).
- **Riziko:** puzzle bez výhry. Proto je krátký, končí vtipem a Pembok ho hned pojmenuje.

### P4.12 Odešlý člen týmu (jen bez posezení)
- **Cíl hráče:** vrátit do týmu člověka s klíčem od poklopu.
- **Překážka:** odešel k Frameworkovi „na zkoušku“ a s Rudou nemluví.
- **Řešení:** v Komisi mluvit s ním. Ve třech kolech vybírá Ruda repliku:
  - Gantt („Máš to v Ganttu, řádek 3.“) nebo slib („Přidám ti dva dny.“) → ★ a kolo se opakuje,
  - **přiznat**: „Neposlouchal jsem. Promiň.“ → člen mluví a Ruda má dvakrát možnost skočit mu
    do řeči; když mlčí, člen se vrátí. Přinese **klíč od poklopu** (bez poklopu plán zapojení)
    a **svědectví**: „Framework s Předsedou podepsali něco na fázi 3. Viděl jsem to.“
- **Stopy ve světě:** lístek Tým („Odešel k Frameworkovi.“); člen třídí Frameworkovy krabice;
  Pembok: „Co jsi mu na posezení neřekl?“; P3.8 z kap. 3 (nechat domluvit).
- **Chybné, ale logické pokusy:** viz výše; s Pepou slib „dva dny“ ★ („To je moje věta.“).
- **Nápověda:** 1 „Proč odešel?“ · 2 „Nepotřebuje Gantt. Potřebuje, abys ho poslouchal.“ ·
  3 „Přiznej, že jsi neposlouchal, a nech ho domluvit.“
- **Příznaky:** `c4_clen_zpet`; morálka +1. Vrácený člen jde do hangáru; poslové se nemění.
- **Co nese:** V20, V19; co se nepovědělo na posezení, se doplácí teď.
- **Riziko:** opakuje P3.8. Tady je to ale Ruda, kdo se omlouvá, a odměna je vidět hned.

### P4.13 Babička na lehátku (jen bez spojenectví)
- **Cíl hráče:** uvolnit pozemek pod lávkou.
- **Překážka:** babička leží na lehátku přímo pod lávkou a nehne se.
- **Řešení:** mluvit s babičkou a vyslechnout ji: „Lístek na Archu mi nikdo nedal. Tak tu
  ležím. Když nepoletím já, nepoletí nikdo.“ Pak jí dát **palubní lístek** se jménem (Bára ho pošle přes
  posla; Ruda posla požádá: „Potřebuju lístek pro babičku.“). Babička: „Lístek. Se jménem. …Tak
  jo.“ a jde balit. Při `odmitnuta` nejdřív: „Kocour se ztratil.“ → na palubě Archy mluvit
  s kocourem → jde s Rudou → teprve pak lístek.
- **Stopy ve světě:** cedule „Pozemek je můj.“ (`odmitnuta`, jinak noviny na lehátku); lístek Rampa / Nástup (červená); předzvěst z kap. 3
  („Rajčata jsou ještě bledší. Rampa roste.“); posel: „Bára tiskne lístky.“
- **Chybné, ale logické pokusy:** Gantt (★ „Tam taky nejsem.“), káva (★ „Kafe ne. Lístek.“).
- **Nápověda:** 1 „Zeptal ses jí, proč tam leží?“ · 2 „Chce jistotu, že poletí. Kdo dělá lístky?“ ·
  3 „Požádej posla o palubní lístek pro babičku a dej jí ho.“
- **Příznaky:** stav `babicka_vstala`; důvěra stakeholderů +1.
- **Co nese:** V04; přehlížený stakeholder se ozve tehdy, kdy to bolí nejvíc.
- **Riziko:** závisí na Báře. Lístek jde vytisknout kdykoli a posel stojí na staveništi.

### P4.14 Plošina (jen `c3_rezerva` < 0)
- **Cíl hráče:** dostavět odpalovací plošinu.
- **Překážka:** bednění stojí, beton ne.
- **Řešení:** mluvit s vrátným → „Plošina?“ → „Bednění stojí. Beton zraje dva dny. Do usmíření
  to stihnu.“ Vrátný betonuje, plošina je hotová do aktu C. Bez minihry. Objednat jde jen v aktu B
  a usmíření na objednanou plošinu čeká (Pembok: „Rampa nemá kde skončit. Vrátný to ví.“).
- **Stopy ve světě:** lístek Rampa (žlutá); bednění plošiny; vrátný na konci kap. 3: „Dva dny.“
- **Chybné, ale logické pokusy:** Pepa na plošinu (★ „Dva dny.“ „To už víme.“).
- **Nápověda:** 1 „Rampa nemá kde skončit.“ · 2 „Vrátný ví, kolik to dá práce.“ · 3 „Řekni vrátnému
  o plošinu.“
- **Příznaky:** stav `plosina`.
- **Co nese:** V23; kapitola 3 ukázala, kolik dní chybí. Teď se doplácí.
- **Riziko:** žádné; dvě repliky.

### P4.15 Drolivá rampa (jen `c3_drolivy`)
- **Cíl hráče:** zpevnit rampu, aby po ní šlo nastoupit.
- **Překážka:** beton z ukázek se drolí.
- **Řešení:** v hangáru mluvit s Věrou → „Rampa se drolí.“ → Věra namíchá správnou směs („Bez
  ukázek. Jen beton.“) a jde zpevnit rampu. Bez Věry (i když odešla a ještě se nevrátila) dát deník jeřábu vrátnému → podle záznamů
  namíchá směs, jak byla před ukázkami.
- **Stopy ve světě:** prasklina na rampě (Bára: „O dva centimetry delší než včera.“); lístek Rampa
  (červená); deník: „Ukázka betonu: 3., 6., 9. den.“
- **Chybné, ale logické pokusy:** Framework (★ „Ukázka byla úspěšná. Beton ne.“), káva (★).
- **Nápověda:** 1 „Kdo rozumí betonu?“ · 2 „Věra. Bez Věry vrátný, ale potřebuje vědět, co se kdy
  míchalo.“ · 3 „Požádej Věru o zpevnění (bez ní dej vrátnému deník).“
- **Příznaky:** stav `rampa_pevna`.
- **Co nese:** technický dluh: ukázky dělané kvůli ukázce se vrátí.
- **Riziko:** žádné.

### P4.16 Netěsný poklop (jen `c3_poklop` = `netesni`)
- **Cíl hráče:** utěsnit poklop, aby šlo nahrát navigaci.
- **Překážka:** Ruda nemá čím; páska je v dílně a Bára s ním nemluví.
- **Řešení:** Ruda mluví s poslem → „Potřebuju něco na poklop.“ → posel to vyřídí. Bára vezme
  **těsnicí pásku** z police „Někdy“ a použije ji na posla. Ruda pak použije pásku na poklop.
- **Stopy ve světě:** poklop („Táhne z něj.“); Bára v aktu A: „Netěsní. O dva milimetry.“; posel
  v dílně řekne Báře: „Ruda chce něco na poklop.“
- **Chybné, ale logické pokusy:** káva (★), krabice od bot (★ „Do krabice se poklop nevejde.“),
  lepicí lístky z kap. 3 (★ Bára: „Ty lepí papír. Ne trup.“).
- **Nápověda (Ruda):** 1 „Kdo ví, čím se těsní?“ · 2 „Bára měla na polici pásku.“ · 3 „Řekni
  poslovi, co potřebuješ.“ **(Bára):** 1 „Ruda něco potřebuje.“ · 3 „Dej pásku poslovi.“
- **Příznaky:** stav `poklop_utesnen`.
- **Co nese:** V25; drobná věc přes rozhraní, které nemluví.
- **Riziko:** dvě linky na jednu pásku. Posel ale řekne obě strany.

### P4.17 Bazén (jen `c3_bazen_v_trupu` a bazén neobětovaný v R4.2)
- **Cíl hráče:** dostat bazén z Archy.
- **Překážka:** Pan Změna sedí u hadice s cedulí „Bazén pro všechny“.
- **Řešení:** mluvit s Panem Změnou a nechat ho domluvit (nepřerušit, dvě pauzy): chce, aby se
  lidé koupali spolu. Pak nabídnout **kašnu na náměstí** („Projekt Voda v kašně je ve fázi 2
  od roku 1994.“, znalost z kap. 1). Pan Změna vypustí bazén hadicí přes celé město do kašny a z ní
  místo kafe poteče voda. Rybáři: „Konečně ryby. Kafe nebralo.“
- **Stopy ve světě:** cedule; hadice vede ven z hangáru; kašna, ze které od roku 1994 teče kafe (kap. 1–3); Pembok: „Co
  chce doopravdy?“
- **Chybné, ale logické pokusy:** „Ne.“ (★ Pan Změna: „Pak chci dva.“), „Do kajuty“ (★ „Kajuta? Bazén do
  kajuty se nevejde. Zkoušel jsem.“).
- **Nápověda:** 1 „Proč chce bazén?“ · 2 „Nech ho domluvit. Pak mu nabídni místo, kde je voda
  pro všechny potřeba.“ · 3 „Vyslechni ho a nabídni mu kašnu.“
- **Příznaky:** stav `bazen_ven`; `c4_creep` −1.
- **Co nese:** V15; změna se dá vyjednat i pozdě, když se ví, co je za ní.
- **Riziko:** hráč, který bazén v R4.2 obětoval, tenhle puzzle nevidí. To je odměna. Kdo ho nevyřeší,
  narazí v P4.29: kabel k navigaci vede přes bazén.

### P4.18 Rozpis po poslovi (jen bod `lavka` v `c3_nesladeno`)
- **Cíl hráče:** dát Báře den lávky.
- **Překážka:** spolu nemluví.
- **Řešení:** použít rozpis rampy na kteréhokoli posla. Bára si ho opíše, posel ho vrátí.
- **Stopy ve světě:** posel: „Bára neví, kdy bude lávka.“; kapitola 3 (M15) to Rudovi připomněla.
- **Nápověda:** 1 „Co Bára potřebuje od tebe?“ · 3 „Pošli jí rozpis rampy po poslovi.“
- **Příznaky:** stav `rozpis_u_bary`.
- **Co nese:** V05, V25.
- **Riziko:** žádné.

## Akt B: Každý sám (Bára)

### P4.19 Archiv v noci (za Báru)
- **Cíl hráče (Bára):** dostat se v noci k Lumírovi.
- **Překážka:** Lumír spí na pultu a nikdo ho nevzbudí.
- **Řešení:** v dílně vzít **kuchyňskou minutku**, v archivu ji použít na Lumíra → zazvoní.
  Lumír: „V noci vydávám jen lidem, kteří měří.“ Bára ukáže metr („Měřím.“). Lumír si minutku
  nechá („Budík. Konečně.“).
- **Stopy ve světě:** Lumír chrápe s razítkem na čele; metr: „Potřebovala bych něco, co zvoní.“;
  minutka ve tvaru komety („Patnáct minut. Ani o minutu víc.“).
- **Chybné, ale logické pokusy:** zakřičet (★ „Chrr. Číslo projektu.“), metr na Lumíra spícího
  (★ „Spí na délku metr sedmdesát.“), seznam pasažérů (★).
- **Nápověda (metr):** 1 „Lumír spí. Co ho vzbudí?“ · 2 „V dílně něco zvoní každých patnáct
  minut.“ · 3 „Vezmi z dílny minutku a natáhni ji u Lumíra.“
- **Příznaky:** stav `lumir_vzhuru`.
- **Co nese:** – (cesta k D59).
- **Riziko:** žádné; minutka je vtip z kap. 3.

### P4.20 Kometa v kartotéce (za Báru)
- **Cíl hráče (Bára):** zjistit, kdo a odkdy o kometě věděl.
- **Překážka:** lístek „Pozorování komety (1994–dosud)“ je bez data zastrčený mezi „příští rok“
  a Lumír vydá přílohu jen k lístku na svém místě.
- **Řešení:** použít kartotéku → řada lístků podle skutečného zahájení (most 1974, lešení 1986,
  výtah 1987, Archa květen 1994, kašna září 1994). Přečíst Lumírovu knihu: „Pozorování komety:
  duben 1994. Komise.“ Zařadit lístek mezi výtah a Archu → Lumír vydá přílohu: **hvězdářský
  záznam**: „Kometa na kolizní dráze. Dopad za třicet let. Utajit. Fáze 2. Podepsán: Předseda.“
  Bára: „Duben. Měsíc před Archou.“
- **Stopy ve světě:** Lumír: „Plány se mění. Data zahájení ne.“ (kap. 1); kniha leží otevřená;
  Bára: „Ruda to tu jednou seřadil podle skutečnosti. Aspoň jednou.“
- **Chybné, ale logické pokusy:** zařadit podle roku na konec (★ Lumír: „Rok nestačí. Měsíc.“),
  abecedně (★ „Jsme archiv, ne telefonní seznam.“, z kap. 1).
- **Nápověda (metr):** 1 „Lístek nemá místo. Kdy začal?“ · 2 „Lumírova kniha zná data zahájení.“ ·
  3 „Zařaď kometu podle knihy: duben 1994, před Archu.“
- **Příznaky:** předmět **hvězdářský záznam**.
- **Co nese:** V22 (archiv vrací poučení), D59; Komise znala kometu dřív, než začala stavět.
- **Riziko:** opakuje P1.5. Je to záměr: Bára používá Rudovu práci a hádanka je jen o jeden lístek.

### P4.21 Plán Komise (za Báru)
- **Cíl hráče (Bára):** spojit, co ví.
- **Překážka:** seznam pasažérů a záznam leží každý zvlášť.
- **Řešení:** použít záznam na seznam pasažérů → „Seznam z roku 1994. Kometa v dubnu, Archa
  v květnu. Seznam psali mezi tím.“ Bára připíše na seznam „duben 1994“ → seznam se změní v **plán Komise**: Komise věděla o kometě a chystala Archu jen
  pro sebe.
- **Stopy ve světě:** na seznamu je jen „rok 1994“ (kap. 1), v záznamu měsíc; Předsedův
  kufr v Komisi „Archa, kajuta č. 1“; metr.
- **Chybné, ale logické pokusy:** seznam na Lumíra (★ „Pracovní verze. Do archivu nepatří.“).
- **Nápověda (metr):** 1 „Seznam má rok. Záznam má měsíc.“ · 3 „Polož záznam na seznam pasažérů.“
- **Příznaky:** předmět **plán Komise**; Bářina linka D59 hotová.
- **Co nese:** D59; seznam z kap. 1 konečně dostane smysl.
- **Riziko:** příliš jednoduché. Nevadí: je to pointa, ne hádanka.

### P4.22 Smlouva (za Báru)
- **Cíl hráče (Bára):** zjistit, proč Framework sedí v Komisi.
- **Překážka:** Framework mluví jen o krabicích.
- **Řešení:** v Komisi mluvit s Frameworkem → „Máte referenci?“ → hrdě ukáže **smlouvu na fázi 3**
  („Krabice Věčnost. Na zkoušku navždy.“) → „Kopii? Pro srovnání? Jistě.“
- **Stopy ve světě:** cedulka „Poradce Komise. Na zkoušku.“; Předseda v kap. 3: „Je teď u nás. Na
  zkoušku.“; posel: „Framework se chlubí smlouvou.“
- **Chybné, ale logické pokusy:** zeptat se Předsedy (★ „Pan inženýr je poradce.“), metr na krabice
  (★ „Měříte krabice? To je metodika!“).
- **Nápověda (metr):** 1 „Proč tu Framework sedí?“ · 2 „Konzultanti rádi ukazují reference.“ ·
  3 „Zeptej se Frameworka na referenci.“
- **Příznaky:** předmět **kopie smlouvy**.
- **Co nese:** – (Framework není zlý, jen prodává).
- **Riziko:** žádné.

### P4.23 Palubní lístky (za Báru)
- **Cíl hráče (Bára):** lístek pro každého obyvatele.
- **Překážka:** aplikace lístky umí, ale nikdo je nevytiskl.
- **Řešení:** použít zkušební počítač → *Vytisknout palubní lístky* → **palubní lístky** (4 812;
  při neopravené vadě 4 811, chybějící Bára dotiskne po P4.25). Při `gantt` obyvatelé aplikaci
  nevěří: použít papír a nůžky → papírové lístky. Při `c3_dluh` ≥ 2 vyjdou napoprvé s chybami
  („Babička: kajuta bazén.“) a tiskne se znovu.
- **Stopy ve světě:** tabule „Dělám“ (*Palubní lístky*); obyvatelé: „Kudy se nastupuje?“; lístek
  Nástup.
- **Chybné, ale logické pokusy:** tisk před R4.2 (★ „Nejdřív vědět, co poletí.“).
- **Nápověda (metr):** 1 „Kdo nastoupí a s čím?“ · 3 „Vytiskni na zkušebním počítači lístky.“
- **Příznaky:** předmět **palubní lístky**.
- **Co nese:** V14.
- **Riziko:** žádné.

### P4.24 Den lávky (jen bod `lavka`)
- **Cíl hráče (Bára):** aby aplikace věděla, kdy je lávka.
- **Řešení:** použít rozpis rampy (od posla, P4.18) na zkušební počítač.
- **Stopy ve světě:** Bára: „Aplikace neví, kdy je lávka. Ruda to ví. Ruda se mnou nemluví.“;
  posel: „Ruda má rozpis pořád v kapse.“
- **Nápověda (metr):** 1 „Kdo zná den lávky?“ · 3 „Požádej posla o Rudův rozpis.“
- **Příznaky:** stav `lavka_znama`.
- **Co nese:** V25.

### P4.25 Oprava počítadla (jen neopravená vada)
- **Cíl hráče (Bára):** aby počítadlo napočítalo 4 812.
- **Řešení:** použít zkušební počítač → *Opravit počítadlo* → **oprava počítadla**. Nahraje se
  poklopem v P4.29.
- **Stopy ve světě:** lístek Počítadlo („4 811. Pořád.“); Bára: „Kdyby mě tehdy nechal domluvit.“
- **Nápověda (metr):** 1 „4 811.“ · 3 „Napiš opravu na zkušebním počítači.“
- **Příznaky:** předmět **oprava počítadla**.
- **Co nese:** V14; co se v kap. 3 neřeklo, se dělá na poslední chvíli.

### P4.26 Zpráva Rudovi (D59, nepovinné)
- **Cíl hráče (Bára):** říct Rudovi, co ví o Předsedovi.
- **Řešení:** s plánem Komise mluvit s poslem → „Vyřiďte Rudovi, co vím o Předsedovi.“ Jen při
  vysoké důvěře („Hned.“). Při nízké se volba ukáže, ale Bára: „Ještě ne.“ (★).
- **Nápověda:** jen 1. stupeň: „Řekneš mu to teď, nebo až spolu zase budete mluvit?“
- **Příznaky:** `c4_bara_rekla` = `hned`.
- **Co nese:** V05; dobrá zpráva přes rozbité rozhraní, když je důvěra.

## Konec aktu B

### P4.27 Usmíření (R4.3)
- **Cíl hráče:** začít zase spolu.
- **Překážka:** nic, jen hrdost.
- **Řešení:** když má Ruda zkoušku motorů, odmítnuté povolení (při `c3_rezerva` < 0 i objednanou
  plošinu) a Bára plán Komise, smlouvu a palubní lístky, Bára řekne „Jdu za ním.“ Usmíření začne,
  jakmile je Bára v hangáru: vejde do něj, nebo v něm už stojí, když se dokončí Rudova linka.
  Ruda přijde k motorům střihem. Vzkaz (P4.26) jde poslat kdykoli předtím; posel ve dveřích
  dílny je vidět i z hangáru. Za Rudu posel řekne: „Bára je hotová. Přepni se
  na ni.“ (nápověda). Ruda stojí u tichých motorů. Volba:
  - **„Plán nestačí. Potřebuju tě.“** → `c4_usmireni` = `priznal`,
  - **„Plán byl dobrý. Jen ho nikdo nedodržel.“** → `trval`.
  Obě vedou dál (D12). Bára řekne o Předsedovi, pokud to neudělala dřív; při `po_usmireni`
  položí na pult desky se svými důkazy (dostane je Ruda).
- **Stopy ve světě:** tiché motory; vypnutá vysílačka; Pembok: „Kdo ti tu chybí?“
- **Nápověda:** jen 1. stupeň: „Co jí chceš říct?“
- **Příznaky:** `c4_usmireni`; Bářina důvěra a sladění světů +, Rudův vývoj (s R4.1).
- **Co nese:** V20, V05.
- **Riziko:** sentiment. Scéna má nejvýš 6 replik a končí vtipem (Bára zapne vysílačku: „Příjem.“).

### P4.28 Plachetnice (M11)
- **Cíl hráče:** zjistit, co je brzdilo, a vybrat jedno zlepšení.
- **Řešení:** na palubě Archy M11 ([pravidla](04-krize.md#m11-plachetnice)).
- **Nápověda:** 1 „Co vás brzdilo? Co pomohlo?“ · 3 v minihře ukáže jednu kartu na špatném místě.
- **Příznaky:** `c4_zlepseni`. Přeskočení: *Jedna tabule pro oba*.
- **Co nese:** V19.
- **Riziko:** opakuje posezení z kap. 3. Tady je to minihra s loďkou, ne volba.

Po M11 střih „Zbývá 2.“: člen týmu s klíčem od poklopu ho dá Rudovi (bez posezení jen při
`c4_clen_zpet`, jinak klíč přinese P4.12).

## Akt C: Poslední přípravy

### P4.29 Navigace poklopem
- **Cíl hráče:** dostat do zavřeného trupu navigaci a vše, co zbylo venku.
- **Překážka:** trup je zanýtovaný; poklop jde otevřít jen klíčem a jen tak, že ho někdo drží.
- **Řešení:** použít klíč od poklopu na poklop → Bára přijde (střih) → Ruda drží, Bára leze
  dovnitř (S5). Bára použije řídicí počítač a nahraje navigaci (s opravou počítadla, když je);
  navigace jde vždy první. Za každý další bod z `c3_nesladeno` kromě `lavka` jeden úkon (bod
  `navigace` je samotné nahrání): hráč přepne
  na Rudu, ten zatáhne kabel, přepne na Báru, ta řekne, jestli svítí. Po každém dalším úkonu může
  Ruda říct „Stačí. Zavírám.“; co zbude, je `c4_integrace`. **Bez poklopu** Věra navrtá trup podle
  plánu zapojení (bez Věry Ruda: „Nýtovačka byla lehčí.“); vrtání je jen cesta dovnitř, úkon
  nepřidává. **Bazén v trupu** (P4.17) nahrávání zastaví: „Kabel vede přes bazén. Doufám, že
  nevede do bazénu.“
- **Stopy ve světě:** přípojka navigace u poklopu; M15 z kap. 3 („později poklopem“); Bára:
  „Drž. Ještě. Ještě.“
- **Chybné, ale logické pokusy:** Ruda leze dovnitř (★ „Nevejdu se. Poklop je na Báru.“), nahrát bez
  pásky u netěsného (★ „Táhne.“).
- **Nápověda:** 1 „Teď to jde jen ve dvou.“ · 2 „Ty drž, ona nahrává.“ · 3 „Otevři poklop klíčem.“
- **Příznaky:** `c4_integrace` 0–3.
- **Co nese:** V25; poklop z kap. 3 je místo, kde se světy potkají i po milníku.
- **Riziko:** „Stačí. Zavírám.“ je past. Zůstane jen tomu, kdo ji zvolí.

### P4.30 Nástupní zkouška
- **Cíl hráče:** ověřit, že nastoupí všichni.
- **Překážka:** obyvatelé, lávka a podmínky z aktu B.
- **Řešení:** na staveništi použít palubní lístky na obyvatele (nebo na lávku). Jde jen bez babičky
  na lehátku, s plošinou, bez drolení a s aplikací, která zná den lávky. Když něco chybí, Ruda
  nebo Bára řekne co („Lávka vede přes lehátko.“). Archa stojí v hangáru, proto se zkouší nanečisto: Ruda
  nakreslí na plošinu křídou obrys dveří („Tady budou dveře. Zítra.“) a tři skupiny (obyvatelé,
  rybáři, babička s kocourem) projdou lávkou k obrysu a zpátky. Ruda řídí frontu („Jediná fronta, kterou jsem kdy
  chtěl.“), Bára počítá.
- **Stopy ve světě:** lístek Nástup; obyvatelé sedí na kufrech; Zelenka z věže: „Žlutá!… Zelená!“
- **Nápověda:** 1 „Zkus to s nimi.“ · 2 „Každý potřebuje lístek a lávka musí být volná.“ · 3 „Dej
  obyvatelům palubní lístky.“
- **Příznaky:** `c4_nastup` 0–3 (kolik skupin prošlo napoprvé) a `c4_nastup_chybi` (které
  neprošly, D80). Každá skupina má jednu příčinu: **rybáři** neprojdou bez místa na udice (karta
  *udice* chybí v `c3_hotove`), **obyvatelé** při `gantt` nebo `c3_hodnota` ≤ 1 („Aplikaci
  nevěříme.“ / „Kudy?“), **babička** při obětovaných velkých tlačítkách. Kapitola 5 je zastaví
  ze stejného důvodu.
- **Co nese:** V14, V25.
- **Riziko:** žádné; je to oslava.

### P4.31 Konfrontace v Komisi
- **Cíl hráče:** ukázat, co Komise udělala.
- **Překážka:** Předseda má tři výmluvy.
- **Řešení:** v Komisi mluvit s Předsedou → konfrontace (Bára přijde střihem, starosta přijde
  podepsat start). Na každou výmluvu použít předmět z inventáře:

| Výmluva | Důkaz | Náhrada |
|---|---|---|
| „O kometě jsme nevěděli.“ | hvězdářský záznam | kopie podpisů |
| „Fáze 2 byla opatrnost.“ | plán Komise | kopie podpisů |
| „Nikdo nám nic neprodal.“ | kopie smlouvy | svědectví; kopie podpisů |

  Špatný důkaz: Předseda „Fáze 2.“ a nic se nestane. Použít jde předmět z inventáře obou postav.
  Při `hned` předkládá tři hlavní důkazy Bára a náhrady Ruda, při `po_usmireni` všechno Ruda.
  **Antiklimax:** „Já? Já jsem jen schvaloval.“ a ukáže sbalený kufr. Ruda mu podá palubní lístek
  z Bářina balíku („Jeden navíc. Pro jistotu.“): „Archa veze všechny. Fronta je tamhle.“ Framework: „Já jsem jen prodával krabice.“ a nabídne
  krabici „Krize“. Při `aktovka` krysy z aktovky sežerou Předsedovi poznámky; při `kocka` se
  Předseda kočky bojí; babička spojenkyně: „Na pozemek se mě nikdo neptal. Kromě něj.“
- **Stopy ve světě:** kufr „kajuta č. 1“; Bára: „Tři věci. Máme je.“; Pembok.
- **Nápověda:** 1 „Na každou výmluvu máš papír.“ · 2 „Kometa: záznam. Fáze 2: plán. Prodej:
  smlouva.“ · 3 v konfrontaci zvýrazní správný předmět.
- **Příznaky:** – (kdo předkládá, určuje `c4_bara_rekla`).
- **Co nese:** D59; záporák, který jen schvaloval.
- **Riziko:** inventářový kvíz. Proto jen tři výmluvy, náhrady a nekonečně pokusů.

### P4.32 Povolení ke startu podepsané
- **Cíl hráče:** podpis na start.
- **Řešení:** po konfrontaci starosta: „Komise je pozastavena. Do fáze 2.“ a podepíše. Po zelené
  zprávě (R4.1) váhá: „Před pěti dny jste mi hlásil zelenou.“ a podepíše až s lístky skutečnosti na stole
  (bez lístků s Bářinými čísly). Nepoužité důkazy (kopie podpisů, svědectví) si vezme „pro
  noviny“ (D80).
- **Nápověda:** –
- **Příznaky:** konec kapitoly.
- **Co nese:** V18; eskalace ke sponzorovi, když ten, kdo má rozhodnout, nechce.
- **Riziko:** žádné.
