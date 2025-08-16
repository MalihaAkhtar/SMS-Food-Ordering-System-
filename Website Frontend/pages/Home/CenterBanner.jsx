import React from 'react';
import './CenterBanner.css';
import bannerImg from '../../assets/interior-banner.jpg'; // ⭐ image ko import karo

function CenterBanner() {
  return (
    <div
      className="center-banner"
      style={{ backgroundImage: `url(${bannerImg})` }}
    ></div>
  );
}

export default CenterBanner;
