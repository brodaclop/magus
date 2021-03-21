import React from 'react';
import { Table } from 'semantic-ui-react';
import { Fegyver } from '../engine/karakter';

export const FegyverLista: React.FC<{ fegyverek: Array<Fegyver>, selected?: number, onSelectionChange?: (newSelection: number | undefined) => unknown, title?: string }> = ({ fegyverek, selected, onSelectionChange, title }) => {
    const fegyverLista: Array<Record<string, string | number>> = fegyverek.map(fegyver => {
        const rec: Record<string, string | number> = {};
        rec.name = fegyver.name;
        rec.ke = fegyver.harcertek.ke;
        rec.te = fegyver.harcertek.te || '-';
        rec.ve = fegyver.harcertek.ve;
        rec.ce = fegyver.harcertek.ce || '-';
        rec.sebzes = fegyver.sebzes;
        rec.tamPerKor = fegyver.lassu ? '1/' + fegyver.tamPerKor : fegyver.tamPerKor;
        rec.lotav = fegyver.lotav ?? '-';
        return rec;
    });

    return <Table celled striped definition selectable={onSelectionChange !== undefined}>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>{title ?? 'Fegyver'}</Table.HeaderCell>
                <Table.HeaderCell>KÉ</Table.HeaderCell>
                <Table.HeaderCell>TÉ</Table.HeaderCell>
                <Table.HeaderCell>VÉ</Table.HeaderCell>
                <Table.HeaderCell>CÉ</Table.HeaderCell>
                <Table.HeaderCell>Sebzés</Table.HeaderCell>
                <Table.HeaderCell>Tám / kör</Table.HeaderCell>
                <Table.HeaderCell>Lőtáv</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {fegyverLista.map((r, i) => {
                return <Table.Row active={selected === i} onClick={() => onSelectionChange?.(selected === i ? undefined : i)}>
                    <Table.Cell>{r.name}</Table.Cell>
                    <Table.Cell>{r.ke}</Table.Cell>
                    <Table.Cell>{r.te}</Table.Cell>
                    <Table.Cell>{r.ve}</Table.Cell>
                    <Table.Cell>{r.ce}</Table.Cell>
                    <Table.Cell>{r.sebzes}</Table.Cell>
                    <Table.Cell>{r.tamPerKor}</Table.Cell>
                    <Table.Cell>{r.lotav}</Table.Cell>
                </Table.Row>
            })}
        </Table.Body>
    </Table>
}