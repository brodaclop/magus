import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Button, Card, Dropdown, DropdownItemProps, Table } from 'semantic-ui-react';
import { DobasMatrix } from '../engine/dobasmatrix';
import { FEGYVERTELEN, FegyverUtils, HARCERTEK_DISPLAY_NAMES, SZITUACIOK } from '../engine/harc';
import { calculateHarcertek, calculateSebesulesHatrany, Karakter } from '../engine/karakter';
import { DiceRollResult, formatDiceRoll, parseDiceRoll, roll, sumRolls } from '../engine/roll';
import { DobasEredmeny } from './DobasEredmeny';
import { PointsTable } from './PointsTable';
import { SzituacioSelector } from './SzituacioSelector';

export interface KombatCardProps {
    karakter: Karakter,
    save: (karakter: Karakter) => unknown,
    dobasEredmeny: Record<string, DiceRollResult>,
    setDobasEredmeny(value: Record<string, DiceRollResult>): unknown,
}


export const KombatCard: React.ForwardRefExoticComponent<KombatCardProps & React.RefAttributes<unknown>> = forwardRef(({ karakter, save, dobasEredmeny, setDobasEredmeny }, ref) => {
    const [szituaciok, setSzituaciok] = useState<Array<string>>([]);

    const fegyver = karakter.valasztottFegyver !== undefined ? karakter.fegyverek[karakter.valasztottFegyver] : FEGYVERTELEN;
    const harcertekMatrix = calculateHarcertek(karakter, fegyver, szituaciok.map(sz => ({ ...SZITUACIOK[sz], name: sz }))).roll(['ke', 'te', 'ce', 've']);
    const sebzesRoll = sumRolls(harcertekMatrix.getRolls('sebzes')) ?? parseDiceRoll();

    useImperativeHandle(ref, () => ({
        rollKe: () => {
            return roll('1k10+' + harcertekMatrix.sum.ke);
        },
        rollTe: () => {
            return roll('1k100+' + harcertekMatrix.sum.te);
        },
        rollCe: () => {
            return roll('1k100+' + harcertekMatrix.sum.ce);
        },
        rollSebzes: () => {
            return roll(sebzesRoll, FegyverUtils.tipus(fegyver) === 'lofegyver');
        },
    }), [harcertekMatrix, sebzesRoll, fegyver]);


    const fegyverCsere = (v?: number) => {
        karakter.valasztottFegyver = v === undefined ? undefined : Number(v);
        save(karakter);
    };

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
            case 'sebzes': return <><Button circular color='orange' onClick={() => {
                setDobasEredmeny({ ...dobasEredmeny, 'sebzes': roll(sebzesRoll, FegyverUtils.tipus(fegyver) === 'lofegyver') });
            }}>{formatDiceRoll(sebzesRoll)}</Button><DobasEredmeny result={dobasEredmeny.sebzes} /></>
            case 'ke': return <><Button circular color='olive' onClick={() => setDobasEredmeny({ ...dobasEredmeny, 'ke': roll('1k10+' + harcertekMatrix.sum[name]) })}>{harcertekMatrix.sum[name]}</Button><DobasEredmeny result={dobasEredmeny.ke} /></>
            case 'ce':
            case 'te': return <><Button circular color='purple' onClick={() => setDobasEredmeny({ ...dobasEredmeny, [name]: roll('1k100+' + harcertekMatrix.sum[name]) })}>{harcertekMatrix.sum[name]}</Button><DobasEredmeny result={dobasEredmeny[name]} /></>
            case 've': return harcertekMatrix.sum[name];
        }
    }

    const headerColour = () => {
        const down = karakter.ep <= 0 || karakter.fp <= 0;
        if (down) {
            return 'darkgrey';
        }
        const hatrany = calculateSebesulesHatrany(karakter);
        if (!hatrany) {
            return 'white';
        }
        if (hatrany.te === -10) {
            return 'bisque';
        }
        if (hatrany.te === -20) {
            return 'coral';
        }
    }

    return <Card fluid style={{ backgroundColor: headerColour(), filter: 'drop-shadow(5px 5px 3px #333)' }}>
        <Card.Content>
            <Card.Header >{karakter.name}</Card.Header>
            <Card.Description>
                <PointsTable
                    points={[{ name: 'ep', label: 'ÉP', max: karakter.maxEp, akt: karakter.ep }, { name: 'fp', label: 'FP', max: karakter.maxFp, akt: karakter.fp }]}
                    onChange={(name, value) => {
                        (karakter as any)[name] = value;
                        save(karakter);
                    }}
                />
                <Table columns={2} singleLine>
                    <Table.Header>
                        <Table.HeaderCell colSpan={2}>
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
                </Table>
            </Card.Description>
        </Card.Content>
        <Card.Content extra textAlign='center'>
            <SzituacioSelector szituaciok={szituaciok} setSzituaciok={setSzituaciok} />
        </Card.Content>
    </Card >
});