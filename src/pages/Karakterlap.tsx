import React, { useState } from 'react';
import { Button, Confirm, Grid, GridColumn, GridRow, Input, Label, Modal, Table } from 'semantic-ui-react';
import { DobasMatrixDisplay } from '../components/DobasMatrixDisplay';
import { PointsTable } from '../components/PointsTable';
import { FegyverLista } from '../components/FegyverLista';
import { FegyverValaszto } from '../components/FegyverValaszto';
import { HMEloszto } from '../components/HMEloszto';
import { KepzettsegLista } from '../components/KepzettsegLista';
import { DobasMatrix } from '../engine/dobasmatrix';
import { FEGYVERTELEN, HARCERTEK_DISPLAY_NAMES } from '../engine/harc';
import { calculateHarcertek, Fegyver, Karakter, szintlepes } from '../engine/karakter';
import { KEPESSEG_NEV } from '../engine/kasztok';
import fileDownload from 'js-file-download';
import { KepzettsegModal } from '../components/KepzettsegModal';

interface KarakterlapProps {
    categories: Array<string>,
    karakter: Karakter,
    fegyverek: Array<Fegyver>,
    save: (karakter: Karakter) => unknown,
    saveFegyverek: (fegyverek: Array<Fegyver>) => unknown,
    remove: () => unknown
}

export const Karakterlap: React.FC<KarakterlapProps> = ({ karakter, save, remove, categories, fegyverek, saveFegyverek }) => {
    const [ujfegyver, setUjFegyver] = useState(false)
    const [kategoriak, setKategoriak] = useState(false);
    const [ujKategoria, setUjKategoria] = useState('');
    const [torlesKerdes, setTorlesKerdes] = useState(false);

    const exportKarakter = () => {
        fileDownload(JSON.stringify(karakter), `${karakter.name}.json`, 'text/json');
    }

    return <Grid relaxed>
        <GridRow columns={3}>
            <GridColumn>
                <Table striped definition>
                    <Table.Row><Table.Cell>Név:</Table.Cell><Table.Cell>{karakter.name}</Table.Cell></Table.Row>
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
                    points={(function () {
                        const ret = [
                            { name: 'ep', label: 'ÉP', max: karakter.maxEp, akt: karakter.ep },
                            { name: 'fp', label: 'FP', max: karakter.maxFp, akt: karakter.fp }];
                        if (karakter.pszi) {
                            ret.push({ name: 'pszi', label: 'ΨP', max: karakter.pszi.max, akt: karakter.pszi.akt })
                        }
                        if (karakter.mp) {
                            ret.push({ name: 'mp', label: 'MP', max: karakter.mp.max, akt: karakter.mp.akt })
                        }
                        return ret;
                    })()}
                    onChange={(name, value) => {
                        if (name === 'ep' || name === 'fp') {
                            (karakter as any)[name] = value;
                        } else {
                            (karakter as any)[name].akt = value;
                        }
                        save(karakter);
                    }}
                />
            </GridColumn>
            <GridColumn>
                <div><DobasMatrixDisplay title='Harcértékek' matrix={calculateHarcertek(karakter, karakter.valasztottFegyver !== undefined ? karakter.fegyverek[karakter.valasztottFegyver] : FEGYVERTELEN).roll(['te', 've', 'ce', 'ke'])} direction='vertical' keyMap={HARCERTEK_DISPLAY_NAMES} /></div>
                <FegyverLista fegyverek={karakter.fegyverek} selected={karakter.valasztottFegyver} onSelectionChange={f => { karakter.valasztottFegyver = f; save(karakter) }} />
                <Modal trigger={<Button primary>Fegyverlista módosítása</Button>} onOpen={() => setUjFegyver(true)} onClose={() => setUjFegyver(false)} open={ujfegyver} size='fullscreen'>
                    <Modal.Header>Fegyverlista módosítása</Modal.Header>
                    <Modal.Content>
                        <FegyverValaszto saveFegyverek={saveFegyverek} fegyverek={fegyverek} karakter={karakter} save={k => { save(k); }} />
                    </Modal.Content>
                </Modal>
            </GridColumn>
            <GridColumn>
                <div><DobasMatrixDisplay title='Képességek' matrix={new DobasMatrix(Object.keys(KEPESSEG_NEV)).add('alap', karakter.kepessegek as any).roll()} direction='vertical' keyMap={KEPESSEG_NEV} /></div>
            </GridColumn>
        </GridRow>
        <GridRow>
            <GridColumn>
                <div><KepzettsegLista kepzettsegek={karakter.kepzettsegek} /></div>
                <div><KepzettsegModal karakter={karakter} save={save} /></div>
            </GridColumn>
        </GridRow>
    </Grid>
}