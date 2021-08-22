import React, { useCallback, useEffect, useState } from 'react';
import { CompositeDecorator, ContentState, Editor, EditorState, getDefaultKeyBinding } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button, Label, Segment } from 'semantic-ui-react';
import { EditorUtils } from '../../utils/EditorUtils';
import { EditingButtons } from './EditingButtons';
import { IconComponent } from './IconComponent';
import { DOMElement, DomUtils } from '../../utils/DomUtils';
import { EventRowSelector } from './EventRoleSelector';
import { NumberInput } from '../../../components/NumberInput';

const { processElement, toElements } = EditorUtils;


interface EventEditorProps { elem: DOMElement, onFinished(save: boolean): unknown, root: DOMElement, eventEdited?: boolean };

export const EventEditor: React.FC<EventEditorProps> = ({ elem, onFinished, root, eventEdited }) => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [eventRole, setEventRole] = useState<string | undefined>(eventEdited ? DomUtils.attr(elem, 'role') : undefined);
    const [eventDate, setEventDate] = useState<string | undefined>(eventEdited ? DomUtils.attr(elem, 'date') : undefined);

    const onEscape = useCallback(() => {
        onFinished(false);
    }, [onFinished]);

    useEffect(() => {
        const state = processElement(elem, ContentState.createFromBlockArray([]), true);
        const inlineDecorator = new CompositeDecorator([
            {
                strategy: (block, callback, _state) => {
                    block.findEntityRanges(c => !!c.getEntity(), callback);
                },
                component: IconComponent
            }
        ]);
        setEditorState(EditorState.createWithContent(state, inlineDecorator));
    }, [elem, eventEdited]);


    return <>
        {eventEdited && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>
                <EventRowSelector role={eventRole} onRoleSelected={setEventRole} />
            </span>
            <span>
                <NumberInput icons={false} min={-100000} max={100000} value={Number(eventDate || 0)} onChange={v => setEventDate(String(v))} />
                <Label pointing='left'>Nap</Label>
            </span>
        </div>
        }
        <EditingButtons editorState={editorState} setEditorState={setEditorState} root={root} />
        <Segment style={{ fontSize: 'larger' }}>
            <Editor editorState={editorState} onChange={setEditorState} keyBindingFn={e => {
                if (e.key === 'Escape') {
                    return 'my-escape';
                }
                return getDefaultKeyBinding(e);
            }}
                handleKeyCommand={c => {
                    if (c === 'my-escape') {
                        onEscape();
                        return 'handled';
                    }
                    return 'not-handled';
                }}

            />
        </Segment>
        <Button floated='left' primary onClick={() => {
            if (eventEdited) {
                DomUtils.attr(elem, 'role', eventRole);
                if (eventDate !== undefined) {
                    DomUtils.attr(elem, 'date', eventDate.toString());
                }
            }
            elem.elements = toElements(editorState.getCurrentContent(), elem);
            console.log('edited', DomUtils.print(elem))
            onFinished(true);
        }
        }>Save</Button>
        <Button floated='right' circular color='red' basic content='Cancel' onClick={() => onFinished(false)} />
    </>;
}
