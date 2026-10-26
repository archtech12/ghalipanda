const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect middleware
const protect = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Extract token
    const token = authHeader.replace('Bearer ', '');
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user to request object
    req.user = await User.findById(decoded.userId).select('-password');
    
    if (!req.user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

module.exports = { protect, admin };