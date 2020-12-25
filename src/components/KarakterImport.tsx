import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Karakter } from '../engine/karakter';
import DragAndDrop from './DragAndDrop';

export const KarakterImport: React.FC<{ save: (karakter: Karakter) => unknown }> = ({ save }) => {
    return <DragAndDrop
        dragPlaceholder={<Button circular as='div' color='green'><Icon name='upload' />Import</Button>}
        handleDrop={async l => {
            const text = await l.item(0)?.text();

            if (text) {
                save(JSON.parse(text));
            }
        }}>
        <Button circular basic as='div' color='green'><Icon name='upload' />Import</Button>
    </DragAndDrop>

}