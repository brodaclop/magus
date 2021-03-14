import React from 'react';
import { Table } from 'semantic-ui-react';
import { NumberInput } from './NumberInput';

//const NumberInput: any = require('semantic-ui-react-numberinput').default;

interface Point {
    name: string;
    label: string;
    max: number;
    akt: number;
}



export const PointsTable: React.FC<{ points: Array<Point>, onChange: (name: string, newValue: number) => unknown, maxChange?: boolean, title?: string }> = ({ points, onChange, maxChange, title }) => {
    const aktChange = maxChange === undefined;
    return <Table striped celled definition fluid>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>{title ?? 'Pontok'}</Table.HeaderCell>
                {points.map(p => <Table.HeaderCell>{p.label}</Table.HeaderCell>)}
            </Table.Row>

        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.HeaderCell>Max</Table.HeaderCell>
                {points.map(p => <Table.Cell>{maxChange ? <NumberInput icons value={p.max} min={0} max={1000} onChange={(e: number) => onChange(p.name, e)} /> : p.max}</Table.Cell>)}
            </Table.Row>
            <Table.Row>
                <Table.HeaderCell>Akt</Table.HeaderCell>
                {points.map(p => <Table.Cell>{!aktChange ? p.akt : <NumberInput icons value={p.akt} min={0} max={p.max} onChange={(e: number) => onChange(p.name, Math.min(p.max, e))} />}</Table.Cell>)}
            </Table.Row>
        </Table.Body>
    </Table>

}