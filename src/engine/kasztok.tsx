import { Harcertek } from "./harc";
import { DiceRollResult } from "./roll"

export interface KepessegDobas {
    ero: string;
    gy: string;
    ugy: string;
    ak: string;
    egs: string;
    sz: string;
    int: string;
    ae: string;
    asz: string;
    erz: string;
}

export type KepessegDobasResult = Record<keyof KepessegDobas, DiceRollResult>;

export const KEPESSEG_NEV: Record<keyof KepessegDobas, string> = {
    ero: 'Erő',
    gy: 'Gyorsaság',
    ugy: 'Ügyesség',
    ak: 'Állóképesség',
    egs: 'Egészség',
    sz: 'Szépség',
    int: 'Intelligencia',
    ae: 'Akaraterő',
    asz: 'Asztrál',
    erz: 'Érzékelés'
}

export const FAJ_KEPESSEG: Record<string, KepessegDobas> = {
    "ember": {
        ero: '0',
        gy: '0',
        ugy: '0',
        ak: '0',
        egs: '0',
        sz: '0',
        int: '0',
        ae: '0',
        asz: '0',
        erz: '0'
    },
    "elf": {
        ero: '-2',
        gy: '1',
        ugy: '1',
        ak: '-1',
        egs: '0',
        sz: '1',
        int: '0',
        ae: '0',
        asz: '0',
        erz: '2'
    },
    "félelf": {
        ero: '-1',
        gy: '1',
        ugy: 'ö',
        ak: '0',
        egs: '0',
        sz: '0',
        int: '0',
        ae: '0',
        asz: '0',
        erz: '1'
    },
    "törp": {
        ero: '1',
        gy: '1',
        ugy: 'ö',
        ak: '1',
        egs: '1',
        sz: '-2',
        int: '-1',
        ae: '0',
        asz: '-1',
        erz: '0'
    },
    "udvari ork": {
        ero: '2',
        gy: '0',
        ugy: 'ö',
        ak: '1',
        egs: '2',
        sz: '-3',
        int: '1',
        ae: '0',
        asz: '-3',
        erz: '1'
    }
}

export const FOKASZTOK: Record<string, Array<string>> = {
    'harcos': ['harcos', 'gladiátor', 'fejvadász', 'lovag'],
    'szerencsevadász': ['tolvaj', 'bárd'],
    'pap': ['pap', 'paplovag'],
    'harcművész': ['harcművész', 'kardművész'],
    'varázsló': ['boszorkánymester', 'tűzvarázsló', 'varázsló']
};

export const KASZTOK: Record<string, Kaszt> = {
    harcos: {
        kepesseg: {
            ero: 'k6 + 12 + kf',
            gy: '2k6 + 6 + kf',
            ugy: '2k6 + 6 + kf',
            ak: 'k10 + 8 + kf',
            egs: 'k10+10',
            sz: '3k6(2x)',
            int: '3k6(2x)',
            ae: '2k6+6',
            asz: '3k6(2x)',
            erz: '2k6+6'
        },
        alapHarcertek: {
            ke: 9,
            te: 20,
            ve: 75,
            ce: 0
        },
        hm: {
            kotelezo: {
                ke: 0,
                te: 3,
                ve: 3,
                ce: 0
            },
            szabad: 5
        },
        epfp: {
            ep: 7,
            fp: 6,
            fpPerSzint: 'k6+4'
        }
    },
    lovag: {
        kepesseg: {
            ero: 'k6 + 12 + kf',
            gy: '3k6(2x)',
            ugy: '3k6(2x)',
            ak: 'k10 + 8 + kf',
            egs: 'k10+10',
            sz: '2k6+6+kf',
            int: '2k6+6',
            ae: 'k10+8',
            asz: '3k6(2x)',
            erz: '2k6+6'
        },
        alapHarcertek: {
            ke: 5,
            te: 20,
            ve: 75,
            ce: 0
        },
        hm: {
            kotelezo: {
                ke: 0,
                te: 5,
                ve: 5,
                ce: 0
            },
            szabad: 2
        },
        epfp: {
            ep: 7,
            fp: 6,
            fpPerSzint: 'k6+5'
        }
    },
    'gladiátor': {
        kepesseg: {
            ero: 'k6 + 12 + kf',
            gy: '2k6 + 6 + kf',
            ugy: '2k6 + 6 + kf',
            ak: 'k6 + 12 + kf',
            egs: 'k10+10',
            sz: '2k6+6',
            int: '3k6',
            ae: '3k6',
            asz: '3k6',
            erz: '2k6+6'
        },
        alapHarcertek: {
            ke: 9,
            te: 20,
            ve: 75,
            ce: 0
        },
        hm: {
            kotelezo: {
                ke: 0,
                te: 4,
                ve: 4,
                ce: 0
            },
            szabad: 4
        },
        epfp: {
            ep: 8,
            fp: 7,
            fpPerSzint: 'k6+5'
        }
    },
    'fejvadász': {
        kepesseg: {
            ero: '2k6+6',
            gy: 'k6+12+kf',
            ugy: 'k10+8',
            ak: 'k6 + 12 + kf',
            egs: 'k10+10',
            sz: '3k6',
            int: '3k6(2x)',
            ae: 'k10+8',
            asz: '2k6+6',
            erz: 'k6+12'
        },
        alapHarcertek: {
            ke: 10,
            te: 20,
            ve: 75,
            ce: 0
        },
        hm: {
            kotelezo: {
                ke: 0,
                te: 4,
                ve: 4,
                ce: 0
            },
            szabad: 3
        },
        epfp: {
            ep: 6,
            fp: 7,
            fpPerSzint: 'k6+5'
        }
    },
    tolvaj: {
        kepesseg: {
            ero: '3k6(2x)',
            gy: 'k10 + 8 + kf',
            ugy: 'k6 + 12 + kf',
            ak: '3k6(2x)',
            egs: '3k6(2x)',
            sz: '2k6 + 6',
            int: '2k6 + 6',
            ae: '3k6',
            asz: '3k6(2x)',
            erz: 'k6+12'
        },
        alapHarcertek: {
            ke: 8,
            te: 17,
            ve: 72,
            ce: 10
        },
        hm: {
            kotelezo: {
                ke: 1,
                te: 1,
                ve: 1,
                ce: 0
            },
            szabad: 4
        },
        epfp: {
            ep: 4,
            fp: 5,
            fpPerSzint: 'k6+3'
        }
    },
    'bárd': {
        kepesseg: {
            ero: 'k10+8',
            gy: 'k10+8+kf',
            ugy: 'k10 + 8',
            ak: '2k6+6',
            egs: '2k6+6',
            sz: 'k6+12+kf',
            int: 'k10+8(2x)',
            ae: '2k6+6',
            asz: 'k10+8',
            erz: 'k10+8'
        },
        alapHarcertek: {
            ke: 10,
            te: 20,
            ve: 75,
            ce: 10
        },
        hm: {
            kotelezo: {
                ke: 0,
                te: 2,
                ve: 2,
                ce: 0
            },
            szabad: 5
        },
        epfp: {
            ep: 5,
            fp: 6,
            fpPerSzint: 'k6+3'
        }
    },
    pap: {
        kepesseg: {
            ero: '2k6+6',
            gy: '3k6(2x)',
            ugy: '3k6(2x)',
            ak: '2k6+6',
            egs: 'k10+8',
            sz: 'k10+10',
            int: 'k10+8',
            ae: 'k10+8+kf',
            asz: 'k6+12',
            erz: 'k10+8'
        },
        alapHarcertek: {
            ke: 5,
            te: 17,
            ve: 72,
            ce: 0
        },
        hm: {
            kotelezo: {
                ke: 0,
                te: 3,
                ve: 3,
                ce: 0
            },
            szabad: 2
        },
        epfp: {
            ep: 6,
            fp: 6,
            fpPerSzint: 'k6+2'
        }
    },
    paplovag: {
        kepesseg: {
            ero: 'k10+8+kf',
            gy: '3k6(2x)',
            ugy: '3k6(2x)',
            ak: 'k10+8',
            egs: 'k10+10',
            sz: 'k10+8',
            int: '2k6 + 6',
            ae: 'k10+8',
            asz: 'k10+8+kf',
            erz: 'k10+8'
        },
        alapHarcertek: {
            ke: 5,
            te: 20,
            ve: 75,
            ce: 0
        },
        hm: {
            kotelezo: {
                ke: 0,
                te: 3,
                ve: 3,
                ce: 0
            },
            szabad: 3
        },
        epfp: {
            ep: 8,
            fp: 7,
            fpPerSzint: 'k6+5'
        }
    },
    'harcművész': {
        kepesseg: {
            ero: 'k10+8',
            gy: 'k6+14',
            ugy: 'k6+12',
            ak: 'k6+12',
            egs: 'k10+10',
            sz: '3k6(2x)',
            int: '3k6(2x)',
            ae: 'k6+12',
            asz: 'k10+8',
            erz: 'k6+12'
        },
        alapHarcertek: {
            ke: 10,
            te: 20,
            ve: 75,
            ce: 0
        },
        hm: {
            kotelezo: {
                ke: 0,
                te: 3,
                ve: 3,
                ce: 0
            },
            szabad: 2
        },
        epfp: {
            ep: 4,
            fp: 8,
            fpPerSzint: 'k6+5'
        }
    },
    'kardművész': {
        kepesseg: {
            ero: 'k10+8',
            gy: 'k6+12+kf',
            ugy: 'k6+14',
            ak: 'k10+8',
            egs: 'k10+8',
            sz: '3k6(2x)',
            int: '2k6 + 6',
            ae: 'k6+12',
            asz: 'k10+8',
            erz: 'k6+12'
        },
        alapHarcertek: {
            ke: 10,
            te: 20,
            ve: 75,
            ce: 0
        },
        hm: {
            kotelezo: {
                ke: 0,
                te: 3,
                ve: 3,
                ce: 0
            },
            szabad: 2
        },
        epfp: {
            ep: 4,
            fp: 8,
            fpPerSzint: 'k6+5'
        }
    },
    'boszorkánymester': {
        kepesseg: {
            ero: '3k6(2x)',
            gy: 'k10+8',
            ugy: 'k6+12+kf',
            ak: '3k6(2x)',
            egs: '2k6+6',
            sz: '3k6',
            int: '2k6 + 6',
            ae: '2k6+6',
            asz: '2k6+6',
            erz: '2k6+6'
        },
        alapHarcertek: {
            ke: 7,
            te: 17,
            ve: 72,
            ce: 5
        },
        hm: {
            kotelezo: {
                ke: 0,
                te: 1,
                ve: 1,
                ce: 0
            },
            szabad: 5
        },
        epfp: {
            ep: 3,
            fp: 4,
            fpPerSzint: 'k6+1'
        }
    },
    'tűzvarázsló': {
        kepesseg: {
            ero: '2k6+6',
            gy: '3k6(2x)',
            ugy: '3k6(2x)',
            ak: '2k6+6',
            egs: '2k6+6',
            sz: '3k6',
            int: '2k6 + 6',
            ae: '2k6+6',
            asz: '2k6+6',
            erz: '2k6+6'
        },
        alapHarcertek: {
            ke: 6,
            te: 17,
            ve: 72,
            ce: 0
        },
        hm: {
            kotelezo: {
                ke: 0,
                te: 3,
                ve: 3,
                ce: 0
            },
            szabad: 2
        },
        epfp: {
            ep: 5,
            fp: 4,
            fpPerSzint: 'k6+1'
        }
    },
    'varázsló': {
        kepesseg: {
            ero: '3k6',
            gy: '3k6(2x)',
            ugy: '3k6(2x)',
            ak: '3k6',
            egs: '3k6(2x)',
            sz: '3k6',
            int: 'k6+12+kf',
            ae: 'k6+12+kf',
            asz: 'k6+12+kf',
            erz: '2k6+6'
        },
        alapHarcertek: {
            ke: 2,
            te: 15,
            ve: 70,
            ce: 0
        },
        hm: {
            kotelezo: {
                ke: 0,
                te: 1,
                ve: 1,
                ce: 0
            },
            szabad: 2
        },
        epfp: {
            ep: 3,
            fp: 2,
            fpPerSzint: 'k6'
        }
    },
}

export interface Kaszt {
    kepesseg: KepessegDobas,
    alapHarcertek: Harcertek,
    hm: { kotelezo: Harcertek, szabad: number },
    epfp: { ep: number, fp: number, fpPerSzint: string }
}

export function osszead<T>(r1: Record<keyof T, number>, r2: Record<keyof T, number>): Record<keyof T, number> {
    const keys = [...new Set([...Object.keys(r1), ...Object.keys(r2)])];
    return keys.reduce((acc, curr) => { acc[curr as keyof T] = r1[curr as keyof T] + r2[curr as keyof T]; return acc; }, {} as Record<keyof T, number>)
}