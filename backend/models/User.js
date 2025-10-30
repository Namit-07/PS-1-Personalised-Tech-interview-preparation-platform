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
    type: String,
    default: null,
    trim: true
  },
  targetRole: {
    type: String,
    default: null,
    trim: true
  },
  experienceLevel: {
    type: String,
    enum: ['Fresher', '0-1 years', '1-2 years', '2-3 years', '3-5 years', '5+ years'],
    default: null
  },
  onboardingComplete: {
    type: Boolean,
    default: false
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
