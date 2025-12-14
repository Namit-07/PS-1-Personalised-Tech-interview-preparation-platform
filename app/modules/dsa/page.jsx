'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const dsaTopics = [
  {
    id: 1,
    title: 'Arrays & Strings',
    icon: '📊',
    difficulty: 'Beginner',
    problems: 45,
    topics: [
      'Two Pointers',
      'Sliding Window',
      'Kadane\'s Algorithm',
      'Dutch National Flag',
      'Array Manipulation',
      'String Matching (KMP, Rabin-Karp)'
    ],
    resources: [
      { type: 'video', title: 'Arrays Master Class', url: 'https://www.youtube.com/watch?v=pmN9ExDf3yQ', duration: '2h 30m' },
      { type: 'article', title: 'Two Pointer Technique', url: 'https://leetcode.com/discuss/study-guide/1688903/Solved-all-two-pointers-problems-in-100-days' },
      { type: 'practice', title: '50 Array Problems', count: 50 }
    ]
  },
  {
    id: 2,
    title: 'Linked Lists',
    icon: '🔗',
    difficulty: 'Beginner',
    problems: 30,
    topics: [
      'Singly Linked List',
      'Doubly Linked List',
      'Circular Linked List',
      'Fast & Slow Pointers',
      'Reversal Techniques',
      'Merge & Sort Operations'
    ],
    resources: [
      { type: 'video', title: 'Linked List Fundamentals', url: 'https://www.youtube.com/watch?v=R9PTBwOzceo', duration: '1h 45m' },
      { type: 'article', title: 'Floyd\'s Cycle Detection', url: 'https://www.geeksforgeeks.org/floyds-cycle-finding-algorithm/' }
    ]
  },
  {
    id: 3,
    title: 'Trees & Binary Search Trees',
    icon: '🌳',
    difficulty: 'Intermediate',
    problems: 55,
    topics: [
      'Binary Tree Traversals (Inorder, Preorder, Postorder)',
      'Level Order Traversal',
      'BST Operations',
      'Tree Construction',
      'LCA Problems',
      'Path Sum Problems'
    ],
    resources: [
      { type: 'video', title: 'Tree Data Structure Complete', url: 'https://www.youtube.com/watch?v=fAAZixBzIAI', duration: '3h' },
      { type: 'practice', title: 'Tree Problem Set', count: 55 }
    ]
  },
  {
    id: 4,
    title: 'Graphs',
    icon: '🕸️',
    difficulty: 'Advanced',
    problems: 40,
    topics: [
      'DFS & BFS',
      'Dijkstra\'s Algorithm',
      'Bellman-Ford',
      'Floyd-Warshall',
      'Topological Sort',
      'Union Find',
      'Minimum Spanning Tree (Kruskal, Prim)'
    ],
    resources: [
      { type: 'video', title: 'Graph Algorithms', url: 'https://www.youtube.com/watch?v=tWVWeAqZ0WU', duration: '4h' },
      { type: 'article', title: 'Graph Theory Handbook', url: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/' }
    ]
  },
  {
    id: 5,
    title: 'Dynamic Programming',
    icon: '💡',
    difficulty: 'Advanced',
    problems: 60,
    topics: [
      '1D DP (Fibonacci, Climbing Stairs)',
      '2D DP (Grid, LCS)',
      'Knapsack Problems',
      'LIS & Variants',
      'Matrix Chain Multiplication',
      'DP on Trees',
      'Bitmask DP'
    ],
    resources: [
      { type: 'video', title: 'DP Master Course', url: 'https://www.youtube.com/watch?v=oBt53YbR9Kk', duration: '5h' },
      { type: 'article', title: 'DP Patterns', url: 'https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns' }
    ]
  },
  {
    id: 6,
    title: 'Stacks & Queues',
    icon: '📚',
    difficulty: 'Beginner',
    problems: 25,
    topics: [
      'Stack Implementation',
      'Queue & Deque',
      'Monotonic Stack',
      'Next Greater Element',
      'Expression Evaluation',
      'Priority Queue/Heap'
    ],
    resources: [
      { type: 'video', title: 'Stack & Queue Complete', url: 'https://www.youtube.com/watch?v=RBSGKlAvoiM', duration: '2h' }
    ]
  },
  {
    id: 7,
    title: 'Binary Search',
    icon: '🔍',
    difficulty: 'Intermediate',
    problems: 35,
    topics: [
      'Classic Binary Search',
      'Binary Search on Answer',
      'Search in Rotated Array',
      'Median of Two Sorted Arrays',
      'Aggressive Cows Pattern',
      'Book Allocation Pattern'
    ],
    resources: [
      { type: 'video', title: 'Binary Search Mastery', url: 'https://www.youtube.com/watch?v=W9QJ8HaRvJQ', duration: '1h 30m' }
    ]
  },
  {
    id: 8,
    title: 'Greedy Algorithms',
    icon: '🎯',
    difficulty: 'Intermediate',
    problems: 30,
    topics: [
      'Activity Selection',
      'Huffman Coding',
      'Job Sequencing',
      'Fractional Knapsack',
      'Minimum Platforms',
      'N Meetings in One Room'
    ],
    resources: [
      { type: 'video', title: 'Greedy Algorithms Explained', url: 'https://www.youtube.com/watch?v=bC7o8P_Ste4', duration: '2h' }
    ]
  },
  {
    id: 9,
    title: 'Backtracking',
    icon: '🔄',
    difficulty: 'Advanced',
    problems: 25,
    topics: [
      'N-Queens Problem',
      'Sudoku Solver',
      'Permutations & Combinations',
      'Subset Generation',
      'Rat in a Maze',
      'Word Search'
    ],
    resources: [
      { type: 'video', title: 'Backtracking Complete Guide', url: 'https://www.youtube.com/watch?v=DKCbsiDBN6c', duration: '2h 30m' }
    ]
  },
  {
    id: 10,
    title: 'Bit Manipulation',
    icon: '⚡',
    difficulty: 'Intermediate',
    problems: 20,
    topics: [
      'Basic Bit Operations',
      'Power of Two',
      'Single Number Variants',
      'Subset Generation using Bits',
      'XOR Properties',
      'Counting Bits'
    ],
    resources: [
      { type: 'video', title: 'Bit Manipulation Tricks', url: 'https://www.youtube.com/watch?v=5rtVTYAk9KQ', duration: '1h' }
    ]
  }
];

export default function DSAPage() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-950 dark:via-blue-950 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-7xl">🧮</span>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Data Structures & Algorithms</h1>
              <p className="text-xl text-gray-400">Master the fundamentals of computer science</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-blue-900/30 backdrop-blur border border-blue-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-blue-400">150+</p>
              <p className="text-sm text-gray-400 mt-1">Problems</p>
            </div>
            <div className="bg-purple-900/30 backdrop-blur border border-purple-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-purple-400">10</p>
              <p className="text-sm text-gray-400 mt-1">Topics</p>
            </div>
            <div className="bg-green-900/30 backdrop-blur border border-green-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-green-400">50+</p>
              <p className="text-sm text-gray-400 mt-1">Hours Content</p>
            </div>
            <div className="bg-orange-900/30 backdrop-blur border border-orange-800/50 rounded-2xl p-6">
              <p className="text-4xl font-bold text-orange-400">100%</p>
              <p className="text-sm text-gray-400 mt-1">Free</p>
            </div>
          </div>
        </motion.div>

        {/* Learning Path */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">📚 Complete Learning Path</h2>
          <div className="grid gap-6">
            {dsaTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all cursor-pointer"
                onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-5xl">{topic.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{topic.title}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            topic.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                            topic.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {topic.difficulty}
                          </span>
                          <span className="text-sm text-gray-400">{topic.problems} Problems</span>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {selectedTopic === topic.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-gray-800"
                      >
                        {/* Subtopics */}
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-blue-400 mb-3">📋 What You'll Learn:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {topic.topics.map((subtopic, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-gray-300">
                                <span className="text-blue-500">✓</span>
                                <span>{subtopic}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Resources */}
                        <div>
                          <h4 className="text-lg font-semibold text-purple-400 mb-3">🎓 Resources:</h4>
                          <div className="space-y-3">
                            {topic.resources.map((resource, idx) => (
                              <div key={idx} className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">
                                    {resource.type === 'video' ? '📺' : 
                                     resource.type === 'article' ? '📖' : '💻'}
                                  </span>
                                  <div>
                                    <p className="text-white font-medium">{resource.title}</p>
                                    {resource.duration && (
                                      <p className="text-sm text-gray-400">{resource.duration}</p>
                                    )}
                                    {resource.count && (
                                      <p className="text-sm text-gray-400">{resource.count} problems</p>
                                    )}
                                  </div>
                                </div>
                                {resource.url && (
                                  <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    View →
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Start Learning Button */}
                        <button className="mt-6 w-full py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all">
                          Start Learning {topic.title} →
                        </button>
                      </motion.div>
                    )}
                  </div>
                  
                  <motion.div
                    animate={{ rotate: selectedTopic === topic.id ? 180 : 0 }}
                    className="text-gray-400 text-2xl ml-4"
                  >
                    ▼
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recommended Learning Order */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-linear-to-r from-green-900/30 to-emerald-900/30 backdrop-blur border border-green-800/50 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span>🎯</span>
            <span>Recommended Learning Order</span>
          </h2>
          <p className="text-gray-300 mb-6">
            Follow this path for optimal learning. Start from basics and gradually move to advanced topics.
          </p>
          <div className="flex flex-wrap gap-3">
            {['Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Binary Search', 
              'Trees & BST', 'Graphs', 'Greedy', 'Backtracking', 'Dynamic Programming', 'Bit Manipulation'].map((topic, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="px-4 py-2 bg-green-600/20 border border-green-500/30 text-green-300 rounded-lg font-medium">
                  {idx + 1}. {topic}
                </span>
                {idx < 9 && <span className="text-green-500 text-xl">→</span>}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
