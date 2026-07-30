import { useState, useMemo } from 'react';
import { MdNotificationsActive, MdPayment, MdVerifiedUser, MdWarning, MdBarChart, MdMarkEmailRead, MdDeleteSweep, MdAdd } from 'react-icons/md';
import { allNotifications } from '../data/mockData';
import Modal from '../components/ui/Modal';

const typeConfig = {
  user:    { icon: <MdNotificationsActive />, bg: '#e2f0e8', color: '#2d8a4e' },
  payment: { icon: <MdPayment />,            bg: '#faf0dc', color: '#c9a84c' },
  verif:   { icon: <MdVerifiedUser />,       bg: '#e5ecf8', color: '#3a6abf' },
  alert:   { icon: <MdWarning />,            bg: '#fdeaea', color: '#e05c5c' },
  report:  { icon: <MdBarChart />,           bg: '#e5f2fa', color: '#3a8fc8' },
};

function CreateNotifModal({ onClose, onSend }) {
  const [form, setForm] = useState({ title: '', message: '', type: 'All Users', notifType: 'user' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSend(form);
    setSuccess(true);
  }

  if (success) return (
    <Modal title="Create Notification" onClose={onClose} footer={<button className="btn btn-primary" onClick={onClose}>Done</button>}>
      <div className="success-state">
        <div className="success-icon" style={{ background: '#faf0dc', color: '#c9a84c' }}>🔔</div>
        <h3>Notification Sent!</h3>
        <p>"{form.title}" has been sent to <strong>{form.type}</strong>.</p>
      </div>
    </Modal>
  );

  return (
    <Modal title="Create Notification" onClose={onClose} footer={
      <>
        <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSubmit}>Send Notification</button>
      </>
    }>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Notification Title *</label>
          <input className={`form-input${errors.title ? ' error' : ''}`} placeholder="e.g. New Feature Available"
            value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          {errors.title && <div className="form-error">{errors.title}</div>}
        </div>
        <div className="form-group">
          <label className="form-label">Message *</label>
          <textarea className={`form-textarea${errors.message ? ' error' : ''}`} placeholder="Write your notification message here..."
            value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4} />
          {errors.message && <div className="form-error">{errors.message}</div>}
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Target Audience</label>
            <select className="form-select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option>All Users</option>
              <option>Premium Users</option>
              <option>Free Users</option>
              <option>Inactive Users</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-select" value={form.notifType} onChange={e => setForm({ ...form, notifType: e.target.value })}>
              <option value="user">User Activity</option>
              <option value="payment">Payment</option>
              <option value="verif">Verification</option>
              <option value="alert">Alert</option>
              <option value="report">Report</option>
            </select>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default function Notifications() {
  const [notifs, setNotifs] = useState(allNotifications);
  const [filter, setFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showCreate, setShowCreate] = useState(false);

  const filtered = useMemo(() => {
    return notifs.filter(n => {
      const matchRead = filter === 'All' || (filter === 'Unread' && !n.read) || (filter === 'Read' && n.read);
      const matchType = typeFilter === 'All' || n.type === typeFilter;
      return matchRead && matchType;
    });
  }, [notifs, filter, typeFilter]);

  function markAllRead() { setNotifs(prev => prev.map(n => ({ ...n, read: true }))); }
  function markRead(id) { setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n)); }
  function deleteNotif(id) { setNotifs(prev => prev.filter(n => n.id !== id)); }

  function handleSend(form) {
    const newNotif = {
      id: Date.now(),
      type: form.notifType,
      label: form.title,
      message: form.message,
      time: 'Just now',
      read: false,
      color: typeConfig[form.notifType]?.bg || '#e2f0e8',
      iconColor: typeConfig[form.notifType]?.color || '#2d8a4e',
    };
    setNotifs(prev => [newNotif, ...prev]);
  }

  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h2>Notifications</h2>
          <p>{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-outline" onClick={markAllRead}>
            <MdMarkEmailRead /> Mark All Read
          </button>
          <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
            <MdAdd /> Create Notification
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {['All', 'Unread', 'Read'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 16px', borderRadius: 'var(--radius-full)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
              background: filter === f ? 'var(--green-primary)' : 'var(--white)',
              color: filter === f ? 'var(--white)' : 'var(--text-muted)',
              boxShadow: filter === f ? 'none' : '0 1px 3px rgba(0,0,0,0.06)',
              border: filter === f ? 'none' : '1px solid var(--border-light)',
              transition: 'all 0.15s',
            }}
          >
            {f}
          </button>
        ))}
        <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ marginLeft: 8 }}>
          <option>All</option>
          <option value="user">User Activity</option>
          <option value="payment">Payment</option>
          <option value="verif">Verification</option>
          <option value="alert">Alert</option>
          <option value="report">Report</option>
        </select>
      </div>

      <div className="table-card">
        {filtered.length === 0 ? (
          <div className="empty-state"><div className="empty-state-icon">🔔</div><h3>No notifications</h3><p>You're all caught up!</p></div>
        ) : (
          <div className="notif-list">
            {filtered.map(n => {
              const tc = typeConfig[n.type] || typeConfig.user;
              return (
                <div
                  key={n.id}
                  className={`notif-item${!n.read ? ' unread' : ''}`}
                  onClick={() => markRead(n.id)}
                >
                  <div className="notif-item-icon" style={{ background: n.color || tc.bg, color: tc.color }}>
                    {tc.icon}
                  </div>
                  <div className="notif-item-body">
                    <div className="notif-item-title">
                      {n.label}
                      {!n.read && (
                        <span style={{ display: 'inline-block', width: 7, height: 7, background: 'var(--green-primary)', borderRadius: 99, marginLeft: 7, verticalAlign: 'middle' }} />
                      )}
                    </div>
                    <div className="notif-item-msg">{n.message}</div>
                    <div className="notif-item-time">{n.time}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                    {!n.read && (
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={e => { e.stopPropagation(); markRead(n.id); }}
                        style={{ fontSize: 11 }}
                      >
                        Mark read
                      </button>
                    )}
                    <button
                      className="btn btn-sm btn-outline btn-icon"
                      onClick={e => { e.stopPropagation(); deleteNotif(n.id); }}
                      title="Delete"
                      style={{ color: 'var(--negative)' }}
                    >
                      <MdDeleteSweep />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showCreate && <CreateNotifModal onClose={() => setShowCreate(false)} onSend={handleSend} />}
    </div>
  );
}
