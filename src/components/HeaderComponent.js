import React from 'react';
import './HeaderComponent.css';

const HeaderComponent = () => {
  return (
    <header className="header-menu">
    <nav className="nav-container">
      <ul className="nav-list">
              <a href="#home"><video src="public/logo_anim.mp4" autoPlay loop muted className="logo-video" type="video/mp4"></video></a>
              <li className="nav-item"><a href="#virtualassets" className="nav-link">VIRTUAL ASSETS</a></li>
              <li className="nav-item"><a href="#nft" className="nav-link">NFT</a></li>
              <li className="nav-item"><a href="#avataraccessories" className="nav-link">AVATAR ACCESSORIES</a></li>
              <li className="nav-item"><a href="#events" className="nav-link">VIRTUAL EVENTS</a></li>
              <li className="nav-item"><a href="#more" className="nav-link">MORE</a></li>
              <div className="auth-buttons">
                  <a href="#login"><button className="auth-btn login-btn">LOGIN</button></a>
                  <a href="#register"><button className="auth-btn register-btn">REGISTER</button></a>
              </div>
      </ul>
    </nav>
    </header>
  );
};

export default HeaderComponent;