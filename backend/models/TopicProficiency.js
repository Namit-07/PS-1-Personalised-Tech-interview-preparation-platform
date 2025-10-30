const mongoose = require('mongoose');

const topicProficiencySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: String,
    required: true,
    trim: true
  },
  proficiencyScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  problemsSolved: {
    type: Number,
    default: 0
  },
  problemsTotal: {
    type: Number,
    default: 0
  },
  breakdown: {
    easy: {
      solved: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    },
    medium: {
      solved: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    },
    hard: {
      solved: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    }
  },
  averageTimePerProblem: {
    type: Number,
    default: 0 // in seconds
  },
  successRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  lastPracticedAt: Date,
  needsReview: {
    type: Boolean,
    default: false
  },
  nextReviewDate: Date
}, {
  timestamps: true
});

// Compound index for user-topic queries
topicProficiencySchema.index({ userId: 1, topic: 1 }, { unique: true });

module.exports = mongoose.model('TopicProficiency', topicProficiencySchema);
