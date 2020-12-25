import React from 'react';
import { Button, Label } from 'semantic-ui-react';

interface SelectionProps { label: JSX.Element | string, selected?: string, setSelected: (newValue: string | undefined) => unknown, options: Array<string>, structure?: Record<string, Array<string>> };

export const Selection: React.FC<SelectionProps> = ({ label, selected, setSelected, options, structure }) => {
    if (!structure) {
        return <Button labelPosition='left' as='div'>
            <Label basic pointing='right'>
                {label}
            </Label>
            {options.map(n => <Button active={selected === n} onClick={() => setSelected(n)}>{n}</Button>)}
        </Button>
    } else {
        return <Button labelPosition='left' as='div'>
            <Label basic pointing='right'>
                {label}
            </Label>
            {Object.keys(structure).map(fk => <Button.Group as='div' vertical>
                <Label tag color='yellow'>{fk}</Label>
                {options.filter(o => structure[fk].includes(o)).map((n, i) => <Button compact active={selected === n} onClick={() => setSelected(n)}>{n}</Button>)}
            </Button.Group>
            )}
        </Button>
    }

}