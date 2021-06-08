import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { Karakter } from '../engine/karakter';
import { Varazslatok } from '../pages/Varazslatok';

export const VarazslatokModal: React.FC<{ karakter?: Karakter, save?: (karakter: Karakter) => unknown }> = ({ karakter, save }) => {
    return <Modal trigger={<Button positive>Mágia</Button>}>
        <Modal.Content>
            <Varazslatok karakter={karakter} save={save} />
        </Modal.Content>
    </Modal>
}