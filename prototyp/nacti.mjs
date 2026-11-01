// Společné načítání pro sestavení a kontrolu: texty z CSV a data kapitoly.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const PROTOTYP = dirname(fileURLToPath(import.meta.url));
export const KOREN = join(PROTOTYP, '..');
const require = createRequire(import.meta.url);

// CSV podle RFC 4180: pole v uvozovkách smí obsahovat čárky, zalomení i zdvojené uvozovky.
function rozeberCsv(obsah) {
  const radky = [];
  let radek = [];
  let pole = '';
  let vUvozovkach = false;
  for (let i = 0; i < obsah.length; i++) {
    const z = obsah[i];
    if (vUvozovkach) {
      if (z === '"' && obsah[i + 1] === '"') { pole += '"'; i++; }
      else if (z === '"') vUvozovkach = false;
      else pole += z;
    } else if (z === '"') vUvozovkach = true;
    else if (z === ',') { radek.push(pole); pole = ''; }
    else if (z === '\n') { radek.push(pole); radky.push(radek); radek = []; pole = ''; }
    else if (z !== '\r') pole += z;
  }
  if (pole || radek.length) { radek.push(pole); radky.push(radek); }
  return radky;
}

export function nactiTexty() {
  const [hlavicka, ...radky] = rozeberCsv(readFileSync(join(KOREN, 'hra/texty/texty.csv'), 'utf-8'));
  const sloupec = (jmeno) => hlavicka.indexOf(jmeno);
  const [k, cs, en, mluvci, pozn] = ['keys', 'cs', 'en', '_mluvci', '_poznamka'].map(sloupec);
  const texty = {};
  for (const r of radky) {
    if (!r[k]) continue;
    texty[r[k]] = { cs: r[cs], en: r[en], mluvci: r[mluvci] || '', poznamka: r[pozn] || '' };
  }
  return texty;
}

export function nactiKapitolu(cislo) {
  return require(join(PROTOTYP, `kapitola${cislo}.js`));
}

export const engine = require(join(PROTOTYP, 'engine.js'));
