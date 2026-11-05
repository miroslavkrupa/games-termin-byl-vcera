# Kapitola 5: karty puzzlů

> Krok N3c [postupu návrhu](../12-postup-navrhu.md). Jedna karta na každý puzzle z
> [návrhu](05-uzavreni.md#průběh-a-puzzly) a z [grafu závislostí](../13-graf-zavislosti.md#kapitola-5-uzavření).
> Scény a předměty jsou v [obsahu místností](05-mistnosti.md).
> Stav: **hotovo** (schváleno v D79), verze 0.1

Nápověda má tři stupně: **1** náznak, **2** směr, **3** skoro řešení. Rudovi radí Prof. Pembok,
Báře její metr. Radí se k puzzlu, který je nejblíž splnění, u postavy, za kterou se právě hraje.
Když jedna postava nemá co dělat, první stupeň zní: „Zeptej se Báry, co vidí.“ (nebo „Zeptej se
Rudy, co dělá.“). Rozhodnutí mají jen 1. stupeň, puzzly na jeden krok 1. a 3. stupeň (D78).
Ve hře se nejmenují odborné pojmy (D26). Sloupec „Co nese“ je jen pro autory.

**Zlepšení z Plachetnice (`c4_zlepseni`)** mění finále:
- *Ptát se dřív, než se zamkne:* bezpečnostní pult má od začátku tlačítko *Zkouška pojistek*.
  Zkouška před odpočtem ukáže, co která pojistka bude chtít, takže lávku, dveře a hodnoty jde
  vyřešit ještě v části A.
- *Jedna tabule pro oba:* Rudův pult ukazuje i Bářiny hodnoty. Na čtení se nemusí přepínat.
- *Říct to nahlas:* u každého pultu stojí člen týmu a nahlas řekne, co pojistka chce (2. stupeň
  nápovědy zdarma).

**Usmíření (`c4_usmireni`):** při `priznal` Bára vysílačkou sama hlásí, co vidí v kamerách. Při
`trval` hlásí jen na otázku: hráč se musí přepnout na Báru, nebo Rudou zavolat „Věži, co vidíš?“.

## Přehled

| # | Puzzle | Kdo | Scéna | Povinný | Co nese |
|---|---|---|---|---|---|
| P5.1 | Nástup | Ruda | S1 | ano | V21 |
| P5.2 | Skupiny ve frontě | Ruda, Bára | S1, S2 | jen `c4_nastup` < 3 | V14, V25 |
| P5.3 | Lumír | Ruda | S3 | ano | V22 |
| P5.4 | Pečeť bezpečnostního systému | Ruda, Bára | S1, S2 | jen bez Norberta nebo bez `bezp_u_rudy` | V11, V25 |
| P5.5 | Návod pro posádku | Ruda | S1 | pro R5.1 s návodem | V21, V20 |
| P5.6 | Kapitán | Ruda | S1 | pro R5.1 s návodem | V21 |
| P5.7 | Zaučení posádky | Bára | S2 | pro R5.1 s návodem | V21, V14 |
| P5.8 | Předstartovní kontrola | Bára | S2 | ano | V17 |
| P5.9 | Uzavření nástupu | Bára | S2 | ano | – |
| P5.10 | Pojistka Lávka volná | spolu | S1, S2 | ano | V25, V15 |
| P5.11 | Pojistka Dveře zamčené | spolu | S1, S2 | ano (přání jen `c4_creep`, `c4_slib`) | V15, V25 |
| P5.12 | Pojistka Hodnoty sladěné | spolu | S1, S2 | jen `c4_integrace` ≥ 1 | V25 |
| P5.13 | Pojistka Stav ověřen | spolu | S1, S2 | jen `c4_report` = `zelene` | V17 |
| P5.14 | Na tři | spolu | S1, S2 | ano | V25, V20 |
| P5.15 | Předání (R5.1) | Ruda | S1 | ano | V21 |
| P5.16 | Pódium (R5.2) | Ruda | S1 | ano | V20 |

---

## Část A: Poslední ráno

### P5.1 Nástup
- **Cíl hráče:** pustit frontu do Archy.
- **Překážka:** dveře Archy jsou zavřené a ve dveřích sedí Ještětoto.
- **Řešení:** použít páku u dveří → dveře se otevřou, Ještětoto se stáhne na práh a fronta se pohne.
  Skupiny, které neprošly nástupní zkouškou v kapitole 4, uvíznou (P5.2).
- **Stopy ve světě:** fronta s kufry a palubními lístky; páka s nápisem „Dveře“; amplion
  „…podle pořadí na lístku.“; Pembok: „Archa je hotová. Ještě do ní někoho dostat.“
- **Chybné, ale logické pokusy:** mluvit s frontou (★ „Až otevřete.“), vzít Ještětoto (★ „Kouše.
  Do formulářů.“), hrnek kávy na Ještětoto (★ vypije a zůstane sedět).
- **Nápověda:** 1 „Fronta čeká na dveře.“ · 3 „Zatáhni za páku u dveří.“
- **Příznaky:** –
- **Co nese:** V21; začátek předání: lidé se stěhují do věci, kterou tým postavil.
- **Riziko:** žádné, je to rozjezd.

### P5.2 Skupiny ve frontě (jen `c4_nastup` < 3)
- **Cíl hráče:** dostat do Archy i ty, kdo uvízli.
- **Překážka:** uvízne 3 − `c4_nastup` skupin, v pořadí rybáři → obyvatelé → babička.
- **Řešení:**
  - **Rybáři:** udice neprojdou dveřmi. Mluvit s rybáři → „Do kajuty se vejdou?“ S místem na
    udice (interiér u Báry, kap. 3 M14) je složí a projdou. Bez něj (`interier_u_rudy`) Ruda
    navrhne udice přivázat na Archu zvenku: „Jako anténa.“ Rybář: „Konečně anténa, která něco chytí.“
  - **Obyvatelé:** stojí ve dveřích a nevědí, na kterou palubu. Ruda: „Báro, kam?“ Bára ve věži
    použije pult → *Šipky na palubě*. Šipky se rozsvítí a obyvatelé jdou.
  - **Babička:** nejde bez kocoura, který z klece utekl zpátky na pozemek pod rampou. Ruda
    sejde po lávce, mluví s kocourem (jako v kap. 4) a kocour jde s ním.
- **Stopy ve světě:** Bára v kameře vidí, kdo stojí („Rybáři. A udice.“); skupina řekne, co chce;
  Zelenka z věže: „Žlutá! Fronta stojí.“
- **Chybné, ale logické pokusy:** udice zalomit (★ „To by nám ryby nikdy neodpustily.“), obyvatele
  postrčit (★ „Kam? To nevím ani já.“), kocoura chytit za ocas (★ „Ne.“).
- **Nápověda:** 1 „Kdo stojí a proč?“ · 2 „Rybáři mají udice, obyvatelé nevědí kam, babička čeká na
  kocoura.“ · 3 podle skupiny („Zeptej se rybářů na kajutu.“, „Ať Bára rozsvítí šipky.“, „Kocour je
  dole pod rampou.“)
- **Příznaky:** –
- **Co nese:** V14, V25; následek nástupní zkoušky, každá chyba má jedno opatření.
- **Riziko:** nuda opakování z kap. 4. Proto jen jeden krok na skupinu a každá skupina jinak.

### P5.3 Lumír
- **Cíl hráče:** dostat Lumíra do Archy.
- **Překážka:** Lumír neopustí archiv: „Bez archivu nejdu. A archiv se do Archy nevejde.“
- **Řešení:** v archivu mluvit s Lumírem → „Bez archivu nejdu.“ Na pultu stojí krabička
  Poučení: „Plná. Poprvé za čtyřicet let.“ (v noci do ní Lumír založil lahve z Plachetnice).
  Vzít krabičku a dát ji Lumírovi → „Tohle je archiv. Zbytek jsou data.“ Lumír si ji přitiskne
  a jde nastoupit (střih: projde frontou s krabičkou).
- **Stopy ve světě:** Bára: „Z celého archivu se kdy hodilo jen jedno.“; krabička plná lahví;
  Pembok: „Co z archivu stojí za záchranu?“; Lumír: „Čtyřicet let nikdo nic nevrátil. Kromě
  poučení. To nikdo nepůjčil.“
- **Chybné, ale logické pokusy:** naložit regál (★ „Na Archu? To je fáze 4.“), dát mu palubní
  lístek (★ „Lístek mám. Archiv ne.“), kávové pero na výpůjčku (★ „Výpůjčka z archivu mimo archiv?
  To jsem nikdy nepodepsal.“), deník jeřábu (★ „Založím ho. Až se vrátím.“).
- **Nápověda:** 1 „Co z archivu má cenu?“ · 2 „To jediné, co tu kdy někomu pomohlo.“ · 3 „Dej
  Lumírovi krabičku Poučení.“
- **Příznaky:** `c5_lumir`.
- **Co nese:** V22; z archivu stojí za záchranu jen poučení.
- **Riziko:** Ruda se k archivu dostane i dřív, než Bára zjistí, že Lumír chybí. Lumír pak řekne
  totéž a hráč krok udělá „na zásobu“, což je v pořádku.

### P5.4 Pečeť bezpečnostního systému (jen bez Norberta, nebo bez `bezp_u_rudy`)
- **Cíl hráče:** aby bezpečnostní systém směl startovat.
- **Překážka:**
  - **bez Norberta v týmu:** Norbert stojí ve frontě jako cestující: „Jsem cestující. Ne
    certifikátor. Podepíšu jen to, co jsem viděl.“
  - **bez `bezp_u_rudy`** (bezpečnostní systém ve světě iterací): „Včera to bylo jinak. Tohle nikdo
    nepodepíše.“ Bezpečnostní systém se předělává každý týden, naposledy dnes ráno.
- **Řešení:** bez `bezp_u_rudy` nejdřív Bára ve věži použije pult → *Zamknout verzi*: „Tahle verze.
  Žádná další.“ (poprvé se k něčemu zaváže). Potom Ruda přivede Norberta k bezpečnostnímu pultu
  (z fronty, nebo z týmu) a použije pult → *Zkouška pojistek*. Norbert se dívá, odříká normu
  a připne pečeť.
- **Stopy ve světě:** na pultu prázdné místo s nápisem „Pečeť“; Norbert ve frontě s razítkem
  v kapse; Bára: „Co se mění každý týden, to nikdo nepodepíše.“; Pembok.
- **Chybné, ale logické pokusy:** podepsat sám (★ „Pečeť je Norbertova. Já mám jen Gantt.“), kávové
  razítko z kap. 1 (★ „Hnědá pečeť. Ne.“), zkouška bez Norberta (★ „Prošla. Nikdo to neviděl.“).
- **Nápověda:** 1 „Bez pečeti systém neodstartuje.“ · 2 „Norbert podepíše, co uvidí. A co se už
  nezmění.“ · 3 „Přiveď Norberta k pultu a pusť zkoušku pojistek.“ (bez `bezp_u_rudy` nejdřív „Ať Bára
  zamkne verzi.“)
- **Příznaky:** `c5_pecet`.
- **Co nese:** V11, V25; část s pevnou specifikací patří do světa plánu. Kdo ji zařadil jinam,
  musí ji na startu zmrazit.
- **Riziko:** dva důvody v jedné kartě. Ve špatném stavu jsou oba, proto je jejich pořadí pevné:
  nejdřív verze, potom Norbert.

### P5.5 Návod pro posádku (pro R5.1)
- **Cíl hráče:** dát tomu, kdo Archu povede, něco do ruky.
- **Překážka:** jediný dokument je Rudův Gantt a ten je o stavbě.
- **Řešení:** mluvit s členy týmu na rampě → „Napiš stránku: co musí vědět ten, kdo to po nás
  převezme.“ Každý napíše stránku o své části. Tři stránky ze čtyř stačí. Použít stránky na
  krabici od bot → **provozní manuál** („Návod v krabici od bot. Framework by to prodal.“).
  Stránky: Věra (rampa a trup, „Neopírat se o lávku.“), Norbert (pojistky, „Viz norma.“),
  Klára (kajuty), Pepa („Všechno trvá dva dny.“ ★, počítá se), Zdenda („Když nevíš, zavolej
  Rudovi.“ ★), Kryštof (předávací protokol, „Konečně ho někdo chce.“). Vrácený člen týmu
  (`c4_clen_zpet`) připíše „Proč jsem odešel“ ★.
- **Stopy ve světě:** Gantt jako návod ★ („Řádek 214: start. Úterý. To je plán stavby, ne návod.“);
  vrátný: „A kde se to vypíná?“; Pembok: „Kdo to bude řídit, až tu nebudeš?“
- **Chybné, ale logické pokusy:** napsat návod sám (★ „Strana jedna: Ruda. Strana dvě: viz strana
  jedna.“), Frameworkova krabice „Předání“ (★ „Je prázdná. Návod na všechno.“), deník jeřábu (★
  „Tohle je, co se stalo. Ne co dělat.“).
- **Nápověda:** 1 „Každý z týmu ví něco, co ty ne.“ · 2 „Popros je o stránku.“ · 3 „Dej stránky
  do krabice od bot.“
- **Příznaky:** `c5_manual` (počet stránek).
- **Co nese:** V21, V20; předat výstup s dokumentací a nechat ji napsat ty, kdo věci znají.
- **Riziko:** sběr předmětů. Proto stačí tři stránky a každý člen řekne jen jednu větu.

### P5.6 Kapitán (pro R5.1)
- **Cíl hráče:** najít, kdo Archu povede.
- **Překážka:** nikdo se nikoho nezeptal.
- **Řešení:** mluvit s vrátným → „Povedete Archu?“ → „Konečně se někdo zeptal.“ Vrátný slézá
  z jeřábu naposledy („Poslední jízda byla v pět. Nikdo nečekal.“) a jde do věže za Bárou.
- **Stopy ve světě:** vrátný řídí jediný stroj ve městě; Bára: „Kdo umí řídit něco velkého?“;
  Pembok: „Kdo tu dvacet let řídil a nikdo se ho nezeptal?“; rybáři: „Kapitán? Vrátný. Jezdí
  pomalu a dívá se.“
- **Chybné, ale logické pokusy:** Ruda se navrhne sám (★ Pembok: „A kdo bude na pódiu?“), Pepa
  (★ „Naučím se to za dva dny.“), Pan Změna (★ „Můžu měnit kurz?“).
- **Nápověda:** 1 „Archu někdo povede. Ty to nebudeš.“ · 3 „Zeptej se vrátného.“
- **Příznaky:** `c5_kapitan`.
- **Co nese:** V21; provozovatel není projektový tým.
- **Riziko:** žádné; pointa celé hry pro vrátného.

### P5.7 Zaučení posádky (za Báru, pro R5.1, po P5.6)
- **Cíl hráče (Bára):** aby vrátný uměl Archu odstartovat a přistát.
- **Překážka:** nikdy nic takového neřídil a světla ve městě byla vždycky zelená.
- **Řešení:** v řídicí věži použít pult → *Zkušební režim* s vrátným. Zasekne se: „Které je
  které? Všechna byla zelená.“ Bára sundá z tabule ukazatelů lístky skutečnosti a dá mu je
  jako legendu: „Zelená jet. Žlutá pozor. Červená stát.“ Druhý pokus projde. **Při obětovaných
  velkých tlačítkách** (R4.2) vrátný nenajde tlačítko Start: Bára vezme z pultu Zelenky
  **plechovku žluté barvy** (zbyla z natřené žárovky) a tlačítko natře. Třetí pokus projde.
- **Stopy ve světě:** vrátný ve věži nervózně mačká čepici; Bára: „Nechám ho to zkusit. Uvidím,
  kde se zasekne.“; lístky na tabuli; v kap. 4 Zelenka „Natřená. Svítí míň. Ale svítí.“
- **Chybné, ale logické pokusy:** vysvětlit mu to (★ vrátný: „Rozumím. Které je které?“), dát mu
  manuál (★ „To si přečtu v letu.“), metr (★ „Tlačítko měří dva centimetry. Moc malé.“).
- **Nápověda:** 1 „Nech ho to zkusit.“ · 2 „Kde se zasekl? Co mu chybí?“ · 3 „Dej mu lístky
  z tabule.“ (u tlačítek „Natři tlačítko.“)
- **Příznaky:** `c5_zauceni`.
- **Co nese:** V21, V14; zaučit uživatele tak, že ho necháš zkusit a opravíš, kde se zasekne.
- **Riziko:** Bára by mohla vrátného zaučit dřív, než ho Ruda požádá. Vrátný pak ve věži není
  (P5.6 ho tam teprve pošle).

### P5.8 Předstartovní kontrola (za Báru)
- **Cíl hráče (Bára):** ověřit, že je všechno připravené na odpočet.
- **Překážka:** po nástupu počítadlo ukazuje 4 811 / 4 812.
- **Řešení:** použít řídicí pult → *Předstartovní kontrola*: navigace ✔, dveře „čeká“, počítadlo
  „nástup probíhá“. Po nástupu (P5.1, P5.2) ukáže 4 811 / 4 812. Bára: „Počítadlo je opravené.
  Takže to není chyba. Někdo chybí.“ Použít pult → *Seznam lístků* → chybí jen jeden lístek:
  **Lumír**. Bára vysílačkou Rudovi (při `trval` až na otázku).
- **Stopy ve světě:** číslo na pultu; vtip 4 811 z kap. 3–4; Zelenka: „Červená? Tu tu nemáme
  rádi.“; Bára: „Kdo nemá rád fronty a má rád papíry?“
- **Chybné, ale logické pokusy:** spustit počítadlo znovu (★ „4 811. Pořád. Teď je to pravda.“),
  přičíst jedničku (★ „Tohle jsme dělat přestali.“).
- **Nápověda:** 1 „Kdo chybí?“ · 2 „Každý má palubní lístek. Který nebyl použit?“ · 3 „Otevři seznam
  lístků na pultu.“
- **Příznaky:** `c5_chybi_lumir`.
- **Co nese:** V17; číslo, kterému už jde věřit, a proto je dobré se ptát, co znamená.
- **Riziko:** žádné; vtip s číslem 4 811 tu dostane pointu.

### P5.9 Uzavření nástupu (za Báru)
- **Cíl hráče (Bára):** pustit odpočet.
- **Řešení:** když Lumír nastoupí, počítadlo ukáže 4 812 / 4 812 (D64). Bára použije pult →
  *Uzavřít nástup*: „Nástup uzavřen.“ Bez pečeti (P5.4) pult řekne, že čeká na bezpečnostní
  systém. Potom střih: odpočet.
- **Nápověda:** jen 3. stupeň: „Uzavři nástup.“
- **Příznaky:** spustí odpočet.
- **Co nese:** –
- **Riziko:** žádné.

## Finále: Dva klíče

Odpočet se zastaví na „tři“. Bezpečnostní pult na rampě: „Start zablokován.“ Pojistky svítí
červeně a každá má štítek. Hráč je řeší v libovolném pořadí, „Na tři“ až nakonec.

### P5.10 Pojistka Lávka volná
- **Cíl hráče:** aby na lávce nikdo nebyl.
- **Překážka:** Ruda za Archu nevidí. Na lávce stojí Pan Změna s posledním přáním.
- **Řešení:** Bára použije kameru *Lávka* → „Na lávce stojí Pan Změna.“ (při `priznal` to Bára
  řekne sama). Ruda pak může jít kolem Archy (nové aktivní místo „Za Archou“) a mluvit s Panem
  Změnou: „A ještě by se hodil…“ → **„Po přistání. Zapíšu si to.“** Pan Změna: „Poprvé mi někdo
  řekl kdy.“ a nastoupí. (Volba „Dobře, uděláme to.“ ★ přidá Ještětotovi přání a Pan Změna stojí
  dál: „A ještě…“)
- **Stopy ve světě:** štítek pojistky „Lávka volná“; Ruda: „Za Archou nic nevidím.“; Pembok: „Kdo
  vidí za roh?“
- **Nápověda:** 1 „Kdo vidí lávku?“ · 2 „Bára má kameru.“ · 3 „Ať se Bára podívá na lávku, a pak
  jdi za Archu.“
- **Příznaky:** –
- **Co nese:** V25, V15; každý pult vidí půlku. Poslední přání se nezakazuje, ale řekne se kdy.
- **Riziko:** žádné.

### P5.11 Pojistka Dveře zamčené
- **Cíl hráče:** zavřít a zamknout dveře Archy.
- **Překážka:** zavřít jde jen pákou na rampě, zamčené to ale musí být podle řídicího systému.
  S `c4_creep` ≥ 1 nebo `c4_slib` ≥ 1 trčí ve dveřích ocas Ještětota.
- **Řešení:** Ruda použije páku → „Zavřeno.“ Bára: „Řídicí systém hlásí otevřeno.“ Kamera
  *Dveře*: „Ve dveřích je ocas.“ Ruda mluví s Ještětotem: v tlamě drží přání na kartičkách
  (počet = `c4_creep`, s `c4_slib` ≥ 1 navíc „Ohňostroj (slíbeno starostovi)“). Ruda bere
  přání jedno po druhém a každé odloží: „Po přistání.“ S každým se Ještětoto zmenší
  (jméno se zkrátí: Ještětototo → Ještětoto). Když nemá žádné, vejde se dovnitř. Páka → zamčeno.
- **Stopy ve světě:** Bářina kamera; Ještětoto s kartičkami v tlamě; Bára: „Roste z přání. Tak mu je
  vezmi.“; Pembok.
- **Chybné, ale logické pokusy:** přání splnit (★ „Ohňostroj? Dobře.“ → Ještětoto vyroste, kartička
  se vrátí), nacpat ho dovnitř (★ „Je větší než dveře. Díky mně.“), zavřít dveře znovu (★ „Kousl
  mě do páky.“).
- **Nápověda:** 1 „Co drží dveře?“ · 2 „Ještětoto roste z přání.“ · 3 „Vezmi mu přání a odlož je.“
- **Příznaky:** –
- **Co nese:** V15; poslední přání se neplní, ale ani nezahazují. Odloží se, s datem.
- **Riziko:** ve výchozím stavu (`c4_creep` = 0, `c4_slib` = 0) jsou dveře jen dvě akce. Ve špatném
  až šest přání; každé je ale jedno klepnutí.

### P5.12 Pojistka Hodnoty sladěné (jen `c4_integrace` ≥ 1)
- **Cíl hráče:** aby oba pulty ukazovaly totéž.
- **Překážka:** body, které v kap. 4 zůstaly nesladěné („Stačí. Zavírám.“), se ukážou jako dvě
  různé hodnoty. Na každý bod jeden pár, nejvýš tři:
  - **úhel rampy:** rampa 12°, navigace 14° → platí rampa (fyzika, Rudův svět),
  - **počet míst:** bezpečnostní systém 4 812 sedadel podle výkresu, řídicí 4 812 lidí a kocour,
    kočka a Ještětoto → platí řídicí (lidé, Bářin svět), bezpečnostní limit se přepíše na váhu,
  - **váha nákladu:** bezpečnostní systém počítá s bazénem / svačinami, které v Arše nejsou (podle
    `c4_obet`) → platí rampa (váha se měří, ne odhaduje); Ruda zváží podle deníku jeřábu.
- **Řešení:** hráč na kterémkoli pultu klepne na rozdílnou hodnotu a vybere *Převzít z rampy*,
  nebo *Převzít z věže*. Správně: fyzika z rampy, lidé z věže. Špatně: pojistka zabliká a hodnota
  se vrátí (metr: „Úhel rampy se podle aplikace nezmění.“, Pembok: „Kocour se podle výkresu
  nezmenší.“).
- **Stopy ve světě:** u každé hodnoty malá ikona (beton, nebo panáček); Bára: „Co je z betonu,
  měř u tebe. Co dýchá, počítám já.“; M15 z kap. 3.
- **Nápověda:** 1 „Kdo tu hodnotu zná líp?“ · 2 „Beton měříš ty. Lidi počítá Bára.“ · 3 zvýrazní
  správné tlačítko.
- **Příznaky:** –
- **Co nese:** V25; sladění podle povahy hodnoty, ne podle toho, kdo má pravdu.
- **Riziko:** kvíz. Proto jen 1–3 páry a ikona u každé hodnoty.

### P5.13 Pojistka Stav ověřen (jen `c4_report` = `zelene`)
- **Cíl hráče:** dát bezpečnostnímu systému skutečný stav.
- **Překážka:** bezpečnostní systém převzal stav ze zelené zprávy starostovi: „Všechno zelené.“
  Norbert: „Zelená ve zprávě není měření.“
- **Řešení:** Bára ve věži přečte lístky skutečnosti z tabule ukazatelů (bez lístků svá čísla
  z pultu) a vysílačkou je řekne. Ruda je zadá do pultu → „Stav ověřen.“ Ruda: „Tohle jsem
  měl napsat před pěti dny.“
- **Stopy ve světě:** štítek „Stav: podle zprávy“; Zelenka: „Zelená je klidná barva.“; Pembok:
  „Co jsi tehdy hlásil?“
- **Nápověda:** 1 „Co systém ví o stavu Archy?“ · 3 „Ať ti Bára přečte lístky z tabule.“
- **Příznaky:** –
- **Co nese:** V17; zelená zpráva dožene i start.
- **Riziko:** žádné; jeden krok navíc pro toho, kdo poslal zelenou.

### P5.14 Na tři
- **Cíl hráče:** odjistit start a předat řízení Arše.
- **Překážka:** klíč na rampě a tlačítko ve věži se musí stisknout najednou a každý je jinde.
- **Řešení:** když jsou ostatní pojistky zelené, Ruda použije startovací klíč (v pultu) → „Báro.
  Na tři.“ Při `priznal`: „Na tři.“ → oba najednou (střih na obě ruce) → „Pojistky uvolněny. Klíč
  předejte posádce.“ Pult vysune **startovací klíč**. Při `trval` Bára: „Na čí tři?“ Volby: „Na moje.“
  (Bára: „Tak počkáme.“, volba se vrátí) / **„Na tvoje.“** (Bára: „Tři.“).
- **Stopy ve světě:** klíč a tlačítko svítí stejnou barvou; Pembok: „Tohle nejde sám. Celou dobu
  to nešlo.“
- **Nápověda:** 1 „Je to na vás dvou.“ (u `trval` jen tohle).
- **Příznaky:** –
- **Co nese:** V25, V20; start je společný. Při `trval` Ruda poprvé ustoupí.
- **Riziko:** „Na moje.“ by mohlo vypadat jako past. Bára na ni odpoví klidně a volba se vrátí.

## Část C: Pódium a start

### P5.15 Předání (R5.1)
- **Cíl hráče:** dát Archu tomu, kdo ji povede.
- **Řešení:** použít startovací klíč na vrátného (nebo na dveře Archy, kde stojí). Volby:
  - **„Předat s návodem a zaučením.“** Jen s provozním manuálem (aspoň 3 stránky) a zaučeným
    kapitánem (P5.6, P5.7). Ruda dá klíč i krabici. Vrátný otevře první stránku a přikývne. →
    `c5_predani` = `poradne`.
  - **„Však vy si poradíte.“** Vždy. Klíč dostane vrátný (bez P5.6 ho Ruda prostě podá
    nejbližšímu, a to je vrátný). Vrátný: „Nikdo se mě nezeptal. Zase.“ → `poradi`.
  Bez manuálu nebo zaučení je první volba šedá a Pembok řekne, co chybí („Návod bez zaučení je jen
  papír.“, „Zaučit, ale co mu necháš v ruce?“).
- **Stopy ve světě:** vrátný ve dveřích s čepicí; Pembok: „Komu to necháš?“
- **Nápověda:** jen 1. stupeň: „Co mu dáš do ruky?“
- **Příznaky:** `c5_predani`; s návodem důvěra stakeholderů +.
- **Co nese:** V21.
- **Riziko:** hráč, který šel rovnou na finále, zjistí až tady, že návod chybí. Proto jsou P5.5–P5.7
  dostupné od začátku a odpočet na ně nečeká; po finále jdou dodělat (vrátný ještě stojí u dveří).

### P5.16 Pódium (R5.2)
- **Cíl hráče:** říct před městem, čí je to zásluha.
- **Řešení:** po předání se starosta postaví na pódium: „A teď ten, komu za to vděčíme!“ Ruda
  u mikrofonu. U neobětovaného pomníku Pembok: „Stojíš vedle sebe.“ Volby:
  - **„Já.“** → `c5_my` = ne; starosta pověsí Rudovi medaili, tým tleská z dálky.
  - **„My.“** → `c5_my` = ano; Ruda jmenuje autory stránek návodu a vrátného (podle `c5_manual`,
    `c5_kapitan`), bez nich „tým“ a Báru. Rudův vývoj +1.
  Starosta podle `c4_report`: „Hlásil jste zelenou, tak jsem to slíbil novinám.“ / „Říkal jste
  mi pravdu. Bylo to nepříjemné.“; podle `c4_slib`: „A ohňostroj?“ Ruda: „Po přistání.“
- **Nápověda:** jen 1. stupeň: „Kdo tu stál s tebou?“
- **Příznaky:** `c5_my`; Rudův vývoj.
- **Co nese:** V20.
- **Riziko:** sentiment. Scéna má nejvýš 6 replik a končí startem.
