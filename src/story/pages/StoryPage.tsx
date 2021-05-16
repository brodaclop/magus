import fileDownload from 'js-file-download';
import React, { useState } from 'react';
import { Button, Header, Icon, Menu, Tab } from 'semantic-ui-react';
import { v4 } from 'uuid';
import { EditableText } from '../components/EditableText';
import { SceneListContextMenu } from '../components/SceneListContextMenu';
import { StoryScene } from '../components/StoryScene';
import { DOMElement, DomUtils } from '../utils/DomUtils';
import { RenderUtils } from '../utils/RenderUtils';

const { attr, findElementsByName, parse, print, convertLegacyLinks } = DomUtils;

export const StoryPage: React.FC<{ story: string, saveStory: (story: string) => unknown }> = ({ story, saveStory }) => {
    const [activeScene, setActiveScene] = useState<string>();
    const storyOb = parse(story);
    convertLegacyLinks(storyOb);
    const scenes = findElementsByName(storyOb, 'scene');
    const findSceneById = (id?: string) => {
        return scenes.findIndex(s => attr(s, 'id') === id);
    }

    const save = () => {
        saveStory(print(storyOb))
    }

    const renderer = RenderUtils.createRenderer(storyOb, id => setActiveScene(id));
    const sceneTabs = scenes.map(s => {
        return {
            menuItem: <Menu.Item key={attr(s, 'id')}><SceneListContextMenu onSelected={item => {
                if (item === 'delete') {
                    DomUtils.deleteChild(s.$parent, s);
                } else {
                    const scene = DomUtils.addChild(s.$parent, 'scene', s, item === 'insertAfter' ? 'after' : 'before');
                    DomUtils.attr(scene, 'id', v4());
                    DomUtils.attr(scene, 'title', 'Új jelenet');
                    DomUtils.addChild(scene, 'events');
                    setTimeout(() => setActiveScene(DomUtils.attr(scene, 'id')), 0); //workaround for Tab overwriting activeIndex straight away
                }
                save();
            }}>
                {activeScene === DomUtils.attr(s, 'id') ? <EditableText text={attr(s, 'title')} onChange={title => {
                    DomUtils.attr(s, 'title', title);
                    save();
                }} /> : attr(s, 'title')}
            </SceneListContextMenu></Menu.Item>,
            render: () => <Tab.Pane>
                <StoryScene
                    scene={s}
                    renderer={renderer}
                    onChange={save}
                    root={storyOb} />
            </Tab.Pane>
        }
    });
    sceneTabs.push({
        menuItem: <Menu.Item key='__add'><Icon name='plus' onClick={() => {
            const story: DOMElement = DomUtils.child(storyOb, 'story') as DOMElement;
            const scene = DomUtils.addChild(story, 'scene', undefined, 'after');
            DomUtils.attr(scene, 'id', v4());
            DomUtils.attr(scene, 'title', 'Új jelenet');
            DomUtils.addChild(scene, 'events');
            setTimeout(() => setActiveScene(DomUtils.attr(scene, 'id')), 0); //workaround for Tab overwriting activeIndex straight away
            save();

        }} /></Menu.Item>,
        render: () => {
            return <></>;
        }
    })

    return <>
        <Button onClick={() => fileDownload(story, 'mese.xml', 'application/xml')} color='green' circular>Export</Button>
        <Button onClick={() => {
            const characters = DomUtils.findElementsByName(storyOb, 'characters')[0];
            const character = DomUtils.addChild(characters, 'character');
            DomUtils.attr(character, 'id', v4());
            DomUtils.addChild(character, 'name');
            DomUtils.addChild(character, 'race');
            DomUtils.addChild(character, 'alignment');
            DomUtils.addChild(character, 'class');
            DomUtils.addChild(character, 'origin');
            DomUtils.addChild(character, 'language');
            DomUtils.addChild(character, 'looks');
            DomUtils.addChild(character, 'behaviour');
            DomUtils.addChild(character, 'loot');

            save();

        }} color='green' circular>Új szereplő</Button>
        <Button onClick={() => {
            const items = DomUtils.findElementsByName(storyOb, 'items')[0];
            const item = DomUtils.addChild(items, 'item');
            DomUtils.attr(item, 'id', v4());
            DomUtils.addChild(item, 'name');
            DomUtils.addChild(item, 'value');
            DomUtils.addChild(item, 'description');

            save();

        }} color='green' circular>Új tárgy</Button>
        <Tab activeIndex={findSceneById(activeScene)} onTabChange={(e, { activeIndex }) => activeIndex as number < scenes.length && setActiveScene(DomUtils.attr(scenes[activeIndex as number], 'id'))} panes={sceneTabs} />

        <>
            <Header as='h1'>Szereplők</Header>
            {renderer.renderCards('character', save)}
        </>
        <>
            <Header as='h1'>Tárgyak</Header>
            {renderer.renderCards('item', save)}
        </>
    </>;
}