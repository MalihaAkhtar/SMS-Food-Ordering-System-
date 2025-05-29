import React, { useState } from 'react';
import './Help.css';

const faqs = [
  {
    question: "How to manage products?",
    answer:
      "Go to the 'Product' section in your dashboard. From there, you can add, update, or remove products using the available options."
  },
  {
    question: "How to view order history?",
    answer:
      "Navigate to 'Order History' in the profile section. You'll find a list of all your past orders with their status and details."
  },
  {
    question: "How to change your profile information?",
    answer:
      "Click on 'Edit Profile' under the Profile menu. You can update your name, contact details, and profile picture there."
  },
  {
    question: "Having trouble with payments?",
    answer:
      "Please make sure your payment method is up to date in 'Payment Methods'. If issues persist, contact our support team."
  }
];

const Help = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="help-container">
      <div className="help-box">
        <h2 className="help-title">Help & Support</h2>
        <p className="help-subtitle">Find answers to common questions or contact us for support.</p>

        <div className="faq-section">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleAnswer(index)}
              >
                {faq.question}
                <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
              </button>
              {activeIndex === index && <p className="faq-answer">{faq.answer}</p>}
            </div>
          ))}
        </div>

        <div className="help-footer">
          <h3 className="help-footer-title">Need more help?</h3>
          <button className="help-button">📞 Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default Help;
