import { DomUtils } from '../DomUtils';
import { RendererComponent } from '../RenderUtils';

export const LanguageRenderer: RendererComponent = ({ children, elem }) => {
    const level = DomUtils.attr(elem, 'level');
    return <>{children} { level ? <em>({level})</em> : ''}</>;
}