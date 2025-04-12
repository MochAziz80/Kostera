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
  Edit2,
  Trash2,
  Menu,
  Plus,
} from 'lucide-react';
import { useTenants } from './hooks/useTenants';
import TenantForm from './components/TenantForm';
import { format } from 'date-fns';
import { Tenant } from './types';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import Rooms from './pages/Rooms';
import Payments from './pages/Payments';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const location = useLocation();

  const {
    tenants,
    isLoading,
    createTenant,
    updateTenant,
    deleteTenant
  } = useTenants();

  const handleAddTenant = (data: Omit<Tenant, 'id'>) => {
    createTenant.mutate(data, {
      onSuccess: () => setIsAddTenantOpen(false),
    });
  };

  const handleEditTenant = (data: Omit<Tenant, 'id'>) => {
    if (editingTenant) {
      updateTenant.mutate(
        { ...data, id: editingTenant.id },
        {
          onSuccess: () => setEditingTenant(null),
        }
      );
    }
  };

  const handleDeleteTenant = (id: number) => {
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      deleteTenant.mutate(id);
    }
  };

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Home size={20} />, label: 'Rooms', path: '/rooms' },
    { icon: <Users size={20} />, label: 'Tenants', path: '/tenants' },
    { icon: <CreditCard size={20} />, label: 'Payments', path: '/payments' },
    { icon: <FileBarChart size={20} />, label: 'Reports', path: '/reports' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  const renderDashboard = () => (
    <main className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Rooms', value: '40' },
          { label: 'Occupied Rooms', value: '35' },
          { label: 'Vacant Rooms', value: '5' },
          { label: 'Monthly Income', value: '$17,500' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-semibold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tenants Table */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Current Tenants</h2>
          <button
            onClick={() => setIsAddTenantOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Add Tenant
          </button>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rent Due
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tenants?.map((tenant) => (
                  <tr key={tenant.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          {tenant.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{tenant.name}</div>
                          <div className="text-sm text-gray-500">{tenant.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.room}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          tenant.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : tenant.status === 'Late'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {tenant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(tenant.rentDue), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.payment}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingTenant(tenant)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteTenant(tenant.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );

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
              className={`flex items-center px-4 py-3 ${
                location.pathname === item.path ? 'bg-blue-800' : 'hover:bg-blue-600'
              } transition-colors`}
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
        <Routes>
          <Route path="/" element={renderDashboard()} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/tenants" element={renderDashboard()} />
          <Route path="/reports" element={<div className="p-6">Reports page coming soon</div>} />
          <Route path="/settings" element={<div className="p-6">Settings page coming soon</div>} />
        </Routes>
      </div>

      {/* Add/Edit Tenant Modal */}
      {(isAddTenantOpen || editingTenant) && (
        <TenantForm
          onSubmit={editingTenant ? handleEditTenant : handleAddTenant}
          onClose={() => {
            setIsAddTenantOpen(false);
            setEditingTenant(null);
          }}
          initialData={editingTenant || undefined}
        />
      )}
    </div>
  );
}

export default App;