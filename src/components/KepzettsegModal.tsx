import React, { useState } from 'react';
import { Modal, Button, Grid, GridColumn, GridRow, Input, Label, Select } from 'semantic-ui-react';
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
            <div style={{ marginBottom: '0.5rem' }}>
                <Input fluid labelPosition='left' placeholder='Képzettség...' error={!kepzettseg} value={kepzettseg} onChange={e => setKepzettseg(e.target.value)}>
                    <Label pointing='right' basic>Képzettség</Label>
                    <input />
                    <Button circular color='olive' style={{ marginLeft: '1rem' }} onClick={() => setKepzettseg('Nehézvértviselet')}>Nehézvértviselet</Button>
                    <Button circular color='olive' style={{ marginLeft: '1rem' }} onClick={() => setKepzettseg('Kétkezes harc')}>Kétkezes harc</Button>
                    <Button circular color='olive' style={{ marginLeft: '1rem' }} onClick={() => setKepzettseg('Pajzshasználat')}>Pajzshasználat</Button>
                </Input>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
                <Grid columns={4}>
                    <GridColumn width={3}>
                        <Button as='div' labelPosition='left'>
                            <Label pointing='right'>
                                Szint
                    </Label>
                            <Button color={szint === 'Af' ? 'black' : 'olive'} onClick={() => setSzint('Af')}>Af</Button>
                            <Button color={szint === 'Mf' ? 'black' : 'olive'} onClick={() => setSzint('Mf')}>Mf</Button>
                        </Button>
                    </GridColumn>
                    <GridColumn width={6} textAlign='center'>
                        {['1', '2', '3', '4', '5'].map(i => <Button color={szint === i ? 'black' : 'olive'} circular onClick={() => setSzint(i as any)}>{i}</Button>)}
                    </GridColumn>
                    <GridColumn width={3} textAlign='left'>
                        <IntegerInput labelPosition='right' label='Százalék' value={typeof szint === 'number' ? szint : undefined} onChange={v => setSzint(v)} />
                    </GridColumn>
                    <GridColumn width={4} textAlign='right'>
                        <IntegerInput labelPosition='right' label='Elköltött KP' value={kp} onChange={v => setKp(v)} />
                    </GridColumn>
                </Grid>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
                <Button disabled={!kepzettseg || szint === undefined} onClick={saveKepzettseg}>Ment</Button>
            </div>
        </Modal.Content>
    </Modal>
}