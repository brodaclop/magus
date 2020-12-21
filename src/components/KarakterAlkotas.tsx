import React, { useCallback, useState } from 'react';
import { Button, Grid, GridColumn, GridRow, Input, Label } from 'semantic-ui-react';
import { v4 } from 'uuid';
import { DobasMatrix } from '../engine/dobasmatrix';
import { FEGYVERTELEN } from '../engine/harc';
import { folottiResz, Karakter, KarakterKepesseg, szintlepes } from '../engine/karakter';
import { FAJ_KEPESSEG, FOKASZTOK, KASZTOK, KEPESSEG_NEV } from '../engine/kasztok';
import { roll } from '../engine/roll';
import { DobasMatrixDisplay } from './DobasMatrixDisplay';
import { Selection } from './Selection';

export const KarakterAlkotas: React.FC<{ save: (karakter: Karakter) => unknown }> = ({ save }) => {
    const [selectedKaszt, setSelectedKaszt] = useState('');
    const [selectedFaj, setSelectedFaj] = useState('');
    const [matrix, setMatrix] = useState<DobasMatrix>(new DobasMatrix(Object.keys(KEPESSEG_NEV)));
    const [nev, setNev] = useState('');
    const [szint, setSzint] = useState<number | undefined>(1);

    const updateMatrix = useCallback((kaszt: string, faj: string, roll?: boolean) => {
        const newMatrix = new DobasMatrix(Object.keys(KEPESSEG_NEV));
        if (KASZTOK[kaszt]) {
            newMatrix.add('Kaszt: ' + kaszt, KASZTOK[kaszt].kepesseg as unknown as Record<string, string>);
        }
        if (FAJ_KEPESSEG[faj]) {
            newMatrix.add('Faj: ' + faj, FAJ_KEPESSEG[faj] as unknown as Record<string, string>);
        }
        if (roll) {
            newMatrix.roll();
        }
        setMatrix(newMatrix);
    }, [setMatrix]);

    const dob = useCallback(() => {
        updateMatrix(selectedKaszt, selectedFaj, true);
    }, [updateMatrix, selectedFaj, selectedKaszt])


    const changeKasztSelection = useCallback((s: string) => {
        setSelectedKaszt(s);
        updateMatrix(s, selectedFaj)
    }, [setSelectedKaszt, updateMatrix, selectedFaj])

    const changeFajSelection = useCallback((s: string) => {
        setSelectedFaj(s);
        updateMatrix(selectedKaszt, s)
    }, [setSelectedFaj, selectedKaszt, updateMatrix])

    const saveKarakter = useCallback(() => {
        const epfp = KASZTOK[selectedKaszt].epfp;
        const ep = epfp.ep + folottiResz(matrix.sum.egs);
        const fp = epfp.fp + folottiResz(matrix.sum.ae) + folottiResz(matrix.sum.ak) + roll(epfp.fpPerSzint).value;
        const karakter: Karakter = {
            id: v4(),
            categories: [],
            kepessegek: matrix.sum as unknown as KarakterKepesseg,
            name: nev,
            kaszt: selectedKaszt,
            faj: selectedFaj,
            szint: 0,
            hm: 0,
            maxEp: ep,
            maxFp: fp,
            ep,
            fp,
            hmHarcertek: { ke: 0, te: 0, ve: 0, ce: 0 },
            kepzettsegek: [],
            alapHarcertek: KASZTOK[selectedKaszt].alapHarcertek,
            fegyverek: [FEGYVERTELEN]
        };
        [...Array(szint).keys()].forEach(() => szintlepes(karakter));
        save(karakter);
    }, [save, selectedFaj, selectedKaszt, matrix, nev, szint])

    return <Grid relaxed>
        <GridRow columns={2} divided>
            <GridColumn>
                <div>
                    <div>
                        <Input fluid labelPosition='left' placeholder='Karakter neve...' error={!nev} value={nev} onChange={e => setNev(e.target.value)}>
                            <Label pointing='right' basic>Név</Label>
                            <input />
                        </Input>
                    </div>
                    <div><Selection label='Kaszt' selected={selectedKaszt} setSelected={changeKasztSelection} options={Object.keys(KASZTOK)} structure={FOKASZTOK} /></div>
                    <div><Selection label='Faj' selected={selectedFaj} setSelected={changeFajSelection} options={Object.keys(FAJ_KEPESSEG)} /></div>
                    <div><Input labelPosition='left' error={szint === undefined} value={szint} onChange={e => {
                        if (!e.target.value) {
                            setSzint(undefined);
                        }
                        const value = Number(e.target.value);
                        if (!Number.isNaN(value) && Math.floor(value) === value && value > 0) {
                            setSzint(value);
                        }
                    }}>
                        <Label pointing='right' basic>Szint</Label>
                        <input />
                    </Input>
                    </div>
                </div>
            </GridColumn>
            <GridColumn>
                <DobasMatrixDisplay title='Képességek' matrix={matrix} keyMap={KEPESSEG_NEV} direction='vertical' />
            </GridColumn>
        </GridRow>
        <GridRow columns={1} textAlign='center'>
            <GridColumn>
                <Button secondary onClick={dob}>Dob</Button>
                <Button disabled={!nev || !szint} primary onClick={saveKarakter}>Ment</Button>
            </GridColumn>
        </GridRow>
    </Grid>
}