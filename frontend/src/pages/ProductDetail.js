import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, addToCart } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(id).then(r => setProduct(r.data.data)).finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) { navigate('/login'); return; }
    try {
      await addToCart(id, qty);
      toast.success('Added to cart!');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to add');
    }
  };

  if (loading) return <div style={{textAlign:'center', padding:'80px'}}>Loading...</div>;
  if (!product) return <div className="empty-state">Product not found</div>;

  return (
    <div className="page">
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', alignItems:'start'}}>
        <div className="card" style={{padding:'20px', textAlign:'center', fontSize:'6rem'}}>
          {product.imageUrl
            ? <img src={product.imageUrl} alt={product.name} style={{width:'100%', maxHeight:'400px', objectFit:'cover', borderRadius:'8px'}} onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
            : null}
          <span>🛍️</span>
        </div>
        <div>
          <div className="text-muted mb-3">{product.categoryName}</div>
          <h1 style={{fontSize:'2rem', marginBottom:'12px'}}>{product.name}</h1>
          {product.brand && <div className="text-muted mb-3">Brand: {product.brand}</div>}
          <div style={{fontSize:'2rem', color:'#e94560', fontWeight:'bold', marginBottom:'20px'}}>
            ₹{product.price?.toLocaleString()}
          </div>
          <p style={{color:'#555', lineHeight:'1.7', marginBottom:'24px'}}>{product.description}</p>
          <div className="text-muted mb-4">
            {product.stock > 0 ? `✅ In Stock (${product.stock} available)` : '❌ Out of Stock'}
          </div>
          {product.stock > 0 && (
            <div className="flex gap-3 mb-4">
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q-1))}>−</button>
                <span style={{minWidth:'30px', textAlign:'center'}}>{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => Math.min(product.stock, q+1))}>+</button>
              </div>
              <button className="btn btn-primary" style={{flex:1}} onClick={handleAddToCart}>
                🛒 Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
