import React from 'react';
import { Label } from 'semantic-ui-react';
import { DiceRollResult } from '../engine/roll';

export const DobasEredmeny: React.FC<{ pointing?: 'left' | 'right', result?: DiceRollResult }> = ({ result, pointing }) => {
    return <>
        <Label size='large' pointing={pointing} color='black'>{result?.value}</Label>
        <Label basic><i>{result?.details}</i></Label>
    </>;
}