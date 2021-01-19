import React, { ReactNode } from 'react';
import { Card, CardGroup, Container, Header, Icon, Label, List, Popup, Table } from 'semantic-ui-react';
import { xml2js, Element } from 'xml-js';



const findElements = (root: Element, filter: (ob: Element) => boolean): Array<Element> => {
    let ret: Array<Element> = [];
    if (filter(root)) {
        ret.push(root);
    }
    const children = root.elements?.map(elem => findElements(elem, filter));
    children?.forEach(ch => {
        ret = ret.concat(ch);
    })
    return ret;
}

const findElementsByName = (root: Element, name: string): Array<Element> => {
    return findElements(root, e => e.name === name);
}


const children = (elem: Element, name: string) => {
    return elem.elements?.filter(e => e.name === name) ?? [];
}

const child = (elem: Element, name: string) => {
    const c = children(elem, name);
    return c.length > 0 ? c[0] : null;
}

const childText = (elem: Element, name: string) => {
    const ret = elem.elements?.find(e => e.name === name);
    return text(ret);
}

const attr = (elem: Element, name: string) => {
    return elem.attributes?.[name] ?? '';
}


const text = (elem?: Element) => {
    return elem?.elements?.map(t => t.text).join(' ') ?? '';
}

const findCharacter = (root: Element, id: string) => {
    const found = findElements(root, e => e.name === 'character' && attr(e, 'id') === id);
    return found.length > 0 ? found[0] : null;
}

const findItem = (root: Element, id: string) => {
    const found = findElements(root, e => e.name === 'item' && attr(e, 'id') === id);
    return found.length > 0 ? found[0] : null;
}

const renderLinkTarget = (target: string, root: Element): ReactNode | null => {
    if (target.startsWith('character:')) {
        const id = target.substring(target.indexOf(':') + 1);
        const c = findCharacter(root, id);
        if (c) {
            return renderCharacter(c);
        }
    }
    if (target.startsWith('item:')) {
        const id = target.substring(target.indexOf(':') + 1);
        const i = findItem(root, id);
        if (i) {
            return renderItem(i, root);
        }
    }
    return null;
}


const renderElement = (elem: Element, root: Element): ReactNode => {
    if (elem.type === 'text') {
        return <>{elem.text}</>;
    }
    const contents = <>
        {elem.elements?.map(e => renderElement(e, root))}
    </>;
    if (elem.name === 'p') {
        return <p>{contents}</p>
    } else if (elem.name === 'setting') {
        return <Header>Helyszín: {contents}</Header>
    } else if (elem.name === 'background') {
        return <i><b>Háttér: </b>{contents}</i>
    } else if (elem.name === 'link') {
        const target = attr(elem, 'target').toString();
        const renderedTarget = renderLinkTarget(target, root);
        if (renderedTarget) {
            return <Popup trigger={<a href='#'>{contents}</a>} wide>
                <Popup.Content>
                    {renderedTarget}
                </Popup.Content>
            </Popup>
        }
        return contents;
    } else {
        return contents;
    }
}

const ROLE_ICONS: Record<string, string> = {
    '': 'angle right',
    'entrance': 'sign-in',
    'exit': 'sign-out'

}

const renderScene = (scene: Element, root: Element) => {
    const events = children(scene, 'events')[0];
    const setting = child(scene, 'setting');
    const map = setting ? attr(setting, 'map') : '';
    const description = setting ? attr(setting, 'description') : '';
    console.log(map);
    return <>
        <Header as='h1'>Jelenet: {attr(scene, 'title')}</Header>
        <Header as='h2'>Helyszín: {childText(scene, 'setting')}
            {map &&
                <Label size='small' onClick={() => window.open(map as string, '_blank')}>
                    <Icon name='map' fitted />
                </Label>
            }
            {description &&
                <Label size='small' onClick={() => window.open(description as string, '_blank')}>
                    <Icon name='external alternate' fitted />
                </Label>
            }

        </Header>
        <List>
            {events.elements?.map(e => <List.Item>
                <List.Icon name={ROLE_ICONS[attr(e, 'role')] as any} />
                <List.Content>
                    {renderElement(e, root)}
                </List.Content>
            </List.Item>)}
        </List>

    </>
}

const renderCharacter = (elem: Element) => {
    const [nyelv, ...nyelvek] = findElementsByName(elem, 'language');

    return <Table definition striped columns={2} structured>
        <Table.Row>
            <Table.Cell>Név</Table.Cell>
            <Table.Cell>{childText(elem, 'name')}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Faj</Table.Cell>
            <Table.Cell>{childText(elem, 'race')}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Kaszt</Table.Cell>
            <Table.Cell>{childText(elem, 'class')}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Szülőföld</Table.Cell>
            <Table.Cell>{childText(elem, 'origin')}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell rowSpan={nyelvek.length + 1}>Nyelvek</Table.Cell>
            <Table.Cell>{text(nyelv)} <em>{attr(nyelv, 'level')}</em></Table.Cell>
        </Table.Row>
        {nyelvek.map(nyelv => <Table.Row><Table.Cell>{text(nyelv)} <em>{attr(nyelv, 'level')}</em></Table.Cell></Table.Row>)}
        <Table.Row>
            <Table.Cell>Kinézet</Table.Cell>
            <Table.Cell>{childText(elem, 'looks')}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Viselkedés</Table.Cell>
            <Table.Cell>{childText(elem, 'behaviour')}</Table.Cell>
        </Table.Row>
    </Table>;
}

const renderItem = (elem: Element, root: Element) => {
    return <Table definition striped columns={2}>
        <Table.Row>
            <Table.Cell>Név</Table.Cell>
            <Table.Cell>{childText(elem, 'name')}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Érték</Table.Cell>
            <Table.Cell>{childText(elem, 'value')}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell colSpan={2}>
                {children(elem, 'description').map(e => renderElement(e, root))}
            </Table.Cell>
        </Table.Row>
    </Table>;
}


const renderCast = (story: Element) => {
    const characters = findElements(story, e => e.name === 'character');
    return <>
        <Header as='h1'>Szereplők</Header>
        <CardGroup>
            {characters.map(c => <Card>
                <Card.Content>
                    <Card.Header>{childText(c, 'name')}</Card.Header>
                    <Card.Meta>
                        {renderCharacter(c)}
                    </Card.Meta>
                </Card.Content>
            </Card>
            )}
        </CardGroup>
    </>;
}

const renderInventory = (story: Element) => {
    const items = findElements(story, e => e.name === 'item');
    return <>
        <Header as='h1'>Tárgyak</Header>
        <CardGroup>
            {items.map(c => <Card>
                <Card.Content>
                    <Card.Header>{childText(c, 'name')}</Card.Header>
                    <Card.Meta>
                        {renderItem(c, story)}
                    </Card.Meta>
                </Card.Content>
            </Card>
            )}
        </CardGroup>
    </>;
}


export const StoryPage: React.FC<{ story: string }> = ({ story }) => {
    const storyOb: Element = xml2js(story, { compact: false, nativeType: true, trim: false }) as Element;
    const scenes = findElements(storyOb, e => e.name === 'scene');
    return <>
        {renderCast(storyOb)};
        {renderInventory(storyOb)};
        {scenes.map(s => renderScene(s, storyOb))}
    </>;
}