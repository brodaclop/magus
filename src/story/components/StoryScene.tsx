import React, { useState } from 'react';
import { List } from 'semantic-ui-react';
import { DOMElement, DomUtils } from '../utils/DomUtils';
import { Renderer } from '../utils/RenderUtils';
import { StoryEvent } from './StoryEvent';
import { v4 } from 'uuid';
import { EventEditorModal } from './EventEditorModal';

const { attr, children, child, addChild, addText, findElementsByName, deleteChild } = DomUtils;

export interface EventEditingState {
    insert?: 'after' | 'before',
    anchor?: DOMElement,
    elem: DOMElement
}


export const StoryScene: React.FC<{ scene: DOMElement, renderer: Renderer, onChange: () => unknown, root: DOMElement }> = ({ scene, renderer, onChange, root }) => {
    const events = children(scene, 'events')[0];
    const [editedEvent, setEditedEvent] = useState<EventEditingState>();
    return <>
        <EventEditorModal
            editedEvent={editedEvent}
            onEditingFinished={() => setEditedEvent(undefined)}
            renderer={renderer}
            root={root}
        />
        <List celled animated>
            {events?.elements?.map(e => <StoryEvent
                event={e}
                renderer={renderer}
                setEditedEvent={event => {
                    if (event.operation === 'insertAfter' || event.operation === 'insertBefore') {
                        setEditedEvent({
                            insert: event.operation === 'insertAfter' ? 'after' : 'before', elem: {
                                type: 'element',
                                name: 'event',
                                $parent: e.$parent
                            }, anchor: e
                        });
                    } else if (event.operation === 'delete') {
                        DomUtils.deleteChild(e.$parent, e);
                        onChange();
                    } else {
                        setEditedEvent({ elem: e });

                    }

                }}
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
            <List.Item style={{ backgroundColor: 'gainsboro' }} onClick={() => {
                setEditedEvent({
                    insert: 'after',
                    elem: {
                        type: 'element',
                        name: 'event',
                        $parent: events
                    }
                });

            }}>
                <List.Icon name='plus' />
                <List.Content>
                    <i>Új elem</i>
                </List.Content>
            </List.Item>

        </List>
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