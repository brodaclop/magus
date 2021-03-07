import React from 'react';
import { Modal } from 'semantic-ui-react';
import { DOMElement, DomUtils } from '../utils/DomUtils';
import { Renderer } from '../utils/RenderUtils';
import { EventEditor } from './editor/EventEditor';
import { EventEditingState } from './StoryScene';

export interface EventEditorModalProps {
    onEditingFinished: () => unknown;
    editedEvent?: EventEditingState;
    renderer: Renderer;
    root: DOMElement;
}

export const EventEditorModal: React.FC<EventEditorModalProps> = ({ editedEvent, onEditingFinished, renderer, root }) => {
    return <Modal open={editedEvent !== undefined} onClose={onEditingFinished}>
        <Modal.Content>
            {editedEvent && <EventEditor event={editedEvent.elem} onFinished={() => {
                if (editedEvent.insert) {
                    DomUtils.addChildElement(editedEvent.elem.$parent as DOMElement, editedEvent.elem, editedEvent.anchor as DOMElement, editedEvent.insert);
                }
                onEditingFinished();
            }
            } renderer={renderer} root={root} />}
        </Modal.Content>
    </Modal>;
}