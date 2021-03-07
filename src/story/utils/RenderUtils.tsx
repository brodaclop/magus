import React, { ReactNode } from 'react';
import { Card, CardGroup, Icon, Popup, SemanticICONS, Table } from 'semantic-ui-react';
import { DOMElement, DomUtils } from './DomUtils';
import { EventRenderer } from './inlinerenderers/EventRenderer';
import { JumpRenderer } from './inlinerenderers/JumpRenderer';
import { LanguageRenderer } from './inlinerenderers/LanguageRenderer';
import { ParagraphRenderer } from './inlinerenderers/ParagraphRenderer';
import { RewardRenderer } from './inlinerenderers/RewardRenderer';
import { RollRenderer } from './inlinerenderers/RollRenderer';
import { SettingRenderer } from './inlinerenderers/SettingRenderer';

export const STORY_TAG_ICONS: Record<string, SemanticICONS> = {
    setting: 'map marker alternate',
    roll: 'cube',
    reward: 'trophy',
    character: 'user outline',
    item: 'gift',
    jump: 'paper plane outline',
    '': 'question'
}

export type RendererComponent = React.FC<{ elem: DOMElement; switchToScene: (id: string) => unknown }>;



const StoryElement: React.FC<{ elem: DOMElement | null, root: DOMElement, switchToScene: (id: string) => unknown }> = ({ elem, root, switchToScene }) => {
    if (!elem) {
        return <></>;
    }
    if (elem.type === 'text') {
        return <>{elem.text}</>;
    }
    const contents = <>
        {elem.elements?.map(e => <StoryElement elem={e} root={root} switchToScene={switchToScene} />)}
    </>;
    switch (elem.name) {
        case 'p': return <ParagraphRenderer switchToScene={switchToScene} elem={elem}>{contents}</ParagraphRenderer>
        case 'setting': return <SettingRenderer switchToScene={switchToScene} elem={elem}>{contents}</SettingRenderer>
        case 'roll': return <RollRenderer switchToScene={switchToScene} elem={elem}>{contents}</RollRenderer>
        case 'reward': return <RewardRenderer switchToScene={switchToScene} elem={elem}>{contents}</RewardRenderer>
        case 'jump': return <JumpRenderer switchToScene={switchToScene} elem={elem}>{contents}</JumpRenderer>
        case 'langauge': return <LanguageRenderer switchToScene={switchToScene} elem={elem}>{contents}</LanguageRenderer>
        case 'event': return <EventRenderer switchToScene={switchToScene} elem={elem}>{contents}</EventRenderer>
        case 'character':
        case 'item':
            {
                const target = DomUtils.attr(elem, 'ref').toString();
                const targetElem = DomUtils.findById(root, elem.name, target);
                if (targetElem) {
                    const targetIcon: SemanticICONS = targetElem.name === 'character' ? 'user outline' : 'gift';
                    return <Popup hoverable trigger={<span><Icon name={targetIcon} fitted /> <strong>{contents}</strong></span>} wide>
                        <Popup.Content>
                            <StoryCard tag={targetElem} root={root} switchToScene={switchToScene} />
                        </Popup.Content>
                    </Popup>
                }
                return contents;
            } case 'language': {
                const level = DomUtils.attr(elem, 'level');
                return <>{contents} { level ? <em>({level})</em> : ''}</>;
            }
        default: {
            return contents;
        }
    }
}

const StoryCard: React.FC<{ tag: DOMElement, root: DOMElement, switchToScene: (id: string) => unknown }> = ({ tag, root, switchToScene }) => {
    if (tag.name === 'character') {
        return <CharacterCard elem={tag} root={root} switchToScene={switchToScene} />
    }
    if (tag.name === 'item') {
        return <ItemCard elem={tag} root={root} switchToScene={switchToScene} />
    }
    return null;
}

const TableRow: React.FC<{ label: string, elem: DOMElement | null, root: DOMElement, switchToScene: (id: string) => unknown }> = ({ label, elem, root, switchToScene }) => <Table.Row>
    <Table.Cell>{label}</Table.Cell>
    <Table.Cell><StoryElement elem={elem} root={root} switchToScene={switchToScene} /></Table.Cell>
</Table.Row>;

const NestedTableRow: React.FC<{ elems: DOMElement[], label: string, root: DOMElement, switchToScene: (id: string) => unknown }> = ({ elems, label, root, switchToScene }) => {
    const [first, ...rest] = elems;
    return <>
        <Table.Row>
            <Table.Cell rowSpan={elems.length}>{label}</Table.Cell>
            <Table.Cell><StoryElement elem={first} root={root} switchToScene={switchToScene} /></Table.Cell>
        </Table.Row>
        {rest.map(r => <Table.Row><Table.Cell><StoryElement elem={r} root={root} switchToScene={switchToScene} /></Table.Cell></Table.Row>)}
    </>;
}


const CharacterCard: React.FC<{ elem: DOMElement, root: DOMElement, switchToScene: (id: string) => unknown }> = ({ elem, root, switchToScene }) => <Table definition striped columns={2} structured>
    <TableRow label='Név' elem={DomUtils.child(elem, 'name')} root={root} switchToScene={switchToScene} />
    <TableRow label='Faj' elem={DomUtils.child(elem, 'race')} root={root} switchToScene={switchToScene} />
    <TableRow label='Jellem' elem={DomUtils.child(elem, 'alignment')} root={root} switchToScene={switchToScene} />
    <TableRow label='Kaszt' elem={DomUtils.child(elem, 'class')} root={root} switchToScene={switchToScene} />
    <TableRow label='Szülőföld' elem={DomUtils.child(elem, 'origin')} root={root} switchToScene={switchToScene} />
    <NestedTableRow elems={DomUtils.findElementsByName(elem, 'language')} label='Nyelvek' root={root} switchToScene={switchToScene} />
    <TableRow label='Kinézet' elem={DomUtils.child(elem, 'looks')} root={root} switchToScene={switchToScene} />
    <TableRow label='Viselkedés' elem={DomUtils.child(elem, 'behaviour')} root={root} switchToScene={switchToScene} />
    <NestedTableRow elems={DomUtils.findElementsByName(elem, 'loot')} label='Felszerelés' root={root} switchToScene={switchToScene} />
</Table>;


const ItemCard: React.FC<{ elem: DOMElement, root: DOMElement, switchToScene: (id: string) => unknown }> = ({ elem, root, switchToScene }) => {
    return <Table definition striped columns={2}>
        <TableRow label='Név' elem={DomUtils.child(elem, 'name')} root={root} switchToScene={switchToScene} />
        <TableRow label='Érték' elem={DomUtils.child(elem, 'value')} root={root} switchToScene={switchToScene} />
        <Table.Row>
            <Table.Cell colSpan={2}>
                {DomUtils.children(elem, 'description').map(e => <StoryElement elem={e} root={root} switchToScene={switchToScene} />)}
            </Table.Cell>
        </Table.Row>
    </Table>;
}

const StoryCards: React.FC<{ root: DOMElement, name: string, switchToScene: (id: string) => unknown }> = ({ root, name, switchToScene }) => {
    const cards = DomUtils.findElementsByName(root, name).filter(e => !e.attributes?.ref);
    return <CardGroup itemsPerRow={5}>
        {cards.map(c => <Card raised>
            <Card.Content>
                <Card.Header>{DomUtils.childText(c, 'name')}</Card.Header>
                <Card.Meta>
                    <StoryCard tag={c} root={root} switchToScene={switchToScene} />
                </Card.Meta>
            </Card.Content>
        </Card>
        )}
    </CardGroup>
}

export interface Renderer {
    renderElement: (elem: DOMElement) => ReactNode
    renderCards: (name: string) => ReactNode
}

const createRenderer = (root: DOMElement, switchScene: (id: string) => unknown): Renderer => {
    return {
        renderElement: elem => <StoryElement elem={elem} root={root} switchToScene={switchScene} />,
        renderCards: name => <StoryCards root={root} name={name} switchToScene={switchScene} />
    }
}

export const RenderUtils = {
    createRenderer
}