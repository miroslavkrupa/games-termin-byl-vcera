// Kapitola 2 jako data pro šedý prototyp. Zdroj pravdy pro logiku jsou dokumenty
// docs/kapitoly/02-*.md. Kapitola ještě nemá texty první verze (N6), proto jsou repliky
// pracovní a jen česky: prototyp/texty/kapitola2.csv. Zápis akcí popisuje hlavička engine.js.
(function (koren) {
  'use strict';

  const KANDIDATI = ['pepa', 'vera', 'norbert', 'klara', 'zdenda', 'krystof'];
  const NAZEV = { pepa: 'postava_pepa', vera: 'postava_vera', norbert: 'postava_norbert', klara: 'postava_klara', zdenda: 'postava_zdenda', krystof: 'postava_krystof' };
  const vybrani = (h) => KANDIDATI.filter((k) => h.s.priznaky['kandidat_' + k]);

  // Potvrzení týmu: seznam, pokrytí (stavba = Věra, zkoušení = Pepa nebo Klára, podpis startu = Norbert)
  const POTVRDIT_TYM = (h) => {
    const tym = vybrani(h);
    const p = h.s.priznaky;
    const pokryti = (p.kandidat_vera ? 1 : 0) + (p.kandidat_pepa || p.kandidat_klara ? 1 : 0) + (p.kandidat_norbert ? 1 : 0);
    h.nastav('c2_tym=' + tym.join('-'));
    h.nastav('c2_tym_pokryti=' + pokryti);
    h.nastav('tym_potvrzen');
    h.rekni('ch2_tym_vyhlaseni');
    if (pokryti < 3) h.rekni('ch2_tym_pembok_mezera');
  };

  // Tácky (P2.3): každý z týmu napíše odhad potají, Ruda je otočí najednou
  const TACEK = (kdo) => ({
    kdy: '!tym_potvrzen', akce: 'ch2_tacky_pred_tymem', jinak: {
      kdy: '!kandidat_' + kdo, akce: 'ch2_tacky_neni_v_tymu', jinak: {
        kdy: 'c2_odhad', akce: 'ch2_tacky_uz', jinak: {
          kdy: 'tacek_' + kdo, akce: 'ch2_tacky_uz_ma', jinak: [
            'ch2_tacek_' + kdo, '$tacek_' + kdo, '$tacku+1',
            { kdy: 'tacku>=4', akce: [
              'ch2_tacky_otocit', 'ch2_tacky_cisla', 'ch2_tacky_ruda_15', '$c2_odhad=realny', '-tacky', '+odhad'] }] } } } });

  // Formulář na formulář (P2.6): podpisy tří z týmu
  const PODPIS = (kdo) => ({
    kdy: '!kandidat_' + kdo + ' || !tym_potvrzen', akce: 'ch2_formular_neni_v_tymu', jinak: {
      kdy: 'podpis_' + kdo, akce: 'ch2_formular_uz_podepsal', jinak: [
        'ch2_podpis_' + kdo, '$podpis_' + kdo, '$podpisy+1',
        { kdy: 'podpisy>=3 && !formular_podepsan', akce: ['ch2_formular_podepsan', '$formular_podepsan'] }] } });

  // Krabice od bot (M07): s krabicí se podezřelá věc zapíše na lístek
  const ZAPSAT = (listek) => ({
    kdy: "ma('krabice') && !listek_" + listek, akce: ['ch2_krabice_zapisu', 'ch2_listek_' + listek + '_zapsan', '$listek_' + listek, '$pocet_listku+1'] });

  // Konec kapitoly: razítko, staveniště, vrátný k jeřábu
  const KONEC = [
    'ch2_predseda_razitko', '$plan_orazitkovan', { kdy: "c2_riziko_predem=='usmev'", akce: ['ch2_predseda_kopie', '+kopie'] }, '#',
    '>staveniste', 'ch2_konec_beton', 'ch2_konec_kdo_jerab', 'ch2_konec_ticho',
    { kdy: 'vratny_stopa', akce: 'ch2_konec_vratny_stopa', jinak: 'ch2_konec_vratny' },
    { kdy: "c2_riziko_predem=='lano'", akce: 'ch2_konec_lano_nove', jinak: 'ch2_konec_lano_drzi' },
    'ch2_konec_beton_tece', 'ch2_konec_ruda_faze1', 'ch2_konec_bara_25', '$dny=25', '*konec',
  ];
  // Schválení plánu (P2.8): formulář (kávové razítko), fáze 2, razítko
  const SCHVALENI = {
    kdy: "c1_razitko=='kava' && !formular_odevzdan", akce: {
      kdy: 'formular_podepsan', akce: ['ch2_predseda_formular_prijat', '-formular', '$formular_odevzdan'], jinak: 'ch2_predseda_formular_chybi' },
    jinak: {
      kdy: 'c1_faze2 && !faze_pozastavena', akce: ['ch2_predseda_faze_1', 'ch2_predseda_faze_ruda', 'ch2_predseda_faze_2', '$faze_pozadovana'],
      jinak: KONEC } };

  const data = {
    kapitola: 2,
    nazev: 'ch2_ui_kapitola',
    ukol: 'ch2_ui_ukol',
    dny: 'ch1_ui_kometa_dny',
    pamet_nadpis: 'ch2_pamet_nadpis',
    // Stav z kapitoly 1: příznaky c1_* a co měl Ruda v kapsách
    nese: '^c1_',
    predvolby: {
      dobra: {
        popis: 'Dobrá kapitola 1 (02-pruchod.md, nejkratší cesta)',
        priznaky: { c1_bara_vyslechnuta: 3, c1_slib_vseho: 0, c1_mimo_rozsah: true, c1_faze2: 0, c1_razitko: 'poduska', c1_babicka: 'spojenec', c1_zmena_dohoda: true, c1_charter_kvalita: 3, c1_seznam_pasazeru: true },
        predmety: ['pembok', 'kava', 'kavove_pero', 'klic'],
      },
      spatna: {
        popis: 'Špatná kapitola 1 (02-pruchod.md, varianty)',
        priznaky: { c1_bara_vyslechnuta: 0, c1_slib_vseho: 4, c1_faze2: true, c1_razitko: 'kava', c1_babicka: 'prehlizena', c1_charter_kvalita: 1, c1_seznam_pasazeru: true },
        predmety: ['pembok', 'kava', 'propiska', 'klic'],
      },
    },

    start: {
      scena: 'namesti',
      priznaky: { dny: 27, pembok_otevren: true },
      predmety: ['pembok', 'kava', 'kavove_pero', 'klic'],
      akce: [
        '*karta:ch2_ui_kapitola', 'ch2_uvod_budka', 'ch2_uvod_amplion',
        { kdy: 'c1_slib_vseho>=3', akce: 'ch2_uvod_vzkaz_vse', jinak: 'ch2_uvod_vzkaz_noviny' },
        'ch2_uvod_ruda_30', 'ch2_uvod_pembok_fronta',
        'ch2_uvod_pembok_ukol', 'ch2_uvod_ruda_plan', 'ch2_uvod_pembok_naco', 'ch2_uvod_ruda_vsechno',
        '*karta:ch2_ui_ukol'],
    },

    predmety: {
      pembok: { nazev: 'predmet_pembok', prohlednout: 'predmet_pembok_prohlednout', pouzit: '?' },
      kava: { nazev: 'predmet_kava', prohlednout: 'ch2_kava_prohlednout' },
      kavove_pero: { nazev: 'predmet_kavove_pero', prohlednout: 'predmet_kavove_pero_prohlednout' },
      propiska: { nazev: 'predmet_propiska', prohlednout: 'predmet_propiska_prohlednout' },
      klic: { nazev: 'predmet_klic', prohlednout: 'ch2_klic_prohlednout' },
      // Kopie všeho, co Předseda podepsal: jen při obálce na úsměv, vzniknou u razítka (D81, kap. 4 je čte)
      kopie: { nazev: 'predmet_kopie', prohlednout: 'ch2_kopie_prohlednout' },
      kreda: { nazev: 'predmet_kreda', prohlednout: 'predmet_kreda_prohlednout' },
      tacky: { nazev: 'predmet_tacky', prohlednout: 'predmet_tacky_prohlednout' },
      odhad: { nazev: 'predmet_odhad', prohlednout: { kdy: "c2_odhad=='kotva'", akce: 'predmet_odhad_kotva', jinak: 'predmet_odhad_realny' } },
      krabice: { nazev: 'predmet_krabice', prohlednout: 'predmet_krabice_prohlednout' },
      obalka: { nazev: 'predmet_obalka', prohlednout: 'predmet_obalka_prohlednout' },
      formular: { nazev: 'predmet_formular', prohlednout: { kdy: 'formular_podepsan', akce: 'predmet_formular_podepsany', jinak: 'predmet_formular_prohlednout' } },
      list: { nazev: 'predmet_list', prohlednout: 'predmet_list_prohlednout' },
      plan: { nazev: 'predmet_plan', prohlednout: 'predmet_plan_prohlednout' },
      buchta: { nazev: 'predmet_buchta', prohlednout: 'predmet_buchta_prohlednout', pouzit: ['ch2_buchta_snist', '-buchta'] },
    },

    kombinace: [
      { a: 'propiska', b: 'kava', akce: ['ch1_kombinace_pero_1', 'ch1_kombinace_pero_2', '-propiska', '+kavove_pero'] },
      { a: 'kreda', b: 'tacky', akce: 'ch2_kombinace_kreda_tacky' },
      { a: 'obalka', b: 'pembok', akce: 'ch2_kombinace_obalka_pembok' },
      { a: 'odhad', b: 'plan', akce: 'ch2_kombinace_odhad_plan' },
    ],

    sceny: {
      // S1 Náměstí ráno (pozadí kap. 1)
      namesti: {
        obrazek: 'pozadi_namesti',
        nazev: 'Náměstí',
        mista: [
          { id: 'kometa', nazev: 'ch1_hs_kometa', r: [22, 0, 19, 16], prohlednout: 'ch2_kometa_prohlednout',
            na: { krabice: 'ch2_krabice_kometa', obalka: 'ch2_krabice_kometa' } },
          { id: 'amplion', nazev: 'ch1_hs_amplion', r: [75.5, 6, 6, 12], prohlednout: 'ch2_amplion_prohlednout' },
          { id: 'kasna', nazev: 'ch1_hs_kasna', r: [27.5, 53, 27, 25], prohlednout: 'ch2_kasna_prohlednout' },
          { id: 'budka', nazev: 'ch1_hs_budka', r: [73.5, 47.5, 9, 28.5], prohlednout: 'ch2_budka_prohlednout', pouzit: ['ch2_budka_pouzit_1', 'ch2_budka_pouzit_2'] },
          { id: 'stanek', nazev: 'ch1_hs_stanek', r: [11.5, 36, 18.5, 36], prohlednout: 'ch2_stanek_prohlednout',
            na: { obalka: 'ch2_zmena_obalka' } },
          { id: 'zmena', nazev: 'postava_pan_zmena', druh: 'postava', r: [18, 40, 8, 37], obraz: 'postava_zmena',
            prohlednout: 'ch2_zmena_prohlednout', pouzit: '#zmena',
            na: { obalka: 'ch2_zmena_obalka', kava: 'ch2_zmena_kava', kavove_pero: 'ch2_zmena_pero', plan: 'ch2_zmena_plan' } },
          { id: 'obyvatele', nazev: 'ch2_hs_obyvatele', druh: 'postava', r: [60, 50, 11, 28],
            prohlednout: ['ch2_obyvatele_prohlednout', ZAPSAT('nastup')],
            pouzit: ['ch2_obyvatele_ruda', 'ch2_obyvatele_odpoved', ZAPSAT('nastup')],
            na: { krabice: ['ch2_obyvatele_prohlednout', ZAPSAT('nastup')], obalka: 'ch2_obalka_zkusime' } },
          { id: 'ulice', stitek: true, nazev: 'ch2_hs_ulice_hospoda', druh: 'vychod', vychod: 'hospoda', r: [0, 44, 9, 24],
            prohlednout: 'ch2_ulice_prohlednout' },
          { id: 'ulicka', stitek: true, nazev: 'ch2_hs_ulicka_rampa', druh: 'vychod', vychod: 'staveniste', r: [30.5, 43, 4.5, 15],
            prohlednout: 'ch2_ulicka_prohlednout' },
          { id: 'dvere_radnice', nazev: 'ch1_hs_dvere', druh: 'vychod', r: [51.5, 51, 6.5, 12],
            prohlednout: 'ch2_dvere_prohlednout', pouzit: ['ch2_vytah_strih', '>komise'] },
        ],
      },

      // S2 Staveniště rampy a brána hangáru (nové pozadí, zatím šedé)
      staveniste: {
        nazev: 'Staveniště rampy',
        poprve: 'ch2_staveniste_prichod',
        mista: [
          { id: 'rampa', nazev: 'ch2_hs_rampa', r: [30, 4, 40, 22], prohlednout: 'ch2_rampa_prohlednout' },
          { id: 'jerab', nazev: 'ch2_hs_jerab', r: [42, 26, 10, 40],
            prohlednout: ['ch2_jerab_prohlednout', { kdy: '!vratny_stopa', akce: ['ch2_jerab_cedule_stopa', '$vratny_stopa'], jinak: 'ch2_jerab_vratny_pozdeji' }],
            pouzit: 'ch2_jerab_pouzit' },
          { id: 'lano', nazev: 'ch2_hs_lano', r: [53, 30, 6, 16],
            prohlednout: ['ch2_lano_prohlednout', ZAPSAT('lano')],
            na: { krabice: ['ch2_lano_prohlednout', ZAPSAT('lano')], obalka: 'ch2_obalka_lano_jinde' } },
          { id: 'domichavac', nazev: 'ch2_hs_domichavac', r: [60, 58, 10, 18], prohlednout: 'ch2_domichavac_prohlednout' },
          { id: 'brana', nazev: 'ch2_hs_brana', r: [4, 26, 20, 50],
            prohlednout: 'ch2_brana_prohlednout',
            pouzit: { kdy: 'hangar_otevren', akce: '>hangar', jinak: { kdy: 'slon_videl', akce: 'ch2_brana_slon', jinak: 'ch2_brana_zamceno' } },
            na: { klic: { kdy: 'slon_videl', akce: 'ch2_brana_slon', jinak: ['ch2_brana_klic', 'ch2_brana_slon_objeven', '$slon_videl'] } } },
          { id: 'slon', nazev: 'ch2_hs_slon', kdy: 'slon_videl && !hangar_otevren', r: [9, 34, 14, 38],
            prohlednout: { stridat: ['ch2_slon_prohlednout', 'ch2_slon_cara'], dokola: false },
            pouzit: { stridat: ['ch2_slon_strcit', 'ch2_slon_strcit_2'] },
            na: { kreda: ['ch2_slon_kreda', '@m04'], klic: 'ch2_slon_klic', kavove_pero: 'ch2_slon_pero', kava: 'ch2_slon_kava', buchta: 'ch2_slon_buchta' } },
          { id: 'plot', nazev: 'ch2_hs_plot', r: [78, 46, 20, 30],
            prohlednout: { kdy: "c1_babicka=='spojenec'", akce: 'ch2_plot_spojenec', jinak: { kdy: "c1_babicka=='odmitnuta'", akce: 'ch2_plot_odmitnuta', jinak: 'ch2_plot_pradlo' } },
            pouzit: { kdy: "c1_babicka=='spojenec' && !buchta_vzata", akce: ['ch2_plot_buchta', '+buchta', '$buchta_vzata'], jinak: 'ch2_plot_nic' } },
          { id: 'kocour', nazev: 'postava_kocour', druh: 'postava', r: [86, 38, 5, 12], obraz: 'postava_kocour',
            prohlednout: 'ch2_kocour_prohlednout', pouzit: 'ch2_kocour_mluvit',
            na: { krabice: 'ch2_kocour_krysy', obalka: 'ch2_kocour_krysy' } },
          { id: 'sklad', nazev: 'ch2_hs_dvere_skladu', r: [72, 40, 6, 22], prohlednout: 'ch2_sklad_prohlednout', pouzit: 'ch2_sklad_prohlednout' },
          { id: 'ulicka', stitek: true, nazev: 'ch2_hs_ulicka_namesti', druh: 'vychod', vychod: 'namesti', r: [88, 80, 12, 18] },
        ],
      },

      // S3 Hangár s Archou (nové pozadí, zatím šedé)
      hangar: {
        nazev: 'Hangár s Archou',
        poprve: [
          'ch2_hangar_prichod', 'ch2_hangar_gantt_zbytek', 'ch2_hangar_gantt',
          { kdy: 'c1_bara_vyslechnuta>=2', akce: 'ch2_bara_prvni_duvera', jinak: 'ch2_bara_prvni_mlci' },
          'ch2_predseda_navsteva',
          { kdy: "c1_razitko=='kava'", akce: ['ch2_predseda_formular_1', 'ch2_predseda_formular_2', '+formular'] },
          '$hangar_videl'],
        mista: [
          { id: 'archa', nazev: 'ch2_hs_archa', r: [24, 18, 40, 46], prohlednout: 'ch2_archa_prohlednout' },
          { id: 'kokpit', nazev: 'ch2_hs_kokpit', r: [32, 22, 9, 12],
            prohlednout: 'ch2_kokpit_prohlednout',
            pouzit: { kdy: '!krabice_vzata', akce: ['ch2_kokpit_krabice', '+krabice', '+obalka', '$krabice_vzata'], jinak: 'ch2_kokpit_prazdny' } },
          { id: 'kabely', nazev: 'ch2_hs_kabely', r: [36, 64, 18, 10],
            prohlednout: ['ch2_kabely_prohlednout', ZAPSAT('krysy')],
            na: { krabice: ['ch2_kabely_prohlednout', ZAPSAT('krysy')] } },
          { id: 'vykresy', nazev: 'ch2_hs_vykresy', r: [2, 10, 12, 30], prohlednout: ['ch2_vykresy_1', 'ch2_vykresy_2'] },
          { id: 'gantt', nazev: 'ch2_hs_gantt', r: [66, 6, 14, 22],
            prohlednout: { kdy: "c2_rozdeleni=='povaha'", akce: 'ch2_gantt_preskrtany', jinak: 'ch2_gantt_prohlednout' } },
          { id: 'tabule', nazev: 'ch2_hs_tabule', r: [82, 10, 16, 30],
            prohlednout: { kdy: 'r22_hotovo', akce: 'ch2_tabule_hotovo', jinak: 'ch2_tabule_prohlednout' },
            pouzit: { kdy: 'r22_hotovo', akce: 'ch2_tabule_hotovo', jinak: [
              { kdy: '!framework_prisel', akce: ['ch2_framework_prichod_1', 'ch2_framework_prichod_2', 'ch2_framework_prichod_ruda', '$framework_prisel',
                { kdy: 'c1_bara_vyslechnuta>=2', akce: 'ch2_bara_tabule_rada' }] },
              { kdy: '!tym_potvrzen', akce: 'ch2_tabule_bez_tymu', jinak: '@tabule' }] },
            na: { kavove_pero: 'ch2_tabule_pero', kreda: 'ch2_tabule_kreda', odhad: 'ch2_tabule_odhad' } },
          { id: 'cil', nazev: 'ch2_hs_cil', kdy: 'c1_charter_kvalita>=3', r: [82, 2, 16, 7], prohlednout: 'ch2_cil_prohlednout' },
          { id: 'kalendar', nazev: 'ch2_hs_kalendar', r: [66, 32, 6, 12],
            prohlednout: 'ch2_kalendar_prohlednout',
            pouzit: { kdy: '!list_vzat', akce: ['ch2_kalendar_vzit', '+list', '$list_vzat'], jinak: 'ch2_kalendar_prohlednout' } },
          { id: 'stul', nazev: 'ch2_hs_stul', r: [58, 56, 14, 14],
            prohlednout: 'ch2_stul_prohlednout',
            pouzit: { kdy: 'm07_hotovo', akce: 'ch2_stul_hotovo', jinak: { kdy: "!ma('krabice')", akce: 'ch2_stul_prohlednout', jinak: {
              kdy: 'pocet_listku<3', akce: 'ch2_stul_malo', jinak: ['ch2_stul_krabice', '@m07'] } } },
            na: { krabice: { kdy: 'm07_hotovo', akce: 'ch2_stul_hotovo', jinak: { kdy: 'pocet_listku<3', akce: 'ch2_stul_malo', jinak: ['ch2_stul_krabice', '@m07'] } } } },
          { id: 'bara', nazev: 'postava_bara', druh: 'postava', r: [14, 40, 7, 36], obraz: 'postava_bara',
            prohlednout: 'ch2_bara_prohlednout', pouzit: '#bara',
            na: {
              krabice: ['ch2_bara_krabice_1', 'ch2_bara_krabice_2'], obalka: 'ch2_bara_obalka', kava: 'ch2_bara_kava',
              kavove_pero: 'ch2_bara_pero', odhad: 'ch2_bara_odhad', plan: 'ch2_bara_plan', buchta: 'ch2_bara_buchta',
              formular: { kdy: '!podpis_bara', akce: ['ch2_podpis_bara', '$podpis_bara', '$podpisy+1',
                { kdy: 'podpisy>=3 && !formular_podepsan', akce: ['ch2_formular_podepsan', '$formular_podepsan'] }], jinak: 'ch2_formular_uz_podepsal' },
            } },
          { id: 'predseda', nazev: 'postava_predseda', druh: 'postava', kdy: '!r22_hotovo', r: [88, 44, 7, 40], obraz: 'postava_predseda',
            prohlednout: ['ch2_predseda_prohlednout', ZAPSAT('usmev')], pouzit: '#predseda_hangar',
            na: { krabice: ['ch2_predseda_prohlednout', ZAPSAT('usmev')], obalka: 'ch2_predseda_obalka', kava: 'ch2_predseda_kava', klic: 'ch2_predseda_klic' } },
          { id: 'framework', nazev: 'postava_framework', druh: 'postava', kdy: 'framework_prisel && !r22_hotovo', r: [74, 44, 7, 40], obraz: 'postava_framework',
            prohlednout: 'ch2_framework_prohlednout', pouzit: '#framework',
            na: { obalka: 'ch2_framework_obalka', kava: 'ch2_framework_kava', plan: 'ch2_framework_plan', krabice: 'ch2_framework_krabice' } },
          { id: 'dilna', nazev: 'ch2_hs_dilna', r: [0, 62, 8, 30], prohlednout: 'ch2_dilna_prohlednout' },
          { id: 'zebrik', nazev: 'ch2_hs_zebrik', r: [46, 30, 4, 30], prohlednout: 'ch2_zebrik_prohlednout' },
          { id: 'vrata', stitek: true, nazev: 'ch2_hs_zadni_vrata', druh: 'vychod', vychod: 'plan', r: [92, 2, 8, 8],
            prohlednout: 'ch2_vrata_prohlednout' },
          { id: 'brana', stitek: true, nazev: 'ch2_hs_brana_ven', druh: 'vychod', vychod: 'staveniste', r: [40, 82, 20, 16] },
        ],
      },

      // S4 Hospoda U Odhadu (nové pozadí, zatím šedé)
      hospoda: {
        nazev: 'Hospoda U Odhadu',
        poprve: 'ch2_hospoda_prichod',
        mista: [
          { id: 'tabule_odhad', nazev: 'ch2_hs_tabule_odhad', r: [4, 8, 14, 22],
            prohlednout: 'ch2_tabule_odhad_prohlednout',
            pouzit: { kdy: "!ma('kreda') && !m04_hotovo", akce: ['ch2_kreda_vzit', '+kreda'], jinak: 'ch2_kreda_uz' } },
          { id: 'sazky', nazev: 'ch2_hs_sazky', r: [20, 6, 16, 24],
            prohlednout: ['ch2_sazky_prohlednout', ZAPSAT('odhad')],
            pouzit: { kdy: 'c2_odhad', akce: 'ch2_sazky_hotovo', jinak: { kdy: '!tym_potvrzen', akce: 'ch2_sazky_bez_tymu', jinak: '#sazka' } } },
          { id: 'vycep', nazev: 'ch2_hs_vycep', r: [40, 30, 20, 24],
            prohlednout: 'ch2_vycep_prohlednout',
            pouzit: { kdy: "!ma('tacky') && !c2_odhad", akce: ['ch2_tacky_vzit', '+tacky'], jinak: 'ch2_vycep_prohlednout' } },
          { id: 'stamgasti', nazev: 'ch2_hs_stamgasti', druh: 'postava', r: [22, 46, 16, 26],
            prohlednout: 'ch2_stamgasti_prohlednout', pouzit: '#stamgasti',
            na: { tacky: 'ch2_tacky_stamgasti', krabice: 'ch2_stamgasti_krabice', kava: 'ch2_stamgasti_kava' } },
          { id: 'automat', nazev: 'ch2_hs_automat', r: [62, 14, 8, 30], prohlednout: 'ch2_automat_prohlednout' },
          { id: 'stul_viklavy', nazev: 'ch2_hs_viklavy_stul', r: [42, 62, 12, 16], prohlednout: 'ch2_viklavy_prohlednout' },
          { id: 'hasicak', nazev: 'ch2_hs_hasicak', r: [72, 22, 4, 12], prohlednout: 'ch2_hasicak_prohlednout' },
          { id: 'lavice', nazev: 'ch2_hs_lavice', r: [80, 50, 16, 12], prohlednout: 'ch2_lavice_prohlednout' },
          { id: 'inzerat', nazev: 'ch2_hs_inzerat', r: [36, 8, 5, 8], prohlednout: 'ch2_inzerat_prohlednout' },
          { id: 'pepa', nazev: 'postava_pepa', druh: 'postava', r: [68, 44, 6, 32],
            prohlednout: ['ch2_pepa_prohlednout', ZAPSAT('odhad')], pouzit: '#pepa',
            na: { tacky: TACEK('pepa'), formular: PODPIS('pepa'), krabice: ['ch2_pepa_prohlednout', ZAPSAT('odhad')], kava: 'ch2_pepa_kava', odhad: 'ch2_pepa_odhad', buchta: 'ch2_pepa_buchta' } },
          { id: 'vera', nazev: 'postava_vera', druh: 'postava', r: [55, 44, 6, 32],
            prohlednout: 'ch2_vera_prohlednout', pouzit: '#vera',
            na: { tacky: TACEK('vera'), formular: PODPIS('vera') } },
          { id: 'norbert', nazev: 'postava_norbert', druh: 'postava', r: [8, 44, 6, 32],
            prohlednout: 'ch2_norbert_prohlednout', pouzit: '#norbert',
            na: { tacky: TACEK('norbert'), formular: PODPIS('norbert'), kava: 'ch2_norbert_kava', kavove_pero: 'ch2_norbert_pero' } },
          { id: 'klara', nazev: 'postava_klara', druh: 'postava', r: [86, 30, 6, 30],
            prohlednout: 'ch2_klara_prohlednout', pouzit: '#klara',
            na: { tacky: TACEK('klara'), formular: PODPIS('klara') } },
          { id: 'zdenda', nazev: 'postava_zdenda', druh: 'postava', r: [48, 6, 6, 26],
            prohlednout: 'ch2_zdenda_prohlednout', pouzit: '#zdenda',
            na: { tacky: TACEK('zdenda'), formular: PODPIS('zdenda'), kava: 'ch2_zdenda_kava', obalka: 'ch2_zdenda_obalka', buchta: 'ch2_zdenda_buchta' } },
          { id: 'krystof', nazev: 'postava_krystof', druh: 'postava', r: [76, 66, 6, 30],
            prohlednout: 'ch2_krystof_prohlednout', pouzit: '#krystof',
            na: { tacky: TACEK('krystof'), formular: PODPIS('krystof'), kavove_pero: 'ch2_krystof_pero' } },
          { id: 'dvere', stitek: true, nazev: 'ch2_hs_dvere_hospody', druh: 'vychod', r: [0, 74, 9, 24],
            pouzit: { kdy: '!tym_potvrzen && pocet_kandidatu==4 && hangar_videl', akce: '#tym', jinak: [
              { kdy: '!tym_potvrzen && pocet_kandidatu==4 && !hangar_videl', akce: 'ch2_dvere_nejdriv_archa' }, '>namesti'] } },
        ],
      },

      // S5 Mlžná pláň (levné pozadí)
      plan: {
        nazev: 'Mlžná pláň',
        poprve: 'ch2_plan_prichod',
        mista: [
          { id: 'mlha', nazev: 'ch2_hs_mlha', r: [30, 4, 66, 50], prohlednout: 'ch2_mlha_prohlednout' },
          { id: 'rozcestnik', nazev: 'ch2_hs_rozcestnik', r: [16, 36, 6, 30], prohlednout: 'ch2_rozcestnik_prohlednout' },
          { id: 'kamen', nazev: 'ch2_hs_kamen', r: [44, 58, 16, 18],
            prohlednout: 'ch2_kamen_prohlednout',
            pouzit: { kdy: "ma('plan') || plan_orazitkovan", akce: 'ch2_kamen_hotovo', jinak: {
              kdy: '!r22_hotovo', akce: 'ch2_mapa_chybi_rozdeleni', jinak: {
                kdy: '!m07_hotovo', akce: 'ch2_mapa_chybi_krabice', jinak: {
                  kdy: '!c2_odhad', akce: 'ch2_mapa_chybi_odhad', jinak: [
                    { kdy: 'c1_bara_vyslechnuta>=2', akce: 'ch2_bara_mapa_vysvetli', jinak: 'ch2_bara_mapa_mlci' }, '@m06'] } } } } },
          { id: 'bara', nazev: 'postava_bara', druh: 'postava', r: [64, 40, 7, 36], obraz: 'postava_bara',
            prohlednout: 'ch2_bara_plan_prohlednout', pouzit: 'ch2_bara_plan_mluvit' },
          { id: 'vrata', stitek: true, nazev: 'ch2_hs_zadni_vrata', druh: 'vychod', vychod: 'hangar', r: [0, 60, 10, 36] },
        ],
      },

      // S6 Kancelář Komise (pozadí kap. 1)
      komise: {
        obrazek: 'pozadi_komise',
        nazev: 'Kancelář Komise',
        poprve: 'ch2_komise_prichod',
        mista: [
          { id: 'predseda', nazev: 'postava_predseda', druh: 'postava', r: [83, 21, 7, 43], obraz: 'postava_predseda',
            prohlednout: 'ch2_predseda_komise_prohlednout', pouzit: '#predseda',
            na: {
              plan: SCHVALENI,
              list: { kdy: 'faze_pozadovana && !faze_pozastavena', akce: ['ch2_predseda_list_1', 'ch2_predseda_list_ruda', 'ch2_predseda_list_2', '-list', '$faze_pozastavena', SCHVALENI],
                jinak: 'ch2_predseda_list_ne' },
              formular: { kdy: 'formular_podepsan', akce: ['ch2_predseda_formular_prijat', '-formular', '$formular_odevzdan'], jinak: 'ch2_predseda_formular_chybi' },
              kava: 'ch2_predseda_kava_plan', obalka: 'ch2_predseda_obalka',
            } },
          { id: 'fronta', nazev: 'ch1_hs_fronta', r: [33, 51, 26, 19], prohlednout: 'ch2_fronta_prohlednout' },
          { id: 'razitko', nazev: 'ch1_hs_razitko', r: [51.5, 31, 8, 9],
            prohlednout: { kdy: "c1_razitko=='kava'", akce: 'ch2_razitko_kava', jinak: 'ch2_razitko_poduska' } },
          { id: 'telefon', nazev: 'ch1_hs_telefon', r: [66, 30, 4, 5], prohlednout: 'ch2_telefon_prohlednout' },
          { id: 'vytah', stitek: true, nazev: 'ch1_hs_vytah', druh: 'vychod', r: [1, 40, 8, 35], pouzit: ['ch2_vytah_dolu', '>namesti'] },
        ],
      },
    },

    dialogy: {
      zmena: {
        poprve: 'ch2_zmena_uvod',
        vycerpano: 'ch2_zmena_vse',
        volby: [
          { t: 'ch2_zmena_volba_prodej', jednou: true, akce: 'ch2_zmena_prodej' },
          { t: 'ch2_zmena_volba_archa', jednou: true, akce: { kdy: 'c1_zmena_dohoda', akce: 'ch2_zmena_archa_dohoda', jinak: ['ch2_zmena_archa_1', 'ch2_zmena_archa_2'] } },
          { t: 'ch2_volba_konec', konec: true, akce: 'ch2_zmena_konec' },
        ],
      },

      bara: {
        poprve: { kdy: 'c1_bara_vyslechnuta>=2', akce: 'ch2_bara_uvod_duvera', jinak: 'ch2_bara_uvod_mlci' },
        vycerpano: 'ch2_bara_vse',
        volby: [
          { t: 'ch2_bara_volba_cesta', jednou: true, akce: 'ch2_bara_cesta' },
          { t: 'ch2_bara_volba_mereni', jednou: true, akce: ['ch2_bara_mereni_1', 'ch2_bara_mereni_2'] },
          { t: 'ch2_bara_volba_gantt', jednou: true, akce: 'ch2_bara_gantt' },
          { t: 'ch2_bara_volba_tym', kdy: '!tym_potvrzen', jednou: true, akce: { kdy: 'c1_bara_vyslechnuta>=2', akce: 'ch2_bara_tym_rada', jinak: 'ch2_bara_mlci' } },
          { t: 'ch2_bara_volba_odhad', kdy: 'tym_potvrzen && !c2_odhad', jednou: true, akce: { kdy: 'c1_bara_vyslechnuta>=2', akce: 'ch2_bara_odhad_rada', jinak: 'ch2_bara_mlci' } },
          { t: 'ch2_bara_volba_tabule', kdy: 'r22_hotovo', jednou: true, akce: { kdy: "c2_rozdeleni=='povaha'", akce: 'ch2_bara_r22_povaha', jinak: { kdy: "c2_rozdeleni=='krabice'", akce: 'ch2_bara_r22_krabice', jinak: 'ch2_bara_r22_gantt' } } },
          { t: 'ch2_volba_konec', konec: true, akce: 'ch2_bara_konec' },
        ],
      },

      predseda_hangar: {
        poprve: 'ch2_predseda_hangar_uvod',
        vycerpano: 'ch2_predseda_vse',
        volby: [
          { t: 'ch2_predseda_volba_co', jednou: true, akce: 'ch2_predseda_hangar_co' },
          { t: 'ch2_predseda_volba_formular', kdy: "ma('formular')", jednou: true, akce: 'ch2_predseda_hangar_formular' },
          { t: 'ch2_volba_konec', konec: true, akce: 'ch2_predseda_hangar_konec' },
        ],
      },

      framework: {
        poprve: 'ch2_framework_uvod',
        vycerpano: 'ch2_framework_vse',
        volby: [
          { t: 'ch2_framework_volba_krabice', jednou: true, akce: ['ch2_framework_krabice_1', 'ch2_framework_krabice_2'] },
          { t: 'ch2_framework_volba_beton', jednou: true, akce: 'ch2_framework_beton' },
          { t: 'ch2_framework_volba_krystof', kdy: 'kandidat_krystof && tym_potvrzen', jednou: true, akce: 'ch2_framework_krystof' },
          { t: 'ch2_volba_konec', konec: true, akce: 'ch2_framework_konec' },
        ],
      },

      predseda: {
        poprve: { kdy: "ma('plan')", akce: 'ch2_predseda_komise_uvod', jinak: 'ch2_predseda_komise_bez_planu' },
        vycerpano: 'ch2_predseda_vse',
        volby: [
          { t: 'ch2_predseda_volba_plan', kdy: "ma('plan')", akce: SCHVALENI },
          { t: 'ch2_predseda_volba_faze', kdy: 'faze_pozadovana && !faze_pozastavena', jednou: true, akce: ['ch2_predseda_faze_odmitnout', 'ch2_predseda_papir_nazor'] },
          { t: 'ch2_predseda_volba_mosty', kdy: "ma('plan')", jednou: true, akce: 'ch2_predseda_mosty' },
          { t: 'ch2_volba_konec', konec: true, akce: 'ch2_predseda_konec' },
        ],
      },

      stamgasti: {
        poprve: 'ch2_stamgasti_uvod',
        vycerpano: 'ch2_stamgasti_vse',
        volby: [
          { t: 'ch2_stamgasti_volba_co', jednou: true, akce: 'ch2_stamgasti_co' },
          { t: 'ch2_stamgasti_volba_jerab', jednou: true, akce: ['ch2_stamgasti_jerab', 'ch2_ruda_vratny_pozdeji', '$vratny_stopa'] },
          { t: 'ch2_volba_konec', konec: true, akce: 'ch2_stamgasti_konec' },
        ],
      },

      // P2.3 kotva: štamgasti a Pepa sázejí, Ruda může „dva dny“ přijmout
      sazka: {
        poprve: ['ch2_sazka_1', 'ch2_sazka_pepa', 'ch2_sazka_stamgasti_1', 'ch2_sazka_stamgasti_2'],
        znovu: 'ch2_sazka_znovu',
        volby: [
          { t: 'ch2_sazka_volba_kotva', akce: ['ch2_sazka_kotva_ruda', 'ch2_sazka_kotva_stamgasti', '$c2_odhad=kotva', '-tacky', '+odhad', '#'] },
          { t: 'ch2_sazka_volba_vsichni', jednou: true, akce: ['ch2_sazka_vsichni', 'ch2_sazka_pepa'] },
          { t: 'ch2_sazka_volba_ne', konec: true, akce: 'ch2_sazka_ne' },
        ],
      },

      // Potvrzení týmu u dveří hospody (R2.1)
      tym: {
        poprve: (h) => h.rekni('ch2_tym_otazka', vybrani(h).map((k) => NAZEV[k])),
        znovu: (h) => h.rekni('ch2_tym_otazka', vybrani(h).map((k) => NAZEV[k])),
        volby: [
          { t: 'ch2_tym_volba_plati', akce: [POTVRDIT_TYM, '#'] },
          { t: 'ch2_tym_volba_jeste', akce: ['ch2_tym_jeste', '#'] },
          { t: 'ch2_tym_volba_ven', akce: ['#', '>namesti'] },
        ],
      },
    },

    napovedy: [
      { id: 'slon', kdy: '!m04_hotovo', stupne: ['ch2_rada_slon_1', 'ch2_rada_slon_2', 'ch2_rada_slon_3'] },
      { id: 'tym', kdy: '!tym_potvrzen', stupne: ['ch2_rada_tym_1', 'ch2_rada_tym_2', 'ch2_rada_tym_3'] },
      { id: 'formular', kdy: "ma('formular') && !formular_podepsan", stupne: ['ch2_rada_formular_1', 'ch2_rada_formular_2', 'ch2_rada_formular_3'] },
      { id: 'odhad', kdy: '!c2_odhad', stupne: ['ch2_rada_odhad_1', 'ch2_rada_odhad_2', 'ch2_rada_odhad_3'] },
      { id: 'krabice', kdy: '!m07_hotovo', stupne: ['ch2_rada_krabice_1', 'ch2_rada_krabice_2', 'ch2_rada_krabice_3'] },
      { id: 'tabule', kdy: '!r22_hotovo', stupne: ['ch2_rada_tabule_1', 'ch2_rada_tabule_2', 'ch2_rada_tabule_3'] },
      { id: 'mapa', kdy: "!ma('plan') && !plan_orazitkovan", stupne: ['ch2_rada_mapa_1', 'ch2_rada_mapa_2', 'ch2_rada_mapa_3'] },
      { id: 'faze', kdy: 'faze_pozadovana && !faze_pozastavena', stupne: ['ch2_rada_faze_1', 'ch2_rada_faze_2', 'ch2_rada_faze_3'] },
      { id: 'komise', kdy: "ma('plan')", stupne: ['ch2_rada_komise'] },
      { id: 'nic', kdy: 'true', stupne: ['ch1_pembok_rada_nic'] },
    ],

    pamet: [
      { klic: 'ch2_pamet_tym_3', kdy: 'c2_tym_pokryti>=3' },
      { klic: 'ch2_pamet_tym_mezera', kdy: 'c2_tym_pokryti<3' },
      { klic: 'ch2_pamet_povaha', kdy: "c2_rozdeleni=='povaha' && c2_vyjimky>=2" },
      { klic: 'ch2_pamet_povaha_zelezo', kdy: "c2_rozdeleni=='povaha' && c2_vyjimky<2" },
      { klic: 'ch2_pamet_gantt', kdy: "c2_rozdeleni=='gantt'" },
      { klic: 'ch2_pamet_krabice', kdy: "c2_rozdeleni=='krabice'" },
      { klic: 'ch2_pamet_krysy', kdy: "c2_riziko_predem=='krysy'" },
      { klic: 'ch2_pamet_lano', kdy: "c2_riziko_predem=='lano'" },
      { klic: 'ch2_pamet_usmev', kdy: "c2_riziko_predem=='usmev'" },
      { klic: 'ch2_pamet_odhad_realny', kdy: "c2_odhad=='realny'" },
      { klic: 'ch2_pamet_odhad_kotva', kdy: "c2_odhad=='kotva'" },
      { klic: 'ch2_pamet_mosty', kdy: 'pocet(c2_mosty)>=2' },
      { klic: 'ch2_pamet_mosty_malo', kdy: 'pocet(c2_mosty)<2' },
      { klic: 'ch2_pamet_pokracovani', kdy: 'true' },
    ],

    minihry: {
      // M04 Jak sníst slona: kamenná půlka celá, mlžná jen nejbližší kousek
      m04: {
        nazev: 'ch2_m04_nazev', navod: 'ch2_m04_navod',
        priprav: () => ({
          druh: 'slon',
          kamen: [
            { id: 'rampa', klic: 'ch2_m04_cast_rampa', kusy: [
              { id: 'draha', klic: 'ch2_m04_kus_draha' }, { id: 'pilire', klic: 'ch2_m04_kus_pilire' },
              { id: 'plosina', klic: 'ch2_m04_kus_plosina' }, { id: 'rampa_cela', klic: 'ch2_m04_kus_rampa_cela', druh: 'velky' }] },
            { id: 'trup', klic: 'ch2_m04_cast_trup', kusy: [
              { id: 'kostra', klic: 'ch2_m04_kus_kostra' }, { id: 'plast', klic: 'ch2_m04_kus_plast' },
              { id: 'poklopy', klic: 'ch2_m04_kus_poklopy' }, { id: 'trup_cely', klic: 'ch2_m04_kus_trup_cely', druh: 'velky' }] },
            { id: 'pohon', klic: 'ch2_m04_cast_pohon', kusy: [
              { id: 'motory', klic: 'ch2_m04_kus_motory' }, { id: 'nadrze', klic: 'ch2_m04_kus_nadrze' },
              { id: 'pilire_motory', klic: 'ch2_m04_kus_pilire_motory', druh: 'prekryv' }] },
            { id: 'bezpecnost', klic: 'ch2_m04_cast_bezpecnost', kusy: [
              { id: 'pojistky', klic: 'ch2_m04_kus_pojistky' }, { id: 'vypnuti', klic: 'ch2_m04_kus_vypnuti' },
              { id: 'poklopy_pojistky', klic: 'ch2_m04_kus_poklopy_pojistky', druh: 'prekryv' }] },
          ],
          mlha: [
            { id: 'rizeni', klic: 'ch2_m04_cast_rizeni', blizko: 'ch2_m04_mlha_rizeni_blizko', daleko: 'ch2_m04_mlha_rizeni_daleko' },
            { id: 'aplikace', klic: 'ch2_m04_cast_aplikace', blizko: 'ch2_m04_mlha_aplikace_blizko', daleko: 'ch2_m04_mlha_aplikace_daleko' },
            { id: 'nastup', klic: 'ch2_m04_cast_nastup', blizko: 'ch2_m04_mlha_nastup_blizko', daleko: 'ch2_m04_mlha_nastup_daleko' },
            { id: 'interier', klic: 'ch2_m04_cast_interier', blizko: 'ch2_m04_mlha_interier_blizko', daleko: 'ch2_m04_mlha_interier_daleko' },
          ],
        }),
        vyhodnot: (h, v) => {
          if (v.kus) {
            const kus = h.data.minihry.m04.priprav().kamen.flatMap((c) => c.kusy).find((k) => k.id === v.kus);
            if (kus && kus.druh === 'velky') { h.rekni('ch2_m04_velky'); return { hotovo: false, prijato: false }; }
            return { hotovo: false, prijato: true };
          }
          if (v.mlha) {
            if (v.mlha.volba === 'daleko') {
              const i = (h.s.minihra.rozplynuti = (h.s.minihra.rozplynuti || 0) + 1);
              h.rekni(i % 2 ? 'ch2_m04_rozplynuti' : 'ch2_m04_rozplynuti_2');
              return { hotovo: false, prijato: false };
            }
            h.rekni('ch2_m04_mlha_ok');
            return { hotovo: false, prijato: true };
          }
          if (v.preskocit) { h.proved(['ch2_m04_preskocit', '$c2_rozpad=3']); }
          else {
            const vybrano = new Set(v.vybrano || []);
            const kamen = h.data.minihry.m04.priprav().kamen;
            const mezery = kamen.flatMap((c) => c.kusy).filter((k) => !k.druh && !vybrano.has(k.id)).length;
            const prekryvy = kamen.flatMap((c) => c.kusy).filter((k) => k.druh === 'prekryv' && vybrano.has(k.id)).length;
            if (prekryvy) h.rekni('ch2_m04_prekryv');
            if (mezery) h.rekni('ch2_m04_mezera');
            h.nastav('c2_rozpad=' + Math.min(3, mezery + prekryvy));
            h.rekni(mezery + prekryvy ? 'ch2_m04_hotovo_slabe' : 'ch2_m04_hotovo');
          }
          // Klíč zůstane v zámku brány (02-mistnosti, D81)
          h.proved(['ch2_m04_brana_volna', '-kreda', '-klic', '$m04_hotovo', '$hangar_otevren']);
          return { hotovo: true };
        },
      },

      // R2.2 Rozdělení Archy na tabuli: nechat Gantt, krabice, nebo část po části
      tabule: {
        nazev: 'ch2_tabule_nazev', navod: 'ch2_tabule_navod',
        priprav: (h) => {
          const p = h.s.priznaky;
          const nesmysly = p.c1_slib_vseho >= 3 && !p.c1_mimo_rozsah;
          return {
            druh: 'tabule',
            sloupce: [{ id: 'ruda', klic: 'ch2_tabule_sloupec_ruda' }, { id: 'bara', klic: 'ch2_tabule_sloupec_bara' }],
            magnety: [
              ...['rampa', 'trup', 'pohon', 'bezpecnost', 'rizeni', 'aplikace', 'nastup', 'interier'].map((id) => ({ id, klic: 'ch2_magnet_' + id })),
              ...(nesmysly ? ['fontana', 'bazen', 'terasa'].map((id) => ({ id, klic: 'ch2_magnet_' + id, nesmysl: true })) : []),
            ],
          };
        },
        vyhodnot: (h, v) => {
          const BEZNE = { rampa: 'ruda', trup: 'ruda', pohon: 'ruda', rizeni: 'bara', aplikace: 'bara', nastup: 'bara' };
          const hotovo = (akce) => { h.proved([...akce, '$r22_hotovo', 'ch2_tabule_odchod']); return { hotovo: true }; };
          if (v.cesta === 'gantt') return hotovo(['ch2_tabule_gantt_ruda', 'ch2_tabule_gantt_bara', '$c2_rozdeleni=gantt', '$c2_vyjimky=0', '$bezp_u_rudy']);
          if (v.cesta === 'krabice') return hotovo(['ch2_tabule_krabice', 'ch2_tabule_krabice_bara', '$c2_rozdeleni=krabice', '$c2_vyjimky=0']);
          const pr = v.prirazeni || {};
          const magnety = h.data.minihry.tabule.priprav(h).magnety;
          if (magnety.some((m) => !pr[m.id])) { h.rekni('ch2_tabule_nedokonceno'); return { hotovo: false }; }
          const nesmysl = magnety.find((m) => m.nesmysl && pr[m.id] !== 'pryc');
          if (nesmysl) { h.rekni('ch2_tabule_nesmysl'); return { hotovo: false, vratit: [nesmysl.id] }; }
          const spatne = Object.keys(BEZNE).filter((id) => pr[id] !== BEZNE[id]);
          if (spatne.length) { h.rekni('ch2_tabule_namitka_' + spatne[0]); return { hotovo: false, vratit: spatne }; }
          const vyjimky = (pr.bezpecnost === 'ruda' ? 1 : 0) + (pr.interier === 'bara' ? 1 : 0);
          // Kapitola 3 potřebuje vědět, která výjimka chybí (interiér, bezpečnostní systém)
          return hotovo(['ch2_tabule_povaha', '$c2_rozdeleni=povaha', '$c2_vyjimky=' + vyjimky,
            '$c2_interier=' + pr.interier, '$c2_bezpecnost=' + pr.bezpecnost,
            ...(pr.bezpecnost === 'ruda' ? ['$bezp_u_rudy'] : []),
            ...(pr.interier === 'ruda' ? ['$interier_u_rudy'] : []),
            vyjimky === 2 ? 'ch2_tabule_povaha_bara' : 'ch2_tabule_povaha_zelezo']);
        },
      },

      // M07 Krabice od bot: obálka na jeden lístek, mlžné lístky dostanou razítko Zkusíme
      m07: {
        nazev: 'ch2_m07_nazev', navod: 'ch2_m07_navod',
        priprav: (h) => ({
          druh: 'krabice',
          listky: [
            { id: 'krysy', klic: 'ch2_m07_listek_krysy' }, { id: 'lano', klic: 'ch2_m07_listek_lano' },
            { id: 'usmev', klic: 'ch2_m07_listek_usmev' }, { id: 'nastup', klic: 'ch2_m07_listek_nastup', zkusime: true },
            { id: 'odhad', klic: 'ch2_m07_listek_odhad', zkusime: true },
          ].filter((l) => h.s.priznaky['listek_' + l.id]),
        }),
        vyhodnot: (h, v) => {
          const l = h.data.minihry.m07.priprav(h).listky.find((x) => x.id === v.obalka);
          if (!l) return { hotovo: false };
          if (l.zkusime) { h.rekni('ch2_m07_zkusime'); return { hotovo: false, zkusime: l.id }; }
          const listky = h.data.minihry.m07.priprav(h).listky.map((x) => x.id);
          h.proved(['ch2_m07_obalka_' + l.id, '$c2_riziko_predem=' + l.id, '$c2_rizika_zapsana=' + listky.join('-'), '-obalka', '$m07_hotovo', 'ch2_m07_hotovo']);
          return { hotovo: true };
        },
      },

      // M06 Mapa do neznáma: u každého mostu přesný bod na cestě a hrubá dlaždice na řece
      m06: {
        nazev: 'ch2_m06_nazev', navod: 'ch2_m06_navod',
        priprav: (h) => {
          const p = h.s.priznaky;
          const rekaJe = p.c2_rozdeleni !== 'gantt';
          const cestaPresna = p.c2_rozdeleni !== 'krabice';
          const most = (id, presna, mlhava, podrobna, hruba) => ({
            id, klic: 'ch2_m06_most_' + id,
            cesta: [cestaPresna ? { id: 'presna', klic: presna } : null, { id: 'mlhava', klic: mlhava }].filter(Boolean),
            reka: rekaJe ? [{ id: 'podrobna', klic: podrobna }, { id: 'hruba', klic: hruba }] : [{ id: 'zadna', klic: 'ch2_m06_reka_zadna' }],
          });
          return {
            druh: 'mapa', sloupce: ['25', '22', '19', '16', '13', '10', '7', '4'],
            mosty: [
              { ...most('trup', 'ch2_m06_cesta_trup', 'ch2_m06_cesta_trup_mlhava', 'ch2_m06_reka_rizeni_podrobna', 'ch2_m06_reka_rizeni_hruba'), sloupec: 3 },
              { ...most('nastup', 'ch2_m06_cesta_rampa', 'ch2_m06_cesta_rampa_mlhava', 'ch2_m06_reka_nastup_podrobna', 'ch2_m06_reka_nastup_hruba'), sloupec: 6 },
              { ...most('start', 'ch2_m06_cesta_podpis', 'ch2_m06_cesta_podpis_mlhava', 'ch2_m06_reka_aplikace_podrobna', 'ch2_m06_reka_aplikace_hruba'), sloupec: 8 },
            ],
            rampa: p.c2_odhad === 'kotva' ? 'ch2_m06_rampa_kotva' : 'ch2_m06_rampa_realna',
          };
        },
        vyhodnot: (h, v) => {
          const p = h.s.priznaky;
          const st = h.s.minihra;
          const hotovo = (mosty) => {
            h.nastav('c2_mosty=' + (mosty.join('-') || 'zadny'));
            h.proved([mosty.length >= 2 ? 'ch2_m06_hotovo' : 'ch2_m06_hotovo_slabe', '+plan', '$m06_hotovo']);
            return { hotovo: true };
          };
          if (v.preskocit) { h.rekni('ch2_m06_preskocit'); return hotovo(['start']); }
          const vol = v.mosty || {};
          const drzi = [];
          const chyby = [];
          for (const id of ['trup', 'nastup', 'start']) {
            const m = vol[id] || {};
            if (p.c2_rozdeleni === 'gantt' || p.c2_rozdeleni === 'krabice') {
              if (id === 'start') drzi.push('start');
              continue;
            }
            if (m.cesta !== 'presna') { chyby.push('ch2_m06_chyba_cesta'); continue; }
            if (m.reka === 'podrobna') { chyby.push('ch2_m06_chyba_podrobna'); continue; }
            if (m.reka !== 'hruba') { chyby.push('ch2_m06_chyba_reka'); continue; }
            if (id === 'nastup' && p.c2_odhad === 'kotva') { chyby.push('ch2_m06_kotva'); continue; }
            if (id === 'start' && !p.bezp_u_rudy) { chyby.push('ch2_m06_bezpecnost_reka'); continue; }
            drzi.push(id);
          }
          if (p.c2_rozdeleni === 'gantt') h.rekni('ch2_m06_gantt');
          if (p.c2_rozdeleni === 'krabice') h.rekni('ch2_m06_krabice');
          if (p.interier_u_rudy) h.rekni('ch2_m06_interier_cesta');
          // Opravitelné chyby (ne kotva, ne výjimka) jde zkusit ještě jednou
          const opravitelne = chyby.filter((c) => c === 'ch2_m06_chyba_cesta' || c === 'ch2_m06_chyba_podrobna' || c === 'ch2_m06_chyba_reka');
          for (const c of [...new Set(chyby)]) h.rekni(c);
          if (opravitelne.length && !v.prijmout && (st.pokusy || 0) < 2) {
            st.pokusy = (st.pokusy || 0) + 1;
            if (p.c1_bara_vyslechnuta >= 2) h.rekni('ch2_m06_bara_rada');
            return { hotovo: false };
          }
          return hotovo(drzi);
        },
      },
    },

    pruchody: {},
  };

  // Dialogy kandidátů: uvítání, co umí, zkouška, třetí téma, do týmu a ven
  for (const k of KANDIDATI) {
    data.dialogy[k] = {
      poprve: 'ch2_' + k + '_uvod',
      vycerpano: 'ch2_' + k + '_vse',
      volby: [
        { t: 'ch2_kandidat_volba_umite', jednou: true, akce: 'ch2_' + k + '_umi' },
        { t: 'ch2_kandidat_volba_zkouska', jednou: true, akce: ['ch2_' + k + '_zkouska_1', 'ch2_' + k + '_zkouska_2', '$zkouska_' + k] },
        { t: 'ch2_' + k + '_volba_tema', jednou: true, akce: ['ch2_' + k + '_tema', ...(k === 'zdenda' ? ['ch2_ruda_vratny_pozdeji', '$vratny_stopa'] : [])] },
        { t: 'ch2_kandidat_volba_tym', kdy: '!kandidat_' + k + ' && !tym_potvrzen && pocet_kandidatu<4', akce: ['ch2_' + k + '_ano', '$kandidat_' + k, '$pocet_kandidatu+1'] },
        { t: 'ch2_kandidat_volba_tym', kdy: '!kandidat_' + k + ' && !tym_potvrzen && pocet_kandidatu>=4', akce: 'ch2_tym_plno' },
        { t: 'ch2_kandidat_volba_ne', kdy: 'kandidat_' + k + ' && !tym_potvrzen', akce: ['ch2_' + k + '_ne', '$kandidat_' + k + '=0', '$pocet_kandidatu+-1'] },
        { t: 'ch2_volba_konec', konec: true, akce: 'ch2_kandidat_konec' },
      ],
    };
  }

  // Průchody z docs/kapitoly/02-pruchod.md
  const DO_TYMU = (kdo) => kdo.flatMap((k) => ['pouzij ' + k, 'volba ch2_kandidat_volba_tym', 'volba ch2_volba_konec']);
  const ZKOUSKY = ['pepa', 'vera', 'norbert', 'klara'].flatMap((k) => ['pouzij ' + k, 'volba ch2_kandidat_volba_zkouska', 'volba ch2_volba_konec']);
  const DOBRY_TYM = ['vera', 'pepa', 'norbert', 'klara'];
  const TABULE_POVAHA = { prirazeni: { rampa: 'ruda', trup: 'ruda', pohon: 'ruda', bezpecnost: 'ruda', rizeni: 'bara', aplikace: 'bara', nastup: 'bara', interier: 'bara' } };
  const MAPA_DOBRA = { mosty: { trup: { cesta: 'presna', reka: 'hruba' }, nastup: { cesta: 'presna', reka: 'hruba' }, start: { cesta: 'presna', reka: 'hruba' } } };
  const M04_DOBRE = { vybrano: ['draha', 'pilire', 'plosina', 'kostra', 'plast', 'poklopy', 'motory', 'nadrze', 'pojistky', 'vypnuti'] };
  const ZACATEK = [
    'pouzij ulice',
    'pouzij tabule_odhad', 'pouzij vycep', ...ZKOUSKY,
    'pouzij dvere', 'pouzij ulicka',
    'predmet klic brana', 'predmet kreda slon', { minihra: M04_DOBRE },
    'pouzij brana',
    'pouzij kokpit', 'prohledni kabely', 'prohledni predseda',
    'pouzij brana', 'prohledni lano', 'pouzij ulicka',
    'pouzij ulice', ...DO_TYMU(DOBRY_TYM), 'pouzij dvere', 'volba ch2_tym_volba_plati',
  ];
  const TACKY = (kdo) => kdo.map((k) => 'predmet tacky ' + k);
  const NA_PLAN = ['pouzij vrata', 'pouzij kamen', { minihra: MAPA_DOBRA }, 'pouzij vrata', 'pouzij brana', 'pouzij ulicka', 'pouzij dvere_radnice'];

  data.pruchody = {
    nejkratsi: {
      popis: 'Nejkratší cesta, dobrá kapitola 1 (02-pruchod.md §1)',
      start: 'dobra',
      kroky: [
        ...ZACATEK,
        'pouzij sazky', 'volba ch2_sazka_volba_ne', ...TACKY(DOBRY_TYM),
        'pouzij dvere', 'pouzij ulicka', 'pouzij brana',
        'pouzij tabule', { minihra: TABULE_POVAHA },
        'pouzij stul', { minihra: { obalka: 'lano' } },
        ...NA_PLAN,
        'predmet plan predseda',
      ],
      ocekavej: ['konec', "c2_tym=='pepa-vera-norbert-klara'", 'c2_tym_pokryti==3', "c2_rozdeleni=='povaha'", 'c2_vyjimky==2',
        "c2_riziko_predem=='lano'", "c2_odhad=='realny'", "c2_mosty=='trup-nastup-start'", 'c2_rozpad==0', 'dny==25'],
    },
    spatna_kapitola1: {
      popis: 'Špatná kapitola 1: formulář, fáze 2, nesmysly na tabuli (02-pruchod.md §3)',
      start: 'spatna',
      kroky: [
        'predmet propiska kava',
        ...ZACATEK,
        ...['vera', 'pepa', 'norbert'].map((k) => 'predmet formular ' + k),
        'pouzij sazky', 'volba ch2_sazka_volba_ne', ...TACKY(DOBRY_TYM),
        'pouzij dvere', 'pouzij ulicka', 'pouzij brana',
        'pouzij tabule',
        { minihra: TABULE_POVAHA },
        { minihra: { prirazeni: { ...TABULE_POVAHA.prirazeni, fontana: 'pryc', bazen: 'pryc', terasa: 'pryc' } } },
        'pouzij stul', { minihra: { obalka: 'usmev' } },
        'pouzij kalendar',
        ...NA_PLAN,
        'predmet formular predseda', 'predmet plan predseda', 'predmet list predseda',
      ],
      ocekavej: ['konec', 'formular_odevzdan', 'faze_pozastavena', "c2_riziko_predem=='usmev'", "c2_mosty=='trup-nastup-start'"],
    },
    A_gantt: {
      popis: 'Varianta A: Gantt na všechno, M06 jen most start',
      start: 'dobra',
      kroky: [
        ...ZACATEK,
        'pouzij sazky', 'volba ch2_sazka_volba_ne', ...TACKY(DOBRY_TYM),
        'pouzij dvere', 'pouzij ulicka', 'pouzij brana',
        'pouzij tabule', { minihra: { cesta: 'gantt' } },
        'pouzij stul', { minihra: { obalka: 'krysy' } },
        'pouzij vrata', 'pouzij kamen', { minihra: MAPA_DOBRA },
        'ocekavej c2_mosty==\'start\'',
      ],
      ocekavej: ["c2_rozdeleni=='gantt'", "c2_mosty=='start'", "c2_riziko_predem=='krysy'"],
    },
    D_kotva_E_kamaradi: {
      popis: 'Varianty D a E: kotva „dva dny“ a tým bez certifikátora',
      start: 'dobra',
      kroky: [
        'pouzij ulice', 'pouzij tabule_odhad', 'pouzij dvere', 'pouzij ulicka',
        'predmet klic brana', 'predmet kreda slon', { minihra: { preskocit: true } },
        'pouzij brana', 'pouzij kokpit', 'prohledni kabely', 'prohledni predseda', 'pouzij brana', 'prohledni lano', 'pouzij ulicka',
        'pouzij ulice', ...DO_TYMU(['zdenda', 'krystof', 'pepa', 'vera']), 'pouzij dvere', 'volba ch2_tym_volba_plati',
        'pouzij sazky', 'volba ch2_sazka_volba_kotva',
        'pouzij dvere', 'pouzij ulicka', 'pouzij brana',
        'pouzij tabule', { minihra: TABULE_POVAHA },
        'pouzij stul', { minihra: { obalka: 'krysy' } },
        'pouzij vrata', 'pouzij kamen', { minihra: MAPA_DOBRA },
      ],
      ocekavej: ["c2_odhad=='kotva'", 'c2_tym_pokryti==2', 'c2_rozpad==3', "c2_mosty=='trup-start'"],
    },
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  else koren.KAPITOLA2 = data;
})(typeof window !== 'undefined' ? window : globalThis);
