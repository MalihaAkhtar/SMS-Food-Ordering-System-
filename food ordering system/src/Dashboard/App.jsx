
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Header';
import Header from './Components/Sidebar';
import Overview from './Dashboard/Overview';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-[#0d0d0d] min-h-screen text-white">
          <Header />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Overview />} />
              {/* Other routes can be added here */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
