import React from 'react';
import { List, Icon, SemanticICONS } from 'semantic-ui-react';
import { DOMElement, DomUtils } from '../utils/DomUtils';
import { Renderer } from '../utils/RenderUtils';
import { CommentEditorModal } from './CommentEditorModal';
import { CommentList } from './CommentList';
import { StoryContextMenu } from './StoryContextMenu';

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
    operation?: 'insertAfter' | 'insertBefore' | 'delete' | 'edit';
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
    const role = DomUtils.attr(event, 'role').toString() || 'normal';
    const status = DomUtils.attr(event, 'status');

    return <List.Item style={{ backgroundColor: status === 'completed' ? '#eefeee' : undefined }}>
        <List.Icon name={iconForRole(role)} />
        <List.Content>
            <StoryContextMenu setEditedEvent={setEditedEvent}>
                {renderer.renderElement(event)}
            </StoryContextMenu>
        </List.Content>
        <List.Content floated='right'>
            <div style={{ float: 'right' }}>
                <CommentEditorModal addComment={addComment} />
                <Icon name='checkmark' color={status === 'completed' ? 'green' : undefined} onClick={onClick} />
            </div>
            <div style={{ clear: 'both' }}>
                <CommentList comments={comments} deleteComment={deleteComment} renderer={renderer} />
            </div>
        </List.Content>

    </List.Item>;
}
