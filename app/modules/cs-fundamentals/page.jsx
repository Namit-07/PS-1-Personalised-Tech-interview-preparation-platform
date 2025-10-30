'use client';

import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';

const csTopics = [
  {
    category: 'Operating Systems',
    icon: '💻',
    color: 'from-blue-600 to-blue-800',
    topics: [
      'Process vs Thread',
      'Process Scheduling (FCFS, SJF, Round Robin)',
      'Deadlock (Prevention, Avoidance, Detection)',
      'Memory Management (Paging, Segmentation)',
      'Virtual Memory',
      'File Systems',
      'CPU Scheduling Algorithms'
    ]
  },
  {
    category: 'Computer Networks',
    icon: '🌐',
    color: 'from-green-600 to-green-800',
    topics: [
      'OSI Model & TCP/IP',
      'HTTP/HTTPS Protocol',
      'TCP vs UDP',
      'DNS Resolution',
      'CDN & Load Balancing',
      'Network Security (SSL/TLS)',
      'WebSockets & Polling'
    ]
  },
  {
    category: 'Database Management',
    icon: '🗄️',
    color: 'from-purple-600 to-purple-800',
    topics: [
      'ACID Properties',
      'Normalization (1NF to BCNF)',
      'Transactions & Concurrency',
      'Indexing (B-Tree, Hash)',
      'SQL Queries & Joins',
      'NoSQL Databases',
      'Database Sharding'
    ]
  },
  {
    category: 'Compiler Design',
    icon: '⚙️',
    color: 'from-orange-600 to-orange-800',
    topics: [
      'Lexical Analysis',
      'Syntax Analysis (Parsing)',
      'Semantic Analysis',
      'Intermediate Code Generation',
      'Code Optimization',
      'Code Generation',
      'Symbol Table Management'
    ]
  },
  {
    category: 'Computer Architecture',
    icon: '🖥️',
    color: 'from-red-600 to-red-800',
    topics: [
      'Von Neumann Architecture',
      'Instruction Set Architecture (ISA)',
      'Pipelining',
      'Cache Memory',
      'Memory Hierarchy',
      'Input/Output Organization',
      'RISC vs CISC'
    ]
  },
  {
    category: 'Software Engineering',
    icon: '📐',
    color: 'from-teal-600 to-teal-800',
    topics: [
      'SDLC Models (Waterfall, Agile, Scrum)',
      'Software Testing (Unit, Integration, System)',
      'Version Control (Git)',
      'CI/CD Pipelines',
      'Software Metrics',
      'Design Patterns',
      'Code Quality & Refactoring'
    ]
  }
];

export default function CSFundamentalsPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-indigo-950 to-gray-950">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-7xl">💡</span>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Computer Science Fundamentals</h1>
              <p className="text-xl text-gray-400">Build a strong foundation in core CS concepts</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-indigo-900/30 backdrop-blur border border-indigo-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-indigo-400">6</p>
              <p className="text-sm text-gray-400 mt-1">Core Subjects</p>
            </div>
            <div className="bg-blue-900/30 backdrop-blur border border-blue-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-blue-400">50+</p>
              <p className="text-sm text-gray-400 mt-1">Topics</p>
            </div>
            <div className="bg-purple-900/30 backdrop-blur border border-purple-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-purple-400">200+</p>
              <p className="text-sm text-gray-400 mt-1">Interview Questions</p>
            </div>
            <div className="bg-green-900/30 backdrop-blur border border-green-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-green-400">100%</p>
              <p className="text-sm text-gray-400 mt-1">Theory + Practice</p>
            </div>
          </div>
        </motion.div>

        {/* Core Subjects */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">📚 Core Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {csTopics.map((subject, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`bg-linear-to-br ${subject.color} rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl">{subject.icon}</span>
                  <h3 className="text-2xl font-bold text-white">{subject.category}</h3>
                </div>
                <div className="space-y-2">
                  {subject.topics.map((topic, tidx) => (
                    <div key={tidx} className="flex items-center gap-2 text-white/90 text-sm">
                      <span>✓</span>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Common Interview Questions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-linear-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur border border-indigo-800/50 rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">❓ Most Asked Interview Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { q: 'What is the difference between process and thread?', subject: 'OS' },
              { q: 'Explain TCP 3-way handshake', subject: 'CN' },
              { q: 'What are ACID properties in DBMS?', subject: 'DBMS' },
              { q: 'Explain deadlock and its conditions', subject: 'OS' },
              { q: 'Difference between SQL and NoSQL?', subject: 'DBMS' },
              { q: 'What is OSI model? Explain each layer', subject: 'CN' },
              { q: 'What is virtual memory and paging?', subject: 'OS' },
              { q: 'Explain normalization with examples', subject: 'DBMS' }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <span className="px-2 py-1 bg-indigo-600/30 text-indigo-300 rounded text-xs font-semibold">
                    {item.subject}
                  </span>
                  <p className="text-white text-sm flex-1">{item.q}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-900/30 backdrop-blur border border-blue-800/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-blue-400 mb-4">📖 Books</h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <div>• Operating System Concepts (Galvin)</div>
              <div>• Computer Networks (Tanenbaum)</div>
              <div>• Database System Concepts</div>
            </div>
          </div>
          <div className="bg-purple-900/30 backdrop-blur border border-purple-800/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-purple-400 mb-4">📺 Video Courses</h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <div>• Gate Smashers (YouTube)</div>
              <div>• Neso Academy</div>
              <div>• Abdul Bari Algorithms</div>
            </div>
          </div>
          <div className="bg-green-900/30 backdrop-blur border border-green-800/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-green-400 mb-4">🌐 Websites</h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <div>• GeeksforGeeks</div>
              <div>• Tutorialspoint</div>
              <div>• JavaTpoint</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
