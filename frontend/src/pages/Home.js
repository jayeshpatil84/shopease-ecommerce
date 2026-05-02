import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeatured, getCategories } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getFeatured().then(r => setProducts(r.data.data || [])).catch(console.error);
    getCategories().then(r => setCategories(r.data.data || [])).catch(console.error);
  }, []);

  return (
    <div>
      <div className="hero">
        <h1>Discover Amazing Products</h1>
        <p>Shop the best deals across all categories</p>
        <div className="hero-btns">
          <Link to="/products" className="btn btn-primary" style={{fontSize:'1.1rem', padding:'12px 32px'}}>
            Shop Now
          </Link>
          <Link to="/register" className="btn btn-outline" style={{fontSize:'1.1rem', padding:'12px 32px'}}>
            Get Started
          </Link>
        </div>
      </div>

      {categories.length > 0 && (
        <div className="section">
          <h2 className="section-title">Shop by Category</h2>
          <div style={{display:'flex', gap:'12px', flexWrap:'wrap'}}>
            {categories.map(cat => (
              <Link key={cat.id} to={`/products?category=${cat.id}`}
                className="filter-btn" style={{fontSize:'1rem', padding:'10px 20px', textDecoration:'none'}}>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="section">
        <h2 className="section-title">Featured Products</h2>
        {products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <p>No products yet. Add some from the admin panel!</p>
          </div>
        ) : (
          <div className="product-grid">
            {products.map(p => (
              <Link key={p.id} to={`/products/${p.id}`} className="product-card">
                <div className="product-img">
                  {p.imageUrl ? <img src={p.imageUrl} alt={p.name} onError={e => {e.target.style.display='none'}} /> : '🛍️'}
                </div>
                <div className="product-info">
                  <div className="product-category">{p.categoryName}</div>
                  <div className="product-name">{p.name}</div>
                  <div className="product-price">₹{p.price?.toLocaleString()}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div style={{textAlign:'center', marginTop:'32px'}}>
          <Link to="/products" className="btn btn-primary">View All Products</Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
