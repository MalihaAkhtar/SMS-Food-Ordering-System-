import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { ThemeLanguageProvider } from '../src/Dashboard/Profile/ThemeLanguageContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
     <ThemeLanguageProvider>
      <App />
      </ThemeLanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
