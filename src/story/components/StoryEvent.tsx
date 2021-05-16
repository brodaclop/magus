import React from 'react';
import { Icon, SemanticICONS } from 'semantic-ui-react';
import { DOMElement, DomUtils } from '../utils/DomUtils';
import { Renderer } from '../utils/RenderUtils';
import { CommentEditorModal } from './CommentEditorModal';
import { CommentList } from './CommentList';

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
    onContextMenu: (event: React.MouseEvent) => unknown
};

export const StoryEvent: React.FC<StoryEventProps> = ({ event, renderer, onClick, addComment, comments, deleteComment, onContextMenu }) => {
    const role = DomUtils.attr(event, 'role').toString() || 'normal';
    const status = DomUtils.attr(event, 'status');

    return <div onContextMenu={e => {
        onContextMenu(e);
        e.preventDefault();
    }} style={
        {
            backgroundColor: status === 'completed' ? '#eefeee' : undefined,
            display: 'flex',
            alignItems: 'start',
            width: '100%',
            justifyContent: 'space-between',
            padding: '1em',
            borderTop: '1px solid #444',
            borderBottom: '1px solid #444',
        }}>
        <div>
            <Icon name={iconForRole(role)} />
        </div>
        <div style={{ flexGrow: 1 }}>

            {renderer.renderElement(event)}
        </div>
        <div style={{ textAlign: 'right' }}>
            <CommentEditorModal addComment={addComment} />
            <Icon name='checkmark' color={status === 'completed' ? 'green' : undefined} onClick={onClick} />
            <CommentList comments={comments} deleteComment={deleteComment} renderer={renderer} />
        </div>
    </div>
}
