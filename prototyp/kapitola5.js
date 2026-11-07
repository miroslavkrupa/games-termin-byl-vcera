// Kapitola 5 jako data pro šedý prototyp. Zdroj pravdy pro logiku jsou dokumenty
// docs/kapitoly/05-*.md. Repliky jsou pracovní a jen česky: prototyp/texty/kapitola5.csv.
// Hraje se za dva: Ruda na startovní rampě (a v archivu), Bára v řídicí věži. Přepíná se
// portrétem (s.kde, ~). Finále „Dva klíče“ je puzzle z existujících primitiv: pojistky jsou
// příznaky, kamery a pulty jsou aktivní místa, „Na tři“ je volba v dialogu. Žádná nová minihra.
(function (koren) {
  'use strict';

  const TYM = (k) => `obsahuje(c2_tym, '${k}')`;
  const CLENOVE = ['pepa', 'klara', 'zdenda', 'krystof', 'vera', 'norbert'];
  const NAZEV = { pepa: 'postava_pepa', vera: 'postava_vera', norbert: 'postava_norbert', klara: 'postava_klara', zdenda: 'postava_zdenda', krystof: 'postava_krystof' };
  const vTymu = (h, k) => String(h.s.priznaky.c2_tym || '').split('-').includes(k);
  const RUDA = "postava()=='ruda'";
  const BARA = "postava()=='bara'";
  // Bezpečnostní systém ve světě iterací: stejné pravidlo jako panel v kap. 3 (D80)
  const BEZP_ITERACE = "(c2_bezpecnost=='bara' || c2_rozdeleni=='krabice')";
  // Výrazy jsou v závorkách, aby šly bezpečně negovat (!${ZELENE})
  const PRIZNAL = "(c4_usmireni=='priznal')";
  const TRVAL = "(c4_usmireni=='trval')";
  const TABULE = "(c4_zlepseni=='tabule')";
  const PTAT = "(c4_zlepseni=='ptat')";
  const NAHLAS = "(c4_zlepseni=='nahlas')";
  // Ruda se dozví, co vidí věž, bez kamer: Bára hlásí sama (priznal), nebo to vidí na svém pultu (Jedna tabule pro oba)
  const HLASI_SAMA = `(${PRIZNAL} || ${TABULE})`;
  const ZELENE = "(c4_report=='zelene')";
  const TLACITKA = "obsahuje(c4_obet, 'tlacitka')";
  const KAJUTY_OBETOVANE = "obsahuje(c4_obet, 'kajuty')";
  const POMNIK = "!obsahuje(c4_obet, 'pomnik')";
  const KOCKA = "(c3_krysy=='kocka')";
  const UVIZLI = (s) => `obsahuje(c4_nastup_chybi, '${s}')`;
  const PRANI = '(pocet(prani_karty)>0)';
  const HODNOTY_OK = "((!obsahuje(pary, 'uhel') || par_uhel) && (!obsahuje(pary, 'mista') || par_mista) && (!obsahuje(pary, 'vaha') || par_vaha))";
  const STAV_OK = `(!${ZELENE} || stav_overen)`;
  const POJISTKY_OK = `(lavka_volna && dvere_zamceny && ${HODNOTY_OK} && ${STAV_OK})`;
  const FINALE = '(odpocet || zkouska_predem)';
  const SKUPINY_OK = `((!${UVIZLI('rybari')} || rybari_hotovi) && (!${UVIZLI('obyvatele')} || sipky) && (!${UVIZLI('babicka')} || babicka_hotova))`;
  const PREDANI_PORADNE = '(manual_hotov && c5_kapitan && c5_zauceni)';
  const jmenoTvora = (n) => 'ch3_jmeno_' + Math.max(0, Math.min(4, n || 0));
  const kartyPrani = (h) => String(h.s.priznaky.prani_karty || '').split('-').filter((x) => x && x !== 'zadny');
  const ulozKarty = (h, karty) => h.nastav('prani_karty=' + (karty.join('-') || 'zadny'));

  // --- výchozí výpočty ze stavu kapitol 1–4 -----------------------------------
  // Přání v tlamě Ještětota: c4_creep kartiček (nejvýš 3) a ohňostroj při c4_slib ≥ 1 (P5.11)
  const PRIPRAV_PRANI = (h) => {
    const p = h.s.priznaky;
    const karty = [];
    for (let i = 1; i <= Math.min(3, Number(p.c4_creep) || 0); i++) karty.push('k' + i);
    if ((Number(p.c4_slib) || 0) >= 1) karty.push('ohnostroj');
    ulozKarty(h, karty);
  };
  // Nesladěné hodnoty: zbylé body jsou konec seznamu c3_nesladeno (P4.29 je řeší popořadě,
  // navigace vždy první, lávka v aktu B), na každý jeden pár (P5.12, K5)
  const PAR = { kabel: 'uhel', start: 'uhel', pocitadlo: 'mista', svaciny: 'vaha', bazen: 'vaha' };
  const PRIPRAV_PARY = (h) => {
    const p = h.s.priznaky;
    const body = String(p.c3_nesladeno || '').split('-').filter((b) => b && b !== 'zadny' && b !== 'navigace' && b !== 'lavka');
    const n = Number(p.c4_integrace) || 0;
    const zbyle = n > 0 ? body.slice(-n) : [];
    const pary = [...new Set(zbyle.map((b) => PAR[b]).filter(Boolean))];
    h.nastav('pary=' + (pary.join('-') || 'zadny'));
  };

  // --- nástup (P5.1, P5.2) ----------------------------------------------------
  const NASTUP = { kdy: `dvere_otevreny && !nastoupeno && ${SKUPINY_OK}`, akce: [
    'ch5_nastup_hotovo', '$nastoupeno', 'ch5_nastup_zelenka'] };
  const OTEVRIT_DVERE = [
    'ch5_paka_otevrit', 'ch5_jestetoto_prah', 'ch5_fronta_jde', '$dvere_otevreny',
    'ch5_fronta_tym_odbavi',
    { kdy: `${UVIZLI('rybari')}`, akce: 'ch5_rybari_uvizli' },
    { kdy: `${UVIZLI('obyvatele')}`, akce: 'ch5_obyvatele_uvizli' },
    { kdy: `${UVIZLI('babicka')}`, akce: 'ch5_babicka_uvizla' },
    { kdy: `${BEZP_ITERACE} && !c5_pecet`, akce: 'ch5_norbert_nastoupim_az' },
    { kdy: 'c5_lumir && !lumir_nastoupil', akce: ['ch5_lumir_nastupuje', '$lumir_nastoupil'] },
    NASTUP];

  // --- finále: pojistky -------------------------------------------------------
  const POJISTKA = { kdy: `odpocet && ${POJISTKY_OK} && !pojistky_hlaseny`, akce: ['ch5_pult_vse_zelene', '$pojistky_hlaseny', { kdy: NAHLAS, akce: 'ch5_nahlas_klic' }] };
  const HLASENI_OCASU = { kdy: HLASI_SAMA, akce: [{ kdy: PRANI, akce: 'ch5_bara_hlasi_ocas', jinak: 'ch5_bara_hlasi_otevreno' }, '$dvere_hlaseny'], jinak: 'ch5_ruda_proc_otevreno' };
  const ZAMKNOUT = ['ch5_paka_zamceno', 'ch5_bara_zamceno', '$dvere_zamceny', '$dvere_zavreny', '$jestetoto_uvnitr', POJISTKA];
  const PAKA = {
    kdy: '!dvere_otevreny', akce: OTEVRIT_DVERE,
    jinak: { kdy: '!odpocet', akce: 'ch5_paka_fronta_jde',
      jinak: { kdy: 'dvere_zamceny', akce: 'ch5_paka_zamceno_uz',
        jinak: { kdy: '!lavka_volna', akce: [{ kdy: '!dvere_zavreny', akce: ['ch5_paka_zavreno', '$dvere_zavreny'] }, { kdy: HLASI_SAMA, akce: 'ch5_bara_hlasi_venku', jinak: 'ch5_ruda_proc_otevreno' }],
          jinak: { kdy: PRANI, akce: { kdy: '!dvere_zavreny', akce: ['ch5_paka_zavreno', '$dvere_zavreny', HLASENI_OCASU], jinak: 'ch5_paka_kousl' },
            jinak: ZAMKNOUT } } } },
  };
  // Odpočet (střih po uzavření nástupu)
  const ODPOCET = [
    'ch5_pult_uzavreno', 'ch5_bara_krome_nas', '#', '$odpocet', '$vratny_kde=dvere',
    '*karta:ch5_ui_odpocet', 'ch5_odpocet_amplion', 'ch5_odpocet_tri', 'ch5_odpocet_pult_blok',
    'ch5_odpocet_bara_potvrdil', 'ch5_odpocet_ruda_proc', 'ch5_odpocet_pembok_pulka', 'ch5_odpocet_vratny_dole',
    { kdy: KOCKA, akce: 'ch5_odpocet_kocka' },
    { kdy: NAHLAS, akce: 'ch5_nahlas_uvod' },
    { kdy: HLASI_SAMA, akce: ['ch5_bara_hlasi_lavka', '$lavka_hlasena'], jinak: 'ch5_odpocet_bara_vez' },
    { kdy: `${TABULE} && ${ZELENE}`, akce: ['ch5_tabule_ruda_vidi_listky', '$stav_precten'] }];
  const NA_TRI_HOTOVO = [
    'ch5_natri_bara_natri', 'ch5_natri_oba', { kdy: KOCKA, akce: 'ch5_kocka_seskoci' }, 'ch5_natri_pult_uvolneno',
    '+klic', '$klic_vydan', '#', 'ch5_pembok_nejde_sam'];
  // Část C: po předání klíče sejde Bára z věže (do té doby jde ještě zaučit kapitána ve věži)
  const BARA_SCHAZI = ['$prepinani=0', 'ch5_natri_bara_schazi', '^bara=rampa'];
  const NA_TRI = ['ch5_natri_ruda_baro', { kdy: TRVAL, akce: '#natri', jinak: NA_TRI_HOTOVO }];
  // Přehled pojistek po odpočtu; se zlepšením „Říct to nahlas“ člen týmu u pultu řekne, co první červená chce
  const PREHLED = [
    { kdy: 'lavka_volna', akce: 'ch5_prehled_lavka_ok', jinak: 'ch5_prehled_lavka_cervena' },
    { kdy: 'dvere_zamceny', akce: 'ch5_prehled_dvere_ok', jinak: 'ch5_prehled_dvere_cervena' },
    { kdy: "pocet(pary)>0", akce: { kdy: HODNOTY_OK, akce: 'ch5_prehled_hodnoty_ok', jinak: 'ch5_prehled_hodnoty_cervena' } },
    { kdy: ZELENE, akce: { kdy: 'stav_overen', akce: 'ch5_prehled_stav_ok', jinak: 'ch5_prehled_stav_cervena' } },
    { kdy: NAHLAS, akce: {
      kdy: '!lavka_volna', akce: 'ch5_nahlas_lavka', jinak: { kdy: '!dvere_zamceny', akce: { kdy: PRANI, akce: 'ch5_nahlas_prani', jinak: 'ch5_nahlas_dvere' }, jinak: {
        kdy: `!${HODNOTY_OK}`, akce: 'ch5_nahlas_hodnoty', jinak: { kdy: `!${STAV_OK}`, akce: 'ch5_nahlas_stav', jinak: 'ch5_nahlas_klic' } } } } }];
  const ZKOUSKA = [
    'ch5_zkouska_bezi',
    { kdy: 'c5_pecet', akce: 'ch5_zkouska_pecet_ok', jinak: {
      kdy: 'norbert_u_pultu', akce: ['ch5_zkouska_norbert_diva', 'ch5_norbert_norma', 'ch5_norbert_pecet', '$c5_pecet', { kdy: `!${TYM('norbert')}`, akce: 'ch5_norbert_nastupuje' }],
      jinak: ['ch5_zkouska_pecet_chybi', { kdy: 'verze_zamcena', akce: 'ch5_zkouska_nikdo_nevidel', jinak: 'ch5_bara_kazdy_tyden' }] } },
    { kdy: `${PTAT} && !odpocet && !zkouska_predem`, akce: ['ch5_zkouska_ptat_se',
      { kdy: `!${HODNOTY_OK}`, akce: 'ch5_zkouska_ukaze_hodnoty' }, { kdy: `${ZELENE} && !stav_overen`, akce: 'ch5_zkouska_ukaze_stav' },
      { kdy: PRANI, akce: 'ch5_zkouska_ukaze_prani' }, '$zkouska_predem'] },
    { kdy: 'odpocet', akce: PREHLED }];
  // Váha: deník jeřábu na pult (jen jedno řešení, K5)
  const DENIK_NA_PULT = { kdy: "obsahuje(pary, 'vaha') && !par_vaha", akce: {
    kdy: FINALE, akce: ['ch5_vaha_denik', 'ch5_vaha_pult_prijal', '$par_vaha', POJISTKA], jinak: 'ch5_vaha_jeste_ne' },
    jinak: 'ch5_denik_pult_nic' };

  // --- část C -------------------------------------------------------------------
  const STAROSTA_REAKCE = [
    { kdy: ZELENE, akce: 'ch5_starosta_zelena_noviny', jinak: 'ch5_starosta_pravda' },
    { kdy: 'c4_slib>=1', akce: ['ch5_starosta_ohnostroj', 'ch5_ruda_ohnostroj_po_pristani'] }];
  const PODIUM = ['ch5_podium_starosta_vola', { kdy: POMNIK, akce: 'ch5_pembok_vedle_sebe' }, '#r52'];
  // Konec se počítá v pevném pořadí (D80): nízké sladění → Pomník / Druhá etapa; „my“ a vývoj ≥ 4 → Tým; jinak Hrdina
  const SPOCTI_KONEC = (h) => {
    const p = h.s.priznaky;
    const seznam = (k) => String(p[k] || '').split('-').filter((x) => x && x !== 'zadny');
    const povaha = p.c2_rozdeleni === 'povaha';
    const sladeni = (povaha ? 2 : 0) + (Number(p.c2_vyjimky) === 2 ? 1 : 0) + (seznam('c2_mosty').length >= 2 ? 1 : 0)
      + ((Number(p.c3_integrace) || 0) <= 1 ? 1 : 0) + ((Number(p.c4_integrace) || 0) === 0 ? 1 : 0) + (p.c4_usmireni === 'priznal' ? 1 : 0);
    const vyvoj = ((Number(p.c1_slib_vseho) || 0) < 3 ? 1 : 0) + (povaha ? 1 : 0) + (p.c3_bara_priority === 'ano' ? 1 : 0)
      + (p.c4_report === 'poctive' ? 1 : 0) + (p.c5_my === 'ano' ? 1 : 0);
    const duvera = ((Number(p.c1_bara_vyslechnuta) || 0) >= 2 ? 1 : 0) + (p.c2_rozdeleni !== 'gantt' ? 1 : 0) + (p.c3_vada_hlasena === 'ano' ? 1 : 0)
      + (p.c3_bara_priority === 'ano' ? 1 : 0) + (p.c4_usmireni === 'priznal' ? 1 : 0);
    let konec;
    if (sladeni < 5) {
      const plan = p.c2_rozdeleni === 'gantt' || (povaha && p.c2_interier === 'ruda' && p.c2_bezpecnost === 'ruda');
      const iterace = p.c2_rozdeleni === 'krabice' || (povaha && p.c2_bezpecnost === 'bara' && p.c2_interier === 'bara');
      konec = plan && !iterace ? 'pomnik' : iterace && !plan ? 'etapa' : p.c4_usmireni === 'trval' ? 'pomnik' : 'etapa';
    } else konec = p.c5_my === 'ano' && vyvoj >= 4 ? 'tym' : 'hrdina';
    h.nastav('c5_sladeni=' + sladeni);
    h.nastav('c5_vyvoj=' + vyvoj);
    h.nastav('c5_duvera=' + (duvera >= 4 ? 'vysoka' : duvera >= 2 ? 'stredni' : 'nizka'));
    h.nastav('c5_konec=' + konec);
  };
  const PONOZKY = (h) => {
    const clen = CLENOVE.find((k) => vTymu(h, k)) || 'pepa';
    h.rekni('ch5_start_ponozky_' + clen);
  };
  const TITULKY = "c5_konec=='tym' && c5_duvera=='vysoka' && c5_predani=='poradne' && c4_report=='poctive' && c4_bara_rekla=='hned' && c1_babicka=='spojenec'";
  const KONEC = [
    SPOCTI_KONEC, '*karta:ch5_ui_start', 'ch5_start_nastupuji', 'ch5_start_listky', 'ch5_start_pocitadlo', 'ch5_start_vratny_klic',
    PONOZKY, 'ch5_start_bara_ponozky', 'ch5_start_odpocet_tri', { kdy: TYM('pepa'), akce: 'ch5_start_pepa_dny' }, 'ch5_start_odpocet_jedna',
    // čtyři konce
    { kdy: "c5_konec=='pomnik'", akce: ['*karta:ch5_ui_konec_pomnik', 'ch5_konec_pomnik_1', { kdy: 'c3_gantt_v_aplikaci', akce: 'ch5_konec_pomnik_gantt', jinak: 'ch5_konec_pomnik_2' }, 'ch5_konec_pomnik_3', 'ch5_konec_pomnik_4'] },
    { kdy: "c5_konec=='etapa'", akce: ['*karta:ch5_ui_konec_etapa', 'ch5_konec_etapa_1', 'ch5_konec_etapa_2', 'ch5_konec_etapa_3', 'ch5_konec_etapa_4'] },
    { kdy: "c5_konec=='hrdina'", akce: ['*karta:ch5_ui_konec_hrdina', 'ch5_konec_hrdina_1', 'ch5_konec_hrdina_2', 'ch5_konec_hrdina_3', { kdy: "c5_my=='ano'", akce: 'ch5_konec_hrdina_my_pozde', jinak: 'ch5_konec_hrdina_4' }] },
    { kdy: "c5_konec=='tym'", akce: ['*karta:ch5_ui_konec_tym', 'ch5_konec_tym_1', 'ch5_konec_tym_2', 'ch5_konec_tym_3', 'ch5_konec_tym_4'] },
    // epilog
    '*karta:ch5_ui_epilog',
    { kdy: "c5_predani=='poradne'", akce: ['ch5_epilog_pristani_hladce', 'ch5_epilog_diky_vero'], jinak: ['ch5_epilog_pristani_napodruhe', 'ch5_epilog_kde_vypina', 'ch5_epilog_nikdo_nerikal'] },
    { kdy: "obsahuje(c4_obet, 'svaciny')", akce: 'ch5_epilog_svaciny' },
    { kdy: KAJUTY_OBETOVANE, akce: 'ch5_epilog_hranata_kajuta', jinak: 'ch5_epilog_kulata_kajuta' },
    { kdy: 'antena', akce: 'ch5_epilog_antena' },
    { kdy: "c1_babicka=='spojenec'", akce: 'ch5_epilog_babicka' },
    { kdy: "c5_duvera=='vysoka'", akce: ['ch5_epilog_bara_vysoka_1', 'ch5_epilog_bara_vysoka_2', { kdy: "c5_konec=='hrdina'", akce: 'ch5_epilog_ruda_medaile_nevi' }],
      jinak: { kdy: "c5_duvera=='stredni'", akce: ['ch5_epilog_bara_stredni_1', 'ch5_epilog_bara_stredni_2'], jinak: ['ch5_epilog_bara_nizka_1', 'ch5_epilog_bara_nizka_2'] } },
    'ch5_epilog_archiv', { kdy: "c5_konec=='pomnik'", akce: 'ch5_epilog_listek_skoro', jinak: { kdy: "c5_konec=='etapa'", akce: 'ch5_epilog_listek_faze3', jinak: 'ch5_epilog_listek_dnes' } },
    '#pouceni'];
  const PO_POUCENI = [
    'ch5_lumir_zaklada',
    { kdy: "c4_bara_rekla=='hned'", akce: 'ch5_epilog_predseda_pomaha', jinak: 'ch5_epilog_predseda_faze3' },
    { kdy: TITULKY, akce: ['$c5_titulky', '*karta:ch5_ui_po_titulcich', 'ch5_titulky_komise', 'ch5_titulky_leseni', 'ch5_titulky_vratny', 'ch5_titulky_pembok'] },
    '#', '*konec'];

  const data = {
    kapitola: 5,
    nazev: 'ch5_ui_kapitola',
    ukol: 'ch5_ui_ukol',
    dny: 'ch5_ui_dnes',
    pamet_nadpis: 'ch2_pamet_nadpis',
    nese: '^c[1-4]_',
    bara_chodi: false,
    prepinani: 'prepinani',
    // Stav z kapitol 1–4 (05-pruchod.md: výchozí stav nejkratší cesty a „špatné“ kapitoly 1–4).
    // Jména c4_* podle 04-krize.md a 04-puzzly.md; seznamy jsou řetězce s pomlčkami.
    predvolby: {
      dobra: {
        popis: 'Dobré kapitoly 1 až 4 (05-pruchod.md, nejkratší cesta)',
        priznaky: {
          c1_bara_vyslechnuta: 3, c1_slib_vseho: 0, c1_mimo_rozsah: true, c1_faze2: 0, c1_razitko: 'poduska', c1_babicka: 'spojenec', c1_zmena_dohoda: true, c1_charter_kvalita: 3, c1_seznam_pasazeru: true,
          c2_tym: 'pepa-vera-norbert-klara', c2_tym_pokryti: 3, c2_rozdeleni: 'povaha', c2_vyjimky: 2, c2_interier: 'bara', c2_bezpecnost: 'ruda',
          c2_riziko_predem: 'lano', c2_rizika_zapsana: 'krysy-lano-usmev', c2_odhad: 'realny', c2_rozpad: 0, c2_mosty: 'trup-nastup-start',
          c3_rezerva: 2, c3_hodnota: 3, c3_dluh: 0, c3_creep: 0, c3_bazen: 'vyjednan', c3_svaciny: 'seznam', c3_poklop: 'ano', c3_vada_hlasena: 'ano',
          c3_bara_priority: 'ano', c3_integrace: 0, c3_nesladeno: 'zadny', c3_odchazi: 'pepa', c3_krysy: 'aktovka', c3_retro: 'ano', c3_zlepseni: 'bara',
          c3_hotove: 'sipky-mapa-maketa-tlacitka-udice-kocour', c3_kolo1: 'sipky-mapa-maketa',
          c4_report: 'poctive', c4_listky: 4, c4_souboj: 5, c4_slib: 0, c4_obet: 'pomnik-svaciny', c4_creep: 0, c4_usmireni: 'priznal',
          c4_bara_rekla: 'hned', c4_zlepseni: 'tabule', c4_integrace: 0, c4_nastup: 3, c4_nastup_chybi: 'zadny',
        },
        predmety: ['pembok', 'kava', 'kavove_pero', 'krabice', 'plan', 'rozpis', 'denik'],
      },
      spatna: {
        popis: 'Špatné kapitoly 1 až 4 (05-pruchod.md: Gantt, zelená zpráva, trval na svém)',
        priznaky: {
          c1_bara_vyslechnuta: 0, c1_slib_vseho: 3, c1_faze2: true, c1_razitko: 'kava', c1_babicka: 'prehlizena', c1_charter_kvalita: 1, c1_seznam_pasazeru: true,
          c2_tym: 'zdenda-krystof-pepa-vera', c2_tym_pokryti: 2, c2_rozdeleni: 'gantt', c2_vyjimky: 0, c2_interier: 'ruda', c2_bezpecnost: 'ruda',
          c2_riziko_predem: 'usmev', c2_rizika_zapsana: 'krysy-lano-usmev', c2_odhad: 'kotva', c2_rozpad: 3, c2_mosty: 'start',
          c3_rezerva: -1, c3_hodnota: 2, c3_dluh: 2, c3_creep: 3, c3_bazen: 'bez_rizeni', c3_bazen_v_trupu: true, c3_svaciny: 'schvalovani', c3_poklop: 'ne', c3_vada_hlasena: 'ne',
          c3_bara_priority: 'ne', c3_integrace: 3, c3_nesladeno: 'navigace-pocitadlo-lavka', c3_odchazi: 'pepa', c3_krysy: 'aktovka', c3_retro: 'ne',
          c3_hotove: 'sipky-maketa-tlacitka-kocour', c3_gantt_v_aplikaci: true,
          c4_report: 'zelene', c4_listky: 0, c4_souboj: 3, c4_slib: 3, c4_obet: 'bazen-pomnik', c4_creep: 1, c4_usmireni: 'trval',
          c4_bara_rekla: 'po_usmireni', c4_zlepseni: 'tabule', c4_integrace: 1, c4_nastup: 1, c4_nastup_chybi: 'rybari-obyvatele', c4_clen_zpet: true,
        },
        predmety: ['pembok', 'kava', 'propiska', 'krabice', 'plan', 'rozpis'],
      },
    },

    start: {
      scena: 'rampa',
      priznaky: { dny: 0, pembok_otevren: true, c5_manual: 0, vratny_kde: 'jerab', zkouska: 0 },
      predmety: ['pembok', 'kava', 'kavove_pero', 'krabice', 'plan', 'rozpis', 'denik'],
      predmety_bara: ['metr'],
      kde: { bara: 'vez' },
      akce: [
        PRIPRAV_PRANI, PRIPRAV_PARY,
        // Rozpis rampy z kap. 3: přehrávač ho mezi kapitolami neuloží (stejně jako kap. 4)
        { kdy: "!ma('rozpis')", akce: '+rozpis' },
        // Pečeť je z kapitoly 3; jen systém ve světě iterací ji chce znovu (P5.4, K13)
        { kdy: `!${BEZP_ITERACE}`, akce: '$c5_pecet' },
        '*karta:ch5_ui_kapitola', 'ch5_uvod_rano', 'ch5_uvod_amplion', 'ch5_uvod_ruda_termin', 'ch5_uvod_pembok_ctyrikrat',
        'ch5_uvod_fronta', { kdy: "c4_bara_rekla=='hned'", akce: 'ch5_uvod_predseda_igelitka', jinak: ['ch5_uvod_predseda_predbiha', 'ch5_uvod_fronta_tamhle'] },
        { kdy: `!${TYM('norbert')}`, akce: 'ch5_uvod_norbert_fronta' },
        'ch5_uvod_jestetoto', 'ch5_uvod_norbert_klic',
        { kdy: PRIZNAL, akce: 'ch5_uvod_bara_dobre_rano', jinak: 'ch5_uvod_bara_vez' }, 'ch5_uvod_bara_odpocet_ceka',
        'ch5_uvod_pembok_prepnout', '$prepinani', '*karta:ch5_ui_ukol'],
    },

    predmety: {
      pembok: { nazev: 'predmet_pembok', prohlednout: 'predmet_pembok_prohlednout', pouzit: '?' },
      kava: { nazev: 'predmet_kava', prohlednout: 'ch5_kava_prohlednout' },
      kavove_pero: { nazev: 'predmet_kavove_pero', prohlednout: 'predmet_kavove_pero_prohlednout' },
      propiska: { nazev: 'predmet_propiska', prohlednout: 'predmet_propiska_prohlednout' },
      krabice: { nazev: 'predmet_krabice', prohlednout: 'ch5_krabice_prohlednout' },
      plan: { nazev: 'predmet_plan', prohlednout: 'ch5_plan_prohlednout' },
      rozpis: { nazev: 'predmet_rozpis', prohlednout: 'ch5_rozpis_prohlednout' },
      denik: { nazev: 'predmet_denik', prohlednout: 'ch5_denik_prohlednout' },
      stranky: { nazev: 'predmet_stranky', prohlednout: (h) => h.rekni('predmet_stranky_prohlednout', [String(h.s.priznaky.c5_manual || 0)]) },
      manual: { nazev: 'predmet_manual', prohlednout: 'predmet_manual_prohlednout' },
      krabicka: { nazev: 'predmet_krabicka', prohlednout: 'predmet_krabicka_prohlednout' },
      klic: { nazev: 'predmet_klic_start', prohlednout: 'ch5_klic_start_prohlednout' },
      buchta: { nazev: 'predmet_buchta', prohlednout: 'predmet_buchta_prohlednout', pouzit: ['ch5_buchta_snist', '-buchta'] },
      // Bářiny předměty
      metr: { nazev: 'predmet_metr', prohlednout: 'predmet_metr_prohlednout', pouzit: '?' },
      plechovka: { nazev: 'predmet_plechovka', prohlednout: 'predmet_plechovka_prohlednout' },
    },

    kombinace: [
      { a: 'propiska', b: 'kava', akce: ['ch1_kombinace_pero_1', 'ch1_kombinace_pero_2', '-propiska', '+kavove_pero'] },
      { a: 'stranky', b: 'krabice', akce: { kdy: 'c5_manual>=3', akce: ['ch5_manual_hotov', 'ch5_manual_framework', '-stranky', '-krabice', '+manual', '$manual_hotov'], jinak: 'ch5_manual_malo' } },
      { a: 'denik', b: 'rozpis', akce: 'ch5_kombinace_denik_rozpis' },
      { a: 'krabicka', b: 'krabice', akce: 'ch5_kombinace_krabicka_krabice' },
      { a: 'manual', b: 'krabicka', akce: 'ch5_kombinace_krabicka_krabice' },
    ],

    sceny: {
      // S1 Startovní rampa (nové pozadí, zatím šedé)
      rampa: {
        nazev: 'Startovní rampa',
        prichod: [
          { kdy: 'c5_lumir && dvere_otevreny && !lumir_nastoupil', akce: ['ch5_lumir_nastupuje', '$lumir_nastoupil'] },
          { kdy: 'c5_lumir && !dvere_otevreny && !lumir_ceka', akce: ['ch5_lumir_ceka_ve_fronte', '$lumir_ceka'] }],
        mista: [
          { id: 'archa', nazev: 'ch2_hs_archa', r: [28, 4, 44, 40], prohlednout: { kdy: 'dvere_zamceny', akce: 'ch5_archa_zamcena', jinak: 'ch5_archa_hotova' },
            na: { pembok: 'ch5_archa_pembok', kava: 'ch5_archa_kava' } },
          { id: 'dvere', nazev: 'ch5_hs_dvere', r: [46, 24, 10, 20],
            prohlednout: { kdy: 'dvere_zamceny', akce: 'ch5_dvere_zamcene', jinak: { kdy: 'dvere_otevreny', akce: 'ch5_dvere_otevrene', jinak: 'ch5_dvere_paka' } },
            pouzit: PAKA, na: { kava: 'ch5_dvere_kava', klic: 'ch5_dvere_klic' } },
          { id: 'jestetoto', nazev: 'postava_jestetoto', druh: 'postava', r: [54, 30, 5, 10],
            prohlednout: (h) => {
              const n = kartyPrani(h).length;
              if (h.s.priznaky.jestetoto_uvnitr) h.rekni('ch5_jestetoto_uvnitr', [jmenoTvora(n)]);
              else if (n === 0) h.rekni('ch5_jestetoto_maly', [jmenoTvora(0)]);
              else h.rekni('ch5_jestetoto_vetsi', [jmenoTvora(n), String(n)]);
            },
            pouzit: { kdy: 'jestetoto_uvnitr', akce: 'ch5_jestetoto_uvnitr_mluvit', jinak: {
              kdy: `(odpocet && dvere_zavreny) || zkouska_predem`, akce: { kdy: PRANI, akce: '#prani', jinak: ['ch5_jestetoto_bez_prani', '$jestetoto_uvnitr'] },
              jinak: 'ch5_jestetoto_mluvit' } },
            na: { kava: 'ch5_jestetoto_kava', pembok: 'ch5_jestetoto_pembok', krabice: 'ch5_jestetoto_krabice', krabicka: 'ch5_jestetoto_krabicka', rozpis: 'ch5_jestetoto_nacpat' } },
          { id: 'fronta', nazev: 'ch5_hs_fronta', r: [60, 36, 20, 24],
            prohlednout: { kdy: '!dvere_otevreny', akce: 'ch5_fronta_prohlednout', jinak: { kdy: 'nastoupeno', akce: 'ch5_fronta_prazdna', jinak: 'ch5_fronta_stoji' } },
            pouzit: { kdy: '!dvere_otevreny', akce: 'ch5_fronta_az_otevrete', jinak: { kdy: 'nastoupeno', akce: 'ch5_fronta_prazdna', jinak: 'ch5_fronta_kdo_stoji' } },
            na: { plan: 'ch5_fronta_plan', pembok: 'ch5_fronta_pembok' } },
          { id: 'rybari', nazev: 'ch3_hs_rybari', druh: 'postava', kdy: `${UVIZLI('rybari')} && dvere_otevreny && !rybari_hotovi`, r: [62, 50, 8, 26],
            prohlednout: 'ch5_rybari_prohlednout',
            pouzit: ['ch5_rybari_kam', 'ch5_ruda_antena', 'ch5_rybari_antena', '$rybari_hotovi', '$antena', NASTUP],
            na: { krabice: 'ch5_rybari_krabice', rozpis: 'ch5_rybari_rozpis', pembok: 'ch5_rybari_pembok', manual: 'ch5_rybari_manual', stranky: 'ch5_rybari_manual', kava: 'ch5_rybari_zalomit' } },
          { id: 'obyvatele', nazev: 'ch2_hs_obyvatele', druh: 'postava', kdy: `${UVIZLI('obyvatele')} && dvere_otevreny && !sipky`, r: [70, 50, 10, 26],
            prohlednout: 'ch5_obyvatele_prohlednout',
            pouzit: ['ch5_obyvatele_kam', 'ch5_ruda_baro_kam', { kdy: PRIZNAL, akce: 'ch5_bara_vidim_je', jinak: 'ch5_bara_rampa_prijem' }],
            na: { plan: 'ch5_obyvatele_plan', pembok: 'ch5_obyvatele_postrcit' } },
          { id: 'babicka', nazev: 'postava_babicka', druh: 'postava', kdy: `!dvere_otevreny || (${UVIZLI('babicka')} && !babicka_hotova)`, r: [81, 48, 6, 28], obraz: 'postava_babicka',
            prohlednout: { kdy: 'kocour_utekl && !kocour_prinesen', akce: 'ch5_babicka_prazdna_klec', jinak: { kdy: "c1_babicka=='spojenec'", akce: 'ch5_babicka_spojenec', jinak: 'ch5_babicka_kufr' } },
            pouzit: '#babicka',
            na: { kava: 'ch5_babicka_kava', pembok: 'ch5_babicka_pembok', rozpis: 'ch5_babicka_rozpis', buchta: 'ch5_babicka_buchta_zpet' } },
          { id: 'kocour', nazev: 'postava_kocour', druh: 'postava', kdy: 'kocour_utekl && !kocour_prinesen', r: [10, 80, 5, 10],
            prohlednout: 'ch5_kocour_prohlednout', pouzit: ['ch5_kocour_mluvit', 'ch5_kocour_jde', '$kocour_prinesen'],
            na: { krabice: 'ch5_kocour_krabice', kava: 'ch5_kocour_kava', pembok: 'ch5_kocour_ocas' } },
          { id: 'zmena', nazev: 'postava_pan_zmena', druh: 'postava', kdy: '!dvere_otevreny', r: [74, 40, 6, 20], obraz: 'postava_zmena',
            prohlednout: { kdy: "c3_bazen=='vyjednan' || c3_bazen=='bez_rizeni'", akce: 'ch5_zmena_kruhy_bazen', jinak: 'ch5_zmena_kruhy' },
            pouzit: { stridat: ['ch5_zmena_fronta_1', 'ch5_zmena_fronta_2'] },
            na: { kavove_pero: 'ch5_zmena_pero', pembok: 'ch5_zmena_pembok', kava: 'ch5_zmena_kava' } },
          { id: 'za_archou', nazev: 'ch5_hs_za_archou', kdy: 'odpocet && !lavka_volna', r: [72, 8, 12, 14],
            prohlednout: { kdy: 'lavka_hlasena', akce: 'ch5_za_archou_zmena', jinak: 'ch5_za_archou_nic' },
            pouzit: { kdy: 'lavka_hlasena', akce: ['ch5_za_archou_jde', '#zmena'], jinak: ['ch5_za_archou_nic', 'ch5_pembok_za_roh'] } },
          { id: 'predseda', nazev: 'postava_predseda', druh: 'postava', kdy: '!dvere_otevreny', r: [88, 44, 6, 32], obraz: 'postava_predseda',
            prohlednout: [{ kdy: "c4_bara_rekla=='hned'", akce: 'ch5_predseda_igelitka', jinak: 'ch5_predseda_kufr' }, { kdy: "c3_krysy=='aktovka'", akce: 'ch5_predseda_krysa' }],
            pouzit: { stridat: ['ch5_predseda_mluvit_1', 'ch5_predseda_mluvit_2'] },
            na: { pembok: 'ch5_predseda_pembok', krabicka: 'ch5_predseda_krabicka', plan: 'ch5_predseda_plan', kava: 'ch5_predseda_kava' } },
          { id: 'framework', nazev: 'postava_framework', druh: 'postava', kdy: '!dvere_otevreny', r: [94, 44, 6, 32], obraz: 'postava_framework',
            prohlednout: 'ch5_framework_prohlednout', pouzit: ['ch5_framework_predani', 'ch5_framework_prazdna'],
            na: { krabice: 'ch5_framework_kolega', manual: 'ch5_framework_prodam', stranky: 'ch5_framework_prodam', pembok: 'ch5_framework_pembok' } },
          // tým u pódia (čtyři z R2.1, vrácený člen s nimi)
          ...CLENOVE.map((k, i) => ({
            id: k, nazev: NAZEV[k], druh: 'postava', kdy: TYM(k), r: [4 + i * 7, 46, 6, 30],
            prohlednout: { kdy: 'stranka_' + k, akce: 'ch5_tym_napsal', jinak: 'ch5_tym_prohlednout_' + k }, pouzit: '#tym_' + k,
            na: { kava: 'ch5_tym_kava', kavove_pero: 'ch5_tym_pero', krabice: 'ch5_tym_krabice', klic: 'ch5_tym_klic', denik: 'ch5_tym_denik', plan: 'ch5_tym_plan' },
          })),
          { id: 'norbert_fronta', nazev: 'postava_norbert', druh: 'postava', kdy: `!${TYM('norbert')} && (!dvere_otevreny || (${BEZP_ITERACE} && !c5_pecet))`, r: [84, 40, 6, 20],
            prohlednout: { kdy: 'norbert_u_pultu', akce: 'ch5_norbert_u_pultu_stoji', jinak: 'ch5_norbert_fronta_prohlednout' }, pouzit: '#norbert_fronta',
            na: { pembok: 'ch5_norbert_pembok', kavove_pero: 'ch5_norbert_pero', kava: 'ch5_norbert_kava' } },
          { id: 'vratny', nazev: 'postava_vratny', druh: 'postava', kdy: "vratny_kde!='vez'", r: [14, 10, 6, 14], obraz: 'postava_vratny',
            prohlednout: { kdy: "vratny_kde=='dvere'", akce: 'ch5_vratny_u_dveri', jinak: 'ch5_vratny_v_kabine' }, pouzit: '#vratny',
            na: {
              klic: { kdy: "vratny_kde=='dvere'", akce: '#r51', jinak: 'ch5_vratny_klic_jeste' },
              plan: 'ch5_vratny_plan', rozpis: 'ch5_vratny_rozpis', denik: 'ch5_vratny_denik_nechte', manual: 'ch5_vratny_manual_v_letu', stranky: 'ch5_vratny_manual_v_letu',
              kava: 'ch5_vratny_kava', pembok: 'ch5_vratny_pembok', krabice: 'ch5_vratny_krabice',
            } },
          { id: 'pult', nazev: 'ch5_hs_pult', r: [18, 28, 12, 16],
            prohlednout: { kdy: 'klic_vydan', akce: 'ch5_pult_po_odjisteni', jinak: { kdy: 'odpocet', akce: 'ch5_pult_cervene', jinak: 'ch5_pult_prohlednout' } },
            pouzit: '#pult_ruda',
            na: {
              denik: DENIK_NA_PULT, kava: 'ch5_pult_kava', pembok: 'ch5_pult_pembok', plan: 'ch5_pult_plan', kavove_pero: 'ch5_pult_pero', propiska: 'ch5_pult_pero',
              klic: 'ch5_pult_klic_uz', rozpis: 'ch5_pult_rozpis', krabice: 'ch5_pult_krabice',
            } },
          { id: 'kocka', nazev: 'postava_kocka', druh: 'postava', kdy: KOCKA, r: [26, 22, 4, 8],
            prohlednout: 'ch5_kocka_prohlednout', pouzit: 'ch5_kocka_mluvit', na: { kava: 'ch5_kocka_kava', pembok: 'ch5_kocka_pembok' } },
          { id: 'podium', nazev: 'ch5_hs_podium', r: [2, 28, 10, 14],
            prohlednout: 'ch5_podium_cedule', pouzit: { kdy: 'predano', akce: 'ch5_podium_uz', jinak: 'ch5_podium_jeste_ne' } },
          { id: 'pomnik', nazev: 'ch5_hs_pomnik', kdy: POMNIK, r: [0, 10, 6, 16], prohlednout: 'ch5_pomnik_prohlednout', pouzit: 'ch5_pomnik_pouzit' },
          { id: 'starosta', nazev: 'postava_starosta', druh: 'postava', r: [10, 46, 6, 30],
            prohlednout: 'ch5_starosta_prohlednout', pouzit: { kdy: 'predano', akce: 'ch5_starosta_po_projevu', jinak: '#starosta' },
            na: { pembok: 'ch5_starosta_pembok', plan: 'ch5_starosta_plan', klic: 'ch5_starosta_klic', manual: 'ch5_starosta_manual', stranky: 'ch5_starosta_manual' } },
          { id: 'jerab', nazev: 'ch2_hs_jerab', r: [10, 2, 8, 24], prohlednout: { kdy: "vratny_kde=='jerab'", akce: 'ch5_jerab_s_vratnym', jinak: 'ch5_jerab_prazdny_hak' } },
          { id: 'kometa', nazev: 'ch1_hs_kometa', r: [74, 0, 22, 8], prohlednout: 'ch5_kometa_prohlednout' },
          { id: 'vysilacka', nazev: 'ch5_hs_vysilacka', r: [36, 44, 6, 8],
            prohlednout: 'ch5_vysilacka_prohlednout',
            pouzit: ['ch5_vysilacka_vezi_co_vidis', {
              kdy: '!odpocet', akce: { kdy: 'c5_chybi_lumir && !c5_lumir', akce: ['ch5_bara_hlasi_lumir', '$lumir_hlasen'], jinak: { kdy: 'nastoupeno && !c5_lumir && kontrola_hotova', akce: 'ch5_bara_nekdo_chybi_vysilacka', jinak: { kdy: TRVAL, akce: 'ch5_bara_vez_strucne', jinak: 'ch5_bara_vez_pripravena' } } },
              jinak: {
                kdy: '!lavka_volna && !lavka_hlasena', akce: ['ch5_bara_hlasi_lavka', '$lavka_hlasena'],
                jinak: { kdy: 'dvere_zavreny && !dvere_zamceny && !dvere_hlaseny', akce: [{ kdy: PRANI, akce: 'ch5_bara_hlasi_ocas', jinak: 'ch5_bara_hlasi_otevreno' }, '$dvere_hlaseny'],
                  jinak: { kdy: `!${HODNOTY_OK}`, akce: 'ch5_bara_hlasi_hodnoty',
                    jinak: { kdy: `${ZELENE} && !stav_precten`, akce: [{ kdy: 'c4_listky>=1', akce: 'ch5_tabule_cte_listky', jinak: 'ch5_tabule_cte_cisla' }, '$stav_precten'],
                      jinak: { kdy: '!klic_vydan', akce: 'ch5_bara_vidim_zelene_ted_ty', jinak: 'ch5_bara_uz_jdu_dolu' } } } } } }] },
          { id: 'bara', nazev: 'postava_bara', druh: 'postava', kdy: "kde('bara')=='rampa'", r: [40, 58, 5, 22], obraz: 'postava_bara',
            prohlednout: 'ch5_bara_rampa_prohlednout', pouzit: { stridat: ['ch5_bara_rampa_mluvit_1', 'ch5_bara_rampa_mluvit_2'] },
            na: { klic: 'ch5_bara_klic', manual: 'ch5_bara_manual', kava: 'ch5_bara_kava', buchta: 'ch5_bara_buchta' } },
          { id: 'radnice', stitek: true, nazev: 'ch5_hs_na_radnici', druh: 'vychod', vychod: 'archiv', r: [0, 76, 10, 22] },
        ],
      },

      // S2 Řídicí věž (převzatá z kap. 4, ráno, zatím šedá)
      vez: {
        nazev: 'Řídicí věž',
        poprve: ['ch5_vez_prichod', 'ch5_zelenka_nic_zelene'],
        mista: [
          { id: 'pult', nazev: 'ch5_hs_ridici_pult', r: [30, 30, 24, 16],
            bara_prohlednout: { kdy: 'odpocet', akce: 'ch5_ridici_pult_odpocet', jinak: 'ch5_ridici_pult_prohlednout' }, bara_pouzit: '#pult_bara',
            bara_na: {
              metr: '?',
              plechovka: { kdy: `${TLACITKA} && !tlacitko_natreno`, akce: ['ch5_plechovka_natrit', '$tlacitko_natreno', '-plechovka', { kdy: 'zkouska>=2', akce: 'ch5_vratny_start_vidim' }], jinak: 'ch5_plechovka_pult_ne' },
            } },
          { id: 'kamera_lavka', nazev: 'ch5_hs_kamera_lavka', r: [58, 14, 10, 10],
            bara_prohlednout: 'ch5_kamera_lavka_prohlednout',
            bara_pouzit: { kdy: 'odpocet', akce: { kdy: 'lavka_volna', akce: 'ch5_kamera_lavka_prazdna', jinak: ['ch5_kamera_lavka_zmena', { kdy: '!lavka_hlasena', akce: ['ch5_bara_hlasi_lavka', '$lavka_hlasena'] }] },
              jinak: { kdy: 'nastoupeno', akce: 'ch5_kamera_lavka_prazdna_zatim', jinak: { kdy: 'dvere_otevreny', akce: 'ch5_kamera_lavka_fronta_jde', jinak: 'ch5_kamera_lavka_fronta_stoji' } } } },
          { id: 'kamera_dvere', nazev: 'ch5_hs_kamera_dvere', r: [70, 14, 10, 10],
            bara_prohlednout: 'ch5_kamera_dvere_prohlednout',
            bara_pouzit: { kdy: 'dvere_zamceny', akce: 'ch5_kamera_dvere_zamceno', jinak: { kdy: 'odpocet && dvere_zavreny', akce: {
              kdy: PRANI, akce: ['ch5_kamera_dvere_ocas', { kdy: '!dvere_hlaseny', akce: ['ch5_bara_hlasi_ocas', '$dvere_hlaseny'] }],
              jinak: { kdy: '!lavka_volna', akce: ['ch5_kamera_dvere_zmena_venku', { kdy: '!lavka_hlasena', akce: ['ch5_bara_hlasi_lavka', '$lavka_hlasena'] }], jinak: 'ch5_kamera_dvere_zavreno_nezamceno' } },
              jinak: { kdy: 'dvere_otevreny', akce: 'ch5_kamera_dvere_otevrene', jinak: 'ch5_kamera_dvere_zavrene_jestetoto' } } } },
          { id: 'kamera_paluba', nazev: 'ch5_hs_kamera_paluba', r: [82, 14, 10, 10],
            bara_prohlednout: 'ch5_kamera_paluba_prohlednout',
            bara_pouzit: { kdy: `${UVIZLI('obyvatele')} && dvere_otevreny && !sipky`, akce: 'ch5_kamera_paluba_bez_sipek', jinak: { kdy: 'nastoupeno', akce: 'ch5_kamera_paluba_sedi', jinak: 'ch5_kamera_paluba_prazdna' } } },
          { id: 'tabule', nazev: 'ch5_hs_tabule', r: [4, 8, 22, 22],
            bara_prohlednout: { kdy: 'c4_listky>=1', akce: 'ch5_tabule_prohlednout_listky', jinak: 'ch5_tabule_prohlednout_zelena' },
            bara_pouzit: '#tabule', bara_na: { metr: 'ch5_tabule_metr', plechovka: 'ch5_tabule_plechovka' } },
          { id: 'plechovka', nazev: 'ch5_hs_plechovka', kdy: `${TLACITKA} && !plechovka_vzata`, r: [56, 40, 5, 8],
            bara_prohlednout: 'ch5_plechovka_prohlednout', bara_pouzit: ['ch5_plechovka_vzit', '+plechovka', '$plechovka_vzata'] },
          { id: 'zelenka', nazev: 'postava_zelenka', druh: 'postava', r: [10, 36, 6, 30],
            bara_prohlednout: 'ch5_zelenka_prohlednout', bara_pouzit: '#zelenka', bara_na: { metr: 'ch5_zelenka_metr', plechovka: 'ch5_zelenka_kslit' } },
          { id: 'vratny', nazev: 'postava_vratny', druh: 'postava', kdy: "vratny_kde=='vez'", r: [66, 40, 6, 30], obraz: 'postava_vratny',
            bara_prohlednout: 'ch5_vratny_vez_prohlednout',
            bara_pouzit: { kdy: 'zkouska>=1 && !c5_zauceni', akce: ['ch5_vratny_rozumim', 'ch5_vratny_ktere'], jinak: 'ch5_vratny_vez_mluvit' },
            bara_na: { metr: 'ch5_vratny_metr', plechovka: 'ch5_vratny_plechovka' } },
          { id: 'okno', nazev: 'ch5_hs_okno', r: [60, 2, 36, 10], bara_prohlednout: { kdy: 'odpocet', akce: 'ch5_okno_odpocet', jinak: 'ch5_okno_prohlednout' } },
          { id: 'telegraf', nazev: 'ch5_hs_telegraf', r: [86, 40, 8, 10], bara_prohlednout: 'ch5_telegraf_prohlednout', bara_pouzit: 'ch5_telegraf_prohlednout' },
          { id: 'vysilacka_vez', nazev: 'ch5_hs_vysilacka_vez', r: [20, 40, 6, 8],
            bara_prohlednout: 'ch5_vysilacka_vez_prohlednout',
            bara_pouzit: ['ch5_vysilacka_bara_rudo', { kdy: TRVAL, akce: 'ch5_ruda_vysilacka_rampa', jinak: 'ch5_ruda_vysilacka_co_potrebujes' }, {
              kdy: '!dvere_otevreny', akce: 'ch5_ruda_hlasi_dvere', jinak: { kdy: '!nastoupeno', akce: 'ch5_ruda_hlasi_fronta', jinak: { kdy: '!c5_lumir', akce: 'ch5_ruda_hlasi_lumir', jinak: {
                kdy: '!odpocet', akce: 'ch5_ruda_hlasi_cekam', jinak: { kdy: `!${POJISTKY_OK}`, akce: 'ch5_ruda_hlasi_pojistky', jinak: 'ch5_ruda_hlasi_klic' } } } } }] },
        ],
      },

      // S3 Archiv (převzatý z kap. 1 a 4, ráno)
      archiv: {
        nazev: 'Archiv',
        poprve: ['ch5_radnice_vytah', 'ch5_archiv_prichod'],
        mista: [
          { id: 'lumir', nazev: 'postava_lumir', druh: 'postava', kdy: '!c5_lumir', r: [40, 36, 6, 30], obraz: 'postava_lumir',
            prohlednout: 'ch5_lumir_prohlednout', pouzit: '#lumir',
            na: {
              krabicka: ['ch5_lumir_tohle_je_archiv', 'ch5_lumir_zbytek_data', '-krabicka', '$c5_lumir', 'ch5_lumir_jde', { kdy: "c4_bara_rekla=='hned'", akce: 'ch5_lumir_kufr_zalozeno' }],
              kavove_pero: 'ch5_lumir_pero', propiska: 'ch5_lumir_pero', denik: 'ch5_lumir_denik', pembok: 'ch5_lumir_pembok', kava: 'ch5_lumir_kava',
              plan: 'ch5_lumir_plan', krabice: 'ch5_lumir_krabice', manual: 'ch5_lumir_manual', stranky: 'ch5_lumir_manual', rozpis: 'ch5_lumir_rozpis',
            } },
          { id: 'krabicka', nazev: 'ch5_hs_krabicka', kdy: '!krabicka_vzata', r: [52, 44, 6, 8],
            prohlednout: 'ch5_krabicka_plna', pouzit: { kdy: 'lumir_mluvil', akce: ['ch5_krabicka_vzit', '+krabicka', '$krabicka_vzata'], jinak: 'ch5_krabicka_lumirova' } },
          { id: 'kartoteka', nazev: 'ch1_hs_kartoteka', r: [4, 20, 20, 40], prohlednout: 'ch5_kartoteka_prohlednout', pouzit: 'ch5_kartoteka_pouzit' },
          { id: 'listek_archy', nazev: 'ch5_hs_listek_archy', r: [26, 44, 8, 8], prohlednout: 'ch5_listek_archy', pouzit: 'ch5_listek_archy_jeste_ne' },
          { id: 'regaly', nazev: 'ch5_hs_regaly', r: [64, 8, 32, 60], prohlednout: 'ch5_regaly_prohlednout', pouzit: 'ch5_regaly_faze4', na: { krabice: 'ch5_regaly_krabice' } },
          { id: 'schody', stitek: true, nazev: 'ch5_hs_schody', druh: 'vychod', vychod: 'rampa', r: [0, 70, 10, 28] },
        ],
      },
    },

    dialogy: {
      // --- Ruda: rampa ------------------------------------------------------------
      babicka: {
        poprve: { kdy: "c1_babicka=='spojenec'", akce: 'ch5_babicka_uvod_spojenec', jinak: { kdy: "c1_babicka=='odmitnuta'", akce: 'ch5_babicka_uvod_odmitnuta', jinak: 'ch5_babicka_uvod' } },
        vycerpano: 'ch5_babicka_vse',
        volby: [
          { t: 'ch5_babicka_volba_listek', kdy: `${UVIZLI('babicka')} && dvere_otevreny && !babicka_hotova`, akce: {
            kdy: '!kocour_utekl', akce: ['ch5_babicka_nenajdu', 'ch5_babicka_kocour_utekl', '$kocour_utekl', 'ch5_ruda_kocour_dole', '#'],
            jinak: { kdy: 'kocour_prinesen', akce: ['ch5_babicka_kocour_zpet', 'ch5_ruda_potvrdi_listek', 'ch5_babicka_potvrzeno', '$babicka_hotova', '#', NASTUP], jinak: 'ch5_babicka_bez_kocoura' } } },
          { t: 'ch5_babicka_volba_buchta', kdy: "c1_babicka=='spojenec' && !buchta_vzata", jednou: true, akce: ['ch5_babicka_buchta', '+buchta', '$buchta_vzata'] },
          { t: 'ch5_babicka_volba_letite', jednou: true, akce: { kdy: "c1_babicka=='spojenec'", akce: 'ch5_babicka_letim_zeptal', jinak: 'ch5_babicka_letim' } },
          { t: 'ch5_volba_odejit', konec: true, akce: 'ch5_babicka_konec' },
        ],
      },

      // P5.10: Pan Změna na lávce za Archou s posledním přáním
      zmena: {
        poprve: ['ch5_zmena_a_jeste', 'ch5_zmena_prani_posledni'],
        znovu: 'ch5_zmena_a_jeste_dal',
        volby: [
          { t: 'ch5_zmena_volba_po_pristani', akce: ['ch5_zmena_po_pristani', 'ch5_zmena_poprve_kdy', 'ch5_zmena_nastoupil', '$lavka_volna', '#', POJISTKA] },
          // Kartička navíc pro Ještětoto; když už sedělo uvnitř, vyleze s ní zpátky do dveří
          { t: 'ch5_zmena_volba_dobre', jednou: true, akce: ['ch5_zmena_dobre', (h) => ulozKarty(h, [...kartyPrani(h), 'zmena']), '$jestetoto_uvnitr=0', 'ch5_zmena_jestetoto_dostal', 'ch5_zmena_a_jeste_dal'] },
          { t: 'ch5_zmena_volba_ne', akce: 'ch5_zmena_ne_a_kdy' },
        ],
      },

      // P5.11: přání v tlamě Ještětota, jedno po druhém
      prani: {
        poprve: 'ch5_prani_uvod', znovu: [],
        uvod: (h) => {
          const karty = kartyPrani(h);
          h.rekni('ch5_prani_tlama', [jmenoTvora(karty.length), String(karty.length)]);
          if (karty.length) h.rekni('ch5_prani_karta_' + karty[karty.length - 1]);
        },
        volby: [
          { t: 'ch5_prani_volba_odlozit', kdy: PRANI, akce: (h) => {
            const karty = kartyPrani(h);
            karty.pop();
            ulozKarty(h, karty);
            h.rekni('ch5_prani_po_pristani');
            if (karty.length) h.rekni('ch5_jestetoto_mensi', [jmenoTvora(karty.length)]);
            else h.proved(['ch5_jestetoto_vejde', '$jestetoto_uvnitr', '#']);
          } },
          { t: 'ch5_prani_volba_splnit', kdy: PRANI, jednou: true, akce: ['ch5_prani_splnit', (h) => ulozKarty(h, [...kartyPrani(h), 'dalsi']), 'ch5_prani_roste'] },
          { t: 'ch5_prani_volba_zahodit', kdy: PRANI, jednou: true, akce: 'ch5_prani_zahodit' },
          { t: 'ch5_volba_odejit', konec: true, akce: 'ch5_prani_konec' },
        ],
      },

      norbert_fronta: {
        poprve: ['ch5_norbert_fronta_lavicka', 'ch5_norbert_fronta_poprve'],
        vycerpano: 'ch5_norbert_fronta_vse',
        volby: [
          { t: 'ch5_norbert_volba_k_pultu', kdy: `${BEZP_ITERACE} && !norbert_u_pultu && !c5_pecet`, akce: {
            kdy: 'verze_zamcena', akce: ['ch5_norbert_pak_ano', '$norbert_u_pultu', '#'], jinak: ['ch5_norbert_vcera_jinak', 'ch5_norbert_za_hodinu'] } },
          { t: 'ch5_norbert_volba_norma', jednou: true, akce: 'ch5_norbert_norma_cestujici' },
          { t: 'ch5_volba_odejit', konec: true, akce: 'ch5_norbert_fronta_konec' },
        ],
      },

      vratny: {
        poprve: { kdy: "vratny_kde=='dvere'", akce: 'ch5_vratny_uvod_dvere', jinak: ['ch5_vratny_uvod_jizda', 'ch5_vratny_uvod_nikdo'] },
        vycerpano: 'ch5_vratny_vse',
        volby: [
          { t: 'ch5_vratny_volba_povedete', kdy: '!c5_kapitan', akce: ['ch5_vratny_konecne', '$c5_kapitan', {
            kdy: '!odpocet', akce: ['ch5_vratny_sleza', 'ch5_vratny_do_veze', '$vratny_kde=vez', '#'], jinak: ['ch5_vratny_dole_potreba', '#'] }] },
          { t: 'ch5_vratny_volba_denik', kdy: "!ma('denik') && !denik_dan", jednou: true, akce: ['ch5_vratny_denik_pisu', '+denik', '$denik_dan'] },
          { t: 'ch5_vratny_volba_klic', kdy: 'klic_vydan && !predano', akce: ['ch5_vratny_cekam_na_klic', '#'] },
          { t: 'ch5_vratny_volba_rybari', jednou: true, akce: ['ch5_vratny_rybari_posadka', 'ch5_vratny_ryby_nebraly'] },
          { t: 'ch5_vratny_volba_ruda_sam', jednou: true, akce: ['ch5_vratny_ruda_sam', 'ch5_pembok_a_kdo_na_podiu'] },
          { t: 'ch5_volba_odejit', konec: true, akce: 'ch5_vratny_konec' },
        ],
      },

      pult_ruda: {
        poprve: ['ch5_pult_uvod', 'ch5_pult_bara_pevne_poradi'],
        vycerpano: 'ch5_pult_vse',
        volby: [
          { t: 'ch5_pult_volba_zkouska', akce: ZKOUSKA },
          { t: 'ch5_pult_volba_hodnoty', kdy: `${FINALE} && !${HODNOTY_OK}`, akce: '#hodnoty' },
          { t: 'ch5_pult_volba_stav', kdy: `${ZELENE} && ${FINALE} && !stav_overen`, akce: {
            kdy: 'stav_precten', akce: ['ch5_stav_zadat', 'ch5_stav_overen', 'ch5_ruda_pred_tydnem', '$stav_overen', POJISTKA],
            jinak: ['ch5_stav_podle_zpravy', 'ch5_norbert_zelena_neni_mereni', 'ch5_pembok_co_jsi_hlasil'] } },
          { t: 'ch5_pult_volba_klic', kdy: 'odpocet && !klic_vydan', akce: { kdy: POJISTKY_OK, akce: NA_TRI, jinak: ['ch5_pult_pojistky_cervene', ...PREHLED.slice(0, 4)] } },
          { t: 'ch5_pult_volba_podepsat', kdy: `${BEZP_ITERACE} && !c5_pecet`, jednou: true, akce: 'ch5_pult_podepsat_sam' },
          { t: 'ch5_volba_odejit', konec: true, akce: 'ch5_pult_konec' },
        ],
      },

      // P5.14 při „trval“: Bára se zeptá, na čí tři
      natri: {
        poprve: 'ch5_natri_na_ci_tri', znovu: 'ch5_natri_na_ci_tri',
        volby: [
          { t: 'ch5_natri_volba_na_moje', akce: 'ch5_natri_tak_pockame' },
          { t: 'ch5_natri_volba_na_tvoje', akce: ['ch5_natri_bara_tri', ...NA_TRI_HOTOVO] },
        ],
      },

      // P5.12: hodnoty, které se na obou pultech liší (z obou pultů)
      hodnoty: {
        poprve: 'ch5_hodnoty_uvod', znovu: [],
        uvod: [
          { kdy: "obsahuje(pary, 'uhel') && !par_uhel", akce: 'ch5_hodnoty_uhel' },
          { kdy: "obsahuje(pary, 'mista') && !par_mista", akce: 'ch5_hodnoty_mista' },
          { kdy: "obsahuje(pary, 'vaha') && !par_vaha", akce: { kdy: BARA, akce: 'ch5_hodnoty_vaha_bara', jinak: 'ch5_hodnoty_vaha' } },
          { kdy: '!hodnoty_rada', akce: ['ch5_bara_beton_dycha', '$hodnoty_rada'] }],
        volby: [
          { t: 'ch5_hodnoty_volba_uhel_rampa', kdy: "obsahuje(pary, 'uhel') && !par_uhel", akce: ['ch5_hodnoty_uhel_ok', '$par_uhel', POJISTKA] },
          { t: 'ch5_hodnoty_volba_uhel_vez', kdy: "obsahuje(pary, 'uhel') && !par_uhel", akce: ['ch5_hodnoty_blika', 'ch5_hodnoty_uhel_spatne'] },
          { t: 'ch5_hodnoty_volba_mista_vez', kdy: "obsahuje(pary, 'mista') && !par_mista", akce: ['ch5_hodnoty_mista_ok', '$par_mista', POJISTKA] },
          { t: 'ch5_hodnoty_volba_mista_rampa', kdy: "obsahuje(pary, 'mista') && !par_mista", akce: ['ch5_hodnoty_blika', 'ch5_hodnoty_mista_spatne'] },
          { t: 'ch5_hodnoty_volba_vaha_odhad', kdy: "obsahuje(pary, 'vaha') && !par_vaha", akce: ['ch5_hodnoty_blika', 'ch5_hodnoty_vaha_odhadem'] },
          { t: 'ch5_volba_odejit', konec: true, akce: 'ch5_hodnoty_konec' },
        ],
      },

      starosta: {
        poprve: ['ch5_starosta_uvod', 'ch5_starosta_program'],
        vycerpano: 'ch5_starosta_vse',
        volby: [
          { t: 'ch5_starosta_volba_zprava', jednou: true, akce: { kdy: ZELENE, akce: 'ch5_starosta_zelena_slibil', jinak: 'ch5_starosta_pravda_neprijemne' } },
          { t: 'ch5_starosta_volba_ohnostroj', kdy: 'c4_slib>=1', jednou: true, akce: ['ch5_starosta_ohnostroj_kdy', 'ch5_ruda_ohnostroj_po_pristani'] },
          { t: 'ch5_starosta_volba_pentle', jednou: true, akce: 'ch5_starosta_pentle' },
          { t: 'ch5_volba_odejit', konec: true, akce: 'ch5_starosta_konec' },
        ],
      },

      // R5.1 Předání (P5.15)
      r51: {
        poprve: ['ch5_r51_vratny_ceka', 'ch5_pembok_komu'], znovu: 'ch5_r51_vratny_ceka',
        uvod: { kdy: `!(${PREDANI_PORADNE})`, akce: { kdy: '!manual_hotov', akce: { kdy: 'c5_zauceni', akce: 'ch5_r51_chybi_navod', jinak: 'ch5_r51_chybi_oboje' }, jinak: 'ch5_r51_chybi_zauceni' } },
        volby: [
          { t: 'ch5_r51_volba_poradne', kdy: PREDANI_PORADNE, akce: ['ch5_r51_poradne_ruda', 'ch5_r51_vratny_cte', 'ch5_r51_vratny_prikyvne', '-klic', '-manual', '$c5_predani=poradne', '$predano', '#', ...BARA_SCHAZI, PODIUM] },
          { t: 'ch5_r51_volba_poradi', akce: ['ch5_r51_poradi_ruda', { kdy: 'c5_kapitan', akce: 'ch5_r51_vratny_bez_slova', jinak: 'ch5_r51_vratny_zase' }, '-klic', '$c5_predani=poradi', '$predano', '#', ...BARA_SCHAZI, PODIUM] },
          { t: 'ch5_r51_volba_pozdeji', konec: true, akce: 'ch5_r51_vratny_pockam' },
        ],
      },

      // R5.2 Pódium (P5.16)
      r52: {
        poprve: ['ch5_r52_starosta_komu', 'ch5_r52_ruda_u_mikrofonu'], znovu: 'ch5_r52_starosta_komu',
        volby: [
          { t: 'ch5_r52_volba_ja', akce: ['ch5_r52_ja', '$c5_my=ne', 'ch5_r52_starosta_medaile', 'ch5_r52_tym_tleska', ...STAROSTA_REAKCE, '#', KONEC] },
          { t: 'ch5_r52_volba_my', akce: ['ch5_r52_my', '$c5_my=ano',
            (h) => { for (const k of CLENOVE) if (h.s.priznaky['stranka_' + k]) h.rekni('ch5_r52_jmeno', [NAZEV[k]]); },
            { kdy: 'c5_manual>=1', akce: 'ch5_r52_my_stranky', jinak: 'ch5_r52_my_tym' },
            { kdy: 'c5_kapitan', akce: 'ch5_r52_my_vratny' }, 'ch5_r52_my_bara', 'ch5_r52_tym_reakce', 'ch5_r52_starosta_my',
            ...STAROSTA_REAKCE, '#', KONEC] },
        ],
      },

      // Epilog: poučení na kartu do krabičky (jen text, bez následku)
      pouceni: {
        poprve: ['ch5_pouceni_lumir_karta', 'ch5_pouceni_otazka'], znovu: 'ch5_pouceni_otazka',
        volby: [
          { t: 'ch5_pouceni_volba_zeptat', akce: ['$c5_pouceni=zeptat', ...PO_POUCENI] },
          { t: 'ch5_pouceni_volba_zelena', akce: ['$c5_pouceni=zelena', ...PO_POUCENI] },
          { t: 'ch5_pouceni_volba_dva_svety', akce: ['$c5_pouceni=dva_svety', ...PO_POUCENI] },
        ],
      },

      // --- Ruda: archiv -------------------------------------------------------------
      lumir: {
        poprve: ['ch5_lumir_bez_archivu', 'ch5_lumir_nevejde', '$lumir_mluvil'],
        znovu: 'ch5_lumir_znovu',
        vycerpano: 'ch5_lumir_vse',
        volby: [
          { t: 'ch5_lumir_volba_listek', jednou: true, akce: 'ch5_lumir_listek_mam' },
          { t: 'ch5_lumir_volba_co_stoji', jednou: true, akce: ['ch5_lumir_nikdo_nevratil', 'ch5_lumir_krome_pouceni'] },
          { t: 'ch5_lumir_volba_regal', jednou: true, akce: 'ch5_regaly_faze4' },
          { t: 'ch5_volba_odejit', konec: true, akce: 'ch5_lumir_konec' },
        ],
      },

      // --- Bára: věž ----------------------------------------------------------------
      pult_bara: {
        poprve: 'ch5_ridici_pult_uvod',
        vycerpano: 'ch5_ridici_pult_vse',
        volby: [
          { t: 'ch5_pult_volba_kontrola', akce: [
            'ch5_kontrola_navigace',
            { kdy: '!dvere_otevreny', akce: 'ch5_kontrola_dvere_cekaji', jinak: { kdy: '!nastoupeno', akce: ['ch5_kontrola_odbavovani', { kdy: `${UVIZLI('obyvatele')} && !sipky`, akce: 'ch5_zelenka_zluta_fronta' }],
              jinak: { kdy: '!c5_lumir', akce: ['ch5_kontrola_4809', { kdy: '!kontrola_hotova', akce: ['ch5_bara_plus_my_dva', 'ch5_bara_pocitadlo_opravene', 'ch5_bara_nekdo_chybi', 'ch5_zelenka_cervena', '$kontrola_hotova'], jinak: 'ch5_bara_4811_porad' }],
                jinak: ['ch5_kontrola_4810', 'ch5_bara_vsichni_krome_nas', '$kontrola_hotova'] } } }] },
          { t: 'ch5_pult_volba_seznam', kdy: 'kontrola_hotova && !c5_lumir && !c5_chybi_lumir', akce: ['ch5_seznam_jeden_listek', 'ch5_bara_lumir', 'ch5_bara_kdo_nema_rad_fronty', '$c5_chybi_lumir',
            { kdy: PRIZNAL, akce: ['ch5_bara_hlasi_lumir', '$lumir_hlasen'], jinak: 'ch5_bara_lumir_trval' }] },
          { t: 'ch5_pult_volba_sipky', kdy: `${UVIZLI('obyvatele')} && dvere_otevreny && !sipky`, akce: ['ch5_sipky_rozsvitit', 'ch5_obyvatele_aha', '$sipky', NASTUP] },
          { t: 'ch5_pult_volba_verze', kdy: `${BEZP_ITERACE} && !verze_zamcena`, akce: ['ch5_verze_tahle', 'ch5_verze_zadna_dalsi', '$verze_zamcena', { kdy: PRIZNAL, akce: 'ch5_bara_hlasi_verze' }] },
          { t: 'ch5_pult_volba_zkusebni', kdy: 'c5_kapitan && !c5_zauceni', akce: [
            { kdy: "vratny_kde!='vez'", akce: ['ch5_zkusebni_vratny_prijde', '$vratny_kde=vez'] },
            { kdy: '!legenda', akce: ['ch5_zkusebni_nechat_zkusit', 'ch5_zkusebni_1', 'ch5_vratny_ktere', '$zkouska=1', 'ch5_bara_kde_se_zasekl'],
              jinak: { kdy: `${TLACITKA} && !tlacitko_natreno`, akce: ['ch5_zkusebni_2', 'ch5_vratny_start_nenajdu', '$zkouska=2', 'ch5_bara_plechovka_napad'],
                jinak: ['ch5_zkusebni_projde', 'ch5_vratny_zapamatuju', 'ch5_vratny_lodni_denik', '$c5_zauceni', { kdy: 'odpocet', akce: ['ch5_vratny_zpet_dolu', '$vratny_kde=dvere'] }] } }] },
          { t: 'ch5_pult_volba_hodnoty', kdy: `${FINALE} && !${HODNOTY_OK}`, akce: '#hodnoty' },
          { t: 'ch5_pult_volba_predat_palube', kdy: 'odpocet && !klic_vydan', akce: 'ch5_predat_rampa_neodjistena' },
          { t: 'ch5_pult_volba_uzavrit', kdy: '!odpocet', akce: {
            kdy: '!kontrola_hotova', akce: 'ch5_uzavrit_nejdriv_kontrola', jinak: { kdy: '!nastoupeno', akce: 'ch5_uzavrit_fronta_stoji', jinak: {
              kdy: '!c5_lumir', akce: 'ch5_uzavrit_nekdo_chybi', jinak: { kdy: '!c5_pecet', akce: ['ch5_pult_ceka_bezpecnost', 'ch5_bara_kazdy_tyden'], jinak: ODPOCET } } } } },
          { t: 'ch5_pult_volba_pocitadlo_znovu', kdy: 'kontrola_hotova && !c5_lumir', jednou: true, akce: ['ch5_bara_4811_porad', 'ch5_bara_pricist_ne'] },
          { t: 'ch5_volba_odejit', konec: true, akce: 'ch5_ridici_pult_konec' },
        ],
      },

      tabule: {
        poprve: 'ch5_tabule_uvod',
        vycerpano: 'ch5_tabule_vse',
        volby: [
          { t: 'ch5_tabule_volba_legenda', kdy: 'zkouska>=1 && !legenda', akce: ['ch5_legenda_pisu', { kdy: 'c4_listky>=1', akce: 'ch5_legenda_listky', jinak: ['ch5_legenda_bez_listku', 'ch5_legenda_zelenou_mam'] }, '$legenda', 'ch5_legenda_hotova'] },
          { t: 'ch5_tabule_volba_stav', kdy: `${ZELENE} && ${FINALE} && !stav_precten`, akce: [{ kdy: 'c4_listky>=1', akce: 'ch5_tabule_cte_listky', jinak: 'ch5_tabule_cte_cisla' }, '$stav_precten', 'ch5_zelenka_klidna_barva'] },
          { t: 'ch5_tabule_volba_prohlednout', jednou: true, akce: 'ch5_tabule_deset_centimetru' },
          { t: 'ch5_volba_odejit', konec: true, akce: 'ch5_tabule_konec' },
        ],
      },

      zelenka: {
        poprve: 'ch5_zelenka_uvod',
        vycerpano: 'ch5_zelenka_vse',
        volby: [
          { t: 'ch5_zelenka_volba_barvy', jednou: true, akce: 'ch5_zelenka_barvy' },
          { t: 'ch5_zelenka_volba_kslit', jednou: true, akce: 'ch5_zelenka_kslit_v_ruce' },
          { t: 'ch5_zelenka_volba_zelena', kdy: ZELENE, jednou: true, akce: 'ch5_zelenka_klidna_barva' },
          { t: 'ch5_volba_odejit', konec: true, akce: 'ch5_zelenka_konec' },
        ],
      },
    },

    napovedy: [
      // Ruda (Prof. Pembok): od puzzlu nejblíž splnění
      { id: 'r51', kdy: `${RUDA} && klic_vydan && !predano`, stupne: ['ch5_rada_r51'] },
      { id: 'natri', kdy: `${RUDA} && odpocet && ${POJISTKY_OK} && !klic_vydan`, stupne: ['ch5_rada_natri_1', 'ch5_rada_natri_3'] },
      { id: 'prani', kdy: `${RUDA} && ${FINALE} && ${PRANI} && (dvere_zavreny || zkouska_predem)`, stupne: ['ch5_rada_prani_1', 'ch5_rada_prani_2', 'ch5_rada_prani_3'] },
      { id: 'lavka', kdy: `${RUDA} && odpocet && !lavka_volna`, stupne: ['ch5_rada_lavka_1', 'ch5_rada_lavka_2', 'ch5_rada_lavka_3'] },
      { id: 'dvere', kdy: `${RUDA} && odpocet && !dvere_zamceny`, stupne: ['ch5_rada_dvere_1', 'ch5_rada_dvere_3'] },
      { id: 'hodnoty', kdy: `${RUDA} && ${FINALE} && !${HODNOTY_OK}`, stupne: ['ch5_rada_hodnoty_1', 'ch5_rada_hodnoty_2', (h) => {
        const p = h.s.priznaky;
        const pary = String(p.pary || '').split('-');
        if (pary.includes('vaha') && !p.par_vaha) h.rekni(h.ma('denik') ? 'ch5_rada_hodnoty_3_vaha' : 'ch5_rada_hodnoty_3_vaha_vratny');
        else if (pary.includes('uhel') && !p.par_uhel) h.rekni('ch5_rada_hodnoty_3_uhel');
        else h.rekni('ch5_rada_hodnoty_3_mista');
      }] },
      { id: 'stav', kdy: `${RUDA} && ${ZELENE} && ${FINALE} && !stav_overen`, stupne: ['ch5_rada_stav_1', 'ch5_rada_stav_3'] },
      { id: 'nastup', kdy: `${RUDA} && !dvere_otevreny`, stupne: ['ch5_rada_nastup_1', 'ch5_rada_nastup_3'] },
      { id: 'skupiny', kdy: `${RUDA} && dvere_otevreny && !nastoupeno`, stupne: ['ch5_rada_skupiny_1', 'ch5_rada_skupiny_2', {
        kdy: `${UVIZLI('rybari')} && !rybari_hotovi`, akce: 'ch5_rada_skupiny_3_rybari', jinak: { kdy: `${UVIZLI('babicka')} && !babicka_hotova`, akce: 'ch5_rada_skupiny_3_kocour', jinak: 'ch5_rada_skupiny_3_sipky' } }] },
      { id: 'pecet', kdy: `${RUDA} && ${BEZP_ITERACE} && !c5_pecet && nastoupeno`, stupne: ['ch5_rada_pecet_1', 'ch5_rada_pecet_2', 'ch5_rada_pecet_3'] },
      { id: 'lumir', kdy: `${RUDA} && !c5_lumir && (nastoupeno || c5_chybi_lumir)`, stupne: ['ch5_rada_lumir_1', 'ch5_rada_lumir_2', 'ch5_rada_lumir_3'] },
      { id: 'navod', kdy: `${RUDA} && !odpocet && !manual_hotov && nastoupeno && c5_lumir && c5_pecet`, stupne: ['ch5_rada_navod_1', 'ch5_rada_navod_2', 'ch5_rada_navod_3'] },
      { id: 'kapitan', kdy: `${RUDA} && !c5_kapitan && !odpocet && nastoupeno && c5_lumir`, stupne: ['ch5_rada_kapitan_1', 'ch5_rada_kapitan_3'] },
      { id: 'ruda_ceka', kdy: RUDA, stupne: ['ch5_rada_ocima_bary'] },
      // Bára (metr)
      { id: 'uzavrit', kdy: `${BARA} && !odpocet && nastoupeno && c5_lumir && c5_pecet`, stupne: ['ch5_rada_uzavrit_1', 'ch5_rada_uzavrit_3'] },
      { id: 'verze', kdy: `${BARA} && ${BEZP_ITERACE} && !verze_zamcena`, stupne: ['ch5_rada_verze_1', 'ch5_rada_verze_3'] },
      { id: 'sipky', kdy: `${BARA} && ${UVIZLI('obyvatele')} && dvere_otevreny && !sipky`, stupne: ['ch5_rada_sipky_1', 'ch5_rada_sipky_3'] },
      { id: 'kontrola', kdy: `${BARA} && !odpocet && nastoupeno && !c5_lumir && !c5_chybi_lumir`, stupne: ['ch5_rada_kontrola_1', 'ch5_rada_kontrola_2', 'ch5_rada_kontrola_3'] },
      { id: 'kamera_lavka', kdy: `${BARA} && odpocet && !lavka_volna && !lavka_hlasena`, stupne: ['ch5_rada_kamera_lavka_1', 'ch5_rada_kamera_lavka_3'] },
      { id: 'kamera_dvere', kdy: `${BARA} && odpocet && dvere_zavreny && !dvere_zamceny && !dvere_hlaseny`, stupne: ['ch5_rada_kamera_dvere_1', 'ch5_rada_kamera_dvere_3'] },
      { id: 'stav_bara', kdy: `${BARA} && ${ZELENE} && ${FINALE} && !stav_precten`, stupne: ['ch5_rada_stav_bara_1', 'ch5_rada_stav_bara_3'] },
      { id: 'hodnoty_bara', kdy: `${BARA} && ${FINALE} && !${HODNOTY_OK}`, stupne: ['ch5_rada_hodnoty_1', 'ch5_rada_hodnoty_2_bara'] },
      { id: 'zauceni', kdy: `${BARA} && c5_kapitan && !c5_zauceni`, stupne: ['ch5_rada_zauceni_1', 'ch5_rada_zauceni_2', { kdy: `zkouska>=2 && ${TLACITKA} && !tlacitko_natreno`, akce: 'ch5_rada_zauceni_3_natrit', jinak: 'ch5_rada_zauceni_3' }] },
      { id: 'bara_ceka', kdy: BARA, stupne: ['ch5_rada_ocima_rudy'] },
    ],

    // Obrazovka „Co si Nedostavěnice zapamatovala“ za celou hru
    pamet: [
      { klic: 'ch5_pamet_konec_tym', kdy: "c5_konec=='tym'" },
      { klic: 'ch5_pamet_konec_hrdina', kdy: "c5_konec=='hrdina'" },
      { klic: 'ch5_pamet_konec_pomnik', kdy: "c5_konec=='pomnik'" },
      { klic: 'ch5_pamet_konec_etapa', kdy: "c5_konec=='etapa'" },
      { klic: 'ch5_pamet_vada_slib', kdy: 'c1_slib_vseho<3' },
      { klic: 'ch5_pamet_vada_slib_ne', kdy: 'c1_slib_vseho>=3' },
      { klic: 'ch5_pamet_vada_mikro', kdy: "c2_rozdeleni=='povaha'" },
      { klic: 'ch5_pamet_vada_mikro_ne', kdy: "c2_rozdeleni!='povaha'" },
      { klic: 'ch5_pamet_vada_poradi', kdy: "c3_bara_priority=='ano'" },
      { klic: 'ch5_pamet_vada_poradi_ne', kdy: "c3_bara_priority!='ano'" },
      { klic: 'ch5_pamet_vada_zprava', kdy: "c4_report=='poctive'" },
      { klic: 'ch5_pamet_vada_zprava_ne', kdy: "c4_report!='poctive'" },
      { klic: 'ch5_pamet_vada_hrdina', kdy: "c5_my=='ano'" },
      { klic: 'ch5_pamet_vada_hrdina_ne', kdy: "c5_my!='ano'" },
      { klic: 'ch5_pamet_sladeni_vysoke', kdy: 'c5_sladeni>=5' },
      { klic: 'ch5_pamet_sladeni_nizke', kdy: 'c5_sladeni<5' },
      { klic: 'ch5_pamet_antena', kdy: 'antena' },
      { klic: 'ch5_pamet_predani_poradne', kdy: "c5_predani=='poradne'" },
      { klic: 'ch5_pamet_predani_poradi', kdy: "c5_predani=='poradi'" },
      { klic: 'ch5_pamet_bara_vysoka', kdy: "c5_duvera=='vysoka'" },
      { klic: 'ch5_pamet_bara_stredni', kdy: "c5_duvera=='stredni'" },
      { klic: 'ch5_pamet_bara_nizka', kdy: "c5_duvera=='nizka'" },
      { klic: 'ch5_pamet_pouceni_zeptat', kdy: "c5_pouceni=='zeptat'" },
      { klic: 'ch5_pamet_pouceni_zelena', kdy: "c5_pouceni=='zelena'" },
      { klic: 'ch5_pamet_pouceni_dva_svety', kdy: "c5_pouceni=='dva_svety'" },
      { klic: 'ch5_pamet_titulky', kdy: 'c5_titulky' },
      { klic: 'ch5_pamet_lumir', kdy: 'true' },
    ],

    // Texty, které skládá kód (kontrola klíčů je tak najde)
    v_kodu: [
      ...CLENOVE.map((k) => 'ch5_start_ponozky_' + k),
      ...['k1', 'k2', 'k3', 'ohnostroj', 'zmena', 'dalsi'].map((k) => 'ch5_prani_karta_' + k),
      'ch5_r52_jmeno', 'ch5_jestetoto_uvnitr', 'ch5_jestetoto_maly', 'ch5_jestetoto_vetsi', 'ch5_prani_tlama', 'predmet_stranky_prohlednout'],

    minihry: {},
    pruchody: {},
  };

  // --- tým: stránka návodu (P5.5) a u Norberta pečeť (P5.4) ------------------------
  for (const k of CLENOVE) {
    data.dialogy['tym_' + k] = {
      poprve: 'ch5_tym_uvod_' + k, znovu: [],
      vycerpano: 'ch5_tym_vse',
      volby: [
        { t: 'ch5_tym_volba_stranka', kdy: `!stranka_${k} && !manual_hotov`, akce: [
          'ch5_tym_napis_stranku',
          k === 'klara' ? { kdy: KAJUTY_OBETOVANE, akce: 'ch5_stranka_klara_hranate', jinak: 'ch5_stranka_klara' } : 'ch5_stranka_' + k,
          { kdy: `c4_clen_zpet && c3_odchazi=='${k}'`, akce: (h) => h.rekni('ch5_stranka_odesel', [NAZEV[k]]) },
          '+stranky', '$stranka_' + k, '$c5_manual+1'] },
        ...(k === 'norbert' ? [{ t: 'ch5_norbert_volba_k_pultu', kdy: `${BEZP_ITERACE} && !norbert_u_pultu && !c5_pecet`, akce: {
          kdy: 'verze_zamcena', akce: ['ch5_norbert_pak_ano', '$norbert_u_pultu', '#'], jinak: ['ch5_norbert_vcera_jinak', 'ch5_norbert_za_hodinu'] } }] : []),
        { t: 'ch5_tym_volba_co', jednou: true, akce: 'ch5_tym_co_' + k },
        { t: 'ch5_volba_odejit', konec: true, akce: 'ch5_tym_konec' },
      ],
    };
  }

  // --- Průchody z docs/kapitoly/05-pruchod.md ------------------------------------------
  const LUMIR_KROKY = ['pouzij radnice', 'pouzij lumir', 'volba ch5_volba_odejit', 'pouzij krabicka', 'predmet krabicka lumir', 'pouzij schody'];
  const KONTROLA_A_SEZNAM = ['pouzij pult', 'volba ch5_pult_volba_kontrola', 'volba ch5_pult_volba_seznam', 'volba ch5_volba_odejit'];
  const KONTROLA = ['pouzij pult', 'volba ch5_pult_volba_kontrola', 'volba ch5_volba_odejit'];
  const UZAVRIT = ['pouzij pult', 'volba ch5_pult_volba_uzavrit'];
  const NAVOD = (lide) => [
    ...lide.flatMap((k) => ['pouzij ' + k, 'volba ch5_tym_volba_stranka', 'volba ch5_volba_odejit']),
    'predmet stranky krabice', "ocekavej ma('manual')"];
  const KAPITAN = ['pouzij vratny', 'volba ch5_vratny_volba_povedete'];
  const ZAUCENI = ['pouzij pult', 'volba ch5_pult_volba_zkusebni', 'volba ch5_volba_odejit', 'pouzij tabule', 'volba ch5_tabule_volba_legenda', 'volba ch5_volba_odejit',
    'pouzij pult', 'volba ch5_pult_volba_zkusebni', 'volba ch5_volba_odejit', 'ocekavej c5_zauceni'];
  const LAVKA_A_DVERE = ['pouzij za_archou', 'volba ch5_zmena_volba_po_pristani', 'ocekavej lavka_volna', 'pouzij dvere', 'ocekavej dvere_zamceny'];
  const NA_TRI_KROKY = ['pouzij pult', 'volba ch5_pult_volba_klic', "ocekavej ma('klic')"];
  const PODIUM_MY = ['volba ch5_r52_volba_my', 'volba ch5_pouceni_volba_dva_svety'];

  data.pruchody = {
    nejkratsi: {
      popis: 'Nejkratší cesta, dobré kapitoly 1 až 4 (05-pruchod.md §1): bez návodu, „my“, konec Tým',
      start: 'dobra',
      kroky: [
        'pouzij dvere', 'ocekavej nastoupeno',
        'prepni', ...KONTROLA_A_SEZNAM, 'ocekavej c5_chybi_lumir',
        'prepni', ...LUMIR_KROKY, 'ocekavej c5_lumir',
        'prepni', ...UZAVRIT, 'ocekavej odpocet', 'ocekavej lavka_hlasena',
        'prepni', ...LAVKA_A_DVERE,
        ...NA_TRI_KROKY, "ocekavej kde('bara')=='vez'",
        'predmet klic vratny', 'volba ch5_r51_volba_poradi', "ocekavej kde('bara')=='rampa'",
        ...PODIUM_MY,
      ],
      ocekavej: ['konec', "c5_predani=='poradi'", "c5_my=='ano'", "c5_konec=='tym'", "c5_duvera=='vysoka'", 'c5_sladeni==7', 'c5_vyvoj==5', '!c5_titulky', "c5_pouceni=='dva_svety'"],
    },
    uplna: {
      popis: 'Úplná cesta (05-pruchod.md §2): návod, kapitán, zaučení, buchta, předání s návodem, scéna po titulcích',
      start: 'dobra',
      kroky: [
        ...NAVOD(['vera', 'norbert', 'pepa', 'klara']), 'ocekavej c5_manual==4',
        'predmet plan vratny', ...KAPITAN, "ocekavej vratny_kde=='vez'",
        'pouzij framework', 'pouzij babicka', 'volba ch5_babicka_volba_buchta', 'volba ch5_volba_odejit', "ocekavej ma('buchta')",
        'pouzij dvere',
        'prepni', ...ZAUCENI, ...KONTROLA_A_SEZNAM,
        'prepni', ...LUMIR_KROKY,
        'prepni', ...UZAVRIT, 'ocekavej odpocet',
        'prepni', ...LAVKA_A_DVERE, ...NA_TRI_KROKY,
        'predmet klic vratny', 'volba ch5_r51_volba_poradne',
        ...PODIUM_MY,
      ],
      ocekavej: ['konec', "c5_predani=='poradne'", "c5_konec=='tym'", 'c5_titulky', 'c5_kapitan', 'c5_zauceni'],
    },
    spatne_kapitoly: {
      popis: 'Špatné kapitoly 1 až 4 (05-pruchod.md §3): rybáři a obyvatelé, kamery (trval), přání a ohňostroj, pár hodnot, stav, „Na čí tři?“, konec Pomník',
      start: 'spatna',
      // Kamery a „Říct to nahlas“: s Jednou tabulí pro oba by Ruda viděl lávku i ocas sám (K29)
      priznaky: { c4_zlepseni: 'nahlas' },
      kroky: [
        'pouzij dvere', 'ocekavej !nastoupeno', 'pouzij rybari', 'ocekavej rybari_hotovi', 'pouzij obyvatele',
        'prepni', 'pouzij pult', 'volba ch5_pult_volba_sipky', 'volba ch5_volba_odejit', 'ocekavej nastoupeno',
        'pouzij pult', 'volba ch5_pult_volba_kontrola', 'volba ch5_pult_volba_seznam', 'volba ch5_volba_odejit', 'ocekavej c5_chybi_lumir', 'ocekavej !lumir_hlasen',
        'prepni', 'pouzij vysilacka', 'ocekavej lumir_hlasen', ...LUMIR_KROKY,
        'prepni', ...UZAVRIT, 'ocekavej odpocet', 'ocekavej !lavka_hlasena',
        'pouzij kamera_lavka', 'ocekavej lavka_hlasena',
        'prepni', 'pouzij za_archou', 'volba ch5_zmena_volba_po_pristani', 'pouzij dvere', 'ocekavej dvere_zavreny', 'ocekavej !dvere_hlaseny',
        'prepni', 'pouzij kamera_dvere', 'ocekavej dvere_hlaseny',
        'pouzij tabule', 'volba ch5_tabule_volba_stav', 'volba ch5_volba_odejit', 'ocekavej stav_precten',
        'pouzij pult', 'volba ch5_pult_volba_hodnoty', 'volba ch5_hodnoty_volba_mista_rampa', 'volba ch5_hodnoty_volba_mista_vez', 'ocekavej par_mista', 'volba ch5_volba_odejit',
        'prepni', 'pouzij jestetoto', 'volba ch5_prani_volba_odlozit', 'volba ch5_prani_volba_odlozit', 'ocekavej jestetoto_uvnitr',
        'pouzij dvere', 'ocekavej dvere_zamceny',
        'pouzij pult', 'volba ch5_pult_volba_stav', 'ocekavej stav_overen',
        'volba ch5_pult_volba_klic', 'volba ch5_natri_volba_na_moje', 'volba ch5_natri_volba_na_tvoje', "ocekavej ma('klic')",
        'predmet klic vratny', 'volba ch5_r51_volba_poradi',
        'volba ch5_r52_volba_my', 'volba ch5_pouceni_volba_zelena',
      ],
      ocekavej: ['konec', "c5_konec=='pomnik'", "c5_duvera=='nizka'", 'c5_sladeni==0', 'c5_vyvoj==1', 'antena', "pary=='mista'", "c5_predani=='poradi'", '!c5_titulky'],
    },
    ja_hrdina: {
      popis: 'Varianta B: „Já.“ na pódiu, konec Hrdina; cestou navíc deník a hodnoty neřešené (nejsou)',
      start: 'dobra',
      kroky: [
        'pouzij dvere', 'prepni', ...KONTROLA_A_SEZNAM, 'prepni', ...LUMIR_KROKY, 'prepni', ...UZAVRIT,
        'prepni', ...LAVKA_A_DVERE, ...NA_TRI_KROKY,
        'predmet klic vratny', 'volba ch5_r51_volba_poradi',
        'volba ch5_r52_volba_ja', 'volba ch5_pouceni_volba_zeptat',
      ],
      ocekavej: ['konec', "c5_my=='ne'", "c5_konec=='hrdina'", 'c5_vyvoj==4'],
    },
    prani_a_hodnoty: {
      popis: 'Varianty C, I, J, Q: Ruda vzal poslední přání (Ještětoto dostane kartičku), tři kartičky a ohňostroj, tři páry hodnot včetně váhy deníkem, vrácený člen',
      start: 'dobra',
      priznaky: { c4_creep: 2, c4_slib: 1, c3_nesladeno: 'navigace-kabel-pocitadlo-svaciny', c4_integrace: 3, c3_integrace: 3, c4_clen_zpet: true, c3_retro: 'ne' },
      kroky: [
        'pouzij pepa', 'volba ch5_tym_volba_stranka', "ocekavej rekl('ch5_stranka_odesel')", 'volba ch5_volba_odejit',
        'pouzij dvere', 'prepni', ...KONTROLA_A_SEZNAM, 'prepni', ...LUMIR_KROKY, 'prepni', ...UZAVRIT, 'ocekavej odpocet',
        'prepni', "ocekavej pary=='uhel-mista-vaha'",
        'pouzij za_archou', 'volba ch5_zmena_volba_dobre', 'ocekavej pocet(prani_karty)==4', 'volba ch5_zmena_volba_ne', 'volba ch5_zmena_volba_po_pristani',
        'pouzij dvere', 'ocekavej dvere_zavreny', 'ocekavej dvere_hlaseny',
        'pouzij jestetoto', 'volba ch5_prani_volba_splnit', 'ocekavej pocet(prani_karty)==5', 'volba ch5_prani_volba_zahodit',
        'volba ch5_prani_volba_odlozit', 'volba ch5_prani_volba_odlozit', 'volba ch5_prani_volba_odlozit', 'volba ch5_prani_volba_odlozit', 'volba ch5_prani_volba_odlozit',
        'ocekavej jestetoto_uvnitr', 'pouzij dvere', 'ocekavej dvere_zamceny',
        'pouzij pult', 'volba ch5_pult_volba_hodnoty', 'volba ch5_hodnoty_volba_uhel_vez', 'volba ch5_hodnoty_volba_uhel_rampa', 'volba ch5_hodnoty_volba_vaha_odhad', 'volba ch5_volba_odejit',
        'predmet denik pult', 'ocekavej par_vaha',
        'prepni', 'pouzij pult', 'volba ch5_pult_volba_hodnoty', 'volba ch5_hodnoty_volba_mista_vez', 'volba ch5_volba_odejit',
        'prepni', ...NA_TRI_KROKY,
        'predmet klic vratny', 'volba ch5_r51_volba_poradi', ...PODIUM_MY,
      ],
      ocekavej: ['konec', 'par_uhel', 'par_mista', 'par_vaha', 'c5_sladeni==5', "c5_konec=='tym'", 'c5_manual==1'],
    },
    pecet_a_etapa: {
      popis: 'Varianta H: krabice na všechno (systém ve světě iterací): zamknout verzi, Norbert z fronty k pultu, zkouška a pečeť; nízké sladění → Druhá etapa',
      start: 'dobra',
      priznaky: { c2_rozdeleni: 'krabice', c2_vyjimky: 0, c2_mosty: 'start', c3_integrace: 2, c2_tym: 'pepa-vera-klara-zdenda' },
      kroky: [
        'pouzij dvere', 'ocekavej nastoupeno', 'pouzij norbert_fronta', 'volba ch5_norbert_volba_k_pultu', "ocekavej rekl('ch5_norbert_za_hodinu')", 'volba ch5_volba_odejit',
        'pouzij pult', 'volba ch5_pult_volba_zkouska', "ocekavej rekl('ch5_zkouska_pecet_chybi')", 'volba ch5_volba_odejit',
        'prepni', 'pouzij pult', 'volba ch5_pult_volba_verze', 'volba ch5_pult_volba_kontrola', 'volba ch5_pult_volba_seznam', 'volba ch5_volba_odejit',
        'prepni', ...LUMIR_KROKY,
        'prepni', ...UZAVRIT, 'volba ch5_volba_odejit', 'ocekavej !odpocet', "ocekavej rekl('ch5_pult_ceka_bezpecnost')",
        'prepni', 'pouzij norbert_fronta', 'volba ch5_norbert_volba_k_pultu', 'ocekavej norbert_u_pultu',
        'pouzij pult', 'volba ch5_pult_volba_zkouska', 'ocekavej c5_pecet', "ocekavej rekl('ch5_norbert_nastupuje')", 'volba ch5_volba_odejit',
        'prepni', ...UZAVRIT, 'ocekavej odpocet',
        'prepni', ...LAVKA_A_DVERE, ...NA_TRI_KROKY,
        'predmet klic vratny', 'volba ch5_r51_volba_poradi', ...PODIUM_MY,
      ],
      ocekavej: ['konec', 'c5_pecet', "c5_konec=='etapa'", 'c5_sladeni==2'],
    },
    norbert_v_tymu_pecet: {
      popis: 'Varianta H s Norbertem v týmu a bezpečnostním systémem u Báry: stránka i pečeť od stejného Norberta; Pomník při povaze s interiérem u Rudy',
      start: 'dobra',
      priznaky: { c2_bezpecnost: 'bara', c2_interier: 'ruda', c2_vyjimky: 0, c2_mosty: 'start', c3_integrace: 2, c4_usmireni: 'trval' },
      kroky: [
        'pouzij dvere',
        'prepni', 'pouzij pult', 'volba ch5_pult_volba_verze', 'volba ch5_volba_odejit',
        'prepni', 'pouzij norbert', 'volba ch5_norbert_volba_k_pultu', 'ocekavej norbert_u_pultu',
        'pouzij norbert', 'volba ch5_tym_volba_stranka', 'volba ch5_volba_odejit', 'ocekavej c5_manual==1',
        'pouzij pult', 'volba ch5_pult_volba_zkouska', 'ocekavej c5_pecet', 'volba ch5_volba_odejit',
        ...LUMIR_KROKY, 'prepni', ...KONTROLA, ...UZAVRIT, 'ocekavej odpocet',
        'pouzij kamera_lavka', 'prepni', 'pouzij za_archou', 'volba ch5_zmena_volba_po_pristani', 'pouzij dvere', 'ocekavej dvere_zamceny',
        'pouzij pult', 'volba ch5_pult_volba_klic', 'volba ch5_natri_volba_na_tvoje', "ocekavej ma('klic')",
        'predmet klic vratny', 'volba ch5_r51_volba_poradi', ...PODIUM_MY,
      ],
      ocekavej: ['konec', 'c5_pecet', "c5_konec=='pomnik'", 'c5_sladeni==3', 'c5_manual==1'],
    },
    zelena_tlacitka_babicka: {
      popis: 'Varianty K, O, F, M: zelená zpráva bez lístků, obětovaná tlačítka (babička uvízne, kocour; tlačítko Start natřít), Ptát se dřív (stav před odpočtem), zaučení po finále',
      start: 'dobra',
      priznaky: { c4_report: 'zelene', c4_listky: 0, c4_obet: 'pomnik-tlacitka', c4_nastup_chybi: 'babicka', c4_zlepseni: 'ptat', c1_babicka: 'odmitnuta' },
      kroky: [
        'pouzij pult', 'volba ch5_pult_volba_zkouska', 'ocekavej zkouska_predem', 'volba ch5_pult_volba_stav', "ocekavej rekl('ch5_stav_podle_zpravy')", 'volba ch5_volba_odejit',
        'prepni', 'pouzij tabule', 'volba ch5_tabule_volba_stav', 'volba ch5_volba_odejit', 'ocekavej stav_precten',
        'prepni', 'pouzij pult', 'volba ch5_pult_volba_stav', 'ocekavej stav_overen', 'volba ch5_volba_odejit',
        'pouzij dvere', 'ocekavej !nastoupeno', 'pouzij babicka', 'volba ch5_babicka_volba_listek', 'ocekavej kocour_utekl',
        'pouzij kocour', 'ocekavej kocour_prinesen', 'pouzij babicka', 'volba ch5_babicka_volba_listek', 'ocekavej nastoupeno',
        ...LUMIR_KROKY, 'prepni', ...KONTROLA, ...UZAVRIT, 'ocekavej odpocet',
        'prepni', ...LAVKA_A_DVERE, ...NA_TRI_KROKY,
        // po finále: kapitán u dveří, stránky, zaučení s natřeným tlačítkem
        ...KAPITAN, "ocekavej vratny_kde=='dvere'",
        ...NAVOD(['vera', 'norbert', 'pepa']),
        'predmet klic vratny', 'volba ch5_r51_volba_pozdeji', "ocekavej rekl('ch5_r51_chybi_zauceni')",
        'prepni', 'pouzij pult', 'volba ch5_pult_volba_zkusebni', 'volba ch5_volba_odejit', "ocekavej vratny_kde=='vez'",
        'pouzij tabule', 'volba ch5_tabule_volba_legenda', "ocekavej rekl('ch5_legenda_bez_listku')", 'volba ch5_volba_odejit',
        'pouzij pult', 'volba ch5_pult_volba_zkusebni', 'ocekavej zkouska==2', 'volba ch5_volba_odejit',
        'pouzij plechovka', 'predmet plechovka pult', 'ocekavej tlacitko_natreno',
        'pouzij pult', 'volba ch5_pult_volba_zkusebni', 'ocekavej c5_zauceni', "ocekavej vratny_kde=='dvere'", 'volba ch5_volba_odejit',
        'prepni', 'predmet klic vratny', 'volba ch5_r51_volba_poradne', ...PODIUM_MY,
      ],
      ocekavej: ['konec', "c5_predani=='poradne'", 'c5_vyvoj==4', "c5_konec=='tym'", '!c5_titulky', 'c5_manual==3'],
    },
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  else koren.KAPITOLA5 = data;
})(typeof window !== 'undefined' ? window : globalThis);
