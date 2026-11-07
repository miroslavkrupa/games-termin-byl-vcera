// Kapitola 4 jako data pro šedý prototyp. Zdroj pravdy pro logiku jsou dokumenty
// docs/kapitoly/04-*.md. Repliky jsou pracovní a jen česky: prototyp/texty/kapitola4.csv.
// Tři akty: A (zelená věž, oba), B (každý sám, poslové), C (zase spolu). Hraje se za Rudu i Báru.
(function (koren) {
  'use strict';

  const TYM = (k) => `obsahuje(c2_tym, '${k}')`;
  const CLENOVE = ['pepa', 'vera', 'norbert', 'klara', 'krystof', 'zdenda'];
  const PORADI_POSLU = ['klara', 'krystof', 'zdenda', 'pepa', 'norbert', 'vera'];
  const NAZEV = { pepa: 'postava_pepa', vera: 'postava_vera', norbert: 'postava_norbert', klara: 'postava_klara', zdenda: 'postava_zdenda', krystof: 'postava_krystof' };
  const seznam = (s) => String(s || '').split('-').filter((x) => x && x !== 'zadny');
  const vTymuP = (p, k) => seznam(p.c2_tym).includes(k);
  // Odešlý a ještě nevrácený člen (bez posezení v kap. 3)
  const ODESEL = (k) => `(c3_retro=='ne' && c3_odchazi=='${k}' && !c4_clen_zpet)`;
  const odeselP = (p, k) => p.c3_retro === 'ne' && p.c3_odchazi === k && !p.c4_clen_zpet;
  const JE_POSEL = (k) => `(akt_b && !usmireni && (posel1=='${k}' || posel2=='${k}'))`;
  const V_HANGARU = (k) => `${TYM(k)} && !${ODESEL(k)} && !${JE_POSEL(k)}`;
  const BEZ_VERY = `(!${TYM('vera')} || ${ODESEL('vera')})`;
  const bezVeryP = (p) => !vTymuP(p, 'vera') || odeselP(p, 'vera');
  const DUVERA = "(c1_bara_vyslechnuta>=2 && c2_rozdeleni!='gantt' && c3_vada_hlasena=='ano')";
  const RUDA = "postava()=='ruda'";
  const BARA = "postava()=='bara'";
  const AKT_A = '!akt_b';
  const AKT_B = '(akt_b && !usmireni)';
  const LEHATKO = "c1_babicka!='spojenec'";
  const GANTT = "c2_rozdeleni=='gantt'";
  const BAZEN_V_TRUPU = "(c3_bazen_v_trupu && !obsahuje(c4_obet, 'bazen') && !bazen_ven)";
  const LAVKA_BOD = "obsahuje(c3_nesladeno, 'lavka')";
  const VADA = "c3_vada_hlasena!='ano'";
  const RUDA_HOTOV = '(motory_zkouseny && povoleni_odmitnuto && (c3_rezerva>=0 || plosina))';
  const BARA_HOTOVA = '(plan_komise_hotov && smlouva_ziskana && listky_vytisteny)';
  const jmenoTvora = (creep) => 'ch3_jmeno_' + Math.max(0, Math.min(4, creep || 0));
  const PRES_POSLA = { kdy: AKT_B, akce: 'ch4_pres_posla' };
  // Předá předmět z inventáře jedné postavy druhé (posel, desky s důkazy)
  const predej = (h, od, komu, predmet) => {
    h.s.predmety[od] = h.s.predmety[od].filter((x) => x !== predmet);
    if (!h.s.predmety[komu].includes(predmet)) h.s.predmety[komu].push(predmet);
  };

  // --- lístky skutečnosti (P4.1–P4.6) ----------------------------------------
  // Hlásí se vysílačkou jen v aktu A; Zelenka připne barevný papír přes sklo světla.
  const listek = (id, barvaFn) => (h) => {
    const p = h.s.priznaky;
    if (p.akt_b) { h.rekni('ch4_listek_pozde'); return; }
    if (p['listek_' + id]) { h.rekni('ch4_listek_uz'); return; }
    const barva = barvaFn(p);
    h.nastav('listek_' + id + '=' + barva);
    h.nastav('c4_listky+1');
    h.rekni('ch4_listek_' + id + '_' + barva);
    if (barva !== 'zelena' && !p.papir_pres_sklo) { h.nastav('papir_pres_sklo'); h.rekni('ch4_zelenka_listek_papir'); }
    else h.rekni('ch4_zelenka_listek_' + barva);
    if (p.c4_listky === 4) h.rekni('ch4_pembok_ctyri_listky');
  };
  const LISTEK_RAMPA = listek('rampa', (p) => (p.c3_drolivy || p.c1_babicka !== 'spojenec' ? 'cervena' : p.c3_rezerva < 0 ? 'zluta' : 'zelena'));
  const LISTEK_TRUP = listek('trup', (p) => {
    const n = p.c3_integrace || 0;
    if (n >= 2) return 'cervena';
    if (n === 1 || p.c3_bara_priority === 'ne') return 'zluta';
    return 'zelena';
  });
  const LISTEK_POCITADLO = listek('pocitadlo', (p) => (p.c3_vada_hlasena !== 'ano' ? 'cervena' : (p.c3_dluh || 0) >= 2 ? 'zluta' : 'zelena'));
  // Skupiny, které vědí kudy: obyvatelé (aplikace, ne při gantt), rybáři (místo na udice), babička (jen spojenkyně)
  const skupiny = (p) => ({
    obyvatele: p.c2_rozdeleni !== 'gantt' && (p.c3_hodnota || 0) >= 2,
    rybari: seznam(p.c3_hotove).includes('udice'),
    babicka: p.c1_babicka === 'spojenec' && !seznam(p.c4_obet).includes('tlacitka'),
  });
  const LISTEK_NASTUP = listek('nastup', (p) => { const n = Object.values(skupiny(p)).filter(Boolean).length; return n >= 3 ? 'zelena' : n === 2 ? 'zluta' : 'cervena'; });
  const LISTEK_ZMENY = listek('zmeny', (p) => ((p.c3_creep || 0) >= 2 ? 'cervena' : 'zluta'));
  const LISTEK_TYM = listek('tym', (p) => (p.c3_retro === 'ne' ? 'cervena' : 'zluta'));
  const pritomniClenove = (p) => CLENOVE.filter((k) => vTymuP(p, k) && !odeselP(p, k));
  const TYM_HOTOV = (h) => {
    const p = h.s.priznaky;
    if (p.listek_tym || p.akt_b) return;
    if (pritomniClenove(p).every((k) => p['ptal_' + k])) LISTEK_TYM(h);
  };

  // --- usmíření (P4.27) a konec aktu B -----------------------------------------
  // Spustí se, když jsou obě linky hotové a Bára je v hangáru; dokončí-li se poslední krok jinde,
  // Bára řekne „Jdu za ním.“ a do hangáru přijde střihem (zjednodušení K4 pro prototyp)
  const USMIRENI = { kdy: `akt_b && !usmireni && ${RUDA_HOTOV} && ${BARA_HOTOVA}`, akce: [
    { kdy: "kde('bara')!='hangar'", akce: ['ch4_bara_jdu_za_nim', '^bara=hangar'] },
    { kdy: '!usmireni', akce: ['$usmireni', '^ruda=hangar', 'ch4_usm_strih', 'ch4_usm_ruda_motory', '#usmireni'] }] };
  const BARA_REKNE = { kdy: "c4_bara_rekla=='hned'", akce: 'ch4_usm_bara_uz_vis', jinak: [
    '$c4_bara_rekla=po_usmireni', 'ch4_usm_bara_predseda', 'ch4_usm_desky',
    (h) => { for (const d of ['zaznam', 'plan_komise', 'smlouva']) predej(h, 'bara', 'ruda', d); }] };

  // Plachetnice odložená „Zatím ne“: znovu ji otevře žebřík na palubu
  const M11_ZNOVU = ['ch4_m11_znovu', '@m11'];

  // --- konec kapitoly -----------------------------------------------------------
  const KONEC = [
    '$konec_hotov', '*karta:ch4_ui_zbyva_1', '$dny=1',
    'ch4_konec_archa_ven', 'ch4_konec_vratny', 'ch4_konec_rampa', 'ch4_konec_zarovka', 'ch4_konec_zarovka_zelenka',
    { kdy: "c4_usmireni=='priznal'", akce: ['ch4_konec_zitra_ruda', 'ch4_konec_zitra_bara'], jinak: 'ch4_konec_kazdy_jinde' },
    'ch4_konec_predseda_fronta', { kdy: "c3_krysy=='aktovka'", akce: 'ch4_konec_krysa' }, 'ch4_konec_framework', '*konec'];
  const KONEC_CHECK = { kdy: 'p29_hotovo && p30_hotovo && podpis_startu && !konec_hotov', akce: KONEC };

  // --- P4.29 navigace poklopem --------------------------------------------------
  const OTEVRENO = ['$poklop_otevren', 'ch4_p29_bara_prisla', 'ch4_p29_ruda_drzi', '~bara', '>trup'];
  const P29_KONEC = (h, zbylo) => {
    h.nastav('c4_integrace=' + zbylo);
    h.proved([zbylo ? 'ch4_p29_zbylo' : 'ch4_p29_vse', '$p29_hotovo', 'ch4_p29_ven', '>hangar', '^ruda=hangar', 'ch4_p29_ruda_pustil', '-klic_poklopu', '-plan_zapojeni', KONEC_CHECK]);
  };
  const ukony = (p) => seznam(p.ukony);
  const NAHRAVANI = (h) => {
    const p = h.s.priznaky;
    if (p.p29_hotovo) { h.rekni('ch4_p29_hotovo_uz'); return; }
    if (p.navigace_nahrana) { h.proved(['ch4_p29_dalsi', '#p29_ukon']); return; }
    if (h.plati(BAZEN_V_TRUPU)) { h.proved(['ch4_p29_bazen', 'ch4_p29_bazen_vera']); return; }
    if (p.c3_vada_hlasena !== 'ano' && !h.ma('oprava')) { h.rekni('ch4_p29_bez_opravy'); return; }
    h.proved(['ch4_p29_navigace', '$navigace_nahrana']);
    if (h.ma('oprava')) h.proved(['ch4_p29_oprava', '-oprava']);
    const body = [...new Set(seznam(p.c3_nesladeno).map((b) => b.replace(/_nikdy$/, '')).filter((b) => b !== 'lavka' && b !== 'navigace'))];
    if (!body.length) { P29_KONEC(h, 0); return; }
    h.nastav('ukony=' + body.join('-'));
    h.proved(['ch4_p29_dalsi', '#p29_ukon']);
  };

  // --- P4.30 nástupní zkouška ----------------------------------------------------
  const NASTUP = (h) => {
    const p = h.s.priznaky;
    if (p.p30_hotovo) { h.rekni('ch4_p30_hotovo_uz'); return; }
    if (!p.akt_c) { h.rekni('ch4_p30_jeste_ne'); return; }
    if (p.c1_babicka !== 'spojenec' && !p.babicka_vstala) { h.rekni('ch4_p30_lehatko'); return; }
    if (p.c3_rezerva < 0 && !p.plosina) { h.rekni('ch4_p30_plosina'); return; }
    if (p.c3_drolivy && !p.rampa_pevna) { h.rekni('ch4_p30_droli'); return; }
    if (h.plati(LAVKA_BOD) && !p.lavka_znama) { h.rekni('ch4_p30_lavka'); return; }
    const s = skupiny(p);
    s.babicka = !seznam(p.c4_obet).includes('tlacitka');
    const chybi = Object.keys(s).filter((k) => !s[k]);
    h.proved(['^ruda=staveniste', 'ch4_p30_ruda_prisel', 'ch4_p30_obrys',
      s.obyvatele ? 'ch4_p30_obyvatele_ok' : (p.c2_rozdeleni === 'gantt' ? 'ch4_p30_obyvatele_gantt' : 'ch4_p30_obyvatele_kudy'),
      s.rybari ? 'ch4_p30_rybari_ok' : 'ch4_p30_rybari_ne',
      s.babicka ? 'ch4_p30_babicka_ok' : 'ch4_p30_babicka_ne',
      'ch4_p30_zelenka', 'ch4_p30_fronta', 'ch4_p30_bara_pocita',
      '$c4_nastup=' + (3 - chybi.length), '$c4_nastup_chybi=' + (chybi.join('-') || 'zadny'), '$p30_hotovo', KONEC_CHECK]);
  };

  // --- P4.31 konfrontace a P4.32 podpis -------------------------------------------
  const PODPIS = [
    { kdy: "c4_report=='zelene'", akce: ['ch4_podpis_vaha', { kdy: 'c4_listky>=1', akce: 'ch4_podpis_listky', jinak: 'ch4_podpis_bara_cisla' }], jinak: 'ch4_podpis_pozastavena' },
    'ch4_podpis_podepsal', { kdy: "ma('kopie') || ma('svedectvi')", akce: 'ch4_podpis_noviny' }, '$podpis_startu', KONEC_CHECK];
  const KONF_KONEC = [
    'ch4_konf_schvaloval', 'ch4_konf_kufr',
    { kdy: "c4_bara_rekla=='hned'", akce: 'ch4_konf_listek_bara', jinak: ['^bara=komise', 'ch4_konf_bara_konec', 'ch4_konf_listek_ruda'] },
    'ch4_konf_fronta', 'ch4_konf_framework', 'ch4_konf_krize',
    { kdy: "c3_krysy=='aktovka'", akce: 'ch4_konf_krysy' }, { kdy: "c3_krysy=='kocka'", akce: 'ch4_konf_kocka' },
    { kdy: "c1_babicka=='spojenec'", akce: 'ch4_konf_babicka' }, 'ch4_pembok_konfrontace', '$vymluva=4', ...PODPIS];
  const DALSI_VYMLUVA = (h) => {
    const n = (h.s.priznaky.vymluva || 1) + 1;
    if (n <= 3) { h.nastav('vymluva=' + n); h.rekni('ch4_konf_vymluva_' + n); } else h.proved(KONF_KONEC);
  };
  const KONF_START = { kdy: 'akt_c', akce: { kdy: '!konfrontace', akce: [
    '$konfrontace', '$vymluva=1', '^ruda=komise', 'ch4_konf_starosta_prisel',
    { kdy: "c4_bara_rekla=='hned'", akce: ['^bara=komise', 'ch4_konf_bara_prisla'], jinak: 'ch4_konf_ruda_sam' },
    'ch4_konf_uvod', 'ch4_konf_vymluva_1'],
    jinak: { kdy: 'vymluva<=3', akce: (h) => h.rekni('ch4_konf_vymluva_' + h.s.priznaky.vymluva), jinak: 'ch4_predseda_po_konfrontaci' } } };
  const DUKAZ = (predmet, n) => ({ kdy: `konfrontace && vymluva==${n}`, akce: ['-' + predmet, 'ch4_konf_dukaz_' + n, DALSI_VYMLUVA],
    jinak: { kdy: 'konfrontace && vymluva<=3', akce: { stridat: ['ch4_konf_faze2_1', 'ch4_konf_faze2_2', 'ch4_konf_faze2_3'] }, jinak: 'ch4_predseda_' + predmet + '_driv' } });
  const KOPIE_DUKAZ = { kdy: 'konfrontace && vymluva<=3', akce: ['-kopie', 'ch4_konf_kopie', DALSI_VYMLUVA], jinak: 'ch4_predseda_kopie_driv' };

  // Starosta přijede hned po zprávě a souboj začne rovnou (P4.8); Bára přijde střihem
  const M03_START = ['ch4_m03_zacatek', { kdy: "!rekl('ch4_pembok_rada_souboj')", akce: 'ch4_pembok_rada_souboj' }, '^bara=vez', '@m03'];

  // --- rozkol (po R4.2) -------------------------------------------------------------
  const ROZKOL = [
    (h) => {
      const p = h.s.priznaky;
      const [a, b] = PORADI_POSLU.filter((k) => vTymuP(p, k) && !odeselP(p, k));
      h.nastav('posel1=' + a);
      h.nastav('posel2=' + b);
    },
    'ch4_rozkol_ruda_zamykam', 'ch4_rozkol_bara_prepracovat', 'ch4_rozkol_ruda_ne',
    { kdy: DUVERA, akce: ['ch4_rozkol_ticho_1', 'ch4_rozkol_ticho_2'], jinak: ['ch4_rozkol_hlasite_1', 'ch4_rozkol_hlasite_2'] },
    'ch4_rozkol_vysilacka', '$akt_b', '$dny=5', '^bara=dilna',
    (h) => h.rekni('ch4_rozkol_posli', [NAZEV[h.s.priznaky.posel1], NAZEV[h.s.priznaky.posel2]]),
    '*karta:ch4_ui_zbyva_5', 'ch4_strih_5', 'ch4_pembok_posel'];

  // --- posel: co dělá ta druhá ----------------------------------------------------------
  const POSEL_O_BARE = (h) => {
    const p = h.s.priznaky;
    if (h.plati(BARA_HOTOVA)) h.rekni('ch4_posel_bara_hotova');
    else if (!p.listky_vytisteny) h.rekni('ch4_posel_bara_tiskne');
    else if (!p.plan_komise_hotov) h.rekni('ch4_posel_bara_archiv');
    else h.rekni('ch4_posel_bara_komise');
    if (h.plati(LAVKA_BOD) && !p.rozpis_u_bary) h.rekni('ch4_posel_bara_lavka');
  };
  const POSEL_O_RUDOVI = (h) => {
    const p = h.s.priznaky;
    if (h.plati(RUDA_HOTOV)) h.rekni('ch4_posel_ruda_hotov');
    else if (!p.motory_zkouseny) h.rekni('ch4_posel_ruda_motory');
    else if (!p.povoleni_odmitnuto) h.rekni('ch4_posel_ruda_komise');
    else h.rekni('ch4_posel_ruda_plosina');
    if (p.ruda_chce_pasku && !p.poklop_utesnen) h.rekni('ch4_posel_ruda_paska');
    if (p.ruda_chce_listek && !p.babicka_vstala) h.rekni('ch4_posel_ruda_listek');
    if (h.plati(LAVKA_BOD) && !p.rozpis_u_bary) h.rekni('ch4_posel_rozpis_kapsa');
  };
  const poselNese = (h, komu) => h.rekni('ch4_posel_nese_' + (h.s.scena === 'staveniste' ? h.s.priznaky.posel2 : h.s.priznaky.posel1), [NAZEV[komu]]);
  // Předmět na posla: druhá postava ho má hned
  const POSEL_NA_RUDA = {
    rozpis: { kdy: LAVKA_BOD + ' && !rozpis_u_bary', akce: [(h) => { poselNese(h, 'bara'); h.s.predmety.bara.push('rozpis'); }, '$rozpis_u_bary', 'ch4_posel_rozpis_vratil'], jinak: 'ch4_posel_rozpis_netreba' },
    kava: 'ch4_posel_kava', pembok: 'ch4_posel_pembok', krabice: 'ch4_posel_krabice', klic_start: 'ch4_posel_klic_start',
    listek_babicka: 'ch4_posel_listek_zpet', denik: 'ch4_posel_denik', plan: 'ch4_posel_plan', paska: 'ch4_posel_paska_zpet',
  };
  const POSEL_NA_BARA = {
    listky: { kdy: LEHATKO + ' && !babicka_vstala', akce: { kdy: 'listek_babicka_poslan', akce: 'ch4_posel_listek_uz', jinak: [(h) => { poselNese(h, 'ruda'); h.s.predmety.ruda.push('listek_babicka'); }, '$listek_babicka_poslan', 'ch4_posel_listek_jeden'] }, jinak: 'ch4_posel_listky_ne' },
    paska: { kdy: "c3_poklop=='netesni' && !poklop_utesnen", akce: [(h) => { poselNese(h, 'ruda'); predej(h, 'bara', 'ruda', 'paska'); }, '$paska_poslana', 'ch4_posel_paska'], jinak: 'ch4_posel_paska_netreba' },
    plan_komise: { kdy: '!c4_bara_rekla', akce: { kdy: DUVERA, akce: ['ch4_posel_vzkaz_hned', '$c4_bara_rekla=hned', 'ch4_posel_vzkaz_nese'], jinak: 'ch4_posel_vzkaz_jeste_ne' }, jinak: 'ch4_posel_vzkaz_uz' },
    seznam: 'ch4_posel_seznam', oprava: 'ch4_posel_oprava', metr: 'ch4_posel_metr', minutka: 'ch4_posel_minutka', zaznam: 'ch4_posel_zaznam', smlouva: 'ch4_posel_smlouva', rozpis: 'ch4_posel_rozpis_bara',
  };
  const posel = (k, scena, r) => ({
    id: 'posel_' + k, nazev: NAZEV[k], druh: 'postava', r,
    kdy: `${AKT_B} && (${scena === 'staveniste' ? 'posel2' : 'posel1'}=='${k}')`,
    prohlednout: 'ch4_posel_prohlednout', bara_prohlednout: 'ch4_posel_prohlednout_bara',
    pouzit: '#posel', bara_pouzit: '#posel', na: POSEL_NA_RUDA, bara_na: POSEL_NA_BARA,
  });
  const posli = (scena, r) => PORADI_POSLU.filter((k) => k !== 'vera').map((k) => posel(k, scena, r));

  // --- druhá postava ve scéně ----------------------------------------------------------
  // V aktu A a C si předměty předávají přímo (rozpis, lístek pro babičku a páska jdou i mimo posla)
  const PRIMO_RUDA = {
    kava: 'ch4_bara_kava', denik: 'ch4_bara_denik', pembok: 'ch4_bara_pembok',
    rozpis: { kdy: LAVKA_BOD + ' && !rozpis_u_bary', akce: ['ch4_bara_rozpis_primo', '$rozpis_u_bary', (h) => { if (!h.s.predmety.bara.includes('rozpis')) h.s.predmety.bara.push('rozpis'); }], jinak: 'ch4_bara_rozpis_zna' },
  };
  const PRIMO_BARA = {
    seznam: 'ch4_ruda_seznam_jeste_ne', metr: 'ch4_ruda_metr', plan_komise: 'ch4_ruda_plan_komise',
    listky: { kdy: `${LEHATKO} && !babicka_vstala && !listek_babicka_poslan`, akce: ['ch4_ruda_listky_babicka', '$listek_babicka_poslan', (h) => { if (!h.s.predmety.ruda.includes('listek_babicka')) h.s.predmety.ruda.push('listek_babicka'); }], jinak: 'ch4_ruda_listky' },
    paska: { kdy: "c3_poklop=='netesni' && !poklop_utesnen", akce: ['ch4_ruda_paska_primo', (h) => predej(h, 'bara', 'ruda', 'paska')], jinak: 'ch4_ruda_dik_ne' },
  };
  const DRUHE_NA_RUDA = {};
  for (const i of ['pembok', 'kava', 'kavove_pero', 'propiska', 'krabice', 'plan', 'rozpis', 'kopie', 'denik', 'klic_start', 'listek_babicka', 'paska', 'klic_poklopu', 'plan_zapojeni', 'svedectvi', 'zaznam', 'plan_komise', 'smlouva']) {
    DRUHE_NA_RUDA[i] = { kdy: AKT_B, akce: 'ch4_pres_posla', jinak: PRIMO_RUDA[i] || 'ch4_bara_dik_ne' };
  }
  const DRUHE_NA_BARA = {};
  for (const i of ['metr', 'seznam', 'minutka', 'zaznam', 'plan_komise', 'smlouva', 'listky', 'paska', 'oprava', 'rozpis']) {
    DRUHE_NA_BARA[i] = { kdy: AKT_B, akce: 'ch4_pres_posla_bara', jinak: PRIMO_BARA[i] || 'ch4_ruda_dik_ne' };
  }
  const druha = (scena, r) => [
    { id: 'bara', nazev: 'postava_bara', druh: 'postava', postava: 'ruda', kdy: `kde('bara')=='${scena}'`, r, obraz: 'postava_bara',
      prohlednout: { kdy: AKT_B, akce: 'ch4_bara_prohlednout_b', jinak: 'ch4_bara_prohlednout' },
      pouzit: { kdy: AKT_B, akce: 'ch4_ruda_nemluvim', jinak: '#bara' }, na: DRUHE_NA_RUDA },
    { id: 'ruda', nazev: 'postava_ruda', druh: 'postava', postava: 'bara', kdy: `kde('ruda')=='${scena}'`, r: [r[0] + 7, r[1], r[2], r[3]],
      bara_prohlednout: { kdy: AKT_B, akce: 'ch4_ruda_prohlednout_b', jinak: 'ch4_ruda_prohlednout' },
      bara_pouzit: { kdy: AKT_B, akce: 'ch4_bara_nemluvim', jinak: { kdy: 'akt_c', akce: 'ch4_ruda_mluvit_c', jinak: { stridat: ['ch4_ruda_navsteva_1', 'ch4_ruda_navsteva_2'] } } },
      bara_na: DRUHE_NA_BARA },
  ];

  // --- tým v hangáru ------------------------------------------------------------------------
  const KLIC_PRO_RUDU = (h) => { const k = h.s.priznaky.c3_poklop === 'ne' ? 'plan_zapojeni' : 'klic_poklopu'; if (!h.s.predmety.ruda.includes(k)) h.s.predmety.ruda.push(k); };
  const clenTymu = (k, r) => ({
    id: k, nazev: NAZEV[k], druh: 'postava', r, kdy: V_HANGARU(k),
    prohlednout: 'ch4_tym_' + k + '_prohlednout', bara_prohlednout: 'ch4_tym_' + k + '_prohlednout',
    pouzit: '#tym_' + k, bara_pouzit: 'ch4_bara_tym',
    na: {
      kava: 'ch4_tym_kava', pembok: 'ch4_tym_pembok', rozpis: 'ch4_tym_rozpis',
      ...(k === 'vera' ? { plan_zapojeni: { kdy: 'akt_c && !poklop_otevren', akce: ['ch4_vrtani_vera', ...OTEVRENO], jinak: 'ch4_vera_plan_driv' }, denik: 'ch4_vera_denik' } : {}),
      ...(k === 'pepa' ? { plan: 'ch4_pepa_plan' } : {}),
    },
    bara_na: { metr: 'ch4_tym_metr' },
  });

  const data = {
    kapitola: 4,
    nazev: 'ch4_ui_kapitola',
    ukol: 'ch4_ui_ukol',
    dny: 'ch1_ui_kometa_dny',
    pamet_nadpis: 'ch2_pamet_nadpis',
    nese: '^c[123]_',
    bara_chodi: true,
    prepinani: 'prepinani',
    // Stav z kapitol 1–3 (04-pruchod.md: výchozí stav nejkratší cesty a „špatné“ kapitoly)
    predvolby: {
      dobra: {
        popis: 'Dobré kapitoly 1 až 3 (04-pruchod.md, nejkratší cesta)',
        priznaky: {
          c1_bara_vyslechnuta: 3, c1_slib_vseho: 0, c1_mimo_rozsah: true, c1_faze2: 0, c1_razitko: 'poduska', c1_babicka: 'spojenec', c1_zmena_dohoda: true, c1_charter_kvalita: 3, c1_seznam_pasazeru: true,
          c2_tym: 'pepa-vera-norbert-klara', c2_tym_pokryti: 3, c2_rozdeleni: 'povaha', c2_vyjimky: 2, c2_interier: 'bara', c2_bezpecnost: 'ruda',
          c2_riziko_predem: 'lano', c2_rizika_zapsana: 'krysy-lano-usmev', c2_odhad: 'realny', c2_rozpad: 0, c2_mosty: 'trup-nastup-start',
          c3_rezerva: 2, c3_krysy: 'aktovka', c3_hodnota: 3, c3_hotove: 'sipky-mapa-maketa-tlacitka-udice-kocour', c3_kolo1: 'sipky-mapa-maketa', c3_dluh: 0,
          c3_vada_hlasena: 'ano', c3_creep: 0, c3_bazen: 'vyjednan', c3_svaciny: 'seznam', c3_poklop: 'ano', c3_bara_priority: 'ano',
          c3_integrace: 0, c3_odchazi: 'pepa', c3_retro: 'ano', c3_zlepseni: 'bara',
        },
        predmety: ['pembok', 'kava', 'kavove_pero', 'krabice', 'plan'],
      },
      spatna: {
        popis: 'Špatné kapitoly 1 až 3 (04-pruchod.md, varianty)',
        priznaky: {
          c1_bara_vyslechnuta: 0, c1_slib_vseho: 3, c1_faze2: true, c1_razitko: 'kava', c1_babicka: 'prehlizena', c1_charter_kvalita: 1, c1_seznam_pasazeru: true,
          c2_tym: 'zdenda-krystof-pepa-vera', c2_tym_pokryti: 2, c2_rozdeleni: 'gantt', c2_vyjimky: 0,
          c2_riziko_predem: 'usmev', c2_rizika_zapsana: 'krysy-lano-usmev', c2_odhad: 'kotva', c2_rozpad: 3, c2_mosty: 'start',
          c3_rezerva: -1, c3_krysy: 'aktovka', c3_hodnota: 2, c3_hotove: 'odpocet-heslo-mapa-tlacitka-sipky-maketa', c3_kolo1: 'odpocet-heslo-mapa', c3_dluh: 2,
          c3_vada_hlasena: 'ne', c3_creep: 3, c3_bazen: 'bez_rizeni', c3_bazen_v_trupu: true, c3_svaciny: 'seznam', c3_poklop: 'ne', c3_bara_priority: 'ne',
          c3_integrace: 3, c3_nesladeno: 'navigace-pocitadlo-lavka', c3_odchazi: 'pepa', c3_retro: 'ne',
        },
        predmety: ['pembok', 'kava', 'propiska', 'krabice', 'plan', 'kopie'],
      },
    },

    start: {
      scena: 'vez',
      priznaky: { dny: 7, pembok_otevren: true, c4_listky: 0 },
      predmety: ['pembok', 'kava', 'kavove_pero', 'krabice', 'plan'],
      predmety_bara: ['metr', 'seznam'],
      kde: { bara: 'vez' },
      akce: [
        '*karta:ch4_ui_kapitola',
        // Rozpis rampy z kap. 3 a kopie podpisů na úsměv (D81): přehrávač je mezi kapitolami neuloží
        { kdy: "!ma('rozpis')", akce: '+rozpis' },
        { kdy: "c2_riziko_predem=='usmev' && !ma('kopie')", akce: '+kopie' },
        'ch4_uvod_noc', 'ch4_uvod_amplion', 'ch4_uvod_ruda_devet', 'ch4_uvod_pembok_gantty',
        'ch4_uvod_vez', 'ch4_uvod_zelenka', 'ch4_uvod_jestetoto', 'ch4_uvod_zmena_okno',
        'ch4_uvod_bara_stitek', { kdy: "c3_zlepseni=='bara'", akce: ['ch4_uvod_bara_cte_1', 'ch4_uvod_bara_cte_2'] },
        'ch4_uvod_pembok_nadeje', 'ch4_uvod_zelenka_vysilacky', '$prepinani', '*karta:ch4_ui_ukol'],
    },

    predmety: {
      pembok: { nazev: 'predmet_pembok', prohlednout: 'predmet_pembok_prohlednout', pouzit: '?' },
      kava: { nazev: 'predmet_kava', prohlednout: 'ch4_kava_prohlednout' },
      kavove_pero: { nazev: 'predmet_kavove_pero', prohlednout: 'predmet_kavove_pero_prohlednout' },
      propiska: { nazev: 'predmet_propiska', prohlednout: 'predmet_propiska_prohlednout' },
      krabice: { nazev: 'predmet_krabice', prohlednout: 'ch4_krabice_prohlednout' },
      plan: { nazev: 'predmet_plan', prohlednout: 'ch4_plan_prohlednout' },
      rozpis: { nazev: 'predmet_rozpis', prohlednout: { kdy: BARA, akce: 'ch4_rozpis_bara_prohlednout', jinak: 'ch4_rozpis_prohlednout' } },
      kopie: { nazev: 'predmet_kopie', prohlednout: 'ch4_kopie_prohlednout' },
      denik: { nazev: 'predmet_denik', prohlednout: { kdy: 'c3_drolivy', akce: 'predmet_denik_prohlednout_ukazky', jinak: 'predmet_denik_prohlednout' } },
      klic_start: { nazev: 'predmet_klic_start', prohlednout: 'predmet_klic_start_prohlednout' },
      listek_babicka: { nazev: 'predmet_listek_babicka', prohlednout: 'predmet_listek_babicka_prohlednout' },
      paska: { nazev: 'predmet_paska', prohlednout: 'predmet_paska_prohlednout' },
      klic_poklopu: { nazev: 'predmet_klic_poklopu', prohlednout: 'predmet_klic_poklopu_prohlednout' },
      plan_zapojeni: { nazev: 'predmet_plan_zapojeni', prohlednout: 'predmet_plan_zapojeni_prohlednout' },
      svedectvi: { nazev: 'predmet_svedectvi', prohlednout: 'predmet_svedectvi_prohlednout' },
      // Bářiny předměty
      metr: { nazev: 'predmet_metr', prohlednout: 'predmet_metr_prohlednout', pouzit: '?' },
      seznam: { nazev: 'predmet_seznam', prohlednout: 'ch4_seznam_prohlednout' },
      minutka: { nazev: 'predmet_minutka', prohlednout: 'predmet_minutka_prohlednout' },
      zaznam: { nazev: 'predmet_zaznam', prohlednout: 'predmet_zaznam_prohlednout' },
      plan_komise: { nazev: 'predmet_plan_komise', prohlednout: 'predmet_plan_komise_prohlednout' },
      smlouva: { nazev: 'predmet_smlouva', prohlednout: 'predmet_smlouva_prohlednout' },
      listky: { nazev: 'predmet_palubni_listky', prohlednout: { kdy: GANTT, akce: 'predmet_palubni_listky_papir', jinak: 'predmet_palubni_listky_prohlednout' } },
      oprava: { nazev: 'predmet_oprava', prohlednout: 'predmet_oprava_prohlednout' },
    },

    kombinace: [
      { a: 'propiska', b: 'kava', akce: ['ch1_kombinace_pero_1', 'ch1_kombinace_pero_2', '-propiska', '+kavove_pero'] },
      { a: 'denik', b: 'rozpis', akce: ['ch4_denik_rozpis', LISTEK_RAMPA] },
      { a: 'zaznam', b: 'seznam', akce: ['ch4_plan_komise_1', 'ch4_plan_komise_2', 'ch4_plan_komise_3', '-seznam', '+plan_komise', '$plan_komise_hotov', USMIRENI] },
      { a: 'plan', b: 'smlouva', akce: 'ch4_kombinace_plan_smlouva' },
      { a: 'krabice', b: 'kopie', akce: 'ch4_kombinace_krabice_kopie' },
      { a: 'denik', b: 'krabice', akce: 'ch4_kombinace_denik_krabice' },
    ],

    sceny: {
      // S1 Řídicí věž (nové pozadí)
      vez: {
        nazev: 'Řídicí věž',
        mista: [
          { id: 'tabule', nazev: 'ch4_hs_tabule', r: [30, 6, 40, 24],
            prohlednout: (h) => h.rekni(h.s.priznaky.c4_listky ? 'ch4_tabule_listky' : 'ch4_tabule_zelena', [String(h.s.priznaky.c4_listky)]),
            bara_prohlednout: 'ch4_tabule_bara',
            na: { kava: 'ch4_tabule_kava', pembok: 'ch4_tabule_pembok', kavove_pero: 'ch4_tabule_pero', krabice: 'ch4_tabule_krabice', plan: 'ch4_tabule_plan', rozpis: 'ch4_tabule_rozpis', denik: 'ch4_tabule_denik', paska: 'ch4_tabule_paska', kopie: 'ch4_tabule_kopie' },
            bara_na: { metr: 'ch4_tabule_metr', seznam: 'ch4_tabule_seznam', listky: 'ch4_tabule_listky_bara', minutka: 'ch4_tabule_minutka' } },
          ...['rampa', 'trup', 'mista', 'nastup', 'zmeny', 'tym'].map((id, i) => ({
            id: 'stitek_' + id, nazev: 'ch4_hs_stitek_' + id, r: [31 + i * 6.5, 31, 6, 5],
            prohlednout: 'ch4_stitek_' + id, bara_prohlednout: ['ch4_stitek_' + id, 'ch4_stitek_' + id + '_bara'] })),
          { id: 'zelenka', nazev: 'postava_zelenka', druh: 'postava', r: [74, 36, 7, 36],
            prohlednout: 'ch4_zelenka_prohlednout', pouzit: '#zelenka', bara_pouzit: '#zelenka',
            na: { kava: 'ch4_zelenka_kava', pembok: 'ch4_zelenka_pembok', krabice: 'ch4_tabule_krabice', denik: 'ch4_tabule_denik', rozpis: 'ch4_tabule_rozpis' },
            bara_na: { metr: 'ch4_tabule_metr', listky: 'ch4_tabule_listky_bara' } },
          { id: 'telegraf', nazev: 'ch4_hs_telegraf', r: [4, 44, 10, 18],
            prohlednout: { kdy: 'c4_report', akce: 'ch4_telegraf_po', jinak: 'ch4_telegraf' },
            pouzit: { kdy: 'c4_report', akce: 'ch4_telegraf_odeslano', jinak: ['ch4_telegraf_uvod', { kdy: 'c4_listky<4', akce: 'ch4_pembok_malo_listku' }, '#telegraf'] },
            bara_pouzit: 'ch4_telegraf_bara', bara_prohlednout: 'ch4_telegraf_bara',
            na: { kava: 'ch4_telegraf_kava', pembok: 'ch4_telegraf_pembok', plan: 'ch4_telegraf_plan', kavove_pero: 'ch4_telegraf_pero' } },
          { id: 'tabule_rozsahu', nazev: 'ch4_hs_tabule_rozsahu', kdy: 'souboj_hotovo', r: [16, 8, 12, 24],
            prohlednout: { kdy: 'akt_b', akce: 'ch4_rozsah_po', jinak: 'ch4_rozsah_prohlednout' },
            pouzit: { kdy: 'akt_b', akce: 'ch4_rozsah_po', jinak: ['ch4_r42_uvod', '@r42'] },
            bara_pouzit: 'ch4_rozsah_bara', bara_prohlednout: 'ch4_rozsah_bara' },
          { id: 'zarovky', nazev: 'ch4_hs_zarovky', r: [84, 70, 10, 12],
            prohlednout: 'ch4_zarovky', pouzit: 'ch4_zarovky_vzit', bara_prohlednout: 'ch4_zarovky_bara', bara_pouzit: 'ch4_zarovky_vzit_bara' },
          { id: 'okno', nazev: 'ch4_hs_okno', r: [4, 8, 10, 30],
            prohlednout: { kdy: AKT_B, akce: 'ch4_okno_b', jinak: 'ch4_okno' }, bara_prohlednout: 'ch4_okno_bara' },
          { id: 'starosta', nazev: 'postava_starosta', druh: 'postava', kdy: 'starosta_prijel && !akt_b', r: [56, 40, 7, 36], obraz: 'postava_starosta',
            prohlednout: { kdy: "c4_report=='zelene'", akce: 'ch4_starosta_nuzky', jinak: 'ch4_starosta_proc' },
            pouzit: { kdy: 'souboj_hotovo', akce: '#starosta_znovu', jinak: M03_START },
            bara_pouzit: 'ch4_bara_starosta', bara_prohlednout: 'ch4_bara_starosta',
            na: { pembok: 'ch4_starosta_pembok', plan: 'ch4_starosta_plan', kavove_pero: 'ch4_starosta_pero', denik: 'ch4_starosta_denik', kopie: 'ch4_starosta_kopie' } },
          { id: 'jestetoto_vez', nazev: 'postava_jestetoto', druh: 'postava', kdy: "!byl('staveniste')", r: [66, 22, 6, 8],
            prohlednout: 'ch4_jestetoto_vez', bara_prohlednout: 'ch4_jestetoto_vez', pouzit: 'ch4_jestetoto_mluvit', bara_pouzit: 'ch4_jestetoto_mluvit',
            na: { kava: 'ch4_jestetoto_kava', krabice: 'ch4_jestetoto_krabice', pembok: 'ch4_jestetoto_pembok' }, bara_na: { metr: 'ch4_jestetoto_vez_metr' } },
          { id: 'schody', stitek: true, nazev: 'ch4_hs_schody_dolu', druh: 'vychod', vychod: 'staveniste', r: [0, 70, 10, 28] },
          ...druha('vez', [18, 60, 5, 24]),
        ],
      },

      // S2 Staveniště rampy (večer)
      staveniste: {
        nazev: 'Staveniště rampy',
        mista: [
          { id: 'rampa', nazev: 'ch2_hs_rampa', r: [30, 4, 40, 20],
            prohlednout: { kdy: 'c3_drolivy && !rampa_pevna', akce: 'ch4_rampa_droli', jinak: { kdy: 'c3_rezerva<0 && !plosina', akce: 'ch4_rampa_bez_plosiny', jinak: { kdy: 'p30_hotovo', akce: 'ch4_rampa_obrys', jinak: 'ch4_rampa_hotova' } } },
            bara_prohlednout: 'ch4_rampa_bara' },
          { id: 'lavka', nazev: 'ch4_hs_lavka', r: [70, 14, 12, 8],
            prohlednout: { kdy: "c1_babicka=='spojenec'", akce: 'ch4_lavka_spojenec', jinak: 'ch4_lavka_plot' },
            bara_prohlednout: 'ch4_lavka_bara',
            bara_pouzit: { kdy: 'listek_nastup', akce: 'ch4_lavka_uz', jinak: { kdy: '!obyvatele_ptano', akce: 'ch4_lavka_nejdriv', jinak: ['ch4_lavka_zkusime', LISTEK_NASTUP] } },
            pouzit: 'ch4_lavka_ruda', na: { rozpis: 'ch4_lavka_rozpis' }, bara_na: { metr: 'ch4_lavka_metr', listky: NASTUP, seznam: 'ch4_obyvatele_seznam' } },
          { id: 'vratny', nazev: 'postava_vratny', druh: 'postava', r: [52, 30, 6, 30], obraz: 'postava_vratny',
            prohlednout: 'ch4_vratny_prohlednout', pouzit: '#vratny', bara_prohlednout: 'ch4_bara_vratny', bara_pouzit: 'ch4_vratny_bara',
            na: {
              kava: 'ch4_vratny_kava', klic_start: 'ch4_vratny_klic_start', pembok: 'ch4_vratny_pembok', rozpis: 'ch4_vratny_rozpis', plan: 'ch4_vratny_plan',
              denik: { kdy: `c3_drolivy && !rampa_pevna && akt_b && ${BEZ_VERY}`, akce: ['ch4_vratny_denik_droleni_1', 'ch4_vratny_denik_droleni_2', '$rampa_pevna'],
                jinak: { kdy: 'c3_drolivy && !rampa_pevna', akce: 'ch4_vratny_denik_vera', jinak: 'ch4_vratny_denik_zpet' } },
            } },
          { id: 'sud', nazev: 'ch4_hs_sud', kdy: 'akt_b && !palivo', r: [20, 60, 7, 12],
            prohlednout: 'ch4_sud', pouzit: 'ch4_sud_zvednout', bara_prohlednout: 'ch4_sud_bara', bara_pouzit: 'ch4_sud_bara', na: { kava: 'ch4_sud_kava', pembok: 'ch4_sud_pembok' } },
          { id: 'obyvatele', nazev: 'ch2_hs_obyvatele', druh: 'postava', r: [60, 50, 11, 28],
            prohlednout: { kdy: 'p30_hotovo', akce: 'ch4_obyvatele_po', jinak: 'ch4_obyvatele_prohlednout' }, bara_prohlednout: 'ch4_obyvatele_bara',
            pouzit: 'ch4_obyvatele_kudy_ruda',
            bara_pouzit: { kdy: 'obyvatele_ptano', akce: { kdy: 'p30_hotovo', akce: 'ch4_obyvatele_po', jinak: 'ch4_obyvatele_cekaji' }, jinak: [
              'ch4_obyvatele_otazka',
              { kdy: GANTT, akce: 'ch4_obyvatele_gantt', jinak: { kdy: 'c3_hodnota>=2', akce: 'ch4_obyvatele_vedi', jinak: 'ch4_obyvatele_nevedi' } },
              { kdy: "c3_svaciny=='schvalovani'", akce: 'ch4_obyvatele_svacina' },
              'ch4_obyvatele_letaky', '$obyvatele_ptano'] },
            na: { plan: 'ch4_obyvatele_plan', listek_babicka: 'ch4_obyvatele_listek' },
            bara_na: { listky: NASTUP, seznam: 'ch4_obyvatele_seznam', metr: 'ch4_obyvatele_metr' } },
          { id: 'rybari', nazev: 'ch3_hs_rybari', druh: 'postava', r: [86, 50, 10, 18],
            prohlednout: 'ch4_rybari_prohlednout', bara_prohlednout: 'ch4_rybari_prohlednout',
            pouzit: { kdy: 'bazen_ven', akce: 'ch4_rybari_ryby', jinak: 'ch4_rybari_udice' }, bara_pouzit: { kdy: 'bazen_ven', akce: 'ch4_rybari_ryby', jinak: 'ch4_rybari_udice' },
            bara_na: { listky: NASTUP } },
          { id: 'babicka', nazev: 'postava_babicka', druh: 'postava', r: [76, 28, 7, 20], obraz: 'postava_babicka',
            kdy: "c1_babicka=='spojenec' || !babicka_vstala",
            prohlednout: { kdy: "c1_babicka=='spojenec'", akce: 'ch4_babicka_spojenec_prohlednout', jinak: { kdy: "c1_babicka=='odmitnuta'", akce: 'ch4_babicka_cedule', jinak: 'ch4_babicka_noviny' } },
            bara_prohlednout: { kdy: "c1_babicka=='spojenec'", akce: 'ch4_babicka_spojenec_prohlednout', jinak: 'ch4_babicka_bara' },
            pouzit: { kdy: "c1_babicka=='spojenec'", akce: { kdy: '!buchta_dana', akce: ['ch4_babicka_spojenec_1', 'ch4_babicka_spojenec_buchta', '$buchta_dana'], jinak: 'ch4_babicka_spojenec_2' }, jinak: '#babicka' },
            bara_pouzit: { kdy: "c1_babicka=='spojenec'", akce: 'ch4_babicka_spojenec_bara', jinak: 'ch4_babicka_bara_mluvit' },
            na: {
              listek_babicka: { kdy: '!babicka_vyslechnuta', akce: 'ch4_babicka_listek_nejdriv', jinak: { kdy: "c1_babicka=='odmitnuta' && !kocour_u_rudy", akce: 'ch4_babicka_listek_kocour',
                jinak: ['ch4_babicka_listek_1', 'ch4_babicka_listek_2', '-listek_babicka', '$babicka_vstala', 'ch4_babicka_bali'] } },
              kava: 'ch4_babicka_kava', plan: 'ch4_babicka_gantt', rozpis: 'ch4_babicka_rozpis', pembok: 'ch4_babicka_pembok',
            },
            bara_na: { listky: { kdy: "c1_babicka=='spojenec'", akce: 'ch4_babicka_listky_srdce', jinak: 'ch4_babicka_listky_ruda' }, plan_komise: 'ch4_babicka_plan_komise', metr: 'ch4_babicka_metr' } },
          { id: 'kocour', nazev: 'postava_kocour', druh: 'postava', kdy: "c1_babicka!='odmitnuta'", r: [84, 22, 5, 8], obraz: 'postava_kocour',
            prohlednout: 'ch4_kocour_plot', pouzit: 'ch4_kocour_mluvit', bara_prohlednout: 'ch4_kocour_plot' },
          { id: 'bedneni', nazev: 'ch4_hs_bedneni', kdy: 'c3_rezerva<0 && !plosina', r: [60, 4, 10, 10],
            prohlednout: 'ch4_bedneni', bara_prohlednout: 'ch4_bedneni_bara', pouzit: 'ch4_bedneni_pouzit' },
          { id: 'prasklina', nazev: 'ch4_hs_prasklina', kdy: 'c3_drolivy && !rampa_pevna', r: [44, 20, 8, 6],
            prohlednout: 'ch4_prasklina', bara_prohlednout: 'ch4_prasklina_bara', na: { kava: 'ch4_prasklina_kava', denik: 'ch4_prasklina_denik' } },
          { id: 'rozpis_plot', nazev: 'ch3_hs_rozpis_plot', r: [84, 36, 8, 10], prohlednout: 'ch4_rozpis_plot', bara_prohlednout: 'ch4_rozpis_plot_bara' },
          { id: 'sklad', nazev: 'ch2_hs_dvere_skladu', r: [72, 36, 7, 26],
            prohlednout: { kdy: "c3_krysy=='kocka'", akce: 'ch4_sklad_kocka', jinak: { kdy: "c3_krysy=='aktovka'", akce: 'ch4_sklad_aktovka', jinak: 'ch4_sklad_zavreno' } },
            pouzit: 'ch4_sklad_pouzit', bara_pouzit: 'ch4_sklad_pouzit' },
          { id: 'kometa', nazev: 'ch1_hs_kometa', r: [74, 2, 12, 12], prohlednout: 'ch4_kometa', bara_prohlednout: 'ch4_kometa_bara' },
          ...posli('staveniste', [8, 40, 5, 26]),
          { id: 'schody_vez', stitek: true, nazev: 'ch4_hs_schody_vez', druh: 'vychod', vychod: 'vez', r: [2, 4, 12, 30] },
          { id: 'brana', stitek: true, nazev: 'ch3_hs_brana_hangar', druh: 'vychod', vychod: 'hangar', r: [2, 36, 12, 34] },
          // Přechod Na radnici: v prototypu dva přímé východy se střihem přes náměstí a vestibul
          { id: 'radnice_archiv', stitek: true, nazev: 'ch4_hs_radnice_archiv', druh: 'vychod', r: [86, 80, 6, 18], pouzit: ['ch4_radnice_strih', '>archiv'], bara_pouzit: ['ch4_radnice_strih', '>archiv'] },
          { id: 'radnice_komise', stitek: true, nazev: 'ch4_hs_radnice_komise', druh: 'vychod', r: [92, 80, 6, 18], pouzit: ['ch4_radnice_strih', '>komise'], bara_pouzit: ['ch4_radnice_strih', '>komise'] },
          ...druha('staveniste', [16, 74, 5, 22]),
        ],
      },

      // S3 Hangár s Archou (večer)
      hangar: {
        nazev: 'Hangár s Archou',
        poprve: 'ch4_hangar_prichod',
        prichod: USMIRENI,
        mista: [
          { id: 'archa', nazev: 'ch2_hs_archa', r: [24, 18, 40, 44], prohlednout: 'ch4_archa', bara_prohlednout: 'ch4_archa_bara', na: { klic_start: 'ch4_archa_klic_start' } },
          { id: 'poklop', nazev: 'ch4_hs_poklop', kdy: "c3_poklop!='ne'", r: [52, 40, 6, 10],
            prohlednout: { kdy: "c3_poklop=='netesni' && !poklop_utesnen", akce: 'ch4_poklop_tahne', jinak: { kdy: 'poklop_otevren', akce: 'ch4_poklop_otevreny', jinak: 'ch4_poklop_zamceny' } },
            bara_prohlednout: { kdy: "c3_poklop=='netesni' && !poklop_utesnen", akce: 'ch4_poklop_bara_mm', jinak: 'ch4_poklop_bara' },
            pouzit: { kdy: 'poklop_otevren && !p29_hotovo', akce: 'ch4_poklop_nevejdu', jinak: { kdy: 'p29_hotovo', akce: 'ch4_poklop_hotovo', jinak: 'ch4_poklop_zaklepat' } },
            bara_pouzit: { kdy: 'poklop_otevren && !p29_hotovo', akce: '>trup', jinak: 'ch4_poklop_bara_zavreny' },
            na: {
              klic_poklopu: { kdy: '!akt_c', akce: 'ch4_klic_poklopu_driv', jinak: { kdy: "c3_poklop=='netesni' && !poklop_utesnen", akce: 'ch4_poklop_tahne_paska', jinak: { kdy: 'p29_hotovo', akce: 'ch4_poklop_hotovo', jinak: { kdy: 'poklop_otevren', akce: ['ch4_poklop_znovu', '~bara', '>trup'], jinak: OTEVRENO } } } },
              paska: { kdy: "c3_poklop=='netesni' && !poklop_utesnen", akce: ['ch4_paska_na_poklop', '-paska', '$poklop_utesnen'], jinak: 'ch4_paska_netreba' },
              klic_start: 'ch4_poklop_jiny_zamek', kava: 'ch4_poklop_kava', krabice: 'ch4_poklop_krabice',
            } },
          { id: 'nyty', nazev: 'ch4_hs_nyty', kdy: "c3_poklop=='ne'", r: [52, 40, 6, 10],
            prohlednout: { kdy: 'poklop_otevren', akce: 'ch4_nyty_otvor', jinak: 'ch4_nyty' }, bara_prohlednout: 'ch4_nyty_bara',
            pouzit: { kdy: 'poklop_otevren && !p29_hotovo', akce: 'ch4_poklop_nevejdu', jinak: 'ch4_nyty_zaklepat' },
            bara_pouzit: { kdy: 'poklop_otevren && !p29_hotovo', akce: '>trup', jinak: 'ch4_nyty_bara' },
            na: {
              plan_zapojeni: { kdy: '!akt_c', akce: 'ch4_klic_poklopu_driv', jinak: { kdy: 'p29_hotovo', akce: 'ch4_poklop_hotovo', jinak: { kdy: 'poklop_otevren', akce: ['ch4_poklop_znovu', '~bara', '>trup'],
                jinak: { kdy: BEZ_VERY, akce: ['ch4_vrtani_ruda_1', 'ch4_vrtani_ruda_2', ...OTEVRENO], jinak: 'ch4_vrtani_dej_vere' } } } },
              klic_start: 'ch4_poklop_jiny_zamek', kava: 'ch4_poklop_kava',
            } },
          { id: 'okenko', nazev: 'ch3_hs_okenko', kdy: "c3_poklop=='ne'", r: [60, 36, 4, 5], prohlednout: 'ch4_okenko', bara_prohlednout: 'ch4_okenko' },
          { id: 'motory', nazev: 'ch4_hs_motory', r: [8, 44, 12, 20],
            prohlednout: { kdy: 'motory_zkouseny', akce: 'ch4_motory_po', jinak: 'ch4_motory' }, bara_prohlednout: 'ch4_motory_bara', na: { kava: 'ch4_motory_kava' } },
          { id: 'pult', nazev: 'ch4_hs_pult', r: [8, 66, 10, 10],
            prohlednout: 'ch4_pult', bara_prohlednout: 'ch4_pult_bara',
            pouzit: { kdy: 'motory_zkouseny', akce: 'ch4_pult_po', jinak: 'ch4_pult_bez_klice' }, bara_pouzit: 'ch4_pult_bara',
            na: {
              klic_start: { kdy: 'motory_zkouseny', akce: 'ch4_pult_po', jinak: { kdy: '!palivo', akce: 'ch4_pult_bez_paliva', jinak: [
                'ch4_zkouska_klic', 'ch4_zkouska_naskoci', 'ch4_zkouska_zhasnou', 'ch4_zkouska_kontrolka', 'ch4_zkouska_ruda_baro', 'ch4_zkouska_ticho',
                '-klic_start', '$motory_zkouseny', USMIRENI] } },
              kava: 'ch4_pult_kava', pembok: 'ch4_pult_pembok',
            } },
          { id: 'otvor', nazev: 'ch4_hs_otvor_strecha', r: [40, 2, 12, 8], prohlednout: { kdy: 'palivo', akce: 'ch4_otvor_po', jinak: 'ch4_otvor' }, bara_prohlednout: 'ch4_otvor_bara' },
          { id: 'zebrik', nazev: 'ch2_hs_zebrik', r: [46, 30, 4, 30],
            prohlednout: 'ch4_zebrik', bara_prohlednout: 'ch4_zebrik',
            pouzit: { kdy: 'usmireni && !akt_c', akce: M11_ZNOVU, jinak: { kdy: "c1_babicka=='odmitnuta' && !kocour_u_rudy && akt_b", akce: ['ch4_paluba_kocour_1', 'ch4_paluba_kocour_2', '$kocour_u_rudy'], jinak: { kdy: 'akt_c', akce: 'ch4_paluba_po_m11', jinak: 'ch4_paluba_pohled' } } },
            bara_pouzit: { kdy: 'usmireni && !akt_c', akce: M11_ZNOVU, jinak: { kdy: 'akt_c', akce: 'ch4_paluba_po_m11', jinak: 'ch4_paluba_pohled' } } },
          { id: 'jestetoto', nazev: 'postava_jestetoto', druh: 'postava', kdy: "byl('staveniste')", r: [84, 2, 6, 10],
            prohlednout: (h) => h.rekni(h.s.priznaky.akt_b ? 'ch4_jestetoto_po_r42' : 'ch4_jestetoto_hangar', [jmenoTvora(h.s.priznaky.akt_b ? h.s.priznaky.c4_creep : h.s.priznaky.c3_creep)]),
            bara_prohlednout: (h) => h.rekni('ch4_jestetoto_bara', [jmenoTvora(h.s.priznaky.akt_b ? h.s.priznaky.c4_creep : h.s.priznaky.c3_creep)]),
            pouzit: 'ch4_jestetoto_mluvit', bara_pouzit: 'ch4_jestetoto_mluvit',
            na: { kava: 'ch4_jestetoto_kava', krabice: 'ch4_jestetoto_krabice', pembok: 'ch4_jestetoto_pembok', klic_start: 'ch4_jestetoto_klic', paska: 'ch4_jestetoto_paska', listek_babicka: 'ch4_jestetoto_listek' },
            bara_na: { metr: ['ch4_jestetoto_nerado', LISTEK_ZMENY], minutka: 'ch4_jestetoto_minutka', listky: 'ch4_jestetoto_listky', paska: 'ch4_jestetoto_paska' } },
          { id: 'dochazka', nazev: 'ch4_hs_dochazka', r: [92, 20, 6, 10],
            prohlednout: 'ch4_dochazka', pouzit: 'ch4_dochazka_podepsat',
            bara_prohlednout: { kdy: TYM('krystof'), akce: 'ch4_dochazka_bara_krystof', jinak: 'ch4_dochazka_bara_automat' } },
          ...CLENOVE.map((k, i) => clenTymu(k, [4 + i * 7, 76, 6, 20])),
          { id: 'zmena', nazev: 'postava_pan_zmena', druh: 'postava', kdy: `${BAZEN_V_TRUPU} && akt_b`, r: [70, 60, 6, 30], obraz: 'postava_zmena',
            prohlednout: 'ch4_zmena_prohlednout', bara_prohlednout: 'ch4_zmena_prohlednout', pouzit: '#zmena', bara_pouzit: 'ch4_zmena_bara',
            na: { kava: 'ch4_zmena_kava', pembok: 'ch4_zmena_pembok', listek_babicka: 'ch4_zmena_listek' }, bara_na: { metr: 'ch4_zmena_metr' } },
          { id: 'kalendar', nazev: 'ch2_hs_kalendar', r: [66, 32, 4, 8], prohlednout: (h) => h.rekni('ch4_kalendar', [String(h.s.priznaky.dny)]), bara_prohlednout: (h) => h.rekni('ch4_kalendar', [String(h.s.priznaky.dny)]) },
          { id: 'gantt', nazev: 'ch2_hs_gantt', r: [66, 6, 14, 22], prohlednout: 'ch4_gantt_stena', bara_prohlednout: 'ch4_gantt_stena_bara' },
          ...posli('hangar', [2, 62, 5, 14]),
          { id: 'bocni', stitek: true, nazev: 'ch3_hs_bocni_dvere', druh: 'vychod', vychod: 'dilna', r: [0, 40, 6, 20] },
          { id: 'brana', stitek: true, nazev: 'ch2_hs_brana_ven', druh: 'vychod', vychod: 'staveniste', r: [40, 82, 20, 16] },
          ...druha('hangar', [26, 62, 5, 22]),
        ],
      },

      // S4 Dílna (večer)
      dilna: {
        nazev: 'Dílna',
        poprve: { kdy: BARA, akce: 'ch4_dilna_prichod' },
        mista: [
          { id: 'pocitac', nazev: 'ch3_hs_pocitac', r: [42, 6, 10, 16],
            prohlednout: 'ch3_pocitac_ruda', bara_prohlednout: { kdy: 'akt_b', akce: 'ch4_pocitac_bara_b', jinak: 'ch4_pocitac_bara' },
            pouzit: 'ch4_pocitac_ruda_sahne',
            bara_pouzit: { kdy: 'akt_b', akce: '#pocitac', jinak: { kdy: 'listek_pocitadlo', akce: 'ch4_pocitac_zkouska_uz', jinak: [
              'ch4_pocitac_zkouska_1', { kdy: VADA, akce: 'ch4_pocitac_4811', jinak: { kdy: 'c3_dluh>=2', akce: 'ch4_pocitac_chyby', jinak: 'ch4_pocitac_4812' } }, LISTEK_POCITADLO] } },
            bara_na: { rozpis: { kdy: LAVKA_BOD + ' && !lavka_znama', akce: ['ch4_pocitac_rozpis', '$lavka_znama', (h) => { h.s.predmety.bara = h.s.predmety.bara.filter((x) => x !== 'rozpis'); }], jinak: 'ch4_pocitac_rozpis_zna' }, oprava: 'ch4_pocitac_oprava', metr: 'ch4_pocitac_metr', seznam: 'ch4_pocitac_seznam' } },
          { id: 'tiskarna', nazev: 'ch4_hs_tiskarna', r: [54, 10, 8, 10], prohlednout: 'ch4_tiskarna', bara_prohlednout: 'ch4_tiskarna_bara', bara_pouzit: 'ch4_tiskarna_pouzit' },
          { id: 'minutka', nazev: 'ch3_hs_minutka', kdy: '!minutka_vzata', r: [80, 6, 6, 8],
            prohlednout: 'ch3_minutka_ruda', bara_prohlednout: 'ch4_minutka_bara',
            bara_pouzit: { kdy: 'akt_b', akce: ['ch4_minutka_vzit', '+minutka', '$minutka_vzata'], jinak: 'ch4_minutka_akt_a' }, pouzit: 'ch4_minutka_ruda_sahne' },
          { id: 'police', nazev: 'ch3_hs_police', r: [64, 4, 14, 12],
            prohlednout: 'ch3_police_ruda', bara_prohlednout: { kdy: "c3_poklop=='netesni' && !paska_vzata", akce: 'ch4_police_paska', jinak: 'ch4_police' },
            bara_pouzit: { kdy: "c3_poklop=='netesni' && !paska_vzata", akce: ['ch4_police_vzit_pasku', '+paska', '$paska_vzata'], jinak: 'ch4_police_nic' } },
          { id: 'tabule_delam', nazev: 'ch4_hs_tabule_delam', r: [2, 6, 14, 24],
            prohlednout: 'ch4_tabule_delam_ruda', bara_prohlednout: { kdy: 'akt_b', akce: 'ch4_tabule_delam_b', jinak: 'ch4_tabule_delam_a' } },
          { id: 'tabule_seznam', nazev: 'ch3_hs_seznam', r: [18, 8, 10, 20],
            prohlednout: { kdy: 'akt_b', akce: 'ch4_tabule_seznam_po', jinak: 'ch4_tabule_seznam' }, bara_prohlednout: { kdy: 'akt_b', akce: 'ch4_tabule_seznam_po_bara', jinak: 'ch4_tabule_seznam' } },
          { id: 'papir', nazev: 'ch4_hs_papir', kdy: GANTT, r: [30, 48, 8, 8],
            prohlednout: 'ch4_papir', bara_prohlednout: 'ch4_papir',
            bara_pouzit: { kdy: "vytisteno && !ma('listky')", akce: ['ch4_papir_strihat', '+listky', '$listky_vytisteny', USMIRENI], jinak: { kdy: 'vytisteno', akce: 'ch4_papir_hotovo', jinak: 'ch4_papir_nejdriv_tisk' } } },
          { id: 'mlha', nazev: 'ch3_hs_mlha', r: [90, 4, 9, 12], prohlednout: 'ch3_mlha_ruda', bara_prohlednout: 'ch4_mlha_bara' },
          ...posli('dilna', [92, 50, 5, 26]),
          { id: 'dvere', stitek: true, nazev: 'ch3_hs_dvere_hangar', druh: 'vychod', vychod: 'hangar', r: [92, 76, 8, 22] },
          ...druha('dilna', [78, 50, 5, 26]),
        ],
      },

      // S5 Trup Archy zevnitř (noc, jen akt C, jen Bára)
      trup: {
        nazev: 'Trup Archy zevnitř',
        poprve: ['ch4_trup_prichod', 'ch4_trup_bara_drz'],
        mista: [
          { id: 'ridici_pocitac', nazev: 'ch4_hs_ridici_pocitac', r: [36, 40, 16, 22],
            bara_prohlednout: { kdy: 'navigace_nahrana', akce: 'ch4_ridici_po', jinak: 'ch4_ridici' }, bara_pouzit: NAHRAVANI,
            bara_na: { oprava: 'ch4_ridici_oprava_sama', metr: 'ch4_ridici_metr', listky: 'ch4_ridici_listky' } },
          { id: 'pripojka', nazev: 'ch4_hs_pripojka', r: [60, 30, 10, 12], bara_prohlednout: 'ch4_pripojka', bara_pouzit: 'ch4_pripojka_pouzit' },
          { id: 'poklop_zevnitr', nazev: 'ch4_hs_poklop_zevnitr', r: [72, 30, 12, 24], bara_prohlednout: 'ch4_poklop_zevnitr', bara_pouzit: 'ch4_poklop_zevnitr_pouzit' },
          { id: 'panel', nazev: 'ch3_hs_panel', r: [56, 10, 10, 18], bara_prohlednout: { kdy: "(c2_bezpecnost=='bara' || c2_rozdeleni=='krabice')", akce: 'ch4_panel_tyden', jinak: 'ch4_panel_zapeceteny' } },
          { id: 'bazen', nazev: 'ch4_hs_bazen', kdy: BAZEN_V_TRUPU, r: [8, 50, 20, 16], bara_prohlednout: 'ch4_bazen_trup', bara_pouzit: 'ch4_bazen_trup_pouzit' },
          { id: 'okenko', nazev: 'ch3_hs_okenko', r: [86, 6, 8, 12], bara_prohlednout: 'ch4_kometa_bara' },
          { id: 'ven', stitek: true, nazev: 'ch4_hs_poklop_ven', druh: 'vychod', vychod: 'hangar', r: [0, 20, 6, 50] },
        ],
      },

      // S6 Archiv (noc)
      archiv: {
        nazev: 'Archiv',
        poprve: { kdy: BARA, akce: 'ch4_archiv_prichod' },
        mista: [
          { id: 'lumir', nazev: 'postava_lumir', druh: 'postava', r: [40, 40, 7, 30],
            prohlednout: { kdy: 'lumir_vzhuru', akce: 'ch4_lumir_vzhuru', jinak: 'ch4_lumir_spi_ruda' },
            bara_prohlednout: { kdy: 'lumir_vzhuru', akce: 'ch4_lumir_vzhuru', jinak: 'ch4_lumir_spi' },
            pouzit: { kdy: 'lumir_vzhuru', akce: 'ch4_lumir_ruda', jinak: 'ch4_lumir_chrr' },
            bara_pouzit: { kdy: 'lumir_vzhuru', akce: { kdy: "ma('zaznam') || plan_komise_hotov", akce: 'ch4_lumir_priloha', jinak: 'ch4_lumir_kartoteka' }, jinak: ['ch4_lumir_chrr', 'ch4_lumir_bara_zvonit'] },
            na: { kava: 'ch4_lumir_kava' },
            bara_na: {
              minutka: { kdy: 'lumir_vzhuru', akce: 'ch4_lumir_minutka_uz', jinak: ['ch4_lumir_zvoni', 'ch4_lumir_vydavam', 'ch4_lumir_bara_merim', 'ch4_lumir_budik', '-minutka', '$lumir_vzhuru'] },
              metr: { kdy: 'lumir_vzhuru', akce: 'ch4_lumir_metr_uz', jinak: 'ch4_lumir_metr_spi' },
              seznam: 'ch4_lumir_seznam', zaznam: 'ch4_lumir_dukaz', plan_komise: 'ch4_lumir_dukaz', smlouva: 'ch4_lumir_smlouva', listky: 'ch4_lumir_listky',
            } },
          { id: 'kartoteka', nazev: 'ch1_hs_kartoteka', r: [8, 20, 24, 40],
            prohlednout: 'ch4_kartoteka_ruda', bara_prohlednout: 'ch4_kartoteka_bara',
            pouzit: 'ch4_kartoteka_ruda_sahne',
            bara_pouzit: { kdy: "ma('zaznam') || plan_komise_hotov", akce: 'ch4_kartoteka_hotovo', jinak: { kdy: '!lumir_vzhuru', akce: 'ch4_kartoteka_spi', jinak: ['ch4_kartoteka_listek', '#kartoteka'] } },
            bara_na: { metr: 'ch4_kartoteka_metr', seznam: 'ch4_kartoteka_seznam' } },
          { id: 'kniha', nazev: 'ch1_hs_kniha', r: [56, 36, 10, 8], prohlednout: 'ch4_kniha', bara_prohlednout: ['ch4_kniha', 'ch4_kniha_bara'], pouzit: 'ch4_kniha', bara_pouzit: ['ch4_kniha', 'ch4_kniha_bara'] },
          { id: 'regal', nazev: 'ch1_hs_regal', r: [70, 10, 20, 50], prohlednout: 'ch4_regal', bara_prohlednout: { kdy: "ma('zaznam') || plan_komise_hotov", akce: 'ch4_regal_po', jinak: 'ch4_regal' } },
          { id: 'pouceni', nazev: 'ch1_hs_pouceni', r: [60, 66, 8, 8], prohlednout: 'ch4_pouceni', bara_prohlednout: 'ch4_pouceni', bara_pouzit: { kdy: 'lumir_vzhuru', akce: 'ch4_pouceni_lumir', jinak: 'ch4_pouceni' } },
          { id: 'hluboky_regal', nazev: 'ch1_hs_hluboky_regal', r: [2, 62, 10, 30], prohlednout: 'ch4_hluboky_regal_ruda', bara_prohlednout: 'ch4_hluboky_regal' },
          { id: 'schody', stitek: true, nazev: 'ch1_hs_schody_nahoru', druh: 'vychod', r: [88, 70, 12, 28], pouzit: ['ch4_radnice_strih_zpet', '>staveniste'], bara_pouzit: ['ch4_radnice_strih_zpet', '>staveniste'] },
          { id: 'do_komise', stitek: true, nazev: 'ch4_hs_do_komise', druh: 'vychod', vychod: 'komise', r: [88, 40, 12, 28] },
          ...druha('archiv', [20, 64, 5, 26]),
        ],
      },

      // S7 Kancelář Komise (noc)
      komise: {
        nazev: 'Kancelář Komise',
        poprve: 'ch4_komise_prichod',
        mista: [
          { id: 'predseda', nazev: 'postava_predseda', druh: 'postava', r: [44, 34, 7, 36], obraz: 'postava_predseda',
            prohlednout: { kdy: 'vymluva>=4', akce: 'ch4_predseda_po_prohlednout', jinak: 'ch4_predseda_prohlednout' }, bara_prohlednout: 'ch4_predseda_bara_prohlednout',
            pouzit: { ...KONF_START, jinak: '#predseda' },
            bara_pouzit: { ...KONF_START, jinak: 'ch4_predseda_bara' },
            na: {
              zaznam: DUKAZ('zaznam', 1), plan_komise: DUKAZ('plan_komise', 2), smlouva: DUKAZ('smlouva', 3), svedectvi: DUKAZ('svedectvi', 3), kopie: KOPIE_DUKAZ,
              plan: 'ch4_predseda_plan', kava: 'ch4_predseda_kava', pembok: 'ch4_predseda_pembok', kavove_pero: 'ch4_predseda_pero',
              krabice: { kdy: "c2_riziko_predem=='usmev'", akce: 'ch4_predseda_krabice_usmev', jinak: 'ch4_predseda_krabice' },
              klic_start: 'ch4_predseda_klic', listek_babicka: 'ch4_predseda_listek', denik: 'ch4_predseda_denik', rozpis: 'ch4_predseda_rozpis',
            },
            bara_na: {
              zaznam: DUKAZ('zaznam', 1), plan_komise: DUKAZ('plan_komise', 2), smlouva: DUKAZ('smlouva', 3),
              seznam: 'ch4_predseda_seznam', listky: 'ch4_predseda_listky', metr: 'ch4_predseda_metr', minutka: 'ch4_predseda_minutka', oprava: 'ch4_predseda_oprava',
            } },
          { id: 'fronta', nazev: 'ch1_hs_fronta', r: [4, 30, 16, 40],
            prohlednout: 'ch4_fronta', bara_prohlednout: 'ch4_fronta',
            pouzit: { kdy: 'povoleni_odmitnuto', akce: 'ch4_fronta_po', jinak: { kdy: 'povoleni_zadano', akce: [
              'ch4_fronta_postavit', 'ch4_fronta_strih', 'ch4_fronta_predseda_faze3', 'ch4_pembok_razitko', '$povoleni_odmitnuto', USMIRENI], jinak: 'ch4_fronta_stejna' } },
            bara_pouzit: 'ch4_fronta_bara' },
          { id: 'framework', nazev: 'postava_framework', druh: 'postava', r: [70, 36, 6, 36], obraz: 'postava_framework',
            prohlednout: 'ch4_framework_prohlednout', bara_prohlednout: 'ch4_framework_prohlednout',
            pouzit: '#framework', bara_pouzit: '#framework',
            na: { krabice: 'ch4_framework_krabice', pembok: 'ch4_framework_pembok', kavove_pero: 'ch4_framework_pero', plan: 'ch4_framework_plan', svedectvi: 'ch4_framework_svedectvi', kopie: 'ch4_framework_kopie' },
            bara_na: { metr: 'ch4_framework_metr', smlouva: 'ch4_framework_smlouva_zpet', minutka: 'ch4_framework_minutka', seznam: 'ch4_framework_seznam' } },
          { id: 'kufr', nazev: 'ch4_hs_kufr', r: [84, 60, 10, 14], prohlednout: 'ch4_kufr', bara_prohlednout: ['ch4_kufr', 'ch4_kufr_bara'] },
          ...['pepa', 'klara', 'vera'].map((k) => ({
            id: 'clen_' + k, nazev: NAZEV[k], druh: 'postava', kdy: `c3_odchazi=='${k}' && c3_retro=='ne' && !c4_clen_zpet && akt_b`, r: [60, 58, 6, 30],
            prohlednout: 'ch4_clen_prohlednout', bara_prohlednout: 'ch4_clen_prohlednout_bara', pouzit: '#clen', bara_pouzit: 'ch4_clen_bara',
            na: { kava: 'ch4_clen_kava', plan: 'ch4_clen_gantt_predmet', pembok: 'ch4_clen_pembok' } })),
          { id: 'razitko', nazev: 'ch1_hs_razitko', r: [52, 56, 6, 6],
            prohlednout: 'ch4_razitko', bara_prohlednout: 'ch4_razitko',
            na: { kava: { kdy: "c1_razitko=='kava'", akce: 'ch4_razitko_kava_znovu', jinak: 'ch4_razitko_kava' }, kavove_pero: 'ch4_razitko_pero' } },
          { id: 'aktovka', nazev: 'ch3_hs_aktovka', kdy: "c3_krysy=='aktovka'", r: [36, 62, 6, 8], prohlednout: 'ch4_aktovka', bara_prohlednout: 'ch4_aktovka_bara' },
          { id: 'cedule', nazev: 'ch1_hs_cedule', r: [20, 8, 12, 6], prohlednout: 'ch4_cedule', bara_prohlednout: 'ch4_cedule' },
          { id: 'vytah', stitek: true, nazev: 'ch1_hs_vytah', druh: 'vychod', r: [2, 72, 10, 26], prohlednout: 'ch4_vytah', pouzit: ['ch4_radnice_strih_zpet', '>staveniste'], bara_pouzit: ['ch4_radnice_strih_zpet', '>staveniste'] },
          { id: 'do_archivu', stitek: true, nazev: 'ch4_hs_do_archivu', druh: 'vychod', vychod: 'archiv', r: [2, 40, 10, 28] },
          ...druha('komise', [26, 62, 5, 26]),
        ],
      },
    },

    dialogy: {
      zelenka: {
        poprve: { kdy: 'akt_b', akce: 'ch4_zelenka_b', jinak: 'ch4_zelenka_uvod' },
        znovu: { kdy: 'akt_b', akce: 'ch4_zelenka_b', jinak: [] },
        vycerpano: 'ch4_zelenka_vse',
        volby: [
          { t: 'ch4_zelenka_volba_meri', jednou: true, akce: ['ch4_zelenka_meri_1', 'ch4_zelenka_meri_2'] },
          { t: 'ch4_zelenka_volba_zarovky', jednou: true, akce: ['ch4_zelenka_zarovky_1', 'ch4_zelenka_zarovky_2'] },
          { t: 'ch4_zelenka_volba_stav', jednou: true, akce: ['ch4_zelenka_stav', { kdy: BARA, akce: 'ch4_zelenka_stav_bara', jinak: 'ch4_zelenka_stav_ruda' }] },
          { t: 'ch4_zelenka_volba_vysilacky', kdy: AKT_A, jednou: true, akce: ['ch4_zelenka_vysilacky_1', 'ch4_zelenka_vysilacky_2'] },
          { t: 'ch4_volba_konec', konec: true, akce: 'ch4_zelenka_konec' },
        ],
      },

      // R4.1 zpráva starostovi (P4.7)
      telegraf: {
        poprve: [], znovu: [],
        volby: [
          { t: 'ch4_telegraf_volba_poctive', kdy: 'c4_listky>=4', akce: ['$c4_report=poctive', 'ch4_telegraf_poctive_1', 'ch4_telegraf_poctive_varianty', 'ch4_zelenka_zluta_ve_zprave', '#', 'ch4_starosta_prijizdi', '$starosta_prijel', 'ch4_starosta_proc_prijel', ...M03_START] },
          { t: 'ch4_telegraf_volba_zelene', akce: ['ch4_pembok_jsi_si_jisty', '$c4_report=zelene', 'ch4_telegraf_zelene', 'ch4_zelenka_vyborne', '#', 'ch4_starosta_prijizdi', '$starosta_prijel', 'ch4_starosta_nuzky_prijel', ...M03_START] },
          { t: 'ch4_telegraf_volba_pockat', konec: true, akce: 'ch4_telegraf_pockat' },
        ],
      },
      starosta_znovu: {
        poprve: 'ch4_starosta_znovu_uvod', znovu: 'ch4_starosta_znovu_uvod',
        volby: [
          { t: 'ch4_starosta_volba_znovu', akce: ['ch4_starosta_znovu_ano', '#', '@m03'] },
          { t: 'ch4_starosta_volba_tabule', konec: true, akce: 'ch4_starosta_k_tabuli' },
        ],
      },

      // Ruda mluví s Bárou (akt A a C)
      bara: {
        poprve: { kdy: 'akt_c', akce: 'ch4_bara_uvod_c', jinak: 'ch4_bara_uvod' },
        vycerpano: 'ch4_bara_vse',
        volby: [
          { t: 'ch4_bara_volba_listky', kdy: AKT_A, akce: (h) => h.rekni(h.s.priznaky.c4_listky >= 4 ? 'ch4_bara_listky_dost' : 'ch4_bara_listky_pocet', [String(h.s.priznaky.c4_listky)]) },
          { t: 'ch4_bara_volba_co', jednou: true, akce: { kdy: 'akt_c', akce: 'ch4_bara_co_c', jinak: 'ch4_bara_co_a' } },
          { t: 'ch4_bara_volba_predseda', kdy: 'akt_c', jednou: true, akce: 'ch4_bara_o_predsedovi' },
          { t: 'ch4_volba_konec', konec: true, akce: 'ch4_bara_konec' },
        ],
      },

      vratny: {
        poprve: 'ch4_vratny_uvod', znovu: 'ch4_vratny_znovu',
        vycerpano: 'ch4_vratny_vse',
        volby: [
          { t: 'ch4_vratny_volba_denik', kdy: "!ma('denik')", akce: ['ch4_vratny_denik_1', 'ch4_vratny_denik_2', '+denik'] },
          { t: 'ch4_vratny_volba_sud', kdy: 'akt_b && !palivo', akce: ['ch4_vratny_sud_1', 'ch4_vratny_sud_2', '$palivo', 'ch4_vratny_sud_dovnitr'] },
          { t: 'ch4_vratny_volba_plosina', kdy: 'c3_rezerva<0 && akt_b && !akt_c && !plosina', akce: ['ch4_vratny_plosina_1', 'ch4_vratny_plosina_2', '$plosina', USMIRENI] },
          { t: 'ch4_vratny_volba_klic', kdy: `akt_b && !${TYM('norbert')} && !ma('klic_start') && !motory_zkouseny`, akce: ['ch4_vratny_klic_vseho', '+klic_start'] },
          { t: 'ch4_vratny_volba_vecer', jednou: true, akce: 'ch4_vratny_vecer' },
          { t: 'ch4_volba_konec', konec: true, akce: 'ch4_vratny_konec' },
        ],
      },

      // P4.13 babička na lehátku
      babicka: {
        poprve: ['ch4_babicka_uvod_1', 'ch4_babicka_uvod_2'],
        znovu: { kdy: 'babicka_vyslechnuta', akce: 'ch4_babicka_znovu', jinak: 'ch4_babicka_uvod_2' },
        volby: [
          { t: 'ch4_babicka_volba_proc', kdy: '!babicka_vyslechnuta', akce: ['ch4_babicka_proc_1', 'ch4_babicka_proc_2', 'ch4_babicka_proc_3', '$babicka_vyslechnuta', { kdy: "c1_babicka=='odmitnuta'", akce: 'ch4_babicka_kocour_ztracen' }] },
          { t: 'ch4_babicka_volba_gantt', jednou: true, akce: 'ch4_babicka_gantt' },
          { t: 'ch4_babicka_volba_vstat', kdy: 'babicka_vyslechnuta', akce: { kdy: "c1_babicka=='odmitnuta' && !kocour_u_rudy", akce: 'ch4_babicka_kocour_ztracen', jinak: 'ch4_babicka_listek_chci' } },
          { t: 'ch4_volba_konec', konec: true, akce: 'ch4_babicka_konec' },
        ],
      },

      // Posel (oba poslové, obě postavy)
      posel: {
        poprve: (h) => h.rekni('ch4_posel_uvod_' + (h.s.scena === 'staveniste' ? h.s.priznaky.posel2 : h.s.priznaky.posel1)),
        znovu: 'ch4_posel_znovu',
        vycerpano: 'ch4_posel_vse',
        volby: [
          { t: 'ch4_posel_volba_co_bara', kdy: RUDA, akce: POSEL_O_BARE },
          { t: 'ch4_posel_volba_nemluvim', kdy: RUDA, jednou: true, akce: ['ch4_posel_nemluvim', 'ch4_pembok_vysilacka'] },
          { t: 'ch4_posel_volba_listek', kdy: `${RUDA} && babicka_vyslechnuta && !ma('listek_babicka') && !babicka_vstala`, jednou: true, akce: ['ch4_posel_listek_vyridim', '$ruda_chce_listek'] },
          { t: 'ch4_posel_volba_paska', kdy: `${RUDA} && c3_poklop=='netesni' && !ma('paska') && !poklop_utesnen`, jednou: true, akce: ['ch4_posel_paska_vyridim', '$ruda_chce_pasku'] },
          { t: 'ch4_posel_volba_klic', kdy: `${RUDA} && (posel1=='norbert' || posel2=='norbert') && !ma('klic_start') && !motory_zkouseny`, akce: ['ch4_norbert_klic', '+klic_start'] },
          { t: 'ch4_posel_volba_co_ruda', kdy: BARA, akce: POSEL_O_RUDOVI },
          { t: 'ch4_posel_volba_vzkaz', kdy: `${BARA} && ma('plan_komise') && !c4_bara_rekla`, akce: { kdy: DUVERA, akce: ['ch4_posel_vzkaz_hned', '$c4_bara_rekla=hned', 'ch4_posel_vzkaz_nese'], jinak: 'ch4_posel_vzkaz_jeste_ne' } },
          { t: 'ch4_volba_konec', konec: true, akce: 'ch4_posel_konec' },
        ],
      },

      // Zkušební počítač v aktu B a C (P4.23, P4.25)
      pocitac: {
        poprve: 'ch4_pocitac_menu', znovu: 'ch4_pocitac_menu',
        volby: [
          { t: 'ch4_pocitac_volba_tisk', kdy: "!ma('listky')", akce: { kdy: 'c3_dluh>=2 && !tisk_chyby', akce: ['ch4_tisk_chyby_1', 'ch4_tisk_chyby_2', '$tisk_chyby'], jinak: [
            'ch4_tisk_1', { kdy: VADA + ' && !navigace_nahrana', akce: 'ch4_tisk_4811', jinak: 'ch4_tisk_4812' }, '$vytisteno',
            { kdy: GANTT, akce: 'ch4_tisk_gantt_papir', jinak: ['+listky', '$listky_vytisteny', 'ch4_tisk_hotovo', USMIRENI] }] } },
          { t: 'ch4_pocitac_volba_oprava', kdy: `${VADA} && !ma('oprava') && !navigace_nahrana`, akce: ['ch4_oprava_1', 'ch4_oprava_2', '+oprava'] },
          { t: 'ch4_pocitac_volba_zkouska', jednou: true, akce: { kdy: 'listek_pocitadlo', akce: 'ch4_pocitac_zkouska_uz', jinak: 'ch4_pocitac_zkouska_pozde' } },
          { t: 'ch4_volba_konec', konec: true, akce: [] },
        ],
      },

      // P4.20 kometa v kartotéce
      kartoteka: {
        poprve: 'ch4_kartoteka_otazka', znovu: 'ch4_kartoteka_otazka',
        volby: [
          { t: 'ch4_kartoteka_volba_konec', akce: ['ch4_kartoteka_rok_nestaci', 'ch4_kartoteka_bara_mesic'] },
          { t: 'ch4_kartoteka_volba_abecedne', akce: 'ch4_kartoteka_abecedne' },
          { t: 'ch4_kartoteka_volba_duben', akce: ['ch4_kartoteka_duben', 'ch4_lumir_priloha_vydal', '+zaznam', 'ch4_zaznam_cte', 'ch4_bara_duben', '#'] },
          { t: 'ch4_kartoteka_volba_pozdeji', konec: true, akce: [] },
        ],
      },

      // Předseda v aktu A a B (P4.11)
      predseda: {
        poprve: 'ch4_predseda_uvod', znovu: [],
        vycerpano: 'ch4_predseda_vse',
        volby: [
          { t: 'ch4_predseda_volba_povoleni', kdy: 'akt_b && !povoleni_zadano', akce: ['ch4_predseda_formular_1', 'ch4_predseda_formular_2', '$povoleni_zadano'] },
          { t: 'ch4_predseda_volba_povoleni_znovu', kdy: 'povoleni_zadano && !povoleni_odmitnuto', akce: 'ch4_predseda_fronta_tamhle' },
          { t: 'ch4_predseda_volba_framework', jednou: true, akce: 'ch4_predseda_framework_poradce' },
          { t: 'ch4_predseda_volba_kufr', jednou: true, akce: 'ch4_predseda_kufr_odpoved' },
          { t: 'ch4_predseda_volba_noc', jednou: true, akce: 'ch4_predseda_noc' },
          { t: 'ch4_volba_konec', konec: true, akce: 'ch4_predseda_konec' },
        ],
      },

      framework: {
        poprve: 'ch4_framework_uvod', znovu: [],
        vycerpano: 'ch4_framework_vse',
        volby: [
          { t: 'ch4_framework_volba_reference', kdy: `${BARA} && !smlouva_ziskana`, akce: ['ch4_framework_reference_1', 'ch4_framework_reference_2', 'ch4_framework_kopie_ano', '+smlouva', '$smlouva_ziskana', 'ch4_bara_smlouva', USMIRENI] },
          { t: 'ch4_framework_volba_reference_ruda', kdy: RUDA, jednou: true, akce: ['ch4_framework_reference_1', 'ch4_framework_ruda_krabice'] },
          { t: 'ch4_framework_volba_clen', kdy: "c3_retro=='ne'", jednou: true, akce: { kdy: 'c4_clen_zpet', akce: 'ch4_framework_minule', jinak: 'ch4_framework_kolega' } },
          { t: 'ch4_framework_volba_proc', jednou: true, akce: 'ch4_framework_proc_tu' },
          { t: 'ch4_volba_konec', konec: true, akce: 'ch4_framework_konec' },
        ],
      },

      // P4.12 odešlý člen týmu
      clen: {
        poprve: (h) => h.rekni('ch4_clen_uvod_' + h.s.priznaky.c3_odchazi),
        znovu: 'ch4_clen_znovu',
        volby: [
          { t: 'ch4_clen_volba_gantt', akce: ['ch4_clen_gantt', 'ch4_clen_gantt_reakce'] },
          { t: 'ch4_clen_volba_slib', akce: ['ch4_clen_slib', { kdy: "c3_odchazi=='pepa'", akce: 'ch4_clen_slib_pepa', jinak: 'ch4_clen_slib_reakce' }] },
          { t: 'ch4_clen_volba_priznat', akce: ['ch4_clen_priznani', '#clen2'] },
          { t: 'ch4_volba_konec', konec: true, akce: 'ch4_clen_konec' },
        ],
      },
      clen2: {
        poprve: (h) => h.rekni('ch4_clen_mluvi_1_' + h.s.priznaky.c3_odchazi), znovu: (h) => h.rekni('ch4_clen_mluvi_1_' + h.s.priznaky.c3_odchazi),
        volby: [
          { t: 'ch4_clen_volba_mlcet', akce: '#clen3' },
          { t: 'ch4_clen_volba_skocit', akce: ['ch4_clen_skocil', 'ch4_clen_skocil_reakce', '#clen2'] },
        ],
      },
      clen3: {
        poprve: (h) => h.rekni('ch4_clen_mluvi_2_' + h.s.priznaky.c3_odchazi), znovu: (h) => h.rekni('ch4_clen_mluvi_2_' + h.s.priznaky.c3_odchazi),
        volby: [
          { t: 'ch4_clen_volba_mlcet', akce: [(h) => h.rekni('ch4_clen_vraci_' + h.s.priznaky.c3_odchazi), KLIC_PRO_RUDU,
            { kdy: "c3_poklop=='ne'", akce: 'ch4_clen_plan_zapojeni', jinak: 'ch4_clen_klic' }, 'ch4_clen_svedectvi', '+svedectvi', '$c4_clen_zpet', 'ch4_framework_minule', 'ch4_clen_do_hangaru', '#'] },
          { t: 'ch4_clen_volba_skocit_2', akce: ['ch4_clen_skocil', 'ch4_clen_skocil_reakce', '#clen2'] },
        ],
      },

      // P4.17 Pan Změna a bazén
      zmena: {
        poprve: ['ch4_zmena_uvod_1', 'ch4_zmena_uvod_2'], znovu: 'ch4_zmena_uvod_2',
        volby: [
          { t: 'ch4_zmena_volba_mlcet', akce: '#zmena2' },
          { t: 'ch4_zmena_volba_ne', akce: ['ch4_zmena_ne', 'ch4_zmena_pak_dva', '#'] },
          { t: 'ch4_volba_konec', konec: true, akce: 'ch4_zmena_konec' },
        ],
      },
      zmena2: {
        poprve: 'ch4_zmena_mluvi_1', znovu: 'ch4_zmena_mluvi_1',
        volby: [
          { t: 'ch4_zmena_volba_mlcet', akce: '#zmena3' },
          { t: 'ch4_zmena_volba_skocit', akce: ['ch4_zmena_skocil', '#zmena2'] },
        ],
      },
      zmena3: {
        poprve: 'ch4_zmena_mluvi_2', znovu: 'ch4_zmena_mluvi_2',
        volby: [
          { t: 'ch4_zmena_volba_kasna', akce: ['ch4_zmena_kasna_1', 'ch4_zmena_kasna_2', 'ch4_zmena_kasna_hadice', 'ch4_zmena_faze3', 'ch4_rybari_ryby_strih', '$bazen_ven',
            (h) => h.nastav('c4_creep=' + Math.max(0, (h.s.priznaky.c4_creep || 0) - 1)), '#'] },
          { t: 'ch4_zmena_volba_kajuta', akce: 'ch4_zmena_kajuta' },
          { t: 'ch4_zmena_volba_ne', akce: ['ch4_zmena_ne', 'ch4_zmena_pak_dva'] },
        ],
      },

      // R4.3 usmíření (P4.27)
      usmireni: {
        poprve: ['ch4_usm_bara_prisla', 'ch4_usm_ticho'], znovu: 'ch4_usm_ticho',
        volby: [
          { t: 'ch4_usm_volba_priznal', akce: ['$c4_usmireni=priznal', 'ch4_usm_bara_priznal', BARA_REKNE, 'ch4_usm_prijem', '#', 'ch4_m11_uvod', '@m11'] },
          { t: 'ch4_usm_volba_trval', akce: ['$c4_usmireni=trval', 'ch4_usm_bara_trval', BARA_REKNE, 'ch4_usm_bez_prijmu', '#', 'ch4_m11_uvod', '@m11'] },
        ],
      },

      // P4.29 úkony při nahrávání: Ruda tahá kabel, Bára hlásí
      p29_ukon: {
        poprve: (h) => h.rekni('ch4_p29_bod_' + ukony(h.s.priznaky)[0]), znovu: (h) => h.rekni('ch4_p29_bod_' + ukony(h.s.priznaky)[0]),
        volby: [
          { t: 'ch4_p29_volba_tahnout', akce: (h) => {
            const zbyva = ukony(h.s.priznaky).slice(1);
            h.proved(['ch4_p29_tahne', 'ch4_p29_sviti']);
            if (zbyva.length) { h.nastav('ukony=' + zbyva.join('-')); h.rekni('ch4_p29_bod_' + zbyva[0]); }
            else { h.nastav('ukony=zadny'); h.proved('#'); P29_KONEC(h, 0); }
          } },
          { t: 'ch4_p29_volba_zavrit', akce: (h) => {
            if (!h.s.priznaky.zaviram_varovan) { h.proved(['$zaviram_varovan', 'ch4_p29_zaviram', 'ch4_p29_jeste_jeden']); return; }
            h.proved(['ch4_p29_zaviram_znovu', '#']);
            P29_KONEC(h, ukony(h.s.priznaky).length);
          } },
        ],
      },
    },

    napovedy: [
      // Ruda (Prof. Pembok)
      { id: 'r41', kdy: `${RUDA} && ${AKT_A} && c4_listky>=4 && !c4_report`, stupne: ['ch4_rada_r41'] },
      { id: 'listek_trup', kdy: `${RUDA} && ${AKT_A} && !listek_trup && c3_retro=='ano' && !c4_report`, stupne: ['ch4_rada_trup_1', 'ch4_rada_trup_2', 'ch4_rada_trup_3'] },
      { id: 'listek_tym', kdy: `${RUDA} && ${AKT_A} && !listek_tym && !c4_report`, stupne: ['ch4_rada_tym_1', 'ch4_rada_tym_2', 'ch4_rada_tym_3'] },
      { id: 'listek_rampa', kdy: `${RUDA} && ${AKT_A} && !listek_rampa && !c4_report`, stupne: ['ch4_rada_rampa_1', 'ch4_rada_rampa_2', 'ch4_rada_rampa_3'] },
      { id: 'm03', kdy: `${RUDA} && starosta_prijel && !souboj_hotovo`, // souboj odložený „Zatím ne“ znovu otevře starosta
 stupne: ['ch4_rada_m03_1', 'ch4_rada_m03_2', 'ch4_rada_m03_3'] },
      { id: 'r42', kdy: `${RUDA} && souboj_hotovo && !akt_b`, stupne: ['ch4_rada_r42'] },
      { id: 'bazen', kdy: `${RUDA} && akt_b && ${BAZEN_V_TRUPU} && navigace_nahrana==0 && akt_c`, stupne: ['ch4_rada_bazen_1', 'ch4_rada_bazen_2', 'ch4_rada_bazen_3'] },
      { id: 'clen', kdy: `${RUDA} && akt_c && c3_retro=='ne' && !c4_clen_zpet`, stupne: ['ch4_rada_clen_1', 'ch4_rada_clen_2', 'ch4_rada_clen_3'] },
      { id: 'motory', kdy: `${RUDA} && ${AKT_B} && !motory_zkouseny`, stupne: ['ch4_rada_motory_1', 'ch4_rada_motory_2', 'ch4_rada_motory_3'] },
      { id: 'povoleni', kdy: `${RUDA} && ${AKT_B} && !povoleni_odmitnuto`, stupne: ['ch4_rada_povoleni_1', 'ch4_rada_povoleni_2', 'ch4_rada_povoleni_3'] },
      { id: 'plosina', kdy: `${RUDA} && ${AKT_B} && c3_rezerva<0 && !plosina`, stupne: ['ch4_rada_plosina_1', 'ch4_rada_plosina_2', 'ch4_rada_plosina_3'] },
      { id: 'paska', kdy: `${RUDA} && akt_b && c3_poklop=='netesni' && !poklop_utesnen`, stupne: ['ch4_rada_paska_1', 'ch4_rada_paska_2', 'ch4_rada_paska_3'] },
      { id: 'babicka', kdy: `${RUDA} && akt_b && ${LEHATKO} && !babicka_vstala`, stupne: ['ch4_rada_babicka_1', 'ch4_rada_babicka_2', 'ch4_rada_babicka_3'] },
      { id: 'droleni', kdy: `${RUDA} && akt_b && c3_drolivy && !rampa_pevna`, stupne: ['ch4_rada_droleni_1', 'ch4_rada_droleni_2', 'ch4_rada_droleni_3'] },
      { id: 'bazen_b', kdy: `${RUDA} && akt_b && ${BAZEN_V_TRUPU}`, stupne: ['ch4_rada_bazen_1', 'ch4_rada_bazen_2', 'ch4_rada_bazen_3'] },
      { id: 'rozpis', kdy: `${RUDA} && ${AKT_B} && ${LAVKA_BOD} && !rozpis_u_bary`, stupne: ['ch4_rada_rozpis_1', 'ch4_rada_rozpis_3'] },
      { id: 'ceka_na_baru', kdy: `${RUDA} && ${AKT_B} && ${RUDA_HOTOV} && !${BARA_HOTOVA}`, stupne: ['ch4_rada_posel_bara'] },
      { id: 'usmireni', kdy: `${RUDA} && ${AKT_B} && ${RUDA_HOTOV} && ${BARA_HOTOVA}`, stupne: ['ch4_rada_usmireni'] },
      { id: 'poklop', kdy: `${RUDA} && akt_c && !p29_hotovo`, stupne: ['ch4_rada_poklop_1', 'ch4_rada_poklop_2', 'ch4_rada_poklop_3'] },
      { id: 'konfrontace', kdy: `${RUDA} && akt_c && !podpis_startu`, stupne: ['ch4_rada_konf_1', 'ch4_rada_konf_2', 'ch4_rada_konf_3'] },
      { id: 'nastup_ruda', kdy: `${RUDA} && akt_c && !p30_hotovo`, stupne: ['ch4_rada_nastup_ruda'] },
      { id: 'ruda_ceka', kdy: RUDA, stupne: ['ch4_rada_ocima_bary'] },
      // Bára (metr)
      { id: 'pocitadlo', kdy: `${BARA} && ${AKT_A} && !listek_pocitadlo && !c4_report`, stupne: ['ch4_rada_pocitadlo_1', 'ch4_rada_pocitadlo_2', 'ch4_rada_pocitadlo_3'] },
      { id: 'nastup', kdy: `${BARA} && ${AKT_A} && !listek_nastup && !c4_report`, stupne: ['ch4_rada_nastup_1', 'ch4_rada_nastup_2', 'ch4_rada_nastup_3'] },
      { id: 'zmeny', kdy: `${BARA} && ${AKT_A} && !listek_zmeny && !c4_report`, stupne: ['ch4_rada_zmeny_1', 'ch4_rada_zmeny_2', 'ch4_rada_zmeny_3'] },
      { id: 'paska_bara', kdy: `${BARA} && ${AKT_B} && ruda_chce_pasku && !paska_poslana`, stupne: ['ch4_rada_paska_bara_1', 'ch4_rada_paska_bara_3'] },
      { id: 'archiv', kdy: `${BARA} && ${AKT_B} && !lumir_vzhuru`, stupne: ['ch4_rada_archiv_1', 'ch4_rada_archiv_2', 'ch4_rada_archiv_3'] },
      { id: 'kometa', kdy: `${BARA} && ${AKT_B} && lumir_vzhuru && !ma('zaznam') && !plan_komise_hotov`, stupne: ['ch4_rada_kometa_1', 'ch4_rada_kometa_2', 'ch4_rada_kometa_3'] },
      { id: 'plan_komise', kdy: `${BARA} && ${AKT_B} && ma('zaznam') && !plan_komise_hotov`, stupne: ['ch4_rada_plan_komise_1', 'ch4_rada_plan_komise_3'] },
      { id: 'smlouva', kdy: `${BARA} && ${AKT_B} && !smlouva_ziskana`, stupne: ['ch4_rada_smlouva_1', 'ch4_rada_smlouva_2', 'ch4_rada_smlouva_3'] },
      { id: 'tisk', kdy: `${BARA} && ${AKT_B} && !listky_vytisteny`, stupne: ['ch4_rada_tisk_1', 'ch4_rada_tisk_3'] },
      { id: 'lavka', kdy: `${BARA} && ${AKT_B} && ${LAVKA_BOD} && !lavka_znama`, stupne: ['ch4_rada_lavka_1', 'ch4_rada_lavka_3'] },
      { id: 'oprava', kdy: `${BARA} && akt_b && ${VADA} && !ma('oprava') && !navigace_nahrana`, stupne: ['ch4_rada_oprava_1', 'ch4_rada_oprava_3'] },
      { id: 'vzkaz', kdy: `${BARA} && ${AKT_B} && ma('plan_komise') && !c4_bara_rekla`, stupne: ['ch4_rada_vzkaz'] },
      { id: 'jdu_za_nim', kdy: `${BARA} && ${AKT_B} && ${BARA_HOTOVA}`, stupne: ['ch4_rada_jdu_za_nim'] },
      { id: 'nahrani', kdy: `${BARA} && akt_c && !p29_hotovo`, stupne: ['ch4_rada_nahrani_1', 'ch4_rada_nahrani_2', 'ch4_rada_nahrani_3'] },
      { id: 'nastup_c', kdy: `${BARA} && akt_c && !p30_hotovo`, stupne: ['ch4_rada_nastup_c_1', 'ch4_rada_nastup_c_2', 'ch4_rada_nastup_c_3'] },
      { id: 'bara_ceka', kdy: BARA, stupne: ['ch4_rada_ocima_rudy'] },
    ],

    pamet: [
      { klic: 'ch4_pamet_zprava_poctive', kdy: "c4_report=='poctive'" },
      { klic: 'ch4_pamet_zprava_zelene', kdy: "c4_report=='zelene'" },
      { klic: 'ch4_pamet_obet_pomnik', kdy: "obsahuje(c4_obet, 'pomnik')" },
      { klic: 'ch4_pamet_obet_tlacitka', kdy: "obsahuje(c4_obet, 'tlacitka')" },
      { klic: 'ch4_pamet_obet_bazen', kdy: "obsahuje(c4_obet, 'bazen')" },
      { klic: 'ch4_pamet_slib', kdy: 'c4_slib>=1' },
      { klic: 'ch4_pamet_usmireni_priznal', kdy: "c4_usmireni=='priznal'" },
      { klic: 'ch4_pamet_usmireni_trval', kdy: "c4_usmireni=='trval'" },
      { klic: 'ch4_pamet_zlepseni_ptat', kdy: "c4_zlepseni=='ptat'" },
      { klic: 'ch4_pamet_zlepseni_tabule', kdy: "c4_zlepseni=='tabule'" },
      { klic: 'ch4_pamet_zlepseni_nahlas', kdy: "c4_zlepseni=='nahlas'" },
      { klic: 'ch4_pamet_nastup_3', kdy: 'c4_nastup==3' },
      { klic: 'ch4_pamet_nastup_mene', kdy: 'c4_nastup<3' },
      { klic: 'ch4_pamet_integrace_0', kdy: 'c4_integrace==0' },
      { klic: 'ch4_pamet_integrace_vic', kdy: 'c4_integrace>=1' },
      { klic: 'ch4_pamet_bara_hned', kdy: "c4_bara_rekla=='hned'" },
      { klic: 'ch4_pamet_bara_po', kdy: "c4_bara_rekla=='po_usmireni'" },
      { klic: 'ch4_pamet_clen_zpet', kdy: 'c4_clen_zpet' },
      { klic: 'ch4_pamet_pokracovani', kdy: 'true' },
    ],

    // Texty, které skládá kód (kontrola klíčů je tak najde)
    strihy: [ROZKOL, KONEC, KONF_KONEC, USMIRENI],
    v_kodu: [
      'ch4_ui_zbyva_2', 'ch4_p29_zbylo', 'ch4_p29_vse', 'ch4_p29_ven', 'ch4_p29_ruda_pustil',
      ...['rampa', 'trup', 'pocitadlo', 'nastup'].flatMap((id) => ['zelena', 'zluta', 'cervena'].map((b) => `ch4_listek_${id}_${b}`)),
      'ch4_listek_zmeny_zluta', 'ch4_listek_zmeny_cervena', 'ch4_listek_tym_zluta', 'ch4_listek_tym_cervena',
      ...['zelena', 'zluta', 'cervena'].map((b) => 'ch4_zelenka_listek_' + b),
      ...['kabel', 'bazen', 'start', 'pocitadlo', 'svaciny'].map((b) => 'ch4_p29_bod_' + b),
      ...['pepa', 'klara', 'vera'].flatMap((k) => ['uvod', 'mluvi_1', 'mluvi_2', 'vraci'].map((c) => `ch4_clen_${c}_${k}`)),
      ...PORADI_POSLU.filter((k) => k !== 'vera').flatMap((k) => [`ch4_posel_uvod_${k}`, `ch4_posel_nese_${k}`]),
      'ch4_konf_vymluva_1', 'ch4_konf_vymluva_2', 'ch4_konf_vymluva_3', 'ch4_konf_dukaz_1', 'ch4_konf_dukaz_2', 'ch4_konf_dukaz_3',
      ...['zaznam', 'plan_komise', 'smlouva', 'svedectvi'].map((p) => `ch4_predseda_${p}_driv`),
    ],

    minihry: {},
    pruchody: {},
  };

  // --- tým: dialogy „Jak se máš?“, klíč od poklopu, startovací klíč, drolení -------------
  for (const k of CLENOVE) {
    data.dialogy['tym_' + k] = {
      poprve: 'ch4_tym_' + k + '_uvod', znovu: [],
      vycerpano: 'ch4_tym_vse',
      volby: [
        { t: 'ch4_tym_volba_jak', jednou: true, akce: [{ kdy: "c3_retro=='ano'", akce: 'ch4_tym_' + k + '_retro', jinak: 'ch4_tym_' + k + '_bez' }, '$ptal_' + k, TYM_HOTOV] },
        { t: 'ch4_tym_volba_poklop', kdy: `c3_odchazi=='${k}' && !listek_trup && ${AKT_A}`, akce: [
          { kdy: "c3_poklop=='ne'", akce: ['ch4_klicnik_plan', 'ch4_okenko_pohled'], jinak: ['ch4_klicnik_otevru', 'ch4_poklop_pohled'] }, LISTEK_TRUP] },
        { t: 'ch4_tym_volba_klic_vzit', kdy: `c3_odchazi=='${k}' && !akt_c`, jednou: true, akce: 'ch4_klicnik_z_ruky_ne' },
        ...(k === 'norbert' ? [{ t: 'ch4_tym_volba_klic', kdy: "akt_b && !ma('klic_start') && !motory_zkouseny", akce: ['ch4_norbert_klic', '+klic_start'] }] : []),
        ...(k === 'vera' ? [{ t: 'ch4_tym_volba_droleni', kdy: 'akt_b && c3_drolivy && !rampa_pevna', akce: ['ch4_vera_droleni_1', 'ch4_vera_droleni_2', '$rampa_pevna'] }] : []),
        { t: 'ch4_volba_konec', konec: true, akce: 'ch4_tym_konec' },
      ],
    };
  }

  // --- M03 Souboj argumenty se starostou (P4.8) -------------------------------------------
  const M03_KOLA = (p) => [...(p.c1_slib_vseho >= 3 ? ['fontana'] : []), 'zelene', 'nalodit', 'kolik', 'noviny', 'verit'];
  const m03Podklad = (p, id) => ({
    fontana: !!p.c1_mimo_rozsah,
    zelene: !!(p.listek_rampa || p.listek_trup),
    nalodit: !!p.listek_nastup || (p.c3_hodnota || 0) >= 2,
    kolik: !!p.listek_pocitadlo,
    noviny: !!p.c1_mimo_rozsah || !!p.listek_zmeny,
    verit: p.c4_report === 'poctive' || !!p.listek_tym,
  })[id];
  const m03Namitka = (p, id) => 'ch4_m03_' + id + '_namitka' + (id === 'zelene' ? '_' + p.c4_report : '');
  data.minihry.m03 = {
    nazev: 'ch1_m03_nazev', navod: 'ch4_m03_navod',
    priprav: (h) => {
      const st = h.s.minihra;
      const p = h.s.priznaky;
      const kola = M03_KOLA(p);
      st.kolo = st.kolo || 1;
      const id = kola[st.kolo - 1];
      const odpovedi = ['dobra', 'rychla', 'slaba'].filter((d) => d !== 'dobra' || m03Podklad(p, id));
      const posun = st.kolo % odpovedi.length;
      return {
        druh: 'souboj', kolo: st.kolo, kol: kola.length, vyhrano: st.vyhrano || 0, preskocit: true,
        namitka: m03Namitka(p, id),
        odpovedi: odpovedi.slice(posun).concat(odpovedi.slice(0, posun)).map((d) => ({ druh: d, klic: 'ch4_m03_' + id + '_' + d })),
      };
    },
    vyhodnot: (h, v) => {
      const st = h.s.minihra;
      const p = h.s.priznaky;
      const kola = M03_KOLA(p);
      const konec = (vyhrano, rychle) => {
        h.proved(['$c4_souboj=' + Math.min(5, vyhrano), '$c4_slib=' + Math.min(5, rychle), vyhrano >= 3 ? 'ch4_m03_vyhra' : 'ch4_m03_prohra',
          { kdy: '!souboj_hotovo', akce: ['ch4_m03_po_tabule', 'ch4_pembok_po_souboji'] }, '$souboj_hotovo']);
        // Po výhře starosta vede Rudu rovnou k tabuli rozsahu (R4.2); po prohře ji hráč otevře sám, nebo souboj zopakuje
        if (vyhrano >= 3) { h.proved('ch4_r42_uvod'); h.s.minihra = { id: 'r42' }; return { hotovo: false }; }
        return { hotovo: true };
      };
      if (v.preskocit) { h.rekni('ch4_m03_preskocit'); return konec(3, 2); }
      const k = st.kolo || 1;
      const id = kola[k - 1];
      if (!['dobra', 'rychla', 'slaba'].includes(v.volba) || (v.volba === 'dobra' && !m03Podklad(p, id))) return { hotovo: false };
      h.rekni('ch4_m03_' + id + '_' + v.volba);
      h.rekni('ch4_m03_' + id + '_' + v.volba + '_reakce');
      if (v.volba !== 'slaba') st.vyhrano = (st.vyhrano || 0) + 1;
      if (v.volba === 'rychla') st.rychle = (st.rychle || 0) + 1;
      if (k < kola.length) { st.kolo = k + 1; h.rekni(m03Namitka(p, kola[k])); return { hotovo: false }; }
      return konec(st.vyhrano || 0, st.rychle || 0);
    },
  };

  // --- R4.2 Co obětovat (P4.9): tabule rozsahu jako výběr dílků --------------------------------
  const DILKY = (p) => {
    const hotove = seznam(p.c3_hotove);
    const d = [];
    if (p.c3_bazen_v_trupu) d.push({ id: 'bazen', velikost: 2 });
    if (p.c3_bazen === 'vyjednan') d.push({ id: 'bazen_naf', velikost: 1 });
    if (p.c3_svaciny && p.c3_svaciny !== 'odmitnuty') d.push({ id: 'svaciny', velikost: 1 });
    if (hotove.includes('odpocet')) d.push({ id: 'odpocet', velikost: 1 });
    d.push({ id: 'zpet', velikost: 1 });
    if (hotove.includes('tlacitka')) d.push({ id: 'tlacitka', velikost: 1 });
    d.push({ id: 'kajuty', velikost: 2 }, { id: 'pomnik', velikost: 2 });
    if ((p.c1_slib_vseho || 0) >= 3 && !p.c1_mimo_rozsah) d.push({ id: 'fontana', velikost: 1 }, { id: 'terasa', velikost: 1 });
    return d;
  };
  const creepNaTabuli = (p) => Math.max(0, (p.c3_creep || 0) - (p.c3_zlepseni === 'zmeny' ? 1 : 0));
  data.minihry.r42 = {
    nazev: 'ch4_r42_nazev', navod: 'ch4_r42_navod',
    priprav: (h) => {
      const p = h.s.priznaky;
      const dilky = DILKY(p);
      return {
        druh: 'plan_kola',
        cile: [{ id: 'start', klic: 'ch4_r42_cil_start' }],
        karty: dilky.map((d) => ({ id: d.id, klic: 'ch4_r42_dilek_' + d.id, odhad: d.velikost })),
        kapacita: 2 + creepNaTabuli(p), vynucene: [], diktat: null,
        jestetoto: creepNaTabuli(p), bez_odporu: Math.max(0, (p.c4_souboj || 0) - 2),
      };
    },
    vyhodnot: (h, v) => {
      const p = h.s.priznaky;
      const dilky = DILKY(p);
      const vybrane = [...new Set(v.karty || [])].filter((id) => dilky.some((d) => d.id === id));
      const soucet = vybrane.reduce((a, id) => a + dilky.find((d) => d.id === id).velikost, 0);
      const creep = creepNaTabuli(p);
      const zbylyCreep = Math.max(0, creep - vybrane.length);
      if (soucet - zbylyCreep < 2) { h.rekni(vybrane.length ? 'ch4_r42_nevejde' : 'ch4_r42_nic'); return { hotovo: false }; }
      const limit = Math.max(0, (p.c4_souboj || 0) - 2);
      const pocitane = vybrane.filter((id) => !(id === 'bazen_naf' && p.c1_mimo_rozsah));
      const akce = [];
      if (vybrane.includes('bazen_naf') && p.c1_mimo_rozsah) akce.push('ch4_r42_starosta_bazen_nepatri');
      pocitane.forEach((id, i) => { if (i >= limit) akce.push('ch4_r42_starosta_to_ne', 'ch4_r42_ruda_trva'); });
      if (vybrane.includes('pomnik')) akce.push('ch4_r42_pomnik_ruda', 'ch4_r42_pomnik_starosta', 'ch4_pembok_pomnik');
      else akce.push('ch4_r42_pomnik_zustane');
      if (vybrane.includes('tlacitka')) akce.push('ch4_r42_bara_lidi_chteli');
      if (vybrane.includes('bazen')) akce.push('ch4_r42_bazen_ven');
      akce.push('$c4_obet=' + vybrane.join('-'), '$c4_creep=' + zbylyCreep, creep && !zbylyCreep ? 'ch4_r42_jestetoto_zmizel' : zbylyCreep ? 'ch4_r42_jestetoto_mensi' : 'ch4_r42_jestetoto_nebyl',
        'ch4_r42_hotovo', ...ROZKOL);
      h.proved(akce);
      return { hotovo: true };
    },
  };

  // --- M11 Plachetnice (P4.28): karty událostí ke kotvě, větru, nebo útesu -------------------
  const M11_KARTY = (p) => [
    { id: 'zelena', spravne: 'kotva', mluvi: 'postava_zelenka' },
    { id: 'rozkol', spravne: 'kotva', mluvi: 'postava_bara' },
    { id: 'posel', spravne: 'vitr', mluvi: NAZEV[p.posel1] || 'postava_klara' },
    { id: 'jestetoto', spravne: 'kotva', mluvi: 'postava_pembok' },
    { id: 'palivo', spravne: 'kotva', mluvi: 'postava_ruda' },
    { id: 'zprava', spravne: p.c4_report === 'poctive' ? 'vitr' : 'kotva', mluvi: 'postava_pembok' },
    { id: 'dukazy', spravne: 'vitr', mluvi: 'postava_bara' },
    ...(p.c3_zlepseni ? [{ id: 'sedli', spravne: 'vitr', mluvi: 'postava_pembok' }] : []),
    ...(p.c3_retro === 'ne' ? [{ id: 'odesel', spravne: 'kotva', mluvi: p.c4_clen_zpet ? NAZEV[p.c3_odchazi] : 'postava_pembok' }] : []),
    { id: 'lahev_rybari', spravne: 'utes', mluvi: 'postava_lumir' },
    { id: 'lahev_prani', spravne: 'utes', mluvi: 'postava_pembok' },
    { id: 'zlepseni', spravne: null, mluvi: 'postava_pembok' },
  ];
  const ZLEPSENI = ['ptat', 'tabule', 'nahlas'];
  data.minihry.m11 = {
    nazev: 'ch4_m11_nazev', navod: 'ch4_m11_navod',
    priprav: (h) => {
      const st = h.s.minihra;
      const p = h.s.priznaky;
      st.i = st.i || 0;
      const karty = M11_KARTY(p);
      const karta = karty[st.i];
      const posledni = karta.id === 'zlepseni';
      return {
        druh: 'rozcestnik', kolo: posledni ? 3 : st.i < 7 ? 1 : 2,
        prihradky: posledni ? ZLEPSENI.map((id) => ({ id, klic: 'ch4_m11_zlepseni_' + id })) : ['kotva', 'vitr', 'utes'].map((id) => ({ id, klic: 'ch4_m11_' + id })),
        karta: { id: karta.id, klic: 'ch4_m11_karta_' + karta.id, zadatel: karta.mluvi },
        tvor: 'ch4_m11_lod', velikost: Math.min(4, st.i), vyrizeno: [],
      };
    },
    vyhodnot: (h, v) => {
      const st = h.s.minihra;
      const p = h.s.priznaky;
      const karty = M11_KARTY(p);
      const konec = (zlepseni) => {
        h.proved(['$c4_zlepseni=' + zlepseni, 'ch4_m11_vybrano_' + zlepseni, 'ch4_m11_konec', '$akt_c', '$dny=2', '*karta:ch4_ui_zbyva_2', 'ch4_strih_2',
          { kdy: "c3_retro=='ano' || c4_clen_zpet", akce: [(h2) => h2.rekni('ch4_strih_2_klic', [NAZEV[p.c3_odchazi]]), KLIC_PRO_RUDU], jinak: 'ch4_strih_2_bez_klice' },
          'ch4_strih_2_zelenka']);
        return { hotovo: true };
      };
      if (v.preskocit) { h.rekni('ch4_m11_preskocit'); return konec('tabule'); }
      const karta = karty[st.i || 0];
      if (!karta || v.karta !== karta.id) return { hotovo: false };
      if (karta.id === 'zlepseni') {
        if (!ZLEPSENI.includes(v.kam)) return { hotovo: false };
        return konec(v.kam);
      }
      if (!['kotva', 'vitr', 'utes'].includes(v.kam)) return { hotovo: false };
      // Špatně položenou kartu Pembok přesune sám: minihra tím nestojí (D12)
      if (v.kam !== karta.spravne) h.rekni(karta.spravne === 'utes' ? 'ch4_m11_lahev_jinam' : v.kam === 'utes' ? 'ch4_m11_neni_utes' : 'ch4_m11_jinak');
      h.rekni('ch4_m11_' + karta.id + '_rekne');
      st.i = (st.i || 0) + 1;
      if (karty[st.i].id === 'lahev_rybari') h.rekni('ch4_m11_lahve');
      if (karty[st.i].id === 'zlepseni') h.rekni('ch4_m11_zlepseni_otazka');
      return { hotovo: false };
    },
  };

  // --- Průchody z docs/kapitoly/04-pruchod.md ---------------------------------------------------
  const souboj = (...volby) => volby.map((v) => ({ minihra: { volba: v } }));
  const RADNICE = (kam) => ['pouzij radnice_' + kam];
  const ZPET = () => ['pouzij vytah'];
  const M11_DOBRE = (navic) => [
    { minihra: { karta: 'zelena', kam: 'kotva' } }, { minihra: { karta: 'rozkol', kam: 'kotva' } }, { minihra: { karta: 'posel', kam: 'vitr' } },
    { minihra: { karta: 'jestetoto', kam: 'kotva' } }, { minihra: { karta: 'palivo', kam: 'kotva' } }, { minihra: { karta: 'zprava', kam: navic.zprava || 'vitr' } },
    { minihra: { karta: 'dukazy', kam: 'vitr' } }, ...(navic.sedli ? [{ minihra: { karta: 'sedli', kam: 'vitr' } }] : []), ...(navic.odesel ? [{ minihra: { karta: 'odesel', kam: 'kotva' } }] : []),
    { minihra: { karta: 'lahev_rybari', kam: 'utes' } }, { minihra: { karta: 'lahev_prani', kam: 'utes' } }, { minihra: { karta: 'zlepseni', kam: navic.zlepseni || 'tabule' } }];
  // Bára v aktu B: minutka, tisk, archiv, Komise (smlouva)
  const BARA_AKT_B = (gantt) => [
    'pouzij minutka', 'pouzij pocitac', 'volba ch4_pocitac_volba_tisk', ...(gantt ? ['volba ch4_volba_konec', 'pouzij papir'] : ['volba ch4_volba_konec']),
    'pouzij dvere', 'pouzij brana', ...RADNICE('archiv'),
    'predmet minutka lumir', 'pouzij kartoteka', 'volba ch4_kartoteka_volba_duben', 'predmet zaznam seznam',
    'pouzij do_komise', 'pouzij framework', 'volba ch4_framework_volba_reference'];
  // Důkazy předkládá Bára (vzkaz „hned“), nebo Ruda (dostal desky při usmíření)
  const AKT_C_DOBRE = (hned = true) => [
    'predmet klic_poklopu poklop', 'pouzij ridici_pocitac',
    'pouzij brana', 'predmet listky obyvatele', 'ocekavej c4_nastup==3',
    'prepni', ...RADNICE('komise'), 'pouzij predseda', ...(hned ? ['prepni'] : []), 'predmet zaznam predseda', 'predmet plan_komise predseda', 'predmet smlouva predseda'];

  data.pruchody = {
    nejkratsi: {
      popis: 'Nejkratší cesta, dobré kapitoly 1 až 3 (04-pruchod.md §1)',
      start: 'dobra',
      kroky: [
        'pouzij schody', 'pouzij brana',
        'pouzij pepa', 'volba ch4_tym_volba_poklop', 'volba ch4_tym_volba_jak', 'volba ch4_volba_konec',
        'pouzij vera', 'volba ch4_tym_volba_jak', 'volba ch4_volba_konec', 'pouzij norbert', 'volba ch4_tym_volba_jak', 'volba ch4_volba_konec',
        'pouzij klara', 'volba ch4_tym_volba_jak', 'volba ch4_volba_konec', 'ocekavej c4_listky==2',
        'prepni', 'pouzij schody', 'pouzij brana', 'predmet metr jestetoto', 'pouzij bocni', 'pouzij pocitac', 'ocekavej c4_listky==4',
        'prepni', 'pouzij brana', 'pouzij schody_vez', 'pouzij telegraf', 'volba ch4_telegraf_volba_poctive',
        ...souboj('dobra', 'dobra', 'dobra', 'dobra', 'dobra'),
        { minihra: { cil: 'start', karty: ['pomnik', 'svaciny'] } }, 'ocekavej c4_souboj==5 && akt_b', "ocekavej posel1=='klara' && posel2=='pepa'",
        // Akt B, Ruda: klíč, palivo, povolení, zkouška motorů
        'pouzij schody', 'pouzij brana', 'pouzij norbert', 'volba ch4_tym_volba_klic', 'volba ch4_volba_konec',
        'pouzij brana', 'pouzij vratny', 'volba ch4_vratny_volba_sud', 'volba ch4_volba_konec',
        ...RADNICE('komise'), 'pouzij predseda', 'volba ch4_predseda_volba_povoleni', 'volba ch4_volba_konec', 'pouzij fronta', 'ocekavej povoleni_odmitnuto',
        ...ZPET(), 'pouzij brana', 'predmet klic_start pult', 'ocekavej motory_zkouseny',
        // Akt B, Bára
        'prepni', ...BARA_AKT_B(false).slice(0, -3), 'pouzij schody', 'pouzij posel_pepa', 'volba ch4_posel_volba_vzkaz', "ocekavej c4_bara_rekla=='hned'", 'volba ch4_volba_konec',
        ...RADNICE('komise'), 'pouzij framework', 'volba ch4_framework_volba_reference', 'ocekavej usmireni', 'volba ch4_usm_volba_priznal',
        ...M11_DOBRE({ sedli: true }), 'ocekavej akt_c',
        'prepni', ...AKT_C_DOBRE(), 'ocekavej podpis_startu',
      ],
      ocekavej: ['konec', "c4_report=='poctive'", 'c4_listky==4', 'c4_souboj==5', 'c4_slib==0', "c4_obet=='pomnik-svaciny'", 'c4_creep==0',
        "c4_usmireni=='priznal'", "c4_bara_rekla=='hned'", "c4_zlepseni=='tabule'", 'c4_integrace==0', 'c4_nastup==3', "c4_nastup_chybi=='zadny'", '!c4_clen_zpet', 'dny==1'],
    },
    spatne_kapitoly: {
      popis: 'Špatné kapitoly 1 až 3: zelená zpráva, bez posezení, babička, plošina, bez poklopu, vada, lávka, gantt, dvojí tisk, Ruda sám (04-pruchod.md §3)',
      start: 'spatna',
      kroky: [
        'pouzij telegraf', 'volba ch4_telegraf_volba_zelene',
        ...souboj('rychla', 'rychla', 'rychla', 'slaba', 'slaba', 'slaba'),
        { minihra: { cil: 'start', karty: ['bazen', 'pomnik'] } }, "ocekavej c4_report=='zelene' && c4_souboj==3 && c4_slib==3 && akt_b && c4_creep==1", "ocekavej posel1=='krystof' && posel2=='zdenda'",
        // Ruda: klíč od vrátného, palivo, plošina, rozpis po poslovi, babička
        'pouzij schody', 'pouzij vratny', 'volba ch4_vratny_volba_klic', 'volba ch4_vratny_volba_sud', 'volba ch4_vratny_volba_plosina', 'volba ch4_volba_konec',
        'predmet rozpis posel_zdenda', 'ocekavej rozpis_u_bary',
        'pouzij babicka', 'volba ch4_babicka_volba_proc', 'volba ch4_volba_konec',
        'pouzij posel_zdenda', 'volba ch4_posel_volba_listek', 'volba ch4_volba_konec',
        // Komise: povolení a odešlý Pepa
        ...RADNICE('komise'), 'pouzij predseda', 'volba ch4_predseda_volba_povoleni', 'volba ch4_volba_konec', 'pouzij fronta',
        'pouzij clen_pepa', 'volba ch4_clen_volba_gantt', 'volba ch4_clen_volba_priznat', 'volba ch4_clen_volba_skocit',
        'volba ch4_clen_volba_mlcet', 'volba ch4_clen_volba_mlcet', "ocekavej c4_clen_zpet && ma('plan_zapojeni') && ma('svedectvi')",
        ...ZPET(), 'pouzij brana', 'predmet klic_start pult', 'ocekavej motory_zkouseny',
        // Bára: oprava, dvojí tisk, papír, lávka, archiv, Komise, lístek pro babičku; vzkaz nejde (nízká důvěra)
        'prepni', 'pouzij pocitac', 'volba ch4_pocitac_volba_oprava', 'volba ch4_pocitac_volba_tisk', 'volba ch4_pocitac_volba_tisk', 'volba ch4_volba_konec', 'pouzij papir',
        'predmet rozpis pocitac', 'ocekavej lavka_znama',
        'pouzij minutka', 'pouzij dvere', 'pouzij brana', 'predmet listky posel_zdenda', ...RADNICE('archiv'),
        'predmet minutka lumir', 'pouzij kartoteka', 'volba ch4_kartoteka_volba_duben', 'predmet zaznam seznam',
        'pouzij schody', 'pouzij posel_zdenda', 'volba ch4_posel_volba_vzkaz', "ocekavej rekl('ch4_posel_vzkaz_jeste_ne')", 'volba ch4_volba_konec',
        // Ruda dá babičce lístek; Bára pak v Komisi dokončí linku a jde za ním
        'prepni', 'pouzij brana', 'predmet listek_babicka babicka', 'ocekavej babicka_vstala',
        'prepni', ...RADNICE('komise'), 'pouzij framework', 'volba ch4_framework_volba_reference', 'ocekavej usmireni', 'volba ch4_usm_volba_trval',
        { minihra: { preskocit: true } }, "ocekavej akt_c && c4_zlepseni=='tabule' && c4_bara_rekla=='po_usmireni'",
        // Akt C: Věra navrtá trup, počítadlo zbude („Zavírám“), nástup, konfrontace se svědectvím
        'prepni', 'predmet plan_zapojeni vera', 'pouzij ridici_pocitac', 'volba ch4_p29_volba_zavrit', 'volba ch4_p29_volba_zavrit', 'ocekavej c4_integrace==1',
        'pouzij brana', 'predmet listky obyvatele', "ocekavej c4_nastup==1 && c4_nastup_chybi=='obyvatele-rybari'",
        'prepni', ...RADNICE('komise'), 'pouzij predseda', 'predmet plan_komise predseda', "ocekavej rekl('ch4_konf_faze2_1')",
        'predmet zaznam predseda', 'predmet plan_komise predseda', 'predmet svedectvi predseda',
      ],
      ocekavej: ['konec', "c4_report=='zelene'", 'c4_listky==0', 'c4_souboj==3', 'c4_slib==3', "c4_obet=='bazen-pomnik'", 'c4_creep==1',
        "c4_usmireni=='trval'", "c4_bara_rekla=='po_usmireni'", "c4_zlepseni=='tabule'", 'c4_integrace==1', 'c4_nastup==1', 'c4_clen_zpet', "ma('kopie')"],
    },
    prohrany_souboj: {
      popis: 'Varianty A, C, E, F, G, H, I: zelená zpráva, prohraný souboj s odporem starosty, obětovaná tlačítka, trval na svém, Bára mlčí, „Stačí. Zavírám.“, M11 přeskočená',
      start: 'dobra',
      priznaky: { c3_nesladeno: 'kabel-start', c3_integrace: 2 },
      kroky: [
        'pouzij telegraf', 'volba ch4_telegraf_volba_zelene',
        ...souboj('slaba', 'slaba', 'slaba', 'slaba', 'slaba'), 'ocekavej c4_souboj==0',
        'pouzij starosta', 'volba ch4_starosta_volba_znovu', ...souboj('slaba', 'rychla', 'slaba', 'slaba', 'slaba'), 'ocekavej c4_souboj==1 && c4_slib==1',
        'pouzij tabule_rozsahu', { minihra: { cil: 'start', karty: ['zpet'] } },
        { minihra: { cil: 'start', karty: ['tlacitka', 'zpet'] } }, "ocekavej rekl('ch4_r42_nevejde') && rekl('ch4_r42_starosta_to_ne') && akt_b",
        'pouzij schody', 'pouzij brana', 'pouzij norbert', 'volba ch4_tym_volba_klic', 'volba ch4_volba_konec',
        'pouzij brana', 'pouzij vratny', 'volba ch4_vratny_volba_sud', 'volba ch4_volba_konec',
        ...RADNICE('komise'), 'pouzij predseda', 'volba ch4_predseda_volba_povoleni', 'volba ch4_volba_konec', 'pouzij fronta',
        ...ZPET(), 'pouzij brana', 'predmet klic_start pult',
        'prepni', ...BARA_AKT_B(false), 'ocekavej usmireni', 'volba ch4_usm_volba_trval',
        { minihra: { preskocit: true } }, "ocekavej c4_bara_rekla=='po_usmireni'",
        'prepni', "ocekavej ma('klic_poklopu') && ma('zaznam')", 'predmet klic_poklopu poklop', 'pouzij ridici_pocitac',
        'volba ch4_p29_volba_tahnout', 'volba ch4_p29_volba_zavrit', 'volba ch4_p29_volba_zavrit', 'ocekavej c4_integrace==1',
        'pouzij brana', 'predmet listky obyvatele', "ocekavej c4_nastup==2 && c4_nastup_chybi=='babicka'",
        'prepni', ...RADNICE('komise'), 'pouzij predseda', 'predmet zaznam predseda', 'predmet plan_komise predseda', 'predmet smlouva predseda',
      ],
      ocekavej: ['konec', "c4_report=='zelene'", 'c4_souboj==1', "c4_obet=='tlacitka-zpet'", "c4_usmireni=='trval'", "c4_zlepseni=='tabule'", 'c4_integrace==1', 'c4_nastup==2'],
    },
    kocka_bazen_paska: {
      popis: 'Varianty M, O, P, T, X, Y, I: odmítnutá babička s kocourem, drolení bez Věry, netěsný poklop, bazén do kašny, klíč od vrátného, kočka, M03 přeskočená',
      start: 'dobra',
      priznaky: { c1_babicka: 'odmitnuta', c3_bazen: 'bez_rizeni', c3_bazen_v_trupu: true, c3_poklop: 'netesni', c2_riziko_predem: 'krysy', c3_drolivy: true, c2_tym: 'pepa-klara-krystof-zdenda', c3_creep: 2 },
      kroky: [
        'pouzij schody', 'pouzij vratny', 'volba ch4_vratny_volba_denik', 'volba ch4_volba_konec', 'predmet denik rozpis', "ocekavej listek_rampa=='cervena'",
        'pouzij brana', 'pouzij pepa', 'volba ch4_tym_volba_poklop', 'volba ch4_volba_konec', "ocekavej listek_trup=='zelena'",
        'prepni', 'pouzij schody', 'pouzij obyvatele', 'pouzij lavka', "ocekavej listek_nastup=='zluta'",
        'pouzij brana', 'predmet metr jestetoto', "ocekavej listek_zmeny=='cervena' && c4_listky==4",
        'prepni', 'pouzij brana', 'pouzij schody_vez', 'pouzij telegraf', 'volba ch4_telegraf_volba_poctive',
        { minihra: { preskocit: true } },
        { minihra: { cil: 'start', karty: ['pomnik', 'svaciny'] } }, 'ocekavej c4_souboj==3 && c4_slib==2 && akt_b && c4_creep==0', "ocekavej posel1=='klara' && posel2=='krystof'",
        // Ruda: klíč od vrátného, palivo, drolení deníkem, kocour, babička, páska přes posla, bazén do kašny
        'pouzij schody', 'pouzij vratny', 'volba ch4_vratny_volba_klic', 'volba ch4_vratny_volba_sud', 'volba ch4_volba_konec',
        'predmet denik vratny', 'ocekavej rampa_pevna',
        'pouzij babicka', 'volba ch4_babicka_volba_proc', 'volba ch4_volba_konec',
        'pouzij brana', 'pouzij zebrik', 'ocekavej kocour_u_rudy',
        'pouzij posel_klara', 'volba ch4_posel_volba_paska', 'volba ch4_volba_konec',
        'pouzij zmena', 'volba ch4_zmena_volba_mlcet', 'volba ch4_zmena_volba_mlcet', 'volba ch4_zmena_volba_kajuta', 'volba ch4_zmena_volba_kasna', 'ocekavej bazen_ven',
        'predmet klic_start pult', 'pouzij brana', ...RADNICE('komise'), 'pouzij predseda', 'volba ch4_predseda_volba_povoleni', 'volba ch4_volba_konec', 'pouzij fronta',
        // Bára: páska, lístky, lístek pro babičku, archiv, Komise
        'prepni', 'pouzij police', 'predmet paska posel_klara', 'pouzij minutka', 'pouzij pocitac', 'volba ch4_pocitac_volba_tisk', 'volba ch4_volba_konec',
        'pouzij dvere', 'pouzij brana', 'predmet listky posel_krystof', ...RADNICE('archiv'),
        'predmet minutka lumir', 'pouzij kartoteka', 'volba ch4_kartoteka_volba_duben', 'predmet zaznam seznam',
        'pouzij do_komise', 'pouzij framework', 'volba ch4_framework_volba_reference', 'ocekavej usmireni', 'volba ch4_usm_volba_priznal',
        ...M11_DOBRE({ sedli: true, zlepseni: 'ptat' }),
        // Akt C: Ruda dá babičce lístek a utěsní poklop, pak navigace, nástup, Komise
        'prepni', 'pouzij brana', 'predmet listek_babicka babicka', 'ocekavej babicka_vstala', 'pouzij brana', 'predmet paska poklop', 'ocekavej poklop_utesnen',
        ...AKT_C_DOBRE(false),
      ],
      ocekavej: ['konec', "c4_zlepseni=='ptat'", 'c4_integrace==0', 'c4_nastup==3', 'bazen_ven', 'c4_creep==0', "c4_bara_rekla=='po_usmireni'"],
    },
    usmev_vera_odesla: {
      popis: 'Varianty K (odešla Věra, vrátí se až v aktu C), Q (bez poklopu, Věra navrtá) a U (kopie podpisů v konfrontaci)',
      start: 'dobra',
      priznaky: { c2_riziko_predem: 'usmev', c3_retro: 'ne', c3_odchazi: 'vera', c3_poklop: 'ne', c3_nesladeno: 'navigace', c3_integrace: 1, c3_zlepseni: 0 },
      kroky: [
        "ocekavej ma('kopie')",
        'pouzij schody', 'pouzij brana', 'pouzij pepa', 'volba ch4_tym_volba_jak', 'volba ch4_volba_konec', 'pouzij norbert', 'volba ch4_tym_volba_jak', 'volba ch4_volba_konec',
        'pouzij klara', 'volba ch4_tym_volba_jak', 'volba ch4_volba_konec', "ocekavej listek_tym=='cervena'",
        'pouzij brana', 'pouzij vratny', 'volba ch4_vratny_volba_denik', 'volba ch4_volba_konec', 'predmet denik rozpis',
        'prepni', 'pouzij schody', 'pouzij brana', 'predmet metr jestetoto', 'pouzij bocni', 'pouzij pocitac', 'ocekavej c4_listky==4',
        'prepni', 'pouzij schody_vez', 'pouzij telegraf', 'volba ch4_telegraf_volba_poctive',
        ...souboj('dobra', 'dobra', 'dobra', 'dobra', 'dobra'),
        { minihra: { cil: 'start', karty: ['pomnik'] } }, "ocekavej posel1=='klara' && posel2=='pepa'",
        'pouzij schody', 'pouzij brana', 'pouzij norbert', 'volba ch4_tym_volba_klic', 'volba ch4_volba_konec',
        'pouzij brana', 'pouzij vratny', 'volba ch4_vratny_volba_sud', 'volba ch4_volba_konec',
        ...RADNICE('komise'), 'pouzij predseda', 'volba ch4_predseda_volba_povoleni', 'volba ch4_volba_konec', 'pouzij fronta',
        ...ZPET(), 'pouzij brana', 'predmet klic_start pult',
        'prepni', ...BARA_AKT_B(false).slice(0, -3), 'pouzij schody', 'pouzij posel_pepa', 'volba ch4_posel_volba_vzkaz', 'volba ch4_volba_konec',
        ...RADNICE('komise'), 'pouzij framework', 'volba ch4_framework_volba_reference', 'volba ch4_usm_volba_priznal',
        ...M11_DOBRE({ odesel: true }), "ocekavej akt_c && !ma('plan_zapojeni')",
        // Akt C: Věra se vrátí až teď, přinese plán zapojení a svědectví
        'prepni', 'pouzij brana', ...RADNICE('komise'), 'pouzij clen_vera', 'volba ch4_clen_volba_priznat', 'volba ch4_clen_volba_mlcet', 'volba ch4_clen_volba_mlcet', "ocekavej ma('plan_zapojeni')",
        ...ZPET(), 'pouzij brana', 'predmet plan_zapojeni vera', 'pouzij ridici_pocitac', 'ocekavej c4_integrace==0',
        'pouzij brana', 'predmet listky obyvatele',
        'prepni', ...RADNICE('komise'), 'pouzij predseda', 'predmet kopie predseda', 'prepni', 'predmet plan_komise predseda', 'prepni', 'predmet svedectvi predseda',
      ],
      ocekavej: ['konec', 'c4_clen_zpet', 'c4_integrace==0', 'c4_nastup==3', "c4_bara_rekla=='hned'", "!ma('kopie')"],
    },
  };

  // Každé aktivní místo se rozdělí na Rudovu a Bářinu verzi (vlastní id), takže každá postava vidí
  // jen místa, která pro ni něco dělají. Automatická kontrola pak počítá pokusy pro každou postavu zvlášť.
  // Místa společná v průchodech (Předseda, poslové, východy, druhá postava) zůstávají jedna.
  const BARA_HLAVNI = ['kartoteka', 'lumir', 'kniha', 'regal', 'pouceni', 'hluboky_regal', 'pocitac', 'minutka', 'police', 'papir', 'tiskarna',
    'obyvatele', 'lavka', 'jestetoto', 'ridici_pocitac', 'pripojka', 'poklop_zevnitr', 'panel', 'bazen', 'okenko'];
  const SPOLECNA = ['predseda', 'framework'];
  const rozdel = (m) => {
    if (m.postava || m.vychod || m.druh === 'vychod' || /^posel_/.test(m.id) || SPOLECNA.includes(m.id)) return [m];
    const baraHlavni = BARA_HLAVNI.includes(m.id);
    const zaklad = { nazev: m.nazev, druh: m.druh, r: m.r, kdy: m.kdy, obraz: m.obraz };
    const ruda = { id: baraHlavni ? m.id + '_r' : m.id, ...zaklad, postava: 'ruda', prohlednout: m.prohlednout, pouzit: m.pouzit, na: m.na };
    const bara = { id: baraHlavni ? m.id : m.id + '_b', ...zaklad, postava: 'bara', bara_prohlednout: m.bara_prohlednout, bara_pouzit: m.bara_pouzit, bara_na: m.bara_na };
    const vysledek = [];
    if (ruda.prohlednout !== undefined || ruda.pouzit !== undefined || ruda.na !== undefined) vysledek.push(ruda);
    if (bara.bara_prohlednout !== undefined || bara.bara_pouzit !== undefined || bara.bara_na !== undefined) vysledek.push(bara);
    return vysledek;
  };
  for (const sc of Object.values(data.sceny)) sc.mista = sc.mista.flatMap(rozdel);

  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  else koren.KAPITOLA4 = data;
})(typeof window !== 'undefined' ? window : globalThis);
