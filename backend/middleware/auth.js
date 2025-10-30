const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ 
        error: 'Not authorized to access this route',
        message: 'No token provided' 
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token (exclude password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ 
          error: 'User not found',
          message: 'Token is valid but user no longer exists' 
        });
      }

      // Update last active
      req.user.updateLastActive();

      next();
    } catch (error) {
      return res.status(401).json({ 
        error: 'Not authorized to access this route',
        message: 'Invalid token' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error in authentication',
      message: error.message 
    });
  }
};

module.exports = { protect };
