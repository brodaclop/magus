import React, { useState } from 'react';
import { Icon, SemanticICONS } from 'semantic-ui-react';
import { CommentUtils } from '../utils/CommentUtils';
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
    commentUtils: CommentUtils,
    onChange: () => unknown;
    onContextMenu: (event: React.MouseEvent) => unknown,
    onEdit: () => unknown;
};

export const StoryEvent: React.FC<StoryEventProps> = ({ event, renderer, onClick, commentUtils, onChange, onContextMenu, onEdit }) => {
    const role = DomUtils.attr(event, 'role').toString() || 'normal';
    const status = DomUtils.attr(event, 'status');
    const [active, setActive] = useState(false);

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
        }}
        onMouseEnter={() => !active && setActive(true)}
        onMouseLeave={() => active && setActive(false)}
    >
        <div>
            <ul style={{ listStyle: 'none', margin: '0' }}>
                <li><Icon name={iconForRole(role)} /></li>
                {active && <li style={{ cursor: 'pointer' }}><Icon name='edit' onClick={onEdit} /></li>}
            </ul>
        </div>
        <div style={{ flexGrow: 1, fontSize: 'larger' }}>

            {renderer.renderElement(event)}
        </div>
        <div style={{ textAlign: 'right' }}>
            <CommentEditorModal addComment={content => { commentUtils.add(content); onChange(); }} />
            <Icon name='checkmark' color={status === 'completed' ? 'green' : undefined} onClick={onClick} />
            <CommentList comments={commentUtils.list()} deleteComment={comment => { commentUtils.remove(comment); onChange() }} renderer={renderer} />
        </div>
    </div>
}
