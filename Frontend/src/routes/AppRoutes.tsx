import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Rooms from '../pages/Rooms';
import Payments from '../pages/Payments';
import Tenants from '../pages/Tenants'; // <- ganti sesuai kebutuhan
import Reports from '../pages/Reports';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/tenants" element={<Tenants />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<div className="p-6">Settings page coming soon</div>} />
    </Routes>
  );
};

export default AppRoutes;
