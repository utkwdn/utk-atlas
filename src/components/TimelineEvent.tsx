import { timelineEvent as TimelineEventType } from 'client';

interface TimelineEventProps {
    timelineEvent: TimelineEventType;
}

export default function TimelineEvent({ timelineEvent }: TimelineEventProps) {
  return (
    <div>
      <h2>{timelineEvent?.title}</h2>
      <h3>{timelineEvent?.start_year}</h3>
      <div
        dangerouslySetInnerHTML={{ __html: timelineEvent?.content }}
      />
    </div>
  );
}