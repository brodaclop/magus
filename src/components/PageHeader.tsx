import React from 'react';
import { Icon, Menu, Image } from 'semantic-ui-react';
import { Karakter, KarakterInfo } from '../engine/karakter';
import { CategoriesDropdown } from './CategoriesDropdown';
import { KarakterImport } from './KarakterImport';
import { KockaModal } from './KockaModal';

import logo from '../static/magus.png';
import { PageSelection } from '../App';


interface PageHeaderProps {
    categories: Array<string>;
    currentCategory: string;
    setCurrentCategory: (category: string) => unknown;
    karakter?: Karakter;
    karakterek: Array<KarakterInfo>;
    page: PageSelection;
    setPage: (pageSelection: PageSelection) => unknown;
    save: (karakter: Karakter) => unknown;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ categories, currentCategory, setCurrentCategory, karakter, karakterek, page, setPage, save }) => {
    return <Menu tabular>
        <Menu.Item header>
            <Image src={logo} size='mini' />
        </Menu.Item>
        <CategoriesDropdown categories={categories} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
        {karakterek.map(k => <Menu.Item active={k.id === karakter?.id} name={k.name} onClick={() => setPage({ page: 'karakterlap', karakter: k })}>
        </Menu.Item>)}
        <Menu.Item active={page.page === 'karakteralkoto'} onClick={() => setPage({ page: 'karakteralkoto' })}>
            <Icon name='plus' />
        </Menu.Item>
        <Menu.Item position='right'>
            <KarakterImport save={save} />
            <KockaModal />
        </Menu.Item>
    </Menu>
}