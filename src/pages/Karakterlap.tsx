import React, { useState } from 'react';
import { Button, Confirm, Grid, GridColumn, GridRow, Input, Label, Modal, Table } from 'semantic-ui-react';
import { DobasMatrixDisplay } from '../components/DobasMatrixDisplay';
import { PointsTable } from '../components/PointsTable';
import { FegyverLista } from '../components/FegyverLista';
import { FegyverValaszto } from '../components/FegyverValaszto';
import { HMEloszto } from '../components/HMEloszto';
import { KepzettsegLista } from '../components/KepzettsegLista';
import { DobasMatrix } from '../engine/dobasmatrix';
import { HARCERTEK_DISPLAY_NAMES } from '../engine/harc';
import { calculateHarcertek, calculateMGT, Fegyver, Karakter, KarakterKepesseg, szintlepes } from '../engine/karakter';
import { KEPESSEG_NEV } from '../engine/kasztok';
import fileDownload from 'js-file-download';
import { KepzettsegModal } from '../components/KepzettsegModal';
import { PancelLista } from '../components/PancelLista';
import { PancelValaszto } from '../components/PancelValaszto';
import { Pancel } from '../engine/pancel';
import { EditableText } from '../story/components/EditableText';

interface KarakterlapProps {
    categories: Array<string>,
    karakter: Karakter,
    fegyverek: Array<Fegyver>,
    pancelok: Array<Pancel>,
    savePancelok: (pancelok: Array<Pancel>) => unknown,
    save: (karakter: Karakter) => unknown,
    saveFegyverek: (fegyverek: Array<Fegyver>) => unknown,
    remove: () => unknown
}

export const Karakterlap: React.FC<KarakterlapProps> = ({ karakter, save, remove, categories, fegyverek, saveFegyverek, pancelok, savePancelok }) => {
    const [ujfegyver, setUjFegyver] = useState(false)
    const [ujPancel, setUjPancel] = useState(false)
    const [kategoriak, setKategoriak] = useState(false);
    const [ujKategoria, setUjKategoria] = useState('');
    const [torlesKerdes, setTorlesKerdes] = useState(false);

    const exportKarakter = () => {
        fileDownload(JSON.stringify(karakter), `${karakter.name}.json`, 'text/json');
    }

    const points = [
        { name: 'ep', label: 'ÉP', ...karakter.ep },
        { name: 'fp', label: 'FP', ...karakter.fp }];
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
        <GridColumn width={5} >
            <Table striped definition>
                <Table.Row><Table.Cell>Név:</Table.Cell><Table.Cell><EditableText text={karakter.name} onChange={n => { karakter.name = n; save(karakter); }} /> </Table.Cell></Table.Row>
                <Table.Row><Table.Cell>Faj:</Table.Cell><Table.Cell>{karakter.faj}</Table.Cell></Table.Row>
                <Table.Row><Table.Cell>Kaszt:</Table.Cell><Table.Cell>{karakter.kaszt.name}</Table.Cell></Table.Row>
                <Table.Row><Table.Cell>Szint:</Table.Cell>
                    <Table.Cell>
                        <Button as='div' labelPosition='left'>
                            <Label pointing='right'>
                                {karakter.szint}
                            </Label>
                            <Button secondary onClick={() => { save(szintlepes(karakter)) }}>Szintlépés</Button>
                        </Button>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Kategóriák
                        <Modal trigger={<Button floated='right' size='tiny' circular color='orange'>+</Button>} onOpen={() => setKategoriak(true)} onClose={() => setKategoriak(false)} open={kategoriak} size='fullscreen' title='Új kategória'>
                            <Modal.Header>Új kategória</Modal.Header>
                            <Modal.Content>
                                <Input list='categories' value={ujKategoria} onChange={e => setUjKategoria(e.target.value)} />
                                <datalist id='categories'>
                                    {categories.map(c => <option value={c}>{c}</option>)}
                                </datalist>
                                <Button onClick={() => { karakter.categories.push(ujKategoria); setKategoriak(false); save(karakter) }}>Hozzáad</Button>
                            </Modal.Content>
                        </Modal>

                    </Table.Cell>
                    <Table.Cell>
                        {karakter.categories.map(c => <Label tag>{c}</Label>)}
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell colSpan={2}>
                        <Button onClick={() => setTorlesKerdes(true)} color='red' circular>Karakter törlése</Button>
                        <Confirm
                            open={torlesKerdes}
                            onCancel={() => setTorlesKerdes(false)}
                            onConfirm={() => { setTorlesKerdes(false); remove() }}
                            header='Karakter törlése'
                            content='Tuti?'
                            cancelButton='Nem'
                            confirmButton='De' />
                        <Button onClick={exportKarakter} color='green' circular>Export</Button>
                    </Table.Cell>
                </Table.Row>
            </Table>
            {karakter.hm > 0 && <div><HMEloszto harcertek={karakter.hmHarcertek} hm={karakter.hm} complete={(he, hm) => {
                karakter.hmHarcertek = he;
                karakter.hm = hm;
                save(karakter);
            }} /> </div>}
            <PointsTable
                points={points}
                onChange={(name, max, value) => {
                    (karakter as any)[name][max ? 'max' : 'akt'] = value;
                    save(karakter);
                }}
            />
            <DobasMatrixDisplay
                title='Képességek'
                matrix={kepessegMatrix}
                direction='vertical'
                editable={['alap']}
                numberOnly
                keyMap={KEPESSEG_NEV}
                setValue={(_, key, value) => { karakter.kepessegek[key as keyof KarakterKepesseg] = Number(value); save(karakter); }} />
        </GridColumn>
        <GridColumn width={11} >
            <Grid columns={2}>
                <GridRow>
                    <GridColumn>
                        <DobasMatrixDisplay title='Harcértékek' matrix={calculateHarcertek(karakter).roll(['te', 've', 'ce', 'ke'])} direction='vertical' keyMap={HARCERTEK_DISPLAY_NAMES} />
                        <FegyverLista fegyverek={karakter.fegyverek} selected={karakter.valasztottFegyver} onSelectionChange={f => { karakter.valasztottFegyver = f; save(karakter) }} />
                        <PancelLista pancelok={karakter.pancelok} selected={karakter.valasztottPancel} onSelectionChange={f => { karakter.valasztottPancel = f; save(karakter) }} />
                        <Modal trigger={<Button primary>Fegyverlista módosítása</Button>} onOpen={() => setUjFegyver(true)} onClose={() => setUjFegyver(false)} open={ujfegyver} size='fullscreen'>
                            <Modal.Header>Fegyverlista módosítása</Modal.Header>
                            <Modal.Content>
                                <FegyverValaszto saveFegyverek={saveFegyverek} fegyverek={fegyverek} karakter={karakter} save={k => { save(k); }} />
                            </Modal.Content>
                        </Modal>
                        <Modal trigger={<Button primary>Páncéllista módosítása</Button>} onOpen={() => setUjPancel(true)} onClose={() => setUjPancel(false)} open={ujPancel} size='fullscreen'>
                            <Modal.Header>Páncéllista módosítása</Modal.Header>
                            <Modal.Content>
                                <PancelValaszto savePancelok={savePancelok} pancelok={pancelok} karakter={karakter} save={save} />
                            </Modal.Content>
                        </Modal>
                        <KepzettsegModal karakter={karakter} save={save} />
                    </GridColumn>
                    <GridColumn>
                        {karakter.masodlagosFegyver !== undefined && <div><DobasMatrixDisplay title='Másodlagos harcértékek' matrix={calculateHarcertek(karakter, undefined, true).roll(['te', 've', 'ce', 'ke'])} direction='vertical' keyMap={HARCERTEK_DISPLAY_NAMES} /></div>}
                        <FegyverLista title='Másodlagos fegyver' fegyverek={karakter.fegyverek} selected={karakter.masodlagosFegyver} onSelectionChange={f => { karakter.masodlagosFegyver = f; save(karakter) }} />
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn width={16}>
                        <div><KepzettsegLista kepzettsegek={karakter.kepzettsegek} /></div>
                    </GridColumn>
                </GridRow>
            </Grid>
        </GridColumn>
    </Grid>
}