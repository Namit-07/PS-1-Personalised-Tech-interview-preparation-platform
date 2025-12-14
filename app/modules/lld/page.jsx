'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const designPrinciples = [
  {
    id: 1,
    title: 'SOLID Principles',
    icon: '🏛️',
    principles: [
      { name: 'Single Responsibility', description: 'A class should have one, and only one, reason to change' },
      { name: 'Open-Closed', description: 'Software entities should be open for extension, but closed for modification' },
      { name: 'Liskov Substitution', description: 'Derived classes must be substitutable for their base classes' },
      { name: 'Interface Segregation', description: 'Many client-specific interfaces are better than one general-purpose interface' },
      { name: 'Dependency Inversion', description: 'Depend upon abstractions, not concretions' }
    ]
  },
  {
    id: 2,
    title: 'Design Patterns',
    icon: '🎨',
    categories: [
      {
        name: 'Creational Patterns',
        patterns: ['Singleton', 'Factory', 'Abstract Factory', 'Builder', 'Prototype']
      },
      {
        name: 'Structural Patterns',
        patterns: ['Adapter', 'Bridge', 'Composite', 'Decorator', 'Facade', 'Proxy']
      },
      {
        name: 'Behavioral Patterns',
        patterns: ['Observer', 'Strategy', 'Command', 'Iterator', 'State', 'Template Method']
      }
    ]
  }
];

const caseStudies = [
  { id: 1, title: 'Parking Lot System', difficulty: 'Medium', concepts: ['Classes', 'Enums', 'Strategy Pattern'] },
  { id: 2, title: 'Elevator System', difficulty: 'Hard', concepts: ['State Machine', 'Queue', 'Scheduling'] },
  { id: 3, title: 'Library Management', difficulty: 'Medium', concepts: ['CRUD', 'Search', 'Fine Calculation'] },
  { id: 4, title: 'ATM Machine', difficulty: 'Medium', concepts: ['State Pattern', 'Transaction', 'Security'] },
  { id: 5, title: 'Chess Game', difficulty: 'Hard', concepts: ['Board', 'Pieces', 'Move Validation'] },
  { id: 6, title: 'Hotel Booking System', difficulty: 'Hard', concepts: ['Reservation', 'Concurrency', 'Payment'] },
  { id: 7, title: 'Ride Sharing (Uber/Ola)', difficulty: 'Hard', concepts: ['Matching', 'Pricing', 'Location'] },
  { id: 8, title: 'Food Delivery (Zomato/Swiggy)', difficulty: 'Hard', concepts: ['Restaurant', 'Orders', 'Delivery'] },
  { id: 9, title: 'Social Media (Twitter)', difficulty: 'Hard', concepts: ['Posts', 'Followers', 'Feed'] },
  { id: 10, title: 'Movie Ticket Booking', difficulty: 'Medium', concepts: ['Shows', 'Seats', 'Booking'] }
];

export default function LLDPage() {
  const [expandedCase, setExpandedCase] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-950 dark:via-purple-950 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-7xl">🏗️</span>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Low Level Design</h1>
              <p className="text-xl text-gray-400">Master object-oriented design and design patterns</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-purple-900/30 backdrop-blur border border-purple-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-purple-400">25+</p>
              <p className="text-sm text-gray-400 mt-1">Case Studies</p>
            </div>
            <div className="bg-pink-900/30 backdrop-blur border border-pink-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-pink-400">23</p>
              <p className="text-sm text-gray-400 mt-1">Design Patterns</p>
            </div>
            <div className="bg-blue-900/30 backdrop-blur border border-blue-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-blue-400">5</p>
              <p className="text-sm text-gray-400 mt-1">SOLID Principles</p>
            </div>
            <div className="bg-green-900/30 backdrop-blur border border-green-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-green-400">UML</p>
              <p className="text-sm text-gray-400 mt-1">Diagrams Included</p>
            </div>
          </div>
        </motion.div>

        {/* Design Principles */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">🎯 Core Principles</h2>
          <div className="grid gap-6">
            {designPrinciples.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-5xl">{section.icon}</span>
                  <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                </div>

                {section.principles && (
                  <div className="space-y-4">
                    {section.principles.map((principle, idx) => (
                      <div key={idx} className="bg-gray-800/50 rounded-xl p-4">
                        <h4 className="text-lg font-semibold text-purple-400 mb-2">{principle.name}</h4>
                        <p className="text-gray-300">{principle.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.categories && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {section.categories.map((category, idx) => (
                      <div key={idx} className="bg-gray-800/50 rounded-xl p-4">
                        <h4 className="text-lg font-semibold text-pink-400 mb-3">{category.name}</h4>
                        <div className="space-y-2">
                          {category.patterns.map((pattern, pidx) => (
                            <div key={pidx} className="flex items-center gap-2 text-gray-300">
                              <span className="text-pink-500">✓</span>
                              <span>{pattern}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">💼 Real-World Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((caseStudy, idx) => (
              <motion.div
                key={caseStudy.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gray-900/50 backdrop-blur border border-gray-800 hover:border-purple-500/50 rounded-2xl p-6 cursor-pointer"
                onClick={() => setExpandedCase(expandedCase === caseStudy.id ? null : caseStudy.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{caseStudy.title}</h3>
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    caseStudy.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {caseStudy.difficulty}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.concepts.map((concept, cidx) => (
                    <span key={cidx} className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-lg text-sm">
                      {concept}
                    </span>
                  ))}
                </div>
                {expandedCase === caseStudy.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-gray-800"
                  >
                    <button className="w-full py-3 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl">
                      View Solution & UML Diagrams →
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-linear-to-r from-purple-900/30 to-pink-900/30 backdrop-blur border border-purple-800/50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">📚 Learning Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="https://refactoring.guru/design-patterns" target="_blank" rel="noopener noreferrer" 
               className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800 transition-colors">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Refactoring Guru</h3>
              <p className="text-gray-300 text-sm">Complete guide to design patterns with examples</p>
            </a>
            <a href="https://www.youtube.com/watch?v=tv-_1er1mWI" target="_blank" rel="noopener noreferrer"
               className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800 transition-colors">
              <h3 className="text-lg font-semibold text-pink-400 mb-2">Design Patterns Course</h3>
              <p className="text-gray-300 text-sm">3-hour comprehensive video tutorial</p>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
