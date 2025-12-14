'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { problemsAPI, progressAPI } from '../lib/api';
import { motion } from 'framer-motion';

export default function RecommendationsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [topics, setTopics] = useState([]);
  const [basedOn, setBasedOn] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const [recsRes, topicsRes] = await Promise.all([
        problemsAPI.getRecommended(),
        progressAPI.getTopics()
      ]);

      console.log('Recommendations response:', recsRes);
      setRecommendations(recsRes.problems || recsRes || []);
      setBasedOn(recsRes.basedOn || null);
      setInsights(recsRes.insights || null);
      setTopics(topicsRes.data?.proficiencies || topicsRes?.proficiencies || []);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-500/30 rounded-full"></div>
              <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-6 text-lg">Curating your personalized journey...</p>
          </div>
        </div>
      </div>
    );
  }

  const weakTopics = Array.isArray(topics) 
    ? topics.filter(t => (t.proficiencyScore || 0) < 60).slice(0, 3)
    : [];
  
  // Filter recommendations
  const filteredRecommendations = recommendations.filter(problem => {
    const difficultyMatch = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
    const topicMatch = selectedTopic === 'All' || problem.topics.includes(selectedTopic);
    return difficultyMatch && topicMatch;
  });

  // Get all unique topics from recommendations
  const allTopics = [...new Set(recommendations.flatMap(p => p.topics))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Hero Header with Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold mb-3 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Your Learning Path
              </h1>
              <p className="text-xl text-gray-400">Curated problems matching your goals</p>
            </div>
            <div className="hidden md:flex gap-4">
              <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl px-6 py-4 text-center">
                <p className="text-3xl font-bold text-blue-400">{recommendations.length}</p>
                <p className="text-sm text-gray-500">Problems</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl px-6 py-4 text-center">
                <p className="text-3xl font-bold text-green-400">
                  {recommendations.filter(p => p.difficulty === 'Easy').length}
                </p>
                <p className="text-sm text-gray-500">Easy</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl px-6 py-4 text-center">
                <p className="text-3xl font-bold text-yellow-400">
                  {recommendations.filter(p => p.difficulty === 'Medium').length}
                </p>
                <p className="text-sm text-gray-500">Medium</p>
              </div>
              <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl px-6 py-4 text-center">
                <p className="text-3xl font-bold text-red-400">
                  {recommendations.filter(p => p.difficulty === 'Hard').length}
                </p>
                <p className="text-sm text-gray-500">Hard</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Insights Panel - NEW */}
        {insights && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-8 bg-gradient-to-r from-emerald-900/20 via-teal-900/20 to-cyan-900/20 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <span className="text-xl">🧠</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">AI Insights</h2>
                <p className="text-gray-400 text-sm">Based on your performance analysis</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Weak Topics */}
              {insights.weakTopics && Array.isArray(insights.weakTopics) && insights.weakTopics.length > 0 && (
                <div className="bg-red-900/20 rounded-xl p-4 border border-red-500/30">
                  <p className="text-sm text-red-400 font-semibold mb-2">📉 Needs Improvement</p>
                  <div className="flex flex-wrap gap-1">
                    {insights.weakTopics.map((topic, index) => (
                      <span key={typeof topic === 'string' ? topic : index} className="px-2 py-1 bg-red-500/20 text-red-300 rounded-lg text-xs">
                        {typeof topic === 'string' ? topic : topic?.topicName || topic?.name || 'Unknown'}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Strong Topics */}
              {insights.strongTopics && Array.isArray(insights.strongTopics) && insights.strongTopics.length > 0 && (
                <div className="bg-green-900/20 rounded-xl p-4 border border-green-500/30">
                  <p className="text-sm text-green-400 font-semibold mb-2">💪 Your Strengths</p>
                  <div className="flex flex-wrap gap-1">
                    {insights.strongTopics.map((topic, index) => (
                      <span key={typeof topic === 'string' ? topic : index} className="px-2 py-1 bg-green-500/20 text-green-300 rounded-lg text-xs">
                        {typeof topic === 'string' ? topic : topic?.topicName || topic?.name || 'Unknown'}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Next Milestone */}
              <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-500/30">
                <p className="text-sm text-blue-400 font-semibold mb-2">🎯 Next Milestone</p>
                <p className="text-blue-200 text-sm">{String(insights.nextMilestone || 'Keep solving problems!')}</p>
              </div>
            </div>

            {/* Improvement Tip */}
            {insights.improvementAreas && (
              <div className="mt-4 p-3 bg-amber-900/20 rounded-xl border border-amber-500/30">
                <p className="text-amber-300 text-sm flex items-center gap-2">
                  <span>💡</span>
                  {String(insights.improvementAreas)}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Personalization Banner - Modern Glassmorphism */}
        {basedOn && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 bg-linear-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Your Profile</h2>
                <p className="text-gray-400 text-sm">Problems tailored to your preferences</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Target Companies */}
              {basedOn.targetCompanies && basedOn.targetCompanies.length > 0 && (
                <div className="bg-gray-900/40 backdrop-blur rounded-2xl p-5 border border-gray-800/50">
                  <p className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                    <span className="text-lg">🎯</span>
                    <span className="font-semibold">Target Companies</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {basedOn.targetCompanies.map(company => (
                      <span key={company} className="px-4 py-2 bg-linear-to-r from-blue-600/50 to-blue-500/50 text-blue-200 rounded-xl text-sm font-medium border border-blue-500/30">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Practice Topics */}
              {basedOn.practiceTopics && basedOn.practiceTopics.length > 0 && (
                <div className="bg-gray-900/40 backdrop-blur rounded-2xl p-5 border border-gray-800/50">
                  <p className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                    <span className="text-lg">📚</span>
                    <span className="font-semibold">Focus Topics</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {basedOn.practiceTopics.map(topic => (
                      <span key={topic} className="px-4 py-2 bg-linear-to-r from-purple-600/50 to-purple-500/50 text-purple-200 rounded-xl text-sm font-medium border border-purple-500/30">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Level */}
              {basedOn.experienceLevel && basedOn.experienceLevel !== 'Not set' && (
                <div className="bg-gray-900/40 backdrop-blur rounded-2xl p-5 border border-gray-800/50">
                  <p className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                    <span className="text-lg">💪</span>
                    <span className="font-semibold">Experience Level</span>
                  </p>
                  <span className="px-4 py-2 bg-linear-to-r from-green-600/50 to-green-500/50 text-green-200 rounded-xl text-sm font-medium border border-green-500/30 inline-block">
                    {basedOn.experienceLevel}
                  </span>
                </div>
              )}

              {/* Domain */}
              {basedOn.domain && basedOn.domain !== 'Not set' && (
                <div className="bg-gray-900/40 backdrop-blur rounded-2xl p-5 border border-gray-800/50">
                  <p className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                    <span className="text-lg">🌟</span>
                    <span className="font-semibold">Background</span>
                  </p>
                  <span className="px-4 py-2 bg-linear-to-r from-indigo-600/50 to-indigo-500/50 text-indigo-200 rounded-xl text-sm font-medium border border-indigo-500/30 inline-block">
                    {basedOn.domain}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Weak Topics Alert - Redesigned */}
        {weakTopics.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 bg-linear-to-r from-orange-900/20 to-red-900/20 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-8 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Boost These Skills</h2>
                <p className="text-gray-400 text-sm">Areas that need your attention</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {weakTopics.map(topic => (
                <div 
                  key={topic._id}
                  className="bg-gray-900/40 backdrop-blur rounded-2xl p-5 border border-orange-500/30 hover:border-orange-500/50 transition-all"
                >
                  <p className="font-semibold text-lg mb-2">{topic.topic || topic.topicName || 'Unknown'}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-linear-to-r from-orange-500 to-red-500 h-full rounded-full"
                        style={{ width: `${topic.proficiencyScore}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-orange-400 font-medium">{topic.proficiencyScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Filters - Modern Design */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 flex flex-wrap gap-4"
        >
          <div className="flex gap-2">
            <span className="text-gray-400 text-sm self-center">Filter:</span>
            {['All', 'Easy', 'Medium', 'Hard'].map(difficulty => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedDifficulty === difficulty
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                    : 'bg-gray-900/50 text-gray-400 hover:bg-gray-800 border border-gray-800'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-xl text-sm text-gray-300 focus:outline-none focus:border-purple-500 transition-all"
          >
            <option value="All">All Topics</option>
            {allTopics.sort().map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
          <div className="flex-1"></div>
          <div className="text-sm text-gray-500 self-center">
            Showing {filteredRecommendations.length} of {recommendations.length} problems
          </div>
        </motion.div>

        {/* Recommended Problems - Modern Card Design */}
        {filteredRecommendations.length > 0 ? (
          <div className="space-y-6">
            {filteredRecommendations.map((problem, index) => (
              <motion.div
                key={problem._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-gray-900/50 backdrop-blur border border-gray-800 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-2xl font-bold text-white">#{index + 1}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <a 
                          href={`/problems/${problem.slug}`}
                          className="text-2xl font-bold hover:text-blue-400 transition-colors"
                        >
                          {problem.title}
                        </a>
                        <span className={`px-4 py-1.5 rounded-xl text-sm font-semibold ${
                          problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                          'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {problem.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-400 line-clamp-2 mb-4">
                        {problem.description}
                      </p>

                      {/* Topics Pills */}
                      <div className="flex flex-wrap gap-2">
                        {problem.topics && Array.isArray(problem.topics) && problem.topics.slice(0, 4).map((topic, idx) => (
                          <span
                            key={typeof topic === 'string' ? topic : idx}
                            className="px-3 py-1.5 bg-gray-800/50 text-gray-300 rounded-lg text-xs font-medium border border-gray-700 hover:border-gray-600 transition-colors"
                          >
                            {typeof topic === 'string' ? topic : String(topic)}
                          </span>
                        ))}
                        {problem.topics && problem.topics.length > 4 && (
                          <span className="px-3 py-1.5 bg-gray-800/50 text-gray-400 rounded-lg text-xs">
                            +{problem.topics.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Why Recommended - Highlighted */}
                  <div className="bg-linear-to-r from-blue-950/40 to-purple-950/40 border border-blue-800/30 rounded-2xl p-5 mb-6">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💡</span>
                      <div>
                        <p className="text-sm font-semibold text-blue-300 mb-1">Why This Problem?</p>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {problem.recommendReason ? String(problem.recommendReason) : (() => {
                            const problemTopics = Array.isArray(problem.topics) ? problem.topics : [];
                            const matchedTopics = problemTopics.filter(topic => 
                              basedOn?.practiceTopics?.includes(topic)
                            );
                            const matchedCompanies = problem.companies?.filter(company =>
                              basedOn?.targetCompanies?.includes(company)
                            );

                            if (matchedTopics.length > 0 && matchedCompanies && matchedCompanies.length > 0) {
                              return `Covers ${matchedTopics[0]} (your focus) and frequently asked by ${matchedCompanies[0]} 🎯`;
                            } else if (matchedTopics.length > 0) {
                              return `Strengthens ${matchedTopics.join(', ')} - your practice topics 📚`;
                            } else if (matchedCompanies && matchedCompanies.length > 0) {
                              return `Asked by ${matchedCompanies.join(', ')} - your target ${matchedCompanies.length > 1 ? 'companies' : 'company'} 🏢`;
                            } else if (weakTopics.some(t => problemTopics.includes(t.topic || t.topicName))) {
                              const weakTopic = problemTopics.find(topic => 
                                weakTopics.some(wt => (wt.topic || wt.topicName) === topic)
                              );
                              return `Helps improve ${weakTopic} - an area that needs attention 💪`;
                            } else {
                              return `Perfectly matched to your ${basedOn?.experienceLevel || 'experience'} level 🚀`;
                            }
                          })()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Learning Resources - Redesigned */}
                  {problem.learningResources && (
                    problem.learningResources.videos?.length > 0 || 
                    problem.learningResources.articles?.length > 0 ||
                    problem.learningResources.documentation?.length > 0
                  ) && (
                    <div className="bg-linear-to-r from-purple-950/40 to-pink-950/40 border border-purple-800/30 rounded-2xl p-6 mb-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">🎓</span>
                        <p className="font-bold text-purple-300">Learn First, Then Solve</p>
                      </div>
                      
                      <div className="space-y-4">
                        {/* Video Tutorials */}
                        {problem.learningResources.videos && problem.learningResources.videos.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-gray-400 mb-3 flex items-center gap-2">
                              <span>📺</span>
                              <span>Video Tutorials</span>
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {problem.learningResources.videos.slice(0, 2).map((video, idx) => (
                                <a
                                  key={idx}
                                  href={video.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="group/video bg-purple-900/20 hover:bg-purple-900/40 rounded-xl p-4 transition-all border border-purple-800/20 hover:border-purple-600/50"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm text-purple-200 font-medium mb-1 line-clamp-1 group-hover/video:text-purple-100">
                                        {video.title}
                                      </p>
                                      <p className="text-xs text-gray-400">{video.channel} • {video.duration}</p>
                                    </div>
                                    <span className="text-purple-400 group-hover/video:translate-x-1 transition-transform shrink-0">→</span>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Articles */}
                        {problem.learningResources.articles && problem.learningResources.articles.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-gray-400 mb-3 flex items-center gap-2">
                              <span>📖</span>
                              <span>Articles & Guides</span>
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {problem.learningResources.articles.slice(0, 3).map((article, idx) => (
                                <a
                                  key={idx}
                                  href={article.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="group/article inline-flex items-center gap-2 px-4 py-2 bg-pink-900/20 hover:bg-pink-900/40 text-pink-200 hover:text-pink-100 rounded-lg text-xs font-medium transition-all border border-pink-800/20 hover:border-pink-600/50"
                                >
                                  <span className="truncate max-w-[200px]">{article.title}</span>
                                  <span className="text-pink-400 group-hover/article:translate-x-1 transition-transform">→</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Documentation */}
                        {problem.learningResources.documentation && problem.learningResources.documentation.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-gray-400 mb-3 flex items-center gap-2">
                              <span>📚</span>
                              <span>Documentation</span>
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {problem.learningResources.documentation.slice(0, 2).map((doc, idx) => (
                                <a
                                  key={idx}
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="group/doc inline-flex items-center gap-2 px-4 py-2 bg-indigo-900/20 hover:bg-indigo-900/40 text-indigo-200 hover:text-indigo-100 rounded-lg text-xs font-medium transition-all border border-indigo-800/20 hover:border-indigo-600/50"
                                  title={doc.description}
                                >
                                  <span className="truncate max-w-[200px]">{doc.title}</span>
                                  <span className="text-indigo-400 group-hover/doc:translate-x-1 transition-transform">→</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Companies */}
                  {problem.companies && problem.companies.length > 0 && (
                    <div className="flex items-center gap-3 text-sm pt-4 border-t border-gray-800">
                      <span className="text-gray-500">🏢 Asked by:</span>
                      <div className="flex flex-wrap gap-2">
                        {problem.companies.slice(0, 6).map(company => (
                          <span 
                            key={company} 
                            className={`px-3 py-1 rounded-lg text-xs font-medium ${
                              basedOn?.targetCompanies?.includes(company)
                                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                                : 'bg-gray-800/50 text-gray-400'
                            }`}
                          >
                            {company}
                          </span>
                        ))}
                        {problem.companies.length > 6 && (
                          <span className="px-3 py-1 bg-gray-800/50 text-gray-500 rounded-lg text-xs">
                            +{problem.companies.length - 6}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <a
                    href={`/problems/${problem.slug}`}
                    className="mt-6 w-full block text-center px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Start Solving →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 bg-linear-to-br from-blue-600/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-6xl">🎯</span>
            </div>
            <h2 className="text-3xl font-bold mb-3">No Problems Match Your Filters</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Try adjusting your filters or browse all problems to find what you're looking for
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => {
                  setSelectedDifficulty('All');
                  setSelectedTopic('All');
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium"
              >
                Reset Filters
              </button>
              <a 
                href="/problems"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors font-medium"
              >
                Browse All Problems
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
