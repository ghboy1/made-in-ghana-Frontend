import React, { useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 'GH123456',
      date: '2024-03-15',
      status: 'Delivered',
      items: [
        { name: 'Kente Cloth', price: 'GH₵120', quantity: 1, image: '/images/kente.jpg' },
        { name: 'Shea Butter Pack', price: 'GH₵25', quantity: 2, image: '/images/shea-butter.jpg' }
      ],
      total: 'GH₵170',
      shipping: 'Accra, Ghana',
      paymentMethod: 'Mobile Money'
    },
    // Add more orders...
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.includes(searchTerm) || 
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="orders-container">
      <header className="orders-header">
        <h1>Order History</h1>
        <div className="orders-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-filter"
          >
            <option value="All">All Statuses</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </header>

      <div className="orders-list">
        {filteredOrders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-meta">
                <h3>Order #{order.id}</h3>
                <p className="order-date">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="order-status">
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
            </div>

            <div className="order-details">
              <div className="items-list">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>{item.quantity} x {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Total:</span>
                  <span>{order.total}</span>
                </div>
                <div className="summary-row">
                  <span>Payment Method:</span>
                  <span>{order.paymentMethod}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping Address:</span>
                  <span>{order.shipping}</span>
                </div>
              </div>
            </div>

            <div className="order-actions">
              <button className="action-btn track-order">
                <i className="fas fa-map-marker-alt"></i>
                Track Order
              </button>
              <button className="action-btn return-item">
                <i className="fas fa-undo"></i>
                Request Return
              </button>
              <button className="action-btn review">
                <i className="fas fa-star"></i>
                Leave Review
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="no-orders">
          <i className="fas fa-box-open"></i>
          <p>No orders found</p>
        </div>
      )}
    </div>
  );
};

export default Orders;