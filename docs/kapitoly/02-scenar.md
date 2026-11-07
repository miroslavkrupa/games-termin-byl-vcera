# Kapitola 2: scénář

> Generováno z `hra/texty/texty.csv` skriptem `hra/nastroje/scenar.py`. Neupravovat ručně:
> texty se mění v tabulce a přehled se vygeneruje znovu. Krok N6
> [postupu návrhu](../12-postup-navrhu.md); osnovy jsou v [dialozích](02-dialogy.md).

Repliky = mluvené texty bez voleb dialogu. Popisky = názvy aktivních míst, postav a předmětů,
útržky a texty miniher a GUI.

| Scéna | Repliky | Volby | Popisky |
|---|---|---|---|
| Úvod a náměstí | 40 | 3 | 5 |
| Staveniště rampy a brána hangáru, M04 | 43 | 0 | 42 |
| Hangár s Archou, tabule a M07 | 109 | 11 | 34 |
| Hospoda U Odhadu: nábor, odhad a formulář | 124 | 18 | 10 |
| Mlžná pláň a M06 | 24 | 0 | 23 |
| Kancelář Komise | 24 | 3 | 0 |
| Nápovědy Prof. Pemboka | 25 | 0 | 0 |
| Předměty a kombinace | 17 | 0 | 10 |
| Konec kapitoly | 10 | 0 | 15 |
| Postavy | 0 | 0 | 6 |
| **Celkem** | **416** | **35** | **145** |

## Úvod a náměstí

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `ch2_ui_kapitola` |  |  | Kapitola 2: Plán na všechno | Chapter 2: A Plan for Everything | titulek kapitoly (D69) |
| `ch2_ui_ukol` |  |  | Úkol: tým, rozdělení Archy a razítko na plán cesty ke startu | Goal: a team, the Ark divided up, and a stamp on the route to launch | úkol kapitoly |
| `ch2_uvod_budka` | Ruda | rozlámaně | Nejlepší ubytování ve městě. Má dveře. | Best accommodation in town. It has a door. | úvod, záběr 1: Ruda vyleze z telefonní budky |
| `ch2_uvod_amplion` | Rozhlas | úředně | Dobré ráno, Nedostavěnice. Dnů do dopadu komety: dvacet sedm. | Good morning, Scope Creek. Days until impact: twenty-seven. | úvod, záběr 2 |
| `ch2_uvod_vzkaz_vse` | Rozhlas | úředně | Starosta vzkazuje projektovému manažerovi: všechno, hned, a ještě tu fontánu. | The mayor has a message for the project manager: everything, right now, and don't forget the fountain. | c1_slib_vseho ≥ 3 |
| `ch2_uvod_vzkaz_noviny` | Rozhlas | úředně | Starosta vzkazuje projektovému manažerovi: hlavně ať je to v novinách. | The mayor has a message for the project manager: just make sure it's in the papers. | c1_slib_vseho < 3 |
| `ch2_uvod_ruda_30` | Ruda | zděšeně | Dvacet sedm? Vždyť bylo třicet! | Twenty-seven? It was thirty! |  |
| `ch2_uvod_pembok_fronta` | Pembok | suše | Fronta na frontu trvala dva dny. Stál jsi v ní. | The queue for the queue took two days. You were standing in it. | K8 |
| `ch2_uvod_pembok_ukol` | Pembok | poučně | Klíč máš. Teď potřebuješ plán, lidi a někoho, kdo ti ten plán orazítkuje. | You've got the key. Now you need a plan, people, and someone to stamp the plan. | úvod, záběr 3 |
| `ch2_uvod_ruda_plan` | Ruda | sebevědomě | Plán mám. (kreslí prstem do vzduchu Gantt) | I have a plan. (draws a Gantt chart in the air with his finger) |  |
| `ch2_uvod_pembok_naco` | Pembok | suše | Na co? | For what? |  |
| `ch2_uvod_ruda_vsechno` | Ruda | hrdě | Na všechno. | For everything. | titulek kapitoly |
| `ch2_kometa_prohlednout` | Ruda | zasmušile | Větší než včera. Nebo jsem menší já. | Bigger than yesterday. Or I've got smaller. |  |
| `ch2_krabice_kometa` | Ruda | věcně | To není riziko. To je termín. | That's not a risk. That's the deadline. | ★ krabice nebo obálka na kometu (P2.5) |
| `ch2_amplion_prohlednout` | Ruda | suše | Amplion. Hlásí dny do dopadu a starostovy nápady. Obojího ubývá. | The loudspeaker. It announces days until impact and the mayor's ideas. Both are running out. |  |
| `ch2_kasna_prohlednout` | Ruda | suše | Kašna. Pořád ve fázi 2. Dnes z ní aspoň teče ranní mlha. | The fountain. Still in phase two. At least this morning there's some mist coming out of it. |  |
| `ch2_budka_prohlednout` | Ruda | uznale | Moje noční kancelář. Dveře, střecha a telefon. Víc než radnice. | My overnight office. A door, a roof and a phone. More than the town hall has. |  |
| `ch2_budka_pouzit_1` | Ruda | cituje automat | „Jste v pořadí číslo čtyři tisíce osm set dvanáct. Děkujeme za trpělivost.“ | 'You are caller number four thousand eight hundred and twelve. Thank you for your patience.' | 4 812 = počet obyvatel (D64) |
| `ch2_budka_pouzit_2` | Ruda | pobaveně | Pořád 4 812. Aspoň něco je v tomhle městě stálé. | Still 4,812. At least something in this town is stable. |  |
| `ch2_stanek_prohlednout` | Ruda | suše | Pan Změna dnes prodává věci, které nemá. Vystavené jsou prázdné háčky. | Today Mr. Change is selling things he doesn't have. The display is a row of empty hooks. |  |
| `ch2_zmena_prohlednout` | Ruda | pobaveně | Pan Změna. Dvě tužky za ušima, každá jiné barvy. Pro jistotu. | Mr. Change. Two pencils behind his ears, each a different colour. Just in case. |  |
| `ch2_zmena_obalka` | Pan Změna | rozhodně | Prodávám jen to, co dnes nemám. Tohle máte vy. Nezájem. | I only sell what I don't have today. You have that. Not interested. | ★ obálka (P2.5) |
| `ch2_zmena_kava` | Pan Změna | zamyšleně | Kávu? Včera bych chtěl. Dnes čaj. Zítra uvidíme. | Coffee? Yesterday I'd have wanted some. Today, tea. Tomorrow, we'll see. | ★ káva |
| `ch2_zmena_pero` | Pan Změna | zmateně | Kávovým perem jsem už jednou něco podepsal. Pořád to platí. Divný pocit. | I signed something with a coffee pen once. It still counts. Strange feeling. | ★ kávové pero |
| `ch2_zmena_plan` | Pan Změna | nadšeně | Plán? Hezký. Šel by modrý? | A plan? Lovely. Does it come in blue? | ★ plán cesty |
| `ch2_zmena_uvod` | Pan Změna | nadšeně | Dobré ráno! Dnes prodávám věci, které nemám. Zítra možná ty, co mám. | Good morning! Today I'm selling things I don't have. Tomorrow, maybe the ones I do. | první rozhovor |
| `ch2_zmena_vse` | Pan Změna |  | Všechno jsem řekl. Dnes. Zítra možná řeknu něco jiného. | That's everything I've got to say. Today. Tomorrow I may say something else. | vyčerpaný dialog |
| `ch2_zmena_volba_prodej` | Ruda |  | Co dnes prodáváte? | What are you selling today? | volba dialogu |
| `ch2_zmena_prodej` | Pan Změna | obchodnicky | Prázdné háčky. Velmi žádané. Nikdo je nemá. | Empty hooks. Very much in demand. Nobody has any. |  |
| `ch2_zmena_volba_archa` | Ruda |  | Jakou chcete Archu? | What kind of Ark do you want? | volba dialogu |
| `ch2_zmena_archa_dohoda` | Pan Změna | hrdě | Modrou. Pořád. Podepsal jsem to. | Blue. Still. I signed for it. | c1_zmena_dohoda |
| `ch2_zmena_archa_1` | Pan Změna | rozhodně | Dnes se střechou. Ne, bez střechy. Kvůli výhledu. | Today, with a roof. No, without one. For the view. | bez dohody z kap. 1 |
| `ch2_zmena_archa_2` | Ruda | unaveně | A včera? | And yesterday? |  |
| `ch2_zmena_konec` | Pan Změna | rozverně | Přijďte zítra. Budu chtít něco jiného. | Come back tomorrow. I'll want something different. |  |
| `ch2_volba_konec` | Ruda |  | Zatím ahoj. | See you. | volba dialogu (společná pro kapitolu 2) |
| `ch2_hs_obyvatele` |  |  | Obyvatelé s kufry | Residents with suitcases | popisek aktivního místa |
| `ch2_obyvatele_prohlednout` | Ruda | zaujatě | Lidi s kufry. Čekají na nástup. Nikdo neví kam, kudy ani kdy. | People with suitcases. Waiting to board. Nobody knows where, which way, or when. | K nástup (P2.5) |
| `ch2_obyvatele_ruda` | Ruda | zvědavě | Kudy se nastupuje? | Which way do you board? |  |
| `ch2_obyvatele_odpoved` | Obyvatelé | unisono | To nám řekněte vy. | You tell us. |  |
| `ch2_obalka_zkusime` | Ruda | přemýšlivě | Na tohle peníze nepotřebuju. Stačí to zkusit. S deseti lidmi. | I don't need money for this. We just need to try it. With ten people. | ★ obálka na obyvatele |
| `ch2_krabice_zapisu` | Ruda | věcně | To si zapíšu. | I'm writing that down. | s krabicí v inventáři (P2.5) |
| `ch2_listek_nastup_zapsan` | Ruda | čte | Lístek: „Nikdo neví, kudy nastoupit.“ | Note: 'Nobody knows which way to board.' | lístek M07 |
| `ch2_hs_ulice_hospoda` |  |  | Ulice k hospodě | Street to the pub | popisek východu |
| `ch2_ulice_prohlednout` | Ruda | pobaveně | Vývěsní štít „U Odhadu“. Odhaduju, že tam bude rušno. | A pub sign: 'The Rough Estimate'. I estimate it'll be busy. |  |
| `ch2_hs_ulicka_rampa` |  |  | Ulička k rampě | Alley to the ramp | popisek východu |
| `ch2_ulicka_prohlednout` | Ruda | suše | Nad střechami trčí rampa. Končí ve vzduchu. Jako většina věcí tady. | The ramp sticks up over the rooftops. It ends in mid-air. Like most things around here. |  |
| `ch2_dvere_prohlednout` | Ruda | suše | Dveře radnice. Lešení je dnes nosné. Prý. | The town hall door. Today the scaffolding is load-bearing. Allegedly. |  |
| `ch2_vytah_strih` | Ruda | odevzdaně | Výtah do 1½. patra. Jako vždycky. | The lift to floor one and a half. As always. | střih: náměstí → Komise |

## Staveniště rampy a brána hangáru, M04

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `ch2_staveniste_prichod` | Ruda | uznale | Staveniště. Rampa z roku 1994: rovná, do půlky hotová, dál končí ve vzduchu. | The building site. The ramp from 1994: straight, half finished, and then it just ends in mid-air. | jen při prvním příchodu |
| `ch2_hs_rampa` |  |  | Rampa | Ramp | popisek aktivního místa |
| `ch2_rampa_prohlednout` | Ruda | suše | Rovná, do půlky hotová. Jediná rovná věc ve městě. Horní půlka je zatím jen záměr. | Straight, half finished. The only straight thing in town. The top half is still just an intention. | D34 |
| `ch2_hs_jerab` |  |  | Jeřáb | Crane | popisek aktivního místa |
| `ch2_jerab_prohlednout` | Ruda | suše | Jediný jeřáb ve městě. Kabina zamčená, na ní cedule: „Obsluha jen s průkazem.“ | The only crane in town. Cab locked, with a sign: 'Licensed operators only.' |  |
| `ch2_jerab_cedule_stopa` | Ruda | čte | Pod cedulí je čmáranice: „Průkaz má vrátný. Nikdo se ho neptal.“ | Scribbled under the sign: 'The porter has a licence. Nobody asked him.' | stopa ke konci (K15), nastaví vratny_stopa |
| `ch2_jerab_vratny_pozdeji` | Ruda | ledabyle | Vrátný? Zeptám se ho, až bude jeřáb potřeba. | The porter? I'll ask him when we need the crane. | K15 |
| `ch2_jerab_pouzit` | Ruda | odmítavě | Bez průkazu ani nahoru. A bez plánu není co zvedat. | No licence, no climbing up. And without a plan there's nothing to lift anyway. |  |
| `ch2_hs_lano` |  |  | Lano jeřábu | Crane cable | popisek aktivního místa |
| `ch2_lano_prohlednout` | Ruda | podezíravě | Z navijáku trčí prasklé lanko. Cedule: „Lano měněno: 1994.“ | A frayed cable sticks out of the winch. The tag says: 'Cable last replaced: 1994.' | K lano (P2.5) |
| `ch2_listek_lano_zapsan` | Ruda | čte | Lístek: „Prasklé lano jeřábu.“ | Note: 'Frayed crane cable.' | lístek M07 |
| `ch2_obalka_lano_jinde` | Ruda | věcně | Obálka se otvírá u stolu v hangáru, ne na staveništi. Tady by mi uletěla. | The envelope gets opened at the table in the hangar, not out here. It'd blow away. | ★ obálka na lano |
| `ch2_hs_domichavac` |  |  | Domíchávač | Cement mixer | popisek aktivního místa |
| `ch2_domichavac_prohlednout` | Ruda | suše | Míchá od rána. Nikdo neví co. Ani on. | It's been mixing since morning. Nobody knows what. Not even the mixer. | gag; na konci první beton |
| `ch2_hs_brana` |  |  | Brána hangáru | Hangar gate | popisek aktivního místa |
| `ch2_brana_prohlednout` | Ruda | čte | Plechová brána. Cedule: „Archa. Nevstupovat. Komise, 1994.“ | A sheet-metal gate. The sign says: 'The Ark. Keep out. The Committee, 1994.' |  |
| `ch2_brana_zamceno` | Ruda | sebevědomě | Zamčeno. Klíč mám v kapse. Stačí ho použít. Tohle zvládnu. | Locked. The key's in my pocket. I just need to use it. I can handle this. | P2.1 |
| `ch2_brana_klic` | Ruda | zaskočeně | Klíč pasuje. Brána se pootevře… a dál ne. | The key fits. The gate opens a crack... and no further. | klíč na bránu |
| `ch2_brana_slon_objeven` | Ruda | užasle | Za bránou stojí slon. Svázaný z papírů, výkresů a rozdělané práce. Třicet let rozdělané práce. | There's an elephant behind the gate. Made of paperwork, drawings and unfinished work. Thirty years of unfinished work. | P2.1 |
| `ch2_brana_slon` | Ruda | odmítavě | Za bránou stojí slon. Dokud tam stojí, nikam nejdu. | There's an elephant behind the gate. As long as it's there, I'm not going anywhere. |  |
| `ch2_hs_slon` |  |  | Slon | Elephant | popisek aktivního místa |
| `ch2_slon_prohlednout` | Ruda | zaujatě | Slon z rozdělané práce. Praská tam, kde na něm někdo nechal čáru. | An elephant made of unfinished work. It cracks wherever someone's drawn a line on it. | stopa P2.1 |
| `ch2_slon_cara` | Ruda | zaujatě | Pod uchem má jednu starou čáru křídou. Z roku 1994. Tam už kus chybí. | There's one old chalk line under its ear. From 1994. A piece is already missing there. | stopa P2.1 |
| `ch2_slon_strcit` | Ruda | zadýchaně | Hýbe se míň než Komise. | It moves less than the Committee. | ★ strčit do slona |
| `ch2_slon_strcit_2` | Ruda | zadýchaně | Nic. Slona nikdo nepřetlačí. Leda po kouskách. | Nothing. Nobody can push an elephant. Not in one piece, anyway. |  |
| `ch2_slon_kreda` | Ruda | rozhodně | Tak, slone. Jak se jí slon? Po kouskách. | Right then, elephant. How do you eat an elephant? One bite at a time. | křída na slona → M04 (D03: funguje v obou jazycích) |
| `ch2_slon_klic` | Ruda | suše | Slon nemá zámek. Má jen váhu. | An elephant doesn't have a lock. It only has weight. | ★ klíč na slona |
| `ch2_slon_pero` | Ruda | suše | Kávová čára se do slona vsákne. Je z papírů a papíry pijou všechno. | A coffee line would just soak in. He's made of paperwork, and paperwork absorbs everything. | ★ kávové pero na slona |
| `ch2_slon_kava` | Ruda | majetnicky | Neprobudí ho. Mě jo. | It won't wake him up. It does wake me up, though. | ★ káva na slona |
| `ch2_slon_buchta` | Ruda | majetnicky | Slon buchtu nechce. Já jo. | The elephant doesn't want cake. I do. | ★ buchta na slona |
| `ch2_hs_plot` |  |  | Babiččin plot | Granny's fence | popisek aktivního místa |
| `ch2_plot_spojenec` | Ruda | dojatě | Babička na zápraží mává. Na plotě pro mě nechala buchtu. | Granny's waving from her doorstep. She's left a cake on the fence for me. | c1_babicka = spojenec (K10) |
| `ch2_plot_odmitnuta` | Ruda | provinile | Záclona je zatažená. Babička si pamatuje, že jsem spěchal. | The curtain's drawn. Granny remembers that I was in a hurry. | c1_babicka = odmitnuta (K10) |
| `ch2_plot_pradlo` | Ruda | suše | Na plotě se suší prádlo. Nikdo nemává. | There's washing drying on the fence. Nobody's waving. | c1_babicka = prehlizena, neodhalena (K10) |
| `ch2_plot_buchta` | Ruda | láskyplně | Buchta. Jediná věc tady, která je dopečená. | Cake. The only thing around here that's actually finished. | vzít buchtu (jen spojenec) |
| `ch2_plot_nic` | Ruda | opatrně | Plot. Babiččin. Lepší ho nechat být. | A fence. Granny's. Best leave it alone. |  |
| `ch2_kocour_prohlednout` | Ruda | pobaveně | Babiččin zrzavý kocour sedí na plotě a soudí. | Granny's ginger tomcat is sitting on the fence, passing judgement. | převzatý sprite (K11) |
| `ch2_kocour_mluvit` | Ruda | nejistě | Dobrý den. … Hodnotí mě. Vidím mu to na očích. | Good morning. ... He's assessing me. I can see it in his eyes. |  |
| `ch2_kocour_krysy` | Ruda | suše | Tenhle krysy nehoní. Ten soudí lidi. | This one doesn't chase rats. He judges people. | ★ krabice nebo obálka na kocoura (K11) |
| `ch2_hs_dvere_skladu` |  |  | Dveře skladu | Storeroom door | popisek aktivního místa; kap. 3 |
| `ch2_sklad_prohlednout` | Ruda | podezíravě | Zamčeno. Uvnitř něco šustí. | Locked. Something's rustling inside. | připraveno pro kap. 3 (krysy) |
| `ch2_hs_ulicka_namesti` |  |  | Ulička na náměstí | Alley to the square | popisek východu |
| `ch2_hs_brana_ven` |  |  | Brána ven | Gate out | popisek východu z hangáru |
| `ch2_m04_nazev` |  |  | Jak sníst slona | How to Eat an Elephant | nadpis minihry M04 |
| `ch2_m04_navod` |  |  | Kamennou půlku naporcuj celou: v každé části vyber kusy, které se vejdou do kolečka. Z mlžné půlky jen kousek, který je vidět. Pak „Stačí, odvezte to!“ | Carve up the whole stone half: in each part, pick the pieces that fit in a wheelbarrow. From the foggy half, only the bit you can see. Then 'That'll do, cart it off!' | návod M04 |
| `ch2_m04_cast_rampa` |  |  | Rampa | Ramp | M04 část |
| `ch2_m04_kus_draha` |  |  | Horní dráha | Upper track | M04 kus |
| `ch2_m04_kus_pilire` |  |  | Pilíře | Pillars | M04 kus |
| `ch2_m04_kus_plosina` |  |  | Odpalovací plošina | Launch platform | M04 kus |
| `ch2_m04_kus_rampa_cela` |  |  | Celá rampa naráz | The whole ramp at once | M04 past (velký kus) |
| `ch2_m04_cast_trup` |  |  | Trup | Hull | M04 část |
| `ch2_m04_kus_kostra` |  |  | Kostra | Frame | M04 kus |
| `ch2_m04_kus_plast` |  |  | Plášť | Skin | M04 kus |
| `ch2_m04_kus_poklopy` |  |  | Poklopy | Hatches | M04 kus |
| `ch2_m04_kus_trup_cely` |  |  | Celý trup | The whole hull | M04 past (velký kus) |
| `ch2_m04_cast_pohon` |  |  | Pohon | Propulsion | M04 část |
| `ch2_m04_kus_motory` |  |  | Motory | Engines | M04 kus |
| `ch2_m04_kus_nadrze` |  |  | Nádrže | Fuel tanks | M04 kus |
| `ch2_m04_kus_pilire_motory` |  |  | Pilíře a motory | Pillars and engines | M04 past (překryv) |
| `ch2_m04_cast_bezpecnost` |  |  | Bezpečnostní systém | Safety system | M04 část |
| `ch2_m04_kus_pojistky` |  |  | Pojistky startu | Launch interlocks | M04 kus |
| `ch2_m04_kus_vypnuti` |  |  | Nouzové vypnutí | Emergency shutdown | M04 kus |
| `ch2_m04_kus_poklopy_pojistky` |  |  | Poklopy a pojistky | Hatches and interlocks | M04 past (překryv) |
| `ch2_m04_cast_rizeni` |  |  | Řídicí systém | Control system | M04 mlžná část |
| `ch2_m04_mlha_rizeni_blizko` |  |  | První obrazovka | The first screen | M04 mlha, blízko |
| `ch2_m04_mlha_rizeni_daleko` |  |  | Celý řídicí systém do posledního tlačítka | The whole control system, down to the last button | M04 mlha, daleko |
| `ch2_m04_cast_aplikace` |  |  | Aplikace | App | M04 mlžná část |
| `ch2_m04_mlha_aplikace_blizko` |  |  | Přihlášení | Logging in | M04 mlha, blízko |
| `ch2_m04_mlha_aplikace_daleko` |  |  | Celá aplikace se všemi funkcemi | The whole app with every feature | M04 mlha, daleko |
| `ch2_m04_cast_nastup` |  |  | Nástup | Boarding | M04 mlžná část |
| `ch2_m04_mlha_nastup_blizko` |  |  | Zkouška s deseti lidmi | A trial run with ten people | M04 mlha, blízko |
| `ch2_m04_mlha_nastup_daleko` |  |  | Nástup všech 4 812 lidí krok za krokem | Boarding all 4,812 people, step by step | M04 mlha, daleko |
| `ch2_m04_cast_interier` |  |  | Interiér | Interior | M04 mlžná část |
| `ch2_m04_mlha_interier_blizko` |  |  | Jedna vzorová kajuta | One sample cabin | M04 mlha, blízko |
| `ch2_m04_mlha_interier_daleko` |  |  | Všechny kajuty podle výkresu | Every cabin, exactly as drawn | M04 mlha, daleko |
| `ch2_m04_velky` | Ruda | zklamaně | Nevejde se do kolečka. Slon ten kus odmítl. | It won't fit in the wheelbarrow. The elephant has rejected that piece. | M04: velký kus |
| `ch2_m04_rozplynuti` | Ruda | otráveně | Mlha se přeskupila a kus se rozplynul. Tohle už jsem jednou kreslil. | The fog shifted and the piece dissolved. I've drawn this one before. | M04: podrobný kus v mlze |
| `ch2_m04_rozplynuti_2` | Ruda | zamyšleně | Zase rozplynuto. V mlze se dá ukousnout jen to, co je vidět. | Dissolved again. In the fog you can only bite off what you can see. | M04: podruhé |
| `ch2_m04_mlha_ok` | Ruda | spokojeně | Ten kousek je vidět. Ukousnuto. | That bit I can see. One bite. | M04: blízký kus v mlze |
| `ch2_m04_preskocit` | Pembok | suše | Naporcuju ho tak nějak. (krájí) Tak. Nějak. | I'll carve him up somehow. (carves) There. Somehow. | přeskočení M04, c2_rozpad = 3 |
| `ch2_m04_prekryv` | Ruda | zamračeně | Jeden kus se při odvozu drolí. Někdo ho krájel dvakrát. | One piece is crumbling in the barrow. Someone carved it twice. | M04: překryv |
| `ch2_m04_mezera` | Ruda | zamračeně | Na slonovi zůstal kus, který nikdo nenaporcoval. Bude chybět. | There's a piece left on the elephant that nobody carved. It'll be missed. | M04: mezera |
| `ch2_m04_hotovo_slabe` | Pembok | suše | Odvezeno. Ne všechno sedělo, ale brána je volná. | Carted off. Not everything fitted, but the gate is clear. | M04 s mezerami nebo překryvy |
| `ch2_m04_hotovo` | Pembok | uznale | Každý kus právě jednou. Takhle se jí slon. | Every piece exactly once. That's how you eat an elephant. | M04 bez chyb |
| `ch2_m04_brana_volna` | Ruda | spokojeně | Kamenná půlka odjela v kolečkách, mlžná ustoupila do hangáru. Brána je volná. | The stone half went off in wheelbarrows, the foggy half drifted back into the hangar. The gate is clear. | konec M04; klíč zůstane v zámku (D81) |

## Hangár s Archou, tabule a M07

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `ch2_hangar_prichod` | Ruda | užasle | Hangár. A v něm Archa. Rezavá loď, ke které někdo přišrouboval motory. | The hangar. And inside it, the Ark. A rusty ship that somebody bolted engines onto. | jen při prvním příchodu |
| `ch2_hangar_gantt_zbytek` | Ruda | spokojeně | Kousek křídy zbyl. Na Gantt vždycky zbyde. | There's a bit of chalk left. There's always enough left for a Gantt chart. | K19 |
| `ch2_hangar_gantt` | Ruda | sebevědomě | (kreslí na stěnu) Rampa, trup, pohon… a řídicí systém: úterý. Hotovo. | (draws on the wall) Ramp, hull, propulsion... and the control system: Tuesday. Done. | Rudova vada: Gantt i na software |
| `ch2_bara_prvni_duvera` | Bára | věcně | Trup je o čtyřicet centimetrů kratší než na výkresu. Aspoň něco víme. | The hull is sixteen inches shorter than the drawings say. At least we know something. | c1_bara_vyslechnuta ≥ 2 |
| `ch2_bara_prvni_mlci` | Ruda | nejistě | Bára měří trup. Nekývne, neodpoví. Měří. | Barb is measuring the hull. No nod, no answer. Just measuring. | c1_bara_vyslechnuta < 2 |
| `ch2_predseda_navsteva` | Předseda | vlídně | Výborně, výborně. Kontrolní návštěva. Hlavně nespěchejte. | Excellent, excellent. An inspection visit. Above all, don't rush. | Předseda u vrat, úsměv (K úsměv) |
| `ch2_predseda_formular_1` | Předseda | vlídně | Ještě drobnost. Kvůli tomu hnědému razítku. | One small thing. About that brown stamp. | c1_razitko = kava (P2.6) |
| `ch2_predseda_formular_2` | Předseda | vlídně | Žádost o uznání hnědé barvy. Podpisy tří zaměstnanců projektu. Formalita. | An application for recognition of the colour brown. Signatures of three project employees. A formality. | předá formulář |
| `ch2_hs_archa` |  |  | Archa | The Ark | popisek aktivního místa |
| `ch2_archa_prohlednout` | Ruda | suše | Kdyby rez byla palivo, už jsme na Měsíci. | If rust were fuel, we'd be on the Moon by now. |  |
| `ch2_hs_kokpit` |  |  | Kokpit Archy | The Ark's cockpit | popisek aktivního místa |
| `ch2_kokpit_prohlednout` | Ruda | suše | Sedadlo, volant od autobusu a krabice od bot. | A seat, a steering wheel off a bus, and a shoebox. |  |
| `ch2_kokpit_krabice` | Ruda | zaujatě | Krabice od bot. Na víku: „Co se může pokazit“. Uvnitř nic, jen obálka „Na nepředvídané“. | A shoebox. On the lid: 'What could go wrong'. Inside, nothing but an envelope marked 'For the unforeseen'. | vzít krabici a obálku (P2.5) |
| `ch2_kokpit_prazdny` | Ruda | pobaveně | Volant od autobusu. Snad Archa nejezdí po linkách. | A steering wheel off a bus. Let's hope the Ark doesn't run on a timetable. | po vzetí krabice |
| `ch2_hs_kabely` |  |  | Kabely pod Archou | Cables under the Ark | popisek aktivního místa |
| `ch2_kabely_prohlednout` | Ruda | podezíravě | Okousané kabely. Malé zuby. Hodně zubů. | Chewed cables. Small teeth. Lots of them. | K krysy (P2.5) |
| `ch2_listek_krysy_zapsan` | Ruda | čte | Lístek: „Okousané kabely. Krysy?“ | Note: 'Chewed cables. Rats?' | lístek M07 |
| `ch2_hs_vykresy` |  |  | Výkresy z roku 1994 | Drawings from 1994 | popisek aktivního místa |
| `ch2_vykresy_1` | Ruda | čte | Rampa, trup, pohon a bezpečnostní systém mají výkres. Přesný, s razítkem. | The ramp, hull, propulsion and safety system all have drawings. Precise, and stamped. | stopa R2.2 |
| `ch2_vykresy_2` | Ruda | čte | Řídicí systém a kajuty: „dopracuje se podle potřeb obyvatel“. To je celý výkres. | Control system and cabins: 'to be worked out according to the residents' needs'. That's the entire drawing. | stopa R2.2 |
| `ch2_hs_gantt` |  |  | Rudův Gantt na stěně | Rudy's Gantt chart on the wall | popisek aktivního místa |
| `ch2_gantt_prohlednout` | Ruda | hrdě | Dvě stě čtrnáct řádků. Včetně „naprogramovat řízení: úterý“. | Two hundred and fourteen rows. Including 'program the controls: Tuesday'. | gag |
| `ch2_gantt_preskrtany` | Ruda | zamyšleně | Polovinu jsem přeškrtl. Bolelo to. Ale ta druhá polovina teď aspoň platí. | I crossed out half of it. It hurt. But at least the other half is true now. | po R2.2 = povaha |
| `ch2_hs_tabule` |  |  | Tabule s magnety | Magnet board | popisek aktivního místa |
| `ch2_tabule_prohlednout` | Ruda | spokojeně | Osm magnetů, všechny v mém sloupci. Sloupce: „Rudův způsob: výkres a termín“ a „Bářin způsob: zkusit a ukázat“. | Eight magnets, all in my column. The columns: 'Rudy's way: drawing and deadline' and 'Barb's way: try it and show it'. | K16 |
| `ch2_tabule_hotovo` | Ruda | věcně | Rozděleno. Tabule teď visí tak, jak jsme se domluvili. | Divided up. The board now hangs the way we agreed. | po R2.2 |
| `ch2_framework_prichod_1` | Framework | obchodnicky | Dobrý den! Slyšel jsem, že se tu dělí. Proč dělit, když se dá zabalit? | Good day! I hear there's dividing going on. Why divide when you can box it up? | první použití tabule (K7) |
| `ch2_framework_prichod_2` | Framework | obchodnicky | Jedna krabice na všechno. „Beton v krabici.“ „Rampa každé dva týdny nová.“ | One box for everything. 'Concrete in a box.' 'A brand-new ramp every two weeks.' | K7 |
| `ch2_framework_prichod_ruda` | Ruda | suše | Ing. Framework. Člověk, který prodává krabice na krabice. | Dr. Framework. The man who sells boxes for boxes. |  |
| `ch2_bara_tabule_rada` | Bára | věcně | Neptej se, z čeho to je. Ptej se, jestli víme, co lidi chtějí, a kolik stojí to předělat. | Don't ask what it's made of. Ask whether we know what people want, and what it costs to redo. | c1_bara_vyslechnuta ≥ 2, stopa R2.2 |
| `ch2_tabule_bez_tymu` | Ruda | zamyšleně | Rozdělit práci bez lidí, co ji budou dělat? To je zase jen Gantt. | Divide up the work without the people who'll do it? That's just another Gantt chart. | tabule bez potvrzeného týmu |
| `ch2_tabule_pero` | Ruda | suše | Kávou na tabuli? To by tam bylo napořád. A tohle se ještě bude měnit. | Coffee on the board? That'd be there for good. And this is going to change. | ★ kávové pero na tabuli |
| `ch2_tabule_kreda` | Ruda | věcně | Na tabuli jsou magnety, ne čáry. Křída počká na slona. | The board takes magnets, not lines. The chalk can wait for the elephant. | ★ křída na tabuli |
| `ch2_tabule_odhad` | Ruda | věcně | Tácek s odhadem na tabuli nepatří. Patří do plánu. | The beer mat with the estimate doesn't belong on the board. It belongs in the plan. | ★ odhad na tabuli |
| `ch2_hs_cil` |  |  | Cíl nad tabulí | Goal above the board | popisek aktivního místa; c1_charter_kvalita = 3 (K13) |
| `ch2_cil_prohlednout` | Ruda | zamyšleně | „Odvézt všechny obyvatele.“ Všechny. Ne jen ty, co umějí číst výkresy. | 'Carry every resident to safety.' Every one. Not just the ones who can read drawings. | stopa R2.2 (K13) |
| `ch2_hs_kalendar` |  |  | Kalendář | Calendar | popisek aktivního místa |
| `ch2_kalendar_prohlednout` | Ruda | zasmušile | Odtrhávací kalendář. Dnes „zbývá 27“. Poslední list: „Den dopadu“. | A tear-off calendar. Today: '27 left'. The last page: 'Impact Day'. | P2.8 |
| `ch2_kalendar_vzit` | Ruda | suše | Utrhnu poslední list. Ať to aspoň vypadá, že máme čas. | I'll tear off the last page. At least it'll look like we've got time. | vzít list (P2.8) |
| `ch2_hs_stul` |  |  | Stůl | Table | popisek aktivního místa |
| `ch2_stul_prohlednout` | Ruda | přemýšlivě | Velký stůl. Sem by se dalo něco vysypat. | A big table. You could tip something out onto it. | stopa P2.5 |
| `ch2_stul_hotovo` | Ruda | věcně | Krabice je otevřená, lístky zapsané. Obálka je pryč. | The box is open, the notes are written. The envelope's gone. | po M07 |
| `ch2_stul_malo` | Ruda | přemýšlivě | Tři lístky by chtělo mít, než krabici otevřu. Jinak nevím, na co obálku dát. | I'd want three notes before I open the box. Otherwise I won't know what the envelope is for. | méně než 3 lístky |
| `ch2_stul_krabice` | Ruda | rozhodně | Vysypu lístky. Teď kam s obálkou. | Tipping out the notes. Now, where does the envelope go. | otevření M07 |
| `ch2_bara_prohlednout` | Ruda | uznale | Bára měří trup a nikoho si nevšímá. | Barb is measuring the hull and ignoring everyone. |  |
| `ch2_bara_krabice_1` | Bára | tiše | Tu krabici jsem zakládala já. | I started that box. | K14 |
| `ch2_bara_krabice_2` | Bára | hořce | Nikdo mi do ní nedovolil nic napsat. | Nobody ever let me write anything in it. | K14 |
| `ch2_bara_obalka` | Bára | věcně | Peníze na nepředvídané? Dej je na něco, čemu se dá předejít. Zkoušet se dá zadarmo. | Money for the unforeseen? Put it on something you can prevent. Trying things is free. | ★ obálka na Báru (stopa M07) |
| `ch2_bara_kava` | Bára | suše | Nepiju při práci. Pak by mi tekly rozměry. | I don't drink while working. My measurements would start to wobble. | ★ káva |
| `ch2_bara_pero` | Bára | suše | Pero, které píše kávou. Podepsala bych tím nanejvýš kávu. | A pen that writes in coffee. I'd sign for a coffee with it, at most. | ★ kávové pero |
| `ch2_bara_odhad` | Bára | věcně | Patnáct? Nebo dva? Ukaž mi, kdo to psal, a řeknu ti, kolik to platí. | Fifteen? Or two? Show me who wrote it and I'll tell you how much it's worth. | ★ odhad na tácku |
| `ch2_bara_plan` | Bára | uznale | Řeka je nakreslená jen kousek dopředu. Dobře. | The river's only drawn a little way ahead. Good. | ★ plán cesty |
| `ch2_bara_buchta` | Bára | vlídně | Od babičky? Tu si vezmu. Ta jediná ví, kudy se chodí kolem rampy. | From Granny? I'll take that. She's the only one who knows the way round the ramp. | ★ buchta |
| `ch2_podpis_bara` | Bára | věcně | Podepíšu, až ho přeměřím. (přeměří a podepíše) | I'll sign once I've measured it. (measures it and signs) | formulář na Báru (P2.6) |
| `ch2_formular_podepsan` | Ruda | vítězoslavně | Tři podpisy. Formulář je kompletní. Komise žasne. | Three signatures. The form is complete. The Committee will be amazed. | P2.6 |
| `ch2_formular_uz_podepsal` | Ruda | věcně | Ten už podepsal. Dvakrát se nepočítá. | Already signed. Twice doesn't count. |  |
| `ch2_formular_neni_v_tymu` | Ruda | věcně | Formulář podepisují zaměstnanci projektu. Tenhle v týmu není. | The form is for project employees. This one isn't on the team. | ★ formulář mimo tým |
| `ch2_predseda_prohlednout` | Ruda | podezíravě | Předseda stojí u vrat a usmívá se. To se mi nelíbí. | The Chairman is standing by the gate, smiling. I don't like it. | K úsměv (P2.5) |
| `ch2_listek_usmev_zapsan` | Ruda | čte | Lístek: „Předsedův úsměv.“ | Note: 'The Chairman's smile.' | lístek M07 |
| `ch2_predseda_obalka` | Předseda | vlídně | Peníze? Ne, ne. Komise pracuje zadarmo. Proto pracuje tak dlouho. | Money? No, no. The Committee works for free. That's why it takes so long. | ★ obálka na Předsedu |
| `ch2_predseda_kava` | Předseda | vlídně, ale ostražitě | Hnědou jsem už jednou viděl. Na razítku. | I've seen brown before. On a stamp. | ★ káva na Předsedu |
| `ch2_predseda_klic` | Předseda | zmateně | Klíč od hangáru. Kdo vám ho dal? Ach tak. Já. | The hangar key. Who gave you that? Ah. I did. | ★ klíč na Předsedu |
| `ch2_predseda_hangar_uvod` | Předseda | vlídně | Jen se dívám, jak to jde. Pomalu? Výborně. | Just seeing how it's going. Slowly? Excellent. | dialog v hangáru |
| `ch2_predseda_vse` | Předseda |  | Vítám. To je vše, co k tomu mám. | Welcome. That's all I have to say on the matter. | vyčerpaný dialog |
| `ch2_predseda_volba_co` | Ruda |  | Co tu děláte? | What are you doing here? | volba dialogu |
| `ch2_predseda_hangar_co` | Předseda | vlídně | Kontrolní návštěva. Kontroluji, jestli se nespěchá. Nespěchá se? Výborně. | An inspection visit. I'm checking that nobody's rushing. Nobody is? Excellent. |  |
| `ch2_predseda_volba_formular` | Ruda |  | K čemu ten formulář? | What's the form for? | volba dialogu (jen s formulářem) |
| `ch2_predseda_hangar_formular` | Předseda | vlídně | Hnědá barva razítka není v normě. Tři podpisy, a je. Pro vaše dobro. | Brown isn't an approved stamp colour. Three signatures, and it is. For your own good. | P2.6 |
| `ch2_predseda_hangar_konec` | Předseda | vlídně | Nespěchejte. | Don't rush. |  |
| `ch2_framework_prohlednout` | Ruda | suše | Ing. Framework. Kufr plný krabic. Každá řeší všechno. | Dr. Framework. A suitcase full of boxes. Each one solves everything. |  |
| `ch2_framework_obalka` | Framework | obchodnicky | Obálku? Výborně. Za ni vám dám krabici na obálky. | An envelope? Excellent. In exchange, I'll give you a box for envelopes. | ★ obálka (chce ji) |
| `ch2_framework_kava` | Framework | povýšeně | Kávu já neřeším. Na to máme krabici „Ranní rituál“. | I don't deal with coffee. We have a box for that: 'Morning Ritual'. | ★ káva |
| `ch2_framework_plan` | Framework | uraženě | Plán s mosty? Mosty jsou tak minulé čtvrtletí. | A plan with bridges? Bridges are so last quarter. | ★ plán cesty |
| `ch2_framework_krabice` | Framework | povýšeně | Krabice od bot? Amatérské. Moje krabice mají víko na obě strany. | A shoebox? Amateur. My boxes have lids on both sides. | ★ krabice od bot |
| `ch2_framework_uvod` | Framework | obchodnicky | Krabice na všechno. Ptejte se. | A box for everything. Ask away. | dialog |
| `ch2_framework_vse` | Framework |  | Všechno je v krabici. Víc vědět nemusíte. | It's all in the box. You don't need to know any more. | vyčerpaný dialog |
| `ch2_framework_volba_krabice` | Ruda |  | Co je v té krabici? | What's in the box? | volba dialogu |
| `ch2_framework_krabice_1` | Framework | nadšeně | Všechno! Každé dva týdny ji přejmenujeme a je jako nová. | Everything! Every two weeks we rename it and it's as good as new. |  |
| `ch2_framework_krabice_2` | Ruda | skepticky | A co v ní je? | And what's in it? |  |
| `ch2_framework_volba_beton` | Ruda |  | A na beton? | And for concrete? | volba dialogu |
| `ch2_framework_beton` | Framework | rozhodně | Beton taky jen potřebuje víc porad. | Concrete just needs more meetings, like everything else. |  |
| `ch2_framework_volba_krystof` | Ruda |  | Kryštof je v mém týmu. | Chip is on my team. | volba dialogu (Kryštof v týmu) |
| `ch2_framework_krystof` | Framework | samolibě | Výborně. Kryštof vám tu krabici stejně nastěhuje. | Excellent. Chip will move the box in for you anyway. |  |
| `ch2_framework_konec` | Framework | chladně | Tak příště. Já mám čas. Vy ne. | Until next time, then. I have time. You don't. | náznak kap. 4 |
| `ch2_hs_dilna` |  |  | Boční dveře | Side door | popisek aktivního místa; kap. 3 |
| `ch2_dilna_prohlednout` | Ruda | suše | Bářin kout. Zatím jen bedny. | Barb's corner. Just crates for now. | připraveno pro kap. 3 (dílna) |
| `ch2_hs_zebrik` |  |  | Žebřík k Arše | Ladder to the Ark | popisek aktivního místa; kap. 3 |
| `ch2_zebrik_prohlednout` | Ruda | odmítavě | Dovnitř zatím ne. Je tam hlavně rez. | Not going in yet. It's mostly rust in there. | připraveno pro kap. 3 (trup) |
| `ch2_hs_zadni_vrata` |  |  | Zadní vrata | Back gate | popisek východu |
| `ch2_vrata_prohlednout` | Ruda | zaujatě | Za vraty začíná mlha. Tudy prý chodí Bára. | The fog starts right outside the gate. Apparently this is the way Barb comes in. | K1 |
| `ch2_tabule_nazev` |  |  | Rozdělení Archy | Dividing Up the Ark | nadpis tabule (R2.2) |
| `ch2_tabule_navod` |  |  | Nechat Gantt na všechno, vzít Frameworkovu krabici, nebo rozdělit část po části. Při rozdělování dej každý magnet do jednoho sloupce. | Keep the Gantt chart for everything, take Framework's box, or divide it up part by part. When dividing, put each magnet in one column. | návod tabule |
| `ch2_tabule_sloupec_ruda` |  |  | Rudův způsob: výkres a termín | Rudy's way: drawing and deadline | sloupec tabule (K16) |
| `ch2_tabule_sloupec_bara` |  |  | Bářin způsob: zkusit a ukázat | Barb's way: try it and show it | sloupec tabule (K16) |
| `ch2_magnet_rampa` |  |  | Rampa | Ramp | magnet |
| `ch2_magnet_trup` |  |  | Trup | Hull | magnet |
| `ch2_magnet_pohon` |  |  | Pohon | Propulsion | magnet |
| `ch2_magnet_bezpecnost` |  |  | Bezpečnostní systém | Safety system | magnet (výjimka) |
| `ch2_magnet_rizeni` |  |  | Řídicí systém | Control system | magnet |
| `ch2_magnet_aplikace` |  |  | Aplikace | App | magnet |
| `ch2_magnet_nastup` |  |  | Nástup | Boarding | magnet |
| `ch2_magnet_interier` |  |  | Interiér | Interior | magnet (výjimka) |
| `ch2_magnet_fontana` |  |  | Fontána | Fountain | magnet nesmysl (c1_slib_vseho ≥ 3) |
| `ch2_magnet_bazen` |  |  | Bazén | Swimming pool | magnet nesmysl |
| `ch2_magnet_terasa` |  |  | Terasa | Sun terrace | magnet nesmysl |
| `ch2_tabule_nedokonceno` | Ruda | věcně | Ještě nejsou všechny magnety ve sloupcích. | Not all the magnets are in a column yet. | tabule |
| `ch2_tabule_nesmysl` | Pembok | suše | Tohle přišlo od starosty. Od tebe, vlastně. Na Archu to nepatří. | This one came from the mayor. From you, actually. It doesn't belong on the Ark. | nesmysl na tabuli |
| `ch2_tabule_namitka_rampa` | Věra | rozhodně | Rampa podle zkoušení? Beton se nezkouší, beton se počítá. | The ramp by trial and error? You don't try concrete, you calculate it. | námitka, magnet zpět doprostřed |
| `ch2_tabule_namitka_trup` | Věra | rozhodně | Trup se nedá předělat po kouskách. Patří k výkresu. | You can't redo a hull in little pieces. It goes with the drawing. | námitka |
| `ch2_tabule_namitka_pohon` | Ruda | rozhodně | Motory zkoušet na lidech? Ne. Pohon jede podle výkresu. | Test the engines on people? No. Propulsion goes by the drawing. | námitka |
| `ch2_tabule_namitka_rizeni` | Bára | věcně | Řídicí systém nikdo nenakreslí dopředu. Musí se zkoušet. | Nobody can draw a control system in advance. It has to be tried. | námitka |
| `ch2_tabule_namitka_aplikace` | Bára | věcně | Aplikaci musí vidět lidi, než ji dokreslíme. | People have to see the app before we finish drawing it. | námitka |
| `ch2_tabule_namitka_nastup` | Bára | věcně | Nástup? Kudy půjde 4 812 lidí, se zjistí jen zkouškou. | Boarding? The only way to find out how 4,812 people will get on is to try it. | námitka |
| `ch2_tabule_gantt_ruda` | Ruda | sebevědomě | Gantt na všechno. Jako vždycky. | A Gantt chart for everything. As always. | R2.2 = gantt |
| `ch2_tabule_gantt_bara` | Ruda | nejistě | Bára beze slova odejde od tabule. | Barb walks away from the board without a word. | R2.2 = gantt |
| `ch2_tabule_krabice` | Framework | samolibě | Teď je všechno v krabici. Hlavně se do ní nedívejte. | Now everything's in the box. Whatever you do, don't look inside. | R2.2 = krabice |
| `ch2_tabule_krabice_bara` | Bára | chladně | Krabice na všechno. Tak to si budu zkoušet sama. | A box for everything. Then I'll do my trying on my own. | R2.2 = krabice |
| `ch2_tabule_povaha` | Ruda | rozhodně | Rozděleno. Část po části. | Divided up. Part by part. | R2.2 = povaha |
| `ch2_tabule_povaha_bara` | Bára | usměje se | (poprvé se usměje) Tohle sedí. | (smiles for the first time) That works. | R2.2 = povaha, obě výjimky |
| `ch2_tabule_povaha_zelezo` | Ruda | nejistě | Železo mně, software Báře. Jednoduché. Snad. | Iron for me, software for Barb. Simple. Hopefully. | R2.2 = povaha, výjimky < 2 |
| `ch2_tabule_odchod` | Ruda | podezíravě | Předseda si rozdělení zapíše do notýsku a odejde. Ing. Framework odchází „za jedním klientem nahoru“. | The Chairman notes the division in his little book and leaves. Dr. Framework heads off 'to see a client upstairs'. | po R2.2; náznak kap. 4 |
| `ch2_m07_nazev` |  |  | Krabice od bot | The Shoebox | nadpis minihry M07 |
| `ch2_m07_navod` |  |  | Obálka „Na nepředvídané“ stačí jen na jednu věc. Polož ji na lístek, kterému chceš předejít. | The 'For the unforeseen' envelope only covers one thing. Put it on the note you want to prevent. | návod M07 |
| `ch2_m07_listek_krysy` |  |  | Okousané kabely (krysy) | Chewed cables (rats) | lístek M07 |
| `ch2_m07_listek_lano` |  |  | Prasklé lano jeřábu | Frayed crane cable | lístek M07 |
| `ch2_m07_listek_usmev` |  |  | Předsedův úsměv | The Chairman's smile | lístek M07 |
| `ch2_m07_listek_nastup` |  |  | Nikdo neví, kudy nastoupit | Nobody knows which way to board | lístek M07 (Zkusíme) |
| `ch2_m07_listek_odhad` |  |  | Pepovy „dva dny“ | Joe's 'two days' | lístek M07 (Zkusíme) |
| `ch2_m07_zkusime` | Bára | věcně | Na tohle peníze nepotřebuješ. Stačí to zkusit. (razítko „Zkusíme“) | You don't need money for this. You just need to try it. (stamps it 'We'll try') | M07: lístek z mlžné povahy |
| `ch2_m07_obalka_krysy` | Ruda | rozhodně | Obálka na krysy. Zaplatím krmení té kočce z inzerátu. | The envelope goes on the rats. I'll pay the food bill for that cat from the advert. | R2.3 = krysy |
| `ch2_m07_obalka_lano` | Ruda | rozhodně | Obálka na lano. Jeřáb dostane nové. | The envelope goes on the cable. The crane gets a new one. | R2.3 = lano |
| `ch2_m07_obalka_usmev` | Ruda | rozhodně | Obálka na úsměv. Za ty peníze si nechám kopírovat všechno, co Předseda podepíše. | The envelope goes on the smile. That money buys me a copy of everything the Chairman signs. | R2.3 = usmev |
| `ch2_m07_hotovo` | Ruda | spokojeně | Zbytek lístků zůstane v krabici. Hlídané. Poprvé za třicet let. | The rest of the notes stay in the box. Watched. For the first time in thirty years. | konec M07 |
| `ch2_bara_uvod_duvera` | Bára | věcně | Ahoj. Měř se mnou, nebo mi nestůj ve světle. | Hi. Either measure with me or get out of my light. | c1_bara_vyslechnuta ≥ 2 |
| `ch2_bara_uvod_mlci` | Bára | chladně | Hm. | Hm. | c1_bara_vyslechnuta < 2 |
| `ch2_bara_vse` | Bára |  | Víc nevím. Musím měřit. | That's all I know. I have to measure. | vyčerpaný dialog |
| `ch2_bara_volba_cesta` | Ruda |  | Jak jste se sem dostala? | How did you get in here? | volba dialogu |
| `ch2_bara_cesta` | Bára | věcně | Zadem. Přes mlhu. Tudy nikdo jiný nechodí. | The back way. Through the fog. Nobody else comes that way. | K1 |
| `ch2_bara_volba_mereni` | Ruda |  | Co měříte? | What are you measuring? | volba dialogu |
| `ch2_bara_mereni_1` | Bára | věcně | Trup. Výkres říká jedno, trup druhé. | The hull. The drawing says one thing, the hull says another. |  |
| `ch2_bara_mereni_2` | Bára | věcně | Kde se liší, tam se bude něco předělávat. Lepší to vědět teď. | Wherever they differ, something will have to be redone. Better to know now. |  |
| `ch2_bara_volba_gantt` | Ruda |  | Viděla jste můj Gantt? | Have you seen my Gantt chart? | volba dialogu |
| `ch2_bara_gantt` | Bára | suše | Úterý? Řídicí systém do úterý? Kterého roku? | Tuesday? The control system by Tuesday? Of which year? |  |
| `ch2_bara_volba_tym` | Ruda |  | Koho mám vzít do týmu? | Who should I take on the team? | volba dialogu (před R2.1) |
| `ch2_bara_tym_rada` | Bára | věcně | Ptej se, co umějí. Ne jestli jsou milí. | Ask what they can do. Not whether they're nice. | c1_bara_vyslechnuta ≥ 2, stopa P2.2 |
| `ch2_bara_mlci` | Bára | mlčí | … (měří dál) | ... (keeps measuring) | c1_bara_vyslechnuta < 2 |
| `ch2_bara_volba_odhad` | Ruda |  | Jak zjistím, za kolik bude rampa? | How do I find out how long the ramp will take? | volba dialogu (po R2.1, před P2.3) |
| `ch2_bara_odhad_rada` | Bára | věcně | Když se zeptáš všech najednou, odpoví ti první, kdo promluví. | If you ask everyone at once, you get the answer of whoever speaks first. | c1_bara_vyslechnuta ≥ 2, stopa P2.3 |
| `ch2_bara_volba_tabule` | Ruda |  | Co říkáte na tu tabuli? | What do you think of the board? | volba dialogu (po R2.2) |
| `ch2_bara_r22_povaha` | Bára | usměje se | (poprvé se usměje) Řízení je moje. Rampa tvoje. Takhle se dá stavět. | (smiles for the first time) The controls are mine. The ramp's yours. We can build like this. | c2_rozdeleni = povaha; Bářina důvěra |
| `ch2_bara_r22_krabice` | Bára | chladně | Krabice na všechno. Tak to si budu zkoušet sama. | A box for everything. Then I'll do my trying on my own. | c2_rozdeleni = krabice |
| `ch2_bara_r22_gantt` | Bára | chladně | Gantt na všechno. Jako vždycky. | A Gantt chart for everything. As always. | c2_rozdeleni = gantt; Bářina důvěra klesá |
| `ch2_bara_konec` | Bára | věcně | Hm. Měřím dál. | Hm. Back to measuring. |  |
| `ch2_predseda_kava_plan` | Předseda | vlídně, ale ostražitě | Kávu na plán? Hnědá už jednou stačila. | Coffee on the plan? Brown was enough the first time. | ★ káva na Předsedu v Komisi |

## Hospoda U Odhadu: nábor, odhad a formulář

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `ch2_hospoda_prichod` | Ruda | uznale | Hospoda U Odhadu. Cedule u výčepu: „Obsluha: fáze 2.“ Štamgasti pijí limonádu z fáze 2. | The Rough Estimate. The sign at the bar says: 'Service: phase two.' The regulars are drinking phase-two lemonade. | jen při prvním příchodu; PEGI 12 |
| `ch2_hs_tabule_odhad` |  |  | Tabule „Odhad dne“ | 'Estimate of the Day' board | popisek aktivního místa |
| `ch2_tabule_odhad_prohlednout` | Ruda | čte | „Odhad dne: dva dny.“ Pod tím leží křída. | 'Estimate of the day: two days.' There's a piece of chalk underneath. | stopa P2.1 |
| `ch2_kreda_vzit` | Ruda | pobaveně | Vezmu si křídu. Na dva dny ji nebudou potřebovat. | I'll take the chalk. They won't need it for two days. | vzít křídu |
| `ch2_kreda_uz` | Ruda | suše | Křídu už mám. Další by jen napsala další dva dny. | I've already got chalk. Another piece would only write another two days. |  |
| `ch2_hs_sazky` |  |  | Sázková tabule | Betting board | popisek aktivního místa |
| `ch2_sazky_prohlednout` | Ruda | čte | „Za kolik dní bude…“ Most: dva dny. Kašna: dva dny. Radnice: dva dny. Všechny sázky prohrané. | 'How many days until...' The bridge: two days. The fountain: two days. The town hall: two days. Every bet lost. | stopa P2.3; K odhad |
| `ch2_listek_odhad_zapsan` | Ruda | čte | Lístek: „Pepovy dva dny.“ | Note: 'Joe's two days.' | lístek M07 |
| `ch2_sazky_hotovo` | Ruda | věcně | Odhad mám. Sázet už nechci. | I've got my estimate. I'm done betting. | po P2.3 |
| `ch2_sazky_bez_tymu` | Ruda | věcně | Sázet na rampu, když nemám, kdo ji postaví? To počká. | Bet on the ramp when I've got nobody to build it? That can wait. | před R2.1 |
| `ch2_hs_vycep` |  |  | Výčep s tácky | Bar with beer mats | popisek aktivního místa |
| `ch2_vycep_prohlednout` | Ruda | suše | Výčep bez výčepního. Hromada tácků. | A bar with no barman. A pile of beer mats. |  |
| `ch2_tacky_vzit` | Ruda | spokojeně | Pár tácků se vždycky hodí. | A few beer mats always come in handy. | vzít tácky |
| `ch2_hs_stamgasti` |  |  | Štamgasti | Regulars | popisek aktivního místa (skupina) |
| `ch2_stamgasti_prohlednout` | Ruda | pobaveně | Štamgasti u kulatého stolu. Odhadují všechno. Hlavně cizí práci. | The regulars at the round table. They estimate everything. Mostly other people's work. |  |
| `ch2_tacky_stamgasti` | Ruda | věcně | Oni rampu stavět nebudou. Ať odhadují ti, co budou. | They won't be building the ramp. Let the people who will do the estimating. | ★ tácky na štamgasty (K3) |
| `ch2_stamgasti_krabice` | Štamgasti | uraženě | Do krabice? My se nepokazíme. My jsme pořád stejní. | In the box? We won't go wrong. We're always the same. | ★ krabice na štamgasty |
| `ch2_stamgasti_kava` | Štamgasti | pobaveně | Kafe? Dva dny, a vychladne. | Coffee? Two days and it'll be cold. | ★ káva na štamgasty |
| `ch2_stamgasti_uvod` | Štamgasti | rozjařeně | Nový! Za kolik dní odejde? Dva dny! | A new one! How many days before he gives up? Two days! | dialog |
| `ch2_stamgasti_vse` | Štamgasti |  | Dva dny. Na všechno dva dny. | Two days. Two days for everything. | vyčerpaný dialog |
| `ch2_stamgasti_volba_co` | Ruda |  | Co tu děláte? | What do you do here? | volba dialogu |
| `ch2_stamgasti_co` | Štamgasti | hrdě | Odhadujeme. Hlavně cizí práci. Vlastní neděláme. | We estimate. Mostly other people's work. We don't do any of our own. |  |
| `ch2_stamgasti_volba_jerab` | Ruda |  | Kdo ve městě umí s jeřábem? | Who in town can drive a crane? | volba dialogu |
| `ch2_stamgasti_jerab` | Štamgasti | tajemně | Průkaz má jen jeden člověk. A ten hlídá dveře. | Only one man's got a licence. And he guards a door. | stopa ke konci (K15) |
| `ch2_ruda_vratny_pozdeji` | Ruda | ledabyle | Vrátný? Zeptám se ho, až bude jeřáb potřeba. | The porter? I'll ask him when we need the crane. | K15; nastaví vratny_stopa |
| `ch2_stamgasti_konec` | Štamgasti | rozjařeně | Dva dny! Na zdraví! | Two days! Cheers! |  |
| `ch2_sazka_1` | Ruda | zvědavě | Za kolik dní bude rampa? | How many days until the ramp's done? | P2.3 kotva |
| `ch2_sazka_pepa` | Pepa | okamžitě | Dva dny. | Two days. | kotva |
| `ch2_sazka_stamgasti_1` | Štamgasti | nejistě | Tři? | Three? |  |
| `ch2_sazka_stamgasti_2` | Štamgasti | rozhodně | Dva a půl! | Two and a half! |  |
| `ch2_sazka_znovu` | Štamgasti | dotěrně | Tak co, dva dny? | Well then? Two days? | opakovaný dialog |
| `ch2_sazka_volba_kotva` | Ruda |  | Slyšeli jste. Dva dny. | You heard them. Two days. | volba s následkem (c2_odhad = kotva) |
| `ch2_sazka_kotva_ruda` | Ruda | váhavě | (zaváhá) … Dva dny. Napište mi to na tácek. | (hesitates) ...Two days. Write it on a beer mat for me. | přijetí kotvy |
| `ch2_sazka_kotva_stamgasti` | Štamgasti | rozjařeně | Na zdraví! Na dva dny! | Cheers! To two days! |  |
| `ch2_sazka_volba_vsichni` | Ruda |  | Ať řekne každý nahlas, kolik myslí. | Everyone say out loud what they think. | volba dialogu (kotva znovu) |
| `ch2_sazka_vsichni` | Štamgasti | jeden přes druhého | Dva! Dva a půl! Tři! Dva! | Two! Two and a half! Three! Two! |  |
| `ch2_sazka_volba_ne` | Ruda |  | Tohle počká. | This can wait. | volba dialogu |
| `ch2_sazka_ne` | Štamgasti | pobaveně | Dva dny počká! | Two days it can wait! |  |
| `ch2_tacky_pred_tymem` | Ruda | věcně | Nejdřív tým. Pak odhady. | Team first. Estimates after. | tácky před R2.1 |
| `ch2_tacky_neni_v_tymu` | Ruda | věcně | Není v týmu. Ať odhaduje vlastní práci. | Not on the team. Let them estimate their own work. | tácek mimo tým |
| `ch2_tacky_uz` | Ruda | věcně | Odhad už máme. | We've already got an estimate. |  |
| `ch2_tacky_uz_ma` | Ruda | věcně | Tácek už má. Píše a zakrývá. | Already has a mat. Writing, and covering it up. |  |
| `ch2_kombinace_kreda_tacky` | Ruda | přemýšlivě | Odhad se píše tužkou. Nebo křídou. Hlavně potají. | Estimates are written in pencil. Or chalk. The main thing is in secret. | ★ křída + tácky |
| `ch2_tacky_otocit` | Ruda | slavnostně | Všichni napsali. Otočit… teď! | Everyone's written one. Turn them over... now! | P2.3 |
| `ch2_tacky_cisla` | Ruda | čte | Dvanáct, čtrnáct, patnáct, patnáct, osmnáct. Dvanáct jsem napsal já. | Twelve, fourteen, fifteen, fifteen, eighteen. The twelve was mine. |  |
| `ch2_tacky_ruda_15` | Ruda | rozhodně | Prostřední je patnáct. Patnáct dní na rampu. Napíšu si to na tácek. | The middle one is fifteen. Fifteen days for the ramp. I'll write it on a beer mat. | c2_odhad = realny |
| `ch2_hs_automat` |  |  | Hrací automat | Jukebox | popisek aktivního místa |
| `ch2_automat_prohlednout` | Ruda | suše | Hraje jednu písničku od roku 1994. Možná je to hymna města. | It's been playing one song since 1994. Maybe it's the town anthem. | zkouška Pepy |
| `ch2_hs_viklavy_stul` |  |  | Viklavý stůl | Wobbly table | popisek aktivního místa |
| `ch2_viklavy_prohlednout` | Ruda | suše | Viklá se tak dlouho, že je to tradice. | It's been wobbling so long, it's a tradition. | zkouška Věry a Zdendy |
| `ch2_hs_hasicak` |  |  | Hasicí přístroj | Fire extinguisher | popisek aktivního místa |
| `ch2_hasicak_prohlednout` | Ruda | suše | Červený, prošlý. Nikdo to neví. | Red, and out of date. Nobody knows. | zkouška Norberta |
| `ch2_hs_lavice` |  |  | Lavice u okna | Bench by the window | popisek aktivního místa |
| `ch2_lavice_prohlednout` | Ruda | suše | Nikdo na ní nesedí a nikdo neví proč. | Nobody sits on it and nobody knows why. | zkouška Kláry |
| `ch2_hs_inzerat` |  |  | Inzerát | Advert | popisek aktivního místa |
| `ch2_inzerat_prohlednout` | Ruda | čte | „Daruji kočku. Na všechno připravená. Krmení na rok si platí nový majitel.“ | 'Cat, free to a good home. Ready for anything. New owner pays a year's food.' | stopa R2.3 = krysy |
| `ch2_hs_dvere_hospody` |  |  | Dveře ven | Door out | popisek východu |
| `ch2_dvere_nejdriv_archa` | Ruda | rozhodně | Nejdřív se podívám, co ta Archa vůbec potřebuje. Pak potvrdím tým. | First I'll see what the Ark actually needs. Then I'll confirm the team. | K2: potvrzení až po hangáru |
| `ch2_tym_otazka` | Ruda | slavnostně | Tým: %s, %s, %s a %s. Platí? | The team: %s, %s, %s and %s. Deal? | potvrzení týmu u dveří (R2.1); %s = jména |
| `ch2_tym_volba_plati` | Ruda |  | Platí. | Deal. | volba dialogu |
| `ch2_tym_vyhlaseni` | Ruda | nadšeně | Tohle je můj tým! Teda… náš tým. Jdeme stavět Archu. | This is my team! I mean... our team. Let's go and build an Ark. | R2.1 |
| `ch2_tym_pembok_mezera` | Pembok | suše | Vzal sis tým. Uvidíme, co v něm chybí. Archa to pozná dřív než ty. | You've picked a team. We'll see what's missing. The Ark will notice before you do. | c2_tym_pokryti < 3 |
| `ch2_tym_volba_jeste` | Ruda |  | Ještě si to rozmyslím. | Let me think about it. | volba dialogu |
| `ch2_tym_jeste` | Ruda | váhavě | Ještě se poptám. | I'll ask around a bit more. |  |
| `ch2_tym_volba_ven` | Ruda |  | Teď ne, jdu ven. | Not now, I'm heading out. | volba dialogu |
| `ch2_tym_plno` | Ruda | rozhodně | Čtyři. Víc lidí jen víc porad. | Four. More people just means more meetings. | ★ pátý kandidát |
| `ch2_kandidat_volba_umite` | Ruda |  | Co umíte? | What can you do? | volba dialogu (všichni kandidáti) |
| `ch2_kandidat_volba_zkouska` | Ruda |  | Ukažte, co umíte. | Show me what you can do. | volba dialogu (zkouška) |
| `ch2_kandidat_volba_tym` | Ruda |  | Chcete do týmu? | Want to join the team? | volba dialogu |
| `ch2_kandidat_volba_ne` | Ruda |  | Vlastně vás nepotřebuju. | Actually, I don't need you. | volba dialogu (odvolání z týmu) |
| `ch2_kandidat_konec` | Ruda | úředně | Ozvu se. | I'll be in touch. | konec rozhovoru s kandidátem |
| `ch2_pepa_prohlednout` | Ruda | pobaveně | Pepa sedí u automatu a sleduje ho. Na všechno má odhad: dva dny. | Joe is sitting by the jukebox, watching it. He has one estimate for everything: two days. | K odhad |
| `ch2_pepa_uvod` | Pepa | klidně | Ahoj. Než se zeptáš: dva dny. | Hi. Before you ask: two days. | dialog |
| `ch2_pepa_vse` | Pepa |  | Víc ti řeknu za dva dny. | I'll tell you more in two days. | vyčerpaný dialog |
| `ch2_pepa_umi` | Pepa | klidně | Programuju. Řízení, obrazovky, tlačítka. Opravuju po kouskách. | I program. Controls, screens, buttons. I fix things in small pieces. | síla |
| `ch2_pepa_zkouska_1` | Pepa | klidně | Automat hraje jednu písničku? Dva dny. | The jukebox only plays one song? Two days. | zkouška |
| `ch2_pepa_zkouska_2` | Ruda | užasle | (Pepa ho otevře, vymění jeden drátek, zkusí, vymění další. Za minutu hraje jinou písničku.) | (Joe opens it up, swaps one wire, tries it, swaps another. A minute later it's playing a different song.) | zkouška: po kouskách |
| `ch2_pepa_volba_tema` | Ruda |  | Kolik bude trvat řídicí systém? | How long will the control system take? | volba dialogu |
| `ch2_pepa_tema` | Pepa | klidně | Dva dny. Na jistotu. Ale po kouskách, ať víme, co funguje. | Two days. To be safe. But in small pieces, so we know what works. | síla i vada |
| `ch2_pepa_ano` | Pepa | klidně | Jasně. Nastoupím za dva dny. Teda hned. | Sure. I'll start in two days. I mean now. | přijetí |
| `ch2_pepa_ne` | Pepa | klidně | Dobře. Za dva dny se zeptej znovu. | Fine. Ask me again in two days. | odmítnutí |
| `ch2_tacek_pepa` | Pepa | soustředěně | (píše a zakrývá) Tentokrát poctivě. | (writes and covers it) Honestly, this time. | tácek |
| `ch2_podpis_pepa` | Pepa | klidně | Podepíšu. Za dva dny. (podepíše hned) | I'll sign. In two days. (signs immediately) | formulář (P2.6) |
| `ch2_pepa_kava` | Pepa | klidně | Kafe? Vypiju ho za dva dny. | Coffee? I'll drink it in two days. | ★ káva |
| `ch2_pepa_odhad` | Pepa | zmateně | Patnáct? A co dva dny? Dva dny jsou na jistotu. | Fifteen? What about two days? Two days is the safe bet. | ★ odhad na tácku |
| `ch2_pepa_buchta` | Pepa | klidně | Buchta. Sníst ji? Dva dny. | Cake. To eat it? Two days. | ★ buchta |
| `ch2_vera_prohlednout` | Ruda | uznale | Věra měří hospodu svinovacím metrem. Na stěně má výkres stolu. | Vera is measuring the pub with a tape measure. She's pinned a drawing of a table to the wall. |  |
| `ch2_vera_uvod` | Věra | přísně | Nestoupej mi na metr. | Don't stand on my tape measure. | dialog |
| `ch2_vera_vse` | Věra |  | Všechno je spočítané. Teď razítko. | It's all calculated. Now the stamp. | vyčerpaný dialog |
| `ch2_vera_umi` | Věra | věcně | Statika. Počítám, co vydrží a co spadne. Rampa, trup, cokoli z betonu a plechu. | Structural engineering. I calculate what holds and what falls down. Ramp, hull, anything made of concrete and steel. | síla |
| `ch2_vera_zkouska_1` | Věra | věcně | Viklavý stůl? Podložka čtyři celé dva milimetru. | The wobbly table? A shim of four point two millimetres. | zkouška |
| `ch2_vera_zkouska_2` | Věra | věcně | (podloží, stůl stojí) Hotovo. Kde mi to orazítkujete? | (shims it; the table stands firm) Done. Where do I get this stamped? | zkouška: vada |
| `ch2_vera_volba_tema` | Ruda |  | Proč všechno na razítko? | Why does everything need a stamp? | volba dialogu |
| `ch2_vera_tema` | Věra | věcně | Protože rampa se nedá předělat. Co se nedá předělat, musí být spočítané a podepsané. | Because you can't redo a ramp. What can't be redone has to be calculated and signed off. | stopa R2.2 |
| `ch2_vera_ano` | Věra | rozhodně | Beru. Ale výkres rampy chci vidět ještě dnes. | I'm in. But I want to see the ramp drawings today. | přijetí |
| `ch2_vera_ne` | Věra | chladně | Tak si tu rampu spočítej sám. | Then calculate the ramp yourself. | odmítnutí |
| `ch2_tacek_vera` | Věra | věcně | (píše) Tohle mi někdo orazítkuje, doufám. | (writes) Someone's going to stamp this, I hope. | tácek |
| `ch2_podpis_vera` | Věra | věcně | Podepíšu. Ale chci na podpis razítko. | I'll sign. But I want my signature stamped. | formulář (P2.6) |
| `ch2_norbert_prohlednout` | Ruda | pobaveně | Norbert sedí rovně a čte normu o sezení. | Norman is sitting up straight, reading the standard on sitting. |  |
| `ch2_norbert_uvod` | Norbert | monotónně | Podle normy o pozdravech: dobrý den. | As per the standard on greetings: good day. | dialog |
| `ch2_norbert_vse` | Norbert |  | Všechno je v normě. Ostatní ne. | Everything is up to standard. Everyone else isn't. | vyčerpaný dialog |
| `ch2_norbert_umi` | Norbert | monotónně | Certifikace. Jsem jediný ve městě, kdo smí podepsat, že Archa smí startovat. | Certification. I'm the only one in town who may sign that the Ark may launch. | síla |
| `ch2_norbert_zkouska_1` | Norbert | monotónně | Hasicí přístroj. Revize prošlá v roce 1994. | Fire extinguisher. Inspection expired in 1994. | zkouška |
| `ch2_norbert_zkouska_2` | Norbert | monotónně | Podle normy ho nesmím použít ani na hašení. Víc k tomu neřeknu. | As per the standard, I may not use it, even for fires. I have nothing further to add. | zkouška: vada |
| `ch2_norbert_volba_tema` | Ruda |  | Co bezpečnostní systém? | What about the safety system? | volba dialogu |
| `ch2_norbert_tema` | Norbert | monotónně | Bezpečnostní systém se mění jen s novým podpisem. Podpis trvá tři týdny. | The safety system only changes with a new signature. A signature takes three weeks. | stopa R2.2 (výjimka) |
| `ch2_norbert_ano` | Norbert | monotónně | Podle normy o souhlasu: souhlasím. | As per the standard on consent: I consent. | přijetí |
| `ch2_norbert_ne` | Norbert | monotónně | Odmítnutí beru na vědomí. Podle normy. | Rejection noted. As per the standard. | odmítnutí |
| `ch2_tacek_norbert` | Norbert | monotónně | Podle normy o odhadech píšu číslo arabskými číslicemi. | As per the standard on estimates, I am writing the number in Arabic numerals. | tácek |
| `ch2_podpis_norbert` | Norbert | monotónně | Podle normy o podpisech podepisuji modrou. (podepíše) | As per the standard on signatures, I sign in blue. (signs) | formulář (P2.6) |
| `ch2_norbert_kava` | Norbert | monotónně | Norma o tekutinách nedovoluje kávu u dokumentů. | The standard on liquids does not permit coffee near documents. | ★ káva |
| `ch2_norbert_pero` | Norbert | monotónně | Kávové pero normu nesplňuje. Ale je to zajímavá odchylka. | A coffee pen does not meet the standard. But it is an interesting deviation. | ★ kávové pero |
| `ch2_klara_prohlednout` | Ruda | pobaveně | Klára lepí z tácků kajutu. Třetí verzi. Zatím se nerozhodla. | Mona is gluing beer mats into a cabin. Version three. She hasn't decided yet. |  |
| `ch2_klara_uvod` | Klára | nadšeně | Ahoj! Lepím kajutu. Nebo dvě. Ještě nevím. | Hi! I'm gluing a cabin. Or two. I don't know yet. | dialog |
| `ch2_klara_vse` | Klára |  | Víc nevím, dokud to někdo nezkusí. | I won't know any more until someone tries it. | vyčerpaný dialog |
| `ch2_klara_umi` | Klára | nadšeně | Interiéry. Stavím makety a ptám se lidí, jak chtějí bydlet. | Interiors. I build mock-ups and ask people how they want to live. | síla |
| `ch2_klara_zkouska_1` | Klára | zvědavě | Lavice u okna? Nikdo na ní nesedí. Zeptám se. | The bench by the window? Nobody sits on it. I'll ask. | zkouška |
| `ch2_klara_zkouska_2` | Klára | nejistě | (obejde štamgasty, každého zvlášť) Táhne tam. Postavím maketu závěsu z tácků. Nebo dvou závěsů? | (goes round the regulars, one at a time) It's draughty. I'll build a mock-up of a curtain out of beer mats. Or two curtains? | zkouška: ptá se každého zvlášť (stopa P2.3), vada |
| `ch2_klara_volba_tema` | Ruda |  | Jak budou vypadat kajuty? | What will the cabins look like? | volba dialogu |
| `ch2_klara_tema` | Klára | vážně | Nikdo neví, jak chce spát, dokud si nelehne. Takže maketa a lehnout. | Nobody knows how they want to sleep until they lie down. So: mock-up, then lie down. | stopa R2.2 (výjimka) |
| `ch2_klara_ano` | Klára | nejistě | Ano! Teda… ano. Myslím, že ano. | Yes! I mean... yes. I think so, yes. | přijetí |
| `ch2_klara_ne` | Klára | zklamaně | Dobře. Asi. Postavím si maketu jiného týmu. | Okay. Probably. I'll build a mock-up of a different team. | odmítnutí |
| `ch2_tacek_klara` | Klára | nejistě | Napíšu číslo. Ale nejdřív bych se zeptala ostatních. Ne, nezeptám. Píšu. | I'll write a number. But first I'd ask the others. No, I won't. Writing. | tácek |
| `ch2_podpis_klara` | Klára | nejistě | Podepíšu. Možná. Ano. Podepíšu. | I'll sign. Maybe. Yes. I'll sign. | formulář (P2.6) |
| `ch2_zdenda_prohlednout` | Ruda | pobaveně | Zdenda. Zdraví všechny jménem, i automat. | Benny. Greets everyone by name, including the jukebox. |  |
| `ch2_zdenda_uvod` | Zdenda | nadšeně | Rudo! Kamaráde! Znáš mě? Já tě znám! | Rudy! Mate! Do you know me? I know you! | dialog |
| `ch2_zdenda_vse` | Zdenda |  | Víc nevím. Ale znám chlapa, co ví. | That's all I know. But I know a guy who knows. | vyčerpaný dialog |
| `ch2_zdenda_umi` | Zdenda | nadšeně | Já? Znám lidi. Všechny. Teda chlapy, co je znají. | Me? I know people. Everyone. Well, guys who know them. | vada |
| `ch2_zdenda_zkouska_1` | Zdenda | nadšeně | Viklavý stůl? Znám chlapa, co zná truhláře. | The wobbly table? I know a guy who knows a carpenter. | zkouška |
| `ch2_zdenda_zkouska_2` | Ruda | suše | (Stůl se viklá dál.) | (The table keeps wobbling.) | zkouška: nic |
| `ch2_zdenda_volba_tema` | Ruda |  | Kdo ve městě umí s jeřábem? | Who in town can drive a crane? | volba dialogu |
| `ch2_zdenda_tema` | Zdenda | důležitě | Průkaz na jeřáb má v tomhle městě jeden člověk. Hlídá dveře radnice. | Only one man in this town has a crane licence. He guards the town hall door. | stopa ke konci (K15) |
| `ch2_zdenda_ano` | Zdenda | nadšeně | Jasně! Spolu to dáme. Znám chlapa, co umí stavět lodě. | Sure! We'll do it together. I know a guy who builds ships. | přijetí |
| `ch2_zdenda_ne` | Zdenda | nadšeně | V pohodě. Znám chlapa, co mě vezme. | No worries. I know a guy who'll take me. | odmítnutí |
| `ch2_tacek_zdenda` | Zdenda | soustředěně | (píše) „Zeptám se chlapa.“ | (writes) 'I'll ask a guy.' | tácek (K3) |
| `ch2_podpis_zdenda` | Zdenda | nadšeně | Podepíšu. Znám chlapa, co podepisuje líp, ale dobře. | I'll sign. I know a guy who signs better, but fine. | formulář (P2.6) |
| `ch2_zdenda_kava` | Zdenda | nadšeně | Kafe! Znám chlapa, co má kafe. Teda ty jsi ten chlap. | Coffee! I know a guy who's got coffee. Wait, you're the guy. | ★ káva |
| `ch2_zdenda_obalka` | Zdenda | nadšeně | Obálka? Znám chlapa, co by věděl, co s ní. | An envelope? I know a guy who'd know what to do with it. | ★ obálka |
| `ch2_zdenda_buchta` | Zdenda | nadšeně | Od babičky? Znám ji! Teda znám chlapa, co ji zná. | From Granny? I know her! Well, I know a guy who knows her. | ★ buchta |
| `ch2_krystof_prohlednout` | Ruda | pobaveně | Kryštof rozdává lepicí lístky. Na každém je napsáno „porada“. | Chip is handing out sticky notes. Every one of them says 'meeting'. |  |
| `ch2_krystof_uvod` | Kryštof | nadšeně | Dobrý den! Lepicí lístek? Je na něm porada. | Hello! Sticky note? There's a meeting on it. | dialog |
| `ch2_krystof_vse` | Kryštof |  | Navrhuju poradu o tom, o čem ještě nemluvit. | I propose a meeting about what not to discuss yet. | vyčerpaný dialog |
| `ch2_krystof_umi` | Kryštof | nadšeně | Rituály! Porady, nástěnky, krabice. Pracuju pro Ing. Frameworka. | Rituals! Meetings, boards, boxes. I work for Dr. Framework. | vada |
| `ch2_krystof_zkouska_1` | Kryštof | nadšeně | Svolám poradu u výčepu. | I'll call a meeting at the bar. | zkouška |
| `ch2_krystof_zkouska_2` | Kryštof | nadšeně | (u výčepu) Tak, dneska se domluvíme, kdy bude porada. | (at the bar) Right, today we'll agree when to have the meeting. | zkouška: porada o poradě |
| `ch2_krystof_volba_tema` | Ruda |  | Vy jste od Frameworka? | You're one of Framework's people? | volba dialogu |
| `ch2_krystof_tema` | Kryštof | nadšeně | Dva v jednom! On krabici, já lístky. Na všechno. | Two in one! He does the box, I do the sticky notes. For everything. |  |
| `ch2_krystof_ano` | Kryštof | nadšeně | Hurá! Svolám poradu o nástupu. | Hooray! I'll call a meeting about onboarding. | přijetí |
| `ch2_krystof_ne` | Kryštof | nadšeně | Zapíšu si to na lístek. „Odmítnut.“ Lepí to dobře. | I'll put it on a sticky note. 'Rejected.' It sticks well. | odmítnutí |
| `ch2_tacek_krystof` | Kryštof | soustředěně | (píše) „Po poradě.“ | (writes) 'After the meeting.' | tácek (K3) |
| `ch2_podpis_krystof` | Kryštof | nadšeně | Podepíšu! Mám podepsat i lístek, že jsem podepsal? | I'll sign! Should I also sign a note saying I signed? | formulář (P2.6) |
| `ch2_krystof_pero` | Kryštof | nadšeně | Kávové pero! Krabice „Psací potřeby 2.0“ ho ještě nemá. | A coffee pen! The 'Stationery 2.0' box doesn't have one of those yet. | ★ kávové pero |

## Mlžná pláň a M06

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `ch2_plan_prichod` | Ruda | nejistě | Mlžná pláň. Kus trávy, rozcestník a dál jen mlha. | The Misty Plain. A patch of grass, a signpost, and beyond that, nothing but fog. | jen při prvním příchodu |
| `ch2_hs_mlha` |  |  | Mlha | Fog | popisek aktivního místa |
| `ch2_mlha_prohlednout` | Ruda | suše | Mapa je hotová. Je bílá. | The map's finished. It's white. |  |
| `ch2_hs_rozcestnik` |  |  | Rozcestník | Signpost | popisek aktivního místa |
| `ch2_rozcestnik_prohlednout` | Ruda | pobaveně | Rozcestník bez šipek. Jediná cedule: „Sem“. | A signpost with no arrows. The only sign says: 'Here'. | gag |
| `ch2_hs_kamen` |  |  | Velký kámen | Big flat stone | popisek aktivního místa |
| `ch2_kamen_prohlednout` | Ruda | přemýšlivě | Velký plochý kámen. Dá se na něm rozložit mapa. | A big flat stone. You could spread a map out on it. | stopa P2.7 |
| `ch2_kamen_hotovo` | Ruda | rozhodně | Mapa je nakreslená. Teď s ní ke Komisi. | The map is drawn. Now to take it to the Committee. | po M06 |
| `ch2_mapa_chybi_rozdeleni` | Pembok | poučně | Nejdřív rozděl Archu na tabuli. Jinak nevíš, co patří na cestu a co do řeky. | Divide up the Ark on the board first. Otherwise you won't know what goes on the road and what goes in the river. | chybí R2.2 |
| `ch2_mapa_chybi_krabice` | Pembok | poučně | Nejdřív víme, co se může pokazit, pak kudy půjdeme. Krabice od bot čeká. | First we find out what could go wrong, then which way we go. The shoebox is waiting. | chybí M07 |
| `ch2_mapa_chybi_odhad` | Pembok | poučně | A jak dlouhá je rampa? Bez odhadu nakreslíš silnici do nekonečna. | And how long does the ramp take? Without an estimate you'll draw a road to infinity. | chybí odhad (P2.3) |
| `ch2_bara_mapa_vysvetli` | Bára | věcně | Ty kreslíš cestu, já řeku. Cestu vidíš daleko, řeku jen kousek. U mostů se musíme potkat. | You draw the road, I draw the river. You can see the road a long way ahead, the river only a little. We have to meet at the bridges. | c1_bara_vyslechnuta ≥ 2: vysvětlí M06 |
| `ch2_bara_mapa_mlci` | Ruda | nejistě | Bára stojí u kamene s tužkou a čeká. | Barb is standing by the stone with a pencil, waiting. | c1_bara_vyslechnuta < 2 |
| `ch2_bara_plan_prohlednout` | Ruda | uznale | Bára čeká s tužkou. Kreslí jen to, co vidí. | Barb is waiting with a pencil. She only draws what she can see. |  |
| `ch2_bara_plan_mluvit` | Bára | věcně | Mapa je na kameni. | The map's on the stone. |  |
| `ch2_m06_nazev` |  |  | Mapa do neznáma | Map into the Unknown | nadpis minihry M06 |
| `ch2_m06_navod` |  |  | Nahoře cesta, dole řeka, mezi nimi tři mosty. Most drží, když má cesta v jeho sloupci přesný bod a řeka tam dorazí. Cesta je v mlze vidět daleko, řeka jen kousek. | Road on top, river below, three bridges in between. A bridge holds when the road has a fixed point in its column and the river reaches it. In the fog you can see the road a long way, the river only a little. | návod M06 |
| `ch2_m06_most_trup` |  |  | Most „Trup se zavírá“ | Bridge: 'Hull closes up' | most M06 |
| `ch2_m06_most_nastup` |  |  | Most „Zkouška nástupu na rampě“ | Bridge: 'Boarding trial on the ramp' | most M06 |
| `ch2_m06_most_start` |  |  | Most „Start“ | Bridge: 'Launch' | most M06 |
| `ch2_m06_reka_zadna` |  |  | (řeka tu není) | (there's no river here) | M06 při R2.2 = gantt |
| `ch2_m06_cesta_trup` |  |  | Uzavření trupu, zbývá 19 | Hull closed up, 19 left | dlaždice cesty, přesná |
| `ch2_m06_cesta_trup_mlhava` |  |  | Někdy se zavře trup | The hull closes up at some point | dlaždice cesty, mlhavá |
| `ch2_m06_reka_rizeni_podrobna` |  |  | Řídicí systém: všech 214 tlačítek | Control system: all 214 buttons | dlaždice řeky, podrobná |
| `ch2_m06_reka_rizeni_hruba` |  |  | Něco, co řídí motory | Something that steers the engines | dlaždice řeky, hrubá |
| `ch2_m06_cesta_rampa` |  |  | Rampa hotová, zbývá 10 | Ramp finished, 10 left | dlaždice cesty, přesná |
| `ch2_m06_cesta_rampa_mlhava` |  |  | Rampa bude | There'll be a ramp | dlaždice cesty, mlhavá |
| `ch2_m06_reka_nastup_podrobna` |  |  | Nástup: přesná trasa pro každou rodinu | Boarding: an exact route for every family | dlaždice řeky, podrobná |
| `ch2_m06_reka_nastup_hruba` |  |  | Něco s nástupem | Something about boarding | dlaždice řeky, hrubá |
| `ch2_m06_cesta_podpis` |  |  | Podpis bezpečnostního systému, zbývá 4 | Safety system signed off, 4 left | dlaždice cesty, přesná |
| `ch2_m06_cesta_podpis_mlhava` |  |  | Nějaký podpis | Some kind of signature | dlaždice cesty, mlhavá |
| `ch2_m06_reka_aplikace_podrobna` |  |  | Aplikace: všechny obrazovky | App: every screen | dlaždice řeky, podrobná |
| `ch2_m06_reka_aplikace_hruba` |  |  | Něco, co lidi pustí na palubu | Something that lets people on board | dlaždice řeky, hrubá |
| `ch2_m06_rampa_kotva` |  |  | Rampa: „dva dny“. Na mapě má jeden sloupec. | Ramp: 'two days'. One column on the map. | M06, c2_odhad = kotva |
| `ch2_m06_rampa_realna` |  |  | Rampa: patnáct dní. Na mapě pět sloupců. | Ramp: fifteen days. Five columns on the map. | M06, c2_odhad = realny |
| `ch2_m06_chyba_cesta` | Ruda | zamračeně | Most nemá na cestě pevný bod. „Někdy“ se k mostu přivázat nedá. | The bridge has no fixed point on the road. You can't tie a bridge to 'at some point'. | M06: mlhavá cesta u mostu |
| `ch2_m06_chyba_podrobna` | Bára | věcně | Tohle jsme nakreslili do mlhy podrobně. Mlha se přeskupila a dlaždice se rozplynula. | We drew this one in detail, into the fog. The fog shifted and the tile dissolved. | M06: podrobná řeka v mlze |
| `ch2_m06_chyba_reka` | Ruda | zamračeně | Řeka k mostu nedotekla. | The river didn't reach the bridge. | M06: bez řeky u mostu |
| `ch2_m06_bara_rada` | Bára | věcně | Řeku dál než kousek nekresli. U mostů nám stačí, že tam dorazíme. | Don't draw the river more than a little way ahead. At the bridges, all we need is to get there. | c1_bara_vyslechnuta ≥ 2 |
| `ch2_m06_kotva` | Ruda | zaskočeně | Dva dny… a ještě třináct. Rampa se natáhla, ale o sloupec později. Most u nástupu nemá kde stát. | Two days... plus another thirteen. The ramp stretched out, but one column late. The boarding bridge has nowhere to stand. | K5: kotva |
| `ch2_m06_bezpecnost_reka` | Ruda | zamračeně | Bezpečnostní systém je v řece. Bez výkresu nestihne podpis. Start visí ve vzduchu. | The safety system's in the river. Without a drawing it won't get signed off in time. The launch is hanging in mid-air. | výjimka: bezpečnost u Báry |
| `ch2_m06_interier_cesta` | Ruda | otráveně | Interiér na cestě se po každém kroku mlhy překresluje. Kajuty mění tvar. | The interior on the road gets redrawn every time the fog moves. The cabins keep changing shape. | výjimka: interiér u Rudy |
| `ch2_m06_gantt` | Ruda | zmateně | Software kreslím jako silnici do mlhy. Rozplývá se. Řeka chybí, mosty nemají kam vést. | I'm drawing the software as a road into the fog. It keeps dissolving. There's no river, so the bridges have nowhere to go. | R2.2 = gantt |
| `ch2_m06_krabice` | Framework | samolibě | V krabici nejsou pevné body. Jen další krabice. | There are no fixed points in the box. Just more boxes. | R2.2 = krabice |
| `ch2_m06_hotovo` | Bára | uznale | Cesta a řeka se potkávají. Tohle je plán, kterému věřím. | The road and the river meet. This is a plan I believe in. | M06 ≥ 2 mosty |
| `ch2_m06_hotovo_slabe` | Pembok | suše | Plán je nakreslený. Mostů je v něm málo. Komise si toho nevšimne. Kometa ano. | The plan is drawn. It's short on bridges. The Committee won't notice. The comet will. | M06 < 2 mosty |
| `ch2_m06_preskocit` | Pembok | suše | Nakreslím rovnou čáru. Od dneška ke startu. Rovné čáry se líbí každému. | I'll draw a straight line. From today to the launch. Everybody loves a straight line. | přeskočení M06, c2_mosty = start |

## Kancelář Komise

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `ch2_komise_prichod` | Ruda | uznale | Kancelář Komise. Dnes jen fronta, bez fronty na frontu. Pokrok. | The Committee office. Today just a queue, no queue for the queue. Progress. | jen při prvním příchodu |
| `ch2_fronta_prohlednout` | Ruda | suše | Dnes jen fronta, bez fronty na frontu. Komise to vede jako úspěch. | Just a queue today, no queue for the queue. The Committee has filed it as a success. | gag |
| `ch2_razitko_kava` | Ruda | provinile | Razítková poduška, hnědě zaschlá od mé kávy. | The ink pad, dried brown with my coffee. | c1_razitko = kava |
| `ch2_razitko_poduska` | Ruda | spokojeně | Babiččina poduška. Modrá. Razítko konečně razítkuje. | Granny's ink pad. Blue. The stamp finally stamps. | c1_razitko = poduska |
| `ch2_telefon_prohlednout` | Ruda | dotčeně | Telefon mlčí. Dneska nikoho nezajímám. | The phone's silent. Nobody's interested in me today. | zvoní jen v kap. 1 |
| `ch2_vytah_dolu` | Ruda | suše | Dolů. Půl patra jde vždycky. | Down. Half a floor always works. | střih: Komise → náměstí |
| `ch2_predseda_komise_prohlednout` | Ruda | podezíravě | Předseda Věčný. Vlídný jako vždy. To je na tom nejhorší. | Chairman Evermore. Kind as ever. That's the worst part. |  |
| `ch2_predseda_komise_uvod` | Předseda | vlídně | Vítám. Vítám. Co nesete? | Welcome. Welcome. What have you brought me? | dialog s plánem |
| `ch2_predseda_komise_bez_planu` | Předseda | vlídně | Vítám. Ale co mám orazítkovat? Vaše nadšení? | Welcome. But what am I supposed to stamp? Your enthusiasm? | bez plánu |
| `ch2_predseda_volba_plan` | Ruda |  | Nesu plán cesty ke startu. | I've brought the route to launch. | volba dialogu |
| `ch2_predseda_volba_faze` | Ruda |  | Žádná fáze 2 nebude! | There won't be any phase two! | volba dialogu (c1_faze2) |
| `ch2_predseda_faze_odmitnout` | Předseda | vlídně | Máte to podepsané. „…a následné fáze.“ | You signed for it. '...and subsequent phases.' | P2.8 |
| `ch2_predseda_papir_nazor` | Předseda | vlídně | Já mám papír, vy máte názor. Přineste papír. | I have paperwork, you have an opinion. Bring me paperwork. | stopa P2.8 |
| `ch2_predseda_volba_mosty` | Ruda |  | Všimněte si těch mostů. | Note the bridges. | volba dialogu |
| `ch2_predseda_mosty` | Předseda | vlídně | Mosty se u nás staví v páté fázi. Ale budiž. | Around here, bridges get built in phase five. But very well. |  |
| `ch2_predseda_konec` | Předseda | vlídně | Vítám. A sbohem. | Welcome. And goodbye. |  |
| `ch2_predseda_formular_prijat` | Předseda | vlídně | Tři podpisy. Hnědá je tímto uznána. Prozatím. | Three signatures. Brown is hereby recognised. For now. | P2.6 odevzdán |
| `ch2_predseda_formular_chybi` | Předseda | vlídně | A formulář k té hnědé barvě? Bez tří podpisů nemůžu nic orazítkovat. | And the form for the colour brown? Without three signatures I can't stamp anything. | P2.6 chybí |
| `ch2_predseda_faze_1` | Předseda | vlídně | Výborně. A tady za start připíšu „fázi 2“. Máte to podepsané: …a následné fáze. | Excellent. And here, after the launch, I'll add 'phase two'. You signed for it: ...and subsequent phases. | c1_faze2 (P2.8) |
| `ch2_predseda_faze_ruda` | Ruda | rozčileně | Po startu přece následuje kometa! | After the launch comes the comet! |  |
| `ch2_predseda_faze_2` | Předseda | vlídně | Já mám papír, vy máte názor. | I have paperwork, you have an opinion. |  |
| `ch2_predseda_list_1` | Ruda | rozhodně | Tady. Poslední list kalendáře. Den dopadu. | Here. The last page of the calendar. Impact Day. | list na Předsedu (P2.8) |
| `ch2_predseda_list_ruda` | Ruda | věcně | Vaše fáze 2 by začala den po dopadu komety. | Your phase two would start the day after the comet hits. |  |
| `ch2_predseda_list_2` | Předseda | vlídně, ale ostražitě | To by byla krátká fáze. (píše) „Fáze 2: pozastavena.“ | That would be a short phase. (writes) 'Phase two: suspended.' | faze_pozastavena |
| `ch2_predseda_list_ne` | Předseda | vlídně | Kalendář? Hezký. Ale o fázích teď nemluvíme. | A calendar? Lovely. But we're not discussing phases right now. | ★ list bez fáze 2 |
| `ch2_predseda_razitko` | Předseda | vlídně | Vítám. Vítám. (bum) Orazítkováno. | Welcome. Welcome. (thump) Stamped. | konec kapitoly, krok 1 |
| `ch2_predseda_kopie` | Ruda | samolibě | Obálka byla na úsměv. Kopie všeho, co jste podepsal, jsou zdarma. Děkuji. | The envelope was for the smile. A copy of everything you've signed, free of charge. Thank you. | c2_riziko_predem = usmev (D81) |

## Nápovědy Prof. Pemboka

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `ch2_rada_slon_1` | Pembok | nápověda | Slon je moc velký na jedno sousto. | The elephant's too big for one bite. | P2.1, 1. stupeň |
| `ch2_rada_slon_2` | Pembok | nápověda | Praská tam, kde má čáru. Čím se dělají čáry na tabuli? | He cracks where there's a line. What do you draw lines on a board with? | P2.1, 2. stupeň |
| `ch2_rada_slon_3` | Pembok | nápověda | Vezmi křídu z tabule v hospodě a rozkresli ho. | Take the chalk from the board in the pub and draw him into pieces. | P2.1, 3. stupeň |
| `ch2_rada_tym_1` | Pembok | nápověda | Archa potřebuje lidi, kteří něco umějí. Kamarádi počkají na oslavu. | The Ark needs people who can do things. Friends can wait for the party. | P2.2, 1. stupeň |
| `ch2_rada_tym_2` | Pembok | nápověda | Kdo postaví rampu, kdo naprogramuje řízení a kdo podepíše, že smíme startovat? | Who'll build the ramp, who'll program the controls, and who'll sign to say we may launch? | P2.2, 2. stupeň |
| `ch2_rada_tym_3` | Pembok | nápověda | Statička, programátor nebo designérka a certifikátor. Potvrď tým u dveří hospody, až uvidíš Archu. | The engineer, the programmer or the designer, and the certifier. Confirm the team at the pub door once you've seen the Ark. | P2.2, 3. stupeň (K2) |
| `ch2_rada_formular_1` | Pembok | nápověda | Formulář od Předsedy pořád čeká. | The Chairman's form is still waiting. | P2.6, 1. stupeň |
| `ch2_rada_formular_2` | Pembok | nápověda | Tři podpisy. Máš tým. | Three signatures. You've got a team. | P2.6, 2. stupeň |
| `ch2_rada_formular_3` | Pembok | nápověda | Dej formulář podepsat třem lidem z týmu. | Get three people from the team to sign the form. | P2.6, 3. stupeň |
| `ch2_rada_odhad_1` | Pembok | nápověda | Všichni tu odhadujou totéž. Zajímavé, že? | Everyone here estimates the same number. Interesting, isn't it? | P2.3, 1. stupeň |
| `ch2_rada_odhad_2` | Pembok | nápověda | Když první řekne dva dny, ostatní už jen přikyvují. Co kdyby nikdo neslyšel ostatní? | Once the first one says two days, the rest just nod along. What if nobody could hear the others? | P2.3, 2. stupeň |
| `ch2_rada_odhad_3` | Pembok | nápověda | Dej tácek každému z týmu, ať napíše odhad potají. | Give everyone on the team a beer mat and have them write their estimate in secret. | P2.3, 3. stupeň |
| `ch2_rada_krabice_1` | Pembok | nápověda | V kokpitu Archy leží krabice na věci, které se můžou pokazit. Třicet let prázdná. | In the Ark's cockpit there's a box for things that could go wrong. Empty for thirty years. | P2.5, 1. stupeň |
| `ch2_rada_krabice_2` | Pembok | nápověda | Choď s ní po městě a dívej se, co vypadá podezřele: kabely, lano, úsměvy. | Carry it around town and look for anything suspicious: cables, the crane cable, smiles. | P2.5, 2. stupeň |
| `ch2_rada_krabice_3` | Pembok | nápověda | Máš dost lístků. Otevři krabici u stolu v hangáru a rozhodni, na co dáš obálku. | You've got enough notes. Open the box at the table in the hangar and decide what the envelope goes on. | P2.5, 3. stupeň |
| `ch2_rada_tabule_1` | Pembok | nápověda | Osm částí, jeden sloupec. Opravdu se všechno staví stejně? | Eight parts, one column. Is everything really built the same way? | P2.4, 1. stupeň |
| `ch2_rada_tabule_2` | Pembok | nápověda | Na co máme výkres a co se nesmí měnit? A na co se musíme nejdřív zeptat lidí? | What do we have drawings for, and what mustn't change? And what do we have to ask people about first? | P2.4, 2. stupeň |
| `ch2_rada_tabule_3` | Pembok | nápověda | Řídicí systém, aplikaci, nástup a kajuty dej Báře. Bezpečnostní systém má výkres a podpis, ten zůstane Rudovi. | Give the control system, the app, boarding and the cabins to Barb. The safety system has a drawing and a signature, so it stays with Rudy. | P2.4, 3. stupeň (obě výjimky) |
| `ch2_rada_mapa_1` | Pembok | nápověda | Za zadními vraty hangáru je Mlžná pláň. Tam se kreslí plán cesty. | Behind the hangar's back gate is the Misty Plain. That's where you draw the route. | P2.7, 1. stupeň |
| `ch2_rada_mapa_2` | Pembok | nápověda | Cestu plánuj dopředu, řeku jen kousek. Hlavně ať se potkají u mostů. | Plan the road well ahead, the river only a little. Above all, make them meet at the bridges. | P2.7, 2. stupeň |
| `ch2_rada_mapa_3` | Pembok | nápověda | U každého mostu přesný bod na cestě a hrubá dlaždice na řece. Podrobnosti do mlhy nekresli. | At every bridge, a fixed point on the road and a rough tile on the river. Don't draw details into the fog. | P2.7, 3. stupeň |
| `ch2_rada_faze_1` | Pembok | nápověda | Předseda věří jen papírům. | The Chairman only believes paperwork. | P2.8, 1. stupeň |
| `ch2_rada_faze_2` | Pembok | nápověda | Kdy by ta fáze 2 začala? Kalendář v hangáru to ví. | When would that phase two start? The calendar in the hangar knows. | P2.8, 2. stupeň |
| `ch2_rada_faze_3` | Pembok | nápověda | Utrhni v hangáru poslední list kalendáře a ukaž mu ho. | Tear the last page off the calendar in the hangar and show it to him. | P2.8, 3. stupeň |
| `ch2_rada_komise` | Pembok | nápověda | Plán máš. Teď razítko. Komise je za dveřmi radnice. | You've got the plan. Now the stamp. The Committee is through the town hall door. | plán hotový |

## Předměty a kombinace

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `ch2_kava_prohlednout` | Ruda | láskyplně | Pořád teplá. Jediná věc v mém životě, která drží teplotu. | Still warm. The only thing in my life that holds its temperature. | káva, nový popis v kap. 2 |
| `ch2_klic_prohlednout` | Ruda | spokojeně | Klíč od hangáru. Konečně něco, co odemyká, a ne zamyká. | The hangar key. Finally, something that unlocks instead of locking. | klíč, nový popis v kap. 2 |
| `predmet_kreda` |  |  | Křída | Chalk | název předmětu |
| `predmet_kreda_prohlednout` | Ruda | přemýšlivě | Křída z hospody. Psalo se s ní „dva dny“. Snad s ní půjde napsat i něco pravdivého. | Chalk from the pub. It's been used to write 'two days'. Maybe it can write something true as well. |  |
| `predmet_tacky` |  |  | Tácky | Beer mats | název předmětu |
| `predmet_tacky_prohlednout` | Ruda | přemýšlivě | Pivní tácky. Dá se na ně psát. A dají se otočit. | Beer mats. You can write on them. And you can turn them over. | stopa P2.3 |
| `predmet_odhad` |  |  | Odhad na tácku | Estimate on a beer mat | název předmětu |
| `predmet_odhad_kotva` | Ruda | nejistě | Na tácku stojí „2“. Dva dny. Zní to krásně. Moc krásně. | The beer mat says '2'. Two days. Sounds lovely. Too lovely. | c2_odhad = kotva |
| `predmet_odhad_realny` | Ruda | spokojeně | Na tácku stojí „15“. Patnáct dní na rampu. Odhadli to ti, co ji budou stavět. | The beer mat says '15'. Fifteen days for the ramp. Estimated by the people who'll build it. | c2_odhad = realny |
| `predmet_krabice` |  |  | Krabice od bot | Shoebox | název předmětu |
| `predmet_krabice_prohlednout` | Ruda | věcně | Na víku „Co se může pokazit“. Uvnitř třicet let nic. Teď moje lístky. | On the lid: 'What could go wrong'. Thirty years of nothing inside. Now, my notes. |  |
| `predmet_obalka` |  |  | Obálka „Na nepředvídané“ | 'For the unforeseen' envelope | název předmětu |
| `predmet_obalka_prohlednout` | Ruda | suše | Peníze na jednu nepředvídanou věc. Jednu. Nepředvídané věci chodí po stádech. | Money for one unforeseen thing. One. Unforeseen things travel in herds. |  |
| `predmet_formular` |  |  | Formulář | Form | název předmětu |
| `predmet_formular_prohlednout` | Ruda | čte | „Žádost o uznání hnědé barvy razítka.“ Tři řádky na podpisy zaměstnanců projektu. | 'Application for recognition of brown as a stamp colour.' Three lines for project employees' signatures. | P2.6 |
| `predmet_formular_podepsany` | Ruda | spokojeně | Tři podpisy. Hnědá barva bude uznána. Snad. | Three signatures. Brown will be recognised. Hopefully. | P2.6 |
| `predmet_list` |  |  | List „Den dopadu“ | 'Impact Day' page | název předmětu |
| `predmet_list_prohlednout` | Ruda | zasmušile | Poslední list z kalendáře. Den dopadu. Po něm už žádné listy nejsou. | The last page of the calendar. Impact Day. There are no pages after it. | P2.8 |
| `predmet_plan` |  |  | Plán cesty ke startu | Route to launch | název předmětu |
| `predmet_plan_prohlednout` | Ruda | zamyšleně | Cesta, řeka a mosty mezi nimi. Poprvé mám plán, který počítá s tím, že něco nevím. | A road, a river and bridges between them. For the first time I have a plan that allows for things I don't know. |  |
| `predmet_buchta` |  |  | Buchta | Cake | název předmětu |
| `predmet_buchta_prohlednout` | Ruda | láskyplně | Babiččina buchta. Jediná věc v okolí, která je dopečená. | Granny's cake. The only thing around here that's properly finished. |  |
| `ch2_buchta_snist` | Ruda | spokojeně | Mňam. Tohle je hotový projekt. S tvarohem. | Mmm. Now that's a finished project. With cream cheese. | sníst buchtu (★ kdekoli) |
| `predmet_kopie` |  |  | Kopie Předsedových podpisů | Copies of the Chairman's signatures | název předmětu (D81) |
| `ch2_kopie_prohlednout` | Ruda | podezíravě | Všechno, co Předseda podepsal. S úsměvem. Kopie se neusmívají. | Everything the Chairman has signed. With a smile. The copies aren't smiling. | D81, kap. 4 |
| `ch2_kombinace_obalka_pembok` | Pembok | dotčeně | Do mě ji nedávej. Já jsem kniha, ne trezor. | Don't put it in me. I'm a book, not a safe. | ★ obálka + Pembok |
| `ch2_kombinace_odhad_plan` | Ruda | spokojeně | Odhad už je v plánu. Tácek si nechám na památku. | The estimate's already in the plan. I'll keep the beer mat as a souvenir. | ★ odhad + plán |

## Konec kapitoly

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `ch2_konec_beton` | Ruda | nervózně | Staveniště. Domíchaný beton čeká. Jeřáb stojí. | The building site. The concrete's mixed and waiting. The crane isn't moving. | konec, krok 2 |
| `ch2_konec_kdo_jerab` | Ruda | nahlas | Kdo umí s jeřábem? | Who can drive the crane? |  |
| `ch2_konec_ticho` | Ruda | tiše | … Ticho. | ...Silence. |  |
| `ch2_konec_vratny_stopa` | Vrátný | ospale | Prý jste se chtěl zeptat. To je víc, než kolik jsem slyšel za třicet let. | I hear you were going to ask. That's more than I've heard in thirty years. | konec, krok 3 (se stopou, K15) |
| `ch2_konec_vratny` | Vrátný | ospale | Nikdo se nikdy nezeptal. Tak jsem přišel sám. | Nobody ever asked. So I came on my own. | konec, krok 3 (návrat k ch1_vratny_jerab_2) |
| `ch2_konec_lano_nove` | Vrátný | spokojeně | Nové lano. Konečně. Voní. | A new cable. At last. It smells nice. | c2_riziko_predem = lano |
| `ch2_konec_lano_drzi` | Vrátný | ospale | Lano? Drží. Zatím. | The cable? It's holding. For now. | prasklé lano (K18, předzvěst M13) |
| `ch2_konec_beton_tece` | Ruda | užasle | Vrátný v čepici jeřábníka zvedne kbel. První beton teče na rampu. | The porter, in a crane operator's cap, lifts the bucket. The first concrete pours onto the ramp. | konec, krok 4 |
| `ch2_konec_ruda_faze1` | Ruda | hrdě | Fáze 1 začala. | Phase one has begun. |  |
| `ch2_konec_bara_25` | Bára | tiše | Zbývá dvacet pět. … Uvidíme. | Twenty-five left. ...We'll see. | zárodek, ne slib (D60, K9) |
| `ch2_pamet_nadpis` |  |  | Co si Nedostavěnice zapamatovala | What Scope Creek Remembers | obrazovka následků, konec kap. 2 |
| `ch2_pamet_tym_3` |  |  | Tým umí stavět, zkoušet i podepsat start. | The team can build, test, and sign off the launch. | c2_tym_pokryti = 3 |
| `ch2_pamet_tym_mezera` |  |  | Týmu něco chybí. Archa to pozná. | The team is missing something. The Ark will notice. | c2_tym_pokryti < 3 |
| `ch2_pamet_povaha` |  |  | Archa je rozdělená podle povahy práce, i s oběma výjimkami. | The Ark is divided by the nature of the work, both exceptions included. | c2_rozdeleni = povaha, c2_vyjimky = 2 |
| `ch2_pamet_povaha_zelezo` |  |  | Archa je rozdělená, ale výjimky skončily ve špatném sloupci. | The Ark is divided, but the exceptions ended up in the wrong column. | c2_rozdeleni = povaha, c2_vyjimky < 2 |
| `ch2_pamet_gantt` |  |  | Jedna metodika na všechno: Rudův Gantt. I na software. Uvidíme. | One method for everything: Rudy's Gantt chart. Even for software. We'll see. | c2_rozdeleni = gantt |
| `ch2_pamet_krabice` |  |  | Jedna metodika na všechno: krabice Ing. Frameworka. Uvidíme. | One method for everything: Dr. Framework's box. We'll see. | c2_rozdeleni = krabice |
| `ch2_pamet_krysy` |  |  | Obálka šla na krysy. Nedostavěnice si pamatuje inzerát s kočkou. | The envelope went on the rats. Scope Creek remembers the advert with the cat. | c2_riziko_predem = krysy |
| `ch2_pamet_lano` |  |  | Jeřáb má nové lano. | The crane has a new cable. | c2_riziko_predem = lano |
| `ch2_pamet_usmev` |  |  | Ruda má kopii všeho, co Předseda podepsal. | Rudy has a copy of everything the Chairman signed. | c2_riziko_predem = usmev |
| `ch2_pamet_odhad_realny` |  |  | Rampa podle odhadu týmu: patnáct dní. | The ramp, as the team estimated it: fifteen days. | c2_odhad = realny |
| `ch2_pamet_odhad_kotva` |  |  | Rampa za „dva dny“. Uvidíme. | The ramp in 'two days'. We'll see. | c2_odhad = kotva |
| `ch2_pamet_mosty` |  |  | Cesta a řeka se na mapě potkávají u mostů. | On the map, the road and the river meet at the bridges. | c2_mosty ≥ 2 |
| `ch2_pamet_mosty_malo` |  |  | Na mapě drží jen málo mostů. | Only a few bridges on the map are holding. | c2_mosty < 2 |
| `ch2_pamet_pokracovani` |  |  | Pokračování příště. | To be continued. |  |

## Postavy

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `postava_pepa` |  |  | Pepa „Dva dny“ | Two-Day Joe | anglické jméno schváleno (D69) |
| `postava_vera` |  |  | Věra Výztužná | Vera Rebar | anglické jméno schváleno (D69) |
| `postava_norbert` |  |  | Norbert Norma | Norman Standards | anglické jméno schváleno (D69) |
| `postava_klara` |  |  | Klára Maketová | Mona Mockup | anglické jméno schváleno (D69) |
| `postava_zdenda` |  |  | Zdenda Známý | Benny Buddy | anglické jméno schváleno (D69) |
| `postava_krystof` |  |  | Kryštof Krabička | Chip Checkbox | anglické jméno schváleno (D69) |
