import React, { useState } from 'react';
import { Modal, Label, Icon, List } from 'semantic-ui-react';
import { DOMElement, DomUtils } from '../utils/DomUtils';
import { Renderer } from '../utils/RenderUtils';
import { EventEditor } from './editor/EventEditor';
import { StoryEvent } from './StoryEvent';
import { v4 } from 'uuid';

const { attr, children, child, childText, addChild, addText, findElementsByName, deleteChild } = DomUtils;


export const StoryScene: React.FC<{ scene: DOMElement, renderer: Renderer, onChange: () => unknown, root: DOMElement }> = ({ scene, renderer, onChange, root }) => {
    const events = children(scene, 'events')[0];
    const setting = child(scene, 'setting');
    const map = setting ? attr(setting, 'map') : '';
    const description = setting ? attr(setting, 'description') : '';
    const [editedEvent, setEditedEvent] = useState<{ insert?: 'after' | 'before', anchor?: DOMElement, elem: DOMElement }>();
    return <>
        <Modal open={editedEvent !== undefined} onClose={() => setEditedEvent(undefined)}>
            <Modal.Content>
                {editedEvent && <EventEditor event={editedEvent.elem} onFinished={() => {
                    if (editedEvent.insert) {
                        DomUtils.addChildElement(editedEvent.anchor?.$parent as DOMElement, editedEvent.elem, editedEvent.anchor as DOMElement, editedEvent.insert);
                    }
                    setEditedEvent(undefined)
                }
                } renderer={renderer} root={root} />}
            </Modal.Content>
        </Modal>
        <Label basic>
            {map ? <a href='#'><Icon name='map marker alternate' onClick={() => window.open(map as string, '_blank')} /></a> : <Icon name='map marker alternate' />}

            {childText(scene, 'setting')}
            {description &&
                <Label.Detail as='a'>
                    <Icon name='external alternate' onClick={() => window.open(description as string, '_blank')} />
                </Label.Detail>
            }
        </Label>
        <List celled animated>
            {events.elements?.map(e => <StoryEvent
                event={e}
                renderer={renderer}
                setEditedEvent={event => {
                    if (event.insert) {
                        setEditedEvent({
                            insert: event.insert, elem: {
                                type: 'element',
                                name: 'event',
                                $parent: e.$parent
                            }, anchor: e
                        });
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