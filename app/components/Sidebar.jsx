'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../lib/AuthContext';
import { useTheme } from '../lib/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

// Icons as SVG components for better performance
const Icons = {
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Problems: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  Progress: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Recommendations: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  Leaderboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  Profile: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Logout: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  Sun: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Moon: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Close: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  ChevronDown: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
  Fire: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 23c-3.866 0-7-3.134-7-7 0-3.866 3.134-7 7-7s7 3.134 7 7c0 3.866-3.134 7-7 7zm0-12c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0-8c-.552 0-1 .448-1 1v2c0 .552.448 1 1 1s1-.448 1-1V4c0-.552-.448-1-1-1z"/>
    </svg>
  ),
  Book: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
};

// Module icons mapping
const moduleIcons = {
  'dsa': '🧮',
  'system-design': '🏗️',
  'lld': '📐',
  'oops': '🎯',
  'cs-fundamentals': '💻',
  'mern-stack': '⚛️',
  'java-spring-boot': '☕',
  'ai-engineering': '🤖',
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showModulesDropdown, setShowModulesDropdown] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-dropdown')) {
        setShowUserDropdown(false);
      }
      if (!e.target.closest('.modules-dropdown')) {
        setShowModulesDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const isActive = (path) => pathname === path;

  const studentNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Icons.Dashboard },
    { name: 'Problems', href: '/problems', icon: Icons.Problems },
    { name: 'Progress', href: '/progress', icon: Icons.Progress },
    { name: 'Recommendations', href: '/recommendations', icon: Icons.Recommendations },
    { name: 'Leaderboard', href: '/leaderboard', icon: Icons.Leaderboard },
  ];

  const recruiterNavItems = [
    { name: 'Top Talent', href: '/leaderboard', icon: Icons.Leaderboard },
    { name: 'Profile', href: '/profile', icon: Icons.Profile },
  ];

  const modules = [
    { name: 'DSA', href: '/modules/dsa', icon: '🧮' },
    { name: 'System Design', href: '/modules/system-design', icon: '🏗️' },
    { name: 'LLD', href: '/modules/lld', icon: '📐' },
    { name: 'OOPs', href: '/modules/oops', icon: '🎯' },
    { name: 'CS Fundamentals', href: '/modules/cs-fundamentals', icon: '💻' },
    { name: 'MERN Stack', href: '/modules/mern-stack', icon: '⚛️' },
    { name: 'Java Spring Boot', href: '/modules/java-spring-boot', icon: '☕' },
    { name: 'AI Engineering', href: '/modules/ai-engineering', icon: '🤖' },
  ];

  const navItems = user?.role === 'recruiter' ? recruiterNavItems : studentNavItems;

  const sidebarContent = (
    <>
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            S
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text whitespace-nowrap overflow-hidden"
              >
                SkillForge.AI
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Streak Counter */}
      {user?.role !== 'recruiter' && (
        <div className={`p-4 ${isCollapsed ? 'px-2' : ''}`}>
          <div className={`bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-3 ${isCollapsed ? 'flex justify-center' : ''}`}>
            <div className={`flex items-center ${isCollapsed ? '' : 'gap-3'}`}>
              <div className="text-2xl">🔥</div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-gray-500 dark:text-gray-400">Current Streak</p>
                    <p className="text-lg font-bold text-orange-500">{user?.stats?.currentStreak || 0} days</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                active
                  ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.name : ''}
            >
              <Icon />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-medium whitespace-nowrap overflow-hidden"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}

        {/* Modules Dropdown - Only for students */}
        {user?.role !== 'recruiter' && (
          <div className="modules-dropdown relative pt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModulesDropdown(!showModulesDropdown);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? 'Modules' : ''}
            >
              <Icons.Book />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex-1 flex items-center justify-between overflow-hidden"
                  >
                    <span className="font-medium whitespace-nowrap">Modules</span>
                    <motion.div
                      animate={{ rotate: showModulesDropdown ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icons.ChevronDown />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {showModulesDropdown && !isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1 ml-4 space-y-1 overflow-hidden"
                >
                  {modules.map((module) => (
                    <Link
                      key={module.name}
                      href={module.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        isActive(module.href)
                          ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400'
                          : 'text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <span>{module.icon}</span>
                      <span>{module.name}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapsed modules popover */}
            {showModulesDropdown && isCollapsed && (
              <div className="absolute left-full top-0 ml-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl p-2 min-w-[180px] z-50">
                <p className="text-xs font-semibold text-gray-400 px-3 py-2">MODULES</p>
                {modules.map((module) => (
                  <Link
                    key={module.name}
                    href={module.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      isActive(module.href)
                        ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <span>{module.icon}</span>
                    <span>{module.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white ${isCollapsed ? 'justify-center' : ''}`}
          title={isCollapsed ? (theme === 'dark' ? 'Light Mode' : 'Dark Mode') : ''}
        >
          {theme === 'dark' ? <Icons.Sun /> : <Icons.Moon />}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="font-medium whitespace-nowrap overflow-hidden"
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* User Profile Dropdown */}
        <div className="user-dropdown relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowUserDropdown(!showUserDropdown);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800/50 ${isCollapsed ? 'justify-center' : ''}`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex-1 text-left overflow-hidden"
                >
                  <p className="font-medium text-gray-900 dark:text-white truncate text-sm">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    Level {user?.stats?.level || 1} • {user?.stats?.xp || 0} XP
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            {!isCollapsed && (
              <motion.div
                animate={{ rotate: showUserDropdown ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Icons.ChevronDown />
              </motion.div>
            )}
          </button>

          {/* User Dropdown Menu */}
          <AnimatePresence>
            {showUserDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className={`absolute ${isCollapsed ? 'left-full bottom-0 ml-2' : 'bottom-full left-0 mb-2 w-full'} bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl overflow-hidden z-50`}
              >
                <div className="p-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Icons.Profile />
                    <span className="text-sm font-medium">Profile</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Icons.Settings />
                    <span className="text-sm font-medium">Settings</span>
                  </Link>
                  <hr className="my-2 border-gray-200 dark:border-gray-800" />
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <Icons.Logout />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Collapse Toggle - Desktop Only */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex w-full items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white justify-center"
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? <Icons.ChevronRight /> : <Icons.ChevronLeft />}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header - Improved */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 z-40 px-3 flex items-center justify-between safe-area-top">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
            S
          </div>
          <span className="text-base font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            SkillForge
          </span>
        </Link>
        
        <div className="flex items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'dark' ? <Icons.Sun /> : <Icons.Moon />}
          </button>
          
          {/* Mobile Streak */}
          {user?.role !== 'recruiter' && (
            <div className="flex items-center gap-1 px-2 py-1.5 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <span className="text-base">🔥</span>
              <span className="text-sm font-bold text-orange-500">{user?.stats?.currentStreak || 0}</span>
            </div>
          )}
          
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
          >
            {isMobileOpen ? <Icons.Close /> : <Icons.Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar - Full Height Slide */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden fixed left-0 top-0 bottom-0 w-[280px] max-w-[85vw] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 flex flex-col safe-area-inset"
          >
            {/* Mobile Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setIsMobileOpen(false)}>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                  S
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                  SkillForge.AI
                </span>
              </Link>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Icons.Close />
              </button>
            </div>
            
            {/* Mobile User Profile - Top */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white truncate">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Level {user?.stats?.level || 1} • {user?.stats?.xp || 0} XP
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Streak Counter */}
            {user?.role !== 'recruiter' && (
              <div className="px-4 py-3">
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🔥</div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Current Streak</p>
                      <p className="text-lg font-bold text-orange-500">{user?.stats?.currentStreak || 0} days</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Navigation - Scrollable */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto overscroll-contain">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      active
                        ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 active:bg-gray-200 dark:active:bg-gray-700'
                    }`}
                  >
                    <Icon />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}

              {/* Mobile Modules Section */}
              {user?.role !== 'recruiter' && (
                <div className="pt-3">
                  <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Modules</p>
                  <div className="space-y-1">
                    {modules.map((module) => (
                      <Link
                        key={module.name}
                        href={module.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                          isActive(module.href)
                            ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400'
                            : 'text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800/50 active:bg-gray-200'
                        }`}
                      >
                        <span className="text-lg">{module.icon}</span>
                        <span className="text-sm font-medium">{module.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </nav>

            {/* Mobile Bottom Actions */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-1 bg-gray-50 dark:bg-gray-800/30">
              <Link
                href="/profile"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
              >
                <Icons.Profile />
                <span className="font-medium">Profile</span>
              </Link>
              <Link
                href="/settings"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
              >
                <Icons.Settings />
                <span className="font-medium">Settings</span>
              </Link>
              <button
                onClick={() => { logout(); setIsMobileOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
              >
                <Icons.Logout />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden md:flex fixed left-0 top-0 bottom-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-30 flex-col"
      >
        {sidebarContent}
      </motion.aside>

      {/* Content Spacer */}
      <div className={`hidden md:block transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-[280px]'}`} />
      <div className="md:hidden h-14" />
    </>
  );
}
