import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';
const CartContext = createContext(null);
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0, totalItems: 0 });
  const { user } = useAuth();
  useEffect(() => { if (user) fetchCart(); else setCart({ items: [], totalPrice: 0, totalItems: 0 }); }, [user]);
  const fetchCart = async () => { try { const res = await cartAPI.getCart(); setCart(res.data.data); } catch(e) {} };
  const addToCart = async (productId, quantity = 1) => { const res = await cartAPI.addToCart({ productId, quantity }); setCart(res.data.data); };
  const updateItem = async (itemId, quantity) => { const res = await cartAPI.updateItem(itemId, quantity); setCart(res.data.data); };
  const removeItem = async (itemId) => { const res = await cartAPI.removeItem(itemId); setCart(res.data.data); };
  const clearCart = () => setCart({ items: [], totalPrice: 0, totalItems: 0 });
  return <CartContext.Provider value={{ cart, addToCart, updateItem, removeItem, fetchCart, clearCart }}>{children}</CartContext.Provider>;
};
export const useCart = () => useContext(CartContext);
