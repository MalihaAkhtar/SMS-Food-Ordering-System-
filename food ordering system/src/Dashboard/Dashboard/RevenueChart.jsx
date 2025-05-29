
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './Dashboardcomponents.css'
ChartJS.register(BarElement, CategoryScale, LinearScale);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Revenue',
      data: [3200, 1200, 1500, 3000, 2800, 5000, 2300, 2100, 3500, 2000, 2600, 2400],
      backgroundColor: '#facc15',
    },
  ],
};

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
    legend: { labels: { color: '#fff' } },
  },
};

const RevenueChart = () => (
  <div className="bg-black border border-gray-700 rounded-lg p-4 w-full">
    <h3 className="text-white text-lg font-semibold mb-2">Revenue Overview</h3>
    <p className="text-gray-400 text-sm mb-4">Compare revenue month by month</p>
    <Bar data={data} options={options} />
  </div>
);

export default RevenueChart;
