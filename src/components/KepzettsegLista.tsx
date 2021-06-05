import React from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import { Karakter, Kepzettseg } from '../engine/karakter';
import { KepzettsegModal } from './KepzettsegModal';


const compare = (a: Kepzettseg, b: Kepzettseg): number => {
    if (typeof a.szint === 'number' && typeof b.szint !== 'number') {
        return 1;
    }
    if (typeof b.szint === 'number' && typeof a.szint !== 'number') {
        return -1;
    }
    return a.name.localeCompare(b.name);
}

const normalKepzettseg = (kepzettseg: Kepzettseg): boolean => {
    return !kepzettseg.name.startsWith('Fegyverhasználat - ') && !kepzettseg.name.startsWith('Fegyverdobás - ') && typeof kepzettseg.szint !== 'number';
}

export const KepzettsegLista: React.FC<{ karakter: Karakter, save: () => unknown }> = ({ karakter, save }) => {
    return <Table striped celled compact color='pink'>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell collapsing></Table.HeaderCell>
                <Table.HeaderCell>Egyéb képzettségek</Table.HeaderCell>
                <Table.HeaderCell collapsing>Szint</Table.HeaderCell>
                <Table.HeaderCell collapsing>KP</Table.HeaderCell>
                <Table.HeaderCell collapsing></Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {karakter.kepzettsegek?.sort(compare).map((r, i) => normalKepzettseg(r) && <Table.Row>
                <Table.Cell collapsing><KepzettsegModal karakter={karakter} editedKepzettseg={r} save={save} trigger={<Icon name='edit' />} /></Table.Cell>
                <Table.Cell>{r.name}</Table.Cell>
                <Table.Cell collapsing>{r.szint}</Table.Cell>
                <Table.Cell collapsing>{r.kp ? r.kp : '-'}</Table.Cell>
                <Table.Cell collapsing><Icon name='delete' onClick={() => { karakter.kepzettsegek?.splice(i, 1); save() }} /></Table.Cell>
            </Table.Row>
            )}
            <Table.Row key='__new'>
                <Table.Cell colspan={5}><KepzettsegModal karakter={karakter} save={save} trigger={<Button fluid circular icon='plus' content='Új képzettség' />} /></Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>

}