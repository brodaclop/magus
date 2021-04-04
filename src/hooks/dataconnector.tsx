import { useState } from "react";
import { v4 } from "uuid";
import { FEGYVEREK } from "../engine/harc";
import { Fegyver, Karakter, KarakterInfo, KarakterV1 } from "../engine/karakter";
import { FAJ_KEPESSEG, KepessegDobas } from "../engine/kasztok";
import { Pancel, PANCELOK } from "../engine/pancel";

const PREFIX = 'magus.';
const CONFIG_PREFIX = 'magus-config.';
const STORY_KEY = 'magus-story';

interface DataConnector {
    categories: () => Array<string>;
    list: (category?: string) => Array<KarakterInfo>;
    load: (info: KarakterInfo) => Karakter;
    save: (karakter: Karakter) => void;
    clone: (karakter: Karakter) => Karakter;
    remove: (info: KarakterInfo) => void;
    listFajok: () => Record<string, KepessegDobas>;
    listFegyverek: () => Array<Fegyver>;
    saveFegyverek: (fegyverek: Array<Fegyver>) => void;
    listPancelok: () => Array<Pancel>;
    savePancelok: (pancelok: Array<Pancel>) => void;
    loadStory: () => string,
    saveStory: (story: string) => unknown;
    key?: number;
}

export function useDataConnector(): DataConnector {

    const [operations, setOperations] = useState(0);

    function fetch<T>(name: string): T {
        const s = window.localStorage.getItem(name);
        return s ? JSON.parse(s) : null;
    };

    function put(name: string, ob: any) {
        window.localStorage.setItem(name, JSON.stringify(ob));
        setOperations(operations + 1);
    }

    const categories = (): Array<string> => {
        return [...new Set(list().flatMap(info => info.categories))];
    }

    const list = (category?: string): Array<KarakterInfo> => {
        const all: Array<KarakterInfo> = [...Array(window.localStorage.length)].map((_, i) => window.localStorage.key(i) ?? '').filter(key => key.startsWith(PREFIX)).map(key => fetch(key));
        if (!category) {
            return all.sort((a, b) => a.name.localeCompare(b.name));
        }
        return all.filter(k => k.categories.some(cat => cat === category)).sort((a, b) => a.name.localeCompare(b.name));
    };

    const load = (info: KarakterInfo): Karakter => {
        const karakter: Karakter | KarakterV1 = fetch(PREFIX + info.id);
        if (karakter.version === 2) {
            return karakter;
        }
        //Convert v1 to v2
        (karakter as any).version = 2;
        (karakter as any).ep = { max: karakter.maxEp, akt: karakter.ep };
        (karakter as any).fp = { max: karakter.maxFp, akt: karakter.fp };
        return karakter as unknown as Karakter;
    };

    const save = (karakter: Karakter): void => {
        put(PREFIX + karakter.id, karakter);
    };

    const clone = (karakter: Karakter): Karakter => {
        const karakterek = list();
        let newNev: string;
        let i = 2;
        do {
            newNev = `${karakter.name} (${i})`;
            i++;
            // eslint-disable-next-line no-loop-func
        } while (karakterek.some(k => k.name === newNev));

        const ret = { ...karakter, id: v4(), name: newNev };
        save(ret);
        return ret;
    }

    const remove = (info: KarakterInfo) => {
        window.localStorage.removeItem(PREFIX + info.id);
    }

    (window as any).exportMagus = () => {
        const ret: Record<string, any> = {};
        list('').forEach(key => {
            ret[key.id] = load(key);
        })
        console.log('export', JSON.stringify(ret));
    }

    (window as any).importMagus = (content: string) => {
        const all = JSON.parse(content);
        Object.keys(all).forEach(key => save(all[key]));
        console.log('import complete');
    }


    return {
        categories,
        list,
        load,
        save,
        clone,
        remove,
        listFajok: () => FAJ_KEPESSEG,
        listFegyverek: () => {
            let ret = fetch<Array<Fegyver>>(CONFIG_PREFIX + 'fegyverek');
            if (!ret) {
                put(CONFIG_PREFIX + 'fegyverek', FEGYVEREK);
                ret = FEGYVEREK;
            }
            return ret;
        },
        saveFegyverek: fegyverek => put(CONFIG_PREFIX + 'fegyverek', fegyverek),
        listPancelok: () => {
            let ret = fetch<Array<Pancel>>(CONFIG_PREFIX + 'pancelok');
            if (!ret) {
                put(CONFIG_PREFIX + 'pancelok', PANCELOK);
                ret = PANCELOK;
            }
            return ret;
        },
        savePancelok: pancelok => put(CONFIG_PREFIX + 'pancelok', pancelok),
        loadStory: () => fetch(STORY_KEY) ?? '<story/>',
        saveStory: (story: string) => put(STORY_KEY, story),
        key: operations
    }
}