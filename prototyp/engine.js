// Engine šedého prototypu: logika kapitoly bez grafiky. Běží v prohlížeči (window.Prototyp)
// i v Node (require), takže stejná pravidla hraje hráč i automatická kontrola průchodu.
//
// Data kapitoly (kapitola1.js) popisují scény, aktivní místa, dialogy a minihry. Akce jsou
// krátké řetězce:
//   "ch1_klic"   řekne text z texty.csv (mluvčí podle sloupce _mluvci)
//   "+predmet"   přidá předmět aktivní postavě, "-predmet" ho odebere
//   "$priznak"   nastaví příznak na true, "$p=3", "$p=slovo", "$p+1" (přičte)
//   ">scena"     přejde do scény (spustí její „prichod“)
//   "#dialog"    otevře dialog, samotné "#" ho zavře; volba s `jednou` po vybrání zmizí
//                a když zbude jen rozloučení, postava řekne `vycerpano` a dialog se zavře
//   "@minihra"   otevře minihru
//   "~bara"      přepne hranou postavu (Bára / Ruda); každá stojí ve své scéně (s.kde)
//   "^bara=dilna" přesune postavu do scény (nehranou jen přestaví, hranou do ní pošle)
//   "*karta:klic"  titulková karta, "*konec" obrazovka následků
// a objekty {kdy, akce, jinak} pro podmínky a {stridat: [..]} pro střídání replik.
// Funkce (h) => … dostane API hry; hodí se na příznaky, které se počítají (tým, seznamy).
// Podmínky jsou JS výrazy nad příznaky: ma('kava'), byl('archiv'), rekl('ch1_klic'), c1_babicka=='spojenec',
// obsahuje(c2_mosty, 'trup'), pocet(c2_mosty). Globální objekty (String, Math) v nich nejsou.
(function (koren) {
  'use strict';

  function vytvorHru(data, texty) {
    const s = {
      scena: null,
      postava: 'ruda',
      kde: {},
      predmety: { ruda: [], bara: [] },
      priznaky: {},
      citace: {},
      navstiveno: {},
      dialog: null,
      minihra: null,
      konec: false,
      napovedy: {},
    };
    let udalosti = [];
    const chyby = [];

    // --- texty -------------------------------------------------------------
    function text(klic) {
      const t = texty[klic];
      if (!t) { chyby.push('chybí text ' + klic); return { cs: klic, en: klic, mluvci: '' }; }
      return t;
    }
    function rekni(klic, dosad) {
      const t = text(klic);
      s.citace['rec_' + klic] = (s.citace['rec_' + klic] || 0) + 1;
      udalosti.push({ typ: 'rec', klic, mluvci: t.mluvci || '', dosad: dosad || null });
    }

    // --- podmínky ----------------------------------------------------------
    const pomocnici = {
      ma: (p) => s.predmety[s.postava].includes(p),
      byl: (sc) => !!s.navstiveno[sc],
      postava: () => s.postava,
      scena: () => s.scena,
      kde: (p) => (p === s.postava ? s.scena : s.kde[p]),
      rekl: (klic) => !!s.citace['rec_' + klic],
      // Seznamy v příznacích jsou řetězce s pomlčkami (c2_mosty = 'trup-nastup-start')
      obsahuje: (seznam, prvek) => String(seznam || '').split('-').includes(prvek),
      pocet: (seznam) => String(seznam || '').split('-').filter((x) => x && x !== 'zadny').length,
    };
    const rozsah = new Proxy({}, {
      has: () => true,
      get: (_, k) => {
        if (k === Symbol.unscopables) return undefined;
        if (k in pomocnici) return pomocnici[k];
        const v = s.priznaky[k];
        return v === undefined ? 0 : v;
      },
    });
    const preklad = {};
    function plati(vyraz) {
      if (vyraz === undefined || vyraz === null || vyraz === '') return true;
      if (!preklad[vyraz]) {
        // eslint-disable-next-line no-new-func
        preklad[vyraz] = new Function('r', 'with (r) { return (' + vyraz + '); }');
      }
      try { return !!preklad[vyraz](rozsah); } catch (e) { chyby.push('podmínka ' + vyraz + ': ' + e.message); return false; }
    }

    // --- akce --------------------------------------------------------------
    function proved(akce) {
      if (akce === undefined || akce === null) return;
      if (Array.isArray(akce)) { for (const a of akce) proved(a); return; }
      if (typeof akce === 'function') { akce(api); return; }
      if (typeof akce === 'object') {
        if ('stridat' in akce) {
          const id = akce.id || JSON.stringify(akce.stridat);
          const i = s.citace[id] || 0;
          s.citace[id] = i + 1;
          const seznam = akce.stridat;
          proved(seznam[akce.dokola === false ? Math.min(i, seznam.length - 1) : i % seznam.length]);
          return;
        }
        if (plati(akce.kdy)) proved(akce.akce); else proved(akce.jinak);
        return;
      }
      const a = String(akce);
      const c = a[0];
      if (c === '+') { const p = a.slice(1); const inv = s.predmety[s.postava]; if (!inv.includes(p)) inv.push(p); udalosti.push({ typ: 'predmet', id: p, pridan: true }); return; }
      if (c === '-') { const p = a.slice(1); for (const k of Object.keys(s.predmety)) s.predmety[k] = s.predmety[k].filter((x) => x !== p); return; }
      if (c === '$') { nastav(a.slice(1)); return; }
      if (c === '>') { jdi(a.slice(1)); return; }
      if (c === '#') { otevriDialog(a.slice(1)); return; }
      if (c === '?') { napoveda(); return; }
      if (c === '@') { s.minihra = { id: a.slice(1) }; udalosti.push({ typ: 'minihra', id: a.slice(1) }); return; }
      if (c === '~') { prepniNa(a.slice(1)); return; }
      if (c === '^') {
        const [kdo, kam] = a.slice(1).split('=');
        if (kdo === s.postava) jdi(kam); else s.kde[kdo] = kam;
        return;
      }
      if (c === '*') {
        const [druh, klic] = a.slice(1).split(':');
        if (druh === 'karta') udalosti.push({ typ: 'karta', klic });
        if (druh === 'konec') { s.konec = true; udalosti.push({ typ: 'konec', pamet: pametKonce() }); }
        return;
      }
      rekni(a);
    }

    // Druhá postava zůstane, kde byla; hraná se vrátí do své scény
    function prepniNa(kdo) {
      if (kdo === s.postava) return;
      s.kde[s.postava] = s.scena;
      s.postava = kdo;
      udalosti.push({ typ: 'postava', id: kdo });
      if (s.kde[kdo] && s.kde[kdo] !== s.scena) jdi(s.kde[kdo]);
    }
    // Přepnutí portrétem (kapitola 3): jen mimo rozhovor a minihru, když to data dovolí
    function prepni() {
      if (!data.prepinani || !plati(data.prepinani) || s.dialog || s.minihra) { chyby.push('teď nejde přepnout'); return false; }
      zaznamenej({ co: 'prepni' });
      prepniNa(s.postava === 'ruda' ? 'bara' : 'ruda');
      return true;
    }

    function nastav(zapis) {
      const m = zapis.match(/^([a-z0-9_]+)(?:(=|\+)(.*))?$/);
      if (!m) { chyby.push('špatný zápis ' + zapis); return; }
      const [, jmeno, op, hodnota] = m;
      if (!op) s.priznaky[jmeno] = true;
      else if (op === '+') s.priznaky[jmeno] = (Number(s.priznaky[jmeno]) || 0) + Number(hodnota || 1);
      else s.priznaky[jmeno] = /^-?\d+$/.test(hodnota) ? Number(hodnota) : hodnota;
    }

    function jdi(id) {
      const sc = data.sceny[id];
      if (!sc) { chyby.push('neznámá scéna ' + id); return; }
      s.scena = id;
      s.dialog = null;
      udalosti.push({ typ: 'scena', id });
      const prvni = !s.navstiveno[id];
      s.navstiveno[id] = true;
      if (prvni) proved(sc.poprve);
      proved(sc.prichod);
    }

    // --- dialogy -----------------------------------------------------------
    function otevriDialog(id) {
      if (!id || id === 'konec') { s.dialog = null; udalosti.push({ typ: 'dialog', id: null }); return; }
      const d = data.dialogy[id];
      if (!d) { chyby.push('neznámý dialog ' + id); return; }
      s.dialog = id;
      udalosti.push({ typ: 'dialog', id });
      const k = 'dialog_' + id;
      if (!s.citace[k]) { s.citace[k] = 1; proved(d.poprve); } else proved(d.znovu);
      if (s.dialog === id) proved(d.uvod);
      // Vyčerpaný dialog: zbylo jen rozloučení, takže postava řekne, že už nemá co dodat.
      if (s.dialog === id && !volby().some((v) => !v.konec)) {
        rekni(d.vycerpano || 'obecne_vse_receno');
        otevriDialog(null);
      }
    }

    function volby() {
      if (!s.dialog) return [];
      const d = data.dialogy[s.dialog];
      return d.volby
        .map((v, i) => ({ ...v, index: i }))
        .filter((v) => plati(v.kdy) && !(v.jednou && s.citace['volba_' + s.dialog + '_' + v.index]));
    }

    function zvol(ktera) {
      const moznosti = volby();
      const v = typeof ktera === 'number' ? moznosti.find((x) => x.index === ktera) : moznosti.find((x) => x.t === ktera);
      if (!v) { chyby.push('volba není dostupná: ' + ktera + ' v dialogu ' + s.dialog); return false; }
      const id = s.dialog;
      s.citace['volba_' + id + '_' + v.index] = (s.citace['volba_' + id + '_' + v.index] || 0) + 1;
      const t = texty[v.t];
      if (t && !t.cs.startsWith('(')) rekni(v.t);
      proved(v.akce);
      if (v.konec && s.dialog === id) otevriDialog(null);
      return true;
    }

    // --- aktivní místa -----------------------------------------------------
    function mista() {
      const sc = data.sceny[s.scena];
      return sc.mista.filter((m) => plati(m.kdy) && (!m.postava || m.postava === s.postava));
    }
    function misto(id) {
      return mista().find((m) => m.id === id);
    }
    function vychozi(druh) {
      const bara = s.postava === 'bara';
      const sady = {
        prohlednout: bara ? ['obecne_bara_nic_k_videni'] : ['obecne_nic_k_videni', 'obecne_nic_k_videni_2'],
        pouzit: bara ? ['obecne_bara_nelze', 'obecne_bara_nelze_2'] : ['obecne_nelze', 'obecne_nelze_2', 'obecne_nelze_3', 'obecne_nelze_4'],
        mluvit: bara ? ['obecne_bara_mluvit'] : ['obecne_mluvit'],
        s: bara ? ['obecne_bara_pouzit_s'] : ['obecne_pouzit_s', 'obecne_pouzit_s_2'],
      };
      const sada = sady[druh];
      const i = s.citace['vychozi_' + druh] || 0;
      s.citace['vychozi_' + druh] = i + 1;
      return sada[i % sada.length];
    }
    function zaznamenej(akce) {
      udalosti.push({ typ: 'akce', ...akce });
    }

    function prohlednout(id) {
      const m = misto(id);
      if (!m) { chyby.push('místo není vidět: ' + id); return false; }
      zaznamenej({ co: 'prohlednout', id });
      const k = s.postava === 'bara' ? m.bara_prohlednout : m.prohlednout;
      if (k === undefined) rekni(vychozi('prohlednout')); else proved(k);
      return true;
    }

    function pouzit(id) {
      const m = misto(id);
      if (!m) { chyby.push('místo není vidět: ' + id); return false; }
      zaznamenej({ co: 'pouzit', id });
      const k = s.postava === 'bara' ? m.bara_pouzit : m.pouzit;
      if (k !== undefined) proved(k);
      else if (m.vychod && (s.postava === 'ruda' || data.bara_chodi)) jdi(m.vychod);
      else rekni(vychozi(m.druh === 'postava' ? 'mluvit' : 'pouzit'));
      return true;
    }

    function nazev(id) {
      const p = data.predmety[id];
      if (p) return p.nazev;
      const m = (data.sceny[s.scena].mista || []).find((x) => x.id === id);
      return m ? m.nazev : id;
    }

    function predmetNa(predmet, cil) {
      if (!pomocnici.ma(predmet)) { chyby.push('nemá předmět ' + predmet); return false; }
      const m = misto(cil);
      if (!m && data.predmety[cil]) return kombinovat(predmet, cil);
      if (!m) { chyby.push('místo není vidět: ' + cil); return false; }
      zaznamenej({ co: 'predmet', predmet, id: cil });
      const pravidlo = ((s.postava === 'bara' ? m.bara_na : m.na) || {})[predmet];
      if (pravidlo !== undefined) proved(pravidlo);
      else rekni(vychozi('s'), [nazev(predmet), m.nazev]);
      return true;
    }

    function kombinovat(a, b) {
      if (!pomocnici.ma(a) || !pomocnici.ma(b)) { chyby.push('nemá předměty ' + a + ', ' + b); return false; }
      zaznamenej({ co: 'kombinace', predmet: a, id: b });
      const k = (data.kombinace || []).find((x) => (x.a === a && x.b === b) || (x.a === b && x.b === a));
      if (k && plati(k.kdy)) proved(k.akce);
      else rekni(vychozi('s'), [nazev(a), nazev(b)]);
      return true;
    }

    function prohlednoutPredmet(id) {
      const p = data.predmety[id];
      zaznamenej({ co: 'prohlednout_predmet', id });
      proved(p.prohlednout);
    }
    function pouzitPredmet(id) {
      const p = data.predmety[id];
      zaznamenej({ co: 'pouzit_predmet', id });
      if (p.pouzit !== undefined) proved(p.pouzit); else proved(p.prohlednout);
    }

    // --- nápověda ----------------------------------------------------------
    function napoveda() {
      zaznamenej({ co: 'napoveda' });
      for (const n of data.napovedy) {
        if (!plati(n.kdy)) continue;
        if (n.akce) { proved(n.akce); return n.id; }
        const i = s.napovedy[n.id] || 0;
        s.napovedy[n.id] = i + 1;
        proved(n.stupne[Math.min(i, n.stupne.length - 1)]);
        return n.id;
      }
      return null;
    }

    // --- minihry -----------------------------------------------------------
    function minihraData() {
      if (!s.minihra) return null;
      const def = data.minihry[s.minihra.id];
      return { id: s.minihra.id, ...def.priprav(api) };
    }
    function dokonciMinihru(vysledek) {
      if (!s.minihra) { chyby.push('žádná minihra'); return null; }
      const id = s.minihra.id;
      const odpoved = data.minihry[id].vyhodnot(api, vysledek);
      if (odpoved && odpoved.hotovo !== false) s.minihra = null;
      return odpoved;
    }
    function zavriMinihru() {
      s.minihra = null;
    }

    function pametKonce() {
      return data.pamet.filter((p) => plati(p.kdy)).map((p) => p.klic);
    }

    // vstup = stav z předchozí kapitoly: {priznaky, predmety} (předměty nahradí výchozí)
    function start(vstup) {
      udalosti = [];
      const st = data.start;
      Object.assign(s.priznaky, st.priznaky || {}, (vstup && vstup.priznaky) || {});
      for (const p of (vstup && vstup.predmety) || st.predmety || []) s.predmety.ruda.push(p);
      for (const p of st.predmety_bara || []) s.predmety.bara.push(p);
      Object.assign(s.kde, st.kde || {});
      jdi(st.scena);
      proved(st.akce);
    }

    function vyber() {
      const u = udalosti;
      udalosti = [];
      return u;
    }

    const api = {
      s, data, texty, chyby, plati, proved, rekni, nastav, start, vyber, mista, misto,
      prohlednout, pouzit, predmetNa, kombinovat, prohlednoutPredmet, pouzitPredmet,
      volby, zvol, napoveda, prepni, minihraData, dokonciMinihru, zavriMinihru, pametKonce,
      ma: pomocnici.ma,
    };
    return api;
  }

  const vystup = { vytvorHru };
  if (typeof module !== 'undefined' && module.exports) module.exports = vystup;
  else koren.Prototyp = vystup;
})(typeof window !== 'undefined' ? window : globalThis);
