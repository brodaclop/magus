import React, { useState } from 'react';
import { Button, ButtonGroup } from 'semantic-ui-react';
import { VarazslatLista } from '../components/VarazslatLista';
import { PSZI_PYARRONI, PSZI_SLAN, PSZI_KYR, PSZI_LABELS, VARAZSLAT_LABELS } from '../engine/varazslat';

const ALL_SPELLS = [...PSZI_PYARRONI, ...PSZI_SLAN, ...PSZI_KYR];

export const Varazslatok: React.FC<{}> = () => {
    const [tipus, setTipus] = useState<'pszi' | 'magia'>('pszi');
    const [labels, setLabels] = useState<Set<string>>(new Set());



    const spells = ALL_SPELLS.filter(spell => {
        const spellLabels = spell.labels;
        if (!spellLabels.includes(tipus)) {
            return false;
        }
        if (labels.size === 0) {
            return true;
        }
        return spellLabels.some(l => labels.has(l));
    })


    const allSelectedLabels = [...new Set(ALL_SPELLS.filter(spell => spell.labels.includes(tipus)).flatMap(s => s.labels))].filter(l => l !== 'pszi' && l !== 'magia').sort();

    return <>

        <ButtonGroup compact>
            <Button compact content='Pszi' active={tipus === 'pszi'} onClick={() => {
                if (tipus !== 'pszi') {
                    setTipus('pszi');
                    setLabels(new Set());
                }
            }} />
            <Button compact content='Mágia' active={tipus === 'magia'} onClick={() => {
                if (tipus !== 'magia') {
                    setTipus('magia');
                    setLabels(new Set());
                }
            }} />
            {allSelectedLabels.map(l => <Button compact active={labels.has(l)} onClick={() => { labels.has(l) ? labels.delete(l) : labels.add(l); setLabels(new Set(labels)); }} content={l} />)}
        </ButtonGroup>
        <VarazslatLista varazslatok={spells} fieldLabels={tipus === 'pszi' ? PSZI_LABELS : VARAZSLAT_LABELS} />
    </>

}