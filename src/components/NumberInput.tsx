import React from 'react';
import { Input } from 'semantic-ui-react';

export const NumberInput: React.FC<{ value: number, onChange: (value: number) => unknown, min?: number, max?: number }> = ({ value, onChange, min, max }) => {
    return <Input style={{ width: '4rem' }} value={value} onChange={(e, data) => {
        const newValue = data.value;
        if (/^-?\d+$/.test(newValue) || newValue === '') {
            let num = newValue !== '' ? parseInt(newValue) : 0;
            if (min !== undefined && num < min) {
                num = min;
            }
            if (max !== undefined && num > max) {
                num = max;
            }
            onChange(num);
        } else {
            onChange(value);
        }
    }} />;
}