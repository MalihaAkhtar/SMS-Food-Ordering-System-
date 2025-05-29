import React from 'react';
import './Footer.css';
import footerBg from '../assets/footerBg.jpg'; // make sure image name matches your asset

function Footer() {
  return (
    <section className="footer-section" style={{ backgroundImage: `url(${footerBg})` }}>
      <div className="footer-overlay">
        <h2 className="footer-heading">We ready to have you<br />the best dining experiences</h2>
        <div className="footer-info">
          <p><i className="fas fa-map-marker-alt"></i> Jendral Sudirman Street Pahoman<br />Bandar Lampung, Lampung, 35222</p>
          <p><i className="fas fa-phone-alt"></i> Call us: +0721 471 285</p>
        </div>
        <button className="footer-btn">Reserve a Table</button>
        <div className="footer-logo">Dini Sushi</div>
        <div className="footer-socials">
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
          <a href="#">Facebook</a>
        </div>
      </div>
    </section>
  );
}

export default Footer;
