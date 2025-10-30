'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../lib/AuthContext';
import { useActivity } from '../lib/ActivityContext';
import { progressAPI } from '../lib/api';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { DashboardSkeleton } from '../components/SkeletonLoader';
import StreakCalendar from '../components/StreakCalendar';
import AIChat from '../components/AIChat';

export default function DashboardNew() {
  const { user } = useAuth();
  const { activityData, isLoading: activityLoading } = useActivity();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen relative overflow-hidden bg-black">
      <Navbar />
      
      {/* Optimized Background - Static orbs */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Static Mesh Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        {/* Static Gradient Orbs - reduced blur */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-500/25 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-500/25 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-[350px] h-[350px] bg-pink-500/15 rounded-full blur-3xl" />
        
        {/* Spotlight Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 py-12">
        {/* Hero Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          {/* Online Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-green-400">Online Now</span>
          </motion.div>
          
          <h1 className="text-7xl md:text-9xl font-black mb-6 leading-none">
            <span className="block text-gray-500 text-4xl md:text-5xl mb-4">Welcome back,</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              {user?.name || 'Champion'}
            </span>
          </h1>
          
          <p className="text-2xl text-gray-400 max-w-3xl leading-relaxed">
            Your personalized learning hub is ready. Let's crush those interviews together! 🚀
          </p>
        </motion.div>

        {/* Ultra Modern Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {/* Problems Solved */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="group relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
            <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-800 group-hover:border-green-500/50 transition-all duration-300">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-green-500/20 rounded-2xl blur-2xl" />
                <motion.div 
                  className="relative text-6xl"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ✅
                </motion.div>
              </div>
              <h3 className="text-gray-500 text-xs font-bold mb-3 uppercase tracking-widest">Problems Solved</h3>
              <div className="flex items-end gap-2">
                <p className="text-7xl font-black bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">
                  {stats?.totalSolved || 0}
                </p>
                <span className="text-green-400 text-sm mb-2">↗</span>
              </div>
              <div className="mt-6 h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Current Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="group relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
            <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-800 group-hover:border-orange-500/50 transition-all duration-300">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-orange-500/20 rounded-2xl blur-2xl" />
                <motion.div 
                  className="relative text-6xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🔥
                </motion.div>
              </div>
              <h3 className="text-gray-500 text-xs font-bold mb-3 uppercase tracking-widest">Current Streak</h3>
              <div className="flex items-end gap-2">
                <p className="text-7xl font-black bg-gradient-to-r from-orange-400 to-red-400 text-transparent bg-clip-text">
                  {stats?.streak || 0}
                </p>
                <span className="text-orange-400 text-2xl mb-2">🔥</span>
              </div>
              <p className="text-gray-600 text-sm mt-3">Keep the fire burning!</p>
            </div>
          </motion.div>

          {/* Success Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="group relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
            <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-800 group-hover:border-blue-500/50 transition-all duration-300">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-2xl" />
                <motion.div 
                  className="relative text-6xl"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  📈
                </motion.div>
              </div>
              <h3 className="text-gray-500 text-xs font-bold mb-3 uppercase tracking-widest">Success Rate</h3>
              <div className="flex items-end gap-2">
                <p className="text-7xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
                  {stats?.successRate || 0}
                </p>
                <span className="text-blue-400 text-4xl font-bold mb-1">%</span>
              </div>
              <p className="text-gray-600 text-sm mt-3">Accuracy on point!</p>
            </div>
          </motion.div>

          {/* Total XP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="group relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
            <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-800 group-hover:border-purple-500/50 transition-all duration-300">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-2xl" />
                <motion.div 
                  className="relative text-6xl"
                  animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  ⭐
                </motion.div>
              </div>
              <h3 className="text-gray-500 text-xs font-bold mb-3 uppercase tracking-widest">Total XP</h3>
              <p className="text-7xl font-black bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                {((stats?.totalSolved || 0) * 100)}
              </p>
              <p className="text-gray-600 text-sm mt-3">Legendary status!</p>
            </div>
          </motion.div>
        </div>

        {/* Streak Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-24"
        >
          <StreakCalendar activityData={activityData} />
        </motion.div>

        {/* Learning Modules - Bento Grid Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="text-6xl">📚</div>
            <div>
              <h2 className="text-5xl font-black text-white mb-2">
                Learning Modules
              </h2>
              <p className="text-gray-500 text-lg">Master everything from DSA to AI Engineering</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'DSA Mastery', icon: '🧮', href: '/modules/dsa', color: 'from-blue-500 to-blue-600', count: '150+ Problems' },
              { name: 'Low Level Design', icon: '🏗️', href: '/modules/lld', color: 'from-purple-500 to-purple-600', count: '25+ Case Studies' },
              { name: 'OOPs Concepts', icon: '🎯', href: '/modules/oops', color: 'from-green-500 to-green-600', count: '30+ Examples' },
              { name: 'System Design', icon: '🏛️', href: '/modules/system-design', color: 'from-orange-500 to-orange-600', count: '20+ Systems' },
              { name: 'MERN Stack', icon: '⚛️', href: '/modules/mern-stack', color: 'from-teal-500 to-teal-600', count: '10+ Projects' },
              { name: 'CS Fundamentals', icon: '💡', href: '/modules/cs-fundamentals', color: 'from-indigo-500 to-indigo-600', count: '50+ Topics' },
              { name: 'Java Spring Boot', icon: '☕', href: '/modules/java-spring-boot', color: 'from-red-500 to-red-600', count: '15+ Projects' },
              { name: 'AI Engineering', icon: '🤖', href: '/modules/ai-engineering', color: 'from-pink-500 to-pink-600', count: '40+ Algorithms' }
            ].map((module, idx) => (
              <Link key={idx} href={module.href}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + idx * 0.05 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group relative h-full cursor-pointer"
                >
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${module.color} opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`} />
                  <div className={`relative h-full bg-gradient-to-br ${module.color} rounded-3xl p-8 border border-white/10 group-hover:border-white/30 transition-all duration-300`}>
                    <div className="text-6xl mb-4">{module.icon}</div>
                    <h3 className="text-2xl font-black text-white mb-2">{module.name}</h3>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-white/80 text-sm font-semibold">{module.count}</span>
                      <motion.span 
                        className="text-white text-2xl"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Link href="/problems">
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative overflow-hidden rounded-3xl p-12 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-blue-500/50 transition-all cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="text-7xl mb-6">💻</div>
                <h3 className="text-4xl font-black text-white mb-3">Start Solving</h3>
                <p className="text-gray-400 text-lg">Jump into curated problems</p>
              </div>
            </motion.div>
          </Link>

          <Link href="/recommendations">
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative overflow-hidden rounded-3xl p-12 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="text-7xl mb-6">🎯</div>
                <h3 className="text-4xl font-black text-white mb-3">AI Recommendations</h3>
                <p className="text-gray-400 text-lg">Personalized problem sets</p>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* AI Chat Assistant */}
      <AIChat 
        problemContext={{
          userStats: {
            problemsSolved: stats?.totalSolved || 0,
            currentStreak: stats?.currentStreak || 0,
            xp: stats?.xp || 0,
            level: stats?.level || 1,
            targetCompany: user?.targetCompany || [],
            experienceLevel: user?.experienceLevel
          },
          page: 'dashboard'
        }}
      />
    </div>
  );
}

