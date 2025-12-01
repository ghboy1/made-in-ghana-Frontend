// Configuration file for the Made in Ghana Frontend
const config = {
  // API Configuration
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  
  // Upload URL
  UPLOAD_URL: process.env.REACT_APP_UPLOAD_URL || 'http://localhost:5000/api/uploads',
  
  // Authentication
  STORAGE_KEY_TOKEN: 'made_in_ghana_auth_token',
  STORAGE_KEY_USER: 'made_in_ghana_user',
  
  // Feature flags
  ENABLE_SOCIAL_LOGIN: process.env.REACT_APP_ENABLE_SOCIAL_LOGIN === 'true',
  
  // Environment detection
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
};

export default config;
