import React from 'react';
import './Footer.css';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import FooterBg from '../assets/Footer-bg.png';
import { useNavigate } from 'react-router-dom'; // ✅
import logo from '../assets/Logo 1.png';
const Footer = () => {
  const navigate = useNavigate(); // ✅

  return (
    <footer className="footer" style={{ backgroundImage: `url(${FooterBg})` }}>
      <div className="footer-content">
        <h1 className="footer-heading">
          WE READY TO HAVE YOU <br /> THE BEST FOOD EXPERIENCES
        </h1>

        <div className="footer-contact-row">
          <a 
            href="https://www.google.com/maps/place/Jendral+Sudirman+Street+Pahoman,+Bandar+Lampung,+Lampung,+35222" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link-item"
          >
            <FaMapMarkerAlt className="icon" />
            <span className="footer-link-text">
              Jendral Sudirman Street Pahoman, Bandar Lampung, Lampung, 35222
            </span>
          </a>

          <a href="tel:+0721471285" className="footer-link-item">
            <FaPhoneAlt className="icon" />
            <span className="footer-link-text">+92 212285267</span>
          </a>
        </div>

        {/* ✅ Button navigates to PlaceOrder page */}
        <button className="footer-button" onClick={() => navigate("/Menu")}>
          Place Order
        </button>
      </div>

      <div className="footer-logo-social">
        <div className="logo1">
      <img src={logo} alt="SMS Logo" className="logo-image1" />
    </div>
        <div className="footer-social">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
