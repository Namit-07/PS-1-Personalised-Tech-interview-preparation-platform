const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const UserProgress = require('../models/UserProgress');
const { protect } = require('../middleware/auth');

// @route   GET /api/problems
// @desc    Get all problems with filters
// @access  Public (but better experience when authenticated)
router.get('/', async (req, res) => {
  try {
    const { difficulty, topic, company, search } = req.query;

    // Build query
    let query = {};

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (topic) {
      query.topics = { $in: [topic] };
    }

    if (company) {
      query.companies = { $in: [company] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const problems = await Problem.find(query)
      .select('-testCases -solution.code') // Don't send test cases and solution code
      .sort({ 'metadata.frequency': -1 }); // Sort by frequency

    res.json({
      success: true,
      count: problems.length,
      problems
    });
  } catch (error) {
    console.error('Get problems error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

// @route   GET /api/problems/:id
// @desc    Get single problem by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id)
      .select('-testCases -solution.code'); // Don't send test cases and full solution

    if (!problem) {
      return res.status(404).json({ 
        error: 'Problem not found',
        message: 'No problem found with this ID' 
      });
    }

    res.json({
      success: true,
      problem
    });
  } catch (error) {
    console.error('Get problem error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

// @route   POST /api/problems/submit
// @desc    Submit solution for a problem
// @access  Private
router.post('/submit', protect, async (req, res) => {
  try {
    const { problemId, code, language } = req.body;

    // Validate input
    if (!problemId || !code || !language) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'problemId, code, and language are required' 
      });
    }

    // Get problem
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ 
        error: 'Problem not found',
        message: 'No problem found with this ID' 
      });
    }

    // For hackathon: Simulate test case execution
    // In production, you'd use a code execution API
    const totalTests = problem.testCases?.length || 5;
    const passed = Math.random() > 0.3; // 70% pass rate for demo
    const testsPassed = passed ? totalTests : Math.floor(Math.random() * totalTests);

    // Find or create user progress
    let progress = await UserProgress.findOne({
      userId: req.user._id,
      problemId
    });

    if (!progress) {
      progress = new UserProgress({
        userId: req.user._id,
        problemId,
        difficulty: problem.difficulty
      });
    }

    // Add attempt
    const attempt = {
      code,
      language,
      passed,
      testCasesPassed: testsPassed,
      testCasesTotal: totalTests,
      runtime: Math.floor(Math.random() * 200) + 50, // Random runtime
      memory: Math.floor(Math.random() * 50) + 30 // Random memory
    };

    progress.attempts.push(attempt);
    progress.lastAttemptAt = Date.now();

    // Update status
    if (passed) {
      progress.status = 'Solved';
      if (!progress.firstSolvedAt) {
        progress.firstSolvedAt = Date.now();
        
        // Award XP
        const xpMap = { Easy: 10, Medium: 25, Hard: 50 };
        progress.xpEarned = xpMap[problem.difficulty];
        
        // Update user stats
        req.user.stats.totalProblemsSolved += 1;
        req.user.stats.xp += progress.xpEarned;
        await req.user.save();
      }
    }

    await progress.save();

    res.json({
      success: true,
      result: {
        passed,
        testsPassed: testsPassed,
        testsTotal: totalTests,
        runtime: attempt.runtime,
        memory: attempt.memory,
        xpEarned: progress.xpEarned,
        status: progress.status
      }
    });
  } catch (error) {
    console.error('Submit solution error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

// @route   GET /api/problems/recommended
// @desc    Get recommended problems for user based on onboarding preferences
// @access  Private
router.get('/user/recommended', protect, async (req, res) => {
  try {
    console.log('Getting recommendations for user:', req.user.email);
    console.log('User preferences:', {
      targetCompany: req.user.targetCompany,
      practiceTopics: req.user.practiceTopics,
      experienceLevel: req.user.experienceLevel,
      domain: req.user.domain
    });

    // Get user's solved problems
    const solvedProblems = await UserProgress.find({
      userId: req.user._id,
      status: 'Solved'
    }).select('problemId');

    const solvedIds = solvedProblems.map(p => p.problemId);

    // Build smart query based on onboarding data
    let query = {
      _id: { $nin: solvedIds }
    };

    // Priority 1: Match target companies (if user selected any)
    if (req.user.targetCompany && req.user.targetCompany.length > 0) {
      query.companies = { $in: req.user.targetCompany };
    }

    // Priority 2: Match practice topics (if user selected any)
    if (req.user.practiceTopics && req.user.practiceTopics.length > 0) {
      query.topics = { $in: req.user.practiceTopics };
    }

    // Priority 3: Adjust difficulty based on experience level
    if (req.user.experienceLevel) {
      if (req.user.experienceLevel === 'Beginner') {
        query.difficulty = { $in: ['Easy', 'Medium'] };
      } else if (req.user.experienceLevel === 'Intermediate') {
        query.difficulty = { $in: ['Medium', 'Hard'] };
      } else if (req.user.experienceLevel === 'Advanced') {
        query.difficulty = { $in: ['Medium', 'Hard'] };
      }
    }

    console.log('Recommendation query:', JSON.stringify(query, null, 2));

    // Get recommendations with the built query
    let recommendations = await Problem.find(query)
      .select('-testCases -solution.code')
      .limit(15)
      .sort({ 'metadata.frequency': -1 });

    // If no recommendations found with strict filters, relax them
    if (recommendations.length < 5) {
      console.log('Not enough recommendations, relaxing filters...');
      
      // Try with just topics and difficulty
      const relaxedQuery = {
        _id: { $nin: solvedIds }
      };

      if (req.user.practiceTopics && req.user.practiceTopics.length > 0) {
        relaxedQuery.topics = { $in: req.user.practiceTopics };
      }

      if (req.user.experienceLevel) {
        if (req.user.experienceLevel === 'Beginner') {
          relaxedQuery.difficulty = { $in: ['Easy', 'Medium'] };
        } else if (req.user.experienceLevel === 'Intermediate') {
          relaxedQuery.difficulty = { $in: ['Medium', 'Hard'] };
        } else if (req.user.experienceLevel === 'Advanced') {
          relaxedQuery.difficulty = { $in: ['Medium', 'Hard'] };
        }
      }

      recommendations = await Problem.find(relaxedQuery)
        .select('-testCases -solution.code')
        .limit(15)
        .sort({ 'metadata.frequency': -1 });
    }

    // If still not enough, just get popular unsolved problems
    if (recommendations.length < 5) {
      console.log('Still not enough, getting popular problems...');
      recommendations = await Problem.find({ _id: { $nin: solvedIds } })
        .select('-testCases -solution.code')
        .limit(15)
        .sort({ 'metadata.frequency': -1 });
    }

    console.log(`Found ${recommendations.length} recommendations`);

    res.json({
      success: true,
      count: recommendations.length,
      problems: recommendations,
      basedOn: {
        targetCompanies: req.user.targetCompany || [],
        practiceTopics: req.user.practiceTopics || [],
        experienceLevel: req.user.experienceLevel || 'Not set',
        domain: req.user.domain || 'Not set'
      }
    });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

module.exports = router;
