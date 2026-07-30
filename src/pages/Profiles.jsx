import { useState, useMemo } from 'react';
import { MdSearch, MdLocationOn, MdVisibility, MdEdit, MdDelete } from 'react-icons/md';
import { allProfiles } from '../data/mockData';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Pagination from '../components/ui/Pagination';
import Modal from '../components/ui/Modal';

const PER_PAGE = 12;

function ProfileModal({ profile, onClose }) {
  return (
    <Modal title="Profile Details" onClose={onClose} maxWidth={520} footer={
      <button className="btn btn-outline" onClick={onClose}>Close</button>
    }>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid var(--border-light)' }}>
          <Avatar initials={profile.initials} color={profile.color} size="xl" />
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-heading)' }}>{profile.name}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3, marginTop: 3 }}>
              <MdLocationOn style={{ fontSize: 14 }} /> {profile.city}
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              <Badge status={profile.status} />
              <Badge status={profile.verified ? 'Verified' : 'Unverified'} />
            </div>
          </div>
        </div>
        {/* Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            ['Age', profile.age + ' years'],
            ['Height', profile.height],
            ['Religion', profile.religion],
            ['Education', profile.education],
            ['Profession', profile.profession],
            ['Marital Status', profile.maritalStatus],
            ['Phone', profile.phone],
            ['Email', profile.email],
          ].map(([k, v]) => (
            <div key={k} style={{ background: 'var(--page-bg)', padding: '10px 12px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500, marginBottom: 3 }}>{k}</div>
              <div style={{ fontSize: 13, color: 'var(--text-heading)', fontWeight: 600 }}>{v}</div>
            </div>
          ))}
        </div>
        {/* Profile Completeness */}
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
            <span>Profile Completeness</span>
            <span style={{ fontWeight: 600, color: 'var(--text-body)' }}>{profile.profileComplete}%</span>
          </div>
          <div style={{ height: 7, background: 'var(--border-light)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${profile.profileComplete}%`, background: 'var(--green-primary)', borderRadius: 'var(--radius-full)', transition: 'width 0.4s' }} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default function Profiles() {
  const [profiles] = useState(allProfiles);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [verifFilter, setVerifFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const filtered = useMemo(() => {
    return profiles.filter(p => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.city.toLowerCase().includes(search.toLowerCase()) || p.profession.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      const matchVerif = verifFilter === 'All' || (verifFilter === 'Verified' && p.verified) || (verifFilter === 'Unverified' && !p.verified);
      return matchSearch && matchStatus && matchVerif;
    });
  }, [profiles, search, statusFilter, verifFilter]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h2>User Profiles</h2>
          <p>{filtered.length} profiles found</p>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="search-input-wrap" style={{ maxWidth: 300 }}>
          <span className="search-icon"><MdSearch /></span>
          <input type="text" placeholder="Search profiles..." value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <select className="filter-select" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <select className="filter-select" value={verifFilter} onChange={e => { setVerifFilter(e.target.value); setPage(1); }}>
          <option>All</option>
          <option>Verified</option>
          <option>Unverified</option>
        </select>
      </div>

      {/* Grid */}
      {paginated.length === 0 ? (
        <div className="empty-state"><div className="empty-state-icon">👤</div><h3>No profiles found</h3><p>Try adjusting your filters.</p></div>
      ) : (
        <div className="profiles-grid">
          {paginated.map(p => (
            <div key={p.id} className="profile-card">
              <div className="profile-card-avatar">
                <Avatar initials={p.initials} color={p.color} size="lg" />
              </div>
              <h3>{p.name}</h3>
              <div className="profile-card-loc">
                <MdLocationOn style={{ fontSize: 14 }} /> {p.city}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginBottom: 8 }}>
                <Badge status={p.status} />
                {p.verified && <Badge status="Verified" />}
              </div>
              <div className="profile-card-details">
                <div className="profile-detail-item">
                  <strong>{p.age}</strong>years
                </div>
                <div className="profile-detail-item">
                  <strong>{p.height}</strong>height
                </div>
                <div className="profile-detail-item">
                  <strong style={{ fontSize: 11 }}>{p.education}</strong>edu
                </div>
                <div className="profile-detail-item">
                  <strong style={{ fontSize: 10 }}>{p.maritalStatus.split(' ')[0]}</strong>status
                </div>
              </div>
              {/* Completeness bar */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
                  <span>Profile</span><span>{p.profileComplete}%</span>
                </div>
                <div style={{ height: 5, background: 'var(--border-light)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${p.profileComplete}%`, background: p.profileComplete > 80 ? 'var(--positive)' : p.profileComplete > 60 ? 'var(--gold)' : 'var(--negative)', borderRadius: 99 }} />
                </div>
              </div>
              <div className="profile-card-actions">
                <button className="btn btn-sm btn-primary" style={{ flex: 1 }} onClick={() => setSelectedProfile(p)}>
                  <MdVisibility /> View
                </button>
                <button className="btn btn-sm btn-outline" style={{ flex: 1 }}>
                  <MdEdit /> Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filtered.length > PER_PAGE && (
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', marginTop: 14 }}>
          <Pagination total={filtered.length} perPage={PER_PAGE} current={page} onChange={setPage} />
        </div>
      )}

      {selectedProfile && <ProfileModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />}
    </div>
  );
}
