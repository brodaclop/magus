import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Input } from 'semantic-ui-react';

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
        return <form onSubmit={() => { setEdited(false); onChange(editedText) }}><Input transparent autoFocus value={editedText} onChange={(e, { value }) => { setEditedText(value) }} onBlur={() => { setEdited(false); onChange(editedText) }} /></form>
    } else {
        return <span onClick={() => setEdited(true)}>{text ?? ''}</span>;
    }
});
