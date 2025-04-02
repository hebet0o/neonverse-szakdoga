import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterComponent.css';

const RegisterComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    age: '',
    bio: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Submitting form data:', formData);
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Registration successful');
        navigate('/login');
      } else {
        console.error('Registration failed:', data.message);
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registerbg">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;
