import React from 'react';
import { Button, ButtonGroup, Label } from 'semantic-ui-react';
import { DiceRoll, formatDiceRoll } from '../engine/roll';

export const DobasInput: React.FC<{ value: DiceRoll, onChange: (dobas: DiceRoll) => unknown }> = ({ value, onChange }) => {

    const setDie = (die: number) => {
        if (value.die === die) {
            value.numDice++;
        } else {
            value.die = die;
            value.numDice = 1;
        }
        onChange(value);
    }

    const addPlus = (plus: number) => {
        value.plus += plus;
        onChange(value);
    }

    const toggleKf = () => {
        value.kf = !value.kf;
        onChange(value);
    }

    const toggle2x = () => {
        value.tries = (value.tries > 1) ? 1 : 2;
        onChange(value);
    }

    return <ButtonGroup fluid size='tiny' labelPosition='left'>
        <Label basic>{formatDiceRoll(value)}</Label>
        <Button color='olive' onClick={() => setDie(0)}>-</Button>
        <Button color='olive' onClick={() => setDie(6)}>k6</Button>
        <Button color='olive' onClick={() => setDie(10)}>k10</Button>
        <Button onClick={() => addPlus(-1)}>-1</Button>
        <Button onClick={() => addPlus(1)}>+1</Button>
        <Button color='orange' onClick={() => toggleKf()}>+kf</Button>
        <Button color='blue' onClick={() => toggle2x()}>2x</Button>
    </ButtonGroup>
}