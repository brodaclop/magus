import React from 'react';
import { ContextMenu } from './ContextMenu';
import { EditedEvent } from './StoryEvent';

export interface StoryContextMenuProps {
    setEditedEvent: (editedEvent: EditedEvent) => unknown
}

export const StoryContextMenu: React.FC<StoryContextMenuProps> = ({ setEditedEvent, children }) => (
    <ContextMenu items={[
        { name: 'insertBefore', content: 'Új elem', icon: 'up arrow' },
        { name: 'edit', content: 'Szerkeszt', icon: 'edit' },
        { name: 'delete', content: 'Töröl', icon: 'delete' },
        { name: 'insertAfter', content: 'Új elem', icon: 'down arrow' },
    ]}
        onClicked={item => {
            setEditedEvent({ operation: item.name as any });
        }}>
        {children}
    </ContextMenu>
);