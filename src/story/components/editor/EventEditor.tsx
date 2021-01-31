import React, { useEffect, useState } from 'react';
import { Renderer } from '../../utils/RenderUtils';
import { Element } from 'xml-js';
import { CompositeDecorator, ContentState, Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button } from 'semantic-ui-react';
import { EditorUtils } from '../../utils/EditorUtils';
import { EditingButtons } from './EditingButtons';
import { IconComponent } from './IconComponent';

const { processElement, toElements } = EditorUtils;




export const EventEditor: React.FC<{ event: Element, onFinished(event: Element): unknown, renderer: Renderer, root: Element }> = ({ event, onFinished, root }) => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

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
        <EditingButtons editorState={editorState} setEditorState={setEditorState} root={root} />

        <Editor editorState={editorState} onChange={setEditorState} />
        <Button onClick={() => {
            event.elements = toElements(editorState.getCurrentContent());
            onFinished(event);
        }
        }>Save</Button>
    </>;
}