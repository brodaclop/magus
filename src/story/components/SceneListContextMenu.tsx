import React from 'react';
import { ContextMenu } from './ContextMenu';

export interface ScheneListContextMenuProps {
    onSelected: (selection: 'insertBefore' | 'insertAfter' | 'delete') => unknown
}

export const SceneListContextMenu: React.FC<ScheneListContextMenuProps> = ({ onSelected, children }) => (
    <ContextMenu items={[
        { name: 'insertBefore', content: 'Új elem', icon: 'left arrow' },
        { name: 'delete', content: 'Töröl', icon: 'delete' },
        { name: 'insertAfter', content: 'Új elem', icon: 'right arrow' },
    ]}
        onClicked={item => {
            onSelected(item.name as any);
        }}>
        {children}
    </ContextMenu>
);