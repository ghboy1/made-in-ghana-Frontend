import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import OrderService from '../services/orderService';
import './OrderTracking.css';

const OrderTracking = () => {
  const { currentUser } = useAuth();
  
  // Tab state: "track" or "return" or "orders"
  const [activeTab, setActiveTab] = useState(currentUser ? 'orders' : 'track');

  // Tracking state
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [trackingError, setTrackingError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Order return state
  const [returnOrderNumber, setReturnOrderNumber] = useState('');
  const [returnInfo, setReturnInfo] = useState(null);
  const [returnError, setReturnError] = useState('');
  
  // User orders state
  const [userOrders, setUserOrders] = useState([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);

  // Load user's orders if logged in
  React.useEffect(() => {
    if (currentUser && activeTab === 'orders' && !ordersLoaded) {
      fetchUserOrders();
    }
  }, [currentUser, activeTab, ordersLoaded]);
  
  const fetchUserOrders = async () => {
    try {
      setIsLoading(true);
      const orders = await OrderService.getBuyerOrders();
      setUserOrders(orders);
      setOrdersLoaded(true);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle order tracking submission
  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setTrackingError('Please enter a tracking number');
      return;
    }
    
    setIsLoading(true);
    try {
      const orderInfo = await OrderService.trackOrder(trackingNumber);
      setTrackingInfo(orderInfo);
      setTrackingError('');
    } catch (err) {
      setTrackingError(err.response?.data?.message || 'Tracking information not found');
      setTrackingInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle order return submission
  const handleReturnSubmit = async (e) => {
    e.preventDefault();
    if (!returnOrderNumber.trim()) {
      setReturnError('Please enter an order number');
      return;
    }
    
    setIsLoading(true);
    try {
      // For now, we'll just get the order details
      // In the future, this would initiate a return process
      const orderInfo = await OrderService.getOrderById(returnOrderNumber);
      setReturnInfo(orderInfo);
      setReturnError('');
    } catch (err) {
      setReturnError(err.response?.data?.message || 'Order information not found');
      setReturnInfo(null);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="order-tracking">
      <h2>Order Management</h2>
      <div className="tabs">
        <button
          className={activeTab === 'track' ? 'active' : ''}
          onClick={() => setActiveTab('track')}
        >
          Track Order
        </button>
        {currentUser && (
          <button
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            My Orders
          </button>
        )}
        <button
          className={activeTab === 'return' ? 'active' : ''}
          onClick={() => setActiveTab('return')}
        >
          Request Return
        </button>
      </div>

      {activeTab === 'track' && (
        <div className="tab-content">
          <h3>Track Your Order</h3>
          <form onSubmit={handleTrackSubmit}>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number"
            />
            <button type="submit">Track</button>
          </form>
          {trackingError && <p className="error">{trackingError}</p>}
          {trackingInfo && (
            <div className="tracking-info">
              <p>
                <strong>Tracking Number:</strong> {trackingInfo.trackingNumber}
              </p>
              <p>
                <strong>Status:</strong> {trackingInfo.status}
              </p>
              <p>
                <strong>Carrier:</strong> {trackingInfo.carrier}
              </p>
            </div>
          )}
        </div>      )}

      {activeTab === 'orders' && (
        <div className="tab-content">
          <h3>My Orders</h3>
          {isLoading ? (
            <div className="loading">Loading your orders...</div>
          ) : userOrders.length > 0 ? (
            <div className="order-list">
              {userOrders.map(order => (
                <div className="order-card" key={order._id}>
                  <div className="order-header">
                    <h4>Order #{order.orderNumber}</h4>
                    <span className={`order-status status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="order-date">
                    <strong>Ordered on:</strong> {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  
                  <div className="order-items">
                    <strong>Items:</strong> {order.items.length}
                  </div>
                  
                  <div className="order-total">
                    <strong>Total:</strong> GHS {order.totalAmount.toFixed(2)}
                  </div>
                  
                  <div className="order-actions">
                    <button onClick={() => window.location.href = `/order/${order._id}`}>
                      View Details
                    </button>
                    {order.status === 'Delivered' && (
                      <button onClick={() => setActiveTab('return')}>
                        Request Return
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-orders">
              <p>You have no orders yet.</p>
              <button onClick={() => window.location.href = '/'}>
                Start Shopping
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'return' && (
        <div className="tab-content">
          <h3>Request Order Return</h3>
          <form onSubmit={handleReturnSubmit}>
            <input
              type="text"
              value={returnOrderNumber}
              onChange={(e) => setReturnOrderNumber(e.target.value)}
              placeholder="Enter order number"
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Submit Return Request'}
            </button>
          </form>
          {returnError && <p className="error">{returnError}</p>}
          {returnInfo && (
            <div className="tracking-info">
              <p>
                <strong>Order Number:</strong> {returnInfo.orderNumber}
              </p>
              <p>
                <strong>Return Status:</strong> {returnInfo.returnStatus || 'Not yet processed'}
              </p>
              <p>
                <strong>Instructions:</strong> {returnInfo.returnInstructions || 'Please package your items securely and include your order number. Return shipping labels will be emailed to you within 24 hours.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
