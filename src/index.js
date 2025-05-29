import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Dashboard from './Dashboard/Pages/Dashboard'; // 👈 Import DashboardApp
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Detect if the path starts with "/dashboard"
const isDashboard = window.location.pathname.startsWith('/dashboard');

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {isDashboard ? <Dashboard /> : <App />}
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
