import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await register(form);
      loginUser(res.data.data);
      toast.success('Account created!');
      navigate('/');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join ShopEase today</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input className="form-control" value={form.name} placeholder="John Doe"
              onChange={e => setForm({...form, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" type="email" value={form.email} placeholder="you@example.com"
              onChange={e => setForm({...form, email: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-control" type="password" value={form.password} placeholder="Min. 6 characters"
              onChange={e => setForm({...form, password: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Phone (optional)</label>
            <input className="form-control" value={form.phone} placeholder="+91 9876543210"
              onChange={e => setForm({...form, phone: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Address (optional)</label>
            <input className="form-control" value={form.address} placeholder="Your address"
              onChange={e => setForm({...form, address: e.target.value})} />
          </div>
          <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
        <p style={{textAlign:'center', marginTop:'20px', color:'#888'}}>
          Already have an account? <Link to="/login" style={{color:'#e94560'}}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
