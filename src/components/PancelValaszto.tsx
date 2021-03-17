import React, { useCallback, useState } from 'react';
import { Button, Grid, GridColumn, GridRow, Header, Modal } from 'semantic-ui-react';
import { Karakter } from '../engine/karakter';
import { Pancel } from '../engine/pancel';
import { PancelEditor } from './PancelEditor';
import { PancelLista } from './PancelLista';

interface PancelValasztoProps {
    pancelok: Array<Pancel>,
    karakter: Karakter,
    save: (karakter: Karakter) => unknown,
    savePancelok: (pancelok: Array<Pancel>) => unknown
}

export const PancelValaszto: React.FC<PancelValasztoProps> = ({ karakter, save, pancelok, savePancelok }) => {

    const [selected, setSelected] = useState<number>();
    const [selectedForDeletion, setSelectedForDeletion] = useState<number>();
    const [editorOpen, setEditorOpen] = useState<boolean>(false);
    const [listEditorOpen, setListEditorOpen] = useState<boolean>(false);

    const saveDeletion = useCallback(() => {
        if (selectedForDeletion !== undefined) {
            karakter.pancelok = karakter.pancelok?.filter((f, i) => i !== selectedForDeletion);
            karakter.valasztottPancel = undefined;
            save(karakter);
        }
    }, [karakter, save, selectedForDeletion]);

    return <Grid columns={3} relaxed>
        <GridRow columns='equal'>
            <GridColumn>
                <Header size='large'>Választható
                    <Button floated='right' secondary disabled={selected === undefined || (karakter.pancelok ?? []).some(p => p.name === pancelok[selected].name)} onClick={() => {
                        karakter.pancelok = karakter.pancelok ?? [];
                        if (selected && karakter.pancelok.every(p => p.name !== pancelok[selected].name)) {
                            karakter.pancelok.push(pancelok[selected]);
                            save(karakter);
                        }
                    }}>Választ</Button>
                    <Modal trigger={<Button floated='right' primary>{selected !== undefined ? 'Módosít' : 'Új'}</Button>}
                        onOpen={() => setListEditorOpen(true)}
                        onClose={() => setListEditorOpen(false)}
                        open={listEditorOpen}>
                        <Modal.Content>
                            <PancelEditor
                                pancel={selected !== undefined ? pancelok[selected] : undefined}
                                submit={f => {
                                    if (selected === undefined) {
                                        pancelok.push(f);
                                    } else {
                                        pancelok[selected] = f;
                                    }
                                    savePancelok(pancelok);
                                    setListEditorOpen(false);
                                }}
                                cancel={() => setListEditorOpen(false)} />
                        </Modal.Content>
                    </Modal>
                    <Button floated='right' negative disabled={selected === undefined} onClick={() => {
                        savePancelok(pancelok.filter((f, i) => i !== selected));
                    }}>Töröl</Button>
                </Header>
                <PancelLista pancelok={pancelok.sort((a, b) => a.name.localeCompare(b.name))} selected={selected} onSelectionChange={setSelected} />
            </GridColumn>
            <GridColumn>
                <Header size='large'>Viselt
                    <Modal trigger={<Button floated='right' primary>{selectedForDeletion !== undefined ? 'Módosít' : 'Új'}</Button>} onOpen={() => setEditorOpen(true)} onClose={() => setEditorOpen(false)} open={editorOpen}>
                        <Modal.Content>
                            <PancelEditor
                                pancel={selectedForDeletion !== undefined ? karakter.pancelok?.[selectedForDeletion] : undefined}
                                submit={p => {
                                    karakter.pancelok = karakter.pancelok ?? [];
                                    if (selectedForDeletion !== undefined) {
                                        karakter.pancelok[selectedForDeletion] = p;
                                    } else {
                                        karakter.pancelok.push(p);
                                    }
                                    save(karakter);
                                    setEditorOpen(false)
                                }}
                                cancel={() => setEditorOpen(false)} />
                        </Modal.Content>
                    </Modal>
                    <Button floated='right' negative disabled={selectedForDeletion === undefined} onClick={saveDeletion}>Töröl</Button>
                </Header>
                <PancelLista pancelok={karakter.pancelok} selected={selectedForDeletion} onSelectionChange={setSelectedForDeletion}></PancelLista>
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
