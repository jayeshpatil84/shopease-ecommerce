import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">🛍️ ShopEase</Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input type="text" placeholder="Search products..." value={search}
            onChange={(e) => setSearch(e.target.value)} />
          <button type="submit">🔍</button>
        </form>

        <div className="navbar-links">
          <Link to="/products">Products</Link>
          {user ? (
            <>
              <Link to="/cart" className="cart-link">
                🛒 Cart {cart.totalItems > 0 && <span className="cart-badge">{cart.totalItems}</span>}
              </Link>
              <Link to="/orders">Orders</Link>
              {isAdmin() && <Link to="/admin">Admin</Link>}
              <div className="user-menu">
                <span>Hi, {user.fullName.split(' ')[0]}</span>
                <button onClick={handleLogout} className="btn btn-secondary btn-sm">Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
