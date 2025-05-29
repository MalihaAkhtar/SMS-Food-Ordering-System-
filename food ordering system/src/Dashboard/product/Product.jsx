import React, { useState } from 'react';
import './Product.css';
import ProductTable from './ProductTable';

// ——————————————
// Image imports
import biryaniImg from '../../assets/biryani.jpg';
import nihariImg from '../../assets/Nihari.jpg';
import seekhImg from '../../assets/seekh kabab.jpg';
import butterImg from '../../assets/butter chicken.jpg';
import masalaImg from '../../assets/masla dosa.jpg';
import paneerImg from '../../assets/paneer tikka.jpg';
import margheritaImg from '../../assets/Margherita Pizza.jpg';
import pastaImg from '../../assets/Pasta Carbonara.jpg';
// ——————————————

const initialProducts = [
  { id: 1, name: "Biryani", category: "Main Course", price: "$12.99", status: "Available", image: biryaniImg },
  { id: 2, name: "Nihari", category: "Main Course", price: "$14.99", status: "Available", image: nihariImg },
  { id: 3, name: "Seekh Kabab", category: "Appetizer", price: "$4.99", status: "Available", image: seekhImg },
  { id: 4, name: "Butter Chicken", category: "Main Course", price: "$6.99", status: "Unavailable", image: butterImg },
  { id: 5, name: "Masala Dosa", category: "Appetizer", price: "$3.99", status: "Available", image: masalaImg },
  { id: 6, name: "Paneer Tikka", category: "Appetizer", price: "$8.99", status: "Available", image: paneerImg },
  { id: 7, name: "Margherita Pizza", category: "Main Course", price: "$24.99", status: "Available", image: margheritaImg },
  { id: 8, name: "Pasta Carbonara", category: "Main Course", price: "$5.99", status: "Unavailable", image: pastaImg },
];

const Product = () => {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [status, setStatus] = useState('All');
  const [showForm, setShowForm] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Main Course',
    price: '',
    status: 'Available',
    image: '',
  });

  // Filter logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All Categories' || p.category === category;
    const matchesStatus = status === 'All' || p.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Add product handler
  const handleAddProduct = e => {
    e.preventDefault();
    if (!newProduct.name.trim() || !newProduct.price.trim()) {
      alert('Name and price are required');
      return;
    }
    const nextId = products.length + 1;
    const productToAdd = {
      id: nextId,
      ...newProduct,
      image: newProduct.image || 'default.jpg',
    };
    setProducts([...products, productToAdd]);
    setNewProduct({ name: '', category: 'Main Course', price: '', status: 'Available', image: '' });
    setShowForm(false);
  };

  return (
    <div className="product-page">
      <div className="product-header">
  <div className="product-title">
    <h2>Products</h2>
    <p>Manage your Food items and Menu</p>
  </div>
  <button className="add-btn" onClick={() => setShowForm(!showForm)}>
    + Add Product
  </button>
</div>


      {showForm && (
  <form className="add-product-form" onSubmit={handleAddProduct}>
    <input
      type="text"
      placeholder="Product Name"
      value={newProduct.name}
      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      required
    />
    <select
      value={newProduct.category}
      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
    >
      <option>Main Course</option>
      <option>Appetizer</option>
      <option>Beverage</option>
      <option>Dessert</option>
    </select>
    <input
      type="text"
      placeholder="Price (e.g. $12.99)"
      value={newProduct.price}
      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      required
    />
    <select
      value={newProduct.status}
      onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
    >
      <option>Available</option>
      <option>Unavailable</option>
    </select>
    <input
      type="text"
      placeholder="Image URL"
      value={newProduct.image}
      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
    />
    <button type="submit" className="add-btn">
      Add
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

      <ProductTable products={filteredProducts} />
    </div>
  );
};

export default Product;
