const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  status: {
    type: String,
    enum: ['Attempted', 'Solved', 'Reviewed'],
    default: 'Attempted'
  },
  attempts: [{
    code: String,
    language: {
      type: String,
      enum: ['javascript', 'python', 'java', 'cpp'],
      default: 'javascript'
    },
    passed: Boolean,
    testCasesPassed: Number,
    testCasesTotal: Number,
    runtime: Number, // in milliseconds
    memory: Number, // in MB
    submittedAt: {
      type: Date,
      default: Date.now
    }
  }],
  firstSolvedAt: Date,
  lastAttemptAt: {
    type: Date,
    default: Date.now
  },
  timeSpent: {
    type: Number,
    default: 0 // in seconds
  },
  hintsUsed: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    default: ''
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard']
  },
  xpEarned: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Compound index for faster user-specific queries
userProgressSchema.index({ userId: 1, problemId: 1 }, { unique: true });
userProgressSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model('UserProgress', userProgressSchema);
