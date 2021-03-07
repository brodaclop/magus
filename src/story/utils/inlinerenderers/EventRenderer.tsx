import { DomUtils } from '../DomUtils';
import { RendererComponent } from '../RenderUtils';

export const EventRenderer: RendererComponent = ({ children, elem, switchToScene }) => {
    const role = DomUtils.attr(elem, 'role').toString() || 'normal';

    if (role === 'background') {
        return <i>{children}</i>;
    } else if (role === 'speech') {
        return <blockquote>{children}</blockquote>;
    } else {
        return <>{children}</>;
    }
}