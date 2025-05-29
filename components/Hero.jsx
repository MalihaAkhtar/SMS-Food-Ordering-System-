import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h3>Best Food In Town</h3>
        <h1>
          TASTE THE RICH FLAVOR OF <br />
          <span>HIGH QUALITY FOOD</span>
        </h1>
        <p>
          We only use the finest star quality for our meals, come and taste the richness in every food we serve.
        </p>
        <div className="search-bar">
          <input type="text" placeholder="Enter your address" />
          <button>🔍 Search</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
