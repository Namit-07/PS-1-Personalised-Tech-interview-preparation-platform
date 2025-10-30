const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  topics: [{
    type: String,
    required: true
  }],
  companies: [{
    type: String,
    trim: true
  }],
  constraints: [String],
  examples: [{
    input: String,
    output: String,
    explanation: String
  }],
  hints: [String],
  solution: {
    approach: String,
    code: String,
    timeComplexity: String,
    spaceComplexity: String
  },
  testCases: [{
    input: mongoose.Schema.Types.Mixed,
    output: mongoose.Schema.Types.Mixed,
    isHidden: { type: Boolean, default: false }
  }],
  metadata: {
    frequency: { type: Number, default: 0, min: 0, max: 10 },
    acceptanceRate: { type: Number, default: 0, min: 0, max: 100 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  relatedProblems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem'
  }]
}, {
  timestamps: true
});

// Index for faster queries
problemSchema.index({ difficulty: 1, topics: 1 });
problemSchema.index({ companies: 1 });
problemSchema.index({ slug: 1 });

module.exports = mongoose.model('Problem', problemSchema);
