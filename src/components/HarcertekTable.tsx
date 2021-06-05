import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { HARCERTEK_DISPLAY_NAMES } from '../engine/harc';
import { calculateHarcertek, Karakter } from '../engine/karakter';
import { DobasMatrixDisplay } from './DobasMatrixDisplay';

export const HarcertekTable: React.FC<{ karakter: Karakter, masodlagos?: boolean }> = ({ karakter, masodlagos }) => {

    const [dobas, setDobas] = useState<boolean>(false);

    return <>
        <DobasMatrixDisplay
            color='orange'
            title={masodlagos ? 'Másik kéz' : 'Erősebb kéz'}
            matrix={calculateHarcertek(karakter, undefined, masodlagos, dobas).roll(['te', 've', 'ce', 'ke'])}
            direction='vertical'
            keyMap={HARCERTEK_DISPLAY_NAMES} />
        <Button compact circular fluid content={dobas ? 'Dobás' : 'Normál'} icon={dobas ? 'hand lizard outline' : 'hand rock outline'} onClick={() => setDobas(!dobas)} />
    </>

}