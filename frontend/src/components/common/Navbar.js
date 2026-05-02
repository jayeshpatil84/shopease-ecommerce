import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShoppingCart, User, LogOut, Package, Settings } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [cartCount] = useState(0);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">🛍️ ShopEase</Link>
        <div className="navbar-nav">
          <Link to="/products" className="nav-link">Products</Link>
          {user ? (
            <>
              <Link to="/cart" className="nav-link flex gap-2">
                <ShoppingCart size={18} /> Cart
              </Link>
              <Link to="/orders" className="nav-link flex gap-2">
                <Package size={18} /> Orders
              </Link>
              {user.role === 'ROLE_ADMIN' && (
                <Link to="/admin" className="nav-link flex gap-2">
                  <Settings size={18} /> Admin
                </Link>
              )}
              <span className="nav-link text-muted">Hi, {user.name.split(' ')[0]}</span>
              <button onClick={logout} className="btn btn-outline flex gap-2">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
