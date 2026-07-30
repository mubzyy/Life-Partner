import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { BsArrowUpShort } from 'react-icons/bs';
import { monthlyRevenue, revenueByPlan, reportStats, subscriptionData } from '../data/mockData';

const PIE_COLORS = ['#2d5e40', '#c9a84c', '#a8bfb0', '#f0c040'];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: 10, padding: '10px 14px', boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ fontSize: 13, fontWeight: 700, color: p.color }}>
          {p.dataKey === 'revenue' ? `PKR ${p.value.toLocaleString()}` : `${p.value.toLocaleString()} users`}
        </div>
      ))}
    </div>
  );
}

export default function Reports() {
  const [period, setPeriod] = useState('This Year');

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h2>Reports & Analytics</h2>
         <p>Detailed analytics and performance reports.</p>
        </div>
        <select className="filter-select" value={period} onChange={e => setPeriod(e.target.value)}>
          <option>This Year</option>
          <option>Last Year</option>
          <option>Last 6 Months</option>
        </select>
      </div>

      {/* Stats Row */}
      <div className="reports-stats-row">
        {[
          { label: 'Total Revenue', value: reportStats.totalRevenue.value, change: reportStats.totalRevenue.change, bg: '#e2f0e8', iconColor: '#2d8a4e', icon: '💰' },
          { label: 'New Users', value: reportStats.newUsers.value, change: reportStats.newUsers.change, bg: '#e5ecf8', iconColor: '#3a6abf', icon: '👥' },
          { label: 'Conversion Rate', value: reportStats.conversionRate.value, change: reportStats.conversionRate.change, bg: '#faf0dc', iconColor: '#c9a84c', icon: '📈' },
          { label: 'Avg Revenue/User', value: reportStats.avgRevenueUser.value, change: reportStats.avgRevenueUser.change, bg: '#fdeaea', iconColor: '#e05c5c', icon: '👤' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-card-top">
              <div className="stat-card-icon" style={{ background: s.bg, color: s.iconColor, fontSize: 20 }}>{s.icon}</div>
              <span className="stat-card-label">{s.label}</span>
            </div>
            <div className="stat-card-value" style={{ fontSize: 24 }}>{s.value}</div>
            <div className="stat-card-footer">
              <span className="stat-card-change up">
                <BsArrowUpShort style={{ fontSize: 16 }} />{s.change}%
              </span>
              <span className="stat-card-compare">vs last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="reports-charts-row">
        {/* Revenue Area Chart */}
        <div className="chart-card">
          <div className="chart-card-header" style={{ marginBottom: 16 }}>
            <div className="chart-card-title">Monthly Revenue</div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyRevenue} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2d8a4e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2d8a4e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4ede8" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7a8c82' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#7a8c82' }} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2d8a4e', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="revenue" stroke="#2d8a4e" strokeWidth={2.5} fill="url(#revGrad)"
                dot={{ r: 3, fill: '#2d8a4e', stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 5, fill: '#2d8a4e', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth Bar */}
        <div className="chart-card">
          <div className="chart-card-header" style={{ marginBottom: 16 }}>
            <div className="chart-card-title">User Growth</div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyRevenue} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4ede8" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7a8c82' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#7a8c82' }} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(45,138,78,0.06)' }} />
              <Bar dataKey="users" fill="#2d8a4e" radius={[4, 4, 0, 0]} maxBarSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="reports-charts-row">
        {/* Revenue by Plan */}
        <div className="chart-card">
          <div className="chart-card-header" style={{ marginBottom: 16 }}>
            <div className="chart-card-title">Revenue by Plan</div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueByPlan} layout="vertical" margin={{ top: 0, right: 10, left: 50, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4ede8" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#7a8c82' }} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#7a8c82' }} tickLine={false} axisLine={false} />
              <Tooltip formatter={v => [`PKR ${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="value" fill="#c9a84c" radius={[0, 4, 4, 0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subscription Mix */}
        <div className="chart-card">
          <div className="chart-card-header" style={{ marginBottom: 16 }}>
            <div className="chart-card-title">Subscription Mix</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <ResponsiveContainer width={160} height={180}>
              <PieChart>
                <Pie data={subscriptionData} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={2} dataKey="value">
                  {subscriptionData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v, n) => [v, n]} contentStyle={{ borderRadius: 10, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {subscriptionData.map((item, i) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 9, height: 9, borderRadius: 99, background: PIE_COLORS[i % PIE_COLORS.length] }} />
                    <span style={{ color: 'var(--text-body)' }}>{item.name}</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)' }}>{item.percent}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Table */}
      <div className="table-card" style={{ marginTop: 18 }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-light)', fontWeight: 600, fontSize: 14, color: 'var(--text-heading)' }}>
          Monthly Breakdown
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Revenue (PKR)</th>
                <th>New Users</th>
                <th>Avg/User (PKR)</th>
                <th>Growth</th>
              </tr>
            </thead>
            <tbody>
              {monthlyRevenue.map((row, i) => {
                const growth = i === 0 ? 0 : (((row.users - monthlyRevenue[i - 1].users) / monthlyRevenue[i - 1].users) * 100).toFixed(1);
                return (
                  <tr key={row.month}>
                    <td style={{ fontWeight: 600 }}>{row.month}</td>
                    <td>PKR {row.revenue.toLocaleString()}</td>
                    <td>{row.users.toLocaleString()}</td>
                    <td>PKR {Math.round(row.revenue / row.users).toLocaleString()}</td>
                    <td>
                      {i === 0 ? <span style={{ color: 'var(--text-muted)' }}>—</span> : (
                        <span style={{ color: growth >= 0 ? 'var(--positive)' : 'var(--negative)', fontWeight: 600, fontSize: 12 }}>
                          {growth >= 0 ? '▲' : '▼'} {Math.abs(growth)}%
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
