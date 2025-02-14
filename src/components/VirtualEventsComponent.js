import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./VirtualEventsComponent.css";
import EventCardComponent from '../cards/EventCardComponent.js';

axios.deafultsWithCredentials = true;
//npm install axios
const VirtualEventsComponent = () => {
    const [events, setEvents] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
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
            setCurrentIndex(currentIndex + eventsPerPage);
        }
    };

    const prevEvents = () => {
        if (currentIndex - eventsPerPage >= 0) {
            setCurrentIndex(currentIndex - eventsPerPage);
        }
    };

    const currentEvents = events.slice(currentIndex, currentIndex + eventsPerPage);

    return (
        <div className='EventsMainDiv'>
            <div className="EventContent">
            <video autoPlay muted loop className="background-video" src="assets/pictures/avataraccessoriesbg.mp4"/>
                <h1 style={{ color: '#adff2f'}}>Events This Week</h1>
                    {events.length === 0 ? (
                        <h2 style={{color: 'white'}}>There are currently no events</h2>
                    ) : 
                    (
                        <>
                            <div className='EventsCarousel'>
                                {currentEvents.map((event, index) => (
                                    <EventCardComponent key={index} event={event} />
                                ))}
                                {currentEvents.length < eventsPerPage && Array(eventsPerPage - currentEvents.length).fill(null).map((_, index) => (
                                    <div key={index} className='EmptyEventCard'></div>
                                ))}
                            </div>
                            <div className='EventsNavigation'>
                                {currentIndex > 0 && <button onClick={prevEvents}>Left</button>}
                                {currentIndex + eventsPerPage < events.length && <button onClick={nextEvents}>Right</button>}
                            </div>
                        </>
                    )}
            </div>
        </div>
    );
};

export default VirtualEventsComponent;