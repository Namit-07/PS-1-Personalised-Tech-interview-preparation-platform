"use client";

import { useState, useEffect, useRef } from 'react';
import { aiAPI } from '../lib/api';

export default function AIChat({ problemContext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: problemContext?.page === 'dashboard' 
        ? "Hi! I'm your AI career coach. Ask me about your progress, interview readiness, or what to practice next! 🎯\n\nTry: '/ready' to check interview readiness or '/plan' for a study plan!"
        : "Hi! I'm your AI coding mentor. Ask me anything about algorithms, problem-solving strategies, or get help with the current problem! 🚀"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle smart commands
  const handleSmartCommand = (message) => {
    const stats = problemContext?.userStats || {};
    
    if (message.toLowerCase() === '/ready') {
      const problemsSolved = stats.problemsSolved || 0;
      const streak = stats.currentStreak || 0;
      const level = stats.level || 1;
      const targetCompanies = stats.targetCompany?.join(', ') || 'FAANG';
      
      const readinessScore = Math.min(Math.round((problemsSolved / 150 * 50) + (streak * 2) + (level * 5)), 100);
      
      let readinessMessage = `🎯 **Interview Readiness Analysis for ${targetCompanies}**\n\n`;
      readinessMessage += `**Overall Score: ${readinessScore}%**\n\n`;
      readinessMessage += `📊 Your Stats:\n`;
      readinessMessage += `• Problems Solved: ${problemsSolved}/150 (${Math.round(problemsSolved/150*100)}%)\n`;
      readinessMessage += `• Current Streak: ${streak} days 🔥\n`;
      readinessMessage += `• Level: ${level}\n\n`;
      
      if (readinessScore >= 80) {
        readinessMessage += `✅ **You're ready!** Your preparation is solid. Focus on mock interviews and system design.\n\n`;
        readinessMessage += `Next steps:\n• Practice mock interviews\n• Review past mistakes\n• Study company-specific patterns`;
      } else if (readinessScore >= 60) {
        readinessMessage += `⚡ **Almost there!** You need more practice in key areas.\n\n`;
        readinessMessage += `Recommended focus:\n• Solve 20 more medium problems\n• Strengthen weak topics\n• Build ${15 - streak} more days streak`;
      } else {
        readinessMessage += `💪 **Keep going!** You're building a strong foundation.\n\n`;
        readinessMessage += `Action plan:\n• Solve 50 more problems (Easy/Medium mix)\n• Build a 14-day streak\n• Focus on Arrays, Strings, and Hash Maps first`;
      }
      
      return readinessMessage;
    }
    
    if (message.toLowerCase() === '/plan') {
      const problemsSolved = stats.problemsSolved || 0;
      const experienceLevel = stats.experienceLevel || 'Intermediate';
      
      let planMessage = `📅 **Personalized 30-Day Study Plan**\n\n`;
      planMessage += `Based on your level: ${experienceLevel}\n`;
      planMessage += `Current progress: ${problemsSolved} problems\n\n`;
      
      planMessage += `**Week 1-2: Foundations**\n`;
      planMessage += `• Days 1-5: Arrays & Strings (2 problems/day)\n`;
      planMessage += `• Days 6-10: Hash Maps & Sets (2 problems/day)\n`;
      planMessage += `• Days 11-14: Two Pointers & Sliding Window (2 problems/day)\n\n`;
      
      planMessage += `**Week 3: Core Data Structures**\n`;
      planMessage += `• Days 15-18: Linked Lists (2 problems/day)\n`;
      planMessage += `• Days 19-21: Stacks & Queues (2 problems/day)\n\n`;
      
      planMessage += `**Week 4: Advanced Topics**\n`;
      planMessage += `• Days 22-25: Trees & Graphs (2 problems/day)\n`;
      planMessage += `• Days 26-28: Dynamic Programming basics (1 problem/day)\n`;
      planMessage += `• Days 29-30: Mock interviews & revision\n\n`;
      
      planMessage += `🎯 Goal: Solve 60+ problems in 30 days!`;
      
      return planMessage;
    }
    
    if (message.toLowerCase() === '/practice' || message.toLowerCase() === '/next') {
      const problemsSolved = stats.problemsSolved || 0;
      
      let practiceMessage = `🎯 **Recommended Next Steps**\n\n`;
      
      if (problemsSolved < 20) {
        practiceMessage += `Focus on **Easy Arrays & Strings**:\n`;
        practiceMessage += `1. Two Sum\n2. Valid Anagram\n3. Contains Duplicate\n4. Best Time to Buy and Sell Stock`;
      } else if (problemsSolved < 50) {
        practiceMessage += `Ready for **Medium Hash Maps**:\n`;
        practiceMessage += `1. Group Anagrams\n2. Top K Frequent Elements\n3. Product of Array Except Self\n4. Longest Consecutive Sequence`;
      } else {
        practiceMessage += `Try **Advanced Problems**:\n`;
        practiceMessage += `1. Course Schedule (Graphs)\n2. Coin Change (DP)\n3. Merge K Sorted Lists\n4. Word Search`;
      }
      
      practiceMessage += `\n\n💡 Tip: Always analyze time/space complexity after solving!`;
      
      return practiceMessage;
    }
    
    return null;
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    // Check for smart commands
    const smartResponse = handleSmartCommand(userMessage);
    if (smartResponse) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: smartResponse
      }]);
      return;
    }
    
    setLoading(true);

    try {
      // Build conversation history for context
      const conversationHistory = messages.slice(-6).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await aiAPI.chat({
        message: userMessage,
        context: {
          ...problemContext,
          conversationHistory
        }
      });

      // Add AI response
      let aiReply = response.data?.response?.reply || response.data?.reply || response.data?.message || "Got a response!";
      // Ensure aiReply is a string
      if (typeof aiReply !== 'string') {
        aiReply = JSON.stringify(aiReply);
      }
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: aiReply
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again! 😅"
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = problemContext?.page === 'dashboard' 
    ? [
        "/ready",
        "/practice",
        "/plan",
        "What should I focus on?"
      ]
    : [
        "How should I approach this problem?",
        "What's the optimal time complexity?",
        "Can you explain the hint?",
        "Help me debug my code"
      ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center text-white text-2xl z-50"
        aria-label="AI Chat"
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-gray-800 rounded-lg shadow-2xl border border-gray-700 flex flex-col z-50 animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🤖</span>
              <div>
                <h3 className="text-white font-bold">
                  {problemContext?.page === 'dashboard' ? 'AI Career Coach' : 'AI Coding Mentor'}
                </h3>
                <p className="text-purple-100 text-xs">Always here to help!</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-100 border border-gray-700'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {typeof message.content === 'string' ? message.content : JSON.stringify(message.content)}
                  </p>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 border-t border-gray-700 bg-gray-900">
              <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(question)}
                    className="text-xs px-2 py-1 bg-gray-800 border border-gray-700 text-gray-300 rounded hover:bg-gray-700 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-700 bg-gray-900">
            <div className="flex space-x-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                rows="2"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  loading || !input.trim()
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {loading ? '...' : '→'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
