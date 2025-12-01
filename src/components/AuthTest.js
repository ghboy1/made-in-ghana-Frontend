import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './AuthTest.css';

const AuthTest = () => {
  const { login, register, logout, currentUser } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer'
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      if (isRegistering) {
        await register(formData);
        setMessage('Registration successful! You are now logged in.');
      } else {
        await login(formData.email, formData.password);
        setMessage('Login successful!');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setMessage('Logged out successfully!');
    setFormData({ name: '', email: '', password: '', role: 'buyer' });
  };
  const testApiCall = async () => {
    try {
      setMessage('Testing API call...');
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setMessage(`API Test: ${data.success ? 'Success' : 'Failed'} - ${data.products?.length || 0} products found`);
    } catch (error) {
      setMessage(`API Test Failed: ${error.message}`);
    }
  };

  const runAllConnectivityTests = async () => {
    setMessage('Running comprehensive connectivity tests...');
    const results = [];

    // Test 1: Backend Health Check
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (response.ok) {
        results.push('✅ Backend Server: Connected');
      } else {
        results.push('❌ Backend Server: Failed');
      }
    } catch (error) {
      results.push(`❌ Backend Server: ${error.message}`);
    }

    // Test 2: Authentication Endpoints
    try {
      const authResponse = await fetch('http://localhost:5000/api/auth/profile');
      if (authResponse.status === 401) {
        results.push('✅ Auth Protection: Working (401 as expected)');
      } else {
        results.push('❌ Auth Protection: Failed');
      }
    } catch (error) {
      results.push(`❌ Auth Protection: ${error.message}`);
    }

    // Test 3: CORS Configuration
    try {
      const corsResponse = await fetch('http://localhost:5000/api/products', {
        method: 'GET',
        headers: {
          'Origin': 'http://localhost:3000'
        }
      });
      const corsHeaders = corsResponse.headers.get('Access-Control-Allow-Origin');
      if (corsHeaders) {
        results.push('✅ CORS: Properly configured');
      } else {
        results.push('❌ CORS: Not configured');
      }
    } catch (error) {
      results.push(`❌ CORS: ${error.message}`);
    }

    // Test 4: Frontend-Backend Communication
    try {
      const startTime = Date.now();
      const response = await fetch('http://localhost:5000/api/products');
      const endTime = Date.now();
      const data = await response.json();
      results.push(`✅ API Response Time: ${endTime - startTime}ms`);
      results.push(`✅ API Data Structure: ${data.success ? 'Valid' : 'Invalid'}`);
    } catch (error) {
      results.push(`❌ API Communication: ${error.message}`);
    }

    setMessage(results.join('\n'));
  };

  return (
    <div className="auth-test-container">
      <div className="auth-test-card">
        <h2>Authentication & API Test</h2>
        
        {currentUser ? (
          <div className="user-info">
            <h3>Welcome, {currentUser.name}!</h3>
            <p>Email: {currentUser.email}</p>
            <p>Role: {currentUser.role}</p>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
            <button onClick={testApiCall} className="btn btn-info ml-2">
              Test API Call
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-tabs">
              <button
                type="button"
                className={`tab-btn ${!isRegistering ? 'active' : ''}`}
                onClick={() => setIsRegistering(false)}
              >
                Login
              </button>
              <button
                type="button"
                className={`tab-btn ${isRegistering ? 'active' : ''}`}
                onClick={() => setIsRegistering(true)}
              >
                Register
              </button>
            </div>

            {isRegistering && (
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
              </div>
            )}

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="form-control"
              />
            </div>

            {isRegistering && (
              <div className="form-group">
                <label>Role:</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="buyer">Buyer</option>
                  <option value="manufacturer">Manufacturer</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
            >
              {isLoading ? 'Processing...' : (isRegistering ? 'Register' : 'Login')}
            </button>
          </form>
        )}

        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}        <div className="api-test-section">
          <h4>Quick API Tests</h4>
          <button onClick={testApiCall} className="btn btn-outline-primary">
            Test Products API
          </button>
          <button onClick={runAllConnectivityTests} className="btn btn-outline-success ml-2">
            Run All Connectivity Tests
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthTest;
