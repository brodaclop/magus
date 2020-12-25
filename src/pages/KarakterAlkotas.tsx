import React, { useEffect, useState } from 'react';
import { Button, Grid, GridColumn, GridRow, Input, Label } from 'semantic-ui-react';
import { v4 } from 'uuid';
import { DobasMatrix } from '../engine/dobasmatrix';
import { FEGYVERTELEN, HARCERTEK_DISPLAY_NAMES } from '../engine/harc';
import { calculateHarcertek, folottiResz, Karakter, KarakterKepesseg, szintlepes } from '../engine/karakter';
import { FAJ_KEPESSEG, Kaszt, KASZTOK, KEPESSEG_NEV } from '../engine/kasztok';
import { DobasMatrixDisplay } from '../components/DobasMatrixDisplay';
import { EPFP } from '../components/EPFP';
import { KarakterAlkotasBackground } from '../components/KarakterAlkotasBackground';

const NumberInput: any = require('semantic-ui-react-numberinput').default;

export interface BackgroundSelection {
    name: string;
    faj?: string;
    kaszt?: string;
    manual?: Kaszt;
    szint?: number;
}


const calculateKepessegek = ({ kaszt, faj, manual }: { kaszt?: string, faj?: string, manual?: Kaszt }, roll?: boolean) => {
    const newMatrix = new DobasMatrix(Object.keys(KEPESSEG_NEV));
    if (manual) {
        newMatrix.add('Kaszt: ' + kaszt, manual.kepesseg as unknown as Record<string, string>);
    } else if (kaszt && KASZTOK[kaszt]) {
        newMatrix.add('Kaszt: ' + kaszt, KASZTOK[kaszt].kepesseg as unknown as Record<string, string>);
    }
    if (faj && FAJ_KEPESSEG[faj]) {
        newMatrix.add('Faj: ' + faj, FAJ_KEPESSEG[faj] as unknown as Record<string, string>);
    }
    if (roll || manual) {
        newMatrix.roll();
    }
    return newMatrix;
}

const createKarakter = ({ kaszt, faj, manual, szint, name }: BackgroundSelection, kepessegek: DobasMatrix) => {
    const kasztOb = manual ?? KASZTOK[kaszt ?? ''];
    if (!kasztOb || !kepessegek.sum || !faj) {
        return null;
    }
    const epfp = kasztOb.epfp;
    const ep = epfp.ep + folottiResz(kepessegek.sum.egs);
    const fp = epfp.fp + folottiResz(kepessegek.sum.ae) + folottiResz(kepessegek.sum.ak);
    const karakter: Karakter = {
        id: v4(),
        name,
        faj,
        categories: [],
        kepessegek: kepessegek.sum as unknown as KarakterKepesseg,
        kaszt: kasztOb,
        szint: 0,
        hm: 0,
        maxEp: ep,
        maxFp: fp,
        ep,
        fp,
        hmHarcertek: { ke: 0, te: 0, ve: 0, ce: 0 },
        kepzettsegek: [],
        alapHarcertek: kasztOb.alapHarcertek,
        fegyverek: [FEGYVERTELEN]
    };
    [...Array(szint).keys()].forEach(() => szintlepes(karakter));
    return karakter;
};



export const KarakterAlkotas: React.FC<{ save: (karakter: Karakter) => unknown }> = ({ save }) => {
    const [backgroundSelection, setBackgroundSelection] = useState<BackgroundSelection>({ szint: 1, name: '' });
    const [matrix, setMatrix] = useState<DobasMatrix>(new DobasMatrix(Object.keys(KEPESSEG_NEV)));

    useEffect(() => {
        setMatrix(calculateKepessegek({ kaszt: backgroundSelection.kaszt, faj: backgroundSelection.faj, manual: backgroundSelection.manual }));
    }, [backgroundSelection.manual, backgroundSelection.faj, backgroundSelection.kaszt, setMatrix]);

    const dob = () => {
        setMatrix(calculateKepessegek(backgroundSelection, true));
    };



    const kaszt = backgroundSelection.manual ?? KASZTOK[backgroundSelection.kaszt ?? ''];
    const karakter = kaszt ? {
        kepessegek: matrix.sum as unknown as KarakterKepesseg,
        alapHarcertek: kaszt.alapHarcertek,
        hmHarcertek: kaszt.hm.kotelezo,
        maxEp: kaszt.epfp.ep + folottiResz(matrix.sum.egs),
        maxFp: kaszt.epfp.fp + folottiResz(matrix.sum.ae) + folottiResz(matrix.sum.ak),
        ep: kaszt.epfp.ep + folottiResz(matrix.sum.egs),
        fp: kaszt.epfp.fp + folottiResz(matrix.sum.ae) + folottiResz(matrix.sum.ak)
    } : undefined;

    const kezi = backgroundSelection.manual;

    return <Grid relaxed>
        <GridRow columns={2} divided>
            <GridColumn>
                <GridRow>
                    <KarakterAlkotasBackground backgroundSelection={backgroundSelection} setBackgroundSelection={setBackgroundSelection} />
                </GridRow>
                {karakter && <>
                    <div>
                        <Button as='div' basic floated='left'>
                            <Label basic>Elosztható HM:</Label>
                            {backgroundSelection.manual ? <NumberInput size='mini' allowEmptyValue value={backgroundSelection.manual.hm.szabad} stepAmount={1} minValue={0} maxValue={1000} onChange={(e: string) => {
                                if (backgroundSelection.manual) {
                                    backgroundSelection.manual.hm.szabad = Number(e);
                                    setBackgroundSelection({ ...backgroundSelection });
                                }
                            }} /> : <Label basic>{kaszt.hm.szabad}</Label>}
                        </Button>
                        <Button as='div' basic floated='right'>
                            <Label basic>Szintenkénti FP:</Label>
                            {kezi && <Input value={kaszt.epfp.fpPerSzint} onChange={e => {
                                kezi.epfp.fpPerSzint = e.target.value;
                                setBackgroundSelection({ ...backgroundSelection, manual: kezi })
                            }} />}
                            {!kezi && <Label basic>{kaszt.epfp.fpPerSzint}</Label>}
                        </Button>
                    </div>
                    <div><DobasMatrixDisplay
                        title='Harcértékek'
                        editable={kezi ? ['alap', 'hm'] : []}
                        setValue={(name, key, value) => {
                            if (kezi) {
                                if (name === 'alap') {
                                    (kezi.alapHarcertek as any)[key] = value;
                                } else if (name === 'hm') {
                                    (kezi.hm.kotelezo as any)[key] = value;
                                }
                                setBackgroundSelection({ ...backgroundSelection, manual: kezi })
                            }
                        }}
                        matrix={calculateHarcertek(karakter, FEGYVERTELEN).roll(['te', 've', 'ce', 'ke'])}
                        direction='vertical'
                        keyMap={HARCERTEK_DISPLAY_NAMES} />
                    </div>
                    <div>
                        <EPFP
                            title='Életerő 0. szinten'
                            ep={karakter.ep}
                            fp={karakter.fp}
                            maxEp={karakter.maxEp}
                            maxFp={karakter.maxFp}
                            onChange={(ep, fp) => {
                                if (kezi) {
                                    kezi.epfp.ep = ep - folottiResz(matrix.sum.egs);
                                    kezi.epfp.fp = fp - folottiResz(matrix.sum.ae) - folottiResz(matrix.sum.ak);
                                    setBackgroundSelection({ ...backgroundSelection, manual: kezi })
                                }
                            }}
                            maxChange={kezi !== undefined}
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
                    editable={kezi ? ['Kaszt: egyéb'] : []}
                    setValue={(name, key, value) => kezi && setBackgroundSelection({ ...backgroundSelection, manual: { ...kezi, kepesseg: { ...kezi.kepesseg, [key]: value } } })} />
            </GridColumn>
        </GridRow>
        <GridRow columns={1} textAlign='center'>
            <GridColumn>
                <Button disabled={!!kezi} secondary onClick={dob}>Dob</Button>
                <Button disabled={!backgroundSelection.name || backgroundSelection.szint === undefined || !matrix.sum} primary onClick={() => { const kar = createKarakter(backgroundSelection, matrix); if (kar) { save(kar) } }}>Ment</Button>
            </GridColumn>
        </GridRow>
    </Grid>
}