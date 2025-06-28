// Vite environment variables - use VITE_ prefix
// No need to install dotenv or import anything
const isDevelopment = import.meta.env.DEV
const isProduction = import.meta.env.PROD

// Environment-based URL configuration
export const BASE_URL = "http://localhost:3000"
export const BASE_URL_PRODUCTION = "https://hooman.onrender.com"

// Use environment variable if available, otherwise fall back to defaults
export const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (isProduction ? BASE_URL_PRODUCTION : BASE_URL)

// Log the current configuration for debugging
console.log('Environment:', isDevelopment ? 'Development' : 'Production')
console.log('API URL:', API_BASE_URL)
