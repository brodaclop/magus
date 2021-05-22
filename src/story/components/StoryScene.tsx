import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { DOMElement, DomUtils } from '../utils/DomUtils';
import { Renderer } from '../utils/RenderUtils';
import { StoryEvent } from './StoryEvent';
import { EventEditorModal } from './EventEditorModal';
import { Timeline } from './timeline/Timeline';
import { StoryContextMenu } from './StoryContextMenu';
import { CommentUtils } from '../utils/CommentUtils';

const { attr, children } = DomUtils;

export interface EventEditingState {
    insert?: 'after' | 'before',
    anchor?: DOMElement,
    elem: DOMElement
}



export const StoryScene: React.FC<{ scene: DOMElement, renderer: Renderer, onChange: () => unknown, root: DOMElement }> = ({ scene, renderer, onChange, root }) => {
    const events = children(scene, 'events')[0];
    const [editedEvent, setEditedEvent] = useState<EventEditingState>();
    const [contextMenu, setContextMenu] = useState<{ elem: DOMElement, event: React.MouseEvent }>();
    const [displayMode, setDisplayMode] = useState<'list' | 'timeline'>('list');

    return <>
        {contextMenu && <StoryContextMenu setEditedEvent={event => {
            if (event.operation === 'insertAfter' || event.operation === 'insertBefore') {
                setEditedEvent({
                    insert: event.operation === 'insertAfter' ? 'after' : 'before', elem: {
                        type: 'element',
                        name: 'event',
                        $parent: contextMenu.elem.$parent
                    }, anchor: contextMenu.elem
                });
            } else if (event.operation === 'delete') {
                DomUtils.deleteChild(contextMenu.elem.$parent, contextMenu.elem);
                onChange();
            } else {
                setEditedEvent({ elem: contextMenu.elem });
            }
        }
        }
            onClose={() => setContextMenu(undefined)}
            event={contextMenu.event}
        />}
        <EventEditorModal
            editedEvent={editedEvent}
            onEditingFinished={() => { setEditedEvent(undefined); onChange(); }}
            root={root}
        />
        <div>
            {displayMode === 'list' && events?.elements?.map(e => <StoryEvent
                event={e}
                renderer={renderer}
                onContextMenu={event => setContextMenu({ elem: e, event })}
                onEdit={() => setEditedEvent({ elem: e })}
                onClick={() => {
                    const status = attr(e, 'status');
                    attr(e, 'status', status ? null : 'completed');
                    onChange();
                }}
                commentUtils={new CommentUtils(root, e)}
                onChange={onChange}
            />)}
            {displayMode === 'timeline' && <Timeline width={5} events={events?.elements?.filter(e => attr(e, 'date') !== '').map(e => ({ date: Number(attr(e, 'date')), content: <>{renderer.renderElement(e)}</> })) ?? []} />}

            <div style={{ backgroundColor: 'gainsboro' }}>
                <Button icon='plus' onClick={() => {
                    setEditedEvent({
                        insert: 'after',
                        elem: {
                            type: 'element',
                            name: 'event',
                            $parent: events
                        }
                    });

                }} content='Új elem' />
                {displayMode === 'list' && <Button icon='calendar' onClick={() => setDisplayMode('timeline')} content='Idővonal' />}
                {displayMode === 'timeline' && <Button icon='list' onClick={() => setDisplayMode('list')} content='Lista' />}
            </div>
        </div>

    </>
}

