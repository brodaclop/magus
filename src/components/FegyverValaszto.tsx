import React, { useCallback, useState } from 'react';
import { Button, Grid, GridColumn, GridRow, Header, Label, Modal } from 'semantic-ui-react';
import { Fegyver, Karakter, Kepzettseg } from '../engine/karakter';
import { FegyverEditor, FEGYVER_KEPZETTSEG } from './FegyverEditor';
import { FegyverLista } from './FegyverLista';

interface FegyverValasztoProps {
    fegyverek: Array<Fegyver>,
    karakter: Karakter,
    save: (karakter: Karakter) => unknown,
    saveFegyverek: (fegyverek: Array<Fegyver>) => unknown
}

export const FegyverValaszto: React.FC<FegyverValasztoProps> = ({ karakter, save, fegyverek, saveFegyverek }) => {

    const [selected, setSelected] = useState<number>();
    const [selectedForDeletion, setSelectedForDeletion] = useState<number>();
    const [editorOpen, setEditorOpen] = useState<boolean>(false);
    const [listEditorOpen, setListEditorOpen] = useState<boolean>(false);

    const saveSelection = useCallback((kepzettsegSzint: FEGYVER_KEPZETTSEG) => {
        const fegyver = selected !== undefined ? fegyverek[selected] : undefined;
        if (fegyver) {
            addFegyverAndKepzettseg(karakter, fegyver, kepzettsegSzint);
            save(karakter);
        }
    }, [karakter, save, selected, fegyverek]);

    const saveDeletion = useCallback(() => {
        if (selectedForDeletion !== undefined) {
            karakter.fegyverek = karakter.fegyverek.filter((f, i) => i !== selectedForDeletion);
            karakter.valasztottFegyver = 0;
            save(karakter);
        }
    }, [karakter, save, selectedForDeletion]);


    return <Grid columns={3} relaxed>
        <GridRow columns='equal'>
            <GridColumn>
                <Header size='large'>Választható
                    <Modal trigger={<Button floated='right' primary>{selected !== undefined ? 'Módosít' : 'Új'}</Button>}
                        onOpen={() => setListEditorOpen(true)}
                        onClose={() => setListEditorOpen(false)}
                        open={listEditorOpen}>
                        <Modal.Content>
                            <FegyverEditor
                                fegyver={selected !== undefined ? fegyverek[selected] : undefined}
                                submit={f => {
                                    if (selected === undefined) {
                                        fegyverek.push(f);
                                    } else {
                                        fegyverek[selected] = f;
                                    }
                                    saveFegyverek(fegyverek);
                                    setListEditorOpen(false);
                                }}
                                cancel={() => setListEditorOpen(false)} />
                        </Modal.Content>
                    </Modal>
                    <Button floated='right' negative disabled={selected === undefined} onClick={() => {
                        saveFegyverek(fegyverek.filter((f, i) => i !== selected));
                    }}>Töröl</Button>
                    <Button floated='right' as='div' labelPosition='left'>
                        <Label pointing='right'>
                            Képzettség
                        </Label>
                        <Button disabled={selected === undefined} onClick={() => saveSelection('képzetlen')}>Képzetlen</Button>
                        <Button secondary disabled={selected === undefined} onClick={() => saveSelection('Af')}>Af</Button>
                        <Button primary disabled={selected === undefined} onClick={() => saveSelection('Mf')}>Mf</Button>
                    </Button>
                </Header>
                <FegyverLista fegyverek={fegyverek.sort((a, b) => a.name.localeCompare(b.name))} selected={selected} onSelectionChange={setSelected}></FegyverLista>
            </GridColumn>
            <GridColumn>
                <Header size='large'>Viselt
                    <Modal trigger={<Button floated='right' primary>{selectedForDeletion !== undefined ? 'Módosít' : 'Új'}</Button>} onOpen={() => setEditorOpen(true)} onClose={() => setEditorOpen(false)} open={editorOpen}>
                        <Modal.Content>
                            <FegyverEditor
                                kepzettseg
                                fegyver={selectedForDeletion !== undefined ? karakter.fegyverek[selectedForDeletion] : undefined}
                                submit={(f, k) => { addFegyverAndKepzettseg(karakter, f, k ?? 'képzetlen', selectedForDeletion); save(karakter); setEditorOpen(false) }}
                                cancel={() => setEditorOpen(false)} />
                        </Modal.Content>
                    </Modal>
                    <Button floated='right' negative disabled={selectedForDeletion === undefined} onClick={saveDeletion}>Töröl</Button>
                </Header>
                <FegyverLista fegyverek={karakter.fegyverek} selected={selectedForDeletion} onSelectionChange={setSelectedForDeletion}></FegyverLista>
            </GridColumn>
        </GridRow>
        <GridRow columns={1} textAlign='center'>
            <GridColumn>
                <div>
                </div>
            </GridColumn>
        </GridRow>
    </Grid>
}

function addFegyverAndKepzettseg(karakter: Karakter, fegyver: Fegyver, kepzettsegSzint: FEGYVER_KEPZETTSEG, idx?: number) {
    const fIdx = idx ?? karakter.fegyverek.findIndex(f => f.name === fegyver.name);
    if (fIdx === -1) {
        karakter.fegyverek.push({ ...fegyver });
    } else {
        karakter.fegyverek[fIdx] = fegyver;
    }
    karakter.valasztottFegyver = karakter.fegyverek.findIndex(f => f.name === fegyver.name);
    const kepzettsegName = `Fegyverhasználat - ${fegyver.name.toLowerCase()}`;
    karakter.kepzettsegek = (karakter.kepzettsegek ?? []).filter(k => k.name !== kepzettsegName);
    if (kepzettsegSzint !== 'képzetlen') {
        const kepzettseg: Kepzettseg = {
            name: kepzettsegName,
            szint: kepzettsegSzint as any,
            kp: 0
        };
        karakter.kepzettsegek.push(kepzettseg);
    }
}
