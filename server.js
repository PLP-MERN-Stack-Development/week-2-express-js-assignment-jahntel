// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const loggerMiddleware = require('./middleware/logger');
const authMiddleware = require('./middleware/auth');
const validateProduct = require('./middleware/validate');
const productRoutes = require('./routes/products');
const { NotFoundError } = require('./errors/customErrors');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory data store (replace with database in production)
let products = [];

// Middleware
app.use(bodyParser.json());
app.use(loggerMiddleware);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// API routes
app.use('/api/products', authMiddleware, productRoutes);

// Global error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});

// 404 handler
app.use((req, res, next) => {
  throw new NotFoundError('Route not found');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
