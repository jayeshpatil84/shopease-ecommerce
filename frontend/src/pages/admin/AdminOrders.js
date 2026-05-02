import React, { useState, useEffect } from 'react';
import { AdminSidebar } from './AdminDashboard';
import { getAllOrders, updateOrderStatus } from '../../services/api';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => getAllOrders().then(r => setOrders(r.data.data || []));
  useEffect(() => { fetchOrders(); }, []);

  const handleStatus = async (id, status) => {
    try { await updateOrderStatus(id, status); toast.success('Status updated'); fetchOrders(); }
    catch (e) { toast.error('Failed to update'); }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <h1 className="page-title">Orders</h1>
        <div className="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Date</th><th>Customer</th><th>Amount</th><th>Status</th><th>Payment</th><th>Update</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td><span className="text-muted">{o.shippingAddress?.substring(0, 30)}...</span></td>
                  <td>₹{o.totalAmount?.toLocaleString()}</td>
                  <td><span className={`status-badge status-${o.status}`}>{o.status}</span></td>
                  <td><span className={`status-badge status-${o.paymentStatus}`}>{o.paymentStatus}</span></td>
                  <td>
                    <select className="form-control" style={{padding:'4px 8px', fontSize:'0.8rem', width:'130px'}}
                      value={o.status} onChange={e => handleStatus(o.id, e.target.value)}>
                      {['PENDING','CONFIRMED','SHIPPED','DELIVERED','CANCELLED'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminOrders;
