import React from 'react';

interface Event {
  id: number;
  title: string;
}

const CalEvent = () => {
  const [events, setEvents] = React.useState<Event[]>([]);

  React.useEffect(() => {
    const fetchCalEvents = async () => {
      const response = await fetch(
        'https://calendar.utk.edu/api/2/events?page=1&pp=5'
      );
      const { events: fetchedEvents } = (await response.json()) as {
        events: Event[];
      };
      setEvents(fetchedEvents);
    };
    void fetchCalEvents();
  }, []);

  return (
    <div>
      <h1>Event Titles</h1>
      {events.length > 0 && (
        <ul>
          {events.map((event) => (
            <li key={event.id}>{event.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CalEvent;
