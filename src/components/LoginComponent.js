import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '../pocketbase';
import { useForm } from 'react-hook-form';
import './LoginComponent.css';

const LoginComponent = () => {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState(''); 
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function login(data) {
    setLoading(true);
    setErrorMessage('');
    try {
      await pb.collection('users').authWithPassword(data.email, data.password);
      setLoading(false);
      if (pb.authStore.isValid) {
        setErrorMessage('Login successful');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setErrorMessage('Login failed');
      }
    } catch (error) {
      setErrorMessage('Login failed: ' + (error?.message || 'Unknown error'));
      setLoading(false);
    }
  }

  return (
    <div className="bgDiv">
      <div className="ctrlDiv">
        <div className="login-container">
          <video autoPlay muted loop className="logo-video" src="assets/pictures/logintext.webm"/>
          <form onSubmit={handleSubmit(login)}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...register('email')}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register('password')}
                required
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button disabled={isLoading} type="submit" className="submit-button">{isLoading ? "Loading" : "Login"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;