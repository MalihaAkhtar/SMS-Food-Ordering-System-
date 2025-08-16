import React from 'react';
import './Dashboardcomponents.css';

const StatsCard = ({ title, value, icon, percentage }) => {
  const isIncrease = percentage.includes('↑');

  // Split the percentage text into the number part and the label
  const [changeValue, ...rest] = percentage.split(' from');
  const changeText = changeValue.trim();
  const labelText = 'from' + rest.join(' from');

  return (
    <div className="stats-card">
      <div className="card-header">
        <h3>{title}</h3>
        <span className="card-icon">{icon}</span>
      </div>
      <p className="card-value">{value}</p>
      <p className="text-sm mt-1">
        <span style={{ color: isIncrease ? '#4ade80' : '#f87171' }}>{changeText}</span>{' '}
        <span style={{ color: '#9ca3af' }}>{labelText}</span>
      </p>
    </div>
  );
};

export default StatsCard;
