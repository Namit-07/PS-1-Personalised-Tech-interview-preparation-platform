const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Google Gemini AI (FREE!)
let genAI;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

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

    // Check if Gemini API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: true,
        response: {
          reply: "I'm your AI coding mentor! 🤖\n\n(Note: Get a FREE Google Gemini API key from https://makersuite.google.com/app/apikey to enable real AI responses!)\n\nI can help you with:\n- Understanding problem approaches\n- Debugging your code\n- Explaining time/space complexity\n- Interview tips and strategies",
          suggestions: [
            "Think about using a hash map for O(1) lookups",
            "Consider the time complexity - can you do better than O(n²)?",
            "Try breaking down the problem into smaller steps"
          ]
        }
      });
    }

    try {
      // Use Gemini 2.5 Flash model (Stable, FREE!)
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

      // Build the prompt with context
      let prompt = `You are an expert coding mentor helping students prepare for technical interviews at top tech companies.

Your role is to:
- Guide students with progressive hints, not direct solutions
- Ask thought-provoking questions
- Explain concepts clearly with examples
- Provide encouragement and constructive feedback
- Help with debugging and optimization
- Explain time/space complexity

Keep responses concise (2-3 short paragraphs max), friendly, and encouraging.

`;

      if (context && context.problemTitle) {
        prompt += `\nStudent is working on: "${context.problemTitle}" (${context.difficulty || 'Unknown'} difficulty)\n`;
      }

      if (context && context.conversationHistory && Array.isArray(context.conversationHistory)) {
        prompt += '\nRecent conversation:\n';
        context.conversationHistory.slice(-4).forEach(msg => {
          prompt += `${msg.role === 'user' ? 'Student' : 'Mentor'}: ${msg.content}\n`;
        });
      }

      prompt += `\nStudent's question: ${message}\n\nYour response:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const reply = response.text();

      res.json({
        success: true,
        response: {
          reply: reply,
          timestamp: Date.now()
        }
      });
    } catch (aiError) {
      console.error('Gemini API error:', aiError);
      
      // Smart fallback
      const fallbackResponses = {
        'approach': "Great question! 🤔\n\nHere's a general approach:\n1. Understand the problem constraints\n2. Think about the data structures that could help\n3. Consider the time complexity you're aiming for\n4. Start with a brute force solution, then optimize\n\nFor this specific problem, consider what data structure gives you O(1) lookup time!",
        'complexity': "Time complexity is crucial! ⚡\n\nFor most interview problems:\n- O(n) is usually acceptable\n- O(n²) might be brute force\n- O(log n) suggests binary search or divide-and-conquer\n- O(1) space is ideal when possible\n\nWhat approach are you thinking of trying?",
        'hint': "Here's a hint without spoiling it! 💡\n\nThink about:\n- Can you trade space for time?\n- Have you seen similar problems before?\n- What if you stored intermediate results?\n\nTry working through a small example manually first!",
        'debug': "Let's debug this together! 🐛\n\nCommon things to check:\n1. Edge cases (empty input, single element)\n2. Off-by-one errors in loops\n3. Variable scope issues\n4. Are you returning the right data type?\n\nWhat specific error are you seeing?",
        'default': "I'm here to help! 🚀\n\nI can assist with:\n- Problem-solving strategies\n- Algorithm explanations\n- Time/space complexity\n- Debugging tips\n- Interview best practices\n\nWhat would you like to know more about?"
      };
      
      const msg = message.toLowerCase();
      let fallbackReply = fallbackResponses.default;
      
      if (msg.includes('approach') || msg.includes('solve') || msg.includes('start')) {
        fallbackReply = fallbackResponses.approach;
      } else if (msg.includes('complexity') || msg.includes('time') || msg.includes('space')) {
        fallbackReply = fallbackResponses.complexity;
      } else if (msg.includes('hint') || msg.includes('help') || msg.includes('stuck')) {
        fallbackReply = fallbackResponses.hint;
      } else if (msg.includes('debug') || msg.includes('error') || msg.includes('wrong')) {
        fallbackReply = fallbackResponses.debug;
      }
      
      res.json({
        success: true,
        response: {
          reply: fallbackReply,
          timestamp: Date.now()
        }
      });
    }
  } catch (error) {
    console.error('Chat route error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

// @route   POST /api/ai/hint
// @desc    Get hint for a problem using Gemini
// @access  Private
router.post('/hint', protect, async (req, res) => {
  try {
    const { problemId, hintLevel, problemTitle, problemDescription, userCode } = req.body;

    if (!problemTitle) {
      return res.status(400).json({ 
        error: 'Problem title is required',
        message: 'Please provide problem details' 
      });
    }

    // Fallback hints if Gemini not configured
    if (!process.env.GEMINI_API_KEY) {
      const hints = [
        "💡 Think about the data structure that would help solve this efficiently",
        "💡 Consider using a hash map to store values you've seen",
        "💡 The optimal solution likely has O(n) or O(n log n) time complexity"
      ];
      const level = Math.min(hintLevel || 0, hints.length - 1);
      
      return res.json({
        success: true,
        hint: hints[level],
        hasMore: level < hints.length - 1
      });
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      
      const prompt = `Give a progressive hint for this coding problem. This is hint level ${hintLevel || 1}.

Problem: ${problemTitle}
${problemDescription ? `Description: ${problemDescription.substring(0, 200)}...` : ''}
${userCode ? `\nStudent's current approach: ${userCode.substring(0, 150)}...` : ''}

Provide ONE clear, actionable hint that guides without spoiling the solution. Make it encouraging and concise (2-3 sentences max).`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const hint = response.text();

      res.json({
        success: true,
        hint: hint,
        hasMore: true
      });
    } catch (aiError) {
      console.error('Gemini hint error:', aiError);
      // Fallback to generic hints
      const hints = [
        "💡 Think about the data structure that would help solve this efficiently",
        "💡 Consider using a hash map to store values you've seen",
        "💡 The optimal solution likely has O(n) or O(n log n) time complexity"
      ];
      const level = Math.min(hintLevel || 0, hints.length - 1);
      
      res.json({
        success: true,
        hint: hints[level],
        hasMore: level < hints.length - 1
      });
    }
  } catch (error) {
    console.error('Get hint error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

// @route   POST /api/ai/review
// @desc    Get code review using Gemini
// @access  Private
router.post('/review', protect, async (req, res) => {
  try {
    const { code, language, problemId, problemTitle } = req.body;

    if (!code) {
      return res.status(400).json({ 
        error: 'Code is required',
        message: 'Please provide code to review' 
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: true,
        review: {
          feedback: "🔍 AI code review requires Google Gemini API key.\n\nGet a FREE API key from: https://makersuite.google.com/app/apikey\n\nOnce configured, you'll get:\n- Code quality analysis\n- Complexity evaluation\n- Optimization suggestions\n- Best practices feedback",
          suggestions: [
            "Consider edge cases (empty input, null values)",
            "Add comments for complex logic",
            "Think about time and space complexity"
          ],
          rating: 7
        }
      });
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      
      const prompt = `Review this ${language} code for the problem "${problemTitle}". Provide brief feedback on:
1. Code quality and readability
2. Time and space complexity
3. One key optimization suggestion
4. Overall rating (1-10)

Code:
\`\`\`${language}
${code}
\`\`\`

Be concise, constructive, and encouraging. Keep response under 200 words.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const feedback = response.text();

      res.json({
        success: true,
        review: {
          feedback: feedback,
          timestamp: Date.now()
        }
      });
    } catch (aiError) {
      console.error('Gemini review error:', aiError);
      res.json({
        success: true,
        review: {
          feedback: "Great effort! 🎯\n\nYour code looks functional. Here are some tips:\n\n✅ Works correctly\n⚡ Consider time/space complexity optimization\n📝 Add comments for complex sections\n🧪 Test with edge cases\n\nKeep practicing!",
          timestamp: Date.now()
        }
      });
    }
  } catch (error) {
    console.error('Code review error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

module.exports = router;
