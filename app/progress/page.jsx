'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { progressAPI } from '../lib/api';
import ProgressChart from '../components/ProgressChart';
import { ProgressPageSkeleton } from '../components/SkeletonLoader';

export default function ProgressPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [progress, setProgress] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      setLoading(true);
      const [statsRes, progressRes, topicsRes] = await Promise.all([
        progressAPI.getStats(),
        progressAPI.getAll(),
        progressAPI.getTopics()
      ]);

      setStats(statsRes.data.stats);
      setProgress(progressRes.data.progress);
      setTopics(topicsRes.data.proficiencies);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ProgressPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">📊 Your Progress</h1>
          <p className="text-gray-400">Track your learning journey and identify areas for improvement</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Solved */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Problems Solved</p>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-3xl font-bold text-green-400">{stats?.totalSolved || 0}</p>
            <p className="text-xs text-gray-500 mt-1">out of {stats?.totalAttempted || 0} attempted</p>
          </div>

          {/* Success Rate */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Success Rate</p>
              <span className="text-2xl">🎯</span>
            </div>
            <p className="text-3xl font-bold text-blue-400">
              {stats?.totalAttempted > 0 
                ? Math.round((stats.totalSolved / stats.totalAttempted) * 100)
                : 0}%
            </p>
            <p className="text-xs text-gray-500 mt-1">interview probability: {stats?.successProbability || 0}%</p>
          </div>

          {/* Current Streak */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Current Streak</p>
              <span className="text-2xl">🔥</span>
            </div>
            <p className="text-3xl font-bold text-orange-400">{stats?.currentStreak || 0}</p>
            <p className="text-xs text-gray-500 mt-1">days in a row</p>
          </div>

          {/* Level & XP */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Level & XP</p>
              <span className="text-2xl">⭐</span>
            </div>
            <p className="text-3xl font-bold text-purple-400">Level {stats?.level || 1}</p>
            <p className="text-xs text-gray-500 mt-1">{stats?.xp || 0} XP earned</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Difficulty Breakdown */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Difficulty Breakdown</h2>
            {stats?.breakdown && (
              <ProgressChart 
                type="pie"
                data={{
                  labels: ['Easy', 'Medium', 'Hard'],
                  datasets: [{
                    data: [
                      stats.breakdown.Easy || 0,
                      stats.breakdown.Medium || 0,
                      stats.breakdown.Hard || 0
                    ],
                    backgroundColor: [
                      'rgba(34, 197, 94, 0.8)',  // green
                      'rgba(250, 204, 21, 0.8)', // yellow
                      'rgba(239, 68, 68, 0.8)'   // red
                    ],
                    borderColor: [
                      'rgba(34, 197, 94, 1)',
                      'rgba(250, 204, 21, 1)',
                      'rgba(239, 68, 68, 1)'
                    ],
                    borderWidth: 2
                  }]
                }}
              />
            )}
          </div>

          {/* Topic Proficiency */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Topic Proficiency</h2>
            {topics.length > 0 ? (
              <ProgressChart 
                type="bar"
                data={{
                  labels: topics.slice(0, 8).map(t => t.topicName),
                  datasets: [{
                    label: 'Proficiency Score',
                    data: topics.slice(0, 8).map(t => t.proficiencyScore),
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2
                  }]
                }}
              />
            ) : (
              <p className="text-gray-400 text-center py-8">Solve problems to see your topic proficiency</p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          {progress.length > 0 ? (
            <div className="space-y-3">
              {progress.slice(0, 10).map((item, index) => (
                <div 
                  key={item._id}
                  className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'Solved' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <div>
                      <p className="font-medium">{item.problemId?.title || 'Unknown Problem'}</p>
                      <p className="text-sm text-gray-400">
                        {item.attempts?.length || 0} attempt{item.attempts?.length !== 1 ? 's' : ''} • 
                        Last: {new Date(item.lastAttemptAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.difficulty === 'Easy' ? 'bg-green-900 text-green-300' :
                      item.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-red-900 text-red-300'
                    }`}>
                      {item.difficulty}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Solved' ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">No progress yet. Start solving problems!</p>
              <a 
                href="/problems"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Browse Problems
              </a>
            </div>
          )}
        </div>

        {/* Recommendations Section */}
        {topics.length > 0 && (
          <div className="mt-8 bg-linear-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/50 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">💡 Recommendations</h2>
                <p className="text-gray-300 mb-4">
                  Based on your progress, we recommend focusing on:
                </p>
                <div className="flex flex-wrap gap-2">
                  {topics
                    .filter(t => t.proficiencyScore < 60)
                    .slice(0, 3)
                    .map(topic => (
                      <span 
                        key={topic._id}
                        className="px-4 py-2 bg-blue-900/50 text-blue-300 rounded-full text-sm font-medium"
                      >
                        {topic.topicName} ({topic.proficiencyScore}% proficiency)
                      </span>
                    ))}
                </div>
              </div>
              <a 
                href="/recommendations"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors whitespace-nowrap"
              >
                View Recommendations
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
