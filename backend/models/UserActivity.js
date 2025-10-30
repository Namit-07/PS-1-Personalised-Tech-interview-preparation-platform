const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
    index: true
  },
  count: {
    type: Number,
    default: 0
  },
  problemsSolved: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem'
  }]
}, {
  timestamps: true
});

// Compound index for user and date
userActivitySchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('UserActivity', userActivitySchema);
