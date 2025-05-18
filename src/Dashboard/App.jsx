import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './Dashboard/Overview';

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#0d0d0d] text-white">
        {/* Sidebar fixed width and full height */}
        <aside className="w-64 min-h-screen bg-black p-6 shadow-lg">
          <Sidebar />
        </aside>

        {/* Content area */}
        <div className="flex flex-col flex-1">
          {/* Header */}
          <header className="border-b border-gray-700 p-4">
            <Header />
          </header>

          {/* Main content */}
          <main className="p-6 flex-grow overflow-auto">
            <Routes>
              <Route path="/" element={<Overview />} />
              {/* Add more routes here */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
