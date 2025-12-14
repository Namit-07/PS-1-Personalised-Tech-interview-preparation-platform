'use client';

import { motion } from 'framer-motion';

const stack = [
  {
    name: 'MongoDB',
    icon: '🍃',
    color: 'from-green-600 to-emerald-600',
    topics: [
      'Document-based NoSQL',
      'Schema Design & Modeling',
      'CRUD Operations',
      'Aggregation Pipeline',
      'Indexing & Performance',
      'Mongoose ODM'
    ]
  },
  {
    name: 'Express.js',
    icon: '⚡',
    color: 'from-gray-600 to-gray-800',
    topics: [
      'REST API Development',
      'Middleware Pattern',
      'Routing & Controllers',
      'JWT Authentication',
      'Error Handling',
      'Request Validation'
    ]
  },
  {
    name: 'React',
    icon: '⚛️',
    color: 'from-blue-600 to-cyan-600',
    topics: [
      'Functional Components',
      'Hooks (useState, useEffect, useContext)',
      'State Management (Context API, Redux)',
      'React Router',
      'Form Handling',
      'Performance Optimization'
    ]
  },
  {
    name: 'Node.js',
    icon: '🟢',
    color: 'from-green-700 to-green-900',
    topics: [
      'Event Loop & Async Programming',
      'File System Operations',
      'NPM Package Management',
      'Environment Variables',
      'Streams & Buffers',
      'Child Processes'
    ]
  }
];

const projects = [
  { id: 1, title: 'E-Commerce Platform', difficulty: 'Hard', features: ['Product Catalog', 'Cart', 'Payment', 'Orders', 'Admin Panel'] },
  { id: 2, title: 'Social Media App', difficulty: 'Hard', features: ['Posts', 'Likes', 'Comments', 'Follow', 'Real-time Feed'] },
  { id: 3, title: 'Task Management System', difficulty: 'Medium', features: ['Projects', 'Tasks', 'Teams', 'Deadlines', 'Notifications'] },
  { id: 4, title: 'Blog Platform', difficulty: 'Medium', features: ['Posts', 'Comments', 'Tags', 'Search', 'SEO'] },
  { id: 5, title: 'Chat Application', difficulty: 'Hard', features: ['Real-time Messaging', 'Groups', 'File Sharing', 'Notifications'] },
  { id: 6, title: 'Video Streaming Platform', difficulty: 'Hard', features: ['Video Upload', 'Streaming', 'Comments', 'Subscriptions'] },
  { id: 7, title: 'Food Delivery App', difficulty: 'Hard', features: ['Restaurant Listings', 'Menu', 'Cart', 'Order Tracking', 'Reviews'] },
  { id: 8, title: 'Expense Tracker', difficulty: 'Medium', features: ['Income/Expense', 'Categories', 'Charts', 'Budget', 'Reports'] }
];

export default function MERNPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-950 dark:via-teal-950 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-7xl">⚛️</span>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">MERN Stack Development</h1>
              <p className="text-xl text-gray-400">Build modern full-stack web applications</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-teal-900/30 backdrop-blur border border-teal-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-teal-400">4</p>
              <p className="text-sm text-gray-400 mt-1">Technologies</p>
            </div>
            <div className="bg-blue-900/30 backdrop-blur border border-blue-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-blue-400">10+</p>
              <p className="text-sm text-gray-400 mt-1">Projects</p>
            </div>
            <div className="bg-green-900/30 backdrop-blur border border-green-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-green-400">REST</p>
              <p className="text-sm text-gray-400 mt-1">APIs</p>
            </div>
            <div className="bg-purple-900/30 backdrop-blur border border-purple-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-purple-400">JWT</p>
              <p className="text-sm text-gray-400 mt-1">Auth</p>
            </div>
          </div>
        </motion.div>

        {/* MERN Stack Breakdown */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">🔧 The Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stack.map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`bg-linear-to-br ${tech.color} rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-6xl">{tech.icon}</span>
                  <h3 className="text-3xl font-bold text-white">{tech.name}</h3>
                </div>
                <div className="space-y-2">
                  {tech.topics.map((topic, tidx) => (
                    <div key={tidx} className="flex items-center gap-2 text-white/90">
                      <span>✓</span>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">💻 Full-Stack Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gray-900/50 backdrop-blur border border-gray-800 hover:border-teal-500/50 rounded-2xl p-6 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    project.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {project.difficulty}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  {project.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-2 text-gray-300 text-sm">
                      <span className="text-teal-500">→</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full py-2 bg-linear-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all">
                  View Project & Code →
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Deployment */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-linear-to-r from-teal-900/30 to-blue-900/30 backdrop-blur border border-teal-800/50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">🚀 Deployment & DevOps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-teal-400 mb-3">Frontend</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <div>• Vercel</div>
                <div>• Netlify</div>
                <div>• GitHub Pages</div>
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Backend</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <div>• Heroku</div>
                <div>• Railway</div>
                <div>• AWS EC2</div>
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-green-400 mb-3">Database</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <div>• MongoDB Atlas</div>
                <div>• AWS RDS</div>
                <div>• DigitalOcean</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
