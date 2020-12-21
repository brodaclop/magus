import { DiceRoll, DiceRollResult, parseDiceRoll, roll } from "./roll";

export interface Dobas {
    roll: DiceRoll;
    result?: DiceRollResult;
}

export class DobasMatrix {
    readonly values: Record<string, Record<string, Dobas>>;
    readonly sum: Record<string, number>;

    constructor(readonly keys: Array<string>) {
        this.values = {};
        this.sum = {};
    }

    add = (name: string, dobas: Record<string, string | number>): DobasMatrix => {
        this.values[name] = {};
        if (dobas) {
            this.keys.forEach(key => {
                this.values[name][key] = {
                    roll: parseDiceRoll(dobas[key]?.toString())
                }
            });
        }
        return this;
    };

    roll = (keys?: Array<string>): DobasMatrix => {
        this.keys.filter(key => !keys || keys.indexOf(key) !== -1).forEach(key => {
            Object.keys(this.values).forEach(name => {
                const dobas = this.values[name][key];
                dobas.result = dobas ? roll(dobas.roll) : { value: 0, details: '' };
                this.sum[key] = Object.values(this.values).map(value => value[key].result?.value).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
            });
        })
        return this;
    }

    clearRolls = (): DobasMatrix => {
        this.keys.forEach(key => {
            Object.keys(this.values).forEach(name => {
                const dobas = this.values[name][key];
                delete dobas.result;
            });
        });
        return this;
    }
}

