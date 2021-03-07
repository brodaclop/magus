import { EditorState, Modifier } from 'draft-js';
import React, { useState } from 'react';
import { Button, Dropdown, Input, Label, Modal } from 'semantic-ui-react';
import { DOMElement, DomUtils } from '../../utils/DomUtils';
import { EditorUtils } from '../../utils/EditorUtils';

const { addEntity } = EditorUtils;


export const EditingButtons: React.FC<{ editorState: EditorState; setEditorState(s: EditorState): unknown, root: DOMElement }> = ({ editorState, setEditorState, root }) => {

    const [editorPopup, setEditorPopup] = useState<string>();
    const [editedValue, setEditedValue] = useState<Record<string, string>>({});

    function addTag(name: string, attrs?: Record<string, string>) {
        const selection = editorState.getSelection();
        const newContent = addEntity(editorState.getCurrentContent(), name, attrs, selection.getStartOffset(), selection.getEndOffset());
        setEditorState(EditorState.push(editorState, newContent, 'apply-entity'));
    }

    function findTargets(type: string): Array<{ key: string, text: string, value: string }> {
        return DomUtils.findElementsByName(root, type).filter(e => DomUtils.attr(e, 'id')).map(e => ({ key: DomUtils.attr(e, 'id'), value: DomUtils.attr(e, 'id'), text: DomUtils.childText(e, 'name') }));
    }

    return <>
        <Modal open={editorPopup !== undefined} onClose={() => setEditorPopup(undefined)}>
            <Modal.Content>
                {editorPopup === 'roll' && <>
                    <Input labelPosition='left' value={editedValue.details ?? ''} onChange={e => setEditedValue({ details: e.target.value })}>
                        <Label pointing='right' basic>Dobás</Label>
                        <input />
                    </Input>
                    <Button primary onClick={() => {
                        addTag('roll', editedValue);
                        setEditedValue({});
                        setEditorPopup(undefined)
                    }
                    }>OK</Button>
                </>}
                {(editorPopup === 'character' || editorPopup === 'item') && <>
                    <Dropdown
                        fluid
                        search
                        selection
                        value={editedValue.ref}
                        options={findTargets(editorPopup)}
                        onChange={(e, data) => setEditedValue({ ref: data.value?.toString() ?? '' })} />
                    <Button primary onClick={() => {
                        addTag(editorPopup, editedValue);
                        setEditedValue({});
                        setEditorPopup(undefined)
                    }
                    }>OK</Button>
                </>}
                {editorPopup === 'setting' && <>
                    <div>
                        <Input labelPosition='left' value={editedValue.map ?? ''} onChange={e => setEditedValue({ ...editedValue, map: e.target.value })}>
                            <Label pointing='right' basic>Térkép link</Label>
                            <input />
                        </Input>
                    </div>
                    <div>
                        <Input labelPosition='left' value={editedValue.description ?? ''} onChange={e => setEditedValue({ ...editedValue, description: e.target.value })}>
                            <Label pointing='right' basic>Leírás link</Label>
                            <input />
                        </Input>
                    </div>
                    <Button primary onClick={() => {
                        addTag('setting', editedValue);
                        setEditedValue({});
                        setEditorPopup(undefined)
                    }
                    }>OK</Button>
                </>}
            </Modal.Content>
        </Modal>
        <Button onClick={() => addTag('reward')} icon='trophy'></Button>
        <Button onClick={() => setEditorPopup('roll')} icon='cube'></Button>
        <Button onClick={() => setEditorPopup('setting')} icon='map marker alternate'></Button>
        <Button onClick={() => setEditorPopup('character')} icon='user outline'></Button>
        <Button onClick={() => setEditorPopup('item')} icon='gift'></Button>
        <Button floated='right' onClick={() => {
            const newContent = Modifier.applyEntity(editorState.getCurrentContent(), editorState.getSelection(), null);

            setEditorState(EditorState.push(editorState, newContent, 'apply-entity'));
        }} icon='remove circle'></Button>

    </>;
}