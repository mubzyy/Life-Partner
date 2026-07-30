import { useState, useMemo } from 'react';
import { MdSearch, MdAdd, MdEdit, MdDelete, MdPeople } from 'react-icons/md';
import { planDetails, subscriptionsList } from '../data/mockData';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Pagination from '../components/ui/Pagination';
import Modal from '../components/ui/Modal';

const PER_PAGE = 10;

function AddPlanModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: '', price: '', duration: '1', features: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Plan name is required';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) errs.price = 'Valid price required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onAdd(form);
    setSuccess(true);
  }

  if (success) return (
    <Modal title="Create Plan" onClose={onClose} footer={<button className="btn btn-primary" onClick={onClose}>Done</button>}>
      <div className="success-state">
        <div className="success-icon" style={{ background: '#faf0dc', color: '#c9a84c' }}>👑</div>
        <h3>Plan Created!</h3>
        <p><strong>{form.name}</strong> at PKR {Number(form.price).toLocaleString()} has been added.</p>
      </div>
    </Modal>
  );

  return (
    <Modal title="Create Subscription Plan" onClose={onClose} footer={
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
          <label className="form-label">Duration</label>
          <select className="form-select" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })}>
            <option value="1">1 Month</option>
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="12">12 Months</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Features (one per line)</label>
          <textarea className="form-textarea" placeholder="Unlimited matches&#10;Profile boost&#10;Priority support"
            value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} rows={4} />
        </div>
      </form>
    </Modal>
  );
}

export default function Subscriptions() {
  const [plans, setPlans] = useState(planDetails);
  const [subs, setSubs] = useState(subscriptionsList);
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [showAddPlan, setShowAddPlan] = useState(false);

  const filtered = useMemo(() => {
    return subs.filter(s => {
      const matchSearch = !search || s.user.name.toLowerCase().includes(search.toLowerCase());
      const matchPlan = planFilter === 'All' || s.plan === planFilter;
      const matchStatus = statusFilter === 'All' || s.status === statusFilter;
      return matchSearch && matchPlan && matchStatus;
    });
  }, [subs, search, planFilter, statusFilter]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleAddPlan(form) {
    const newPlan = {
      id: Date.now(),
      name: form.name,
      price: Number(form.price),
      subscribers: 0,
      color: '#2d8a4e',
      revenue: 'PKR 0',
    };
    setPlans(prev => [...prev, newPlan]);
  }

  const planColors = ['#2d5e40', '#c9a84c', '#a8bfb0', '#f0c040'];

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h2>Subscriptions</h2>
          <p>Manage plans and active subscriber details</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddPlan(true)}>
          <MdAdd /> New Plan
        </button>
      </div>

      {/* Plan Cards */}
      <div className="plan-cards-row">
        {plans.map((plan, i) => (
          <div key={plan.id} className="plan-card">
            <div className="plan-card-accent" style={{ background: planColors[i % planColors.length] }} />
            <div className="plan-card-title">{plan.name}</div>
            <div className="plan-card-price">
              PKR {plan.price.toLocaleString()} <span>/ plan</span>
            </div>
            <div className="plan-card-subs">
              <MdPeople style={{ verticalAlign: 'middle', marginRight: 4 }} />
              <strong>{plan.subscribers.toLocaleString()}</strong> subscribers
            </div>
            <div style={{ marginTop: 6, fontSize: 12, color: 'var(--positive)', fontWeight: 600 }}>
              {plan.revenue}
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
              <button className="btn btn-sm btn-outline" style={{ flex: 1 }}><MdEdit /> Edit</button>
            </div>
          </div>
        ))}
      </div>

      {/* Subscribers Table */}
      <div className="table-card">
        <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid var(--border-light)', fontWeight: 600, fontSize: 14, color: 'var(--text-heading)' }}>
          Active Subscribers
        </div>
        <div className="table-toolbar">
          <div className="search-input-wrap">
            <span className="search-icon"><MdSearch /></span>
            <input type="text" placeholder="Search subscribers..." value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <select className="filter-select" value={planFilter} onChange={e => { setPlanFilter(e.target.value); setPage(1); }}>
            <option>All</option>
            {plans.map(p => <option key={p.id}>{p.name}</option>)}
          </select>
          <select className="filter-select" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
            <option>All</option>
            <option>Active</option>
            <option>Expired</option>
          </select>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Subscriber</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Auto Renew</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={8}><div className="empty-state"><div className="empty-state-icon">📋</div><h3>No subscribers found</h3></div></td></tr>
              ) : paginated.map((s, i) => (
                <tr key={s.id}>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{(page - 1) * PER_PAGE + i + 1}</td>
                  <td>
                    <div className="user-cell">
                      <Avatar initials={s.user.initials} color={s.user.color} size="sm" />
                      <div className="user-cell-info"><h4>{s.user.name}</h4><span>{s.user.city}</span></div>
                    </div>
                  </td>
                  <td style={{ fontSize: 12.5, fontWeight: 500 }}>{s.plan}</td>
                  <td style={{ fontWeight: 600 }}>PKR {s.amount.toLocaleString()}</td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.startDate}</td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.endDate}</td>
                  <td>
                    <span style={{ fontSize: 12, fontWeight: 600, color: s.autoRenew ? 'var(--positive)' : 'var(--text-muted)' }}>
                      {s.autoRenew ? '✓ On' : '✗ Off'}
                    </span>
                  </td>
                  <td><Badge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination total={filtered.length} perPage={PER_PAGE} current={page} onChange={setPage} />
      </div>

      {showAddPlan && <AddPlanModal onClose={() => setShowAddPlan(false)} onAdd={handleAddPlan} />}
    </div>
  );
}
