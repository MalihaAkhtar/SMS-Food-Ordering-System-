import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RevenueChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '', // Remove the label to hide "Revenue"
        data: [3200, 1200, 1500, 3000, 2800, 5000, 2300, 2100, 3500, 2000, 2600, 2400],
        backgroundColor: '#facc15',
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:5001/api/overview/monthly-revenue')
      .then(res => res.json())
      .then(data => {
        const dummyRevenues = [3200, 1200, 1500, 3000, 2800, 5000, 2300, 2100, 3500, 2000, 2600, 2400];
        data.forEach(({ month, revenue }) => {
          dummyRevenues[month - 1] = revenue;
        });
        setChartData({
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: '', // Keep label empty here too
              data: dummyRevenues,
              backgroundColor: '#facc15',
            },
          ],
        });
      })
      .catch(err => {
        console.error('Fetch error:', err);
      });
  }, []);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#fff' },
      },
      x: {
        ticks: { color: '#fff' },
      },
    },
    plugins: {
      legend: { display: false }, // Also hide the legend completely
      tooltip: { enabled: true },
    },
  };

  return (
    <div style={{ backgroundColor: 'black', padding: '16px', borderRadius: '8px' }}>
      <h3 style={{ color: 'white', marginBottom: '8px' }}>Revenue Overview</h3>
      <p style={{ color: 'gray', marginBottom: '16px' }}>Compare revenue month by month</p>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RevenueChart;
