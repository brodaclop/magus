import { xml2js, Element, js2xml } from 'xml-js';

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

const findById = (root: Element, name: string, id: string) => {
    const found = findElements(root, e => e.name === name && DomUtils.attr(e, 'id') === id);
    return found.length > 0 ? found[0] : null;
}

const children = (elem: Element, name: string) => {
    return elem.elements?.filter(e => e.name === name) ?? [];
}

const addChild = (parent: Element, name: string, previousSibling?: Element) => {
    parent.elements = parent.elements ?? [];
    const insertIndex = previousSibling ? parent.elements.indexOf(previousSibling) + 1 : 0;
    const newElement: Element = { type: 'element', name };
    parent.elements.splice(insertIndex, 0, newElement);
    return newElement;
}

const deleteChild = (parent: Element, child: Element) => {
    parent.elements = parent.elements ?? [];
    const deleteIndex = parent.elements.indexOf(child);
    if (deleteIndex !== -1) {
        parent.elements.splice(deleteIndex, 1);
    }
}

const addText = (parent: Element, text: string, previousSibling?: Element) => {
    parent.elements = parent.elements ?? [];
    const insertIndex = previousSibling ? parent.elements.indexOf(previousSibling) + 1 : 0;
    const newElement: Element = { type: 'text', text };
    parent.elements.splice(insertIndex, 0, newElement);
    return newElement;
}


const child = (elem: Element, name: string) => {
    const c = children(elem, name);
    return c.length > 0 ? c[0] : null;
}

const childText = (elem: Element, name: string) => {
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


const text = (elem?: Element) => {
    return elem?.elements?.map(t => t.text).join(' ') ?? '';
}

const parse = (str: string): Element => {
    return xml2js(str, { compact: false, nativeType: true, trim: false }) as Element;
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
    return js2xml(root, { compact: false });
}


export const DomUtils = {
    addChild,
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