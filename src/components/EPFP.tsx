import React from 'react';
import { Table } from 'semantic-ui-react';

const NumberInput: any = require('semantic-ui-react-numberinput').default;

export const EPFP: React.FC<{ maxEp: number, maxFp: number, ep: number, fp: number, onChange: (ep: number, fp: number) => unknown }> = ({ maxEp, maxFp, ep, fp, onChange }) => {
    return <Table striped celled definition>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Állapot</Table.HeaderCell>
                <Table.HeaderCell>ÉP</Table.HeaderCell>
                <Table.HeaderCell>FP</Table.HeaderCell>
            </Table.Row>

        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.HeaderCell>Max</Table.HeaderCell>
                <Table.Cell>{maxEp}</Table.Cell>
                <Table.Cell>{maxFp}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.HeaderCell>Akt</Table.HeaderCell>
                <Table.Cell><NumberInput size='mini' allowEmptyValue value={ep} stepAmount={1} minValue={0} maxValue={maxEp} onChange={(e: any) => onChange(Math.min(maxEp, Number(e)), fp)} /></Table.Cell>
                <Table.Cell><NumberInput size='mini' allowEmptyValue value={fp} stepAmount={1} minValue={0} maxValue={maxFp} onChange={(e: any) => onChange(ep, Math.min(maxFp, Number(e)))} /></Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>

}