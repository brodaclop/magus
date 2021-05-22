import React from 'react';
import { Table } from 'semantic-ui-react';
import { Pajzs } from '../engine/karakter';
import { NumberInput } from './NumberInput';





export const Pajzsok: React.FC<{ pajzs: { asztral: Pajzs, mental: Pajzs }, onChange: (pajzs: { asztral: Pajzs, mental: Pajzs }) => unknown }> = ({ pajzs, onChange }) => {
    return <Table striped celled definition fluid>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Pajzsok</Table.HeaderCell>
                <Table.HeaderCell>Asztrál</Table.HeaderCell>
                <Table.HeaderCell>Mentál</Table.HeaderCell>
            </Table.Row>

        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.HeaderCell>Természetes</Table.HeaderCell>
                <Table.Cell><NumberInput icons value={pajzs.asztral.termeszetes} min={0} max={1000} onChange={(e: number) => { pajzs.asztral.termeszetes = e; onChange(pajzs) }} /></Table.Cell>
                <Table.Cell><NumberInput icons value={pajzs.mental.termeszetes} min={0} max={1000} onChange={(e: number) => { pajzs.mental.termeszetes = e; onChange(pajzs) }} /></Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.HeaderCell>Statikus</Table.HeaderCell>
                <Table.Cell><NumberInput icons value={pajzs.asztral.statikus} min={0} max={1000} onChange={(e: number) => { pajzs.asztral.statikus = e; onChange(pajzs) }} /></Table.Cell>
                <Table.Cell><NumberInput icons value={pajzs.mental.statikus} min={0} max={1000} onChange={(e: number) => { pajzs.mental.statikus = e; onChange(pajzs) }} /></Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.HeaderCell>Dinamikus</Table.HeaderCell>
                <Table.Cell><NumberInput icons value={pajzs.asztral.dinamikus} min={0} max={1000} onChange={(e: number) => { pajzs.asztral.dinamikus = e; onChange(pajzs) }} /></Table.Cell>
                <Table.Cell><NumberInput icons value={pajzs.mental.dinamikus} min={0} max={1000} onChange={(e: number) => { pajzs.mental.dinamikus = e; onChange(pajzs) }} /></Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.HeaderCell>Összeg</Table.HeaderCell>
                <Table.Cell><b>{pajzs.asztral.termeszetes + pajzs.asztral.statikus + pajzs.asztral.dinamikus}</b></Table.Cell>
                <Table.Cell><b>{pajzs.mental.termeszetes + pajzs.mental.statikus + pajzs.mental.dinamikus}</b></Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>

}