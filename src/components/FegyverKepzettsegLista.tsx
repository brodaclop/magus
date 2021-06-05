import React, { useState } from 'react';
import { Button, ButtonGroup, Modal, Table } from 'semantic-ui-react';
import { Karakter, Kepzettseg } from '../engine/karakter';
import { NumberInput } from './NumberInput';

const FH = 'Fegyverhasználat - ';
const FD = 'Fegyverdobás - ';

interface FegyverKepzettseg {
    fegyver: string,
    hasznalat?: { szint: 'Af' | 'Mf', kp?: number },
    dobas?: { szint: 'Af' | 'Mf', kp?: number },
}

const toFegyverKepzettseg = (kepzettsegek: Array<Kepzettseg>, fegyverek: Record<string, FegyverKepzettseg>): Array<FegyverKepzettseg> => {
    const ret: Record<string, FegyverKepzettseg> = fegyverek;
    kepzettsegek.forEach(kepzettseg => {
        if (kepzettseg.name.startsWith(FH) && (kepzettseg.szint === 'Af' || kepzettseg.szint === 'Mf')) {
            const fegyver = kepzettseg.name.slice(FH.length);
            ret[fegyver] = ret[fegyver] ?? { fegyver };
            ret[fegyver].hasznalat = { szint: kepzettseg.szint, kp: kepzettseg.kp }
        }
        if (kepzettseg.name.startsWith(FD) && (kepzettseg.szint === 'Af' || kepzettseg.szint === 'Mf')) {
            const fegyver = kepzettseg.name.slice(FD.length);
            ret[fegyver] = ret[fegyver] ?? { fegyver };
            ret[fegyver].dobas = { szint: kepzettseg.szint, kp: kepzettseg.kp }
        }
    })
    return Object.values(ret).sort((a, b) => a.fegyver.localeCompare(b.fegyver));
}


export const FegyverKepzettsegLista: React.FC<{ karakter: Karakter, save: () => unknown }> = ({ karakter, save }) => {
    const kepzettsegek = toFegyverKepzettseg(karakter.kepzettsegek ?? [], karakter.fegyverek.reduce((acc, curr) => { acc[curr.name.toLowerCase()] = { fegyver: curr.name.toLowerCase() }; return acc; }, {} as Record<string, FegyverKepzettseg>));

    const setKepzettseg = (kepzettseg: FegyverKepzettseg) => {
        if (kepzettseg.hasznalat) {
            const _kep = karakter.kepzettsegek?.find(k => k.name === FH + kepzettseg.fegyver);
            if (_kep) {
                _kep.kp = kepzettseg.hasznalat.kp ?? 0;
                _kep.szint = kepzettseg.hasznalat.szint;
            } else {
                karakter.kepzettsegek = [...(karakter.kepzettsegek ?? []), { name: FH + kepzettseg.fegyver, szint: kepzettseg.hasznalat.szint, kp: kepzettseg.hasznalat.kp ?? 0 }];
            }
        } else {
            // delete
            karakter.kepzettsegek = karakter.kepzettsegek?.filter(k => k.name !== FH + kepzettseg.fegyver);
        }
        if (kepzettseg.dobas) {
            const _kep = karakter.kepzettsegek?.find(k => k.name === FD + kepzettseg.fegyver);
            if (_kep) {
                _kep.kp = kepzettseg.dobas.kp ?? 0;
                _kep.szint = kepzettseg.dobas.szint;
            } else {
                karakter.kepzettsegek = [...(karakter.kepzettsegek ?? []), { name: FD + kepzettseg.fegyver, szint: kepzettseg.dobas.szint, kp: kepzettseg.dobas.kp ?? 0 }];
            }
        } else {
            // delete
            karakter.kepzettsegek = karakter.kepzettsegek?.filter(k => k.name !== FD + kepzettseg.fegyver);
        }
        save();
    }



    return <Table striped celled compact color='pink'>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Fegyveres képzettségek</Table.HeaderCell>
                <Table.HeaderCell collapsing>Haszn.</Table.HeaderCell>
                <Table.HeaderCell collapsing>Dobás</Table.HeaderCell>
                <Table.HeaderCell collapsing>KP</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {kepzettsegek.map((r, i) => <Table.Row>
                <Table.Cell>{r.fegyver}</Table.Cell>
                <Table.Cell collapsing><ButtonGroup compact>
                    <SzintButton r={r} szint='Af' tipus='hasznalat' save={() => setKepzettseg(r)} />
                    <SzintButton r={r} szint='Mf' tipus='hasznalat' save={() => setKepzettseg(r)} />
                </ButtonGroup></Table.Cell>
                <Table.Cell collapsing><ButtonGroup compact>
                    <SzintButton r={r} szint='Af' tipus='dobas' save={() => setKepzettseg(r)} />
                    <SzintButton r={r} szint='Mf' tipus='dobas' save={() => setKepzettseg(r)} />
                </ButtonGroup></Table.Cell>
                <Table.Cell collapsing>
                    <KpEditor kepzettseg={r} save={() => { setKepzettseg(r) }} />
                </Table.Cell>
            </Table.Row>
            )}
        </Table.Body>
    </Table>
}

const SzintButton: React.FC<{ szint: 'Af' | 'Mf', tipus: 'hasznalat' | 'dobas', r: FegyverKepzettseg, save: () => unknown }> = ({ szint, tipus, r, save }) => <Button compact basic color={r[tipus]?.szint === szint ? 'green' : undefined} onClick={() => {
    if (r[tipus]?.szint === szint) {
        r[tipus] = undefined;
    } else {
        r[tipus] = { szint: szint, kp: r[tipus]?.kp ?? 0 };
    }
    save();
}
}>{szint}</Button>


const KpEditor: React.FC<{ kepzettseg: FegyverKepzettseg, save: () => unknown }> = ({ kepzettseg, save }) => {
    const display = <span>{(kepzettseg.hasznalat?.kp || '-') + ' / ' + (kepzettseg.dobas?.kp || '-')}</span>;
    const [open, setOpen] = useState<boolean>(false);
    const [kp, setKp] = useState<[number, number]>([kepzettseg.hasznalat?.kp ?? 0, kepzettseg.dobas?.kp ?? 0]);

    return <Modal size='tiny' trigger={display} open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
        <Modal.Content>
            <Table celled compact color='pink'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Képzettség</Table.HeaderCell>
                        <Table.HeaderCell>KP</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.HeaderCell>
                            Fegyverhasználat
                    </Table.HeaderCell>
                        <Table.Cell>
                            <NumberInput disabled={!kepzettseg.hasznalat} icons min={0} max={99} value={kp[0]} onChange={value => setKp([value, kp[1]])} />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>
                            Fegyverdobás
                    </Table.HeaderCell>
                        <Table.Cell>
                            <NumberInput disabled={!kepzettseg.dobas} icons min={0} max={99} value={kp[1]} onChange={value => setKp([kp[0], value])} />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell colspan={2}>
                            <Button fluid content='Ment' icon='save' compact circular onClick={() => {
                                if (kepzettseg.hasznalat) {
                                    kepzettseg.hasznalat.kp = kp[0];
                                }
                                if (kepzettseg.dobas) {
                                    kepzettseg.dobas.kp = kp[1];
                                }
                                save();
                                setOpen(false)
                            }} />

                        </Table.Cell>
                    </Table.Row>

                </Table.Body>
            </Table>
        </Modal.Content>
    </Modal>

}
