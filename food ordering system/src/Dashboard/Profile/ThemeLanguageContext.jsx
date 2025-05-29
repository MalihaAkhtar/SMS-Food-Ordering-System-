import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const ThemeLanguageContext = createContext();

export const ThemeLanguageProvider = ({ children }) => {
  // Detect user preferred language or default to English
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'English');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark'); // 'dark' or 'light'

  // Save selections to localStorage to persist on reload
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeLanguageContext.Provider value={{ language, setLanguage, theme, setTheme }}>
      {children}
    </ThemeLanguageContext.Provider>
  );
};

// Custom hook to use in any component
export const useThemeLanguage = () => useContext(ThemeLanguageContext);
