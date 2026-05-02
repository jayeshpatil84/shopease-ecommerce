import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProducts, searchProducts, getByCategory, getCategories } from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then(r => setCategories(r.data.data || []));
  }, []);

  useEffect(() => {
    setLoading(true);
    const load = activeCategory
      ? getByCategory(activeCategory, page)
      : search ? searchProducts(search, page) : getProducts(page);
    load.then(r => {
      setProducts(r.data.data?.content || []);
      setTotalPages(r.data.data?.totalPages || 0);
    }).finally(() => setLoading(false));
  }, [page, activeCategory, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0); setActiveCategory(null);
  };

  return (
    <div className="page">
      <h1 className="page-title">All Products</h1>
      <form onSubmit={handleSearch} className="search-bar">
        <input className="form-control" placeholder="Search products..." value={search}
          onChange={e => setSearch(e.target.value)} />
        <button type="submit" className="btn btn-primary">Search</button>
        {search && <button type="button" className="btn btn-secondary" onClick={() => { setSearch(''); setPage(0); }}>Clear</button>}
      </form>
      <div className="filters">
        <button className={`filter-btn ${!activeCategory ? 'active' : ''}`}
          onClick={() => { setActiveCategory(null); setPage(0); }}>All</button>
        {categories.map(c => (
          <button key={c.id} className={`filter-btn ${activeCategory == c.id ? 'active' : ''}`}
            onClick={() => { setActiveCategory(c.id); setPage(0); }}>{c.name}</button>
        ))}
      </div>
      {loading ? <div style={{textAlign:'center', padding:'60px'}}>Loading...</div> :
        products.length === 0 ? (
          <div className="empty-state"><div className="empty-icon">🔍</div><p>No products found.</p></div>
        ) : (
          <>
            <div className="product-grid">
              {products.map(p => (
                <Link key={p.id} to={`/products/${p.id}`} className="product-card">
                  <div className="product-img">
                    {p.imageUrl ? <img src={p.imageUrl} alt={p.name} onError={e => e.target.style.display='none'} /> : '🛍️'}
                  </div>
                  <div className="product-info">
                    <div className="product-category">{p.categoryName}</div>
                    <div className="product-name">{p.name}</div>
                    <div className="product-price">₹{p.price?.toLocaleString()}</div>
                    <div className="text-muted mt-2">Stock: {p.stock}</div>
                  </div>
                </Link>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} className={`page-btn ${page === i ? 'active' : ''}`} onClick={() => setPage(i)}>{i + 1}</button>
                ))}
              </div>
            )}
          </>
        )
      }
    </div>
  );
};
export default Products;
