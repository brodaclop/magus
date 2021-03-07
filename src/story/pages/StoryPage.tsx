import fileDownload from 'js-file-download';
import React, { useState } from 'react';
import { Button, Header, Icon, Menu, Tab } from 'semantic-ui-react';
import { v4 } from 'uuid';
import { EditableText } from '../components/EditableText';
import { SceneListContextMenu } from '../components/SceneListContextMenu';
import { StoryScene } from '../components/StoryScene';
import { DOMElement, DomUtils } from '../utils/DomUtils';
import { Renderer, RenderUtils } from '../utils/RenderUtils';

const { attr, findElementsByName, parse, print, convertLegacyLinks } = DomUtils;



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


export const StoryPage: React.FC<{ story: string, saveStory: (story: string) => unknown }> = ({ story, saveStory }) => {
    const [activeScene, setActiveScene] = useState<string>();
    const storyOb = parse(story);
    convertLegacyLinks(storyOb);
    const scenes = findElementsByName(storyOb, 'scene');
    const findSceneById = (id?: string) => {
        return scenes.findIndex(s => attr(s, 'id') === id);
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
                saveStory(print(storyOb));
            }}>
                {activeScene === DomUtils.attr(s, 'id') ? <EditableText text={attr(s, 'title')} onChange={title => {
                    DomUtils.attr(s, 'title', title);
                    saveStory(print(storyOb));
                }} /> : attr(s, 'title')}
            </SceneListContextMenu></Menu.Item>,
            render: () => <Tab.Pane>
                <StoryScene
                    scene={s}
                    renderer={renderer}
                    onChange={() => saveStory(print(storyOb))}
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
            saveStory(print(storyOb));

        }} /></Menu.Item>,
        render: () => {
            return <></>;
        }
    })

    return <>
        <Button onClick={() => fileDownload(story, 'mese.xml', 'application/xml')} color='green' circular>Export</Button>
        <Tab activeIndex={findSceneById(activeScene)} onTabChange={(e, { activeIndex }) => activeIndex as number < scenes.length && setActiveScene(DomUtils.attr(scenes[activeIndex as number], 'id'))} panes={sceneTabs} />

        {renderCast(renderer)};
        {renderInventory(renderer)};
    </>;
}