import React from 'react';
import "./ContactComponent.css";
import CardComponent from '../cards/CardComponent.js';

const ContactComponent = () => {
    const contactInfo = [
        {
            title: "Email Us",
            description: "You can reach us at contact@neonverse.com for any inquiries.",
            image: "/assets/pictures/email.png"
        },
        {
            title: "Call Us",
            description: "Our support team is available at +1 234 567 890.",
            image: "/assets/pictures/phone.png"
        },
        {
            title: "Visit Us",
            description: "Come visit us at 123 Neon Street, Neon City.",
            image: "/assets/pictures/location.png"
        }
    ];

    return (
        <div className='ContactMainDiv'>
            <div className='ContactContent'>
                <h1 className='ContactTitle'>Contact Us</h1>
                <div className='ContactCards'>
                    {contactInfo.map((info, index) => (
                        <CardComponent
                            key={index}
                            title={info.title}
                            description={info.description}
                            image={info.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactComponent;