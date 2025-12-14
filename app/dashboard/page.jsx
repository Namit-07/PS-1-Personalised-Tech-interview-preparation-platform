'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../lib/AuthContext';
import { useActivity } from '../lib/ActivityContext';
import { progressAPI } from '../lib/api';
import { motion } from 'framer-motion';
import { DashboardSkeleton } from '../components/SkeletonLoader';
import StreakCalendar from '../components/StreakCalendar';
import AIChat from '../components/AIChat';
import OnboardingWizard from '../components/OnboardingWizard';

export default function DashboardNew() {
  const { user, updateUser } = useAuth();
  const { activityData, isLoading: activityLoading } = useActivity();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user needs onboarding
    if (user && user.role === 'student' && !user.onboardingComplete) {
      setShowOnboarding(true);
    }
  }, [user]);

  const handleOnboardingComplete = async (onboardingData) => {
    try {
      const token = localStorage.getItem('token');
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      const response = await fetch(`${API_URL}/auth/onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(onboardingData)
      });
      
      const data = await response.json();

      if (data.success) {
        // Update user in context
        updateUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        setShowOnboarding(false);
      }
    } catch (error) {
      console.error('Onboarding error:', error);
      alert('Failed to complete onboarding. Please try again.');
    }
  };

  // Show onboarding wizard if needed
  if (showOnboarding) {
    return <OnboardingWizard onComplete={handleOnboardingComplete} userName={user?.name} />;
  }

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await progressAPI.getStats();
        
        // Check if response has data property (Axios) or if it's already the data
        let data;
        if (response.data) {
          // Axios response format
          data = response.data;
        } else {
          // Already extracted data
          data = response;
        }
        
        // Extract the stats object from {success: true, stats: {...}}
        if (data.stats) {
          setStats(data.stats);
        } else {
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Fallback to user stats if API fails
        if (user?.stats) {
          setStats({
            totalSolved: user.stats.totalProblemsSolved || 0,
            currentStreak: user.stats.currentStreak || 0,
            xp: user.stats.xp || 0,
            level: user.stats.level || 1
          });
        }
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
                Welcome, {user?.name?.split(' ')[0] || 'Student'}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Track your progress and continue your learning journey
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <span className="text-lg">🎯</span>
                <div className="text-left">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Level</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">{user?.stats?.level || 1}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl border border-amber-200/50 dark:border-amber-700/30">
                <span className="text-lg">🔥</span>
                <div className="text-left">
                  <p className="text-xs text-amber-600 dark:text-amber-400">Streak</p>
                  <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">{stats?.streak || user?.stats?.currentStreak || 0} days</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Problems Solved */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">+5 today</span>
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{stats?.totalSolved || 0}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Problems Solved</p>
          </motion.div>

          {/* Success Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{stats?.successRate || 85}%</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Success Rate</p>
          </motion.div>

          {/* Total XP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{user?.stats?.xp || (stats?.totalSolved || 0) * 100}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Total XP Earned</p>
          </motion.div>

          {/* Practice Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">24h</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Practice Time</p>
          </motion.div>
        </div>

        {/* Streak Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <StreakCalendar activityData={activityData} />
        </motion.div>

        {/* Learning Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Learning Paths</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Choose a topic to start practicing</p>
            </div>
            <Link 
              href="/problems" 
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'DSA', icon: '📊', href: '/modules/dsa', problems: 150, color: 'bg-blue-500' },
              { name: 'System Design', icon: '🏗️', href: '/modules/system-design', problems: 20, color: 'bg-orange-500' },
              { name: 'LLD', icon: '📐', href: '/modules/lld', problems: 25, color: 'bg-purple-500' },
              { name: 'OOPs', icon: '🎯', href: '/modules/oops', problems: 30, color: 'bg-green-500' },
              { name: 'CS Fundamentals', icon: '💻', href: '/modules/cs-fundamentals', problems: 50, color: 'bg-indigo-500' },
              { name: 'MERN Stack', icon: '⚛️', href: '/modules/mern-stack', problems: 10, color: 'bg-teal-500' },
              { name: 'Java Spring', icon: '☕', href: '/modules/java-spring-boot', problems: 15, color: 'bg-red-500' },
              { name: 'AI/ML', icon: '🤖', href: '/modules/ai-engineering', problems: 40, color: 'bg-pink-500' }
            ].map((module, idx) => (
              <Link key={idx} href={module.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  whileHover={{ y: -4 }}
                  className="group bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{module.icon}</span>
                    <div className={`w-2 h-2 rounded-full ${module.color}`}></div>
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{module.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{module.problems}+ problems</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Link href="/problems">
            <div className="group bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <span className="text-2xl">💻</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Start Practicing</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Solve curated problems and improve your skills</p>
                </div>
                <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          <Link href="/recommendations">
            <div className="group bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-600 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">AI Recommendations</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Get personalized problem suggestions</p>
                </div>
                <svg className="w-5 h-5 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* AI Chat Assistant */}
      <AIChat 
        userContext={{
          currentStreak: stats?.currentStreak || 0,
          xp: stats?.xp || 0,
          level: stats?.level || 1,
          targetCompany: user?.targetCompany || [],
          experienceLevel: user?.experienceLevel
        }}
        page="dashboard"
      />
    </div>
  );
}

