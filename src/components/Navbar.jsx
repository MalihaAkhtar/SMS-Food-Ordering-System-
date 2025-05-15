import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import 'font-awesome/css/font-awesome.min.css'; // FontAwesome icons

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  const foodItems = ['Pizza', 'Burger', 'Fries', 'Pasta', 'Salad'];

  const handleSearch = () => {
    const filtered = foodItems.filter(item =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResult(filtered);
  };

  const handleAddToCart = () => {
    navigate('/AddToProduct');
  };
  const handleAcount = () => {
    navigate('/Acount');
  };

  return (
    <nav className="navbar">
      <div className="logo">🍽️ Zumi</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Orders">My Orders</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/Contact">Contact Us</Link></li>
      </ul>

      <div className="right-icons">
        {/* Search Icon & Bar */}
        <div className="search-section">
          {!isSearchVisible && (
            <i className="fa fa-search search-icon" onClick={() => setSearchVisible(true)}></i>
          )}

          {isSearchVisible && (
            <div className="search-wrapper">
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search food..."
                />
                <i className="fa fa-search search-icon" onClick={handleSearch}></i>
              </div>

              {searchQuery && (
                <div className="search-result-box">
                  {searchResult.length > 0 ? (
                    searchResult.map((item, index) => (
                      <div key={index} className="search-result-item">{item}</div>
                    ))
                  ) : (
                    <div className="search-result-item">No results found</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Add to Cart Icon */}
        <i className="fa fa-shopping-cart cart-icon" onClick={handleAddToCart}></i>

        {/* Login Button */}
        <button className="login-btn" onClick={handleAcount}>Login/Register</button>
      </div>
    </nav>
  );
};

export default Navbar;
