import { useState } from "react";
import { Karakter, KarakterInfo } from "../engine/karakter";

interface DataConnector {
    categories: () => Array<string>;
    list: (category?: string) => Array<KarakterInfo>;
    load: (info: KarakterInfo) => Karakter;
    save: (karakter: Karakter) => void;
    remove: (info: KarakterInfo) => void;
    key?: number;
}

export function useDataConnector(): DataConnector {

    const [operations, setOperations] = useState(0);

    function fetch<T>(name: string): T {
        const s = window.localStorage.getItem(name);
        return s ? JSON.parse(s) : null;
    };

    const categories = (): Array<string> => {
        return [...new Set(list().flatMap(info => info.categories))];
    }

    const list = (category?: string): Array<KarakterInfo> => {
        const all: Array<KarakterInfo> = [...Array(window.localStorage.length)].map((_, i) => window.localStorage.key(i) ?? '').map(key => fetch(key));
        if (!category) {
            return all;
        }
        return all.filter(k => k.categories.some(cat => cat === category));
    };

    const load = (info: KarakterInfo): Karakter => {
        return fetch(info.id);
    };

    const save = (karakter: Karakter): void => {
        window.localStorage.setItem(karakter.id, JSON.stringify(karakter));
        setOperations(operations + 1);
    };

    const remove = (info: KarakterInfo) => {
        window.localStorage.removeItem(info.id);
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
        remove,
        key: operations
    }
}