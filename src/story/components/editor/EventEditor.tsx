import React, { useEffect, useState } from 'react';
import { Renderer } from '../../utils/RenderUtils';
import { CompositeDecorator, ContentState, Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button, Segment } from 'semantic-ui-react';
import { EditorUtils } from '../../utils/EditorUtils';
import { EditingButtons } from './EditingButtons';
import { IconComponent } from './IconComponent';
import { DOMElement, DomUtils } from '../../utils/DomUtils';
import { EventRowSelector } from './EventRoleSelector';

const { processElement, toElements } = EditorUtils;




export const EventEditor: React.FC<{ event: DOMElement, onFinished(event: DOMElement): unknown, renderer: Renderer, root: DOMElement }> = ({ event, onFinished, root }) => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [eventRole, setEventRole] = useState<string>();

    useEffect(() => {
        const state = processElement(event, ContentState.createFromText(''));
        const inlineDecorator = new CompositeDecorator([
            {
                strategy: (block, callback, _state) => {
                    block.findEntityRanges(c => !!c.getEntity(), callback);
                },
                component: IconComponent
            }
        ]);
        setEditorState(EditorState.createWithContent(state, inlineDecorator));
    }, [event]);


    return <>
        <EventRowSelector role={eventRole} onRoleSelected={setEventRole} />
        <EditingButtons editorState={editorState} setEditorState={setEditorState} root={root} />
        <Segment>
            <Editor editorState={editorState} onChange={setEditorState} />
        </Segment>
        <Button onClick={() => {
            DomUtils.attr(event, 'role', eventRole);
            event.elements = toElements(editorState.getCurrentContent(), event);
            onFinished(event);
        }
        }>Save</Button>
    </>;
}