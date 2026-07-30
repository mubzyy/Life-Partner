import { useState, useMemo } from 'react';
import { MdSearch, MdAdd, MdEdit, MdDelete, MdVisibility, MdFilterList } from 'react-icons/md';
import { allUsers } from '../data/mockData';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Pagination from '../components/ui/Pagination';
import Modal from '../components/ui/Modal';

const PER_PAGE = 10;

function EditUserModal({ user, onClose, onSave }) {
  const [form, setForm] = useState({ name: user.name, email: user.email, phone: user.phone, city: user.city, plan: user.plan, status: user.status });
  const [success, setSuccess] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    onSave({ ...user, ...form });
    setSuccess(true);
  }

  if (success) return (
    <Modal title="Edit User" onClose={onClose} footer={<button className="btn btn-primary" onClick={onClose}>Done</button>}>
      <div className="success-state">
        <div className="success-icon">✓</div>
        <h3>User Updated!</h3>
        <p>{form.name}'s details have been saved successfully.</p>
      </div>
    </Modal>
  );

  return (
    <Modal title={`Edit User — ${user.name}`} onClose={onClose} footer={
      <>
        <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
      </>
    }>
      <form onSubmit={handleSave}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input className="form-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">City</label>
            <input className="form-input" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-select" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Subscription Plan</label>
          <select className="form-select" value={form.plan} onChange={e => setForm({ ...form, plan: e.target.value })}>
            <option>Free</option>
            <option>1 Month Plan</option>
            <option>3 Months Plan</option>
            <option>6 Months Plan</option>
            <option>12 Months Plan</option>
          </select>
        </div>
      </form>
    </Modal>
  );
}

function ViewUserModal({ user, onClose }) {
  return (
    <Modal title="User Details" onClose={onClose} footer={<button className="btn btn-outline" onClick={onClose}>Close</button>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '0 0 16px', borderBottom: '1px solid var(--border-light)' }}>
          <Avatar initials={user.initials} color={user.color} size="xl" />
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-heading)' }}>{user.name}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 3 }}>{user.email}</div>
            <div style={{ marginTop: 6 }}><Badge status={user.status} /></div>
          </div>
        </div>
        {[
          ['Phone', user.phone], ['City', user.city],
          ['Plan', user.plan], ['Verified', user.verified ? 'Yes' : 'No'],
          ['Joined', user.joined],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
            <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{k}</span>
            <span style={{ color: 'var(--text-heading)', fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
}

function DeleteUserModal({ user, onClose, onDelete }) {
  const [done, setDone] = useState(false);
  if (done) return (
    <Modal title="Delete User" onClose={onClose} footer={<button className="btn btn-primary" onClick={onClose}>Done</button>}>
      <div className="success-state">
        <div className="success-icon" style={{ background: 'var(--negative-bg)', color: 'var(--negative)' }}>🗑</div>
        <h3>User Deleted</h3>
        <p>{user.name} has been removed from the platform.</p>
      </div>
    </Modal>
  );
  return (
    <Modal title="Delete User" onClose={onClose} footer={
      <>
        <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        <button className="btn btn-danger" onClick={() => { onDelete(user.id); setDone(true); }}>Delete User</button>
      </>
    }>
      <div style={{ textAlign: 'center', padding: '10px 0' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-heading)', marginBottom: 8 }}>
          Are you sure you want to delete <strong>{user.name}</strong>?
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          This action cannot be undone. All user data will be permanently removed.
        </div>
      </div>
    </Modal>
  );
}

function AddUserModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', plan: 'Free', status: 'Active' });
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
    onAdd(form);
    setSuccess(true);
  }

  if (success) return (
    <Modal title="Add New User" onClose={onClose} footer={<button className="btn btn-primary" onClick={onClose}>Done</button>}>
      <div className="success-state">
        <div className="success-icon">✓</div>
        <h3>User Added!</h3>
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
            <label className="form-label">Plan</label>
            <select className="form-select" value={form.plan} onChange={e => setForm({ ...form, plan: e.target.value })}>
              <option>Free</option>
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

export default function Users() {
  const [users, setUsers] = useState(allUsers);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null); // { type, user? }

  const filtered = useMemo(() => {
    return users.filter(u => {
      const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) || u.city.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || u.status === statusFilter;
      const matchPlan = planFilter === 'All' || u.plan === planFilter;
      return matchSearch && matchStatus && matchPlan;
    });
  }, [users, search, statusFilter, planFilter]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleDelete(id) { setUsers(prev => prev.filter(u => u.id !== id)); }
  function handleSave(updated) { setUsers(prev => prev.map(u => u.id === updated.id ? updated : u)); }
  function handleAdd(form) {
    const newUser = {
      ...form, id: Date.now(),
      initials: form.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
      color: '#2d8a4e', verified: false,
      joined: new Date().toLocaleDateString('en-GB'),
    };
    setUsers(prev => [newUser, ...prev]);
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h2>All Users</h2>
          <p>Total {users.length.toLocaleString()} registered users</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModal({ type: 'add' })}>
          <MdAdd /> Add New User
        </button>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="search-input-wrap">
            <span className="search-icon"><MdSearch /></span>
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              id="users-search"
            />
          </div>
          <select className="filter-select" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select className="filter-select" value={planFilter} onChange={e => { setPlanFilter(e.target.value); setPage(1); }}>
            <option>All</option>
            <option>Free</option>
            <option>1 Month Plan</option>
            <option>3 Months Plan</option>
            <option>6 Months Plan</option>
            <option>12 Months Plan</option>
          </select>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)' }}>
            <MdFilterList style={{ verticalAlign: 'middle', marginRight: 4 }} />
            {filtered.length} results
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Phone</th>
                <th>City</th>
                <th>Plan</th>
                <th>Verified</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={9}><div className="empty-state"><div className="empty-state-icon">👥</div><h3>No users found</h3><p>Try adjusting your search or filters.</p></div></td></tr>
              ) : paginated.map((u, i) => (
                <tr key={u.id}>
                  <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>{(page - 1) * PER_PAGE + i + 1}</td>
                  <td>
                    <div className="user-cell">
                      <Avatar initials={u.initials} color={u.color} size="sm" />
                      <div className="user-cell-info">
                        <h4>{u.name}</h4>
                        <span>{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{u.phone}</td>
                  <td>{u.city}</td>
                  <td style={{ fontSize: 12.5, fontWeight: 500 }}>{u.plan}</td>
                  <td><Badge status={u.verified ? 'Verified' : 'Unverified'} /></td>
                  <td><Badge status={u.status} /></td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{u.joined}</td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn-sm btn-outline btn-icon" title="View" onClick={() => setModal({ type: 'view', user: u })}><MdVisibility /></button>
                      <button className="btn btn-sm btn-outline btn-icon" title="Edit" onClick={() => setModal({ type: 'edit', user: u })}><MdEdit /></button>
                      <button className="btn btn-sm btn-outline btn-icon" title="Delete" style={{ color: 'var(--negative)' }} onClick={() => setModal({ type: 'delete', user: u })}><MdDelete /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination total={filtered.length} perPage={PER_PAGE} current={page} onChange={setPage} />
      </div>

      {modal?.type === 'add'    && <AddUserModal onClose={() => setModal(null)} onAdd={handleAdd} />}
      {modal?.type === 'view'   && <ViewUserModal user={modal.user} onClose={() => setModal(null)} />}
      {modal?.type === 'edit'   && <EditUserModal user={modal.user} onClose={() => setModal(null)} onSave={handleSave} />}
      {modal?.type === 'delete' && <DeleteUserModal user={modal.user} onClose={() => setModal(null)} onDelete={handleDelete} />}
    </div>
  );
}
