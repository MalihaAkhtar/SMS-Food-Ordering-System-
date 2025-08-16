import React from 'react';
import './ModalWrapper.css';

const AuthModalWrapper = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container"> {/* 👈 Fix: use modal-container */}
        <button className="close-btn" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default AuthModalWrapper;
