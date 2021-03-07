import { Icon } from 'semantic-ui-react';
import { DomUtils } from '../DomUtils';
import { RendererComponent } from '../RenderUtils';

export const SettingRenderer: RendererComponent = ({ children, elem }) => {
    const map = DomUtils.attr(elem, 'map');
    const description = DomUtils.attr(elem, 'description');

    return <>
        <Icon title={map ? 'Térkép' : undefined} style={map ? { cursor: 'pointer' } : {}} name='map marker alternate' onClick={() => map && window.open(map as string, '_blank')} />
        <strong title={description ? 'Leírás' : undefined} style={description ? { cursor: 'pointer' } : {}} onClick={() => description && window.open(description as string, '_blank')}>{children}</strong>
    </>
}