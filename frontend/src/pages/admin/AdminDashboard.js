import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getDashboard } from '../../services/api';
import { LayoutDashboard, Package, ShoppingBag, Users } from 'lucide-react';

export const AdminSidebar = () => {
  const { pathname } = useLocation();
  return (
    <div className="admin-sidebar">
      <div style={{padding:'16px 20px', fontWeight:'bold', color:'#e94560', fontSize:'1.1rem', marginBottom:'8px'}}>
        🛍️ Admin Panel
      </div>
      {[
        { to: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
        { to: '/admin/products', icon: <Package size={18} />, label: 'Products' },
        { to: '/admin/orders', icon: <ShoppingBag size={18} />, label: 'Orders' },
        { to: '/admin/users', icon: <Users size={18} />, label: 'Users' },
      ].map(item => (
        <Link key={item.to} to={item.to} className={pathname === item.to ? 'active' : ''}>
          {item.icon} {item.label}
        </Link>
      ))}
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  useEffect(() => { getDashboard().then(r => setStats(r.data.data)); }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <h1 className="page-title">Dashboard</h1>
        <div className="stat-grid">
          {[
            { label: 'Total Users', value: stats?.totalUsers ?? '—', icon: '👥' },
            { label: 'Total Products', value: stats?.totalProducts ?? '—', icon: '📦' },
            { label: 'Total Orders', value: stats?.totalOrders ?? '—', icon: '🛒' },
            { label: 'Revenue', value: stats ? `₹${stats.totalRevenue?.toLocaleString()}` : '—', icon: '💰' },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div style={{fontSize:'2.5rem', marginBottom:'8px'}}>{s.icon}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
          {[
            { title: '📦 Manage Products', desc: 'Add, edit, and manage your product catalog', link: '/admin/products' },
            { title: '🛒 Manage Orders', desc: 'View and update order statuses', link: '/admin/orders' },
          ].map(card => (
            <div key={card.title} className="card" style={{padding:'24px'}}>
              <h3 style={{marginBottom:'8px'}}>{card.title}</h3>
              <p className="text-muted mb-4">{card.desc}</p>
              <Link to={card.link} className="btn btn-primary">Go →</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
