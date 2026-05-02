import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// Auth
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

// Products
export const getProducts = (page = 0, size = 12) => API.get(`/products?page=${page}&size=${size}`);
export const getFeatured = () => API.get('/products/featured');
export const getProduct = (id) => API.get(`/products/${id}`);
export const searchProducts = (keyword, page = 0) => API.get(`/products/search?keyword=${keyword}&page=${page}`);
export const getByCategory = (catId, page = 0) => API.get(`/products/category/${catId}?page=${page}`);
export const getCategories = () => API.get('/categories');

// Cart
export const getCart = () => API.get('/cart');
export const addToCart = (productId, quantity = 1) => API.post(`/cart/add?productId=${productId}&quantity=${quantity}`);
export const updateCartItem = (id, quantity) => API.put(`/cart/${id}?quantity=${quantity}`);
export const removeCartItem = (id) => API.delete(`/cart/${id}`);

// Orders
export const checkout = (data) => API.post('/orders/checkout', data);
export const getMyOrders = () => API.get('/orders/my-orders');

// Admin
export const getDashboard = () => API.get('/admin/dashboard');
export const getAllOrders = () => API.get('/admin/orders');
export const updateOrderStatus = (id, status) => API.put(`/admin/orders/${id}/status?status=${status}`);
export const getAllUsers = () => API.get('/admin/users');
export const createProduct = (data) => API.post('/admin/products', data);
export const updateProduct = (id, data) => API.put(`/admin/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/admin/products/${id}`);
export const createCategory = (data) => API.post('/admin/categories', data);
export const getAdminCategories = () => API.get('/admin/categories');
