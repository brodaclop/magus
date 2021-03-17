import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { Pancel } from '../engine/pancel';

export const PancelLista: React.FC<{ pancelok?: Array<Pancel>, selected?: number, onSelectionChange?: (newSelection: number | undefined) => unknown }> = ({ pancelok, selected, onSelectionChange }) => {

    return <Table celled striped definition selectable={onSelectionChange !== undefined}>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Páncél</Table.HeaderCell>
                <Table.HeaderCell>SFÉ</Table.HeaderCell>
                <Table.HeaderCell>MGT</Table.HeaderCell>
                <Table.HeaderCell>Nehéz</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {pancelok?.map((r, i) => {
                return <Table.Row active={selected === i} onClick={() => onSelectionChange?.(selected === i ? undefined : i)}>
                    <Table.Cell>{r.name}</Table.Cell>
                    <Table.Cell>{r.sfe}</Table.Cell>
                    <Table.Cell>{r.mgt}</Table.Cell>
                    <Table.Cell>{r.nehez && <Icon compact color='green' name='check' />}</Table.Cell>
                </Table.Row>
            })}
        </Table.Body>
    </Table>
}