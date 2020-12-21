import React, { useCallback, useReducer, useState } from 'react';
import { DiceRollResult, formatDiceRoll, parseDiceRoll, roll } from '../engine/roll';
import { DobasEredmeny } from '../components/DobasEredmeny';
import { Button, Grid, GridRow, Input, Label } from 'semantic-ui-react';

const DICE_ROLLS = [2, 3, 5, 6, 10, 100];
const PLUS = [1, 2, 3, 5, 10];
const HISTORY_LENGTH = 10;

export const Kockadobo: React.FC<{}> = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState({} as DiceRollResult);
    const [history, addToHistory] = useReducer((prev: Array<string>, elem: string) => {
        if (prev[0] === elem) {
            return prev;
        }
        return [elem, ...prev.slice(0, HISTORY_LENGTH - 1)];
    }, []);

    const dob = useCallback(() => {
        setResult(roll(input));
        addToHistory(input);
    }, [input, setResult, addToHistory]);

    const setKocka = useCallback((k: number) => {
        const diceRoll = parseDiceRoll(input);
        if (diceRoll.die === k) {
            diceRoll.numDice++;
        } else {
            diceRoll.die = k;
            diceRoll.numDice = 1;
        }
        setInput(formatDiceRoll(diceRoll));
    }, [input, setInput]);

    const setPlus = useCallback((k: number) => {
        const diceRoll = parseDiceRoll(input);
        if (k === 0) {
            diceRoll.plus = 0;
        } else {
            diceRoll.plus += k;
        }
        setInput(formatDiceRoll(diceRoll));
    }, [input, setInput]);


    return <Grid>
        <GridRow>
            <Input labelPosition='right' value={input} onChange={e => setInput(e.target.value)}>
                <Label basic pointing='right'>Dobás</Label>
                <input />
                <DobasEredmeny pointing='left' result={result} />
                <Button primary disabled={!input} onClick={dob}>Dob</Button>
            </Input>
        </GridRow>
        <GridRow>
            <Button as='div' labelPosition='left'>
                <Label basic pointing='right'>Kocka</Label>
                {DICE_ROLLS.map(r => <Button onClick={() => setKocka(r)}>k{r}</Button>)}
            </Button>
        </GridRow>
        <GridRow>
            <Button as='div' labelPosition='left'>
                <Label basic pointing='right'>Plusz</Label>
                {[...PLUS].reverse().map(r => <Button onClick={() => setPlus(-r)}>-{r}</Button>)}
                <Button secondary onClick={() => setPlus(0)}>0</Button>
                {PLUS.map(r => <Button onClick={() => setPlus(r)}>+{r}</Button>)}
            </Button>
        </GridRow>
        <GridRow>
            <Button as='div' labelPosition='left'>
                <Label basic pointing='right'>Ó, újra</Label>
                {history.map(h => <Button color='olive' onClick={() => setInput(h)}>{h}</Button>)}
            </Button>
        </GridRow>
    </Grid>
}