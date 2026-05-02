import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please login to add items to cart'); return; }
    try {
      await addToCart(product.id, 1);
      toast.success('Added to cart!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-image">
        <img src={product.imageUrl || 'https://via.placeholder.com/300x200'} alt={product.name} />
        {product.stock === 0 && <span className="out-of-stock-badge">Out of Stock</span>}
      </div>
      <div className="product-info">
        <span className="product-category">{product.categoryName}</span>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-footer">
          <span className="product-price">₹{product.price?.toLocaleString()}</span>
          <button onClick={handleAddToCart} disabled={product.stock === 0} className="btn btn-primary btn-sm add-cart-btn">
            {product.stock === 0 ? 'Out of Stock' : '+ Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
