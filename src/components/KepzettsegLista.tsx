import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { Kepzettseg } from '../engine/karakter';


const compare = (a: Kepzettseg, b: Kepzettseg): number => {
    if (typeof a.szint === 'number' && typeof b.szint !== 'number') {
        return 1;
    }
    if (typeof b.szint === 'number' && typeof a.szint !== 'number') {
        return -1;
    }
    return a.name.localeCompare(b.name);
}

export const KepzettsegLista: React.FC<{ kepzettsegek?: Array<Kepzettseg>, remove: (kepzettseg: Kepzettseg) => unknown }> = ({ kepzettsegek, remove }) => {
    return <Table striped celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Képzettség</Table.HeaderCell>
                <Table.HeaderCell>Szint</Table.HeaderCell>
                <Table.HeaderCell>KP</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {kepzettsegek?.sort(compare).map((r, i) => {
                return <Table.Row>
                    <Table.Cell>{r.name}</Table.Cell>
                    <Table.Cell>{r.szint}</Table.Cell>
                    <Table.Cell>{r.kp ? r.kp : '-'}</Table.Cell>
                    <Table.Cell><Icon name='delete' onClick={() => remove(r)} /></Table.Cell>
                </Table.Row>
            })}
        </Table.Body>
    </Table>

}