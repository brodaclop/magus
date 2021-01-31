import { ContentState } from 'draft-js';
import React from 'react';
import { Icon, SemanticICONS } from 'semantic-ui-react';
import { STORY_TAG_ICONS } from '../../utils/RenderUtils';

export type DraftDecoratorComponentProps = {
    contentState: ContentState,
    decoratedText: string,
    end: number,
    // Many folks mistakenly assume that there will always be an 'entityKey'
    // passed to a DecoratorComponent.
    // To find the `entityKey`, Draft calls
    // `contentBlock.getEntityKeyAt(leafNode)` and in many cases the leafNode does
    // not have an entityKey. In those cases the entityKey will be null or
    // undefined. That's why `getEntityKeyAt()` is typed to return `?string`.
    // See https://github.com/facebook/draft-js/blob/2da3dcb1c4c106d1b2a0f07b3d0275b8d724e777/src/model/immutable/BlockNode.js#L51
    entityKey?: string,
    offsetKey: string,
    start: number,
};



export const IconComponent: React.FC<DraftDecoratorComponentProps> = ({ offsetKey, children, contentState, entityKey }) => {
    const entity = entityKey ? contentState.getEntity(entityKey) : null;
    const icon: SemanticICONS = STORY_TAG_ICONS[entity?.getType() ?? ''];
    return <>
        <span
            style={{ fontWeight: 'bold' }}
            data-offset-key={offsetKey}
        >
            <Icon name={icon} fitted />
            {children}
        </span>
    </>;
};