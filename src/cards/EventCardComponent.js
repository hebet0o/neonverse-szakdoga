import React from 'react';
import "./EventCardComponent.css";

const EventCardComponent = ({ event }) => {
    return (
        <div className='EventBackground'>
            <div className='EventCard'>
                <h3 className="Title">{event.title}</h3>
                <p className="ShortDesc">{event.short_description}</p>
                <p className="LongDesc">{event.long_description}</p>
                <p className="Date">{event.date}</p>
            </div>
        </div>
    );
};

export default EventCardComponent;