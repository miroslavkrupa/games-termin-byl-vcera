# Kapitola 1: scénář

> Generováno z `hra/texty/texty.csv` skriptem `hra/nastroje/scenar.py`. Neupravovat ručně:
> texty se mění v tabulce a přehled se vygeneruje znovu. Krok N6
> [postupu návrhu](../12-postup-navrhu.md); osnovy jsou v [dialozích](01-dialogy.md).

Repliky = mluvené texty bez voleb dialogu. Popisky = názvy aktivních míst, postav a předmětů,
útržky a texty miniher a GUI.

| Scéna | Repliky | Volby | Popisky |
|---|---|---|---|
| Úvod: Rudův byt | 46 | 4 | 6 |
| Náměstí | 118 | 11 | 7 |
| Vestibul radnice | 45 | 5 | 5 |
| Archiv | 54 | 10 | 13 |
| Archiv: úsek za Báru | 28 | 3 | 2 |
| Starostova pracovna a M03 | 62 | 3 | 7 |
| Kancelář Komise, M01 a M02 | 100 | 13 | 30 |
| Babiččina chaloupka | 36 | 9 | 6 |
| Nápovědy Prof. Pemboka | 41 | 0 | 0 |
| Předměty a kombinace | 22 | 0 | 15 |
| Konec kapitoly | 3 | 0 | 17 |
| Výchozí reakce, postavy a GUI | 11 | 0 | 22 |
| **Celkem** | **566** | **58** | **130** |

## Úvod: Rudův byt

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `ch1_uvod_001` | Ruda | sebevědomě | Ano. Projekt číslo čtrnáct je u konce. | Yes. Project number fourteen is over. | úvod, záběr 1: telefonát |
| `ch1_uvod_002` | Ruda | dotčeně | Ne, nedokončený. Skončený. To je rozdíl, který vám rád vysvětlím jindy. | No, not finished. Over. It's a distinction I'll be happy to explain some other time. |  |
| `ch1_uvod_003` | Ruda | sebevědomě | Vinou ostatních, samozřejmě. Já jsem byl jediný, kdo se držel plánu. | Other people's fault, naturally. I was the only one who stuck to the plan. |  |
| `ch1_uvod_004` | Ruda | nejistě | Plán byl, že to bude hotové. Haló? Haló? | The plan was that it'd be done. Hello? Hello? |  |
| `ch1_uvod_005` | Ruda | uraženě | Zavěsili. Typické. Tady nikdo nedokončí ani hovor. | They hung up. Typical. Nobody here even finishes a phone call. |  |
| `ch1_hs_byt_stul` |  |  | Stůl | Desk | popisek aktivního místa |
| `ch1_byt_stul_prohlednout` | Ruda | suše | Můj pracovní stůl. Hrnek kávy a zkušenosti ze čtrnácti projektů. Funguje jen ta káva. | My desk. A mug of coffee and the experience of fourteen projects. Only the coffee works. |  |
| `ch1_byt_kava_vzit` | Ruda | láskyplně | Bez kávy nikam. Káva je jediný plán, který mě nikdy nezklamal. | Not going anywhere without coffee. The only plan that's never let me down. | sebrat hrnek |
| `ch1_byt_propiska_vzit` | Ruda | spokojeně | Propiska. Nepíše, ale dobře vypadá v náprsní kapse. Jako já na poradách. | A pen. Doesn't write, but looks great in a breast pocket. Like me in meetings. | propisku si Ruda nechá po podpisu dekretu |
| `ch1_hs_byt_police` |  |  | Police | Shelf | popisek aktivního místa |
| `ch1_byt_police_prohlednout` | Ruda | provinile | Police. Jediná kniha, kterou mám. Dárek k narozeninám, pořád v celofánu. | A shelf. The only book I own. A birthday present, still in its shrink-wrap. |  |
| `ch1_byt_kniha_vzit` | Ruda | sebevědomě | Vezmu ji. Kniha v ruce vypadá jako plán. | I'll take it. Holding a book looks like having a plan. | sebrat Pemboka |
| `ch1_byt_kniha_mlci` | Ruda | spokojeně | Kniha mlčí. Konečně někdo, kdo mi neskáče do řeči. | The book is silent. Finally, someone who doesn't interrupt me. | Pembok v úvodu; ironie (R1.3) |
| `ch1_hs_byt_zed` |  |  | Zeď slávy | Wall of Fame | popisek aktivního místa |
| `ch1_byt_zed_prohlednout` | Ruda | hrdě | Zeď slávy. Čtrnáct diplomů za čtrnáct projektů. Všechny „za účast“. | My Wall of Fame. Fourteen certificates for fourteen projects. All of them for 'participation'. |  |
| `ch1_byt_zed_pouzit_1` | Ruda | čte | Diplom číslo devět: Týdenní výměna zelených žárovek na radnici. Šest let. Stav: probíhá. | Certificate number nine: Weekly Green Light Bulb Replacement at the town hall. Six years. Status: ongoing. | V01 projekt vs. provoz |
| `ch1_byt_zed_pouzit_2` | Ruda | zamyšleně | To nebyl projekt, to byl provoz. Ale diplom je diplom. | That wasn't a project, that was a routine. But a certificate is a certificate. | V01 |
| `ch1_byt_zed_pouzit_3` | Ruda | suše | Na diplom číslo čtrnáct ještě nemám rámeček. Ten rámeček je taky projekt. | I've no frame for certificate fourteen yet. The frame is also a project. |  |
| `ch1_hs_byt_dvere` |  |  | Dveře | Door | popisek aktivního místa |
| `ch1_byt_dvere_prohlednout` | Ruda | nervózně | Dveře. Na druhé straně buší věřitelé. Na téhle straně stojím já a vymýšlím plán. | The door. On the other side, creditors are pounding. On this side, I'm coming up with a plan. |  |
| `ch1_byt_dvere_pouzit` | Ruda | rozhodně | Tudy ne. Za dveřmi jsou věřitelé a za věřiteli výtah, který jezdí do tři a půl. | Not that way. Behind the door are creditors, and behind them an elevator that only goes to floor three and a half. | chybný pokus P1.0 |
| `ch1_hs_byt_skvira` |  |  | Škvíra pode dveřmi | Gap under the door | popisek aktivního místa |
| `ch1_byt_skvira_prohlednout` | Ruda | suše | Škvíra pode dveřmi. Chodí sem účty, upomínky a průvan. | The gap under the door. Bills, reminders and draughts come through here. |  |
| `ch1_hs_byt_dira` |  |  | Díra ve zdi | Hole in the wall | popisek aktivního místa (východ) |
| `ch1_byt_dira_prohlednout` | Ruda | suše | Chybějící stěna. „Byt s výhledem,“ říkal makléř. Dole vede skluz rovnou na suť. | The missing wall. 'A flat with a view,' said the estate agent. Below, a chute leads straight down to the rubble. | stopa P1.0 |
| `ch1_byt_dira_bez_kavy` | Ruda | rozhodně | Bez kávy nikam. | Not without my coffee. | P1.0: chybí káva |
| `ch1_byt_dira_bez_knihy` | Ruda | rozhodně | A kniha. Kdyby se mě někdo ptal, co čtu. | And the book. In case anyone asks what I'm reading. | P1.0: chybí kniha |
| `ch1_byt_dira_bez_dekretu` | Ruda | váhavě | Ještě ne. Ti za dveřmi by mi nedali pokoj. Nejdřív zjistím, co chtějí. | Not yet. That lot outside would never let it go. First I'll find out what they want. | P1.0: chybí dekret |
| `ch1_byt_dira_pouzit` | Ruda | odhodlaně | Hrdinové se neschovávají. Hrdinové utíkají. Strategicky. | Heroes don't hide. Heroes run. Strategically. | útěk dírou ve zdi |
| `ch1_byt_skluz` | Ruda | ve skluzu | Jůůů… | Wheee... | cutscéna skluzu |
| `ch1_byt_pristani` | Ruda | otřeseně | Přistání podle plánu. Plán byl přežít. | Landing as planned. The plan was to survive. | dopad na suť na náměstí |
| `ch1_veritel_buseni_1` | Věřitel | naštvaně | Gantte! Víme, že jste doma! | Gantt! We know you're in there! | hlas za dveřmi |
| `ch1_veritel_buseni_2` | Věřitel | naštvaně | Projekt čtrnáct skončil. Faktury ne! | Project fourteen is over. The invoices aren't! |  |
| `ch1_veritel_buseni_ruda` | Ruda | šeptem | Faktury. Jediné, co se v tomhle městě vždycky dokončí. | Invoices. The only thing in this town that always gets finished. |  |
| `ch1_veritel_volba_nikdo` | Ruda |  | Tady nikdo nebydlí! | Nobody lives here! | volba dialogu |
| `ch1_veritel_volba_kolik` | Ruda |  | Kolik vlastně dlužím? | How much do I owe, exactly? | volba dialogu |
| `ch1_veritel_volba_co` | Ruda |  | Co chcete? | What do you want? | volba dialogu |
| `ch1_veritel_volba_konec` | Ruda |  | (Ustoupit od dveří.) | (Step away from the door.) | volba dialogu |
| `ch1_veritel_nikdo_1` | Věřitel | klidně | Tak tu nikdo nepodepíše, že se odstěhoval. | Then nobody can sign that he's moved out. |  |
| `ch1_veritel_nikdo_ruda` | Ruda | uznale | …To je chytré. | ...That's clever. |  |
| `ch1_veritel_nikdo_2` | Věřitel | klidně | Děláme to dvacet let. | We've been doing this for twenty years. |  |
| `ch1_veritel_kolik_1` | Věřitel | věcně | Dvanáct tisíc. | Twelve thousand. | částka roste jako rozpočet |
| `ch1_veritel_kolik_2` | Druhý věřitel | opravuje | Patnáct. Počítal jsi úroky? | Fifteen. Did you count the interest? |  |
| `ch1_veritel_kolik_3` | Věřitel | věcně | Dvacet. Čím víc se ptá, tím víc to je. | Twenty. The more he asks, the more it gets. |  |
| `ch1_veritel_kolik_ruda` | Ruda | smutně | Jako každý rozpočet, který jsem kdy viděl. | Like every budget I've ever seen. |  |
| `ch1_veritel_co_1` | Věřitel | věcně | Máme pro vás doporučený dopis z radnice. Doručujeme ho, protože radnice dluží i nám. | We've got a registered letter from the town hall. We deliver for them because they owe us too. |  |
| `ch1_veritel_co_ruda` | Ruda | uraženě | Stížnost, že jo? Zase někdo nepochopil mou vizi. | A complaint, I suppose? Someone failed to grasp my vision again. |  |
| `ch1_veritel_co_2` | Věřitel | věcně | Strčíme vám ho pode dveře. Podepište převzetí. Propisku posíláme taky. | We'll slide it under the door. Sign for it. We're sending a pen through too. |  |
| `ch1_veritel_bez_kavy` | Ruda | zásadově | Nic nepodepisuju, dokud nemám v ruce kávu. Zásada číslo jedna. | I don't sign anything without a coffee in hand. Rule number one. | podmínka: hrnek kávy |
| `ch1_veritel_podpis_ruda` | Ruda | rychle | Podepíšu cokoli, hlavně když to zmizí. | I'll sign anything, as long as it goes away. |  |
| `ch1_veritel_podpis_kava` | Ruda | provinile | Propiska nepíše. A jejda, ukáplo mi z hrnku. Teď je to stížnost s příchutí. | The pen doesn't write. And oops, I've spilled my coffee on it. Now it's a flavoured complaint. | cutscéna: vznik dekretu; podpis je jen kávová skvrna |
| `ch1_veritel_podpis_cteni` | Ruda | čte, užasle | „Jmenovací dekret. Rudolf Gantt se jmenuje projektovým manažerem Archy.“ To není stížnost. | 'Letter of Appointment. Rudy Gantt is hereby appointed project manager of the Ark.' That's not a complaint. |  |
| `ch1_veritel_podpis_ruda_2` | Ruda | zmateně | Archy? Jaké Archy? A číslo projektu je pod kávou. | The Ark? What Ark? And the project number's under the coffee. |  |
| `ch1_veritel_odchod` | Věřitel | naštvaně | Převzato. A teď k těm fakturám! | Signed for. Right, about those invoices! |  |
| `ch1_veritel_konec` | Věřitel | výhružně | Neutečete nám, Gantte! Dveře hlídáme! | You won't get away, Gantt! We're watching the door! | nápověda: ne dveřmi |
| `ch1_veritel_konec_ruda` | Ruda | pohlédne ke zdi | Dveře. Jasně. Kdo by utíkal dveřmi. | The door. Sure. Who'd ever leave by the door? | nápověda: díra ve zdi |

## Náměstí

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `ch1_hs_kasna` |  |  | Kašna | Fountain | popisek aktivního místa |
| `ch1_hs_budka` |  |  | Telefonní budka | Phone booth | popisek aktivního místa |
| `ch1_hs_dvere` |  |  | Dveře radnice | Town hall door | popisek aktivního místa |
| `ch1_kasna_prohlednout` | Ruda | suše | Kašna bez vody. Projekt „Voda v kašně“ je ve fázi 2 od roku 1994. | A fountain with no water. The 'Water in the Fountain' project has been in phase two since 1994. |  |
| `ch1_kasna_pouzit_1` | Ruda | slavnostně | Hodím tam minci a přeju si hotový projekt. | I'll toss in a coin and wish for a finished project. |  |
| `ch1_kasna_pouzit_2` | Ruda | zklamaně | Mince cinkla o suché dno. Přání zamítnuto pro nedostatek vody. | The coin clinks on the dry bottom. Wish rejected due to insufficient water. |  |
| `ch1_budka_prohlednout` | Ruda | uznale | Telefonní budka. Jediná věc ve městě s jasně daným rozsahem: jeden hovor. | A phone booth. The only thing in town with a clearly defined scope: one call. |  |
| `ch1_budka_pouzit_1` | Ruda | sebevědomě | Zavolám na linku pomoci. | I'll call the helpline. |  |
| `ch1_budka_pouzit_2` | Ruda | cituje automat | „Vaše žádost je pro nás důležitá. Jste v pořadí číslo… čtyři tisíce osm set dvanáct.“ | "Your call is important to us. You are caller number... four thousand eight hundred and twelve." | 4812 = počet obyvatel (běžecký vtip z kap. 1) |
| `ch1_budka_pouzit_3` | Ruda | pobaveně | Celé město visí na lince. Aspoň vím, kde všichni jsou. | The whole town is on hold. At least I know where everyone is. |  |
| `ch1_dvere_prohlednout` | Ruda | suše | Vchod do radnice. Lešení je tu tak dlouho, že je nejspíš nosné. | The town hall entrance. The scaffolding's been up so long it's probably load-bearing. |  |
| `ch1_hs_stanek` |  |  | Stánek Pana Změny | Mr. Change's stall | popisek aktivního místa |
| `ch1_stanek_prohlednout` | Ruda | uznale | Stánek, který prodává všechno. Jen nikdy dvakrát to samé. | A stall that sells everything. Just never the same thing twice. |  |
| `ch1_zmena_uvod_ruda` | Ruda | sebevědomě | Dobrý den! | Good morning! |  |
| `ch1_zmena_uvod` | Pan Změna | nadšeně | Vítejte u Pana Změny! Dnes prodáváme… to se ještě uvidí. | Welcome to Mr. Change's! Today we're selling... we'll see. | hlas zpoza stánku |
| `ch1_zmena_volba_prodej` | Ruda |  | Co vlastně prodáváte? | So what are you actually selling? | volba dialogu |
| `ch1_zmena_volba_konec` | Ruda |  | Na shledanou. | Goodbye. | volba dialogu |
| `ch1_zmena_prodej_1` | Pan Změna | rozhodně | Deštníky. Ne, slunečníky. Vlastně holínky. | Umbrellas. No, parasols. Actually, wellies. | odpovědi se střídají |
| `ch1_zmena_prodej_2` | Pan Změna | rozhodně | Okurky. Ne, nakládané okurky. Čerstvé, ale nakládané. | Cucumbers. No, pickles. Fresh ones, but pickled. | odpovědi se střídají |
| `ch1_zmena_001` | Pan Změna | nadšeně | Chci Archu. Modrou. Ne, zelenou. S bazénem. Bez vody, kvůli bezpečnosti. | I want an Ark. Blue. No, green. With a pool. No water, for safety reasons. | replika z návrhu kapitoly 1 |
| `ch1_zmena_prodej_ruda` | Ruda | suše | Aspoň víte, co chcete. Ne, nevíte. | At least you know what you want. No, you don't. |  |
| `ch1_zmena_konec` | Pan Změna | rozverně | Nashle! Nebo ahoj. Ještě si to rozmyslím. | Goodbye! Or see ya. I'll decide later. |  |
| `ch1_zmena_vse` | Pan Změna |  | Dnes už nic nechci. Zítra možná všechno. | I don't want anything today. Tomorrow, maybe everything. | vyčerpaný dialog (playtest prototypu) |
| `ch1_kombinace_pero_1` | Ruda | vítězoslavně | Inkoust je ve fázi 2? Káva je ve fázi teď. | Ink is in phase two? Coffee is in phase now. | propiska + káva |
| `ch1_kombinace_pero_2` | Ruda | hrdě | Kávové pero. Inovace, kterou by nikdo neschválil, a proto funguje. | A coffee pen. An innovation nobody would ever approve, which is why it works. |  |
| `ch1_stanek_propiska` | Ruda | přemýšlivě | Prázdnou propiskou nic nezapíšu. Potřebovala by něco hnědého a tekutého. | I can't write anything with an empty pen. It needs something brown and runny. | nápověda ke kombinaci s kávou |
| `ch1_stanek_kava` | Ruda | majetnicky | Svoji kávu nikomu nedám. Ani za Archu. | Nobody gets my coffee. Not even for an Ark. |  |
| `ch1_zmena_dohoda_ruda_1` | Ruda | úředně | Pane Změno, co přesně chcete? Zapíšu to. | Mr. Change, what exactly do you want? I'll write it down. | kávové pero na stánek |
| `ch1_zmena_dohoda_1` | Pan Změna | nadšeně, přerušen | Archu. Modrou. Ne, zel… | An Ark. Blue. No, gr... |  |
| `ch1_zmena_dohoda_ruda_2` | Ruda | rychle | Pozdě, už je to zapsané. Modrá. Tady podepište. | Too late, it's written down. Blue. Sign here. |  |
| `ch1_zmena_002` | Pan Změna | zmateně | Já… to jsem podepsal? Tak to asi opravdu chci. Zvláštní pocit. | I... signed that? Then I suppose I really want it. What a strange feeling. | replika z návrhu kapitoly 1 |
| `ch1_zmena_dohoda_ruda_3` | Ruda | samolibě | Gratuluju. Právě jste se poprvé v životě rozhodl. | Congratulations. You've just made your first decision ever. |  |
| `ch1_zmena_dohoda_uz` | Pan Změna | hrdě | Modrou! Mám to podepsané. Kávou. | Blue! It's signed. In coffee. | po dohodě |
| `ch1_hs_kometa` |  |  | Kometa Deadline | Comet Deadline | popisek aktivního místa |
| `ch1_kometa_prohlednout` | Ruda | zasmušile | Kometa Deadline. Každý den o kousek větší. Jako můj seznam úkolů. | Comet Deadline. A little bigger every day. Like my to-do list. |  |
| `ch1_kometa_pouzit` | Ruda | suše | Kometu neodložím. To umí jen Komise, a ta by chtěla razítko. | I can't postpone a comet. Only the Committee can, and they'd want a stamp. | klepnutí na kometu (dřív zkušební přepínání dne a večera) |
| `ch1_ruda_001` | Ruda | sebevědomě | Nedostavěnice. Město neomezených možností. Hlavně proto, že žádnou z nich nikdo nedotáhl. | Scope Creek. A town of endless possibilities. Mostly because nobody ever finished one. | replika z návrhu kapitoly 1; na začátku |
| `ch1_pembok_ukol` | Pembok | poučně | Bez papíru podepsaného sponzorem a bez razítka Komise ti klíč od hangáru nikdo nedá. | Without a page signed by your sponsor and stamped by the Committee, nobody will hand you the hangar key. | úvodní úkol (návrh kapitoly 1, krok 1) |
| `ch1_pembok_ukol_ruda` | Ruda | uraženě | Papír? Za mě mluví výsledky! | Paperwork? My results speak for me! |  |
| `ch1_pembok_ukol_2` | Pembok | suše | Které? | Which ones? |  |
| `ch1_pembok_001` | Pembok | ironicky | Než začneš stavět Archu, nebylo by dobré vědět, proč ji stavíš? Čistě teoreticky. | Before you build an Ark, might it help to know why? Purely hypothetically. | replika z návrhu kapitoly 1 |
| `ch1_bara_prohlednout` | Ruda | zaujatě | Žena s metrem a tabletem. Jediný člověk ve městě, který něco měří, místo aby to odhadoval. | A woman with a tape measure and a tablet. The only person in town who measures things instead of guessing. |  |
| `ch1_bara_dekret` | Ruda | opatrně | Tohle jí ukazovat nebudu. Ještě by změřila tu skvrnu. | I'm not showing her this. She'd measure the stain. | dekret na Báru |
| `ch1_bara_uvod_ruda` | Ruda | sebevědomě | Dobrý den! Ruda Gantt, nový projektový manažer Archy. | Hello! Rudy Gantt, the new project manager of the Ark. | první rozhovor (R1.3) |
| `ch1_bara_uvod` | Bára | věcně | Bára Backlogová. Měřím. | Barb Backlog. I'm measuring. |  |
| `ch1_bara_001` | Bára | věcně | Ta rampa má sklon o tři stupně větší, než stojí ve výkres— | That ramp is tilted three degrees more than the drawings sa— | replika z návrhu kapitoly 1; R1.3, první místo |
| `ch1_bara_volba_vyslechnout` | Ruda |  | (Nechat ji domluvit.) | (Let her finish.) | volba v prvním rozhovoru s Bárou |
| `ch1_ruda_020` | Ruda | skáče do řeči | Výborně, poznamenám si to. (píše do vzduchu propiskou bez inkoustu) | Brilliant, I'll make a note. (writes in the air with an empty pen) | replika z návrhu kapitoly 1; skočit do řeči |
| `ch1_bara_001_dokonci` | Bára | věcně | …ve výkresech. A kašna je o dvacet centimetrů nižší, než tvrdí radnice. Nic tu neodpovídá papírům. | ...say. And the fountain is eight inches lower than the town hall claims. Nothing here matches the paperwork. |  |
| `ch1_bara_001_prerusena` | Bára | suše | Propiskou bez inkoustu. Jasně. | With an empty pen. Sure. |  |
| `ch1_bara_002` | Bára | vážně | Archa má odvézt celé město. Čtyři tisíce osm set dvanáct lidí. Jenže kajuty někdo počítal jen pro— | The Ark is supposed to carry the whole town. Four thousand eight hundred and twelve people. But somebody only counted cabins for— | R1.3, druhé místo; 4812 = počet obyvatel |
| `ch1_bara_skok_2` | Ruda | skáče do řeči | Čísla jsou detail. Hlavně, že to poletí! | Numbers are details. What matters is it flies! |  |
| `ch1_bara_002_dokonci` | Bára | věcně | …polovinu. Takže buď dvakrát větší Archa, nebo poloviční město. To druhé by starosta podepsal hned. | ...half. So either a twice-as-big Ark or a half-sized town. The mayor would sign the second one today. | dobrý útržek „kritéria úspěchu“ pro M01 |
| `ch1_bara_002_prerusena` | Bára | suše | Poletí. Polovina. | It'll fly. Half of it. |  |
| `ch1_bara_003` | Bára | opatrně | Byla jsem v původním týmu Archy. Pamatuju si i číslo projektu, kdybyste ho někdy— | I was on the original Ark team. I even remember the project number, in case you ever— | R1.3, třetí místo |
| `ch1_bara_skok_3` | Ruda | skáče do řeči | Číslo? Já myslím ve výsledcích, ne v číslech! | A number? I think in results, not numbers! |  |
| `ch1_bara_003_dokonci` | Bára | věcně | …potřeboval. Devadesát čtyři lomeno nula sedmnáct. Lumír bez něj do archivu nikoho nepustí. | ...need it. Ninety-four slash zero seventeen. Lumír won't let anyone into the archive without it. | číslo projektu 94/017 |
| `ch1_bara_cislo_ruda` | Ruda | vděčně | 94/017. Poznamenám si to. (tentokrát si to opravdu zapamatuje) | 94/017. I'll make a note. (this time he actually remembers it) |  |
| `ch1_bara_odchod` | Bára | chladně | Víte co? Až budete mít čas poslouchat, víte, kde mě najdete. U kašny. Měřím ji. | Tell you what. When you have time to listen, you know where to find me. By the fountain. Measuring it. | konec prvního rozhovoru, když jí Ruda skáče do řeči |
| `ch1_bara_znovu_ruda` | Ruda |  | Zase já. | It's me again. |  |
| `ch1_bara_znovu` | Bára | věcně | Vidím. Dva metry třicet od kašny. | I can see that. Seven and a half feet from the fountain. |  |
| `ch1_bara_volba_mereni` | Ruda |  | Co to vlastně měříte? | What exactly are you measuring? | volba dialogu |
| `ch1_bara_volba_cislo` | Ruda |  | Neznáte číslo projektu Archy? | Do you know the Ark's project number? | volba dialogu |
| `ch1_bara_volba_konec` | Ruda |  | Tak zatím. | See you around. | volba dialogu |
| `ch1_bara_mereni_1` | Bára | věcně | Všechno, co ostatní jen odhadují. Radnice je nakloněná o dva stupně. Doleva. | Everything everyone else just estimates. The town hall leans two degrees. To the left. |  |
| `ch1_bara_mereni_ruda` | Ruda | pobaveně | Politicky, nebo staticky? | Politically or structurally? |  |
| `ch1_bara_mereni_2` | Bára | věcně | Ano. | Yes. |  |
| `ch1_bara_cislo_znovu` | Bára | věcně | Devadesát čtyři lomeno nula sedmnáct. Pořád. Čísla se nemění, jen lidi. | Ninety-four slash zero seventeen. Still. Numbers don't change. People do. |  |
| `ch1_bara_cislo_plakat` | Bára | uznale | Ten plakát má číslo správně. Překvapivě. | That poster has the right number. Surprisingly. |  |
| `ch1_bara_cislo_ne` | Bára | chladně | Znám. Ale minule jste mi skočil do řeči, tak jsem si ho nechala. | I do. But last time you cut me off, so I kept it to myself. | R1.3: kdo nepočkal, číslo od Báry nedostane |
| `ch1_bara_cislo_zmena` | Bára | suše | Zkuste Pana Změnu. Balí okurky do starého plakátu Archy. | Try Mr. Change. He wraps pickles in an old Ark poster. | nápověda k druhé cestě |
| `ch1_bara_konec` | Bára | suše | Zatím. Nejpřesnější termín, jaký jsem tu za celý den slyšela. | Around. The most precise deadline I've heard all day. |  |
| `ch1_bara_vse` | Bára |  | Všechno jsem vám řekla. Teď měřím. | I've told you everything. Now I'm measuring. | vyčerpaný dialog (playtest prototypu) |
| `ch1_zmena_prohlednout` | Ruda | pobaveně | Pan Změna. Prodává všechno, ale nikdy dvakrát to samé. Má dvě tužky za každým uchem a ani jednu nepoužil. | Mr. Change. Sells everything, never the same thing twice. Two pencils behind each ear and he's never used one. |  |
| `ch1_stanek_plakat` | Ruda | zaujatě | A zboží balí do starého plakátu Archy. Pod okurkou je na něm nějaké číslo. | And he wraps his goods in an old Ark poster. There's some kind of number on it, under a pickle. | Ruda si všimne plakátu (druhá cesta k číslu projektu) |
| `ch1_zmena_volba_plakat` | Ruda |  | Co chcete za ten starý plakát? | What do you want for that old poster? | volba dialogu; jen když Ruda plakát viděl |
| `ch1_zmena_prani_1` | Pan Změna | rozhodně | Deštník. Ne, holínky. Ne, deštník do holínek. | An umbrella. No, wellies. No, an umbrella for wellies. | přání se střídají |
| `ch1_zmena_prani_2` | Pan Změna | nadšeně | Vlastní Archu. Modrou. Ne, zelenou. Ne, tu modrou, ale zeleně. | My own Ark. Blue. No, green. No, the blue one, but in green. | přání se střídají |
| `ch1_zmena_prani_3` | Pan Změna | rozhodně | Nic. Ne, všechno. Ne, něco mezi. | Nothing. No, everything. No, something in between. | přání se střídají |
| `ch1_zmena_prani_ruda` | Ruda | unaveně | Než vám to seženu, budete chtít něco jiného. | By the time I get it, you'll want something else. |  |
| `ch1_zmena_napad` | Ruda | zamyšleně | Kdyby to tak měl černé na bílém. A podepsané. | If only he had it in black and white. And signed. | vlastní nápověda po druhém pokusu |
| `ch1_zmena_plakat_1` | Pan Změna | velkoryse | Když už to mám podepsané… Tady, plakát. Okurky zabalím do něčeho jiného. Do čeho? To se ještě uvidí. | Well, since it's signed... Here, the poster. I'll wrap the pickles in something else. In what? We'll see. | po podpisu vydá plakát |
| `ch1_plakat_cislo` | Ruda | spokojeně | Projekt Archa, číslo 94/017. Konečně papír, který něco říká. | Project Ark, number 94/017. Finally, a piece of paper that says something. | číslo projektu z plakátu |
| `ch1_rozhlas_001` | Rozhlas | úředně | Hlášení městského rozhlasu. Kometa Deadline dopadne na Nedostavěnici za třicet dní. | This is a town announcement. Comet Deadline will hit Scope Creek in thirty days. | úvod, záběr 6 |
| `ch1_rozhlas_002` | Rozhlas | úředně | Radnice proto zahajuje projekt Archa. Znovu. | The town hall is therefore launching the Ark project. Again. |  |
| `ch1_rozhlas_003` | Rozhlas | úředně | Projektovým manažerem byl jmenován… pan Rudolf Gantt. | The project manager will be... Mr. Rudy Gantt. |  |
| `ch1_rozhlas_004` | Rozhlas | úředně | Děkujeme za pozornost. Další hlášení bude, až se něco pokazí. | Thank you for your attention. The next announcement will be when something goes wrong. |  |
| `ch1_rozhlas_ruda_1` | Ruda | zděšeně | Kdo? … Já?! | Who? ...Me?! |  |
| `ch1_rozhlas_ruda_2` | Ruda | rychle se narovná | Samozřejmě. Kdo jiný. | Naturally. Who else? |  |
| `ch1_hs_amplion` |  |  | Amplion | Loudspeaker | popisek aktivního místa |
| `ch1_amplion_prohlednout` | Ruda | suše | Městský rozhlas. Hlásí jen špatné zprávy. Dobré se tu nedějí, tak šetří proud. | The town loudspeaker. It only announces bad news. Good news never happens here, so it saves power. |  |
| `ch1_amplion_pouzit` | Ruda | smutně | Nedosáhnu. A kdybych dosáhl, ohlásil bych, že je všechno podle plánu. Nikdo by mi nevěřil. | Can't reach it. And if I could, I'd announce everything's on schedule. Nobody would believe me. |  |
| `ch1_pembok_otevreni_1` | Pembok | důstojně | Ehm. Konečně. Čtrnáct let v celofánu. Dobrý den, jsem Prof. Pembok. | Ahem. Finally. Fourteen years in shrink-wrap. Good day, I'm Prof. Pembok. | úvod, záběr 7: Pembok se sám otevře |
| `ch1_pembok_otevreni_ruda` | Ruda | užasle | Kniha mluví. | The book talks. |  |
| `ch1_pembok_otevreni_2` | Pembok | suše | Knihy mluví vždycky. Jen je nikdo neotevře. | Books always talk. People just never open them. |  |
| `ch1_pembok_ukol_3` | Pembok | poučně | Začni u toho, kdo o Arše doopravdy rozhoduje. Podpis na tvém dekretu to nebude. | Start with whoever really decides about the Ark. It won't be whoever signed your letter. | po ch1_pembok_ukol_2 |
| `ch1_ruda_002` | Ruda | odhodlaně | Mám plán. Teda, budu mít plán. Mám plán, že budu mít plán. | I have a plan. Well, I'll have a plan. I plan to have a plan. | replika z návrhu kapitoly 1; konec úvodního úkolu |
| `ch1_kocour_prohlednout` | Ruda | nejistě | Zrzavý kocour s natrženým uchem. Kouká na mě, jako bych měl zpoždění. | A ginger tomcat with a torn ear. He's looking at me like I'm running late. |  |
| `ch1_kocour_obojek` | Ruda | čte | Obojek: „Mourek. Majitelka: Pozemková, pozemek pod rampou.“ Konečně někdo s jasnými hranicemi. | His collar says: 'Marmalade. Owner: Plotkins, the plot under the ramp.' Finally, someone with clear boundaries. | P1.10: odhalí babičku |
| `ch1_kocour_mluvit_ruda` | Ruda | přátelsky | Ahoj, kocoure. Kdo tady rozhoduje o Arše? | Hey, cat. Who decides about the Ark around here? |  |
| `ch1_kocour_mluvit` | Kocour | povýšeně | Mňau. | Meow. |  |
| `ch1_kocour_mluvit_ruda_2` | Ruda | uznale | Nejsrozumitelnější odpověď, jakou jsem dneska dostal. | Clearest answer I've had all day. |  |
| `ch1_kocour_kava` | Ruda | dotčeně | Kocour očichal kávu a odešel. Pohrdá mnou s profesionální přesností. | The cat sniffed the coffee and walked off. He despises me with professional precision. | káva na kocoura ★ |
| `ch1_kocour_plot` | Ruda | uznale | Kocour sedí na plotě. Zjevně tady velí. | The cat's sitting on the fence. Clearly in charge here. | prohlédnout kocoura v chaloupce |
| `ch1_hs_ulicka` |  |  | Ulička k rampě | Alley to the ramp | popisek aktivního místa (východ do S6) |
| `ch1_ulicka_prohlednout` | Ruda | uznale | Ulička k rampě. Rampa trčí nad střechami, rovná jako pravítko. Jediná rovná věc ve městě. | The alley to the ramp. The ramp juts above the rooftops, straight as a ruler. The only straight thing in town. |  |
| `ch1_bara_volba_kdo` | Ruda |  | Kdo tady rozhoduje o Arše? | Who makes the decisions about the Ark? | volba dialogu; chybný pokus P1.1 |
| `ch1_bara_kdo` | Bára | věcně | Zeptejte se vrátného. Ten ví, kdo kudy chodí. A kdo kudy jenom slibuje. | Ask the porter. He knows who goes where. And who only promises to. | pošle k vrátnému |
| `ch1_bara_volba_rozsah` | Ruda |  | Co do Archy nepatří? | What doesn't belong on the Ark? | volba dialogu; jen po prvním rozhovoru a se zadáním |
| `ch1_bara_rozsah_1` | Bára | věcně | Bazén. Vyhlídková terasa. A fontána, kterou chce starosta. | The pool. The observation deck. And the fountain the mayor wants. |  |
| `ch1_bara_rozsah_ruda` | Ruda | nevěřícně | Fontána? Na Arše? | A fountain? On the Ark? |  |
| `ch1_bara_rozsah_2` | Bára | suše | Archa má odvézt lidi, ne atrakce. Napište si to. Něčím, co píše. | The Ark is meant to carry people, not attractions. Write it down. With something that writes. |  |
| `ch1_bara_rozsah_utrzek` | Ruda | spokojeně | Bazén, terasa, fontána: na Archu nepatří. Tohle si schovám. | Pool, deck, fountain: not coming aboard. I'm keeping this. | útržek „co do Archy nepatří“ pro M01 |
| `ch1_bara_kava` | Bára | věcně | Ne, děkuju. Kofein zkresluje měření. O dvě procenta. | No, thanks. Caffeine skews my measurements. By two percent. | káva na Báru ★ |
| `ch1_bara_propiska` | Bára | věcně | Ta propiska nepíše. Poznám to od pohledu: je moc lehká. | That pen's empty. I can tell by looking: it's too light. | propiska na Báru ★ |
| `ch1_bara_kavove_pero` | Bára | uznale | Píše hnědě a rozpíjí se. Ale aspoň píše. To je tady víc, než se dá čekat. | It writes in brown and it smudges. But it writes. That's more than you'd expect around here. | kávové pero na Báru ★ |
| `ch1_bara_pozadavek` | Bára | pobaveně | Modrá Archa. Podepsaná. Pan Změna se poprvé rozhodl a vy jste u toho byl. Gratuluju. | A blue Ark. Signed. Mr. Change made his first decision and you were there to see it. Congratulations. | požadavek na Báru ★ |
| `ch1_bara_zadani_1` | Bára | tiše | Tohle jsem psala. Teda, přepisovala. Na stroji, v devadesátém čtvrtém. | I typed this. Well, retyped it. On a typewriter, in ninety-four. | zadání na Báru ★ |
| `ch1_bara_zadani_2` | Bára | hořce | Nikdo to nikdy nečetl. Pozná se to: na druhé straně není jediná skvrna od kávy. | Nobody ever read it. You can tell: not a single coffee stain on page two. |  |
| `ch1_bara_zadani_ruda` | Ruda | zvedá hrnek | To napravím. | I'll fix that. |  |
| `ch1_bara_zadani_3` | Bára | ostře | Neopovažujte se. | Don't you dare. |  |
| `ch1_bara_karta` | Bára | věcně | Most přes řeku. Je o metr nižší, než by projela rybářská loď. Měřila jsem to. | The river bridge. It's three feet too low for a fishing boat to get under. I measured it. | karta poučení na Báru ★ |
| `ch1_bara_papir` | Bára | uznale | Proč, do kdy a jak se pozná, že se to povedlo. Na jedné straně. To tu ještě nikdo nedokázal. | Why, by when, and how we'll know it worked. On one page. Nobody here has ever managed that. | papír o Arše na Báru ★ |
| `ch1_bara_konec_kapitoly_duvera` | Bára | kývne | Klíč? Hm. Dobrá práce. Změřila bych to, ale věřím vám. | A key? Hm. Good work. I'd measure it, but I'll take your word. | konec kapitoly, c1_bara_vyslechnuta = 3 |
| `ch1_bara_konec_kapitoly_mereni` | Bára | nevzhlédne | Kašna je pořád o dvacet centimetrů nižší. | The fountain's still eight inches short. | konec kapitoly, nižší důvěra |
| `ch1_zmena_volba_kdo` | Ruda |  | Kdo tady rozhoduje o Arše? | Who makes the decisions about the Ark? | volba dialogu; chybný pokus P1.1 |
| `ch1_zmena_kdo` | Pan Změna | rozhodně | Já! Ne, starosta. Ne, Komise. Ne, já. Zeptejte se mě zítra. | Me! No, the mayor. No, the Committee. No, me. Ask me tomorrow. |  |
| `ch1_zmena_volba_archa` | Ruda |  | Jakou Archu byste chtěl vy? | What kind of Ark would you like? | volba dialogu; odpověď je ch1_zmena_001 |
| `ch1_zmena_archa_2` | Pan Změna | nadšeně | Hlavně ať je to hezký. Napište si to: aby to bylo hezký. | Most of all it should be nice. Write that down: make it look nice. | nesmysl do M01 (cíl) |
| `ch1_zmena_archa_3` | Pan Změna | nadšeně | A všichni budou spokojení! To tam napište taky. | And everyone will be happy! Put that down too. | nesmysl do M01 (kritéria) |
| `ch1_zmena_archa_ruda` | Ruda | suše | Zapíšu si to. Do kolonky Nápady, které nepoletí. | Noted. Under 'Ideas That Won't Fly'. |  |
| `ch1_stanek_ukrast` | Ruda | dotčeně | Kradu jen nápady. | I only steal ideas. | pokus vzít plakát |
| `ch1_zmena_dekret` | Pan Změna | nadšeně | Projektový manažer! To chci být taky. Ne, nechci. Možná ve čtvrtek. | Project manager! I want to be one too. No, I don't. Maybe on Thursday. | dekret na Pana Změnu ★ |
| `ch1_zmena_plakat_zpet` | Pan Změna | zmateně | Můj starý plakát! Chci ho zpátky. Ne, nechci. Nechte si ho, než si to rozmyslím. | My old poster! I want it back. No, I don't. Keep it before I change my mind. | plakát na Pana Změnu ★ |
| `ch1_zmena_pozadavek` | Pan Změna | hrdě | To je můj podpis! Hnědý a rozhodný. Jako já. | That's my signature! Brown and decisive. Just like me. | požadavek na Pana Změnu ★ |
| `ch1_zmena_papir` | Pan Změna | zklamaně | Bazén tam nemáte? Škoda. Ne, dobře. Ne, škoda. | No pool? Shame. No, good. No, shame. | papír o Arše na Pana Změnu ★ |

## Vestibul radnice

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `ch1_vratny_prohlednout` | Ruda | pobaveně | Vrátný. Hlídá dveře radnice, termosku a křížovku. V tomhle pořadí odzadu. | The porter. He guards the town hall door, his thermos and his crossword. In reverse order. |  |
| `ch1_vratny_kava` | Ruda | uznale | Má vlastní termosku. Kávu si tu každý hlídá sám. | He's got his own thermos. Around here, everyone guards their own coffee. | káva na vrátného |
| `ch1_vratny_uvod_ruda` | Ruda | sebevědomě | Dobrý den. Ruda Gantt, projektový manažer Archy. | Good morning. Rudy Gantt, project manager of the Ark. |  |
| `ch1_vratny_uvod` | Vrátný | ospale | Hm. Další. | Hm. Another one. |  |
| `ch1_vratny_volba_kdo` | Ruda |  | Kdo tady rozhoduje o Arše? | Who makes the decisions about the Ark? | volba dialogu |
| `ch1_vratny_volba_dovnitr` | Ruda |  | Můžu dovnitř? | Can I go in? | volba dialogu |
| `ch1_vratny_volba_krizovka` | Ruda |  | Co luštíte? | What are you solving? | volba dialogu |
| `ch1_vratny_volba_konec` | Ruda |  | Na shledanou. | Goodbye. | volba dialogu |
| `ch1_vratny_kdo_1` | Vrátný | ospale | Starosta Bohumil. Druhé patro. | Mayor Bohumil. Second floor. |  |
| `ch1_vratny_kdo_ruda` | Ruda | nadějně | A výtah? | And the elevator? |  |
| `ch1_vratny_kdo_2` | Vrátný | ospale | Jezdí do půl druhého. Druhá půlka je ve fázi 2. | It goes to floor one and a half. The other half is in phase two. | výtah do 1½. patra (návrh kapitoly 1) |
| `ch1_vratny_kdo_2_tlacitko` | Vrátný |  | Výtahem. Co v něm zase je dvojka, jezdí celý. Pamětníci pláčou. | By lift. Ever since it got its number two back, it goes all the way. The old-timers are in tears. | po zapojení tlačítka „2“ (playtest prototypu) |
| `ch1_vratny_dovnitr_1` | Vrátný | ospale | Na starostu nemáte výtah a do archivu nemáte číslo projektu. Archivář Lumír bez něj nepustí ani myš. | You can't get up to the mayor, and you can't get into the archive without a project number. Lumír the archivist won't even let a mouse in without one. | Lumír pouští do archivu jen s číslem projektu |
| `ch1_vratny_dovnitr_ruda` | Ruda | pobaveně | Myš to zkoušela? | The mouse tried? |  |
| `ch1_vratny_dovnitr_2` | Vrátný | vážně | Třikrát. Teď má číslo. | Three times. Now she has a number. |  |
| `ch1_vratny_dovnitr_cislo` | Vrátný | ospale | Číslo máte, tak sklep je váš. Dolů po schodech, nahoru se stejně nedostanete. | You've got the number, so the basement's all yours. Downstairs. You won't get upstairs anyway. |  |
| `ch1_vratny_dovnitr_tlacitko` | Vrátný |  | Sklep máte a nahoru teď taky. Za chvíli tu nebudu mít co hlídat. | You've got the basement, and now upstairs too. Soon there'll be nothing left for me to guard. | po zapojení tlačítka „2“ (playtest prototypu) |
| `ch1_vratny_krizovka_1` | Vrátný | přemýšlivě | Devět písmen: „věc, která se v tomhle městě nikdy nestala“. | Seven letters: 'something that never happens in this town'. | vtip je psaný pro každý jazyk zvlášť |
| `ch1_vratny_krizovka_ruda` | Ruda |  | Dokončení? | Closure? |  |
| `ch1_vratny_krizovka_2` | Vrátný | podezíravě | Sedí. Ale nevěřím tomu. | Fits. But I don't believe it. |  |
| `ch1_vratny_konec` | Vrátný | ospale | Hm. | Hm. |  |
| `ch1_vratny_vse` | Vrátný |  | Hm. Všechno jsem řekl. Teď luštím. | Hm. Said it all. Doing my crossword now. | vyčerpaný dialog (playtest prototypu) |
| `ch1_vratny_stop` | Vrátný | ospale | Bez čísla projektu vás Lumír ze sklepa vyhodí. A mě s vámi. | Without a project number, Lumír will throw you out of the basement. And me with you. | jen I1 (dveře radnice bez čísla); v N7 vyřadit, archiv hlídá Lumír (K11) |
| `ch1_vratny_pusti` | Vrátný | ospale | Číslo máte? Tak sklep je dolů. Všechno ostatní je nahoru, ale tam se nedostanete. | Got the number? Basement's downstairs. Everything else is upstairs, but you can't get there. | jen I1 (dveře radnice s číslem); v N7 vyřadit, archiv hlídá Lumír (K11) |
| `ch1_vestibul_prichod` | Ruda | suše | Vestibul radnice. Mramor, lešení a vrátný. Dvě z těch věcí tu zůstanou navždy. | The town hall lobby. Marble, scaffolding and a porter. Two of those are here forever. | jen při prvním příchodu |
| `ch1_hs_vytah` |  |  | Výtah | Elevator | popisek aktivního místa (vestibul, pracovna, Komise) |
| `ch1_ruda_010` | Ruda | uznale | Výtah do půl patra. Konečně stavba, která přiznává, jak na tom je. | An elevator that only goes halfway. Finally, a building that's honest about its progress. | replika z návrhu kapitoly 1; prohlédnout výtah |
| `ch1_vytah_prohlednout_2` | Ruda | suše | Tlačítka 1 a 1½. Místo dvojky díra. Někdo ji asi potřeboval víc. | Buttons for 1 and 1½. Where the 2 should be, there's a hole. Someone must have needed it more. | stopa P1.6 |
| `ch1_vytah_jet_1p5` | Ruda | odevzdaně | Jedna a půl. Komise. Půl patra pod cílem, jako vždycky. | Floor one and a half. The Committee. Half a floor short of the goal, as usual. |  |
| `ch1_vytah_bez_tlacitka` | Ruda | suše | Dvojka chybí. Do druhého patra se tu jezdí jen v plánech. | No button for 2. Around here, the second floor only exists in plans. | P1.6 |
| `ch1_vytah_vylezt` | Ruda | odmítavě | Půl patra lezení? Na to nemám papír. | Climb half a floor? I don't have the paperwork for that. | chybný pokus P1.6 |
| `ch1_vytah_tlacitko` | Ruda | hrdě | Zacvaknout… a je to. Modernizace výtahu, 1987 až dodnes. Dokončil jsem ji já. | Click... done. The Elevator Modernisation project, 1987 to this day. And I'm the one who finished it. | tlačítko „2“ na výtah ✔ |
| `ch1_vytah_tlacitko_2` | Ruda | samolibě | Za tohle bych měl dostat diplom. | I deserve a certificate for this. | návrat k zdi slávy |
| `ch1_vytah_jet_2` | Ruda | slavnostně | Druhé patro. Starosta. Poprvé po letech tam někdo jede výtahem. | Second floor. The mayor. First time in years anyone's ridden up there. |  |
| `ch1_vytah_dolu` | Ruda | suše | Přízemí. Tam to všechno začíná a končí. Hlavně začíná. | Ground floor. Where everything starts and ends. Mostly starts. | jízda do vestibulu |
| `ch1_hs_schody_nahoru` |  |  | Schody nahoru | Stairs up | popisek aktivního místa |
| `ch1_schody_nahoru_prohlednout` | Ruda | suše | Schody nahoru. Přes ně páska „Ve fázi 2“. Dva schody hotové, zbytek je vize. | Stairs going up. Taped off: 'Phase two'. Two steps finished, the rest is a vision. |  |
| `ch1_schody_nahoru_pouzit` | Ruda | opatrně | Přes pásku nepůjdu. Páska tu unese víc než zábradlí. | I'm not crossing the tape. Round here, tape holds more weight than the railing. | chybný pokus P1.6 |
| `ch1_hs_deska` |  |  | Úřední deska | Notice board | popisek aktivního místa |
| `ch1_deska_prohlednout` | Ruda | čte | Úřední deska: „Komise: úřední hodiny příští fáze.“ Pod tím: „Fáze se nepřesouvají. Odkládají.“ | Notice board: 'Committee: office hours next phase.' Below: 'Phases are not moved. They are deferred.' | náznak Předsedy |
| `ch1_deska_pouzit` | Ruda | smutně | Kdybych sem přišpendlil svůj plán, visel by tu dvacet let a nikdo by ho nečetl. Jako všechno ostatní. | If I pinned my plan up here, it'd hang for twenty years without anyone reading it. Like everything else. |  |
| `ch1_hs_schody_sklep` |  |  | Schody do sklepa | Stairs to the basement | popisek aktivního místa (východ do S3) |
| `ch1_schody_sklep_prohlednout` | Ruda | tajemně | Schody do sklepa. Archiv. Odtud se nic nevrací, jen lístky. | Stairs to the basement. The archive. Nothing comes back from there except index cards. |  |
| `ch1_hs_ven` |  |  | Ven na náměstí | Out to the square | popisek aktivního místa (východ do S1) |
| `ch1_vratny_volba_lumir` | Ruda |  | Kdo je Lumír? | Who's Lumír? | volba dialogu; po zmínce o Lumírovi |
| `ch1_vratny_lumir_1` | Vrátný | ospale | Archivář. Jediný, kdo tu něco dokončuje. | The archivist. The only person here who finishes anything. |  |
| `ch1_vratny_lumir_ruda` | Ruda | zvědavě | Co? | Finishes what? |  |
| `ch1_vratny_lumir_2` | Vrátný | ospale | Lístky. | Index cards. |  |
| `ch1_vratny_jerab_1` | Vrátný | mimochodem | Mimochodem, mám průkaz na jeřáb. Od roku 1994. Ještě nikdy se nepoužil. | By the way, I've got a crane licence. Since 1994. Never been used. | zárodek kap. 2–3; po křížovce |
| `ch1_vratny_jerab_ruda` | Ruda | zmateně | Proč mi to říkáte? | Why are you telling me this? |  |
| `ch1_vratny_jerab_2` | Vrátný | ospale | Nikdo se nikdy nezeptal. | Nobody ever asked. |  |
| `ch1_vratny_dekret` | Vrátný | ospale | Zástupce zástupce. Ten podepíše i jídelní lístek. Hm. | A deputy's deputy. He'd sign a menu. Hm. | dekret na vrátného ★ |
| `ch1_vratny_kavove_pero` | Vrátný | ospale | Půjčit? Ne. Křížovky luštím tužkou. Kdyby se náhodou něco dokončilo, aby to šlo vygumovat. | Lend it to me? No. I do crosswords in pencil. In case something gets finished by mistake and needs rubbing out. | kávové pero na vrátného ★ |
| `ch1_vratny_plakat` | Vrátný | nostalgicky | Archa devadesát čtyři. Tenkrát jsem stál frontu na přihlášky. Pak se fronta rozpustila. | The Ark, ninety-four. Back then I queued for an application form. Then the queue dissolved. | plakát na vrátného ★ |
| `ch1_vratny_tlacitko` | Vrátný | ospale | Tlačítko dvě? Tak to vás čeká starosta. Nebo vy jeho. Spíš vy jeho. | Button two? Then the mayor's expecting you. Or you him. Probably you him. | tlačítko na vrátného ★ |

## Archiv

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `ch1_hs_schody` |  |  | Schody do vestibulu | Stairs to the lobby | popisek aktivního místa (východ do S2; od N7 vedou schody do vestibulu) |
| `ch1_schody_prohlednout` | Ruda | suše | Schody nahoru. Jediná cesta ven, a i ta je ve fázi 2: zábradlí končí v půlce. | Stairs going up. The only way out, and even that's in phase two: the railing stops halfway. |  |
| `ch1_hs_kartoteka` |  |  | Kartotéka | Card index | popisek aktivního místa |
| `ch1_kartoteka_prohlednout` | Ruda | pobaveně | Kartotéka zkrachovalých projektů, seřazená podle plánovaného dokončení. Na každém lístku stojí „příští rok“. | An index of failed projects, sorted by planned completion date. Every card says 'next year'. | zárodek puzzlu kartotéky z kap. 1 |
| `ch1_kartoteka_pouzit_1` | Ruda | čte | Projekt „Modernizace výtahu“, zahájen 1987. Stav: probíhá. Krabice 87/3. | Project 'Elevator Modernisation', started 1987. Status: ongoing. Box 87/3. | číslo krabice pro tlačítko „2“ (P1.6) |
| `ch1_kartoteka_pouzit_2` | Ruda | čte | Projekt „Most přes řeku“, 1974. Poznámka: zapomněli jsme se zeptat rybářů. | Project 'Bridge over the River', 1974. Note: we forgot to ask the fishermen. | karta poučení z návrhu kap. 1 |
| `ch1_kartoteka_pouzit_3` | Ruda | zamyšleně | Kdyby tohle někdo četl dřív, ušetřil by dvacet mostů. | If someone had read this sooner, they'd have saved twenty bridges. |  |
| `ch1_archiv_prichod` | Ruda | uznale | Archiv zkrachovalých projektů. Konečně místo, kde se něco dokončuje: seznamy toho, co se nedokončilo. | The archive of failed projects. Finally, a place where something gets finished: lists of what didn't. | jen při prvním příchodu |
| `postava_lumir` |  |  | Archivář Lumír | Lumír the Archivist |  |
| `ch1_lumir_prohlednout` | Ruda | pobaveně | Archivář Lumír. Svetr z roku 1987 a výraz z roku 1974. | Lumír the archivist. A sweater from 1987 and an expression from 1974. |  |
| `ch1_lumir_stop_1` | Lumír | monotónně | Číslo projektu. | Project number. | bez čísla projektu (P1.4) |
| `ch1_lumir_stop_ruda` | Ruda | sebevědomě | Hned ho budu mít. Teda, budu mít plán, jak ho mít. | I'll have it in a minute. Well, I'll have a plan for having it. |  |
| `ch1_lumir_stop_2` | Lumír | monotónně | Bez čísla tu nejste. Úředně. | Without a number, you're not here. Officially. |  |
| `ch1_lumir_spatne_cislo` | Lumír | monotónně | To je číslo projektu Kašna. Ten je ve fázi 2. | That's the Fountain project number. It's in phase two. | vymyšlené číslo; chybný pokus P1.4 |
| `ch1_lumir_volba_cislo` | Ruda |  | Projekt Archa, číslo 94/017. | The Ark project, number 94/017. | volba dialogu; jen s c1_cislo_projektu |
| `ch1_lumir_volba_vymyslet` | Ruda |  | Projekt Archa, číslo… 12/345? | The Ark project, number... 12/345? | volba dialogu; bez čísla |
| `ch1_lumir_cislo_1` | Lumír | monotónně | Devadesát čtyři lomeno nula sedmnáct. Archa. | Ninety-four slash zero seventeen. The Ark. |  |
| `ch1_lumir_cislo_2` | Lumír | monotónně | Vstupte. Nic tu neposouvejte. Všechno leží přesně tam, kde to skončilo. | Come in. Don't move anything. Everything lies exactly where it ended. | archiv_navstiven |
| `ch1_lumir_plakat` | Lumír | uznale | Originální plakát. Okurkový nádech, ročník devadesát čtyři. Vstupte. | An original poster. Notes of pickle, vintage ninety-four. Come in. | plakát na Lumíra ✔ |
| `ch1_lumir_001` | Lumír | monotónně | Vítejte v archivu. Máme tu všechny projekty, které kdy v Nedostavěnici začaly. Tedy všechny projekty. | Welcome to the archive. We keep every project ever started in Scope Creek. Which is every project. | replika z návrhu kapitoly 1; uvítání |
| `ch1_lumir_volba_krabice` | Ruda |  | Krabici 87/3, prosím. | Box 87/3, please. | volba dialogu; jen po lístku výtahu |
| `ch1_lumir_krabice_1` | Lumír | monotónně | Osmdesát sedm lomeno tři. Modernizace výtahu. | Eighty-seven slash three. Elevator Modernisation. |  |
| `ch1_lumir_krabice_2` | Lumír | monotónně | V krabici je jedno tlačítko. Dvojka. Všechno, co se za ta léta povedlo. | There's one button in the box. Number two. Everything they achieved in all those years. |  |
| `ch1_lumir_krabice_ruda` | Ruda | nadějně | Půjčíte mi ho? | Can I borrow it? |  |
| `ch1_lumir_krabice_3` | Lumír | monotónně | Vezměte si ho. Tlačítka nejsou projekty. Ale dejte ho tam, kam patří. | Take it. Buttons aren't projects. But put it where it belongs. | předmět tlačítko „2“ |
| `ch1_lumir_volba_krabice_bez` | Ruda |  | Můžu dostat nějakou krabici? | Could I have a box? | volba dialogu; před lístkem výtahu |
| `ch1_lumir_krabice_bez` | Lumír | monotónně | Krabice vydávám jen podle čísla. Jako lidi. | I issue boxes by number only. Same as people. | stopa P1.6 |
| `ch1_lumir_volba_kartoteka` | Ruda |  | Jak najdu lístek Archy? | How do I find the Ark's card? | volba dialogu |
| `ch1_lumir_kartoteka_1` | Lumír | monotónně | Kartotéka je seřazená podle plánovaného dokončení. | The index is sorted by planned completion date. |  |
| `ch1_lumir_kartoteka_ruda` | Ruda | suše | A u všech stojí „příští rok“. | And they all say 'next year'. |  |
| `ch1_lumir_kartoteka_2` | Lumír | monotónně | Plány se mění. Data zahájení ne. Ta mám v knize. | Plans change. Start dates don't. I keep those in my ledger. | stopa P1.5 |
| `ch1_lumir_volba_karta` | Ruda |  | Můžu si půjčit to poučení o mostě? | Can I borrow the bridge lesson? | volba dialogu; po přečtení lístku mostu nebo krabičky Poučení |
| `ch1_lumir_karta_1` | Lumír | monotónně | Výpůjčka. Podpis. Čitelný. | Loan slip. Signature. Legible. | P1.7 |
| `ch1_lumir_propiska` | Lumír | monotónně | Tohle není podpis. To je vzpomínka na podpis. | That's not a signature. That's the memory of one. | propiska na Lumíra ★; chybný pokus P1.7 |
| `ch1_lumir_karta_pero_1` | Lumír | monotónně | Hnědý. Ale čitelný. Půjčeno na neurčito. Jako všechno ostatní. | Brown. But legible. Lent indefinitely. Like everything else. | kávové pero na Lumíra ✔; předmět karta poučení |
| `ch1_lumir_karta_pero_2` | Lumír | vážně | Vraťte ji. Je to jediné poučení, které tu máme. | Bring it back. It's the only lesson we've got. |  |
| `ch1_lumir_volba_mapy` | Ruda |  | Co je v tom mapníku? | What's in the map cabinet? | volba dialogu |
| `ch1_lumir_mapy` | Lumír | monotónně | Katastrální mapy. Mapy nejsou projekty. Ty si vezměte. | Land registry maps. Maps aren't projects. Help yourself. |  |
| `ch1_lumir_volba_regal` | Ruda |  | A ten velký regál vzadu? | And that big shelf at the back? | volba dialogu |
| `ch1_lumir_regal` | Lumír | monotónně | Ten nikdo nesmí stěhovat. Rozkaz Komise z roku 1994. Nevím proč. Nikdy jsem se neptal. | Nobody may move that one. Committee order, 1994. I don't know why. I never asked. | stopa P1.12 |
| `ch1_lumir_volba_ty` | Ruda |  | A vy jste někdy něco dokončil? | And you? Ever finished anything? | volba dialogu; odpověď je ch1_lumir_002 |
| `ch1_lumir_002` | Lumír | hrdě | Tenhle lístek jsem dokončil v roce 1998. Dodnes ho mám rád. | I completed this index card in 1998. I'm still rather fond of it. | replika z návrhu kapitoly 1 |
| `ch1_lumir_hrdost_2` | Lumír | něžně | Je na něm překlep. Nechal jsem ho tam, aby bylo vidět, že je skutečný. | There's a typo on it. I left it in, so you can tell it's real. |  |
| `ch1_lumir_volba_konec` | Ruda |  | Děkuju, Lumíre. | Thank you, Lumír. | volba dialogu |
| `ch1_lumir_konec` | Lumír | monotónně | Nic nenechávejte na schodech. Zůstalo by to tam navždy. | Don't leave anything on the stairs. It'd stay there forever. |  |
| `ch1_lumir_vse` | Lumír |  | Všechno, co vím, je v kartotéce. Zbytek není založený. | Everything I know is in the card index. The rest isn't filed. | vyčerpaný dialog (playtest prototypu) |
| `ch1_lumir_dekret` | Lumír | monotónně | Skvrna od kávy, letošní ročník. Číslo pod ní nepřečtu. Mám ji založit? | A coffee stain, this year's vintage. I can't read the number under it. Shall I file it? | dekret na Lumíra ★ |
| `ch1_lumir_kava` | Lumír | zděšeně | Káva v archivu?! Tyhle papíry přežily tři povodně a jednu reorganizaci. | Coffee in the archive?! These papers survived three floods and a reorganisation. | káva na Lumíra ★ |
| `ch1_lumir_pozadavek` | Lumír | uznale | Podepsaný požadavek. Vzácný kus. Až skončí, rád ho založím. | A signed request. A rare specimen. When it's done, I'd be glad to file it. | požadavek na Lumíra ★ |
| `ch1_lumir_zadani` | Lumír | monotónně | Vy jste ho našel. Leželo tam od roku 1994. Já ho jen zakládal. Čtení není moje oddělení. | You found it. It's been there since 1994. I only filed it. Reading isn't my department. | zadání na Lumíra ★ |
| `ch1_lumir_karta_vratit` | Lumír | monotónně | Ještě ne. Poučení se vrací, až když se použije. | Not yet. A lesson only comes back once it's been used. | karta poučení na Lumíra ★ |
| `ch1_kartoteka_razeni_uvod` | Ruda | přemýšlivě | Pět lístků a na všech „příští rok“. Podle čeho je seřadit? | Five cards, all saying 'next year'. How do I sort them? | P1.5, začátek řazení |
| `ch1_listek_most` |  |  | Most přes řeku. Zahájen 1974. Plánované dokončení: příští rok. Pozn.: viz poučení. | Bridge over the River. Started 1974. Planned completion: next year. Note: see lesson. | lístek k řazení |
| `ch1_listek_leseni` |  |  | Lešení radnice. Zahájeno 1986. Pozn.: lešení se stalo součástí stavby. | Town Hall Scaffolding. Started 1986. Note: the scaffolding is now part of the building. | lístek k řazení |
| `ch1_listek_vytah` |  |  | Modernizace výtahu. Zahájena 1987. Krabice 87/3. | Elevator Modernisation. Started 1987. Box 87/3. | lístek k řazení; číslo krabice pro P1.6 |
| `ch1_listek_kasna` |  |  | Voda v kašně. Zahájeno 1994. Fáze 2. | Water in the Fountain. Started 1994. Phase two. | lístek k řazení |
| `ch1_listek_archa` |  |  | Archa. Zahájena 1994. Pozn.: viz zadání. | The Ark. Started 1994. Note: see brief. | lístek k řazení |
| `ch1_kartoteka_abecedne` | Lumír | monotónně | Abecedně? Jsme archiv, ne telefonní seznam. | Alphabetically? We're an archive, not a phone book. | chybný pokus P1.5 |
| `ch1_kartoteka_spatne` | Ruda | zamračeně | Tohle pořadí nedává smysl. Ani podle mých standardů. | That order makes no sense. Not even by my standards. | jiné špatné pořadí |
| `ch1_kartoteka_stejny_rok` | Ruda | přemýšlivě | Kašna i Archa: 1994. Rozhodne měsíc. | Fountain and Ark: both 1994. The month will decide. |  |
| `ch1_kartoteka_hotovo_1` | Ruda | vzrušeně | Podle skutečného data… a za lístkem Archy je složený papír. | By the real start dates... and behind the Ark's card there's a folded sheet. | řešení P1.5 |
| `ch1_kartoteka_hotovo_2` | Lumír | monotónně | Původní zadání. Dal jsem ho tam v devadesátém čtvrtém. Nikdo se nezeptal. | The original brief. I put it there in ninety-four. Nobody asked. | předmět původní zadání |
| `ch1_lumir_priloha_stop` | Lumír | monotónně | Přílohy vydávám jen k lístkům, které jsou na svém místě. | I only issue attachments for cards that are in their proper place. | K1: lístek Archy bez řazení |
| `ch1_hs_kniha` |  |  | Lumírova kniha | Lumír's ledger | popisek aktivního místa |
| `ch1_kniha_prohlednout` | Ruda | uznale | Lumírova kniha skutečných dat zahájení. Jediný dokument ve městě, ve kterém se nic nepřeplánovalo. | Lumír's ledger of actual start dates. The only document in town where nothing got rescheduled. |  |
| `ch1_kniha_pouzit` | Ruda | čte | Most: březen 1974. Lešení: 1986. Výtah: 1987. Archa: květen 1994. Kašna: září 1994. | Bridge: March 1974. Scaffolding: 1986. Elevator: 1987. Ark: May 1994. Fountain: September 1994. | klíč k P1.5 |
| `ch1_hs_regal` |  |  | Regál s krabicemi | Shelf of boxes | popisek aktivního místa |
| `ch1_regal_prohlednout` | Ruda | suše | Krabice s čísly projektů. Kdo nezná číslo, nedozví se nic. Dokonalý systém. | Boxes labelled with project numbers. No number, no answers. A perfect system. |  |
| `ch1_regal_pouzit` | Ruda | opatrně | Krabice vydává Lumír. Kdybych si nějakou vzal sám, založí mě. | Lumír hands out the boxes. If I took one myself, he'd file me. |  |
| `ch1_hs_mapnik` |  |  | Mapník | Map cabinet | popisek aktivního místa |
| `ch1_mapnik_prohlednout` | Ruda | překvapeně | Mapník s katastrálními mapami. Mapy nejsou projekty, takže je tu někdo dokonce aktualizuje. | A cabinet of land registry maps. Maps aren't projects, so someone actually keeps them up to date. |  |
| `ch1_mapnik_vzit` | Ruda | spokojeně | Mapa pozemků kolem rampy. Vezmu si ji. Lumír řekl, že smím. | A map of the plots around the ramp. I'll take it. Lumír said I could. | předmět katastrální mapa |
| `ch1_hs_hluboky_regal` |  |  | Hluboký regál | Deep shelf | popisek aktivního místa |
| `ch1_hluboky_regal_prohlednout` | Ruda | soucitně | Velký regál. Plný šanonů, které nikdo nikdy neotevřel. Znám ten pocit. | A big shelf. Full of binders nobody's ever opened. I know the feeling. | Ruda si přihrádky nevšimne |
| `ch1_hs_pouceni` |  |  | Krabička Poučení | Lessons box | popisek aktivního místa (K2) |
| `ch1_pouceni_prohlednout` | Ruda | pobaveně | Krabička s nápisem „Poučení“. Uvnitř jediná karta. Lumír ji hlídá jako rodinné stříbro. | A box labelled 'Lessons'. One card inside. Lumír guards it like the family silver. | K2: karta poučení je samostatná |
| `ch1_pouceni_pouzit` | Ruda | zamyšleně | Bez výpůjčky mi ji Lumír nedá. A výpůjčka chce podpis. | Lumír won't hand it over without a loan slip. And a loan slip needs a signature. | stopa P1.7 |

## Archiv: úsek za Báru

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `ch1_usek_uvod` | Bára | věcně | Zatímco Ruda stojí ve frontě, ověřím si čísla. Odhady nechám jiným. | While Rudy stands in line, I'll check the numbers. I'll leave the guessing to others. | začátek úseku za Báru |
| `ch1_usek_lumir_1` | Lumír | monotónně, vlídně | Slečna Backlogová. Číslo projektu nepotřebujete. Vy jste ho psala. | Miss Backlog. You don't need a project number. You typed it. |  |
| `ch1_usek_lumir_bara` | Bára | vlídně | Dobrý den, Lumíre. Jen si něco přeměřím. | Hello, Lumír. I just need to re-measure something. |  |
| `ch1_usek_volba_regal` | Bára |  | Kdo smí stěhovat ten velký regál? | Who's allowed to move that big shelf? | volba dialogu |
| `ch1_usek_volba_listek` | Bára |  | Pořád máte ten lístek z roku 1998? | Do you still have that card from 1998? | volba dialogu |
| `ch1_usek_lumir_listek` | Lumír | hrdě | Mám. S překlepem. Vy jediná víte proč. | I do. With the typo. You're the only one who knows why. |  |
| `ch1_usek_lumir_listek_bara` | Bára | s úsměvem | Aby bylo vidět, že je skutečný. | So you can tell it's real. |  |
| `ch1_usek_volba_konec` | Bára |  | Děkuju, Lumíre. | Thank you, Lumír. | volba dialogu |
| `ch1_usek_regal_1` | Bára | zaujatě | Tenhle regál je zvenku delší. | This shelf is longer on the outside. | první prohlédnutí; nápověda P1.12 |
| `ch1_usek_regal_2` | Bára | rozhodně | Zvenku delší než zevnitř. To se dá změřit. | Longer outside than inside. That can be measured. | druhé prohlédnutí; nápověda P1.12 |
| `ch1_usek_regal_odhad` | Bára | opraví se | Odhadem tak třicet centimetrů. Ne. Neodhaduju. | About a foot, at a guess. No. I don't guess. | použít regál bez metru |
| `ch1_usek_regal_mereni_1` | Bára | soustředěně | Zvenku sto dvacet. Zevnitř devadesát. Třicet centimetrů někdo schoval. | Outside: forty-eight inches. Inside: thirty-six. Someone's hiding a foot. | metr na hluboký regál ✔ |
| `ch1_usek_regal_mereni_2` | Bára | tiše | Zadní stěna jde vysunout. Přihrádka. | The back panel slides out. A compartment. |  |
| `ch1_usek_seznam_1` | Bára | čte | Seznam pasažérů Archy, rok 1994. Předseda Věčný s rodinou. Členové Komise s rodinami. | The Ark passenger list, 1994. Chairman Evermore and family. Committee members and families. | předmět seznam pasažérů |
| `ch1_usek_seznam_2` | Bára | chladně | A dál nic. Čtyři tisíce osm set dvanáct lidí, a tady je jich dvacet tři. | And nobody else. Four thousand eight hundred and twelve people, and there are twenty-three on here. | 4812 = počet obyvatel |
| `ch1_usek_seznam_3` | Bára | rozhodně | Tohle si nechám. Dokud nebudu vědět, komu to ukázat. | I'm keeping this. Until I know who to show it to. | c1_seznam_pasazeru |
| `ch1_usek_konec` | Bára | věcně | Hotovo. Zpátky ke kašně, než si toho někdo všimne. | Done. Back to the fountain before anyone notices. | konec úseku za Báru |
| `ch1_usek_odejit` | Bára | rozhodně | Nejdřív to přeměřím. Pak půjdu. | I'll measure it first. Then I'll go. | schody během úseku za Báru (K7) |
| `ch1_usek_kartoteka` | Bára | suše | Plánovaná data dokončení. Nejkrásnější beletrie ve městě. | Planned completion dates. The finest fiction in town. | Bára prohlédne kartotéku |
| `ch1_usek_mapnik` | Bára | věcně | Mapy sedí. Měřila jsem je. | The maps are right. I measured them. | Bára prohlédne mapník |
| `ch1_usek_schody` | Bára | věcně | Zábradlí končí po čtyřech metrech a dvanácti centimetrech. Pořád. | The railing ends after thirteen feet six. Still. | Bára prohlédne schody |
| `ch1_usek_kniha` | Bára | vlídně | Lumírova kniha. Jediná, které tu věřím. | Lumír's ledger. The only book here I trust. | Bára prohlédne knihu |
| `ch1_usek_lumir_prohlednout` | Bára | vlídně | Lumír. Nejpřesnější člověk na radnici. Proto je ve sklepě. | Lumír. The most precise man in the town hall. That's why he's in the basement. | Bára prohlédne Lumíra |
| `predmet_metr` |  |  | Metr | Tape measure | název předmětu (Bára) |
| `predmet_metr_prohlednout` | Bára | láskyplně | Můj metr. Nikdy mi nelhal. Jednou se zasekl, ale to byla moje chyba. | My tape measure. It's never lied to me. It jammed once, but that was my fault. |  |
| `predmet_seznam` |  |  | Seznam pasažérů | Passenger list | název předmětu (Bára) |
| `predmet_seznam_prohlednout` | Bára | chladně | Dvacet tři jmen. Všichni z Komise. Měla bych se zlobit. Zlobím se přesně. | Twenty-three names. All Committee. I ought to be angry. I'm precisely angry. |  |
| `obecne_bara_nelze` | Bára |  | Tohle neměřím. | I don't measure that. | výchozí reakce Báry |
| `obecne_bara_nelze_2` | Bára |  | To by byl jen odhad. Neodhaduju. | That'd just be a guess. I don't guess. | výchozí reakce Báry |
| `obecne_bara_nic_k_videni` | Bára |  | Nic, co by stálo za měření. | Nothing worth measuring. | výchozí reakce Báry |
| `obecne_bara_pouzit_s` | Bára |  | %s a %s? Ne. Fyzika by nesouhlasila. | %s and %s? No. Physics wouldn't agree. | výchozí reakce Báry; %s = předmět, cíl |
| `obecne_bara_vzit` | Bára |  | Nechám to tu. Není to moje a není to změřené. | I'll leave it. It isn't mine and it isn't measured. | výchozí reakce Báry |
| `obecne_bara_mluvit` | Bára |  | Mluví se tu dost. Měří se málo. | There's plenty of talking around here. Not much measuring. | výchozí reakce Báry |

## Starostova pracovna a M03

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `ch1_pracovna_prichod` | Ruda | nasává vzduch | Druhé patro. Vzduch je tu jiný. Voní jako slavnostní projev. | Second floor. The air's different up here. Smells like a ceremonial speech. | jen při prvním příchodu |
| `postava_starosta` |  |  | Starosta Bohumil | Mayor Bohumil |  |
| `ch1_starosta_prohlednout` | Ruda | suše | Starosta Bohumil. Stuha a nůžky vždy po ruce. Kdyby se náhodou něco otevíralo. | Mayor Bohumil. Ribbon and scissors always at hand. In case anything ever opens. |  |
| `ch1_hs_noviny` |  |  | Noviny | Newspaper | popisek aktivního místa |
| `ch1_noviny_prohlednout` | Ruda | čte | Noviny. Na titulní straně starosta u nedokončeného mostu: „Starosta zahájil další etapu!“ | The paper. On the front page, the mayor at an unfinished bridge: 'Mayor Launches Next Stage!' |  |
| `ch1_noviny_pouzit` | Ruda | přemýšlivě | Chce být v novinách. Musím mu dát titulek. Nejlíp takový, který bude pravda. | He wants to be in the papers. I need to give him a headline. Preferably a true one. | nápověda P1.8 |
| `ch1_hs_fotky` |  |  | Fotky na zdi | Photos on the wall | popisek aktivního místa |
| `ch1_fotky_prohlednout` | Ruda | pobaveně | Čtyřicet fotek. Starosta stříhá pásky u čtyřiceti nedokončených staveb. Na každé se usmívá stejně. | Forty photos. The mayor cutting ribbons at forty unfinished buildings. Same smile on every one. |  |
| `ch1_hs_okno` |  |  | Okno | Window | popisek aktivního místa |
| `ch1_okno_prohlednout` | Ruda | suše | Výhled na kometu. Odsud vypadá menší. Starosta si to okno vybíral pečlivě. | A view of the comet. It looks smaller from up here. The mayor chose this window carefully. |  |
| `ch1_starosta_uvod_1` | Starosta | žoviálně | Á, náš nový manažer! Výborně. Potřebuju něco, co bude v novinách. | Ah, our new manager! Splendid. I need something that'll make the papers. |  |
| `ch1_starosta_uvod_ruda` | Ruda | sebevědomě | Potřebuju k Arše váš podpis. | I need your signature for the Ark. |  |
| `ch1_starosta_uvod_2` | Starosta | žoviálně | Podpis? Podpis není titulek. Přesvědčte mě. | A signature? A signature isn't a headline. Convince me. |  |
| `ch1_starosta_volba_souboj` | Ruda |  | (Přesvědčit starostu.) | (Convince the mayor.) | volba dialogu; spustí M03 |
| `ch1_starosta_volba_noviny` | Ruda |  | Proč vám tolik záleží na novinách? | Why do the papers matter so much to you? | volba dialogu |
| `ch1_starosta_noviny_1` | Starosta | vážně | Protože noviny jsou jediné, co v tomhle městě vychází každý den. Včas. | Because the paper is the only thing in this town that comes out every day. On time. |  |
| `ch1_starosta_noviny_2` | Starosta | zasněně | Na fotkách jsem vždycky u začátku. Začátky jsou fotogenické. Konce… ty jsem ještě neviděl. | In the photos I'm always at the beginning. Beginnings are photogenic. Endings... I've never seen one. |  |
| `ch1_starosta_volba_konec` | Ruda |  | Zatím na shledanou. | Goodbye for now. | volba dialogu |
| `ch1_starosta_konec` | Starosta | žoviálně | Vraťte se s titulkem! | Come back with a headline! |  |
| `ch1_pembok_rada_starosta_pred` | Pembok | nápověda | Starosta chce noviny. Dej mu titulek, který je pravda. | The mayor wants headlines. Give him one that's true. | před prvním soubojem (P1.8) |
| `ch1_m03_nazev` |  |  | Souboj argumenty | War of Words | nadpis minihry M03 |
| `ch1_m03_navod` |  |  | Starosta má námitky. Odpověz mu. Pozor: slíbit se dá cokoli. | The mayor has objections. Answer them. Careful: you can promise anything. | návod M03 |
| `ch1_m03_kolo` |  |  | Kolo %d z %d | Round %d of %d | M03 |
| `ch1_m03_k1_namitka` | Starosta | rozhodně | Lidi chtějí výsledky, ne papíry! | People want results, not paperwork! | kolo 1 |
| `ch1_m03_k1_dobra` | Ruda |  | Proto na jeden papír napíšeme, jaký výsledek chtějí. | Exactly. So let's write down, on one page, what result they actually want. | dobrá replika |
| `ch1_m03_k1_rychla` | Ruda |  | Výsledky budou do pátku. | You'll have results by Friday. | rychlá replika, c1_slib_vseho +1 |
| `ch1_m03_k1_slaba` | Ruda |  | Papíry jsou taky výsledek. | Paperwork is a result too. | slabá replika |
| `ch1_m03_k1_dobra_reakce` | Starosta | zaujatě | Jeden papír. To se vejde do novin. | One page. That'll fit in the paper. |  |
| `ch1_m03_k1_rychla_reakce` | Starosta | nadšeně | Do pátku! To je titulek! | By Friday! Now that's a headline! |  |
| `ch1_m03_k1_slaba_reakce` | Starosta | znuděně | S papíry jsem se fotil loni. Nikdo si toho nevšiml. | I had my photo taken with paperwork last year. Nobody noticed. |  |
| `ch1_m03_k2_namitka` | Starosta | rozhodně | Archa musí být největší v kraji! | The Ark must be the biggest in the region! | kolo 2 |
| `ch1_m03_k2_dobra` | Ruda |  | Podle původního zadání má odvézt všechny obyvatele. Velikost z toho vyplyne. | The original brief says it has to carry everyone. The size follows from that. | dobrá replika; jen s původním zadáním |
| `ch1_m03_k2_rychla` | Ruda |  | Bude největší na světě. | It'll be the biggest in the world. | rychlá replika, c1_slib_vseho +1 |
| `ch1_m03_k2_slaba` | Ruda |  | Velikost není všechno. | Size isn't everything. | slabá replika |
| `ch1_m03_k2_dobra_reakce` | Starosta | zaujatě | Všechny? To zní… velkoryse. To se mi líbí. | Everyone? That sounds... generous. I like it. |  |
| `ch1_m03_k2_rychla_reakce` | Starosta | nadšeně | Na světě! Objednám fotografa. | In the world! I'll book a photographer. |  |
| `ch1_m03_k2_slaba_reakce` | Starosta | dotčeně | To říkají ti, co mají malé Archy. | That's what people with small Arks say. |  |
| `ch1_m03_k3_namitka` | Starosta | skepticky | Minule to taky nevyšlo. | It didn't work last time either. | kolo 3 |
| `ch1_m03_k3_dobra` | Ruda |  | Minule se nikdo nezeptal rybářů. My se zeptáme. | Last time nobody asked the fishermen. We will. | dobrá replika; jen s kartou poučení |
| `ch1_m03_k3_rychla` | Ruda |  | Minule jsem tu nebyl já. | Last time you didn't have me. | rychlá replika, c1_slib_vseho +1 |
| `ch1_m03_k3_slaba` | Ruda |  | Minule je minule. | That was then. | slabá replika |
| `ch1_m03_k3_dobra_reakce` | Starosta | zamyšleně | Rybáři… Ti mi pořád píšou dopisy. Možná by přestali. | The fishermen... They still write me letters. Maybe they'd stop. |  |
| `ch1_m03_k3_rychla_reakce` | Starosta | nadšeně | Pravda! Teď tu máme vás. To bude určitě jiné. | True! Now we've got you. That's bound to be different. |  |
| `ch1_m03_k3_slaba_reakce` | Starosta | skepticky | Minule je v archivu. A archiv je plný. | Then is in the archive. And the archive is full. |  |
| `ch1_m03_k4_namitka` | Starosta | podezíravě | Kdo za to ponese odpovědnost? | Who's going to take responsibility? | kolo 4 |
| `ch1_m03_k4_dobra` | Ruda |  | Vy za to proč, já za to jak. | You own the why. I own the how. | dobrá replika |
| `ch1_m03_k4_rychla` | Ruda |  | Já za všechno! | Me. For everything! | rychlá replika, c1_slib_vseho +1 |
| `ch1_m03_k4_slaba` | Ruda |  | Komise. | The Committee. | slabá replika |
| `ch1_m03_k4_dobra_reakce` | Starosta | potěšeně | Já za proč… To zní státnicky. Můžu to říct do rozhlasu? | I own the why... That sounds statesmanlike. Can I say it on the loudspeaker? |  |
| `ch1_m03_k4_rychla_reakce` | Starosta | úlevně | Za všechno! Výborně, to já nerad. | For everything! Splendid, I hate doing that. |  |
| `ch1_m03_k4_slaba_reakce` | Starosta | znuděně | Komise ponese hlavně odklad. | The Committee mostly carries delays. |  |
| `ch1_m03_k5_namitka` | Starosta | skepticky | A jak poznám, že se to povedlo? | And how will I know it worked? | kolo 5 |
| `ch1_m03_k5_dobra` | Ruda |  | Archa unese čtyři tisíce osm set dvanáct lidí a vzlétne. To se dá spočítat. I vyfotit. | The Ark carries four thousand eight hundred and twelve people and lifts off. You can count that. And photograph it. | dobrá replika; jen s c1_bara_kriteria |
| `ch1_m03_k5_rychla` | Ruda |  | Všichni budou nadšení! | Everyone will be thrilled! | rychlá replika, c1_slib_vseho +1 |
| `ch1_m03_k5_slaba` | Ruda |  | Poznáte to. Bude to vidět. | You'll know. It'll be obvious. | slabá replika |
| `ch1_m03_k5_dobra_reakce` | Starosta | nadšeně | Fotka se čtyřmi tisíci lidmi. To bude titulní strana. | A photo with four thousand people. That's a front page. |  |
| `ch1_m03_k5_rychla_reakce` | Starosta | nadšeně | Nadšení! Nadšené občany miluju. | Thrilled! I love a thrilled public. |  |
| `ch1_m03_k5_slaba_reakce` | Starosta | ukáže z okna | Vidět je tu jen kometa. | The only thing that's obvious round here is the comet. |  |
| `ch1_starosta_prohra_1` | Starosta | zklamaně | Ne, ne. Z tohohle titulek nebude. Vraťte se, až budete mít argumenty. | No, no. There's no headline in this. Come back when you've got arguments. | prohra v M03 |
| `ch1_starosta_prohra_ruda` | Ruda | dotčeně | Argumenty mám. Jen jsou ještě ve fázi 2. | I do have arguments. They're just in phase two. |  |
| `ch1_starosta_podpis_1` | Starosta | slavnostně | Dobrá. Podepíšu. Archa pro všechny, do třiceti dnů. Napište to tam. | Very well. I'll sign. An Ark for everyone, within thirty days. Write that down. | výhra v M03; předmět podpis sponzora |
| `ch1_starosta_podpis_2` | Starosta | žoviálně | A teď na Komisi. Jedna a půl patra. Bez jejich razítka je můj podpis jen autogram. | Now off to the Committee. Floor one and a half. Without their stamp, my signature is just an autograph. |  |
| `ch1_starosta_podpis_ruda` | Ruda | zaskočeně | Třicet dní. To je… vlastně termín. Můj první opravdový termín. | Thirty days. That's a... actually, that's a deadline. My first real deadline. | útržek „do kdy“ pro M01 |
| `ch1_starosta_slib_1` | Starosta | nadšeně | Všechno, hned a do pátku! Podepíšu. A přidejte tam fontánu. Na Archu. Na fotkách vypadá dobře. | Everything, right now, by Friday! I'll sign. And add a fountain. On the Ark. Looks great in photos. | výhra se slibem všeho (c1_slib_vseho = 3, R1.1) |
| `ch1_starosta_slib_ruda` | Ruda | polkne | Fontánu. Na Arše. Samozřejmě. | A fountain. On the Ark. Naturally. |  |
| `ch1_starosta_po_podpisu` | Starosta | netrpělivě | Už jste byl na Komisi? Ne? Tak proč tu stojíte? Fotograf přijde až zítra. | Have you been to the Committee yet? No? Then why are you standing here? The photographer's not coming till tomorrow. | rozhovor po podpisu |
| `ch1_starosta_dekret` | Starosta | zmateně | Zástupce zástupce? Toho neznám. Počkat, to je můj podpis. Podepisuju toho hodně. | A deputy's deputy? Never heard of him. Wait, that's my signature. I sign a lot of things. | dekret na starostu ★ |
| `ch1_starosta_kava` | Starosta | odmítavě | Kávu ne. Na fotkách se mi pak třesou ruce. A nůžky. | No coffee. My hands shake in photos. So do the scissors. | káva na starostu ★ |
| `ch1_starosta_kavove_pero` | Starosta | odmítavě | Hnědě nepodepisuju. Hnědá není fotogenická. | I don't sign in brown. Brown isn't photogenic. | kávové pero na starostu ★ |
| `ch1_starosta_plakat` | Starosta | nostalgicky | Archa devadesát čtyři! Tenkrát jsem stříhal pásku. Pak už nebylo co stříhat. | The Ark, ninety-four! I cut the ribbon back then. Then there was nothing left to cut. | plakát na starostu ★ |
| `ch1_starosta_argument` | Starosta | žoviálně | Nechte si to. Přesvědčujte mě nahlas, ne papíry. | Keep it. Convince me out loud, not with paperwork. | zadání nebo karta na starostu mimo M03 |
| `ch1_starosta_podpis_predmet` | Starosta | samolibě | Můj podpis. Krásný. Měl bych ho dávat častěji. | My signature. Gorgeous. I should give it out more often. | podpis sponzora na starostu ★ |

## Kancelář Komise, M01 a M02

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `ch1_komise_prichod` | Ruda | rozhlíží se | Jedna a půl patra. Kancelář Komise. Všechno je tu napůl, kromě fronty. | Floor one and a half. The Committee's office. Everything here is half-done, except the queue. | jen při prvním příchodu |
| `ch1_hs_cedule` |  |  | Cedule | Sign | popisek aktivního místa |
| `ch1_ui_komise_cedule` | cedule |  | Komise pro schvalování komisí. Úřední hodiny: příští fáze. | Committee for Approving Committees. Office hours: next phase. | replika z návrhu kapitoly 1; nápis na ceduli |
| `ch1_cedule_ruda` | Ruda | suše | Úřední hodiny: příští fáze. Aspoň je to upřímné. | Office hours: next phase. Honest, at least. | po přečtení cedule |
| `ch1_hs_fronta` |  |  | Fronta na frontu | Queue for the queue | popisek aktivního místa |
| `ch1_fronta_prohlednout` | Ruda | suše | Fronta na frontu. Stojí se tady, aby se pak mohlo stát tamhle. | The queue for the queue. You stand here so you can stand over there later. |  |
| `ch1_fronta_bez_papiru` | Ruda | odmítavě | Bez papíru nemá smysl stát ve frontě. Ani tady. | No point queuing without the paperwork. Not even here. | fronta před M01 |
| `ch1_ruda_090` | Ruda | ve frontě | Fronta na frontu. Kdyby tohle šlo vyvážet, byli bychom nejbohatší město na světě. | A queue for the queue. If we could export this, we'd be the richest town on earth. | replika z návrhu kapitoly 1 |
| `ch1_fronta_cekani` | Ruda | odevzdaně | Čekám. Mezitím by mohl někdo dělat něco užitečného. Tak to dělá někdo jiný. | Waiting. Someone could be doing something useful in the meantime. So someone else is. | přechod na úsek za Báru |
| `ch1_fronta_konec` | Ruda | vítězoslavně | Jsem na řadě! Ve frontě na frontu. Teď už jen ta fronta. | My turn! In the queue for the queue. Now just the actual queue. | návrat z úseku za Báru |
| `ch1_hs_razitko` |  |  | Razítko a poduška | Stamp and ink pad | popisek aktivního místa |
| `ch1_razitko_prohlednout` | Ruda | suše | Razítko Komise a poduška. Poduška je suchá jako zápis z porady. Na štítku: „Inkoust: fáze 2“. | The Committee's stamp and ink pad. The pad is as dry as meeting minutes. The label says: 'Ink: phase two'. | stopa P1.13 |
| `ch1_razitko_napad` | Ruda | zamyšleně | Něco hnědého a tekutého by tu chtělo… | Something brown and runny would do the trick... | stopa P1.13; po druhém prohlédnutí |
| `ch1_razitko_pouzit` | Ruda | zklamaně | Razítkovat sám nesmím. A i kdyby, poduška je suchá. | I'm not allowed to stamp it myself. And even if I were, the pad is dry. |  |
| `ch1_razitko_kavove_pero` | Ruda | suše | Pero není razítko. I když v tomhle městě by to možná prošlo. | A pen isn't a stamp. Though in this town it might pass. | kávové pero na razítko ★ |
| `ch1_razitko_kava_1` | Ruda | spokojeně | Hnědé a tekuté. Přesně tohle chybělo. | Brown and runny. Just what it needed. | káva na podušku ✔ (c1_razitko = kava) |
| `ch1_predseda_002` | Předseda | nad kávovým razítkem | Hnědé razítko. Platné. Bohužel. | A brown stamp. Valid. Regrettably. | replika z návrhu kapitoly 1 |
| `ch1_razitko_kava_2` | Předseda | mračí se | Pro příště: příští fáze se razítkuje modře. | For future reference: the next phase is stamped in blue. |  |
| `ch1_razitko_kava_brzy` | Ruda | spokojeně | Poduška je mokrá. Teď ještě papír. | The pad's wet. Now I just need the page. | káva na podušku před papírem (K12); pak stačí Předseda |
| `ch1_razitko_poduska_1` | Ruda | hrdě | Poduška od babičky Pozemkové. Šedesát let stará a pořád funguje. | Granny Plotkins' ink pad. Sixty years old and still working. | poduška na razítko ✔ (c1_razitko = poduska) |
| `ch1_razitko_poduska_2` | Předseda | vlídně, ale ostražitě | Modré razítko. Jako za starých časů. Kde jste… ach tak. Pozemková. | A blue stamp. Like the old days. Where did you... ah. Plotkins. |  |
| `ch1_hs_stul` |  |  | Přepážka pro žadatele | Applicants' counter | popisek aktivního místa |
| `ch1_stul_prohlednout` | Ruda | suše | Přepážka pro žadatele. Tady se skládá jeden papír o Arše. Kdo ho nesloží, stojí ve frontě navždy. | The applicants' counter. This is where you put together the one page about the Ark. Without it, you queue forever. |  |
| `ch1_stul_bez_podpisu` | Ruda | zklamaně | Bez podpisu starosty tu nemám co skládat. Je o půl patra výš. | Without the mayor's signature, there's nothing to put together. He's half a floor up. | stůl bez podpisu sponzora |
| `ch1_stul_bez_zadani` | Ruda | přemýšlivě | Pořád nevím, proč se Archa vůbec staví. To bude někde v archivu. | I still don't know why the Ark is being built at all. That'll be somewhere in the archive. | stůl bez původního zadání |
| `ch1_stul_hotovo` | Ruda | spokojeně | Papír je hotový. Už jen razítko. | The page is done. Just needs a stamp. | stůl po M01 |
| `ch1_pembok_m02_vyzva` | Pembok | poučně | Než půjdeš ke Komisi, nakresli si, kdo tu velí. Doopravdy. | Before you face the Committee, sketch out who's in charge here. Really in charge. | u stolu před M02 |
| `ch1_pembok_m02_ruda` | Ruda | sebevědomě | Velím tu já. | I'm in charge. |  |
| `ch1_pembok_m02_2` | Pembok | suše | Tak se tam nakresli. Malého. | Then draw yourself in. Small. |  |
| `ch1_hs_telefon` |  |  | Telefon | Telephone | popisek aktivního místa |
| `ch1_telefon_prohlednout` | Ruda | podezíravě | Předsedův telefon. Bez číselníku. Volá se jen ven, nebo sem jen volají? | The Chairman's telephone. No dial. Does it only call out, or do people only call in? | náznak D44 |
| `ch1_telefon_pouzit` | Ruda | odmítavě | Na cizí telefony nesahám. Na cizí kávu ano, ale to je jiná věc. | I don't touch other people's phones. Other people's coffee, yes, but that's different. |  |
| `postava_predseda` |  |  | Předseda Věčný | Chairman Evermore | anglické jméno schváleno (D47) |
| `ch1_predseda_prohlednout` | Ruda | ostražitě | Předseda Věčný. Vlídný úsměv, který přežil tři starosty. | Chairman Evermore. A kindly smile that has outlasted three mayors. |  |
| `ch1_predseda_uvod_1` | Předseda | vlídně | Vítejte v Komisi pro schvalování komisí. Posaďte se. Nebo stůjte, ve frontě je to jedno. | Welcome to the Committee for Approving Committees. Have a seat. Or stand. In the queue it makes no difference. |  |
| `ch1_predseda_bez_podpisu_ruda` | Ruda | sebevědomě | Jdu kvůli Arše. | I'm here about the Ark. |  |
| `ch1_predseda_bez_podpisu` | Předseda | vlídně | Bez podpisu sponzora vás nemohu zařadit ani do fronty. Natož do fronty na frontu. | Without a sponsor's signature I can't even put you in the queue. Let alone the queue for the queue. | bez podpisu sponzora; není slepá ulička |
| `ch1_predseda_volba_navrh` | Ruda |  | Mám návrh na Archu. | I have a proposal for the Ark. | volba dialogu |
| `ch1_predseda_001` | Předseda | vlídně | Váš návrh je vynikající. Právě proto ho musíme důkladně odložit. | Your proposal is excellent. Which is precisely why it must be thoroughly postponed. | replika z návrhu kapitoly 1 |
| `ch1_predseda_navrh_ruda` | Ruda | zaskočeně | Kam? | Postponed where? |  |
| `ch1_predseda_navrh_2` | Předseda | vlídně | Do příští fáze. Tam je místa dost. | The next phase. There's plenty of room there. |  |
| `ch1_predseda_volba_termin` | Ruda |  | Do kdy to Komise stihne? | When will the Committee be done? | volba dialogu (K5) |
| `ch1_predseda_termin` | Předseda | vlídně | Až to bude. Termíny nás jen zbytečně stresují. | When it's done. Deadlines only cause needless stress. | útržek-nesmysl „Až to bude.“ pro M01 |
| `ch1_predseda_volba_kdo` | Ruda |  | Kdo o Arše vlastně rozhoduje? | Who actually decides about the Ark? | volba dialogu (K5) |
| `ch1_predseda_kdo` | Předseda | vlídně | Komise pro schvalování komisí. Pokud schválí. | The Committee for Approving Committees. Pending approval. | útržek-nesmysl „…pokud schválí“ pro M01 |
| `ch1_predseda_volba_razitko` | Ruda |  | Potřebuju razítko. | I need a stamp. | volba dialogu |
| `ch1_predseda_razitko_bez_papiru` | Předseda | vlídně | Razítko na co? Na prázdný stůl? To jsme dělali v osmdesátých letech. | A stamp on what? An empty desk? We did that in the eighties. | bez papíru o Arše |
| `ch1_predseda_razitko_1` | Předseda | lítostivě | S radostí. Jen… poduška je ve fázi 2. Inkoust objednán v roce 1994. | With pleasure. Only... the ink pad is in phase two. Ink ordered in 1994. | s papírem o Arše |
| `ch1_predseda_razitko_ruda` | Ruda | netrpělivě | A kdy dorazí? | And when will it arrive? |  |
| `ch1_predseda_razitko_2` | Předseda | vlídně | Až skončí fáze 1. | Once phase one is over. |  |
| `ch1_predseda_volba_podpis` | Ruda |  | Nestačí, když se podepíšu? | Can't I just sign it myself? | volba dialogu; chybný pokus P1.13 |
| `ch1_predseda_podpis` | Předseda | vlídně | Podpis bez razítka je jen kresba. Pěkná kresba. | A signature without a stamp is just a drawing. A nice drawing. |  |
| `ch1_predseda_volba_konec` | Ruda |  | Zatím děkuju. | Thanks, for now. | volba dialogu |
| `ch1_predseda_konec` | Předseda | vlídně | Kdykoli. Tedy, v úředních hodinách. | Any time. During office hours, that is. |  |
| `ch1_predseda_vse` | Předseda |  | Vše podstatné bylo řečeno. Zbytek odložíme. | Everything essential has been said. The rest we shall postpone. | vyčerpaný dialog (playtest prototypu) |
| `ch1_predseda_dalsi` | Předseda | vlídně | Další, prosím. Zcela bez spěchu. | Next, please. In no hurry whatsoever. | po frontě na frontu |
| `ch1_predseda_faze_1` | Předseda | až příliš vlídně | Výborně. A ještě maličkost. Dovolil jsem si připsat: „…a následné fáze.“ | Excellent. Just one tiny thing. I've taken the liberty of adding: '...and subsequent phases.' | R1.4 po razítku |
| `ch1_predseda_faze_2` | Předseda | až příliš vlídně | Čistě formálně. Aby Archa měla kam růst. | Purely a formality. So the Ark has room to grow. |  |
| `ch1_predseda_volba_odmitnout` | Ruda |  | Ne. Na papíře je, co Archa má být. Nic dalšího. | No. The page says what the Ark is. Nothing else. | volba R1.4: c1_faze2 = false |
| `ch1_predseda_volba_odmitnout_rozsah` | Ruda |  | Ne. Co do Archy nepatří, je na papíře. Fáze tam nejsou. | No. What's not coming aboard is on the page. Phases aren't coming either. | volba R1.4 s útržkem „co do Archy nepatří“: c1_faze2 = false |
| `ch1_predseda_volba_prijmout` | Ruda |  | Když jen formálně… Tak dobře. | If it's just a formality... Fine. | volba R1.4: c1_faze2 = true |
| `ch1_predseda_odmitnuti` | Předseda | zaskočeně | Jak myslíte. Jste… nezvykle přesný. To tu nemáme rádi. Totiž, máme. Velmi. | As you wish. You're... unusually precise. We don't like that here. That is, we do. Very much. |  |
| `ch1_predseda_prijeti` | Předseda | spokojeně | Vidíte, jak hladce to šlo. Spolupráce je krásná věc. | See how smoothly that went? Cooperation is a beautiful thing. |  |
| `ch1_predseda_klic` | Předseda | slavnostně | Klíč od hangáru. S přáním hladké fáze 2. | The hangar key. Wishing you a smooth phase two. | předmět klíč od hangáru |
| `ch1_predseda_klic_ruda` | Ruda | zmateně | Fáze 1 ještě nezačala. | Phase one hasn't even started. |  |
| `ch1_predseda_klic_2` | Předseda | usměje se | Přesně tak. | Exactly. |  |
| `ch1_predseda_telefon_1` | Předseda | tiše do telefonu | Ano… | Yes... | konec kapitoly, zamlženo (D44) |
| `ch1_predseda_telefon_2` | Předseda | tiše do telefonu | Pustil jsem ho dál… | I let him through... |  |
| `ch1_predseda_telefon_3` | Předseda | tiše do telefonu | Nebojte se. | Don't worry. | pak se zavřou dveře |
| `ch1_predseda_dekret` | Předseda | vlídně | Zástupce zástupce starosty. Výborný úředník. Podepíše cokoli, co mu dám. | The deputy mayor's deputy. A fine official. He'll sign anything I give him. | dekret na Předsedu ★; náznak D44 |
| `ch1_predseda_kava` | Předseda | vlídně | Děkuji, kávu piji až v příští fázi. | Thank you, I only take coffee in the next phase. | káva na Předsedu ★ |
| `ch1_predseda_propiska` | Předseda | vlídně | Prázdná propiska. Klasika. Rozdáváme je všem komisím. | An empty pen. A classic. We issue them to every committee. | propiska na Předsedu ★ |
| `ch1_predseda_kavove_pero` | Předseda | vlídně | Hnědý inkoust? Velmi… tvořivé. Tvořivost odkládáme přednostně. | Brown ink? How very... creative. Creativity gets postponed first. | kávové pero na Předsedu ★ |
| `ch1_predseda_pozadavek` | Předseda | znepokojeně | Pan Změna se rozhodl? Na to bude potřeba komise. | Mr. Change made a decision? That'll need a committee. | požadavek na Předsedu ★ |
| `ch1_predseda_zadani_1` | Předseda | zbledne | Původní zadání? Kde jste… Myslel jsem, že se ztratilo. | The original brief? Where did you... I thought it was lost. | zadání na Předsedu ★; náznak D44 |
| `ch1_predseda_zadani_2` | Předseda | rychle, vlídně | Totiž, výborně. Archiv funguje. To je dobře. Velmi dobře. | I mean, splendid. The archive works. That's good. Very good. |  |
| `ch1_predseda_podpis_predmet` | Předseda | vlídně | Podpis starosty. Výborně. Teď ještě papír, na kterém bude. | The mayor's signature. Splendid. Now you just need a page to put it on. | podpis sponzora na Předsedu ★ |
| `ch1_predseda_poduska` | Předseda | podezíravě | Fungující poduška? Ve městě? To se nestává. | A working ink pad? In this town? That never happens. | poduška na Předsedu ★ |
| `postava_framework` |  |  | Ing. Framework | Dr. Framework | anglické jméno schváleno (D47) |
| `ch1_framework_prohlednout` | Ruda | podezíravě | Muž s kufrem krabic. Na každé stojí, že vyřeší všechno. | A man with a suitcase full of boxes. Each one claims to solve everything. |  |
| `ch1_framework_uvod` | Framework | obchodnicky | Dobrý den! Ing. Framework. Řeším fronty. Za poplatek. | Good day! Dr. Framework. I solve queues. For a fee. |  |
| `ch1_framework_volba_fronta` | Ruda |  | Jak byste vyřešil tuhle frontu? | How would you solve this queue? | volba dialogu; odpověď je ch1_framework_001 |
| `ch1_framework_001` | Framework | obchodnicky | Fronta 2.0! Pořád stejná fronta, ale každé dva týdny jí dáme nové jméno. Zvýší to morálku čekajících o čtyřicet procent. | Queue 2.0! Same queue, but every two weeks we give it a new name. Boosts waiting-room morale by forty percent. | replika z návrhu kapitoly 1 (D63) |
| `ch1_ruda_091` | Ruda | podezíravě | A kdo to změřil? | And who measured that? | replika z návrhu kapitoly 1 |
| `ch1_framework_002` | Framework | uraženě | Měřit? To je tak minulé čtvrtletí. | Measure it? That's so last quarter. | replika z návrhu kapitoly 1 (D63) |
| `ch1_framework_volba_kufr` | Ruda |  | Co máte v kufru? | What's in the suitcase? | volba dialogu |
| `ch1_framework_kufr_1` | Framework | nadšeně | Krabice! „Beton v krabici.“ „Metodika pro kočky.“ „Porada, která se řídí sama.“ | Boxes! 'Concrete in a Box.' 'Methodology for Cats.' 'The Self-Running Meeting.' | zárodek kap. 2 (D63) |
| `ch1_framework_kufr_ruda` | Ruda | skepticky | A funguje to? | And do they work? |  |
| `ch1_framework_kufr_2` | Framework | obchodnicky | Krabice? Výborně. Obsah se dodává ve fázi 2. | The boxes? Beautifully. Contents ship in phase two. |  |
| `ch1_framework_volba_vizitka` | Ruda |  | Máte vizitku? | Do you have a card? | volba dialogu |
| `ch1_framework_vizitka` | Framework | obchodnicky | Samozřejmě. Kdybyste ve fázi 2 potřeboval někoho, kdo ví, jak se to dělá jinde. | Of course. In case, in phase two, you need someone who knows how they do it elsewhere. |  |
| `ch1_framework_vizitka_ruda` | Ruda | zvědavě | Kde jinde? | Where's elsewhere? |  |
| `ch1_framework_vizitka_2` | Framework | sebevědomě | Všude, kde jsem ještě nebyl. | Everywhere I haven't been yet. |  |
| `ch1_framework_volba_konec` | Ruda |  | Nashle. | Bye. | volba dialogu |
| `ch1_framework_konec` | Framework | obchodnicky | Ozvěte se! Fronta 3.0 je na cestě. | Be in touch! Queue 3.0 is on its way. |  |
| `ch1_framework_vse` | Framework |  | Víc vám řeknu jen za poplatek. Ve fázi 2. | Anything more costs extra. In phase two. | vyčerpaný dialog (playtest prototypu) |
| `ch1_framework_dekret` | Framework | obchodnicky | Projektový manažer! Gratuluju. Mám pro vás krabici „Manažer v krabici“. Pak už nebudete potřeba. | Project manager! Congratulations. I've got a 'Manager in a Box' for you. Then you won't be needed. | dekret na Frameworka ★ |
| `ch1_framework_kava` | Framework | povýšeně | Kávu? Piju jen nápoje s certifikátem. | Coffee? I only drink certified beverages. | káva na Frameworka ★ |
| `ch1_framework_kavove_pero` | Framework | nadšeně | Hnědé pero! Z toho by šla udělat metodika. „Hnědé psaní.“ Zapisuju si to. | A brown pen! I could make a methodology out of that. 'Brown Writing.' Noting it down. | kávové pero na Frameworka ★ |
| `ch1_framework_pozadavek` | Framework | povýšeně | Podepsaný požadavek? Zastaralé. Já požadavky mažu každé dva týdny. | A signed request? So outdated. I wipe all requests every two weeks. | požadavek na Frameworka ★ |
| `ch1_framework_papir` | Framework | obchodnicky | Jeden papír? Já bych z toho udělal čtyřicet. Ve dvou barvách. | One page? I'd turn that into forty. In two colours. | papír o Arše na Frameworka ★ |
| `ch1_m01_nazev` |  |  | Jeden papír o Arše | One Page About the Ark | nadpis minihry M01 |
| `ch1_m01_navod` |  |  | Přetáhni útržky do kolonek. Ne všechny útržky dávají smysl. | Drag the scraps into the boxes. Not every scrap makes sense. | návod M01 |
| `ch1_m01_kolonka_cil` |  |  | Proč | Why | kolonka M01 |
| `ch1_m01_kolonka_termin` |  |  | Do kdy | By when | kolonka M01 |
| `ch1_m01_kolonka_kriteria` |  |  | Jak poznáme, že se to povedlo | How we'll know it worked | kolonka M01 |
| `ch1_m01_kolonka_mimo` |  |  | Co na Archu nepatří | What's not coming aboard | kolonka M01 |
| `ch1_m01_kolonka_kdo` |  |  | Kdo rozhoduje | Who decides | kolonka M01 |
| `ch1_m01_utrzek_cil` |  |  | Odvézt všechny obyvatele do bezpečí před dopadem komety. | Get every resident to safety before the comet hits. | dobrý útržek; z původního zadání |
| `ch1_m01_utrzek_cil_nesmysl` |  |  | Aby to bylo hezký. | Make it look nice. | nesmysl; od Pana Změny |
| `ch1_m01_utrzek_termin` |  |  | Start nejpozději 30. den. | Launch by day 30 at the latest. | dobrý útržek; od starosty |
| `ch1_m01_utrzek_termin_nesmysl` |  |  | Až to bude. | When it's done. | nesmysl; od Předsedy (ch1_predseda_termin) |
| `ch1_m01_utrzek_kriteria` |  |  | Archa unese 4 812 lidí a vzlétne. | The Ark carries 4,812 people and actually lifts off. | dobrý útržek; od Báry (c1_bara_kriteria) |
| `ch1_m01_utrzek_kriteria_nesmysl` |  |  | Všichni budou spokojení. | Everyone will be happy. | nesmysl; od Pana Změny |
| `ch1_m01_utrzek_mimo` |  |  | Bazén, vyhlídková terasa, fontána. | Pool, observation deck, fountain. | dobrý útržek; od Báry |
| `ch1_m01_utrzek_mimo_nesmysl` |  |  | Nic, všechno se tam vejde. | Nothing. It'll all fit. | nesmysl; od Rudy |
| `ch1_m01_utrzek_kdo` |  |  | Starosta Bohumil. | Mayor Bohumil. | dobrý útržek; z podpisu sponzora |
| `ch1_m01_utrzek_kdo_nesmysl` |  |  | Komise pro schvalování komisí, pokud schválí. | The Committee for Approving Committees, pending approval. | nesmysl; od Předsedy (ch1_predseda_kdo) |
| `ch1_m01_reakce_dobra` | Ruda | spokojeně | Sedí. | Fits. | útržek ve správné kolonce |
| `ch1_m01_reakce_nesmysl` | Ruda | váhavě | Vejde se to tam. Jen nevím, jestli to tam patří. | It fits. I'm just not sure it belongs. | nesmysl v kolonce |
| `ch1_m01_reakce_spatna_kolonka` | Ruda | zamračeně | Tohle je odpověď na jinou otázku. | That answers a different question. | útržek v nesprávné kolonce |
| `ch1_m01_pembok_kriteria` | Pembok | nápověda | Jak poznáš, že se to povedlo? Někdo ve městě to spočítal. Škoda, žes ho neposlouchal. | How will you know it worked? Someone in town worked that out. Shame you didn't listen. | chybí Bářina kritéria |
| `ch1_m01_hotovo` | Ruda | hrdě | Papír je hotový. Všechno podstatné na jedné straně. | The page is done. Everything that matters, on one side. | c1_charter_kvalita = 3 |
| `ch1_m01_hotovo_slabe` | Ruda | nejistě | Hotovo. Vypadá to jako papír. Na první pohled. | Done. It looks like a proper page. At first glance. | c1_charter_kvalita < 3 |
| `ch1_m02_nazev` |  |  | Kdo tu vlastně velí | Who's Really in Charge | nadpis minihry M02 |
| `ch1_m02_navod` |  |  | Rozmísti postavy. Nahoru ty, kdo můžou Archu zastavit. Doprava ty, komu na ní záleží. | Place the characters. Up top: those who can stop the Ark. To the right: those who care about it. | návod M02 |
| `ch1_m02_osa_vliv` |  |  | Může Archu zastavit | Can stop the Ark | svislá osa M02 (vliv, D26) |
| `ch1_m02_osa_zajem` |  |  | Záleží mu na ní | Cares about it | vodorovná osa M02 (zájem, D26) |
| `ch1_m02_obyvatele` |  |  | Obyvatelé | Residents | karta postavy M02 (vrátný, Lumír a ostatní) |
| `ch1_m02_neznamy` |  |  | Někdo pod rampou? | Someone under the ramp? | karta babičky bez mapy a obojku |
| `ch1_m02_predseda_stred` | Pembok | nápověda | Předseda uprostřed? Jsi si jistý? Vzpomeň si, přes koho všechno musí projít. | The Chairman in the middle? Are you sure? Think about who everything has to go through. | Předseda na špatném místě |
| `ch1_m02_babicka_chybi` | Pembok | nápověda | Pod rampou je něčí pozemek. Kdo by mohl rampu zastavit? | The land under the ramp belongs to somebody. Who could stop the ramp? | babička chybí nebo je neznámá |
| `ch1_m02_malo` | Pembok | nápověda | O téhle postavě víš málo. Promluv si s ní. | You don't know much about this one. Go and talk to them. | postava, se kterou hráč nemluvil |
| `ch1_m02_spatne` | Pembok | nápověda | Takhle to ve městě nechodí. Zkus to znovu. | That's not how this town works. Try again. | jiné špatné umístění |
| `ch1_m02_rada_vliv` | Pembok |  | Podívej se ještě na kartu „%s“. Jde o to, kdo může Archu zastavit. | Take another look at the "%s" card. The question is who can stop the Ark. | M02, 3. a 4. chybný pokus; %s = postava (playtest prototypu) |
| `ch1_m02_rada_zajem` | Pembok |  | Podívej se ještě na kartu „%s“. Jde o to, komu na Arše záleží. | Take another look at the "%s" card. The question is who actually cares about the Ark. | M02, 3. a 4. chybný pokus; %s = postava |
| `ch1_m02_rada_nahoru` | Pembok |  | Kartu „%s“ dej nahoru. Bez ní se Archa nehne. | Put the "%s" card at the top. Without them, the Ark goes nowhere. | M02, od 5. chybného pokusu |
| `ch1_m02_rada_dolu` | Pembok |  | Kartu „%s“ dej dolů. Archu sama nezastaví. | Put the "%s" card at the bottom. They can't stop the Ark on their own. | M02, od 5. chybného pokusu |
| `ch1_m02_rada_doprava` | Pembok |  | Kartu „%s“ dej doprava. Tomu, kdo na ní je, na Arše záleží. | Put the "%s" card on the right. Whoever is on it cares about the Ark. | M02, od 5. chybného pokusu |
| `ch1_m02_rada_doleva` | Pembok |  | Kartu „%s“ dej doleva. Tomu, kdo na ní je, jde o něco jiného než o Archu. | Put the "%s" card on the left. Whoever is on it cares about something other than the Ark. | M02, od 5. chybného pokusu |
| `ch1_m02_hotovo` | Pembok | uznale | Teď víš, s kým mluvit. A koho se ptát. | Now you know who to talk to. And who to ask. | konec M02 |
| `ch1_m02_hotovo_ruda` | Ruda | zvědavě | A kde jsem já? | And where am I? |  |
| `ch1_m02_hotovo_pembok` | Pembok | suše | Ty to kreslíš. To stačí. | You're the one drawing it. That's enough. |  |

## Babiččina chaloupka

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `ch1_chaloupka_prichod` | Ruda | nejistě | Chaloupka pod rampou. Má střechu, okna i dveře. Všechno. Je mi z toho trochu úzko. | A cottage under the ramp. Roof, windows, door. All of it. It makes me slightly nervous. | jen při prvním příchodu |
| `ch1_hs_plot` |  |  | Plot | Fence | popisek aktivního místa |
| `ch1_plot_prohlednout` | Ruda | uznale | Plot. Suť z celého města končí přesně u něj. Jediná hranice, kterou tu kdy někdo dodržel. | A fence. The rubble from the whole town stops exactly at it. The only boundary anyone here has ever respected. |  |
| `ch1_hs_rampa` |  |  | Rampa | Ramp | popisek aktivního místa |
| `ch1_rampa_prohlednout` | Ruda | suše | Rampa. Rovná, do půlky hotová a postavená přímo nad babiččinými rajčaty. | The ramp. Straight, half finished, and built directly over Granny's tomatoes. | zárodek kap. 2; končí ve vzduchu (N3 kap. 2) |
| `ch1_hs_lavicka` |  |  | Lavička | Bench | popisek aktivního místa |
| `ch1_lavicka_prohlednout` | Ruda | užasle | Lavička. Natřená. Natřenou lavičku tohle město nezná. | A bench. Painted. This town has never seen a painted bench. |  |
| `ch1_lavicka_pouzit` | Ruda | odmítavě | Sednout si? Ne, vypadalo by to, že nemám co dělat. | Sit down? No, it'd look like I've got nothing to do. | lavička, babička není spojenec |
| `ch1_hs_ulicka_zpet` |  |  | Ulička na náměstí | Alley to the square | popisek aktivního místa (východ do S1) |
| `postava_babicka` |  |  | Babička Pozemková | Granny Plotkins | anglické jméno schváleno (D47) |
| `ch1_babicka_prohlednout` | Ruda | užasle | Babička na zápraží. Za ní dům, který je hotový. Celý. I se střechou. | An old lady on her porch. Behind her, a house that's finished. All of it. Even the roof. |  |
| `ch1_babicka_uvod` | Babička | suše | Dobrý den, mladej. Zase někdo z radnice? Nebo jen bloudíte? | Afternoon, young man. Another one from the town hall? Or just lost? |  |
| `ch1_babicka_volba_dum` | Ruda |  | Váš dům je opravdu hotový? | Is your house really finished? | volba dialogu; odpověď je ch1_babicka_001 |
| `ch1_babicka_001` | Babička | suše | Mladej, můj dům tu stojí šedesát let. Jediná dokončená stavba ve městě. Proto se mnou nikdo nemluví. Nevědí, co se s hotovou věcí dělá. | Young man, my house has stood here for sixty years. The only finished building in town. That's why nobody talks to me. They don't know how to handle closure. | replika z návrhu kapitoly 1 |
| `ch1_babicka_001_obojek` | Babička | suše | A jestli chcete vědět, komu tady co patří, podívejte se Mourkovi na obojek. Ten kocour má papíry v lepším pořádku než radnice. | And if you want to know who owns what around here, have a look at Marmalade's collar. That cat keeps better paperwork than the town hall. | nápověda k P1.10, jen když hráč nemá mapu a nečetl obojek |
| `ch1_babicka_volba_pradlo` | Ruda |  | Pěkné prádlo. | Nice washing. | volba dialogu |
| `ch1_babicka_pradlo` | Babička | suše | Suší se třetí den. Rampa mi stíní. | Third day drying. The ramp blocks my sun. | stopa: rampa |
| `ch1_babicka_volba_pocasi` | Ruda |  | Jak se máte? | How are you? | volba dialogu |
| `ch1_babicka_pocasi` | Babička | suše | Prší, když nemá, a svítí, když nemá. Jako u vás na radnici. | It rains when it shouldn't and shines when it shouldn't. Like your town hall. |  |
| `ch1_babicka_volba_pozemek` | Ruda |  | Ten pozemek pod rampou je váš? | The land under the ramp, is it yours? | volba dialogu; jen s mapou nebo po obojku |
| `ch1_babicka_mapa` | Ruda | ukazuje mapu | Na mapě stojí, že pozemek pod rampou je váš. | The map says the land under the ramp is yours. | mapa na babičku ✔; pak ch1_babicka_pozemek_1 |
| `ch1_babicka_pozemek_1` | Babička | překvapeně | Konečně se někdo ptá. | Finally, someone asks. |  |
| `ch1_babicka_pozemek_2` | Babička | hořce | Můj. Po tátovi. V devadesátém čtvrtém mi na něj postavili rampu. Nikdo nezazvonil. | Mine. From my father. In ninety-four they built a ramp on it. Nobody rang the bell. |  |
| `ch1_babicka_pozemek_3` | Babička | smutně | Od té doby mi stíní rajčata. Šedesát let pěstuju rajčata a posledních třicet jsou bledá. | Since then it's shaded my tomatoes. Sixty years I've grown tomatoes, and for the last thirty they've been pale. |  |
| `ch1_babicka_volba_vyslechnout` | Ruda |  | (Poslouchat dál.) | (Keep listening.) | volba R1.2: c1_babicka = spojenec |
| `ch1_babicka_volba_spechat` | Ruda |  | Rozumím. Můžete mi rychle něco podepsat? Spěchám. | I see. Could you just sign something quickly? I'm in a hurry. | volba R1.2: c1_babicka = odmitnuta |
| `ch1_babicka_volba_slib` | Ruda |  | Až Archa poletí, dostanete nová rajčata. Slibuju. | When the Ark flies, you'll get new tomatoes. I promise. | volba R1.2: c1_babicka = odmitnuta |
| `ch1_babicka_vyslechnout_1` | Babička | tiše | Nikdo se mě nikdy na nic nezeptal. Ani kudy rampa povede, ani jestli mi nevadí. | Nobody ever asked me anything. Not where the ramp would go, not whether I minded. |  |
| `ch1_babicka_vyslechnout_2` | Babička | věcně | Kdyby se zeptali, řekla bych jim, že o tři metry dál je skála. Tam by stála rovně. | If they'd asked, I'd have told them there's bedrock ten feet over. It would have stood straight there. | souvisí s Bářiným sklonem rampy (kap. 2) |
| `ch1_babicka_vyslechnout_ruda` | Ruda | upřímně | Děkuju. Tohle mi nikdo jiný neřekl. | Thank you. Nobody else told me that. |  |
| `ch1_babicka_vyslechnout_3` | Babička | vlídně | Vy jste první, kdo poslouchal až do konce. Počkejte. | You're the first one who's listened all the way through. Wait here. |  |
| `ch1_babicka_poduska_1` | Babička | něžně | Na lavičce leží razítková poduška. Po manželovi, byl úředník. Jediný, kterému něco fungovalo. Vezměte si ji. | There's an ink pad on the bench. My husband's, he was a clerk. The only one whose things ever worked. Take it. | předmět razítková poduška |
| `ch1_babicka_poduska_2` | Babička | suše | Komisi vyschla ta jejich už v devadesátých letech. Já vím všechno. Jen se mě nikdo neptá. | The Committee's pad dried up back in the nineties. I know everything. Nobody just asks me. |  |
| `ch1_hs_poduska_lavicka` |  |  | Razítková poduška | Ink pad | popisek aktivního místa (poduška na lavičce u chaloupky, D95) |
| `ch1_poduska_lavicka_prohlednout` | Ruda | uznale | Plechová krabička na lavičce. Uvnitř razítková poduška, vlhká a funkční. V tomhle městě zázrak. | A tin box on the bench. An ink pad inside, moist and working. A miracle in this town. | prohlédnout podušku na lavičce |
| `ch1_poduska_lavicka_nesmim` | Ruda | zdrženlivě | Cizí zahrada, cizí poduška. Na tu bych potřeboval svolení majitelky. | Someone else's garden, someone else's ink pad. I'd need the owner's say-so for that. | vzít podušku bez svolení babičky |
| `ch1_poduska_lavicka_babicka` | Babička | ostře | Ruce pryč, mladej. To je po manželovi. | Hands off, young man. That was my husband's. | babička hlídá podušku, dokud Rudu nevyslechne |
| `ch1_poduska_lavicka_vzit` | Ruda | samolibě | S dovolením. Vrátím ji, až bude Archa hotová. Tedy brzy. | With your permission. I'll bring it back once the Ark is finished. So, soon. | vzít podušku se svolením (c1_babicka = spojenec) |
| `ch1_babicka_spechat` | Babička | chladně | Nejdřív buchtu. Pak podpisy. Ale vy na buchtu nemáte čas, že? | Bun first. Signatures later. But you haven't got time for a bun, have you? | pak zavře okno |
| `ch1_babicka_slib` | Babička | chladně | Slibů mám plnou spíž. V zimě jsou k ničemu. | I've a pantry full of promises. They're no use in winter. | pak zavře okno |
| `ch1_babicka_zavreno` | Ruda | zklamaně | Okno je zavřené. Jediná věc v Nedostavěnici, která se zavírá spolehlivě. | The window's shut. The one thing in Scope Creek that closes reliably. | po zavření okna (R1.2): c1_babicka = odmitnuta, okno zůstane zavřené do konce kapitoly |
| `ch1_babicka_volba_kocour` | Ruda |  | Váš kocour se toulá po náměstí. | Your cat wanders around the square. | volba dialogu; jen spojenec |
| `ch1_babicka_kocour` | Babička | láskyplně | Mourek chodí na radnici kontrolovat, jestli už něco dodělali. Vrací se zklamaný. | Marmalade goes to the town hall to check if they've finished anything. Comes back disappointed. |  |
| `ch1_babicka_volba_konec` | Ruda |  | Na shledanou. | Goodbye. | volba dialogu |
| `ch1_babicka_konec` | Babička | suše | Zastavte se. Když budete mít čas poslouchat. | Drop by. When you've got time to listen. |  |
| `ch1_babicka_vse` | Babička |  | Povídali jsme si dost. Rajčata čekají. | We've talked enough. The tomatoes are waiting. | vyčerpaný dialog (playtest prototypu) |
| `ch1_lavicka_buchta_1` | Babička | vlídně | Sedněte si. Buchtu? Povidlová. Upečená podle plánu a hotová včas. | Sit down. A bun? Plum jam. Baked to plan and ready on time. | lavička, jen spojenec |
| `ch1_lavicka_buchta_ruda` | Ruda | dojatě | Tohle je první dokončená věc, kterou jsem kdy jedl. | This is the first finished thing I've ever eaten. |  |
| `ch1_babicka_dekret` | Babička | suše | Projektový manažer? Těch tu bylo. Jeden mi jednou zalil rajčata betonem. | Project manager? We've had plenty. One of them watered my tomatoes with concrete. | dekret na babičku ★ |
| `ch1_babicka_kava` | Babička | odmítavě | Kafe ne. Mám vlastní, z cikorky. Šedesát let pořád stejné a pořád chutná. | No coffee. I brew my own, from chicory. Sixty years the same, still tastes fine. | káva na babičku ★ |
| `ch1_babicka_karta` | Babička | ožije | Most přes řeku! Můj táta byl rybář. Nadával na něj až do smrti. | The river bridge! My father was a fisherman. He cursed that bridge till the day he died. | karta poučení na babičku ★ |

## Nápovědy Prof. Pemboka

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `ch1_pembok_rada_vratny` | Pembok | nápověda | Dekret podepsal zástupce zástupce. Kdo tu doopravdy rozhoduje, ví ten, kdo celý den sedí u dveří. | Your letter was signed by a deputy's deputy. Who really decides here? Ask the man who sits by the door all day. | nápověda: vrátný |
| `ch1_pembok_rada_bara` | Pembok | nápověda | Lidé, kteří měří, většinou vědí víc než lidé, kteří slibují. Ta žena u kašny měří. | People who measure usually know more than people who promise. The woman by the fountain is measuring. | nápověda: Bára |
| `ch1_pembok_rada_stanek` | Pembok | nápověda | Číslo projektu nemusí znát jen lidé. Prohlédni si pořádně ten stánek. | People aren't the only things that remember project numbers. Take a good look at that stall. | nápověda: plakát |
| `ch1_pembok_rada_zmena_1` | Pembok | nápověda | Kdo mění názor každou minutu, potřebuje jediné: aby mu ho někdo zapsal a dal podepsat. | Someone who changes his mind every minute needs one thing: to have it written down and signed. | nápověda: Pan Změna, 1. stupeň |
| `ch1_pembok_rada_zmena_2` | Pembok | nápověda | Prázdná propiska nepíše. Ale v hrnku máš něco hnědého a tekutého. | An empty pen won't write. But there's something brown and runny in your mug. | nápověda: Pan Změna, 2. stupeň |
| `ch1_pembok_rada_zmena_3` | Pembok | nápověda | Máš čím psát. Tak Panu Změnovi jeho přání zapiš, dřív než si ho rozmyslí. | You've got something to write with. So write down Mr. Change's wish before he changes it. | nápověda: Pan Změna, kávové pero |
| `ch1_pembok_rada_archiv` | Pembok | nápověda | Číslo máš. Archiv je ve sklepě radnice. Kde jinde by město schovávalo svoje chyby? | You've got the number. The archive is in the town hall basement. Where else would a town hide its mistakes? | nápověda: archiv |
| `ch1_pembok_rada_vratny_1` | Pembok | nápověda | Kdo podepsal tvůj dekret? A rozhoduje vůbec o něčem? | Who signed your letter? And does he decide anything at all? | P1.1, 1. stupeň; 2. stupeň je ch1_pembok_rada_vratny |
| `ch1_pembok_rada_vratny_3` | Pembok | nápověda | Zeptej se vrátného ve vestibulu radnice, kdo rozhoduje o Arše. | Ask the porter in the town hall lobby who decides about the Ark. | P1.1, 3. stupeň |
| `ch1_pembok_rada_bara_2` | Pembok | nápověda | Bára ti chce něco říct. Jen to ještě nikdo nevydržel poslouchat. | Barb's trying to tell you something. Nobody's ever lasted long enough to hear it. | P1.2, 2. stupeň; 1. stupeň je ch1_pembok_rada_bara |
| `ch1_pembok_rada_bara_3` | Pembok | nápověda | Promluv s Bárou a tentokrát ji nech domluvit. Celou větu. Všechny tři. | Talk to Barb and let her finish this time. The whole sentence. All three of them. | P1.2, 3. stupeň |
| `ch1_pembok_rada_bara_prerusena` | Pembok | nápověda | Bára ti už nic neřekne. Zkus to jinak: Pan Změna má na stánku něco s číslem. | Barb's done talking to you. Try another way: Mr. Change has something with a number on his stall. | P1.2 po přerušení Báry |
| `ch1_pembok_rada_archiv_1` | Pembok | nápověda | Archiv má svá pravidla. Lumír taky. | The archive has rules. So does Lumír. | P1.4, 1. stupeň |
| `ch1_pembok_rada_archiv_2` | Pembok | nápověda | Bez čísla projektu tě Lumír nepustí. To na dekretu je pod kávou. | Lumír won't let you in without a project number. The one on your letter is under coffee. | P1.4, 2. stupeň; 3. stupeň podle stavu: ch1_pembok_rada_bara, ch1_pembok_rada_stanek, ch1_pembok_rada_archiv |
| `ch1_pembok_rada_kartoteka_1` | Pembok | nápověda | Kartotéka lže. Plány tu lhaly vždycky. | The card index lies. Plans here always have. | P1.5, 1. stupeň |
| `ch1_pembok_rada_kartoteka_2` | Pembok | nápověda | Kdy projekty doopravdy začaly? To jediné se přeplánovat nedá. | When did the projects actually start? That's the one thing you can't reschedule. | P1.5, 2. stupeň |
| `ch1_pembok_rada_kartoteka_3` | Pembok | nápověda | Seřaď lístky podle Lumírovy knihy skutečných dat zahájení. | Sort the cards by the real start dates in Lumír's ledger. | P1.5, 3. stupeň |
| `ch1_pembok_rada_tlacitko_1` | Pembok | nápověda | Výtahy se tu modernizují dlouho. | Elevators get modernised slowly around here. | P1.6, 1. stupeň |
| `ch1_pembok_rada_tlacitko_2` | Pembok | nápověda | V archivu je projekt Modernizace výtahu. Co v té krabici asi zbylo? | There's an Elevator Modernisation project in the archive. What might be left in its box? | P1.6, 2. stupeň |
| `ch1_pembok_rada_tlacitko_3` | Pembok | nápověda | Najdi v kartotéce číslo krabice výtahu a řekni si o ni Lumírovi. | Find the elevator box number in the card index and ask Lumír for it. | P1.6, 3. stupeň |
| `ch1_pembok_rada_karta_1` | Pembok | nápověda | Most přes řeku stojí za zapamatování. Lumír ti tu kartu půjčí. Formálně. | The bridge over the river is worth remembering. Lumír will lend you that card. Formally. | P1.7, 1. stupeň |
| `ch1_pembok_rada_karta_2` | Pembok | nápověda | Výpůjčka chce podpis. Potřebuješ něco, co opravdu píše. | A loan needs a signature. You need something that actually writes. | P1.7, 2. stupeň; 3. stupeň je ch1_pembok_rada_zmena_2 |
| `ch1_pembok_rada_starosta_1` | Pembok | nápověda | Chybí ti argumenty. | You're short on arguments. | P1.8, 1. stupeň (po prohře) |
| `ch1_pembok_rada_starosta_2` | Pembok | nápověda | Co víš o tom, proč Archa vůbec vznikla? A o mostu z roku 1974? | What do you know about why the Ark exists at all? Or about the bridge from 1974? | P1.8, 2. stupeň |
| `ch1_pembok_rada_starosta_3_zadani` | Pembok | nápověda | Původní zadání Archy je v archivu, za lístkem v kartotéce. | The Ark's original brief is in the archive, behind a card in the index. | P1.8, 3. stupeň: chybí zadání |
| `ch1_pembok_rada_starosta_3_karta` | Pembok | nápověda | Kartu o mostě ti Lumír půjčí, když se podepíšeš. | Lumír will lend you the bridge card if you sign for it. | P1.8, 3. stupeň: chybí karta |
| `ch1_pembok_rada_starosta_3_bara` | Pembok | nápověda | Bára spočítala, kolik lidí musí Archa unést. Škoda, že jsi ji nenechal domluvit. | Barb worked out how many people the Ark has to carry. Shame you didn't let her finish. | P1.8, 3. stupeň: chybí Bářina čísla |
| `ch1_pembok_rada_babicka_1` | Pembok | nápověda | Na té mapě je jméno. | There's a name on that map. | P1.10, 1. stupeň |
| `ch1_pembok_rada_babicka_2` | Pembok | nápověda | Pozemek pod rampou je něčí. A ten někdo možná ani neví, že na něm záleží. | The land under the ramp belongs to someone. Someone who may not know they matter. | P1.10, 2. stupeň |
| `ch1_pembok_rada_babicka_3` | Pembok | nápověda | Zajdi uličkou k rampě za babičkou Pozemkovou. A poslouchej ji. | Head down the alley to the ramp and visit Granny Plotkins. And listen to her. | P1.10, 3. stupeň |
| `ch1_pembok_rada_papir_1` | Pembok | nápověda | Komise chce jeden papír. Proč, pro koho a do kdy. | The Committee wants one page. Why, for whom and by when. | P1.11, 1. stupeň |
| `ch1_pembok_rada_papir_2` | Pembok | nápověda | Podpis starosty i zadání z archivu už máš. Zastav se u přepážky pro žadatele. | You've got the mayor's signature and the brief from the archive. Stop by the applicants' counter. | P1.11, 2. stupeň |
| `ch1_pembok_rada_papir_3` | Pembok | nápověda | U přepážky pro žadatele slož papír z útržků, které jsi posbíral. | At the applicants' counter, put the page together from the scraps you've collected. | P1.11, 3. stupeň |
| `ch1_pembok_rada_fronta` | Pembok | nápověda | Papír máš. Teď se postav do fronty. Do té před frontou. | You've got the page. Now join the queue. The one before the queue. | P1.11 po M01 |
| `ch1_pembok_rada_razitko_1` | Pembok | nápověda | Razítko bez barvy nic neorazítkuje. | A stamp without ink stamps nothing. | P1.13, 1. stupeň |
| `ch1_pembok_rada_razitko_2` | Pembok | nápověda | Co máš u sebe hnědého a tekutého? | What have you got on you that's brown and runny? | P1.13, 2. stupeň (cesta kávou) |
| `ch1_pembok_rada_razitko_2_babicka` | Pembok | nápověda | Kdo ve městě má něco dokončeného? Třeba i fungující podušku. | Who in this town has anything finished? A working ink pad, maybe. | P1.13, 2. stupeň (cesta poduškou), když c1_babicka = odhalena nebo prehlizena |
| `ch1_pembok_rada_razitko_2_poduska` | Pembok | nápověda | Máš babiččinu podušku. Razítko ji bude mít rádo. | You've got Granny's ink pad. The stamp will love it. | P1.13, 2. stupeň: spojenec s poduškou (K9) |
| `ch1_pembok_rada_razitko_2_lavicka` | Pembok | nápověda | Babička ti nabídla svou podušku. Leží u ní na lavičce. | Granny offered you her ink pad. It's lying on her bench. | P1.13, 2. stupeň: spojenec, ale poduška ještě leží na lavičce |
| `ch1_pembok_rada_razitko_3` | Pembok | nápověda | Polij tu vyschlou podušku kávou. | Pour your coffee on that dried-up ink pad. | P1.13, 3. stupeň |
| `ch1_pembok_rada_nic` | Pembok | suše | Teď nevím o ničem, co by ti chybělo. Kromě plánu. | Right now I can't think of anything you're missing. Apart from a plan. | není co radit |

## Předměty a kombinace

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `predmet_propiska` |  |  | Propiska bez inkoustu | Empty pen | název předmětu |
| `predmet_propiska_prohlednout` | Ruda | suše | Propiska bez inkoustu. Podepíše cokoli, ale nic nezůstane. | An empty pen. It'll sign anything, but nothing sticks. |  |
| `predmet_kava` |  |  | Hrnek kávy | Mug of coffee | název předmětu |
| `predmet_kava_prohlednout` | Ruda | láskyplně | Hrnek kávy. Jediný zdroj energie, který v tomhle městě funguje. | A mug of coffee. The only energy source in this town that actually works. |  |
| `predmet_kavove_pero` |  |  | Kávové pero | Coffee pen | název předmětu |
| `predmet_kavove_pero_prohlednout` | Ruda | spokojeně | Propiska namočená v kávě. Píše hnědě a voní jako porada. | A pen dipped in coffee. Writes in brown and smells like a status meeting. |  |
| `predmet_dekret` |  |  | Jmenovací dekret | Letter of appointment | název předmětu |
| `predmet_dekret_prohlednout` | Ruda | hrdě | Můj jmenovací dekret. Projektový manažer Archy. Podepsal zástupce zástupce starosty a číslo projektu je pod kávou. | My letter of appointment. Project manager of the Ark. Signed by the deputy deputy mayor, and the project number is under a coffee stain. |  |
| `ch1_dekret_kava` | Ruda | smutně | Víc kávy ho nezachrání. Číslo je pod skvrnou natrvalo. | More coffee won't save it. The number's under that stain for good. | dekret + káva |
| `predmet_pembok` |  |  | Prof. Pembok | Prof. Pembok | název předmětu |
| `predmet_pembok_prohlednout` | Ruda | provinile | Prof. Pembok, mluvící kniha o řízení projektů. Dostal jsem ji k narozeninám a nikdy ji neotevřel. | Prof. Pembok, a talking book on project management. A birthday present I never opened. |  |
| `predmet_plakat` |  |  | Plakát Archy | Ark poster | název předmětu |
| `predmet_plakat_prohlednout` | Ruda | nostalgicky | Plakát Archy z roku 1994. Raketa, nadšení a číslo projektu 94/017. Voní okurkami. | An Ark poster from 1994. A rocket, enthusiasm and project number 94/017. Smells of pickles. |  |
| `predmet_pozadavek` |  |  | Požadavek Pana Změny | Mr. Change's request | název předmětu |
| `predmet_pozadavek_prohlednout` | Ruda | hrdě | „Archa. Modrá.“ Podepsáno kávou. Jediné rozhodnutí v dějinách města. | 'Ark. Blue.' Signed in coffee. The only decision in the town's history. |  |
| `predmet_tlacitko` |  |  | Tlačítko „2“ | Button '2' | název předmětu |
| `predmet_tlacitko_prohlednout` | Ruda | uznale | Tlačítko s dvojkou. Výsledek projektu, který běží od roku 1987. | A button marked 2. The entire output of a project running since 1987. |  |
| `predmet_zadani` |  |  | Původní zadání Archy | The Ark's original brief | název předmětu |
| `predmet_zadani_prohlednout` | Ruda | čte | „Archa odveze všechny obyvatele. Rampa a trup: výkresy hotové, schváleno 1994. Řídicí systém a kajuty: dopracuje se podle potřeb obyvatel.“ | 'The Ark will carry all residents. Ramp and hull: drawings complete, approved 1994. Control system and cabins: to be worked out with the residents.' | zárodek rozdělení Archy (kap. 2) |
| `predmet_zadani_prohlednout_2` | Ruda | vážně | Všechny. Ne polovinu. Ne Komisi. Všechny. | Everyone. Not half. Not the Committee. Everyone. |  |
| `predmet_karta` |  |  | Karta poučení | Lesson card | název předmětu |
| `predmet_karta_prohlednout` | Ruda | čte | „Most přes řeku, 1974. Poučení: zapomněli jsme se zeptat rybářů.“ Jediné poučení v archivu. Ostatní se ztratila. | 'Bridge over the River, 1974. Lesson: we forgot to ask the fishermen.' The only lesson in the archive. The others got lost. |  |
| `predmet_mapa` |  |  | Katastrální mapa | Land registry map | název předmětu |
| `predmet_mapa_prohlednout` | Ruda | zaujatě | Mapa pozemků. Pod rampou je parcela s poznámkou „Pozemková“. Někdo bydlí přímo pod Archou. | A map of the plots. Under the ramp, one is marked 'Plotkins'. Someone lives right under the Ark. | P1.9, P1.10 |
| `predmet_poduska` |  |  | Razítková poduška | Ink pad | název předmětu |
| `predmet_poduska_prohlednout` | Ruda | uznale | Babiččina razítková poduška. Modrá, vlhká a funkční. Ve městě unikát. | Granny's ink pad. Blue, moist and working. A rarity in this town. |  |
| `predmet_podpis` |  |  | Podpis sponzora | Sponsor's signature | název předmětu |
| `predmet_podpis_prohlednout` | Ruda | čte | Starostův podpis a pod ním: „Archa pro všechny, do třiceti dní.“ | The mayor's signature, and below: 'An Ark for everyone, within thirty days.' | c1_slib_vseho < 3 |
| `predmet_podpis_prohlednout_slib` | Ruda | čte, polkne | Starostův podpis a pod ním: „Všechno, hned, do pátku. A fontána.“ | The mayor's signature, and below: 'Everything, now, by Friday. Plus a fountain.' | c1_slib_vseho = 3 |
| `predmet_papir` |  |  | Papír o Arše | The Ark Page | název předmětu; charter (slovo se ve hře nepoužívá, D26) |
| `predmet_papir_prohlednout` | Ruda | hrdě | Papír o Arše: proč, pro koho, do kdy a co na Archu nepatří. Poprvé se tu něco vešlo na jednu stranu. | The Ark Page: why, for whom, by when, and what's not coming aboard. A first for this town: it fits on one side. |  |
| `predmet_klic` |  |  | Klíč od hangáru | Hangar key | název předmětu |
| `predmet_klic_prohlednout` | Ruda | vážně | Klíč od hangáru s Archou. Těžký, rezavý a skutečný. Jako odpovědnost. | The key to the Ark's hangar. Heavy, rusty and real. Like responsibility. |  |
| `ch1_kombinace_plakat_dekret` | Ruda | suše | Plakát a dekret. Oba o Arše, jeden od okurky, druhý od kávy. Archiv by měl radost. | The poster and the letter. Both about the Ark, one pickled, one coffee-stained. The archive would be thrilled. | plakát + dekret ★ |
| `ch1_kombinace_pozadavek_pembok` | Pembok | uznale | Zapsané a podepsané přání. Tohle bys měl dělat častěji. U každého přání. | A written, signed request. You should do that more often. With every request. | požadavek + Pembok ★; zárodek kap. 3 |
| `ch1_kombinace_karta_pembok` | Pembok | povzdechne | Poučení z minulosti. Kdyby je lidé četli dřív, než postaví most, a ne potom. | A lesson from the past. If only people read these before building the bridge, not after. | karta poučení + Pembok ★ |
| `ch1_kombinace_kava_pembok` | Pembok | vyděšeně | Jestli mě poliješ, budu mít skvrnu v kapitole o rozpočtu. Zase. | Spill that on me and there'll be a stain on the budget chapter. Again. | káva + Pembok ★ |

## Konec kapitoly

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `ch1_konec_ruda_1` | Ruda | hrdě, pak zaváhá | Klíč od hangáru. Mám ho. Fáze 1 je… vlastně ještě nezačala. | The hangar key. Got it. Phase one is... actually, it hasn't started yet. | konec, krok 2 (náměstí) |
| `ch1_konec_kometa` | Ruda | vzhlédne | Kometa je zase o kousek větší. Já taky. Trochu. | The comet's a little bigger again. So am I. A bit. |  |
| `ch1_konec_ruda_2` | Ruda | odhodlaně | Zítra hangár. Mám plán. Teda, budu mít plán. | Tomorrow, the hangar. I have a plan. Well, I'll have a plan. | návrat k ch1_ruda_002 |
| `ch1_pamet_nadpis` |  |  | Co si Nedostavěnice zapamatovala | What Scope Creek Remembers | obrazovka následků, konec kap. 1 |
| `ch1_pamet_bara_3` |  |  | Bára si pamatuje, že jsi ji nechal domluvit. | Barb remembers that you let her finish. | c1_bara_vyslechnuta = 3 |
| `ch1_pamet_bara_castecne` |  |  | Bára si pamatuje, že jsi ji poslouchal. Napůl. | Barb remembers that you listened. Halfway. | c1_bara_vyslechnuta = 1–2 |
| `ch1_pamet_bara_0` |  |  | Bára si pamatuje, že jsi jí skočil do řeči. | Barb remembers that you cut her off. | c1_bara_vyslechnuta = 0 |
| `ch1_pamet_slib_0` |  |  | Starosta věří, že Archa poveze všechny. Tak, jak jsi mu to vysvětlil. | The mayor believes the Ark will carry everyone. Just as you explained it. | c1_slib_vseho < 3 |
| `ch1_pamet_slib` |  |  | Starosta si pamatuje, že jsi slíbil všechno. Do pátku. I s fontánou. | The mayor remembers you promised everything. By Friday. Fountain included. | c1_slib_vseho = 3 |
| `ch1_pamet_babicka_spojenec` |  |  | Babička Pozemková si pamatuje, že ses jí zeptal. | Granny Plotkins remembers that you asked her. | c1_babicka = spojenec |
| `ch1_pamet_babicka_prehlizena` |  |  | Babička čeká, jestli se ještě někdo zastaví. | Granny's still waiting to see if anyone will stop by. | c1_babicka = prehlizena |
| `ch1_pamet_babicka_neodhalena` |  |  | Pod rampou někdo bydlí. Zatím o tom nevíš. | Someone lives under the ramp. You don't know that yet. | c1_babicka = neodhalena |
| `ch1_pamet_babicka_potkana` |  |  | Babičku pod rampou jsi potkal. Čí je pozemek pod rampou, ses nezeptal. | You met the granny under the ramp. Whose land the ramp stands on, you never asked. | c1_babicka = neodhalena a hráč s babičkou mluvil |
| `ch1_pamet_babicka_odmitnuta` |  |  | Babička si pamatuje, že jsi spěchal. | Granny remembers that you were in a hurry. | c1_babicka = odmitnuta (K6) |
| `ch1_pamet_faze2_ne` |  |  | Předseda si pamatuje, že jsi nepřipsal „následné fáze“. | The Chairman remembers that you didn't add 'subsequent phases'. | c1_faze2 = false |
| `ch1_pamet_faze2_ano` |  |  | Předseda si pamatuje, že jsi podepsal „…a následné fáze“. | The Chairman remembers that you signed '...and subsequent phases'. | c1_faze2 = true |
| `ch1_pamet_zmena` |  |  | Pan Změna si poprvé v životě za něčím stojí. Za modrou. | For the first time in his life, Mr. Change stands by something. Blue. | c1_zmena_dohoda |
| `ch1_pamet_razitko_kava` |  |  | Razítko Komise je hnědé. Předseda na to nezapomene. | The Committee's stamp is brown. The Chairman won't forget. | c1_razitko = kava |
| `ch1_pamet_seznam` |  |  | Bára má seznam, o kterém Ruda neví. | Barb has a list Rudy doesn't know about. | c1_seznam_pasazeru |
| `ch1_pamet_pokracovani` |  |  | Pokračování příště. | To be continued. |  |

## Výchozí reakce, postavy a GUI

| ID | Kdo | Emoce | Čeština | English | Poznámka |
|---|---|---|---|---|---|
| `postava_ruda` |  |  | Ruda Gantt | Rudy Gantt | anglické jméno schváleno (D47) |
| `postava_pan_zmena` |  |  | Pan Změna | Mr. Change | anglické jméno schváleno (D47) |
| `obecne_nelze` | Ruda |  | S tím nic neudělám. | I can't do anything with that. | výchozí reakce |
| `obecne_pouzit_s` | Ruda |  | %s a %s? To nedává smysl ani podle mých standardů. | %s and %s? That doesn't make sense, even by my standards. | výchozí reakce; %s = předmět, cíl |
| `obecne_nic_k_videni` | Ruda |  | Nic zvláštního. | Nothing special. | výchozí reakce |
| `postava_rozhlas` |  |  | Městský rozhlas | Town loudspeaker | hlas z amplionu na náměstí (úvod, I6) |
| `postava_veritel` |  |  | Věřitel | Creditor | hlasy za dveřmi Rudova bytu (úvod, I6) |
| `postava_bara` |  |  | Bára Backlogová | Barb Backlog | anglické jméno schváleno (D47) |
| `postava_vratny` |  |  | Vrátný | Porter |  |
| `postava_pembok` |  |  | Prof. Pembok | Prof. Pembok | mluvící kniha; jméno je narážka na PMBOK |
| `postava_kocour` |  |  | Kocour | Tomcat | jméno Mourek / Marmalade zná hráč až z obojku |
| `obecne_nelze_2` | Ruda |  | Ne. Ani kdyby na tom závisel termín. | No. Not even if the deadline depended on it. | výchozí reakce |
| `obecne_nelze_3` | Ruda |  | To nechám na fázi 2. | I'll leave that for phase two. | výchozí reakce |
| `obecne_nelze_4` | Ruda |  | Kdyby to šlo, už by to tu někdo začal a nedokončil. | If that were possible, someone here would have started it and never finished. | výchozí reakce |
| `obecne_vzit` | Ruda |  | To se mi do kapes nevejde. A to mám kapsy na celý plán. | That won't fit in my pockets. And my pockets hold an entire plan. | výchozí reakce na sebrat |
| `obecne_mluvit` | Ruda |  | Mluvit s tím? Na poradách jsem měl horší posluchače. | Talk to it? I've had worse audiences in meetings. | výchozí reakce na mluvit |
| `obecne_vse_receno` | Ruda |  | Všechno podstatné už jsme si řekli. | We've covered everything that matters. | výchozí reakce: vyčerpaný dialog (playtest prototypu) |
| `obecne_nic_k_videni_2` | Ruda |  | Vypadá to přesně tak, jak to vypadá. | It looks exactly like it looks. | výchozí reakce na prohlédnout |
| `obecne_pouzit_s_2` | Ruda |  | %s a %s? Ne. Na prezentaci by to nevypadalo dobře. | %s with %s? No. That wouldn't even look good on a slide. | výchozí reakce; %s = předmět, cíl |
| `ch1_ui_kapitola` |  |  | Kapitola 1: Podepište tady | Chapter 1: Sign Here | titulek kapitoly; návrh, D26 (místo „Iniciace“) |
| `ch1_ui_kometa_dny` |  |  | Dnů do dopadu komety: %d | Days until impact: %d | počítadlo dnů |
| `ch1_ui_ukol` |  |  | Úkol: podpis starosty a razítko Komise | Goal: the mayor's signature and the Committee's stamp | úkol kapitoly |
| `ch1_ui_hraje_bara` |  |  | Hraješ za Báru | You're playing as Barb | přepnutí postavy |
| `ch1_ui_hraje_ruda` |  |  | Hraješ za Rudu | You're playing as Rudy | přepnutí postavy |
| `ch1_denik_krok_kdo` |  |  | Zjistit, kdo o Arše doopravdy rozhoduje. | Find out who really decides about the Ark. | krok v deníku |
| `ch1_denik_krok_cislo` |  |  | Sehnat číslo projektu. | Get a project number. | krok v deníku |
| `ch1_denik_krok_archiv` |  |  | Dostat se do archivu. | Get into the archive. | krok v deníku |
| `ch1_denik_krok_zadani` |  |  | Najít původní zadání Archy. | Find the Ark's original brief. | krok v deníku |
| `ch1_denik_krok_vytah` |  |  | Zprovoznit výtah do druhého patra. | Get the elevator to reach the second floor. | krok v deníku |
| `ch1_denik_krok_podpis` |  |  | Získat podpis starosty. | Get the mayor's signature. | krok v deníku |
| `ch1_denik_krok_papir` |  |  | Sepsat papír o Arše. | Write up the page about the Ark. | krok v deníku |
| `ch1_denik_krok_fronta` |  |  | Vystát frontu v Komisi. | Queue up at the Committee. | krok v deníku |
| `ch1_denik_krok_razitko` |  |  | Získat razítko Komise. | Get the Committee's stamp. | krok v deníku |
