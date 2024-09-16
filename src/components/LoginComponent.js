import React, { useState } from 'react';
import './LoginComponent.css';
import logoVideo from '../shared/logintext.webm';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === 'admin' && password === 'password') {
      alert('Bejelentkezés sikeres!');
      // További logika itt (pl. navigáció, token mentése stb.)
    } else {
      setError('Hibás felhasználónév vagy jelszó!');
    }
  };

  

  return (
    <div className="bgDiv">
    <div className="ctrlDiv">
    <div className="login-container">
    <video autoPlay muted loop className="logo-video" src={logoVideo} />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          LOGIN
        </button>
      </form>
    </div>
    <model-viewer id="reveal"
    autoplay ar ar-modes="webxr scene-viewer" scale="15 15 15" shadow-intensity="3" 
    src="assets/models/loginmodel.glb" camera-target="90m 100m 10m"
    alt="Avatar"></model-viewer>
    </div>
    </div>
    
    
  );
};

export default LoginComponent;
