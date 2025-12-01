import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaFileExport, FaEye, FaEdit, FaTrash, FaPrint, FaShippingFast } from 'react-icons/fa';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  useEffect(() => {
    // Simulated data loading
    setTimeout(() => {
      setOrders([
        { id: '10456', customer: 'Kofi Mensah', date: '2025-04-26', total: 350.75, status: 'pending', items: 5, region: 'Greater Accra' },
        { id: '10455', customer: 'Ama Owusu', date: '2025-04-25', total: 120.25, status: 'processing', items: 2, region: 'Ashanti' },
        { id: '10454', customer: 'John Addo', date: '2025-04-24', total: 580.00, status: 'shipped', items: 7, region: 'Central' },
        { id: '10453', customer: 'Grace Akoto', date: '2025-04-23', total: 95.50, status: 'delivered', items: 1, region: 'Western' },
        { id: '10452', customer: 'Daniel Kwame', date: '2025-04-22', total: 425.30, status: 'cancelled', items: 4, region: 'Eastern' },
        { id: '10451', customer: 'Sarah Boateng', date: '2025-04-21', total: 210.00, status: 'delivered', items: 3, region: 'Northern' },
        { id: '10450', customer: 'Ernest Opoku', date: '2025-04-20', total: 75.25, status: 'delivered', items: 2, region: 'Volta' },
        { id: '10449', customer: 'Priscilla Nyarko', date: '2025-04-19', total: 325.00, status: 'returned', items: 3, region: 'Ashanti' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  
  const filteredOrders = orders.filter(order => {
    // Apply status filter
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    
    // Apply search
    return (
      order.id.includes(searchTerm) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };
  
  const getStatusBadge = (status) => {
    let className = "order-status";
    switch (status) {
      case 'pending': className += " status-pending"; break;
      case 'processing': className += " status-processing"; break;
      case 'shipped': className += " status-shipped"; break;
      case 'delivered': className += " status-delivered"; break;
      case 'cancelled': className += " status-cancelled"; break;
      case 'returned': className += " status-returned"; break;
      default: className += " status-pending";
    }
    return <span className={className}>{status}</span>;
  };
  
  const formatCurrency = (amount) => {
    return `₵${amount.toFixed(2)}`;
  };
  
  return (
    <div className="admin-order-management">
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Order Management</h2>
          <div className="admin-header-actions">
            <button className="admin-button admin-button-secondary">
              <FaFileExport /> Export Orders
            </button>
          </div>
        </div>
        
        <div className="admin-filter-row">
          <div className="admin-search">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search order ID or customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="admin-filter">
            <FaFilter className="filter-icon" />
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="returned">Returned</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="admin-loading">
            <div className="spinner"></div>
            <p>Loading orders...</p>
          </div>
        ) : (
          <>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Items</th>
                    <th>Region</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.date}</td>
                      <td>{formatCurrency(order.total)}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>{order.items}</td>
                      <td>{order.region}</td>
                      <td>
                        <div className="table-actions">
                          <button 
                            className="action-button view-button" 
                            title="View Order"
                            onClick={() => handleViewOrder(order)}
                          >
                            <FaEye />
                          </button>
                          <button className="action-button edit-button" title="Edit Order">
                            <FaEdit />
                          </button>
                          <button className="action-button print-button" title="Print Invoice">
                            <FaPrint />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="admin-pagination">
              <div className="pagination-info">
                Showing 1-{filteredOrders.length} of {filteredOrders.length} orders
              </div>
              <div className="pagination-controls">
                <button className="pagination-button" disabled>&lt;</button>
                <button className="pagination-button active">1</button>
                <button className="pagination-button">&gt;</button>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="admin-modal order-details-modal">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h3>Order #{selectedOrder.id}</h3>
              <button className="modal-close" onClick={() => setShowOrderDetails(false)}>×</button>
            </div>
            
            <div className="admin-modal-body">
              <div className="order-info-grid">
                <div className="order-info-section">
                  <h4>Order Information</h4>
                  <div className="info-row">
                    <span className="info-label">Date:</span>
                    <span className="info-value">{selectedOrder.date}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Status:</span>
                    <span className="info-value">{getStatusBadge(selectedOrder.status)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Region:</span>
                    <span className="info-value">{selectedOrder.region}</span>
                  </div>
                </div>
                
                <div className="order-info-section">
                  <h4>Customer Information</h4>
                  <div className="info-row">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{selectedOrder.customer}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{`${selectedOrder.customer.toLowerCase().replace(' ', '.')}@example.com`}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone:</span>
                    <span className="info-value">+233 50 123 4567</span>
                  </div>
                </div>
              </div>
              
              <div className="order-items">
                <h4>Order Items</h4>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Unit Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Dummy order items */}
                    <tr>
                      <td>Handmade Kente Cloth</td>
                      <td>{formatCurrency(120.00)}</td>
                      <td>1</td>
                      <td>{formatCurrency(120.00)}</td>
                    </tr>
                    <tr>
                      <td>Shea Butter (250g)</td>
                      <td>{formatCurrency(25.00)}</td>
                      <td>2</td>
                      <td>{formatCurrency(50.00)}</td>
                    </tr>
                    <tr>
                      <td>Handwoven Basket</td>
                      <td>{formatCurrency(45.50)}</td>
                      <td>1</td>
                      <td>{formatCurrency(45.50)}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="text-right"><strong>Subtotal</strong></td>
                      <td>{formatCurrency(215.50)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-right"><strong>Shipping</strong></td>
                      <td>{formatCurrency(15.00)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-right"><strong>Total</strong></td>
                      <td className="order-total">{formatCurrency(selectedOrder.total)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div className="shipping-info">
                <h4>Shipping Information</h4>
                <div className="info-row">
                  <span className="info-label">Address:</span>
                  <span className="info-value">123 Independence Ave, Accra</span>
                </div>
                <div className="info-row">
                  <span className="info-label">City:</span>
                  <span className="info-value">Accra</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Region:</span>
                  <span className="info-value">{selectedOrder.region}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Delivery Method:</span>
                  <span className="info-value">Standard Delivery</span>
                </div>
              </div>
            </div>
            
            <div className="admin-modal-footer">
              <button 
                className="admin-button admin-button-secondary" 
                onClick={() => setShowOrderDetails(false)}
              >
                Close
              </button>
              
              {selectedOrder.status === 'pending' && (
                <button className="admin-button admin-button-primary">
                  <FaShippingFast /> Process Order
                </button>
              )}
              
              {(selectedOrder.status === 'processing' || selectedOrder.status === 'shipped') && (
                <button className="admin-button admin-button-primary">
                  <FaShippingFast /> Update Status
                </button>
              )}
              
              <button className="admin-button admin-button-secondary">
                <FaPrint /> Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;