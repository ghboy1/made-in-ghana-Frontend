import axios from 'axios';
import config from '../config';

// Create axios instance with default config
const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (requestConfig) => {
    const token = localStorage.getItem(config.STORAGE_KEY_TOKEN);
    if (token) {
      requestConfig.headers.Authorization = `${token}`;
    }
    return requestConfig;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log errors in development
    if (!config.isProduction) {
      console.error('API Error:', error.response || error);
    }
    
    // Handle expired token
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem(config.STORAGE_KEY_TOKEN);
      localStorage.removeItem(config.STORAGE_KEY_USER);
      
      // Redirect to login only if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
