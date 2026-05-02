import React, { useState, useEffect } from 'react';
import { AdminSidebar } from './AdminDashboard';
import { getAllUsers } from '../../services/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => { getAllUsers().then(r => setUsers(r.data.data || [])); }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <h1 className="page-title">Users ({users.length})</h1>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Phone</th><th>Joined</th><th>Status</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td><strong>{u.name}</strong></td>
                  <td>{u.email}</td>
                  <td><span className={`status-badge ${u.role === 'ROLE_ADMIN' ? 'status-SHIPPED' : 'status-CONFIRMED'}`}>{u.role}</span></td>
                  <td>{u.phone || '—'}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td><span className={`status-badge ${u.enabled ? 'status-DELIVERED' : 'status-CANCELLED'}`}>{u.enabled ? 'Active' : 'Disabled'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminUsers;
