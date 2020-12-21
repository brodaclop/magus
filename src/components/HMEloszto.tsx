import React, { useCallback, useEffect, useState } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Harcertek, HARCERTEK_DISPLAY_NAMES } from '../engine/harc';

const NumberInput: any = require('semantic-ui-react-numberinput').default;

interface State {
    harcertek: Harcertek,
    hm: number
};

export const HMEloszto: React.FC<{ harcertek: Harcertek, hm: number, complete: (harcertek: Harcertek, hm: number) => unknown }> = ({ harcertek, hm, complete }) => {
    const [current, setCurrent] = useState<State>({ harcertek: { ...harcertek }, hm: hm } as State);

    useEffect(() => {
        setCurrent({ harcertek: { ...harcertek }, hm });
    }, [harcertek, hm]);

    const change = useCallback((he: ('ke' | 'te' | 've' | 'ce'), newValue: number) => {
        const newCurrent: State = { ...current };
        newCurrent.harcertek[he] = newValue;
        newCurrent.hm = hm - (Object.keys(newCurrent.harcertek) as Array<any>).reduce((acc, curr: ('ke' | 'te' | 've' | 'ce')) => acc + (newCurrent.harcertek[curr] - harcertek[curr]), 0);
        console.log('hmeloszto', newCurrent);
        setCurrent(newCurrent);
    }, [current, setCurrent, harcertek, hm]);

    return <Table definition striped>
        <Table.Row>
            <Table.Cell>HM:</Table.Cell>
            <Table.Cell colSpan={2}>{current.hm}</Table.Cell>
        </Table.Row>
        {(Object.keys(harcertek) as Array<any>).map((he: ('ke' | 'te' | 've' | 'ce')) => <Table.Row>
            <Table.Cell>{HARCERTEK_DISPLAY_NAMES[he]}:</Table.Cell>
            <Table.Cell><i>{harcertek[he]}</i></Table.Cell>
            <Table.Cell><NumberInput allowEmptyValue size='mini' value={current.harcertek[he]} stepAmount={1} minValue={harcertek[he]} maxValue={(current.harcertek[he] ?? 0) + current.hm} onChange={(e: any) => change(he, Number(e ?? 0))} /></Table.Cell>
        </Table.Row>)}
        <Button onClick={() => complete(current.harcertek, current.hm)}>Eloszt</Button>
    </Table>
}