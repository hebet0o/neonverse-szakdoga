import React, { useEffect, useState } from 'react';
import pb from '../pocketbase';
import EventCardComponent from '../cards/EventCardComponent';
import './VirtualEventsComponent.css';

const VirtualEventsComponent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < events.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(''); // Clear any previous errors
        console.log('Fetching events...');
        const result = await pb.collection('Events').getFullList({});
        console.log('Fetched events:', result);
        setEvents(result);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
  return (
    <div className="EventsMainDiv">
      <video autoPlay muted loop className="background-video" src="assets/pictures/events_background.mp4" />
      <div className="EventContent">
        <h1 className="EventsTitle">Upcoming Events</h1>
        {events.length > 0 ? (
          <>
            <div className="EventsCarousel" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {events.map((event) => (
                <EventCardComponent key={event.id} event={event} />
              ))}
            </div>
            <div className="EventsNavigation">
              <button
                className={`carousel-button ${currentIndex === 0 ? 'disabled' : ''}`}
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <img src="assets/pictures/right-arrow.png" alt="Previous" className="arrow-icon left" />
              </button>
              <button
                className={`carousel-button ${currentIndex === events.length - 1 ? 'disabled' : ''}`}
                onClick={handleNext}
                disabled={currentIndex === events.length - 1}
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