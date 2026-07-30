import { useState, useMemo } from 'react';
import {
  MdSearch, MdBadge, MdCameraAlt, MdEmail, MdPhoneIphone,
  MdPhoto, MdCheck, MdClose, MdVisibility,
} from 'react-icons/md';
import { allVerifications } from '../data/mockData';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Pagination from '../components/ui/Pagination';
import Modal from '../components/ui/Modal';

const PER_PAGE = 10;

const typeIcons = {
  CNIC:          { icon: <MdBadge />,        bg: '#e2f0e8', color: '#2d8a4e' },
  Selfie:        { icon: <MdCameraAlt />,     bg: '#e5ecf8', color: '#3a6abf' },
  Email:         { icon: <MdEmail />,         bg: '#faf0dc', color: '#c9a84c' },
  Mobile:        { icon: <MdPhoneIphone />,   bg: '#fdeaea', color: '#e05c5c' },
  'Profile Photo': { icon: <MdPhoto />,       bg: '#e5f2fa', color: '#3a8fc8' },
};

function ReviewModal({ verif, action, onClose, onUpdate }) {
  const [note, setNote] = useState('');
  const [done, setDone] = useState(false);
  const isApprove = action === 'approve';

  function handleSubmit() {
    onUpdate(verif.id, isApprove ? 'Approved' : 'Rejected');
    setDone(true);
  }

  if (done) return (
    <Modal title="Review Complete" onClose={onClose} footer={<button className="btn btn-primary" onClick={onClose}>Done</button>}>
      <div className="success-state">
        <div className="success-icon" style={{ background: isApprove ? 'var(--positive-bg)' : 'var(--negative-bg)', color: isApprove ? 'var(--positive)' : 'var(--negative)' }}>
          {isApprove ? '✓' : '✗'}
        </div>
        <h3>{isApprove ? 'Verification Approved!' : 'Verification Rejected'}</h3>
        <p>{verif.user.name}'s {verif.type} verification has been {isApprove ? 'approved' : 'rejected'}.</p>
      </div>
    </Modal>
  );

  return (
    <Modal
      title={`${isApprove ? 'Approve' : 'Reject'} Verification`}
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className={`btn ${isApprove ? 'btn-primary' : 'btn-danger'}`} onClick={handleSubmit}>
            {isApprove ? 'Approve' : 'Reject'}
          </button>
        </>
      }
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '0 0 16px', borderBottom: '1px solid var(--border-light)', marginBottom: 16 }}>
        <Avatar initials={verif.user.initials} color={verif.user.color} size="md" />
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{verif.user.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{verif.type} Verification · {verif.submittedAt}</div>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Review Note (Optional)</label>
        <textarea className="form-textarea" placeholder={`Reason for ${isApprove ? 'approval' : 'rejection'}...`}
          value={note} onChange={e => setNote(e.target.value)} rows={3} />
      </div>
    </Modal>
  );
}

function ViewVerifModal({ verif, onClose }) {
  return (
    <Modal title="Verification Details" onClose={onClose} footer={<button className="btn btn-outline" onClick={onClose}>Close</button>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '0 0 14px', borderBottom: '1px solid var(--border-light)' }}>
          <Avatar initials={verif.user.initials} color={verif.user.color} size="lg" />
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-heading)' }}>{verif.user.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{verif.user.email}</div>
            <Badge status={verif.status} />
          </div>
        </div>
        {[
          ['Verification Type', verif.type],
          ['Submitted At', verif.submittedAt],
          ['Reviewed At', verif.reviewedAt],
          ['Reviewed By', verif.reviewedBy],
          ['User City', verif.user.city],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span style={{ color: 'var(--text-muted)' }}>{k}</span>
            <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{v}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default function Verifications() {
  const [verifs, setVerifs] = useState(allVerifications);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);

  const filtered = useMemo(() => {
    return verifs.filter(v => {
      const matchSearch = !search || v.user.name.toLowerCase().includes(search.toLowerCase()) || v.type.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'All' || v.type === typeFilter;
      const matchStatus = statusFilter === 'All' || v.status === statusFilter;
      return matchSearch && matchType && matchStatus;
    });
  }, [verifs, search, typeFilter, statusFilter]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleUpdate(id, status) {
    setVerifs(prev => prev.map(v => v.id === id ? { ...v, status, reviewedAt: new Date().toLocaleString('en-GB'), reviewedBy: 'Super Admin' } : v));
  }

  // Summary counts
  const pendingCount = verifs.filter(v => v.status === 'Pending').length;
  const approvedCount = verifs.filter(v => v.status === 'Approved').length;
  const rejectedCount = verifs.filter(v => v.status === 'Rejected').length;

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h2>Verifications</h2>
          <p>Review and process pending user verification requests</p>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 18 }}>
        {[
          { label: 'Pending', count: pendingCount, bg: '#fef3e2', color: '#e8a030', border: '#fde8b0' },
          { label: 'Approved', count: approvedCount, bg: 'var(--positive-bg)', color: 'var(--positive)', border: '#b8e4c8' },
          { label: 'Rejected', count: rejectedCount, bg: 'var(--negative-bg)', color: 'var(--negative)', border: '#f5c0c0' },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 'var(--radius-lg)', padding: '16px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: s.color, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-heading)' }}>{s.count}</div>
          </div>
        ))}
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="search-input-wrap">
            <span className="search-icon"><MdSearch /></span>
            <input type="text" placeholder="Search by user or type..." value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <select className="filter-select" value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setPage(1); }}>
            <option>All</option>
            <option>CNIC</option>
            <option>Selfie</option>
            <option>Email</option>
            <option>Mobile</option>
            <option>Profile Photo</option>
          </select>
          <select className="filter-select" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Type</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Reviewed At</th>
                <th>Reviewed By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={8}><div className="empty-state"><div className="empty-state-icon">✅</div><h3>No verifications found</h3></div></td></tr>
              ) : paginated.map((v, i) => {
                const ti = typeIcons[v.type] || typeIcons.CNIC;
                return (
                  <tr key={v.id}>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{(page - 1) * PER_PAGE + i + 1}</td>
                    <td>
                      <div className="user-cell">
                        <Avatar initials={v.user.initials} color={v.user.color} size="sm" />
                        <div className="user-cell-info"><h4>{v.user.name}</h4><span>{v.user.city}</span></div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div className="verif-row-icon" style={{ background: ti.bg, color: ti.color, width: 28, height: 28, fontSize: 14 }}>{ti.icon}</div>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{v.type}</span>
                      </div>
                    </td>
                    <td><Badge status={v.status} /></td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{v.submittedAt}</td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{v.reviewedAt}</td>
                    <td style={{ fontSize: 12 }}>{v.reviewedBy}</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn-sm btn-outline btn-icon" title="View" onClick={() => setModal({ type: 'view', verif: v })}><MdVisibility /></button>
                        {v.status === 'Pending' && (
                          <>
                            <button className="btn btn-sm btn-outline btn-icon" title="Approve" style={{ color: 'var(--positive)' }} onClick={() => setModal({ type: 'approve', verif: v })}><MdCheck /></button>
                            <button className="btn btn-sm btn-outline btn-icon" title="Reject" style={{ color: 'var(--negative)' }} onClick={() => setModal({ type: 'reject', verif: v })}><MdClose /></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Pagination total={filtered.length} perPage={PER_PAGE} current={page} onChange={setPage} />
      </div>

      {modal?.type === 'view' && <ViewVerifModal verif={modal.verif} onClose={() => setModal(null)} />}
      {(modal?.type === 'approve' || modal?.type === 'reject') && (
        <ReviewModal verif={modal.verif} action={modal.type} onClose={() => setModal(null)} onUpdate={handleUpdate} />
      )}
    </div>
  );
}
