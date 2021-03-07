import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { DomUtils } from '../DomUtils';
import { RendererComponent } from '../RenderUtils';

export const RollRenderer: RendererComponent = ({ children, elem }) => {
    const details = DomUtils.attr(elem, 'details');
    if (details) {
        return <Popup hoverable trigger={<span><Icon name='cube' fitted /> <strong>{children}</strong></span>} wide>
            <Popup.Content>
                {details}
            </Popup.Content>
        </Popup>
    } else {
        return <><Icon name='cube' fitted /> <strong>{children}</strong></>;
    }
}