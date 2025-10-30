const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Validation schemas
const signupSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    // Validate input
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        error: 'Validation error',
        message: error.details[0].message 
      });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        error: 'User already exists',
        message: 'An account with this email already exists' 
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password // Will be hashed by pre-save middleware
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        onboardingComplete: user.onboardingComplete
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    // Validate input
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        error: 'Validation error',
        message: error.details[0].message 
      });
    }

    const { email, password } = req.body;

    // Check if user exists (include password for comparison)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid credentials',
        message: 'Email or password is incorrect' 
      });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ 
        error: 'Invalid credentials',
        message: 'Email or password is incorrect' 
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        targetCompany: user.targetCompany,
        targetRole: user.targetRole,
        experienceLevel: user.experienceLevel,
        onboardingComplete: user.onboardingComplete,
        stats: user.stats
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        targetCompany: req.user.targetCompany,
        targetRole: req.user.targetRole,
        experienceLevel: req.user.experienceLevel,
        onboardingComplete: req.user.onboardingComplete,
        stats: req.user.stats,
        preferences: req.user.preferences,
        lastActive: req.user.lastActive
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, targetCompany, targetRole, experienceLevel, onboardingComplete } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (targetCompany) user.targetCompany = targetCompany;
    if (targetRole) user.targetRole = targetRole;
    if (experienceLevel) user.experienceLevel = experienceLevel;
    if (onboardingComplete !== undefined) user.onboardingComplete = onboardingComplete;

    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        targetCompany: user.targetCompany,
        targetRole: user.targetRole,
        experienceLevel: user.experienceLevel,
        onboardingComplete: user.onboardingComplete
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

module.exports = router;
