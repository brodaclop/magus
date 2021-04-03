import React from 'react';
import { Dropdown, DropdownItemProps } from 'semantic-ui-react';
import { SZITUACIOK } from '../engine/harc';

export const SzituacioSelector: React.FC<{ szituaciok: Array<string>, setSzituaciok: (value: Array<string>) => unknown }> = ({ szituaciok, setSzituaciok }) => {

    const szituacioOptions: Array<DropdownItemProps> = Object.keys(SZITUACIOK).sort().map(nev => ({
        id: nev,
        key: nev,
        value: nev,
        text: nev
    }));

    const renderLabel = (label: any) => ({
        color: 'blue',
        content: `${label.text}`,
    })

    return <>
        <Dropdown multiple simple className='icon' icon=''
            renderLabel={renderLabel}
            text='Harci szituáció'
            onChange={(e, v) => { setSzituaciok([...v.value as Array<string>]) }}
            options={szituacioOptions}
            value={szituaciok}>
        </Dropdown>
    </>
}