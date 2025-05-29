import React from 'react';
import './centerbg.css';
import centerbgImg from '../assets/fish1.jpg'; // ⭐ image ko import karo

function centerbg() {
  return (
    <div
      className="centerbg"
      style={{ backgroundImage: `url(${centerbgImg})` }}
    ></div>
  );
}

export default centerbg;
