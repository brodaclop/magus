import React from 'react';
import { List, Popup } from 'semantic-ui-react';
import { DOMElement } from '../utils/DomUtils';
import { Renderer } from '../utils/RenderUtils';

export interface CommentListProps {
    comments?: Array<DOMElement>;
    deleteComment: (comment: DOMElement) => unknown;
    renderer: Renderer
}

export const CommentList: React.FC<CommentListProps> = ({ comments, deleteComment, renderer }) => (
    <>
        {comments && comments.length ? <Popup hoverable trigger={<List.Description>{comments.length}&nbsp;komment</List.Description>} wide>
            <List>
                {comments.map(c => <List.Item><List.Icon name='delete' onClick={() => deleteComment(c)} /><List.Content>{renderer.renderElement(c)}</List.Content></List.Item>)}
            </List>
        </Popup>
            : ''
        }
    </>
)