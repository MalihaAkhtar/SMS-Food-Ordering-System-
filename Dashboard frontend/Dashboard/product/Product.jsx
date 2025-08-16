import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css';
import ProductTable from './ProductTable';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [status, setStatus] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Main Course',
    price: '',
    status: 'Available',
    image: '',
    description: '',
    longDescription: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name.trim() || !newProduct.price.trim()) {
      alert('Name and price are required');
      return;
    }
    try {
      if (editingProduct) {
        await axios.put(`http://localhost:5001/api/products/${editingProduct.id}`, newProduct);
        alert('Product updated!');
      } else {
        await axios.post('http://localhost:5001/api/products', newProduct);
        alert('Product added!');
      }
      fetchProducts();
      resetForm();
    } catch (err) {
      console.error('Failed to save product:', err);
      alert('Error saving product');
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      category: 'Main Course',
      price: '',
      status: 'Available',
      image: '',
      description: '',
      longDescription: '',
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  // Filters and product list filtering same as before

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All Categories' || p.category === category;
    const matchesStatus = status === 'All' || p.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="product-page">
      <div className="product-header">
        <div className="product-title">
          <h2>Products</h2>
          <p>Manage your Food items and Menu</p>
        </div>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {showForm && (
        <form className="add-product-form" onSubmit={handleAddProduct}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <select
            value={newProduct.category}
            onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
          >
            <option>Main Course</option>
            <option>Appetizer</option>
            <option>Beverage</option>
            <option>Dessert</option>
          </select>
          <input
            type="text"
            placeholder="Price"
            value={newProduct.price}
            onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <select
            value={newProduct.status}
            onChange={e => setNewProduct({ ...newProduct, status: e.target.value })}
          >
            <option>Available</option>
            <option>Unavailable</option>
          </select>
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
            rows={3}
          />
          <textarea
            placeholder="Long Description"
            value={newProduct.longDescription}
            onChange={e => setNewProduct({ ...newProduct, longDescription: e.target.value })}
            rows={4}
          />
          <button type="submit" className="add-btn">
            {editingProduct ? 'Update Product' : 'Add'}
          </button>
        </form>
      )}

      {/* Filters */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search products..."
          className="filter-input"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option>All Categories</option>
          <option>Main Course</option>
          <option>Appetizer</option>
          <option>Beverage</option>
          <option>Dessert</option>
        </select>
        <select
          className="filter-select"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>Available</option>
          <option>Unavailable</option>
        </select>
      </div>

      <ProductTable
        products={filteredProducts}
        onDelete={(id) => {
          if (window.confirm('Are you sure you want to delete this product?')) {
            axios.delete(`http://localhost:5001/api/products/${id}`)
              .then(() => fetchProducts())
              .catch(console.error);
          }
        }}
        onRefresh={fetchProducts}
      />
    </div>
  );
};

export default Product;
