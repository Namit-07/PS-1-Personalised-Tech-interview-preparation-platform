const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false // Don't return password by default
  },
  targetCompany: {
    type: [String],
    default: []
  },
  targetRole: {
    type: String,
    default: null,
    trim: true
  },
  practiceTopics: {
    type: [String],
    default: []
  },
  experienceLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: null
  },
  domain: {
    type: String,
    enum: ['Student', 'Working Professional', 'Career Switcher', 'Recent Graduate'],
    default: null
  },
  onboardingComplete: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['student', 'recruiter'],
    default: null
  },
  roleSelected: {
    type: Boolean,
    default: false
  },
  // Profile Information
  headline: {
    type: String,
    trim: true
  },
  summary: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  position: {
    type: String,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  skills: {
    type: [String],
    default: []
  },
  linkedin: {
    type: String,
    trim: true
  },
  github: {
    type: String,
    trim: true
  },
  portfolio: {
    type: String,
    trim: true
  },
  linkedinId: {
    type: String,
    unique: true,
    sparse: true
  },
  stats: {
    totalProblemsSolved: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    successProbability: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 }
  },
  preferences: {
    dailyGoal: { type: Number, default: 3 },
    reminderTime: { type: String, default: '09:00' },
    difficulty: [{ type: String, enum: ['Easy', 'Medium', 'Hard'] }]
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to update last active
userSchema.methods.updateLastActive = function() {
  this.lastActive = Date.now();
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
