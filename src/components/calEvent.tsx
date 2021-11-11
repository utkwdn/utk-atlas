import React from 'react';

const CalEvent = props => {

  const [fetchedEvents, setEvents] = React.useState( {} );

  React.useEffect(() => {
    const fetchUserEmail = async () => {
      const response = await fetch("https://calendar.utk.edu/api/2/events?page=1&pp=5");
      const fetchedEvents = await response.json();
      setEvents(fetchedEvents);
    };
    fetchUserEmail();
  }, []);

  fetchedEvents?.events?.map((event) => (
    console.log(event)
  ));

  return (
    <div>
      <h1>Event Titles</h1>
      {
      fetchedEvents?.events?.map((event) => (
        <h4 key={event?.event.id}>{event?.event.title}</h4>
      ))
      }
    </div>
  );
};

export default CalEvent;