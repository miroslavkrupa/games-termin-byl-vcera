// Sestaví šedý prototyp do jednoho HTML souboru (engine, data, texty a obrázky uvnitř).
//   node prototyp/sestav.mjs [číslo kapitoly]
// Výstup: prototyp/vystup/kapitolaN.html (stránka pro artefakt, bez <html> a <head>)
//         prototyp/vystup/kapitolaN-lokalne.html (otevře se přímo v prohlížeči)
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PROTOTYP, nactiTexty } from './nacti.mjs';

const kapitola = Number(process.argv[2] || 1);
const cti = (soubor) => readFileSync(join(PROTOTYP, soubor), 'utf-8');
const doSkriptu = (js) => js.replace(/<\/script/gi, '<\\/script');

const texty = {};
for (const [k, v] of Object.entries(nactiTexty())) texty[k] = { cs: v.cs, en: v.en, mluvci: v.mluvci };

const obrazky = {};
for (const soubor of readdirSync(join(PROTOTYP, 'obrazky'))) {
  const typ = soubor.endsWith('.png') ? 'image/png' : 'image/jpeg';
  obrazky[soubor.replace(/\.(png|jpe?g)$/, '')] = `data:${typ};base64,` + readFileSync(join(PROTOTYP, 'obrazky', soubor)).toString('base64');
}

const json = (x) => JSON.stringify(x).replace(/</g, '\\u003c');
const stranka = cti('prehravac.html')
  .replace('/*@@ENGINE@@*/', () => doSkriptu(cti('engine.js')))
  .replace('/*@@DATA@@*/', () => doSkriptu(cti(`kapitola${kapitola}.js`)))
  .replace('/*@@TEXTY@@*/{}', () => json(texty))
  .replace('/*@@OBRAZKY@@*/{}', () => json(obrazky));

const vystup = join(PROTOTYP, 'vystup');
mkdirSync(vystup, { recursive: true });
writeFileSync(join(vystup, `kapitola${kapitola}.html`), stranka);
writeFileSync(join(vystup, `kapitola${kapitola}-lokalne.html`),
  '<!doctype html>\n<html lang="cs"><head><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head><body style="margin:0">\n' +
  stranka + '\n</body></html>\n');
console.log(`prototyp/vystup/kapitola${kapitola}.html: ${(stranka.length / 1024).toFixed(0)} kB`);
