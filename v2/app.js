//the app
import express from 'express';
import Routes from './src/routes/routes.js';
import errorHandler from './src/middleware/Error/error.js';

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Permit
// src/middleware/cors.js - Simple version

/**
 * Simple CORS middleware
 */
 app.use(
(req, res, next) => {
  // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Allow specific methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
  // Allow specific headers
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  
  next();
};
)


// Routes
app.use(Routes)

// Error handling middleware
app.use(errorHandler.generalError);

// 404 handler
app.use(errorHandler.notfoundError);

// Export the app instance
export default app;