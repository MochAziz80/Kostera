// src/components/DashboardChart.tsx
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const DashboardChart = () => {
  const incomeData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Monthly Income',
        data: [1500, 2000, 1800, 2200],
        fill: false,
        borderColor: '#4CAF50',
        tension: 0.1,
      },
    ],
  };

  const roomData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Total Rooms',
        data: [40, 40, 40, 40],
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
        borderWidth: 1,
      },
      {
        label: 'Occupied Rooms',
        data: [35, 36, 37, 35],
        backgroundColor: '#FF5722',
        borderColor: '#FF5722',
        borderWidth: 1,
      },
      {
        label: 'Vacant Rooms',
        data: [5, 4, 3, 5],
        backgroundColor: '#FF9800',
        borderColor: '#FF9800',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Room and Income Statistics',
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-center text-xl font-semibold mb-4">Income</h3>
        <Line data={incomeData} options={options} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-center text-xl font-semibold mb-4">Rooms Overview</h3>
        <Bar data={roomData} options={options} />
      </div>
    </div>
  );
};

export default DashboardChart;
