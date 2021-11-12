import React from 'react';
import { TimelineEvent as TimelineEventType } from 'client';

interface TimelineEventProps {
    timelineEvent: TimelineEventType;

}

export default function TimelineEvent({ timelineEvent }: TimelineEventProps): JSX.Element {
  return (
    <div class="col">
      <h3>{timelineEvent.title()}</h3>
      <div
        dangerouslySetInnerHTML={{ __html: timelineEvent.content() }}
      />
    </div>
  );
}
