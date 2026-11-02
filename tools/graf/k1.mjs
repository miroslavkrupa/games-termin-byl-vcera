// Kapitola 1: graf závislostí puzzlů podle Rona Gilberta. Uzel je krok k řešení (úkol,
// získaný předmět, minihra, volba), šipka vede od předpokladu k tomu, co na něm závisí.
// Zápis popisuje tools/graf_zavislosti.mjs. `p` jsou příznaky a předměty z prototypu,
// podle kterých kontrola ověří, že uzel v kapitola1.js opravdu existuje.
export default {
  kapitola: 1,
  nazev: 'Iniciace',
  cil: 'klic',
  uzly: [
    { id: 'start', t: 'Začátek: věřitelé za dveřmi', druh: 'start' },

    // Útěk z bytu (P1.0)
    { id: 'kava', t: 'Vzít kávu ze stolu', druh: 'predmet', po: ['start'], p: ['+kava'] },
    { id: 'pembok', t: 'Vzít knihu z police: Prof. Pembok', druh: 'predmet', po: ['start'], p: ['+pembok'] },
    { id: 'dekret', t: 'Podepsat věřitelům stížnost, ukápne káva: dekret a propiska', po: ['kava'], p: ['+dekret', '+propiska'] },
    { id: 'dira', t: 'Slézt dírou ve zdi na náměstí', po: ['kava', 'pembok', 'dekret'], p: ['pembok_otevren'] },

    // Číslo projektu: dvě cesty (P1.2, P1.3)
    { id: 'bara1', t: 'Nechat Báru domluvit (1.)', po: ['dira'], p: ['c1_bara_vyslechnuta'] },
    { id: 'bara2', t: 'Nechat Báru domluvit (2.): kritéria úspěchu', po: ['bara1'], p: ['c1_bara_kriteria'] },
    { id: 'bara3', t: 'Nechat Báru domluvit (3.): číslo 94/017', po: ['bara2'], p: ['c1_cislo_projektu'] },
    { id: 'pero', t: 'Propiska + káva: kávové pero', druh: 'predmet', po: ['dekret', 'dira'], p: ['+kavove_pero'] },
    { id: 'stanek', t: 'Prohlédnout stánek: plakát pod okurkou', po: ['dira'], volitelne: true, p: ['plakat_videl'] },
    { id: 'zmena', t: 'Zapsat přání Pana Změny kávovým perem: plakát s číslem', po: ['pero'], mekke: ['stanek'], p: ['c1_zmena_dohoda', '+plakat'] },
    { id: 'cislo', t: 'nebo', druh: 'nebo', po: ['bara3', 'zmena'] },

    // Archiv (P1.4–P1.7)
    { id: 'vratny', t: 'Zeptat se vrátného: starosta ve 2. patře', po: ['dira'], volitelne: true, p: ['vratny_rekl_starosta'] },
    { id: 'archiv', t: 'Dostat se k Lumírovi do archivu s číslem', po: ['cislo'], p: ['archiv_vstup'] },
    { id: 'kartoteka', t: 'Probrat kartotéku: lístky výtahu a mostu', po: ['archiv'], p: ['listky_ctene', 'listek_vytah'] },
    { id: 'kniha', t: 'Přečíst Lumírovu knihu skutečných dat', po: ['archiv'], volitelne: true, p: ['kniha_ctena'] },
    { id: 'razeni', t: 'Seřadit lístky podle skutečného data', druh: 'minihra', po: ['kartoteka'], mekke: ['kniha'], p: ['@razeni'] },
    { id: 'zadani', samo: true, t: 'Původní zadání Archy', druh: 'predmet', po: ['razeni'], p: ['+zadani'] },
    { id: 'tlacitko', t: 'Krabice 87/3 od Lumíra: tlačítko „2“', druh: 'predmet', po: ['kartoteka'], p: ['+tlacitko'] },
    { id: 'karta', t: 'Podepsat výpůjčku kávovým perem: karta poučení', druh: 'predmet', po: ['archiv', 'pero'], volitelne: true, p: ['+karta'] },
    { id: 'mapa', t: 'Vzít katastrální mapu', druh: 'predmet', po: ['archiv'], volitelne: true, p: ['+mapa'] },
    { id: 'obojek', t: 'Prohlédnout kocourův obojek', po: ['dira'], volitelne: true, p: ['obojek_videl'] },

    // Starosta (P1.6, P1.8)
    { id: 'vytah', t: 'Zapojit tlačítko do výtahu', po: ['tlacitko'], p: ['tlacitko_zapojeno'] },
    { id: 'starosta', t: 'Vyjet do 2. patra ke starostovi', po: ['vytah'], mekke: ['vratny'] },
    { id: 'm03', t: 'M03 Souboj argumenty (R1.1)', druh: 'minihra', po: ['starosta'], mekke: ['zadani', 'karta', 'bara2'], p: ['@m03', 'c1_slib_vseho'] },
    { id: 'podpis', samo: true, t: 'Podpis sponzora a termín', druh: 'predmet', po: ['m03'], p: ['+podpis'] },

    // Komise (P1.9–P1.13)
    { id: 'm02', t: 'M02 Kdo tu vlastně velí', druh: 'minihra', po: ['podpis', 'zadani'], mekke: ['mapa', 'obojek'], p: ['@m02', 'm02_hotovo'] },
    { id: 'mimo', t: 'Zeptat se Báry, co na Archu nepatří', po: ['zadani', 'bara1'], volitelne: true, p: ['utrzek_mimo'] },
    { id: 'm01', t: 'M01 Charter z trosek', druh: 'minihra', po: ['m02'], mekke: ['bara2', 'mimo'], p: ['@m01', 'c1_charter_kvalita'] },
    { id: 'charter', samo: true, t: 'Charter', druh: 'predmet', po: ['m01'], p: ['+papir'] },
    { id: 'pozemek', t: 'nebo', druh: 'nebo', po: ['mapa', 'obojek'], volitelne: true },
    { id: 'babicka', t: 'Vyslechnout babičku o pozemku (R1.2)', druh: 'volba', po: ['pozemek'], volitelne: true, p: ['c1_babicka'] },
    { id: 'poduska', t: 'Babiččina razítková poduška', druh: 'predmet', po: ['babicka'], volitelne: true, p: ['+poduska'] },
    { id: 'fronta', t: 'Postavit se do fronty na frontu', po: ['charter'], p: ['+metr'] },
    { id: 'regal', t: 'Bára: změřit hluboký regál metrem: seznam pasažérů', kdo: 'bara', po: ['fronta'], p: ['+seznam', 'c1_seznam_pasazeru', 'fronta_hotova'] },
    { id: 'souhlas', t: 'Požádat Předsedu o razítko: poduška je vyschlá', po: ['regal'], p: ['predseda_souhlas'] },
    { id: 'kavou', t: 'Polít podušku kávou', po: ['kava'], p: ['poduska_mokra'] },
    { id: 'barva', t: 'nebo', druh: 'nebo', po: ['kavou', 'poduska'] },
    { id: 'razitko', t: 'Razítko Komise', po: ['souhlas', 'barva'], p: ['razitko_hotovo', 'c1_razitko'] },
    { id: 'faze', t: '„A následné fáze?“ (R1.4)', druh: 'volba', po: ['razitko'], mekke: ['mimo'], p: ['c1_faze2'] },
    { id: 'klic', t: 'Klíč od hangáru', druh: 'cil', po: ['faze'], p: ['+klic'] },
  ],
};
