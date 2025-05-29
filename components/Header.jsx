import React, { useState } from 'react';
import './Header.css';

function Header() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('ENG');

  const toggleDropdown = () => {
    setLanguageOpen(!languageOpen);
  };

  const selectLanguage = (lang) => {
    setSelectedLanguage(lang);
    setLanguageOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">Dine</div>
      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">My Orders</a>
        <a href="#">Menu</a>
        <a href="#">Contact</a>
        <div className="lang-dropdown">
          <button className="lang-btn" onClick={toggleDropdown}>
            {selectedLanguage} ▼
          </button>
          {languageOpen && (
            <ul className="lang-menu">
              {['ENG', 'URDU',].map((lang) => (
                <li key={lang} onClick={() => selectLanguage(lang)}>
                  {lang}
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
      <button className="login-btn">LOGIN / REGISTER</button>
    </header>
  );
}

export default Header;
