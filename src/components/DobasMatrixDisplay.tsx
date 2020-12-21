import React from 'react';
import { Table } from 'semantic-ui-react';
import { DobasMatrix } from '../engine/dobasmatrix';
import { formatDiceRoll } from '../engine/roll';
import { DobasEredmeny } from './DobasEredmeny';


export const DobasMatrixDisplay: React.FC<{ matrix: DobasMatrix, keyMap: Record<string, string>, direction: 'horizontal' | 'vertical', title: string }> = ({ matrix, keyMap, direction, title }) => {
    const displayCell = (name: string, key: string) => {
        const value = matrix.values[name][key];
        const constantRoll = (value?.roll?.die ?? 0) === 0;
        const rollString = value?.roll ? formatDiceRoll(value.roll) : '';
        return <Table.Cell key={name + '-' + key}>{rollString}{!constantRoll && value?.result && <> = <DobasEredmeny result={value?.result} /></>}</Table.Cell>;
    }

    if (direction === 'horizontal') {
        return <Table celled striped definition>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell key='title'>{title}</Table.HeaderCell>
                    {matrix.keys.map(key => <Table.HeaderCell key={key}>{keyMap[key]}</Table.HeaderCell>)}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {Object.keys(matrix.values).map(name => {
                    return <Table.Row key={name}>
                        <Table.HeaderCell key={name}>{name}</Table.HeaderCell>
                        {matrix.keys.map(key => displayCell(name, key))}
                    </Table.Row>
                })}
                <tr key='footer'>
                </tr>
            </Table.Body>
            <Table.Footer>
                <Table.HeaderCell title='sum'>Összeg</Table.HeaderCell>
                {matrix.keys.map(key => <Table.HeaderCell key={key}>{matrix.sum[key]}</Table.HeaderCell>)}
            </Table.Footer>
        </Table>
    } else {
        return <Table celled striped definition>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell key='title'>{title}</Table.HeaderCell>
                    {Object.keys(matrix.values).map(name => <Table.HeaderCell key={name}>{name}</Table.HeaderCell>)}
                    <Table.HeaderCell key='sum'>Összeg</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {matrix.keys.map(key => {
                    return <Table.Row key={key}>
                        <Table.HeaderCell key='title'>{keyMap[key]}</Table.HeaderCell>
                        {Object.keys(matrix.values).map(name => displayCell(name, key))}
                        <Table.HeaderCell key='sum'>{matrix.sum[key]}</Table.HeaderCell>
                    </Table.Row>
                })}
            </Table.Body>
        </Table>

    }
}