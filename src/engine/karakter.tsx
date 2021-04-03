import { DobasMatrix } from "./dobasmatrix";
import { FEGYVERTELEN, FegyverUtils, FEGYVER_KEPZETTSEG, Harcertek } from "./harc";
import { Kaszt, osszead } from "./kasztok";
import { Pancel } from "./pancel";
import { roll } from "./roll";


export interface KarakterKepesseg {
    ero: number;
    gy: number;
    ugy: number;
    ak: number;
    egs: number;
    sz: number;
    int: number;
    ae: number;
    asz: number;
}

export interface KarakterInfo {
    id: string;
    name: string;
}

export interface KarakterInfo {
    id: string;
    categories: Array<string>;
    name: string;
}

export interface Points {
    akt: number;
    max: number;
}

export interface KarakterV1 extends KarakterInfo {
    version: 1;
    faj: string;
    kaszt: Kaszt;
    szint: number;
    kepessegek: KarakterKepesseg;
    kepzettsegek?: Array<Kepzettseg>;
    alapHarcertek: Harcertek;
    hmHarcertek: Harcertek;
    hm: number;
    fegyverek: Array<Fegyver>;
    pancelok?: Array<Pancel>;
    valasztottPancel?: number;
    valasztottFegyver?: number;
    masodlagosFegyver?: number;
    pszi?: Points,
    mp?: Points,

    maxFp: number;
    maxEp: number;
    fp: number;
    ep: number;
}

export interface Karakter extends KarakterInfo {
    version: 2;
    faj: string;
    kaszt: Kaszt;
    szint: number;
    kepessegek: KarakterKepesseg;
    kepzettsegek?: Array<Kepzettseg>;
    alapHarcertek: Harcertek;
    hmHarcertek: Harcertek;
    hm: number;
    fegyverek: Array<Fegyver>;
    pancelok?: Array<Pancel>;
    valasztottPancel?: number;
    valasztottFegyver?: number;
    masodlagosFegyver?: number;
    pszi?: Points,
    mp?: Points,
    ep: Points,
    fp: Points
}



export interface Fegyver {
    name: string;
    harcertek: Harcertek;
    sebzes: string;
    tamPerKor: number;
    lassu?: boolean;
    lotav?: number;
    erobonusz?: number;
    pajzs?: boolean;
    mgt?: number;
}

export interface Kepzettseg {
    name: string;
    target?: string;
    szint: '1' | '2' | '3' | '4' | '5' | 'Af' | 'Mf' | number;
    kp: number;
}

export const findKepzettseg = ({ kepzettsegek }: Pick<Karakter, 'kepzettsegek'>, kepzettseg: string): Kepzettseg | undefined => {
    return kepzettsegek?.find(k => k.name.toLowerCase() === kepzettseg.toLowerCase());
}

export const folottiResz = (kepesseg?: number, hatar: number = 10) => {
    return Math.max(0, ((kepesseg === undefined || Number.isNaN(kepesseg)) ? 0 : kepesseg) - hatar);
}

export const szintlepes = (karakter: Karakter): Karakter => {
    karakter.szint++;
    const hm = karakter.kaszt.hm;
    karakter.hm += hm.szabad;
    karakter.hmHarcertek = osszead(karakter.hmHarcertek, hm.kotelezo);
    karakter.fp.max += roll(karakter.kaszt.epfp.fpPerSzint).value;
    karakter.fp.akt = karakter.fp.max;
    return karakter;
}

const calculateKepessegHarcertek = (karakter: Karakter, fegyver: Fegyver): Record<string, string | number> => {
    const mgt = calculateMGT(karakter);
    const ugy = folottiResz(karakter.kepessegek.ugy - mgt[0]);
    const gy = folottiResz(karakter.kepessegek.gy - mgt[0]);
    const erobonusz = fegyver.erobonusz ?? 16;
    return {
        ke: gy + ugy,
        te: gy + ugy + folottiResz(karakter.kepessegek.ero),
        ve: gy + ugy,
        ce: ugy,
        sebzes: erobonusz !== 0 ? folottiResz(karakter.kepessegek.ero, erobonusz) : 0
    }
}

export const calculateSebesulesHatrany = (karakter: Karakter): Harcertek | null => {
    if (karakter.ep.max > 0 && karakter.ep.akt <= karakter.ep.max * 0.25) {
        return {
            ke: -15,
            te: -20,
            ve: -25,
            ce: -30
        }
    } else if ((karakter.ep.max > 0 && karakter.ep.akt <= karakter.ep.max * 0.5) || (karakter.fp.akt > 0 && karakter.fp.akt < karakter.fp.max * 0.1)) {
        return {
            ke: -5,
            te: -10,
            ve: -10,
            ce: -5
        }
    }
    return null;
}

export const calculateMGT = (karakter: Karakter): [number, boolean?] => {
    const pancel = karakter.valasztottPancel !== undefined ? karakter.pancelok?.[karakter.valasztottPancel] : undefined;
    if (!pancel) {
        return [0]; // no pancel, no mgt
    }
    const nehezvertViselet = findKepzettseg(karakter, 'Nehézvértviselet')?.szint;
    switch (nehezvertViselet) {
        case 'Mf': return [0];
        case 'Af': return [pancel.nehez ? pancel.mgt : 0];
        default: return [pancel.mgt, pancel.nehez];
    }
}

const addKepzettseg = (ret: DobasMatrix, karakter: Karakter, fegyver: Fegyver) => {
    const tipus = FegyverUtils.tipus(fegyver);
    const fejvadasz = karakter.kaszt?.name === 'fejvadász';
    const kepzettseg: Kepzettseg | undefined = karakter.kepzettsegek?.find(k => k.name === FegyverUtils.kepzettseg(fegyver));
    const pajzsHasznalat = findKepzettseg(karakter, 'Pajzshasználat');

    const mgt = calculateMGT(karakter);
    if (mgt[1]) {
        ret.add('Nehézvért', { ...FEGYVER_KEPZETTSEG['képzetlen'] });
    } else if (!kepzettseg) {
        if (tipus && !(tipus === 'pajzs' && pajzsHasznalat?.szint)) {
            if (!fejvadasz) {
                ret.add('képzetlen', { ...FEGYVER_KEPZETTSEG['képzetlen'] });
            } else {
                ret.add('képzetlen', { ...FEGYVER_KEPZETTSEG['képzetlen, fejvadász'] });
            }
        }
    } else if (tipus !== 'ököl') { // ökölharcnál nincs bónusz
        ret.add('Képzettség ' + kepzettseg.szint, { ...FEGYVER_KEPZETTSEG[kepzettseg.szint] });
    }
}

const addKetkezes = (ret: DobasMatrix, karakter: Karakter, masodlagos?: boolean) => {
    if (karakter.valasztottFegyver === undefined || karakter.masodlagosFegyver === undefined) {
        return;
    }
    const pajzsHasznalat = findKepzettseg(karakter, 'Pajzshasználat');
    const ketkezesHarc = findKepzettseg(karakter, 'Kétkezes harc');
    const masodlagosFegyver = karakter.fegyverek[karakter.masodlagosFegyver];
    if (masodlagosFegyver?.pajzs && pajzsHasznalat) {
        if (!masodlagos) {
            ret.add('Pajzs', { ve: masodlagosFegyver.harcertek.ve });
        }
    } else {
        switch (ketkezesHarc?.szint) {
            case 'Mf': return;
            case 'Af': {
                if (masodlagos) {
                    ret.add('kétkezes harc', { ke: -2, te: -5, ve: -5 });
                }
                return;
            }
            default: {
                if (masodlagos) {
                    ret.add('kétkezes harc', { ...FEGYVER_KEPZETTSEG['képzetlen'] });
                } else {
                    ret.add('kétkezes harc', { ke: -5, te: -10, ve: -10 });
                }
                return;
            }
        }
    }
}

const findFegyver = (karakter: Karakter, masodlagos?: boolean): Fegyver => {
    const index = masodlagos ? karakter.masodlagosFegyver : karakter.valasztottFegyver;
    if (index === undefined) {
        return FEGYVERTELEN;
    }
    return karakter.fegyverek[index] ?? FEGYVERTELEN;
}

export const calculateHarcertek = (karakter: Karakter, szituaciok?: Array<Harcertek & { name: string }>, masodlagos?: boolean): DobasMatrix => {
    const fegyver = findFegyver(karakter, masodlagos);
    const tipus = FegyverUtils.tipus(fegyver);
    const ret: DobasMatrix = new DobasMatrix(!tipus ? ['ke', 'te', 've', 'ce', 'sebzes'] : (tipus === 'lofegyver' ? ['ke', 'ce', 've', 'sebzes'] : ['ke', 'te', 've', 'sebzes']));

    ret.add('alap', karakter.alapHarcertek as unknown as Record<string, number>);

    const fejvadasz = karakter.kaszt?.name === 'fejvadász';
    if (fejvadasz && karakter.szint) {
        ret.add('spec', { ke: Math.floor(karakter.szint / 2), sebzes: Math.floor(karakter.szint / 2) });
    }

    ret.add('hm', karakter.hmHarcertek as unknown as Record<string, number>)

    if (tipus) {
        ret.add(fegyver.name, { ...fegyver.harcertek, 'sebzes': fegyver.sebzes });
    }

    ret.add('kepessegek', calculateKepessegHarcertek(karakter, fegyver));

    addKepzettseg(ret, karakter, fegyver);

    addKetkezes(ret, karakter, masodlagos);

    const sebesules = calculateSebesulesHatrany(karakter);
    if (sebesules) {
        ret.add('Sebesülés', { ...sebesules });
    }

    szituaciok?.forEach(sz => ret.add(sz.name, { ...sz }));

    return ret;
}