import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Account.css';

const Account = () => {
  const [activeSection, setActiveSection] = useState('orders');
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Home Address',
      street: '123 Kente Street',
      city: 'Accra',
      region: 'Greater Accra',
      phone: '+233 55 123 4567',
      default: true
    }
  ]);
  
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'Mobile Money',
      number: '055 123 4567',
      default: true
    }
  ]);

  const accountSections = [
    { id: 'orders', title: 'Your Orders', icon: 'fas fa-box' },
    { id: 'login', title: 'Login & Security', icon: 'fas fa-lock' },
    { id: 'prime', title: 'Prime', icon: 'fas fa-crown' },
    { id: 'addresses', title: 'Your Addresses', icon: 'fas fa-map-marker-alt' },
    { id: 'business', title: 'Your Business Account', icon: 'fas fa-briefcase' },
    { id: 'giftcards', title: 'Gift Cards', icon: 'fas fa-gift' },
    { id: 'payments', title: 'Your Payments', icon: 'fas fa-credit-card' },
    { id: 'family', title: 'Your GH Family', icon: 'fas fa-users' },
    { id: 'devices', title: 'Digital Services & Device Support', icon: 'fas fa-tablet-alt' },
    { id: 'archived', title: 'Archived Orders', icon: 'fas fa-archive' },
    { id: 'lists', title: 'Your Lists', icon: 'fas fa-list' },
    { id: 'support', title: 'Customer Service', icon: 'fas fa-headset' },
    { id: 'messages', title: 'Your Messages', icon: 'fas fa-envelope' }
  ];

  const renderSection = () => {
    switch(activeSection) {
      case 'orders':
        return (
          <div className="section-content">
            <h2><i className="fas fa-box"></i> Your Orders</h2>
            <div className="card-grid">
              <div className="account-card">
                <h3>Track Packages</h3>
                <p>Track your recent orders</p>
                <button className="action-btn">Track Order</button>
              </div>
              <div className="account-card">
                <h3>Order History</h3>
                <p>View past purchases</p>
                <button className="action-btn">View History</button>
              </div>
            </div>
          </div>
        );
      
      case 'login':
        return (
          <div className="section-content">
            <h2><i className="fas fa-lock"></i> Login & Security</h2>
            <div className="security-card">
              <div className="security-item">
                <span>Email:</span>
                <span>user@ghanaweb.com</span>
                <button className="edit-btn">Edit</button>
              </div>
              <div className="security-item">
                <span>Password:</span>
                <span>••••••••</span>
                <button className="edit-btn">Edit</button>
              </div>
            </div>
          </div>
        );

      case 'addresses':
        return (
          <div className="section-content">
            <h2><i className="fas fa-map-marker-alt"></i> Your Addresses</h2>
            <div className="address-grid">
              {addresses.map(address => (
                <div key={address.id} className="address-card">
                  <h3>{address.name}</h3>
                  <p>{address.street}</p>
                  <p>{address.city}, {address.region}</p>
                  <p>{address.phone}</p>
                  <div className="address-actions">
                    {address.default && <span className="default-badge">Default</span>}
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Remove</button>
                  </div>
                </div>
              ))}
              <div className="add-address-card">
                <i className="fas fa-plus"></i>
                <h3>Add New Address</h3>
              </div>
            </div>
          </div>
        );

      // Add other sections similarly...

      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="account-container">
      <div className="account-sidebar">
        <h2>Account Settings</h2>
        <nav>
          {accountSections.map(section => (
            <button
              key={section.id}
              className={`sidebar-btn ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <i className={section.icon}></i>
              {section.title}
            </button>
          ))}
        </nav>
      </div>

      <div className="account-main">
        {renderSection()}
      </div>
    </div>
  );
};

export default Account;