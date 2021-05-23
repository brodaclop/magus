import React from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import { Karakter } from '../engine/karakter';
import { EditableText } from '../story/components/EditableText';
import { NumberInput } from './NumberInput';

export const Felszereles: React.FC<{ karakter: Karakter, save: () => unknown }> = ({ karakter, save }) => {

    const rowRefs: Record<string, { current: any }> = {};

    return <Table celled fluid compact color='blue'>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Felszerelés</Table.HeaderCell>
                <Table.HeaderCell>Mennyiség</Table.HeaderCell>
                <Table.HeaderCell />
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {karakter.felszereles?.map((f, i) => <Table.Row key={f.name}>
                <Table.Cell onClick={() => rowRefs[f.name].current.edit()}>
                    <EditableText ref={ref => rowRefs[f.name] = { current: ref }} text={f.name} onChange={v => { f.name = v; save() }} />
                </Table.Cell>
                <Table.Cell collapsing>
                    <NumberInput min={0} max={10000} value={f.qty} onChange={q => { f.qty = q; save() }} icons />
                </Table.Cell>
                <Table.Cell collapsing>
                    <Icon name='delete' onClick={() => { karakter.felszereles?.splice(i, 1); save() }} />
                </Table.Cell>
            </Table.Row>
            )}
            <Table.Row>
                <Table.Cell colSpan={3} >
                    <Button fluid circular icon='plus' content='Hozzáad' onClick={() => { karakter.felszereles = [...(karakter.felszereles ?? []), { name: '', qty: 1 }]; save(); }} />
                </Table.Cell>

            </Table.Row>

        </Table.Body>
    </Table>;
}
