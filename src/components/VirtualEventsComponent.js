import React, { useEffect, useState } from 'react';
import pb from '../pocketbase';
import EventCardComponent from '../cards/EventCardComponent';
import './VirtualEventsComponent.css';

const EVENTS_PER_PAGE = 3;

const VirtualEventsComponent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError('');
      try {
        const response = await pb.collection('events').getFullList({});
        setEvents(response);
      } catch (error) {
        setError('Failed to fetch events: ' + (error?.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Get only the events for the current page
  const startIdx = page * EVENTS_PER_PAGE;
  const currentEvents = events.slice(startIdx, startIdx + EVENTS_PER_PAGE);

  return (
    <div className="EventsMainDiv">
      <video autoPlay muted loop className="background-video" src="assets/pictures/avataraccessoriesbg.mp4" />
      <div className="EventContent">
        <h1 className="EventsTitle">Upcoming Events</h1>
        {events.length > 0 ? (
          <>
            <div className="EventsCarousel">
              {currentEvents.map((event) => (
                <EventCardComponent key={event.id} event={event} />
              ))}
            </div>
            <div className="EventsNavigation">
              <button
                className={`carousel-button ${page === 0 ? 'disabled' : ''}`}
                onClick={handlePrev}
                disabled={page === 0}
              >
                <img src="assets/pictures/right-arrow.png" alt="Previous" className="arrow-icon left" />
              </button>
              <span className="carousel-page-indicator">
                {page + 1} / {totalPages}
              </span>
              <button
                className={`carousel-button ${page === totalPages - 1 ? 'disabled' : ''}`}
                onClick={handleNext}
                disabled={page === totalPages - 1}
              >
                <img src="assets/pictures/right-arrow.png" alt="Next" className="arrow-icon" />
              </button>
            </div>
          </>
        ) : (
          <div className="EmptyEventCard">No events available</div>
        )}
      </div>
    </div>
  );
};

export default VirtualEventsComponent;