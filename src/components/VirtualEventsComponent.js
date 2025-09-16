import React, { useEffect, useState } from 'react';
import pb from '../pocketbase';
import EventCardComponent from '../cards/EventCardComponent';
import './VirtualEventsComponent.css';
import BlurText from '../text-animations/BlurText';
import { rsvpToEvent } from '../api/rsvpToEvent';

const EVENTS_PER_PAGE = 3;

const VirtualEventsComponent = () => {
  const user = pb.authStore.model;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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
    if (page > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setPage(page - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setPage(page + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Get only the events for the current page
  const startIdx = page * EVENTS_PER_PAGE;
  const currentEvents = events.slice(startIdx, startIdx + EVENTS_PER_PAGE);

  // Create Event form state
  const [newEventName, setNewEventName] = useState('');
  const [newEventLongDescription, setNewEventLongDescription] = useState('');
  const [newEventShortDescription, setNewEventShortDescription] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');
  const [createSuccess, setCreateSuccess] = useState('');

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    setCreateError('');
    setCreateSuccess('');
    try {
      const newEvent = {
        title: newEventName,
        short_description: newEventShortDescription,
        long_description: newEventLongDescription,
        time: newEventDate,
      };
      await pb.collection('events').create(newEvent);
      setCreateSuccess('Event created successfully!');
      setNewEventName('');
      setNewEventShortDescription('');
      setNewEventLongDescription('');
      setNewEventDate('');
      //refresh
      const response = await pb.collection('events').getFullList({});
      setEvents(response);
    } catch (error) {
      setCreateError('Failed to create event: ' + (error?.message || 'Unknown error'));
    } finally {
      setCreateLoading(false);
    }
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
      <div className="EventsMainDiv">
        <section className="EventsSection EventsCarouselSection">
          <video autoPlay muted loop className="background-video" src="assets/pictures/avataraccessoriesbg.mp4" />
          <div className="EventContent">
            <BlurText
              text="Upcoming Events"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-2xl mb-8 NFTTitle"
            />
            {loading ? (
              <div>Loading events...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : events.length > 0 ? (
              <>
                <div className={`EventsCarousel${isAnimating ? ' fade' : ''}`}>
                  {currentEvents.map((event) => (
                    <EventCardComponent key={event.id} event={event} user={user} onRSVP={rsvpToEvent} />
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
        </section>
        <section className="EventsSection CreateEventSectionWrapper">
          <div className="CreateEventSection">
            <BlurText
              text="Create New Event"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-xl mb-4 CreateEventTitle" />
            <form className="CreateEventForm" onSubmit={handleCreateEvent}>
              <input
                type="text"
                placeholder="Event Name"
                className="CreateEventInput"
                value={newEventName}
                onChange={e => setNewEventName(e.target.value)}
                required />
              <input
                type="text"
                placeholder="Short Description (e.g. 'Workshop on AI')"
                className="CreateEventInput"
                value={newEventShortDescription}
                onChange={e => setNewEventShortDescription(e.target.value)}
                required />
              <textarea
                placeholder="Description"
                className="CreateEventInput"
                rows={3}
                value={newEventLongDescription}
                onChange={e => setNewEventLongDescription(e.target.value)}
                required />
              <input
                type="date"
                className="CreateEventInput"
                value={newEventDate}
                onChange={e => setNewEventDate(e.target.value)}
                required />
              <button type="submit" className="CreateEventButton" disabled={createLoading}>
                {createLoading ? 'Creating...' : 'Create Event'}
              </button>
              {createError && <div className="error-message">{createError}</div>}
              {createSuccess && <div className="success-message">{createSuccess}</div>}
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default VirtualEventsComponent;