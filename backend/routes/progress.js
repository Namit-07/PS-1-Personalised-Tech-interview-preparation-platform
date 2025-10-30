const express = require('express');
const router = express.Router();
const UserProgress = require('../models/UserProgress');
const TopicProficiency = require('../models/TopicProficiency');
const Problem = require('../models/Problem');
const { protect } = require('../middleware/auth');

// @route   GET /api/progress
// @desc    Get user's overall progress
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const progress = await UserProgress.find({ userId: req.user._id })
      .populate('problemId', 'title difficulty topics')
      .sort({ lastAttemptAt: -1 });

    res.json({
      success: true,
      progress
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

// @route   GET /api/progress/stats
// @desc    Get user's statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const totalAttempted = await UserProgress.countDocuments({ userId: req.user._id });
    const totalSolved = await UserProgress.countDocuments({ 
      userId: req.user._id, 
      status: 'Solved' 
    });

    // Get difficulty breakdown
    const difficultyStats = await UserProgress.aggregate([
      { $match: { userId: req.user._id, status: 'Solved' } },
      { $group: { _id: '$difficulty', count: { $sum: 1 } } }
    ]);

    const breakdown = {
      Easy: 0,
      Medium: 0,
      Hard: 0
    };

    difficultyStats.forEach(stat => {
      breakdown[stat._id] = stat.count;
    });

    // Calculate success probability (simple version)
    const requiredProblems = 150; // Target for most companies
    const completionRate = Math.min((totalSolved / requiredProblems) * 100, 100);
    const successProbability = Math.round(completionRate * 0.7); // Simplified formula

    res.json({
      success: true,
      stats: {
        totalAttempted,
        totalSolved,
        breakdown,
        successProbability,
        currentStreak: req.user.stats.currentStreak,
        xp: req.user.stats.xp,
        level: req.user.stats.level
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

// @route   GET /api/progress/topics
// @desc    Get topic-wise proficiency
// @access  Private
router.get('/topics', protect, async (req, res) => {
  try {
    const proficiencies = await TopicProficiency.find({ userId: req.user._id })
      .sort({ proficiencyScore: -1 });

    res.json({
      success: true,
      proficiencies
    });
  } catch (error) {
    console.error('Get topic proficiency error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

module.exports = router;
