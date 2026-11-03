// Kapitola 4: graf závislostí puzzlů (zápis v tools/graf_zavislosti.mjs). Návrh N3, prototyp
// ještě není, proto `navrh` vypne kontrolu příznaků proti prototypu. Tři akty končí úzkým
// hrdlem: rozkol, usmíření a povolení ke startu. Mezi nimi má každá postava několik linek.
export default {
  kapitola: 4,
  nazev: 'Krize',
  navrh: true,
  dvePostavy: true,
  cil: 'konec',
  stavy: {
    zustal: { t: 'po posezení v kap. 3 nikdo neodešel (c3_retro)', vychozi: true },
    odesel: 'bez posezení v kap. 3 odešel člen týmu (c3_odchazi)',
    poklop: { t: 'servisní poklop nasazený (c3_poklop)', vychozi: true },
    bez_poklopu: 'bez servisního poklopu (c3_poklop=ne)',
    netesni: 'poklop netěsní (c3_poklop=netesni)',
    babicka: 'babička není spojenkyně (c1_babicka)',
    spojenec: { t: 'babička je spojenkyně (c1_babicka=spojenec)', vychozi: true },
    plosina: 'rampa bez plošiny (c3_rezerva < 0)',
    drolivy: 'rampa se drolí (c3_drolivy)',
    vada: 'vada v počítadle neopravená (c3_vada_hlasena)',
    lavka: 'aplikace nezná den lávky (bez mostu nástup)',
    bazen: 'bazén v trupu a v R4.2 neobětovaný',
    usmev: 'kopie Předsedových podpisů (c2_riziko_predem=usmev)',
  },
  scenare: {
    'Špatné kapitoly 1–3 (babička, bez posezení, bez poklopu, vada, lávka, plošina, bazén)':
      ['babicka', '!spojenec', '!zustal', 'odesel', '!poklop', 'bez_poklopu', 'vada', 'lavka', 'plosina', 'bazen'],
    'Rampa v potížích (drolí se, bez plošiny, babička), poklop netěsní, kopie podpisů':
      ['drolivy', 'plosina', 'babicka', '!spojenec', 'netesni', 'usmev'],
  },
  uzly: [
    { id: 'start', t: 'Kometa zrychlí: zbývá 7, věž hlásí, že je všechno zelené', druh: 'start' },

    // Akt A: Zelená věž. Šest ukazatelů, každý měří něco jiného, než tvrdí (V17).
    { id: 'semafor', t: 'Zeptat se dispečera, co který ukazatel měří', po: ['start'], volitelne: true },
    { id: 'denik', t: 'Říct si vrátnému o deník jeřábu', druh: 'predmet', po: ['start'] },
    { id: 'l_rampa', t: 'Porovnat rozpis rampy s deníkem: lístek Rampa', po: ['denik'] },
    // Klíč od poklopu drží člen týmu (c3_odchazi) a z ruky ho nedá: poklop otevře sám
    { id: 'l_trup', t: 'Nechat člena týmu otevřít poklop: lístek Trup', jen: 'zustal', po: ['start'] },
    { id: 'l_pocitadlo', t: 'Spustit zkoušku počítadla: lístek Počítadlo', kdo: 'bara', po: ['start'] },
    { id: 'obyvatele', t: 'Zeptat se obyvatel s kufry, kudy nastoupí', kdo: 'bara', po: ['start'] },
    { id: 'l_nastup', t: 'Zkusit nástup s babičkou a rybáři: lístek Nástup', kdo: 'bara', po: ['obyvatele'] },
    { id: 'l_zmeny', t: 'Změřit Ještětoto metrem: lístek Změny', kdo: 'bara', po: ['start'] },
    { id: 'l_tym', t: 'Zeptat se každého z týmu, jak se má: lístek Tým', po: ['start'] },
    { id: 'listky', t: '4 z 6', druh: 'nebo', k: 4, po: ['l_rampa', 'l_trup', 'l_pocitadlo', 'l_nastup', 'l_zmeny', 'l_tym'] },
    { id: 'poctive', t: 'Poslat starostovi skutečný stav s variantami (R4.1)', druh: 'volba', po: ['listky'] },
    { id: 'zelene', t: 'Poslat starostovi zelenou (R4.1)', druh: 'volba', po: ['start'] },
    { id: 'r41', t: 'nebo', druh: 'nebo', po: ['poctive', 'zelene'] },
    { id: 'm03', t: 'M03 Souboj se starostou ve věži', druh: 'minihra', kdo: 'spolu', po: ['r41'], mekke: ['listky'] },
    { id: 'r42', t: 'Co obětovat z rozsahu (R4.2)', druh: 'volba', kdo: 'spolu', po: ['m03'] },
    { id: 'rozkol', t: 'Rozkol: Ruda zamyká, Bára přepracovává; zbývá 5', druh: 'strih', po: ['r42'] },

    // Akt B: Každý sám. Ruda a Bára spolu nemluví, předměty nosí dva poslové z týmu (D77):
    // ve dveřích dílny a na staveništi. Předání je okamžité, proto posel není samostatný krok.
    // Ruda: zkouška motorů, povolení ke startu a následky z dřívějška
    { id: 'startklic', t: 'Startovací klíč od Norberta (bez něj od vrátného)', druh: 'predmet', po: ['rozkol'] },
    { id: 'palivo', t: 'Nechat vrátného zvednout jeřábem sud paliva', po: ['rozkol'] },
    { id: 'zkouska', t: 'Zkouška motorů: naskočí a zhasne, řídicí systém mlčí', po: ['startklic', 'palivo'] },
    { id: 'povoleni', t: 'Požádat Komisi o povolení ke startu: „analýza dopadu na fázi 3“', po: ['rozkol'] },
    { id: 'clen', t: 'Přemluvit člena týmu, který odešel k Frameworkovi', jen: 'odesel', po: ['rozkol'] },
    { id: 'klic_clen', t: 'Klíč od poklopu (nebo plán zapojení) a svědectví o smlouvě', druh: 'predmet', samo: true, jen: 'odesel', po: ['clen'] },
    { id: 'lehatko', t: 'Vyslechnout babičku na lehátku pod rampou', jen: 'babicka', po: ['rozkol'] },
    { id: 'posel_listek', t: 'Převzít od posla palubní lístek pro babičku', jen: 'babicka', po: ['tisk'] },
    { id: 'babicka', t: 'Dát babičce palubní lístek: uvolní rampu', jen: 'babicka', po: ['lehatko', 'posel_listek'] },
    { id: 'plosina', t: 'Dostavět s vrátným odpalovací plošinu', jen: 'plosina', po: ['rozkol'] },
    { id: 'droleni', t: 'Zpevnit drolivou rampu', jen: 'drolivy', po: ['rozkol'] },
    { id: 'tesnit', t: 'Utěsnit netěsný poklop', jen: 'netesni', po: ['rozkol'] },
    { id: 'bazen', t: 'Vyjednat s Panem Změnou bazén z trupu do kašny', jen: 'bazen', po: ['r42'] },
    { id: 'posel_rozpis', t: 'Poslat Báře rozpis rampy po poslovi', jen: 'lavka', po: ['rozkol'] },

    // Bára: archiv a důkazy proti Předsedovi (D59), palubní lístky, opravy
    { id: 'minutka', t: 'Vzít kuchyňskou minutku z dílny', druh: 'predmet', kdo: 'bara', po: ['rozkol'] },
    { id: 'lumir', t: 'Probudit Lumíra v archivu minutkou', kdo: 'bara', po: ['minutka'] },
    { id: 'kometa', t: 'Najít v kartotéce lístek „Pozorování komety (1994–dosud)“', kdo: 'bara', po: ['lumir'] },
    { id: 'zaznam', t: 'Hvězdářský záznam z přílohy', druh: 'predmet', samo: true, kdo: 'bara', po: ['kometa'] },
    { id: 'plan_komise', t: 'Seznam pasažérů + záznam: Komise chtěla odletět sama', druh: 'predmet', kdo: 'bara', po: ['zaznam'] },
    { id: 'smlouva', t: 'Zeptat se Frameworka na referenci: kopie smlouvy na fázi 3', druh: 'predmet', kdo: 'bara', po: ['rozkol'], mekke: ['plan_komise', 'klic_clen'] },
    { id: 'tisk', t: 'Vytisknout palubní lístky pro všechny', druh: 'predmet', kdo: 'bara', po: ['rozkol'], mekke: ['l_pocitadlo'] },
    { id: 'lavka', t: 'Doplnit do aplikace den lávky z rozpisu', kdo: 'bara', jen: 'lavka', po: ['posel_rozpis'] },
    { id: 'oprava', t: 'Napsat opravu počítadla', druh: 'predmet', kdo: 'bara', jen: 'vada', po: ['rozkol'], mekke: ['l_pocitadlo'] },
    { id: 'rekne', t: 'Vzkázat Rudovi po poslovi, co ví o Předsedovi (jen při důvěře)', kdo: 'bara', po: ['plan_komise'], volitelne: true },

    // Akt B se sbíhá: oba narazí na hranici toho, co zvládnou sami (Ruda: motory bez řídicího
    // systému a Komise bez razítka; Bára: důkazy a lístky bez nástupu a bez startu)
    { id: 'usmireni', t: 'Usmíření v hangáru (R4.3)', druh: 'volba', kdo: 'spolu', po: ['zkouska', 'povoleni', 'plan_komise', 'smlouva', 'tisk'], mekke: ['rekne'] },
    { id: 'm11', t: 'M11 Plachetnice na palubě Archy', druh: 'minihra', kdo: 'spolu', po: ['usmireni'] },
    { id: 'faze_c', t: 'Střih: zbývá 2', druh: 'strih', po: ['m11'] },

    // Akt C: Poslední přípravy. Tři linky, které se sejdou u povolení ke startu.
    // Klíč od poklopu (bez poklopu plán zapojení) předá člen týmu na začátku aktu C sám;
    // když odešel, musí ho Ruda v aktu B získat zpět
    { id: 'nahrat', t: 'Nahrát navigaci poklopem: Ruda drží, Bára nahrává', kdo: 'spolu', jen: 'poklop', po: ['faze_c', 'klic_clen', 'tesnit', 'oprava'] },
    { id: 'vrtat', t: 'Bez poklopu: Věra navrtá trup podle plánu zapojení', kdo: 'spolu', jen: 'bez_poklopu', po: ['faze_c', 'klic_clen', 'oprava'] },
    { id: 'programy', t: 'nebo', druh: 'nebo', po: ['nahrat', 'vrtat'] },
    { id: 'nastup', t: 'Nástupní zkouška: obyvatelé s palubními lístky po lávce', kdo: 'spolu', po: ['faze_c', 'tisk', 'babicka', 'plosina', 'droleni', 'lavka'] },
    { id: 'kopie', t: 'Kopie všeho, co Předseda podepsal', druh: 'predmet', jen: 'usmev', po: ['start'] },
    { id: 'dukazy', t: '3 důkazy', druh: 'nebo', k: 3, po: ['zaznam', 'plan_komise', 'smlouva', 'kopie', 'klic_clen'] },
    { id: 'konfrontace', t: 'Konfrontace v Komisi: tři výmluvy, tři důkazy', kdo: 'spolu', po: ['faze_c', 'povoleni', 'dukazy'] },
    { id: 'podpis', t: 'Starosta podepíše povolení ke startu', po: ['konfrontace'] },
    { id: 'konec', t: 'Předseda odhalen, Archa připravená ke startu', druh: 'cil', po: ['programy', 'nastup', 'podpis', 'bazen'] },
  ],
};
