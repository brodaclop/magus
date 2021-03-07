import React, { useState } from 'react';
import { List, Modal, Icon, Input, Label, Button, Popup, SemanticICONS } from 'semantic-ui-react';
import { DOMElement, DomUtils } from '../utils/DomUtils';
import { Renderer } from '../utils/RenderUtils';
import { ContextMenu } from './ContextMenu';

export const ROLE_ICONS: Record<string, SemanticICONS> = {
    'normal': 'angle right',
    'entrance': 'sign-in',
    'exit': 'sign-out',
    'info': 'info circle',
    'background': 'film',
    'speech': 'comment alternate outline',
    'warning': 'warning'

}

const iconForRole = (role: string): SemanticICONS => {
    return ROLE_ICONS[role] ?? 'square full';
}

export interface EditedEvent {
    insert?: 'after' | 'before';
}

export interface StoryEventProps {
    event: DOMElement,
    renderer: Renderer,
    onClick: () => unknown,
    addComment: (contents: string) => unknown,
    comments?: DOMElement[],
    deleteComment: (comment: DOMElement) => unknown,
    setEditedEvent: (editedEvent: EditedEvent) => unknown
};

export const StoryEvent: React.FC<StoryEventProps> = ({ event, renderer, onClick, addComment, comments, deleteComment, setEditedEvent }) => {
    const [kommentModal, setKommentModal] = useState(false);
    const [editedKomment, setEditedKomment] = useState('');
    const role = DomUtils.attr(event, 'role').toString() || 'normal';
    const status = DomUtils.attr(event, 'status');
    const renderedEvent = renderer.renderElement(event);
    return <List.Item style={{ backgroundColor: status === 'completed' ? '#eefeee' : undefined }}>
        <List.Icon name={iconForRole(role)} />
        <List.Content>
            <ContextMenu items={[
                { name: 'before', content: 'Új elem', icon: 'up arrow' },
                { name: 'edit', content: 'Szerkeszt', icon: 'edit' },
                { name: 'after', content: 'Új elem', icon: 'down arrow' },
            ]}
                onClicked={item => {
                    switch (item.name) {
                        case 'edit': setEditedEvent({}); break;
                        case 'before': setEditedEvent({ insert: 'before' }); break;
                        case 'after': setEditedEvent({ insert: 'after' }); break;
                    }
                }}>
                {role === 'background' ? <i>{renderedEvent}</i> : role === 'speech' ? <blockquote>{renderedEvent}</blockquote> : renderedEvent}
            </ContextMenu>
        </List.Content>
        <List.Content floated='right'>
            <div style={{ float: 'right' }}>
                <Modal trigger={<Icon name='comment' />} onOpen={() => setKommentModal(true)} onClose={() => setKommentModal(false)} open={kommentModal}>
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

                <Icon name='checkmark' color={status === 'completed' ? 'green' : undefined} onClick={onClick} />
            </div>
            <div style={{ clear: 'both' }}>
                {comments && comments.length ? <Popup hoverable trigger={<List.Description>{comments.length} komment</List.Description>} wide>
                    <List>
                        {comments.map(c => <List.Item><List.Icon name='delete' onClick={() => deleteComment(c)} /><List.Content>{renderer.renderElement(c)}</List.Content></List.Item>)}

                    </List>
                </Popup>
                    : ''
                }
            </div>
        </List.Content>

    </List.Item>;
}
