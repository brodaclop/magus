import React from 'react';
import { Dropdown } from 'semantic-ui-react';

interface CategoriesDropdownProps {
    categories: Array<string>;
    currentCategory: string;
    setCurrentCategory: (category: string) => unknown
}

export const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({ currentCategory, setCurrentCategory, categories }) => {
    return <Dropdown item text={`Karakterek: ${currentCategory || 'Összes'}`}>
        <Dropdown.Menu>
            <Dropdown.Item key='__all' onClick={() => setCurrentCategory('')}>Összes</Dropdown.Item>
            {categories.map(k => <Dropdown.Item key={k} onClick={() => setCurrentCategory(k)}>{k}</Dropdown.Item>)}
        </Dropdown.Menu>
    </Dropdown>
}