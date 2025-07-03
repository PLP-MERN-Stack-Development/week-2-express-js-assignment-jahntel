const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || !price || !category || inStock === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: 'Invalid price' });
  }
  if (typeof inStock !== 'boolean') {
    return res.status(400).json({ error: 'inStock must be boolean' });
  }
  next();
};

module.exports = validateProduct;
