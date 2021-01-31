import fileDownload from 'js-file-download';
import React, { useState } from 'react';
import { Button, Header, Tab } from 'semantic-ui-react';
import { StoryScene } from '../components/StoryScene';
import { DomUtils } from '../utils/DomUtils';
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
    const [activeScene, setActiveScene] = useState<number>()
    const storyOb = parse(story);
    convertLegacyLinks(storyOb);
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

    return <>
        <Button onClick={() => fileDownload(story, 'mese.xml', 'application/xml')} color='green' circular>Export</Button>
        <Tab activeIndex={activeScene} onTabChange={(e, { activeIndex }) => setActiveScene(activeIndex as number)} panes={sceneTabs} />

        {renderCast(renderer)};
        {renderInventory(renderer)};
    </>;
}