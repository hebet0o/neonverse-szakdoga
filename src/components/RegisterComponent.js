import React, { useState } from 'react';
import pb from '../pocketbase';
import { useForm } from "react-hook-form";
import './RegisterComponent.css';

const RegisterComponent = () => {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState(''); 
  const [isLoading, setLoading] = useState(false);

  async function onRegister(data) {
    setLoading(true);
    setErrorMessage('');
    try {
    
      await pb.collection('users').create({
        username: data.username,
        email: data.email,
        password: data.password,
        passwordConfirm: data.password, 
      });
    
      await pb.collection('users').authWithPassword(data.email, data.password);
      setErrorMessage('Registration successful! Redirecting...');
      setTimeout(() => {
        window.location.href = '/'; 
      }, 1500);
    } catch (error) {
      setErrorMessage('Registration failed: ' + (error?.message || 'Unknown error'));
    }
    setLoading(false);
  }

  return (
    <div className="bgDiv">
      <div className="ctrlDiv">
        <div className="login-container">
          <video autoPlay muted loop className="logo-video" src="assets/pictures/registertext.mp4"/>
          <form onSubmit={handleSubmit(onRegister)}>
            <div className="form-group">
              <label htmlFor="text">Username</label>
              <input
                type="text"
                id="username"
                {...register('username')}
                required
              />
            </div>
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
            <button disabled={isLoading} type="submit" className="submit-button">{isLoading ? "Loading" : "Register"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default RegisterComponent;