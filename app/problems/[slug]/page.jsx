"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '../../lib/AuthContext';
import { useActivity } from '../../lib/ActivityContext';
import { problemsAPI } from '../../lib/api';
import AIChat from '../../components/AIChat';
import { ProblemDetailSkeleton } from '../../components/SkeletonLoader';
import SuccessAnimation from '../../components/SuccessAnimation';

export default function ProblemSolverPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const { updateActivity } = useActivity();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [showHints, setShowHints] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('problem'); // For mobile view switching

  const languages = [
    { value: 'javascript', label: 'JavaScript', starter: '// Write your solution here\nfunction solution() {\n  \n}' },
    { value: 'python', label: 'Python', starter: '# Write your solution here\ndef solution():\n    pass' },
    { value: 'java', label: 'Java', starter: '// Write your solution here\nclass Solution {\n    \n}' },
    { value: 'cpp', label: 'C++', starter: '// Write your solution here\nclass Solution {\npublic:\n    \n};' },
  ];

  useEffect(() => {
    fetchProblem();
  }, [params.slug]);

  const fetchProblem = async () => {
    try {
      setLoading(true);
      // Find problem by slug
      const allProblems = await problemsAPI.getAll();
      const foundProblem = allProblems.find(p => p.slug === params.slug);
      
      if (!foundProblem) {
        router.push('/problems');
        return;
      }
      
      setProblem(foundProblem);
      // Set starter code based on language
      const starter = languages.find(l => l.value === language)?.starter || '';
      setCode(starter);
    } catch (error) {
      console.error('Error fetching problem:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    const starter = languages.find(l => l.value === newLanguage)?.starter || '';
    setCode(starter);
  };

  const handleSubmit = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (!code.trim()) {
      alert('Please write some code before submitting!');
      return;
    }

    setSubmitting(true);
    setResult(null);

    try {
      const response = await problemsAPI.submit({
        problemId: problem._id,
        code,
        language,
      });

      setResult(response.data.result);
      
      // Update streak calendar when problem is solved successfully
      if (response.data.result?.passed) {
        setShowSuccess(true); // Show celebration animation
        await updateActivity(1); // Increment today's activity count
      }
    } catch (error) {
      console.error('Submit error:', error);
      setResult({
        passed: false,
        message: error.response?.data?.message || 'Error submitting solution. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const revealNextHint = () => {
    if (revealedHints < problem.hints.length) {
      setRevealedHints(revealedHints + 1);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'Hard': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  if (loading) {
    return <ProblemDetailSkeleton />;
  }

  if (!problem) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Success Animation */}
      <SuccessAnimation 
        show={showSuccess} 
        onComplete={() => setShowSuccess(false)} 
      />
      
      {/* Header - Mobile Optimized */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/problems')}
              className="flex items-center space-x-1 sm:space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <span className="text-xl sm:text-2xl">←</span>
              <span className="text-sm sm:text-base">Back</span>
            </button>
            <div className="flex items-center gap-2">
              {/* Mobile Tab Switcher */}
              <div className="flex lg:hidden bg-gray-900/50 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('problem')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    activeTab === 'problem' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Problem
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    activeTab === 'code' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Code
                </button>
              </div>
              {user && (
                <span className="hidden sm:block text-gray-300 text-sm">Solving as {user.name}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Desktop: Side by Side, Mobile: Tabbed View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left Panel - Problem Description */}
          <div className={`bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-140px)] lg:max-h-[calc(100vh-120px)] ${
            activeTab !== 'problem' ? 'hidden lg:block' : ''
          }`}>
            {/* Title and Difficulty */}
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-wrap items-start sm:items-center gap-2 sm:gap-3 mb-3">
                <h1 className="text-xl sm:text-3xl font-bold text-white">{problem.title}</h1>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold border ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
              </div>
              
              {/* Topics - Horizontal Scroll on Mobile */}
              <div className="flex flex-nowrap sm:flex-wrap gap-2 mb-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                {problem.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="flex-shrink-0 px-2 sm:px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Companies */}
              {problem.companies && problem.companies.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm text-gray-400">
                  <span>Asked by:</span>
                  {problem.companies.slice(0, 3).map((company, index) => (
                    <span key={index} className="text-purple-400">{company}</span>
                  ))}
                  {problem.companies.length > 3 && (
                    <span className="text-gray-500">+{problem.companies.length - 3} more</span>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Description</h3>
              <div className="text-sm sm:text-base text-gray-300 whitespace-pre-wrap leading-relaxed">
                {problem.description}
              </div>
            </div>

            {/* Examples */}
            {problem.examples && problem.examples.length > 0 && (
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Examples</h3>
                {problem.examples.map((example, index) => (
                  <div key={index} className="mb-3 sm:mb-4 bg-gray-900/50 rounded-lg p-3 sm:p-4 border border-gray-700">
                    <p className="text-gray-400 mb-2 text-sm"><strong>Example {index + 1}:</strong></p>
                    <p className="text-green-400 mb-1 text-sm break-all"><strong>Input:</strong> {example.input}</p>
                    <p className="text-blue-400 mb-1 text-sm break-all"><strong>Output:</strong> {example.output}</p>
                    {example.explanation && (
                      <p className="text-gray-400 mt-2 text-sm"><strong>Explanation:</strong> {example.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Constraints */}
            {problem.constraints && problem.constraints.length > 0 && (
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Constraints</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm sm:text-base">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hints */}
            {problem.hints && problem.hints.length > 0 && (
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-white">Hints 💡</h3>
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="text-xs sm:text-sm text-purple-400 hover:text-purple-300"
                  >
                    {showHints ? 'Hide' : 'Show'}
                  </button>
                </div>
                {showHints && (
                  <div className="space-y-2 sm:space-y-3">
                    {problem.hints.slice(0, revealedHints).map((hint, index) => (
                      <div key={index} className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2 sm:p-3">
                        <p className="text-yellow-400 text-sm">
                          <strong>Hint {index + 1}:</strong> {hint}
                        </p>
                      </div>
                    ))}
                    {revealedHints < problem.hints.length && (
                      <button
                        onClick={revealNextHint}
                        className="w-full px-3 sm:px-4 py-2 bg-yellow-600/20 border border-yellow-600/40 text-yellow-400 rounded-lg hover:bg-yellow-600/30 transition-colors text-sm"
                      >
                        Reveal Next Hint ({revealedHints}/{problem.hints.length})
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Complexity Info */}
            {problem.solution && (
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-bold text-purple-400 mb-2">Expected Complexity</h3>
                <p className="text-sm sm:text-base text-gray-300">
                  <strong>Time:</strong> {problem.solution.timeComplexity} | 
                  <strong> Space:</strong> {problem.solution.spaceComplexity}
                </p>
              </div>
            )}
          </div>

          {/* Right Panel - Code Editor */}
          <div className={`bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-3 sm:p-6 ${
            activeTab !== 'code' ? 'hidden lg:block' : ''
          }`}>
            <div className="flex flex-col h-[calc(100vh-180px)] sm:h-[calc(100vh-140px)] lg:h-[calc(100vh-120px)]">
              {/* Language Selector */}
              <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <label className="text-gray-300 font-semibold text-sm hidden sm:block">Language:</label>
                  <select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {languages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setCode(languages.find(l => l.value === language)?.starter || '')}
                  className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors border border-gray-700 rounded-lg hover:border-gray-600"
                >
                  Reset
                </button>
              </div>

              {/* Code Editor */}
              <div className="flex-1 mb-3 sm:mb-4 min-h-0">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full p-3 sm:p-4 bg-gray-900 border border-gray-700 rounded-lg text-white font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Write your code here..."
                  spellCheck="false"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={submitting || !user}
                className={`w-full py-3 rounded-lg font-bold text-white transition-all text-sm sm:text-base ${
                  submitting || !user
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:scale-[0.98]'
                }`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </span>
                ) : !user ? (
                  'Login to Submit'
                ) : (
                  'Submit Solution'
                )}
              </button>

              {/* Result Display */}
              {result && (
                <div className={`mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg border ${
                  result.passed
                    ? 'bg-green-500/10 border-green-500/20'
                    : 'bg-red-500/10 border-red-500/20'
                }`}>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h3 className={`text-lg sm:text-xl font-bold ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                      {result.passed ? '✅ Accepted' : '❌ Wrong Answer'}
                    </h3>
                    {result.xpEarned > 0 && (
                      <span className="text-yellow-400 font-bold text-sm sm:text-base">+{result.xpEarned} XP</span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                    <div>
                      <p className="text-gray-400">Test Cases</p>
                      <p className={`font-bold ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                        {result.testsPassed} / {result.testsTotal}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Runtime</p>
                      <p className="font-bold text-white">{result.runtime} ms</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Memory</p>
                      <p className="font-bold text-white">{result.memory} MB</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Status</p>
                      <p className="font-bold text-white">{result.status}</p>
                    </div>
                  </div>

                  {result.passed && (
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-700">
                      <button
                        onClick={() => router.push('/problems')}
                        className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                      >
                        Solve Another Problem
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Component */}
      <AIChat 
        problemContext={{
          problemTitle: problem?.title,
          difficulty: problem?.difficulty,
          topics: problem?.topics
        }}
      />
    </div>
  );
}
