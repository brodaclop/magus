
export type MeregHatas = 'semmi' | 'bénulás' | 'görcs' | 'halál' | 'gyengeség' | 'kábulat' | 'ájulás' | 'rosszullét' | 'émelygés' | 'bódulat' | { sebzes: string };

type Hatoido = 'azonnali' | 'gyors' | 'lassú' | 'nagyon lassú';

type Idotartam = 'egyszeri' | 'rövid' | 'közepes' | 'hosszú' | 'maradandó';

export interface Mereg {
    name: string;
    erosseg: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    bevitel: 'fegyver' | 'étel' | 'itel' | 'gáz' | 'kontakt';
    tipus: 'emésztő' | 'ideg' | 'izom' | 'keringés';
    hatoido: Hatoido;
    idotartam: Idotartam;
    hatas: MeregHatas;
    masodlagosHatas: MeregHatas;
    ar: string;
    leiras: string;
};

export const MEREG_HATOIDOK: Record<Hatoido, string> = {
    'azonnali': '1k10 szegmens',
    'gyors': '1k6 kör',
    'lassú': '2k6 óra',
    'nagyon lassú': '1k6 nap'
};

export const MEREG_IDOTARTAM: Record<Idotartam, string> = {
    'egyszeri': '1 kör',
    'rövid': '1k6-szor 10 perc',
    'közepes': '1k6 óra',
    'hosszú': '1k6 nap',
    'maradandó': 'végleges'
}

export const MERGEK: Array<Mereg> = [
    {
        name: 'Lovagi torma',
        erosseg: 5,
        bevitel: 'fegyver',
        tipus: 'ideg',
        hatoido: 'azonnali',
        idotartam: 'egyszeri',
        hatas: { sebzes: '3k6' },
        masodlagosHatas: { sebzes: '1k6' },
        ar: '1a',
        leiras: 'Gro-ugoni eredetű fegyverméreg, sárgásfehér kenőcs, herbalizmussal féláron beszerezhetők az alapanyagok. Az összetevők önmagukban elég olcsók, de sok kell belőle, mert a reakció nagyon sokszor félresikerül.'
    },
    {
        name: 'Az az izé, amit a kobrák használtak',
        erosseg: 3,
        bevitel: 'fegyver',
        tipus: 'izom',
        hatoido: 'azonnali',
        idotartam: 'közepes',
        hatas: 'gyengeség',
        masodlagosHatas: 'semmi',
        ar: '???',
        leiras: '???'
    },
    {
        name: 'Kobramarás',
        erosseg: 5,
        bevitel: 'fegyver',
        tipus: 'izom',
        hatoido: 'azonnali',
        idotartam: 'hosszú',
        hatas: 'halál',
        masodlagosHatas: 'görcs',
        ar: '12a',
        leiras: 'Kobraméregből készítik és leginkább Délen kapható.'
    },
]

