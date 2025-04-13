import React, { useState } from 'react';
import {
  LayoutDashboard,
  Home,
  Users,
  CreditCard,
  FileBarChart,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';  // Pastikan sudah mengimport AppRoutes

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Home size={20} />, label: 'Rooms', path: '/rooms' },
    { icon: <Users size={20} />, label: 'Tenants', path: '/tenants' },
    { icon: <CreditCard size={20} />, label: 'Payments', path: '/payments' },
    { icon: <FileBarChart size={20} />, label: 'Reports', path: '/reports' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-blue-700 text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          <h1 className={`font-bold text-xl ${!isSidebarOpen && 'hidden'}`}>Kostera</h1>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-blue-600 rounded">
            <Menu size={24} />
          </button>
        </div>
        <nav className="mt-8">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center px-4 py-3 ${location.pathname === item.path ? 'bg-blue-800' : 'hover:bg-blue-600'} transition-colors`}
            >
              {item.icon}
              <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 bg-transparent border-none focus:outline-none w-full"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell size={20} />
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </header>

        {/* Routes */}
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
