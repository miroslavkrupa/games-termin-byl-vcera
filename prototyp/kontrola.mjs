// Automatická kontrola kapitoly nad pravidly šedého prototypu (krok N4 strojem).
//   node prototyp/kontrola.mjs [číslo kapitoly] [--nahodne 300]
// 1. Každý klíč textu v datech existuje v texty.csv.
// 2. Průchody z dat (nejkratší cesta a varianty) dojdou do konce s očekávanými příznaky.
// 3. Náhodné hraní hledá chyby v podmínkách, chybějící texty a zaseknutí.
// 4. Vypíše texty kapitoly, které při žádném průchodu nezazněly.
import { engine, nactiKapitolu, nactiTexty } from './nacti.mjs';

const argumenty = process.argv.slice(2);
const kapitola = Number(argumenty.find((a) => /^\d+$/.test(a)) || 1);
const iNahodne = argumenty.indexOf('--nahodne');
const pocetNahodnych = iNahodne >= 0 ? Number(argumenty[iNahodne + 1]) : 200;
const AKCI = 3000;

const texty = nactiTexty();
const data = nactiKapitolu(kapitola);
const predpona = `ch${kapitola}_`;
let problemu = 0;
const zaznelo = new Set();

function problem(zprava) {
  problemu++;
  console.log('  ✗ ' + zprava);
}

// --- 1. klíče textů v datech -------------------------------------------------
const KLIC = /^(ch\d+|predmet|postava|obecne|ui)_[a-z0-9_]+$/;
const pouzite = new Set();
const predpony = new Set();
(function projdi(x) {
  if (typeof x === 'string') {
    const k = x.replace(/^\*karta:/, '');
    if (KLIC.test(k)) pouzite.add(k);
  } else if (typeof x === 'function') {
    // Funkce v datech (minihry, počítané příznaky): klíče jsou řetězce v kódu,
    // řetězec, ke kterému se něco přičítá, je předpona ('ch2_magnet_' + id, 'ch1_m03_k' + k)
    for (const m of x.toString().matchAll(/'([a-z0-9_]+)'(\s*\+)?/g)) {
      if (m[2] && KLIC.test(m[1] + 'x')) predpony.add(m[1]);
      else if (KLIC.test(m[1])) pouzite.add(m[1]);
    }
  } else if (Array.isArray(x)) x.forEach(projdi);
  // obraz a obrazek jsou jména souborů, ne klíče textů
  else if (x && typeof x === 'object') Object.entries(x).forEach(([k, v]) => { if (k !== 'obraz' && k !== 'obrazek' && k !== 'predvolby') projdi(v); });
})({ ...data, pruchody: null });
for (const k of Object.keys(texty)) if ([...predpony].some((p) => k.startsWith(p))) pouzite.add(k);
// Klíče, které skládají minihry v kódu
const MINIHRY_KLICE = Object.keys(texty).filter((k) => /_m0\d_|_listek_|_kartoteka_(abecedne|spatne|stejny_rok|hotovo)|_priloha_stop|_starosta_(podpis|slib|prohra)|_pembok_kriteria/.test(k) && k.startsWith(predpona));
MINIHRY_KLICE.forEach((k) => pouzite.add(k));

console.log(`Kapitola ${kapitola}: ${Object.keys(data.sceny).length} scén, ${Object.keys(data.dialogy).length} dialogů, ${Object.keys(data.predmety).length} předmětů`);
console.log('\n1. Klíče textů');
const chybejici = [...pouzite].filter((k) => !texty[k]);
chybejici.forEach((k) => problem('v texty.csv chybí ' + k));
if (!chybejici.length) console.log(`  ✓ všech ${pouzite.size} klíčů existuje`);

// --- pomocník pro hraní ------------------------------------------------------
// Kapitoly 2+ začínají stavem z předchozí kapitoly (předvolby „dobra“ a „spatna“)
const PREDVOLBY = Object.keys(data.predvolby || {});
// Průchod může předvolbu upravit (jiný tým, jiné riziko): priznaky se přidají k předvolbě
function novaHra(predvolba, priznaky) {
  const h = engine.vytvorHru(data, texty);
  const p = predvolba ? data.predvolby[predvolba] : undefined;
  h.start(p ? { ...p, priznaky: { ...p.priznaky, ...(priznaky || {}) } } : undefined);
  return h;
}
function spotrebuj(h) {
  for (const u of h.vyber()) if (u.typ === 'rec') zaznelo.add(u.klic);
}

function krok(h, k) {
  if (typeof k === 'object') {
    if (!h.s.minihra) throw new Error('čeká se minihra, ale žádná není otevřená');
    const v = h.dokonciMinihru(k.minihra);
    if (!v) throw new Error('minihra nevrátila výsledek');
    return;
  }
  if (h.s.minihra) throw new Error(`otevřená minihra ${h.s.minihra.id}, krok „${k}“ ji přeskočil`);
  const [prikaz, ...zbytek] = k.split(' ');
  const arg = zbytek.join(' ');
  const ok = {
    pouzij: () => h.pouzit(arg),
    prohledni: () => h.prohlednout(arg),
    predmet: () => h.predmetNa(zbytek[0], zbytek[1]),
    volba: () => h.zvol(arg),
    prepni: () => h.prepni(),
    napoveda: () => h.napoveda() !== null,
    ocekavej: () => {
      if (!h.plati(arg)) throw new Error('neplatí ' + arg);
      return true;
    },
  }[prikaz];
  if (!ok) throw new Error('neznámý příkaz ' + prikaz);
  if (ok() === false) throw new Error(h.chyby.at(-1) || 'krok selhal');
}

// --- 2. průchody -------------------------------------------------------------
console.log('\n2. Průchody');
for (const [id, p] of Object.entries(data.pruchody)) {
  const h = novaHra(p.start, p.priznaky);
  spotrebuj(h);
  let i = 0;
  try {
    for (; i < p.kroky.length; i++) {
      const pred = h.chyby.length;
      krok(h, p.kroky[i]);
      spotrebuj(h);
      if (h.chyby.length > pred) throw new Error(h.chyby.slice(pred).join('; '));
    }
    const neplati = p.ocekavej.filter((o) => (o === 'konec' ? !h.s.konec : !h.plati(o)));
    if (neplati.length) problem(`${id}: na konci neplatí ${neplati.join(', ')}`);
    else console.log(`  ✓ ${id} (${p.kroky.length} kroků): ${p.popis}`);
  } catch (e) {
    const popis = typeof p.kroky[i] === 'object' ? JSON.stringify(p.kroky[i]) : p.kroky[i];
    problem(`${id}: krok ${i + 1} „${popis}“ ve scéně ${h.s.scena}: ${e.message}`);
  }
}

// --- 3. náhodné hraní --------------------------------------------------------
console.log(`\n3. Náhodné hraní (${pocetNahodnych} her, nejvýš ${AKCI} akcí)`);
let semeno = 1;
const nahoda = () => ((semeno = (semeno * 1103515245 + 12345) % 2147483648) / 2147483648);
const vyber = (pole) => pole[Math.floor(nahoda() * pole.length)];
const nalezene = new Map();
let dohrano = 0;

function nahodnaMinihra(h) {
  const m = h.minihraData();
  if (m.druh === 'razeni') return nahoda() < 0.5 ? { poradi: ['most', 'leseni', 'vytah', 'archa', 'kasna'] } : { poradi: m.listky.map((l) => l.id).sort(() => nahoda() - 0.5) };
  if (m.druh === 'souboj') return { volba: vyber(m.odpovedi).druh };
  if (m.druh === 'mrizka') {
    const umisteni = {};
    for (const k of m.karty) if (!k.neznama) umisteni[k.id] = [nahoda() < 0.5, nahoda() < 0.5];
    if (nahoda() < 0.6) Object.assign(umisteni, { starosta: [true, true], predseda: [true, true], babicka: [true, false], zmena: [false, true], bara: [false, true], obyvatele: [false, true] });
    return { umisteni };
  }
  if (m.druh === 'slon') {
    if (nahoda() < 0.15) return { preskocit: true };
    if (nahoda() < 0.3) return { kus: vyber(m.kamen.flatMap((c) => c.kusy)).id };
    if (nahoda() < 0.3) return { mlha: { cast: vyber(m.mlha).id, volba: nahoda() < 0.5 ? 'daleko' : 'blizko' } };
    return { vybrano: m.kamen.flatMap((c) => c.kusy).filter((k) => k.druh !== 'velky' && nahoda() < 0.8).map((k) => k.id) };
  }
  if (m.druh === 'tabule') {
    if (nahoda() < 0.2) return { cesta: vyber(['gantt', 'krabice']) };
    const prirazeni = {};
    for (const g of m.magnety) prirazeni[g.id] = g.nesmysl ? (nahoda() < 0.7 ? 'pryc' : 'ruda') : vyber(['ruda', 'bara']);
    if (nahoda() < 0.5) Object.assign(prirazeni, { rampa: 'ruda', trup: 'ruda', pohon: 'ruda', rizeni: 'bara', aplikace: 'bara', nastup: 'bara' });
    return { prirazeni };
  }
  if (m.druh === 'krabice') return { obalka: m.listky.length ? vyber(m.listky).id : 'nic' };
  if (m.druh === 'mapa') {
    if (nahoda() < 0.1) return { preskocit: true };
    const mosty = {};
    for (const most of m.mosty) mosty[most.id] = { cesta: vyber(most.cesta).id, reka: vyber(most.reka).id };
    return { mosty, prijmout: nahoda() < 0.3 };
  }
  if (m.druh === 'jerab') {
    if (nahoda() < 0.1) return { preskocit: true };
    if (m.muze_odnest && nahoda() < 0.2) return { odnest: true };
    const plan = {};
    if (nahoda() < 0.5) Object.assign(plan, { lp_bed: 1, lp_bet: 2, pp_bed: 3, pp_bet: 4, la_bed: 5, la_bet: 6, dr_bed: 7, dr_bet: 8, pl_bed: 11, pl_bet: 12 });
    else {
      const dny = Array.from({ length: m.dnu }, (_, i) => i + 1).sort(() => nahoda() - 0.5);
      m.karty.forEach((k, i) => { plan[k.id] = dny[i]; });
    }
    return { plan };
  }
  if (m.druh === 'plan_kola') {
    const karty = m.karty.filter(() => nahoda() < 0.5).map((k) => k.id);
    return { cil: vyber(m.cile).id, karty: karty.length ? karty : [m.karty[2].id] };
  }
  if (m.druh === 'ukazka') {
    if (nahoda() < 0.05) return { preskocit: true };
    if (m.zamceno && nahoda() < 0.3) return { vyndat: true };
    if (m.faze === 'ukazat') return m.muze_vynechat && nahoda() < 0.3 ? { vynechat: true } : { ukazat: true };
    if (m.seznam.length && nahoda() < 0.2) return { vyhodit: vyber(m.seznam).id };
    return { kolo: m.seznam.filter(() => nahoda() < 0.5).slice(0, m.kapacita + 1).map((k) => k.id) };
  }
  if (m.druh === 'rozcestnik') {
    if (nahoda() < 0.05 || !m.karta) return { preskocit: true };
    return { karta: m.karta.id, kam: vyber(m.prihradky).id };
  }
  if (m.druh === 'trup') {
    if (nahoda() < 0.1) return { preskocit: true };
    const umisteni = {};
    for (const k of m.karty) umisteni[k.id] = nahoda() < 0.6 ? ({ aplikace: 'ven', prog_navigace: m.bez_poklopu ? 'ven' : 'pozdeji' }[k.id] || 'dovnitr') : vyber(m.prihradky).id;
    return { umisteni, bazen: m.bazen ? vyber(['ven', 'nechat']) : undefined };
  }
  if (m.druh === 'kolonky') {
    const prirazeni = {};
    for (const k of m.kolonky) {
      const moznosti = m.utrzky.filter((u) => u.kolonka === k.id || nahoda() < 0.05);
      if (moznosti.length) prirazeni[k.id] = vyber(moznosti).id;
    }
    return { prirazeni };
  }
  return {};
}

// Průzkumník: v každém kroku sestaví všechny možné akce a s pravděpodobností `zvedavost`
// vybere tu, kterou v dané situaci zkoušel nejméně často. Tak projde i dlouhé řetězy puzzlů.
function moznosti(h) {
  if (h.s.dialog) return h.volby().map((v) => ({ sig: `${h.s.dialog}|${v.index}`, popis: 'volba ' + v.t, proved: () => h.zvol(v.index) }));
  const vse = [];
  const predmety = h.s.predmety[h.s.postava];
  for (const m of h.mista()) {
    vse.push({ sig: `${h.s.scena}|p|${m.id}`, popis: 'prohledni ' + m.id, proved: () => h.prohlednout(m.id) });
    vse.push({ sig: `${h.s.scena}|u|${m.id}`, popis: 'pouzij ' + m.id, proved: () => h.pouzit(m.id) });
    for (const p of predmety) vse.push({ sig: `${h.s.scena}|${p}|${m.id}`, popis: `predmet ${p} ${m.id}`, proved: () => h.predmetNa(p, m.id) });
  }
  if (data.prepinani && h.plati(data.prepinani)) vse.push({ sig: `prepni|${h.s.postava}`, popis: 'prepni', proved: () => h.prepni() });
  for (const p of predmety) {
    vse.push({ sig: `i|${p}`, popis: 'pouzij predmet ' + p, proved: () => h.pouzitPredmet(p) });
    for (const q of predmety) if (p < q) vse.push({ sig: `k|${p}|${q}`, popis: `kombinace ${p} ${q}`, proved: () => h.kombinovat(p, q) });
  }
  return vse;
}

function hrajNahodne(h, akci, zvedavost = 0.7) {
  const pocty = new Map();
  const videne = new Set();
  for (let a = 0; a < akci && !h.s.konec; a++) {
    // Po pokroku (příznak nastavený poprvé) může jít i to, co předtím nešlo: zvědavost začne nanovo
    const nove = Object.keys(h.s.priznaky).filter((k) => h.s.priznaky[k] && !videne.has(k));
    if (nove.length) { nove.forEach((k) => videne.add(k)); pocty.clear(); }
    const pred = h.chyby.length;
    let popis = '';
    try {
      if (h.s.minihra) {
        if (nahoda() < 0.1) { popis = 'zavřít minihru'; h.zavriMinihru(); }
        else { const v = nahodnaMinihra(h); popis = 'minihra ' + h.s.minihra.id; h.dokonciMinihru(v); }
      } else {
        const vse = moznosti(h);
        if (!vse.length) throw new Error(h.s.dialog ? 'dialog ' + h.s.dialog + ' nemá žádnou volbu' : 'žádná možná akce');
        let volba;
        if (nahoda() < zvedavost) {
          const nejmene = Math.min(...vse.map((v) => pocty.get(v.sig) || 0));
          volba = vyber(vse.filter((v) => (pocty.get(v.sig) || 0) === nejmene));
        } else volba = vyber(vse);
        pocty.set(volba.sig, (pocty.get(volba.sig) || 0) + 1);
        popis = volba.popis;
        volba.proved();
      }
    } catch (e) { h.chyby.push('výjimka: ' + e.message); }
    spotrebuj(h);
    for (const ch of h.chyby.slice(pred)) {
      const klic = ch.replace(/ v dialogu .*/, '');
      if (!nalezene.has(klic)) nalezene.set(klic, `${ch} (scéna ${h.s.scena}, akce „${popis}“)`);
    }
  }
}

// Zaseknutí: z nedohrané hry zkusí dalších 10 zvědavých pokračování. Když žádné nedojde
// do konce, je to podezřelý stav a vypíše se.
const zaseknuti = [];
function kopie(h) {
  const k = novaHra();
  k.vyber();
  for (const klic of Object.keys(k.s)) delete k.s[klic];
  Object.assign(k.s, JSON.parse(JSON.stringify(h.s)));
  return k;
}
for (let hra = 0; hra < pocetNahodnych; hra++) {
  semeno = hra + 1;
  const h = novaHra(PREDVOLBY.length ? PREDVOLBY[hra % PREDVOLBY.length] : undefined);
  spotrebuj(h);
  hrajNahodne(h, AKCI, hra % 2 ? 0.7 : 0.2);
  if (h.s.konec) { dohrano++; continue; }
  if (zaseknuti.length >= 3) continue;
  let dojde = false;
  for (let pokus = 0; pokus < 10 && !dojde; pokus++) {
    const k = kopie(h);
    hrajNahodne(k, 20000, 0.9);
    dojde = k.s.konec;
  }
  if (!dojde) zaseknuti.push(h);
}
if (nalezene.size) for (const v of nalezene.values()) problem(v);
else console.log('  ✓ žádná chyba v podmínkách, textech ani dialozích');
console.log(`  dohráno náhodně: ${dohrano} z ${pocetNahodnych}`);
for (const h of zaseknuti) {
  const p = Object.entries(h.s.priznaky).filter(([, v]) => v).map(([k, v]) => (v === true ? k : `${k}=${v}`));
  problem(`možné zaseknutí ve scéně ${h.s.scena}, postava ${h.s.postava}, předměty [${h.s.predmety[h.s.postava].join(', ')}], příznaky: ${p.join(', ')}`);
}
if (!zaseknuti.length) console.log('  ✓ z každé zkoumané nedohrané hry jde náhodně dojít do konce');

// --- 4. texty, které nezazní -------------------------------------------------
const kapitolni = Object.keys(texty).filter((k) => k.startsWith(predpona));
const nikdy = kapitolni.filter((k) => !zaznelo.has(k) && !pouzite.has(k));
const nepouzite = kapitolni.filter((k) => !pouzite.has(k));
console.log(`\n4. Texty kapitoly: ${kapitolni.length}, v datech ${kapitolni.length - nepouzite.length}, zazněly ${[...zaznelo].filter((k) => k.startsWith(predpona)).length}`);
if (nepouzite.length) {
  console.log(`  texty, které data nepoužívají (${nepouzite.length}):`);
  for (const k of nepouzite) console.log(`    · ${k}: ${texty[k].cs.slice(0, 70)}${texty[k].poznamka ? '  [' + texty[k].poznamka.slice(0, 50) + ']' : ''}`);
}
if (nikdy.length) console.log(`  (${nikdy.length} z nich ani nezazní)`);

console.log(problemu ? `\n${problemu} problémů` : '\nBez problémů');
process.exit(problemu ? 1 : 0);
