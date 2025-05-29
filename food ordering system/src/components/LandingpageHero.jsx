import React, { useState } from "react";
import "./LandingpageHero.css";

function Hero() {
  const [address, setAddress] = useState("");
  const [shops, setShops] = useState([]);

  const dummyShops = [
    { name: "Pizza Point", area: "Downtown" },
    { name: "Burger Hub", area: "City Center" },
    { name: "Sushi World", area: "Uptown" },
  ];
  
  const handleSearch = () => {
    if (address.trim() !== "") {
      const filteredShops = dummyShops.filter(shop =>
        shop.area.toLowerCase().includes(address.toLowerCase())
      );
      setShops(filteredShops);
    } else {
      setShops([]);
    }
  };
  

  return (
    <section className="hero">
      <div className="hero-text">
        <h3>Best Food In Town</h3>
        <h1>
          TASTE THE RICH FLAVOR OF <br />
          HIGH QUALITY FOOD
        </h1>
        <p>We only use the finest star quality for our meals, come and taste the richness in every food we serve.</p>

        <div className="search-bar1">
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button onClick={handleSearch}>🔍 Search</button>
        </div>

        {shops.length > 0 && (
          <div className="shop-results">
            <ul>
              {shops.map((shop, index) => (
                <li key={index}>
                  {shop.name} - {shop.area}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
