import React, { ReactNode, useState } from 'react';
import { Button, Card, Icon, Menu, Popup, SemanticICONS, Table } from 'semantic-ui-react';
import { EditableNode } from '../components/EditableNode';
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
    location: 'home',
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
        case 'location':
        case 'item':
            {
                const target = DomUtils.attr(elem, 'ref').toString();
                const targetElem = DomUtils.findById(root, elem.name, target);
                if (targetElem) {
                    const targetIcon: SemanticICONS = targetElem.name === 'character' ? 'user outline' : targetElem.name === 'location' ? 'home' : 'gift';
                    return <Popup hoverable trigger={<span><Icon name={targetIcon} fitted /> <strong>{contents}</strong></span>} wide>
                        <Popup.Content>
                            <StoryCard tag={targetElem} root={root} switchToScene={switchToScene} readOnly={true} save={() => { throw new Error('edit not implemented') }} />
                        </Popup.Content>
                    </Popup>
                }
                return contents;
            } case 'language': {
                const level = DomUtils.attr(elem, 'level');
                return <>{contents} {level ? <em>({level})</em> : ''}</>;
            }
        default: {
            return contents;
        }
    }
}

const StoryCard: React.FC<{ tag: DOMElement, root: DOMElement, switchToScene: (id: string) => unknown, save: () => unknown, readOnly: boolean }> = ({ tag, root, switchToScene, save, readOnly }) => {
    if (tag.name === 'character') {
        return <CharacterCard save={save} elem={tag} root={root} switchToScene={switchToScene} readOnly={readOnly} />
    }
    if (tag.name === 'item') {
        return <ItemCard save={save} elem={tag} root={root} switchToScene={switchToScene} readOnly={readOnly} />
    }
    if (tag.name === 'location') {
        return <LocationCard save={save} elem={tag} root={root} switchToScene={switchToScene} readOnly={readOnly} />
    }
    return null;
}

const TableRow: React.FC<{ label: string, elem: DOMElement | null, root: DOMElement, switchToScene: (id: string) => unknown, save: () => unknown, create: () => unknown, readOnly: boolean }> = ({ label, elem, root, switchToScene, save, create, readOnly }) => {
    return <Table.Row>
        <Table.Cell>{label}</Table.Cell>
        <Table.Cell><EditableNode readOnly={readOnly} elem={elem} root={root} onChange={save} create={create}><StoryElement elem={elem} root={root} switchToScene={switchToScene} /></EditableNode> </Table.Cell>
    </Table.Row>;
}



const CharacterCard: React.FC<{ elem: DOMElement, root: DOMElement, switchToScene: (id: string) => unknown, save: () => unknown, readOnly: boolean }> = ({ elem, root, switchToScene, save, readOnly }) => {

    const NestedTableRow: React.FC<{ name: string, parent: DOMElement, label: string }> = ({ name, parent, label }) => {
        const elems = DomUtils.findElementsByName(parent, name);
        const [first, ...rest] = elems;
        return <>
            <Table.Row key={`${name}-first`}>
                <Table.Cell rowSpan={elems.length + 1}>{label}</Table.Cell>
                <Table.Cell>
                    <EditableNode readOnly={readOnly} elem={first} root={root} onChange={save} create={() => { DomUtils.addChild(parent, name); save() }}>
                        <Button size='tiny' basic floated='right' icon='delete' onClick={() => { DomUtils.deleteChild(parent, first); save(); }} />
                        <StoryElement elem={first} root={root} switchToScene={switchToScene} />
                    </EditableNode>
                </Table.Cell>
            </Table.Row>
            {rest.map((r, i) => <Table.Row key={`${name}-${i}`}><Table.Cell>
                <EditableNode readOnly={readOnly} elem={r} root={root} onChange={save} create={() => { throw new Error('not applicable') }}>
                    {!readOnly && <Button size='tiny' basic floated='right' icon='delete' onClick={() => { DomUtils.deleteChild(parent, r); save(); }} />}
                    <StoryElement elem={r} root={root} switchToScene={switchToScene} />
                </EditableNode>

            </Table.Cell></Table.Row>)}
            {first && !readOnly && <Table.Row key={`${name}-plus`}><Table.Cell><Button basic size='tiny' onClick={() => { DomUtils.addChild(parent, name); save() }} icon='plus' /></Table.Cell></Table.Row>}
        </>;
    }

    const Row: React.FC<{ label: string, name: string }> = ({ label, name }) => <TableRow
        key={name}
        save={save}
        label={label}
        readOnly={readOnly}
        elem={DomUtils.child(elem, name)}
        create={() => { DomUtils.addChild(elem, name); save() }}
        root={root}
        switchToScene={switchToScene} />

    return <Table definition striped columns={2} structured>
        <Table.Body>
            <Row label='Név' name='name' />
            <Row label='Faj' name='race' />
            <Row label='Jellem' name='alignment' />
            <Row label='Kaszt' name='class' />
            <Row label='Szülőföld' name='origin' />
            <NestedTableRow parent={elem} name='language' label='Nyelvek' />
            <Row label='Kinézet' name='looks' />
            <Row label='Viselkedés' name='behaviour' />
            <NestedTableRow parent={elem} name='loot' label='Felszerelés' />
        </Table.Body>
    </Table>;
}


const ItemCard: React.FC<{ elem: DOMElement, root: DOMElement, switchToScene: (id: string) => unknown, save: () => unknown, readOnly: boolean }> = ({ elem, root, switchToScene, save, readOnly }) => {

    const Row: React.FC<{ label: string, name: string }> = ({ label, name }) => <TableRow
        key={name}
        save={save}
        label={label}
        readOnly={readOnly}
        elem={DomUtils.child(elem, name)}
        create={() => { DomUtils.addChild(elem, name); save() }}
        root={root}
        switchToScene={switchToScene} />


    return <Table definition striped columns={2}>
        <Table.Body>
            <Row label='Név' name='name' />
            <Row label='Érték' name='value' />
            <Table.Row>
                <Table.Cell colSpan={2}>
                    <EditableNode
                        readOnly={readOnly}
                        elem={DomUtils.child(elem, 'description')}
                        root={root}
                        onChange={save}
                        create={() => { DomUtils.addChild(elem, 'description'); save() }}>
                        <StoryElement elem={DomUtils.child(elem, 'description')} root={root} switchToScene={switchToScene} />
                    </EditableNode>
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>;
}

const LocationCard: React.FC<{ elem: DOMElement, root: DOMElement, switchToScene: (id: string) => unknown, save: () => unknown, readOnly: boolean }> = ({ elem, root, switchToScene, save, readOnly }) => {

    const Row: React.FC<{ label: string, name: string }> = ({ label, name }) => <TableRow
        key={name}
        save={save}
        label={label}
        readOnly={readOnly}
        elem={DomUtils.child(elem, name)}
        create={() => { DomUtils.addChild(elem, name); save() }}
        root={root}
        switchToScene={switchToScene} />


    return <Table definition striped columns={2}>
        <Table.Body>
            <Row label='Név' name='name' />
            <Row label='Koordináták' name='coords' />
            <Table.Row>
                <Table.Cell colSpan={2}>
                    <EditableNode
                        readOnly={readOnly}
                        elem={DomUtils.child(elem, 'description')}
                        root={root}
                        onChange={save}
                        create={() => { DomUtils.addChild(elem, 'description'); save() }}>
                        <StoryElement elem={DomUtils.child(elem, 'description')} root={root} switchToScene={switchToScene} />
                    </EditableNode>
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>;
}


const StoryCards: React.FC<{ root: DOMElement, name: string, title: string, switchToScene: (id: string) => unknown, save: () => unknown }> = ({ root, name, switchToScene, save, title }) => {
    const [activeCard, setActiveCard] = useState<DOMElement>();
    const cards = DomUtils.findElementsByName(root, name).filter(e => !e.attributes?.ref);

    return <>
        <Menu fluid compact color='brown' inverted style={{ flexWrap: 'wrap', marginBottom: '0.5em' }}>
            <Menu.Item header key='header'>{title}</Menu.Item>
            {cards.map(card => <Menu.Item key={DomUtils.attr(card, 'id')} active={activeCard === card} onClick={() => setActiveCard(activeCard === card ? undefined : card)}>{DomUtils.childText(card, 'name')}</Menu.Item>)}
        </Menu>
        {activeCard && <Card fluid raised key={DomUtils.attr(activeCard, 'id')}>
            <Card.Content>
                <Card.Header>{DomUtils.childText(activeCard, 'name')}
                    <Button floated='right' icon='delete' color='red'
                        disabled={DomUtils.findReferences(root, activeCard).length > 0}
                        onClick={() => {
                            DomUtils.deleteChild(activeCard.$parent, activeCard);
                            save();
                        }} />
                </Card.Header>
                <Card.Meta>
                    <StoryCard readOnly={false} save={save} tag={activeCard} root={root} switchToScene={switchToScene} />
                </Card.Meta>
            </Card.Content>
        </Card>
        }
    </>
}

export interface Renderer {
    renderElement: (elem: DOMElement) => ReactNode
    renderCards: (name: string, title: string, save: () => unknown) => ReactNode
}

const createRenderer = (root: DOMElement, switchScene: (id: string) => unknown): Renderer => {
    return {
        renderElement: elem => <StoryElement elem={elem} root={root} switchToScene={switchScene} />,
        renderCards: (name, title, save) => <StoryCards save={save} title={title} root={root} name={name} switchToScene={switchScene} />
    }
}

export const RenderUtils = {
    createRenderer
}