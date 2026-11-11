#!/usr/bin/env python3
"""Hudební téma hry „Termín byl včera“ a jeho aranže pro jednotlivé místnosti.

Použití: sloz.py [--vystup hra/zvuk/hudba] [--kontrola] [aranž …]
Bez názvů aranží složí všechny (menu, byt, mesto, radnice, komise, archiv) a uloží je jako
tema_<aranž>.ogg. S --kontrola navíc změří ladění nástrojů, harmonii pod melodií a výsledné
soubory (hlasitost, špičky, šev smyčky).

Všechno je čistá syntéza (žádné vzorky ani soundfonty), takže hudba je naše vlastní:
- elektrické piano (FM), vibrafon a marimba (sinusové částkové tóny), hvízdání (sinus s vibratem),
- brnkané struny a kontrabas (Karplus-Strong),
- šejkr a tikot hodin (filtrovaný šum a tlumené sinusy).

Téma má 16 taktů (A 8 taktů, B 4 takty, návrat 4 takty) v F dur. Rytmus hlavního motivu
skanduje název hry: Ter-mín byl vče-ra (osminka, čtvrtka, osminka, čtvrtka, čtvrtka).
Mollové aranže (komise, archiv) hrají totéž téma ve f moll.

Smyčka je bezešvá: tóny a dozvuk, které přesahují konec, se přičtou na začátek.
Potřebuje numpy, scipy a soundfile."""
import argparse
import functools
import pathlib
import sys

import numpy as np
import soundfile as sf
from scipy import signal

SR = 44100
CIL_RMS_DB = -20.0          # hlasitost všech skladeb (RMS celé smyčky)
STROP_DB = -2.0             # nejvyšší dovolená špička

# ---------------------------------------------------------------------------------------------
# Partitura
# ---------------------------------------------------------------------------------------------
TONY = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}


def nota(nazev):
    """'Bb4' -> číslo MIDI (A4 = 69)."""
    pc = TONY[nazev[0]]
    zbytek = nazev[1:]
    while zbytek[0] in "b#":
        pc += -1 if zbytek[0] == "b" else 1
        zbytek = zbytek[1:]
    return 12 * (int(zbytek) + 1) + pc


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def akord(hlasy, zaklad, kvinta):
    return {"hlasy": [nota(h) for h in hlasy.split()], "zaklad": nota(zaklad), "kvinta": nota(kvinta)}


# Rozložení akordů pro doprovod (bez základního tónu, ten hraje bas) + základ a kvinta pro bas
AKORDY = {
    "Fmaj7": akord("A3 C4 E4 G4", "F2", "C3"),
    "Dm7": akord("F3 A3 C4 E4", "D2", "A2"),
    "Gm7": akord("F3 Bb3 D4", "G2", "D2"),
    "C7": akord("E3 Bb3 D4", "C2", "G2"),
    "F6": akord("A3 C4 D4 G4", "F2", "C3"),
    "Bbmaj7": akord("A3 D4 F4", "Bb1", "F2"),
    "Am7": akord("G3 C4 E4", "A2", "E2"),
    # f moll
    "Fm7": akord("Ab3 C4 Eb4", "F2", "C3"),
    "Db69": akord("F3 Ab3 Bb3 Eb4", "Db2", "Ab2"),
    "Bbm7": akord("Ab3 Db4 F4", "Bb1", "F2"),
    "C7b9": akord("E3 Bb3 Db4", "C2", "G2"),
    "Fm6": akord("Ab3 C4 D4 G4", "F2", "C3"),
    "Ab": akord("Ab3 C4 Eb4", "Ab2", "Eb2"),
    "Gm7b5": akord("F3 Bb3 Db4", "G2", "Db2"),
}

# Průběh akordů: 16 taktů, v taktu dvojice (akord, počet dob)
PRUBEH = {
    "dur": [
        [("Fmaj7", 4)], [("Dm7", 4)], [("Gm7", 4)], [("C7", 4)],
        [("Fmaj7", 4)], [("Dm7", 4)], [("Gm7", 2), ("C7", 2)], [("F6", 4)],
        [("Bbmaj7", 4)], [("Am7", 4)], [("Gm7", 4)], [("C7", 4)],
        [("Fmaj7", 4)], [("Dm7", 4)], [("Gm7", 2), ("C7", 2)], [("F6", 4)],
    ],
    "moll": [
        [("Fm7", 4)], [("Db69", 4)], [("Bbm7", 4)], [("C7b9", 4)],
        [("Fm7", 4)], [("Db69", 4)], [("Bbm7", 2), ("C7b9", 2)], [("Fm6", 4)],
        [("Bbm7", 4)], [("Ab", 4)], [("Gm7b5", 4)], [("C7b9", 4)],
        [("Fm7", 4)], [("Db69", 4)], [("Bbm7", 2), ("C7b9", 2)], [("Fm6", 4)],
    ],
}

# Melodie v F dur: v každém taktu (doba, délka v dobách, tón)
MOTIV = [(0, .5), (.5, 1), (1.5, .5), (2, 1), (3, 1)]          # Ter-mín byl vče-ra
ZPEV = [(0, 1.5), (1.5, .5), (2, 1), (3, 1)]                   # klidnější díl B


def takt(rytmus, tony):
    return [(d, l, nota(t)) for (d, l), t in zip(rytmus, tony.split())]


MELODIE = [
    takt(MOTIV, "A4 C5 A4 G4 A4"),                              # 1  Fmaj7
    takt(MOTIV, "F4 A4 F4 E4 D4"),                              # 2  Dm7
    takt(MOTIV, "Bb4 D5 Bb4 A4 Bb4"),                           # 3  Gm7
    takt([(0, .5), (.5, 1), (1.5, .5), (2, 2)], "Bb4 G4 E4 G4"),  # 4  C7
    takt(MOTIV, "A4 C5 A4 G4 A4"),                              # 5  Fmaj7
    takt(MOTIV, "F4 A4 F4 E4 D4"),                              # 6  Dm7
    takt(MOTIV, "Bb4 D5 Bb4 G4 E4"),                            # 7  Gm7 | C7
    takt([(0, 3)], "F4"),                                       # 8  F6
    takt(ZPEV, "D5 C5 D5 A4"),                                  # 9  Bbmaj7
    takt(ZPEV, "C5 A4 C5 G4"),                                  # 10 Am7
    takt(ZPEV, "Bb4 A4 Bb4 F4"),                                # 11 Gm7
    takt(ZPEV, "G4 E4 G4 Bb4"),                                 # 12 C7
    takt(MOTIV, "A4 C5 A4 G4 A4"),                              # 13 Fmaj7
    takt(MOTIV, "F4 A4 D5 C5 A4"),                              # 14 Dm7 (zdvih)
    takt(MOTIV, "Bb4 D5 Bb4 G4 E4"),                            # 15 Gm7 | C7
    takt([(0, 3)], "F4"),                                       # 16 F6
]
TAKTU = len(MELODIE)


def akord_v(tonina, t, doba):
    zacatek = 0
    for nazev, delka in PRUBEH[tonina][t % TAKTU]:
        if doba < zacatek + delka:
            return nazev
        zacatek += delka
    return PRUBEH[tonina][t % TAKTU][-1][0]


def melodie(tonina):
    """Melodie v dané tónině: [(takt, doba, délka, MIDI)]. Moll snižuje A, D a E o půltón;
    E zůstává nad dominantou C7 (citlivý tón harmonické moll)."""
    out = []
    for t, noty in enumerate(MELODIE):
        for doba, delka, m in noty:
            if tonina == "moll":
                pc = m % 12
                if pc in (9, 2) or (pc == 4 and not akord_v("moll", t, doba).startswith("C7")):
                    m -= 1
            out.append((t, doba, delka, m))
    return out


# ---------------------------------------------------------------------------------------------
# Nástroje (vracejí mono signál se špičkou kolem 1)
# ---------------------------------------------------------------------------------------------
def _cas(delka):
    return np.arange(int(delka * SR)) / SR


def _obalka(t, delka, nabeh=0.004, dozvuk=0.1):
    """Náběh a utlumení po konci tónu."""
    o = np.minimum(1.0, t / nabeh)
    po = t > delka
    o[po] *= np.exp(-(t[po] - delka) / dozvuk)
    return o


@functools.lru_cache(maxsize=None)
def _piano(m, delka, sila, nabeh):
    """Elektrické piano: FM s poměrem 1 (teplý tón) a krátkým zvonivým úderem."""
    f = hz(m)
    t = _cas(delka + 0.6)
    index = (0.35 + 1.0 * sila) * np.exp(-t * 5.0) + 0.22
    y = np.sin(2 * np.pi * f * t + index * np.sin(2 * np.pi * f * t))
    y += 0.10 * sila * np.exp(-t * 16.0) * np.sin(2 * np.pi * 4 * f * t)
    y *= np.exp(-t * (1.1 + max(0, m - 48) / 30.0))
    return y * _obalka(t, delka, nabeh, 0.14) * 0.8


def piano(m, delka, sila=0.7, nabeh=0.005):
    return _piano(m, round(delka, 3), round(sila, 1), nabeh) * (0.5 + 0.5 * sila)


@functools.lru_cache(maxsize=None)
def _vibrafon(m, delka, utlum, tremolo):
    f = hz(m)
    t = _cas(delka + 1.2)
    y = np.sin(2 * np.pi * f * t) * np.exp(-t * utlum)
    y += 0.22 * np.sin(2 * np.pi * 4 * f * t) * np.exp(-t * (utlum + 7.0))
    y += 0.05 * np.sin(2 * np.pi * 10 * f * t) * np.exp(-t * 22.0)
    y *= 1.0 + 0.16 * np.sin(2 * np.pi * tremolo * t)
    return y * _obalka(t, delka, 0.003, 0.35) * 0.75


def vibrafon(m, delka, sila=0.7, utlum=1.6, tremolo=4.5):
    return _vibrafon(m, round(delka, 3), utlum, tremolo) * sila


@functools.lru_cache(maxsize=None)
def _marimba(m, delka):
    f = hz(m)
    t = _cas(min(delka, 0.9) + 0.5)
    y = np.sin(2 * np.pi * f * t) * np.exp(-t * 6.5)
    y += 0.30 * np.sin(2 * np.pi * 4 * f * t) * np.exp(-t * 22.0)
    y += 0.06 * np.sin(2 * np.pi * 9 * f * t) * np.exp(-t * 45.0)
    return y * _obalka(t, min(delka, 0.9), 0.002, 0.12) * 0.75


def marimba(m, delka, sila=0.7):
    return _marimba(m, round(delka, 3)) * sila


@functools.lru_cache(maxsize=None)
def _hvizd(m, delka):
    f = hz(m)
    t = _cas(delka + 0.25)
    vib = 0.004 * np.clip((t - 0.18) / 0.25, 0, 1) * np.sin(2 * np.pi * 5.3 * t)
    faze = 2 * np.pi * f * np.cumsum(1.0 + vib) / SR
    y = np.sin(faze) + 0.04 * np.sin(2 * faze)
    rng = np.random.default_rng(m)
    b, a = signal.butter(2, [f * 0.9 / (SR / 2), f * 1.1 / (SR / 2)], "band")
    y += 0.5 * signal.lfilter(b, a, rng.standard_normal(len(t)))     # dech
    return y * _obalka(t, delka * 0.92, 0.045, 0.07) * 0.8


def hvizd(m, delka, sila=0.7):
    return _hvizd(m, round(delka, 3)) * sila


@functools.lru_cache(maxsize=None)
def _struna(m, delka, t60, jas):
    """Karplus-Strong. Smyčka má délku N + 0,5 vzorku, proto se počítá na vlastní vzorkovací
    frekvenci f·(N + 0,5) a převzorkuje, aby tón přesně ladil."""
    f = hz(m)
    n_per = int(round(SR / f - 0.5))
    fs = f * (n_per + 0.5)
    n = int((delka + 0.3) * fs)
    rng = np.random.default_rng(1000 + m)
    b, a = signal.butter(1, min(0.95, jas / (fs / 2)))
    ruch = signal.lfilter(b, a, np.tile(rng.uniform(-1, 1, n_per), 2))[n_per:]
    ruch -= ruch.mean()
    x = np.zeros(n)
    x[:n_per] = ruch
    d = 10 ** (-3.0 / (f * t60))
    zpet = np.zeros(n_per + 2)
    zpet[0] = 1.0
    zpet[n_per] = zpet[n_per + 1] = -d / 2
    y = signal.lfilter([1.0], zpet, x)
    t = _cas(delka + 0.3)
    y = np.interp(t * fs, np.arange(n), y)
    y /= np.abs(y).max() + 1e-9
    return y * _obalka(t, delka, 0.002, 0.07)


def kytara(m, delka, sila=0.7):
    return _struna(m, round(delka, 3), 2.2, 2600.0) * sila


def pizzicato(m, delka, sila=0.7, t60=0.45):
    return _struna(m, round(min(delka, 0.5), 3), t60, 2200.0) * sila


@functools.lru_cache(maxsize=None)
def _bas(m, delka):
    y = _struna(m, delka, 1.8, 800.0).copy()
    t = np.arange(len(y)) / SR
    y += 0.6 * np.sin(2 * np.pi * hz(m) * t) * np.exp(-t * 2.5) * _obalka(t, delka, 0.006, 0.07)
    return y * 0.7


def bas(m, delka, sila=0.7):
    return _bas(m, round(delka, 3)) * sila


@functools.lru_cache(maxsize=None)
def _sejkr(seed):
    rng = np.random.default_rng(seed)
    t = _cas(0.09)
    b, a = signal.butter(2, [3500 / (SR / 2), 8000 / (SR / 2)], "band")
    y = signal.lfilter(b, a, rng.standard_normal(len(t)))
    return y * np.minimum(1, t / 0.006) * np.exp(-t / 0.022)


def sejkr(sila=0.7, seed=0):
    return _sejkr(seed % 4) * sila


@functools.lru_cache(maxsize=None)
def _tik(vysoky):
    """Tikot hodin: tik (vyšší) a tak (nižší)."""
    t = _cas(0.05)
    f1, f2 = (2600.0, 1650.0) if vysoky else (2050.0, 1300.0)
    y = np.sin(2 * np.pi * f1 * t) * np.exp(-t / 0.004) + 0.7 * np.sin(2 * np.pi * f2 * t) * np.exp(-t / 0.009)
    return y * np.minimum(1, t / 0.0006) * 0.6


def tik(vysoky=True, sila=0.7):
    return _tik(bool(vysoky)) * sila


# ---------------------------------------------------------------------------------------------
# Míchání
# ---------------------------------------------------------------------------------------------
class Skladba:
    def __init__(self, nazev, tempo, pruchodu, tonina, dozvuk=(1.3, 0.22), seed=1):
        self.nazev, self.tempo, self.pruchodu, self.tonina = nazev, tempo, pruchodu, tonina
        self.doba = 60.0 / tempo
        self.taktu = pruchodu * TAKTU
        self.n = int(round(self.taktu * 4 * self.doba * SR))
        self.stopy = {}
        self.posly = {}
        self.dozvuk = dozvuk          # (doba dozvuku v s, hlasitost)
        self.rng = np.random.default_rng(seed)

    def stopa(self, nazev, posli=0.25):
        self.posly[nazev] = posli
        return self.stopy.setdefault(nazev, np.zeros((self.n, 2)))

    def hraj(self, stopa, zvuk, doba, hlasitost=1.0, pan=0.0, lidsky=0.004):
        """Přičte zvuk od dané doby (počítáno od začátku skladby); přesah se vrací na začátek."""
        buf = self.stopy[stopa]
        start = int(round((doba * self.doba + self.rng.normal(0, lidsky)) * SR))
        idx = (start + np.arange(len(zvuk))) % self.n
        hlasitost *= 1.0 + self.rng.normal(0, 0.06)
        uhel = (pan + 1) * np.pi / 4
        buf[idx, 0] += zvuk * hlasitost * np.cos(uhel)
        buf[idx, 1] += zvuk * hlasitost * np.sin(uhel)

    def sekundy(self, dob):
        return dob * self.doba

    def smichej(self):
        sucha = sum(self.stopy.values())
        posl = sum(s.mean(axis=1) * self.posly[n] for n, s in self.stopy.items())
        mokra = self._dozvuk(posl)
        y = sucha + mokra * self.dozvuk[1]
        # Hlavní filtr na třikrát opakované smyčce, aby šev zůstal čistý
        y3 = np.tile(y, (3, 1))
        b, a = signal.butter(2, 9000 / (SR / 2))
        y3 = signal.lfilter(b, a, y3, axis=0)
        b, a = signal.butter(2, 35 / (SR / 2), "high")
        y3 = signal.lfilter(b, a, y3, axis=0)
        y = y3[self.n:2 * self.n]
        rms = np.sqrt((y ** 2).mean())
        y *= 10 ** (CIL_RMS_DB / 20) / rms
        spicka = np.abs(y).max()
        strop = 10 ** (STROP_DB / 20)
        if spicka > strop:                 # měkké omezení jen nad stropem
            y = np.where(np.abs(y) > 0.7 * strop,
                         np.sign(y) * (0.7 * strop + 0.3 * strop * np.tanh((np.abs(y) - 0.7 * strop) / (0.3 * strop))), y)
        return y

    def _dozvuk(self, mono):
        """Kruhová konvoluce se syntetickou odezvou místnosti (šum s exponenciálním útlumem)."""
        rt = self.dozvuk[0]
        rng = np.random.default_rng(7)
        t = _cas(rt * 1.4)
        out = np.zeros((self.n, 2))
        spektrum = np.fft.rfft(mono)
        for k in range(2):
            ir = rng.standard_normal(len(t)) * 10 ** (-3 * t / rt)
            b, a = signal.butter(2, [250 / (SR / 2), 3800 / (SR / 2)], "band")
            ir = signal.lfilter(b, a, ir)
            ir = np.concatenate([np.zeros(int(0.018 * SR)), ir])
            ir /= np.sqrt((ir ** 2).sum())
            plna = np.zeros(self.n)
            plna[:len(ir)] = ir[:self.n]
            out[:, k] = np.fft.irfft(spektrum * np.fft.rfft(plna), self.n)
        return out

    def hlasitosti_stop(self):
        """Stopa -> (RMS, špička) v dB před závěrečným vyrovnáním hlasitosti."""
        return {n: (20 * np.log10(np.sqrt((s ** 2).mean()) + 1e-12), 20 * np.log10(np.abs(s).max() + 1e-12))
                for n, s in self.stopy.items()}


def takty(s):
    """Všechny takty skladby: (průchod, takt v tématu, doba začátku taktu)."""
    for p in range(s.pruchodu):
        for t in range(TAKTU):
            yield p, t, (p * TAKTU + t) * 4


def hraj_melodii(s, stopa, nastroj, pruchod, hlasitost, pan=0.0, posun=0, legato=0.95, sila=0.7, **kw):
    for t, doba, delka, m in melodie(s.tonina):
        # první slabika motivu a těžké doby trochu silněji
        duraz = 1.0 if doba in (0, 2) else 0.85
        s.hraj(stopa, nastroj(m + posun, s.sekundy(delka) * legato, sila * duraz, **kw),
               (pruchod * TAKTU + t) * 4 + doba, hlasitost, pan)


def hraj_akord(s, stopa, nastroj, nazev, doba, delka, hlasitost, pan=0.0, rozklad=0.0, sila=0.6, **kw):
    for i, m in enumerate(AKORDY[nazev]["hlasy"]):
        s.hraj(stopa, nastroj(m, s.sekundy(delka), sila, **kw), doba + i * rozklad, hlasitost,
               pan + (i - 1.5) * 0.08)


def hraj_bas(s, vzor, hlasitost=0.5, stopa="bas"):
    """vzor: [(doba, délka, 'z' základ | 'k' kvinta, síla)]"""
    for p, t, t0 in takty(s):
        for doba, delka, co, sila in vzor:
            a = AKORDY[akord_v(s.tonina, t, doba)]
            s.hraj(stopa, bas(a["zaklad" if co == "z" else "kvinta"], s.sekundy(delka), sila), t0 + doba, hlasitost)


def hraj_tikot(s, krok, hlasitost, pan=0.3):
    """Tik-tak po 'krok' dobách."""
    pocet = int(round(s.taktu * 4 / krok))
    for i in range(pocet):
        s.hraj("tikot", tik(i % 2 == 0, 0.8 if i % 2 == 0 else 0.6), i * krok, hlasitost, pan, lidsky=0.0)


def hraj_sejkr(s, deleni, hlasitost, pan=-0.35):
    """Šejkr po 1/deleni doby, důraz na lehké doby."""
    for i in range(s.taktu * 4 * deleni):
        v_dobe = i % deleni
        sila = 0.55 if v_dobe == 0 else (0.9 if v_dobe * 2 == deleni else 0.4)
        s.hraj("sejkr", sejkr(sila, i), i / deleni, hlasitost, pan)


# ---------------------------------------------------------------------------------------------
# Aranže
# ---------------------------------------------------------------------------------------------
BOSSA = [(0, 1.4, "z", .8), (1.5, .45, "z", .5), (2, 1.4, "k", .7), (3.5, .45, "k", .5)]
DVE = [(0, 1.7, "z", .8), (2, 1.7, "k", .65)]


def menu():
    """Plné téma: lehká bossa, vibrafon a kytara nad elektrickým pianem."""
    s = Skladba("menu", 100, 2, "dur", dozvuk=(1.3, 0.24))
    s.stopa("melodie", 0.35), s.stopa("ozdoba", 0.4), s.stopa("piano", 0.25), s.stopa("bas", 0.05), s.stopa("sejkr", 0.12)
    hraj_melodii(s, "melodie", vibrafon, 0, 0.50, pan=0.12)
    hraj_melodii(s, "melodie", kytara, 1, 0.62, pan=0.12)
    hraj_melodii(s, "ozdoba", vibrafon, 1, 0.14, pan=-0.2, posun=12)
    for p, t, t0 in takty(s):
        if len(PRUBEH[s.tonina][t]) == 2:
            uhozy = [(0, 1.6), (2, 1.6)]
        else:
            uhozy = [(0, 2.2), (2.5, 1.2)]
        for doba, delka in uhozy:
            hraj_akord(s, "piano", piano, akord_v(s.tonina, t, doba), t0 + doba, delka, 0.15, pan=-0.15)
    hraj_bas(s, BOSSA, 0.42)
    hraj_sejkr(s, 2, 0.10)
    return s


def byt():
    """Ospalé ráno: pomalu, řídce, rozložené akordy a budík, který tiše tiká."""
    s = Skladba("byt", 72, 1, "dur", dozvuk=(1.6, 0.30))
    s.stopa("melodie", 0.4), s.stopa("piano", 0.3), s.stopa("bas", 0.05), s.stopa("tikot", 0.35)
    hraj_melodii(s, "melodie", vibrafon, 0, 0.42, pan=0.1, utlum=1.2, tremolo=3.2)
    for p, t, t0 in takty(s):
        for nazev, delka in PRUBEH[s.tonina][t]:
            doba = 0 if nazev == PRUBEH[s.tonina][t][0][0] else 2
            hraj_akord(s, "piano", piano, nazev, t0 + doba, delka * 0.95, 0.20, pan=-0.12, rozklad=0.12, sila=0.4)
            s.hraj("bas", bas(AKORDY[nazev]["zaklad"], s.sekundy(delka * 0.9), 0.6), t0 + doba, 0.45)
    hraj_tikot(s, 1, 0.08)
    return s


def mesto():
    """Náměstí a chaloupka: chůzové tempo, kytarové rozklady, marimba a pohvizdování."""
    s = Skladba("mesto", 108, 2, "dur", dozvuk=(1.1, 0.20))
    s.stopa("melodie", 0.3), s.stopa("hvizd", 0.45), s.stopa("kytara", 0.2), s.stopa("bas", 0.05), s.stopa("sejkr", 0.1)
    hraj_melodii(s, "melodie", marimba, 0, 0.62, pan=0.15)
    hraj_melodii(s, "hvizd", hvizd, 1, 0.20, pan=0.1, posun=12, legato=0.9)
    hraj_melodii(s, "melodie", marimba, 1, 0.30, pan=0.25)
    for p, t, t0 in takty(s):
        for osm in range(8):
            doba = osm / 2
            hlasy = AKORDY[akord_v(s.tonina, t, doba)]["hlasy"]
            poradi = [0, 2, 1, 3, 0, 2, 1, 3] if len(hlasy) == 4 else [0, 1, 2, 1, 0, 1, 2, 1]
            s.hraj("kytara", kytara(hlasy[poradi[osm]], s.sekundy(1.2), 0.6 if osm % 2 == 0 else 0.45),
                   t0 + doba, 0.26, pan=-0.3)
    hraj_bas(s, DVE, 0.44)
    hraj_sejkr(s, 2, 0.09)
    return s


def radnice():
    """Úřad (vestibul, pracovna): důležité staccato, bas a přiznávky jako pochod, tikot hodin."""
    s = Skladba("radnice", 104, 2, "dur", dozvuk=(1.5, 0.26))
    s.stopa("melodie", 0.35), s.stopa("ozdoba", 0.45), s.stopa("priznavky", 0.3), s.stopa("bas", 0.08), s.stopa("tikot", 0.3)
    hraj_melodii(s, "melodie", marimba, 0, 0.66, pan=0.1, legato=0.6)
    hraj_melodii(s, "melodie", marimba, 1, 0.60, pan=0.1, legato=0.6)
    hraj_melodii(s, "ozdoba", vibrafon, 1, 0.16, pan=-0.15, posun=12, legato=0.5, utlum=3.0, tremolo=0.0)
    for p, t, t0 in takty(s):
        for doba in (1, 3):
            hraj_akord(s, "priznavky", pizzicato, akord_v(s.tonina, t, doba), t0 + doba, 0.3, 0.27, pan=-0.25)
    hraj_bas(s, [(0, 0.8, "z", .85), (2, 0.8, "k", .7)], 0.50)
    hraj_tikot(s, 0.5, 0.11)
    return s


def komise():
    """Komise: totéž téma ve f moll, rychleji a po špičkách; napjaté, ale hravé."""
    s = Skladba("komise", 116, 2, "moll", dozvuk=(1.2, 0.22))
    s.stopa("melodie", 0.35), s.stopa("ozdoba", 0.4), s.stopa("piano", 0.25), s.stopa("bas", 0.05)
    s.stopa("sejkr", 0.1), s.stopa("tikot", 0.3)
    hraj_melodii(s, "melodie", pizzicato, 0, 0.85, pan=0.12, t60=0.7)
    hraj_melodii(s, "melodie", pizzicato, 1, 0.75, pan=0.12, t60=0.7)
    hraj_melodii(s, "ozdoba", marimba, 1, 0.40, pan=-0.1, legato=0.6)
    for p, t, t0 in takty(s):
        for doba in (1.5, 3.5):
            hraj_akord(s, "piano", piano, akord_v(s.tonina, t, doba), t0 + doba, 0.4, 0.13, pan=-0.2, sila=0.5)
    hraj_bas(s, [(0, .4, "z", .85), (1, .4, "z", .55), (2, .4, "k", .7), (3, .4, "z", .55)], 0.38)
    hraj_sejkr(s, 2, 0.08)
    hraj_tikot(s, 1, 0.08)
    return s


def archiv():
    """Archiv: pomalu ve f moll, osamělá kytara ve velkém prostoru nad hlubokým basem,
    hodiny tikají z dálky."""
    s = Skladba("archiv", 66, 1, "moll", dozvuk=(2.4, 0.40))
    s.stopa("melodie", 0.5), s.stopa("piano", 0.4), s.stopa("bas", 0.1), s.stopa("tikot", 0.6)
    hraj_melodii(s, "melodie", kytara, 0, 0.72, pan=0.1, legato=1.0)
    for p, t, t0 in takty(s):
        for i, (nazev, delka) in enumerate(PRUBEH[s.tonina][t]):
            doba = 0 if i == 0 else 2
            hraj_akord(s, "piano", piano, nazev, t0 + doba, delka, 0.20, pan=-0.1, rozklad=0.06, sila=0.3, nabeh=0.25)
            s.hraj("bas", bas(AKORDY[nazev]["zaklad"], s.sekundy(delka * 0.95), 0.6), t0 + doba, 0.50)
    hraj_tikot(s, 2, 0.07, pan=0.45)
    return s


ARANZE = {"menu": menu, "byt": byt, "mesto": mesto, "radnice": radnice, "komise": komise, "archiv": archiv}
# Která skladba hraje ve které místnosti (script_name místnosti)
MISTNOSTI = {
    "Menu": "menu", "Byt": "byt", "Namesti": "mesto", "Chaloupka": "mesto",
    "Vestibul": "radnice", "Pracovna": "radnice", "Komise": "komise", "Archiv": "archiv",
}


# ---------------------------------------------------------------------------------------------
# Kontroly
# ---------------------------------------------------------------------------------------------
def zmer_ton(y):
    """Základní frekvence tónu z autokorelace přes FFT s parabolickým zpřesněním vrcholu spektra."""
    y = y[:min(len(y), SR)] * np.hanning(min(len(y), SR))
    sp = np.abs(np.fft.rfft(y, 1 << 19))
    k = int(sp.argmax())
    a, b, c = np.log(sp[k - 1:k + 2] + 1e-12)
    k += 0.5 * (a - c) / (a - 2 * b + c)
    return k * SR / (1 << 19)


def kontrola_ladeni():
    print("Ladění nástrojů (odchylka nejsilnější harmonické od čistého násobku tónu v centech):")
    nastroje = {"piano": piano, "vibrafon": vibrafon, "marimba": marimba, "hvizd": hvizd,
                "kytara": kytara, "pizzicato": pizzicato, "bas": bas}
    rozsahy = {"bas": range(33, 49), "hvizd": range(76, 87), "piano": range(52, 68)}
    for nazev, fn in nastroje.items():
        nejhorsi = 0.0
        for m in rozsahy.get(nazev, range(52, 87)):
            f = zmer_ton(fn(m, 0.8, 0.7))
            k = max(1, round(f / hz(m)))               # nejsilnější může být vyšší harmonická
            centy = 1200 * np.log2(f / (k * hz(m)))
            nejhorsi = max(nejhorsi, abs(centy))
        print(f"  {nazev:10s} nejvýš {nejhorsi:.1f} centu")


def kontrola_harmonie():
    """Každý tón melodie proti akordu: hlásí tóny o malou sekundu nad akordickým tónem a tóny
    vzdálené o malou sekundu nebo malou nonu od některého hlasu doprovodu (ostré disonance),
    pokud trvají aspoň dobu."""
    jmena = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
    for tonina in PRUBEH:
        chyb = 0
        for t, doba, delka, m in melodie(tonina):
            nazev = akord_v(tonina, t, doba)
            a = AKORDY[nazev]
            pcs = {h % 12 for h in a["hlasy"]} | {a["zaklad"] % 12}
            pc = m % 12
            if pc not in pcs and (pc - 1) % 12 in pcs and delka >= 1:
                chyb += 1
                print(f"  {tonina} takt {t + 1} doba {doba}: {jmena[pc]} nad {nazev} je malá sekunda nad akordickým tónem")
            treni = [h for h in a["hlasy"] if abs(m - h) in (1, 13)]
            if treni and delka >= 1:
                chyb += 1
                print(f"  {tonina} takt {t + 1} doba {doba}: {jmena[pc]}{m // 12 - 1} se tře s hlasem akordu {nazev}"
                      f" ({', '.join(jmena[h % 12] + str(h // 12 - 1) for h in treni)})")
        print(f"Harmonie {tonina}: {'v pořádku' if chyb == 0 else f'{chyb} sporných tónů'}")
        radky = []
        for t in range(TAKTU):
            noty = " ".join(jmena[m % 12] + str(m // 12 - 1) for tt, d, l, m in melodie(tonina) if tt == t)
            radky.append(f"    {t + 1:2d} {'/'.join(n for n, _ in PRUBEH[tonina][t]):12s} {noty}")
        print("\n".join(radky))


def kontrola_souboru(cesta, n_ocekavano):
    y, sr = sf.read(cesta)
    rms = 20 * np.log10(np.sqrt((y ** 2).mean()))
    spicka = 20 * np.log10(np.abs(y).max())
    # Šev: skok mezi posledním a prvním vzorkem proti běžnému rozdílu sousedních vzorků
    rozdily = np.abs(np.diff(y, axis=0))
    skok = np.abs(y[0] - y[-1]).max() / (np.percentile(rozdily, 99.9) + 1e-12)
    sp = np.abs(np.fft.rfft(y.mean(axis=1))) ** 2
    f = np.fft.rfftfreq(len(y), 1 / sr)
    vysky = 100 * sp[f > 6000].sum() / sp.sum()
    print(f"  {cesta.name:18s} {len(y) / sr:6.2f} s, {cesta.stat().st_size / 1024:5.0f} kB, vzorků {len(y)}"
          f" ({'=' if len(y) == n_ocekavano else '≠'} {n_ocekavano}), RMS {rms:.1f} dB, špička {spicka:.1f} dB,"
          f" DC {y.mean():+.5f}, šev {skok:.2f}× běžného rozdílu, nad 6 kHz {vysky:.2f} %")


def uloz(cesta, y):
    with sf.SoundFile(str(cesta), "w", SR, 2, format="OGG", subtype="VORBIS", compression_level=0.6) as f:
        for i in range(0, len(y), SR):          # po částech (libsndfile padá na dlouhých zápisech)
            f.write(y[i:i + SR])


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("aranze", nargs="*", help="které aranže složit (výchozí všechny)")
    ap.add_argument("--vystup", default=str(pathlib.Path(__file__).resolve().parents[2] / "hra/zvuk/hudba"))
    ap.add_argument("--kontrola", action="store_true", help="změří ladění, harmonii a výsledné soubory")
    arg = ap.parse_args()
    neznam = [a for a in arg.aranze if a not in ARANZE]
    if neznam:
        sys.exit(f"Neznámá aranž: {', '.join(neznam)} (známé: {', '.join(ARANZE)})")
    if arg.kontrola:
        kontrola_ladeni()
        kontrola_harmonie()
    cil = pathlib.Path(arg.vystup)
    cil.mkdir(parents=True, exist_ok=True)
    hotove = []
    for nazev in arg.aranze or ARANZE:
        s = ARANZE[nazev]()
        y = s.smichej()
        cesta = cil / f"tema_{nazev}.ogg"
        uloz(cesta, y)
        hotove.append((cesta, s.n))
        stopy = ", ".join(f"{n} {r:.0f}/{sp:.0f}" for n, (r, sp) in s.hlasitosti_stop().items())
        print(f"{cesta.name}: {s.tempo} dob/min, {s.taktu} taktů, {s.n / SR:.1f} s, {s.tonina}; stopy RMS/špička v dB: {stopy}")
    if arg.kontrola:
        print("Soubory po dekódování:")
        for cesta, n in hotove:
            kontrola_souboru(cesta, n)
