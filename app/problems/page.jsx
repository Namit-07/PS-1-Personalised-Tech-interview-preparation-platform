"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/AuthContext';
import { problemsAPI } from '../lib/api';
import { ProblemsPageSkeleton } from '../components/SkeletonLoader';

export default function ProblemsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [allTopics, setAllTopics] = useState([]);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const data = await problemsAPI.getAll();
      setProblems(data);
      setFilteredProblems(data);
      
      // Extract unique topics
      const topics = new Set();
      data.forEach(problem => {
        problem.topics.forEach(topic => topics.add(topic));
      });
      setAllTopics(Array.from(topics).sort());
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterProblems();
  }, [searchTerm, selectedDifficulty, selectedTopics, problems]);

  const filterProblems = () => {
    let filtered = [...problems];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(problem =>
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Difficulty filter
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(problem => problem.difficulty === selectedDifficulty);
    }

    // Topics filter
    if (selectedTopics.length > 0) {
      filtered = filtered.filter(problem =>
        problem.topics.some(topic => selectedTopics.includes(topic))
      );
    }

    setFilteredProblems(filtered);
  };

  const toggleTopic = (topic) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-400';
      case 'Medium':
        return 'text-yellow-400';
      case 'Hard':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getDifficultyBg = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/10 border-green-500/20';
      case 'Medium':
        return 'bg-yellow-500/10 border-yellow-500/20';
      case 'Hard':
        return 'bg-red-500/10 border-red-500/20';
      default:
        return 'bg-gray-500/10 border-gray-500/20';
    }
  };

  if (loading) {
    return <ProblemsPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 py-6 md:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Problem Set</h1>
          <p className="text-gray-300">
            {filteredProblems.length} problem{filteredProblems.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6 mb-6">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search problems by title or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 font-semibold">Difficulty</label>
            <div className="flex flex-wrap gap-2">
              {['All', 'Easy', 'Medium', 'Hard'].map(difficulty => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedDifficulty === difficulty
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          {/* Topics Filter */}
          <div>
            <label className="block text-gray-300 mb-2 font-semibold">Topics</label>
            <div className="flex flex-wrap gap-2">
              {allTopics.map(topic => (
                <button
                  key={topic}
                  onClick={() => toggleTopic(topic)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    selectedTopics.includes(topic)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
            {selectedTopics.length > 0 && (
              <button
                onClick={() => setSelectedTopics([])}
                className="mt-2 text-sm text-purple-400 hover:text-purple-300"
              >
                Clear all topics
              </button>
            )}
          </div>
        </div>

        {/* Problems Grid */}
        {filteredProblems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No problems found matching your filters.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDifficulty('All');
                setSelectedTopics([]);
              }}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProblems.map((problem) => (
              <div
                key={problem._id}
                onClick={() => router.push(`/problems/${problem.slug}`)}
                className={`${getDifficultyBg(problem.difficulty)} border rounded-lg p-6 cursor-pointer hover:scale-105 transition-all duration-200 hover:shadow-xl hover:shadow-purple-500/20`}
              >
                {/* Difficulty Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-sm font-bold ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                  {problem.metadata?.frequency && (
                    <span className="text-xs text-gray-400">
                      🔥 {problem.metadata.frequency.toFixed(1)}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 hover:text-purple-400 transition-colors">
                  {problem.title}
                </h3>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {problem.topics.slice(0, 3).map((topic, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-900/50 text-gray-300 text-xs rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                  {problem.topics.length > 3 && (
                    <span className="px-2 py-1 bg-gray-900/50 text-gray-400 text-xs rounded-full">
                      +{problem.topics.length - 3}
                    </span>
                  )}
                </div>

                {/* Companies */}
                {problem.companies && problem.companies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {problem.companies.slice(0, 3).map((company, index) => (
                      <span
                        key={index}
                        className="text-xs text-gray-400"
                      >
                        {company}
                        {index < Math.min(2, problem.companies.length - 1) && ','}
                      </span>
                    ))}
                    {problem.companies.length > 3 && (
                      <span className="text-xs text-gray-400">
                        +{problem.companies.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Stats */}
                {problem.metadata && (
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-700">
                    <span>
                      ✓ {problem.metadata.acceptanceRate?.toFixed(1)}%
                    </span>
                    <span>
                      👍 {problem.metadata.likes?.toLocaleString() || 0}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Problem Distribution</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">
                {problems.filter(p => p.difficulty === 'Easy').length}
              </div>
              <div className="text-gray-400 text-sm">Easy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-1">
                {problems.filter(p => p.difficulty === 'Medium').length}
              </div>
              <div className="text-gray-400 text-sm">Medium</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-1">
                {problems.filter(p => p.difficulty === 'Hard').length}
              </div>
              <div className="text-gray-400 text-sm">Hard</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
