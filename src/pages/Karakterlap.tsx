import React from 'react';
import { Button, Grid, GridColumn, GridRow, Modal } from 'semantic-ui-react';
import { DobasMatrixDisplay } from '../components/DobasMatrixDisplay';
import { PointsTable } from '../components/PointsTable';
import { FegyverLista } from '../components/FegyverLista';
import { FegyverValaszto } from '../components/FegyverValaszto';
import { HMEloszto } from '../components/HMEloszto';
import { KepzettsegLista } from '../components/KepzettsegLista';
import { DobasMatrix } from '../engine/dobasmatrix';
import { calculateMGT, Fegyver, folottiResz, Karakter, KarakterKepesseg } from '../engine/karakter';
import { KEPESSEG_NEV } from '../engine/kasztok';
import { PancelLista } from '../components/PancelLista';
import { PancelValaszto } from '../components/PancelValaszto';
import { Pancel } from '../engine/pancel';
import { Pajzsok } from '../components/Pajzsok';
import { Jegyzetek } from '../components/Jegyzetek';
import { Felszereles } from '../components/Felszereles';
import { KarakterTabla } from '../components/KarakterTabla';
import { FegyverKepzettsegLista } from '../components/FegyverKepzettsegLista';
import { HarcertekTable } from '../components/HarcertekTable';
import { SzazalekosKepzettsegLista } from '../components/SzazalekosKepzettsegek';

interface KarakterlapProps {
    categories: Array<string>,
    karakter: Karakter,
    fegyverek: Array<Fegyver>,
    pancelok: Array<Pancel>,
    savePancelok: (pancelok: Array<Pancel>) => unknown,
    save: (karakter: Karakter) => unknown,
    clone: (karakter: Karakter) => Karakter;

    saveFegyverek: (fegyverek: Array<Fegyver>) => unknown,
    remove: () => unknown
}

export const Karakterlap: React.FC<KarakterlapProps> = ({ karakter, save, remove, categories, fegyverek, saveFegyverek, pancelok, savePancelok, clone }) => {

    const eletero = [
        { name: 'ep', label: 'ÉP', ...karakter.ep },
        { name: 'fp', label: 'FP', ...karakter.fp }];
    const points = [];
    if (karakter.pszi) {
        points.push({ name: 'pszi', label: 'ΨP', ...karakter.pszi })
    }
    if (karakter.mp) {
        points.push({ name: 'mp', label: 'MP', ...karakter.mp })
    }

    const mgt = calculateMGT(karakter);
    const kepessegMatrix = new DobasMatrix(Object.keys(KEPESSEG_NEV)).add('alap', karakter.kepessegek as any);
    if (mgt[0] > 0) {
        kepessegMatrix.add('mgt', { gy: -mgt[0], ugy: -mgt[0] });
    }
    kepessegMatrix.roll();



    return <Grid relaxed>
        <GridColumn width={4} >
            <KarakterTabla karakter={karakter} categories={categories} save={save} clone={clone} remove={remove} />
            {karakter.hm > 0 && <div><HMEloszto harcertek={karakter.hmHarcertek} hm={karakter.hm} complete={(he, hm) => {
                karakter.hmHarcertek = he;
                karakter.hm = hm;
                save(karakter);
            }} /> </div>}
            <PointsTable color='olive'
                points={eletero}
                onChange={(name, max, value) => {
                    (karakter as any)[name][max ? 'max' : 'akt'] = value;
                    save(karakter);
                }}
                title='Életerő'
            />
            {points.length > 0 &&
                <PointsTable color='olive'
                    points={points}
                    onChange={(name, max, value) => {
                        (karakter as any)[name][max ? 'max' : 'akt'] = value;
                        save(karakter);
                    }}
                    title='Mágia'
                />}
            <Pajzsok
                pajzs={karakter.pajzs ?? {
                    asztral: { termeszetes: folottiResz(karakter.kepessegek.asz, 10), statikus: 0, dinamikus: 0 },
                    mental: { termeszetes: folottiResz(karakter.kepessegek.ae, 10), statikus: 0, dinamikus: 0 }
                }}
                onChange={pajzs => { karakter.pajzs = pajzs; save(karakter); }}
            />
            <DobasMatrixDisplay
                color='purple'
                title='Képességek'
                matrix={kepessegMatrix}
                direction='vertical'
                editable={['alap']}
                numberOnly
                keyMap={KEPESSEG_NEV}
                setValue={(_, key, value) => { karakter.kepessegek[key as keyof KarakterKepesseg] = Number(value); save(karakter); }} />
        </GridColumn>
        <GridColumn width={12} >
            <Grid columns={2}>
                <GridRow>
                    <GridColumn>
                        <HarcertekTable karakter={karakter} />
                        <FegyverLista color='green' fegyverek={karakter.fegyverek} selected={karakter.valasztottFegyver} onSelectionChange={f => { karakter.valasztottFegyver = f; save(karakter) }}
                            extraButton={<Modal trigger={<Button fluid circular icon='edit' content='Fegyverlista szerkesztése' />} size='fullscreen'>
                                <Modal.Header>Fegyverek</Modal.Header>
                                <Modal.Content>
                                    <FegyverValaszto saveFegyverek={saveFegyverek} fegyverek={fegyverek} karakter={karakter} save={k => { save(k); }} />
                                </Modal.Content>
                            </Modal>} />
                        <PancelLista color='teal' pancelok={karakter.pancelok} selected={karakter.valasztottPancel} onSelectionChange={f => { karakter.valasztottPancel = f; save(karakter) }}
                            extraButton={<Modal trigger={<Button fluid circular icon='edit' content='Páncéllista szerkesztése' />} size='fullscreen'>
                                <Modal.Header>Páncélok</Modal.Header>
                                <Modal.Content>
                                    <PancelValaszto savePancelok={savePancelok} pancelok={pancelok} karakter={karakter} save={save} />
                                </Modal.Content>
                            </Modal>
                            } />
                        <SzazalekosKepzettsegLista karakter={karakter} save={() => save(karakter)} />
                        <FegyverKepzettsegLista karakter={karakter} save={() => save(karakter)} />
                        <KepzettsegLista karakter={karakter} save={() => save(karakter)} />
                    </GridColumn>
                    <GridColumn>
                        {(karakter.masodlagosFegyverMutat ?? true) && <>
                            {karakter.masodlagosFegyver !== undefined && <HarcertekTable karakter={karakter} masodlagos />
                            }
                            <FegyverLista color='green' title='Másodlagos fegyver' fegyverek={karakter.fegyverek} selected={karakter.masodlagosFegyver} onSelectionChange={f => { karakter.masodlagosFegyver = f; save(karakter) }}
                                extraButton={<Modal trigger={<Button fluid circular icon='edit' content='Fegyverlista szerkesztése' />} size='fullscreen'>
                                    <Modal.Header>Fegyverek</Modal.Header>
                                    <Modal.Content>
                                        <FegyverValaszto saveFegyverek={saveFegyverek} fegyverek={fegyverek} karakter={karakter} save={k => { save(k); }} />
                                    </Modal.Content>
                                </Modal>} />
                        </>}
                        <Button fluid circular icon={(karakter.masodlagosFegyverMutat ?? true) ? 'eye slash' : 'eye'} content='Másodlagos fegyver' onClick={() => {
                            karakter.masodlagosFegyverMutat = !(karakter.masodlagosFegyverMutat ?? true);
                            save(karakter);
                        }} />
                        <Felszereles karakter={karakter} save={() => save(karakter)} />
                        <Jegyzetek karakter={karakter} save={() => save(karakter)} />
                    </GridColumn>
                </GridRow>
            </Grid>
        </GridColumn>
    </Grid>
}