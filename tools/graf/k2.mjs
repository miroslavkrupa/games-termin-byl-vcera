// Kapitola 2: graf závislostí puzzlů (zápis v tools/graf_zavislosti.mjs).
// Uzly s `jen` existují jen při určitém stavu z kapitoly 1.
export default {
  kapitola: 2,
  nazev: 'Plánování',
  cil: 'konec',
  stavy: {
    kava: 'razítko kávou (c1_razitko=kava)',
    faze2: 'následné fáze přijaty (c1_faze2)',
  },
  scenare: { 'Špatná kapitola 1 (razítko kávou, fáze 2)': ['kava', 'faze2'] },
  uzly: [
    { id: 'start', t: 'Ráno na náměstí: klíč od hangáru', druh: 'start' },

    // Hospoda a slon (P2.1)
    { id: 'kreda', t: 'Vzít křídu z tabule v hospodě', druh: 'predmet', po: ['start'], p: ['+kreda'] },
    { id: 'tacky', t: 'Vzít tácky z výčepu', druh: 'predmet', po: ['start'], p: ['+tacky'] },
    { id: 'brana', t: 'Odemknout bránu klíčem: slon', po: ['start'], p: ['slon_videl'] },
    { id: 'm04', t: 'M04 Jak sníst slona', druh: 'minihra', po: ['brana', 'kreda'], p: ['@m04', 'c2_rozpad'] },
    { id: 'hangar', t: 'Vejít do hangáru: Archa je vrak', po: ['m04'], p: ['hangar_otevren', 'hangar_videl'] },

    // Tým a odhad (P2.2, P2.3)
    { id: 'zkousky', t: 'Vyzkoušet kandidáty (zkoušky)', po: ['start'], volitelne: true, p: ['zkouska_'] },
    { id: 'kandidati', t: 'Získat čtyři kandidáty', po: ['start'], mekke: ['zkousky'], p: ['kandidat_', 'pocet_kandidatu'] },
    { id: 'tym', t: 'Potvrdit tým u dveří hospody (R2.1)', druh: 'volba', po: ['kandidati', 'hangar'], p: ['tym_potvrzen', 'c2_tym'] },
    { id: 'potaji', t: 'Tácky: odhady týmu potají', po: ['tacky', 'tym'], p: ['c2_odhad=realny'] },
    { id: 'kotva', t: 'Přijmout sázku „dva dny“ (kotva)', po: ['tym'], p: ['c2_odhad=kotva'] },
    { id: 'odhad', t: 'nebo', druh: 'nebo', po: ['potaji', 'kotva'] },

    // Krabice od bot (P2.5)
    { id: 'krabice', t: 'Vzít krabici od bot z kokpitu', druh: 'predmet', po: ['hangar'], p: ['+krabice', '+obalka'] },
    { id: 'l_krysy', t: 'Zapsat okousané kabely', po: ['krabice'], p: ["ZAPSAT('krysy')"] },
    { id: 'l_usmev', t: 'Zapsat Předsedův úsměv (do R2.2)', po: ['krabice'], p: ["ZAPSAT('usmev')"] },
    { id: 'l_lano', t: 'Zapsat prasklé lano jeřábu', po: ['krabice'], p: ["ZAPSAT('lano')"] },
    { id: 'l_nastup', t: 'Zapsat obyvatele s kufry', po: ['krabice'], p: ["ZAPSAT('nastup')"] },
    { id: 'l_odhad', t: 'Zapsat Pepovy „dva dny“', po: ['krabice'], p: ["ZAPSAT('odhad')"] },
    { id: 'listky', t: '3 z 5', druh: 'nebo', k: 3, po: ['l_krysy', 'l_usmev', 'l_lano', 'l_nastup', 'l_odhad'] },
    { id: 'm07', t: 'M07 Krabice od bot: obálka na jedno riziko (R2.3)', druh: 'minihra', po: ['krabice', 'listky'], p: ['@m07', 'c2_riziko_predem'] },

    // Rozdělení Archy (P2.4)
    { id: 'framework', t: 'Použít tabuli: přijde Ing. Framework', po: ['hangar'], p: ['framework_prisel'] },
    { id: 'r22', t: 'Rozdělit Archu na tabuli (R2.2)', druh: 'volba', po: ['framework', 'tym'], p: ['@tabule', 'r22_hotovo', 'c2_rozdeleni'] },

    // Mlžná pláň (P2.7)
    { id: 'm06', t: 'M06 Mapa do neznáma: plán cesty', druh: 'minihra', po: ['r22', 'm07', 'odhad'], p: ['@m06', 'c2_mosty', '+plan'] },

    // Formulář na formulář (P2.6, jen při kávovém razítku)
    { id: 'formular', t: 'Dostat od Předsedy formulář', druh: 'predmet', jen: 'kava', po: ['hangar'], p: ['+formular'] },
    { id: 'podpisy', t: 'Nechat formulář podepsat třemi z týmu', jen: 'kava', po: ['formular', 'tym'], p: ['formular_podepsan'] },
    { id: 'odevzdat', t: 'Odevzdat formulář Předsedovi', jen: 'kava', po: ['podpisy'], p: ['formular_odevzdan'] },

    // Fáze 2 za startem (jen při c1_faze2)
    { id: 'chce_faze', t: 'Předseda chce fázi 2 za start', jen: 'faze2', po: ['m06'], p: ['faze_pozadovana'] },
    { id: 'list', t: 'Vzít list kalendáře „Den dopadu“', druh: 'predmet', jen: 'faze2', po: ['hangar'], p: ['+list'] },
    { id: 'pozastavit', t: 'Ukázat list Předsedovi: fáze 2 pozastavena', jen: 'faze2', po: ['chce_faze', 'list'], p: ['faze_pozastavena'] },

    // Schválení (P2.8)
    { id: 'zdenda', t: 'Zjistit, kdo umí řídit jeřáb (cedule, štamgasti)', po: ['start'], volitelne: true, p: ['vratny_stopa'] },
    { id: 'komise', t: 'Komise orazítkuje plán cesty', po: ['m06', 'odevzdat', 'pozastavit'], mekke: ['zdenda'], p: ['plan_orazitkovan'] },
    { id: 'konec', t: 'První beton, vrátný na jeřábu', druh: 'cil', po: ['komise'] },
  ],
};
