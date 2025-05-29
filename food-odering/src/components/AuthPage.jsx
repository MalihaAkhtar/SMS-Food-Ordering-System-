import React, { useState } from 'react';
import '../styles.css';
import foodImage from '../assets/Acount-side.png';
import userIcon from '../assets/user.png';
import mailIcon from '../assets/mail.png';
import passwordIcon from '../assets/password.png';
import hideIcon from '../assets/hide.png';

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    // For now, just show the data
    alert(`Name: ${formData.name}\nEmail: ${formData.email}\nPassword: ${formData.password}`);
  };

  return (
    <div className="container">
      {/* Left Panel */}
      <div className="left-panel">
        <img src={foodImage} alt="Food" />
        <div className="overlay">
          <h2>Welcome Back!</h2>
          <p>To keep connected with us please login with your personal info</p>
          <button className="signin" onClick={() => alert("Redirecting to login...")}>
            SIGN IN
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <h2>Create Account</h2>

       <div className="social-buttons">
          <button onClick={() => alert('Google Sign In Clicked')}>G+</button>
          <button onClick={() => alert('Facebook Sign In Clicked')}>f</button>
          <button onClick={() => alert('LinkedIn Sign In Clicked')}>in</button>
        </div>

        <div className="input-wrapper">
          <div className="input-container">
            <img src={userIcon} className="input-icon" alt="User" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-wrapper">
          <div className="input-container">
            <img src={mailIcon} className="input-icon" alt="Email" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-wrapper">
          <div className="input-container">
            <img src={passwordIcon} className="input-icon" alt="Password" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <img
              src={hideIcon}
              alt="Toggle"
              className="toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        <button className="signin" onClick={handleSignUp}>
          SIGN IN
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
