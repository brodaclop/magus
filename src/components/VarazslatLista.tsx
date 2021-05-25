import React, { useReducer } from 'react';
import { Table } from 'semantic-ui-react';
import { Varazslat } from '../engine/varazslat';

interface VarazslatListaProps {
    varazslatok: Array<Varazslat>;
    fieldLabels: Record<string, string>;
}

export const VarazslatLista: React.FC<VarazslatListaProps> = ({ varazslatok, fieldLabels }) => {

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
                <Table.HeaderCell>{fieldLabels.name ?? '???'}</Table.HeaderCell>
                <Table.HeaderCell>{fieldLabels.pont ?? '???'}</Table.HeaderCell>
                <Table.HeaderCell>{fieldLabels.varazslasIdeje ?? '???'}</Table.HeaderCell>
                {[...miscFields].map(field => <Table.HeaderCell>{fieldLabels[field] ?? '???'}</Table.HeaderCell>)}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {sorted.map(v => <><Table.Row onClick={() => toggleOpen(v.name)}>
                <Table.Cell>{v.name}</Table.Cell>
                <Table.Cell>{v.pont}</Table.Cell>
                <Table.Cell>{v.varazslasIdeje}</Table.Cell>
                {[...miscFields].map(field => <Table.Cell>{(v.misc as any)?.[field]}</Table.Cell>)}
            </Table.Row>
                {open[v.name] && <Table.Row>
                    <Table.Cell colspan={3 + miscFields.size}>
                        <div style={{ backgroundColor: 'burlywood', borderRadius: '0.5em', padding: '0.5em', width: '100%', border: '1px solid black' }} dangerouslySetInnerHTML={{ __html: cleanupDescription(v.description) }} />
                    </Table.Cell>
                </Table.Row>}
            </>
            )}
        </Table.Body>
    </Table>

}