import React from 'react';
import "./EventCardComponent.css";

const EventCardComponent = ({ event }) => {
    return (
        <div className='EventBackground'>
            <div className='EventCard'>
                <h3>{event.title}</h3>
                <p>{event.short_description}</p>
                <p>{event.long_description}</p>
                <p>{event.date}</p>
            </div>
        </div>
    );
};

export default EventCardComponent;