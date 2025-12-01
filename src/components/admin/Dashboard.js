import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaUsers, FaBox, FaMoneyBill, FaChartLine, FaChartPie, FaEye } from 'react-icons/fa';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';

// Replace the imported formatCurrency with a local implementation
const formatCurrency = (amount) => {
  return `₵${amount.toFixed(2)}`;
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 25000,
    totalOrders: 150,
    totalProducts: 320,
    totalCustomers: 210,
    recentOrders: [
      {
        id: '1001',
        customer: 'John Doe',
        date: '2025-04-25',
        amount: 350.20,
        status: 'Delivered'
      },
      {
        id: '1002',
        customer: 'Jane Smith',
        date: '2025-04-24',
        amount: 125.75,
        status: 'Processing'
      },
      {
        id: '1003',
        customer: 'Kwame Nkrumah',
        date: '2025-04-23',
        amount: 580.00,
        status: 'Shipped'
      },
      {
        id: '1004',
        customer: 'Ama Atta',
        date: '2025-04-22',
        amount: 210.50,
        status: 'Pending'
      },
      {
        id: '1005',
        customer: 'Kofi Mensah',
        date: '2025-04-21',
        amount: 95.30,
        status: 'Delivered'
      }
    ],
    salesData: [
      { date: 'Jan', amount: 4200 },
      { date: 'Feb', amount: 5100 },
      { date: 'Mar', amount: 3800 },
      { date: 'Apr', amount: 5600 },
      { date: 'May', amount: 6200 },
      { date: 'Jun', amount: 4900 },
      { date: 'Jul', amount: 5400 }
    ],
    topProducts: [
      { name: 'Kente Cloth', sales: 125 },
      { name: 'Shea Butter', sales: 85 },
      { name: 'African Print Dress', sales: 70 },
      { name: 'Handmade Basket', sales: 55 },
      { name: 'Ghana Chocolate', sales: 40 }
    ]
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Simulate API call with dummy data already in state
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // In a real implementation, you would fetch data from your API:
    // const fetchDashboardData = async () => {
    //   try {
    //     setIsLoading(true);
    //     const response = await fetch('/api/admin/dashboard');
    //     const data = await response.json();
    //     setStats(data);
    //   } catch (error) {
    //     console.error('Error fetching dashboard data:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // 
    // fetchDashboardData();
  }, []);
  
  const salesChartData = {
    labels: stats.salesData.map(item => item.date),
    datasets: [
      {
        label: 'Sales',
        data: stats.salesData.map(item => item.amount),
        borderColor: '#006B3F',
        backgroundColor: 'rgba(0, 107, 63, 0.2)',
        tension: 0.4,
        fill: true
      }
    ]
  };
  
  const productChartData = {
    labels: stats.topProducts.map(product => product.name),
    datasets: [
      {
        data: stats.topProducts.map(product => product.sales),
        backgroundColor: [
          '#006B3F',
          '#FCD116',
          '#CE1126',
          '#4CAF50',
          '#FFEB3B'
        ],
        borderWidth: 1
      }
    ]
  };
  
  const productChartOptions = {
    plugins: {
      legend: {
        position: 'right'
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }
  
  return (
    <div className="admin-dashboard">
      <div className="dashboard-stats">
        <div className="admin-card stats-card">
          <div className="stats-icon revenue-icon">
            <FaMoneyBill />
          </div>
          <div className="stats-content">
            <h3>Total Revenue</h3>
            <p className="stats-value">{formatCurrency(stats.totalRevenue)}</p>
            <p className="stats-compare">
              <span className="stats-up">+12.5%</span> from last month
            </p>
          </div>
        </div>
        
        <div className="admin-card stats-card">
          <div className="stats-icon orders-icon">
            <FaShoppingCart />
          </div>
          <div className="stats-content">
            <h3>Total Orders</h3>
            <p className="stats-value">{stats.totalOrders}</p>
            <p className="stats-compare">
              <span className="stats-up">+8.3%</span> from last month
            </p>
          </div>
        </div>
        
        <div className="admin-card stats-card">
          <div className="stats-icon products-icon">
            <FaBox />
          </div>
          <div className="stats-content">
            <h3>Total Products</h3>
            <p className="stats-value">{stats.totalProducts}</p>
            <p className="stats-compare">
              <span className="stats-up">+5.2%</span> from last month
            </p>
          </div>
        </div>
        
        <div className="admin-card stats-card">
          <div className="stats-icon customers-icon">
            <FaUsers />
          </div>
          <div className="stats-content">
            <h3>Total Customers</h3>
            <p className="stats-value">{stats.totalCustomers}</p>
            <p className="stats-compare">
              <span className="stats-up">+15.7%</span> from last month
            </p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-charts">
        <div className="admin-card chart-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              <FaChartLine /> Sales Overview
            </h3>
            <select className="chart-period-select">
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div className="chart-container">
            <Chart type="line" data={salesChartData} />
          </div>
        </div>
        
        <div className="admin-card chart-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              <FaChartPie /> Top Products
            </h3>
          </div>
          <div className="chart-container pie-chart-container">
            <Chart 
              type="pie" 
              data={productChartData} 
              options={productChartOptions}
            />
          </div>
        </div>
      </div>
      
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Recent Orders</h3>
          <button className="admin-button admin-button-secondary">
            View All Orders
          </button>
        </div>
        
        <div className="recent-orders-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>{formatCurrency(order.amount)}</td>
                  <td>
                    <span className={`order-status status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="action-button view-button">
                        <FaEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;