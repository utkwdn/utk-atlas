import React from 'react';

const CalEvent = props => {

  const [fetchedEvents, setEvents] = React.useState( { events: [] } );

  React.useEffect(() => {
    const fetchCalEvents = async () => {
      const response = await fetch("https://calendar.utk.edu/api/2/events?page=1&pp=5");
      const fetchedEvents = await response.json();
      setEvents(fetchedEvents);
    };
    fetchCalEvents();
  }, []);

  fetchedEvents?.events?.map((event) => (
    console.log(event)
  ));

  return (
    <div>
      <h1>Event Titles</h1>
      <ul>
      {
      fetchedEvents?.events?.map((event) => (
        <li key={event?.event.id}>{event?.event.title}</li>
      ))
      }
      </ul>
    </div>
  );
};

export default CalEvent;