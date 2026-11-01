// Kapitola 1 jako data pro šedý prototyp. Zdroj pravdy pro logiku jsou dokumenty
// docs/kapitoly/01-*.md, texty jsou klíče z hra/texty/texty.csv. Zápis akcí a podmínek
// popisuje hlavička engine.js. Obdélník r = [x, y, šířka, výška] v procentech scény.
(function (koren) {
  'use strict';

  // Zámek archivu: dokud Lumír nepustí Rudu dovnitř, zastaví ho u každého prvku.
  const archiv = (akce) => ({ kdy: '!archiv_vstup', akce: 'ch1_lumir_stop_1', jinak: akce });

  const KONEC_KAPITOLY = [
    'ch1_predseda_klic', 'ch1_predseda_klic_ruda', 'ch1_predseda_klic_2', '+klic', '#',
    { kdy: "c1_babicka=='odhalena'", akce: '$c1_babicka=prehlizena' },
    { kdy: '!c1_babicka', akce: '$c1_babicka=neodhalena' },
    '>namesti',
    'ch1_konec_ruda_1', 'ch1_konec_kometa',
    { kdy: 'c1_bara_vyslechnuta>=3', akce: 'ch1_bara_konec_kapitoly_duvera', jinak: 'ch1_bara_konec_kapitoly_mereni' },
    'ch1_konec_ruda_2',
    '>komise',
    'ch1_predseda_telefon_1', 'ch1_predseda_telefon_2', 'ch1_predseda_telefon_3',
    '*konec',
  ];

  const RAZITKO_KAVOU = ['ch1_predseda_002', 'ch1_razitko_kava_2', '$c1_razitko=kava', '$razitko_hotovo', '#faze'];

  const data = {
    kapitola: 1,
    nazev: 'ch1_ui_kapitola',
    ukol: 'ch1_ui_ukol',
    dny: 'ch1_ui_kometa_dny',
    pamet_nadpis: 'ch1_pamet_nadpis',

    start: {
      scena: 'byt',
      priznaky: { dny: 30 },
      akce: ['*karta:ch1_ui_kapitola', 'ch1_uvod_001', 'ch1_uvod_002', 'ch1_uvod_003', 'ch1_uvod_004', 'ch1_uvod_005'],
    },

    predmety: {
      kava: { nazev: 'predmet_kava', prohlednout: 'predmet_kava_prohlednout' },
      propiska: { nazev: 'predmet_propiska', prohlednout: 'predmet_propiska_prohlednout' },
      kavove_pero: { nazev: 'predmet_kavove_pero', prohlednout: 'predmet_kavove_pero_prohlednout' },
      pembok: {
        nazev: 'predmet_pembok', prohlednout: 'predmet_pembok_prohlednout',
        pouzit: { kdy: 'pembok_otevren', akce: '?', jinak: 'ch1_byt_kniha_mlci' },
      },
      dekret: { nazev: 'predmet_dekret', prohlednout: 'predmet_dekret_prohlednout' },
      plakat: { nazev: 'predmet_plakat', prohlednout: 'predmet_plakat_prohlednout' },
      pozadavek: { nazev: 'predmet_pozadavek', prohlednout: 'predmet_pozadavek_prohlednout' },
      tlacitko: { nazev: 'predmet_tlacitko', prohlednout: 'predmet_tlacitko_prohlednout' },
      zadani: { nazev: 'predmet_zadani', prohlednout: { stridat: ['predmet_zadani_prohlednout', 'predmet_zadani_prohlednout_2'] } },
      karta: { nazev: 'predmet_karta', prohlednout: 'predmet_karta_prohlednout' },
      mapa: { nazev: 'predmet_mapa', prohlednout: 'predmet_mapa_prohlednout' },
      poduska: { nazev: 'predmet_poduska', prohlednout: 'predmet_poduska_prohlednout' },
      podpis: { nazev: 'predmet_podpis', prohlednout: { kdy: 'c1_slib_vseho>=3', akce: 'predmet_podpis_prohlednout_slib', jinak: 'predmet_podpis_prohlednout' } },
      papir: { nazev: 'predmet_papir', prohlednout: 'predmet_papir_prohlednout' },
      klic: { nazev: 'predmet_klic', prohlednout: 'predmet_klic_prohlednout' },
      metr: { nazev: 'predmet_metr', prohlednout: 'predmet_metr_prohlednout' },
      seznam: { nazev: 'predmet_seznam', prohlednout: 'predmet_seznam_prohlednout' },
    },

    kombinace: [
      { a: 'propiska', b: 'kava', akce: ['ch1_kombinace_pero_1', 'ch1_kombinace_pero_2', '-propiska', '+kavove_pero'] },
      { a: 'dekret', b: 'kava', akce: 'ch1_dekret_kava' },
      { a: 'plakat', b: 'dekret', akce: 'ch1_kombinace_plakat_dekret' },
      { a: 'pozadavek', b: 'pembok', akce: 'ch1_kombinace_pozadavek_pembok' },
      { a: 'karta', b: 'pembok', akce: 'ch1_kombinace_karta_pembok' },
      { a: 'kava', b: 'pembok', akce: 'ch1_kombinace_kava_pembok' },
    ],

    sceny: {
      // Ú Rudův byt (úvod)
      byt: {
        nazev: 'Rudův byt',
        mista: [
          { id: 'police', nazev: 'ch1_hs_byt_police', r: [4, 12, 14, 40],
            prohlednout: 'ch1_byt_police_prohlednout',
            pouzit: { kdy: "!ma('pembok')", akce: ['ch1_byt_kniha_vzit', '+pembok'] } },
          { id: 'zed', nazev: 'ch1_hs_byt_zed', r: [22, 10, 26, 28],
            prohlednout: 'ch1_byt_zed_prohlednout',
            pouzit: { stridat: ['ch1_byt_zed_pouzit_1', 'ch1_byt_zed_pouzit_2', 'ch1_byt_zed_pouzit_3'] } },
          { id: 'stul', nazev: 'ch1_hs_byt_stul', r: [22, 58, 24, 18],
            prohlednout: 'ch1_byt_stul_prohlednout' },
          // Káva leží na stole a musí se vzít; propisku pošlou věřitelé pode dveřmi spolu s dekretem.
          { id: 'kava', nazev: 'predmet_kava', r: [30, 50, 7, 9], kdy: "!ma('kava')",
            prohlednout: 'predmet_kava_prohlednout',
            pouzit: ['ch1_byt_kava_vzit', '+kava'] },
          { id: 'dira', nazev: 'ch1_hs_byt_dira', druh: 'vychod', r: [52, 28, 18, 44],
            prohlednout: 'ch1_byt_dira_prohlednout',
            pouzit: { kdy: "!ma('kava')", akce: 'ch1_byt_dira_bez_kavy', jinak: {
                kdy: "!ma('pembok')", akce: 'ch1_byt_dira_bez_knihy', jinak: {
                  kdy: "!ma('dekret')", akce: 'ch1_byt_dira_bez_dekretu', jinak: [
                    'ch1_byt_dira_pouzit', 'ch1_byt_skluz', '>namesti', 'ch1_byt_pristani', 'ch1_ruda_001',
                    'ch1_rozhlas_001', 'ch1_rozhlas_002', 'ch1_rozhlas_003', 'ch1_rozhlas_004',
                    'ch1_rozhlas_ruda_1', 'ch1_rozhlas_ruda_2',
                    'ch1_pembok_otevreni_1', 'ch1_pembok_otevreni_ruda', 'ch1_pembok_otevreni_2', 'ch1_pembok_001',
                    'ch1_pembok_ukol', 'ch1_pembok_ukol_ruda', 'ch1_pembok_ukol_2', 'ch1_pembok_ukol_3', 'ch1_ruda_002',
                    '$pembok_otevren', '*karta:ch1_ui_ukol',
                  ] } } } },
          { id: 'dvere', nazev: 'ch1_hs_byt_dvere', r: [78, 22, 14, 58],
            prohlednout: 'ch1_byt_dvere_prohlednout',
            pouzit: { kdy: "ma('dekret')", akce: 'ch1_byt_dvere_pouzit', jinak: '#veritel' } },
          { id: 'skvira', nazev: 'ch1_hs_byt_skvira', r: [78, 82, 14, 6],
            prohlednout: 'ch1_byt_skvira_prohlednout' },
        ],
      },

      // S1 Náměstí. Pozadí a postavy jsou schválené vzorky z docs/styl/vzorky (D51, D52).
      namesti: {
        obrazek: 'pozadi_namesti',
        nazev: 'Náměstí',
        mista: [
          { id: 'kometa', nazev: 'ch1_hs_kometa', r: [22, 0, 19, 16], prohlednout: 'ch1_kometa_prohlednout' },
          { id: 'amplion', nazev: 'ch1_hs_amplion', r: [75.5, 6, 6, 12],
            prohlednout: 'ch1_amplion_prohlednout', pouzit: 'ch1_amplion_pouzit' },
          { id: 'stanek', nazev: 'ch1_hs_stanek', r: [11.5, 36, 18.5, 36],
            prohlednout: ['ch1_stanek_prohlednout', { kdy: '!c1_zmena_dohoda', akce: ['ch1_stanek_plakat', '$plakat_videl'] }],
            pouzit: { kdy: 'plakat_videl && !c1_zmena_dohoda', akce: 'ch1_stanek_ukrast', jinak: 'ch1_stanek_prohlednout' },
            na: {
              kavove_pero: { kdy: '!c1_zmena_dohoda', akce: [
                'ch1_zmena_dohoda_ruda_1', 'ch1_zmena_dohoda_1', 'ch1_zmena_dohoda_ruda_2', 'ch1_zmena_002',
                'ch1_zmena_dohoda_ruda_3', '+pozadavek', '$c1_zmena_dohoda', 'ch1_zmena_plakat_1', '+plakat',
                'ch1_plakat_cislo', '$c1_cislo_projektu', '$cislo_z_plakatu'], jinak: 'ch1_zmena_dohoda_uz' },
              propiska: 'ch1_stanek_propiska',
              kava: 'ch1_stanek_kava',
            } },
          { id: 'zmena', nazev: 'postava_pan_zmena', druh: 'postava', r: [18, 40, 8, 37], obraz: 'postava_zmena',
            prohlednout: 'ch1_zmena_prohlednout', pouzit: '#zmena',
            na: {
              kavove_pero: { kdy: '!c1_zmena_dohoda', akce: [
                'ch1_zmena_dohoda_ruda_1', 'ch1_zmena_dohoda_1', 'ch1_zmena_dohoda_ruda_2', 'ch1_zmena_002',
                'ch1_zmena_dohoda_ruda_3', '+pozadavek', '$c1_zmena_dohoda', 'ch1_zmena_plakat_1', '+plakat',
                'ch1_plakat_cislo', '$c1_cislo_projektu', '$cislo_z_plakatu'], jinak: 'ch1_zmena_dohoda_uz' },
              propiska: 'ch1_stanek_propiska',
              kava: 'ch1_stanek_kava',
              dekret: 'ch1_zmena_dekret',
              plakat: 'ch1_zmena_plakat_zpet',
              pozadavek: 'ch1_zmena_pozadavek',
              papir: 'ch1_zmena_papir',
            } },
          { id: 'ulicka', nazev: 'ch1_hs_ulicka', druh: 'vychod', vychod: 'chaloupka', r: [30.5, 43, 4.5, 15],
            prohlednout: 'ch1_ulicka_prohlednout' },
          { id: 'kasna', nazev: 'ch1_hs_kasna', r: [27.5, 53, 27, 25],
            prohlednout: 'ch1_kasna_prohlednout', pouzit: ['ch1_kasna_pouzit_1', 'ch1_kasna_pouzit_2'] },
          { id: 'dvere_radnice', nazev: 'ch1_hs_dvere', druh: 'vychod', vychod: 'vestibul', r: [51.5, 51, 6.5, 12],
            prohlednout: 'ch1_dvere_prohlednout' },
          { id: 'bara', nazev: 'postava_bara', druh: 'postava', r: [60, 42, 7, 36], obraz: 'postava_bara',
            prohlednout: 'ch1_bara_prohlednout',
            pouzit: { kdy: '!bara_prvni', akce: '#bara1', jinak: '#bara' },
            na: {
              dekret: 'ch1_bara_dekret',
              kava: 'ch1_bara_kava',
              propiska: 'ch1_bara_propiska',
              kavove_pero: 'ch1_bara_kavove_pero',
              pozadavek: 'ch1_bara_pozadavek',
              zadani: ['ch1_bara_zadani_1', 'ch1_bara_zadani_2', 'ch1_bara_zadani_ruda', 'ch1_bara_zadani_3'],
              karta: 'ch1_bara_karta',
              papir: 'ch1_bara_papir',
              plakat: 'ch1_bara_cislo_plakat',
            } },
          { id: 'budka', nazev: 'ch1_hs_budka', r: [73.5, 47.5, 9, 28.5],
            prohlednout: 'ch1_budka_prohlednout', pouzit: ['ch1_budka_pouzit_1', 'ch1_budka_pouzit_2', 'ch1_budka_pouzit_3'] },
          { id: 'kocour', nazev: 'postava_kocour', druh: 'postava', r: [5.5, 72, 5, 12], obraz: 'postava_kocour',
            prohlednout: { stridat: ['ch1_kocour_prohlednout', ['ch1_kocour_obojek', '$obojek_videl']], dokola: false },
            pouzit: ['ch1_kocour_mluvit_ruda', 'ch1_kocour_mluvit', 'ch1_kocour_mluvit_ruda_2'],
            na: { kava: 'ch1_kocour_kava' } },
        ],
      },

      // S2 Vestibul radnice
      vestibul: {
        obrazek: 'pozadi_vestibul',
        nazev: 'Vestibul radnice',
        poprve: 'ch1_vestibul_prichod',
        mista: [
          { id: 'deska', nazev: 'ch1_hs_deska', r: [35, 32, 7, 18], prohlednout: 'ch1_deska_prohlednout', pouzit: 'ch1_deska_pouzit' },
          { id: 'vratny', nazev: 'postava_vratny', druh: 'postava', r: [20, 22, 10, 48], obraz: 'postava_vratny',
            prohlednout: 'ch1_vratny_prohlednout', pouzit: '#vratny',
            na: {
              kava: 'ch1_vratny_kava', dekret: 'ch1_vratny_dekret', kavove_pero: 'ch1_vratny_kavove_pero',
              plakat: 'ch1_vratny_plakat', tlacitko: 'ch1_vratny_tlacitko',
            } },
          { id: 'vytah', nazev: 'ch1_hs_vytah', r: [42.5, 17, 14.5, 51],
            prohlednout: { stridat: ['ch1_ruda_010', 'ch1_vytah_prohlednout_2'] }, pouzit: '#vytah',
            na: { tlacitko: ['ch1_vytah_tlacitko', 'ch1_vytah_tlacitko_2', '-tlacitko', '$tlacitko_zapojeno'] } },
          { id: 'schody_nahoru', nazev: 'ch1_hs_schody_nahoru', r: [59.5, 30, 12, 38],
            prohlednout: 'ch1_schody_nahoru_prohlednout', pouzit: 'ch1_schody_nahoru_pouzit' },
          { id: 'schody_sklep', stitek: true, nazev: 'ch1_hs_schody_sklep', druh: 'vychod', vychod: 'archiv', r: [3, 60, 13, 28],
            prohlednout: 'ch1_schody_sklep_prohlednout' },
          { id: 'ven', stitek: true, nazev: 'ch1_hs_ven', druh: 'vychod', vychod: 'namesti', r: [40, 86, 20, 13] },
        ],
      },

      // S3 Archiv
      archiv: {
        obrazek: 'pozadi_archiv',
        nazev: 'Archiv',
        poprve: 'ch1_archiv_prichod',
        mista: [
          { id: 'regal', nazev: 'ch1_hs_regal', r: [41.5, 18, 13, 22],
            prohlednout: 'ch1_regal_prohlednout', pouzit: archiv('ch1_regal_pouzit') },
          { id: 'hluboky_regal', nazev: 'ch1_hs_hluboky_regal', r: [90, 5, 10, 85],
            prohlednout: 'ch1_hluboky_regal_prohlednout',
            bara_prohlednout: { stridat: ['ch1_usek_regal_1', 'ch1_usek_regal_2'], dokola: false },
            bara_pouzit: 'ch1_usek_regal_odhad',
            bara_na: { metr: [
              'ch1_usek_regal_mereni_1', 'ch1_usek_regal_mereni_2',
              'ch1_usek_seznam_1', 'ch1_usek_seznam_2', 'ch1_usek_seznam_3', '+seznam', '$c1_seznam_pasazeru',
              'ch1_usek_konec', '~ruda', '>komise', '*karta:ch1_ui_hraje_ruda', 'ch1_fronta_konec',
              '$fronta_hotova', '$dny=28'] } },
          { id: 'schody', nazev: 'ch1_hs_schody', druh: 'vychod', vychod: 'vestibul', r: [25, 26, 8, 36],
            prohlednout: 'ch1_schody_prohlednout',
            bara_prohlednout: 'ch1_usek_schody', bara_pouzit: 'ch1_usek_odejit' },
          { id: 'kartoteka', nazev: 'ch1_hs_kartoteka', r: [35, 34.5, 8.5, 26],
            prohlednout: 'ch1_kartoteka_prohlednout',
            bara_prohlednout: 'ch1_usek_kartoteka',
            pouzit: archiv({ kdy: '!listky_ctene',
              akce: ['ch1_kartoteka_pouzit_1', 'ch1_kartoteka_pouzit_2', 'ch1_kartoteka_pouzit_3', '$listky_ctene', '$listek_vytah', '$listek_most'],
              jinak: { kdy: "!ma('zadani') && !ma('papir')", akce: ['ch1_kartoteka_razeni_uvod', '@razeni'], jinak: 'ch1_kartoteka_prohlednout' } }) },
          { id: 'kniha', nazev: 'ch1_hs_kniha', r: [42.5, 44, 4, 5],
            prohlednout: 'ch1_kniha_prohlednout', bara_prohlednout: 'ch1_usek_kniha',
            pouzit: archiv(['ch1_kniha_pouzit', '$kniha_ctena']) },
          { id: 'lumir', nazev: 'postava_lumir', druh: 'postava', r: [58, 26, 7, 40], obraz: 'postava_lumir',
            prohlednout: 'ch1_lumir_prohlednout', bara_prohlednout: 'ch1_usek_lumir_prohlednout',
            pouzit: { kdy: '!archiv_vstup', akce: '#lumir_stop', jinak: '#lumir' },
            bara_pouzit: '#usek_lumir',
            na: {
              plakat: ['ch1_lumir_plakat', '$archiv_vstup'],
              kavove_pero: archiv({ kdy: '!karta_pujcena', akce: ['ch1_lumir_karta_pero_1', 'ch1_lumir_karta_pero_2', '+karta', '$karta_pujcena'], jinak: 'ch1_lumir_karta_vratit' }),
              propiska: 'ch1_lumir_propiska',
              dekret: 'ch1_lumir_dekret',
              kava: 'ch1_lumir_kava',
              pozadavek: 'ch1_lumir_pozadavek',
              zadani: 'ch1_lumir_zadani',
              karta: 'ch1_lumir_karta_vratit',
            } },
          { id: 'pouceni', nazev: 'ch1_hs_pouceni', r: [51, 43.5, 3.5, 5],
            prohlednout: ['ch1_pouceni_prohlednout', '$pouceni_videl'], pouzit: archiv('ch1_pouceni_pouzit') },
          { id: 'mapnik', nazev: 'ch1_hs_mapnik', r: [9.5, 36, 5, 19],
            prohlednout: 'ch1_mapnik_prohlednout', bara_prohlednout: 'ch1_usek_mapnik',
            pouzit: archiv({ kdy: "!ma('mapa')", akce: ['ch1_mapnik_vzit', '+mapa'], jinak: 'ch1_mapnik_prohlednout' }) },
        ],
      },

      // S4 Starostova pracovna
      pracovna: {
        obrazek: 'pozadi_pracovna',
        nazev: 'Starostova pracovna',
        poprve: 'ch1_pracovna_prichod',
        mista: [
          { id: 'fotky', nazev: 'ch1_hs_fotky', r: [27, 12, 12.5, 35], prohlednout: 'ch1_fotky_prohlednout' },
          { id: 'okno', nazev: 'ch1_hs_okno', r: [59, 6, 20, 47], prohlednout: 'ch1_okno_prohlednout' },
          { id: 'starosta', nazev: 'postava_starosta', druh: 'postava', r: [33, 30, 10, 44], obraz: 'postava_starosta',
            prohlednout: 'ch1_starosta_prohlednout',
            pouzit: { kdy: "ma('podpis') || ma('papir')", akce: 'ch1_starosta_po_podpisu', jinak: '#starosta' },
            na: {
              dekret: 'ch1_starosta_dekret', kava: 'ch1_starosta_kava', kavove_pero: 'ch1_starosta_kavove_pero',
              plakat: 'ch1_starosta_plakat', zadani: 'ch1_starosta_argument', karta: 'ch1_starosta_argument',
              podpis: 'ch1_starosta_podpis_predmet',
            } },
          { id: 'noviny', nazev: 'ch1_hs_noviny', r: [59.5, 48, 5, 6], prohlednout: 'ch1_noviny_prohlednout', pouzit: 'ch1_noviny_pouzit' },
          { id: 'vytah', nazev: 'ch1_hs_vytah', r: [18, 19, 7, 47], pouzit: '#vytah' },
        ],
      },

      // S5 Kancelář Komise
      komise: {
        obrazek: 'pozadi_komise',
        nazev: 'Kancelář Komise',
        poprve: 'ch1_komise_prichod',
        mista: [
          { id: 'cedule', nazev: 'ch1_hs_cedule', r: [22, 21, 27, 7], prohlednout: ['ch1_ui_komise_cedule', 'ch1_cedule_ruda'] },
          { id: 'vytah', stitek: true, nazev: 'ch1_hs_vytah', r: [1, 40, 8, 35], pouzit: '#vytah' },
          { id: 'predseda', nazev: 'postava_predseda', druh: 'postava', r: [83, 21, 7, 43], obraz: 'postava_predseda',
            prohlednout: 'ch1_predseda_prohlednout', pouzit: '#predseda',
            na: {
              dekret: 'ch1_predseda_dekret', kava: 'ch1_predseda_kava', propiska: 'ch1_predseda_propiska',
              kavove_pero: 'ch1_predseda_kavove_pero', pozadavek: 'ch1_predseda_pozadavek',
              zadani: ['ch1_predseda_zadani_1', 'ch1_predseda_zadani_2'], podpis: 'ch1_predseda_podpis_predmet',
              poduska: 'ch1_predseda_poduska',
            } },
          { id: 'razitko', nazev: 'ch1_hs_razitko', r: [51.5, 31, 8, 9],
            prohlednout: { stridat: ['ch1_razitko_prohlednout', 'ch1_razitko_napad'], dokola: false },
            pouzit: 'ch1_razitko_pouzit',
            na: {
              kava: { kdy: 'razitko_hotovo', akce: 'ch1_razitko_pouzit', jinak: {
                kdy: 'predseda_souhlas', akce: ['ch1_razitko_kava_1', ...RAZITKO_KAVOU],
                jinak: ['ch1_razitko_kava_brzy', '$poduska_mokra'] } },
              poduska: { kdy: 'predseda_souhlas && !razitko_hotovo', akce: [
                'ch1_razitko_poduska_1', 'ch1_razitko_poduska_2', '-poduska', '$c1_razitko=poduska', '$razitko_hotovo', '#faze'],
                jinak: 'ch1_razitko_pouzit' },
              kavove_pero: 'ch1_razitko_kavove_pero',
            } },
          { id: 'telefon', nazev: 'ch1_hs_telefon', r: [66, 30, 4, 5], prohlednout: 'ch1_telefon_prohlednout', pouzit: 'ch1_telefon_pouzit' },
          { id: 'stul', nazev: 'ch1_hs_stul', r: [17.5, 44, 15, 18],
            prohlednout: 'ch1_stul_prohlednout',
            pouzit: { kdy: "!ma('podpis') && !ma('papir')", akce: 'ch1_stul_bez_podpisu', jinak: {
              kdy: "!ma('zadani') && !ma('papir')", akce: 'ch1_stul_bez_zadani', jinak: {
                kdy: '!m02_hotovo', akce: ['ch1_pembok_m02_vyzva', 'ch1_pembok_m02_ruda', 'ch1_pembok_m02_2', '@m02'], jinak: {
                  kdy: "!ma('papir')", akce: '@m01', jinak: 'ch1_stul_hotovo' } } } } },
          { id: 'fronta', nazev: 'ch1_hs_fronta', r: [33, 51, 26, 19],
            prohlednout: 'ch1_fronta_prohlednout',
            pouzit: { kdy: "!ma('papir')", akce: 'ch1_fronta_bez_papiru', jinak: {
              kdy: '!fronta_hotova', akce: [
                'ch1_ruda_090', 'ch1_fronta_cekani', '~bara', '+metr', '>archiv', '*karta:ch1_ui_hraje_bara', 'ch1_usek_uvod'],
              jinak: 'ch1_fronta_prohlednout' } } },
          { id: 'framework', nazev: 'postava_framework', druh: 'postava', r: [60, 28, 7, 44], obraz: 'postava_framework',
            prohlednout: 'ch1_framework_prohlednout', pouzit: '#framework',
            na: {
              dekret: 'ch1_framework_dekret', kava: 'ch1_framework_kava', kavove_pero: 'ch1_framework_kavove_pero',
              pozadavek: 'ch1_framework_pozadavek', papir: 'ch1_framework_papir',
            } },
        ],
      },

      // S6 Babiččina chaloupka
      chaloupka: {
        obrazek: 'pozadi_chaloupka',
        nazev: 'Babiččina chaloupka',
        poprve: 'ch1_chaloupka_prichod',
        mista: [
          { id: 'rampa', nazev: 'ch1_hs_rampa', r: [24.5, 0, 50, 30], prohlednout: 'ch1_rampa_prohlednout' },
          { id: 'babicka', nazev: 'postava_babicka', druh: 'postava', r: [41.5, 42, 7, 30], obraz: 'postava_babicka',
            prohlednout: 'ch1_babicka_prohlednout',
            pouzit: { kdy: "c1_babicka=='odmitnuta'", akce: 'ch1_babicka_zavreno', jinak: '#babicka' },
            na: {
              mapa: { kdy: "c1_babicka!='spojenec' && c1_babicka!='odmitnuta'", akce: [
                'ch1_babicka_mapa', 'ch1_babicka_pozemek_1', 'ch1_babicka_pozemek_2', 'ch1_babicka_pozemek_3', '#babicka_r12'],
                jinak: { kdy: "c1_babicka=='odmitnuta'", akce: 'ch1_babicka_zavreno', jinak: 'ch1_babicka_pozemek_1' } },
              dekret: 'ch1_babicka_dekret', kava: 'ch1_babicka_kava', karta: 'ch1_babicka_karta',
            } },
          { id: 'lavicka', nazev: 'ch1_hs_lavicka', r: [36.5, 58, 6, 6],
            prohlednout: 'ch1_lavicka_prohlednout',
            pouzit: { kdy: "c1_babicka=='spojenec'", akce: ['ch1_lavicka_buchta_1', 'ch1_lavicka_buchta_ruda'], jinak: 'ch1_lavicka_pouzit' } },
          { id: 'plot', nazev: 'ch1_hs_plot', r: [49, 63, 22, 12], prohlednout: 'ch1_plot_prohlednout' },
          { id: 'kocour', nazev: 'postava_kocour', druh: 'postava', r: [68, 52, 3.5, 10], obraz: 'postava_kocour',
            prohlednout: ['ch1_kocour_plot', 'ch1_kocour_obojek', '$obojek_videl'],
            pouzit: ['ch1_kocour_mluvit_ruda', 'ch1_kocour_mluvit', 'ch1_kocour_mluvit_ruda_2'],
            na: { kava: 'ch1_kocour_kava' } },
          { id: 'ulicka', stitek: true, nazev: 'ch1_hs_ulicka_zpet', druh: 'vychod', vychod: 'namesti', r: [2, 55, 13, 28] },
        ],
      },
    },

    dialogy: {
      veritel: {
        poprve: ['ch1_veritel_buseni_1', 'ch1_veritel_buseni_2', 'ch1_veritel_buseni_ruda'],
        volby: [
          { t: 'ch1_veritel_volba_nikdo', jednou: true, akce: ['ch1_veritel_nikdo_1', 'ch1_veritel_nikdo_ruda', 'ch1_veritel_nikdo_2'] },
          { t: 'ch1_veritel_volba_kolik', jednou: true, akce: ['ch1_veritel_kolik_1', 'ch1_veritel_kolik_2', 'ch1_veritel_kolik_3', 'ch1_veritel_kolik_ruda'] },
          { t: 'ch1_veritel_volba_co', kdy: "!ma('dekret')", akce: [
            'ch1_veritel_co_1', 'ch1_veritel_co_ruda', 'ch1_veritel_co_2',
            { kdy: "!ma('kava')", akce: 'ch1_veritel_bez_kavy', jinak: [
              'ch1_veritel_podpis_ruda', 'ch1_veritel_podpis_kava', 'ch1_veritel_podpis_cteni', 'ch1_veritel_podpis_ruda_2',
              'ch1_veritel_odchod', '+dekret', 'ch1_byt_propiska_vzit', '+propiska'] }] },
          { t: 'ch1_veritel_volba_konec', konec: true, akce: ['ch1_veritel_konec', 'ch1_veritel_konec_ruda'] },
        ],
      },

      // R1.3: první rozhovor s Bárou, tři místa, kde jí jde skočit do řeči
      bara1: {
        poprve: ['ch1_bara_uvod_ruda', 'ch1_bara_uvod', 'ch1_bara_001'],
        volby: [
          { t: 'ch1_bara_volba_vyslechnout', akce: ['ch1_bara_001_dokonci', '$c1_bara_vyslechnuta+1', 'ch1_bara_002', '#bara2'] },
          { t: 'ch1_ruda_020', akce: ['ch1_bara_001_prerusena', 'ch1_bara_002', '#bara2'] },
        ],
      },
      bara2: {
        volby: [
          { t: 'ch1_bara_volba_vyslechnout', akce: ['ch1_bara_002_dokonci', '$c1_bara_vyslechnuta+1', '$c1_bara_kriteria', 'ch1_bara_003', '#bara3'] },
          { t: 'ch1_bara_skok_2', akce: ['ch1_bara_002_prerusena', 'ch1_bara_003', '#bara3'] },
        ],
      },
      bara3: {
        volby: [
          { t: 'ch1_bara_volba_vyslechnout', akce: [
            'ch1_bara_003_dokonci', 'ch1_bara_cislo_ruda', '$c1_bara_vyslechnuta+1', '$c1_cislo_projektu', '$bara_prvni',
            { kdy: 'c1_bara_vyslechnuta<3', akce: 'ch1_bara_odchod' }, '#'] },
          { t: 'ch1_bara_skok_3', akce: ['$bara_prvni', 'ch1_bara_odchod', '#'] },
        ],
      },
      bara: {
        poprve: ['ch1_bara_znovu_ruda', 'ch1_bara_znovu'],
        vycerpano: 'ch1_bara_vse',
        volby: [
          { t: 'ch1_bara_volba_mereni', jednou: true, akce: ['ch1_bara_mereni_1', 'ch1_bara_mereni_ruda', 'ch1_bara_mereni_2'] },
          { t: 'ch1_bara_volba_cislo', jednou: true, akce: { kdy: '!c1_cislo_projektu', akce: ['ch1_bara_cislo_ne', 'ch1_bara_cislo_zmena'],
            jinak: { kdy: 'cislo_z_plakatu && c1_bara_vyslechnuta<3', akce: 'ch1_bara_cislo_plakat', jinak: 'ch1_bara_cislo_znovu' } } },
          { t: 'ch1_bara_volba_kdo', kdy: '!vratny_rekl_starosta', jednou: true, akce: 'ch1_bara_kdo' },
          { t: 'ch1_bara_volba_rozsah', jednou: true, kdy: "ma('zadani') || ma('papir')", akce: [
            'ch1_bara_rozsah_1', 'ch1_bara_rozsah_ruda', 'ch1_bara_rozsah_2', 'ch1_bara_rozsah_utrzek', '$utrzek_mimo'] },
          { t: 'ch1_bara_volba_konec', konec: true, akce: 'ch1_bara_konec' },
        ],
      },

      zmena: {
        poprve: ['ch1_zmena_uvod_ruda', 'ch1_zmena_uvod'],
        uvod: { kdy: 'c1_zmena_dohoda', akce: 'ch1_zmena_dohoda_uz' },
        vycerpano: 'ch1_zmena_vse',
        volby: [
          { t: 'ch1_zmena_volba_prodej', jednou: true, akce: [{ stridat: ['ch1_zmena_prodej_1', 'ch1_zmena_prodej_2'] }, 'ch1_zmena_prodej_ruda'] },
          { t: 'ch1_zmena_volba_kdo', jednou: true, akce: 'ch1_zmena_kdo' },
          { t: 'ch1_zmena_volba_archa', jednou: true, akce: ['ch1_zmena_001', 'ch1_zmena_archa_2', 'ch1_zmena_archa_3', 'ch1_zmena_archa_ruda', '$slysel_zmena_archa'] },
          { t: 'ch1_zmena_volba_plakat', kdy: 'plakat_videl && !c1_zmena_dohoda', akce: [
            { stridat: ['ch1_zmena_prani_1', 'ch1_zmena_prani_2', 'ch1_zmena_prani_3'] }, 'ch1_zmena_prani_ruda', '$zmena_prani+1',
            { kdy: 'zmena_prani>=2', akce: 'ch1_zmena_napad' }] },
          { t: 'ch1_zmena_volba_konec', konec: true, akce: 'ch1_zmena_konec' },
        ],
      },

      // Po zapojení tlačítka „2“ vrátný odpovídá jinak, proto jsou volby rozdělené podle stavu.
      vratny: {
        poprve: ['ch1_vratny_uvod_ruda', 'ch1_vratny_uvod'],
        vycerpano: 'ch1_vratny_vse',
        volby: [
          { t: 'ch1_vratny_volba_kdo', kdy: '!tlacitko_zapojeno', jednou: true, akce: ['ch1_vratny_kdo_1', 'ch1_vratny_kdo_ruda', 'ch1_vratny_kdo_2', '$vratny_rekl_starosta'] },
          { t: 'ch1_vratny_volba_kdo', kdy: 'tlacitko_zapojeno', jednou: true, akce: ['ch1_vratny_kdo_1', 'ch1_vratny_kdo_ruda', 'ch1_vratny_kdo_2_tlacitko', '$vratny_rekl_starosta'] },
          { t: 'ch1_vratny_volba_dovnitr', kdy: '!c1_cislo_projektu', jednou: true, akce: ['ch1_vratny_dovnitr_1', 'ch1_vratny_dovnitr_ruda', 'ch1_vratny_dovnitr_2', '$lumir_zminen'] },
          { t: 'ch1_vratny_volba_dovnitr', kdy: 'c1_cislo_projektu && !tlacitko_zapojeno', jednou: true, akce: ['ch1_vratny_dovnitr_cislo', '$lumir_zminen'] },
          { t: 'ch1_vratny_volba_dovnitr', kdy: 'tlacitko_zapojeno', jednou: true, akce: ['ch1_vratny_dovnitr_tlacitko', '$lumir_zminen'] },
          { t: 'ch1_vratny_volba_lumir', kdy: 'lumir_zminen', jednou: true, akce: ['ch1_vratny_lumir_1', 'ch1_vratny_lumir_ruda', 'ch1_vratny_lumir_2'] },
          { t: 'ch1_vratny_volba_krizovka', jednou: true, akce: [
            'ch1_vratny_krizovka_1', 'ch1_vratny_krizovka_ruda', 'ch1_vratny_krizovka_2',
            { kdy: '!vratny_jerab', akce: ['ch1_vratny_jerab_1', 'ch1_vratny_jerab_ruda', 'ch1_vratny_jerab_2', '$vratny_jerab'] }] },
          { t: 'ch1_vratny_volba_konec', konec: true, akce: 'ch1_vratny_konec' },
        ],
      },

      // Výtah: tlačítka pater nejsou repliky, proto popisky začínají „=“
      vytah: {
        volby: [
          { t: '=Přízemí', kdy: "scena()!='vestibul'", akce: ['ch1_vytah_dolu', '>vestibul'] },
          { t: '=1½ · Komise', kdy: "scena()!='komise'", akce: ['ch1_vytah_jet_1p5', '>komise'] },
          { t: '=2 · Starosta', kdy: "scena()!='pracovna' && tlacitko_zapojeno", akce: ['ch1_vytah_jet_2', '>pracovna'] },
          { t: '=2', kdy: '!tlacitko_zapojeno', akce: 'ch1_vytah_bez_tlacitka' },
          { t: '=Vylézt o půl patra', kdy: "scena()=='komise' && !tlacitko_zapojeno", akce: 'ch1_vytah_vylezt' },
          { t: '=Zůstat', konec: true },
        ],
      },

      lumir_stop: {
        poprve: ['ch1_lumir_stop_1', 'ch1_lumir_stop_ruda', 'ch1_lumir_stop_2'],
        znovu: 'ch1_lumir_stop_1',
        volby: [
          { t: 'ch1_lumir_volba_cislo', kdy: 'c1_cislo_projektu', akce: ['ch1_lumir_cislo_1', 'ch1_lumir_cislo_2', '$archiv_vstup', '#lumir'] },
          { t: 'ch1_lumir_volba_vymyslet', kdy: '!c1_cislo_projektu', jednou: true, akce: 'ch1_lumir_spatne_cislo' },
          { t: 'ch1_lumir_volba_konec', konec: true, akce: 'ch1_lumir_konec' },
        ],
      },
      lumir: {
        poprve: 'ch1_lumir_001',
        vycerpano: 'ch1_lumir_vse',
        volby: [
          { t: 'ch1_lumir_volba_krabice', kdy: "listek_vytah && !ma('tlacitko') && !tlacitko_zapojeno", akce: [
            'ch1_lumir_krabice_1', 'ch1_lumir_krabice_2', 'ch1_lumir_krabice_ruda', 'ch1_lumir_krabice_3', '+tlacitko'] },
          { t: 'ch1_lumir_volba_krabice_bez', kdy: '!listek_vytah', jednou: true, akce: 'ch1_lumir_krabice_bez' },
          { t: 'ch1_lumir_volba_kartoteka', jednou: true, akce: ['ch1_lumir_kartoteka_1', 'ch1_lumir_kartoteka_ruda', 'ch1_lumir_kartoteka_2'] },
          { t: 'ch1_lumir_volba_karta', kdy: "(listek_most || pouceni_videl) && !karta_pujcena", akce: ['ch1_lumir_karta_1', '$karta_pozadana'] },
          { t: 'ch1_lumir_volba_mapy', kdy: "!ma('mapa')", jednou: true, akce: 'ch1_lumir_mapy' },
          { t: 'ch1_lumir_volba_regal', jednou: true, akce: 'ch1_lumir_regal' },
          { t: 'ch1_lumir_volba_ty', jednou: true, akce: ['ch1_lumir_002', 'ch1_lumir_hrdost_2'] },
          { t: 'ch1_lumir_volba_konec', konec: true, akce: 'ch1_lumir_konec' },
        ],
      },
      usek_lumir: {
        poprve: ['ch1_usek_lumir_1', 'ch1_usek_lumir_bara'],
        vycerpano: 'ch1_lumir_vse',
        volby: [
          { t: 'ch1_usek_volba_regal', jednou: true, akce: 'ch1_lumir_regal' },
          { t: 'ch1_usek_volba_listek', jednou: true, akce: ['ch1_usek_lumir_listek', 'ch1_usek_lumir_listek_bara'] },
          { t: 'ch1_usek_volba_konec', konec: true, akce: 'ch1_lumir_konec' },
        ],
      },

      starosta: {
        poprve: ['ch1_starosta_uvod_1', 'ch1_starosta_uvod_ruda', 'ch1_starosta_uvod_2'],
        volby: [
          { t: 'ch1_starosta_volba_souboj', akce: [
            { kdy: '!souboj_rada', akce: ['ch1_pembok_rada_starosta_pred', '$souboj_rada'] }, 'ch1_m03_k1_namitka', '@m03'] },
          { t: 'ch1_starosta_volba_noviny', jednou: true, akce: ['ch1_starosta_noviny_1', 'ch1_starosta_noviny_2'] },
          { t: 'ch1_starosta_volba_konec', konec: true, akce: 'ch1_starosta_konec' },
        ],
      },

      predseda: {
        poprve: ['ch1_predseda_uvod_1', { kdy: "!ma('podpis') && !ma('papir')", akce: ['ch1_predseda_bez_podpisu_ruda', 'ch1_predseda_bez_podpisu'] }],
        uvod: { kdy: 'fronta_hotova && !predseda_dalsi', akce: ['ch1_predseda_dalsi', '$predseda_dalsi'] },
        vycerpano: 'ch1_predseda_vse',
        volby: [
          { t: 'ch1_predseda_volba_navrh', kdy: "!ma('podpis') && !ma('papir')", jednou: true, akce: 'ch1_predseda_bez_podpisu' },
          { t: 'ch1_predseda_volba_navrh', kdy: "ma('podpis') || ma('papir')", jednou: true, akce: ['ch1_predseda_001', 'ch1_predseda_navrh_ruda', 'ch1_predseda_navrh_2'] },
          { t: 'ch1_predseda_volba_termin', jednou: true, akce: ['ch1_predseda_termin', '$utrzek_termin_nesmysl'] },
          { t: 'ch1_predseda_volba_kdo', jednou: true, akce: ['ch1_predseda_kdo', '$utrzek_kdo_nesmysl'] },
          { t: 'ch1_predseda_volba_razitko', kdy: '!razitko_hotovo', akce: { kdy: "!ma('papir')", akce: 'ch1_predseda_razitko_bez_papiru', jinak: {
            kdy: '!fronta_hotova', akce: 'ch1_pembok_rada_fronta', jinak: {
              kdy: 'predseda_souhlas', akce: ['ch1_predseda_razitko_1'], jinak: [
                'ch1_predseda_razitko_1', 'ch1_predseda_razitko_ruda', 'ch1_predseda_razitko_2', '$predseda_souhlas',
                { kdy: 'poduska_mokra', akce: RAZITKO_KAVOU }] } } } },
          { t: 'ch1_predseda_volba_podpis', kdy: 'predseda_souhlas && !razitko_hotovo', jednou: true, akce: 'ch1_predseda_podpis' },
          { t: 'ch1_predseda_volba_konec', konec: true, akce: 'ch1_predseda_konec' },
        ],
      },
      // R1.4 „…a následné fáze“
      faze: {
        poprve: ['ch1_predseda_faze_1', 'ch1_predseda_faze_2'],
        volby: [
          { t: 'ch1_predseda_volba_odmitnout', akce: ['ch1_predseda_odmitnuti', '$c1_faze2=0', ...KONEC_KAPITOLY] },
          { t: 'ch1_predseda_volba_odmitnout_rozsah', kdy: 'c1_mimo_rozsah', akce: ['ch1_predseda_odmitnuti', '$c1_faze2=0', ...KONEC_KAPITOLY] },
          { t: 'ch1_predseda_volba_prijmout', akce: ['ch1_predseda_prijeti', '$c1_faze2', ...KONEC_KAPITOLY] },
        ],
      },

      framework: {
        poprve: 'ch1_framework_uvod',
        vycerpano: 'ch1_framework_vse',
        volby: [
          { t: 'ch1_framework_volba_fronta', jednou: true, akce: ['ch1_framework_001', 'ch1_ruda_091', 'ch1_framework_002'] },
          { t: 'ch1_framework_volba_kufr', jednou: true, akce: ['ch1_framework_kufr_1', 'ch1_framework_kufr_ruda', 'ch1_framework_kufr_2'] },
          { t: 'ch1_framework_volba_vizitka', jednou: true, akce: ['ch1_framework_vizitka', 'ch1_framework_vizitka_ruda', 'ch1_framework_vizitka_2'] },
          { t: 'ch1_framework_volba_konec', konec: true, akce: 'ch1_framework_konec' },
        ],
      },

      babicka: {
        poprve: 'ch1_babicka_uvod',
        vycerpano: 'ch1_babicka_vse',
        volby: [
          { t: 'ch1_babicka_volba_dum', jednou: true, akce: 'ch1_babicka_001' },
          { t: 'ch1_babicka_volba_pradlo', jednou: true, akce: 'ch1_babicka_pradlo' },
          { t: 'ch1_babicka_volba_pocasi', jednou: true, akce: 'ch1_babicka_pocasi' },
          { t: 'ch1_babicka_volba_pozemek', kdy: "(ma('mapa') || obojek_videl) && c1_babicka!='spojenec'", akce: [
            'ch1_babicka_pozemek_1', 'ch1_babicka_pozemek_2', 'ch1_babicka_pozemek_3', '#babicka_r12'] },
          { t: 'ch1_babicka_volba_kocour', kdy: "c1_babicka=='spojenec'", jednou: true, akce: 'ch1_babicka_kocour' },
          { t: 'ch1_babicka_volba_konec', konec: true, akce: 'ch1_babicka_konec' },
        ],
      },
      // R1.2
      babicka_r12: {
        volby: [
          { t: 'ch1_babicka_volba_vyslechnout', akce: [
            'ch1_babicka_vyslechnout_1', 'ch1_babicka_vyslechnout_2', 'ch1_babicka_vyslechnout_ruda', 'ch1_babicka_vyslechnout_3',
            'ch1_babicka_poduska_1', 'ch1_babicka_poduska_2', '+poduska', '$c1_babicka=spojenec', '#babicka'] },
          { t: 'ch1_babicka_volba_spechat', akce: ['ch1_babicka_spechat', '$c1_babicka=odmitnuta', 'ch1_babicka_zavreno', '#'] },
          { t: 'ch1_babicka_volba_slib', akce: ['ch1_babicka_slib', '$c1_babicka=odmitnuta', 'ch1_babicka_zavreno', '#'] },
        ],
      },
    },

    // Nápověda Prof. Pemboka: radí k prvnímu puzzlu v seznamu, jehož podmínka platí.
    napovedy: [
      { id: 'vratny', kdy: '!vratny_rekl_starosta', stupne: ['ch1_pembok_rada_vratny_1', 'ch1_pembok_rada_vratny', 'ch1_pembok_rada_vratny_3'] },
      { id: 'bara', kdy: '!c1_cislo_projektu && !bara_prvni', stupne: ['ch1_pembok_rada_bara', 'ch1_pembok_rada_bara_2', 'ch1_pembok_rada_bara_3'] },
      { id: 'stanek', kdy: '!c1_cislo_projektu && !plakat_videl', stupne: ['ch1_pembok_rada_bara_prerusena', 'ch1_pembok_rada_stanek', 'ch1_pembok_rada_stanek'] },
      { id: 'zmena', kdy: "!c1_cislo_projektu && !ma('kavove_pero')", stupne: ['ch1_pembok_rada_zmena_1', 'ch1_pembok_rada_zmena_2', 'ch1_pembok_rada_zmena_2'] },
      { id: 'zmena_pero', kdy: '!c1_cislo_projektu', stupne: ['ch1_pembok_rada_zmena_1', 'ch1_pembok_rada_zmena_3', 'ch1_pembok_rada_zmena_3'] },
      { id: 'archiv', kdy: '!archiv_vstup', stupne: ['ch1_pembok_rada_archiv_1', 'ch1_pembok_rada_archiv_2', 'ch1_pembok_rada_archiv'] },
      { id: 'tlacitko', kdy: "!tlacitko_zapojeno", stupne: ['ch1_pembok_rada_tlacitko_1', 'ch1_pembok_rada_tlacitko_2', 'ch1_pembok_rada_tlacitko_3'] },
      { id: 'zadani', kdy: "!ma('zadani') && !ma('papir')", stupne: ['ch1_pembok_rada_kartoteka_1', 'ch1_pembok_rada_kartoteka_2', 'ch1_pembok_rada_kartoteka_3'] },
      { id: 'karta', kdy: "karta_pozadana && !karta_pujcena", stupne: ['ch1_pembok_rada_karta_1', 'ch1_pembok_rada_karta_2', 'ch1_pembok_rada_zmena_2'] },
      { id: 'starosta_pred', kdy: "!ma('podpis') && !ma('papir') && !starosta_prohra", stupne: ['ch1_pembok_rada_starosta_pred'] },
      { id: 'starosta', kdy: "!ma('podpis') && !ma('papir')", stupne: [
        'ch1_pembok_rada_starosta_1', 'ch1_pembok_rada_starosta_2',
        { kdy: "!ma('zadani')", akce: 'ch1_pembok_rada_starosta_3_zadani', jinak: {
          kdy: "!ma('karta')", akce: 'ch1_pembok_rada_starosta_3_karta', jinak: 'ch1_pembok_rada_starosta_3_bara' } }] },
      { id: 'papir', kdy: "!ma('papir')", stupne: ['ch1_pembok_rada_papir_1', 'ch1_pembok_rada_papir_2', 'ch1_pembok_rada_papir_3'] },
      { id: 'fronta', kdy: '!fronta_hotova', stupne: ['ch1_pembok_rada_fronta'] },
      { id: 'babicka', kdy: "c1_babicka=='odhalena'", stupne: ['ch1_pembok_rada_babicka_1', 'ch1_pembok_rada_babicka_2', 'ch1_pembok_rada_babicka_3'] },
      { id: 'razitko', kdy: '!razitko_hotovo', stupne: [
        'ch1_pembok_rada_razitko_1',
        { kdy: "ma('poduska')", akce: 'ch1_pembok_rada_razitko_2_poduska', jinak: {
          kdy: "c1_babicka=='odhalena'", akce: 'ch1_pembok_rada_razitko_2_babicka', jinak: 'ch1_pembok_rada_razitko_2' } },
        'ch1_pembok_rada_razitko_3'] },
      { id: 'nic', kdy: 'true', stupne: ['ch1_pembok_rada_nic'] },
    ],

    pamet: [
      { klic: 'ch1_pamet_bara_3', kdy: 'c1_bara_vyslechnuta>=3' },
      { klic: 'ch1_pamet_bara_castecne', kdy: 'c1_bara_vyslechnuta>=1 && c1_bara_vyslechnuta<3' },
      { klic: 'ch1_pamet_bara_0', kdy: '!c1_bara_vyslechnuta' },
      { klic: 'ch1_pamet_slib_0', kdy: 'c1_slib_vseho<3' },
      { klic: 'ch1_pamet_slib', kdy: 'c1_slib_vseho>=3' },
      { klic: 'ch1_pamet_babicka_spojenec', kdy: "c1_babicka=='spojenec'" },
      { klic: 'ch1_pamet_babicka_odmitnuta', kdy: "c1_babicka=='odmitnuta'" },
      { klic: 'ch1_pamet_babicka_prehlizena', kdy: "c1_babicka=='prehlizena'" },
      { klic: 'ch1_pamet_babicka_neodhalena', kdy: "c1_babicka=='neodhalena'" },
      { klic: 'ch1_pamet_faze2_ano', kdy: 'c1_faze2' },
      { klic: 'ch1_pamet_faze2_ne', kdy: '!c1_faze2' },
      { klic: 'ch1_pamet_zmena', kdy: 'c1_zmena_dohoda' },
      { klic: 'ch1_pamet_razitko_kava', kdy: "c1_razitko=='kava'" },
      { klic: 'ch1_pamet_seznam', kdy: 'c1_seznam_pasazeru' },
      { klic: 'ch1_pamet_pokracovani', kdy: 'true' },
    ],

    minihry: {
      // P1.5 řazení kartotéky (malá hádanka)
      razeni: {
        nazev: 'ch1_hs_kartoteka',
        priprav: () => ({
          druh: 'razeni',
          listky: [
            { id: 'kasna', klic: 'ch1_listek_kasna' },
            { id: 'archa', klic: 'ch1_listek_archa' },
            { id: 'vytah', klic: 'ch1_listek_vytah' },
            { id: 'most', klic: 'ch1_listek_most' },
            { id: 'leseni', klic: 'ch1_listek_leseni' },
          ],
        }),
        vyhodnot: (h, v) => {
          if (v.vzit_archu) { h.rekni('ch1_lumir_priloha_stop'); return { hotovo: false }; }
          const p = v.poradi.join(',');
          if (p === 'most,leseni,vytah,archa,kasna') {
            h.proved(['ch1_kartoteka_hotovo_1', 'ch1_kartoteka_hotovo_2', '+zadani']);
            return { hotovo: true };
          }
          if (p === 'archa,leseni,vytah,most,kasna') h.rekni('ch1_kartoteka_abecedne');
          else if (p === 'most,leseni,vytah,kasna,archa') h.rekni('ch1_kartoteka_stejny_rok');
          else h.rekni('ch1_kartoteka_spatne');
          return { hotovo: false };
        },
      },

      // M03 Souboj argumenty: 5 kol, výhra od 3 vyhraných
      m03: {
        nazev: 'ch1_m03_nazev', navod: 'ch1_m03_navod',
        priprav: (h) => {
          const st = h.s.minihra;
          st.kolo = st.kolo || 1;
          const k = st.kolo;
          const podklad = { 1: true, 2: h.ma('zadani'), 3: h.ma('karta'), 4: true, 5: !!h.s.priznaky.c1_bara_kriteria };
          const odpovedi = ['dobra', 'rychla', 'slaba'].filter((d) => d !== 'dobra' || podklad[k]);
          // Pořadí odpovědí se v každém kole liší, aby dobrá nebyla vždy první.
          const posun = k % odpovedi.length;
          return {
            druh: 'souboj', kolo: k, kol: 5, vyhrano: st.vyhrano || 0,
            namitka: 'ch1_m03_k' + k + '_namitka',
            odpovedi: odpovedi.slice(posun).concat(odpovedi.slice(0, posun)).map((d) => ({ druh: d, klic: 'ch1_m03_k' + k + '_' + d })),
          };
        },
        vyhodnot: (h, v) => {
          const st = h.s.minihra;
          const k = st.kolo || 1;
          h.rekni('ch1_m03_k' + k + '_' + v.volba);
          h.rekni('ch1_m03_k' + k + '_' + v.volba + '_reakce');
          if (v.volba !== 'slaba') st.vyhrano = (st.vyhrano || 0) + 1;
          if (v.volba === 'rychla') st.rychle = (st.rychle || 0) + 1;
          if (k < 5) { st.kolo = k + 1; h.rekni('ch1_m03_k' + (k + 1) + '_namitka'); return { hotovo: false }; }
          if ((st.vyhrano || 0) >= 3) {
            const rychle = st.rychle || 0;
            h.nastav('c1_slib_vseho=' + rychle);
            if (rychle >= 3) h.proved(['ch1_starosta_slib_1', 'ch1_starosta_slib_ruda']);
            else h.proved(['ch1_starosta_podpis_1', 'ch1_starosta_podpis_2', 'ch1_starosta_podpis_ruda']);
            h.proved(['+podpis', '#']);
            return { hotovo: true, vyhra: true };
          }
          h.proved(['ch1_starosta_prohra_1', 'ch1_starosta_prohra_ruda', '$starosta_prohra', '#']);
          return { hotovo: true, vyhra: false };
        },
      },

      // M02 Kdo tu vlastně velí: [může Archu zastavit, záleží mu na ní]
      m02: {
        nazev: 'ch1_m02_nazev', navod: 'ch1_m02_navod',
        priprav: (h) => {
          const znama = h.ma('mapa') || !!h.s.priznaky.obojek_videl;
          return {
            druh: 'mrizka', osy: ['ch1_m02_osa_vliv', 'ch1_m02_osa_zajem'],
            karty: [
              { id: 'starosta', klic: 'postava_starosta' },
              { id: 'predseda', klic: 'postava_predseda' },
              { id: 'babicka', klic: znama ? 'postava_babicka' : 'ch1_m02_neznamy', neznama: !znama },
              { id: 'zmena', klic: 'postava_pan_zmena' },
              { id: 'bara', klic: 'postava_bara' },
              { id: 'obyvatele', klic: 'ch1_m02_obyvatele' },
            ],
          };
        },
        // Chybné pokusy: 1. a 2. obecně, 3. a 4. ukáže kartu a osu, od 5. řekne, kam kartu dát.
        vyhodnot: (h, v) => {
          const ok = { starosta: [true, null], predseda: [true, true], babicka: [true, false], zmena: [false, true], bara: [false, true], obyvatele: [false, true] };
          const nazvy = { starosta: 'postava_starosta', predseda: 'postava_predseda', babicka: 'postava_babicka', zmena: 'postava_pan_zmena', bara: 'postava_bara', obyvatele: 'ch1_m02_obyvatele' };
          const znama = h.ma('mapa') || !!h.s.priznaky.obojek_videl;
          const u = v.umisteni || {};
          const st = h.s.minihra;
          // Která osa je u karty špatně: 0 = může zastavit, 1 = záleží, -1 = sedí
          const chyba = (id) => {
            if (!u[id] || u[id][0] !== ok[id][0]) return 0;
            if (ok[id][1] !== null && u[id][1] !== ok[id][1]) return 1;
            return -1;
          };
          const spatne = ['predseda', 'starosta', ...(znama ? ['babicka'] : []), 'zmena', 'bara', 'obyvatele'].filter((id) => chyba(id) >= 0);
          if (spatne.length) {
            st.pokusy = (st.pokusy || 0) + 1;
            const id = spatne[0];
            const osa = chyba(id);
            if (st.pokusy <= 2) h.rekni(id === 'predseda' ? 'ch1_m02_predseda_stred' : id === 'babicka' && !u.babicka ? 'ch1_m02_babicka_chybi' : 'ch1_m02_spatne');
            else if (st.pokusy <= 4) h.rekni(osa === 0 ? 'ch1_m02_rada_vliv' : 'ch1_m02_rada_zajem', [nazvy[id]]);
            else h.rekni(osa === 0 ? (ok[id][0] ? 'ch1_m02_rada_nahoru' : 'ch1_m02_rada_dolu') : (ok[id][1] ? 'ch1_m02_rada_doprava' : 'ch1_m02_rada_doleva'), [nazvy[id]]);
            return { hotovo: false };
          }
          if (!znama && !h.s.priznaky.m02_babicka_upozorneni) { h.proved(['ch1_m02_babicka_chybi', '$m02_babicka_upozorneni']); return { hotovo: false }; }
          h.proved(['ch1_m02_hotovo', 'ch1_m02_hotovo_ruda', 'ch1_m02_hotovo_pembok', '$m02_hotovo']);
          if (znama && !h.s.priznaky.c1_babicka) h.nastav('c1_babicka=odhalena');
          return { hotovo: true };
        },
      },

      // M01 Jeden papír o Arše: útržky nabízí jen to, co hráč slyšel nebo má
      m01: {
        nazev: 'ch1_m01_nazev', navod: 'ch1_m01_navod',
        priprav: (h) => {
          const p = h.s.priznaky;
          const utrzky = [
            { id: 'cil', kolonka: 'cil', dobry: true, je: h.ma('zadani') },
            { id: 'cil_nesmysl', kolonka: 'cil', je: !!p.slysel_zmena_archa },
            { id: 'termin', kolonka: 'termin', dobry: true, je: h.ma('podpis') },
            { id: 'termin_nesmysl', kolonka: 'termin', je: !!p.utrzek_termin_nesmysl },
            { id: 'kriteria', kolonka: 'kriteria', dobry: true, je: !!p.c1_bara_kriteria },
            { id: 'kriteria_nesmysl', kolonka: 'kriteria', je: !!p.slysel_zmena_archa },
            { id: 'mimo', kolonka: 'mimo', dobry: true, je: !!p.utrzek_mimo },
            { id: 'mimo_nesmysl', kolonka: 'mimo', je: true },
            { id: 'kdo', kolonka: 'kdo', dobry: true, je: h.ma('podpis') },
            { id: 'kdo_nesmysl', kolonka: 'kdo', je: !!p.utrzek_kdo_nesmysl },
          ].filter((u) => u.je).map((u) => ({ ...u, klic: 'ch1_m01_utrzek_' + u.id }));
          return {
            druh: 'kolonky',
            kolonky: ['cil', 'termin', 'kriteria', 'mimo', 'kdo'].map((id) => ({ id, klic: 'ch1_m01_kolonka_' + id })),
            utrzky,
          };
        },
        vyhodnot: (h, v) => {
          const vse = h.data.minihry.m01.priprav(h).utrzky;
          if (v.zkus) {
            const u = vse.find((x) => x.id === v.zkus.utrzek);
            if (!u || u.kolonka !== v.zkus.kolonka) { h.rekni('ch1_m01_reakce_spatna_kolonka'); return { hotovo: false, prijato: false }; }
            h.rekni(u.dobry ? 'ch1_m01_reakce_dobra' : 'ch1_m01_reakce_nesmysl');
            return { hotovo: false, prijato: true };
          }
          const pr = v.prirazeni || {};
          for (const [kolonka, id] of Object.entries(pr)) {
            const u = vse.find((x) => x.id === id);
            if (!u || u.kolonka !== kolonka) { h.rekni('ch1_m01_reakce_spatna_kolonka'); return { hotovo: false }; }
          }
          const chybi = ['cil', 'termin', 'kriteria', 'mimo', 'kdo'].filter((k) => !pr[k] && vse.some((u) => u.kolonka === k));
          if (chybi.length) { h.rekni('ch1_m01_navod'); return { hotovo: false }; }
          if (!h.s.priznaky.c1_bara_kriteria) h.rekni('ch1_m01_pembok_kriteria');
          const kvalita = ['cil', 'termin', 'kriteria'].filter((k) => pr[k] === k).length;
          h.nastav('c1_charter_kvalita=' + kvalita);
          if (pr.mimo === 'mimo') h.nastav('c1_mimo_rozsah');
          h.proved([kvalita === 3 ? 'ch1_m01_hotovo' : 'ch1_m01_hotovo_slabe', '-zadani', '-podpis', '+papir']);
          return { hotovo: true };
        },
      },
    },

    // Průchody z docs/kapitoly/01-pruchod.md jako kroky pro automatickou kontrolu
    pruchody: {},
  };

  const M02_SPRAVNE = { starosta: [true, false], predseda: [true, true], babicka: [true, false], zmena: [false, true], bara: [false, true], obyvatele: [false, true] };
  const M01_PLNE = { cil: 'cil', termin: 'termin', kriteria: 'kriteria', mimo: 'mimo_nesmysl', kdo: 'kdo' };
  const M01_BEZ_KRITERII = { cil: 'cil', termin: 'termin', mimo: 'mimo_nesmysl', kdo: 'kdo' };

  const UVOD = [
    'pouzij kava', 'pouzij police',
    'pouzij dvere', 'volba ch1_veritel_volba_co', 'volba ch1_veritel_volba_konec',
    'pouzij dira',
  ];
  const DO_ARCHIVU = [
    'predmet propiska kava',
    'pouzij dvere_radnice', 'pouzij vratny', 'volba ch1_vratny_volba_kdo', 'volba ch1_vratny_volba_konec',
    'pouzij schody_sklep',
  ];
  const ARCHIV = [
    'pouzij kartoteka',
    'pouzij lumir', 'volba ch1_lumir_volba_krabice', 'volba ch1_lumir_volba_konec',
    'pouzij kniha',
    'pouzij kartoteka', { minihra: { poradi: ['most', 'leseni', 'vytah', 'archa', 'kasna'] } },
    'predmet kavove_pero lumir',
    'pouzij mapnik',
    'pouzij schody',
    'predmet tlacitko vytah', 'pouzij vytah', 'volba =2 · Starosta',
    'pouzij starosta', 'volba ch1_starosta_volba_souboj',
  ];
  const KOMISE = [
    'pouzij vytah', 'volba =1½ · Komise',
    'pouzij stul', { minihra: { umisteni: M02_SPRAVNE } },
    'pouzij stul', { minihra: { prirazeni: M01_PLNE } },
    'pouzij fronta',
    'prohledni hluboky_regal',
    'predmet metr hluboky_regal',
    'pouzij predseda', 'volba ch1_predseda_volba_razitko', 'volba ch1_predseda_volba_konec',
  ];
  const souboj = (...volby) => volby.map((v) => ({ minihra: { volba: v } }));
  const D = ['dobra', 'dobra', 'dobra', 'dobra', 'dobra'];

  data.pruchody = {
    nejkratsi: {
      popis: 'Nejkratší cesta (přes Báru), 01-pruchod.md §1',
      kroky: [
        ...UVOD,
        'pouzij bara', 'volba ch1_bara_volba_vyslechnout', 'volba ch1_bara_volba_vyslechnout', 'volba ch1_bara_volba_vyslechnout',
        ...DO_ARCHIVU,
        'pouzij lumir', 'volba ch1_lumir_volba_cislo', 'volba ch1_lumir_volba_konec',
        ...ARCHIV, ...souboj(...D),
        ...KOMISE,
        'predmet kava razitko',
        'volba ch1_predseda_volba_odmitnout',
      ],
      ocekavej: ['konec', 'c1_bara_vyslechnuta==3', 'c1_charter_kvalita==3', "c1_razitko=='kava'", '!c1_faze2',
        'c1_seznam_pasazeru', 'c1_slib_vseho==0', "c1_babicka=='prehlizena'", '!c1_mimo_rozsah'],
    },
    A_bara_prerusena: {
      popis: 'Varianta A: Bára přerušená, číslo přes Pana Změnu',
      kroky: [
        ...UVOD,
        'pouzij bara', 'volba ch1_ruda_020', 'volba ch1_bara_skok_2', 'volba ch1_bara_skok_3',
        'prohledni stanek', 'pouzij zmena', 'volba ch1_zmena_volba_plakat', 'volba ch1_zmena_volba_plakat', 'volba ch1_zmena_volba_konec',
        'predmet propiska kava', 'predmet kavove_pero stanek',
        'pouzij dvere_radnice', 'pouzij vratny', 'volba ch1_vratny_volba_kdo', 'volba ch1_vratny_volba_konec',
        'pouzij schody_sklep',
        'predmet plakat lumir',
        ...ARCHIV, ...souboj('dobra', 'dobra', 'dobra', 'dobra', 'slaba'),
        ...KOMISE.map((k) => (typeof k === 'object' && k.minihra.prirazeni ? { minihra: { prirazeni: M01_BEZ_KRITERII } } : k)),
        'predmet kava razitko',
        'volba ch1_predseda_volba_prijmout',
      ],
      ocekavej: ['konec', '!c1_bara_vyslechnuta', 'c1_charter_kvalita==2', 'c1_zmena_dohoda', 'c1_faze2'],
    },
    C_D_prohra_a_slib: {
      popis: 'Varianty C a D: prohraný souboj, pak slíbit všechno',
      kroky: [
        ...UVOD,
        'pouzij bara', 'volba ch1_bara_volba_vyslechnout', 'volba ch1_bara_volba_vyslechnout', 'volba ch1_bara_volba_vyslechnout',
        ...DO_ARCHIVU,
        'pouzij lumir', 'volba ch1_lumir_volba_cislo', 'volba ch1_lumir_volba_konec',
        ...ARCHIV, ...souboj('slaba', 'slaba', 'slaba', 'dobra', 'dobra'),
        'ocekavej starosta_prohra',
        'ocekavej !ma(\'podpis\')',
        'pouzij starosta', 'volba ch1_starosta_volba_souboj', ...souboj('rychla', 'rychla', 'rychla', 'dobra', 'dobra'),
        ...KOMISE,
        'predmet kava razitko',
        'volba ch1_predseda_volba_odmitnout',
      ],
      ocekavej: ['konec', 'c1_slib_vseho==3'],
    },
    H_babicka_spojenec: {
      popis: 'Varianta H: babička vyslechnuta, razítko poduškou; útržek „co nepatří“ od Báry',
      kroky: [
        ...UVOD,
        'pouzij bara', 'volba ch1_bara_volba_vyslechnout', 'volba ch1_bara_volba_vyslechnout', 'volba ch1_bara_volba_vyslechnout',
        ...DO_ARCHIVU,
        'pouzij lumir', 'volba ch1_lumir_volba_cislo', 'volba ch1_lumir_volba_konec',
        ...ARCHIV, ...souboj(...D),
        'pouzij vytah', 'volba =Přízemí',
        'pouzij ven', 'pouzij bara', 'volba ch1_bara_volba_rozsah', 'volba ch1_bara_volba_konec',
        'pouzij ulicka', 'pouzij babicka', 'volba ch1_babicka_volba_pozemek', 'volba ch1_babicka_volba_vyslechnout', 'volba ch1_babicka_volba_konec',
        'pouzij lavicka', 'pouzij ulicka',
        'pouzij dvere_radnice', 'pouzij vytah', 'volba =1½ · Komise',
        'pouzij stul', { minihra: { umisteni: M02_SPRAVNE } },
        'pouzij stul', { minihra: { prirazeni: { ...M01_PLNE, mimo: 'mimo' } } },
        'pouzij fronta', 'predmet metr hluboky_regal',
        'pouzij predseda', 'volba ch1_predseda_volba_razitko', 'volba ch1_predseda_volba_konec',
        'predmet poduska razitko',
        'volba ch1_predseda_volba_odmitnout_rozsah',
      ],
      ocekavej: ['konec', "c1_razitko=='poduska'", "c1_babicka=='spojenec'", 'c1_mimo_rozsah'],
    },
    playtest_vratny_m02: {
      popis: 'Z playtestu: vrátný po zapojení tlačítka, vyčerpaný dialog a postupné rady v M02',
      kroky: [
        ...UVOD,
        'pouzij bara', 'volba ch1_bara_volba_vyslechnout', 'volba ch1_bara_volba_vyslechnout', 'volba ch1_bara_volba_vyslechnout',
        ...DO_ARCHIVU,
        'pouzij lumir', 'volba ch1_lumir_volba_cislo', 'volba ch1_lumir_volba_konec',
        ...ARCHIV.slice(0, ARCHIV.indexOf('predmet tlacitko vytah') + 1),
        'pouzij vratny', 'volba ch1_vratny_volba_kdo', 'volba ch1_vratny_volba_dovnitr', 'volba ch1_vratny_volba_krizovka',
        'volba ch1_vratny_volba_lumir', 'volba ch1_vratny_volba_konec',
        'pouzij vratny',
        'ocekavej rekl(\'ch1_vratny_vse\')',
        ...ARCHIV.slice(ARCHIV.indexOf('predmet tlacitko vytah') + 1), ...souboj(...D),
        'pouzij vytah', 'volba =1½ · Komise',
        'pouzij stul',
        ...Array.from({ length: 5 }, () => ({ minihra: { umisteni: {} } })),
        { minihra: { umisteni: M02_SPRAVNE } },
      ],
      ocekavej: ["rekl('ch1_vratny_kdo_2_tlacitko')", "rekl('ch1_vratny_dovnitr_tlacitko')", "rekl('ch1_m02_predseda_stred')",
        "rekl('ch1_m02_rada_vliv')", "rekl('ch1_m02_rada_nahoru')", 'm02_hotovo'],
    },
    J_babicka_odbyta: {
      popis: 'Varianta J: babička odbytá, razítko kávou nalitou předem (K12)',
      kroky: [
        ...UVOD,
        'pouzij bara', 'volba ch1_bara_volba_vyslechnout', 'volba ch1_bara_volba_vyslechnout', 'volba ch1_bara_volba_vyslechnout',
        'prohledni kocour', 'prohledni kocour',
        'pouzij ulicka', 'pouzij babicka', 'volba ch1_babicka_volba_pozemek', 'volba ch1_babicka_volba_spechat',
        'pouzij babicka', 'pouzij ulicka',
        ...DO_ARCHIVU,
        'pouzij lumir', 'volba ch1_lumir_volba_cislo', 'volba ch1_lumir_volba_konec',
        ...ARCHIV, ...souboj(...D),
        'pouzij vytah', 'volba =1½ · Komise',
        'predmet kava razitko',
        'pouzij stul', { minihra: { umisteni: M02_SPRAVNE } },
        'pouzij stul', { minihra: { prirazeni: M01_PLNE } },
        'pouzij fronta', 'predmet metr hluboky_regal',
        'pouzij predseda', 'volba ch1_predseda_volba_razitko',
        'volba ch1_predseda_volba_odmitnout',
      ],
      ocekavej: ['konec', "c1_razitko=='kava'", "c1_babicka=='odmitnuta'"],
    },
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  else koren.KAPITOLA1 = data;
})(typeof window !== 'undefined' ? window : globalThis);
