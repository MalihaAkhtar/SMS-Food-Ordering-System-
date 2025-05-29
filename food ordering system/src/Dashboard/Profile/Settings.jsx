import React from 'react';
import { useThemeLanguage } from './ThemeLanguageContext';
import './Setting.css';

const Settings = () => {
  const { language, setLanguage, theme, setTheme } = useThemeLanguage();

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <p>You can manage your preferences here.</p>

      <div className="mt-6 space-y-4">
        <div>
          <label>Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
          >
            <option value="English">English</option>
            <option value="Urdu">Urdu</option>
          </select>
        </div>

        <div>
          <label>Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
