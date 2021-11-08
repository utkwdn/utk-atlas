import React from 'react';
import { TimelineEvent as TimelineEventType } from 'client';

interface TimelineEventProps {
    timelineEvent: TimelineEventType;

}

export default function TimelineEvent({ timelineEvent }: TimelineEventProps): JSX.Element {
  return (
    <div>
      <h2>{timelineEvent.title()}</h2>
      <div 
        dangerouslySetInnerHTML={{ __html: timelineEvent.content() }} 
      />
    </div>
  );
}