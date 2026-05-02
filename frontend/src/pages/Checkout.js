import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, checkout } from '../services/api';
import toast from 'react-hot-toast';

const Checkout = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ shippingAddress: '', paymentMethod: 'card', cardNumber: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { getCart().then(r => setItems(r.data.data || [])); }, []);

  const total = items.reduce((s, i) => s + i.subtotal, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await checkout(form);
      toast.success('Order placed successfully! 🎉');
      navigate('/orders');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Checkout failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="page">
      <h1 className="page-title">Checkout</h1>
      <div style={{display:'grid', gridTemplateColumns:'1fr 350px', gap:'24px', alignItems:'start'}}>
        <form onSubmit={handleSubmit}>
          <div className="card" style={{padding:'24px', marginBottom:'20px'}}>
            <h3 style={{marginBottom:'20px'}}>Shipping Address</h3>
            <div className="form-group">
              <label>Full Address</label>
              <textarea className="form-control" rows="3" value={form.shippingAddress} required
                placeholder="Street, City, State, PIN code"
                onChange={e => setForm({...form, shippingAddress: e.target.value})} />
            </div>
          </div>
          <div className="card" style={{padding:'24px', marginBottom:'20px'}}>
            <h3 style={{marginBottom:'20px'}}>Payment (Mock)</h3>
            <div className="form-group">
              <label>Payment Method</label>
              <select className="form-control" value={form.paymentMethod}
                onChange={e => setForm({...form, paymentMethod: e.target.value})}>
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>
            {form.paymentMethod === 'card' && (
              <div className="form-group">
                <label>Card Number (Mock)</label>
                <input className="form-control" value={form.cardNumber} placeholder="4242 4242 4242 4242"
                  onChange={e => setForm({...form, cardNumber: e.target.value})} />
              </div>
            )}
            <div style={{background:'#e8f5e9', padding:'12px', borderRadius:'8px', color:'#2e7d32', fontSize:'0.85rem'}}>
              💡 This is a mock payment — no real transaction occurs
            </div>
          </div>
          <button className="btn btn-primary btn-block" type="submit" disabled={loading || items.length === 0}
            style={{fontSize:'1.1rem', padding:'14px'}}>
            {loading ? 'Placing Order...' : `Place Order • ₹${total?.toLocaleString()}`}
          </button>
        </form>
        <div className="card" style={{padding:'24px'}}>
          <h3 style={{marginBottom:'16px'}}>Order Items</h3>
          {items.map(i => (
            <div key={i.id} className="flex justify-between mb-3">
              <span style={{flex:1, paddingRight:'8px'}}>{i.productName} × {i.quantity}</span>
              <span className="fw-bold">₹{i.subtotal?.toLocaleString()}</span>
            </div>
          ))}
          <hr style={{margin:'16px 0'}} />
          <div className="flex justify-between fw-bold" style={{fontSize:'1.2rem'}}>
            <span>Total</span><span>₹{total?.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
