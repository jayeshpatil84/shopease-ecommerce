import React, { useState, useEffect } from 'react';
import { AdminSidebar } from './AdminDashboard';
import { getProducts, createProduct, updateProduct, deleteProduct, getAdminCategories } from '../../services/api';
import toast from 'react-hot-toast';

const emptyForm = { name: '', description: '', price: '', stock: '', imageUrl: '', brand: '', categoryId: '' };

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = () => getProducts(page, 10).then(r => {
    setProducts(r.data.data?.content || []);
    setTotalPages(r.data.data?.totalPages || 0);
  });

  useEffect(() => { fetchProducts(); }, [page]);
  useEffect(() => { getAdminCategories().then(r => setCategories(r.data.data || [])); }, []);

  const openModal = (product = null) => {
    setEditing(product);
    setForm(product ? { name: product.name, description: product.description || '', price: product.price, stock: product.stock, imageUrl: product.imageUrl || '', brand: product.brand || '', categoryId: product.categoryId } : emptyForm);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await updateProduct(editing.id, form); toast.success('Product updated!'); }
      else { await createProduct(form); toast.success('Product created!'); }
      setShowModal(false);
      fetchProducts();
    } catch (e) { toast.error(e.response?.data?.message || 'Failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try { await deleteProduct(id); toast.success('Deleted'); fetchProducts(); }
    catch (e) { toast.error('Failed to delete'); }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="flex justify-between mb-4">
          <h1 className="page-title" style={{margin:0}}>Products</h1>
          <button className="btn btn-primary" onClick={() => openModal()}>+ Add Product</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td><strong>{p.name}</strong><br/><span className="text-muted">{p.brand}</span></td>
                  <td>{p.categoryName}</td>
                  <td>₹{p.price?.toLocaleString()}</td>
                  <td>{p.stock}</td>
                  <td><span className={`status-badge ${p.active ? 'status-CONFIRMED' : 'status-CANCELLED'}`}>{p.active ? 'Active' : 'Hidden'}</span></td>
                  <td>
                    <button className="btn btn-secondary btn-sm" onClick={() => openModal(p)} style={{marginRight:'6px'}}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="pagination">
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} className={`page-btn ${page === i ? 'active' : ''}`} onClick={() => setPage(i)}>{i+1}</button>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editing ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={() => setShowModal(false)} style={{border:'none', background:'none', fontSize:'1.5rem', cursor:'pointer'}}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid-2">
                <div className="form-group"><label>Name</label><input className="form-control" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
                <div className="form-group"><label>Brand</label><input className="form-control" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} /></div>
              </div>
              <div className="form-group"><label>Description</label><textarea className="form-control" rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
              <div className="grid-2">
                <div className="form-group"><label>Price (₹)</label><input className="form-control" type="number" step="0.01" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required /></div>
                <div className="form-group"><label>Stock</label><input className="form-control" type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} required /></div>
              </div>
              <div className="form-group"><label>Category</label>
                <select className="form-control" value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})} required>
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Image URL</label><input className="form-control" value={form.imageUrl} placeholder="https://..." onChange={e => setForm({...form, imageUrl: e.target.value})} /></div>
              <div className="flex gap-2" style={{justifyContent:'flex-end'}}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminProducts;
