'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                SF
              </div>
              <span className="text-xl font-bold text-slate-800 dark:text-white">
                SkillForge<span className="text-blue-600">.AI</span>
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <Link href="/login">
                <button className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                  Sign In
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-5 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm">
                  Get Started Free
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-blue-100 dark:bg-blue-900/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-purple-100 dark:bg-purple-900/20 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">AI-Powered Learning Platform</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6"
            >
              Master Technical Interviews
              <br />
              <span className="text-blue-600">With AI Coaching</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10"
            >
              Personalized learning paths, intelligent hints, and real-time progress tracking. 
              Everything you need to ace your next technical interview.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/signup">
                <button className="px-8 py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
                  Start Learning Free
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
              <Link href="/login">
                <button className="px-8 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  Sign In
                </button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
            >
              {[
                { label: 'Problems', value: '500+', icon: '📊' },
                { label: 'Learning Paths', value: '8', icon: '🎯' },
                { label: 'AI Powered', value: '100%', icon: '🤖' },
                { label: 'Active Learners', value: '1000+', icon: '👥' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-slate-800/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Comprehensive tools and features designed to accelerate your interview preparation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'AI-Powered Hints',
                desc: 'Get intelligent hints when you\'re stuck without giving away the solution',
                icon: '🤖',
                color: 'blue',
              },
              {
                title: 'Smart Recommendations',
                desc: 'Personalized problem suggestions based on your progress and weak areas',
                icon: '🎯',
                color: 'purple',
              },
              {
                title: 'Progress Analytics',
                desc: 'Detailed insights into your performance and improvement over time',
                icon: '📊',
                color: 'green',
              },
              {
                title: '8 Learning Paths',
                desc: 'DSA, System Design, LLD, OOP, CS Fundamentals, MERN, Java Spring, AI/ML',
                icon: '📚',
                color: 'orange',
              },
              {
                title: 'Adaptive Learning',
                desc: 'Learning journey tailored to your skill level and career goals',
                icon: '🗺️',
                color: 'pink',
              },
              {
                title: 'Streak Tracking',
                desc: 'Stay motivated with daily streaks and achievement milestones',
                icon: '🔥',
                color: 'amber',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of developers who have improved their interview skills with our AI-powered platform
            </p>
            <Link href="/signup">
              <button className="px-8 py-3.5 rounded-xl bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                Get Started Free
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-xs">
                SF
              </div>
              <span className="font-semibold text-slate-800 dark:text-white">SkillForge.AI</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © 2025 SkillForge.AI - Built for Technical Interview Success
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
