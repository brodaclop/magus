import React from 'react';
import { Icon, SemanticCOLORS, Table } from 'semantic-ui-react';
import { Pancel } from '../engine/pancel';

interface PancelListaProps {
    pancelok?: Array<Pancel>,
    selected?: number,
    onSelectionChange?: (newSelection: number | undefined) => unknown
    extraButton?: JSX.Element;
    color?: SemanticCOLORS
}

export const PancelLista: React.FC<PancelListaProps> = ({ pancelok, selected, onSelectionChange, extraButton, color }) => {

    return <Table compact celled striped definition selectable={onSelectionChange !== undefined} color={color}>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Páncél</Table.HeaderCell>
                <Table.HeaderCell>SFÉ</Table.HeaderCell>
                <Table.HeaderCell>MGT</Table.HeaderCell>
                <Table.HeaderCell>Nehéz</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {pancelok?.map((r, i) => <Table.Row key={i} active={selected === i} onClick={() => onSelectionChange?.(selected === i ? undefined : i)}>
                <Table.Cell>{r.name}</Table.Cell>
                <Table.Cell>{r.sfe}</Table.Cell>
                <Table.Cell>{r.mgt}</Table.Cell>
                <Table.Cell>{r.nehez && <Icon compact color='green' name='check' />}</Table.Cell>
            </Table.Row>
            )}
            {extraButton && <Table.Row key='__extra'>
                <Table.Cell colspan={4}>{extraButton}</Table.Cell>
            </Table.Row>}
        </Table.Body>
    </Table>
}