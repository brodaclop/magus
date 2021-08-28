import React from 'react';
import { Modal, Button, Card } from 'semantic-ui-react';
import { DobasMatrix } from '../engine/dobasmatrix';
import { SZITUACIOK } from '../engine/harc';
import { DobasMatrixDisplay } from './DobasMatrixDisplay';

export const SzituaciokModal: React.FC<{}> = () => <Modal trigger={<Button basic style={{ marginLeft: '1em' }} color='green'>Harci helyzetek</Button>}>
    <Card fluid>
        <DobasMatrixDisplay
            direction='horizontal'
            title='Harci helyzet'
            hideSum
            displayPlusSign
            keyMap={{ 'ke': 'KÉ', 'te': 'TÉ', 've': 'VÉ', 'ce': 'CÉ' }}
            matrix={Object.keys(SZITUACIOK).reduce((acc, curr) => acc.add(curr, SZITUACIOK[curr] as unknown as Record<string, number>), new DobasMatrix(['ke', 'te', 've', 'ce']))}
        />
    </Card>
</Modal>