import React, { useState } from 'react';
import { CardGroup } from 'semantic-ui-react';
import { stringify } from 'uuid';
import { KombatCard } from '../components/KombatCard';
import { Karakter } from '../engine/karakter';
import { DiceRollResult } from '../engine/roll';

export const Kombat: React.FC<{ karakterek: Array<Karakter>; save: (karakter: Karakter) => unknown }> = ({ karakterek, save }) => {

    const [dobasEredmenyek, setDobasEredmenyek] = useState<Record<string, Record<string, DiceRollResult>>>(karakterek.reduce((acc, curr) => { acc[curr.id] = {}; return acc; }, {} as Record<string, any>));

    const kezdemenySort = (one: Karakter, two: Karakter): number => {
        const oneDown = one.fp <= 0 || one.ep <= 0;
        const twoDown = two.fp <= 0 || two.ep <= 0;

        if (oneDown && twoDown) {
            return 0;
        } else if (oneDown) {
            return 1;
        } else if (twoDown) {
            return -1;
        }


        const oneKe = dobasEredmenyek[one.id].ke?.value ?? 0;
        const twoKe = dobasEredmenyek[two.id].ke?.value ?? 0;
        return twoKe - oneKe;
    }

    return <CardGroup>
        {karakterek.sort(kezdemenySort).map(k => <KombatCard key={k.id} karakter={k} save={save} dobasEredmeny={dobasEredmenyek[k.id]} setDobasEredmeny={e => setDobasEredmenyek({ ...dobasEredmenyek, [k.id]: e })} />)}
    </CardGroup>
}

