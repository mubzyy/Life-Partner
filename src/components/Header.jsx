import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdSearch, MdNotifications, MdKeyboardArrowDown } from 'react-icons/md';
import { currentAdmin, allNotifications } from '../data/mockData';

const pageMeta = {
  '/': { title: 'Dashboard', sub: "Welcome back! Here's the latest analysis for today" },
  '/users': { title: 'Users', sub: 'Manage all registered users on your platform.' },
  '/profiles': { title: 'Profiles', sub: 'Browse and manage user profile details.' },
  '/verifications': { title: 'Verifications', sub: 'Review and process pending verification requests.' },
  '/reports': { title: 'Reports', sub: 'Detailed analytics and platform performance reports.' },
  '/subscriptions': { title: 'Subscriptions', sub: 'Manage subscription plans and active subscribers.' },
  '/payments': { title: 'Payments', sub: 'View and manage all payment transactions.' },
  '/notifications': { title: 'Notifications', sub: 'Platform alerts and user activity notifications.' },
  '/settings': { title: 'Settings', sub: 'Configure your platform and admin preferences.' },
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const notifRef = useRef(null);
  const userRef = useRef(null);

  const meta = pageMeta[location.pathname] || pageMeta['/'];
  const unread = allNotifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim()) navigate('/users');
  }

  return (
    <header className="header">
      <div className="header-title-block">
        <h1>{meta.title}</h1>
        <p>{meta.sub}</p>
      </div>

      <div className="header-spacer" />

      {/* Search */}
      <form className="header-search" onSubmit={handleSearch}>
        <span className="header-search-icon"><MdSearch /></span>
        <input
          type="text"
          placeholder="Search anything..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          id="header-search-input"
        />
      </form>

      <div className="header-actions">
        {/* Notifications */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            className="header-notif-btn"
            onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false); }}
            id="header-notif-btn"
            aria-label="Notifications"
          >
            <MdNotifications />
            {unread > 0 && <span className="notif-badge">{unread}</span>}
          </button>
          {notifOpen && (
            <NotifDropdown
              notifications={allNotifications.slice(0, 6)}
              onViewAll={() => { navigate('/notifications'); setNotifOpen(false); }}
            />
          )}
        </div>

        {/* User */}
        <div ref={userRef} style={{ position: 'relative' }}>
          <div
            className="header-user"
            onClick={() => { setUserOpen(!userOpen); setNotifOpen(false); }}
            id="header-user-btn"
          >
            <div
              className="avatar avatar-md"
              style={{ background: '#c9a84c', width: 38, height: 38, minWidth: 38 }}
            >
              {currentAdmin.initials}
            </div>
            <div className="header-user-info">
              <h4>{currentAdmin.name}</h4>
              <span>{currentAdmin.role}</span>
            </div>
            <span className="header-user-chevron"><MdKeyboardArrowDown /></span>
          </div>
          {userOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0,
              background: 'var(--white)', border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)', boxShadow: 'var(--card-shadow-hover)',
              minWidth: 180, overflow: 'hidden', zIndex: 200,
            }}>
              {[
                { label: 'My Profile', action: () => navigate('/settings') },
                { label: 'Platform Settings', action: () => navigate('/settings') },
                { label: 'Sign Out', action: () => { setUserOpen(false); } },
              ].map(item => (
                <button
                  key={item.label}
                  onClick={() => { item.action(); setUserOpen(false); }}
                  style={{
                    display: 'block', width: '100%', padding: '10px 16px',
                    textAlign: 'left', fontSize: 13, color: 'var(--text-body)',
                    borderBottom: '1px solid var(--border-light)', background: 'none',
                    cursor: 'pointer', transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--page-bg)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function NotifDropdown({ notifications, onViewAll }) {
  const icons = { user: '👤', payment: '💳', verif: '✅', alert: '⚠️', report: '📊' };
  return (
    <div style={{
      position: 'absolute', top: 'calc(100% + 8px)', right: 0,
      background: 'var(--white)', border: '1px solid var(--border-light)',
      borderRadius: 'var(--radius-lg)', boxShadow: 'var(--card-shadow-hover)',
      width: 340, zIndex: 200, overflow: 'hidden',
    }}>
      <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-heading)' }}>Notifications</span>
        <span style={{ fontSize: 11, color: 'var(--green-primary)', fontWeight: 600, cursor: 'pointer' }} onClick={onViewAll}>View All</span>
      </div>
      {notifications.map(n => (
        <div
          key={n.id}
          style={{
            display: 'flex', gap: 10, padding: '11px 16px',
            borderBottom: '1px solid var(--border-light)',
            background: n.read ? 'transparent' : '#f0f9f3',
            cursor: 'pointer',
          }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: '50%', background: n.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, flexShrink: 0,
          }}>
            {icons[n.type] || '🔔'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-heading)', marginBottom: 2 }}>{n.label}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.message}</div>
            <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 3 }}>{n.time}</div>
          </div>
        </div>
      ))}
      <div style={{ padding: '10px 16px', textAlign: 'center' }}>
        <button onClick={onViewAll} style={{ fontSize: 13, color: 'var(--green-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
          See all notifications →
        </button>
      </div>
    </div>
  );
}
