import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import 'font-awesome/css/font-awesome.min.css';
import logo from '../assets/Logo 1.png';
import ModalWrapper from '../pages/Acount/Modalwrapper'; // ✅ import the modal
import AuthPage from '../pages/Acount/Acount'; // ✅ adjust this path if needed

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [authModalOpen, setAuthModalOpen] = useState(false); // ✅ new state for modal
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/foods?query=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      const results = Array.isArray(data) ? data : [data];
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };

  const handleAddToCart = () => navigate('/AddToProduct');

  // ✅ removed `handleAccount()` — will open modal instead

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="navbar">
       <div className="logo">
      <img src={logo} alt="SMS Logo" className="logo-image" />
    </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Orders">My Orders</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/Contact">Contact Us</Link></li>
        </ul>

        <div className="right-icons">
          <div className="search-section" ref={searchRef}>
            {!isSearchVisible ? (
              <i className="fa fa-search nav-search-icon" onClick={() => setSearchVisible(true)}></i>
            ) : (
              <div className="search-wrapper">
                <div className="search-container">
                  <input
                    type="text"
                    className="search-input"
                    value={searchQuery}
                    autoFocus
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search food..."
                  />
                  <i className="fa fa-search nav-search-icon" onClick={handleSearch}></i>
                </div>

                {searchQuery.trim() !== '' && (
                  <div className="navbar-dropdown">
                    {searchResults.length > 0 ? (
                      <ul>
                        {searchResults.map((item) => (
                          <li
                            key={item.id}
                            onClick={() => navigate(`/menu?item=${encodeURIComponent(item.name)}`)}
                          >
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul><li>No results found.</li></ul>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <i className="fa fa-shopping-cart cart-icon" onClick={handleAddToCart}></i>
          <button className="login-btn" onClick={() => setAuthModalOpen(true)}>Login/Register</button>
        </div>
      </nav>

      {/* ✅ Popup Modal for Auth */}
      {authModalOpen && (
  <ModalWrapper onClose={() => setAuthModalOpen(false)}>
    <AuthPage onClose={() => setAuthModalOpen(false)} />
  </ModalWrapper>
)}
    </>
  );
};

export default Navbar;
