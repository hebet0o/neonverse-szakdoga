import React from 'react';
import './HeaderComponent.css';
import logoVideo from '../shared/logo_anim.webm';


const HeaderComponent = () => {
  return (
    <header className="header-menu">
    <nav className="nav-container">
      <ul className="nav-list">
              <a href="#home"><video autoPlay muted loop className="logo-video" src={logoVideo}/></a>
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