import { useState, useMemo } from 'react';
import { MdSearch, MdVisibility, MdReceiptLong } from 'react-icons/md';
import { BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs';
import { allPayments, paymentSummary } from '../data/mockData';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Pagination from '../components/ui/Pagination';
import Modal from '../components/ui/Modal';

const PER_PAGE = 10;

function PaymentModal({ payment, onClose }) {
  return (
    <Modal title="Payment Receipt" onClose={onClose} footer={
      <>
        <button className="btn btn-outline" onClick={onClose}>Close</button>
        <button className="btn btn-primary" onClick={onClose}><MdReceiptLong /> Download Receipt</button>
      </>
    }>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {/* Receipt Header */}
        <div style={{ textAlign: 'center', padding: '0 0 18px', borderBottom: '1px solid var(--border-light)', marginBottom: 18 }}>
          <div style={{ width: 52, height: 52, borderRadius: 99, background: payment.status === 'Paid' ? 'var(--positive-bg)' : payment.status === 'Failed' ? 'var(--negative-bg)' : 'var(--warning-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: 24 }}>
            {payment.status === 'Paid' ? '✓' : payment.status === 'Failed' ? '✗' : '⏳'}
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-heading)' }}>PKR {payment.amount.toLocaleString()}</div>
          <div style={{ marginTop: 6 }}><Badge status={payment.status} /></div>
        </div>
        {/* Details */}
        {[
          ['Transaction ID', payment.id],
          ['User', payment.user.name],
          ['Plan', payment.plan],
          ['Method', payment.method],
          ['Date', payment.date],
          ['Time', payment.time],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-light)', fontSize: 13 }}>
            <span style={{ color: 'var(--text-muted)' }}>{k}</span>
            <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{v}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default function Payments() {
  const [payments] = useState(allPayments);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [methodFilter, setMethodFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const filtered = useMemo(() => {
    return payments.filter(p => {
      const matchSearch = !search || p.user.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      const matchMethod = methodFilter === 'All' || p.method === methodFilter;
      return matchSearch && matchStatus && matchMethod;
    });
  }, [payments, search, statusFilter, methodFilter]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const totalAmount = filtered.reduce((acc, p) => p.status === 'Paid' ? acc + p.amount : acc, 0);

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h2>Payments</h2>
          <p>View and manage all payment transactions.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="payment-summary-row">
        {[
          { label: 'Total Revenue', value: paymentSummary.totalRevenue.value, change: paymentSummary.totalRevenue.change, up: true, bg: '#e2f0e8', icon: '💰', color: '#2d8a4e' },
          { label: 'Success Rate', value: paymentSummary.successRate.value, change: paymentSummary.successRate.change, up: true, bg: '#e5ecf8', icon: '✅', color: '#3a6abf' },
          { label: 'Failed Payments', value: paymentSummary.failed.value, change: Math.abs(paymentSummary.failed.change), up: false, bg: '#fdeaea', icon: '❌', color: '#e05c5c' },
          { label: 'Pending Payments', value: paymentSummary.pending.value, change: Math.abs(paymentSummary.pending.change), up: false, bg: '#fef3e2', icon: '⏳', color: '#e8a030' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-card-top">
              <div className="stat-card-icon" style={{ background: s.bg, color: s.color, fontSize: 20 }}>{s.icon}</div>
              <span className="stat-card-label">{s.label}</span>
            </div>
            <div className="stat-card-value" style={{ fontSize: 24 }}>{s.value}</div>
            <div className="stat-card-footer">
              <span className={`stat-card-change ${s.up ? 'up' : 'down'}`} style={{ color: s.up ? 'var(--positive)' : 'var(--negative)' }}>
                {s.up ? <BsArrowUpShort style={{ fontSize: 16 }} /> : <BsArrowDownShort style={{ fontSize: 16 }} />}
                {s.change}%
              </span>
              <span className="stat-card-compare">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="search-input-wrap">
            <span className="search-icon"><MdSearch /></span>
            <input type="text" placeholder="Search by name or TXN ID..." value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <select className="filter-select" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
            <option>All</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
          <select className="filter-select" value={methodFilter} onChange={e => { setMethodFilter(e.target.value); setPage(1); }}>
            <option>All</option>
            <option>JazzCash</option>
            <option>EasyPaisa</option>
            <option>Bank Transfer</option>
            <option>Card</option>
          </select>
          <span style={{ marginLeft: 'auto', fontSize: 12.5, fontWeight: 600, color: 'var(--positive)' }}>
            Total: PKR {totalAmount.toLocaleString()}
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>TXN ID</th>
                <th>User</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={9}><div className="empty-state"><div className="empty-state-icon">💳</div><h3>No payments found</h3></div></td></tr>
              ) : paginated.map(p => (
                <tr key={p.id}>
                  <td style={{ fontSize: 11.5, fontFamily: 'monospace', color: 'var(--text-muted)' }}>{p.id}</td>
                  <td>
                    <div className="user-cell">
                      <Avatar initials={p.user.initials} color={p.user.color} size="sm" />
                      <div className="user-cell-info"><h4>{p.user.name}</h4><span>{p.user.city}</span></div>
                    </div>
                  </td>
                  <td style={{ fontSize: 12.5 }}>{p.plan}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text-heading)' }}>PKR {p.amount.toLocaleString()}</td>
                  <td>
                    <span style={{ fontSize: 12, background: 'var(--page-bg)', padding: '3px 8px', borderRadius: 'var(--radius-full)', fontWeight: 500 }}>{p.method}</span>
                  </td>
                  <td><Badge status={p.status} /></td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.date}</td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.time}</td>
                  <td>
                    <button className="btn btn-sm btn-outline btn-icon" title="View Receipt" onClick={() => setSelectedPayment(p)}>
                      <MdVisibility />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination total={filtered.length} perPage={PER_PAGE} current={page} onChange={setPage} />
      </div>

      {selectedPayment && <PaymentModal payment={selectedPayment} onClose={() => setSelectedPayment(null)} />}
    </div>
  );
}
