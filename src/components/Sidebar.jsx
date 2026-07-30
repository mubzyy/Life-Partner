import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  MdDashboard, MdPeople, MdPersonSearch, MdVerifiedUser,
  MdBarChart, MdSubscriptions, MdPayment, MdNotifications, MdSettings,
} from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { currentAdmin } from '../data/mockData';
import logoImage from '../assets/Logo.jpeg';

const navItems = [
  { label: 'Dashboard', path: '/', icon: <MdDashboard /> },
  { label: 'Users', path: '/users', icon: <MdPeople /> },
  { label: 'Profiles', path: '/profiles', icon: <MdPersonSearch /> },
  { label: 'Verifications', path: '/verifications', icon: <MdVerifiedUser /> },
  { label: 'Reports', path: '/reports', icon: <MdBarChart /> },
  { label: 'Subscriptions', path: '/subscriptions', icon: <MdSubscriptions /> },
  { label: 'Payments', path: '/payments', icon: <MdPayment /> },
  { label: 'Notifications', path: '/notifications', icon: <MdNotifications /> },
  { label: 'Settings', path: '/settings', icon: <MdSettings /> },
];

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-img-wrap">
          <img
            src={logoImage}
            alt="Life Partner Logo"
            className="sidebar-logo-img"
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge && <span className="coming-soon-badge">{item.badge}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <Avatar initials={currentAdmin.initials} color="#c9a84c" size="sm" />
          <div className="sidebar-user-info">
            <h4>{currentAdmin.name}</h4>
            <span>{currentAdmin.role}</span>
          </div>
          <button
            className="sidebar-user-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            title="User menu"
          >
            <BsThreeDotsVertical />
          </button>
        </div>
        <div className="sidebar-version">
          Version 1.0.0<br />© 2026 Life Partner
        </div>
      </div>
    </aside>
  );
}

function Avatar({ initials, color, size }) {
  const sz = size === 'sm' ? 32 : 38;
  return (
    <div
      className={`avatar avatar-${size}`}
      style={{ background: color, width: sz, height: sz, minWidth: sz }}
    >
      {initials}
    </div>
  );
}
