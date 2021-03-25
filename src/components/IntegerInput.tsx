import React from 'react'
import { Input, Label } from 'semantic-ui-react';

interface IntegerInputProps {
    value?: number,
    onChange: (value?: number) => unknown,
    label?: string;
    labelPosition?: 'left' | 'right';
    mandatory?: boolean;
}


export const IntegerInput: React.FC<IntegerInputProps> = ({ value, onChange, label, labelPosition = 'left', mandatory }) => {
    return <Input labelPosition={labelPosition} error={mandatory && (value === undefined)} value={value ?? ''} onChange={e => {
        const newValue = e.target.value ? Math.max(0, Math.floor(Number(e.target.value))) : undefined;
        if (newValue === undefined || !Number.isNaN(newValue)) {
            onChange(newValue);
        }
    }}>
        {label && labelPosition === 'left' && <Label pointing='right' basic>{label}</Label>}
        <input style={{ width: '5rem' }} />
        {label && labelPosition === 'right' && <Label pointing='left' basic>{label}</Label>}
    </Input>;
}