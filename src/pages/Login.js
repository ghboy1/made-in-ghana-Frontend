import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaLock, FaEnvelope, FaEye, FaEyeSlash, FaStar } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { login } = useAuth();
  const { state } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we have a redirect path from the location state
  const redirectPath = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      const user = await login(email, password);
      
      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        // If there's a redirect path in the location state, use it
        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="login-container">
      {!isExpanded ? (
        // Collapsed login button
        <div 
          className="login-collapsed"
          onClick={toggleExpanded}
          onMouseEnter={() => setIsExpanded(true)}
        >
          <FaStar className="black-star left" />
          <span>LOGIN</span>
          <FaStar className="black-star right" />
        </div>
      ) : (
        // Expanded login form
        <div 
          className="login-box"
          onMouseLeave={() => setIsExpanded(false)}
        >
          <div className="login-header">
            <h1>
              <FaStar className="black-star left" />
              LOGIN
              <FaStar className="black-star right" />
            </h1>
          </div>

          {error && <div className="login-error">{error}</div>}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username"
                required
              />
            </div>

            <div className="form-group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button type="submit" className="sign-in-button" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            
            <div className="login-links">
              <Link to="/forgot-password" className="forgot-link">Forgot Password</Link>
              <Link to="/register" className="signup-link">Sign Up</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
