import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./VirtualEventsComponent.css";
import EventCardComponent from '../cards/EventCardComponent.js';

const VirtualEventsComponent = () => {
    const [events, setEvents] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('');
    const eventsPerPage = 3;

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const nextEvents = () => {
        if (currentIndex + eventsPerPage < events.length) {
            setAnimationClass('slide-left');
            setTimeout(() => {
                setCurrentIndex(currentIndex + eventsPerPage);
                setAnimationClass('');
            }, 500);
        }
    };

    const prevEvents = () => {
        if (currentIndex - eventsPerPage >= 0) {
            setAnimationClass('slide-right');
            setTimeout(() => {
                setCurrentIndex(currentIndex - eventsPerPage);
                setAnimationClass('');
            }, 500);
        }
    };

    const currentEvents = events.slice(currentIndex, currentIndex + eventsPerPage);

    return (
        <div className='EventsMainDiv'>
            <div className="EventContent">
                <video autoPlay muted loop className="background-video" src="assets/pictures/avataraccessoriesbg.mp4"/>
                <h1 className="EventsTitle" style={{ color: '#adff2f'}}>Events This Week</h1>
                {events.length === 0 ? (
                    <h2 style={{color: 'white'}}>There are currently no events</h2>
                ) : (
                    <>
                        <div className="EventsCarouselWrapper">
                            <div className={`EventsCarousel ${animationClass}`}>
                                {currentEvents.map((event, index) => (
                                    <EventCardComponent key={index} event={event} />
                                ))}
                                {currentEvents.length < eventsPerPage && Array(eventsPerPage - currentEvents.length).fill(null).map((_, index) => (
                                    <div key={index} className='EmptyEventCard'></div>
                                ))}
                            </div>
                        </div>
                        <div className='EventsNavigation'>
                            <button 
                                className={`carousel-button left ${currentIndex === 0 ? 'disabled' : ''}`} 
                                onClick={prevEvents} 
                                disabled={currentIndex === 0}
                            >
                                <img src="/assets/pictures/right-arrow.png" alt="Previous" className="arrow-icon left" />
                            </button>
                            <button 
                                className={`carousel-button right ${currentIndex + eventsPerPage >= events.length ? 'disabled' : ''}`} 
                                onClick={nextEvents} 
                                disabled={currentIndex + eventsPerPage >= events.length}
                            >
                                <img src="/assets/pictures/right-arrow.png" alt="Next" className="arrow-icon right" />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default VirtualEventsComponent;