import React, { Component, ReactNode } from 'react'

export interface DragAndDropProps {
    handleDrop: (files: FileList) => unknown;
    dragPlaceholder: ReactNode
}

class DragAndDrop extends Component<DragAndDropProps, {}> {
    state = {
        drag: false
    }
    dropRef = React.createRef<HTMLDivElement>();
    dragCounter = 0;

    handleDrag = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
    }

    handleDragIn = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter++
        if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
            this.setState({ drag: true })
        }
    }
    handleDragOut = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        this.dragCounter--
        if (this.dragCounter === 0) {
            this.setState({ drag: false })
        }
    }
    handleDrop = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({ drag: false })
        if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
            this.props.handleDrop(e.dataTransfer.files)
            e.dataTransfer.clearData()
            this.dragCounter = 0
        }
    }
    componentDidMount() {
        let div = this.dropRef.current;
        if (div) {
            div.addEventListener('dragenter', this.handleDragIn)
            div.addEventListener('dragleave', this.handleDragOut)
            div.addEventListener('dragover', this.handleDrag)
            div.addEventListener('drop', this.handleDrop)
        }
    }
    componentWillUnmount() {
        let div = this.dropRef.current;
        if (div) {
            div.removeEventListener('dragenter', this.handleDragIn)
            div.removeEventListener('dragleave', this.handleDragOut)
            div.removeEventListener('dragover', this.handleDrag)
            div.removeEventListener('drop', this.handleDrop)
        }
    }

    render() {
        return (
            <div
                style={{ display: 'inline-block', position: 'relative' }}
                ref={this.dropRef}
            >
                {this.state.drag ? this.props.dragPlaceholder : this.props.children}
            </div>
        )
    }
}
export default DragAndDrop