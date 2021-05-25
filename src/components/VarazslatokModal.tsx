import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { Varazslatok } from '../pages/Varazslatok';

export const VarazslatokModal: React.FC<{}> = () => {
    return <Modal trigger={<Button positive>Mágia</Button>}>
        <Modal.Content>
            <Varazslatok />
        </Modal.Content>
    </Modal>
}