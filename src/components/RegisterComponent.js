import React from 'react';
import "./RegisterComponent.css";
import { useState } from 'react';


const RegisterComponent = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (username === 'admin' && password === 'password' && phone === '123456' && email === 'asd@gmail.com') {
        alert('Bejelentkezés sikeres!');
            //Regisztracio logic
        } else {
        setError('Wrong username, or password!');
        }
    };
 
    return(
        <div className="bgDivReg">
      <div className="register_ctrlDiv">
        <div className="register-container">
          <video
            autoPlay
            muted
            loop
            className="register-video"
            src="assets/pictures/registertext.mp4"
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
            <div className="form-group">
              <label htmlFor="password">EMAIL</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">PHONE</label>
              <input
                type="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-button">
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
    ); 
};

export default RegisterComponent;