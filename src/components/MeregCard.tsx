import React from 'react';
import { Card, Table } from 'semantic-ui-react';
import { Mereg, MeregHatas, MEREG_HATOIDOK, MEREG_IDOTARTAM } from '../engine/mereg';

const renderHatas = (hatas: MeregHatas) => {
    if (hatas === 'semmi') {
        return '-'
    } else if (typeof hatas === 'string') {
        return hatas;
    } else {
        return `${hatas.sebzes} FP`;
    }
}

const renderModosito = (input: number) => {
    if (input < 0) {
        return `${input}`;
    } if (input === 0) {
        return '-';
    } else {
        return `+${input}`;
    }
}

export const MeregCard: React.FC<{ mereg: Mereg }> = ({ mereg }) => {
    return <Card fluid style={{ filter: 'drop-shadow(5px 5px 3px #333)' }}>
        <Card.Content>
            <Card.Header >{mereg.name}</Card.Header>
            <Card.Description>
                <Table columns={3} compact collapsing celled definition>
                    <Table.Row>
                        <Table.HeaderCell>Erősség</Table.HeaderCell>
                        <Table.Cell>{mereg.erosseg}</Table.Cell>
                        <Table.Cell>Méreg&nbsp;mentő:&nbsp;{renderModosito(4 - mereg.erosseg)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Bevitel módja</Table.HeaderCell>
                        <Table.Cell>{mereg.bevitel}</Table.Cell>
                        <Table.Cell />
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Tipus</Table.HeaderCell>
                        <Table.Cell>{mereg.tipus}</Table.Cell>
                        <Table.Cell />
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Hatóidő</Table.HeaderCell>
                        <Table.Cell>{mereg.hatoido}</Table.Cell>
                        <Table.Cell>{MEREG_HATOIDOK[mereg.hatoido]}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Időtartam</Table.HeaderCell>
                        <Table.Cell>{mereg.idotartam}</Table.Cell>
                        <Table.Cell>{MEREG_IDOTARTAM[mereg.idotartam]}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Hatás</Table.HeaderCell>
                        <Table.Cell>{renderHatas(mereg.masodlagosHatas)} / {renderHatas(mereg.hatas)}</Table.Cell>
                        <Table.Cell />
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Ár</Table.HeaderCell>
                        <Table.Cell>{mereg.ar}</Table.Cell>
                        <Table.Cell />
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Leírás</Table.HeaderCell>
                        <Table.Cell colspan={2}><p>{mereg.leiras}</p></Table.Cell>
                    </Table.Row>
                </Table>
            </Card.Description>
        </Card.Content>
    </Card>;
}