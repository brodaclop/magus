import React from 'react';
import { Table } from 'semantic-ui-react';

const NumberInput: any = require('semantic-ui-react-numberinput').default;

interface Point {
    name: string;
    label: string;
    max: number;
    akt: number;
}



export const PointsTable: React.FC<{ points: Array<Point>, onChange: (name: string, newValue: number) => unknown, maxChange?: boolean, title?: string }> = ({ points, onChange, maxChange, title }) => {
    const aktChange = maxChange === undefined;
    return <Table striped celled definition>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>{title ?? 'Pontok'}</Table.HeaderCell>
                {points.map(p => <Table.HeaderCell>{p.label}</Table.HeaderCell>)}
            </Table.Row>

        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.HeaderCell>Max</Table.HeaderCell>
                {points.map(p => <Table.Cell>{maxChange ? <NumberInput maxLength={4} size='mini narrow' allowEmptyValue value={p.max} stepAmount={1} minValue={0} maxValue={1000} onChange={(e: any) => onChange(p.name, Number(e))} /> : p.max}</Table.Cell>)}
            </Table.Row>
            <Table.Row>
                <Table.HeaderCell>Akt</Table.HeaderCell>
                {points.map(p => <Table.Cell>{!aktChange ? p.akt : <NumberInput maxLength={4} size='mini narrow' allowEmptyValue value={p.akt} stepAmount={1} minValue={0} maxValue={p.max} onChange={(e: any) => onChange(p.name, Math.min(p.max, Number(e)))} />}</Table.Cell>)}
            </Table.Row>
        </Table.Body>
    </Table>

}