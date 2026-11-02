// Grafy závislostí puzzlů podle Rona Gilberta pro kapitoly 1–3.
//
//   node tools/graf_zavislosti.mjs            kontrola, rozbor a přepsání grafů v dokumentu
//   node tools/graf_zavislosti.mjs --jen-rozbor  jen vypíše rozbor, dokument nemění
//
// Zdroj grafů jsou soubory tools/graf/kN.mjs. Uzel je krok k řešení, šipka vede od předpokladu
// k tomu, co na něm závisí. Pole uzlu:
//   id, t       identifikátor a popisek
//   druh        ukol (výchozí), predmet, minihra, volba, nebo, strih, start, cil
//   kdo         ruda (výchozí), bara, spolu: kdo krok dělá
//   po          tvrdé předpoklady; u druhu „nebo“ stačí k z nich (výchozí 1)
//   mekke       předpoklady, které jen pomáhají (lepší výsledek, znalost); kreslí se čárkovaně
//   volitelne   krok není potřeba k cíli
//   samo        krok se stane sám jako výsledek předchozího (předmět z minihry), nestojí tah
//   jen         uzel existuje jen ve stavu z dřívější kapitoly (klíč z `stavy`)
//   p           příznaky a předměty prototypu, kontrola ověří, že v kapitolaN.js jsou
// Grafy se vkládají do docs/13-graf-zavislosti.md mezi značky <!-- graf:kN --> a <!-- /graf:kN -->.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const KOREN = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOKUMENT = join(KOREN, 'docs', '13-graf-zavislosti.md');
const jenRozbor = process.argv.includes('--jen-rozbor');

// Kroky, které se stanou samy (rozcestí, střih, cíl), nezabírají hráči žádný tah
const SAMY = new Set(['nebo', 'strih', 'cil', 'start']);
const sam = (u) => SAMY.has(u.druh) || !!u.samo;
const KDO = { ruda: 'Ruda', bara: 'Bára', spolu: 'spolu' };

function stavyGrafu(g, zapnute) {
  const s = new Set();
  for (const [k, v] of Object.entries(g.stavy || {})) if (typeof v === 'object' && v.vychozi) s.add(k);
  for (const k of zapnute) if (k.startsWith('!')) s.delete(k.slice(1)); else s.add(k);
  return s;
}

function aktivni(g, stavy) {
  return new Map(g.uzly.filter((u) => !u.jen || stavy.has(u.jen)).map((u) => [u.id, u]));
}

// Postupné řešení: v každém kole se vyřeší všechno, co už jde. Vrátí kola (seznamy id).
function res(uzly, bez) {
  const hotovo = new Set();
  const kola = [];
  const jde = (u) => {
    const pred = (u.po || []).filter((p) => uzly.has(p));
    if (u.druh === 'nebo') return pred.filter((p) => hotovo.has(p)).length >= (u.k || 1);
    return pred.every((p) => hotovo.has(p));
  };
  for (;;) {
    const nove = [...uzly.values()].filter((u) => u.id !== bez && !hotovo.has(u.id) && jde(u));
    if (!nove.length) break;
    // Samočinné kroky (rozcestí, střihy) patří do stejného kola jako to, co je spustilo
    let kolo = nove.filter((u) => !sam(u) || u.druh === 'start');
    if (!kolo.length) kolo = nove;
    kolo.forEach((u) => hotovo.add(u.id));
    for (let zmena = true; zmena;) {
      zmena = false;
      for (const u of uzly.values()) {
        if (u.id !== bez && !hotovo.has(u.id) && sam(u) && jde(u)) { hotovo.add(u.id); kolo.push(u); zmena = true; }
      }
    }
    kola.push(kolo.map((u) => u.id));
  }
  return { hotovo, kola };
}

function rozbor(g, zapnute = []) {
  const stavy = stavyGrafu(g, zapnute);
  const uzly = aktivni(g, stavy);
  const { hotovo, kola } = res(uzly);
  if (!hotovo.has(g.cil)) throw new Error(`kapitola ${g.kapitola}: cíl ${g.cil} nejde splnit (${[...stavy].join(', ')})`);

  const povinne = new Set([...uzly.keys()].filter((id) => id === g.cil || !res(uzly, id).hotovo.has(g.cil)));
  for (const u of uzly.values()) {
    if (u.volitelne && povinne.has(u.id)) throw new Error(`uzel ${u.id} je označený jako volitelný, ale cíl na něm závisí`);
  }

  // Krok X je nutně před Y, když bez X nejde Y splnit (u rozcestí tedy jen to, co mají
  // všechny větve společné). Úzké hrdlo je povinný krok, který je nutně před nebo nutně za
  // každým jiným povinným krokem: projde jím každá cesta a uzavírá „akt“ podle Gilberta.
  const tahy = [...povinne].filter((id) => !sam(uzly.get(id)));
  const bezUzlu = new Map(tahy.map((id) => [id, res(uzly, id).hotovo]));
  const nutnePred = (x, y) => !bezUzlu.get(x).has(y);
  const hrdla = tahy.filter((x) => tahy.every((y) => y === x || nutnePred(x, y) || nutnePred(y, x)));

  // Šířka: kolik kroků je v kole k dispozici; povinné zvlášť, u dvou postav i podle postavy
  const sirka = kola.map((kolo) => {
    const tah = kolo.filter((id) => !sam(uzly.get(id)));
    // K cíli vedou povinné kroky i větve rozcestí; volitelné kroky jen přidávají
    const pov = tah.filter((id) => !uzly.get(id).volitelne);
    const podle = {};
    for (const id of pov) { const k = uzly.get(id).kdo || 'ruda'; podle[k] = (podle[k] || 0) + 1; }
    return { kolo, tah, pov, podle };
  });
  const delka = sirka.filter((s) => s.pov.length).length;

  return { g, stavy, uzly, povinne, tahy, hrdla, sirka, delka };
}

// --- kontrola proti prototypu ------------------------------------------------
function kontrola(g) {
  const zdroj = readFileSync(join(KOREN, 'prototyp', `kapitola${g.kapitola}.js`), 'utf-8');
  const chyby = [];
  const ids = new Set(g.uzly.map((u) => u.id));
  for (const u of g.uzly) {
    for (const p of [...(u.po || []), ...(u.mekke || [])]) if (!ids.has(p)) chyby.push(`${u.id}: neznámý předpoklad ${p}`);
    if (u.jen && !(g.stavy || {})[u.jen]) chyby.push(`${u.id}: neznámý stav ${u.jen}`);
    for (const p of u.p || []) {
      let hledej;
      if (p.startsWith('+')) hledej = [`'${p}'`];
      else if (p.startsWith('@')) hledej = [`'${p}'`, `minihry.${p.slice(1)} =`];
      else if (p.includes('=')) { const [k, v] = p.split('='); hledej = [`$${k}=${v}`, `${k}=='${v}'`]; }
      else hledej = [p];
      if (!hledej.some((h) => zdroj.includes(h))) chyby.push(`${u.id}: v kapitola${g.kapitola}.js chybí ${p}`);
    }
  }
  return chyby;
}

// --- Mermaid -------------------------------------------------------------------
const uvoz = (t) => t.replace(/"/g, '#quot;');
function tvar(u, popisek) {
  const t = `"${uvoz(popisek)}"`;
  switch (u.druh) {
    case 'start': return `([${t}])`;
    case 'cil': return `([${t}])`;
    case 'predmet': return `(${t})`;
    case 'minihra': return `[[${t}]]`;
    case 'volba': return `{{${t}}}`;
    case 'nebo': return `((${t}))`;
    case 'strih': return `>${t}]`;
    default: return `[${t}]`;
  }
}

function mermaid(g) {
  const radky = ['flowchart TB'];
  const podleTridy = {};
  for (const u of g.uzly) {
    let popisek = u.t;
    if (u.jen) {
      const s = g.stavy[u.jen];
      popisek += `<br/><i>jen: ${typeof s === 'object' ? s.t : s}</i>`;
    }
    const tridy = [];
    if (u.druh === 'start' || u.druh === 'cil') tridy.push('kraj');
    else if (u.druh === 'nebo') tridy.push('nebo');
    else if (u.druh === 'strih') tridy.push('strih');
    else if (g.kapitola === 3 || u.kdo === 'bara') tridy.push(u.kdo || 'ruda');
    if (u.volitelne) tridy.push('volitelny');
    if (u.jen) tridy.push('jen');
    radky.push(`  ${u.id}${tvar(u, popisek)}`);
    for (const t of tridy) (podleTridy[t] ||= []).push(u.id);
  }
  for (const u of g.uzly) {
    for (const p of u.po || []) radky.push(`  ${p} --> ${u.id}`);
    for (const p of u.mekke || []) radky.push(`  ${p} -.-> ${u.id}`);
  }
  radky.push(
    '  classDef ruda fill:#dbeafe,stroke:#1d4ed8,color:#0b1b3a',
    '  classDef bara fill:#ffedd5,stroke:#c2410c,color:#3a1a05',
    '  classDef spolu fill:#ede9fe,stroke:#6d28d9,color:#24124a',
    '  classDef kraj fill:#1f2937,stroke:#1f2937,color:#ffffff',
    '  classDef nebo fill:#fef9c3,stroke:#a16207,color:#3a2a00',
    '  classDef strih fill:#e5e7eb,stroke:#4b5563,color:#111827',
    '  classDef volitelny stroke-dasharray:5 4,color:#4b5563,fill:#f9fafb',
    '  classDef jen stroke-dasharray:2 3,stroke-width:2px',
  );
  // Pořadí tříd rozhoduje: čárkování volitelných a „jen“ přepíše barvu postavy
  for (const t of ['ruda', 'bara', 'spolu', 'kraj', 'nebo', 'strih', 'volitelny', 'jen']) {
    if (podleTridy[t]) radky.push(`  class ${podleTridy[t].join(',')} ${t}`);
  }
  return radky.join('\n');
}

// --- výpis rozboru -------------------------------------------------------------
const jmeno = (r, id) => r.uzly.get(id).t;
const tvary = (n, jeden, dva, pet) => `${n} ${n === 1 ? jeden : n >= 2 && n <= 4 ? dva : pet}`;

// Vede krok (přes další kroky) do povinného rozcestí? Pak je jednou z jeho cest.
function vedeDoRozcesti(r, id, videno = new Set()) {
  if (videno.has(id)) return false;
  videno.add(id);
  return [...r.uzly.values()].some((n) => (n.po || []).includes(id) &&
    ((n.druh === 'nebo' && r.povinne.has(n.id)) || vedeDoRozcesti(r, n.id, videno)));
}

function popisRozboru(r, nadpis) {
  const out = [];
  const maxPov = Math.max(...r.sirka.map((s) => s.pov.length));
  const maxVse = Math.max(...r.sirka.map((s) => s.tah.length));
  const vsech = [...r.uzly.values()].filter((u) => !sam(u)).length;
  out.push(`**${nadpis}:** ${tvary(vsech, 'krok', 'kroky', 'kroků')}, z toho ${r.tahy.length} povinných; ` +
    `nejkratší možný sled ${tvary(r.delka, 'kolo', 'kola', 'kol')}; ` +
    `v jednom kole nejvýš ${tvary(maxPov, 'krok', 'kroky', 'kroků')} k cíli (${maxVse} i s volitelnými).`);
  out.push('');
  out.push('| Kolo | Kroky k cíli, které jdou udělat | Navíc volitelné |');
  out.push('|---|---|---|');
  r.sirka.forEach((s, i) => {
    if (!s.tah.length) return;
    const pov = s.pov.map((id) => {
      const u = r.uzly.get(id);
      const kdo = r.g.kapitola === 3 ? ` (${KDO[u.kdo || 'ruda']})` : '';
      const vetev = vedeDoRozcesti(r, id);
      const hrdlo = r.hrdla.includes(id) ? ' **⧗**' : r.povinne.has(id) ? '' : vetev ? ' *(větev)*' : ' *(teď nepotřebný)*';
      return jmeno(r, id) + kdo + hrdlo;
    });
    const vol = s.tah.filter((id) => r.uzly.get(id).volitelne).map((id) => jmeno(r, id));
    out.push(`| ${i} | ${pov.join(' · ') || '–'} | ${vol.join(' · ') || '–'} |`);
  });
  out.push('');
  out.push(`**⧗** úzké hrdlo (${r.hrdla.length}): všechny ostatní povinné kroky jsou nutně před ním, nebo nutně za ním. ` +
    '*(větev)*: jedna z cest rozcestí „nebo“, sama povinná není. ' +
    '*(teď nepotřebný)*: v tomhle stavu k cíli nevede, v jiném ano.');
  return out.join('\n');
}

const grafy = [];
for (const k of [1, 2, 3]) grafy.push((await import(join(KOREN, 'tools', 'graf', `k${k}.mjs`))).default);

let chyby = [];
for (const g of grafy) chyby = chyby.concat(kontrola(g).map((c) => `kapitola ${g.kapitola}: ${c}`));
if (chyby.length) { console.error(chyby.join('\n')); process.exit(1); }

const bloky = {};
for (const g of grafy) {
  const casti = [mermaid(g)];
  const dobra = rozbor(g);
  const rozbory = [popisRozboru(dobra, 'Výchozí stav')];
  for (const [nazev, zapnute] of Object.entries(g.scenare || {})) rozbory.push(popisRozboru(rozbor(g, zapnute), nazev));
  bloky[`k${g.kapitola}`] = '```mermaid\n' + casti[0] + '\n```\n\n' + rozbory.join('\n\n');
  if (jenRozbor) console.log(`\n=== Kapitola ${g.kapitola}\n` + rozbory.join('\n\n'));
}

if (!jenRozbor) {
  let doc = readFileSync(DOKUMENT, 'utf-8');
  for (const [k, obsah] of Object.entries(bloky)) {
    const re = new RegExp(`(<!-- graf:${k} -->)[\\s\\S]*?(<!-- /graf:${k} -->)`);
    if (!re.test(doc)) { console.error(`v dokumentu chybí značky graf:${k}`); process.exit(1); }
    doc = doc.replace(re, `$1\n${obsah}\n$2`);
  }
  writeFileSync(DOKUMENT, doc);
  console.log('Grafy přepsány v docs/13-graf-zavislosti.md');
}
