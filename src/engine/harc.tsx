//todo: ugras

import { Fegyver } from "./karakter";

export interface Harcertek {
    ke: number;
    te: number;
    ve: number;
    ce: number;
}

export const HARCERTEK_DISPLAY_NAMES = { 'ke': 'KÉ', 'te': 'TÉ', 've': 'VÉ', 'ce': 'CÉ', 'sebzes': 'Sebzés' };

export const FEGYVER_KEPZETTSEG: Record<string, Harcertek> = {
    "képzetlen": {
        ke: -10,
        te: -25,
        ve: -20,
        ce: -30
    },
    "képzetlen, fejvadász": {
        ke: -5,
        te: -5,
        ve: -10,
        ce: -15
    },
    "Af": {
        ke: 0,
        te: 0,
        ve: 0,
        ce: 0
    },
    "Mf": {
        ke: 5,
        te: 10,
        ve: 10,
        ce: 10
    }
}

export const FEGYVERTELEN: Fegyver = {
    name: 'fegyver nélkül',
    harcertek: {
        ke: 0,
        te: 0,
        ve: 0,
        ce: 0,
    },
    tamPerKor: 0,
    sebzes: '0'
};


export const PUSZTA_KEZ_AF: Fegyver = {
    name: 'Ököl',
    harcertek: {
        ke: 4,
        te: 1,
        ve: 10,
        ce: 0,
    },
    tamPerKor: 2,
    sebzes: '1k2'
}

export const PUSZTA_KEZ_MF: Fegyver = {
    name: 'Ököl',
    harcertek: {
        ke: 4,
        te: 1,
        ve: 10,
        ce: 0,
    },
    tamPerKor: 2,
    sebzes: '1k6'
}

export const FEGYVEREK: Array<Fegyver> = [
    {
        name: 'Tőr',
        harcertek: {
            ke: 10,
            te: 8,
            ve: 2,
            ce: 0,
        },
        sebzes: '1k6',
        tamPerKor: 2
    },
    {
        name: 'Tőr, dobó',
        harcertek: {
            ke: 10,
            te: 11,
            ve: 2,
            ce: 0,
        },
        sebzes: '1k6',
        tamPerKor: 2
    },
    {
        name: 'Tüskés buzogány',
        harcertek: {
            ke: 7,
            te: 12,
            ve: 13,
            ce: 0,
        },
        sebzes: '1k6+2',
        tamPerKor: 1
    },
    {
        name: 'Hajítóbárd',
        harcertek: {
            ke: 9,
            te: 10,
            ve: 4,
            ce: 0,
        },
        sebzes: '1k6',
        tamPerKor: 2
    },
    {
        name: 'Dobóháló',
        harcertek: {
            ke: 1,
            te: 8,
            ve: 4,
            ce: 0,
        },
        sebzes: '0',
        tamPerKor: 3,
        lassu: true
    },
    {
        name: 'Buzogány, shadleki',
        harcertek: {
            ke: 8,
            te: 13,
            ve: 14,
            ce: 0,
        },
        sebzes: '1k6+1',
        tamPerKor: 1
    },
    {
        name: 'Csatabárd, egykezes',
        harcertek: {
            ke: 5,
            te: 12,
            ve: 11,
            ce: 0,
        },
        sebzes: '1k10',
        tamPerKor: 1
    },
    {
        name: 'Csatabárd, kétkezes',
        harcertek: {
            ke: 0,
            te: 8,
            ve: 6,
            ce: 0,
        },
        sebzes: '3k6',
        tamPerKor: 2,
        lassu: true
    },
    {
        name: 'Csatacsákány',
        harcertek: {
            ke: 5,
            te: 11,
            ve: 8,
            ce: 0,
        },
        sebzes: '1k10',
        tamPerKor: 1
    },
    {
        name: 'Kard, rövid',
        harcertek: {
            ke: 9,
            te: 12,
            ve: 14,
            ce: 0,
        },
        sebzes: '1k6+1',
        tamPerKor: 1
    },
    {
        name: 'Kard, hosszú',
        harcertek: {
            ke: 6,
            te: 14,
            ve: 16,
            ce: 0,
        },
        sebzes: '1k10',
        tamPerKor: 1
    },
    {
        name: 'Kard, másfélkezes',
        harcertek: {
            ke: 4,
            te: 13,
            ve: 12,
            ce: 0,
        },
        sebzes: '2k6',
        tamPerKor: 1
    },
    {
        name: 'Kard, lovagi',
        harcertek: {
            ke: 2,
            te: 10,
            ve: 7,
            ce: 0,
        },
        sebzes: '2k6+2',
        tamPerKor: 1
    },
    {
        name: 'Kard, pallos',
        harcertek: {
            ke: 0,
            te: 6,
            ve: 2,
            ce: 0,
        },
        sebzes: '3k6+2',
        tamPerKor: 2,
        lassu: true
    },
    {
        name: 'Kard, szablya',
        harcertek: {
            ke: 7,
            te: 15,
            ve: 17,
            ce: 0,
        },
        sebzes: '1k6+2',
        tamPerKor: 1,
    },
    {
        name: 'Kard, dzsenn szablya',
        harcertek: {
            ke: 9,
            te: 20,
            ve: 17,
            ce: 0,
        },
        sebzes: '1k6+3',
        tamPerKor: 1,
    },
    {
        name: 'Kard, jatagán',
        harcertek: {
            ke: 7,
            te: 14,
            ve: 14,
            ce: 0,
        },
        sebzes: '1k6+2',
        tamPerKor: 1,
    },
    {
        name: 'Kard, handzsár',
        harcertek: {
            ke: 6,
            te: 14,
            ve: 15,
            ce: 0,
        },
        sebzes: '1k6+3',
        tamPerKor: 1,
    },
    {
        name: 'Kard, fejvadász',
        harcertek: {
            ke: 8,
            te: 16,
            ve: 16,
            ce: 0,
        },
        sebzes: '1k6+2',
        tamPerKor: 1,
    },
    {
        name: 'Kard, Slan',
        harcertek: {
            ke: 8,
            te: 20,
            ve: 12,
            ce: 0,
        },
        sebzes: '1k10+2',
        tamPerKor: 1,
    },
    {
        name: 'Kard, kígyó',
        harcertek: {
            ke: 6,
            te: 14,
            ve: 15,
            ce: 0,
        },
        sebzes: '1k10',
        tamPerKor: 1,
    },
    {
        name: 'Kés',
        harcertek: {
            ke: 10,
            te: 4,
            ve: 0,
            ce: 0,
        },
        sebzes: '1k5',
        tamPerKor: 1,
    },
    {
        name: 'Mara-sequor',
        harcertek: {
            ke: 7,
            te: 16,
            ve: 14,
            ce: 0,
        },
        sebzes: '2k6+2',
        tamPerKor: 1,
    },
    {
        name: 'Ramiera',
        harcertek: {
            ke: 8,
            te: 17,
            ve: 14,
            ce: 0,
        },
        sebzes: '1k6+1',
        tamPerKor: 1,
    },
    {
        name: 'Sequor',
        harcertek: {
            ke: 8,
            te: 16,
            ve: 13,
            ce: 0,
        },
        sebzes: '1k6+2',
        tamPerKor: 2,
    },
    {
        name: 'Slan csillag',
        harcertek: {
            ke: 10,
            te: 4,
            ve: 0,
            ce: 0,
        },
        sebzes: '1k3',
        tamPerKor: 3,
    },
    {
        name: 'Tőr, Slan',
        harcertek: {
            ke: 9,
            te: 14,
            ve: 6,
            ce: 0,
        },
        sebzes: '1k6+2',
        tamPerKor: 2,
    },
    {
        name: 'Tőrkard',
        harcertek: {
            ke: 9,
            te: 12,
            ve: 14,
            ce: 0,
        },
        sebzes: '1k6+2',
        tamPerKor: 2,
    },
    {
        name: 'Bot, hosszú',
        harcertek: {
            ke: 4,
            te: 10,
            ve: 16,
            ce: 0,
        },
        sebzes: '1k5',
        tamPerKor: 1,
    },
    {
        name: 'Bot, rövid',
        harcertek: {
            ke: 9,
            te: 9,
            ve: 17,
            ce: 0,
        },
        sebzes: '1k3',
        tamPerKor: 1,
    },
    {
        name: 'Bot, furkós',
        harcertek: {
            ke: 2,
            te: 7,
            ve: 14,
            ce: 0,
        },
        sebzes: '1k6',
        tamPerKor: 1,
    },
    {
        name: 'Buzogány, egykezes',
        harcertek: {
            ke: 7,
            te: 11,
            ve: 12,
            ce: 0,
        },
        sebzes: '1k6',
        tamPerKor: 1,
    },
    {
        name: 'Buzogány, kétkezes',
        harcertek: {
            ke: 0,
            te: 7,
            ve: 6,
            ce: 0,
        },
        sebzes: '3k6',
        tamPerKor: 2,
        lassu: true
    },
    {
        name: 'Buzogány, tüskés',
        harcertek: {
            ke: 7,
            te: 12,
            ve: 13,
            ce: 0,
        },
        sebzes: '1k6+2',
        tamPerKor: 1,
    },
    {
        name: 'Buzogány, tollas',
        harcertek: {
            ke: 7,
            te: 12,
            ve: 13,
            ce: 0,
        },
        sebzes: '1k6+1',
        tamPerKor: 1,
    },
    {
        name: 'Buzogány, láncos',
        harcertek: {
            ke: 4,
            te: 13,
            ve: 11,
            ce: 0,
        },
        sebzes: '1k6+3',
        tamPerKor: 1,
    },
    {
        name: 'Cséphadaró',
        harcertek: {
            ke: 1,
            te: 6,
            ve: 5,
            ce: 0,
        },
        sebzes: '1k6+1',
        tamPerKor: 1,
    },
    {
        name: 'Harcikalapács',
        harcertek: {
            ke: 5,
            te: 8,
            ve: 10,
            ce: 0,
        },
        sebzes: '1k6+2',
        tamPerKor: 1,
    },
    {
        name: 'Alabárd',
        harcertek: {
            ke: 1,
            te: 14,
            ve: 15,
            ce: 0,
        },
        sebzes: '2k6+2',
        tamPerKor: 2,
        lassu: true
    },
    {
        name: 'Dárda',
        harcertek: {
            ke: 8,
            te: 13,
            ve: 5,
            ce: 0,
        },
        sebzes: '1k6+1',
        tamPerKor: 1,
    },
    {
        name: 'Kopja, könnyű',
        harcertek: {
            ke: 2,
            te: 11,
            ve: 12,
            ce: 0,
        },
        sebzes: '1k10',
        tamPerKor: 1,
    },
    {
        name: 'Kopja, lovas',
        harcertek: {
            ke: 1,
            te: 15,
            ve: 0,
            ce: 0,
        },
        sebzes: '1k6',
        tamPerKor: 2,
        lassu: true
    },
    {
        name: 'Kopja, nehézlovas',
        harcertek: {
            ke: 0,
            te: 16,
            ve: 0,
            ce: 0,
        },
        sebzes: '2k10',
        tamPerKor: 3,
        lassu: true
    },
    {
        name: 'Lándzsa',
        harcertek: {
            ke: 4,
            te: 12,
            ve: 12,
            ce: 0,
        },
        sebzes: '1k10',
        tamPerKor: 1,
    },
    {
        name: 'Szigony',
        harcertek: {
            ke: 4,
            te: 15,
            ve: 10,
            ce: 0,
        },
        sebzes: '1k10+1',
        tamPerKor: 1,
    },
    {
        name: 'Fúvócső',
        harcertek: {
            ke: 8,
            te: 0,
            ve: 0,
            ce: 7,
        },
        lotav: 30,
        sebzes: '0',
        tamPerKor: 3,
    },
    {
        name: 'Íj, rövid',
        harcertek: {
            ke: 5,
            te: 0,
            ve: 0,
            ce: 4,
        },
        lotav: 90,
        sebzes: '1k6',
        tamPerKor: 2,
    },
    {
        name: 'Íj, hosszú',
        harcertek: {
            ke: 4,
            te: 0,
            ve: 0,
            ce: 6,
        },
        lotav: 110,
        sebzes: '1k6+1',
        tamPerKor: 2,
    },
    {
        name: 'Íj, visszacsapó',
        harcertek: {
            ke: 3,
            te: 0,
            ve: 0,
            ce: 8,
        },
        lotav: 180,
        sebzes: '1k10',
        tamPerKor: 2,
    },
    {
        name: 'Íj, elf',
        harcertek: {
            ke: 6,
            te: 0,
            ve: 0,
            ce: 10,
        },
        lotav: 120,
        sebzes: '2k6',
        tamPerKor: 2,
    },
    {
        name: 'Nyílpuska, aquir',
        harcertek: {
            ke: 5,
            te: 0,
            ve: 0,
            ce: 18,
        },
        lotav: 35,
        sebzes: '1k10/2',
        tamPerKor: 2,
    },
    {
        name: 'Nyílpuska, kézi',
        harcertek: {
            ke: 3,
            te: 0,
            ve: 0,
            ce: 14,
        },
        lotav: 30,
        sebzes: '1k6/2',
        tamPerKor: 2,
    },
    {
        name: 'Nyílpuska, kahrei',
        harcertek: {
            ke: 9,
            te: 0,
            ve: 0,
            ce: 13,
        },
        lotav: 30,
        sebzes: '1k6/2',
        tamPerKor: 3,
    },
    {
        name: 'Nyílpuska, könnyű',
        harcertek: {
            ke: 2,
            te: 0,
            ve: 0,
            ce: 16,
        },
        lotav: 50,
        sebzes: '1k6+1',
        tamPerKor: 1,
    },
    {
        name: 'Nyílpuska, nehéz',
        harcertek: {
            ke: 0,
            te: 0,
            ve: 0,
            ce: 15,
        },
        lotav: 60,
        sebzes: '1k6+1',
        tamPerKor: 3,
        lassu: true
    },
    {
        name: 'Nyílpuska, shadoni páncéltörő',
        harcertek: {
            ke: 0,
            te: 0,
            ve: 0,
            ce: 17,
        },
        lotav: 80,
        sebzes: '2k10',
        tamPerKor: 5,
        lassu: true
    },
    {
        name: 'Parittya',
        harcertek: {
            ke: 2,
            te: 0,
            ve: 0,
            ce: 1,
        },
        lotav: 100,
        sebzes: '1k10/2',
        tamPerKor: 2,
    },
    {
        name: 'Bola',
        harcertek: {
            ke: 2,
            te: 10,
            ve: 2,
            ce: 0,
        },
        sebzes: '1k5',
        tamPerKor: 1,
    },
    {
        name: 'Dobóháló',
        harcertek: {
            ke: 1,
            te: 8,
            ve: 4,
            ce: 0,
        },
        sebzes: '0',
        tamPerKor: 3,
        lassu: true
    },
    {
        name: 'Garott',
        harcertek: {
            ke: 0,
            te: 5,
            ve: -20,
            ce: 0,
        },
        sebzes: '1k10',
        tamPerKor: 1,
    },
    {
        name: 'Hárítótőr',
        harcertek: {
            ke: 8,
            te: 4,
            ve: 19,
            ce: 0,
        },
        sebzes: '1k6',
        tamPerKor: 2,
    },
    {
        name: 'Korbács',
        harcertek: {
            ke: 4,
            te: 0,
            ve: 6,
            ce: 0,
        },
        sebzes: '1k3',
        tamPerKor: 2,
    },
    {
        name: 'Lasszó',
        harcertek: {
            ke: 0,
            te: 1,
            ve: 0,
            ce: 0,
        },
        sebzes: '0',
        tamPerKor: 3,
        lassu: true
    },
    {
        name: 'Ostor',
        harcertek: {
            ke: 3,
            te: 6,
            ve: 0,
            ce: 0,
        },
        sebzes: '1k2',
        tamPerKor: 2,
    },
    {
        name: 'Vasököl',
        harcertek: {
            ke: 9,
            te: 2,
            ve: 5,
            ce: 0,
        },
        sebzes: '1k3',
        tamPerKor: 2,
    },
    {
        name: 'Dzsambia',
        harcertek: {
            ke: 10,
            te: 8,
            ve: 4,
            ce: 0,
        },
        sebzes: '1k6',
        tamPerKor: 2,
    },
    {
        name: 'Mesterkard',
        harcertek: {
            ke: 7,
            te: 16,
            ve: 14,
            ce: 0,
        },
        sebzes: '1k10',
        tamPerKor: 1,
    },
    {
        name: 'Predoci egyeneskard',
        harcertek: {
            ke: 7,
            te: 16,
            ve: 15,
            ce: 0,
        },
        sebzes: '1k10',
        tamPerKor: 1,
    },
    {
        name: 'Tahdzsi',
        harcertek: {
            ke: 9,
            te: 11,
            ve: 14,
            ce: 0,
        },
        sebzes: '1k6+1',
        tamPerKor: 1,
    },
    {
        name: 'Béltépő',
        harcertek: {
            ke: 10,
            te: 8,
            ve: 2,
            ce: 0,
        },
        sebzes: '1k6+2',
        tamPerKor: 2,
    },
    {
        name: 'Lagoss',
        harcertek: {
            ke: 8,
            te: 14,
            ve: 14,
            ce: 0,
        },
        sebzes: '1k6+4',
        tamPerKor: 2,
    },
    {
        name: 'Pugoss',
        harcertek: {
            ke: 12,
            te: 6,
            ve: 4,
            ce: 0,
        },
        sebzes: '1k6',
        tamPerKor: 2,
    },
];

export const SZITUACIOK: Record<string, Harcertek> = {
    'hátulról': {
        ke: 5,
        te: 10,
        ve: 0,
        ce: 0
    },
    'félhátulról': {
        ke: 2,
        te: 5,
        ve: 0,
        ce: 0
    },
    'magasabbról': {
        ke: 2,
        te: 5,
        ve: 0,
        ce: 5
    },
    'alacsonyabbról': {
        ke: -2,
        te: -10,
        ve: 0,
        ce: -5
    },
    'meglepetésből': {
        ke: 100,
        te: 30,
        ve: 0,
        ce: 10
    },
    'mozgó lóról': {
        ke: 5,
        te: 10,
        ve: 20,
        ce: -20
    },
    'vakon': {
        ke: -20,
        te: -60,
        ve: -70,
        ce: -150
    },
    'félhomályban': {
        ke: -10,
        te: -30,
        ve: -35,
        ce: -70
    },
    'helyhez kötve': {
        ke: -20,
        te: -15,
        ve: -5,
        ce: 0
    },
    'kábultan': {
        ke: -15,
        te: -20,
        ve: -25,
        ce: -30
    },
    'bénultan': {
        ke: -30,
        te: -40,
        ve: -35,
        ce: -15
    },
    'félelemmel': {
        ke: -10,
        te: -15,
        ve: 5,
        ce: -20
    },
    'gyűlölettel': {
        ke: 3,
        te: 10,
        ve: -20,
        ce: -20
    },
    'roham': {
        ke: 0,
        te: 20,
        ve: -25,
        ce: -30
    },
    'védharc hátrálva': {
        ke: 0,
        te: 0,
        ve: 40,
        ce: 0
    },
    'védharc állva': {
        ke: 0,
        te: 0,
        ve: 25,
        ce: 0
    },
    'részleges védharc': {
        ke: 0,
        te: 0,
        ve: 15,
        ce: 0
    },
    'foglyul ejtésért': {
        ke: -5,
        te: -5,
        ve: -15,
        ce: 0
    },
}
