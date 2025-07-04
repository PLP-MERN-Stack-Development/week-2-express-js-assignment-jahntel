const authMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY || 'your-api-key') {
    return res.status(401).json({ error: 'Invalid or missing API key' });
  }
  next();
};

module.exports = authMiddleware;
