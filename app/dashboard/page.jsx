'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/AuthContext';
import { progressAPI } from '../lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const response = await progressAPI.getStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                TechPrep 🚀
              </h1>
              <div className="hidden md:flex space-x-6">
                <a href="/dashboard" className="text-blue-600 dark:text-blue-400 font-semibold">
                  Dashboard
                </a>
                <a href="/problems" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Problems
                </a>
                <a href="/progress" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Progress
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user?.name}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name}! 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {user?.targetCompany 
              ? `Let's work towards ${user.targetCompany}` 
              : "Let's start your prep journey"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Problems Solved
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats?.totalSolved || 0}
                </p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Current Streak
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats?.currentStreak || 0}
                </p>
              </div>
              <div className="text-4xl">🔥</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Success Probability
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats?.successProbability || 0}%
                </p>
              </div>
              <div className="text-4xl">🎯</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  XP Points
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats?.xp || 0}
                </p>
              </div>
              <div className="text-4xl">⭐</div>
            </div>
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Difficulty Breakdown
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-green-600 dark:text-green-400 font-medium">Easy</span>
                <span className="text-gray-600 dark:text-gray-400">{stats?.breakdown?.Easy || 0} solved</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-green-600 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min((stats?.breakdown?.Easy || 0) / 50 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-yellow-600 dark:text-yellow-400 font-medium">Medium</span>
                <span className="text-gray-600 dark:text-gray-400">{stats?.breakdown?.Medium || 0} solved</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-yellow-600 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min((stats?.breakdown?.Medium || 0) / 75 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-red-600 dark:text-red-400 font-medium">Hard</span>
                <span className="text-gray-600 dark:text-gray-400">{stats?.breakdown?.Hard || 0} solved</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-red-600 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min((stats?.breakdown?.Hard || 0) / 25 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <a 
            href="/problems"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-2">Solve Problems 💻</h3>
            <p className="text-blue-100">Browse and solve coding challenges</p>
          </a>
          
          <a 
            href="/recommendations"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-2">Get Recommendations 🎯</h3>
            <p className="text-purple-100">AI-powered problem suggestions</p>
          </a>
        </div>
      </div>
    </div>
  );
}
