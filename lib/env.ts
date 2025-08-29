/**
 * Environment variables utility functions
 * Provides type-safe access to environment variables
 */

// Authentication related environment variables
export const getAuthConfig = () => ({
  authEnabled: process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true',
  signupEnabled: process.env.NEXT_PUBLIC_SIGNUP_ENABLED === 'true',
  enableSocialLogin: process.env.NEXT_PUBLIC_ENABLE_SOCIAL_LOGIN === 'true',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
});

// API related environment variables
export const getApiConfig = () => ({
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
});

// Application related environment variables
export const getAppConfig = () => ({
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'ALX Polly',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',
  enablePollAnalytics: process.env.NEXT_PUBLIC_ENABLE_POLL_ANALYTICS === 'true',
});

// Database related environment variables (server-side only)
export const getDatabaseConfig = () => ({
  databaseUrl: process.env.DATABASE_URL,
});

// JWT related environment variables (server-side only)
export const getJwtConfig = () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
});

// Helper to check if we're in a browser environment
export const isBrowser = typeof window !== 'undefined';

// Helper to safely access environment variables
export const getEnv = (key: string, defaultValue: string = ''): string => {
  // For client-side environment variables, they must be prefixed with NEXT_PUBLIC_
  const value = process.env[key];
  return value || defaultValue;
};