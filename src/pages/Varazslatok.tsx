import React, { useState } from 'react';
import { Button, ButtonGroup, Icon } from 'semantic-ui-react';
import { VarazslatLista } from '../components/VarazslatLista';
import { Karakter } from '../engine/karakter';
import { PSZI_PYARRONI, PSZI_SLAN, PSZI_KYR, PSZI_LABELS, VARAZSLAT_LABELS, BARD_VARAZSLATOK, BM_VARAZSLATOK, Varazslat } from '../engine/varazslat';

const ALL_SPELLS = [...PSZI_PYARRONI, ...PSZI_SLAN, ...PSZI_KYR, ...BARD_VARAZSLATOK, ...BM_VARAZSLATOK];

interface LabelTreeNode {
    label: string;
    children: Array<LabelTreeNode>;

}

export const Varazslatok: React.FC<{ karakter?: Karakter, save?: (karakter: Karakter) => unknown }> = ({ karakter, save }) => {
    const [tipus, setTipus] = useState<'pszi' | 'magia'>('pszi');
    const [labels, setLabels] = useState<Set<string>>(new Set());
    const [karakterSpells, setKarakterSpells] = useState<boolean>(!!karakter?.varazslatok);

    const allSpells = karakterSpells ? karakter?.varazslatok ?? [] : ALL_SPELLS;

    const spells = allSpells.filter(spell => {
        const spellLabels = spell.labels;
        if (!spellLabels.includes(tipus)) {
            return false;
        }
        if (labels.size === 0) {
            return true;
        }
        return spellLabels.some(l => labels.has(l));
    })


    const allSelectedLabels = [...new Set(allSpells.filter(spell => spell.labels.includes(tipus)).flatMap(s => s.labels))].filter(l => l !== 'pszi' && l !== 'magia').sort();

    let labelBuffer = new Set(allSelectedLabels);

    const createNode = (label: string): LabelTreeNode => {
        labelBuffer.delete(label);
        return {
            label,
            children: [...labelBuffer].filter(child => child.startsWith(label)).map(createNode) ?? []
        };
    }

    const labelTree: Array<LabelTreeNode> = [...labelBuffer].filter(child => !child.includes('-')).map(createNode) ?? [];
    labelBuffer.forEach(label => {
        labelTree.push({
            label,
            children: []
        });
    });

    const selectionRenderer = (varazslat: Varazslat): JSX.Element => {
        const hasVarazslat = (karakter?.varazslatok ?? []).some(v => v.name === varazslat.name);
        if (!karakter) {
            return <></>;
        }
        return <Icon name='check' color={hasVarazslat ? 'green' : 'grey'}
            onClick={() => {
                if (hasVarazslat) {
                    karakter.varazslatok = (karakter.varazslatok ?? []).filter(v => v.name !== varazslat.name);
                } else {
                    karakter.varazslatok = [...(karakter.varazslatok ?? []), varazslat];
                }
                save?.(karakter);
            }}
        />
    }

    return <>
        {!!karakter && <ButtonGroup fluid compact>
            <Button compact content='Karakter' primary={karakterSpells} onClick={() => setKarakterSpells(true)} />
            <Button compact content='Összes' primary={!karakterSpells} onClick={() => setKarakterSpells(false)} />
        </ButtonGroup>}
        <ButtonGroup fluid compact>
            <Button compact content='Pszi' primary={tipus === 'pszi'} onClick={() => {
                if (tipus !== 'pszi') {
                    setTipus('pszi');
                    setLabels(new Set());
                }
            }} />
            <Button compact content='Mágia' primary={tipus === 'magia'} onClick={() => {
                if (tipus !== 'magia') {
                    setTipus('magia');
                    setLabels(new Set());
                }
            }} />
        </ButtonGroup>
        {labelTree.map(node => <ButtonGroup compact fluid style={{ flexWrap: 'wrap', marginTop: '0.2em' }}>
            <Button compact primary={labels.has(node.label)} onClick={() => { labels.has(node.label) ? labels.delete(node.label) : labels.add(node.label); setLabels(new Set(labels)); }} content={node.label} />
            {node.children.map(n => <Button compact primary={labels.has(n.label)} onClick={() => { labels.has(n.label) ? labels.delete(n.label) : labels.add(n.label); setLabels(new Set(labels)); }} content={n.label} />)}
        </ButtonGroup>)}
        <VarazslatLista varazslatok={spells} fieldLabels={tipus === 'pszi' ? PSZI_LABELS : VARAZSLAT_LABELS} selectionRenderer={karakter && selectionRenderer} />
    </>

}