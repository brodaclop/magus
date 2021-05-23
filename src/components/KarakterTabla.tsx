import fileDownload from 'js-file-download';
import React, { useState } from 'react';
import { Button, Confirm, Icon, Label, Table } from 'semantic-ui-react';
import { Karakter, szintlepes } from '../engine/karakter';
import { EditableText } from '../story/components/EditableText';
import { KategoriaEditor } from './KategoriaEditor';

interface KarakterTablaProps {
    karakter: Karakter;
    save: (karakter: Karakter) => unknown;
    categories: Array<string>;
    clone: (karakter: Karakter) => Karakter;
    remove: () => unknown

}

export const KarakterTabla: React.FC<KarakterTablaProps> = ({ karakter, save, categories, clone, remove }) => {

    const [torlesKerdes, setTorlesKerdes] = useState(false);

    const exportKarakter = () => {
        fileDownload(JSON.stringify(karakter), `${karakter.name}.json`, 'text/json');
    }


    return <Table striped definition compact>
        <Table.Row><Table.Cell>Név:</Table.Cell><Table.Cell><EditableText text={karakter.name} onChange={n => { karakter.name = n; save(karakter); }} /> </Table.Cell></Table.Row>
        <Table.Row><Table.Cell>Faj:</Table.Cell><Table.Cell>{karakter.faj}</Table.Cell></Table.Row>
        <Table.Row><Table.Cell>Kaszt:</Table.Cell><Table.Cell>{karakter.kaszt.name}</Table.Cell></Table.Row>
        <Table.Row><Table.Cell>Szint:</Table.Cell>
            <Table.Cell>
                <Button as='div' labelPosition='left'>
                    <Label pointing='right'>
                        {karakter.szint}
                    </Label>
                    <Button secondary compact onClick={() => { save(szintlepes(karakter)) }}>Szintlépés</Button>
                </Button>
            </Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Kategóriák
        <       KategoriaEditor categories={categories} save={value => { karakter.categories = [...new Set([...karakter.categories, value])]; save(karakter) }} />
            </Table.Cell>
            <Table.Cell>
                {karakter.categories.map(c => <Label tag>{c} <Icon name='delete' onClick={() => { karakter.categories = karakter.categories.filter(value => value !== c); save(karakter) }} /></Label>)}
            </Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell colSpan={2}>
                <Button onClick={() => setTorlesKerdes(true)} color='red' compact circular>Karakter törlése</Button>
                <Confirm
                    open={torlesKerdes}
                    onCancel={() => setTorlesKerdes(false)}
                    onConfirm={() => { setTorlesKerdes(false); remove() }}
                    header='Karakter törlése'
                    content='Tuti?'
                    cancelButton='Nem'
                    confirmButton='De' />
                <Button onClick={exportKarakter} color='green' circular compact>Export</Button>
                <Button onClick={() => clone(karakter)} color='green' circular compact>Klón</Button>
            </Table.Cell>
        </Table.Row>
    </Table>;
}