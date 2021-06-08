import React, { useEffect, useState } from 'react';
import { Icon, Menu, Image, Button } from 'semantic-ui-react';
import { Karakter, KarakterInfo } from '../engine/karakter';
import { CategoriesDropdown } from './CategoriesDropdown';
import { KarakterImport } from './KarakterImport';
import { KockaModal } from './KockaModal';

import logo from '../static/magus.png';
import { PageSelection } from '../App';
import { VarazslatokModal } from './VarazslatokModal';


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

const MAX_KARAKTERS_PER_PAGE = 10;

export const PageHeader: React.FC<PageHeaderProps> = ({ categories, currentCategory, setCurrentCategory, karakter, karakterek, page, setPage, save, saveMese, load }) => {
    const [karakterStart, setKarakterStart] = useState(0);

    const karakterPos = karakterek.findIndex(k => k.id === karakter?.id);

    //adjust scrolling
    useEffect(() => {
        if (karakterPos > -1) {
            if (karakterPos < karakterStart) {
                setKarakterStart(karakterPos);
            }
            if (karakterPos >= karakterStart + MAX_KARAKTERS_PER_PAGE) {
                setKarakterStart(karakterPos - MAX_KARAKTERS_PER_PAGE + 1);
            }
        }
    }, [karakterPos, karakterStart, setKarakterStart]);

    const scrolled = karakterek.length > MAX_KARAKTERS_PER_PAGE;
    const canScrollLeft = karakterStart > 0 && (karakterPos === -1 || karakterPos < karakterStart + MAX_KARAKTERS_PER_PAGE - 1);
    const canScrollRight = (karakterStart + MAX_KARAKTERS_PER_PAGE < karakterek.length) && (karakterPos === -1 || karakterPos > karakterStart);
    const karaktersDisplayed = karakterek.slice(karakterStart, karakterStart + MAX_KARAKTERS_PER_PAGE);

    return <Menu tabular>
        <Menu.Item key='header' header>
            <Image src={logo} size='mini' onClick={() => setPage({ page: page.page === 'story' ? 'home' : 'story' })} />
        </Menu.Item>
        <CategoriesDropdown categories={categories} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
        {scrolled &&
            <Menu.Item key='scroll_left' disabled={!canScrollLeft} onClick={() => setKarakterStart(karakterStart - 1)}>
                <Icon name='triangle left' />
            </Menu.Item>
        }
        {karaktersDisplayed.map(k =>
            <Menu.Item key={k.id} style={{ flexGrow: 1 }} active={k.id === karakter?.id} name={k.name} onClick={() => k.id === karakter?.id ? setPage({ page: 'home' }) : setPage({ page: 'karakterlap', karakter: k })} />
        )}
        <Menu.Item key='new' active={page.page === 'karakteralkoto'} onClick={() => setPage({ page: 'karakteralkoto' })}>
            <Icon name='plus' />
        </Menu.Item>
        {scrolled &&
            <Menu.Item key='scroll_right' disabled={!canScrollRight} onClick={() => setKarakterStart(karakterStart + 1)}>
                <Icon name='triangle right' />
            </Menu.Item>
        }
        <Menu.Item key='floated' position='right'>
            <KarakterImport save={save} saveMese={saveMese} />
            <VarazslatokModal karakter={karakter ? load(karakter) : undefined} save={save} />
            <Button negative onClick={() => setPage({ page: 'kombat', category: currentCategory })}>Kombat</Button>
            <KockaModal />
        </Menu.Item>
    </Menu>
}