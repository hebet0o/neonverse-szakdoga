import React from 'react';
import './HeaderComponent.css';
import { Link, useNavigate } from 'react-router-dom';
import pb from '../pocketbase';

const HeaderComponent = () => {
  const navigate = useNavigate();
  const isLoggedIn = pb.authStore.isValid;

  const handleLogout = () => {
    pb.authStore.clear(); // Clear authentication state
    navigate('/'); // Redirect to home page
  };

  return (
    <header className="header-menu">
      <nav className="nav-container">
        <ul className="nav-list">
          <Link to="/"><video autoPlay muted loop className="logo-video" src="assets/pictures/logo_anim.mp4"/></Link>
          
          <li className="nav-item">
            <Link to="/virtual-assets" className="nav-link">VIRTUAL ASSETS</Link>
          </li>
          <li className="nav-item">
            <Link to="/nft" className="nav-link">NFT</Link>
          </li>
          <li className="nav-item">
            <a 
              href="https://3d-avatar-builder-orpin.vercel.app/" 
              className="nav-link" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              MAKE YOUR AVATAR
            </a>
          </li>
          <li className="nav-item">
            <Link to="/virtual-events" className="nav-link">VIRTUAL EVENTS</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">CONTACT</Link>
          </li>

          <div className="auth-buttons">
            {isLoggedIn ? (
              <button className="auth-btn logout-btn" onClick={handleLogout}>LOGOUT</button>
            ) : (
              <>
                <Link to="/login"><button className="auth-btn login-btn">LOGIN</button></Link>
                <Link to="/register"><button className="auth-btn register-btn">REGISTER</button></Link>
              </>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;