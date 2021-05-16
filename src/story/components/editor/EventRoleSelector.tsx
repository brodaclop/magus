import React from 'react';
import { Dropdown, DropdownItemProps, Label } from 'semantic-ui-react';
import { ROLE_ICONS } from '../StoryEvent';

const options: Array<DropdownItemProps> = Object.keys(ROLE_ICONS).map(role => ({
    key: role,
    value: role,
    text: role,
    icon: ROLE_ICONS[role]
}));

export const EventRowSelector: React.FC<{ role?: string, onRoleSelected(role?: string): unknown }> = ({ role, onRoleSelected }) => (
    <>
        <Label pointing='right'>
            Event role:
        </Label>
        <Dropdown
            placeholder='Select Role'
            labeled
            selection
            value={role}
            onChange={(e, { value }) => { onRoleSelected(value as string) }}
            options={options}
        >
        </Dropdown>
    </>
)