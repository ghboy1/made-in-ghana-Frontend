import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Form, Button, Alert } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';
import { FaUser, FaShoppingBag, FaHeart, FaAddressCard, FaCreditCard, FaShieldAlt, FaBell } from 'react-icons/fa';
import './account.css';

const Account = () => {
  const { user, updateUserProfile } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'danger', text: 'Failed to update profile. Please try again.' });
    }
  };

  if (!user) {
    return (
      <Container className="my-5">
        <Alert variant="warning">
          Please log in to view your account information.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5 account-container">
      <h2 className="mb-4">My Account</h2>
      
      <Row>
        <Col lg={3} md={4}>
          <Card className="mb-4 account-sidebar">
            <Card.Body className="p-0">
              <div className="user-profile-summary p-3 border-bottom">
                <div className="avatar-container mb-3">
                  <img 
                    src={user.avatar || 'https://via.placeholder.com/80?text=User'} 
                    alt="User Avatar" 
                    className="rounded-circle" 
                  />
                </div>
                <h5>{user.firstName} {user.lastName}</h5>
                <p className="text-muted small">{user.email}</p>
              </div>
              
              <Nav className="flex-column account-nav">
                <Nav.Link 
                  className={`account-nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <FaUser className="me-2" /> Profile
                </Nav.Link>
                <Nav.Link 
                  className={`account-nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  <FaShoppingBag className="me-2" /> Orders
                </Nav.Link>
                <Nav.Link 
                  className={`account-nav-link ${activeTab === 'wishlist' ? 'active' : ''}`}
                  onClick={() => setActiveTab('wishlist')}
                >
                  <FaHeart className="me-2" /> Wishlist
                </Nav.Link>
                <Nav.Link 
                  className={`account-nav-link ${activeTab === 'addresses' ? 'active' : ''}`}
                  onClick={() => setActiveTab('addresses')}
                >
                  <FaAddressCard className="me-2" /> Addresses
                </Nav.Link>
                <Nav.Link 
                  className={`account-nav-link ${activeTab === 'payment' ? 'active' : ''}`}
                  onClick={() => setActiveTab('payment')}
                >
                  <FaCreditCard className="me-2" /> Payment Methods
                </Nav.Link>
                <Nav.Link 
                  className={`account-nav-link ${activeTab === 'security' ? 'active' : ''}`}
                  onClick={() => setActiveTab('security')}
                >
                  <FaShieldAlt className="me-2" /> Security
                </Nav.Link>
                <Nav.Link 
                  className={`account-nav-link ${activeTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <FaBell className="me-2" /> Notifications
                </Nav.Link>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={9} md={8}>
          {message.text && (
            <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
              {message.text}
            </Alert>
          )}
          
          {activeTab === 'profile' && (
            <Card className="account-content">
              <Card.Header>
                <h4 className="mb-0">Personal Information</h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="firstName" 
                          value={formData.firstName} 
                          onChange={handleInputChange} 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="lastName" 
                          value={formData.lastName} 
                          onChange={handleInputChange} 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="phone"
                      value={formData.phone} 
                      onChange={handleInputChange} 
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Profile Picture URL</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="avatar" 
                      value={formData.avatar} 
                      onChange={handleInputChange} 
                    />
                    <Form.Text className="text-muted">
                      Enter a URL for your profile picture.
                    </Form.Text>
                  </Form.Group>
                  
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Button variant="secondary" className="me-md-2">Cancel</Button>
                    <Button variant="primary" type="submit">Save Changes</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          )}
          
          {activeTab === 'orders' && (
            <Card className="account-content">
              <Card.Header>
                <h4 className="mb-0">Order History</h4>
              </Card.Header>
              <Card.Body>
                <p className="text-center text-muted py-5">
                  Your order history will appear here.
                </p>
              </Card.Body>
            </Card>
          )}
          
          {/* Add other tab content components here */}
        </Col>
      </Row>
    </Container>
  );
};

export default Account;