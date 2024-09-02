import React from 'react';
import './HeaderComponent.css';
import logoVideo from '../shared/logo_anim.webm';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <header className="header-menu">
      <nav className="nav-container">
        <ul className="nav-list">
          <Link to="/"><video autoPlay muted loop className="logo-video" src={logoVideo} /></Link>
          
          <li className="nav-item">
            <Link to="/virtual-assets" className="nav-link">VIRTUAL ASSETS</Link>
          </li>
          <li className="nav-item">
            <Link to="/nft" className="nav-link">NFT</Link>
          </li>
          <li className="nav-item">
            <Link to="/avatar-accessories" className="nav-link">AVATAR ACCESSORIES</Link>
          </li>
          <li className="nav-item">
            <Link to="/virtual-events" className="nav-link">VIRTUAL EVENTS</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">CONTACT</Link>
          </li>

          <div className="auth-buttons">
            <Link to="/login"><button className="auth-btn login-btn">LOGIN</button></Link>
            <Link to="/register"><button className="auth-btn register-btn">REGISTER</button></Link>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;
