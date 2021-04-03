import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Grid, GridColumn, GridRow, Input, Label } from 'semantic-ui-react';
import { Fegyver } from '../engine/karakter';
import { IntegerInput } from './IntegerInput';

interface FormValues {
    name: string;
    ke?: number;
    te?: number;
    ve?: number;
    ce?: number;
    lofegyver: boolean;
    lotav?: number;
    sebzes: string;
    tamPerKor?: number;
    erobonusz?: number;
    lassu: boolean;
    pajzs: boolean;
    mgt?: number;
}

export type FEGYVER_KEPZETTSEG = 'képzetlen' | 'Af' | 'Mf';

const convertToFormValues = (fegyver?: Fegyver): FormValues => {
    return {
        name: fegyver?.name ?? '',
        ke: fegyver?.harcertek.ke,
        te: fegyver?.harcertek.te,
        ve: fegyver?.harcertek.ve,
        ce: fegyver?.harcertek.ce,
        lofegyver: (fegyver?.harcertek.ce ?? 0) > 0,
        lotav: fegyver?.lotav,
        sebzes: fegyver?.sebzes ?? '',
        tamPerKor: fegyver?.tamPerKor,
        erobonusz: fegyver?.erobonusz,
        lassu: fegyver?.lassu ?? false,
        pajzs: fegyver?.pajzs ?? false,
        mgt: fegyver?.mgt ?? 0
    }
}

const convertFromFormValues = (fegyver: FormValues): Fegyver => {
    return {
        name: fegyver.name,
        harcertek: {
            ke: fegyver.ke ?? 0,
            te: fegyver.te ?? 0,
            ve: fegyver.ve ?? 0,
            ce: fegyver.ce ?? 0
        },
        lotav: fegyver.lotav,
        sebzes: fegyver.sebzes,
        tamPerKor: fegyver.tamPerKor ?? 1,
        erobonusz: fegyver.erobonusz,
        lassu: fegyver.lassu,
        pajzs: fegyver.pajzs,
        mgt: fegyver.mgt
    }
}

export const FegyverEditor: React.FC<{ kepzettseg?: boolean, fegyver?: Fegyver, submit: (fegyver: Fegyver, kepzettseg?: FEGYVER_KEPZETTSEG) => unknown, cancel: () => unknown }> = ({ fegyver, submit, cancel, kepzettseg }) => {

    const [form, setForm] = useState<FormValues>(convertToFormValues(fegyver));

    useEffect(() => {
        setForm(convertToFormValues(fegyver));
    }, [fegyver]);

    return <Grid columns={1} relaxed>
        <GridRow>
            <GridColumn>
                <div>
                    <Input fluid labelPosition='left' placeholder='Fegyver neve...' error={!form.name} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}>
                        <Label pointing='right' basic>Név</Label>
                        <input />
                    </Input>
                </div>
                <div><IntegerInput value={form.ke} onChange={ke => setForm({ ...form, ke })} label='KÉ' /></div>
                <div>
                    <Label pointing='right' basic>Lőfegyver:</Label>
                    <Checkbox fitted={true} toggle checked={form.lofegyver} onChange={() => setForm({ ...form, lofegyver: !form.lofegyver })}>
                    </Checkbox>
                </div>
                {!form.lofegyver &&
                    <div><IntegerInput value={form.te} onChange={te => setForm({ ...form, te })} label='TÉ' /></div>
                }
                {form.lofegyver &&
                    <div><IntegerInput value={form.ce} onChange={ce => setForm({ ...form, ce })} label='CÉ' /></div>
                }
                <div><IntegerInput value={form.ve} onChange={ve => setForm({ ...form, ve })} label='VÉ' /></div>
                <div>
                    <Input fluid labelPosition='left' placeholder='Fegyver sebzése...' error={!form.sebzes} value={form.sebzes} onChange={e => setForm({ ...form, sebzes: e.target.value })}>
                        <Label pointing='right' basic>Sebzés</Label>
                        <input />
                    </Input>
                </div>
                {form.lofegyver &&
                    <div><IntegerInput value={form.lotav} onChange={lotav => setForm({ ...form, lotav })} label='Lőtáv' /></div>
                }
                <div>
                    <Label pointing='right' basic>Lassú:</Label>
                    <Checkbox fitted={true} toggle checked={form.lassu} onChange={() => setForm({ ...form, lassu: !form.lassu })}>
                    </Checkbox>
                </div>
                <div><IntegerInput value={form.tamPerKor} onChange={tamPerKor => setForm({ ...form, tamPerKor })} label={`Támadás körönként: ${form.lassu ? '1 / ' : ''}`} /></div>
                <div><IntegerInput value={form.erobonusz} onChange={erobonusz => setForm({ ...form, erobonusz })} label={`Minimum erő bónuszhoz:`} /></div>
                <div>
                    <Label pointing='right' basic>Pajzs:</Label>
                    <Checkbox fitted={true} toggle checked={form.pajzs} onChange={() => setForm({ ...form, pajzs: !form.pajzs })}>
                    </Checkbox>
                </div>
                <div><IntegerInput disabled={!form.pajzs} value={form.mgt} onChange={mgt => setForm({ ...form, mgt })} label='MGT' /></div>
            </GridColumn>
        </GridRow>
        <GridRow textAlign='center'>
            <GridColumn>
                {!kepzettseg && <Button onClick={() => submit(convertFromFormValues(form))}>Ment</Button>}
                {kepzettseg &&
                    <Button as='div' labelPosition='left'>
                        <Label pointing='right'>
                            Használat szintje
                    </Label>
                        <Button onClick={() => submit(convertFromFormValues(form), 'képzetlen')}>Képzetlen</Button>
                        <Button secondary onClick={() => submit(convertFromFormValues(form), 'Af')}>Af</Button>
                        <Button primary onClick={() => submit(convertFromFormValues(form), 'Mf')}>Mf</Button>
                    </Button>
                }
                <Button secondary basic onClick={cancel}>Mégse</Button>
            </GridColumn>
        </GridRow>
    </Grid>;
}