import React, { useEffect, useState } from 'react';
import { Button, Grid, GridColumn, GridRow, Input, Label } from 'semantic-ui-react';
import { v4 } from 'uuid';
import { DobasMatrix } from '../engine/dobasmatrix';
import { FEGYVERTELEN, HARCERTEK_DISPLAY_NAMES } from '../engine/harc';
import { calculateHarcertek, folottiResz, Karakter, KarakterKepesseg, szintlepes } from '../engine/karakter';
import { Kaszt, KepessegDobas, KEPESSEG_NEV } from '../engine/kasztok';
import { DobasMatrixDisplay } from '../components/DobasMatrixDisplay';
import { PointsTable } from '../components/PointsTable';
import { KarakterAlkotasBackground } from '../components/KarakterAlkotasBackground';

const NumberInput: any = require('semantic-ui-react-numberinput').default;

export interface BackgroundSelection {
    name: string;
    faj?: string;
    kaszt?: Kaszt;
    szint?: number;
}


const calculateKepessegek = (fajok: Record<string, KepessegDobas>, { kaszt, faj }: { kaszt?: Kaszt, faj?: string }, roll?: boolean) => {
    const newMatrix = new DobasMatrix(Object.keys(KEPESSEG_NEV));
    if (kaszt) {
        newMatrix.add('Kaszt: ' + kaszt.name, kaszt.kepesseg as unknown as Record<string, string>);
    }
    if (faj && fajok[faj]) {
        newMatrix.add('Faj: ' + faj, fajok[faj] as unknown as Record<string, string>);
    }
    if (roll) {
        newMatrix.roll();
    }
    return newMatrix;
}

const createKarakter = ({ kaszt, faj, szint, name }: BackgroundSelection, kepessegek: DobasMatrix) => {
    if (!kaszt || !kepessegek.sum || !faj) {
        return null;
    }
    const epfp = kaszt.epfp;
    const ep = epfp.ep + folottiResz(kepessegek.sum.egs);
    const fp = epfp.fp + folottiResz(kepessegek.sum.ae) + folottiResz(kepessegek.sum.ak);
    const karakter: Karakter = {
        id: v4(),
        name,
        faj,
        categories: [],
        kepessegek: kepessegek.sum as unknown as KarakterKepesseg,
        kaszt,
        szint: 0,
        hm: 0,
        maxEp: ep,
        maxFp: fp,
        ep,
        fp,
        hmHarcertek: { ke: 0, te: 0, ve: 0, ce: 0 },
        kepzettsegek: [],
        alapHarcertek: kaszt.alapHarcertek,
        fegyverek: []
    };
    [...Array(szint).keys()].forEach(() => szintlepes(karakter));
    return karakter;
};



export const KarakterAlkotas: React.FC<{ save: (karakter: Karakter) => unknown, fajok: Record<string, KepessegDobas> }> = ({ save, fajok }) => {
    const [backgroundSelection, setBackgroundSelection] = useState<BackgroundSelection>({ szint: 1, name: '' });
    const [matrix, setMatrix] = useState<DobasMatrix>(new DobasMatrix(Object.keys(KEPESSEG_NEV)));

    useEffect(() => {
        setMatrix(calculateKepessegek(fajok, { kaszt: backgroundSelection.kaszt, faj: backgroundSelection.faj }));
    }, [fajok, backgroundSelection.faj, backgroundSelection.kaszt, setMatrix]);

    const dob = () => {
        setMatrix(calculateKepessegek(fajok, backgroundSelection, true));
    };



    const { kaszt } = backgroundSelection;
    const karakter = kaszt ? {
        kepessegek: matrix.sum as unknown as KarakterKepesseg,
        alapHarcertek: kaszt.alapHarcertek,
        hmHarcertek: kaszt.hm.kotelezo,
        maxEp: kaszt.epfp.ep + folottiResz(matrix.sum.egs),
        maxFp: kaszt.epfp.fp + folottiResz(matrix.sum.ae) + folottiResz(matrix.sum.ak),
        ep: kaszt.epfp.ep + folottiResz(matrix.sum.egs),
        fp: kaszt.epfp.fp + folottiResz(matrix.sum.ae) + folottiResz(matrix.sum.ak)
    } : undefined;

    return <Grid relaxed>
        <GridRow columns={2} divided>
            <GridColumn>
                <GridRow>
                    <KarakterAlkotasBackground backgroundSelection={backgroundSelection} setBackgroundSelection={setBackgroundSelection} fajNevek={Object.keys(fajok)} />
                </GridRow>
                {karakter && <>
                    <div>
                        <Button as='div' basic floated='left'>
                            <Label basic>Elosztható HM:</Label>
                            <NumberInput size='mini' allowEmptyValue value={backgroundSelection.kaszt?.hm.szabad} stepAmount={1} minValue={0} maxValue={1000} onChange={(e: string) => {
                                if (backgroundSelection.kaszt) {
                                    backgroundSelection.kaszt.hm.szabad = Number(e);
                                    setBackgroundSelection({ ...backgroundSelection });
                                }
                            }} />
                        </Button>
                        <Button as='div' basic floated='right'>
                            <Label basic>Szintenkénti FP:</Label>
                            <Input disabled={!kaszt} value={kaszt?.epfp.fpPerSzint} onChange={e => {
                                if (kaszt) {
                                    kaszt.epfp.fpPerSzint = e.target.value;
                                    setBackgroundSelection({ ...backgroundSelection, kaszt })
                                }
                            }} />

                        </Button>
                    </div>
                    <div><DobasMatrixDisplay
                        title='Harcértékek'
                        editable={kaszt ? ['alap', 'hm'] : []}
                        numberOnly
                        setValue={(name, key, value) => {
                            const intValue = Number(value);
                            if (kaszt && !isNaN(intValue)) {
                                if (name === 'alap') {
                                    (kaszt.alapHarcertek as any)[key] = value;
                                } else if (name === 'hm') {
                                    (kaszt.hm.kotelezo as any)[key] = value;
                                }
                                setBackgroundSelection({ ...backgroundSelection, kaszt })
                            }
                        }}
                        matrix={calculateHarcertek(karakter as Karakter).roll(['te', 've', 'ce', 'ke'])}
                        direction='vertical'
                        keyMap={HARCERTEK_DISPLAY_NAMES} />
                    </div>
                    <div>
                        <PointsTable
                            title='Életerő 0. szinten'
                            points={[{ name: 'ep', label: 'ÉP', max: karakter.maxEp, akt: karakter.ep }, { name: 'fp', label: 'FP', max: karakter.maxFp, akt: karakter.fp }]}

                            onChange={(name, value) => {
                                if (kaszt) {
                                    if (name === 'ep') {
                                        kaszt.epfp.ep = value - folottiResz(matrix.sum.egs);
                                    }
                                    if (name === 'fp') {
                                        kaszt.epfp.fp = value - folottiResz(matrix.sum.ae) - folottiResz(matrix.sum.ak);
                                    }
                                    setBackgroundSelection({ ...backgroundSelection, kaszt })
                                }
                            }}
                            maxChange={kaszt !== undefined}
                        />
                    </div>
                </>
                }
            </GridColumn>
            <GridColumn>
                <DobasMatrixDisplay
                    title='Képességek'
                    matrix={matrix}
                    keyMap={KEPESSEG_NEV}
                    direction='vertical'
                    editable={kaszt?.name ? ['Kaszt: ' + kaszt.name] : []}
                    setValue={(name, key, value) => kaszt && setBackgroundSelection({ ...backgroundSelection, kaszt: { ...kaszt, kepesseg: { ...kaszt.kepesseg, [key]: value } } })} />
            </GridColumn>
        </GridRow>
        <GridRow columns={1} textAlign='center'>
            <GridColumn>
                <Button disabled={!kaszt} secondary onClick={dob}>Dob</Button>
                <Button disabled={!backgroundSelection.name || backgroundSelection.szint === undefined || !matrix.sum} primary onClick={() => { const kar = createKarakter(backgroundSelection, matrix); if (kar) { save(kar) } }}>Ment</Button>
            </GridColumn>
        </GridRow>
    </Grid>
}