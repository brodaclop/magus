import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Grid, GridColumn, GridRow, Input, Label } from 'semantic-ui-react';
import { Pancel } from '../engine/pancel';
import { IntegerInput } from './IntegerInput';



export const PancelEditor: React.FC<{ pancel?: Pancel, submit: (pancel: Pancel) => unknown, cancel: () => unknown }> = ({ pancel, submit, cancel }) => {

    const [form, setForm] = useState<Pancel>(pancel ?? { name: '', mgt: 0, sfe: 0, nehez: false });

    useEffect(() => {
        setForm(pancel ?? { name: '', mgt: 0, sfe: 0, nehez: false });
    }, [pancel]);

    return <Grid columns={1} relaxed>
        <GridRow>
            <GridColumn>
                <div>
                    <Input fluid labelPosition='left' placeholder='Fegyver neve...' error={!form.name} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}>
                        <Label pointing='right' basic>Név</Label>
                        <input />
                    </Input>
                </div>
                <div><IntegerInput value={form.sfe} onChange={sfe => setForm({ ...form, sfe: sfe ?? 0 })} label='SFÉ' /></div>
                <div><IntegerInput value={form.mgt} onChange={mgt => setForm({ ...form, mgt: mgt ?? 0 })} label='MGT' /></div>
                <div>
                    <Label pointing='right' basic>Nehéz:</Label>
                    <Checkbox fitted={true} toggle checked={form.nehez} onChange={() => setForm({ ...form, nehez: !form.nehez })}>
                    </Checkbox>
                </div>
            </GridColumn>
        </GridRow>
        <GridRow textAlign='center'>
            <GridColumn>
                {!!form.name && <Button onClick={() => submit(form)}>Ment</Button>}
                <Button secondary basic onClick={cancel}>Mégse</Button>
            </GridColumn>
        </GridRow>
    </Grid>;
}