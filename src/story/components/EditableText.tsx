import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Icon, Input } from 'semantic-ui-react';

export interface EditableTextProps {
    text?: string;
    onChange: (text: string) => unknown;
}

export const EditableText = forwardRef<any, EditableTextProps>(({ text, onChange }, ref) => {
    const [editedText, setEditedText] = useState<string>('');
    const [edited, setEdited] = useState<boolean>(false);
    useImperativeHandle(ref, () => ({
        edit: () => setEdited(true)
    }));
    useEffect(() => {
        setEditedText(text ?? '');
    }, [text]);
    if (edited) {
        return <form onSubmit={() => { setEdited(false); onChange(editedText) }}>
            <Input size='mini' autoFocus value={editedText} onChange={(e, { value }) => { setEditedText(value) }} onBlur={() => { setEdited(false); onChange(editedText) }} />
            <Icon name='arrow right' onClick={() => { setEdited(false); onChange(editedText) }} style={{ marginLeft: '0.3em' }} />
        </form>
    } else {
        return <>
            <span>{text ?? ''}</span>
            <Icon name='pencil' onClick={() => setEdited(true)} style={{ marginLeft: '0.3em' }} />
        </>;
    }
});
