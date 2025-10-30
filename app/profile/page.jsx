'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function ProfilePage() {
  const { user, updateUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    headline: '',
    summary: '',
    location: '',
    company: '',
    position: '',
    experience: '',
    skills: [],
    linkedin: '',
    github: '',
    portfolio: ''
  });

  useEffect(() => {
    // Wait for auth to load before checking user
    if (authLoading) return;
    
    if (!user) {
      router.push('/login');
      return;
    }

    // Fetch fresh user data from backend
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const userData = data.user;
          
          // Update form with fresh data from backend
          setFormData({
            name: userData.name || '',
            email: userData.email || '',
            headline: userData.headline || '',
            summary: userData.summary || '',
            location: userData.location || '',
            company: userData.company || '',
            position: userData.position || '',
            experience: userData.experience || '',
            skills: userData.skills || [],
            linkedin: userData.linkedin || '',
            github: userData.github || '',
            portfolio: userData.portfolio || ''
          });

          // Update context with fresh data
          updateUser(userData);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Fallback to context user data
        setFormData({
          name: user.name || '',
          email: user.email || '',
          headline: user.headline || '',
          summary: user.summary || '',
          location: user.location || '',
          company: user.company || '',
          position: user.position || '',
          experience: user.experience || '',
          skills: user.skills || [],
          linkedin: user.linkedin || '',
          github: user.github || '',
          portfolio: user.portfolio || ''
        });
      }
    };

    fetchUserProfile();

    // Check for LinkedIn OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const profileData = urlParams.get('data');
    const error = urlParams.get('error');

    if (error) {
      alert(`LinkedIn import failed: ${error}`);
      // Clean URL
      window.history.replaceState({}, '', '/profile');
    }

    if (success === 'true' && profileData) {
      try {
        const imported = JSON.parse(decodeURIComponent(profileData));
        setFormData(prev => ({
          ...prev,
          name: imported.name || prev.name,
          email: imported.email || prev.email,
          headline: imported.headline || prev.headline,
          summary: imported.summary || prev.summary,
          location: imported.location || prev.location,
          linkedin: imported.linkedin || prev.linkedin,
        }));
        setEditing(true);
        
        // Show helpful message about what was imported
        const importedFields = [];
        if (imported.name) importedFields.push('name');
        if (imported.email) importedFields.push('email');
        if (imported.linkedin) importedFields.push('LinkedIn URL');
        
        alert(`✅ LinkedIn profile imported successfully!\n\nImported: ${importedFields.join(', ')}\n\n⚠️ Note: Due to LinkedIn API limitations, headline, summary, company, and position must be added manually.\n\nTip: Open your LinkedIn profile in another tab and copy the information.`);
        
        // Clean URL
        window.history.replaceState({}, '', '/profile');
      } catch (err) {
        console.error('Failed to parse LinkedIn data:', err);
      }
    }
  }, [user, router, authLoading]);

  const handleLinkedInImport = () => {
    const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
    
    if (!clientId) {
      // Fallback to manual entry if OAuth not configured
      setShowLinkedInModal(true);
      return;
    }

    // Redirect to LinkedIn OAuth
    const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_REDIRECT_URI || 'http://localhost:3000/api/linkedin/callback');
    const scope = encodeURIComponent('openid profile email');
    const state = Math.random().toString(36).substring(7);
    
    sessionStorage.setItem('linkedin_oauth_state', state);
    
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
    
    window.location.href = authUrl;
  };

  const importFromLinkedIn = async () => {
    if (!linkedInUrl.trim()) {
      alert('Please enter your LinkedIn profile URL');
      return;
    }

    // Validate LinkedIn URL format
    if (!linkedInUrl.includes('linkedin.com/in/')) {
      alert('Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/yourname)');
      return;
    }

    setLoading(true);
    try {
      // Extract username from URL
      const username = linkedInUrl.split('/in/')[1]?.split('/')[0]?.split('?')[0];
      
      if (!username) {
        alert('Could not extract profile name from URL. Please check the URL format.');
        setLoading(false);
        return;
      }

      // For now, just set the LinkedIn URL and let user fill other details
      setFormData(prev => ({
        ...prev,
        linkedin: linkedInUrl,
        headline: prev.headline || 'Imported from LinkedIn',
        summary: prev.summary || `LinkedIn Profile: ${username}`
      }));
      
      setShowLinkedInModal(false);
      setLinkedInUrl('');
      setEditing(true);
      
      alert(`✅ LinkedIn URL imported! Please fill in your other details and click Save.`);
    } catch (error) {
      console.error('Import error:', error);
      alert('Error importing profile. Please enter your details manually.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
    setFormData(prev => ({ ...prev, skills }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        updateUser(data.user);
        // Update localStorage with fresh user data
        localStorage.setItem('user', JSON.stringify(data.user));
        setEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while auth is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        <div className="relative max-w-5xl mx-auto px-4 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Your Profile
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Manage your professional information and connect with LinkedIn
            </p>
          </motion.div>

          {/* LinkedIn Import Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#0077B5] flex items-center justify-center text-3xl">
                  💼
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Import from LinkedIn
                  </h3>
                  <p className="text-gray-400">
                    Automatically fill your profile with your LinkedIn data
                  </p>
                </div>
              </div>
              <button
                onClick={handleLinkedInImport}
                disabled={loading}
                className="px-8 py-4 bg-[#0077B5] hover:bg-[#006399] text-white rounded-xl font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connecting...' : 'Connect LinkedIn'}
              </button>
            </div>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Profile Information</h2>
              <button
                onClick={() => setEditing(!editing)}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all"
              >
                {editing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white opacity-50"
                  />
                </div>
              </div>

              {/* Headline */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">Professional Headline</label>
                <input
                  type="text"
                  name="headline"
                  value={formData.headline}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="e.g., Full Stack Developer | MERN Stack Specialist"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white disabled:opacity-50"
                />
              </div>

              {/* Summary */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">Professional Summary</label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  disabled={!editing}
                  rows="4"
                  placeholder="Tell us about your professional background..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white disabled:opacity-50"
                />
              </div>

              {/* Location & Company */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="e.g., San Francisco, CA"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Current Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="e.g., Google"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Position & Experience */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Current Position</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Years of Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="e.g., 5 years"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-gray-300 font-medium mb-2">Skills (comma separated)</label>
                <input
                  type="text"
                  value={formData.skills.join(', ')}
                  onChange={handleSkillsChange}
                  disabled={!editing}
                  placeholder="e.g., JavaScript, React, Node.js, MongoDB"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white disabled:opacity-50"
                />
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Social Links</h3>
                <div>
                  <label className="block text-gray-300 font-medium mb-2">LinkedIn Profile</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-2">GitHub Profile</label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="https://github.com/yourusername"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Portfolio Website</label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="https://yourportfolio.com"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Submit Button */}
              {editing && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* LinkedIn Import Modal */}
      {showLinkedInModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700 max-w-2xl w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#0077B5] flex items-center justify-center text-2xl">
                  💼
                </div>
                <h3 className="text-2xl font-bold text-white">Import from LinkedIn</h3>
              </div>
              <button
                onClick={() => setShowLinkedInModal(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 font-medium mb-3">
                  Enter your LinkedIn profile URL
                </label>
                <input
                  type="url"
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                  placeholder="https://www.linkedin.com/in/your-profile"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                />
                <p className="text-gray-500 text-sm mt-2">
                  Example: https://www.linkedin.com/in/johndoe
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <p className="text-blue-400 text-sm mb-3">
                  <span className="font-semibold">� How to use:</span>
                </p>
                <ol className="text-blue-400 text-sm space-y-2 ml-4 list-decimal">
                  <li>Paste your LinkedIn profile URL above</li>
                  <li>Click "Import Profile" to save the URL</li>
                  <li>Open your LinkedIn profile in another tab</li>
                  <li>Copy your information (headline, summary, etc.)</li>
                  <li>Paste it into the profile form fields</li>
                  <li>Click "Save Changes" when done</li>
                </ol>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowLinkedInModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={importFromLinkedIn}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-[#0077B5] hover:bg-[#006399] text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Importing...' : 'Import Profile'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
