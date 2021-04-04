import React, { useState } from 'react';
import { Modal, Button, Input, Grid, GridColumn } from 'semantic-ui-react';

export const KategoriaEditor: React.FC<{ categories: Array<string>, save: (value: string) => unknown }> = ({ categories, save }) => {
    const [kategoriak, setKategoriak] = useState(false);
    const [ujKategoria, setUjKategoria] = useState('');

    return <Modal trigger={<Button floated='right' size='tiny' circular color='orange'>+</Button>} onOpen={() => setKategoriak(true)} onClose={() => setKategoriak(false)} open={kategoriak} size='mini' title='Új kategória'>
        <Modal.Header>Új kategória</Modal.Header>
        <Modal.Content>
            <Grid columns={2} fluid relaxed>
                <GridColumn>
                    <Input list='categories' value={ujKategoria} onChange={e => setUjKategoria(e.target.value)} />
                    <datalist id='categories'>
                        {categories.map(c => <option value={c}>{c}</option>)}
                    </datalist>
                </GridColumn>
                <GridColumn>
                    <Button fluid primary onClick={() => { save(ujKategoria); setKategoriak(false); }}>Hozzáad</Button>
                </GridColumn>
            </Grid>
        </Modal.Content>
    </Modal>

}