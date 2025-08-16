import React, { useState } from 'react';
import './styles.css';
import { FaGoogle, FaGithub, FaYahoo } from 'react-icons/fa';
import foodImage from '../../assets/Acount-side.png';
import userIcon from '../../assets/user.png';
import mailIcon from '../../assets/mail.png';
import passwordIcon from '../../assets/password.png';
import hideIcon from '../../assets/hide.png';

import { auth, googleProvider, yahooProvider } from '../../firebase';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';

const AuthPage = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      alert(response.ok ? data.message : 'Sign up failed: ' + data.message);
    } catch (error) {
      console.error('Sign Up Error:', error);
      alert('Sign up error');
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      alert(response.ok ? '✅ Welcome, ' + data.user.name : '❌ ' + data.message);
    } catch (error) {
      console.error('Sign In Error:', error);
      alert('Sign in error');
    }
  };

  const handleGoogleSignIn = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          provider: "google",
        }),
      });
      alert(`Signed in as: ${user.displayName}`);
    } catch (error) {
      alert("Google Sign-in Error: " + error.message);
    }
    setIsLoading(false);
  };

  const handleYahooSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, yahooProvider);
      const user = result.user;
      await fetch("http://localhost:5000/api/auth/yahoo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          provider: "yahoo",
        }),
      });
      alert("Yahoo sign-in successful");
    } catch (error) {
      console.error("Yahoo sign-in error:", error.message);
    }
  };

  const handleGitHubSignIn = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const githubProvider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      await fetch("http://localhost:5000/api/auth/github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          provider: "github",
        }),
      });
      alert(`Signed in as: ${user.displayName}`);
    } catch (error) {
      alert("GitHub Sign-in Error: " + error.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      {/* CLOSE BUTTON */}
      <button className="close-btn" onClick={onClose}>×</button>

      {/* LEFT PANEL */}
      <div className="left-panel">
        <img src={foodImage} alt="Food" />
        <div className="overlay">
          <h2>{isSignUp ? 'Welcome Back!' : 'Hello, Friend!'}</h2>
          <p>{isSignUp
            ? 'To keep connected with us please login with your personal info'
            : 'Enter your personal details and start your journey with us'}
          </p>
          <button className="signin" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'SIGN IN' : 'SIGN UP'}
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel1">
        <div className="form-box">
          <h1>{isSignUp ? 'Create Account' : 'Sign In'}</h1>
          <div className="social-buttons">
            <button onClick={handleGoogleSignIn} disabled={isLoading}><FaGoogle size={20} /></button>
            <button onClick={handleYahooSignIn} disabled={isLoading}><FaYahoo size={20} /></button>
            <button onClick={handleGitHubSignIn} disabled={isLoading}><FaGithub size={20} /></button>
          </div>
          <div className="or-divider">OR</div>

          {isSignUp && (
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
          )}

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
              className="toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
              alt="Toggle"
            />
          </div>

          <button className="signin" onClick={isSignUp ? handleSignUp : handleSignIn}>
            {isSignUp ? 'SIGN UP' : 'SIGN IN'}
          </button>
        </div>
      </div>
      </>
  );
};

export default AuthPage;
