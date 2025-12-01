import React, { useState, useEffect, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import SalesAnalytics from '../components/analytics/SalesAnalytics';
import ProductPerformance from '../components/analytics/ProductPerformance';
import { UserContext } from '../contexts/UserContext';
import '../styles/ManufacturerDashboard.css';

const ManufacturerDashboard = () => {
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState({ name: '', description: '', price: '', category: '', images: [] });
  const [salesData, setSalesData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [regionData, setRegionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dashboard data
  useEffect(() => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Sample data - replace with actual API calls to your backend
      setSalesData({
        totalSales: 126200,
        totalOrders: 2355,
        avgOrderValue: 53.59,
        monthlySales: [5000, 7200, 8100, 6800, 9200, 11500, 10800, 12000, 11500, 13200, 14500, 16800],
        monthlyOrders: [120, 145, 160, 135, 180, 210, 195, 220, 215, 240, 255, 280]
      });
      
      setProductData({
        categories: [
          { name: 'Boys Traditional', sales: 35 },
          { name: 'Modern Prints', sales: 25 },
          { name: 'School Uniforms', sales: 20 },
          { name: 'Footwear', sales: 15 },
          { name: 'Accessories', sales: 5 }
        ]
      });
      
      setRegionData({
        regions: [
          { name: 'Ashanti', percentage: 32 },
          { name: 'Greater Accra', percentage: 28 },
          { name: 'Northern', percentage: 15 },
          { name: 'Eastern', percentage: 10 },
          { name: 'Western', percentage: 8 },
          { name: 'Volta', percentage: 5 },
          { name: 'Other Regions', percentage: 2 }
        ]
      });
      
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', product, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Product added!');
      setProduct({ name: '', description: '', price: '', category: '', images: [] }); // Reset form
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Check user role first
  if (!user || user.role !== 'manufacturer') return <Navigate to="/" />;

  // Then handle loading state
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="ghana-flag-spinner">
          <div className="spinner-stripe red"></div>
          <div className="spinner-stripe gold"></div>
          <div className="spinner-stripe green"></div>
        </div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  // Finally render dashboard when authorized and data is loaded
  return (
    <div className="manufacturer-dashboard">
      <div className="dashboard-header">
        <h1>Manufacturer Dashboard</h1>
        <div className="dashboard-actions">
          <Link to="/manufacturer-products" className="btn btn-primary">Manage Products</Link>
          <Link to="/manufacturer/orders" className="btn btn-secondary">View Orders</Link>
        </div>
      </div>
      
      <div className="dashboard-overview">
        <div className="overview-card sales">
          <h3>Total Sales</h3>
          <p className="amount">GH₵ {salesData.totalSales.toLocaleString()}</p>
        </div>
        <div className="overview-card orders">
          <h3>Total Orders</h3>
          <p className="amount">{salesData.totalOrders.toLocaleString()}</p>
        </div>
        <div className="overview-card avg-order">
          <h3>Avg. Order Value</h3>
          <p className="amount">GH₵ {salesData.avgOrderValue.toLocaleString()}</p>
        </div>
        <div className="overview-card products">
          <h3>Active Products</h3>
          <p className="amount">24</p>
        </div>
      </div>
      
      <section className="dashboard-analytics">
        <h2>Sales Analytics</h2>
        <SalesAnalytics 
          salesData={salesData} 
          productData={productData} 
          regionData={regionData} 
        />
      </section>
      
      <section className="dashboard-product-performance">
        <h2>Product Performance</h2>
        <ProductPerformance />
      </section>
      
      <div className="add-product-section">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="product-name">Product Name</label>
            <input
              id="product-name"
              type="text"
              placeholder="Product Name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="product-description">Description</label>
            <textarea
              id="product-description"
              placeholder="Description"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              rows="4"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="product-price">Price (GH₵)</label>
            <input
              id="product-price"
              type="number"
              placeholder="Price"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="product-category">Category</label>
            <select
              id="product-category"
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              required
            >
              <option value="">Select Category</option>
              <option value="traditional-wear">Traditional Wear</option>
              <option value="modern-prints">Modern African Prints</option>
              <option value="school-uniforms">School Uniforms</option>
              <option value="footwear">Footwear</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
          
          <button type="submit" className="btn-primary">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default ManufacturerDashboard;