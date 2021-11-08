import React from 'react';
import { client, TimelineEvent as TimelineEventType } from 'client';

interface TimelineEventProps {
    timelineEvent: TimelineEventType;
    //key?: string;
}

export default function TimelineEvent({ timelineEvent }: TimelineEventProps): JSX.Element {
    const { useQuery } = client;
    const theEvent = useQuery().timelineEvent({id: timelineEvent?.id});

    console.log(theEvent);

  return (
    <div>
      <h2>{theEvent?.title}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: theEvent?.uri }}
      />
    </div>
  );
}