import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { DOMElement, DomUtils } from '../utils/DomUtils';
import { EventEditor } from './editor/EventEditor';

export interface EditableTextProps {
    elem?: DOMElement | null;
    root: DOMElement;
    onChange: (elemt: DOMElement) => unknown;
    create: () => unknown;
    readOnly: boolean;
}

export const EditableNode: React.FC<EditableTextProps> = ({ elem, root, onChange, children, create, readOnly }) => {
    const [edited, setEdited] = useState<boolean>(false);

    if (!readOnly) {
        if (!elem) {
            return <Button size='mini' onClick={() => { create(); setTimeout(() => setEdited(true), 0) }}>Create</Button>
        }

        if (!edited && !DomUtils.text(elem)) {
            return <Button size='mini' onClick={() => setEdited(true)}>Edit</Button>
        }
        if (edited) {
            return <EventEditor elem={elem} root={root} onFinished={res => { if (res) { onChange(elem); } setEdited(false) }} />
        }
    }
    return <div onClick={() => setEdited(true)}>{children}</div>;

}