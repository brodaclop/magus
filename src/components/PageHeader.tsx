import React from 'react';
import { Icon, Menu, Image, Button } from 'semantic-ui-react';
import { Karakter, KarakterInfo } from '../engine/karakter';
import { CategoriesDropdown } from './CategoriesDropdown';
import { KarakterImport } from './KarakterImport';
import { KockaModal } from './KockaModal';

import logo from '../static/magus.png';
import { PageSelection } from '../App';
import { VarazslatokModal } from './VarazslatokModal';
import { MeregModal } from './MeregModal';


interface PageHeaderProps {
    categories: Array<string>;
    currentCategory: string;
    setCurrentCategory: (category: string) => unknown;
    karakter?: KarakterInfo;
    karakterek: Array<KarakterInfo>;
    page: PageSelection;
    setPage: (pageSelection: PageSelection) => unknown;
    load: (karakter: KarakterInfo) => Karakter;
    save: (karakter: Karakter) => unknown;
    saveMese: (story: string) => unknown;
}


export const PageHeader: React.FC<PageHeaderProps> = ({ categories, currentCategory, setCurrentCategory, karakter, karakterek, page, setPage, save, saveMese, load }) => {

    return <>
        <Menu>
            <Menu.Item key='header' header>
                <Image src={logo} size='mini' onClick={() => setPage({ page: page.page === 'story' ? 'home' : 'story' })} />
            </Menu.Item>
            <CategoriesDropdown categories={categories} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
            <div id='buttonrow' style={{ flexGrow: 1, margin: 'auto 2em' }} />
            <Menu.Item key='floated' position='right'>
                <KarakterImport save={save} saveMese={saveMese} />
                <VarazslatokModal karakter={karakter ? load(karakter) : undefined} save={save} />
                <MeregModal />
                <Button negative onClick={() => setPage({ page: 'kombat' })}>Kombat</Button>
                <KockaModal />
            </Menu.Item>
        </Menu>
        {page.page !== 'kombat' && page.page !== 'story' &&
            <Menu fluid compact inverted style={{ flexWrap: 'wrap', marginBottom: '0.5em' }}>
                {karakterek.map(k =>
                    <Menu.Item key={k.id} style={{ flexGrow: 1 }} active={k.id === karakter?.id} name={k.name} onClick={() => k.id === karakter?.id ? setPage({ page: 'home' }) : setPage({ page: 'karakterlap', karakter: k })} />
                )}
                <Menu.Item key='create' onClick={() => setPage({ page: 'karakteralkoto' })}><Icon name='plus' /></Menu.Item>
            </Menu>
        }
    </>
}