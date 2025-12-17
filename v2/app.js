//the app
import express from 'express';
import Routes from './src/routes/routes.js';
import errorHandler from './src/middleware/Error/error.js';

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(Routes)

// Error handling middleware
app.use(errorHandler.generalError);

// 404 handler
app.use(errorHandler.notfoundError);

// Export the app instance
export default app;