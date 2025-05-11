import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '../pocketbase';
import './RegisterComponent.css';

const RegisterComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
     await pb.collection('users').create({
      name: username,
      email: email,
      password: password,
    });
      alert('Successful registration!');
      navigate('/'); 
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage('Registration failed.');
    }
  };

  return (
    <div className="bgDiv">
      <div className="ctrlDiv">
        <div className="login-container">
          <video autoPlay muted loop className="logo-video" src="assets/pictures/registertext.mp4"/>
          <form onSubmit={handleRegistration}>
            <div className="form-group">
              <label htmlFor="text">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
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
            <button type="submit" className="submit-button">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;