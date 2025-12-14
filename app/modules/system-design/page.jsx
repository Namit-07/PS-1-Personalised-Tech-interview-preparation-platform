'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const systemDesigns = [
  {
    id: 1,
    title: 'Design URL Shortener (TinyURL)',
    difficulty: 'Medium',
    concepts: ['Hashing', 'Database Design', 'Caching', 'Load Balancing'],
    scale: '1M requests/day'
  },
  {
    id: 2,
    title: 'Design Twitter/X',
    difficulty: 'Hard',
    concepts: ['Timeline', 'Followers', 'Fan-out', 'Push vs Pull'],
    scale: '100M users'
  },
  {
    id: 3,
    title: 'Design Instagram',
    difficulty: 'Hard',
    concepts: ['Image Storage', 'Feed Generation', 'CDN', 'Sharding'],
    scale: '500M daily active users'
  },
  {
    id: 4,
    title: 'Design Uber/Ola',
    difficulty: 'Hard',
    concepts: ['Real-time Matching', 'Location Services', 'ETA Calculation', 'Pricing'],
    scale: '1M concurrent rides'
  },
  {
    id: 5,
    title: 'Design WhatsApp',
    difficulty: 'Hard',
    concepts: ['WebSockets', 'Message Queue', 'End-to-End Encryption', 'Group Chat'],
    scale: '2B users'
  },
  {
    id: 6,
    title: 'Design Netflix',
    difficulty: 'Hard',
    concepts: ['Video Streaming', 'CDN', 'Recommendation Engine', 'Adaptive Bitrate'],
    scale: '200M subscribers'
  },
  {
    id: 7,
    title: 'Design YouTube',
    difficulty: 'Hard',
    concepts: ['Video Upload', 'Transcoding', 'CDN', 'Search', 'Comments'],
    scale: '1B+ videos'
  },
  {
    id: 8,
    title: 'Design Google Drive',
    difficulty: 'Hard',
    concepts: ['File Storage', 'Sync', 'Sharing', 'Versioning', 'Chunking'],
    scale: '1B+ users'
  }
];

const fundamentals = [
  {
    category: 'Scalability',
    topics: ['Horizontal vs Vertical Scaling', 'Load Balancing', 'Replication', 'Sharding', 'Partitioning']
  },
  {
    category: 'Databases',
    topics: ['SQL vs NoSQL', 'ACID Properties', 'CAP Theorem', 'Indexing', 'Normalization']
  },
  {
    category: 'Caching',
    topics: ['Cache Strategies (Write-through, Write-back)', 'CDN', 'Redis', 'Memcached', 'Cache Invalidation']
  },
  {
    category: 'Communication',
    topics: ['REST APIs', 'GraphQL', 'WebSockets', 'gRPC', 'Message Queues (Kafka, RabbitMQ)']
  },
  {
    category: 'Architecture',
    topics: ['Microservices', 'Monolith', 'Service Discovery', 'API Gateway', 'Event-Driven']
  }
];

export default function SystemDesignPage() {
  const [selectedSystem, setSelectedSystem] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-950 dark:via-orange-950 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-7xl">🏛️</span>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">System Design</h1>
              <p className="text-xl text-gray-400">Design scalable, distributed systems like a pro</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-orange-900/30 backdrop-blur border border-orange-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-orange-400">20+</p>
              <p className="text-sm text-gray-400 mt-1">System Designs</p>
            </div>
            <div className="bg-red-900/30 backdrop-blur border border-red-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-red-400">50+</p>
              <p className="text-sm text-gray-400 mt-1">Concepts</p>
            </div>
            <div className="bg-yellow-900/30 backdrop-blur border border-yellow-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-yellow-400">100M+</p>
              <p className="text-sm text-gray-400 mt-1">Scale Users</p>
            </div>
            <div className="bg-purple-900/30 backdrop-blur border border-purple-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-purple-400">CAP</p>
              <p className="text-sm text-gray-400 mt-1">Theorem</p>
            </div>
          </div>
        </motion.div>

        {/* Fundamentals */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">🔧 Core Fundamentals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundamentals.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-900/50 backdrop-blur border border-gray-800 hover:border-orange-500/50 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-orange-400 mb-4">{section.category}</h3>
                <div className="space-y-2">
                  {section.topics.map((topic, tidx) => (
                    <div key={tidx} className="flex items-center gap-2 text-gray-300">
                      <span className="text-orange-500">✓</span>
                      <span className="text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* System Design Case Studies */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">🎯 Real-World System Designs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {systemDesigns.map((system, idx) => (
              <motion.div
                key={system.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gray-900/50 backdrop-blur border border-gray-800 hover:border-orange-500/50 rounded-2xl p-6 cursor-pointer"
                onClick={() => setSelectedSystem(selectedSystem === system.id ? null : system.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{system.title}</h3>
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    system.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {system.difficulty}
                  </span>
                </div>
                
                <div className="mb-3">
                  <span className="text-orange-400 font-semibold">Scale: </span>
                  <span className="text-gray-300">{system.scale}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {system.concepts.map((concept, cidx) => (
                    <span key={cidx} className="px-3 py-1 bg-orange-600/20 text-orange-300 rounded-lg text-sm">
                      {concept}
                    </span>
                  ))}
                </div>

                {selectedSystem === system.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-4 border-t border-gray-800"
                  >
                    <button className="w-full py-3 bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold rounded-xl">
                      View Complete Design & Diagrams →
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interview Framework */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-linear-to-r from-orange-900/30 to-red-900/30 backdrop-blur border border-orange-800/50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">📋 System Design Interview Framework</h2>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Clarify Requirements', time: '5 min', description: 'Functional & Non-functional requirements' },
              { step: 2, title: 'Back-of-envelope Estimation', time: '5 min', description: 'Traffic, storage, bandwidth calculations' },
              { step: 3, title: 'High-Level Design', time: '10 min', description: 'Draw system architecture diagram' },
              { step: 4, title: 'Deep Dive', time: '15 min', description: 'Discuss specific components in detail' },
              { step: 5, title: 'Identify Bottlenecks', time: '5 min', description: 'Scalability, SPOF, trade-offs' }
            ].map((phase) => (
              <div key={phase.step} className="bg-gray-800/50 rounded-xl p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-600 to-red-600 flex items-center justify-center text-white font-bold shrink-0">
                  {phase.step}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white">{phase.title}</h3>
                    <span className="text-sm text-orange-400">{phase.time}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
