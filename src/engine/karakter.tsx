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

export interface Karakter extends KarakterInfo, HasEPFP {
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
    pszi?: {
        max: number;
        akt: number;
    },
    mp?: {
        max: number;
        akt: number;
    },
}

export interface HasEPFP {
    maxFp: number;
    maxEp: number;
    fp: number;
    ep: number;
}

export interface Fegyver {
    name: string;
    harcertek: Harcertek;
    sebzes: string;
    tamPerKor: number;
    lassu?: boolean;
    lotav?: number;
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
    karakter.maxFp += roll(karakter.kaszt.epfp.fpPerSzint).value;
    karakter.fp = karakter.maxFp;
    return karakter;
}

const calculateKepessegHarcertek = (karakter: Pick<Karakter, 'kepessegek' | 'kepzettsegek' | 'pancelok' | 'valasztottPancel'>, fegyver: Fegyver): Record<string, string | number> => {
    const mgt = calculateMGT(karakter);
    const ugy = folottiResz(karakter.kepessegek.ugy - mgt[0]);
    const gy = folottiResz(karakter.kepessegek.gy - mgt[0]);
    return {
        ke: gy + ugy,
        te: gy + ugy + folottiResz(karakter.kepessegek.ero),
        ve: gy + ugy,
        ce: ugy,
        sebzes: folottiResz(karakter.kepessegek.ero, 16)
    }
}

export const calculateSebesulesHatrany = (karakter: HasEPFP): Harcertek | null => {
    if (karakter.maxEp > 0 && karakter.ep <= karakter.maxEp * 0.25) {
        return {
            ke: -15,
            te: -20,
            ve: -25,
            ce: -30
        }
    } else if ((karakter.maxEp > 0 && karakter.ep <= karakter.maxEp * 0.5) || (karakter.maxFp > 0 && karakter.fp < karakter.maxFp * 0.1)) {
        return {
            ke: -5,
            te: -10,
            ve: -10,
            ce: -5
        }
    }
    return null;
}

export const calculateMGT = ({ kepzettsegek, pancelok, valasztottPancel }: Pick<Karakter, 'kepessegek' | 'kepzettsegek' | 'pancelok' | 'valasztottPancel'>): [number, boolean?] => {
    const pancel = valasztottPancel !== undefined ? pancelok?.[valasztottPancel] : undefined;
    if (!pancel) {
        return [0]; // no pancel, no mgt
    }
    const nehezvertViselet = kepzettsegek?.find(k => k.name === 'Nehézvértviselet')?.szint;
    switch (nehezvertViselet) {
        case 'Mf': return [0];
        case 'Af': return [pancel.nehez ? pancel.mgt : 0];
        default: return [pancel.mgt, pancel.nehez];
    }
}

const addKepzettseg = (ret: DobasMatrix, karakter: Pick<Karakter, 'kepessegek' | 'kepzettsegek' | 'kaszt' | 'pancelok' | 'valasztottPancel'>, fegyver: Fegyver) => {
    const tipus = FegyverUtils.tipus(fegyver);
    const fejvadasz = karakter.kaszt?.name === 'fejvadász';
    const kepzettseg: Kepzettseg | undefined = karakter.kepzettsegek?.find(k => k.name === FegyverUtils.kepzettseg(fegyver));
    const mgt = calculateMGT(karakter);
    if (mgt[1]) {
        ret.add('Nehézvért', { ...FEGYVER_KEPZETTSEG['képzetlen'] });
    } else if (!kepzettseg) {
        if (tipus) {
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

export const calculateHarcertek = (karakter: Pick<Karakter, 'kepessegek' | 'kepzettsegek' | 'szint' | 'alapHarcertek' | 'kaszt' | 'hmHarcertek' | 'pancelok' | 'valasztottPancel'> & HasEPFP, fegyver: Fegyver, szituaciok?: Array<Harcertek & { name: string }>): DobasMatrix => {
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

    const sebesules = calculateSebesulesHatrany(karakter);
    if (sebesules) {
        ret.add('Sebesülés', { ...sebesules });
    }

    szituaciok?.forEach(sz => ret.add(sz.name, { ...sz }));

    return ret;
}