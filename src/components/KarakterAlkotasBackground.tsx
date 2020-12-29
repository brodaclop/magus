import React from 'react';
import { Input, Label } from 'semantic-ui-react';
import { KASZTOK, FOKASZTOK } from '../engine/kasztok';
import { BackgroundSelection } from '../pages/KarakterAlkotas';
import { Selection } from './Selection';

export const KarakterAlkotasBackground: React.FC<{ fajNevek: Array<string>, backgroundSelection: BackgroundSelection, setBackgroundSelection: (backgroundSelection: BackgroundSelection) => unknown }> = ({ fajNevek, backgroundSelection, setBackgroundSelection }) => {

    const changeKasztSelection = (s: string | undefined) => {
        setBackgroundSelection({ ...backgroundSelection, kaszt: s, manual: s === 'egyéb' ? JSON.parse(JSON.stringify(KASZTOK['egyéb'])) : undefined })
    };


    return <div>
        <div>
            <Input fluid labelPosition='left' placeholder='Karakter neve...' error={!backgroundSelection.name} value={backgroundSelection.name} onChange={e => setBackgroundSelection({ ...backgroundSelection, name: e.target.value })}>
                <Label pointing='right' basic>Név</Label>
                <input />
            </Input>
        </div>
        <div><Selection label='Kaszt' selected={backgroundSelection.kaszt} setSelected={changeKasztSelection} options={Object.keys(KASZTOK)} structure={FOKASZTOK} /></div>
        <div><Selection label='Faj' selected={backgroundSelection.faj} setSelected={faj => setBackgroundSelection({ ...backgroundSelection, faj })} options={fajNevek} /></div>
        <div><Input labelPosition='left' value={backgroundSelection.szint} onChange={e => {
            const value = e.target.value ? Math.max(0, Math.floor(Number(e.target.value))) : undefined;
            setBackgroundSelection({ ...backgroundSelection, szint: value });
        }}>
            <Label pointing='right' basic>Szint</Label>
            <input />
        </Input>
        </div>
        {backgroundSelection.manual && <div>
            <Input labelPosition='left' error={!backgroundSelection.manual.name} value={backgroundSelection.manual.name} onChange={e => {
                if (backgroundSelection.manual) {
                    setBackgroundSelection({ ...backgroundSelection, manual: { ...backgroundSelection.manual, name: e.target.value } })
                }
            }}>
                <Label pointing='right' basic>Kaszt neve</Label>
                <input />
            </Input>
        </div>}
    </div>

}
