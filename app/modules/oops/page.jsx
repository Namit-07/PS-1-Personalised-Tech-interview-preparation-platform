'use client';

import { motion } from 'framer-motion';

const pillars = [
  {
    id: 1,
    title: 'Encapsulation',
    icon: '🔐',
    color: 'from-blue-600 to-cyan-600',
    description: 'Bundling data and methods that operate on that data within a single unit',
    examples: ['Private variables with public getters/setters', 'Data hiding', 'Access modifiers']
  },
  {
    id: 2,
    title: 'Abstraction',
    icon: '🎭',
    color: 'from-purple-600 to-pink-600',
    description: 'Hiding complex implementation details and showing only essential features',
    examples: ['Abstract classes', 'Interfaces', 'Abstract methods']
  },
  {
    id: 3,
    title: 'Inheritance',
    icon: '🧬',
    color: 'from-green-600 to-emerald-600',
    description: 'Mechanism where a new class derives properties and behaviors from an existing class',
    examples: ['Parent-child relationships', 'Method overriding', 'Multi-level inheritance']
  },
  {
    id: 4,
    title: 'Polymorphism',
    icon: '🎪',
    color: 'from-orange-600 to-red-600',
    description: 'Ability of objects to take multiple forms and behave differently in different contexts',
    examples: ['Method overloading (compile-time)', 'Method overriding (runtime)', 'Interface implementation']
  }
];

const concepts = [
  { title: 'Classes & Objects', topics: ['Class definition', 'Object instantiation', 'Constructors', 'Destructors'] },
  { title: 'Access Modifiers', topics: ['Public', 'Private', 'Protected', 'Default/Package'] },
  { title: 'Static Members', topics: ['Static variables', 'Static methods', 'Static blocks'] },
  { title: 'Inner Classes', topics: ['Nested classes', 'Anonymous classes', 'Lambda expressions'] },
  { title: 'Interfaces vs Abstract Classes', topics: ['When to use each', 'Multiple inheritance', 'Default methods'] },
  { title: 'Exception Handling', topics: ['try-catch-finally', 'Custom exceptions', 'Throws vs throw'] }
];

export default function OOPSPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-950 dark:via-green-950 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-7xl">🎯</span>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Object-Oriented Programming</h1>
              <p className="text-xl text-gray-400">Master the four pillars of OOP and beyond</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-green-900/30 backdrop-blur border border-green-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-green-400">4</p>
              <p className="text-sm text-gray-400 mt-1">Pillars</p>
            </div>
            <div className="bg-blue-900/30 backdrop-blur border border-blue-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-blue-400">30+</p>
              <p className="text-sm text-gray-400 mt-1">Code Examples</p>
            </div>
            <div className="bg-purple-900/30 backdrop-blur border border-purple-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-purple-400">50+</p>
              <p className="text-sm text-gray-400 mt-1">Practice Questions</p>
            </div>
            <div className="bg-orange-900/30 backdrop-blur border border-orange-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-orange-400">3</p>
              <p className="text-sm text-gray-400 mt-1">Languages</p>
            </div>
          </div>
        </motion.div>

        {/* Four Pillars */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">🏛️ The Four Pillars of OOP</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`bg-linear-to-br ${pillar.color} rounded-2xl p-6 cursor-pointer shadow-xl hover:shadow-2xl transition-all`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-6xl">{pillar.icon}</span>
                  <h3 className="text-3xl font-bold text-white">{pillar.title}</h3>
                </div>
                <p className="text-white/90 mb-4 text-lg">{pillar.description}</p>
                <div className="space-y-2">
                  {pillar.examples.map((example, eidx) => (
                    <div key={eidx} className="flex items-center gap-2 text-white/80">
                      <span>✓</span>
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Concepts */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">📚 Core Concepts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concepts.map((concept, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gray-900/50 backdrop-blur border border-gray-800 hover:border-green-500/50 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">{concept.title}</h3>
                <div className="space-y-2">
                  {concept.topics.map((topic, tidx) => (
                    <div key={tidx} className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-500">→</span>
                      <span className="text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interview Questions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-linear-to-r from-green-900/30 to-blue-900/30 backdrop-blur border border-green-800/50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">💡 Top Interview Questions</h2>
          <div className="space-y-4">
            {[
              'What is the difference between abstraction and encapsulation?',
              'Explain method overloading vs method overriding',
              'What is the diamond problem in multiple inheritance?',
              'Difference between interface and abstract class',
              'What is polymorphism? Explain with examples',
              'What are access modifiers and when to use each?'
            ].map((question, idx) => (
              <div key={idx} className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">❓</span>
                  <p className="text-white">{question}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
