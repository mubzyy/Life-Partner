import { useState } from 'react';
import {
  MdPerson, MdSecurity, MdNotifications, MdPalette, MdStorage,
  MdSave, MdBadge,
} from 'react-icons/md';
import Avatar from '../components/ui/Avatar';
import Modal from '../components/ui/Modal';

const sections = [
  { id: 'profile',       label: 'Profile',        icon: <MdPerson /> },
  { id: 'security',      label: 'Security',        icon: <MdSecurity /> },
  { id: 'notifications', label: 'Notifications',   icon: <MdNotifications /> },
  { id: 'appearance',    label: 'Appearance',       icon: <MdPalette /> },
  { id: 'platform',      label: 'Platform',         icon: <MdStorage /> },
];

function Toggle({ checked, onChange, id }) {
  return (
    <label className="toggle-switch" htmlFor={id}>
      <input type="checkbox" id={id} checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="toggle-slider" />
    </label>
  );
}

function SettingRow({ title, description, children }) {
  return (
    <div className="settings-row">
      <div className="settings-row-info">
        <h4>{title}</h4>
        {description && <p>{description}</p>}
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [saved, setSaved] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    name: 'Super Admin',
    email: 'admin@lifepartner.pk',
    phone: '0300-1234567',
    role: 'Administrator',
    bio: 'Platform administrator for Life Partner.',
  });

  // Security state
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [passErrors, setPassErrors] = useState({});
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');

  // Notification toggles
  const [notifSettings, setNotifSettings] = useState({
    newUser: true, payment: true, verif: true, alert: true, report: false,
    emailDigest: true, smsAlerts: false, pushNotif: true,
  });

  // Appearance
  const [appearance, setAppearance] = useState({
    theme: 'light', sidebarCollapsed: false, denseMode: false, animations: true,
  });

  // Platform
  const [platform, setPlatform] = useState({
    maintenanceMode: false,
    registrationOpen: true,
    autoApprove: false,
    minAge: '18',
    maxPhotos: '10',
    premiumRequired: false,
  });

  function handleSaveProfile(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleChangePassword(e) {
    e.preventDefault();
    const errs = {};
    if (!passwords.current) errs.current = 'Current password is required';
    if (passwords.newPass.length < 8) errs.newPass = 'Minimum 8 characters';
    if (passwords.newPass !== passwords.confirm) errs.confirm = 'Passwords do not match';
    setPassErrors(errs);
    if (Object.keys(errs).length === 0) {
      setPasswords({ current: '', newPass: '', confirm: '' });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return (
        <div>
          <div className="settings-section-header">
            <h3>Profile Information</h3>
            <p>Update your admin profile details and public information</p>
          </div>
          <div className="settings-section-body">
            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: '0 0 24px', borderBottom: '1px solid var(--border-light)' }}>
              <Avatar initials="SA" color="#c9a84c" size="xl" />
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-heading)' }}>Super Admin</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginBottom: 8 }}>Administrator</div>
                <button className="btn btn-sm btn-outline">Change Photo</button>
              </div>
            </div>
            <form onSubmit={handleSaveProfile}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <input className="form-input" value={profile.role} disabled style={{ opacity: 0.7 }} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="form-input" type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input className="form-input" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea className="form-textarea" rows={3} value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button type="submit" className="btn btn-primary">
                  <MdSave /> {saved ? '✓ Saved!' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      );

      case 'security': return (
        <div>
          <div className="settings-section-header">
            <h3>Security Settings</h3>
            <p>Manage your password and account security preferences</p>
          </div>
          <div className="settings-section-body">
            <form onSubmit={handleChangePassword}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-heading)', marginBottom: 14 }}>Change Password</div>
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input className={`form-input${passErrors.current ? ' error' : ''}`} type="password" placeholder="••••••••"
                    value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} />
                  {passErrors.current && <div className="form-error">{passErrors.current}</div>}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input className={`form-input${passErrors.newPass ? ' error' : ''}`} type="password" placeholder="Min. 8 characters"
                      value={passwords.newPass} onChange={e => setPasswords({ ...passwords, newPass: e.target.value })} />
                    {passErrors.newPass && <div className="form-error">{passErrors.newPass}</div>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <input className={`form-input${passErrors.confirm ? ' error' : ''}`} type="password" placeholder="Repeat password"
                      value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} />
                    {passErrors.confirm && <div className="form-error">{passErrors.confirm}</div>}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-sm">Update Password</button>
              </div>
            </form>
            <div className="divider" />
            <SettingRow title="Two-Factor Authentication" description="Add an extra layer of security to your admin account">
              <Toggle id="2fa" checked={twoFactor} onChange={setTwoFactor} />
            </SettingRow>
            <SettingRow title="Session Timeout" description="Automatically log out after inactivity">
              <select className="filter-select" value={sessionTimeout} onChange={e => setSessionTimeout(e.target.value)}>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="0">Never</option>
              </select>
            </SettingRow>
          </div>
        </div>
      );

      case 'notifications': return (
        <div>
          <div className="settings-section-header">
            <h3>Notification Preferences</h3>
            <p>Choose which notifications you want to receive</p>
          </div>
          <div className="settings-section-body">
            <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 10 }}>In-App Alerts</div>
            {[
              { id: 'newUser', label: 'New User Registrations', desc: 'Get notified when a new user signs up' },
              { id: 'payment', label: 'Payment Transactions', desc: 'Alerts for new payments and failures' },
              { id: 'verif', label: 'Verification Requests', desc: 'New verification submissions' },
              { id: 'alert', label: 'System Alerts', desc: 'Critical platform security alerts' },
              { id: 'report', label: 'Report Generation', desc: 'When monthly reports are ready' },
            ].map(item => (
              <SettingRow key={item.id} title={item.label} description={item.desc}>
                <Toggle id={`notif-${item.id}`} checked={notifSettings[item.id]} onChange={v => setNotifSettings(p => ({ ...p, [item.id]: v }))} />
              </SettingRow>
            ))}
            <div className="divider" />
            <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 10 }}>Delivery Channels</div>
            {[
              { id: 'emailDigest', label: 'Email Digest', desc: 'Daily summary email of platform activity' },
              { id: 'smsAlerts', label: 'SMS Alerts', desc: 'Critical alerts via SMS' },
              { id: 'pushNotif', label: 'Push Notifications', desc: 'Browser push notifications' },
            ].map(item => (
              <SettingRow key={item.id} title={item.label} description={item.desc}>
                <Toggle id={`delivery-${item.id}`} checked={notifSettings[item.id]} onChange={v => setNotifSettings(p => ({ ...p, [item.id]: v }))} />
              </SettingRow>
            ))}
          </div>
        </div>
      );

      case 'appearance': return (
        <div>
          <div className="settings-section-header">
            <h3>Appearance</h3>
            <p>Customize the look and feel of the admin dashboard</p>
          </div>
          <div className="settings-section-body">
            <SettingRow title="Theme" description="Choose between light and dark mode">
              <select className="filter-select" value={appearance.theme} onChange={e => setAppearance(p => ({ ...p, theme: e.target.value }))}>
                <option value="light">Light</option>
                <option value="dark">Dark (coming soon)</option>
                <option value="system">System Default</option>
              </select>
            </SettingRow>
            <SettingRow title="Dense Mode" description="Compact table and list spacing">
              <Toggle id="dense" checked={appearance.denseMode} onChange={v => setAppearance(p => ({ ...p, denseMode: v }))} />
            </SettingRow>
            <SettingRow title="Animations" description="Enable smooth UI transitions and animations">
              <Toggle id="anim" checked={appearance.animations} onChange={v => setAppearance(p => ({ ...p, animations: v }))} />
            </SettingRow>
            <div className="divider" />
            <div style={{ textAlign: 'right' }}>
              <button className="btn btn-primary btn-sm" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}>
                <MdSave /> {saved ? '✓ Saved!' : 'Save Preferences'}
              </button>
            </div>
          </div>
        </div>
      );

      case 'platform': return (
        <div>
          <div className="settings-section-header">
            <h3>Platform Settings</h3>
            <p>Configure global platform behavior and policies</p>
          </div>
          <div className="settings-section-body">
            <SettingRow title="Maintenance Mode" description="Put the platform in read-only mode for users">
              <Toggle id="maintenance" checked={platform.maintenanceMode} onChange={v => setPlatform(p => ({ ...p, maintenanceMode: v }))} />
            </SettingRow>
            <SettingRow title="Open Registration" description="Allow new users to sign up">
              <Toggle id="registration" checked={platform.registrationOpen} onChange={v => setPlatform(p => ({ ...p, registrationOpen: v }))} />
            </SettingRow>
            <SettingRow title="Auto-Approve Profiles" description="Automatically approve new user profiles">
              <Toggle id="autoapprove" checked={platform.autoApprove} onChange={v => setPlatform(p => ({ ...p, autoApprove: v }))} />
            </SettingRow>
            <SettingRow title="Premium Required for Messaging" description="Only premium users can send messages">
              <Toggle id="premium-msg" checked={platform.premiumRequired} onChange={v => setPlatform(p => ({ ...p, premiumRequired: v }))} />
            </SettingRow>
            <div className="divider" />
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Minimum Age Requirement</label>
                <input className="form-input" type="number" min={18} max={99} value={platform.minAge}
                  onChange={e => setPlatform(p => ({ ...p, minAge: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Max Profile Photos</label>
                <input className="form-input" type="number" min={1} max={20} value={platform.maxPhotos}
                  onChange={e => setPlatform(p => ({ ...p, maxPhotos: e.target.value }))} />
              </div>
            </div>
            <div style={{ textAlign: 'right', marginTop: 8 }}>
              <button className="btn btn-primary btn-sm" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}>
                <MdSave /> {saved ? '✓ Saved!' : 'Save Settings'}
              </button>
            </div>
          </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h2>Settings</h2>
          <p>Manage your account, security, and platform configuration</p>
        </div>
      </div>

      <div className="settings-grid">
        {/* Settings Sidebar */}
        <div className="settings-sidebar-card">
          {sections.map(s => (
            <button
              key={s.id}
              className={`settings-nav-item${activeSection === s.id ? ' active' : ''}`}
              onClick={() => setActiveSection(s.id)}
            >
              <span className="settings-nav-icon">{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="settings-content-card">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
