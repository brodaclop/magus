import React, { useState } from 'react';
import { Button, ButtonGroup } from 'semantic-ui-react';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';
import { KombatCard } from '../components/KombatCard';
import { Karakter } from '../engine/karakter';
import { DiceRollResult } from '../engine/roll';



export const Kombat: React.FC<{ karakterek: Array<Karakter>; save: (karakter: Karakter) => unknown }> = ({ karakterek, save }) => {

    const [dobasEredmenyek, setDobasEredmenyek] = useState<Record<string, Record<string, DiceRollResult>>>(karakterek.reduce((acc, curr) => { acc[curr.id] = {}; return acc; }, {} as Record<string, any>));
    const [refs] = useState<Record<string, { current: any }>>({});

    const DobasButton: React.FC<{
        color: SemanticCOLORS,
        label: string,
        rollFn: string,
        value: string
    }> = ({ color, label, rollFn, value }) => <Button color={color} onClick={() => {
        const uj = { ...dobasEredmenyek };
        Object.keys(refs).forEach(id => {
            uj[id][value] = refs[id]?.current?.[rollFn]();
        });
        setDobasEredmenyek(uj);
    }}>{label}</Button>


    const kezdemenySort = (one: Karakter, two: Karakter): number => {

        const oneKe = dobasEredmenyek[one.id].ke?.value ?? 0;
        const twoKe = dobasEredmenyek[two.id].ke?.value ?? 0;
        if (oneKe !== twoKe) {
            return twoKe - oneKe;
        }
        return one.name.localeCompare(two.name);
    }

    return <>
        <div style={{ textAlign: 'center' }}>
            <ButtonGroup>
                <DobasButton
                    color='olive'
                    label='Kezdemény'
                    rollFn='rollKe'
                    value='ke' />
                <DobasButton
                    color='purple'
                    label='Támadó'
                    rollFn='rollTe'
                    value='te' />
                <DobasButton
                    color='purple'
                    label='Célzó'
                    rollFn='rollCe'
                    value='ce' />
                <DobasButton
                    color='orange'
                    label='Sebzés'
                    rollFn='rollSebzes'
                    value='sebzes' />
                <Button color='red' onClick={() => {
                    setDobasEredmenyek(karakterek.reduce((acc, curr) => { acc[curr.id] = {}; return acc; }, {} as Record<string, any>));
                }}>Dobások törlése
            </Button>
            </ButtonGroup>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch' }}>
            {karakterek.sort(kezdemenySort).reverse().map((k, i) => <div style={{ order: karakterek.length - i, margin: '1em' }}>
                <KombatCard
                    ref={ref => refs[k.id] = { current: ref }}
                    key={k.id}
                    karakter={k}
                    save={save}
                    dobasEredmeny={dobasEredmenyek[k.id]}
                    setDobasEredmeny={e => setDobasEredmenyek({ ...dobasEredmenyek, [k.id]: e })} />
            </div>
            )}
        </div>
    </>
}

