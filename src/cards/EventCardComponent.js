import React from 'react';
import './EventCardComponent.css';

const EventCardComponent = ({ event }) => {
  

  const formattedTime = event.time
    ? new Date(event.time).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'No time specified';

  return (
    <div className="EventCard">
      <h3 className="EventTitle">{event.title}</h3>
      <p className="EventShortDescription">{event.short_description}</p>
      <p className="EventLongDescription">{event.long_description}</p>
      <div className="EventDetails">
        <p className="EventTime">Time: {formattedTime}</p>
      </div>
    </div>
  );
};

export default EventCardComponent;