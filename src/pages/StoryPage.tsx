import fileDownload from 'js-file-download';
import React, { useState } from 'react';
import { Button, Header, Icon, Input, Label, List, Modal, Popup, SemanticICONS, Tab } from 'semantic-ui-react';
import { v4 } from 'uuid';
import { Element } from 'xml-js';
import { DomUtils } from '../utils/DomUtils';
import { Renderer, RenderUtils } from '../utils/RenderUtils';

const { attr, children, child, childText, addChild, addText, findElementsByName, parse, text, print, deleteChild } = DomUtils;


const ROLE_ICONS: Record<string, SemanticICONS> = {
    'normal': 'angle right',
    'entrance': 'sign-in',
    'exit': 'sign-out',
    'info': 'info circle',
    'background': 'film',
    'warning': 'warning'

}

const iconForRole = (role: string): SemanticICONS => {
    return ROLE_ICONS[role] ?? 'square full';
}

const StoryEvent: React.FC<{ event: Element, renderer: Renderer, onClick: () => unknown, addComment: (contents: string) => unknown, comments?: Element[], deleteComment: (comment: Element) => unknown }> = ({ event, renderer, onClick, addComment, comments, deleteComment }) => {
    const [kommentModal, setKommentModal] = useState(false);
    const [editedKomment, setEditedKomment] = useState('');
    const role = DomUtils.attr(event, 'role').toString() || 'normal';
    const status = DomUtils.attr(event, 'status');
    const renderedEvent = renderer.renderElement(event);
    return <List.Item style={{ backgroundColor: status === 'completed' ? '#eefeee' : undefined }}>
        <List.Icon name={iconForRole(role)} />
        <List.Content>
            {role === 'background' ? <i>{renderedEvent}</i> : renderedEvent}
        </List.Content>
        <List.Content floated='right'>
            <div style={{ float: 'right' }}>
                <Modal trigger={<Icon name='comment' />} onOpen={() => setKommentModal(true)} onClose={() => setKommentModal(false)} open={kommentModal}>
                    <Modal.Content>
                        <Input fluid labelPosition='left' placeholder='Komment...' error={!editedKomment} value={editedKomment} onChange={e => setEditedKomment(e.target.value)}>
                            <Label pointing='right' basic>Komment</Label>
                            <input />
                            <Button floated='right' disabled={!editedKomment} onClick={() => {
                                addComment(editedKomment);
                                setEditedKomment('');
                                setKommentModal(false);
                            }}>Ment</Button>
                        </Input>

                    </Modal.Content>
                </Modal>

                <Icon name='checkmark' color={status === 'completed' ? 'green' : undefined} onClick={onClick} />
            </div>
            <div style={{ clear: 'both' }}>
                {comments && comments.length ? <Popup hoverable trigger={<List.Description>{comments.length} komment</List.Description>} wide>
                    <List>
                        {comments.map(c => <List.Item><List.Icon name='delete' onClick={() => deleteComment(c)} /><List.Content>{renderer.renderElement(c)}</List.Content></List.Item>)}

                    </List>
                </Popup>
                    : ''
                }
            </div>
        </List.Content>

    </List.Item>;
}

const StoryScene: React.FC<{ scene: Element, renderer: Renderer, onChange: () => unknown, root: Element }> = ({ scene, renderer, onChange, root }) => {
    const events = children(scene, 'events')[0];
    const setting = child(scene, 'setting');
    const map = setting ? attr(setting, 'map') : '';
    const description = setting ? attr(setting, 'description') : '';
    return <>
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
            {events.elements?.map(e => <StoryEvent event={e} renderer={renderer} onClick={() => {
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

const renderCast = (renderer: Renderer) => {
    return <>
        <Header as='h1'>Szereplők</Header>
        {renderer.renderCards('character')}
    </>;
}

const renderInventory = (renderer: Renderer) => {
    return <>
        <Header as='h1'>Tárgyak</Header>
        {renderer.renderCards('item')}
    </>;
}

const ensureEventId = (event: Element) => {
    let id = attr(event, 'id') || v4();
    attr(event, 'id', id);
    return id;

}

const ensureComments = (root: Element) => {
    const story = child(root, 'story');
    if (!story) {
        throw new Error('story is missing');
    }
    return child(story, 'comments') || addChild(story, 'comments');
}

const addComment = (event: Element, root: Element, contents: string) => {
    const eventId = ensureEventId(event);
    const comments = ensureComments(root);
    const lastComment = children(comments, 'comment').pop();
    const comment = addChild(comments, 'comment', lastComment);
    attr(comment, 'event', eventId);
    addText(comment, contents);
}

const deleteComment = (comment: Element, root: Element) => {
    const comments = ensureComments(root);
    deleteChild(comments, comment);
}


const findComments = (event: Element, root: Element): Element[] => {
    const eventId = attr(event, 'id');
    const allComments = findElementsByName(root, 'comment');
    return allComments.filter(c => attr(c, 'event') === eventId);
}

export const StoryPage: React.FC<{ story: string, saveStory: (story: string) => unknown }> = ({ story, saveStory }) => {
    const [activeScene, setActiveScene] = useState<number>()
    const storyOb = parse(story);
    const scenes = findElementsByName(storyOb, 'scene');
    const findSceneById = (id: string) => {
        return scenes.findIndex(s => attr(s, 'id') === id);
    }
    const renderer = RenderUtils.createRenderer(storyOb, id => setActiveScene(findSceneById(id)));
    const sceneTabs = scenes.map(s => {
        return {
            menuItem: attr(s, 'title'),
            render: () => <Tab.Pane><StoryScene
                scene={s}
                renderer={renderer}
                onChange={() => saveStory(print(storyOb))}
                root={storyOb} /></Tab.Pane>
        }
    })

    console.log('scene', activeScene);

    return <>
        <Button onClick={() => fileDownload(story, 'mese.xml', 'application/xml')} color='green' circular>Export</Button>
        <Tab activeIndex={activeScene} onTabChange={(e, { activeIndex }) => setActiveScene(activeIndex as number)} panes={sceneTabs} />

        {renderCast(renderer)};
        {renderInventory(renderer)};
    </>;
}