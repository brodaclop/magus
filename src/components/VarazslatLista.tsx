import React, { useReducer } from 'react';
import { Table } from 'semantic-ui-react';
import { Varazslat } from '../engine/varazslat';

interface VarazslatListaProps {
    varazslatok: Array<Varazslat>;
    fieldLabels: Record<string, string>;
    selectionRenderer?: (varazslat: Varazslat) => JSX.Element;
}

export const VarazslatLista: React.FC<VarazslatListaProps> = ({ varazslatok, fieldLabels, selectionRenderer }) => {

    const [open, toggleOpen] = useReducer((prev: Record<string, boolean>, action: string) => ({ ...prev, [action]: !prev[action] }), {})

    const sorted = varazslatok.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    const cleanupDescription = (text: string) => {
        return text.trim().split('\n\n').map(line => `<p>${line.replace(/\s+/g, ' ').trim()}</p>`).join('');
    }

    const miscFields: Set<string> = varazslatok.reduce((acc, curr) => {
        if (curr.misc) {
            Object.keys(curr.misc).forEach(field => acc.add(field));
        }
        return acc;
    }, new Set<string>());

    return <Table compact celled striped definition>
        <Table.Header>
            <Table.Row>
                {selectionRenderer && <Table.HeaderCell />}
                <Table.HeaderCell>{fieldLabels.name ?? '???'}</Table.HeaderCell>
                <Table.HeaderCell>{fieldLabels.pont ?? '???'}</Table.HeaderCell>
                <Table.HeaderCell>{fieldLabels.varazslasIdeje ?? '???'}</Table.HeaderCell>
                {[...miscFields].map(field => <Table.HeaderCell>{fieldLabels[field] ?? '???'}</Table.HeaderCell>)}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {sorted.map(v => <><Table.Row>
                {selectionRenderer && <Table.Cell collapsing>{selectionRenderer(v)}</Table.Cell>}
                <Table.Cell onClick={() => toggleOpen(v.name)}>{v.name}</Table.Cell>
                <Table.Cell onClick={() => toggleOpen(v.name)}>{v.pont}</Table.Cell>
                <Table.Cell onClick={() => toggleOpen(v.name)}>{v.varazslasIdeje}</Table.Cell>
                {[...miscFields].map(field => <Table.Cell>{(v.misc as any)?.[field]}</Table.Cell>)}
            </Table.Row>
                {open[v.name] && <Table.Row>
                    <Table.Cell colspan={3 + miscFields.size + (selectionRenderer ? 1 : 0)}>
                        <div style={{ backgroundColor: 'burlywood', borderRadius: '0.5em', padding: '0.5em', width: '100%', border: '1px solid black' }} dangerouslySetInnerHTML={{ __html: cleanupDescription(v.description) }} />
                    </Table.Cell>
                </Table.Row>}
            </>
            )}
        </Table.Body>
    </Table>

}