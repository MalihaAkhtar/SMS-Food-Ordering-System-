import React from 'react';
import './Statusbadge.css';

const StatusBadge = ({ status }) => {
  return <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>;
};

export default StatusBadge;
