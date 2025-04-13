// src/pages/Dashboard.tsx
import React from 'react';
import DashboardChart from '../components/DashboardChart';

const Dashboard = () => {
  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[{ label: 'Total Rooms', value: '40' }, { label: 'Occupied Rooms', value: '35' }, { label: 'Vacant Rooms', value: '5' }, { label: 'Monthly Income', value: '$17,500' }].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-semibold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <DashboardChart />
    </div>
  );
};

export default Dashboard;
