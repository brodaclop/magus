import React from 'react';
import { Modal } from 'semantic-ui-react';
import { DOMElement, DomUtils } from '../utils/DomUtils';
import { EventEditor } from './editor/EventEditor';
import { EventEditingState } from './StoryScene';

export interface EventEditorModalProps {
    onEditingFinished: (save: boolean) => unknown;
    editedEvent?: EventEditingState;
    root: DOMElement;
}

export const EventEditorModal: React.FC<EventEditorModalProps> = ({ editedEvent, onEditingFinished, root }) => {
    return <Modal style={{ padding: '1em' }} open={editedEvent !== undefined} onClose={() => onEditingFinished(false)}>
        <Modal.Content>
            <div>
                {editedEvent && <EventEditor elem={editedEvent.elem} onFinished={save => {
                    if (save && editedEvent.insert) {
                        DomUtils.addChildElement(editedEvent.elem.$parent as DOMElement, editedEvent.elem, editedEvent.anchor as DOMElement, editedEvent.insert);
                    }
                    onEditingFinished(save);
                }
                } root={root} eventEdited />}
            </div>
        </Modal.Content>
    </Modal>;
}