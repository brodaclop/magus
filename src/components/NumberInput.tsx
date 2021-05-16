import React from 'react';
import { Icon } from 'semantic-ui-react';

export const NumberInput: React.FC<{ value: number, onChange: (value: number) => unknown, min: number, max: number, icons?: boolean }> = ({ value, onChange, min, max, icons }) => {
    return <span style={{ whiteSpace: 'nowrap' }}>
        {icons && <Icon compact name='arrow down' style={{ marginRight: '0.25rem' }} onClick={() => { onChange(Math.max(min, value - 1)) }} />}
        <input style={{ width: '3rem' }} value={value} onChange={(e) => {
            const newValue = e.target.value;
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
        }}>
        </input>
        {icons && <Icon compact name='arrow up' style={{ marginLeft: '0.25rem' }} onClick={() => { onChange(Math.min(max, value + 1)) }} />}
    </span>
}