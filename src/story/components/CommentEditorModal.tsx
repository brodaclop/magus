import React, { useState } from 'react';
import { Button, Icon, Input, Label, Modal } from 'semantic-ui-react';

export interface CommentEditorModalProps {
    addComment: (comment: string) => unknown
}

export const CommentEditorModal: React.FC<CommentEditorModalProps> = ({ addComment }) => {
    const [kommentModal, setKommentModal] = useState(false);
    const [editedKomment, setEditedKomment] = useState('');

    return <Modal trigger={<Icon name='comment' />} onOpen={() => setKommentModal(true)} onClose={() => setKommentModal(false)} open={kommentModal}>
        <Modal.Content>
            <Input fluid labelPosition='left' placeholder='Komment...' error={!editedKomment} value={editedKomment} onChange={e => setEditedKomment(e.target.value)}>
                <Label pointing='right' basic>Komment</Label>
                <input />
                <Button floated='right' disabled={!editedKomment} onClick={() => {
                    addComment(editedKomment);
                    setEditedKomment('');
                    setKommentModal(false);
                }}>Ment</Button>
            </Input>

        </Modal.Content>
    </Modal>
}
