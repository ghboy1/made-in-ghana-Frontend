/**
 * Environment configuration for the Made in Ghana Frontend
 * These settings can be overridden with environment variables
 */

const config = {
  // API base URL
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  
  // Storage keys
  STORAGE_KEY_TOKEN: 'madeInGhanaToken',
  STORAGE_KEY_USER: 'madeInGhanaUser',
  STORAGE_KEY_CART: 'cart',
  
  // Feature flags
  ENABLE_SOCIAL_LOGIN: process.env.REACT_APP_ENABLE_SOCIAL_LOGIN === 'true' || false,
  
  // App settings
  APP_NAME: 'Made in Ghana',
  DEFAULT_REGION: 'Greater Accra',
  
  // Payment providers
  PAYMENT_PROVIDERS: {
    MOMO: ['MTN Mobile Money', 'Vodafone Cash', 'AirtelTigo Money'],
    CARDS: ['Visa', 'Mastercard']
  },
  
  // Allowed file types for uploads
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  
  // Upload URLs
  UPLOAD_URL: process.env.REACT_APP_UPLOAD_URL || 'http://localhost:5000/api/uploads',
  
  // Production check
  isProduction: process.env.NODE_ENV === 'production'
};

export default config;
