import { ContentState, Modifier, SelectionState } from "draft-js";
import { Element } from 'xml-js';

const lastPos = (state: ContentState): SelectionState => {
    const len = state.getLastBlock().getLength();
    return createSelection(state, len, len);
}

const createSelection = (state: ContentState, start: number, end: number) => {
    let selection = SelectionState.createEmpty(state.getLastBlock().getKey());
    return selection.merge({ anchorOffset: start, focusOffset: end });
}

const addEntity = (state: ContentState, type: string, data: any, start: number, end: number): ContentState => {
    let ret = state;
    ret = ret.createEntity(type, 'MUTABLE', data);
    const entityKey = ret.getLastCreatedEntityKey();
    ret = Modifier.applyEntity(ret, createSelection(ret, start, end), entityKey);
    return ret;
}

const processElement = (elem: Element, state: ContentState): ContentState => {
    if (elem.type === 'text') {
        return Modifier.insertText(state, lastPos(state), elem.text as string);
    } else if (elem.elements) {
        let ret = state;
        elem.elements.forEach(e => {
            const start = ret.getLastBlock().getLength();;
            ret = processElement(e, ret);
            const end = ret.getLastBlock().getLength();;
            if (e.name === 'p') {
                ret = Modifier.insertText(ret, lastPos(ret), '\n\n');
            } else if (e.name) {
                ret = addEntity(ret, e.name, e.attributes, start, end);
            }
        });
        return ret;
    }
    return state;
}

const toElements = (state: ContentState): Array<Element> => {
    const block = state.getLastBlock();
    const ret: Array<Element> = [];
    const text = block.getText();
    block.findEntityRanges(() => true, (start, end) => {
        const entityKey = block.getEntityAt(start);
        const textNode: Element = {
            type: 'text',
            text: text.substring(start, end)
        };
        if (entityKey) {
            const entity = state.getEntity(entityKey);
            ret.push({
                type: 'element',
                name: entity.getType(),
                attributes: entity.getData(),
                elements: [textNode]
            });
        } else {
            ret.push(textNode);
        }
    })
    if (text.includes('\n\n')) {
        const paragraphs: Array<Element> = [{
            type: 'element',
            name: 'p',
            elements: []
        }];
        ret.forEach(e => {
            if (e.type === 'text' && e.text?.toString().includes('\n\n')) {
                const [first, ...paras] = e.text.toString().split('\n\n');
                paragraphs[paragraphs.length - 1].elements?.push({
                    type: 'text',
                    text: first
                });

                paras.forEach(p => {
                    paragraphs.push({
                        type: 'element',
                        name: 'p',
                        elements: [{
                            type: 'text',
                            text: p
                        }]
                    });
                })
            } else {
                paragraphs[paragraphs.length - 1].elements?.push(e);
            }
        })
        return paragraphs;
    }
    return ret;
}

export const EditorUtils = {
    processElement,
    toElements,
    addEntity
}