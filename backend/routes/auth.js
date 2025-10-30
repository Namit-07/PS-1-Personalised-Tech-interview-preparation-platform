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
        onboardingComplete: user.onboardingComplete,
        role: user.role,
        roleSelected: user.roleSelected
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
        role: user.role,
        roleSelected: user.roleSelected,
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
        lastActive: req.user.lastActive,
        // Role fields
        role: req.user.role,
        roleSelected: req.user.roleSelected,
        // Profile fields
        headline: req.user.headline,
        summary: req.user.summary,
        location: req.user.location,
        company: req.user.company,
        position: req.user.position,
        experience: req.user.experience,
        skills: req.user.skills,
        linkedin: req.user.linkedin,
        github: req.user.github,
        portfolio: req.user.portfolio
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

// Removed duplicate route - see full profile update below

// @route   POST /api/auth/onboarding
// @desc    Complete user onboarding
// @access  Private
router.post('/onboarding', protect, async (req, res) => {
  try {
    console.log('Onboarding request received');
    console.log('Request body:', req.body);
    console.log('User ID:', req.user._id);
    
    const { targetCompanies, practiceTopics, experienceLevel, domain } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: 'User not found',
        message: 'User not found' 
      });
    }

    user.targetCompany = targetCompanies || [];
    user.practiceTopics = practiceTopics || [];
    user.experienceLevel = experienceLevel;
    user.domain = domain;
    user.onboardingComplete = true;

    console.log('Saving user with data:', {
      targetCompany: user.targetCompany,
      practiceTopics: user.practiceTopics,
      experienceLevel: user.experienceLevel,
      domain: user.domain
    });

    await user.save();

    console.log('Onboarding completed successfully');

    res.json({
      success: true,
      message: 'Onboarding completed successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        targetCompany: user.targetCompany,
        practiceTopics: user.practiceTopics,
        experienceLevel: user.experienceLevel,
        domain: user.domain,
        onboardingComplete: user.onboardingComplete
      }
    });
  } catch (error) {
    console.error('Onboarding error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      success: false,
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
    const {
      name,
      headline,
      summary,
      location,
      company,
      position,
      experience,
      skills,
      linkedin,
      github,
      portfolio
    } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update fields
    if (name) user.name = name;
    if (headline !== undefined) user.headline = headline;
    if (summary !== undefined) user.summary = summary;
    if (location !== undefined) user.location = location;
    if (company !== undefined) user.company = company;
    if (position !== undefined) user.position = position;
    if (experience !== undefined) user.experience = experience;
    if (skills !== undefined) user.skills = skills;
    if (linkedin !== undefined) user.linkedin = linkedin;
    if (github !== undefined) user.github = github;
    if (portfolio !== undefined) user.portfolio = portfolio;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        headline: user.headline,
        summary: user.summary,
        location: user.location,
        company: user.company,
        position: user.position,
        experience: user.experience,
        skills: user.skills,
        linkedin: user.linkedin,
        github: user.github,
        portfolio: user.portfolio
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

// @route   POST /api/auth/linkedin
// @desc    Import profile from LinkedIn
// @access  Private
router.post('/linkedin', protect, async (req, res) => {
  try {
    const { linkedinData } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user with LinkedIn data
    if (linkedinData.firstName && linkedinData.lastName) {
      user.name = `${linkedinData.firstName} ${linkedinData.lastName}`;
    }
    if (linkedinData.headline) user.headline = linkedinData.headline;
    if (linkedinData.summary) user.summary = linkedinData.summary;
    if (linkedinData.location) user.location = linkedinData.location.name;
    if (linkedinData.positions) {
      const currentPosition = linkedinData.positions[0];
      if (currentPosition) {
        user.company = currentPosition.company;
        user.position = currentPosition.title;
      }
    }
    if (linkedinData.skills) {
      user.skills = linkedinData.skills.map(s => s.name);
    }
    if (linkedinData.publicProfileUrl) {
      user.linkedin = linkedinData.publicProfileUrl;
    }
    if (linkedinData.id) {
      user.linkedinId = linkedinData.id;
    }

    await user.save();

    res.json({
      success: true,
      message: 'LinkedIn profile imported successfully',
      user: {
        id: user._id,
        name: user.name,
        headline: user.headline,
        summary: user.summary,
        location: user.location,
        company: user.company,
        position: user.position,
        skills: user.skills,
        linkedin: user.linkedin
      }
    });
  } catch (error) {
    console.error('LinkedIn import error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

// @route   POST /api/auth/linkedin/scrape
// @desc    Extract profile data from LinkedIn URL (simplified version)
// @access  Private
router.post('/linkedin/scrape', protect, async (req, res) => {
  try {
    const { linkedInUrl } = req.body;

    if (!linkedInUrl || !linkedInUrl.includes('linkedin.com')) {
      return res.status(400).json({ 
        error: 'Invalid LinkedIn URL' 
      });
    }

    // Extract username from URL
    const username = linkedInUrl.split('/in/')[1]?.split('/')[0] || linkedInUrl.split('/in/')[1];

    if (!username) {
      return res.status(400).json({ 
        error: 'Could not extract profile from URL' 
      });
    }

    // For demo purposes, return a template that users can fill
    // In production, you'd use LinkedIn API or web scraping with proper auth
    const profile = {
      name: '', // User will fill this
      headline: 'Extracted from LinkedIn', // Placeholder
      summary: `Import initiated from LinkedIn profile: ${username}`,
      location: '',
      company: '',
      position: '',
      experience: '',
      skills: [],
      linkedin: linkedInUrl
    };

    res.json({
      success: true,
      message: 'Profile template created. Please fill in the details manually.',
      profile
    });

  } catch (error) {
    console.error('LinkedIn scrape error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: 'Unable to import LinkedIn profile. Please try manual entry.' 
    });
  }
});

// @route   PUT /api/auth/role
// @desc    Set user role (student/recruiter)
// @access  Private
router.put('/role', protect, async (req, res) => {
  try {
    const { role } = req.body;

    if (!role || !['student', 'recruiter'].includes(role)) {
      return res.status(400).json({
        error: 'Invalid role',
        message: 'Role must be either "student" or "recruiter"'
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.role = role;
    user.roleSelected = true;

    await user.save();

    res.json({
      success: true,
      message: 'Role set successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        roleSelected: user.roleSelected
      }
    });
  } catch (error) {
    console.error('Set role error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

module.exports = router;
