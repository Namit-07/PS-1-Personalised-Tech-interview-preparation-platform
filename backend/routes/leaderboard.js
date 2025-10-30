const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserActivity = require('../models/UserActivity');

// @route   GET /api/leaderboard
// @desc    Get leaderboard rankings
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { period = 'all', category = 'overall' } = req.query;

    // Calculate date range based on period
    let dateFilter = {};
    const now = new Date();
    
    if (period === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      dateFilter = { createdAt: { $gte: weekAgo } };
    } else if (period === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      dateFilter = { createdAt: { $gte: monthAgo } };
    }

    // Get all users with their activity data
    const users = await User.find({})
      .select('name email headline summary location company position experience skills linkedin github portfolio stats')
      .lean();

    // Calculate scores for each user
    const leaderboardData = await Promise.all(
      users.map(async (user) => {
        // Get user's activity
        const activities = await UserActivity.find({
          userId: user._id,
          ...dateFilter
        });

        // Calculate total problems solved
        const totalProblems = activities.reduce((sum, activity) => sum + activity.count, 0);

        // Calculate current streak
        const sortedActivities = activities.sort((a, b) => new Date(b.date) - new Date(a.date));
        let currentStreak = 0;
        let lastDate = new Date();
        
        for (const activity of sortedActivities) {
          const activityDate = new Date(activity.date);
          const diffDays = Math.floor((lastDate - activityDate) / (1000 * 60 * 60 * 24));
          
          if (diffDays <= 1) {
            currentStreak++;
            lastDate = activityDate;
          } else {
            break;
          }
        }

        // Calculate score (you can adjust the formula)
        const score = totalProblems + (currentStreak * 5); // Bonus for streak

        return {
          userId: user._id.toString(),
          name: user.name,
          email: user.email,
          headline: user.headline,
          summary: user.summary,
          location: user.location,
          company: user.company,
          position: user.position,
          skills: user.skills,
          linkedin: user.linkedin,
          github: user.github,
          portfolio: user.portfolio,
          score,
          totalProblems,
          currentStreak,
          stats: user.stats
        };
      })
    );

    // Sort by score and filter out users with 0 score
    const sortedLeaderboard = leaderboardData
      .filter(user => user.score > 0)
      .sort((a, b) => b.score - a.score);

    res.json({
      success: true,
      leaderboard: sortedLeaderboard,
      period,
      category
    });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

// @route   GET /api/leaderboard/user/:userId
// @desc    Get specific user's rank
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Get full leaderboard
    const response = await router.get('/', req, res);
    const leaderboard = response.leaderboard;

    // Find user's rank
    const userRank = leaderboard.findIndex(entry => entry.userId === userId) + 1;
    const userEntry = leaderboard.find(entry => entry.userId === userId);

    if (!userEntry) {
      return res.status(404).json({
        error: 'User not found in leaderboard'
      });
    }

    const percentile = ((leaderboard.length - userRank + 1) / leaderboard.length) * 100;

    res.json({
      success: true,
      rank: userRank,
      percentile: percentile.toFixed(1),
      totalUsers: leaderboard.length,
      user: userEntry
    });
  } catch (error) {
    console.error('User rank error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

module.exports = router;
