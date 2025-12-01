import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter } from 'react-icons/fa';
import './AdminPanel.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const response = await fetch('/api/admin/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    
    // Fetch categories
    const fetchCategories = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchProducts();
    fetchCategories();
  }, []);
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for products with query:', searchQuery);
  };
  
  const handleAddProduct = () => {
    console.log('Add new product');
    // Navigate to product creation form or open modal
  };
  
  const handleEditProduct = (productId) => {
    console.log('Edit product with ID:', productId);
    // Navigate to product edit form or open modal
  };
  
  const handleDeleteProduct = (productId) => {
    console.log('Delete product with ID:', productId);
    // Show confirmation dialog and delete if confirmed
  };
  
  return (
    <div className="admin-module product-management">
      <div className="module-header">
        <h2>Product Management</h2>
        <div className="header-actions">
          <button className="action-button primary" onClick={handleAddProduct}>
            <FaPlus /> Add Product
          </button>
        </div>
      </div>
      
      <div className="filters-bar">
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </div>
        </form>
        
        <div className="filter-controls">
          <div className="filter-group">
            <label><FaFilter /> Category:</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-indicator">Loading products...</div>
      ) : (
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <img 
                        src={product.image || '/placeholder-product.png'} 
                        alt={product.name}
                        className="product-thumbnail"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>₵{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span className={`status-badge ${product.status.toLowerCase()}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button 
                        className="icon-button edit"
                        onClick={() => handleEditProduct(product.id)}
                        title="Edit Product"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="icon-button delete"
                        onClick={() => handleDeleteProduct(product.id)}
                        title="Delete Product"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data-message">
                    No products found. Add your first product to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;