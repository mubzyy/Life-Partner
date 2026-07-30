import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import {
  MdPeople, MdVerifiedUser, MdWorkspacePremium, MdPersonAdd,
  MdArrowForward, MdTrendingUp, MdCreditCard, MdAssignment,
  MdNotificationsActive, MdBarChart, MdSettings, MdPhoneIphone,
  MdEmail, MdPhoto, MdCameraAlt, MdBadge,
} from 'react-icons/md';
import { BsArrowUpShort } from 'react-icons/bs';
import {
  dashboardStats, registrationsData, registrationsDataYear,
  subscriptionData, recentUsers, pendingVerifications, recentPayments,
} from '../data/mockData';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

// ─── Month Selector ───────────────────────────────────────
function MonthSelector({ value, onChange }) {
  const options = ['This Month', 'Last Month', 'This Year'];
  return (
    <select
      className="month-selector"
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ border: 'none', outline: 'none', cursor: 'pointer', fontSize: 12.5, color: 'var(--text-muted)', background: 'transparent' }}
    >
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
}

// ─── Custom Tooltip ───────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--white)', border: '1px solid var(--border-light)',
      borderRadius: 10, padding: '10px 14px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
    }}>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-heading)' }}>
        {payload[0].value.toLocaleString()} users
      </div>
    </div>
  );
}

function CustomRevenueTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--white)', border: '1px solid var(--border-light)',
      borderRadius: 10, padding: '10px 14px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
    }}>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-heading)' }}>
        PKR {payload[0].value.toLocaleString()}
      </div>
    </div>
  );
}

// ─── Verification Icons ────────────────────────────────────
const verifIcons = {
  cnic:   <MdBadge />,
  selfie: <MdCameraAlt />,
  email:  <MdEmail />,
  mobile: <MdPhoneIphone />,
  photo:  <MdPhoto />,
};

// ─── Quick Action Modals ──────────────────────────────────
function AddUserModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', plan: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.city.trim()) e.city = 'City is required';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSuccess(true);
  }

  if (success) return (
    <Modal title="Add New User" onClose={onClose} footer={
      <button className="btn btn-primary" onClick={onClose}>Done</button>
    }>
      <div className="success-state">
        <div className="success-icon">✓</div>
        <h3>User Added Successfully!</h3>
        <p>{form.name} has been added to the platform.</p>
      </div>
    </Modal>
  );

  return (
    <Modal title="Add New User" onClose={onClose} footer={
      <>
        <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSubmit}>Add User</button>
      </>
    }>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input className={`form-input${errors.name ? ' error' : ''}`} placeholder="e.g. Ayesha Khan"
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">Phone *</label>
            <input className={`form-input${errors.phone ? ' error' : ''}`} placeholder="03XX-XXXXXXX"
              value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            {errors.phone && <div className="form-error">{errors.phone}</div>}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Email Address *</label>
          <input className={`form-input${errors.email ? ' error' : ''}`} placeholder="user@example.com"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          {errors.email && <div className="form-error">{errors.email}</div>}
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">City *</label>
            <input className={`form-input${errors.city ? ' error' : ''}`} placeholder="e.g. Lahore"
              value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
            {errors.city && <div className="form-error">{errors.city}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">Subscription Plan</label>
            <select className="form-select" value={form.plan} onChange={e => setForm({ ...form, plan: e.target.value })}>
              <option value="">Free (default)</option>
              <option>1 Month Plan</option>
              <option>3 Months Plan</option>
              <option>6 Months Plan</option>
              <option>12 Months Plan</option>
            </select>
          </div>
        </div>
      </form>
    </Modal>
  );
}

function VerifyUserModal({ onClose }) {
  const [userId, setUserId] = useState('');
  const [type, setType] = useState('CNIC');
  const [note, setNote] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!userId.trim()) { setError('User ID or email is required'); return; }
    setSuccess(true);
  }

  if (success) return (
    <Modal title="Verify User" onClose={onClose} footer={
      <button className="btn btn-primary" onClick={onClose}>Done</button>
    }>
      <div className="success-state">
        <div className="success-icon" style={{ background: 'var(--positive-bg)', color: 'var(--positive)' }}>✓</div>
        <h3>Verification Approved!</h3>
        <p>{type} verification has been approved for user <strong>{userId}</strong>.</p>
      </div>
    </Modal>
  );

  return (
    <Modal title="Verify User" onClose={onClose} footer={
      <>
        <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSubmit}>Approve</button>
      </>
    }>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">User ID or Email *</label>
          <input className={`form-input${error ? ' error' : ''}`} placeholder="Enter user ID or email"
            value={userId} onChange={e => { setUserId(e.target.value); setError(''); }} />
          {error && <div className="form-error">{error}</div>}
        </div>
        <div className="form-group">
          <label className="form-label">Verification Type</label>
          <select className="form-select" value={type} onChange={e => setType(e.target.value)}>
            <option>CNIC</option>
            <option>Selfie</option>
            <option>Email</option>
            <option>Mobile</option>
            <option>Profile Photo</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Review Note</label>
          <textarea className="form-textarea" placeholder="Optional note..."
            value={note} onChange={e => setNote(e.target.value)} rows={3} />
        </div>
      </form>
    </Modal>
  );
}

function CreateNotificationModal({ onClose }) {
  const [form, setForm] = useState({ title: '', message: '', type: 'All Users', schedule: 'Now' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSuccess(true);
  }

  if (success) return (
    <Modal title="Create Notification" onClose={onClose} footer={
      <button className="btn btn-primary" onClick={onClose}>Done</button>
    }>
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
          <textarea className={`form-textarea${errors.message ? ' error' : ''}`} placeholder="Write your notification message..."
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
            <label className="form-label">Schedule</label>
            <select className="form-select" value={form.schedule} onChange={e => setForm({ ...form, schedule: e.target.value })}>
              <option>Now</option>
              <option>In 1 Hour</option>
              <option>Tomorrow Morning</option>
              <option>Custom Time</option>
            </select>
          </div>
        </div>
      </form>
    </Modal>
  );
}

function AddSubscriptionPlanModal({ onClose }) {
  const [form, setForm] = useState({ name: '', price: '', duration: '1', features: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Plan name is required';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) errs.price = 'Valid price required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSuccess(true);
  }

  if (success) return (
    <Modal title="Add Subscription Plan" onClose={onClose} footer={
      <button className="btn btn-primary" onClick={onClose}>Done</button>
    }>
      <div className="success-state">
        <div className="success-icon" style={{ background: '#faf0dc', color: '#c9a84c' }}>👑</div>
        <h3>Plan Created!</h3>
        <p><strong>{form.name}</strong> plan at PKR {Number(form.price).toLocaleString()} has been created.</p>
      </div>
    </Modal>
  );

  return (
    <Modal title="Add Subscription Plan" onClose={onClose} footer={
      <>
        <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSubmit}>Create Plan</button>
      </>
    }>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Plan Name *</label>
            <input className={`form-input${errors.name ? ' error' : ''}`} placeholder="e.g. 6 Months Premium"
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">Price (PKR) *</label>
            <input className={`form-input${errors.price ? ' error' : ''}`} placeholder="e.g. 5999" type="number"
              value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            {errors.price && <div className="form-error">{errors.price}</div>}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Duration (months)</label>
          <select className="form-select" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })}>
            <option value="1">1 Month</option>
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="12">12 Months</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Features (one per line)</label>
          <textarea className="form-textarea" placeholder="e.g. Unlimited matches&#10;Profile boost&#10;Priority support"
            value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} rows={4} />
        </div>
      </form>
    </Modal>
  );
}

// ─── Main Dashboard ───────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const [regPeriod, setRegPeriod] = useState('This Month');
  const [subPeriod, setSubPeriod] = useState('This Month');
  const [modal, setModal] = useState(null);

  const chartData = regPeriod === 'This Year' ? registrationsDataYear : registrationsData;

  return (
    <div>
      {/* ── Stat Cards ── */}
      <div className="stat-cards-row">
        <StatCard
          icon={<MdPeople />}
          iconClass="icon-bg-green"
          label="Total Users"
          value={dashboardStats.totalUsers.value.toLocaleString()}
          change={dashboardStats.totalUsers.change}
          compareLabel={dashboardStats.totalUsers.label}
        />
        <StatCard
          icon={<MdVerifiedUser />}
          iconClass="icon-bg-teal"
          label="Verified Users"
          value={dashboardStats.verifiedUsers.value.toLocaleString()}
          change={dashboardStats.verifiedUsers.change}
          compareLabel={dashboardStats.verifiedUsers.label}
        />
        <StatCard
          icon={<MdWorkspacePremium />}
          iconClass="icon-bg-gold"
          label="Premium Users"
          value={dashboardStats.premiumUsers.value.toLocaleString()}
          change={dashboardStats.premiumUsers.change}
          compareLabel={dashboardStats.premiumUsers.label}
        />
        <StatCard
          icon={<MdPersonAdd />}
          iconClass="icon-bg-blue"
          label="Active Today"
          value={dashboardStats.activeToday.value.toLocaleString()}
          change={dashboardStats.activeToday.change}
          compareLabel={dashboardStats.activeToday.label}
        />
      </div>

      {/* ── Charts ── */}
      <div className="charts-row">
        {/* Registrations Area Chart */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title">User Registrations</div>
            <MonthSelector value={regPeriod} onChange={setRegPeriod} />
          </div>
          <div className="chart-subtitle">
            <span>Total {dashboardStats.totalUsers.value.toLocaleString()}</span>
            <span className="chart-total" style={{ color: 'var(--positive)', display: 'flex', alignItems: 'center', gap: 2 }}>
              <BsArrowUpShort style={{ fontSize: 18 }} /> {dashboardStats.totalUsers.change}%
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#2d8a4e" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#2d8a4e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4ede8" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#7a8c82' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#7a8c82' }} tickLine={false} axisLine={false} tickFormatter={v => v >= 1000 ? `${v/1000}k` : v} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2d8a4e', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#2d8a4e"
                strokeWidth={2.5}
                fill="url(#regGrad)"
                dot={{ r: 3.5, fill: '#2d8a4e', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 5.5, fill: '#2d8a4e', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Subscription Donut */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title">Subscription Overview</div>
            <MonthSelector value={subPeriod} onChange={setSubPeriod} />
          </div>
          <div className="donut-wrap">
            <div style={{ width: 160, height: 160, flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={72}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v, n) => [v, n]} contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ textAlign: 'center', marginTop: -88, position: 'relative', pointerEvents: 'none' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-heading)' }}>2,350</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Total</div>
              </div>
            </div>
            <div className="donut-legend">
              {subscriptionData.map(item => (
                <div key={item.name} className="donut-legend-item">
                  <div className="donut-legend-label">
                    <div className="donut-dot" style={{ background: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <div className="donut-legend-value">{item.value} ({item.percent})</div>
                </div>
              ))}
            </div>
          </div>
          <div className="donut-footer">
            <BsArrowUpShort style={{ color: 'var(--positive)', fontSize: 18 }} />
            <span style={{ fontWeight: 600, color: 'var(--positive)' }}>8.7%</span>
            <span style={{ color: 'var(--text-muted)', fontSize: 11.5 }}>vs last month</span>
          </div>
        </div>
      </div>

      {/* ── Bottom Grid ── */}
      <div className="bottom-grid">
        {/* Recent Registered Users */}
        <div className="section-card">
          <div className="section-card-header">
            <span className="section-card-title">Recent Registered Users</span>
            <button className="view-all-link" onClick={() => navigate('/users')}>
              View All <MdArrowForward />
            </button>
          </div>
          {recentUsers.map(u => (
            <div key={u.id} className="user-list-item">
              <Avatar initials={u.initials} color={u.color} size="md" />
              <div className="user-list-info">
                <h4>{u.name}</h4>
                <span>{u.city}</span>
              </div>
              <span className="user-list-time">{u.time}</span>
            </div>
          ))}
          <div className="section-card-footer">
            <button className="view-all-link" onClick={() => navigate('/users')}>
              View All Users <MdArrowForward />
            </button>
          </div>
        </div>

        {/* Pending Verifications */}
        <div className="section-card">
          <div className="section-card-header">
            <span className="section-card-title">Pending Verifications</span>
            <button className="view-all-link" onClick={() => navigate('/verifications')}>
              View All <MdArrowForward />
            </button>
          </div>
          {pendingVerifications.map(v => (
            <div key={v.id} className="verif-item">
              <div className="verif-icon">{verifIcons[v.icon]}</div>
              <span className="verif-label">{v.label}</span>
              <span className="verif-count">{v.count}</span>
            </div>
          ))}
          <div className="section-card-footer">
            <button className="view-all-link" onClick={() => navigate('/verifications')}>
              View All Verifications <MdArrowForward />
            </button>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="section-card">
          <div className="section-card-header">
            <span className="section-card-title">Recent Payments</span>
            <button className="view-all-link" onClick={() => navigate('/payments')}>
              View All <MdArrowForward />
            </button>
          </div>
          {recentPayments.map(p => (
            <div key={p.id} className="payment-item">
              <Avatar initials={p.initials} color={p.color} size="md" />
              <div className="payment-info">
                <h4>{p.name}</h4>
                <span>{p.plan}</span>
              </div>
              <Badge status={p.status} />
              <div className="payment-right">
                <span className="payment-amount">{p.amount}</span>
                <span className="payment-time">{p.time}</span>
              </div>
            </div>
          ))}
          <div className="section-card-footer">
            <button className="view-all-link" onClick={() => navigate('/payments')}>
              View All Payments <MdArrowForward />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="section-card">
          <div className="section-card-header">
            <span className="section-card-title">Quick Actions</span>
          </div>
          <div className="quick-actions-grid">
            <QuickAction icon={<MdPersonAdd />} iconColor="#2d8a4e" label="Add New User" onClick={() => setModal('addUser')} />
            <QuickAction icon={<MdVerifiedUser />} iconColor="#3a6abf" label="Verify User" onClick={() => setModal('verifyUser')} />
            <QuickAction icon={<MdNotificationsActive />} iconColor="#c9a84c" label="Create Notification" onClick={() => setModal('createNotif')} />
            <QuickAction icon={<MdWorkspacePremium />} iconColor="#c9a84c" label="Add Subscription Plan" onClick={() => setModal('addPlan')} />
            <QuickAction icon={<MdBarChart />} iconColor="#2d8a4e" label="View Reports" onClick={() => navigate('/reports')} />
            <QuickAction icon={<MdSettings />} iconColor="#7a8c82" label="Platform Settings" onClick={() => navigate('/settings')} />
          </div>
        </div>
      </div>

      {/* Modals */}
      {modal === 'addUser'    && <AddUserModal onClose={() => setModal(null)} />}
      {modal === 'verifyUser' && <VerifyUserModal onClose={() => setModal(null)} />}
      {modal === 'createNotif'&& <CreateNotificationModal onClose={() => setModal(null)} />}
      {modal === 'addPlan'    && <AddSubscriptionPlanModal onClose={() => setModal(null)} />}
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────
function StatCard({ icon, iconClass, label, value, change, compareLabel }) {
  const isUp = change >= 0;
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className={`stat-card-icon ${iconClass}`}>{icon}</div>
        <span className="stat-card-label">{label}</span>
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-footer">
        <span className={`stat-card-change ${isUp ? 'up' : 'down'}`}>
          <BsArrowUpShort style={{ fontSize: 16, transform: isUp ? 'none' : 'rotate(180deg)' }} />
          {Math.abs(change)}%
        </span>
        <span className="stat-card-compare">{compareLabel}</span>
      </div>
    </div>
  );
}

function QuickAction({ icon, iconColor, label, onClick }) {
  return (
    <button className="quick-action-btn" onClick={onClick}>
      <div className="qa-icon" style={{ color: iconColor }}>{icon}</div>
      <span>{label}</span>
    </button>
  );
}
