const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const UserProgress = require('../models/UserProgress');
const TopicProficiency = require('../models/TopicProficiency');
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
// @desc    Get SMART recommendations based on user performance, weak areas, and spaced repetition
// @access  Private
router.get('/user/recommended', protect, async (req, res) => {
  try {
    console.log('🧠 Smart Recommendations for:', req.user.email);

    // ============================================
    // STEP 1: Gather User Performance Data
    // ============================================
    
    // Get ALL user progress (solved, attempted, failed)
    const allProgress = await UserProgress.find({ userId: req.user._id });
    
    const solvedProblems = allProgress.filter(p => p.status === 'Solved');
    const attemptedProblems = allProgress.filter(p => p.status === 'Attempted');
    const solvedIds = solvedProblems.map(p => p.problemId.toString());
    const attemptedIds = attemptedProblems.map(p => p.problemId.toString());

    // Get topic proficiency data
    const topicProficiency = await TopicProficiency.find({ userId: req.user._id });
    
    // ============================================
    // STEP 2: Analyze Weak Areas
    // ============================================
    
    // Find weak topics (proficiency < 60%)
    const weakTopics = topicProficiency
      .filter(t => t.proficiencyScore < 60)
      .sort((a, b) => a.proficiencyScore - b.proficiencyScore)
      .map(t => t.topic);

    // Find topics with low solve rate from progress
    const topicStats = {};
    for (const progress of allProgress) {
      const problem = await Problem.findById(progress.problemId).select('topics');
      if (problem && problem.topics) {
        for (const topic of problem.topics) {
          if (!topicStats[topic]) {
            topicStats[topic] = { solved: 0, attempted: 0, total: 0 };
          }
          topicStats[topic].total++;
          if (progress.status === 'Solved') topicStats[topic].solved++;
          else topicStats[topic].attempted++;
        }
      }
    }

    // Calculate solve rates per topic
    const topicSolveRates = Object.entries(topicStats)
      .map(([topic, stats]) => ({
        topic,
        solveRate: stats.total > 0 ? (stats.solved / stats.total) * 100 : 0,
        total: stats.total
      }))
      .filter(t => t.total >= 2) // Only topics with enough data
      .sort((a, b) => a.solveRate - b.solveRate);

    const strugglingTopics = topicSolveRates
      .filter(t => t.solveRate < 50)
      .map(t => t.topic);

    // Combine weak topics from both sources
    const allWeakTopics = [...new Set([...weakTopics, ...strugglingTopics])];

    console.log('📊 Weak topics identified:', allWeakTopics);

    // ============================================
    // STEP 3: Determine Optimal Difficulty
    // ============================================
    
    // Analyze recent performance to adjust difficulty
    const recentSolved = solvedProblems
      .sort((a, b) => new Date(b.solvedAt || b.updatedAt) - new Date(a.solvedAt || a.updatedAt))
      .slice(0, 10);

    let difficultyDistribution = { Easy: 0, Medium: 0, Hard: 0 };
    for (const progress of recentSolved) {
      const problem = await Problem.findById(progress.problemId).select('difficulty');
      if (problem) {
        difficultyDistribution[problem.difficulty]++;
      }
    }

    // Smart difficulty selection based on performance
    let targetDifficulties = ['Easy', 'Medium', 'Hard'];
    const totalRecent = recentSolved.length;

    if (totalRecent >= 5) {
      const easyRate = difficultyDistribution.Easy / totalRecent;
      const mediumRate = difficultyDistribution.Medium / totalRecent;
      const hardRate = difficultyDistribution.Hard / totalRecent;

      // If solving mostly easy → push to medium
      if (easyRate > 0.6) {
        targetDifficulties = ['Medium', 'Easy'];
      }
      // If solving mostly medium → mix medium and hard
      else if (mediumRate > 0.5) {
        targetDifficulties = ['Medium', 'Hard'];
      }
      // If solving hard problems → keep pushing
      else if (hardRate > 0.3) {
        targetDifficulties = ['Hard', 'Medium'];
      }
    } else {
      // Not enough data, use experience level
      if (req.user.experienceLevel === 'Beginner') {
        targetDifficulties = ['Easy', 'Medium'];
      } else if (req.user.experienceLevel === 'Intermediate') {
        targetDifficulties = ['Medium', 'Hard'];
      } else if (req.user.experienceLevel === 'Advanced') {
        targetDifficulties = ['Hard', 'Medium'];
      }
    }

    console.log('🎯 Target difficulties:', targetDifficulties);

    // ============================================
    // STEP 4: Build Recommendation Categories
    // ============================================
    
    const recommendations = [];
    const addedIds = new Set(solvedIds);

    // Helper to add problems without duplicates
    const addProblems = (problems, reason) => {
      for (const p of problems) {
        if (!addedIds.has(p._id.toString())) {
          addedIds.add(p._id.toString());
          recommendations.push({
            ...p.toObject(),
            recommendReason: reason
          });
        }
      }
    };

    // CATEGORY 1: Problems to RETRY (attempted but not solved) - Spaced Repetition
    const retryProblems = await Problem.find({
      _id: { $in: attemptedIds }
    })
      .select('-testCases -solution.code')
      .limit(3);
    
    addProblems(retryProblems, '🔄 Retry - You attempted this before');
    console.log(`Added ${retryProblems.length} retry problems`);

    // CATEGORY 2: Weak Topic Problems (highest priority for improvement)
    if (allWeakTopics.length > 0) {
      const weakTopicProblems = await Problem.find({
        _id: { $nin: [...solvedIds, ...attemptedIds] },
        topics: { $in: allWeakTopics },
        difficulty: { $in: targetDifficulties }
      })
        .select('-testCases -solution.code')
        .limit(5)
        .sort({ 'metadata.frequency': -1 });
      
      addProblems(weakTopicProblems, `💪 Strengthen weak area: ${allWeakTopics.slice(0, 2).join(', ')}`);
      console.log(`Added ${weakTopicProblems.length} weak topic problems`);
    }

    // CATEGORY 3: Target Company Problems
    if (req.user.targetCompany && req.user.targetCompany.length > 0) {
      const companyProblems = await Problem.find({
        _id: { $nin: Array.from(addedIds) },
        companies: { $in: req.user.targetCompany },
        difficulty: { $in: targetDifficulties }
      })
        .select('-testCases -solution.code')
        .limit(4)
        .sort({ 'metadata.frequency': -1 });
      
      addProblems(companyProblems, `🏢 Asked at ${req.user.targetCompany.slice(0, 2).join(', ')}`);
      console.log(`Added ${companyProblems.length} company problems`);
    }

    // CATEGORY 4: Practice Topic Problems (user's selected interests)
    if (req.user.practiceTopics && req.user.practiceTopics.length > 0) {
      const topicProblems = await Problem.find({
        _id: { $nin: Array.from(addedIds) },
        topics: { $in: req.user.practiceTopics },
        difficulty: { $in: targetDifficulties }
      })
        .select('-testCases -solution.code')
        .limit(4)
        .sort({ 'metadata.frequency': -1 });
      
      addProblems(topicProblems, `📚 Your focus: ${req.user.practiceTopics.slice(0, 2).join(', ')}`);
      console.log(`Added ${topicProblems.length} topic problems`);
    }

    // CATEGORY 5: Progressive Challenge (slightly harder than current level)
    const challengeProblems = await Problem.find({
      _id: { $nin: Array.from(addedIds) },
      difficulty: targetDifficulties[0] === 'Easy' ? 'Medium' : 'Hard'
    })
      .select('-testCases -solution.code')
      .limit(2)
      .sort({ 'metadata.frequency': -1 });
    
    addProblems(challengeProblems, '🚀 Challenge yourself!');
    console.log(`Added ${challengeProblems.length} challenge problems`);

    // CATEGORY 6: Popular/Trending (fill remaining slots)
    if (recommendations.length < 15) {
      const popularProblems = await Problem.find({
        _id: { $nin: Array.from(addedIds) }
      })
        .select('-testCases -solution.code')
        .limit(15 - recommendations.length)
        .sort({ 'metadata.frequency': -1 });
      
      addProblems(popularProblems, '⭐ Popular problem');
      console.log(`Added ${popularProblems.length} popular problems`);
    }

    // ============================================
    // STEP 5: Calculate Insights
    // ============================================
    
    const insights = {
      weakTopics: allWeakTopics.slice(0, 3),
      strongTopics: topicSolveRates.filter(t => t.solveRate >= 80).map(t => t.topic).slice(0, 3),
      currentLevel: targetDifficulties[0],
      totalSolved: solvedProblems.length,
      totalAttempted: attemptedProblems.length,
      improvementAreas: allWeakTopics.length > 0 
        ? `Focus on ${allWeakTopics[0]} to improve your overall performance`
        : 'Great job! Keep practicing across all topics',
      nextMilestone: solvedProblems.length < 50 
        ? `${50 - solvedProblems.length} more to reach 50 problems!`
        : solvedProblems.length < 100
        ? `${100 - solvedProblems.length} more to reach 100 problems!`
        : `You're a pro! ${solvedProblems.length} problems solved 🎉`
    };

    console.log(`✅ Total recommendations: ${recommendations.length}`);

    res.json({
      success: true,
      count: recommendations.length,
      problems: recommendations,
      insights,
      basedOn: {
        targetCompanies: req.user.targetCompany || [],
        practiceTopics: req.user.practiceTopics || [],
        experienceLevel: req.user.experienceLevel || 'Not set',
        domain: req.user.domain || null,
        weakTopics: allWeakTopics,
        recommendedDifficulty: targetDifficulties[0]
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
