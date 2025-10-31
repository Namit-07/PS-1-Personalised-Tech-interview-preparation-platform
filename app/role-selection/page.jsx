'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '../lib/AuthContext';
import OnboardingWizard from '../components/OnboardingWizard';

export default function RoleSelectionPage() {
  const router = useRouter();
  const { updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userName, setUserName] = useState('');

  const handleRoleSelect = async (role) => {
    console.log('🎯 Role selected:', role);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      console.log('📡 Sending role to API:', API_URL);
      
      // Save role to user profile
      const response = await fetch(`${API_URL}/auth/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Role saved, user data:', data.user);
        
        // Update localStorage with the new user data including role
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          updateUser(data.user); // Update AuthContext
          setUserName(data.user.name);
        }
        
        // Show onboarding for students, redirect recruiters to leaderboard
        if (role === 'student') {
          console.log('🎓 Student role detected - showing onboarding wizard');
          setShowOnboarding(true);
          setLoading(false);
        } else {
          console.log('💼 Recruiter role detected - redirecting to leaderboard');
          router.push('/leaderboard'); // Recruiters see leaderboard
        }
      } else {
        console.error('❌ Failed to save role:', response.status);
        alert('Error setting role. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('❌ Error setting role:', error);
      alert('Error setting role. Please try again.');
      setLoading(false);
    }
  };

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
        // Update user in context and localStorage
        if (data.user) {
          updateUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        router.push('/dashboard');
      } else {
        alert('Failed to complete onboarding. Please try again.');
      }
    } catch (error) {
      console.error('Onboarding error:', error);
      alert('Failed to complete onboarding. Please try again.');
    }
  };

  // Show onboarding wizard for students
  if (showOnboarding) {
    return <OnboardingWizard onComplete={handleOnboardingComplete} userName={userName} />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-w-5xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold mb-4"
          >
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              TechPrepAI
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Choose your role to get started
          </motion.p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Student Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => !loading && handleRoleSelect('student')}
            className="group relative bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-3xl p-8 border-2 border-blue-700 hover:border-blue-500 transition-all cursor-pointer transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl mb-6 transform group-hover:rotate-12 transition-transform">
                🎓
              </div>
              
              <h2 className="text-3xl font-bold mb-4">I'm a Student</h2>
              
              <p className="text-gray-300 mb-6">
                Prepare for technical interviews with personalized learning paths, practice problems, and AI-powered recommendations.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">Personalized learning paths</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">Practice coding problems</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">Track your progress & streaks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">AI-powered recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">Compete on leaderboard</span>
                </li>
              </ul>
              
              <button
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg transition-all disabled:opacity-50"
              >
                {loading ? 'Setting up...' : 'Continue as Student'}
              </button>
            </div>
          </motion.div>

          {/* Recruiter Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => !loading && handleRoleSelect('recruiter')}
            className="group relative bg-gradient-to-br from-orange-900/50 to-yellow-900/50 rounded-3xl p-8 border-2 border-orange-700 hover:border-orange-500 transition-all cursor-pointer transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-yellow-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-4xl mb-6 transform group-hover:rotate-12 transition-transform">
                💼
              </div>
              
              <h2 className="text-3xl font-bold mb-4">I'm a Recruiter</h2>
              
              <p className="text-gray-300 mb-6">
                Discover top talent actively preparing for technical roles. Connect with verified candidates based on their performance.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">Browse top performers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">View verified skills & activity</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">Filter by percentile rankings</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">Direct contact with candidates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <span className="text-gray-300">Access to GitHub & LinkedIn</span>
                </li>
              </ul>
              
              <button
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white rounded-xl font-bold text-lg transition-all disabled:opacity-50"
              >
                {loading ? 'Setting up...' : 'Continue as Recruiter'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 mt-12"
        >
          You can change your role anytime in settings
        </motion.p>
      </motion.div>
    </div>
  );
}
