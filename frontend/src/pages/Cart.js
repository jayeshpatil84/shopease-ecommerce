import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, updateCartItem, removeCartItem } from '../services/api';
import toast from 'react-hot-toast';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = () => getCart().then(r => setItems(r.data.data || [])).finally(() => setLoading(false));
  useEffect(() => { fetchCart(); }, []);

  const update = async (id, qty) => {
    try { const r = await updateCartItem(id, qty); setItems(r.data.data || []); }
    catch (e) { toast.error('Failed to update'); }
  };

  const remove = async (id) => {
    try { const r = await removeCartItem(id); setItems(r.data.data || []); toast.success('Removed'); }
    catch (e) { toast.error('Failed to remove'); }
  };

  const total = items.reduce((sum, i) => sum + i.subtotal, 0);

  if (loading) return <div style={{textAlign:'center', padding:'80px'}}>Loading...</div>;

  return (
    <div className="page">
      <h1 className="page-title">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <p>Your cart is empty</p>
          <Link to="/products" className="btn btn-primary mt-4">Continue Shopping</Link>
        </div>
      ) : (
        <div style={{display:'grid', gridTemplateColumns:'1fr 350px', gap:'24px', alignItems:'start'}}>
          <div className="card">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img">
                  {item.imageUrl ? <img src={item.imageUrl} alt={item.productName} /> : '🛍️'}
                </div>
                <div style={{flex:1}}>
                  <div className="fw-bold">{item.productName}</div>
                  <div className="text-red fw-bold">₹{item.price?.toLocaleString()}</div>
                </div>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => update(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button className="qty-btn" onClick={() => update(item.id, item.quantity + 1)}>+</button>
                </div>
                <div style={{minWidth:'100px', textAlign:'right'}}>
                  <div className="fw-bold">₹{item.subtotal?.toLocaleString()}</div>
                  <button className="btn btn-danger btn-sm mt-2" onClick={() => remove(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3 style={{marginBottom:'16px'}}>Order Summary</h3>
            <div className="flex justify-between mb-3"><span>Items ({items.length})</span><span>₹{total?.toLocaleString()}</span></div>
            <div className="flex justify-between mb-3"><span>Shipping</span><span style={{color:'#28a745'}}>Free</span></div>
            <hr style={{margin:'16px 0'}} />
            <div className="flex justify-between fw-bold" style={{fontSize:'1.2rem'}}>
              <span>Total</span><span>₹{total?.toLocaleString()}</span>
            </div>
            <button className="btn btn-primary btn-block mt-4" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
            <Link to="/products" style={{display:'block', textAlign:'center', marginTop:'12px', color:'#888'}}>
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
