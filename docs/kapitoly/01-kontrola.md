# Kapitola 1: autorská kontrola (N4)

> Krok N4 [postupu návrhu](../12-postup-navrhu.md) bez hráčů (D66). Nejkratší cesta a varianty
> z [průchodu](01-pruchod.md) prošly krok za krokem proti [kartám puzzlů](01-puzzly.md),
> [obsahu místností](01-mistnosti.md) a [textům](01-scenar.md).
> Stav: **zapracováno** (D67), 2026-11-01. Všechny návrhy K1–K12 autor schválil.

## Shrnutí

| Oblast | Výsledek |
|---|---|
| Průchod krok za krokem | projde; 3 logické díry (K1–K3) |
| Matice předmětů | všech 63 buněk ✔/★ má text |
| Odkazy na texty v dokumentech | všechny klíče `ch1_…` z dokumentů v tabulce existují |
| Nápovědy | 3 stupně u všech puzzlů; 1 chybná podmínka (K9) |
| Chybějící pravidla a texty | K4–K8 |
| Rozpočet | 540 replik proti 400–500 (o 8 % nad) |
| Chyby v dokumentech | 2, opravené rovnou (D1, D2) |

## Logické díry

**K1 Proč řadit kartotéku (P1.5).** V hádance je jen pět lístků a lístek Archy s poznámkou
„viz zadání“ je vidět hned. Hráč nemá důvod řadit, prostě si ho vezme.
*Návrh:* Lumír vydává přílohy jen ke správně zařazeným lístkům: „Přílohy vydávám jen
k lístkům, které jsou na svém místě.“ Kdo lístek Archy vezme bez řazení, uslyší tuhle větu.
Je to v jeho povaze a řazení dostane smysl.

**K2 Karta poučení a řazení si překážejí (P1.5, P1.7).** Karta poučení je lístek mostu, který je
zároveň jedním z pěti lístků k řazení. Kdo si kartu půjčí před řazením, chybí mu lístek.
*Návrh:* karta poučení je samostatná karta v Lumírově krabičce „Poučení“, ve které je jediná
(sedí na vtip „Jediné poučení v archivu“). Lístek mostu v kartotéce na ni odkazuje: „Pozn.: viz
poučení.“ Řazení i výpůjčka jsou pak nezávislé.

**K3 Útržek „…a následné fáze“ v M01.** Tabulka M01 ho uvádí jako past od Předsedy, jenže R1.4
přichází až po razítku, tedy po M01. Hráč ho v M01 mít nemůže.
*Návrh:* z M01 ho vyřadit (texty `ch1_m01_utrzek_faze` a `ch1_m01_reakce_faze` smazat). Past
zůstává jen u Předsedy na konci, kde je čitelnější.

## Chybějící pravidla

**K4 Pravidla M03 nejsou úplná.** Texty mají pět kol, návrh mluví o 4–6 kolech a nikde nestojí,
kolik kol je třeba vyhrát. `c1_slib_vseho` je v dokumentech 0–3, ale rychlých replik může být pět.
*Návrh:*
- výhra = aspoň 3 vyhraná kola z 5,
- dobrá replika se ukáže jen se svým podkladem (kolo 2 zadání, kolo 3 karta, kolo 5 Bářina čísla),
- `c1_slib_vseho` = počet rychlých replik (0–5), R1.1 „slíbit všechno“ od 3.

Ověřeno: bez Báry i bez karty se dá vyhrát poctivě (kola 1, 2 a 4). Bez zadání to nejde,
ale zadání je povinné.

**K5 Útržky M01 nemají zdroj ve hře.**
- Předseda nikde neřekne „Až to bude.“ ani „…pokud schválí.“
- Útržek „Kdo rozhoduje“ má zdroj v podpisu, ale M01 nikde neříká, jak hráč útržky sbírá.

*Návrh:*
- útržky nejsou předměty, hra si je pamatuje jako příznaky a M01 nabídne jen ty, které hráč slyšel,
- doplnit Předsedovi 2 repliky do prvního rozhovoru (volby „Do kdy to stihneme?“ a „Kdo o Arše
  rozhoduje?“), celkem asi 4 texty.

**K6 Babička se zavřeným oknem nemá stav.** `c1_babicka` zná jen `spojenec`, `prehlizena`
a `neodhalena`. Co když Ruda spěchal nebo slíbil?
*Návrh:* nová hodnota `odmitnuta` (okno zůstane zavřené do konce kapitoly, poduška se nedá
získat). V kap. 4 se chová jako `prehlizena`, ale na obrazovce následků má vlastní větu: „Babička
si pamatuje, že jsi spěchal.“ (1 text).

**K7 Bára nesmí odejít z archivu dřív.** Během úseku za Báru chybí reakce na schody.
*Návrh:* „Nejdřív to přeměřím. Pak půjdu.“ (1 text).

**K8 Řazení lístků nemá ovládání.** P1.5 je malá hádanka, ne minihra, ale N7 potřebuje vědět,
jak vypadá.
*Návrh:* překryvná obrazovka s pěti lístky, přetahují se do řady; kontroluje se po
každém přesunu. Chybné pokusy „abecedně“ a „podle čísla“ se poznají podle výsledného pořadí.
Lístky ale čísla projektů neukazují, takže pokus „podle čísla“ nejde udělat.
*Návrh:* repliku `ch1_kartoteka_cisla` vyřadit, nebo doplnit čísla na lístky. Doporučuji vyřadit.

## Drobnosti

**K9 Nápověda k razítku pro spojence.** `ch1_pembok_rada_razitko_2_babicka` radí najít
podušku i hráči, který ji už má. *Návrh:* pro spojence s poduškou nová nápověda „Máš babiččinu
podušku. Razítko ji bude mít rádo.“ (1 text); stávající jen pro `odhalena` / `prehlizena`.

**K10 Úvod: dekret přes rozhovor, ne přes škvíru.** Texty vedou vznik dekretu rozhovorem
s věřiteli (volba „Co chcete?“). V obsahu místností je to aktivní místo „Škvíra pode dveřmi“.
*Návrh:* škvíra jen k prohlédnutí, dekret vzniká v rozhovoru. Kávu a propisku na stole
popsat jako dvě aktivní místa s popisky z názvů předmětů.

**K11 Vrátný a schody do sklepa.** Podle obsahu místností jsou schody volné a do archivu
nepouští Lumír. Repliky vrátného `ch1_vratny_stop` a `ch1_vratny_pusti` pak nejsou potřeba
a poznámka v tabulce („od N7 schody do sklepa“) je zavádějící.
*Návrh:* v N7 obě repliky vyřadit; všechny prvky archivu jsou před vstupem zamčené Lumírem
(`ch1_lumir_stop_1`), i mapník.

**K12 Kávu na podušku dřív, než Předseda souhlasí.** Chybí reakce. *Návrh:* povolit to;
razítko pak čeká na papír („Poduška je mokrá. Teď ještě papír.“, 1 text).

## Rozpočet

540 replik je o 8 % nad horní hranicí. Návrhy K3, K8 a K11 ubírají 5 textů, K5–K7, K9 a K12
jich přidávají 8. Škrtat navrhuji až po playtestu prototypu (D66), kdy bude jasné, které
vlastní reakce ★ hráči opravdu vidí.

## Opraveno rovnou

- **D1** Graf závislostí v [návrhu kapitoly](01-iniciace.md): náhradní cesta k razítku vede
  z kávy, ne z kávového pera.
- **D2** Tabulka scén v návrhu kapitoly: vrátný patří do vestibulu, ne na náměstí.

## Kontrola N3h po opravách

Platí beze změny, s výjimkou bodu „kapitola se vejde do rozpočtu“: repliky jsou nad rozpočtem
(viz výše), délka 35–45 min (nejkratší cesta) je v rozpočtu.
