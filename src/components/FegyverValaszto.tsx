import React, { useCallback, useState } from 'react';
import { Button, Grid, GridColumn, GridRow, Header, Label } from 'semantic-ui-react';
import { FEGYVEREK } from '../engine/harc';
import { Karakter, Kepzettseg } from '../engine/karakter';
import { FegyverLista } from './FegyverLista';

export const FegyverValaszto: React.FC<{ karakter: Karakter, save: (karakter: Karakter) => unknown }> = ({ karakter, save }) => {

    const [selected, setSelected] = useState<number>();
    const [selectedForDeletion, setSelectedForDeletion] = useState<number>();

    const saveSelection = useCallback((kepzettsegSzint: string) => {
        const fegyver = selected !== undefined ? FEGYVEREK[selected] : undefined;
        if (fegyver) {
            if (!karakter.fegyverek.some(f => f.name === fegyver.name)) {
                karakter.fegyverek.push({ ...fegyver });
            }
            karakter.valasztottFegyver = karakter.fegyverek.findIndex(f => f.name === fegyver.name);
            const kepzettsegName = `Fegyverhasználat - ${fegyver.name.toLowerCase()}`;
            karakter.kepzettsegek = karakter.kepzettsegek.filter(k => k.name !== kepzettsegName);
            if (kepzettsegSzint) {
                const kepzettseg: Kepzettseg = {
                    name: kepzettsegName,
                    szint: kepzettsegSzint as any,
                    kp: 0
                };
                karakter.kepzettsegek.push(kepzettseg);
            }
            save(karakter);
        }
    }, [karakter, save, selected]);

    const saveDeletion = useCallback(() => {
        if (selectedForDeletion) {
            karakter.fegyverek = karakter.fegyverek.filter((f, i) => i !== selectedForDeletion);
            karakter.valasztottFegyver = 0;
            save(karakter);
        }
    }, [karakter, save, selectedForDeletion]);


    return <Grid columns={3} relaxed>
        <GridRow columns='equal'>
            <GridColumn>
                <Header size='large'>Választható</Header>
                <FegyverLista fegyverek={FEGYVEREK.sort((a, b) => a.name.localeCompare(b.name))} selected={selected} onSelectionChange={setSelected}></FegyverLista>
            </GridColumn>
            <GridColumn>
                <Header size='large'>Viselt</Header>
                <FegyverLista fegyverek={karakter.fegyverek} selected={selectedForDeletion} onSelectionChange={setSelectedForDeletion}></FegyverLista>
            </GridColumn>
        </GridRow>
        <GridRow columns={1} textAlign='center'>
            <GridColumn>
                <div>
                    <Button as='div' labelPosition='left'>
                        <Label pointing='right'>
                            Használat szintje
                        </Label>
                        <Button disabled={selected === undefined} onClick={() => saveSelection('')}>Képzetlen</Button>
                        <Button secondary disabled={selected === undefined} onClick={() => saveSelection('Af')}>Af</Button>
                        <Button primary disabled={selected === undefined} onClick={() => saveSelection('Mf')}>Mf</Button>
                    </Button>
                    <Button negative disabled={!selectedForDeletion} onClick={saveDeletion}>Töröl</Button>
                </div>
            </GridColumn>
        </GridRow>
    </Grid>
}