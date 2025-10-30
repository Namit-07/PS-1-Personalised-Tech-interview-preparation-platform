const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Note: AI integration will be added later
// For now, we'll create placeholder endpoints

// @route   POST /api/ai/chat
// @desc    Chat with AI assistant
// @access  Private
router.post('/chat', protect, async (req, res) => {
  try {
    const { message, problemId, context } = req.body;

    if (!message) {
      return res.status(400).json({ 
        error: 'Message is required',
        message: 'Please provide a message' 
      });
    }

    // Placeholder response - will integrate OpenAI later
    const response = {
      reply: "I'm your AI assistant! (Integration coming soon in Phase 2)",
      suggestions: [
        "Think about using a hash map",
        "Consider the time complexity",
        "Try breaking down the problem into smaller steps"
      ]
    };

    res.json({
      success: true,
      response
    });
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

// @route   POST /api/ai/hint
// @desc    Get hint for a problem
// @access  Private
router.post('/hint', protect, async (req, res) => {
  try {
    const { problemId, hintLevel } = req.body;

    if (!problemId) {
      return res.status(400).json({ 
        error: 'Problem ID is required',
        message: 'Please provide a problem ID' 
      });
    }

    // Placeholder - will integrate OpenAI later
    const hints = [
      "Think about the data structure that would help solve this efficiently",
      "Consider using a hash map to store values you've seen",
      "The optimal solution has O(n) time complexity"
    ];

    const level = Math.min(hintLevel || 0, hints.length - 1);

    res.json({
      success: true,
      hint: hints[level],
      hasMore: level < hints.length - 1
    });
  } catch (error) {
    console.error('Get hint error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

// @route   POST /api/ai/review
// @desc    Get code review
// @access  Private
router.post('/review', protect, async (req, res) => {
  try {
    const { code, language, problemId } = req.body;

    if (!code) {
      return res.status(400).json({ 
        error: 'Code is required',
        message: 'Please provide code to review' 
      });
    }

    // Placeholder - will integrate OpenAI later
    const review = {
      feedback: "Code review feature coming soon!",
      suggestions: [
        "Consider edge cases",
        "Add comments for clarity",
        "Think about optimizing the solution"
      ],
      rating: 7
    };

    res.json({
      success: true,
      review
    });
  } catch (error) {
    console.error('Code review error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

module.exports = router;
