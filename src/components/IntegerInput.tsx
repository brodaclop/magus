import React from 'react'
import { Input, Label } from 'semantic-ui-react';

interface IntegerInputProps {
    value?: number,
    onChange: (value?: number) => unknown,
    label?: string;
}


export const IntegerInput: React.FC<IntegerInputProps> = ({ value, onChange, label }) => {
    return <Input labelPosition='left' error={value === undefined} value={value ?? ''} onChange={e => {
        const newValue = e.target.value ? Math.max(0, Math.floor(Number(e.target.value))) : undefined;
        if (newValue === undefined || !Number.isNaN(newValue)) {
            onChange(newValue);
        }
    }}>
        {label && <Label pointing='right' basic>{label}</Label>}
        <input />
    </Input>;
}