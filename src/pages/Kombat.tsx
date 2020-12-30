import React from 'react';
import { CardGroup } from 'semantic-ui-react';
import { KombatCard } from '../components/KombatCard';
import { Karakter } from '../engine/karakter';

export const Kombat: React.FC<{ karakterek: Array<Karakter>; save: (karakter: Karakter) => unknown }> = ({ karakterek, save }) => {
    return <CardGroup itemsPerRow={5}>
        {karakterek.map(k => <KombatCard karakter={k} save={save} />)}
    </CardGroup>
}

