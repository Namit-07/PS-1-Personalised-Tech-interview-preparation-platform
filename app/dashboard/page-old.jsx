'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../lib/AuthContext';
import { progressAPI } from '../lib/api';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

const statsCardVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  }
};

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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 transition-colors">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 dark:text-gray-400 text-lg"
          >
            Loading your dashboard...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors bg-gradient-to-br from-white via-blue-50 to-gray-50 dark:from-gray-950 dark:via-blue-950 dark:to-gray-950 text-gray-900 dark:text-white">
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <Navbar />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 py-12 max-w-7xl relative z-10"
      >
        {/* Welcome Section with Animated Gradient */}
        <motion.div variants={itemVariants} className="mb-16">
          <motion.div
            initial={{ backgroundPosition: '0% 50%' }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_auto] text-transparent bg-clip-text"
          >
            <h2 className="text-6xl md:text-7xl font-black mb-4 tracking-tight">
              Welcome back, {user?.name}! 👋
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-gray-600 dark:text-gray-300 font-light"
          >
            {user?.targetCompany 
              ? `On your way to ${user.targetCompany} 🚀` 
              : "Let's crush some code today 💻"}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 inline-flex items-center gap-2 bg-blue-500/10 dark:bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 text-sm text-blue-600 dark:text-blue-300"
          >
            <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse" />
            Ready to level up
          </motion.div>
        </motion.div>

        {/* Animated Stats Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {/* Problems Solved Card */}
          <motion.div
            variants={statsCardVariants}
            whileHover="hover"
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-500 bg-gradient-to-br from-green-500 to-emerald-600" />
            <div className="relative backdrop-blur-xl rounded-3xl p-8 border transition-all duration-300 shadow-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900/90 dark:to-gray-800/90 border-gray-200 dark:border-gray-700/50 group-hover:border-green-500/50">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                ✅
              </motion.div>
              <p className="text-sm mb-2 font-semibold tracking-wider uppercase text-gray-500 dark:text-gray-400">Problems Solved</p>
              <motion.p
                key={stats?.totalSolved}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl font-black mb-2 text-green-500 dark:text-green-400"
              >
                {stats?.totalSolved || 0}
              </motion.p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                <span className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full animate-pulse" />
                Keep going! 💪
              </div>
            </div>
          </motion.div>

          {/* Streak Card */}
          <motion.div
            variants={statsCardVariants}
            whileHover="hover"
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-500" />
            <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-gray-700/50 group-hover:border-orange-500/50 transition-all duration-300 shadow-2xl">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🔥
              </motion.div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-semibold tracking-wider uppercase">Current Streak</p>
              <motion.p
                key={stats?.currentStreak}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl font-black text-orange-500 dark:text-orange-400 mb-2"
              >
                {stats?.currentStreak || 0}
              </motion.p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                <span className="w-1.5 h-1.5 bg-orange-500 dark:bg-orange-400 rounded-full animate-pulse" />
                days in a row
              </div>
            </div>
          </motion.div>

          {/* Success Rate Card */}
          <motion.div
            variants={statsCardVariants}
            whileHover="hover"
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-500" />
            <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-gray-700/50 group-hover:border-blue-500/50 transition-all duration-300 shadow-2xl">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🎯
              </motion.div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-semibold tracking-wider uppercase">Success Rate</p>
              <motion.p
                key={stats?.successProbability}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl font-black text-blue-500 dark:text-blue-400 mb-2"
              >
                {stats?.successProbability || 0}%
              </motion.p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse" />
                interview ready
              </div>
            </div>
          </motion.div>

          {/* XP Card */}
          <motion.div
            variants={statsCardVariants}
            whileHover="hover"
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-500" />
            <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-gray-700/50 group-hover:border-purple-500/50 transition-all duration-300 shadow-2xl">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-6xl mb-4"
              >
                ⭐
              </motion.div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-semibold tracking-wider uppercase">Total XP</p>
              <motion.p
                key={stats?.xp}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl font-black text-purple-500 dark:text-purple-400 mb-2"
              >
                {stats?.xp || 0}
              </motion.p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                <span className="w-1.5 h-1.5 bg-purple-500 dark:bg-purple-400 rounded-full animate-pulse" />
                Level {stats?.level || 1}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Difficulty Breakdown with Animated Bars */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900/70 dark:to-gray-800/70 backdrop-blur-xl rounded-3xl p-10 border border-gray-200 dark:border-gray-700/50 mb-16 shadow-2xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="text-5xl">📊</div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Difficulty Breakdown
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Track your progress across all levels</p>
            </div>
          </div>
          <div className="space-y-8">
            {/* Easy */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                  <span className="text-green-600 dark:text-green-400 font-bold text-lg">Easy</span>
                </div>
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-gray-700 dark:text-gray-300 font-bold text-lg"
                >
                  {stats?.breakdown?.Easy || 0} / 50
                </motion.span>
              </div>
              <div className="relative w-full bg-gray-200 dark:bg-gray-800/50 rounded-full h-5 overflow-hidden border border-gray-300 dark:border-gray-700/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((stats?.breakdown?.Easy || 0) / 50 * 100, 100)}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                  className="absolute h-full bg-linear-to-r from-green-500 to-emerald-400 rounded-full shadow-xl shadow-green-500/30"
                />
              </div>
            </div>

            {/* Medium */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse shadow-lg shadow-yellow-500/50" />
                  <span className="text-yellow-600 dark:text-yellow-400 font-bold text-lg">Medium</span>
                </div>
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-700 dark:text-gray-300 font-bold text-lg"
                >
                  {stats?.breakdown?.Medium || 0} / 75
                </motion.span>
              </div>
              <div className="relative w-full bg-gray-200 dark:bg-gray-800/50 rounded-full h-5 overflow-hidden border border-gray-300 dark:border-gray-700/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((stats?.breakdown?.Medium || 0) / 75 * 100, 100)}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
                  className="absolute h-full bg-linear-to-r from-yellow-500 to-amber-400 rounded-full shadow-xl shadow-yellow-500/30"
                />
              </div>
            </div>

            {/* Hard */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
                  <span className="text-red-600 dark:text-red-400 font-bold text-lg">Hard</span>
                </div>
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-700 dark:text-gray-300 font-bold text-lg"
                >
                  {stats?.breakdown?.Hard || 0} / 25
                </motion.span>
              </div>
              <div className="relative w-full bg-gray-200 dark:bg-gray-800/50 rounded-full h-5 overflow-hidden border border-gray-300 dark:border-gray-700/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((stats?.breakdown?.Hard || 0) / 25 * 100, 100)}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
                  className="absolute h-full bg-linear-to-r from-red-500 to-rose-400 rounded-full shadow-xl shadow-red-500/30"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Action Cards with Animations */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {/* Solve Problems Card */}
          <motion.a
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -8 }}
            whileTap={{ scale: 0.98 }}
            href="/problems"
            className="relative group overflow-hidden cursor-pointer block rounded-3xl shadow-2xl"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-indigo-600 to-indigo-700 dark:from-blue-600 dark:via-indigo-600 dark:to-indigo-700 rounded-3xl" />
            <div className="absolute inset-0 bg-linear-to-br from-blue-500 via-indigo-500 to-indigo-600 dark:from-blue-500 dark:via-indigo-500 dark:to-indigo-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Animated particles effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                className="w-full h-full"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                }}
              />
            </div>
            
            <div className="relative p-10">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-7xl mb-6"
              >
                💻
              </motion.div>
              <h3 className="text-4xl font-black mb-3 text-white">Solve Problems</h3>
              <p className="text-blue-100 dark:text-blue-100 text-lg mb-6 leading-relaxed">Browse 30+ coding challenges and level up your skills</p>
              
              <motion.div
                className="flex items-center gap-3 text-white font-bold text-lg"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Start Coding
                <motion.span
                  className="text-2xl"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.div>
            </div>
          </motion.a>

          {/* Recommendations Card */}
          <motion.a
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -8 }}
            whileTap={{ scale: 0.98 }}
            href="/recommendations"
            className="relative group overflow-hidden cursor-pointer block rounded-3xl shadow-2xl"
          >
            <div className="absolute inset-0 bg-linear-to-br from-purple-600 via-pink-600 to-pink-700 dark:from-purple-600 dark:via-pink-600 dark:to-pink-700 rounded-3xl" />
            <div className="absolute inset-0 bg-linear-to-br from-purple-500 via-pink-500 to-pink-600 dark:from-purple-500 dark:via-pink-500 dark:to-pink-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Animated particles effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                className="w-full h-full"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                }}
              />
            </div>
            
            <div className="relative p-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-7xl mb-6"
              >
                🎯
              </motion.div>
              <h3 className="text-4xl font-black mb-3 text-white">AI Recommendations</h3>
              <p className="text-purple-100 dark:text-purple-100 text-lg mb-6 leading-relaxed">Get personalized problem suggestions powered by AI</p>
              
              <motion.div
                className="flex items-center gap-3 text-white font-bold text-lg"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Get Suggestions
                <motion.span
                  className="text-2xl"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.div>
            </div>
          </motion.a>
        </motion.div>

        {/* Learning Modules Section */}
        <motion.div
          variants={itemVariants}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="text-5xl">📚</div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Learning Modules
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mt-1">Master everything from DSA to System Design</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* DSA Module */}
            <Link href="/modules/dsa">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl p-6 cursor-pointer shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="text-5xl mb-4">🧮</div>
                <h3 className="text-2xl font-bold text-white mb-2">DSA Mastery</h3>
                <p className="text-blue-100 text-sm mb-4">Arrays, Trees, Graphs, DP, and more</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-200 font-semibold">150+ Problems</span>
                  <span className="text-white text-xl">→</span>
                </div>
              </motion.div>
            </Link>

            {/* LLD Module */}
            <Link href="/modules/lld">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl p-6 cursor-pointer shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="text-5xl mb-4">🏗️</div>
                <h3 className="text-2xl font-bold text-white mb-2">Low Level Design</h3>
                <p className="text-purple-100 text-sm mb-4">Design patterns, SOLID principles</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-purple-200 font-semibold">25+ Case Studies</span>
                  <span className="text-white text-xl">→</span>
                </div>
              </motion.div>
            </Link>

            {/* OOPs Module */}
            <Link href="/modules/oops">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-linear-to-br from-green-500 to-green-600 rounded-2xl p-6 cursor-pointer shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-white mb-2">OOPs Concepts</h3>
                <p className="text-green-100 text-sm mb-4">Inheritance, Polymorphism, Abstraction</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-200 font-semibold">30+ Examples</span>
                  <span className="text-white text-xl">→</span>
                </div>
              </motion.div>
            </Link>

            {/* System Design Module */}
            <Link href="/modules/system-design">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl p-6 cursor-pointer shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="text-5xl mb-4">🏛️</div>
                <h3 className="text-2xl font-bold text-white mb-2">System Design</h3>
                <p className="text-orange-100 text-sm mb-4">Scalability, databases, microservices</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-orange-200 font-semibold">20+ Systems</span>
                  <span className="text-white text-xl">→</span>
                </div>
              </motion.div>
            </Link>

            {/* MERN Stack Module */}
            <Link href="/modules/mern-stack">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-linear-to-br from-teal-500 to-teal-600 rounded-2xl p-6 cursor-pointer shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="text-5xl mb-4">⚛️</div>
                <h3 className="text-2xl font-bold text-white mb-2">MERN Stack</h3>
                <p className="text-teal-100 text-sm mb-4">MongoDB, Express, React, Node.js</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-teal-200 font-semibold">10+ Projects</span>
                  <span className="text-white text-xl">→</span>
                </div>
              </motion.div>
            </Link>

            {/* CS Fundamentals Module */}
            <Link href="/modules/cs-fundamentals">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-linear-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 cursor-pointer shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="text-5xl mb-4">💡</div>
                <h3 className="text-2xl font-bold text-white mb-2">CS Fundamentals</h3>
                <p className="text-indigo-100 text-sm mb-4">OS, Networks, DBMS, Compilers</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-indigo-200 font-semibold">50+ Topics</span>
                  <span className="text-white text-xl">→</span>
                </div>
              </motion.div>
            </Link>

            {/* Java Spring Boot Module */}
            <Link href="/modules/java-spring-boot">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-linear-to-br from-red-500 to-red-600 rounded-2xl p-6 cursor-pointer shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="text-5xl mb-4">☕</div>
                <h3 className="text-2xl font-bold text-white mb-2">Java Spring Boot</h3>
                <p className="text-red-100 text-sm mb-4">REST APIs, Microservices, Security</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-red-200 font-semibold">15+ Projects</span>
                  <span className="text-white text-xl">→</span>
                </div>
              </motion.div>
            </Link>

            {/* AI Engineering Module */}
            <Link href="/modules/ai-engineering">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-linear-to-br from-pink-500 to-pink-600 rounded-2xl p-6 cursor-pointer shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="text-2xl font-bold text-white mb-2">AI Engineering</h3>
                <p className="text-pink-100 text-sm mb-4">ML, Deep Learning, LLMs, RAG</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-pink-200 font-semibold">40+ Algorithms</span>
                  <span className="text-white text-xl">→</span>
                </div>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
