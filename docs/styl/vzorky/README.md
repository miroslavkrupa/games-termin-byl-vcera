# Vzorky grafiky

Sem patří obrázky vygenerované podle zadání ve [stylové bibli](../../06-stylova-bible.md).
Generují se skriptem `tools/generuj_vzorky.py` (viz stylová bible, část Automatické generování),
nebo ručně v ChatGPT se stejným zadáním. Skript ke každému obrázku uloží stejnojmenný `.json`
s úplným zadáním, modelem a datem a přidá řádek do tabulky níže; u ručně vytvořených se řádek
doplní ručně. Pojmenování: `<id vzorku>_v01.png`, další pokus `_v02`. Schválené vzorky se označí ☑.
Hodnocení kol: [kolo 1](hodnoceni-kolo-1.md). Zadání ke zkopírování: [kolo 2](zadani-kolo-2.md). Hodnocení kola 2: [postavy a pozadí](hodnoceni-kolo-2.md), tam jsou i zadání pro kolo 3. Hodnocení kola 3: [večerní náměstí a rampa](hodnoceni-kolo-3.md). Části postavy pro animaci: [zadání](zadani-casti.md). Kreslené fáze chůze: [zadání](zadani-faze-chuze.md).

| Soubor | Nástroj | Zadání | Schváleno |
|---|---|---|---|
| a-namesti_v01.png | ChatGPT (ručně) | zadání `a-namesti` z tools/vzorky/zadani.json | ☐ ([hodnocení](hodnoceni-kolo-1.md)) |
| a-archiv_v01.png | ChatGPT (ručně) | zadání `a-archiv` | ☐ |
| a-rampa_v01.png | ChatGPT (ručně) | zadání `a-rampa` | ☐ |
| c-namesti-vecer_v01.png | ChatGPT (ručně) | zadání `c-namesti-vecer`, ve stejné konverzaci jako a-namesti | ☐ |
| ruda-list_v01.png | ChatGPT (ručně) | zadání `ruda-list` | ☐ |
| bara-list_v01.png | ChatGPT (ručně) | zadání `bara-list` | ☐ |
| ruda-list_v02.png | ChatGPT (ručně) | zadání `ruda-list` kola 2, předloha ruda-list_v01 | ☑ reference ([hodnocení](hodnoceni-kolo-2.md)) |
| bara-list_v02.png | ChatGPT (ručně) | zadání `bara-list` kola 2, předloha stylu ruda-list_v01 | ☑ reference |
| a-namesti_v02.png | ChatGPT (ručně) | zadání `a-namesti` kola 2, předloha stylu ruda-list_v01 | ☑ směr (D32), nahrazeno v03 ([hodnocení](hodnoceni-kolo-2.md)) |
| c-namesti-vecer_v02.png | ChatGPT (ručně) | zadání `c-namesti-vecer` kola 2, stejná konverzace jako náměstí | ☑ směr (D32), nahrazeno v03 |
| a-archiv_v02.png | ChatGPT (ručně) | zadání `a-archiv` kola 2 | ☑ vzor interiérů (D32) |
| a-rampa_v02.png | ChatGPT (ručně) | zadání `a-rampa` kola 2 | ☐ nahrazeno v03 |
| test-postavy-namesti_v02.png | složeno skriptem | ruda/bara-list_v02 na a-namesti_v02 | test |
| test-postavy-archiv_v02.png | složeno skriptem | ruda/bara-list_v02 na a-archiv_v02 | test |
| a-namesti_v03.png | ChatGPT (ručně) | úprava křivosti a-namesti_v02 (zadání v hodnocení kola 2) | ☑ reference exteriérů (D33) ([hodnocení](hodnoceni-kolo-3.md)) |
| c-namesti-vecer_v03.png | ChatGPT (ručně) | stejná úprava ve večerní verzi | ☑ reference exteriérů (D33) |
| test-postavy-namesti-vecer_v03.png | složeno skriptem | ruda/bara-list_v02 na c-namesti-vecer_v03 | test |
| a-rampa_v03.png | ChatGPT (ručně) | zadání rampy v03 z hodnocení kola 2 | ☑ reference staveniště a Archy (D34) ([hodnocení](hodnoceni-kolo-3.md)) |
| test-postavy-rampa_v03.png | složeno skriptem | ruda/bara-list_v02 na a-rampa_v03 | test |
| ruda-casti_v01.png | ChatGPT (ručně) | [zadání částí](zadani-casti.md), průhledné pozadí | ☑ použito pro loutku s klouby (D39) |
| ruda-list_v03.png | ChatGPT (ručně) | list Rudy s průhledným pozadím | ☑ pohledy zepředu, z boku, zezadu ve hře |
| ruda-chuze-bok_v01.png | ChatGPT (ručně) | [zadání fází chůze](zadani-faze-chuze.md), stejná konverzace jako v03 | ☐ zkouška D40 |
| ruda-stoji_v01.png | ChatGPT (ručně) | [zadání stání](zadani-faze-chuze.md), stejná konverzace jako fáze chůze | ☑ pohledy zepředu, z boku, zezadu ve hře (nahrazují v03) |
| ruda-model_v01.png | ChatGPT (ručně) | [animace postav](../animace-postav.md), zadání 0 | ☑ model postavy |
| ruda-chuze-bok_v02.png | ChatGPT (ručně) | zadání 1, 12 fází | nahrazeno v03 (předměty skákaly) |
| ruda-chuze-bok_v03.png | ChatGPT (ručně) | zadání 1b, 12 fází, 1254 × 1254 | ☑ ve hře |
| ruda-chuze-predu_v01.png | ChatGPT (ručně) | zadání 2 | ☑ ve hře |
| ruda-chuze-zezadu_v01.png | ChatGPT (ručně) | zadání 3 | ☑ ve hře |
| ruda-stani_v01.png | ChatGPT (ručně) | zadání 4 | ☐ nahrazeno v02 |
| ruda-stani_v02.png | ChatGPT (ručně) | zadání 4 podle chůze | ☑ ve hře |
| ruda-mluveni_v01.png | ChatGPT (ručně) | zadání 5 | ☐ nahrazeno v02 |
| ruda-mluveni_v02.png | ChatGPT (ručně) | zadání 5 podle chůze | ☑ ve hře |
| ruda-akce_v01.png | ChatGPT (ručně) | zadání 6 | ☐ nahrazeno v02 |
| ruda-akce_v02.png | ChatGPT (ručně) | zadání 6 podle chůze | ☑ ve hře |
| pisma-nahled_v01.png | snímky ze hry (`ladeni.gd pismo=`) | F0/R4 náhled písem: Open Sans, Monkey Island, Patrick Hand, Bangers, Kalam, Comic Neue | ☑ vybráno Patrick Hand (D48) |
| pisma-patrick-ve-hre_v01.png | snímek ze hry | Patrick Hand na celé obrazovce | ☑ ve hře |
| a-namesti-siroke_v01.png | ChatGPT (ručně) | [F2 krok 1](../../11-grafika-kapitoly-1.md), rozšíření a-namesti_v03 na 19,5:9 | ☑ pozadí kapitoly 1 (D51) ([hodnocení](hodnoceni-pozadi-kap1.md)) |
| c-namesti-vecer-siroke_v01.png | ChatGPT (ručně) | F2 krok 1, večer stejně rozšířený jako den | ☑ pozadí kapitoly 1 (D51) |
| a-archiv-siroke_v01.png | ChatGPT (ručně) | F2 krok 1, rozšíření a-archiv_v02 na 19,5:9 | ☑ pozadí kapitoly 1 (D51) |
| a-vestibul_v01.png | ChatGPT (ručně) | F2 krok 2 | ☑ pozadí kapitoly 1 (D51) |
| a-pracovna_v01.png | ChatGPT (ručně) | F2 krok 2 | ☑ pozadí kapitoly 1 (D51) |
| a-komise_v01.png | ChatGPT (ručně) | F2 krok 2 | ☑ pozadí kapitoly 1 (D51) |
| a-chaloupka_v01.png | ChatGPT (ručně) | F2 krok 2 | ☑ pozadí kapitoly 1 (D51) |
| predseda-list_v01.png | ChatGPT (ručně) | [F2 krok 3](../../11-grafika-kapitoly-1.md), předloha ruda-stoji_v01 | ☑ reference kapitoly 1 (D52) ([hodnocení](hodnoceni-postavy-ikony-kap1.md)) |
| starosta-list_v01.png | ChatGPT (ručně) | F2 krok 3 | ☑ reference kapitoly 1 (D52) |
| zmena-list_v01.png | ChatGPT (ručně) | F2 krok 3 | ☑ reference kapitoly 1 (D52) |
| lumir-list_v01.png | ChatGPT (ručně) | F2 krok 3 | ☑ reference kapitoly 1 (D52) |
| babicka-list_v01.png | ChatGPT (ručně) | F2 krok 3 | ☑ reference kapitoly 1 (D52) |
| framework-list_v01.png | ChatGPT (ručně) | F2 krok 3 | ☑ reference kapitoly 1 (D52) (podobný Rudovi) |
| vratny-list_v01.png | ChatGPT (ručně) | F2 krok 3 | ☑ reference kapitoly 1 (D52) |
| kocour-list_v01.png | ChatGPT (ručně) | F2 krok 3, tři pózy | ☑ reference kapitoly 1 (D52) (ucho natržené jen zepředu) |
| ikony-1_v01.png | ChatGPT (ručně) | [F2 krok 4](../../11-grafika-kapitoly-1.md), ikony 1–9 | ☑ reference kapitoly 1 (D52) |
| ikony-2_v01.png | ChatGPT (ručně) | F2 krok 4, ikony 10–17 | ☑ reference kapitoly 1 (D52) |
| a-byt-siroke_v01.png | gpt-image-2 (medium) | a-byt-siroke_v01.json | ☐ |
| a-byt-siroke_v02.png | gpt-image-2 (medium) | a-byt-siroke_v02.json | ☐ |
| byt-kulisy_v01.png | gpt-image-2 (medium) | byt-kulisy_v01.json | ☐ |
| vestibul-kulisy_v01.png | gpt-image-2 (medium) | vestibul-kulisy_v01.json | ☐ |
| vratny-mluveni_v01.png | gpt-image-2 (medium) | vratny-mluveni_v01.json | ☐ |
| vratny-mluveni-uprava_v01.png | gpt-image-2 (medium) | vratny-mluveni-uprava_v01.json | ☐ |
| babicka-mluveni-uprava_v01.png | gpt-image-2 (medium) | babicka-mluveni-uprava_v01.json | ☐ |
| bara-mluveni-uprava_v01.png | gpt-image-2 (medium) | bara-mluveni-uprava_v01.json | ☐ |
| framework-mluveni-uprava_v01.png | gpt-image-2 (medium) | framework-mluveni-uprava_v01.json | ☐ |
| kocour-mluveni-uprava_v01.png | gpt-image-2 (medium) | kocour-mluveni-uprava_v01.json | ☐ |
| lumir-mluveni-uprava_v01.png | gpt-image-2 (medium) | lumir-mluveni-uprava_v01.json | ☐ |
| predseda-mluveni-uprava_v01.png | gpt-image-2 (medium) | predseda-mluveni-uprava_v01.json | ☐ |
| starosta-mluveni-uprava_v01.png | gpt-image-2 (medium) | starosta-mluveni-uprava_v01.json | ☐ |
| zmena-mluveni-uprava_v01.png | gpt-image-2 (medium) | zmena-mluveni-uprava_v01.json | ☐ |
| bara-chuze-bok_v01.png | gpt-image-2 (medium) | bara-chuze-bok_v01.json | ☐ |
| bara-chuze-predu_v01.png | gpt-image-2 (medium) | bara-chuze-predu_v01.json | ☐ |
| bara-chuze-zezadu_v01.png | gpt-image-2 (medium) | bara-chuze-zezadu_v01.json | ☐ |
| gui-prvky_v01.png | gpt-image-2 (medium) | gui-prvky_v01.json | ☐ |
| pracovna-vytah_v01.png | gpt-image-2 (medium) | pracovna-vytah_v01.json | ☐ |
| namesti-amplion_v01.png | gpt-image-2 (medium) | namesti-amplion_v01.json | ☐ |
| ruda-novy-styl_v01.png | gpt-image-2 (medium) | ruda-novy-styl_v01.json | ☐ |
| vestibul-schody-podlaha_v01.png | gpt-image-2 (medium) | vestibul-schody-podlaha_v01.json | ☐ |
| komise-vytah-prepazka_v01.png | gpt-image-2 (medium) | komise-vytah-prepazka_v01.json | ☐ |
| ruda-styl-chuze-bok_v01.png | gpt-image-2 (medium) | ruda-styl-chuze-bok_v01.json | ☐ |
| ruda-styl-chuze-predu_v01.png | gpt-image-2 (medium) | ruda-styl-chuze-predu_v01.json | ☐ |
| ruda-styl-chuze-zezadu_v01.png | gpt-image-2 (medium) | ruda-styl-chuze-zezadu_v01.json | ☐ |
| ruda-styl-stani_v01.png | gpt-image-2 (medium) | ruda-styl-stani_v01.json | ☐ |
| ruda-styl-akce_v01.png | gpt-image-2 (medium) | ruda-styl-akce_v01.json | ☐ |
| ruda-mluveni-bok-usta_v01.png | gpt-image-2 (medium) | ruda-mluveni-bok-usta_v01.json | ☐ |
| ruda-mluveni-bok-gesta_v01.png | gpt-image-2 (medium) | ruda-mluveni-bok-gesta_v01.json | ☐ |
| ruda-mluveni-predu-usta_v01.png | gpt-image-2 (medium) | ruda-mluveni-predu-usta_v01.json | ☐ |
| ruda-mluveni-predu-gesta_v01.png | gpt-image-2 (medium) | ruda-mluveni-predu-gesta_v01.json | ☐ |
| archiv-rozsireni_v01.png | gpt-image-2 (medium) | archiv-rozsireni_v01.json | ☐ |
| kocour-novy-styl_v01.png | gpt-image-2 (medium) | kocour-novy-styl_v01.json | ☐ |
| archiv-rozsireni_v01.png | gpt-image-2 (medium) | archiv-rozsireni_v01.json | ☐ |
| kocour-mluveni-uprava_v02.png | gpt-image-2 (medium) | kocour-mluveni-uprava_v02.json | ☐ |
| archiv-krabicka-pouceni_v01.png | gpt-image-2 (medium) | archiv-krabicka-pouceni_v01.json | ☐ |
