import React from 'react';
import { Table } from 'semantic-ui-react';
import { Karakter } from '../engine/karakter';

export const Jegyzetek: React.FC<{ karakter: Karakter, save: () => unknown }> = ({ karakter, save }) => <Table celled fluid compact color='yellow'>
    <Table.Header>
        <Table.Row>
            <Table.HeaderCell>Jegyzetek</Table.HeaderCell>
        </Table.Row>

    </Table.Header>
    <Table.Body>
        <Table.Row>
            <Table.Cell style={{ padding: '0' }}>
                <textarea style={{ borderRadius: '0.25em', height: '10em', width: '100%' }} value={karakter.jegyzetek ?? ''} onChange={e => { karakter.jegyzetek = e.target.value; save(); }} />
            </Table.Cell>
        </Table.Row>
    </Table.Body>
</Table>;
