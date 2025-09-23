import React, { useState, useEffect } from 'react';
import './EventCardComponent.css';
import pb from '../pocketbase';

const EventCardComponent = ({ event, user, onRSVP }) => {
  const [attending, setAttending] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (user) {
      console.log('RSVP CHECK:', { eventId: event.id, userId: user.id });
      pb.collection('EventAttendees')
        .getList(1, 1, {
          filter: `event_id="${event.id}" && user_id="${user.id}"`
        })
        .then(result => {
          setAttending(result.items.length > 0);
        })
        .catch(() => setAttending(false));
    } else {
      setAttending(false);
    }
    return () => { isMounted = false; };
  }, [user, event.id]);
  const handleRSVP = async () => {
    if (!user) {
      alert("Please log in to RSVP.");
      return;
    }
    setLoading(true);
    try {
      await onRSVP(event.id, user.id);
      setAttending(true);
    } catch (err) {
      alert("Failed to RSVP. Please try again.");
    }
    setLoading(false);
  };

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
      <button
        onClick={handleRSVP}
        id="RSVPButton"
        disabled={attending || loading}
        className={attending ? "attending" : ""}
      >
        {attending ? "You're attending" : loading ? "Attending..." : "Attend"}
      </button>
    </div>
  );
};

export default EventCardComponent;