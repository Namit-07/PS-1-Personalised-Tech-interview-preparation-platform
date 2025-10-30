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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Optimized Background */}
      <div className="fixed inset-0 z-0">
        {/* Static mesh grid - no animation */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(59, 130, 246, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(59, 130, 246, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)'
          }}
        />
        
        {/* Static gradient orbs - reduced blur for performance */}
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-pink-500/15 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-gray-800/50 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="text-2xl font-black"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                SkillForge.AI
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-4"
            >
              <Link href="/login">
                <button className="px-6 py-2 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors">
                  Log In
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-colors">
                  Sign Up Free
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center space-y-8">
          {/* Online Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/50 border border-gray-800"
          >
            <motion.div 
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-gray-300">AI-Powered Learning Platform</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Your Personal
              <br />
              AI Interview
              <br />
              Coach
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Master technical interviews with AI-powered hints, personalized learning paths, 
            and real-time success predictions. From DSA to System Design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center pt-4"
          >
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-bold flex items-center gap-2 shadow-2xl shadow-purple-500/30"
              >
                Start Free Today 🚀
              </motion.button>
            </Link>
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-xl bg-gray-900 border border-gray-800 text-lg font-bold hover:border-gray-700"
              >
                Log In
              </motion.button>
            </Link>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 max-w-4xl mx-auto"
          >
            {[
              { label: 'Problems', value: '500+', icon: '💡' },
              { label: 'Topics', value: '15+', icon: '📚' },
              { label: 'AI Powered', value: '100%', icon: '🤖' },
              { label: 'Available', value: '24/7', icon: '⚡' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Everything You Need
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            to ace your next technical interview
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'AI-Powered Hints',
              desc: 'Get intelligent hints when you are stuck without giving away the solution',
              gradient: 'from-blue-500 to-cyan-500',
              icon: '🤖',
            },
            {
              title: 'Smart Recommendations',
              desc: 'Personalized problem suggestions based on your progress and weak areas',
              gradient: 'from-purple-500 to-pink-500',
              icon: '🎯',
            },
            {
              title: 'Success Probability',
              desc: 'Real-time predictions of your interview success based on your performance',
              gradient: 'from-orange-500 to-red-500',
              icon: '📊',
            },
            {
              title: '8 Learning Modules',
              desc: 'DSA, System Design, LLD, OOP, CS Fundamentals, MERN, Java Spring Boot, AI Engineering',
              gradient: 'from-green-500 to-emerald-500',
              icon: '📚',
            },
            {
              title: 'Personalized Path',
              desc: 'Adaptive learning journey tailored to your skill level and goals',
              gradient: 'from-pink-500 to-rose-500',
              icon: '🗺️',
            },
            {
              title: 'Real-Time Progress',
              desc: 'Track your improvement with detailed analytics and insights',
              gradient: 'from-indigo-500 to-purple-500',
              icon: '📈',
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-gray-700 transition-colors h-full">
                {/* Reduced glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity -z-10`} />
                
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${feature.gradient} text-transparent bg-clip-text`}>
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity" />
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Ready to Start Your Journey?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who have improved their interview skills with AI-powered coaching
            </p>
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-xl font-bold shadow-2xl shadow-purple-500/30"
              >
                Get Started Free 🚀
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-gray-800/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-gray-500">
            <p>© 2025 SkillForger.AI - Powered by TearHackX</p>
          </div>
        </div>
      </div>
    </div>
  );
}
