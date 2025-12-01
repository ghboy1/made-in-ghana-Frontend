import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'buyer'
  });
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handlePhoneChange = (phone) => {
    setFormData({ ...formData, phoneNumber: phone });
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      setError('Please enter your first and last name');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Invalid email address');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Call the register function from AuthContext
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        role: formData.userType // 'buyer' or 'manufacturer' 
      };
      
      const result = await register(userData);
      
      if (result) {
        setRegistered(true);
        // Redirect after a brief delay to show success message
        setTimeout(() => {
          navigate('/login', { 
            state: { message: 'Registration successful! Please log in with your new account.' } 
          });
        }, 2000);
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register">
      <div className="register__container">
        <h2 className="register__title">Create Account</h2>
        
        {registered ? (
          <div className="register__success">
            <p className="register__success-text">
              Registration successful! Please check your email for verification.
            </p>
          </div>
        ) : (
          <form className="register__form" onSubmit={handleSubmit}>
            {error && <p className="register__error">{error}</p>}

            <div className="register__form-group">
              <label className="register__label">User Type</label>
              <select
                className="register__select"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="buyer">Buyer</option>
                <option value="employee">Employee</option>
                <option value="company">Company</option>
              </select>
            </div>

            <div className="register__form-group">
              <label className="register__label">Phone Number</label>
              <PhoneInput
                country={'gh'}
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                inputClass="register__phone-input"
                containerClass="register__phone-container"
                buttonClass="register__phone-button"
                dropdownClass="register__phone-dropdown"
                inputProps={{
                  name: 'phoneNumber',
                  required: true,
                }}
              />
            </div>

            <div className="register__form-group">
              <label className="register__label">Email</label>
              <input
                type="email"
                className="register__input"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register__form-group">
              <label className="register__label">Password</label>
              <input
                type="password"
                className="register__input"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="register__form-group">
              <label className="register__label">Confirm Password</label>
              <input
                type="password"
                className="register__input"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button 
              type="submit" 
              className="register__button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;