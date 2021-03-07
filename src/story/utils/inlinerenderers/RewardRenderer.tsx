import React from 'react';
import { Icon } from 'semantic-ui-react';
import { RendererComponent } from '../RenderUtils';

export const RewardRenderer: RendererComponent = ({ children }) => <><Icon name='trophy' fitted /> <strong>{children}</strong></>;