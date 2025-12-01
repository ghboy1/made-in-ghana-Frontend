import api from './api';
import config from '../config';

const AuthService = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem(config.STORAGE_KEY_TOKEN, response.data.token);
        
        if (response.data.user) {
          localStorage.setItem(config.STORAGE_KEY_USER, JSON.stringify(response.data.user));
          return response.data.user;
        }
      }
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.token) {
        localStorage.setItem(config.STORAGE_KEY_TOKEN, response.data.token);
        
        if (response.data.user) {
          localStorage.setItem(config.STORAGE_KEY_USER, JSON.stringify(response.data.user));
          return response.data.user;
        } else {
          // If user data not provided with token, fetch it
          const userResponse = await api.get('/auth/profile');
          localStorage.setItem(config.STORAGE_KEY_USER, JSON.stringify(userResponse.data));
          return userResponse.data;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem(config.STORAGE_KEY_TOKEN);
    localStorage.removeItem(config.STORAGE_KEY_USER);
    // Clear any other user-specific data from localStorage
    // For example, saved cart if you want to clear on logout
  },

  getCurrentUser: () => {
    try {
      const userString = localStorage.getItem(config.STORAGE_KEY_USER);
      if (userString) {
        return JSON.parse(userString);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      // Clear corrupt data
      localStorage.removeItem(config.STORAGE_KEY_USER);
    }
    return null;
  },

  refreshUserData: async () => {
    try {
      if (AuthService.isLoggedIn()) {
        const response = await api.get('/auth/profile');
        localStorage.setItem(config.STORAGE_KEY_USER, JSON.stringify(response.data));
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Error refreshing user data:', error);
      return null;
    }
  },

  isLoggedIn: () => {
    return !!localStorage.getItem(config.STORAGE_KEY_TOKEN);
  },

  isAdmin: () => {
    const user = AuthService.getCurrentUser();
    return user?.role === 'admin';
  },
  
  isManufacturer: () => {
    const user = AuthService.getCurrentUser();
    return user?.role === 'manufacturer';
  },
  
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },
  
  resetPassword: async (token, password) => {
    try {
      const response = await api.post('/auth/reset-password', { token, password });
      return response.data;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },
  
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      
      if (response.data) {
        // Update stored user data
        localStorage.setItem(config.STORAGE_KEY_USER, JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
};

export default AuthService;
