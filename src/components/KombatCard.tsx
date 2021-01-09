import React, { useState } from 'react';
import { Button, Card, Dropdown, DropdownItemProps, Grid, GridColumn, GridRow, Label, Table } from 'semantic-ui-react';
import { FEGYVERTELEN, HARCERTEK_DISPLAY_NAMES, SZITUACIOK } from '../engine/harc';
import { calculateHarcertek, Karakter } from '../engine/karakter';
import { DiceRollResult, formatDiceRoll, parseDiceRoll, roll, sumRolls } from '../engine/roll';
import { DobasEredmeny } from './DobasEredmeny';
import { PointsTable } from './PointsTable';

export const KombatCard: React.FC<{ karakter: Karakter, save: (karakter: Karakter) => unknown }> = ({ karakter, save }) => {
    const [dobasEredmeny, setDobasEredmeny] = useState<DiceRollResult>();
    const [szituaciok, setSzituaciok] = useState<Array<string>>([]);

    const fegyver = karakter.valasztottFegyver !== undefined ? karakter.fegyverek[karakter.valasztottFegyver] : FEGYVERTELEN;
    const harcertekMatrix = calculateHarcertek(karakter, fegyver, szituaciok.map(sz => ({ ...SZITUACIOK[sz], name: sz }))).roll(['ke', 'te', 'ce', 've']);
    const sebzesRoll = sumRolls(harcertekMatrix.getRolls('sebzes')) ?? parseDiceRoll();

    const fegyverCsere = (v?: number) => {
        karakter.valasztottFegyver = v === undefined ? undefined : Number(v);
        save(karakter);
    };

    const szituacioOptions: Array<DropdownItemProps> = Object.keys(SZITUACIOK).map(nev => ({
        id: nev,
        value: nev,
        text: nev
    }));

    const options: Array<DropdownItemProps> = [
        {
            id: -1,
            value: undefined,
            text: 'fegyver nélkül'
        }
    ];
    karakter.fegyverek.forEach((f, i) => options.push({ id: i, value: i, text: f.name }));

    const cellContents = (name: string) => {
        switch (name) {
            case 'sebzes': return <Button circular color='orange' onClick={() => {
                setDobasEredmeny(roll(sebzesRoll, fegyver.harcertek.ce > 0));
            }}>{formatDiceRoll(sebzesRoll)}</Button>
            case 'ke': return <Button circular color='olive' onClick={() => setDobasEredmeny(roll('1k10+' + harcertekMatrix.sum[name]))}>{harcertekMatrix.sum[name]}</Button>
            case 'ce':
            case 'te': return <Button circular color='purple' onClick={() => setDobasEredmeny(roll('1k100+' + harcertekMatrix.sum[name]))}>{harcertekMatrix.sum[name]}</Button>
            case 've': return harcertekMatrix.sum[name];
        }
    }

    return <Card>
        <Card.Content>
            <Card.Header>{karakter.name}</Card.Header>
            <Card.Meta>
                <PointsTable
                    points={[{ name: 'ep', label: 'ÉP', max: karakter.maxEp, akt: karakter.ep }, { name: 'fp', label: 'FP', max: karakter.maxFp, akt: karakter.fp }]}
                    onChange={(name, value) => {
                        (karakter as any)[name] = value;
                        save(karakter);
                    }}
                />
            </Card.Meta>
            <Card.Description>
                <Grid columns={2}>
                    <GridColumn>
                        <GridRow>
                            <Table columns={2} singleLine>
                                <Table.Header>
                                    <Table.HeaderCell colspan={2}>
                                        <Dropdown disabled={false} compact
                                            text={fegyver.name}
                                            onChange={(e, v) => fegyverCsere(v.value !== undefined ? Number(v.value) : undefined)}
                                            options={options}
                                            value={karakter.valasztottFegyver}>
                                        </Dropdown>
                                    </Table.HeaderCell>
                                </Table.Header>
                                {harcertekMatrix.keys.map(m => <Table.Row>
                                    <Table.HeaderCell>{(HARCERTEK_DISPLAY_NAMES as any)[m]}</Table.HeaderCell>
                                    <Table.Cell>{cellContents(m)}</Table.Cell>
                                </Table.Row>
                                )}
                                {fegyver.name !== FEGYVERTELEN.name &&
                                    <Table.Row>
                                        <Table.HeaderCell>Tám/kör</Table.HeaderCell>
                                        <Table.Cell>{`${fegyver.lassu ? '1/' : ''}${fegyver.tamPerKor}`}</Table.Cell>
                                    </Table.Row>
                                }
                                <Table.Row>
                                    <Table.HeaderCell>Dobás</Table.HeaderCell>
                                    <Table.Cell><DobasEredmeny result={dobasEredmeny} /></Table.Cell>
                                </Table.Row>
                            </Table>
                        </GridRow>
                    </GridColumn>
                    <GridColumn textAlign='center'>
                        <GridRow>
                            <Label pointing='below' fluid>Szituáció</Label>
                            <Dropdown disabled={false} multiple
                                text='normál'
                                onChange={(e, v) => { setSzituaciok([...v.value as Array<string>]) }}
                                options={szituacioOptions}
                                value={szituaciok}>
                            </Dropdown>
                        </GridRow>
                    </GridColumn>
                </Grid>
            </Card.Description>
        </Card.Content>
    </Card >
}