import React from "react";
import './HomeComponent.css';

const HomeComponent = () => {
    return (
        <div className="home-container">
            <video autoPlay muted loop className="background-video" src="assets/pictures/background.mp4"/>
            <div className="content">
                <div className="text-content">
                    <h1>SEE INTO THE FUTURE</h1>
                    <p>Step into a world where reality blends with the digital.<br/>
                    Explore a marketplace built for the next generation<br/>
                    where you can BUY, SELL, AND EXPERIENCE the</p>
                    <h2 className="green">UNIMAGINABLE.</h2>
                    <button className="explore-btn">ENTER THE WORLD</button>
                </div>
                <model-viewer camera-controls touch-action="pan-y" autoplay ar ar-modes="webxr scene-viewer" scale="0.2 0.2 0.2" camera-target="0m 0.20m 0m" shadow-intensity="1" src="assets/models/mainmodel_low.glb" alt="Main 3D model"></model-viewer>
            </div>
        </div>
    );
};

export default HomeComponent;