'use client';

import { useAuth } from '../lib/AuthContext';
import { useTheme } from '../lib/ThemeContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              SkillForge.AI 
            </h1>
            <div className="hidden md:flex space-x-6">
              {/* Show different navigation based on user role */}
              {user?.role === 'recruiter' ? (
                // Recruiter Navigation - Only Leaderboard
                <>
                  <a 
                    href="/leaderboard" 
                    className={`font-semibold transition-colors ${
                      isActive('/leaderboard') 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    🏆 Top Performers
                  </a>
                  <a 
                    href="/profile" 
                    className={`font-semibold transition-colors ${
                      isActive('/profile') 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Profile
                  </a>
                </>
              ) : (
                // Student Navigation - Full Learning Platform
                <>
                  <a 
                    href="/dashboard" 
                    className={`font-semibold transition-colors ${
                      isActive('/dashboard') 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Dashboard
                  </a>
                  <a 
                    href="/problems" 
                    className={`font-semibold transition-colors ${
                      isActive('/problems') 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Problems
                  </a>
                  <a 
                    href="/progress" 
                    className={`font-semibold transition-colors ${
                      isActive('/progress') 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Progress
                  </a>
                  <a 
                    href="/recommendations" 
                    className={`font-semibold transition-colors ${
                      isActive('/recommendations') 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Recommendations
                  </a>
                  <a 
                    href="/leaderboard" 
                    className={`font-semibold transition-colors ${
                      isActive('/leaderboard') 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    🏆 Leaderboard
                  </a>
                  <a 
                    href="/profile" 
                    className={`font-semibold transition-colors ${
                      isActive('/profile') 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Profile
                  </a>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <span className="text-2xl">☀️</span>
              ) : (
                <span className="text-2xl">🌙</span>
              )}
            </button>
            {user?.role && (
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                user.role === 'recruiter' 
                  ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' 
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
              }`}>
                {user.role === 'recruiter' ? '💼 Recruiter' : '🎓 Student'}
              </span>
            )}
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {user?.name}
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
