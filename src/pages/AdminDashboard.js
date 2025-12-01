import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  // If not admin, redirect to home page
  React.useEffect(() => {
    if (!isAdmin()) {
      navigate('/login', { state: { from: { pathname: '/admin' } } });
    }
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAdmin()) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Made in Ghana Admin</h1>
        <div className="user-info">
          <span>Welcome, {currentUser.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>
      
      <div className="admin-content">
        <div className="admin-sidebar">
          <nav>
            <ul>
              <li><a href="#dashboard" className="active">Dashboard</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#orders">Orders</a></li>
              <li><a href="#customers">Customers</a></li>
              <li><a href="#settings">Settings</a></li>
            </ul>
          </nav>
        </div>
        
        <main className="admin-main">
          <div className="welcome-message">
            <h2>Welcome to your Admin Dashboard</h2>
            <p>This is where you can manage your Made in Ghana products, orders, and more.</p>
          </div>
          
          <div className="stats-cards">
            <div className="stat-card">
              <h3>Total Products</h3>
              <p className="stat-number">128</p>
            </div>
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p className="stat-number">56</p>
            </div>
            <div className="stat-card">
              <h3>Total Revenue</h3>
              <p className="stat-number">GH₵ 24,500</p>
            </div>
            <div className="stat-card">
              <h3>Total Customers</h3>
              <p className="stat-number">87</p>
            </div>
          </div>
          
          <div className="recent-section">
            <h3>Recent Orders</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#GH-1234</td>
                  <td>John Doe</td>
                  <td>May 20, 2025</td>
                  <td>GH₵ 350</td>
                  <td><span className="status processing">Processing</span></td>
                </tr>
                <tr>
                  <td>#GH-1233</td>
                  <td>Jane Smith</td>
                  <td>May 19, 2025</td>
                  <td>GH₵ 520</td>
                  <td><span className="status completed">Completed</span></td>
                </tr>
                <tr>
                  <td>#GH-1232</td>
                  <td>Kwame Nkrumah</td>
                  <td>May 19, 2025</td>
                  <td>GH₵ 785</td>
                  <td><span className="status shipped">Shipped</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;