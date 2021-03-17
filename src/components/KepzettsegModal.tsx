import React, { useState } from 'react';
import { Modal, Button, Grid, GridColumn, GridRow, Input, Label } from 'semantic-ui-react';
import { Karakter, Kepzettseg } from '../engine/karakter';
import { IntegerInput } from './IntegerInput';

export const KepzettsegModal: React.FC<{ karakter: Karakter; save: (karakter: Karakter) => unknown }> = ({ karakter, save }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [kepzettseg, setKepzettseg] = useState<string>();
    const [szint, setSzint] = useState<number | '1' | '2' | '3' | '4' | '5' | 'Af' | 'Mf'>();
    const [kp, setKp] = useState<number>();

    const saveKepzettseg = () => {
        karakter.kepzettsegek = karakter.kepzettsegek ?? [];
        if (kepzettseg && szint !== undefined) {
            const curr = karakter.kepzettsegek.findIndex(k => k.name === kepzettseg);
            const newKepzettseg: Kepzettseg = {
                name: kepzettseg,
                szint,
                kp: kp ?? 0
            }
            if (curr !== -1) {
                karakter.kepzettsegek[curr] = newKepzettseg;
            } else {
                karakter.kepzettsegek.push(newKepzettseg);
            }
            save(karakter);
            setSzint(undefined);
            setKp(undefined);
            setKepzettseg('');
        }
    }

    return <Modal trigger={<Button primary>Képzettségek szerkesztése</Button>} onOpen={() => setModalOpen(true)} onClose={() => setModalOpen(false)} open={modalOpen}>
        <Modal.Content>
            <Grid>
                <GridRow>
                    <GridColumn>
                        <div>
                            <Input fluid labelPosition='left' placeholder='Képzettség...' error={!kepzettseg} value={kepzettseg} onChange={e => setKepzettseg(e.target.value)}>
                                <Label pointing='right' basic>Képzettség</Label>
                                <input />
                            </Input>
                        </div>
                        <div>
                            <Button as='div' labelPosition='left'>
                                <Label pointing='right'>
                                    Szint
                                </Label>
                                <Button color={szint === 'Af' ? 'black' : 'olive'} onClick={() => setSzint('Af')}>Af</Button>
                                <Button color={szint === 'Mf' ? 'black' : 'olive'} onClick={() => setSzint('Mf')}>Mf</Button>
                            </Button>
                            {['1', '2', '3', '4', '5'].map(i => <Button color={szint === i ? 'black' : 'olive'} circular onClick={() => setSzint(i as any)}>{i}</Button>)}
                            <IntegerInput label='Százalék' value={typeof szint === 'number' ? szint : undefined} onChange={v => setSzint(v)} />
                        </div>
                        <div>
                            <IntegerInput label='Elköltött KP' value={kp} onChange={v => setKp(v)} />
                        </div>
                        <div><Button disabled={!kepzettseg || szint === undefined} onClick={saveKepzettseg}>Ment</Button></div>
                    </GridColumn>
                </GridRow>
            </Grid>
        </Modal.Content>
    </Modal>
}