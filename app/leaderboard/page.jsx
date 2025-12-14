'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { motion } from 'framer-motion';

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, week, month
  const [categoryFilter, setCategoryFilter] = useState('overall'); // overall, dsa, system-design, etc.

  useEffect(() => {
    fetchLeaderboard();
  }, [filter, categoryFilter]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(
        `${API_URL}/leaderboard?period=${filter}&category=${categoryFilter}`
      );
      const data = await response.json();
      console.log('📊 Leaderboard data:', data);
      setLeaderboard(data.leaderboard || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getPercentile = (rank, total) => {
    const percentile = ((total - rank + 1) / total) * 100;
    return percentile.toFixed(1);
  };

  const isTopPerformer = (rank, total) => {
    const percentile = ((total - rank + 1) / total) * 100;
    return percentile >= 90; // Top 10%
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text">
              {user?.role === 'recruiter' ? 'Top Talent' : 'Leaderboard'}
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            {user?.role === 'recruiter' 
              ? '💼 Discover exceptional developers with proven skills and consistent performance'
              : '🏆 Top performers recognized by recruiters from top companies'}
          </p>
          {user?.role === 'recruiter' && (
            <div className="mt-6 max-w-3xl mx-auto">
              <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl p-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  <span className="font-semibold text-orange-400">Real-time rankings</span> based on problem-solving activity, consistency, and skill verification. 
                  Contact top performers directly via their LinkedIn, GitHub, or email.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {/* Time Period Filter */}
          <div className="flex gap-2 bg-gray-900 rounded-xl p-2">
            {['all', 'month', 'week'].map((period) => (
              <button
                key={period}
                onClick={() => setFilter(period)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  filter === period
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {period === 'all' ? 'All Time' : period === 'month' ? 'This Month' : 'This Week'}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 bg-gray-900 rounded-xl p-2">
            {['overall', 'dsa', 'system-design', 'lld'].map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  categoryFilter === category
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {category === 'overall' ? 'Overall' : category.toUpperCase().replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        {!loading && leaderboard.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          >
            {/* 2nd Place */}
            <div className="flex flex-col items-center pt-12">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-4xl mb-4 border-4 border-gray-500">
                🥈
              </div>
              <h3 className="text-xl font-bold mb-2">{leaderboard[1].name}</h3>
              <p className="text-gray-400 text-sm mb-2">{leaderboard[1].headline || 'Developer'}</p>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 w-full border border-gray-700">
                <p className="text-3xl font-bold text-gray-300 mb-1">{leaderboard[1].score}</p>
                <p className="text-gray-500 text-sm">problems solved</p>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-5xl mb-4 border-4 border-yellow-400 animate-pulse">
                🥇
              </div>
              <h3 className="text-2xl font-bold mb-2">{leaderboard[0].name}</h3>
              <p className="text-gray-400 mb-2">{leaderboard[0].headline || 'Top Developer'}</p>
              <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 rounded-xl p-6 w-full border-2 border-yellow-500">
                <p className="text-4xl font-bold text-yellow-400 mb-1">{leaderboard[0].score}</p>
                <p className="text-gray-400 text-sm">problems solved</p>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center pt-12">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-700 flex items-center justify-center text-4xl mb-4 border-4 border-orange-500">
                🥉
              </div>
              <h3 className="text-xl font-bold mb-2">{leaderboard[2].name}</h3>
              <p className="text-gray-400 text-sm mb-2">{leaderboard[2].headline || 'Developer'}</p>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 w-full border border-orange-700">
                <p className="text-3xl font-bold text-orange-400 mb-1">{leaderboard[2].score}</p>
                <p className="text-gray-500 text-sm">problems solved</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Full Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-800"
        >
          <h2 className="text-3xl font-bold mb-6">All Rankings</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400">Loading rankings...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-4 text-gray-400 font-semibold">Rank</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-semibold">User</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-semibold">Score</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-semibold">Streak</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-semibold">Percentile</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-semibold">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <motion.tr
                      key={entry.userId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`border-b border-gray-800 hover:bg-gray-800/50 transition-all ${
                        entry.userId === user?.id ? 'bg-purple-900/20' : ''
                      }`}
                    >
                      <td className="py-4 px-4">
                        <span className={`text-2xl font-bold ${
                          index < 3 ? 'text-3xl' : 'text-gray-400'
                        }`}>
                          {getRankBadge(index + 1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-lg">
                            {entry.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-lg flex items-center gap-2">
                              {entry.name}
                              {isTopPerformer(index + 1, leaderboard.length) && (
                                <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full font-bold">
                                  TOP 10%
                                </span>
                              )}
                              {entry.userId === user?.id && (
                                <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                                  You
                                </span>
                              )}
                            </p>
                            <p className="text-gray-400 text-sm">{entry.headline || 'Developer'}</p>
                            {entry.location && (
                              <p className="text-gray-500 text-xs">📍 {entry.location}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-2xl font-bold text-green-400">{entry.score}</span>
                        <p className="text-gray-500 text-xs">problems</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xl font-bold text-orange-400">{entry.currentStreak || 0} 🔥</span>
                        <p className="text-gray-500 text-xs">day streak</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xl font-bold text-blue-400">
                          {getPercentile(index + 1, leaderboard.length)}%
                        </span>
                        <p className="text-gray-500 text-xs">percentile</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          {entry.linkedin && (
                            <a
                              href={entry.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-[#0077B5] hover:bg-[#006399] text-white rounded-lg text-sm font-semibold transition-all"
                            >
                              LinkedIn
                            </a>
                          )}
                          {entry.github && (
                            <a
                              href={entry.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-semibold transition-all"
                            >
                              GitHub
                            </a>
                          )}
                          {entry.email && isTopPerformer(index + 1, leaderboard.length) && (
                            <a
                              href={`mailto:${entry.email}`}
                              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg text-sm font-semibold transition-all"
                            >
                              Contact
                            </a>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && leaderboard.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No rankings available yet. Start solving problems!</p>
            </div>
          )}
        </motion.div>

        {/* Recruiter Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700 rounded-3xl p-8"
        >
          <h3 className="text-2xl font-bold mb-4">🎯 For Recruiters</h3>
          <p className="text-gray-300 mb-4">
            Connect with top performers who have proven their skills through consistent practice and problem-solving.
            The leaderboard showcases candidates who are actively preparing for technical interviews and staying sharp.
          </p>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-black/50 rounded-xl p-4">
              <p className="text-3xl font-bold text-yellow-400 mb-2">Top 1%</p>
              <p className="text-gray-400">Elite performers</p>
            </div>
            <div className="bg-black/50 rounded-xl p-4">
              <p className="text-3xl font-bold text-green-400 mb-2">Active</p>
              <p className="text-gray-400">Daily practice</p>
            </div>
            <div className="bg-black/50 rounded-xl p-4">
              <p className="text-3xl font-bold text-blue-400 mb-2">Verified</p>
              <p className="text-gray-400">Real profiles</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
