import React, { useState, useEffect } from 'react';
import { getMyOrders } from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getMyOrders().then(r => setOrders(r.data.data || [])).finally(() => setLoading(false)); }, []);

  if (loading) return <div style={{textAlign:'center', padding:'80px'}}>Loading...</div>;

  return (
    <div className="page">
      <h1 className="page-title">My Orders</h1>
      {orders.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">📦</div><p>No orders yet</p></div>
      ) : (
        orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="flex justify-between mb-3">
              <div>
                <span className="fw-bold">Order #{order.id}</span>
                <span className="text-muted" style={{marginLeft:'12px'}}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div style={{display:'flex', gap:'8px'}}>
                <span className={`status-badge status-${order.status}`}>{order.status}</span>
                <span className={`status-badge status-${order.paymentStatus}`}>{order.paymentStatus}</span>
              </div>
            </div>
            <div className="text-muted mb-3">📍 {order.shippingAddress}</div>
            {order.items?.map((item, i) => (
              <div key={i} className="flex justify-between text-muted" style={{fontSize:'0.9rem', marginBottom:'4px'}}>
                <span>{item.productName} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity)?.toLocaleString()}</span>
              </div>
            ))}
            <hr style={{margin:'12px 0'}} />
            <div className="flex justify-between fw-bold">
              <span>Total</span><span>₹{order.totalAmount?.toLocaleString()}</span>
            </div>
            {order.paymentId && <div className="text-muted mt-2" style={{fontSize:'0.8rem'}}>Payment ID: {order.paymentId}</div>}
          </div>
        ))
      )}
    </div>
  );
};
export default Orders;
