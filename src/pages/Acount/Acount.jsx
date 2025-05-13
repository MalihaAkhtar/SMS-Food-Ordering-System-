import React, { useState } from 'react';
import './styles.css';
import foodImage from '../../assets/Acount-side.png';
import userIcon from '../../assets/user.png';
import mailIcon from '../../assets/mail.png';
import passwordIcon from '../../assets/password.png';
import hideIcon from '../../assets/hide.png';

import { auth, googleProvider, facebookProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true); // Track whether it's sign up or sign in form

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    alert(`Name: ${formData.name}\nEmail: ${formData.email}\nPassword: ${formData.password}`);
  };

  const handleSignIn = () => {
    alert(`Email: ${formData.email}\nPassword: ${formData.password}`);
  };

  const handleGoogleSignIn = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      alert(`Signed in as: ${result.user.displayName}`);
    } catch (error) {
      alert("Google Sign-in Error: " + error.message);
    }
    setIsLoading(false);
  };

  const handleFacebookSignIn = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      alert(`Signed in as: ${result.user.displayName}`);
    } catch (error) {
      alert("Facebook Sign-in Error: " + error.message);
    }
    setIsLoading(false);
  };

  const handleLinkedInSignIn = () => {
    const clientId = 'YOUR_LINKEDIN_CLIENT_ID';
    const redirectUri = 'http://localhost:3000/linkedin-callback'; // your route
    const scope = 'r_liteprofile r_emailaddress';
    const state = 'random_string_for_csrf';
  
    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}&state=${state}`;
  
    window.location.href = linkedInAuthUrl;
  };

  // Debugging log to check isSignUp value
  console.log('isSignUp:', isSignUp); 

  return (
    <div className="container">
      <div className="left-panel">
        <img src={foodImage} alt="Food" />
        <div className="overlay">
        <h2>{isSignUp ? 'Welcome Back!' : 'Hello, Friend!'}</h2>
<p>
  {isSignUp
    ? 'To keep connected with us please login with your personal info'
    : 'Enter your personal details and start your journey with us'}
</p>

          <button className="signin" onClick={() => {
            setIsSignUp(!isSignUp); 
            console.log('Toggle Button Clicked, isSignUp:', !isSignUp); // Debugging log here
          }}>
            {isSignUp ? 'SIGN IN' : 'SIGN UP'}
          </button>
        </div>
      </div>
      
      <div className="right-panel1">
        {/* Centered Heading */}
        <div className="form-header">
          <h1>{isSignUp ? 'Create Account' : 'Sign In'}</h1>
         
        </div>

        <div className="social-buttons">
          <button onClick={handleGoogleSignIn} disabled={isLoading}>G+</button>
          <button onClick={handleFacebookSignIn} disabled={isLoading}>f</button>
          <button onClick={handleLinkedInSignIn}>in</button>
        </div>

        {isSignUp && (
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
        )}

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

        <button className="signin" onClick={isSignUp ? handleSignUp : handleSignIn}>
          {isSignUp ? 'SIGN UP' : 'SIGN IN'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
