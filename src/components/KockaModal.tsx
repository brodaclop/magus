import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { Kockadobo } from '../pages/Kocskadobo';

export const KockaModal: React.FC<{}> = () => {
    const [kockaOpen, setKockaOpen] = useState(false);
    return <Modal trigger={<Button primary>Kocka</Button>} onOpen={() => setKockaOpen(true)} onClose={() => setKockaOpen(false)} open={kockaOpen}>
        <Modal.Content>
            <Kockadobo />
        </Modal.Content>
    </Modal>
}