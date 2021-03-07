import { xml2js, Element, js2xml } from 'xml-js';

export interface DOMElement extends Element {
    $parent: DOMElement;
    elements?: Array<DOMElement>;
}

const findElements = (root: DOMElement, filter: (ob: DOMElement) => boolean): Array<DOMElement> => {
    let ret: Array<DOMElement> = [];
    if (filter(root)) {
        ret.push(root);
    }
    const children = root.elements?.map(elem => findElements(elem, filter));
    children?.forEach(ch => {
        ret = ret.concat(ch);
    })
    return ret;
}

const findElementsByName = (root: DOMElement, name: string): Array<DOMElement> => {
    return findElements(root, e => e.name === name);
}

const findById = (root: DOMElement, name: string, id: string): DOMElement | null => {
    const found = findElements(root, e => e.name === name && DomUtils.attr(e, 'id') === id);
    return found.length > 0 ? found[0] : null;
}

const children = (elem: DOMElement, name: string): Array<DOMElement> => {
    return elem.elements?.filter(e => e.name === name) ?? [];
}

const addChild = (parent: DOMElement, name: string, referenceSibling?: DOMElement, insert: 'after' | 'before' = 'after'): DOMElement => {
    const newElement: DOMElement = { type: 'element', name, $parent: parent };
    return addChildElement(parent, newElement, referenceSibling, insert);
}


const addChildElement = (parent: DOMElement, child: DOMElement, referenceSibling?: DOMElement, insert: 'after' | 'before' = 'after'): DOMElement => {
    parent.elements = parent.elements ?? [];
    let insertIndex = 0;
    if (referenceSibling) {
        const referenceIndex = parent.elements.indexOf(referenceSibling);
        insertIndex = insert === 'after' ? referenceIndex + 1 : referenceIndex;
    } else {
        insertIndex = insert === 'after' ? parent.elements.length : 0;
    }
    parent.elements.splice(insertIndex, 0, child);

    return child;
}

const deleteChild = (parent: DOMElement, child: DOMElement) => {
    parent.elements = parent.elements ?? [];
    const deleteIndex = parent.elements.indexOf(child);
    if (deleteIndex !== -1) {
        parent.elements.splice(deleteIndex, 1);
    }
}

const addText = (parent: DOMElement, text: string, previousSibling?: DOMElement): DOMElement => {
    parent.elements = parent.elements ?? [];
    const insertIndex = previousSibling ? parent.elements.indexOf(previousSibling) + 1 : 0;
    const newElement: DOMElement = { type: 'text', text, $parent: parent };
    parent.elements.splice(insertIndex, 0, newElement);
    return newElement;
}


const child = (elem: DOMElement, name: string): DOMElement | null => {
    const c = children(elem, name);
    return c.length > 0 ? c[0] : null;
}

const childText = (elem: Element, name: string): string => {
    const ret = elem.elements?.find(e => e.name === name);
    return text(ret);
}

const attr = (elem: Element, name: string, value?: string | null): string => {
    if (value !== undefined) {
        elem.attributes = elem.attributes ?? {};
        if (value !== null) {
            elem.attributes[name] = value;
        } else {
            delete elem.attributes[name];
        }
    }
    return (elem.attributes?.[name] ?? '').toString();
}


const text = (elem?: Element): string => {
    return elem?.elements?.map(t => t.text).join(' ') ?? '';
}

const parse = (str: string): DOMElement => {
    return xml2js(str, { compact: false, nativeType: true, trim: false, addParent: true, parentKey: '$parent' }) as DOMElement;
}

const convertLegacyLinks = (elem: Element) => {
    if (elem.name === 'link') {
        const [type, ref] = DomUtils.attr(elem, 'target').split(':');
        elem.name = type;
        elem.attributes = { ref }
    }
    elem.elements?.forEach(e => convertLegacyLinks(e));
}

const print = (root: Element): string => {
    return js2xml(root, { compact: false, parentKey: '$parent' });
}


export const DomUtils = {
    addChild,
    addChildElement,
    addText,
    attr,
    text,
    child,
    childText,
    children,
    deleteChild,
    findById,
    findElementsByName,
    findElements,
    parse,
    convertLegacyLinks,
    print
};