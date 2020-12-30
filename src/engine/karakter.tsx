import { DobasMatrix } from "./dobasmatrix";
import { FEGYVERTELEN, FEGYVER_KEPZETTSEG, Harcertek } from "./harc";
import { Kaszt, osszead } from "./kasztok";
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
    kepzettsegek: Array<Kepzettseg>;
    alapHarcertek: Harcertek;
    hmHarcertek: Harcertek;
    hm: number;
    fegyverek: Array<Fegyver>;
    valasztottFegyver?: number;
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

const calculateKepessegHarcertek = (karakter: { kepessegek: KarakterKepesseg }, fegyver: Fegyver): Record<string, string | number> => {
    return {
        ke: folottiResz(karakter.kepessegek.gy) + folottiResz(karakter.kepessegek.ugy),
        te: folottiResz(karakter.kepessegek.gy) + folottiResz(karakter.kepessegek.ugy) + folottiResz(karakter.kepessegek.ero),
        ve: folottiResz(karakter.kepessegek.gy) + folottiResz(karakter.kepessegek.ugy),
        ce: folottiResz(karakter.kepessegek.ugy),
        sebzes: folottiResz(karakter.kepessegek.ero, 16)
    }
}

const calculateSebesulesHatrany = (karakter: HasEPFP): Harcertek | null => {
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

export const calculateHarcertek = (karakter: { alapHarcertek: Harcertek, hmHarcertek: Harcertek, kepzettsegek?: Array<Kepzettseg>, kepessegek: KarakterKepesseg } & HasEPFP, fegyver: Fegyver, szituaciok?: Array<Harcertek & { name: string }>): DobasMatrix => {
    const fegyvertelen = fegyver.name === FEGYVERTELEN.name;
    const okol = fegyver.name === 'Puszta kéz';
    const lofegyver: boolean = fegyver.harcertek.ce > 0;
    const kepzettseg: Kepzettseg | undefined = karakter.kepzettsegek?.find(k => okol ? (k.name === 'Ökölharc') : (k.name === 'Fegyverhasználat - ' + fegyver.name.toLowerCase()));
    const ret: DobasMatrix = new DobasMatrix(fegyvertelen ? ['ke', 'te', 've', 'ce', 'sebzes'] : (lofegyver ? ['ke', 'ce', 've', 'sebzes'] : ['ke', 'te', 've', 'sebzes']));
    ret.add('alap', karakter.alapHarcertek as unknown as Record<string, number>);
    ret.add('hm', karakter.hmHarcertek as unknown as Record<string, number>)
    if (!fegyvertelen) {
        ret.add(fegyver.name, { ...fegyver.harcertek, 'sebzes': fegyver.sebzes });
    }
    ret.add('kepessegek', calculateKepessegHarcertek(karakter, fegyver));
    if (!kepzettseg) {
        if (!fegyvertelen) {
            ret.add('képzetlen', { ...FEGYVER_KEPZETTSEG['képzetlen'] });
        }
    } else if (!okol) {
        ret.add('Képzettség ' + kepzettseg.szint, { ...FEGYVER_KEPZETTSEG[kepzettseg.szint] });
    }

    const sebesules = calculateSebesulesHatrany(karakter);
    if (sebesules) {
        ret.add('Sebesülés', { ...sebesules });
    }
    szituaciok?.forEach(sz => ret.add(sz.name, { ...sz }));
    return ret;
}