'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { useTheme } from '../lib/ThemeContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    streak: true,
    recommendations: true,
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black mb-2">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Settings
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your SkillForge.AI experience
          </p>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>🎨</span> Appearance
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred color scheme</p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-10 w-20 items-center rounded-full transition-colors ${
                    theme === 'dark' ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-flex h-8 w-8 transform items-center justify-center rounded-full bg-white shadow-lg transition-transform ${
                      theme === 'dark' ? 'translate-x-10' : 'translate-x-1'
                    }`}
                  >
                    {theme === 'dark' ? '🌙' : '☀️'}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>🔔</span> Notifications
            </h2>
            
            <div className="space-y-4">
              {[
                { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                { key: 'push', label: 'Push Notifications', desc: 'Browser notifications for reminders' },
                { key: 'streak', label: 'Streak Reminders', desc: 'Daily reminders to maintain your streak' },
                { key: 'recommendations', label: 'New Recommendations', desc: 'Notify when new problems are recommended' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(item.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications[item.key] ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
                        notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Account */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>👤</span> Account
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Email</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                  Change
                </button>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Password</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">••••••••</p>
                </div>
                <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                  Change
                </button>
              </div>
              
              <hr className="border-gray-200 dark:border-gray-800" />
              
              <div className="pt-2">
                <button className="text-red-500 hover:text-red-600 text-sm font-medium">
                  Delete Account
                </button>
              </div>
            </div>
          </motion.div>

          {/* Learning Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>📚</span> Learning Preferences
            </h2>
            
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-900 dark:text-white mb-2">Daily Goal</p>
                <div className="flex gap-2">
                  {['1 problem', '2 problems', '3 problems', '5 problems'].map((goal) => (
                    <button
                      key={goal}
                      className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="font-medium text-gray-900 dark:text-white mb-2">Preferred Difficulty</p>
                <div className="flex gap-2">
                  {['Easy', 'Medium', 'Hard', 'Mixed'].map((diff) => (
                    <button
                      key={diff}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        diff === 'Mixed'
                          ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
