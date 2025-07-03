const express = require('express');
const { v4: uuidv4 } = require('uuid');
const validateProduct = require('../middleware/validate');
const { NotFoundError, ValidationError } = require('../errors/customErrors');

const router = express.Router();
let products = [];

// GET /api/products - List all products with filtering and pagination
router.get('/', (req, res) => {
  const { category, page = 1, limit = 10, search } = req.query;
  let filteredProducts = [...products];

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Search by name
  if (search) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.json({
    products: paginatedProducts,
    total: filteredProducts.length,
    page: parseInt(page),
    limit: parseInt(limit)
  });
});

// GET /api/products/:id - Get specific product
router.get('/:id', (req, res, next) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products - Create new product
router.post('/', validateProduct, (req, res, next) => {
  try {
    const product = {
      id: uuidv4(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    products.push(product);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id - Update product
router.put('/:id', validateProduct, (req, res, next) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      throw new NotFoundError('Product not found');
    }
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', (req, res, next) => {
  try {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    throw new NotFoundError('Product not found');
  }
  const deletedProduct = products.splice(index, 1)[0];
  res.json(deletedProduct);
} catch (err) {
  next(err);
}
});

// GET /api/products/stats - Get product statistics
router.get('/stats', (req, res) => {
  const stats = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});
  
  res.json({
    totalProducts: products.length,
    categories: stats
  });
});

module.exports = router;
