import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Profiles from './pages/Profiles';
import Verifications from './pages/Verifications';
import Reports from './pages/Reports';
import Subscriptions from './pages/Subscriptions';
import Payments from './pages/Payments';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="profiles" element={<Profiles />} />
          <Route path="verifications" element={<Verifications />} />
          <Route path="reports" element={<Reports />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="payments" element={<Payments />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
