# Seznam miniher

> Každá minihra patří do jednoho ze čtyř pater koncepce [Dva světy, jedna Archa](07-dva-svety.md),
> nese jedno nebo dvě výuková témata (ID z [výukové matice](02-vyukova-matice.md)) a je zakotvená
> v příběhu. Před výrobou musí projít papírovým prototypem.
> Výjimka: M01, M02 a M03 pro kapitolu 1 se testují až ve hře (D53).
> Stav: **koncept**, verze 0.2

## Zásady

1. **Délka 5–10 minut.** Minihra je koření, ne hlavní jídlo.
2. **Vždy v příběhu.** Nikdy „teď si zahrajeme hru o WBS“, vždy „slon blokuje bránu hangáru“.
3. **Výsledek není jen výhra/prohra.** Kvalita výsledku se propisuje do stavových proměnných
   a do příběhu.
4. **Vždy přeskočitelná, ale hrát se vyplatí.** Kdo minihru přeskočí, pokračuje s horším
   výsledkem v příběhu, nikdy neuvízne. Kdo ji hraje, dostane navíc: lepší výsledek, vtipy a scény,
   které jinde nejsou, repliky do souboje argumenty, předměty usnadňující pozdější puzzly a úspěchy
   (achievementy).
5. **Bez textových lekcí.** Pojem se odemkne v Deníku až po dohrání.
6. **Papírový prototyp první.** Kartičky a kostky na stole, 3–5 testerů, teprve potom kód.
7. **Zábavná i bez znalosti PM.** Pravidla se musí dát pochopit ze scény. V rozhraní minihry
   nejsou odborné pojmy (ne „WBS“, ale „porcování slona“). Testovat i na hráčích, kteří o PM nic neví.
8. **Bez jazykových hříček v pravidlech.** Minihra musí fungovat stejně v angličtině i češtině.
9. **Hratelná myší i prstem.** Žádné ovládání závislé na najetí myší, dost velké prvky na dotyk.
10. **Patro určuje mechaniku** (D23):
    - **svět plánu** = deterministická pravidla, plánování dopředu se vyplatí, zapomenutá
      závislost se vymstí;
    - **svět iterací** = skrytá informace, skutečnost se ukáže až po dodání nebo ukázce,
      detailní plán dopředu je promarněná práce;
    - **spojka** = odměňuje sladění pevných milníků s průběžnými verzemi;
    - **společný základ** = platí stejně pro celou Archu.

## Přehled podle pater

| Patro | # | Minihra | Metoda | Kap. | Hraje | Témata | Priorita |
|---|---|---|---|---|---|---|---|
| **Společný základ** | M01 | Charter z trosek | project charter | 1 | Ruda | V02, V03 | ⭐ slice |
| | M02 | Kdo tu vlastně velí | mapa stakeholderů | 1 | Ruda | V04 | ⭐ slice |
| | M03 | Souboj argumenty | komunikace se stakeholdery | 1, 4 | Ruda | V05 | ⭐ slice |
| | M07 | Krabice od bot | registr rizik | 2 | Ruda a Bára | V09 | střední |
| | M11 | Plachetnice | retrospektiva, poučení | 4 | tým | V19, V22 | nízká |
| **Svět plánu** | M04 | Jak sníst slona | WBS | 2 | Ruda | V06 | střední |
| | M13 | Jeřábový balet | harmonogram, kritická cesta | 3 | Ruda | V23 | ⭐ prototyp jádra |
| **Svět iterací** | M14 | Ukázka na náměstí | ukázka a zpětná vazba uživatelů | 3 | Bára | V24, V14 | ⭐ prototyp jádra |
| **Spojka** | M06 | Mapa do neznáma | hybridní roadmapa, plánování po vlnách | 2 | Ruda a Bára | V08 | střední |
| | M10 | Scope Creep | řízení změn ve dvou světech | 3 | Ruda a Bára | V15 | střední |
| | M15 | Integrační okno | integrace a synchronizace | 3 | Ruda a Bára | V25 | střední |

**Vyřazeno (D58):** M05 Poker s goblinem, M08 Tetris kapacity a M12 Dashboard lží. Témata
zůstávají jinak: odhady (V07) jako dialog v hospodě U Odhadu, plánování sprintu (V12) jako
scéna s rozhodnutím, zelený report (V17) jako puzzle v řídicí věži. Specifikace níže zůstávají
pro případ návratu. Rozložení miniher po kapitolách je v
[rozpočtech kapitol](05-produkce.md#rozpočty-kapitol).

**Zrušeno jako minihra:** M09 Standup za 15 minut. Ranní porada zůstává jako krátká scéna
před plánováním sprintu (V13), aby zbylo místo pro minihry, které nesou hlavní myšlenku.

### Doporučené pořadí prototypů

1. **Vertical slice (kapitola 1):** M01, M02, M03, tedy společný základ.
2. **Prototyp jádra:** dvojice **M13 Jeřábový balet** a **M14 Ukázka na náměstí** na papíře.
   Kapitola 1 rozdíl mezi světy ještě netestuje, a přitom na něm celá hra stojí. Tahle dvojice
   ověří, jestli hráč rozdíl opravdu pocítí rukama.
3. Ostatní podle kapitol.

## Společný základ

### M01 Charter z trosek
- **Příběh:** původní charter Archy se rozpadl na útržky. Sponzor, Pan Změna a Komise do něj
  podstrkují své nesmysly.
- **Mechanika:** skládání listiny ze střípků do kolonek (cíl, rozsah, mimo rozsah, kritéria úspěchu,
  sponzor, rozpočet, termín). Část útržků jsou nesmysly („cíl: aby to bylo hezký“) nebo nejsou
  měřitelné.
- **Výsledek:** kvalita charteru ovlivní důvěru stakeholderů a dostupné argumenty v kap. 4.
- **Riziko návrhu:** může působit jako formulář → potřebuje silný humor v útržcích.

### M02 Kdo tu vlastně velí
- **Příběh:** Ruda musí zjistit, koho přesvědčit, aby se stavba vůbec rozjela.
- **Mechanika:** postavy (i ty, které hráč potkal jen mimochodem) se umísťují do mřížky
  vliv × zájem. Některé vlastnosti zná hráč jen tehdy, když s postavou mluvil. Babičku odhalí
  jen hráč, který dával pozor.
- **Výsledek:** odemkne strategie dialogu a rozhodnutí R1.2.
- **Riziko návrhu:** „správné“ umístění musí jít odvodit ze hry, ne z teorie.

### M03 Souboj argumenty
- **Příběh:** opakující se střet se stakeholdery (Komise, sponzor, Pan Změna, Ing. Framework,
  finále s Předsedou).
- **Mechanika:** obdoba šermování urážkami z *Monkey Islandu*. Druhá strana vznese námitku, hráč
  odpoví replikou. Repliky se sbírají během hry: z charteru, z dat, z rozhovorů s týmem.
  Lež a nereálný slib vyhrají kolo, ale později se vrátí. V pozdějších kapitolách přibývají
  repliky z obou světů: proti Předsedovi pomáhají Bářina data, proti Ing. Frameworkovi Rudův plán.
- **Výsledek:** důvěra stakeholderů, přístup k dalším lokacím, rozhodující souboj v kap. 4.
- **Riziko návrhu:** nejsložitější na psaní, potřebuje hodně kvalitních a vtipných replik.

### M07 Krabice od bot
- **Příběh:** Ruda dostane krabici od bot jako „registr rizik“.
- **Mechanika:** ve scénách se hledají podezřelé věci (stopy krys, prasklé lano, podezřelý
  Předsedův úsměv) a zapisují se s reakcí. Rozpočet nestačí na všechno, takže je nutné vybírat.
  Reakce se liší podle světa: u rampy se riziku **předchází** (zpevnit, objednat dřív),
  u softwaru a interiéru se riziko **ověří levným pokusem** (zkusit na maketě, zeptat se obyvatel).
- **Výsledek:** zapsaná rizika se později vyplácejí (kočka Riziková, rozhodnutí R2.3).

### M11 Plachetnice
- **Příběh:** tým se na konci etapy sejde na lodičce v přístavu.
- **Mechanika:** k lodi se umísťují kotvy (co nás brzdí), vítr (co pomáhá) a útesy (rizika).
  Na závěr hráč vybere jedno konkrétní zlepšení, které platí v další kapitole. Připlouvají
  i lahve s poučením z archivu zkrachovalých projektů.
- **Výsledek:** zlepšení kapacity nebo morálky a odemčené možnosti v dalších scénách.

## Svět plánu

### M04 Jak sníst slona
- **Příběh:** obří slon (ztělesnění Archy) blokuje bránu hangáru.
- **Mechanika:** slon má dvě půlky. **Kamennou** (rampa, trup) jde naporcovat celou až na
  zvládnutelné kusy; chybějící kus (mezera) nebo kus porcovaný dvakrát (překryv) se vrátí jako
  problém. **Mlžná** půlka (řídicí systém, interiér) se dá naporcovat jen v nejbližší části,
  zbytek se při řezání rozplyne a znovu zformuje jinak. Kdo se ji snaží naporcovat celou,
  plýtvá časem. Vtip i lekce v jednom.
- **Výsledek:** kvalita rozpadu práce ovlivní kapacitu a počet překvapení v kap. 3.

### M13 Jeřábový balet (nová)
- **Příběh:** stavba rampy. Ve městě je jediný funkční jeřáb a beton musí zrát.
- **Mechanika:** rozvrhování úkolů na časovou osu: bednění → výztuž → betonáž → zrání →
  odbednění, pro několik úseků rampy. Jeřáb je sdílený zdroj, beton nejde urychlit. Po
  potvrzení se plán přehraje den po dni. Zapomenutá závislost = zřícené bednění (gag),
  přetížený jeřáb = fronta. Kdo najde kritickou cestu, ví, kde nesmí nic zdržet.
- **Výsledek:** čas a rezerva projektu. Je to Rudova parádní disciplína, kde jeho způsob
  opravdu funguje.
- **Riziko návrhu:** může být suché → potřebuje vtipného jeřábníka a vizuální gagy.
- **Papírový prototyp:** kartičky úkolů na časové ose z papíru, jedna figurka jeřábu.

### M12 Dashboard lží (vyřazeno, D58)
- **Příběh:** řídicí věž hlásí, že je vše zelené. Kometa se přitom blíží.
- **Mechanika:** porovnávání ukazatelů s realitou ve scéně. U rampy dává smysl měřit plnění
  plánu. U softwaru ukazuje věž „87 % hotovo podle plánu“, a přitom nic nefunguje; tam je potřeba
  měřit, co obyvatelé opravdu dostali a zkusili. Hráč odhaluje melounové ukazatele (venku
  zelené, uvnitř červené) a ke každé části přiřadí správné měřítko.
- **Výsledek:** podklad pro eskalaci R4.1.

## Svět iterací

### M05 Poker s goblinem (vyřazeno, D58)
- **Příběh:** v hospodě U Odhadu se o odhadech sází.
- **Mechanika:** relativní odhady položek řídicího systému a interiéru kartami. Goblini
  podvádějí: kotví („tohle jsou dva dny, ne?“), předhánějí se v optimismu, skupinové myšlení.
  Kontrast: Ruda chce i software odhadovat v hodinách na měsíc dopředu a goblini se mu vysmějí.
- **Výsledek:** přesnost odhadů ovlivní plánování sprintů.

### M08 Tetris kapacity (vyřazeno, D58)
- **Příběh:** plánování každého sprintu na řídicím systému a interiéru.
- **Mechanika:** položky různých tvarů se skládají do kapacity sprintu; závislosti spojují dílky.
  Přeplněný sprint přetéká a zvyšuje technický dluh. Před plánováním proběhne krátká scéna
  ranní porady (bývalá M09).
- **Výsledek:** rychlost, technický dluh, morálka.

### M14 Ukázka na náměstí (nová)
- **Příběh:** Bára ukazuje obyvatelům na náměstí prototyp nástupní aplikace a maketu kajuty.
- **Mechanika:** hráč (za Báru) vybírá, co ukázat. Položky mají odhadovanou hodnotu, ale
  skutečná se ukáže až podle reakcí: „jistota“ nikoho nezajímá, babička chce velká tlačítka,
  rybáři potřebují místo na udice. Hráč pak přeskládá pořadí práce podle toho, co zjistil.
  Kdo ukazuje často a brzy, zjistí víc; kdo čeká na „hotové“, dozví se pravdu pozdě.
- **Výsledek:** přesnost hodnot v seznamu práce, důvěra obyvatel, nové požadavky.
- **Riziko návrhu:** skrytá informace nesmí působit jako náhoda → reakce obyvatel musí jít
  zpětně odvodit z toho, co hráč o postavách ví.
- **Papírový prototyp:** karty položek s rubem, na kterém je skutečná hodnota.

## Spojka

### M06 Mapa do neznáma
- **Příběh:** společná mapa cesty k dokončení Archy přes Mlžnou pláň.
- **Mechanika:** na mapě vedou dvě trasy. **Cesta** (rampa, trup) se staví dlaždice po dlaždici,
  dá se naplánovat daleko dopředu a má pevné body. **Řeka** (řídicí systém, interiér) teče
  a mění koryto podle toho, co se zjistí. Obě se musí potkat u **mostů**, kde se části spojují.
  Mlha platí pro obě, ale cesta je v ní vidět dál. Kdo kreslí detail řeky do mlhy, musí ho
  překreslovat; kdo nenaplánuje mosty, má potíž.
- **Výsledek:** realistická roadmapa, rozmístění integračních bodů pro M15.

### M10 Scope Creep
- **Příběh:** tvor, který roste s každou neřízenou změnou.
- **Mechanika:** změnové požadavky přicházejí do obou světů a hráč je směruje. Bazén v trupu je
  drahá změna a musí projít schvalovací branou (posoudit dopad, vyjednat výměnu). Objednávka
  svačin v aplikaci jde do seznamu práce a Bára ji seřadí podle hodnoty. Špatné směrování se
  vymstí: volně přijatá změna trupu nechá tvora vyrůst, změna aplikace protlačená těžkým
  schvalováním zdrží a naštve obyvatele.
- **Výsledek:** velikost tvora (rozsah, čas), důvěra stakeholderů.

### M15 Integrační okno (nová)
- **Příběh:** trup se v pevném termínu zavře a do té doby musí být řídicí systém uvnitř.
- **Mechanika:** dvě časové osy: pevné milníky rampy a trupu a plovoucí verze softwaru.
  Hráč (střídavě za Rudu a Báru) domlouvá, co musí být hotové k uzavření trupu (nejmenší verze,
  kterou jde zabudovat) a co může přijít později servisním poklopem. Rudovi se nechce nic
  odkládat, Báře se nechce nic slíbit.
- **Výsledek:** nesladěné body se ve 4. kapitole srazí jako krize na rozhraní.

## Šablona pro novou minihru

```markdown
### Mxx Název
- **Patro:** společný základ / svět plánu / svět iterací / spojka
- **Příběh:** proč se to děje ve hře
- **Mechanika:** co hráč dělá, jaká jsou pravidla (a jak mechanika nese patro)
- **Výsledek:** co se propíše do proměnných a do příběhu
- **Témata:** ID z výukové matice
- **Riziko návrhu:** co se může pokazit (nuda, nejasnost, náročnost výroby)
- **Papírový prototyp:** jak ho rychle otestovat
```

## Otevřené otázky

- [ ] Jedna minihra opakovaná víckrát (souboj argumenty), nebo každá jen jednou?
- [ ] Obtížnost miniher: jedna úroveň, nebo volitelná?
- [ ] Mají mít minihry vlastní vizuální styl, nebo zůstat ve stylu scén?
- [x] 14 miniher je pro jednoho autora hodně → vyřazeny M05, M08 a M12, zůstává 11 (D58)
