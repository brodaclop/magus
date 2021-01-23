import React, { ReactNode } from 'react';
import { Card, CardGroup, Header, Popup, Table } from 'semantic-ui-react';
import { Element } from 'xml-js';
import { DomUtils } from './DomUtils';

const renderLinkTarget = (target: string, root: Element): ReactNode | null => {
    const [targetType, id] = target.split(':', 2);
    const t = DomUtils.findById(root, targetType, id);
    return t ? renderTable(t, root) : null;
}

const StoryElement: React.FC<{ elem: Element | null, root: Element }> = ({ elem, root }) => {
    if (!elem) {
        return <></>;
    }
    if (elem.type === 'text') {
        return <>{elem.text}</>;
    }
    const contents = <>
        {elem.elements?.map(e => <StoryElement elem={e} root={root} />)}
    </>;
    if (elem.name === 'p') {
        return <p>{contents}</p>
    } else if (elem.name === 'setting') {
        return <Header>Helyszín: {contents}</Header>
    } else if (elem.name === 'link') {
        const target = DomUtils.attr(elem, 'target').toString();
        const renderedTarget = renderLinkTarget(target, root);
        if (renderedTarget) {
            return <Popup hoverable trigger={<a href='#'>{contents}</a>} wide>
                <Popup.Content>
                    {renderedTarget}
                </Popup.Content>
            </Popup>
        }
        return contents;
    } else if (elem.name === 'language') {
        const level = DomUtils.attr(elem, 'level');
        return <>{contents} { level ? <em>({level})</em> : ''}</>;
    } else {
        return contents;
    }
}


const renderTable = (tag: Element, root: Element) => {
    if (tag.name === 'character') {
        return renderCharacter(tag, root);
    }
    if (tag.name === 'item') {
        return renderItem(tag, root);
    }
}

const TableRow: React.FC<{ label: string, elem: Element | null, root: Element }> = ({ label, elem, root }) => <Table.Row>
    <Table.Cell>{label}</Table.Cell>
    <Table.Cell><StoryElement elem={elem} root={root} /></Table.Cell>
</Table.Row>;

const NestedTableRow: React.FC<{ elems: Element[], label: string, root: Element }> = ({ elems, label, root }) => {
    const [first, ...rest] = elems;
    return <>
        <Table.Row>
            <Table.Cell rowSpan={elems.length}>{label}</Table.Cell>
            <Table.Cell><StoryElement elem={first} root={root} /></Table.Cell>
        </Table.Row>
        {rest.map(r => <Table.Row><Table.Cell><StoryElement elem={r} root={root} /></Table.Cell></Table.Row>)}
    </>;
}


const renderCharacter = (elem: Element, root: Element) => <Table definition striped columns={2} structured>
    <TableRow label='Név' elem={DomUtils.child(elem, 'name')} root={root} />
    <TableRow label='Faj' elem={DomUtils.child(elem, 'race')} root={root} />
    <TableRow label='Jellem' elem={DomUtils.child(elem, 'alignment')} root={root} />
    <TableRow label='Kaszt' elem={DomUtils.child(elem, 'class')} root={root} />
    <TableRow label='Szülőföld' elem={DomUtils.child(elem, 'origin')} root={root} />
    <NestedTableRow elems={DomUtils.findElementsByName(elem, 'language')} label='Nyelvek' root={root} />
    <TableRow label='Kinézet' elem={DomUtils.child(elem, 'looks')} root={root} />
    <TableRow label='Viselkedés' elem={DomUtils.child(elem, 'behaviour')} root={root} />
    <NestedTableRow elems={DomUtils.findElementsByName(elem, 'loot')} label='Felszerelés' root={root} />
</Table>;


const renderItem = (elem: Element, root: Element) => {
    return <Table definition striped columns={2}>
        <TableRow label='Név' elem={DomUtils.child(elem, 'name')} root={root} />
        <TableRow label='Érték' elem={DomUtils.child(elem, 'value')} root={root} />
        <Table.Row>
            <Table.Cell colSpan={2}>
                {DomUtils.children(elem, 'description').map(e => <StoryElement elem={e} root={root} />)}
            </Table.Cell>
        </Table.Row>
    </Table>;
}

const StoryCards: React.FC<{ root: Element, name: string }> = ({ root, name }) => {
    const cards = DomUtils.findElementsByName(root, name);
    return <CardGroup>
        {cards.map(c => <Card>
            <Card.Content>
                <Card.Header>{DomUtils.childText(c, 'name')}</Card.Header>
                <Card.Meta>
                    {renderTable(c, root)}
                </Card.Meta>
            </Card.Content>
        </Card>
        )}
    </CardGroup>
}

export interface Renderer {
    renderElement: (elem: Element) => ReactNode
    renderCards: (name: string) => ReactNode
}

const createRenderer = (root: Element): Renderer => {
    return {
        renderElement: elem => <StoryElement elem={elem} root={root} />,
        renderCards: name => <StoryCards root={root} name={name} />
    }
}

export const RenderUtils = {
    createRenderer
}