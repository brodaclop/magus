import React from 'react';
import { Table } from 'semantic-ui-react';
import { Kepzettseg } from '../engine/karakter';

export const KepzettsegLista: React.FC<{ kepzettsegek: Array<Kepzettseg> }> = ({ kepzettsegek }) => {
    return <Table striped celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Képzettség</Table.HeaderCell>
                <Table.HeaderCell>Szint</Table.HeaderCell>
                <Table.HeaderCell>KP</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {kepzettsegek.map((r, i) => {
                return <Table.Row>
                    <Table.Cell>{r.name}</Table.Cell>
                    <Table.Cell>{r.szint}</Table.Cell>
                    <Table.Cell>-</Table.Cell>
                </Table.Row>
            })}
        </Table.Body>
    </Table>

}