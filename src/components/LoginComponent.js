import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '../pocketbase';
import './LoginComponent.css';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Ensure this is correctly imported and used

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await pb.collection('users').authWithPassword(email, password);
      alert('Login successful!');
      navigate('/register');
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Invalid email or password.');
    }
  };

  return (
    <div className="bgDiv">
      <div className="ctrlDiv">
        <div className="login-container">
          <video autoPlay muted loop className="logo-video" src="assets/pictures/logintext.webm"/>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="submit-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;