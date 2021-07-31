import React from 'react';
import { Modal, Button, CardGroup } from 'semantic-ui-react';
import { MERGEK } from '../engine/mereg';
import { MeregCard } from './MeregCard';

export const MeregModal: React.FC<{}> = () => {
    return <Modal size='fullscreen' trigger={<Button primary>Mérgek</Button>}>
        <Modal.Content>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch', justifyContent: 'space-evenly' }}>

                {MERGEK.map(m => <div style={{ maxWidth: '33%', margin: '1em' }}><MeregCard mereg={m} /></div>)}

            </div>
        </Modal.Content>
    </Modal>
}