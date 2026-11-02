// Kapitola 3: graf závislostí puzzlů (zápis v tools/graf_zavislosti.mjs). Hraje se za dvě
// postavy: `kdo` obarví uzel podle toho, kdo krok dělá (jako u Thimbleweed Parku).
// Střihy fází jsou příběhové uzly, které hru opravdu zamykají, proto v grafu zůstávají.
export default {
  kapitola: 3,
  nazev: 'Realizace',
  cil: 'konec',
  stavy: {
    vera: 'tým bez Věry',
    norbert: 'tým bez Norberta',
    kocka: 'obálka na krysy (c2_riziko_predem=krysy)',
    rozpad: 'rozpad slona s chybami (c2_rozpad ≥ 2)',
    faze2: 'následné fáze přijaty (c1_faze2)',
    schvalen: { t: 'poklop v M10 schválen', vychozi: true },
  },
  scenare: {
    'Špatné kapitoly 1 a 2 (bez Věry i Norberta, fáze 2, rozpad)': ['vera', 'norbert', 'faze2', 'rozpad'],
    'Poklop v M10 neschválen': ['!schvalen'],
  },
  uzly: [
    { id: 'start', t: 'Úvod: zbývá 24, žádosti o změnu', druh: 'start', p: ['+zadosti'] },

    // Fáze A, Ruda: jeřáb a sklad (P3.1–P3.3)
    // Klíč od skladu až ve fázi B (D75); bez Věry hned, vrátný bez výpočtu do kabiny nesedne
    { id: 'cas', t: 'Vrátný bez výpočtu nesedne do kabiny: má čas', druh: 'strih', jen: 'vera', po: ['start'], p: ['ch3_vratny_klic_cas'] },
    { id: 'klic_kdy', t: 'nebo', druh: 'nebo', po: ['faze_b', 'cas'] },
    { id: 'klic', t: 'Říct si vrátnému o klíč od skladu', druh: 'predmet', kdo: 'ruda', po: ['klic_kdy'], p: ['+klic_sklad', 'ch3_vratny_klic_pozdeji'] },
    { id: 'odemknout', t: 'Odemknout sklad: krysy na hnízdě', kdo: 'ruda', po: ['klic'], p: ['sklad_otevren'] },
    { id: 'aktovka', t: 'Žádosti o změnu jako stopa do Předsedovy aktovky', kdo: 'ruda', po: ['odemknout'], p: ['c3_krysy=aktovka'] },
    { id: 'kocka', t: 'Poslat kočku Rizikovou do skladu', kdo: 'ruda', jen: 'kocka', po: ['odemknout'], p: ['c3_krysy=kocka'] },
    { id: 'krysy', t: 'nebo', druh: 'nebo', po: ['aktovka', 'kocka'], p: ['krysy_pryc'] },
    { id: 'poklop', t: 'Vzít servisní poklop ve skladu', druh: 'predmet', kdo: 'ruda', po: ['krysy'], p: ['+poklop'] },
    { id: 'vypocet', t: 'Vzít výpočet statika z krysího hnízda', druh: 'predmet', kdo: 'ruda', jen: 'vera', po: ['krysy'], p: ['+vypocet'] },
    { id: 'vypocet_dat', t: 'Dát výpočet vrátnému', kdo: 'ruda', jen: 'vera', po: ['vypocet'], p: ['vypocet_predan'] },
    { id: 'm13', t: 'M13 Jeřábový balet: rozpis rampy', druh: 'minihra', kdo: 'ruda', po: ['start', 'vypocet_dat'], p: ['@m13', 'm13_hotovo', 'c3_rezerva', '+rozpis'] },

    // Fáze A, Bára: porada, dílna, plán kola (P3.4–P3.6)
    { id: 'porada', t: 'Ranní porada s kuchyňskou minutkou', kdo: 'bara', po: ['start'], p: ['porada_hotova'] },
    { id: 'kabel', t: 'Vzít kabel z makety kajuty', druh: 'predmet', kdo: 'bara', po: ['start'], p: ['+kabel'] },
    { id: 'sloupek', t: 'Zapojit kabel do zkušebního sloupku', kdo: 'bara', po: ['kabel'], p: ['sloupek_hotov'] },
    { id: 'napad', t: 'Pepův nápad: počká, až něco dokončíme', druh: 'volba', kdo: 'bara', po: ['sloupek'], p: ['napad_resen'] },
    { id: 'listky', t: 'Vzít lepicí lístky z krabičky', druh: 'predmet', kdo: 'bara', po: ['start'], p: ['+listky'] },
    { id: 'maketa', t: 'Slepit maketu lepicími lístky', kdo: 'bara', po: ['listky'], p: ['maketa_hotova'] },
    { id: 'cidlo', t: 'Odložit půlku čidla na polici „Někdy“', kdo: 'bara', po: ['start'], p: ['cidlo_odlozeno'] },
    { id: 'model', t: 'Odložit Rudův model rampy', kdo: 'bara', po: ['start'], p: ['model_odlozeno'] },
    { id: 'plech', t: 'Odložit dvakrát nakrájený plech', kdo: 'bara', jen: 'rozpad', po: ['start'], p: ['plech_odlozeno'] },
    { id: 'dilna', samo: true, t: 'Dílna volná: tři háčky', kdo: 'bara', po: ['sloupek', 'napad', 'maketa', 'cidlo', 'model', 'plech'], p: ['dilna_volna'] },
    { id: 'plan_kola', t: 'Plán kola: cíl a nejvýš tři karty', druh: 'minihra', kdo: 'bara', po: ['porada', 'dilna'], p: ['@plan_kola', 'plan_kola_hotovo', 'c3_dluh'] },

    // Fáze B (P3.7–P3.11)
    { id: 'faze_b', t: 'Střih: zbývá 21', druh: 'strih', po: ['m13', 'plan_kola'], p: ['faze_b'] },
    { id: 'm14', t: 'M14 Ukázka na náměstí', druh: 'minihra', kdo: 'bara', po: ['faze_b'], p: ['@m14', 'm14_hotovo', 'c3_hodnota'] },
    { id: 'vada', t: 'Přepočítat počítadlo: zápis vady 4 811', druh: 'predmet', kdo: 'bara', po: ['m14'], volitelne: true, p: ['+zapis', 'vada_nalezena'] },
    { id: 'vada_ruda', t: 'Říct Rudovi o vadě (důvěra, nebo za Rudu nechat domluvit)', kdo: 'spolu', po: ['vada'], volitelne: true, p: ['c3_vada_hlasena'] },
    { id: 'pozastavit', t: 'Plán cesty na Předsedu: fáze 2 pozastavena', kdo: 'ruda', jen: 'faze2', po: ['m14'], volitelne: true, p: ['faze_zastavena'] },
    { id: 'm10', t: 'M10 Ještětoto: rozcestník změn (R3.1)', druh: 'minihra', kdo: 'spolu', po: ['faze_b', 'm14'], mekke: ['pozastavit'], p: ['@m10', 'm10_hotovo', 'c3_creep', 'poklop_schvalen'] },
    { id: 'nasadit', t: 'Nasadit schválený poklop do otvoru v trupu', kdo: 'ruda', jen: 'schvalen', po: ['poklop', 'm10'], p: ['c3_poklop'] },
    { id: 'norbert', t: 'Pembok mlčí: Norbert z lavičky podepíše', kdo: 'ruda', jen: 'norbert', po: ['faze_b'], p: ['norbert_podpis'] },
    { id: 'r32', t: 'Bára a pořadí práce (R3.2)', druh: 'volba', kdo: 'spolu', po: ['m10'], p: ['r32_hotovo', 'c3_bara_priority'] },

    // Fáze C (P3.12, P3.13)
    { id: 'faze_c', t: 'Střih: zbývá 12, zítra se zavírá trup', druh: 'strih', po: ['r32', 'krysy'], p: ['faze_c'] },
    { id: 'rozpis', t: 'Dát Báře rozpis rampy (bez mostu u nástupu)', kdo: 'ruda', po: ['m13'], volitelne: true, p: ['bara_zna_lavku'] },
    { id: 'm15', t: 'M15 Než se zavře trup', druh: 'minihra', kdo: 'spolu', po: ['faze_c', 'nasadit', 'norbert'], mekke: ['rozpis', 'vada_ruda'], p: ['@m15', 'm15_hotovo', 'c3_integrace'] },
    { id: 'r33', t: 'Co příště jinak (R3.3)', druh: 'volba', kdo: 'spolu', po: ['m15'], p: ['c3_retro', 'c3_zlepseni'] },
    { id: 'konec', t: 'Archa smontovaná, tlačítko nic', druh: 'cil', po: ['r33'] },
  ],
};
