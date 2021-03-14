import React, { useState } from 'react';
import { Button, ButtonGroup, CardGroup, Icon } from 'semantic-ui-react';
import { KombatCard } from '../components/KombatCard';
import { Karakter } from '../engine/karakter';
import { DiceRollResult } from '../engine/roll';

export const Kombat: React.FC<{ karakterek: Array<Karakter>; save: (karakter: Karakter) => unknown }> = ({ karakterek, save }) => {

    const [dobasEredmenyek, setDobasEredmenyek] = useState<Record<string, Record<string, DiceRollResult>>>(karakterek.reduce((acc, curr) => { acc[curr.id] = {}; return acc; }, {} as Record<string, any>));
    const [refs, _] = useState<Record<string, { current: any }>>({});


    const kezdemenySort = (one: Karakter, two: Karakter): number => {

        const oneKe = dobasEredmenyek[one.id].ke?.value ?? 0;
        const twoKe = dobasEredmenyek[two.id].ke?.value ?? 0;
        return twoKe - oneKe;
    }

    return <>
        <div style={{ textAlign: 'center' }}>
            <ButtonGroup>
                <Button color='olive' onClick={() => {
                    const uj = { ...dobasEredmenyek };
                    Object.keys(refs).forEach(id => {
                        const ke = refs[id]?.current?.rollKe();
                        uj[id].ke = ke;
                    });
                    setDobasEredmenyek(uj);
                }}>Kezdemény</Button>
                <Button color='purple' onClick={() => {
                    const uj = { ...dobasEredmenyek };
                    Object.keys(refs).forEach(id => {
                        const te = refs[id]?.current?.rollTe();
                        uj[id].te = te;
                    });
                    setDobasEredmenyek(uj);
                }}>Támadó</Button>
                <Button color='purple' onClick={() => {
                    const uj = { ...dobasEredmenyek };
                    Object.keys(refs).forEach(id => {
                        const ce = refs[id]?.current?.rollCe();
                        uj[id].ce = ce;
                    });
                    setDobasEredmenyek(uj);
                }}>Célzó</Button>
                <Button color='orange' onClick={() => {
                    const uj = { ...dobasEredmenyek };
                    Object.keys(refs).forEach(id => {
                        const sebzes = refs[id]?.current?.rollSebzes();
                        uj[id].sebzes = sebzes;
                    });
                    setDobasEredmenyek(uj);
                }}>Sebzés</Button>
                <Button color='red' onClick={() => {
                    setDobasEredmenyek(karakterek.reduce((acc, curr) => { acc[curr.id] = {}; return acc; }, {} as Record<string, any>));
                }}>Dobások törlése
            </Button>
            </ButtonGroup>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch' }}>
            {karakterek.sort(kezdemenySort).reverse().map((k, i) => <div style={{ order: karakterek.length - i, margin: '1em' }}>
                <KombatCard ref={ref => refs[k.id] = { current: ref }} key={k.id} karakter={k} save={save} dobasEredmeny={dobasEredmenyek[k.id]} setDobasEredmeny={e => setDobasEredmenyek({ ...dobasEredmenyek, [k.id]: e })} />
            </div>
            )}
        </div>
    </>
}

