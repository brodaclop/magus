import React from 'react';
import { Menu, Popup, StrictMenuItemProps } from 'semantic-ui-react';

function createContextFromEvent(e: React.MouseEvent): HTMLElement {
    const left = e.clientX
    const top = e.clientY
    const right = left + 1
    const bottom = top + 1

    return {
        getBoundingClientRect: () => ({
            left,
            top,
            right,
            bottom,

            height: 0,
            width: 0,
        }),
    } as HTMLElement
}

export interface ContextMenuProps {
    items: Array<StrictMenuItemProps>,
    onClicked: (target: StrictMenuItemProps) => unknown;
    onClose: () => unknown;
    event?: React.MouseEvent;
}


export const ContextMenu: React.FC<ContextMenuProps> = ({ children, items, onClicked, onClose, event }) => {
    const contextRef = React.useRef<HTMLElement | null>(null);
    const [open, setOpen] = React.useState(false)

    const close = () => {
        setOpen(false);
        onClose();
    }

    return (
        <>
            {!event && <div
                onContextMenu={(e: React.MouseEvent) => {
                    e.preventDefault()

                    contextRef.current = createContextFromEvent(e)
                    setOpen(true)
                }}
            >
                {children}
            </div>}

            <Popup
                basic
                context={event ? { current: createContextFromEvent(event) } : contextRef}
                onClose={close}
                open={open || !!event}
            >
                <Menu
                    items={items}
                    onItemClick={(_, data) => { close(); onClicked(data) }}
                    secondary
                    vertical
                />
            </Popup>
        </>
    )
}