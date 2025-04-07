import React from 'react';
import "./EventCardComponent.css";

const EventCardComponent = ({ event }) => {
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className='EventBackground'>
            <div className='EventCard'>
                <h3 className="Title">{event.title}</h3>
                <p className="ShortDesc">{event.short_description}</p>
                <p className="LongDesc">{event.long_description}</p>
                <div className="DateContainer">
                    <img src="assets/pictures/eventlogo.png" alt="Event Logo" className="EventLogo" />
                    <p className="Date">{formattedDate}</p>
                </div>
                <button className="auth-btn login-btn">SEE MORE...</button>
            </div>
        </div>
    );
};

export default EventCardComponent;