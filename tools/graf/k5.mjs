// Kapitola 5: graf závislostí puzzlů (zápis v tools/graf_zavislosti.mjs). Návrh N3, prototyp
// ještě není, proto `navrh` vypne kontrolu příznaků proti prototypu. Část A je široká (obě
// postavy), finále je kosočtverec pojistek a část C záměrně úzký závěr (R5.1, R5.2).
export default {
  kapitola: 5,
  nazev: 'Uzavření',
  navrh: true,
  dvePostavy: true,
  cil: 'konec',
  stavy: {
    nastup: 'skupiny neprošly nástupní zkouškou (c4_nastup < 3)',
    bez_norberta: 'Norbert není v týmu (c2_tym)',
    bezp_iterace: 'bezpečnostní systém ve světě iterací (bez bezp_u_rudy)',
    integrace: 'nesladěné body po kap. 4 (c4_integrace ≥ 1)',
    creep: 'Ještětoto drží přání (c4_creep ≥ 1 nebo c4_slib ≥ 1)',
    zelene: 'zelená zpráva starostovi (c4_report=zelene)',
    trval: 'Ruda při usmíření trval na svém (c4_usmireni=trval)',
    tlacitka: 'velká tlačítka obětovaná v R4.2 (c4_obet)',
  },
  scenare: {
    'Špatné kapitoly 1–4 (skupiny, bez Norberta, nesladěné body, Ještětoto, zelená, trval, tlačítka)':
      ['nastup', 'bez_norberta', 'integrace', 'creep', 'zelene', 'trval', 'tlacitka'],
    'Bezpečnostní systém ve světě iterací a bez Norberta':
      ['bezp_iterace', 'bez_norberta'],
  },
  uzly: [
    { id: 'start', t: 'Poslední den: Archa na plošině, obyvatelé ve frontě', druh: 'start' },

    // Část A: Poslední ráno. Ruda na rampě a v archivu, Bára ve věži; vysílačka přenáší, co kdo vidí.
    { id: 'dvere', t: 'Otevřít pákou dveře Archy: fronta nastupuje', po: ['start'] },
    // Kdo neprošel nástupní zkouškou v kap. 4, uvízne; každá skupina je jeden krok
    { id: 'rybari', t: 'Rybáři: složit udice, nebo je přivázat zvenku', jen: 'nastup', po: ['dvere'] },
    { id: 'sipky', t: 'Rozsvítit z věže šipky na palubu', kdo: 'bara', jen: 'nastup', po: ['dvere'] },
    { id: 'kocour', t: 'Přinést babičce kocoura z pozemku pod rampou', jen: 'nastup', po: ['dvere'] },
    { id: 'nastoupeno', t: 'Fronta nastoupila', samo: true, po: ['dvere', 'rybari', 'sipky', 'kocour'] },
    { id: 'kontrola', t: 'Spustit předstartovní kontrolu řídicího systému', kdo: 'bara', po: ['start'] },
    { id: 'chybi', t: 'Počítadlo 4 811: ze seznamu lístků zjistit, že chybí Lumír', kdo: 'bara', po: ['kontrola', 'nastoupeno'] },
    { id: 'lumir', t: 'Lumír v archivu: „Bez archivu nejdu.“', po: ['start'], mekke: ['chybi'] },
    { id: 'krabicka', t: 'Vzít z pultu krabičku Poučení (plnou lahví z Plachetnice)', druh: 'predmet', po: ['lumir'] },
    { id: 'lumir_jde', t: 'Dát Lumírovi krabičku Poučení: jde nastoupit', po: ['krabicka'] },
    // Pečeť: Norbert podepíše jen, co viděl, a jen verzi, která se už nezmění (R2.1, R2.2)
    { id: 'verze', t: 'Zamknout verzi bezpečnostního systému', kdo: 'bara', jen: 'bezp_iterace', po: ['start'] },
    { id: 'norbert_fronta', t: 'Přivést Norberta z fronty k pojistkám: zkouška a pečeť', jen: 'bez_norberta', po: ['start', 'verze'] },
    { id: 'pecet', t: 'Bezpečnostní systém zapečetěný', samo: true, po: ['start', 'verze', 'norbert_fronta'] },
    { id: 'uzavreno', t: 'Uzavřít nástup: 4 812 / 4 812', kdo: 'bara', po: ['chybi', 'lumir_jde', 'pecet'] },
    // Příprava předání (R5.1): nic nezamyká, ale bez ní jde jen „Však vy si poradíte.“
    { id: 'stranky', t: 'Říct si třem z týmu o stránku návodu', po: ['start'] },
    { id: 'manual', t: 'Stránky do krabice od bot: provozní manuál', druh: 'predmet', po: ['stranky'] },
    { id: 'kapitan', t: 'Zeptat se vrátného, jestli povede Archu', po: ['start'] },
    { id: 'barva', t: 'Natřít tlačítko Start žlutou barvou', kdo: 'bara', jen: 'tlacitka', po: ['kapitan'] },
    { id: 'zauceni', t: 'Zkušební režim s vrátným: lístky skutečnosti jako legenda', kdo: 'bara', po: ['kapitan', 'barva'] },

    // Finále: Dva klíče. Bezpečnostní pult (Ruda) vidí jen půlku, řídicí systém (Bára) druhou.
    { id: 'odpocet', t: 'Odpočet: deset… tři. Start zablokován na rozhraní', druh: 'strih', po: ['uzavreno'] },
    { id: 'kamera_lavka', t: 'Kamera věže: na lávce za Archou stojí Pan Změna', kdo: 'bara', po: ['odpocet'] },
    { id: 'zmena', t: 'Odložit Panu Změnovi poslední přání: „Po přistání.“', po: ['kamera_lavka'] },
    { id: 'pak', t: 'Zavřít dveře pákou', po: ['odpocet'] },
    { id: 'kamera_dvere', t: 'Řídicí systém hlásí otevřeno: v kameře ocas Ještětota', kdo: 'bara', jen: 'creep', po: ['pak'] },
    { id: 'prani', t: 'Odložit Ještětotovi přání jedno po druhém: zmenší se', jen: 'creep', po: ['kamera_dvere'] },
    { id: 'hodnoty', t: 'Sladit hodnoty, které se na obou pultech liší', kdo: 'spolu', jen: 'integrace', po: ['odpocet'] },
    { id: 'stav', t: 'Pojistka Stav ověřen: lístky skutečnosti místo zelené', kdo: 'spolu', jen: 'zelene', po: ['odpocet'] },
    { id: 'pojistky', t: 'Pojistky zelené', samo: true, po: ['zmena', 'pak', 'prani', 'hodnoty', 'stav'] },
    { id: 'ustoupit', t: '„Na čí tři?“ Ruda ustoupí: „Na tvoje.“', jen: 'trval', po: ['pojistky'] },
    { id: 'natri', t: 'Na tři: Ruda odjistí, Bára předá palubě', kdo: 'spolu', po: ['pojistky', 'ustoupit'] },
    { id: 'klic', t: 'Startovací klíč pro posádku', druh: 'predmet', samo: true, po: ['natri'] },

    // Část C: Pódium a start
    { id: 'poradne', t: 'Předat s návodem a zaučením (R5.1)', druh: 'volba', po: ['klic', 'manual', 'zauceni'] },
    { id: 'poradi', t: '„Však vy si poradíte.“ (R5.1)', druh: 'volba', po: ['klic'] },
    { id: 'r51', t: 'nebo', druh: 'nebo', po: ['poradne', 'poradi'] },
    { id: 'r52', t: 'Pódium: „Já.“, nebo „My.“ (R5.2)', druh: 'volba', po: ['r51'] },
    { id: 'konec', t: 'Start a konec podle voleb', druh: 'cil', po: ['r52'] },
  ],
};
