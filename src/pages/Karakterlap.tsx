import React, { useState } from 'react';
import { Button, Confirm, Grid, GridColumn, GridRow, Input, Label, Modal, Table } from 'semantic-ui-react';
import { DobasMatrixDisplay } from '../components/DobasMatrixDisplay';
import { EPFP } from '../components/EPFP';
import { FegyverLista } from '../components/FegyverLista';
import { FegyverValaszto } from '../components/FegyverValaszto';
import { HMEloszto } from '../components/HMEloszto';
import { KepzettsegLista } from '../components/KepzettsegLista';
import { DobasMatrix } from '../engine/dobasmatrix';
import { HARCERTEK_DISPLAY_NAMES } from '../engine/harc';
import { calculateHarcertek, Karakter, szintlepes } from '../engine/karakter';
import { KEPESSEG_NEV } from '../engine/kasztok';
import fileDownload from 'js-file-download';


export const Karakterlap: React.FC<{ karakter: Karakter, save: (karakter: Karakter) => unknown, remove: () => unknown }> = ({ karakter, save, remove }) => {
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
                                    <Input value={ujKategoria} onChange={e => setUjKategoria(e.target.value)} />
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
                <EPFP {...karakter} onChange={(ep, fp) => { karakter.ep = ep; karakter.fp = fp; save(karakter) }} />
            </GridColumn>
            <GridColumn>
                <div><DobasMatrixDisplay title='Harcértékek' matrix={calculateHarcertek(karakter, karakter.fegyverek[karakter.valasztottFegyver ?? 0]).roll(['te', 've', 'ce', 'ke'])} direction='vertical' keyMap={HARCERTEK_DISPLAY_NAMES} /></div>
                <FegyverLista fegyverek={karakter.fegyverek} selected={karakter.valasztottFegyver ?? 0} onSelectionChange={f => { karakter.valasztottFegyver = f; save(karakter) }} />
                <Modal trigger={<Button primary>Fegyverlista módosítása</Button>} onOpen={() => setUjFegyver(true)} onClose={() => setUjFegyver(false)} open={ujfegyver} size='fullscreen'>
                    <Modal.Header>Fegyverlista módosítása</Modal.Header>
                    <Modal.Content>
                        <FegyverValaszto karakter={karakter} save={k => { save(k); setUjFegyver(false) }} />
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
            </GridColumn>
        </GridRow>

        {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div>
                <FegyverLista fegyverek={karakter.fegyverek} selected={karakter.valasztottFegyver ?? 0} onSelectionChange={f => { karakter.valasztottFegyver = f; save(karakter) }} />
                <FegyverValaszto karakter={karakter} save={save} />
            </div>
        </div>
         */}
    </Grid>
}