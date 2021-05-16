import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { DOMElement, DomUtils } from '../utils/DomUtils';
import { Renderer } from '../utils/RenderUtils';
import { StoryEvent } from './StoryEvent';
import { v4 } from 'uuid';
import { EventEditorModal } from './EventEditorModal';
import { Timeline } from './timeline/Timeline';
import { StoryContextMenu } from './StoryContextMenu';

const { attr, children, child, addChild, addText, findElementsByName, deleteChild } = DomUtils;

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
                onClick={() => {
                    const status = attr(e, 'status');
                    attr(e, 'status', status ? null : 'completed');
                    onChange();
                }}
                addComment={comment => {
                    addComment(e, root, comment);
                    onChange();
                }}
                comments={findComments(e, root)}
                deleteComment={c => {
                    deleteComment(c, root);
                    onChange();
                }}
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

const ensureComments = (root: DOMElement) => {
    const story = child(root, 'story');
    if (!story) {
        throw new Error('story is missing');
    }
    return child(story, 'comments') || addChild(story, 'comments');
}

const addComment = (event: DOMElement, root: DOMElement, contents: string) => {
    const eventId = ensureEventId(event);
    const comments = ensureComments(root);
    const lastComment = children(comments, 'comment').pop();
    const comment = addChild(comments, 'comment', lastComment);
    attr(comment, 'event', eventId);
    addText(comment, contents);
}

const deleteComment = (comment: DOMElement, root: DOMElement) => {
    const comments = ensureComments(root);
    deleteChild(comments, comment);
}


const findComments = (event: DOMElement, root: DOMElement): Array<DOMElement> => {
    const eventId = attr(event, 'id');
    const allComments = findElementsByName(root, 'comment');
    return allComments.filter(c => attr(c, 'event') === eventId);
}


const ensureEventId = (event: DOMElement) => {
    let id = attr(event, 'id') || v4();
    attr(event, 'id', id);
    return id;

}