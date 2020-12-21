import React, { useCallback, useEffect, useState } from 'react';
import { Button, Grid, GridColumn, GridRow, Input, Label } from 'semantic-ui-react';
import { v4 } from 'uuid';
import { DobasMatrix } from '../engine/dobasmatrix';
import { FEGYVERTELEN, HARCERTEK_DISPLAY_NAMES } from '../engine/harc';
import { calculateHarcertek, folottiResz, Karakter, KarakterKepesseg, szintlepes } from '../engine/karakter';
import { FAJ_KEPESSEG, FOKASZTOK, Kaszt, KASZTOK, KepessegDobas, KEPESSEG_NEV } from '../engine/kasztok';
import { DobasMatrixDisplay } from './DobasMatrixDisplay';
import { EPFP } from './EPFP';
import { Selection } from './Selection';

const NumberInput: any = require('semantic-ui-react-numberinput').default;

export const KarakterAlkotas: React.FC<{ save: (karakter: Karakter) => unknown }> = ({ save }) => {
    const [selectedKaszt, setSelectedKaszt] = useState('');
    const [selectedFaj, setSelectedFaj] = useState('');
    const [matrix, setMatrix] = useState<DobasMatrix>(new DobasMatrix(Object.keys(KEPESSEG_NEV)));
    const [nev, setNev] = useState('');
    const [szint, setSzint] = useState<number | undefined>(1);
    const [kezi, setKezi] = useState<Kaszt>();

    const updateMatrix = useCallback((kaszt: string, faj: string, manual: KepessegDobas | undefined, roll?: boolean) => {
        const newMatrix = new DobasMatrix(Object.keys(KEPESSEG_NEV));
        if (manual) {
            newMatrix.add('Kaszt: ' + kaszt, manual as unknown as Record<string, string>);
        } else if (KASZTOK[kaszt]) {
            newMatrix.add('Kaszt: ' + kaszt, KASZTOK[kaszt].kepesseg as unknown as Record<string, string>);
        }
        if (FAJ_KEPESSEG[faj]) {
            newMatrix.add('Faj: ' + faj, FAJ_KEPESSEG[faj] as unknown as Record<string, string>);
        }
        if (roll || manual) {
            newMatrix.roll();
        }
        setMatrix(newMatrix);
    }, [setMatrix]);

    useEffect(() => {
        updateMatrix(selectedKaszt, selectedFaj, kezi?.kepesseg);
    }, [selectedFaj, selectedKaszt, kezi, updateMatrix]);

    const dob = useCallback(() => {
        updateMatrix(selectedKaszt, selectedFaj, kezi?.kepesseg, true);
    }, [updateMatrix, selectedFaj, selectedKaszt, kezi])


    const changeKasztSelection = useCallback((s: string) => {
        setSelectedKaszt(s);
        if (s === 'egyéb') {
            setKezi(JSON.parse(JSON.stringify(KASZTOK['egyéb'])));
        } else {
            setKezi(undefined);
        }
    }, [setSelectedKaszt])

    const createKarakter = useCallback(() => {
        const kaszt = kezi ?? KASZTOK[selectedKaszt];
        if (!kaszt || !matrix.sum) {
            return null;
        }
        const epfp = kaszt.epfp;
        const ep = epfp.ep + folottiResz(matrix.sum.egs);
        const fp = epfp.fp + folottiResz(matrix.sum.ae) + folottiResz(matrix.sum.ak);
        const karakter: Karakter = {
            id: v4(),
            categories: [],
            kepessegek: matrix.sum as unknown as KarakterKepesseg,
            name: nev,
            kaszt: kaszt,
            faj: selectedFaj,
            szint: 0,
            hm: 0,
            maxEp: ep,
            maxFp: fp,
            ep,
            fp,
            hmHarcertek: { ke: 0, te: 0, ve: 0, ce: 0 },
            kepzettsegek: [],
            alapHarcertek: kaszt.alapHarcertek,
            fegyverek: [FEGYVERTELEN]
        };
        [...Array(szint).keys()].forEach(() => szintlepes(karakter));
        return karakter;
    }, [selectedFaj, selectedKaszt, matrix, nev, szint, kezi])


    const kaszt = kezi ?? KASZTOK[selectedKaszt];
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
                    <div>
                        <div>
                            <Input fluid labelPosition='left' placeholder='Karakter neve...' error={!nev} value={nev} onChange={e => setNev(e.target.value)}>
                                <Label pointing='right' basic>Név</Label>
                                <input />
                            </Input>
                        </div>
                        <div><Selection label='Kaszt' selected={selectedKaszt} setSelected={changeKasztSelection} options={Object.keys(KASZTOK)} structure={FOKASZTOK} /></div>
                        <div><Selection label='Faj' selected={selectedFaj} setSelected={setSelectedFaj} options={Object.keys(FAJ_KEPESSEG)} /></div>
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
                        {kezi && <div>
                            <Input labelPosition='left' error={!kezi.name} value={kezi.name} onChange={e => {
                                kezi.name = e.target.value;
                                setKezi({ ...kezi });
                            }}>
                                <Label pointing='right' basic>Kaszt neve</Label>
                                <input />
                            </Input>
                        </div>}
                    </div>
                </GridRow>
                {karakter && <>
                    <div>
                        <Button as='div' basic floated='left'>
                            <Label basic>Elosztható HM:</Label>
                            {kezi && <NumberInput size='mini' allowEmptyValue value={kezi.hm.szabad} stepAmount={1} minValue={0} maxValue={1000} onChange={(e: string) => {
                                kezi.hm.szabad = Number(e);
                                setKezi({ ...kezi });
                            }} />}
                            {!kezi && <Label basic>{kaszt.hm.szabad}</Label>}
                        </Button>
                        <Button as='div' basic floated='right'>
                            <Label basic>Szintenkénti FP:</Label>
                            {kezi && <Input value={kaszt.epfp.fpPerSzint} onChange={e => {
                                kezi.epfp.fpPerSzint = e.target.value;
                                setKezi({ ...kezi });
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
                                setKezi({ ...kezi });
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
                                    setKezi({ ...kezi });
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
                    setValue={(name, key, value) => kezi && setKezi({ ...kezi, kepesseg: { ...kezi.kepesseg, [key]: value } })} />
            </GridColumn>
        </GridRow>
        <GridRow columns={1} textAlign='center'>
            <GridColumn>
                <Button disabled={!!kezi} secondary onClick={dob}>Dob</Button>
                <Button disabled={!nev || !szint} primary onClick={() => { const kar = createKarakter(); if (kar) { save(kar) } }}>Ment</Button>
            </GridColumn>
        </GridRow>
    </Grid>
}