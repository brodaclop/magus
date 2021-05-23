import React from 'react';
import { SemanticCOLORS, Table } from 'semantic-ui-react';
import { DobasMatrix } from '../engine/dobasmatrix';
import { formatDiceRoll, parseDiceRoll } from '../engine/roll';
import { DobasEredmeny } from './DobasEredmeny';
import { DobasInput } from './DobasInput';
import { NumberInput } from './NumberInput';

interface DobasMatrixDisplayProps {
    matrix: DobasMatrix,
    keyMap: Record<string, string>,
    direction: 'horizontal' | 'vertical',
    title: string | React.ReactNode,
    setValue?: (name: string, key: string, value: string) => unknown,
    editable?: Array<string>,
    numberOnly?: boolean,
    color?: SemanticCOLORS
}

export const DobasMatrixDisplay: React.FC<DobasMatrixDisplayProps> = ({ matrix, keyMap, direction, title, editable, setValue, numberOnly, color }) => {
    const displayCell = (name: string, key: string) => {
        const value = matrix.values[name][key];
        const constantRoll = (value?.roll?.die ?? 0) === 0;
        const rollString = value?.roll ? formatDiceRoll(value.roll) : '';
        if (!editable?.includes(name)) {
            return <Table.Cell key={name + '-' + key} collapsing>
                {rollString}{!constantRoll && value?.result && <> = <DobasEredmeny result={value?.result} /></>}
            </Table.Cell>;
        } else {
            return <Table.Cell key={name + '-' + key} collapsing>
                {numberOnly ?
                    <NumberInput value={value?.roll.plus ?? 0} onChange={v => setValue?.(name, key, String(v))} min={0} max={100000} />
                    :
                    <DobasInput value={value?.roll ?? parseDiceRoll('')} onChange={e => setValue?.(name, key, formatDiceRoll(e))} />
                }
            </Table.Cell>;
        }
    }

    if (direction === 'horizontal') {
        return <Table celled striped compact color={color}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell key='title' disabled={false}>{title}</Table.HeaderCell>
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
                {matrix.keys.map(key => <Table.HeaderCell key={key} collapsing>{matrix.sum[key]}</Table.HeaderCell>)}
            </Table.Footer>
        </Table>
    } else {
        return <Table celled striped definition compact color={color}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell key='title'>{title}</Table.HeaderCell>
                    {Object.keys(matrix.values).map(name => <Table.HeaderCell key={name}>{name}</Table.HeaderCell>)}
                    <Table.HeaderCell key='sum' collapsing>Összeg</Table.HeaderCell>
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