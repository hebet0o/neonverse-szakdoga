import React, { useState, useRef, useEffect } from 'react';
import './LoginComponent.css';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const modelViewerRef = useRef(null);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;

    const handleLoad = () => {
      modelViewer.cameraTarget = '4.6m 8m 1m';

      if (modelViewer.model && modelViewer.model.scene) {
        modelViewer.model.scene.scale.set(1, 1, 1);
      }
    };

    modelViewer.addEventListener('load', handleLoad);
    return () => {
      modelViewer.removeEventListener('load', handleLoad);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === 'admin' && password === 'password') {
      alert('Bejelentkezés sikeres!');
        //bejelentkezes logic
    } else {
      setError('Hibás felhasználónév vagy jelszó!');
    }
  };

  return (
    <div className="bgDiv">
      <div className="ctrlDiv">
        <div className="login-container">
          <video
            autoPlay
            muted
            loop
            className="logo-video"
            src="assets/pictures/logintext.webm"
          />
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
        <model-viewer
          id="reveal"
          ref={modelViewerRef}
          autoplay
          ar
          ar-modes="webxr scene-viewer"
          shadow-intensity="3"
          src="assets/models/loginmodel.glb"
          alt="Avatar"
        ></model-viewer>
      </div>
    </div>
  );
};

export default LoginComponent;
