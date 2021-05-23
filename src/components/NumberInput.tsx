import React from 'react';
import { Icon } from 'semantic-ui-react';

export const NumberInput: React.FC<{ value: number, onChange: (value: number) => unknown, min: number, max: number, icons?: boolean }> = ({ value, onChange, min, max, icons }) => {
    return <span style={{ whiteSpace: 'nowrap' }}>
        {icons && <button onClick={() => { onChange(Math.max(min, value - 1)) }} ><Icon compact name='arrow down' style={{ margin: '0' }} /></button>}
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
        {icons && <button onClick={() => { onChange(Math.min(max, value + 1)) }}><Icon compact name='arrow up' style={{ margin: '0' }} /></button>}
    </span>
}