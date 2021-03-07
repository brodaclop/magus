import React, { ReactNode } from 'react';
import { Card, CardGroup, Icon, Popup, SemanticICONS, Table } from 'semantic-ui-react';
import { DOMElement, DomUtils } from './DomUtils';

export const STORY_TAG_ICONS: Record<string, SemanticICONS> = {
    setting: 'map marker alternate',
    roll: 'cube',
    reward: 'trophy',
    character: 'user outline',
    item: 'gift',
    jump: 'paper plane outline',
    '': 'question'
}

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
        case 'p': return <p>{contents}</p>
        case 'setting': {
            const map = DomUtils.attr(elem, 'map');
            const description = DomUtils.attr(elem, 'description');

            return <>
                <Icon title={map ? 'Térkép' : undefined} style={map ? { cursor: 'pointer' } : {}} name='map marker alternate' onClick={() => map && window.open(map as string, '_blank')} />
                <strong title={description ? 'Leírás' : undefined} style={description ? { cursor: 'pointer' } : {}} onClick={() => description && window.open(description as string, '_blank')}>{contents}</strong>
            </>
        }
        case 'roll': {
            const details = DomUtils.attr(elem, 'details');
            if (details) {
                return <Popup hoverable trigger={<span><Icon name='cube' fitted /> <strong>{contents}</strong></span>} wide>
                    <Popup.Content>
                        {details}
                    </Popup.Content>
                </Popup>
            } else {
                return <><Icon name='cube' fitted /> <strong>{contents}</strong></>;
            }
        } case 'reward': {
            return <><Icon name='trophy' fitted /> <strong>{contents}</strong></>;
        } case 'jump': {
            return <><Icon name='paper plane outline' fitted /> <em style={{ cursor: 'pointer' }} onClick={() => switchToScene(DomUtils.attr(elem, 'scene'))}>{contents}</em></>;
        }
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