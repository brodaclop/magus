import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { Karakter, Kepzettseg } from '../engine/karakter';
import { NumberInput } from './NumberInput';

const szazalekosKepzettseg = (kepzettseg: Kepzettseg): boolean => typeof kepzettseg.szint === 'number'

export const SzazalekosKepzettsegLista: React.FC<{ karakter: Karakter, save: () => unknown }> = ({ karakter, save }) => {
    return <Table striped celled compact color='pink'>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Százalékos képzettségek</Table.HeaderCell>
                <Table.HeaderCell collapsing>%</Table.HeaderCell>
                <Table.HeaderCell collapsing>KP</Table.HeaderCell>
                <Table.HeaderCell collapsing></Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {karakter.kepzettsegek?.sort((a, b) => a.name.localeCompare(b.name)).map((r, i) => szazalekosKepzettseg(r) && <Table.Row>
                <Table.Cell>{r.name}</Table.Cell>
                <Table.Cell collapsing><NumberInput min={0} max={200} value={r.szint as number} icons onChange={value => { r.szint = value; save() }} /></Table.Cell>
                <Table.Cell collapsing><NumberInput min={0} max={100} value={r.kp} onChange={value => { r.kp = value; save() }} /></Table.Cell>
                <Table.Cell collapsing><Icon name='delete' onClick={() => { karakter.kepzettsegek?.splice(i, 1); save() }} /></Table.Cell>
            </Table.Row>
            )}
        </Table.Body>
    </Table>

}