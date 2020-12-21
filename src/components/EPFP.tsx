import React from 'react';
import { Table } from 'semantic-ui-react';

const NumberInput: any = require('semantic-ui-react-numberinput').default;

export const EPFP: React.FC<{ maxEp: number, maxFp: number, ep: number, fp: number, onChange: (ep: number, fp: number) => unknown, maxChange?: boolean, title?: string }> = ({ maxEp, maxFp, ep, fp, onChange, maxChange, title }) => {
    const aktChange = maxChange === undefined;
    return <Table striped celled definition>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>{title ?? 'Életerő'}</Table.HeaderCell>
                <Table.HeaderCell>ÉP</Table.HeaderCell>
                <Table.HeaderCell>FP</Table.HeaderCell>
            </Table.Row>

        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.HeaderCell>Max</Table.HeaderCell>
                <Table.Cell>{maxChange ? <NumberInput size='mini' allowEmptyValue value={maxEp} stepAmount={1} minValue={0} maxValue={1000} onChange={(e: any) => onChange(Number(e), maxFp)} /> : maxEp}</Table.Cell>
                <Table.Cell>{maxChange ? <NumberInput size='mini' allowEmptyValue value={maxFp} stepAmount={1} minValue={0} maxValue={1000} onChange={(e: any) => onChange(maxEp, Number(e))} /> : maxFp}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.HeaderCell>Akt</Table.HeaderCell>
                <Table.Cell>{!aktChange ? ep : <NumberInput size='mini' allowEmptyValue value={ep} stepAmount={1} minValue={0} maxValue={maxEp} onChange={(e: any) => onChange(Math.min(maxEp, Number(e)), fp)} />}</Table.Cell>
                <Table.Cell>{!aktChange ? fp : <NumberInput size='mini' allowEmptyValue value={fp} stepAmount={1} minValue={0} maxValue={maxFp} onChange={(e: any) => onChange(ep, Math.min(maxFp, Number(e)))} />}</Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>

}