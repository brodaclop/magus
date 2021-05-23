import React from 'react';
import { Table } from 'semantic-ui-react';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';
import { Points } from '../engine/karakter';
import { NumberInput } from './NumberInput';

//const NumberInput: any = require('semantic-ui-react-numberinput').default;

interface Point extends Points {
    name: string;
    label: string;
}

interface PointsTableProps {
    points: Array<Point>,
    onChange: (name: string, max: boolean, newValue: number) => unknown,
    title?: string,
    color?: SemanticCOLORS
}

export const PointsTable: React.FC<PointsTableProps> = ({ points, onChange, title, color }) => {
    return <Table striped celled definition fluid compact color={color}>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>{title ?? 'Pontok'}</Table.HeaderCell>
                {points.map(p => <Table.HeaderCell collapsing>{p.label}</Table.HeaderCell>)}
            </Table.Row>

        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.HeaderCell>Max</Table.HeaderCell>
                {points.map(p => <Table.Cell collapsing><NumberInput icons value={p.max} min={0} max={1000} onChange={(e: number) => onChange(p.name, true, e)} /></Table.Cell>)}
            </Table.Row>
            <Table.Row>
                <Table.HeaderCell>Akt</Table.HeaderCell>
                {points.map(p => <Table.Cell collapsing><NumberInput icons value={p.akt} min={0} max={p.max} onChange={(e: number) => onChange(p.name, false, Math.min(p.max, e))} /></Table.Cell>)}
            </Table.Row>
        </Table.Body>
    </Table>

}