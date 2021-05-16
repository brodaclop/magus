import { ContentBlock, ContentState, genKey, Modifier, SelectionState } from "draft-js";
import { DOMElement } from "./DomUtils";

const lastPos = (state: ContentState): SelectionState => {
    const len = state.getLastBlock().getLength();
    return createSelection(state, len, len);
}

const createSelection = (state: ContentState, start: number, end: number) => {
    let selection = SelectionState.createEmpty(state.getLastBlock().getKey());
    return selection.merge({ anchorOffset: start, focusOffset: end });
}

const addEntityToSelection = (state: ContentState, type: string, data: any, selection: SelectionState) => {
    console.log('adding entity', type, data, selection);
    let ret = state;
    ret = ret.createEntity(type, 'MUTABLE', data);
    const entityKey = ret.getLastCreatedEntityKey();
    console.log(entityKey);
    ret = Modifier.applyEntity(ret, selection, entityKey);
    return ret;

}

const addEntity = (state: ContentState, type: string, data: any, start: number, end: number): ContentState => {
    return addEntityToSelection(state, type, data, createSelection(state, start, end));
}

const addBlock = (state: ContentState): ContentState => {
    console.log('creating new block');
    const block = new ContentBlock({
        key: genKey(),
        type: 'paragraph',
        text: '',
    });
    const blockMap = state.getBlockMap().merge({ [block.getKey()]: block }).toOrderedMap();
    return state.merge({ blockMap }) as ContentState;
}

const processElement = (elem: DOMElement, state: ContentState, contentsOnly: boolean, block?: ContentBlock): ContentState => {
    console.log('processing', elem, contentsOnly, block);
    let ret = state;
    if (elem.type === 'text') {
        console.log('adding text', elem.text);
        if (!block) {
            ret = addBlock(ret);
        }
        return Modifier.insertText(ret, lastPos(ret), elem.text as string);
    } else if (elem.elements) {
        if ((elem.name === 'p' || !block) && !contentsOnly) {
            ret = addBlock(ret);
        }
        elem.elements.forEach(e => {
            console.log('adding', e, elem);
            const start = ret.getLastBlock()?.getLength() ?? 0;
            ret = processElement(e, ret, false, ret.getLastBlock());
            const end = ret.getLastBlock().getLength();;
            if (e.name && e.name !== 'p') {
                ret = addEntity(ret, e.name, e.attributes, start, end);
            }
        });
        return ret;
    }
    return ret;
}

const blockToElement = ($parent: DOMElement, state: ContentState, block: ContentBlock): DOMElement => {
    const ret: DOMElement = {
        type: 'element',
        name: 'p',
        $parent,
        elements: []
    };
    const text = block.getText();
    block.findEntityRanges(() => true, (start, end) => {
        const entityKey = block.getEntityAt(start);
        const textNode: DOMElement = {
            type: 'text',
            text: text.substring(start, end),
            $parent
        };
        if (entityKey) {
            const entity = state.getEntity(entityKey);
            ret.elements?.push({
                type: 'element',
                name: entity.getType(),
                attributes: entity.getData(),
                elements: [textNode],
                $parent: ret
            });
        } else {
            ret.elements?.push(textNode);
        }
    });
    return ret;
}

const toElements = (state: ContentState, $parent: DOMElement): Array<DOMElement> => {
    const ret = state.getBlocksAsArray().map(block => blockToElement($parent, state, block));
    if (ret.length === 1) {
        return ret[0].elements ?? [];
    }
    return ret;
}

export const EditorUtils = {
    processElement,
    toElements,
    addEntity,
    addEntityToSelection
}