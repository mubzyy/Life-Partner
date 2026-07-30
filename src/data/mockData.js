// ============================================================
// LIFE PARTNER ADMIN — CENTRALIZED MOCK DATA
// ============================================================

export const currentAdmin = {
  name: 'Super Admin',
  role: 'Administrator',
  avatar: null,
  initials: 'SA',
};

// ─── Dashboard Stats ──────────────────────────────────────
export const dashboardStats = {
  totalUsers: { value: 12458, change: 12.5, label: 'vs last month' },
  verifiedUsers: { value: 9842, change: 15.3, label: 'vs last month' },
  premiumUsers: { value: 2350, change: 8.7, label: 'vs last month' },
  activeToday: { value: 1256, change: 10.2, label: 'vs yesterday' },
};

// ─── User Registrations Chart ─────────────────────────────
export const registrationsData = [
  { date: 'May 1',  users: 480 },
  { date: 'May 6',  users: 560 },
  { date: 'May 11', users: 510 },
  { date: 'May 16', users: 720 },
  { date: 'May 21', users: 980 },
  { date: 'May 26', users: 1150 },
  { date: 'May 31', users: 1380 },
];

export const registrationsDataYear = [
  { date: 'Jan', users: 3200 },
  { date: 'Feb', users: 4100 },
  { date: 'Mar', users: 3800 },
  { date: 'Apr', users: 5200 },
  { date: 'May', users: 6800 },
  { date: 'Jun', users: 7400 },
  { date: 'Jul', users: 8100 },
  { date: 'Aug', users: 9200 },
  { date: 'Sep', users: 8700 },
  { date: 'Oct', users: 10200 },
  { date: 'Nov', users: 11400 },
  { date: 'Dec', users: 12458 },
];

// ─── Subscription Overview ────────────────────────────────
export const subscriptionData = [
  { name: '1 Month Plan',  value: 650, color: '#2d5e40', percent: '27.7%' },
  { name: '3 Months Plan', value: 820, color: '#c9a84c', percent: '34.9%' },
  { name: '6 Months Plan', value: 480, color: '#a8bfb0', percent: '20.4%' },
  { name: '12 Months Plan',value: 400, color: '#f0c040', percent: '17.0%' },
];

// ─── Recent Registered Users ──────────────────────────────
export const recentUsers = [
  { id: 1, name: 'Ayesha Khan',  city: 'Lahore, Pakistan',     time: '2 min ago',   initials: 'AK', color: '#c9a84c' },
  { id: 2, name: 'Zain Ahmed',   city: 'Karachi, Pakistan',    time: '15 min ago',  initials: 'ZA', color: '#2d8a4e' },
  { id: 3, name: 'Fatima Noor',  city: 'Islamabad, Pakistan',  time: '32 min ago',  initials: 'FN', color: '#3a8fc8' },
  { id: 4, name: 'Usman Ali',    city: 'Multan, Pakistan',     time: '1 hour ago',  initials: 'UA', color: '#9b59b6' },
  { id: 5, name: 'Hina Zahra',   city: 'Faisalabad, Pakistan', time: '2 hours ago', initials: 'HZ', color: '#e05c5c' },
];

// ─── Pending Verifications ────────────────────────────────
export const pendingVerifications = [
  { id: 1, label: 'CNIC Verifications',          count: 128, icon: 'cnic' },
  { id: 2, label: 'Selfie Verifications',         count: 96,  icon: 'selfie' },
  { id: 3, label: 'Email Verifications',          count: 78,  icon: 'email' },
  { id: 4, label: 'Mobile Verifications',         count: 54,  icon: 'mobile' },
  { id: 5, label: 'Profile Photo Verifications',  count: 63,  icon: 'photo' },
];

// ─── Recent Payments ──────────────────────────────────────
export const recentPayments = [
  { id: 1, name: 'Zain Ahmed',   plan: '12 Months Plan', amount: 'PKR 9,999', status: 'Paid', time: '5 min ago',   initials: 'ZA', color: '#2d8a4e' },
  { id: 2, name: 'Ayesha Khan',  plan: '3 Months Plan',  amount: 'PKR 3,499', status: 'Paid', time: '28 min ago',  initials: 'AK', color: '#c9a84c' },
  { id: 3, name: 'Usman Ali',    plan: '6 Months Plan',  amount: 'PKR 5,999', status: 'Paid', time: '1 hour ago',  initials: 'UA', color: '#9b59b6' },
  { id: 4, name: 'Fatima Noor',  plan: '1 Month Plan',   amount: 'PKR 1,499', status: 'Paid', time: '2 hours ago', initials: 'FN', color: '#3a8fc8' },
  { id: 5, name: 'Bilal Ahmed',  plan: '12 Months Plan', amount: 'PKR 9,999', status: 'Paid', time: '3 hours ago', initials: 'BA', color: '#e05c5c' },
];

// ─── Users Page ───────────────────────────────────────────
const cities = ['Lahore', 'Karachi', 'Islamabad', 'Multan', 'Faisalabad', 'Rawalpindi', 'Peshawar', 'Quetta'];
const plans   = ['1 Month Plan', '3 Months Plan', '6 Months Plan', '12 Months Plan', 'Free'];
const statuses= ['Active', 'Inactive'];
const avatarColors = ['#c9a84c','#2d8a4e','#3a8fc8','#9b59b6','#e05c5c','#e8a030','#16a085','#8e44ad'];

const firstNames = ['Ayesha','Zain','Fatima','Usman','Hina','Bilal','Sara','Omar','Nadia','Hassan',
  'Amna','Raza','Sana','Tariq','Maria','Imran','Rabia','Kamran','Asma','Shahid'];
const lastNames  = ['Khan','Ahmed','Noor','Ali','Zahra','Malik','Sheikh','Iqbal','Butt','Chaudhry',
  'Mirza','Qureshi','Hashmi','Siddiqui','Abbasi','Ansari','Farooqi','Javed','Niazi','Rizvi'];

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export const allUsers = Array.from({ length: 80 }, (_, i) => {
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
  const city = cities[(i * 3 + 1) % cities.length];
  const plan = plans[i % plans.length];
  const status = i % 7 === 0 ? 'Inactive' : 'Active';
  const daysAgo = i + 1;
  const color = avatarColors[i % avatarColors.length];
  return {
    id: i + 1,
    name: `${fn} ${ln}`,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i + 1}@gmail.com`,
    phone: `03${String(100000000 + ((i * 1234567) % 899999999))}`,
    city: `${city}, Pakistan`,
    plan,
    status,
    verified: i % 5 !== 0,
    joined: new Date(Date.now() - daysAgo * 86400000).toLocaleDateString('en-GB'),
    initials: `${fn[0]}${ln[0]}`,
    color,
  };
});

// ─── Profiles Page ────────────────────────────────────────
const religions = ['Muslim', 'Muslim', 'Muslim', 'Muslim', 'Christian'];
const educations = ["Bachelor's", "Master's", "PhD", "Intermediate", "A-Levels"];
const professions = ['Software Engineer','Doctor','Teacher','Banker','Lawyer','Business Owner','Engineer','Accountant'];

export const allProfiles = allUsers.slice(0, 40).map((u, i) => ({
  ...u,
  age: 22 + (i % 18),
  height: `${5 + (i % 2)}'${i % 12}"`,
  religion: religions[i % religions.length],
  education: educations[(i * 2) % educations.length],
  profession: professions[(i * 3) % professions.length],
  maritalStatus: i % 8 === 0 ? 'Divorced' : i % 12 === 0 ? 'Widowed' : 'Never Married',
  profileComplete: 60 + (i % 40),
}));

// ─── Verifications Page ───────────────────────────────────
const verifTypes = ['CNIC', 'Selfie', 'Email', 'Mobile', 'Profile Photo'];
const verifStatuses = ['Pending', 'Approved', 'Rejected'];

export const allVerifications = allUsers.slice(0, 60).map((u, i) => ({
  id: i + 1,
  user: u,
  type: verifTypes[i % verifTypes.length],
  status: verifStatuses[i % 3],
  submittedAt: new Date(Date.now() - (i + 1) * 3600000 * 4).toLocaleString('en-GB'),
  reviewedAt: i % 3 !== 0 ? new Date(Date.now() - (i + 1) * 3600000 * 2).toLocaleString('en-GB') : '—',
  reviewedBy: i % 3 !== 0 ? 'Super Admin' : '—',
}));

// ─── Reports Page ─────────────────────────────────────────
export const monthlyRevenue = [
  { month: 'Jan', revenue: 320000, users: 3200 },
  { month: 'Feb', revenue: 410000, users: 4100 },
  { month: 'Mar', revenue: 380000, users: 3800 },
  { month: 'Apr', revenue: 520000, users: 5200 },
  { month: 'May', revenue: 680000, users: 6800 },
  { month: 'Jun', revenue: 740000, users: 7400 },
  { month: 'Jul', revenue: 810000, users: 8100 },
  { month: 'Aug', revenue: 920000, users: 9200 },
  { month: 'Sep', revenue: 870000, users: 8700 },
  { month: 'Oct', revenue: 1020000, users: 10200 },
  { month: 'Nov', revenue: 1140000, users: 11400 },
  { month: 'Dec', revenue: 1280000, users: 12458 },
];

export const revenueByPlan = [
  { name: '1 Month', value: 974850 },
  { name: '3 Months', value: 2870180 },
  { name: '6 Months', value: 2877520 },
  { name: '12 Months', value: 3999600 },
];

export const reportStats = {
  totalRevenue: { value: '₨ 1.28M', change: 18.4, label: 'vs last month' },
  newUsers: { value: '1,256', change: 12.5, label: 'vs last month' },
  conversionRate: { value: '18.9%', change: 2.3, label: 'vs last month' },
  avgRevenueUser: { value: '₨ 1,028', change: 5.6, label: 'vs last month' },
};

// ─── Subscriptions Page ───────────────────────────────────
export const planDetails = [
  { id: 1, name: '1 Month Plan',   price: 1499, subscribers: 650, color: '#2d5e40', revenue: 'PKR 974,350' },
  { id: 2, name: '3 Months Plan',  price: 3499, subscribers: 820, color: '#c9a84c', revenue: 'PKR 2,869,180' },
  { id: 3, name: '6 Months Plan',  price: 5999, subscribers: 480, color: '#a8bfb0', revenue: 'PKR 2,879,520' },
  { id: 4, name: '12 Months Plan', price: 9999, subscribers: 400, color: '#f0c040', revenue: 'PKR 3,999,600' },
];

export const subscriptionsList = allUsers.filter(u => u.plan !== 'Free').slice(0, 50).map((u, i) => ({
  id: i + 1,
  user: u,
  plan: u.plan,
  startDate: new Date(Date.now() - (i + 10) * 86400000).toLocaleDateString('en-GB'),
  endDate: new Date(Date.now() + (30 + i * 5) * 86400000).toLocaleDateString('en-GB'),
  amount: planDetails.find(p => p.name === u.plan)?.price || 1499,
  status: i % 9 === 0 ? 'Expired' : 'Active',
  autoRenew: i % 3 !== 0,
}));

// ─── Payments Page ────────────────────────────────────────
const paymentMethods = ['JazzCash', 'EasyPaisa', 'Bank Transfer', 'Card'];

export const allPayments = allUsers.slice(0, 70).map((u, i) => ({
  id: `TXN${String(10000 + i).padStart(5, '0')}`,
  user: u,
  plan: u.plan !== 'Free' ? u.plan : '1 Month Plan',
  amount: planDetails.find(p => p.name === u.plan)?.price || 1499,
  method: paymentMethods[i % paymentMethods.length],
  status: i % 8 === 0 ? 'Failed' : i % 12 === 0 ? 'Pending' : 'Paid',
  date: new Date(Date.now() - i * 86400000 * 2).toLocaleDateString('en-GB'),
  time: `${String((i % 12) + 1).padStart(2,'0')}:${String((i * 7) % 60).padStart(2,'0')} PM`,
}));

export const paymentSummary = {
  totalRevenue: { value: '₨ 12.8M', change: 18.4 },
  successRate: { value: '94.3%', change: 2.1 },
  failed: { value: 56, change: -4.2 },
  pending: { value: 23, change: -8.5 },
};

// ─── Notifications Page ───────────────────────────────────
const notifTypes = [
  { type: 'user', label: 'New User Registration', color: '#e2f0e8', iconColor: '#2d8a4e' },
  { type: 'payment', label: 'Payment Received', color: '#faf0dc', iconColor: '#c9a84c' },
  { type: 'verif', label: 'Verification Request', color: '#e5ecf8', iconColor: '#3a6abf' },
  { type: 'alert', label: 'System Alert', color: '#fdeaea', iconColor: '#e05c5c' },
  { type: 'report', label: 'Report Generated', color: '#e5f2fa', iconColor: '#3a8fc8' },
];

export const allNotifications = Array.from({ length: 30 }, (_, i) => {
  const nt = notifTypes[i % notifTypes.length];
  const user = allUsers[i % allUsers.length];
  const messages = {
    user: `${user.name} just registered from ${user.city}.`,
    payment: `Payment of PKR 9,999 received from ${user.name}.`,
    verif: `${user.name} submitted a CNIC verification request.`,
    alert: `Unusual login activity detected for user ${user.name}.`,
    report: `Monthly report for ${['January','February','March','April','May'][i % 5]} is ready.`,
  };
  return {
    id: i + 1,
    ...nt,
    message: messages[nt.type],
    time: i === 0 ? 'Just now' : i < 5 ? `${i * 12} min ago` : i < 15 ? `${i - 4} hour${i > 5 ? 's' : ''} ago` : `${i - 14} day${i > 15 ? 's' : ''} ago`,
    read: i > 6,
  };
});
