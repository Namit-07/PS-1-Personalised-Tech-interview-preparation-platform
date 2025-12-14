'use client';

import { motion } from 'framer-motion';

const springTopics = [
  {
    category: 'Spring Boot Basics',
    icon: '☕',
    topics: [
      'Spring Boot Architecture',
      'Auto-configuration',
      'Spring Boot Starters',
      'Application Properties',
      'Dependency Injection',
      'Inversion of Control (IoC)'
    ]
  },
  {
    category: 'REST API Development',
    icon: '🌐',
    topics: [
      '@RestController & @RequestMapping',
      'Request/Response Handling',
      'Path Variables & Query Params',
      'Request Body Validation',
      'Exception Handling',
      'HATEOAS'
    ]
  },
  {
    category: 'Spring Data JPA',
    icon: '🗄️',
    topics: [
      'JPA Repositories',
      'Entity Relationships',
      'Custom Queries (JPQL)',
      'Pagination & Sorting',
      'Transactions',
      'Auditing'
    ]
  },
  {
    category: 'Spring Security',
    icon: '🔒',
    topics: [
      'Authentication & Authorization',
      'JWT Implementation',
      'OAuth2 & Social Login',
      'Method Security',
      'Password Encoding',
      'CORS Configuration'
    ]
  },
  {
    category: 'Microservices',
    icon: '🎯',
    topics: [
      'Spring Cloud Config',
      'Eureka Service Discovery',
      'API Gateway (Spring Cloud Gateway)',
      'Circuit Breaker (Resilience4j)',
      'Distributed Tracing',
      'Inter-service Communication'
    ]
  },
  {
    category: 'Testing',
    icon: '🧪',
    topics: [
      'JUnit 5',
      'Mockito Framework',
      'Integration Testing',
      '@SpringBootTest',
      'Test Containers',
      'MockMvc for REST APIs'
    ]
  }
];

const projects = [
  { id: 1, title: 'E-Commerce Backend', difficulty: 'Hard', features: ['Product Management', 'Order Processing', 'Payment Integration', 'User Auth'] },
  { id: 2, title: 'Blog API', difficulty: 'Medium', features: ['CRUD Operations', 'JWT Auth', 'Pagination', 'Search'] },
  { id: 3, title: 'Task Management System', difficulty: 'Medium', features: ['Projects', 'Tasks', 'Teams', 'Notifications'] },
  { id: 4, title: 'Banking Application', difficulty: 'Hard', features: ['Accounts', 'Transactions', 'Loan Management', 'Reports'] },
  { id: 5, title: 'Social Media Backend', difficulty: 'Hard', features: ['Posts', 'Comments', 'Likes', 'Following', 'Feed'] },
  { id: 6, title: 'Hotel Booking System', difficulty: 'Hard', features: ['Room Management', 'Reservations', 'Payments', 'Reviews'] }
];

export default function JavaSpringBootPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-950 dark:via-red-950 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-7xl">☕</span>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Java Spring Boot</h1>
              <p className="text-xl text-gray-400">Build enterprise-grade Java applications</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-red-900/30 backdrop-blur border border-red-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-red-400">15+</p>
              <p className="text-sm text-gray-400 mt-1">Projects</p>
            </div>
            <div className="bg-orange-900/30 backdrop-blur border border-orange-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-orange-400">6</p>
              <p className="text-sm text-gray-400 mt-1">Core Modules</p>
            </div>
            <div className="bg-green-900/30 backdrop-blur border border-green-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-green-400">REST</p>
              <p className="text-sm text-gray-400 mt-1">APIs</p>
            </div>
            <div className="bg-blue-900/30 backdrop-blur border border-blue-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-blue-400">JWT</p>
              <p className="text-sm text-gray-400 mt-1">Security</p>
            </div>
          </div>
        </motion.div>

        {/* Core Topics */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">🎯 Core Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {springTopics.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gray-900/50 backdrop-blur border border-gray-800 hover:border-red-500/50 rounded-2xl p-6 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{section.icon}</span>
                  <h3 className="text-xl font-bold text-white">{section.category}</h3>
                </div>
                <div className="space-y-2">
                  {section.topics.map((topic, tidx) => (
                    <div key={tidx} className="flex items-center gap-2 text-gray-300 text-sm">
                      <span className="text-red-500">✓</span>
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
          <h2 className="text-3xl font-bold text-white mb-6">💼 Real-World Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gray-900/50 backdrop-blur border border-gray-800 hover:border-red-500/50 rounded-2xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
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
                      <span className="text-red-500">→</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full py-2 bg-linear-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold rounded-xl transition-all">
                  View Code →
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-linear-to-r from-red-900/30 to-orange-900/30 backdrop-blur border border-red-800/50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">📚 Learning Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="https://spring.io/guides" target="_blank" rel="noopener noreferrer"
               className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800 transition-colors">
              <h3 className="text-lg font-semibold text-red-400 mb-2">Spring Official Guides</h3>
              <p className="text-gray-300 text-sm">Official documentation and tutorials</p>
            </a>
            <a href="https://www.youtube.com/watch?v=9SGDpanrc8U" target="_blank" rel="noopener noreferrer"
               className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800 transition-colors">
              <h3 className="text-lg font-semibold text-orange-400 mb-2">Spring Boot Full Course</h3>
              <p className="text-gray-300 text-sm">10-hour comprehensive tutorial</p>
            </a>
            <a href="https://www.baeldung.com/spring-boot" target="_blank" rel="noopener noreferrer"
               className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800 transition-colors">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">Baeldung Tutorials</h3>
              <p className="text-gray-300 text-sm">In-depth Spring Boot tutorials</p>
            </a>
            <a href="https://github.com/spring-projects/spring-boot" target="_blank" rel="noopener noreferrer"
               className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800 transition-colors">
              <h3 className="text-lg font-semibold text-green-400 mb-2">Spring Boot GitHub</h3>
              <p className="text-gray-300 text-sm">Source code and examples</p>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
