/* eslint-disable no-unused-vars */
import React from 'react'; // React import

import './Contact.css'; // Import your CSS file for styling

// Random contact data
const contacts = [
  {
    name: 'Layyah General Contact',
    phone: '+92 300 1234567',
    email: 'info@layyah.com',
    address: 'Main Street, Layyah, Punjab, Pakistan',
    location: { lat: 30.0741, lng: 70.9322 }, // Coordinates for Layyah
  },
  {
    name: 'Customer Support',
    phone: '+92 321 7654321',
    email: 'support@layyah.com',
    address: 'Near City Park, Layyah, Punjab, Pakistan',
    location: { lat: 30.0741, lng: 70.9322 }, // Same location for example
  },
  {
    name: 'Sales Department',
    phone: '+92 331 4567890',
    email: 'sales@layyah.com',
    address: 'Market Road, Layyah, Punjab, Pakistan',
    location: { lat: 30.0741, lng: 70.9322 }, // Same location for example
  },
];

// Select a random contact
const randomContact = contacts[Math.floor(Math.random() * contacts.length)];

const ContactUs = () => {
  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <div className="contact-info">
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> {randomContact.name}</p>
        <p><strong>Phone:</strong> {randomContact.phone}</p>
        <p><strong>Email:</strong> <a href={`mailto:${randomContact.email}`}>{randomContact.email}</a></p>
        <p><strong>Address:</strong> {randomContact.address}</p>
      </div>
      </div>
    
  );
};

export default ContactUs;
