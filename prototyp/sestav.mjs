// Sestaví šedý prototyp do jednoho HTML souboru (engine, data všech kapitol, texty a obrázky uvnitř).
//   node prototyp/sestav.mjs
// Výstup: prototyp/vystup/prototyp.html (stránka pro artefakt, bez <html> a <head>)
//         prototyp/vystup/prototyp-lokalne.html (otevře se přímo v prohlížeči)
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PROTOTYP, cislaKapitol, nactiTexty } from './nacti.mjs';

const cti = (soubor) => readFileSync(join(PROTOTYP, soubor), 'utf-8');
const doSkriptu = (js) => js.replace(/<\/script/gi, '<\\/script');

const texty = {};
for (const [k, v] of Object.entries(nactiTexty())) texty[k] = { cs: v.cs, en: v.en, mluvci: v.mluvci };

const obrazky = {};
for (const soubor of readdirSync(join(PROTOTYP, 'obrazky'))) {
  const typ = soubor.endsWith('.png') ? 'image/png' : 'image/jpeg';
  obrazky[soubor.replace(/\.(png|jpe?g)$/, '')] = `data:${typ};base64,` + readFileSync(join(PROTOTYP, 'obrazky', soubor)).toString('base64');
}

const kapitoly = cislaKapitol();
const json = (x) => JSON.stringify(x).replace(/</g, '\\u003c');
const stranka = cti('prehravac.html')
  .replace('/*@@ENGINE@@*/', () => doSkriptu(cti('engine.js')))
  .replace('/*@@DATA@@*/', () => kapitoly.map((n) => doSkriptu(cti(`kapitola${n}.js`))).join('\n'))
  .replace('/*@@TEXTY@@*/{}', () => json(texty))
  .replace('/*@@OBRAZKY@@*/{}', () => json(obrazky));

const vystup = join(PROTOTYP, 'vystup');
mkdirSync(vystup, { recursive: true });
writeFileSync(join(vystup, 'prototyp.html'), stranka);
writeFileSync(join(vystup, 'prototyp-lokalne.html'),
  '<!doctype html>\n<html lang="cs"><head><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head><body style="margin:0">\n' +
  stranka + '\n</body></html>\n');
console.log(`prototyp/vystup/prototyp.html: kapitoly ${kapitoly.join(', ')}, ${(stranka.length / 1024).toFixed(0)} kB`);
