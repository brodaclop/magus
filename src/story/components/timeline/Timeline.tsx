import React from 'react';
import { Popup } from 'semantic-ui-react';

export interface TimelineEvent {
    date: number;
    content: JSX.Element;
}

export const Timeline: React.FC<{ events: Array<TimelineEvent>; width: number }> = ({ events, width }) => {

    if (events.length < 2) {
        return null;
    }

    const orderedEvents = events.sort((a, b) => a.date - b.date);


    const heights = [...Array(orderedEvents.length - 1).fill(0).map((_, i) => orderedEvents[i + 1].date - orderedEvents[i].date), 0];

    const unitHeight = 100 / heights.reduce((acc, curr) => acc + curr, 0);

    const TimelineUnit: React.FC<{ height: number, event: TimelineEvent, position: 'left' | 'right' }> = ({ height, event, position }) => {
        const crossbar = () => <div style={{ backgroundColor: 'black', position: 'relative', top: 0, left: '-10px', width: `${20 + width}px`, height: '1px' }}>
            &nbsp;
            </div>
        return <div style={{ flexBasis: `${height}%`, width: `${width}px`, backgroundColor: 'black' }}>
            <Popup style={{ zIndex: 0 }} trigger={crossbar()} open={true} position={position === 'left' ? 'left center' : 'right center'} pinned wide>
                {event.content}
            </Popup>
            <Popup style={{ border: 'none', boxShadow: 'none', zIndex: 0 }} trigger={crossbar()} open={true} position={position === 'left' ? 'right center' : 'left center'} pinned basic>
                {event.date}
            </Popup>
        </div>
    }


    return <div style={{ height: '1000px', alignItems: 'center', display: 'flex', flexDirection: 'column', flexWrap: 'nowrap' }}>
        {heights.map((height, i) => <TimelineUnit height={height * unitHeight} event={orderedEvents[i]} position={i % 2 ? 'left' : 'right'} />)}
    </div>
}