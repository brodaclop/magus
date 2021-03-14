import React, { useEffect, useState } from 'react';
import { Input } from 'semantic-ui-react';

export interface EditableTextProps {
    text?: string;
    onChange: (text: string) => unknown;
}

export const EditableText: React.FC<EditableTextProps> = ({ text, onChange }) => {
    const [editedText, setEditedText] = useState<string>('');
    const [edited, setEdited] = useState<boolean>(false);
    useEffect(() => {
        setEditedText(text ?? '');
    }, [text]);
    if (edited) {
        return <form onSubmit={() => { setEdited(false); onChange(editedText) }}><Input transparent autoFocus value={editedText} onChange={(e, { value }) => { setEditedText(value) }} onBlur={() => { setEdited(false); onChange(editedText) }} /></form>
    } else {
        return <span onClick={() => setEdited(true)}>{text ?? ''}</span>;
    }
}