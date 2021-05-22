import { v4 } from 'uuid';
import { DOMElement, DomUtils } from './DomUtils';

const { attr, child, addChild, deleteChild, children, addText, findElementsByName } = DomUtils;

const ensureComments = (root: DOMElement) => {
    const story = child(root, 'story');
    if (!story) {
        throw new Error('story is missing');
    }
    return child(story, 'comments') || addChild(story, 'comments');
}

const addComment = (event: DOMElement, root: DOMElement, contents: string) => {
    const eventId = ensureEventId(event);
    const comments = ensureComments(root);
    const lastComment = children(comments, 'comment').pop();
    const comment = addChild(comments, 'comment', lastComment);
    attr(comment, 'event', eventId);
    addText(comment, contents);
}

const deleteComment = (comment: DOMElement, root: DOMElement) => {
    const comments = ensureComments(root);
    deleteChild(comments, comment);
}


const findComments = (event: DOMElement, root: DOMElement): Array<DOMElement> => {
    const eventId = attr(event, 'id');
    const allComments = findElementsByName(root, 'comment');
    return allComments.filter(c => attr(c, 'event') === eventId);
}


const ensureEventId = (event: DOMElement) => {
    let id = attr(event, 'id') || v4();
    attr(event, 'id', id);
    return id;

}

export class CommentUtils {
    constructor(private readonly root: DOMElement, private readonly event: DOMElement) { }

    public add = (contents: string) => addComment(this.event, this.root, contents);
    public remove = (comment: DOMElement) => deleteComment(comment, this.root);
    public list = (): Array<DOMElement> => findComments(this.event, this.root);

}