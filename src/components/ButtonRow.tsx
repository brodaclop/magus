import React from 'react';
import ReactDOM from 'react-dom';

export const ButtonRow: React.FC<{}> = ({ children }) => {
    return ReactDOM.createPortal(<>{children}</>, document.getElementById('buttonrow') as Element);
}