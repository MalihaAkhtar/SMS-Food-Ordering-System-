import "./StatCard.css";

const StatCard = ({ title, value, change, icon }) => {
  const isNegative = change < 0;

  return (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-title">{title}</div>
        <div className="stat-icon">{icon}</div>
      </div>
      <div className="stat-value">{value}</div>
      <div className={`stat-change ${isNegative ? "negative" : "positive"}`}>
        {change}
      </div>
    </div>
  );
};

export default StatCard;
