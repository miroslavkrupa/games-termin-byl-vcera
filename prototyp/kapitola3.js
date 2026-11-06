// Kapitola 3 jako data pro šedý prototyp. Zdroj pravdy pro logiku jsou dokumenty
// docs/kapitoly/03-*.md. Repliky jsou pracovní a jen česky: prototyp/texty/kapitola3.csv.
// Hraje se za dva: Ruda a Bára stojí každý ve své scéně, přepíná se portrétem (s.kde, ~).
(function (koren) {
  'use strict';

  const TYM = (k) => `obsahuje(c2_tym, '${k}')`;
  const ZKOUSI = ['pepa', 'klara', 'krystof', 'zdenda'];
  const NAZEV = { pepa: 'postava_pepa', vera: 'postava_vera', norbert: 'postava_norbert', klara: 'postava_klara', zdenda: 'postava_zdenda', krystof: 'postava_krystof' };
  const vTymu = (h, k) => String(h.s.priznaky.c2_tym || '').split('-').includes(k);
  const DUVERA = "c1_bara_vyslechnuta>=2 && c2_rozdeleni!='gantt'";
  const KOCKA = "c2_riziko_predem=='krysy'";
  const KRABICE = "c2_rozdeleni=='krabice'";
  const GANTT = "c2_rozdeleni=='gantt'";
  const INTERIER_RUDA = "(c2_interier=='ruda' || c2_rozdeleni=='gantt')";
  // Bezpečnostní systém ve světě iterací: zařazený k Báře, nebo krabice na všechno (D80, čte i kap. 5)
  const BEZP_ITERACE = "(c2_bezpecnost=='bara' || c2_rozdeleni=='krabice')";
  const BEZ_ZKOUSENI = "!obsahuje(c2_tym, 'pepa') && !obsahuje(c2_tym, 'klara')";
  const NORBERT_CHYBI = "!obsahuje(c2_tym, 'norbert') && !norbert_podpis";
  const POKLOP_SCHVALEN = "(poklop_schvalen=='ano' || poklop_schvalen=='netesni')";
  const RUDA = "postava()=='ruda'";
  const BARA = "postava()=='bara'";
  const jmenoTvora = (creep) => 'ch3_jmeno_' + Math.max(0, Math.min(4, creep || 0));

  // --- přechody fází ---------------------------------------------------------
  const FAZE_B = { kdy: 'm13_hotovo && plan_kola_hotovo && !faze_b', akce: [
    '$faze_b', '$dny=21', '*karta:ch3_ui_zbyva_21', 'ch3_strih_21_pilire', 'ch3_strih_21_kometa',
    { kdy: '!sklad_otevren', akce: 'ch3_strih_21_vratny' },
    { kdy: BARA, akce: 'ch3_strih_21_bara', jinak: 'ch3_strih_21_ruda' }] };
  const FAZE_C = { kdy: 'r32_hotovo && krysy_pryc && !faze_c', akce: [
    '$faze_c', '$dny=12', '*karta:ch3_ui_zbyva_12', 'ch3_strih_12_trup', 'ch3_strih_12_vera'] };

  // --- krysy ve skladu (P3.2) ------------------------------------------------
  const KRYSY_DO_AKTOVKY = [
    'ch3_krysy_stopa', 'ch3_krysy_aktovka_1', 'ch3_krysy_aktovka_2', 'ch3_krysy_aktovka_predseda', 'ch3_krysy_aktovka_hybe',
    '-zadosti', '$krysy_pryc', '$c3_krysy=aktovka', '$predseda_odesel', 'ch3_plechy_odvezou', FAZE_C];
  const ZADOSTI_STOPA = { kdy: 'krysy_pryc', akce: 'ch3_aktovka_uz', jinak: {
    kdy: '!sklad_otevren', akce: 'ch3_aktovka_zamceno', jinak: KRYSY_DO_AKTOVKY } };
  const KOCKA_SKLAD = { kdy: 'krysy_pryc', akce: 'ch3_kocka_hlida', jinak: {
    kdy: '!sklad_otevren', akce: 'ch3_kocka_zamceno', jinak: [
      'ch3_kocka_pojd', 'ch3_kocka_pohled', 'ch3_kocka_dovolena', '$krysy_pryc', '$c3_krysy=kocka', 'ch3_plechy_odvezou', FAZE_C] } };

  // --- chybějící dovednost (P3.3) --------------------------------------------
  const VYPOCET = { kdy: 'vypocet_predan', akce: 'ch3_vratny_vypocet_uz', jinak: [
    'ch3_vratny_vypocet_prijat', 'ch3_vratny_vypocet_ruda', '-vypocet', '$vypocet_predan'] };
  const NORBERT_PEMBOK = { kdy: 'norbert_podpis', akce: 'ch3_norbert_lavicka_uz', jinak: [
    'ch3_pembok_slib_mlcet', 'ch3_norbert_lavicka_jde', 'ch3_pembok_teda', '$norbert_podpis', '$c3_rezerva+-1'] };

  // --- klíč od skladu (D75) ----------------------------------------------------
  // Ve fázi A vrátný betonuje pilíře a z kabiny neleze, klíč dá až ve fázi B. Bez Věry do kabiny
  // bez výpočtu statika nesedne, takže má čas hned (výpočet leží v krysím hnízdě).
  const KLIC_JDE = `faze_b || !${TYM('vera')}`;
  const KLIC_SKLADU = { kdy: KLIC_JDE, akce: [
    { kdy: '!faze_b', akce: 'ch3_vratny_klic_cas' }, 'ch3_vratny_klic_1', 'ch3_vratny_klic_2', '+klic_sklad'],
    jinak: ['ch3_vratny_klic_pozdeji', 'ch3_vratny_klic_pozdeji_ruda'] };

  // --- jeřáb a M13 ----------------------------------------------------------
  const JERAB = { kdy: 'm13_hotovo', akce: 'ch3_jerab_hotovo', jinak: {
    kdy: `!${TYM('vera')} && !vypocet_predan`, akce: ['ch3_vratny_vypocet_1', 'ch3_vratny_vypocet_2', '$vypocet_chybi'],
    jinak: ['ch3_vratny_zacneme', '@m13'] } };

  // --- dílna (P3.5) ----------------------------------------------------------
  const DILNA = { kdy: '!dilna_volna && sloupek_hotov && maketa_hotova && cidlo_odlozeno && model_odlozeno && (c2_rozpad<2 || plech_odlozeno) && napad_resen && (!napad_prijat || napad_odlozeno)',
    akce: ['ch3_dilna_volna', '$dilna_volna'] };
  const NAPAD = { kdy: '!napad_resen', akce: [
    { kdy: TYM('pepa'), akce: 'ch3_napad_pepa', jinak: { kdy: TYM('klara'), akce: 'ch3_napad_klara', jinak: 'ch3_napad_krystof' } }, '#napad'] };
  const ODLOZIT = (co) => ['ch3_odlozit_' + co, '-' + co, '$' + co + '_odlozeno', DILNA];

  // --- plán kola a M14 (P3.6, P3.7) ------------------------------------------
  const PLAN_KOLA = { kdy: 'plan_kola_hotovo', akce: { kdy: 'm10_hotovo', akce: 'ch3_seznam_po_zmenach', jinak: { kdy: 'm14_hotovo', akce: 'ch3_seznam_po_ukazce', jinak: 'ch3_seznam_hotovo' } },
    jinak: { kdy: '!porada_hotova', akce: 'ch3_seznam_nejdriv_porada', jinak: {
      kdy: '!dilna_volna', akce: 'ch3_seznam_nejdriv_dokoncit', jinak: ['ch3_plan_kola_uvod', '@plan_kola'] } } };
  const KARTY14 = {
    odpocet: { odhad: 3, hodnota: 0 }, heslo: { odhad: 2, hodnota: -1 }, sipky: { odhad: 2, hodnota: 3 },
    mapa: { odhad: 2, hodnota: 2 }, maketa: { odhad: 2, hodnota: 1 },
    tlacitka: { odhad: 0, hodnota: 3 }, udice: { odhad: 0, hodnota: 3 }, kocour: { odhad: 0, hodnota: 2 },
  };
  const ZAKLADNI14 = ['odpocet', 'heslo', 'sipky', 'mapa', 'maketa'];
  const kapacitaKola = (p) => (!vTymuP(p, 'pepa') && !vTymuP(p, 'klara') ? 2 : 3);
  const vTymuP = (p, k) => String(p.c2_tym || '').split('-').includes(k);
  const JESTETOTO = { kdy: '!jestetoto', akce: ['ch3_jestetoto_narozeni_1', 'ch3_jestetoto_narozeni_2', 'ch3_jestetoto_narozeni_3', '$jestetoto'] };

  // --- vada v počítadle (P3.8) -----------------------------------------------
  const VADA_HLASENA = ['ch3_vada_ruda_kdo', 'ch3_vada_bara_ty', 'ch3_vada_ruda_ticho', 'ch3_vada_ruda_oprav', '-zapis', '$c3_vada_hlasena=ano'];
  const ZAPIS_RUDOVI = { kdy: "c3_vada_hlasena=='ano'", akce: 'ch3_vada_uz_vi', jinak: {
    kdy: DUVERA, akce: ['ch3_vada_bara_rika', ...VADA_HLASENA], jinak: {
      kdy: 'bara_odbyta', akce: 'ch3_vada_bara_znovu', jinak: ['ch3_vada_bara_rika', 'ch3_vada_ruda_odbyti', 'ch3_vada_bara_stejne', '$bara_odbyta'] } } };

  // --- konec kapitoly ------------------------------------------------------
  const KONEC = [
    { kdy: '!c3_vada_hlasena', akce: '$c3_vada_hlasena=ne' },
    { kdy: '!c3_retro', akce: '$c3_retro=ne' },
    '*karta:ch3_ui_zbyva_9', '$dny=9', 'ch3_konec_archa',
    { kdy: 'c3_rezerva>=0', akce: 'ch3_konec_rampa_hotova', jinak: 'ch3_konec_rampa_bez_plosiny' },
    { kdy: "c3_bara_priority=='ano'", akce: 'ch3_konec_ruda_my', jinak: 'ch3_konec_ruda_ja' },
    'ch3_konec_tlacitko', 'ch3_konec_nic', 'ch3_konec_tlacitko_2', 'ch3_konec_nic_2',
    { kdy: 'jestetoto', akce: 'ch3_konec_jestetoto' },
    { kdy: TYM('pepa'), akce: 'ch3_konec_pepa', jinak: 'ch3_konec_nekdo' },
    { kdy: "c3_vada_hlasena=='ano'", akce: 'ch3_konec_bara_pocitadlo', jinak: 'ch3_konec_bara_odvrati' },
    { kdy: "c3_bara_priority=='ano'", akce: 'ch3_konec_bara_usmev' },
    'ch3_konec_kometa', '*konec'];

  // Druhá postava stojí ve scéně jako postava, se kterou jde mluvit a předávat předměty
  const ROZPIS_BARE = { kdy: "c3_bara_zna_lavku || obsahuje(c2_mosty, 'nastup')", akce: 'ch3_rozpis_bara_uz', jinak: ['ch3_rozpis_bara_1', 'ch3_rozpis_bara_2', '$c3_bara_zna_lavku'] };
  const druha = (scena, r) => [
    { id: 'bara', nazev: 'postava_bara', druh: 'postava', postava: 'ruda', kdy: `kde('bara')=='${scena}'`, r, obraz: 'postava_bara',
      prohlednout: { kdy: 'vada_nalezena && !c3_vada_hlasena && !vada_skocil', akce: 'ch3_bara_mraci', jinak: 'ch3_bara_prohlednout' },
      pouzit: { kdy: 'vada_nalezena && !c3_vada_hlasena && !vada_skocil', akce: '#vada_ruda', jinak: '#bara' },
      na: {
        rozpis: ROZPIS_BARE, kava: 'ch3_bara_kava', krabice: 'ch3_bara_krabice', plan: 'ch3_bara_plan', poklop: 'ch3_bara_poklop',
        pembok: 'ch3_bara_pembok', zadosti: 'ch3_bara_zadosti', kavove_pero: 'ch3_bara_pero', buchta: 'ch3_bara_buchta',
      } },
    { id: 'ruda', nazev: 'postava_ruda', druh: 'postava', postava: 'bara', kdy: `kde('ruda')=='${scena}'`, r: [r[0] + 7, r[1], r[2], r[3]],
      bara_prohlednout: 'ch3_ruda_prohlednout',
      bara_pouzit: { stridat: [{ kdy: GANTT, akce: 'ch3_ruda_mluvit_gantt', jinak: 'ch3_ruda_mluvit_1' }, 'ch3_ruda_mluvit_2'] },
      bara_na: {
        zapis: ZAPIS_RUDOVI, seznam: 'ch3_seznam_pasazeru_ruda', listky: 'ch3_listky_ruda', metr: 'ch3_metr_ruda',
        model: { kdy: "scena()=='dilna'", akce: ['ch3_model_ruda_dostal', '-model', '$model_odlozeno', DILNA], jinak: 'ch3_model_ruda_jinde' },
        kabel: 'ch3_kabel_ruda', cidlo: 'ch3_cidlo_ruda',
      } },
  ];

  const data = {
    kapitola: 3,
    nazev: 'ch3_ui_kapitola',
    ukol: 'ch3_ui_ukol',
    dny: 'ch1_ui_kometa_dny',
    pamet_nadpis: 'ch2_pamet_nadpis',
    nese: '^c[12]_',
    bara_chodi: true,
    prepinani: 'prepinani',
    // Stav z kapitol 1 a 2 (03-pruchod.md: výchozí stav nejkratší cesty a „špatné“ kapitoly)
    predvolby: {
      dobra: {
        popis: 'Dobré kapitoly 1 a 2 (03-pruchod.md, nejkratší cesta)',
        priznaky: {
          c1_bara_vyslechnuta: 3, c1_slib_vseho: 0, c1_mimo_rozsah: true, c1_faze2: 0, c1_razitko: 'poduska', c1_babicka: 'spojenec', c1_zmena_dohoda: true, c1_charter_kvalita: 3, c1_seznam_pasazeru: true,
          c2_tym: 'pepa-vera-norbert-klara', c2_tym_pokryti: 3, c2_rozdeleni: 'povaha', c2_vyjimky: 2, c2_interier: 'bara', c2_bezpecnost: 'ruda',
          c2_riziko_predem: 'lano', c2_rizika_zapsana: 'krysy-lano-usmev', c2_odhad: 'realny', c2_rozpad: 0, c2_mosty: 'trup-nastup-start',
        },
        predmety: ['pembok', 'kava', 'kavove_pero', 'krabice', 'plan'],
      },
      spatna: {
        popis: 'Špatné kapitoly 1 a 2 (03-pruchod.md, varianty)',
        priznaky: {
          c1_bara_vyslechnuta: 0, c1_slib_vseho: 4, c1_faze2: true, c1_razitko: 'kava', c1_babicka: 'prehlizena', c1_charter_kvalita: 1, c1_seznam_pasazeru: true,
          c2_tym: 'zdenda-krystof-pepa-vera', c2_tym_pokryti: 2, c2_rozdeleni: 'gantt', c2_vyjimky: 0,
          c2_riziko_predem: 'usmev', c2_rizika_zapsana: 'krysy-lano-usmev', c2_odhad: 'kotva', c2_rozpad: 3, c2_mosty: 'start',
        },
        predmety: ['pembok', 'kava', 'propiska', 'krabice', 'plan', 'kopie'],
      },
    },

    start: {
      scena: 'staveniste',
      priznaky: { dny: 24, pembok_otevren: true, c3_creep: 0, c3_dluh: 0, c3_rezerva: 0 },
      predmety: ['pembok', 'kava', 'kavove_pero', 'krabice', 'plan'],
      predmety_bara: ['metr', 'seznam'],
      kde: { bara: 'dilna' },
      akce: [
        '*karta:ch3_ui_kapitola', 'ch3_uvod_rano', 'ch3_uvod_ruda_umim', 'ch3_uvod_pembok_umis', 'ch3_uvod_ruda_pochvala',
        'ch3_uvod_bara_dilna', 'ch3_uvod_ruda_napisu', 'ch3_uvod_bara_nenapises',
        'ch3_uvod_predseda', 'ch3_uvod_predseda_zadosti', { kdy: 'c1_faze2', akce: 'ch3_uvod_predseda_faze2' }, '+zadosti',
        { kdy: KRABICE, akce: 'ch3_uvod_framework' },
        { kdy: KOCKA, akce: ['ch3_uvod_kocka', 'ch3_uvod_kocka_ruda'] },
        { kdy: `!${TYM('pepa')} && !${TYM('klara')} && !${TYM('krystof')}`, akce: '$napad_resen' },
        'ch3_uvod_pembok_prepnout', '$prepinani', '*karta:ch3_ui_ukol'],
    },

    predmety: {
      pembok: { nazev: 'predmet_pembok', prohlednout: 'predmet_pembok_prohlednout', pouzit: '?' },
      kava: { nazev: 'predmet_kava', prohlednout: 'ch3_kava_prohlednout' },
      kavove_pero: { nazev: 'predmet_kavove_pero', prohlednout: 'predmet_kavove_pero_prohlednout' },
      propiska: { nazev: 'predmet_propiska', prohlednout: 'predmet_propiska_prohlednout' },
      klic: { nazev: 'predmet_klic', prohlednout: 'ch2_klic_prohlednout' },
      kopie: { nazev: 'predmet_kopie', prohlednout: 'ch2_kopie_prohlednout' },
      krabice: { nazev: 'predmet_krabice', prohlednout: 'ch3_krabice_prohlednout' },
      plan: { nazev: 'predmet_plan', prohlednout: { kdy: 'c1_faze2', akce: 'ch3_plan_prohlednout_faze', jinak: 'ch3_plan_prohlednout' } },
      buchta: { nazev: 'predmet_buchta', prohlednout: 'predmet_buchta_prohlednout', pouzit: ['ch2_buchta_snist', '-buchta'] },
      zadosti: { nazev: 'predmet_zadosti', prohlednout: 'predmet_zadosti_prohlednout' },
      klic_sklad: { nazev: 'predmet_klic_sklad', prohlednout: 'predmet_klic_sklad_prohlednout' },
      vypocet: { nazev: 'predmet_vypocet', prohlednout: 'predmet_vypocet_prohlednout' },
      rozpis: { nazev: 'predmet_rozpis', prohlednout: { kdy: 'c3_rezerva>=1', akce: 'predmet_rozpis_rezerva', jinak: 'predmet_rozpis_tesne' } },
      poklop: { nazev: 'predmet_poklop', prohlednout: 'predmet_poklop_prohlednout' },
      // Bářiny předměty
      metr: { nazev: 'predmet_metr', prohlednout: 'predmet_metr_prohlednout', pouzit: '?' },
      seznam: { nazev: 'predmet_seznam', prohlednout: 'predmet_seznam_prohlednout' },
      kabel: { nazev: 'predmet_kabel', prohlednout: 'predmet_kabel_prohlednout' },
      listky: { nazev: 'predmet_listky', prohlednout: 'predmet_listky_prohlednout' },
      zapis: { nazev: 'predmet_zapis', prohlednout: 'predmet_zapis_prohlednout' },
      cidlo: { nazev: 'predmet_cidlo', prohlednout: 'predmet_cidlo_prohlednout' },
      model: { nazev: 'predmet_model', prohlednout: 'predmet_model_prohlednout' },
      plech: { nazev: 'predmet_plech', prohlednout: 'predmet_plech_prohlednout' },
      napad: { nazev: 'predmet_napad', prohlednout: 'predmet_napad_prohlednout' },
    },

    kombinace: [
      { a: 'propiska', b: 'kava', akce: ['ch1_kombinace_pero_1', 'ch1_kombinace_pero_2', '-propiska', '+kavove_pero'] },
      { a: 'zadosti', b: 'krabice', akce: 'ch3_kombinace_zadosti_krabice' },
      { a: 'rozpis', b: 'plan', akce: 'ch3_kombinace_rozpis_plan' },
      { a: 'listky', b: 'metr', akce: 'ch3_kombinace_listky_metr' },
    ],

    sceny: {
      // S1 Staveniště rampy (šedé pozadí z kap. 2)
      staveniste: {
        nazev: 'Staveniště rampy',
        mista: [
          { id: 'rampa', nazev: 'ch2_hs_rampa', r: [30, 4, 40, 20],
            prohlednout: { kdy: 'faze_c', akce: 'ch3_rampa_c', jinak: { kdy: 'faze_b', akce: 'ch3_rampa_b', jinak: 'ch3_rampa_a' } },
            bara_prohlednout: 'ch3_bara_rampa' },
          { id: 'jerab', nazev: 'ch2_hs_jerab', r: [42, 26, 9, 40],
            prohlednout: 'ch3_jerab_prohlednout', pouzit: JERAB, bara_prohlednout: 'ch3_bara_jerab',
            na: { kava: 'ch3_beton_kava', vypocet: VYPOCET, rozpis: 'ch3_vratny_rozpis', krabice: { kdy: "obsahuje(c2_rizika_zapsana, 'lano')", akce: 'ch3_krabice_lano', jinak: 'ch3_krabice_lano_ne' } } },
          { id: 'vratny', nazev: 'postava_vratny', druh: 'postava', r: [52, 30, 6, 30], obraz: 'postava_vratny',
            prohlednout: 'ch3_vratny_prohlednout', pouzit: '#vratny', bara_prohlednout: 'ch3_bara_vratny',
            na: { kava: 'ch3_vratny_kava', vypocet: VYPOCET, rozpis: 'ch3_vratny_rozpis', pembok: 'ch3_vratny_pembok', zadosti: 'ch3_vratny_zadosti',
              krabice: { kdy: "obsahuje(c2_rizika_zapsana, 'lano')", akce: 'ch3_krabice_lano', jinak: 'ch3_krabice_lano_ne' } } },
          { id: 'lano', nazev: 'ch2_hs_lano', r: [52, 14, 5, 14],
            prohlednout: { kdy: "c2_riziko_predem=='lano'", akce: 'ch3_lano_nove', jinak: 'ch3_lano_stare' },
            na: { krabice: { kdy: "obsahuje(c2_rizika_zapsana, 'lano')", akce: 'ch3_krabice_lano', jinak: 'ch3_krabice_lano_ne' } } },
          { id: 'domichavac', nazev: 'ch2_hs_domichavac', r: [60, 62, 10, 16], prohlednout: 'ch3_domichavac', na: { kava: 'ch3_beton_kava' } },
          { id: 'predseda', nazev: 'postava_predseda', druh: 'postava', kdy: '!predseda_odesel && !faze_c', r: [34, 34, 6, 36], obraz: 'postava_predseda',
            prohlednout: 'ch3_predseda_prohlednout', pouzit: '#predseda',
            na: {
              zadosti: 'ch3_predseda_zadosti', kava: 'ch3_predseda_kava', pembok: 'ch3_predseda_pembok', kavove_pero: 'ch3_predseda_pero',
              krabice: { kdy: "c2_riziko_predem=='usmev'", akce: 'ch3_predseda_krabice_usmev', jinak: 'ch3_predseda_krabice' },
              vypocet: 'ch3_predseda_vypocet', rozpis: 'ch3_predseda_rozpis', poklop: 'ch3_predseda_poklop', plan: 'ch3_predseda_plan_jinde',
            } },
          { id: 'aktovka', nazev: 'ch3_hs_aktovka', kdy: '!predseda_odesel && !faze_c', r: [27, 58, 6, 10],
            prohlednout: 'ch3_aktovka_prohlednout', bara_prohlednout: 'ch3_bara_aktovka', na: { zadosti: ZADOSTI_STOPA } },
          { id: 'sklad', nazev: 'ch2_hs_dvere_skladu', druh: 'vychod', r: [72, 36, 7, 26],
            prohlednout: { kdy: 'sklad_otevren', akce: 'ch3_sklad_dvere_otevrene', jinak: 'ch3_sklad_dvere_zamcene' },
            pouzit: { kdy: 'sklad_otevren', akce: '>sklad', jinak: 'ch3_sklad_zamceno' },
            bara_pouzit: { kdy: 'sklad_otevren', akce: '>sklad', jinak: 'ch3_bara_sklad_zamceno' },
            na: { klic_sklad: ['ch3_sklad_odemknout', '-klic_sklad', '$sklad_otevren', 'ch3_sklad_krysy_videt'], zadosti: ZADOSTI_STOPA } },
          { id: 'kocka', nazev: 'postava_kocka', druh: 'postava', kdy: `${KOCKA} && !krysy_pryc`, r: [79, 56, 5, 12],
            prohlednout: 'ch3_kocka_prohlednout', pouzit: KOCKA_SKLAD, bara_prohlednout: 'ch3_bara_kocka',
            na: { kava: 'ch3_kocka_kava', krabice: 'ch3_kocka_krabice', pembok: 'ch3_kocka_pembok' } },
          { id: 'rozpis_plot', nazev: 'ch3_hs_rozpis_plot', kdy: 'm13_hotovo', r: [84, 30, 8, 12],
            prohlednout: ['ch3_rozpis_plot', { kdy: '!pochvala_plot', akce: ['ch3_pembok_pochvala_plot', '$pochvala_plot'] }],
            bara_prohlednout: 'ch3_bara_rozpis_plot' },
          { id: 'plot', nazev: 'ch2_hs_plot', r: [80, 44, 18, 30],
            prohlednout: { kdy: "c1_babicka=='spojenec'", akce: 'ch3_plot_spojenec', jinak: { kdy: "c1_babicka=='odmitnuta'", akce: 'ch3_plot_odmitnuta', jinak: 'ch3_plot_pradlo' } },
            bara_prohlednout: { kdy: "c1_babicka=='odmitnuta'", akce: 'ch3_plot_odmitnuta', jinak: 'ch3_bara_plot_lupa' },
            pouzit: { kdy: "c1_babicka=='spojenec' && !buchta_vzata", akce: ['ch3_plot_buchta', '+buchta', '$buchta_vzata'], jinak: 'ch3_plot_nic' } },
          { id: 'kocour', nazev: 'postava_kocour', druh: 'postava', r: [90, 34, 5, 11], obraz: 'postava_kocour',
            prohlednout: { kdy: `${KOCKA} && !krysy_pryc`, akce: 'ch3_kocour_kocka', jinak: 'ch3_kocour_prohlednout' },
            pouzit: 'ch3_kocour_mluvit', na: { krabice: 'ch3_kocour_krabice' } },
          { id: 'kometa', nazev: 'ch1_hs_kometa', r: [74, 2, 12, 12], prohlednout: 'ch3_kometa_prohlednout', bara_prohlednout: 'ch3_bara_kometa' },
          { id: 'framework', nazev: 'postava_framework', druh: 'postava', kdy: `${KRABICE} && !m13_hotovo`, r: [20, 34, 6, 36], obraz: 'postava_framework',
            prohlednout: 'ch3_framework_prohlednout', pouzit: 'ch3_framework_mluvit' },
          { id: 'brana', stitek: true, nazev: 'ch3_hs_brana_hangar', druh: 'vychod', vychod: 'hangar', r: [2, 26, 14, 46] },
          { id: 'ulicka', stitek: true, nazev: 'ch2_hs_ulicka_namesti', druh: 'vychod', vychod: 'namesti', r: [86, 80, 12, 18] },
          ...druha('staveniste', [16, 74, 5, 22]),
        ],
      },

      // S2 Hangár s Archou (šedé pozadí z kap. 2)
      hangar: {
        nazev: 'Hangár s Archou',
        poprve: 'ch3_hangar_prichod',
        mista: [
          { id: 'archa', nazev: 'ch2_hs_archa', r: [24, 18, 40, 44],
            prohlednout: { kdy: 'm15_hotovo', akce: 'ch3_archa_zavrena', jinak: { kdy: 'faze_c', akce: 'ch3_archa_plech', jinak: 'ch3_archa_vrak' } },
            bara_prohlednout: 'ch3_bara_archa' },
          { id: 'zebrik', stitek: true, nazev: 'ch3_hs_zebrik_trup', druh: 'vychod', vychod: 'trup', r: [46, 30, 4, 30], prohlednout: 'ch3_zebrik' },
          { id: 'tabule', nazev: 'ch2_hs_tabule', r: [82, 10, 16, 26],
            prohlednout: { kdy: GANTT, akce: 'ch3_tabule_gantt', jinak: { kdy: KRABICE, akce: 'ch3_tabule_krabice', jinak: 'ch3_tabule_povaha' } } },
          { id: 'rozcestnik', nazev: 'ch3_hs_rozcestnik', kdy: 'faze_b', r: [70, 40, 10, 22],
            prohlednout: 'ch3_rozcestnik_prohlednout', bara_prohlednout: 'ch3_bara_rozcestnik',
            pouzit: { kdy: 'm10_hotovo', akce: 'ch3_rozcestnik_hotovo', jinak: { kdy: '!m14_hotovo', akce: 'ch3_rozcestnik_chybi_ukazka', jinak: [
              { kdy: "kde('bara')!='hangar'", akce: ['^bara=hangar', 'ch3_m10_bara_prisla'] }, 'ch3_m10_uvod', '@m10'] } },
            bara_pouzit: 'ch3_bara_rozcestnik_pouzit' },
          { id: 'jestetoto', nazev: 'postava_jestetoto', druh: 'postava', kdy: 'jestetoto', r: [84, 2, 6, 10],
            prohlednout: (h) => h.rekni('ch3_jestetoto_' + Math.min(4, h.s.priznaky.c3_creep || 0), [jmenoTvora(h.s.priznaky.c3_creep)]),
            bara_prohlednout: (h) => h.rekni('ch3_bara_jestetoto', [jmenoTvora(h.s.priznaky.c3_creep)]),
            pouzit: 'ch3_jestetoto_mluvit',
            na: { kava: 'ch3_jestetoto_kava', krabice: 'ch3_jestetoto_krabice', zadosti: 'ch3_jestetoto_zadosti', pembok: 'ch3_jestetoto_pembok' },
            bara_na: { metr: 'ch3_jestetoto_metr', listky: 'ch3_jestetoto_listky' } },
          { id: 'gantt', nazev: 'ch2_hs_gantt', r: [66, 6, 14, 22],
            prohlednout: { kdy: "c2_rozdeleni=='povaha'", akce: 'ch3_gantt_pul', jinak: 'ch3_gantt_cely' } },
          { id: 'kalendar', nazev: 'ch2_hs_kalendar', r: [66, 32, 4, 8], prohlednout: (h) => h.rekni('ch3_kalendar', [String(h.s.priznaky.dny)]) },
          { id: 'zmena', nazev: 'postava_pan_zmena', druh: 'postava', kdy: 'm14_hotovo && !m10_hotovo', r: [58, 44, 6, 34], obraz: 'postava_zmena',
            prohlednout: { kdy: 'c1_zmena_dohoda', akce: 'ch3_zmena_podepsane', jinak: 'ch3_zmena_nepodepsane' }, pouzit: '#zmena',
            na: { zadosti: 'ch3_zmena_zadosti', kava: 'ch3_zmena_kava', rozpis: 'ch3_zmena_rozpis', plan: 'ch3_zmena_plan' } },
          { id: 'predseda', nazev: 'postava_predseda', druh: 'postava', kdy: 'm14_hotovo && !m10_hotovo', r: [88, 44, 6, 36], obraz: 'postava_predseda',
            prohlednout: ['ch3_predseda_hangar_prohlednout', { kdy: "c3_krysy=='aktovka'", akce: 'ch3_predseda_aktovka_ziva' }], pouzit: '#predseda',
            na: {
              plan: { kdy: 'c1_faze2 && !faze_zastavena', akce: ['ch3_predseda_plan_1', 'ch3_predseda_plan_ruda', 'ch3_predseda_plan_2', '$faze_zastavena'], jinak: 'ch3_predseda_plan_ne' },
              zadosti: 'ch3_predseda_zadosti', kava: 'ch3_predseda_kava', krabice: { kdy: "c2_riziko_predem=='usmev'", akce: 'ch3_predseda_krabice_usmev', jinak: 'ch3_predseda_krabice' },
            } },
          { id: 'vera', nazev: 'postava_vera', druh: 'postava', kdy: `${TYM('vera')} && faze_b && !faze_c`, r: [10, 40, 6, 34],
            prohlednout: 'ch3_vera_prohlednout', pouzit: { stridat: ['ch3_vera_bedneni', 'ch3_vera_trup_pocita'] },
            na: { poklop: 'ch3_vera_poklop', vypocet: 'ch3_vera_vypocet', kava: 'ch3_vera_kava' } },
          { id: 'norbert', nazev: 'postava_norbert', druh: 'postava', kdy: `${TYM('norbert')} && faze_b && !faze_c`, r: [17, 40, 6, 34],
            prohlednout: 'ch3_norbert_prohlednout', pouzit: { stridat: ['ch3_norbert_podepsany', { kdy: BEZP_ITERACE, akce: 'ch3_norbert_varovani', jinak: 'ch3_norbert_pecet' }] },
            na: { pembok: 'ch3_norbert_pembok_tym', kava: 'ch3_norbert_kava', kavove_pero: 'ch3_norbert_pero' } },
          { id: 'vrata', nazev: 'ch2_hs_zadni_vrata', r: [92, 2, 8, 8], prohlednout: 'ch3_vrata', pouzit: 'ch3_vrata' },
          { id: 'bocni', stitek: true, nazev: 'ch3_hs_bocni_dvere', druh: 'vychod', vychod: 'dilna', r: [0, 62, 8, 30], prohlednout: 'ch3_bocni_dvere' },
          { id: 'brana', stitek: true, nazev: 'ch2_hs_brana_ven', druh: 'vychod', vychod: 'staveniste', r: [40, 82, 20, 16] },
          ...druha('hangar', [26, 62, 5, 22]),
        ],
      },

      // S3 Náměstí (pozadí kap. 1, denní)
      namesti: {
        obrazek: 'pozadi_namesti',
        nazev: 'Náměstí',
        mista: [
          { id: 'amplion', nazev: 'ch1_hs_amplion', r: [75.5, 6, 6, 12], prohlednout: (h) => h.rekni('ch3_amplion', [String(h.s.priznaky.dny)]) },
          { id: 'kometa', nazev: 'ch1_hs_kometa', r: [22, 0, 19, 16], prohlednout: 'ch3_kometa_namesti', bara_prohlednout: 'ch3_bara_kometa' },
          { id: 'kasna', nazev: 'ch1_hs_kasna', r: [27.5, 60, 20, 18], prohlednout: 'ch3_kasna', bara_prohlednout: 'ch3_bara_kasna' },
          { id: 'rybari', nazev: 'ch3_hs_rybari', druh: 'postava', r: [36, 46, 10, 18],
            prohlednout: 'ch3_rybari_prohlednout', pouzit: ['ch3_rybari_1', 'ch3_rybari_2'],
            bara_prohlednout: 'ch3_bara_rybari', bara_pouzit: ['ch3_rybari_1', 'ch3_rybari_2'], bara_na: { metr: 'ch3_rybari_metr' } },
          { id: 'obyvatele', nazev: 'ch2_hs_obyvatele', druh: 'postava', r: [60, 50, 11, 28],
            prohlednout: 'ch3_obyvatele_prohlednout', pouzit: 'ch3_obyvatele_kudy',
            bara_prohlednout: 'ch3_bara_obyvatele', bara_pouzit: 'ch3_obyvatele_kudy' },
          { id: 'babicka', nazev: 'postava_babicka', druh: 'postava', kdy: 'faze_b', r: [41.5, 42, 7, 30], obraz: 'postava_babicka',
            prohlednout: 'ch3_babicka_prohlednout', pouzit: 'ch3_babicka_ruda',
            bara_prohlednout: 'ch3_bara_babicka', bara_pouzit: '#babicka', bara_na: { metr: 'ch3_babicka_metr' } },
          { id: 'stanek', nazev: 'ch3_hs_stanek', kdy: 'faze_b', r: [11.5, 36, 14, 36],
            prohlednout: 'ch3_stanek', pouzit: 'ch3_stanek_ruda', bara_prohlednout: 'ch3_bara_stanek',
            bara_pouzit: { kdy: 'm14_hotovo', akce: 'ch3_stanek_hotovo', jinak: ['ch3_m14_uvod', '@m14'] } },
          { id: 'zmena', nazev: 'postava_pan_zmena', druh: 'postava', kdy: '!m14_hotovo', r: [26, 40, 6, 34], obraz: 'postava_zmena',
            prohlednout: 'ch3_zmena_namesti', pouzit: 'ch3_zmena_prani', bara_pouzit: 'ch3_zmena_prani',
            na: { zadosti: 'ch3_zmena_zadosti', kava: 'ch3_zmena_kava', rozpis: 'ch3_zmena_rozpis', plan: 'ch3_zmena_plan' } },
          { id: 'norbert', nazev: 'postava_norbert', druh: 'postava', kdy: `!${TYM('norbert')} && faze_b && !norbert_podpis`, r: [86, 48, 6, 30],
            prohlednout: 'ch3_norbert_lavicka_prohlednout', pouzit: '#norbert_lavicka', bara_prohlednout: 'ch3_bara_norbert',
            na: { pembok: NORBERT_PEMBOK, plan: 'ch3_norbert_lavicka_plan', kava: 'ch3_norbert_kava', kavove_pero: 'ch3_norbert_pero' } },
          { id: 'budka', nazev: 'ch1_hs_budka', r: [73.5, 47.5, 9, 28.5], prohlednout: 'ch3_budka_prohlednout', pouzit: ['ch3_budka_1', 'ch3_budka_2'] },
          { id: 'ulicka', stitek: true, nazev: 'ch2_hs_ulicka_rampa', druh: 'vychod', vychod: 'staveniste', r: [30.5, 43, 4.5, 15] },
          ...druha('namesti', [2, 46, 5, 28]),
        ],
      },

      // S4 Dílna (nové pozadí, zatím šedé)
      dilna: {
        nazev: 'Dílna',
        poprve: { kdy: BARA, akce: ['ch3_dilna_prichod', 'ch3_dilna_bara_haky'] },
        prichod: { kdy: RUDA, akce: [
          { kdy: "!ruda_v_dilne && kde('bara')=='dilna'", akce: [{ kdy: GANTT, akce: 'ch3_ruda_dilna_tisk', jinak: 'ch3_ruda_dilna_papir' }, 'ch3_ruda_dilna_rozdeli', 'ch3_bara_rudo', '$ruda_v_dilne'] },
          { kdy: 'm10_hotovo && !r32_hotovo', akce: [{ kdy: "kde('bara')!='dilna'", akce: ['^bara=dilna', 'ch3_r32_bara_prisla'] }, '#r32'] }] },
        mista: [
          { id: 'haky', nazev: 'ch3_hs_haky', r: [2, 6, 14, 24],
            prohlednout: 'ch3_haky_ruda',
            bara_prohlednout: { kdy: 'dilna_volna', akce: 'ch3_haky_volno', jinak: { kdy: 'c2_rozpad>=2', akce: 'ch3_haky_sedm', jinak: 'ch3_haky_sest' } } },
          { id: 'stul', nazev: 'ch3_hs_stul', r: [24, 34, 26, 12], prohlednout: 'ch3_stul_ruda', bara_prohlednout: 'ch3_stul' },
          { id: 'sloupek', nazev: 'ch3_hs_sloupek', r: [55, 8, 6, 26],
            prohlednout: 'ch3_sloupek_ruda',
            bara_prohlednout: { kdy: 'sloupek_hotov', akce: 'ch3_sloupek_hotovy', jinak: 'ch3_sloupek_bez_kabelu' },
            bara_pouzit: { kdy: 'sloupek_hotov', akce: 'ch3_sloupek_hotovy', jinak: 'ch3_sloupek_kabel_chybi' },
            bara_na: { kabel: { kdy: 'sloupek_hotov', akce: 'ch3_sloupek_hotovy', jinak: ['ch3_sloupek_zapojit', '-kabel', '$sloupek_hotov', NAPAD, DILNA] }, metr: 'ch3_sloupek_metr', listky: 'ch3_sloupek_listky' } },
          { id: 'maketa', nazev: 'ch3_hs_maketa', r: [28, 8, 12, 14],
            prohlednout: 'ch3_maketa_ruda',
            bara_prohlednout: { kdy: 'maketa_hotova', akce: 'ch3_maketa_hotova', jinak: { kdy: 'kabel_vzat', akce: 'ch3_maketa_rozlepena', jinak: 'ch3_maketa_kabel_vykukuje' } },
            bara_pouzit: { kdy: '!kabel_vzat', akce: ['ch3_maketa_vzit_kabel', '+kabel', '$kabel_vzat'], jinak: { kdy: 'maketa_hotova', akce: 'ch3_maketa_hotova', jinak: 'ch3_maketa_rozlepena' } },
            bara_na: { listky: { kdy: 'maketa_hotova', akce: 'ch3_maketa_hotova', jinak: ['ch3_maketa_slepit', '-listky', '$maketa_hotova', DILNA] }, metr: 'ch3_maketa_metr', kabel: 'ch3_kabel_maketa' } },
          { id: 'cidlo', nazev: 'ch3_hs_cidlo', kdy: '!cidlo_vzato', r: [24, 48, 7, 8],
            prohlednout: 'ch3_cidlo_ruda', bara_prohlednout: 'ch3_cidlo_prohlednout',
            bara_pouzit: ['ch3_cidlo_vzit', '+cidlo', '$cidlo_vzato'], bara_na: { kabel: 'ch3_kabel_cidlo', metr: 'ch3_cidlo_metr' } },
          { id: 'model', nazev: 'ch3_hs_model', kdy: '!model_vzat', r: [33, 48, 8, 8],
            prohlednout: 'ch3_model_ruda_vidi', bara_prohlednout: 'ch3_model_prohlednout',
            bara_pouzit: ['ch3_model_vzit', '+model', '$model_vzat'], bara_na: { metr: 'ch3_model_metr' } },
          { id: 'plech', nazev: 'ch3_hs_plech', kdy: 'c2_rozpad>=2 && !plech_vzat', r: [43, 48, 7, 8],
            prohlednout: 'ch3_plech_ruda', bara_prohlednout: 'ch3_plech_prohlednout',
            bara_pouzit: ['ch3_plech_vzit', '+plech', '$plech_vzat'] },
          { id: 'police', nazev: 'ch3_hs_police', r: [64, 4, 14, 12],
            prohlednout: 'ch3_police_ruda', bara_prohlednout: { kdy: 'cidlo_odlozeno || model_odlozeno', akce: 'ch3_police_plna', jinak: 'ch3_police' },
            bara_na: {
              cidlo: ODLOZIT('cidlo'), model: ODLOZIT('model'), plech: ODLOZIT('plech'), napad: ODLOZIT('napad'),
              kabel: 'ch3_police_kabel', listky: 'ch3_police_listky', zapis: 'ch3_police_zapis', seznam: 'ch3_police_seznam', metr: 'ch3_police_metr',
            } },
          { id: 'krabicka', nazev: 'ch3_hs_krabicka', r: [18, 8, 8, 8],
            prohlednout: 'ch3_krabicka_ruda',
            bara_prohlednout: { kdy: TYM('krystof'), akce: 'ch3_krabicka_krystof', jinak: 'ch3_krabicka_hospoda' },
            bara_pouzit: { kdy: 'listky_vzaty', akce: 'ch3_krabicka_prazdna', jinak: ['ch3_krabicka_vzit', '+listky', '$listky_vzaty'] } },
          { id: 'seznam', nazev: 'ch3_hs_seznam', r: [64, 20, 14, 24],
            prohlednout: { kdy: 'm10_hotovo', akce: 'ch3_seznam_ruda_po_zmenach', jinak: 'ch3_seznam_ruda' }, pouzit: 'ch3_seznam_ruda_sahne',
            bara_prohlednout: 'ch3_seznam_prohlednout', bara_pouzit: PLAN_KOLA },
          { id: 'minutka', nazev: 'ch3_hs_minutka', r: [80, 6, 6, 8],
            prohlednout: 'ch3_minutka_ruda', bara_prohlednout: 'ch3_minutka',
            bara_pouzit: { kdy: 'porada_hotova', akce: 'ch3_minutka_hotovo', jinak: ['ch3_porada_uvod', '#porada'] } },
          { id: 'pocitac', nazev: 'ch3_hs_pocitac', r: [42, 6, 10, 16],
            prohlednout: 'ch3_pocitac_ruda', bara_prohlednout: { kdy: 'vada_nalezena', akce: 'ch3_pocitac_4811', jinak: 'ch3_pocitac' },
            bara_pouzit: { kdy: 'vada_nalezena', akce: 'ch3_pocitac_uz', jinak: { kdy: '!m14_hotovo', akce: 'ch3_pocitac_bezi', jinak: [
              'ch3_pocitac_babicka', 'ch3_pocitac_pocita', 'ch3_pocitac_4811', 'ch3_vada_bara_kdo', 'ch3_vada_zapis', '+zapis', '$vada_nalezena'] } } },
          { id: 'mlha', nazev: 'ch3_hs_mlha', r: [90, 4, 9, 12], prohlednout: 'ch3_mlha_ruda', bara_prohlednout: 'ch3_mlha' },
          { id: 'gantt_papir', nazev: 'ch3_hs_gantt_papir', kdy: 'ruda_v_dilne', r: [80, 20, 8, 14],
            prohlednout: 'ch3_gantt_papir_ruda', bara_prohlednout: 'ch3_gantt_papir' },
          { id: 'pepa', nazev: 'postava_pepa', druh: 'postava', kdy: TYM('pepa'), r: [2, 42, 6, 30],
            prohlednout: 'ch3_pepa_prohlednout', pouzit: 'ch3_pepa_ruda',
            bara_prohlednout: 'ch3_pepa_prohlednout', bara_pouzit: { stridat: ['ch3_pepa_1', 'ch3_pepa_2'] },
            bara_na: { zapis: 'ch3_pepa_zapis', kabel: 'ch3_pepa_kabel', listky: 'ch3_pepa_listky', metr: 'ch3_pepa_metr' },
            na: { kava: 'ch3_pepa_kava', rozpis: 'ch3_pepa_rozpis' } },
          { id: 'klara', nazev: 'postava_klara', druh: 'postava', kdy: TYM('klara'), r: [17, 42, 6, 30],
            prohlednout: 'ch3_klara_prohlednout', pouzit: 'ch3_klara_ruda',
            bara_prohlednout: 'ch3_klara_prohlednout', bara_pouzit: { stridat: ['ch3_klara_1', 'ch3_klara_2'] },
            bara_na: { zapis: 'ch3_klara_zapis', listky: 'ch3_klara_listky', metr: 'ch3_klara_metr' } },
          { id: 'krystof', nazev: 'postava_krystof', druh: 'postava', kdy: TYM('krystof'), r: [54, 58, 6, 30],
            prohlednout: 'ch3_krystof_prohlednout', pouzit: 'ch3_krystof_ruda',
            bara_prohlednout: 'ch3_krystof_prohlednout', bara_pouzit: { stridat: ['ch3_krystof_1', 'ch3_krystof_2'] },
            bara_na: { zapis: 'ch3_krystof_zapis', listky: 'ch3_krystof_listky' } },
          { id: 'zdenda', nazev: 'postava_zdenda', druh: 'postava', kdy: TYM('zdenda'), r: [66, 58, 6, 30],
            prohlednout: 'ch3_zdenda_prohlednout', pouzit: 'ch3_zdenda_ruda',
            bara_prohlednout: 'ch3_zdenda_prohlednout', bara_pouzit: 'ch3_zdenda_1',
            na: { vypocet: 'ch3_zdenda_vypocet', kava: 'ch3_zdenda_kava' } },
          { id: 'dvere', stitek: true, nazev: 'ch3_hs_dvere_hangar', druh: 'vychod', vychod: 'hangar', r: [92, 76, 8, 22] },
          ...druha('dilna', [78, 50, 5, 26]),
        ],
      },

      // S5 Sklad materiálu (nové pozadí, zatím šedé)
      sklad: {
        nazev: 'Sklad materiálu',
        poprve: { kdy: '!krysy_pryc', akce: ['ch3_sklad_prichod', 'ch3_sklad_vetsina'], jinak: 'ch3_sklad_prichod_volno' },
        mista: [
          { id: 'krysy', nazev: 'ch3_hs_krysy', druh: 'postava', kdy: '!krysy_pryc', r: [36, 50, 24, 20],
            prohlednout: { kdy: "obsahuje(c2_rizika_zapsana, 'krysy')", akce: 'ch3_krysy_zapsane', jinak: 'ch3_krysy_prohlednout' },
            pouzit: 'ch3_krysy_vetsina', bara_prohlednout: 'ch3_bara_krysy',
            na: {
              zadosti: 'ch3_krysy_zadosti_uvnitr', kava: 'ch3_krysy_kava', pembok: 'ch3_krysy_pembok',
              krabice: { kdy: "obsahuje(c2_rizika_zapsana, 'krysy')", akce: 'ch3_krabice_krysy', jinak: 'ch3_krabice_krysy_ne' },
            } },
          { id: 'hnizdo', nazev: 'ch3_hs_hnizdo', r: [38, 40, 20, 12],
            prohlednout: 'ch3_hnizdo', bara_prohlednout: 'ch3_bara_hnizdo',
            pouzit: { kdy: '!krysy_pryc', akce: 'ch3_krysy_vetsina', jinak: { kdy: TYM('vera'), akce: 'ch3_hnizdo_vera', jinak: {
              kdy: 'vypocet_vzat', akce: 'ch3_hnizdo_prazdne', jinak: ['ch3_hnizdo_vypocet', '+vypocet', '$vypocet_vzat'] } } } },
          { id: 'plechy', nazev: 'ch3_hs_plechy', r: [66, 20, 20, 40],
            prohlednout: { kdy: 'krysy_pryc', akce: 'ch3_plechy_volno', jinak: 'ch3_plechy' } },
          { id: 'poklop', nazev: 'ch3_hs_poklop', kdy: 'krysy_pryc && !poklop_vzat', r: [88, 30, 8, 22],
            prohlednout: 'ch3_poklop_prohlednout', bara_prohlednout: 'ch3_poklop_bara',
            pouzit: ['ch3_poklop_vzit', '+poklop', '$poklop_vzat'], bara_pouzit: 'ch3_poklop_bara_nese' },
          { id: 'regaly', nazev: 'ch3_hs_regaly', r: [4, 8, 26, 50], prohlednout: 'ch3_regaly' },
          { id: 'kabely', nazev: 'ch3_hs_kabely', r: [36, 74, 18, 8], prohlednout: 'ch3_kabely_okousane' },
          { id: 'dvere', stitek: true, nazev: 'ch3_hs_dvere_ven', druh: 'vychod', vychod: 'staveniste', r: [0, 72, 8, 26] },
          ...druha('sklad', [12, 62, 5, 26]),
        ],
      },

      // S6 Trup Archy zevnitř (nové pozadí, zatím šedé)
      trup: {
        nazev: 'Trup Archy zevnitř',
        poprve: 'ch3_trup_prichod',
        mista: [
          { id: 'otvor', nazev: 'ch3_hs_otvor', r: [72, 30, 12, 24],
            prohlednout: { kdy: 'c3_poklop', akce: 'ch3_otvor_s_poklopem', jinak: 'ch3_otvor' },
            bara_prohlednout: 'ch3_otvor_bara',
            na: { poklop: { kdy: POKLOP_SCHVALEN, akce: ['ch3_poklop_nasadit', '-poklop', { kdy: "poklop_schvalen=='netesni'", akce: ['$c3_poklop=netesni', 'ch3_poklop_netesni'], jinak: ['$c3_poklop=ano', 'ch3_poklop_sedi'] }],
              jinak: { kdy: TYM('vera'), akce: 'ch3_vera_bez_vypoctu', jinak: 'ch3_poklop_bez_schvaleni' } } } },
          { id: 'pripojky', nazev: 'ch3_hs_pripojky', r: [8, 50, 20, 16], prohlednout: 'ch3_pripojky', bara_prohlednout: 'ch3_pripojky_bara' },
          { id: 'misto', nazev: 'ch3_hs_misto_pocitac', r: [36, 40, 16, 22],
            prohlednout: 'ch3_misto_pocitac',
            pouzit: { kdy: 'm15_hotovo', akce: 'ch3_misto_hotovo', jinak: { kdy: '!faze_c', akce: 'ch3_misto_jeste_ne', jinak: {
              kdy: NORBERT_CHYBI, akce: 'ch3_trup_bez_podpisu', jinak: {
                kdy: `${POKLOP_SCHVALEN} && !c3_poklop`, akce: { kdy: TYM('vera'), akce: 'ch3_vera_kde_poklop', jinak: 'ch3_ruda_kde_poklop' },
                jinak: [{ kdy: "kde('bara')!='trup'", akce: ['^bara=trup', 'ch3_m15_bara_prisla'] }, 'ch3_m15_ruda_vse', 'ch3_m15_bara_nic', '@m15'] } } } },
            bara_prohlednout: 'ch3_misto_bara', bara_pouzit: 'ch3_misto_bara' },
          { id: 'panel', nazev: 'ch3_hs_panel', r: [56, 10, 10, 18],
            prohlednout: { kdy: BEZP_ITERACE, akce: 'ch3_panel_tyden', jinak: 'ch3_panel_zapeceteny' } },
          { id: 'vera', nazev: 'postava_vera', druh: 'postava', kdy: `${TYM('vera')} && faze_c`, r: [58, 40, 6, 34],
            prohlednout: 'ch3_vera_nytovacka', pouzit: { stridat: ['ch3_vera_zitra', 'ch3_vera_trup_pocita'] },
            na: { poklop: { kdy: POKLOP_SCHVALEN, akce: 'ch3_vera_poklop_dovnitr', jinak: 'ch3_vera_bez_vypoctu' }, kava: 'ch3_vera_kava' } },
          { id: 'norbert', nazev: 'postava_norbert', druh: 'postava', kdy: `(${TYM('norbert')} && faze_c) || norbert_podpis`, r: [66, 44, 5, 30],
            prohlednout: 'ch3_norbert_prohlednout', pouzit: 'ch3_norbert_podepsany',
            na: { pembok: { kdy: 'norbert_podpis', akce: 'ch3_norbert_pembok_trup', jinak: 'ch3_norbert_pembok_tym' }, kavove_pero: 'ch3_norbert_pero' } },
          { id: 'okenko', nazev: 'ch3_hs_okenko', r: [86, 6, 8, 12], prohlednout: 'ch3_okenko', bara_prohlednout: 'ch3_bara_kometa' },
          { id: 'zebrik', stitek: true, nazev: 'ch3_hs_zebrik_ven', druh: 'vychod', vychod: 'hangar', r: [0, 20, 6, 50] },
          ...druha('trup', [20, 30, 5, 26]),
        ],
      },
    },

    dialogy: {
      vratny: {
        poprve: 'ch3_vratny_uvod',
        vycerpano: 'ch3_vratny_vse',
        volby: [
          { t: 'ch3_vratny_volba_klic', kdy: "!ma('klic_sklad') && !sklad_otevren", akce: KLIC_SKLADU },
          { t: 'ch3_vratny_volba_lano', jednou: true, akce: { kdy: "c2_riziko_predem=='lano'", akce: 'ch3_vratny_lano_nove', jinak: 'ch3_vratny_lano_drzi' } },
          { t: 'ch3_vratny_volba_jerab', jednou: true, akce: ['ch3_vratny_jeden_jerab', 'ch3_vratny_bedneni'] },
          { t: 'ch3_volba_konec', konec: true, akce: 'ch3_vratny_konec' },
        ],
      },

      predseda: {
        poprve: { kdy: 'm14_hotovo', akce: 'ch3_predseda_hangar_uvod', jinak: 'ch3_predseda_uvod' },
        vycerpano: 'ch3_predseda_vse',
        volby: [
          { t: 'ch3_predseda_volba_kopie', kdy: "!ma('zadosti') && !krysy_pryc", akce: ['ch3_predseda_kopie', '+zadosti'] },
          { t: 'ch3_predseda_volba_co', jednou: true, akce: 'ch3_predseda_kontrola' },
          { t: 'ch3_predseda_volba_framework', kdy: `!${KRABICE}`, jednou: true, akce: 'ch3_predseda_framework' },
          { t: 'ch3_predseda_volba_faze', kdy: 'c1_faze2 && !faze_zastavena', jednou: true, akce: 'ch3_predseda_faze2' },
          { t: 'ch3_volba_konec', konec: true, akce: 'ch3_predseda_konec' },
        ],
      },

      // Ruda mluví s Bárou
      bara: {
        poprve: { kdy: DUVERA, akce: 'ch3_bara_uvod_duvera', jinak: 'ch3_bara_uvod' },
        vycerpano: 'ch3_bara_vse',
        volby: [
          { t: 'ch3_bara_volba_co', jednou: true, akce: { kdy: 'faze_c', akce: 'ch3_bara_co_c', jinak: { kdy: 'faze_b', akce: 'ch3_bara_co_b', jinak: 'ch3_bara_co_a' } } },
          { t: 'ch3_bara_volba_porada', kdy: 'porada_hotova', jednou: true, akce: { kdy: 'porada_na_cas', akce: 'ch3_bara_porada_dobra', jinak: 'ch3_bara_porada_dlouha' } },
          { t: 'ch3_bara_volba_ukazka', kdy: 'm14_hotovo', jednou: true, akce: { kdy: 'c3_hodnota>=3', akce: 'ch3_bara_ukazka_3', jinak: { kdy: 'c3_hodnota>=2', akce: 'ch3_bara_ukazka_2', jinak: 'ch3_bara_ukazka_1' } } },
          { t: 'ch3_bara_volba_karty', kdy: "scena()=='dilna' && !r32_hotovo", jednou: true, akce: ['ch3_ruda_karty_sahne', 'ch3_bara_rudo'] },
          { t: 'ch3_volba_konec', konec: true, akce: 'ch3_bara_konec' },
        ],
      },

      // P3.8 za Rudu: Bára mluví pomalu, Ruda jí třikrát může skočit do řeči
      vada_ruda: {
        poprve: ['ch3_vada_r_otazka', 'ch3_vada_r_bara_1'],
        znovu: ['ch3_vada_r_otazka', 'ch3_vada_r_bara_1'],
        volby: [
          { t: 'ch3_vada_r_volba_mlcet', akce: '#vada_ruda2' },
          { t: 'ch3_vada_r_volba_skocit', akce: ['ch3_vada_r_bara_nic', '$vada_skocil', '#'] },
        ],
      },
      vada_ruda2: {
        poprve: 'ch3_vada_r_bara_2', znovu: 'ch3_vada_r_bara_2',
        volby: [
          { t: 'ch3_vada_r_volba_mlcet', akce: '#vada_ruda3' },
          { t: 'ch3_vada_r_volba_skocit_2', akce: ['ch3_vada_r_bara_nic', '$vada_skocil', '#'] },
        ],
      },
      vada_ruda3: {
        poprve: 'ch3_vada_r_bara_3', znovu: 'ch3_vada_r_bara_3',
        volby: [
          { t: 'ch3_vada_r_volba_mlcet', akce: ['ch3_vada_r_bara_4', ...VADA_HLASENA, '#'] },
          { t: 'ch3_vada_r_volba_skocit_3', akce: ['ch3_vada_r_bara_nic', '$vada_skocil', '#'] },
        ],
      },

      babicka: {
        poprve: { kdy: "c1_babicka=='spojenec'", akce: 'ch3_babicka_uvod_spojenec', jinak: { kdy: "c1_babicka=='odmitnuta'", akce: 'ch3_babicka_uvod_odmitnuta', jinak: 'ch3_babicka_uvod' } },
        vycerpano: 'ch3_babicka_vse',
        volby: [
          { t: 'ch3_babicka_volba_lupa', jednou: true, akce: { kdy: "c1_babicka=='odmitnuta'", akce: 'ch3_babicka_mlci', jinak: 'ch3_babicka_lupa' } },
          { t: 'ch3_babicka_volba_proc', jednou: true, akce: { kdy: "c1_babicka=='odmitnuta'", akce: 'ch3_babicka_mlci', jinak: 'ch3_babicka_vejdu' } },
          { t: 'ch3_volba_konec', konec: true, akce: 'ch3_babicka_konec' },
        ],
      },

      zmena: {
        poprve: { kdy: 'c1_zmena_dohoda', akce: 'ch3_zmena_uvod_dohoda', jinak: 'ch3_zmena_uvod' },
        vycerpano: 'ch3_zmena_vse',
        volby: [
          { t: 'ch3_zmena_volba_co', jednou: true, akce: ['ch3_zmena_bazen', 'ch3_zmena_svaciny'] },
          { t: 'ch3_zmena_volba_kde', jednou: true, akce: 'ch3_zmena_rozcestnik' },
          { t: 'ch3_volba_konec', konec: true, akce: 'ch3_zmena_konec' },
        ],
      },

      norbert_lavicka: {
        poprve: ['ch3_norbert_lavicka_1', 'ch3_norbert_lavicka_2'],
        vycerpano: 'ch3_norbert_lavicka_vse',
        volby: [
          { t: 'ch3_norbert_lavicka_volba_trup', jednou: true, akce: ['ch3_norbert_lavicka_kniha', 'ch3_pembok_urazeny'] },
          { t: 'ch3_norbert_lavicka_volba_norma', jednou: true, akce: 'ch3_norbert_lavicka_norma' },
          { t: 'ch3_volba_konec', konec: true, akce: 'ch3_norbert_lavicka_konec' },
        ],
      },

      // P3.4 Ranní porada: dílčí rozhovory podle týmu, pak Ruda a konec
      porada: {
        poprve: (h) => h.proved(DALSI_PORADA),
        znovu: (h) => h.proved(DALSI_PORADA),
        volby: [],
      },

      napad: {
        poprve: [], znovu: [],
        volby: [
          { t: 'ch3_napad_volba_pockat', akce: ['ch3_napad_pocka', '$napad_resen', '#', DILNA] },
          { t: 'ch3_napad_volba_prijmout', akce: ['ch3_napad_prijat', '+napad', '$napad_resen', '$napad_prijat', 'ch3_napad_haky', '#', DILNA] },
        ],
      },

      // R3.2 Bára a pořadí práce
      r32: {
        poprve: ['ch3_r32_gantt', 'ch3_r32_ruda_sahne', 'ch3_r32_pembok', 'ch3_r32_ruda_mysli_1', 'ch3_r32_ruda_mysli_2'],
        znovu: 'ch3_r32_znovu',
        volby: [
          { t: 'ch3_r32_volba_bara', akce: ['ch3_r32_bara_pusti', '$c3_bara_priority=ano', '$r32_hotovo', '#', FAZE_C] },
          { t: 'ch3_r32_volba_ruda', akce: ['ch3_r32_ruda_vyhoda', 'ch3_r32_bara_gantt', '$c3_bara_priority=ne', '$r32_hotovo', '#', FAZE_C] },
        ],
      },

      // R3.3 Co příště jinak
      r33: {
        poprve: ['ch3_r33_tym_ceka', 'ch3_r33_bara', 'ch3_r33_pembok', 'ch3_r33_ruda'],
        znovu: 'ch3_r33_tym_ceka',
        volby: [
          { t: 'ch3_r33_volba_sednout', akce: [
            '$c3_retro=ano',
            { kdy: TYM('vera'), akce: { kdy: 'c3_rezerva<2', akce: 'ch3_r33_vera_lano', jinak: 'ch3_r33_vera_bedneni' } },
            { kdy: TYM('pepa'), akce: { kdy: "c2_odhad=='kotva'", akce: 'ch3_r33_pepa_kotva', jinak: 'ch3_r33_pepa_napad' } },
            { kdy: TYM('norbert'), akce: 'ch3_r33_norbert' },
            { kdy: TYM('klara'), akce: 'ch3_r33_klara' },
            { kdy: TYM('zdenda'), akce: 'ch3_r33_zdenda' },
            { kdy: TYM('krystof'), akce: 'ch3_r33_krystof' },
            { kdy: "c3_vada_hlasena!='ano'", akce: 'ch3_r33_bara_vada', jinak: 'ch3_r33_bara_porada' },
            '#r33_zlepseni'] },
          { t: 'ch3_r33_volba_stavet', akce: ['ch3_r33_nemame_cas', 'ch3_r33_tym_odchazi', '$c3_retro=ne', '#', KONEC] },
        ],
      },
      r33_zlepseni: {
        poprve: 'ch3_r33_zlepseni_otazka', znovu: 'ch3_r33_zlepseni_otazka',
        volby: [
          { t: 'ch3_zlepseni_bara', akce: ['$c3_zlepseni=bara', 'ch3_r33_konec', '#', KONEC] },
          { t: 'ch3_zlepseni_rizika', akce: ['$c3_zlepseni=rizika', 'ch3_r33_konec', '#', KONEC] },
          { t: 'ch3_zlepseni_zmeny', akce: ['$c3_zlepseni=zmeny', 'ch3_r33_konec', '#', KONEC] },
        ],
      },
    },

    napovedy: [
      // Ruda (Prof. Pembok)
      { id: 'jerab', kdy: `${RUDA} && !m13_hotovo && (${TYM('vera')} || vypocet_predan)`, stupne: ['ch3_rada_jerab_1', 'ch3_rada_jerab_2', 'ch3_rada_jerab_3'] },
      { id: 'vypocet', kdy: `${RUDA} && !m13_hotovo`, stupne: ['ch3_rada_tym_1', 'ch3_rada_vypocet_2', 'ch3_rada_vypocet_3'] },
      { id: 'kocka', kdy: `${RUDA} && !krysy_pryc && ${KOCKA} && (${KLIC_JDE})`, stupne: ['ch3_rada_kocka_1', 'ch3_rada_krysy_2', 'ch3_rada_kocka_3'] },
      { id: 'krysy', kdy: `${RUDA} && !krysy_pryc && (${KLIC_JDE})`, stupne: ['ch3_rada_krysy_1', 'ch3_rada_krysy_2', 'ch3_rada_krysy_3'] },
      { id: 'vada_ruda', kdy: `${RUDA} && vada_nalezena && !c3_vada_hlasena && !vada_skocil`, stupne: ['ch3_rada_vada_ruda_1', 'ch3_rada_vada_ruda_2', 'ch3_rada_vada_ruda_3'] },
      { id: 'faze', kdy: `${RUDA} && m14_hotovo && !m10_hotovo && c1_faze2 && !faze_zastavena`, stupne: ['ch3_rada_faze_1', 'ch3_rada_faze_2', 'ch3_rada_faze_3'] },
      { id: 'zmeny', kdy: `${RUDA} && m14_hotovo && !m10_hotovo`, stupne: ['ch3_rada_zmeny_1', 'ch3_rada_zmeny_2', 'ch3_rada_zmeny_3'] },
      { id: 'r32', kdy: `${RUDA} && m10_hotovo && !r32_hotovo`, stupne: ['ch3_rada_r32'] },
      { id: 'norbert', kdy: `${RUDA} && faze_c && ${NORBERT_CHYBI}`, stupne: ['ch3_rada_tym_1', 'ch3_rada_norbert_2', 'ch3_rada_norbert_3'] },
      { id: 'poklop', kdy: `${RUDA} && faze_b && !m15_hotovo && ${POKLOP_SCHVALEN} && !c3_poklop`, stupne: ['ch3_rada_poklop_1', 'ch3_rada_poklop_2', 'ch3_rada_poklop_3'] },
      { id: 'trup', kdy: `${RUDA} && faze_c && !m15_hotovo`, stupne: ['ch3_rada_trup_1', 'ch3_rada_trup_2', 'ch3_rada_trup_3'] },
      { id: 'r33', kdy: `${RUDA} && m15_hotovo`, stupne: ['ch3_rada_r33'] },
      { id: 'ruda_ceka', kdy: RUDA, stupne: ['ch3_rada_ocima_bary'] },
      // Bára (metr)
      { id: 'porada', kdy: `${BARA} && !porada_hotova`, stupne: ['ch3_rada_porada_1', 'ch3_rada_porada_2', 'ch3_rada_porada_3'] },
      { id: 'dilna', kdy: `${BARA} && !dilna_volna`, stupne: ['ch3_rada_dilna_1', 'ch3_rada_dilna_2', 'ch3_rada_dilna_3'] },
      { id: 'plan', kdy: `${BARA} && !plan_kola_hotovo`, stupne: ['ch3_rada_plan_1', 'ch3_rada_plan_2', 'ch3_rada_plan_3'] },
      { id: 'ukazka', kdy: `${BARA} && faze_b && !m14_hotovo`, stupne: ['ch3_rada_ukazka_1', 'ch3_rada_ukazka_2', 'ch3_rada_ukazka_3'] },
      { id: 'vada', kdy: `${BARA} && m14_hotovo && c3_vada_hlasena!='ano' && !bara_odbyta`, stupne: ['ch3_rada_vada_1', 'ch3_rada_vada_2', 'ch3_rada_vada_3'] },
      { id: 'lavka', kdy: `${BARA} && faze_c && !obsahuje(c2_mosty, 'nastup') && !c3_bara_zna_lavku`, stupne: ['ch3_rada_lavka'] },
      { id: 'bara_ceka', kdy: BARA, stupne: ['ch3_rada_ocima_rudy'] },
    ],

    pamet: [
      { klic: 'ch3_pamet_rampa_2', kdy: 'c3_rezerva>=2' },
      { klic: 'ch3_pamet_rampa_1', kdy: 'c3_rezerva>=0 && c3_rezerva<2' },
      { klic: 'ch3_pamet_rampa_zpozdeni', kdy: 'c3_rezerva<0' },
      { klic: 'ch3_pamet_drolivy', kdy: 'c3_drolivy' },
      { klic: 'ch3_pamet_ukazka_3', kdy: 'c3_hodnota>=3' },
      { klic: 'ch3_pamet_ukazka_2', kdy: 'c3_hodnota==2' },
      { klic: 'ch3_pamet_ukazka_1', kdy: 'c3_hodnota<=1' },
      { klic: 'ch3_pamet_creep_0', kdy: 'c3_creep==0' },
      { klic: 'ch3_pamet_creep_1', kdy: 'c3_creep>=1 && c3_creep<=2' },
      { klic: 'ch3_pamet_creep_3', kdy: 'c3_creep>=3' },
      { klic: 'ch3_pamet_trup_0', kdy: 'c3_integrace==0' },
      { klic: 'ch3_pamet_trup_1', kdy: 'c3_integrace==1' },
      { klic: 'ch3_pamet_trup_2', kdy: 'c3_integrace>=2' },
      { klic: 'ch3_pamet_poklop_ne', kdy: "c3_poklop=='ne'" },
      { klic: 'ch3_pamet_poradi_bara', kdy: "c3_bara_priority=='ano'" },
      { klic: 'ch3_pamet_poradi_ruda', kdy: "c3_bara_priority=='ne'" },
      { klic: 'ch3_pamet_retro', kdy: "c3_retro=='ano'" },
      { klic: 'ch3_pamet_bez_retra', kdy: "c3_retro=='ne'" },
      { klic: 'ch3_pamet_vada', kdy: "c3_vada_hlasena=='ano'" },
      { klic: 'ch3_pamet_bez_vady', kdy: "c3_vada_hlasena!='ano'" },
      { klic: 'ch3_pamet_krysy_aktovka', kdy: "c3_krysy=='aktovka'" },
      { klic: 'ch3_pamet_pokracovani', kdy: 'true' },
    ],

    // Střihy a texty, které skládá kód mimo data (kontrola klíčů je tak najde)
    strihy: [FAZE_B, FAZE_C],
    v_kodu: [
      ...[0, 1, 2, 3, 4].map((i) => 'ch3_jmeno_' + i),
      ...['kabel_motory', 'cidla', 'kabel_navigace', 'prog_start', 'prog_pocitadlo', 'prog_navigace', 'aplikace', 'odpocet', 'svaciny'].map((id) => 'ch3_m15_karta_' + id),
      'ch3_m15_ruda_info_kabel', 'ch3_m15_ruda_info_program', 'ch3_m15_ruda_info_aplikace', 'ch3_m15_bara_kabel', 'ch3_m15_bara_start', 'ch3_m15_bara_navigace',
      'ch3_m15_bara_aplikace', 'ch3_m15_bara_pocitadlo_ano', 'ch3_m15_bara_pocitadlo_ne', 'ch3_m15_bara_pocitadlo_mozna', 'ch3_m15_bara_odpocet', 'ch3_m15_bara_svaciny'],

    minihry: {},
    pruchody: {},
  };

  // --- ranní porada ----------------------------------------------------------
  // Pořadí: kdo z týmu je v dílně, pak překážka, Ruda a konec
  const DALSI_PORADA = (h) => {
    const p = h.s.priznaky;
    const dalsi = ['pepa', 'klara', 'krystof', 'zdenda'].find((k) => vTymu(h, k) && !p['porada_' + k]);
    if (dalsi) { h.proved('#porada_' + dalsi); return; }
    if (!p.porada_prekazka_hotovo) { h.proved('#porada_prekazka'); return; }
    if (!p.porada_ruda) { h.proved('#porada_ruda'); return; }
    h.proved(['$porada_hotova', { kdy: 'porada_pretazena', akce: 'ch3_porada_pretazena', jinak: ['ch3_porada_na_cas', '$porada_na_cas'] }, '#']);
  };
  const SKONCIT = { t: 'ch3_porada_volba_skoncit', akce: 'ch3_porada_nevime' };
  for (const k of ['pepa', 'klara', 'krystof']) {
    data.dialogy['porada_' + k] = {
      poprve: 'ch3_porada_' + k, znovu: [],
      volby: [
        { t: 'ch3_porada_volba_utnout_' + k, akce: ['ch3_porada_utnuto_' + k, '$porada_' + k, DALSI_PORADA] },
        { t: 'ch3_porada_volba_nechat', akce: ['ch3_porada_nechano_' + k, 'ch3_porada_minutka_5', '$porada_' + k, '$porada_pretazena+1', DALSI_PORADA] },
        SKONCIT,
      ],
    };
  }
  data.dialogy.porada_zdenda = {
    poprve: ['ch3_porada_zdenda', 'ch3_porada_zdenda_kafe'], znovu: [],
    volby: [{ t: 'ch3_porada_volba_dal', akce: ['$porada_zdenda', DALSI_PORADA] }],
  };
  data.dialogy.porada_prekazka = {
    poprve: (h) => h.rekni('ch3_porada_prekazka_' + (['pepa', 'klara', 'krystof', 'zdenda'].find((k) => vTymu(h, k)) || 'pepa')),
    znovu: [],
    volby: [
      { t: 'ch3_porada_volba_prekazka', akce: ['ch3_porada_prekazka_vzata', '$porada_prekazka', '$porada_prekazka_hotovo', DALSI_PORADA] },
      { t: 'ch3_porada_volba_prekazka_pozdeji', akce: ['ch3_porada_prekazka_pocka', '$porada_prekazka_hotovo', '$porada_pretazena+1', DALSI_PORADA] },
      SKONCIT,
    ],
  };
  data.dialogy.porada_ruda = {
    poprve: [{ kdy: GANTT, akce: 'ch3_porada_ruda_gantt', jinak: 'ch3_porada_ruda' }, 'ch3_porada_ruda_rozdelim'], znovu: [],
    volby: [
      { t: 'ch3_porada_volba_ruda_pryc', akce: ['ch3_porada_ruda_merim', '$porada_ruda', DALSI_PORADA] },
      { t: 'ch3_porada_volba_ruda_rozdel', akce: ['ch3_porada_ruda_rozdelil', 'ch3_porada_minutka_5', '$porada_ruda', '$porada_odpocet', '$porada_pretazena+1', DALSI_PORADA] },
    ],
  };
  data.dialogy.porada.volby = [];

  // --- M13 Jeřábový balet ----------------------------------------------------
  const M13_KARTY = ['lp_bed', 'lp_bet', 'pp_bed', 'pp_bet', 'dr_bed', 'dr_bet', 'pl_bed', 'pl_bet', 'la_bed', 'la_bet'];
  const M13_PRED = { lp: [], pp: [], dr: ['lp', 'pp'], pl: ['dr'], la: [] };
  // Dny, kdy jeřáb stojí: oslava (kotva), hledání výpočtu (bez Věry), prasklé lano (bez výměny)
  function m13Pravidla(p) {
    const blok = {};
    const kotva = p.c2_odhad === 'kotva';
    if (kotva) blok[1] = { klic: 'ch3_m13_den_oslava', videt: true };
    if (!vTymuP(p, 'vera')) blok[kotva ? 2 : 1] = { klic: 'ch3_m13_den_vypocet', videt: true };
    if (p.c2_riziko_predem !== 'lano') {
      const videt = String(p.c2_rizika_zapsana || '').split('-').includes('lano');
      for (const d of kotva ? [10, 11] : [9, 10]) blok[d] = { klic: 'ch3_m13_den_lano', videt, lano: true };
    }
    return { blok, ukazky: p.c2_rozdeleni === 'krabice' && !p.ukazky_pryc ? [3, 6, 9, 12] : [], zabradli: (p.c2_rozpad || 0) >= 1 };
  }
  // Přehrání plánu den po dni. Karta, která na svůj den nemůže, se posune a další s ní.
  function m13Prehraj(plan, pr) {
    const log = [];
    const karty = M13_KARTY.map((id, i) => ({ id, prvek: id.slice(0, 2), druh: id.slice(3), pd: plan[id] || 50 + i }));
    const bedneno = {}; const beton = {}; const sadaPrvku = {}; const sady = [1, 1];
    let den = 0; let posun = 0; let drolivy = false;
    const hlaseno = {};
    const blokovan = (d) => pr.blok[d] || (pr.ukazky.includes(d) ? { klic: 'ch3_m13_den_ukazka' } : null);
    const ukazkyDo = (d) => {
      for (const u of pr.ukazky) {
        if (u <= den || u > d || hlaseno['u' + u]) continue;
        hlaseno['u' + u] = true;
        const nezraly = Object.keys(beton).find((k) => beton[k] >= u - 2 && beton[k] <= u);
        if (nezraly) {
          drolivy = true;
          log.push({ klic: 'ch3_m13_ukazka_drobi', dosad: ['ch3_m13_prvek_' + nezraly, String(u)] });
          delete beton[nezraly];
          sady[sadaPrvku[nezraly]] = Infinity;
          karty.push({ id: nezraly + '_bet', prvek: nezraly, druh: 'bet', pd: u + 1, znovu: true });
        } else if (!hlaseno.ukazka_ok) { hlaseno.ukazka_ok = true; log.push({ klic: 'ch3_m13_ukazka_ok', dosad: [String(u)] }); }
      }
    };
    const pripravena = (c) => (c.druh === 'bet' ? c.prvek in bedneno : M13_PRED[c.prvek].every((x) => x in beton) && sady.some((s) => s !== Infinity));
    let pojistka = 0;
    while (karty.length && pojistka++ < 100) {
      const kandidati = karty.filter(pripravena).sort((a, b) => a.pd - b.pd);
      if (!kandidati.length) break;
      const c = kandidati[0];
      // Karta, která přišla na řadu dřív, než je na čem stavět, se odloží a při provedení spadne
      const prvni = karty.slice().sort((a, b) => a.pd - b.pd)[0];
      if (prvni !== c && !prvni.znovu) prvni.odlozena = true;
      karty.splice(karty.indexOf(c), 1);
      const chtel = Math.max(c.pd + posun, den + 1);
      let d = chtel;
      let duvod = c.pd + posun <= den ? 'ch3_m13_fronta' : null;
      // Karta naplánovaná před tím, než je na čem stavět: bednění spadne a den zabere úklid
      const zralost = c.druh === 'bet' ? bedneno[c.prvek] + 1 : Math.max(0, ...M13_PRED[c.prvek].map((x) => beton[x] + 3));
      if (c.odlozena || zralost > d) { d = Math.max(d, zralost) + 1; duvod = 'ch3_m13_zriceno'; }
      if (c.druh === 'bed') { const volna = Math.min(...sady); if (volna > d) { d = volna; duvod = 'ch3_m13_bedneni'; } }
      for (;;) {
        ukazkyDo(d);
        if (c.druh === 'bet' && !(c.prvek in bedneno)) break;
        const b = blokovan(d);
        if (!b) break;
        if (!hlaseno['d' + d]) { hlaseno['d' + d] = true; if (b.lano && !b.videt) log.push({ klic: 'ch3_m13_lano_prasklo', dosad: [String(d)] }); }
        d++;
      }
      if (duvod && d > c.pd + posun) log.push({ klic: duvod, dosad: ['ch3_m13_karta_' + (c.znovu ? c.prvek + '_bet' : c.id), String(d)] });
      if (c.pd < 50) posun = Math.max(posun, d - c.pd);
      den = d;
      if (c.druh === 'bed') {
        bedneno[c.prvek] = d;
        const i = sady[0] <= sady[1] ? 0 : 1;
        sadaPrvku[c.prvek] = i; sady[i] = Infinity;
      } else {
        beton[c.prvek] = d;
        sady[sadaPrvku[c.prvek]] = d + 3;
      }
    }
    let konec = Math.max(...Object.values(beton).map((b) => b + 2));
    if (pr.zabradli) {
      let d = Math.max(den + 1, (beton.pl || 0) + 3);
      while (blokovan(d)) d++;
      log.push({ klic: 'ch3_m13_zabradli', dosad: [String(d)] });
      konec = Math.max(konec, d);
    }
    return { konec, log, drolivy };
  }
  data.minihry.m13 = {
    nazev: 'ch3_m13_nazev', navod: 'ch3_m13_navod',
    priprav: (h) => {
      const p = h.s.priznaky;
      const pr = m13Pravidla(p);
      return {
        druh: 'jerab', dnu: 16,
        karty: M13_KARTY.map((id) => ({ id, klic: 'ch3_m13_karta_' + id, prvek: id.slice(0, 2), druh: id.slice(3) })),
        blokovane: Object.entries(pr.blok).filter(([, b]) => b.videt).map(([d, b]) => ({ den: Number(d), klic: b.klic })),
        ukazky: pr.ukazky, muze_odnest: p.c2_rozdeleni === 'krabice' && !p.ukazky_pryc,
      };
    },
    prehraj: m13Prehraj, pravidla: m13Pravidla,
    vyhodnot: (h, v) => {
      const p = h.s.priznaky;
      const konec = (akce) => { h.proved([...akce, '+rozpis', '$m13_hotovo', 'ch3_m13_rozpis_na_plot', FAZE_B]); return { hotovo: true }; };
      if (v.odnest) { h.proved(['ch3_m13_framework_odnest', 'ch3_m13_framework_protest', '$ukazky_pryc']); return { hotovo: false }; }
      if (v.preskocit) return konec(['ch3_m13_preskocit', '$c3_rezerva=0']);
      const plan = v.plan || {};
      if (M13_KARTY.some((id) => !plan[id])) { h.rekni('ch3_m13_chybi'); return { hotovo: false }; }
      const dny = Object.values(plan);
      if (new Set(dny).size !== dny.length) { h.rekni('ch3_m13_jeden_jerab'); return { hotovo: false }; }
      const vysledek = m13Prehraj(plan, m13Pravidla(p));
      h.rekni('ch3_m13_prehravani');
      if (p.c2_odhad === 'kotva') h.proved(['ch3_m13_oslava', { kdy: TYM('pepa'), akce: 'ch3_m13_pepa_dva_dny' }]);
      h.rekni('ch3_m13_zrani');
      for (const z of vysledek.log) h.rekni(z.klic, z.dosad);
      const rezerva = Math.max(-3, Math.min(2, 16 - vysledek.konec));
      h.rekni('ch3_m13_konec', [String(vysledek.konec)]);
      return konec([
        '$c3_rezerva=' + rezerva, ...(vysledek.drolivy ? ['$c3_drolivy'] : []),
        rezerva >= 2 ? 'ch3_m13_rezerva_2' : rezerva >= 1 ? 'ch3_m13_rezerva_1' : rezerva >= 0 ? 'ch3_m13_rezerva_0' : 'ch3_m13_rezerva_minus',
        ...(rezerva >= 1 ? ['ch3_pembok_pochvala', 'ch3_ruda_pochvala_2'] : [])]);
    },
  };

  // --- P3.6 Plán kola ---------------------------------------------------------
  data.minihry.plan_kola = {
    nazev: 'ch3_plan_nazev', navod: 'ch3_plan_navod',
    priprav: (h) => {
      const p = h.s.priznaky;
      return {
        druh: 'plan_kola',
        cile: ['cesta', 'hotove', 'vse'].map((id) => ({ id, klic: 'ch3_plan_cil_' + id })),
        karty: ZAKLADNI14.map((id) => ({ id, klic: 'ch3_m14_karta_' + id, odhad: KARTY14[id].odhad })),
        kapacita: p.porada_pretazena ? 2 : kapacitaKola(p),
        vynucene: p.porada_odpocet ? ['odpocet'] : [],
        diktat: p.c2_rozdeleni === 'gantt' ? ['odpocet', 'heslo', 'mapa'] : null,
      };
    },
    vyhodnot: (h, v) => {
      const m = data.minihry.plan_kola.priprav(h);
      const hotovo = (karty, akce) => {
        h.nastav('c3_kolo1=' + karty.join('-'));
        h.proved([...akce, '$plan_kola_hotovo', 'ch3_plan_hotovo', FAZE_B]);
        return { hotovo: true };
      };
      if (m.diktat) return hotovo(m.diktat, ['ch3_plan_gantt_ruda', 'ch3_plan_gantt_bara']);
      if (!v.cil) { h.rekni('ch3_plan_bez_cile'); return { hotovo: false }; }
      if (v.cil === 'vse') { h.rekni('ch3_plan_cil_vse_ne'); return { hotovo: false, vratit: ['cil'] }; }
      const karty = [...new Set([...(m.vynucene || []), ...(v.karty || [])])].filter((id) => ZAKLADNI14.includes(id));
      if (!karty.length) { h.rekni('ch3_plan_bez_karet'); return { hotovo: false }; }
      if (karty.length > m.kapacita + 2) { h.rekni('ch3_plan_moc'); return { hotovo: false }; }
      const nad = Math.max(0, karty.length - m.kapacita);
      return hotovo(karty, [
        v.cil === 'cesta' ? 'ch3_plan_cil_cesta_ok' : 'ch3_plan_cil_hotove_ok',
        ...(nad ? ['$c3_dluh+' + nad, { kdy: TYM('pepa'), akce: 'ch3_plan_pepa_dva_dny', jinak: 'ch3_plan_navic' }] : [])]);
    },
  };

  // --- M14 Ukázka na náměstí ---------------------------------------------------
  const BABICKA_TLACITKA = (p) => (p.c1_babicka === 'odmitnuta' ? 2 : 1);
  const BABICKA_KOCOUR = (p) => (p.c1_babicka === 'spojenec' ? 1 : 2);
  function m14Stav(h) {
    const st = h.s.minihra;
    const p = h.s.priznaky;
    if (!st.kolo) {
      const kolo1 = String(p.c3_kolo1 || 'sipky-mapa-maketa').split('-').filter(Boolean);
      Object.assign(st, { kolo: 1, faze: 'ukazat', hotove: kolo1, posledni: kolo1, seznam: ZAKLADNI14.filter((k) => !kolo1.includes(k)),
        vyhozene: [], otocene: [], ukazek: 0, zamceno: p.c2_rozdeleni === 'krabice', dluh: 0, maketa_ukazana: false });
    }
    return st;
  }
  data.minihry.m14 = {
    nazev: 'ch3_m14_nazev', navod: 'ch3_m14_navod',
    priprav: (h) => {
      const st = m14Stav(h);
      const p = h.s.priznaky;
      const karta = (id) => ({ id, klic: 'ch3_m14_karta_' + id, odhad: KARTY14[id].odhad, hodnota: st.otocene.includes(id) ? KARTY14[id].hodnota : null });
      return {
        druh: 'ukazka', kolo: st.kolo, faze: st.faze, kapacita: kapacitaKola(p), zamceno: st.zamceno,
        hotove: st.hotove.map(karta), seznam: st.seznam.map(karta), vyhozene: st.vyhozene.map(karta),
        muze_vynechat: st.kolo === 2 && st.faze === 'ukazat',
        den: [21, 18, 15][st.kolo - 1],
      };
    },
    vyhodnot: (h, v) => {
      const st = m14Stav(h);
      const p = h.s.priznaky;
      const konec = (akce) => { h.proved([...akce, '$m14_hotovo', 'ch3_m14_konec_bara', JESTETOTO]); return { hotovo: true }; };
      if (v.preskocit) return konec(['ch3_m14_preskocit', '$c3_hodnota=1', '$c3_hotove=' + ZAKLADNI14.join('-')]);
      if (v.vyndat) { if (st.zamceno) { st.zamceno = false; h.proved(['ch3_m14_vyndat_bara', 'ch3_m14_framework_obnovuje']); } return { hotovo: false }; }
      if (v.vyhodit) {
        if (st.zamceno) { h.rekni('ch3_m14_zamceno'); return { hotovo: false }; }
        if (st.seznam.includes(v.vyhodit)) { st.seznam = st.seznam.filter((x) => x !== v.vyhodit); st.vyhozene.push(v.vyhodit); h.rekni('ch3_m14_vyhozeno_' + (v.vyhodit === 'odpocet' || v.vyhodit === 'heslo' ? v.vyhodit : 'jine')); }
        return { hotovo: false };
      }
      if (v.kolo && st.faze === 'planovat') {
        const kap = kapacitaKola(p);
        let karty = st.zamceno ? st.seznam.slice(0, kap) : [...new Set(v.kolo)].filter((x) => st.seznam.includes(x));
        if (karty.length > kap + 1) { h.rekni('ch3_m14_moc'); return { hotovo: false }; }
        if (karty.length > kap) { st.dluh++; h.rekni(vTymu(h, 'pepa') ? 'ch3_plan_pepa_dva_dny' : 'ch3_plan_navic'); }
        if (st.zamceno) h.rekni('ch3_m14_krabice_poradi');
        st.hotove.push(...karty); st.posledni = karty; st.seznam = st.seznam.filter((x) => !karty.includes(x));
        st.faze = 'ukazat';
        h.rekni('ch3_m14_kolo_hotovo', [String(st.kolo)]);
        return { hotovo: false };
      }
      if ((v.ukazat || v.vynechat) && st.faze === 'ukazat') {
        const zakazano = st.kolo === 2 && p.c2_rozdeleni === 'gantt';
        if (v.vynechat || zakazano) {
          if (st.kolo !== 2) { h.rekni('ch3_m14_ukazka_vzdy'); return { hotovo: false }; }
          h.rekni(zakazano ? 'ch3_m14_ruda_zakaz' : 'ch3_m14_vynechat');
          h.rekni('ch3_m14_vynechat_nic');
        } else {
          st.ukazek++;
          h.rekni('ch3_m14_ukazka_den', [String([21, 18, 15][st.kolo - 1])]);
          for (const id of st.posledni) {
            h.rekni('ch3_m14_reakce_' + id);
            if (!st.otocene.includes(id)) st.otocene.push(id);
            if (id === 'maketa') st.maketa_ukazana = true;
          }
          if (!st.posledni.length) h.rekni(st.kolo === 3 ? 'ch3_m14_nic_noveho_konec' : 'ch3_m14_nic_noveho');
          if (st.ukazek === 1) h.proved(['ch3_m14_zmena_svacina', 'ch3_m14_babicka_vejdeme']);
          const pridej = (id, klic) => { if (!st.seznam.includes(id) && !st.hotove.includes(id) && !st.vyhozene.includes(id)) { st.seznam.unshift(id); st.otocene.push(id); h.rekni(klic); } };
          if (st.ukazek >= BABICKA_TLACITKA(p)) pridej('tlacitka', p.c1_babicka === 'spojenec' ? 'ch3_m14_babicka_konecne' : 'ch3_m14_babicka_tlacitka');
          else if (st.ukazek === 1) h.rekni('ch3_m14_babicka_mlci');
          if (st.ukazek >= BABICKA_KOCOUR(p)) pridej('kocour', 'ch3_m14_babicka_kocour');
          if (st.maketa_ukazana) {
            if (p.c2_interier === 'ruda' || p.c2_rozdeleni === 'gantt') { if (!st.udice_vykres) { st.udice_vykres = true; h.rekni('ch3_m14_udice_vykres'); } }
            else pridej('udice', 'ch3_m14_rybari_udice');
          }
        }
        if (st.kolo === 3) {
          const soucet = st.hotove.reduce((a, id) => a + KARTY14[id].hodnota, 0);
          const hodnota = soucet >= 12 ? 3 : soucet >= 8 ? 2 : soucet >= 4 ? 1 : 0;
          return konec(['ch3_m14_vysledek_' + hodnota, '$c3_hodnota=' + hodnota, '$c3_hotove=' + st.hotove.join('-'), ...(st.dluh ? ['$c3_dluh+' + st.dluh] : [])]);
        }
        st.kolo++;
        st.faze = 'planovat';
        st.posledni = [];
        return { hotovo: false };
      }
      return { hotovo: false };
    },
  };

  // --- M10 Ještětoto (rozcestník změn, R3.1) -----------------------------------
  const PRIHRADKY = ['rovnou', 'posoudit', 'seznam', 'ne'];
  function m10Fronta(h) {
    const st = h.s.minihra;
    if (!st.fronta) { st.fronta = ['bazen', 'svaciny', 'poklop', 'zpet', 'gantt']; st.vyrizeno = []; st.faze2 = 0; }
    return st;
  }
  const ZADATEL = { bazen: 'postava_pan_zmena', svaciny: 'postava_pan_zmena', poklop: 'postava_bara', zpet: 'postava_babicka', gantt: 'postava_ruda', vlny: 'postava_pan_zmena' };
  data.minihry.m10 = {
    nazev: 'ch3_m10_nazev', navod: 'ch3_m10_navod',
    priprav: (h) => {
      const st = m10Fronta(h);
      const id = st.fronta[0];
      return {
        druh: 'rozcestnik',
        prihradky: PRIHRADKY.map((pid) => ({ id: pid, klic: 'ch3_m10_prihradka_' + pid })),
        karta: id ? { id, klic: 'ch3_m10_karta_' + id, zadatel: ZADATEL[id] } : null,
        kolo: id === 'bazen' || id === 'svaciny' ? 1 : id === 'vlny' ? 3 : 2,
        tvor: jmenoTvora(h.s.priznaky.c3_creep), velikost: h.s.priznaky.c3_creep || 0,
        vyrizeno: st.vyrizeno,
      };
    },
    vyhodnot: (h, v) => {
      const st = m10Fronta(h);
      const p = h.s.priznaky;
      const roste = (o) => {
        const pred = p.c3_creep || 0;
        h.nastav('c3_creep=' + Math.min(4, pred + o));
        h.rekni('ch3_m10_roste', [jmenoTvora(p.c3_creep)]);
      };
      const hotovo = () => {
        if (!p.poklop_schvalen) h.nastav('poklop_schvalen=ne');
        if (p.poklop_schvalen === 'ne') h.nastav('c3_poklop=ne');
        h.proved(['$m10_hotovo', '$dny=15', 'ch3_m10_konec', { kdy: "c3_krysy=='aktovka'", akce: 'ch3_m10_predseda_aktovka' }, 'ch3_m10_konec_pembok']);
        return { hotovo: true };
      };
      if (v.preskocit) {
        h.proved(['ch3_m10_preskocit', '$c3_creep=1', '$c3_bazen=odmitnut', '$c3_svaciny=schvalovani', '$poklop_schvalen=ano']);
        return hotovo();
      }
      const id = st.fronta[0];
      if (!id || v.karta !== id || !PRIHRADKY.includes(v.kam)) return { hotovo: false };
      const kam = v.kam;
      // Předseda u posouzení: formulář a při fázi 2 analýza dopadu (den za kartu, nejvýš dva)
      if (kam === 'posoudit') {
        h.rekni(st.vyrizeno.some((x) => x.kam === 'posoudit') ? 'ch3_m10_predseda_razitko' : 'ch3_m10_predseda_kopie');
        if (p.c1_faze2 && !p.faze_zastavena && st.faze2 < 2) { st.faze2++; h.proved(['ch3_m10_predseda_faze2', '$c3_rezerva+-1']); }
      }
      const vera = vTymu(h, 'vera') ? 'vera' : 'ruda';
      let vratit = false;
      const r = (klic) => h.rekni(klic);
      if (id === 'bazen') {
        if (kam === 'posoudit') {
          r('ch3_m10_bazen_vaha_' + vera);
          if (p.c1_mimo_rozsah) h.proved(['ch3_m10_bara_papir', 'ch3_m10_zmena_hned']);
          else h.proved(['ch3_m10_zmena_vlny', 'ch3_m10_ruda_bez_vln', 'ch3_m10_zmena_plave']);
          h.nastav('c3_bazen=vyjednan');
        } else if (kam === 'rovnou') { r('ch3_m10_bazen_rovnou'); h.nastav('c3_bazen=bez_rizeni'); roste(2); }
        else if (kam === 'ne') { r('ch3_m10_bazen_ne'); h.nastav('c3_bazen=odmitnut'); roste(1); }
        else { r('ch3_m10_bazen_seznam'); vratit = true; }
      } else if (id === 'svaciny') {
        if (kam === 'seznam') { r('ch3_m10_svaciny_seznam'); h.nastav('c3_svaciny=seznam'); }
        else if (kam === 'posoudit') { h.proved(['ch3_m10_svaciny_posoudit', 'ch3_m10_svaciny_tri_tydny']); h.nastav('c3_svaciny=schvalovani'); }
        else if (kam === 'rovnou') { r('ch3_m10_svaciny_rovnou'); h.nastav('c3_svaciny=rovnou'); roste(1); }
        else { r('ch3_m10_svaciny_ne'); h.nastav('c3_svaciny=odmitnuty'); }
      } else if (id === 'poklop') {
        if (kam === 'posoudit') { h.proved(['ch3_m10_poklop_bara', 'ch3_m10_poklop_vaha_' + vera, 'ch3_m10_poklop_schvaleno']); h.nastav('poklop_schvalen=ano'); }
        else if (kam === 'rovnou') { r('ch3_m10_poklop_rovnou'); h.nastav('poklop_schvalen=netesni'); }
        else if (kam === 'ne') { h.proved(['ch3_m10_poklop_ne', 'ch3_m10_poklop_bara_smutna']); h.nastav('poklop_schvalen=ne'); }
        else { r('ch3_m10_poklop_seznam_' + vera); vratit = true; }
      } else if (id === 'zpet') {
        if (kam === 'seznam') r('ch3_m10_zpet_seznam');
        else if (kam === 'posoudit') r('ch3_m10_zpet_posoudit');
        else if (kam === 'rovnou') { r('ch3_m10_zpet_rovnou'); roste(1); }
        else r('ch3_m10_zpet_ne');
      } else if (id === 'gantt') {
        if (kam === 'ne' || kam === 'seznam') r(kam === 'ne' ? 'ch3_m10_gantt_ne' : 'ch3_m10_gantt_seznam');
        else if (kam === 'rovnou') { h.proved(['ch3_m10_gantt_rovnou', 'ch3_m10_gantt_bara', '$c3_gantt_v_aplikaci']); roste(1); }
        else r('ch3_m10_gantt_posoudit');
      } else if (id === 'vlny') {
        if (kam === 'posoudit') h.proved(['ch3_m10_vlny_vaha_' + vera, 'ch3_m10_vlny_vyjednano']);
        else if (kam === 'rovnou') { r('ch3_m10_vlny_rovnou'); roste(2); }
        else if (kam === 'ne') { r('ch3_m10_vlny_ne'); roste(1); }
        else { r('ch3_m10_bazen_seznam'); vratit = true; }
      }
      if (vratit) return { hotovo: false, vratit: [id] };
      st.vyrizeno.push({ id, kam });
      st.fronta.shift();
      // Druhé kolo začíná Bářiným poklopem, Rudovo přání má svou poznámku od Pemboka
      if (st.fronta[0] === 'poklop') r('ch3_m10_kolo_2');
      if (st.fronta[0] === 'gantt') r('ch3_m10_pembok_gantt');
      if (!st.fronta.length && !st.treti) {
        st.treti = true;
        if (!p.c1_zmena_dohoda || p.c3_bazen !== 'vyjednan') { st.fronta.push('vlny'); h.proved(['ch3_m10_kolo_3', 'ch3_m10_zmena_vlny_prichazi']); }
        else r('ch3_m10_dohoda_drzi');
      }
      if (!st.fronta.length) return hotovo();
      return { hotovo: false };
    },
  };

  // --- M15 Než se zavře trup ---------------------------------------------------
  const M15_KARTY = ['kabel_motory', 'cidla', 'kabel_navigace', 'prog_start', 'prog_pocitadlo', 'prog_navigace', 'aplikace', 'odpocet', 'svaciny'];
  const FYZICKE = ['kabel_motory', 'cidla', 'kabel_navigace'];
  function m15Karty(p) {
    const pocitadloHotove = p.c3_bara_priority === 'ano' && (p.c3_dluh || 0) <= 1;
    const most = String(p.c2_mosty || '').split('-').includes('trup');
    const svaciny = p.c3_svaciny && p.c3_svaciny !== 'odmitnuty';
    const bara = {
      kabel_motory: 'ch3_m15_bara_kabel', cidla: 'ch3_m15_bara_kabel', kabel_navigace: 'ch3_m15_bara_kabel',
      prog_start: 'ch3_m15_bara_start', prog_navigace: 'ch3_m15_bara_navigace', aplikace: 'ch3_m15_bara_aplikace',
      prog_pocitadlo: !most ? 'ch3_m15_bara_pocitadlo_mozna' : pocitadloHotove ? 'ch3_m15_bara_pocitadlo_ano' : 'ch3_m15_bara_pocitadlo_ne',
      odpocet: 'ch3_m15_bara_odpocet', svaciny: 'ch3_m15_bara_svaciny',
    };
    return M15_KARTY.filter((id) => (id !== 'odpocet' || p.c3_bara_priority === 'ne') && (id !== 'svaciny' || svaciny))
      .map((id) => ({ id, klic: 'ch3_m15_karta_' + id, ruda: 'ch3_m15_ruda_info_' + (FYZICKE.includes(id) ? 'kabel' : id === 'aplikace' ? 'aplikace' : 'program'), bara: bara[id] }));
  }
  data.minihry.m15 = {
    nazev: 'ch3_m15_nazev', navod: 'ch3_m15_navod',
    priprav: (h) => {
      const p = h.s.priznaky;
      const poklop = p.c3_poklop === 'ano' || p.c3_poklop === 'netesni';
      return {
        druh: 'trup',
        prihradky: [{ id: 'dovnitr', klic: 'ch3_m15_dovnitr' }, ...(poklop ? [{ id: 'pozdeji', klic: 'ch3_m15_pozdeji' }] : []), { id: 'ven', klic: 'ch3_m15_ven' }],
        karty: m15Karty(p),
        bazen: p.c3_bazen === 'bez_rizeni',
        bez_poklopu: !poklop,
      };
    },
    vyhodnot: (h, v) => {
      const p = h.s.priznaky;
      const vera = vTymu(h, 'vera');
      const odchazi = ['pepa', 'klara', 'vera', 'norbert'].find((k) => vTymu(h, k)) || 'pepa';
      const poklop = p.c3_poklop === 'ano' || p.c3_poklop === 'netesni';
      const zavrit = (akce) => {
        h.proved([...akce,
          vera ? 'ch3_m15_vera_nyty' : 'ch3_m15_ruda_nyty', '$c3_odchazi=' + odchazi]);
        h.rekni(poklop ? 'ch3_m15_klic_poklopu' : 'ch3_m15_plan_zapojeni', [NAZEV[odchazi]]);
        h.proved(['$m15_hotovo', '^bara=hangar', '>hangar', 'ch3_r33_hangar', '#r33']);
        return { hotovo: true };
      };
      if (v.preskocit) return zavrit(['ch3_m15_preskocit', '$c3_integrace=2', '$c3_nesladeno=navigace-svaciny', ...(p.c3_bazen === 'bez_rizeni' ? ['$c3_bazen_v_trupu'] : [])]);
      const um = v.umisteni || {};
      const karty = m15Karty(p);
      if (karty.some((k) => !um[k.id])) { h.rekni('ch3_m15_chybi'); return { hotovo: false }; }
      if (um.aplikace === 'dovnitr') { h.rekni(vera ? 'ch3_m15_vera_aplikace' : 'ch3_m15_ruda_aplikace'); return { hotovo: false, vratit: ['aplikace'] }; }
      if (!poklop && Object.values(um).includes('pozdeji')) { h.rekni('ch3_m15_bez_poklopu'); return { hotovo: false, vratit: Object.keys(um).filter((k) => um[k] === 'pozdeji') }; }
      if (p.c3_bazen === 'bez_rizeni' && !v.bazen) { h.rekni('ch3_m15_bazen_otazka'); return { hotovo: false, bazen: true }; }
      const pocitadloHotove = p.c3_bara_priority === 'ano' && (p.c3_dluh || 0) <= 1;
      const chyby = [];
      for (const id of FYZICKE) if (um[id] !== 'dovnitr') chyby.push('ch3_m15_chyba_kabel');
      if (p.c3_bazen === 'bez_rizeni' && v.bazen === 'nechat' && um.kabel_navigace === 'dovnitr') chyby.push('ch3_m15_chyba_bazen');
      if (um.prog_start !== 'dovnitr') chyby.push('ch3_m15_chyba_start');
      if (um.prog_navigace === 'dovnitr') chyby.push('ch3_m15_chyba_navigace');
      if (um.prog_navigace === 'ven') chyby.push('ch3_m15_chyba_navigace_nikdy');
      if (um.prog_pocitadlo === 'dovnitr' && !pocitadloHotove) chyby.push('ch3_m15_chyba_pocitadlo');
      if (um.prog_pocitadlo === 'ven') chyby.push('ch3_m15_chyba_pocitadlo_nikdy');
      if (um.svaciny === 'dovnitr') chyby.push('ch3_m15_chyba_svaciny');
      if (!String(p.c2_mosty || '').split('-').includes('nastup') && !p.c3_bara_zna_lavku) chyby.push('ch3_m15_chyba_lavka');
      const akce = ['ch3_m15_zavira_se'];
      if (v.bazen === 'ven') akce.push('ch3_m15_bazen_ven', 'ch3_m15_zmena_urazi', '$c3_creep+1');
      for (const c of [...new Set(chyby)]) akce.push(c);
      if (um.prog_pocitadlo === 'dovnitr' && pocitadloHotove) akce.push({ kdy: "c3_vada_hlasena=='ano'", akce: 'ch3_m15_pocitadlo_opravene' });
      // Kap. 4 čte, co přesně zůstalo nesladěné (každý bod řeší jen jednou) a jestli bazén zůstal v trupu
      const body = [...new Set(chyby)].map((c) => c.split('_chyba_')[1]);
      if (body.length) akce.push('$c3_nesladeno=' + body.join('-'));
      if (p.c3_bazen === 'bez_rizeni' && v.bazen === 'nechat') akce.push('$c3_bazen_v_trupu');
      akce.push('$c3_integrace=' + Math.min(3, chyby.length), chyby.length ? 'ch3_m15_vysledek_chyby' : 'ch3_m15_vysledek_dobre');
      return zavrit(akce);
    },
  };

  // --- Průchody z docs/kapitoly/03-pruchod.md -----------------------------------
  const M13_PLAN1 = { lp_bed: 1, pp_bed: 2, lp_bet: 3, pp_bet: 4, la_bed: 6, dr_bed: 7, dr_bet: 8, la_bet: 9, pl_bed: 11, pl_bet: 12 };
  const M13_PLAN2 = { lp_bed: 1, lp_bet: 2, pp_bed: 3, pp_bet: 4, la_bed: 5, la_bet: 6, dr_bed: 7, dr_bet: 8, pl_bed: 11, pl_bet: 12 };
  const posunPlan = (plan, o) => Object.fromEntries(Object.entries(plan).map(([k, d]) => [k, d + o]));
  const PORADA_DOBRA = (lide) => [
    'pouzij minutka',
    ...lide.flatMap((k) => (k === 'zdenda' ? ['volba ch3_porada_volba_dal'] : ['volba ch3_porada_volba_utnout_' + k])),
    'volba ch3_porada_volba_prekazka', 'volba ch3_porada_volba_ruda_pryc'];
  const DILNA_KROKY = [
    'pouzij maketa', 'predmet kabel sloupek', 'volba ch3_napad_volba_pockat',
    'pouzij krabicka', 'predmet listky maketa',
    'pouzij cidlo', 'predmet cidlo police', 'pouzij model', 'predmet model police'];
  const KRYSY_AKTOVKOU = ['pouzij vratny', 'volba ch3_vratny_volba_klic', 'volba ch3_volba_konec', 'predmet klic_sklad sklad', 'predmet zadosti sklad'];
  const M14_NEJLEPSI = [{ minihra: { ukazat: true } }, { minihra: { kolo: ['tlacitka', 'udice', 'kocour'] } }, { minihra: { ukazat: true } },
    { minihra: { vyhodit: 'heslo' } }, { minihra: { vyhodit: 'odpocet' } }, { minihra: { kolo: [] } }, { minihra: { ukazat: true } }];
  const M10_DOBRE = [
    { minihra: { karta: 'bazen', kam: 'posoudit' } }, { minihra: { karta: 'svaciny', kam: 'seznam' } },
    { minihra: { karta: 'poklop', kam: 'posoudit' } }, { minihra: { karta: 'zpet', kam: 'seznam' } }, { minihra: { karta: 'gantt', kam: 'ne' } }];
  const M15_DOBRE = { umisteni: { kabel_motory: 'dovnitr', cidla: 'dovnitr', kabel_navigace: 'dovnitr', prog_start: 'dovnitr', prog_pocitadlo: 'dovnitr', prog_navigace: 'pozdeji', aplikace: 'ven', svaciny: 'pozdeji' } };
  // Bára: dílna, plán kola, ukázka, vada (za Rudu se tím fáze A uzavře)
  const BARA_NEJKRATSI = (lide) => [
    'prepni', ...PORADA_DOBRA(lide), ...DILNA_KROKY,
    'pouzij seznam', { minihra: { cil: 'cesta', karty: ['sipky', 'mapa', 'maketa'] } }];

  data.pruchody = {
    nejkratsi: {
      popis: 'Nejkratší cesta, dobré kapitoly 1 a 2 (03-pruchod.md §1)',
      start: 'dobra',
      kroky: [
        'pouzij vratny', 'volba ch3_vratny_volba_klic', "ocekavej rekl('ch3_vratny_klic_pozdeji')", 'volba ch3_volba_konec',
        'pouzij jerab', { minihra: { plan: M13_PLAN1 } },
        ...BARA_NEJKRATSI(['pepa', 'klara']),
        'ocekavej faze_b',
        // Fáze B: Ruda vyžene krysy, Bára jde na ukázku
        'prepni', ...KRYSY_AKTOVKOU, 'pouzij sklad', 'pouzij poklop', 'pouzij dvere', 'prepni',
        'pouzij dvere', 'pouzij brana', 'pouzij ulicka', 'pouzij stanek', ...M14_NEJLEPSI,
        'pouzij ulicka', 'pouzij brana', 'pouzij bocni', 'pouzij pocitac',
        'pouzij dvere', 'pouzij brana', 'predmet zapis ruda',
        'prepni', 'pouzij brana',
        'pouzij rozcestnik', ...M10_DOBRE,
        'pouzij bocni', 'volba ch3_r32_volba_bara',
        'ocekavej faze_c',
        'pouzij dvere', 'pouzij zebrik', 'predmet poklop otvor', 'pouzij misto', { minihra: M15_DOBRE },
        'volba ch3_r33_volba_sednout', 'volba ch3_zlepseni_bara',
      ],
      ocekavej: ['konec', 'c3_rezerva==2', 'c3_hodnota==3', 'c3_dluh==0', 'c3_creep==0', "c3_bazen=='vyjednan'", "c3_svaciny=='seznam'",
        "c3_poklop=='ano'", "c3_vada_hlasena=='ano'", "c3_bara_priority=='ano'", 'c3_integrace==0', "c3_odchazi=='pepa'",
        "c3_krysy=='aktovka'", "c3_retro=='ano'", "c3_zlepseni=='bara'", 'dny==9'],
    },
    spatne_kapitoly: {
      popis: 'Špatné kapitoly 1 a 2: kotva, Gantt, rozpad, fáze 2, bez Norberta, vada přes Rudu (03-pruchod.md §3)',
      start: 'spatna',
      kroky: [
        'pouzij jerab', { minihra: { plan: posunPlan(M13_PLAN2, 1) } },
        'ocekavej c3_rezerva==0',
        'prepni', ...PORADA_DOBRA(['pepa', 'krystof', 'zdenda']),
        ...DILNA_KROKY, 'pouzij plech', 'predmet plech police',
        'pouzij seznam', { minihra: {} },
        'pouzij dvere', 'pouzij brana', 'pouzij ulicka', 'pouzij stanek',
        { minihra: { ukazat: true } }, { minihra: { kolo: ['tlacitka', 'sipky', 'maketa'] } }, { minihra: { ukazat: true } },
        { minihra: { kolo: ['udice', 'kocour'] } }, { minihra: { ukazat: true } },
        'ocekavej c3_hodnota<=2',
        'pouzij ulicka', 'pouzij brana', 'pouzij bocni', 'pouzij pocitac',
        'pouzij dvere', 'pouzij brana', 'predmet zapis ruda', 'ocekavej bara_odbyta',
        'prepni', ...KRYSY_AKTOVKOU, 'pouzij sklad', 'pouzij poklop', 'pouzij dvere',
        'pouzij bara', 'volba ch3_vada_r_volba_mlcet', 'volba ch3_vada_r_volba_mlcet', 'volba ch3_vada_r_volba_mlcet',
        'pouzij brana', 'predmet plan predseda',
        'pouzij rozcestnik', ...M10_DOBRE, { minihra: { karta: 'vlny', kam: 'posoudit' } },
        'pouzij bocni', 'volba ch3_r32_volba_bara', 'predmet rozpis bara',
        'pouzij dvere', 'pouzij brana', 'pouzij ulicka', 'predmet pembok norbert', 'pouzij ulicka', 'pouzij brana',
        'pouzij zebrik', 'predmet poklop otvor', 'pouzij misto', { minihra: M15_DOBRE },
        'volba ch3_r33_volba_sednout', 'volba ch3_zlepseni_bara',
      ],
      ocekavej: ['konec', 'c3_rezerva==-1', "c3_vada_hlasena=='ano'", 'faze_zastavena', 'norbert_podpis', "c3_krysy=='aktovka'",
        'c3_hodnota==2', 'c3_creep==0', 'c3_integrace==0', 'c3_bara_zna_lavku', "c3_odchazi=='pepa'"],
    },
    preskocene: {
      popis: 'Varianta L: všechny minihry přeskočené, bez posezení (F), Ruda určuje pořadí (E)',
      start: 'dobra',
      kroky: [
        'pouzij jerab', { minihra: { preskocit: true } },
        ...BARA_NEJKRATSI(['pepa', 'klara']).slice(0, -2), 'pouzij seznam', { minihra: { cil: 'cesta', karty: ['sipky', 'mapa', 'maketa', 'heslo'] } },
        'pouzij dvere', 'pouzij brana', 'pouzij ulicka', 'pouzij stanek', { minihra: { preskocit: true } },
        'prepni', ...KRYSY_AKTOVKOU, 'pouzij sklad', 'pouzij poklop', 'pouzij dvere',
        'pouzij brana', 'pouzij rozcestnik', { minihra: { preskocit: true } },
        'pouzij bocni', 'volba ch3_r32_volba_ruda',
        'pouzij dvere', 'pouzij zebrik', 'predmet poklop otvor', 'pouzij misto', { minihra: { preskocit: true } },
        'volba ch3_r33_volba_stavet',
      ],
      ocekavej: ['konec', 'c3_rezerva==0', 'c3_hodnota==1', 'c3_creep==1', 'c3_integrace==2', 'c3_dluh==1', "c3_bara_priority=='ne'", "c3_retro=='ne'", "c3_vada_hlasena=='ne'"],
    },
    kocka_bez_very: {
      popis: 'Varianty M a Q: kočka Riziková, tým bez Věry (výpočet statika), bazén bez řízení (A)',
      start: 'dobra',
      priznaky: { c2_riziko_predem: 'krysy', c2_tym: 'pepa-norbert-klara-krystof', c2_tym_pokryti: 2 },
      kroky: [
        'pouzij jerab', 'ocekavej vypocet_chybi',
        'pouzij vratny', 'volba ch3_vratny_volba_klic', "ocekavej rekl('ch3_vratny_klic_cas')", 'volba ch3_volba_konec', 'predmet klic_sklad sklad', 'pouzij kocka',
        'pouzij sklad', 'pouzij hnizdo', 'pouzij poklop', 'pouzij dvere', 'predmet vypocet vratny',
        'pouzij jerab', { minihra: { plan: posunPlan(M13_PLAN2, 1) } },
        // Den hledání výpočtu posune dráhu do výpadku lana: obě okliky dohromady stojí tři dny
        'ocekavej c3_rezerva==-1',
        ...BARA_NEJKRATSI(['pepa', 'klara', 'krystof']),
        'pouzij dvere', 'pouzij brana', 'pouzij ulicka', 'pouzij stanek', ...M14_NEJLEPSI,
        'prepni', 'pouzij brana', 'pouzij rozcestnik',
        { minihra: { karta: 'bazen', kam: 'rovnou' } }, { minihra: { karta: 'svaciny', kam: 'seznam' } },
        { minihra: { karta: 'poklop', kam: 'posoudit' } }, { minihra: { karta: 'zpet', kam: 'seznam' } }, { minihra: { karta: 'gantt', kam: 'seznam' } },
        { minihra: { karta: 'vlny', kam: 'posoudit' } },
        'pouzij bocni', 'volba ch3_r32_volba_bara',
        'pouzij dvere', 'pouzij zebrik', 'predmet poklop otvor', 'pouzij misto',
        { minihra: M15_DOBRE }, { minihra: { ...M15_DOBRE, bazen: 'ven' } },
        'volba ch3_r33_volba_sednout', 'volba ch3_zlepseni_rizika',
      ],
      ocekavej: ['konec', "c3_krysy=='kocka'", 'c3_rezerva==-1', "c3_bazen=='bez_rizeni'", 'c3_creep==3', 'c3_integrace==0', "c3_odchazi=='pepa'"],
    },
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  else koren.KAPITOLA3 = data;
})(typeof window !== 'undefined' ? window : globalThis);
