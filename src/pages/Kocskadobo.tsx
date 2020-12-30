import React, { useCallback, useReducer, useState } from 'react';
import { DiceRollResult, formatDiceRoll, parseDiceRoll, roll } from '../engine/roll';
import { DobasEredmeny } from '../components/DobasEredmeny';
import { Button, Dropdown, Grid, GridColumn, GridRow, Header, Input, Label, Segment } from 'semantic-ui-react';
import { IntegerInput } from '../components/IntegerInput';
const { Slider } = require('react-semantic-ui-range');

const DICE_ROLLS = [2, 3, 5, 6, 10, 100];
const PLUS = [1, 2, 3, 5, 10];
const HISTORY_LENGTH = 10;

const MERETEK: Record<string, number> = {
    'óriás': -30,
    'ló': -15,
    'ember': 0,
    'kutya': 20,
    'dinnya': 35,
    'alma': 50,
    'fémpénz': 65
}

const MOZGASOK: Record<string, number> = {
    'mozdulatlan': 0,
    'kiszámíthatóan mozgó': 20,
    'kiszámíthatatlanul mozgó': 35,
    'kitérésre összpontosító': 50

}

const VISZONYOK: Record<string, number> = {
    'napsütés, szélcsend': 0,
    'szemerkélő eső, szellő': 10,
    'gyenge eső/szél': 30,
    'gyenge köd, eső, erős szél': 50,
    'sűrű köd, zivatar, viharos szél': 70,
    'egészen sűrű köd, felhőszakadás, orkán': 100,

}


interface LofegyverVedo {
    tavolsag: number,
    meret: string;
    mozgas: string;
    viszonyok: string;
}

export const Kockadobo: React.FC<{}> = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState({} as DiceRollResult);
    const [history, addToHistory] = useReducer((prev: Array<string>, elem: string) => {
        if (prev[0] === elem) {
            return prev;
        }
        return [elem, ...prev.slice(0, HISTORY_LENGTH - 1)];
    }, []);
    const [lofegyverVedo, setLofegyverVedo] = useState<LofegyverVedo>({ tavolsag: 0, meret: 'ember', mozgas: 'mozdulatlan', viszonyok: 'napsütés, szélcsend' });

    const dob = useCallback((ijasz?: boolean) => {
        setResult(roll(input, ijasz));
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


    return <Grid columns={1} divided='vertically'>
        <GridRow>
            <GridColumn>
                <Header>Kockadobás</Header>
                <div>
                    <Input labelPosition='right' value={input} onChange={e => setInput(e.target.value)}>
                        <Label basic pointing='right'>Dobás</Label>
                        <input />
                        <DobasEredmeny pointing='left' result={result} />
                        <Button.Group color='teal'>
                            <Button primary disabled={!input} onClick={() => dob()}>Dob</Button>
                            <Dropdown
                                className='button icon'
                                floating
                                trigger={<></>}
                            >
                                <Dropdown.Menu>
                                    <Button primary onClick={() => dob(true)}>Íjász szabállyal</Button>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Button.Group>

                    </Input>
                </div>
                <div>
                    <Button as='div' labelPosition='left'>
                        <Label basic pointing='right'>Kocka</Label>
                        {DICE_ROLLS.map(r => <Button onClick={() => setKocka(r)}>k{r}</Button>)}
                    </Button>
                </div>
                <div>
                    <Button as='div' labelPosition='left'>
                        <Label basic pointing='right'>Osztó</Label>
                        {[1, 2, 3].map(r => <Button onClick={() => {
                            const diceRoll = parseDiceRoll(input);
                            diceRoll.div = r;
                            setInput(formatDiceRoll(diceRoll))
                        }}>/{r}</Button>)}
                    </Button>
                </div>
                <div>
                    <Button as='div' labelPosition='left'>
                        <Label basic pointing='right'>Plusz</Label>
                        {[...PLUS].reverse().map(r => <Button onClick={() => setPlus(-r)}>-{r}</Button>)}
                        <Button secondary onClick={() => setPlus(0)}>0</Button>
                        {PLUS.map(r => <Button onClick={() => setPlus(r)}>+{r}</Button>)}
                    </Button>
                </div>
                <div>
                    <Button as='div' labelPosition='left'>
                        <Label basic pointing='right'>Ó, újra</Label>
                        {history.map(h => <Button color='olive' onClick={() => setInput(h)}>{h}</Button>)}
                    </Button>
                </div>
            </GridColumn>
        </GridRow>
        <GridRow>
            <GridColumn>
                <Header>Célzás védő érték</Header>
                <div>
                    <Slider value={lofegyverVedo.tavolsag} settings={{ min: 0, max: 100, step: 1, onChange: (v: number) => setLofegyverVedo({ ...lofegyverVedo, tavolsag: v }) }} />
                    <IntegerInput label='Távolság' value={lofegyverVedo.tavolsag} onChange={v => setLofegyverVedo({ ...lofegyverVedo, tavolsag: Math.min(v ?? 0, 100) })} />
                </div>
                <div>
                    <Button as='div' labelPosition='left'>
                        <Label basic pointing='right'>Méret</Label>
                        {Object.keys(MERETEK).map(r => <Button active={lofegyverVedo.meret === r} onClick={() => setLofegyverVedo({ ...lofegyverVedo, meret: r })}>{r}</Button>)}
                    </Button>
                </div>
                <div>
                    <Button as='div' labelPosition='left'>
                        <Label basic pointing='right'>Mozgás</Label>
                        {Object.keys(MOZGASOK).map(r => <Button active={lofegyverVedo.mozgas === r} onClick={() => setLofegyverVedo({ ...lofegyverVedo, mozgas: r })}>{r}</Button>)}
                    </Button>
                </div>
                <div>
                    <Button as='div' labelPosition='left'>
                        <Label basic pointing='right'>Viszonyok</Label>
                        {Object.keys(VISZONYOK).map(r => <Button active={lofegyverVedo.viszonyok === r} onClick={() => setLofegyverVedo({ ...lofegyverVedo, viszonyok: r })}>{r}</Button>)}
                    </Button>
                </div>
                <div>
                    <Button as='div' labelPosition='left'>
                        <Label basic pointing='right'>Védő érték</Label>
                        <Label color='black' size='large'>{30 + lofegyverVedo.tavolsag + MERETEK[lofegyverVedo.meret] + MOZGASOK[lofegyverVedo.mozgas] + VISZONYOK[lofegyverVedo.viszonyok]}</Label>
                    </Button>
                </div>
            </GridColumn>
        </GridRow>
    </Grid>
}