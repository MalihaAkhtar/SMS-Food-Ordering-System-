import React from 'react';
import './Contact.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <section className="get-in-touch">
        <h5>Enquiry and Feedback</h5>
        <h2>Get In Touch</h2>
        <p>
          Nulla consequat massa quis enim. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Donec pede justo, fringilla vel, aliquet nec,
          vulputate eget, arcu.
        </p>
        <div className="social-icons">
          <i className="fa fa-twitter" />
          <i className="fa fa-facebook" />
          <i className="fa fa-google-plus" />
        </div>
      </section>

      <section className="contact-info">
        <div className="info-box">
          <i className="fa fa-map-marker" />
          <h4>Our Location</h4>
          <p>123 Hanway Extension,<br />Milton Villa City, UK</p>
        </div>
<div className="info-box">
  <i className="fa fa-phone" />
  <h4>Call Us</h4>
  <p>
    <span className="label">Enquiry:</span> <span className="number">(00) 123 456 788</span><br />
    <span className="label">Booking:</span> <span className="number">(00) 123 456 789</span>
  </p>
</div>


        <div className="info-box">
          <i className="fa fa-envelope" />
          <h4>Mail Us</h4>
          <div className="inline-info">
            <span><strong>Email:</strong> admin@example.com</span>
            <span><strong>Support:</strong> support@example.com</span>
          </div>
        </div>

        <div className="info-box">
  <i className="fa fa-clock-o" />
  <h4>Opening Hours</h4>
  <p>
    <span className="label">Mon – Sat:</span> <span className="number">9 am to 8 pm</span><br />
    <span className="label">Sun –</span> <span className="number">10 am to 3 pm</span>
  </p>
</div>

      </section>

      <section className="question-form">
        <h2>Question And Support</h2>
        <h4>Online Form</h4>
        <form>
          <div className="form-row">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Email Address" />
          </div>
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Message"></textarea>
          <button type="submit">Submit Now</button>
        </form>
      </section>

      <section className="map-section">
  <iframe
    title="Google Map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0862289628564!2d-122.4194150846813!3d37.77492927975995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c0cfcb8e3%3A0xa0c6d4f60e3b4ae0!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
    width="100%"
    height="450"
    style={{ border: 'none' }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</section>

    </div>
  );
};

export default ContactUs;
