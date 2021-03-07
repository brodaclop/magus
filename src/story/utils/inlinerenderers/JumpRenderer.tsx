import { Icon } from 'semantic-ui-react';
import { DomUtils } from '../DomUtils';
import { RendererComponent } from '../RenderUtils';

export const JumpRenderer: RendererComponent = ({ children, elem, switchToScene }) => <><Icon name='paper plane outline' fitted /> <em style={{ cursor: 'pointer' }} onClick={() => switchToScene(DomUtils.attr(elem, 'scene'))}>{children}</em></>;