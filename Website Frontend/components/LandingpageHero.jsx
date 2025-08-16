import React, { useState, useEffect, useRef } from "react";
import "./LandingpageHero.css";
import Modalwrapper from "../pages/Acount/Modalwrapper";
import AuthPage from "../pages/Acount/Acount"; // Make sure path is correct

function Hero() {
  const [address, setAddress] = useState("");
  const [shops, setShops] = useState([]);
  const [showAuth, setShowAuth] = useState(false);
  const dropdownRef = useRef(null);

  const handleSearch = async () => {
    if (address.trim() === "") {
      setShops([]);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/shops?area=${address}`);
      const data = await res.json();
      setShops(data);
    } catch (error) {
      console.error("Error fetching shops:", error);
      setShops([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShops([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="hero">
      <div className="hero-text">
        <h3>Best Food In Town</h3>
        <h1>
          TASTE THE RICH FLAVOR OF <br />
          HIGH QUALITY FOOD
        </h1>
        <p>
          We only use the finest star quality for our meals, come and taste the richness in every food we serve.
        </p>

        <div className="landing-search-container">
          <div className="landing-search-bar">
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button onClick={handleSearch}>🔍 Search</button>
          </div>

          {shops.length > 0 && (
            <div className="landing-dropdown" ref={dropdownRef}>
              <ul>
                {shops.map((shop, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          shop.name + " " + shop.area
                        )}`,
                        "_blank"
                      )
                    }
                  >
                    {shop.name} - {shop.area}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 👇 Add this button to open modal */}
        <button className="open-login" onClick={() => setShowAuth(true)}></button>
      </div>

      {/* ✅ Conditional Modal Rendering */}
      {showAuth && (
  <Modalwrapper onClose={() => setShowAuth(false)}>
    <AuthPage onClose={() => setShowAuth(false)} />
  </Modalwrapper>
)}
    </section>
  );
}

export default Hero;
