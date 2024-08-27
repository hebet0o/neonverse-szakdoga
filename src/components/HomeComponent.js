import React from "react";
import './HomeComponent.css';
import bgVideo from '../shared/background.mp4';

const HomeComponent = () => {
    return (
        <div className="home-container">
        <video autoPlay muted loop className="background-video" src={bgVideo}/>
        <div className="content">
            <h1>SEE INTO THE FUTURE
            <p>Step into a world where reality blends with the digital.<br></br>
            Explore a marketplace built for the next generation<br></br>
            where you can BUY, SELL, AND EXPERIENCE the
            </p></h1><h2 className="green">UNIMAGINABLE.</h2>
            <button className="explore-btn">ENTER THE WORLD</button>
        </div>
        </div>
    );
};

export default HomeComponent;