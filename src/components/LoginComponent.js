import React, { useState} from 'react';
import './LoginComponent.css';
import axios from 'axios';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      // Redirect to another page or perform other actions
    } catch (err) {
      setError('Invalid email or password!');
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
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
      </div>
    </div>
  );
};

export default LoginComponent;