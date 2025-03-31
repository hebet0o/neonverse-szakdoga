import React from 'react';
import "./CardComponent.css";

const CardComponent = ({ title, description, image }) => {
    return (
        <div className='Card'>
            <img src={image} alt={title} className='CardImage' />
            <div className='CardContent'>
                <h3 className='CardTitle'>{title}</h3>
                <p className='CardDescription'>{description}</p>
            </div>
        </div>
    );
};

export default CardComponent;