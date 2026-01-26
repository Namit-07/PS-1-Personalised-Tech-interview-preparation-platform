const mongoose = require('mongoose');
const Problem = require('./models/Problem');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Additional DSA Problems
const dsaProblems = [
  // 1. Sliding Window
  {
    title: "Maximum Sum Subarray of Size K",
    slug: "maximum-sum-subarray-of-size-k",
    difficulty: "Easy",
    topics: ["Arrays", "Sliding Window"],
    companies: ["Amazon", "Microsoft", "Google"],
    description: "Given an array of positive integers and a positive integer k, find the maximum sum of any contiguous subarray of size k.",
    constraints: ["1 <= k <= n <= 10^5", "1 <= arr[i] <= 10^4"],
    examples: [
      { input: "arr = [2, 1, 5, 1, 3, 2], k = 3", output: "9", explanation: "Subarray [5, 1, 3] has maximum sum 9" }
    ],
    hints: ["Use sliding window technique", "Maintain a window of size k", "Slide the window by adding next element and removing first element"],
    learningResources: {
      videos: [
        { title: "Sliding Window Technique", url: "https://www.youtube.com/watch?v=MK-NZ4hN7rs", channel: "NeetCode", duration: "12:30" }
      ],
      articles: [
        { title: "Sliding Window Pattern", url: "https://www.geeksforgeeks.org/window-sliding-technique/", source: "GeeksforGeeks" }
      ]
    },
    solution: {
      approach: "Sliding Window",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    metadata: { frequency: 7.5, acceptanceRate: 65.2 }
  },

  // 2. Two Pointers
  {
    title: "3Sum",
    slug: "3sum",
    difficulty: "Medium",
    topics: ["Arrays", "Two Pointers", "Sorting"],
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple"],
    description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.",
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]", explanation: "The distinct triplets that sum to zero" }
    ],
    hints: ["Sort the array first", "Fix one element and use two pointers for the rest", "Skip duplicates to avoid duplicate triplets"],
    learningResources: {
      videos: [
        { title: "3Sum - Leetcode 15", url: "https://www.youtube.com/watch?v=jzZsG8n2R9A", channel: "NeetCode", duration: "14:20" }
      ],
      articles: [
        { title: "3Sum Solution", url: "https://leetcode.com/problems/3sum/solution/", source: "LeetCode" }
      ]
    },
    solution: {
      approach: "Two Pointers",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)"
    },
    metadata: { frequency: 9.2, acceptanceRate: 32.1 }
  },

  // 3. Stack
  {
    title: "Next Greater Element",
    slug: "next-greater-element",
    difficulty: "Medium",
    topics: ["Stack", "Arrays"],
    companies: ["Amazon", "Microsoft", "Adobe"],
    description: "Given a circular integer array nums, return the next greater element for every element in nums. The next greater element of a number x is the first greater number to its traversing-order next in the array.",
    constraints: ["1 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
    examples: [
      { input: "nums = [1, 2, 1]", output: "[2, -1, 2]", explanation: "For 1, next greater is 2. For 2, there's no greater element. For last 1, circularly next greater is 2" }
    ],
    hints: ["Use a monotonic stack", "Process array twice for circular behavior", "Stack stores indices, not values"],
    learningResources: {
      videos: [
        { title: "Next Greater Element - Stack", url: "https://www.youtube.com/watch?v=68a1Dc_qVq4", channel: "NeetCode", duration: "11:45" }
      ],
      articles: [
        { title: "Monotonic Stack Pattern", url: "https://www.geeksforgeeks.org/next-greater-element/", source: "GeeksforGeeks" }
      ]
    },
    solution: {
      approach: "Monotonic Stack",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)"
    },
    metadata: { frequency: 8.0, acceptanceRate: 42.5 }
  },

  // 4. Heap/Priority Queue
  {
    title: "Kth Largest Element in an Array",
    slug: "kth-largest-element-in-array",
    difficulty: "Medium",
    topics: ["Heap", "Sorting", "Quick Select"],
    companies: ["Google", "Amazon", "Meta", "Microsoft"],
    description: "Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.",
    constraints: ["1 <= k <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    examples: [
      { input: "nums = [3,2,1,5,6,4], k = 2", output: "5", explanation: "The 2nd largest element is 5" }
    ],
    hints: ["Use a min-heap of size k", "QuickSelect can achieve O(n) average time", "Sorting works but is O(n log n)"],
    learningResources: {
      videos: [
        { title: "Kth Largest Element - Heap", url: "https://www.youtube.com/watch?v=XEmy13g1Qxc", channel: "NeetCode", duration: "15:30" }
      ],
      articles: [
        { title: "Kth Largest Element Solutions", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/solution/", source: "LeetCode" }
      ]
    },
    solution: {
      approach: "Min Heap",
      timeComplexity: "O(n log k)",
      spaceComplexity: "O(k)"
    },
    metadata: { frequency: 9.0, acceptanceRate: 65.8 }
  },

  // 5. Backtracking
  {
    title: "Subsets",
    slug: "subsets",
    difficulty: "Medium",
    topics: ["Backtracking", "Arrays", "Bit Manipulation"],
    companies: ["Google", "Amazon", "Meta", "Microsoft"],
    description: "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.",
    constraints: ["1 <= nums.length <= 10", "-10 <= nums[i] <= 10", "All numbers are unique"],
    examples: [
      { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]", explanation: "All possible subsets" }
    ],
    hints: ["Use backtracking with include/exclude choices", "Can also use bit manipulation", "Each element has 2 choices: include or exclude"],
    learningResources: {
      videos: [
        { title: "Subsets - Backtracking", url: "https://www.youtube.com/watch?v=REOH22Xwdkk", channel: "NeetCode", duration: "10:15" }
      ],
      articles: [
        { title: "Subsets Solution", url: "https://leetcode.com/problems/subsets/solution/", source: "LeetCode" }
      ]
    },
    solution: {
      approach: "Backtracking",
      timeComplexity: "O(n * 2^n)",
      spaceComplexity: "O(n)"
    },
    metadata: { frequency: 8.5, acceptanceRate: 73.2 }
  },

  // 6. Backtracking
  {
    title: "Permutations",
    slug: "permutations",
    difficulty: "Medium",
    topics: ["Backtracking", "Arrays"],
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple"],
    description: "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
    constraints: ["1 <= nums.length <= 6", "-10 <= nums[i] <= 10", "All integers are unique"],
    examples: [
      { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]", explanation: "All 6 permutations" }
    ],
    hints: ["Use backtracking with a visited set", "Swap elements to generate permutations", "n! total permutations"],
    learningResources: {
      videos: [
        { title: "Permutations - Backtracking", url: "https://www.youtube.com/watch?v=s7AvT7cGdSo", channel: "NeetCode", duration: "12:40" }
      ],
      articles: [
        { title: "Permutations Solution", url: "https://leetcode.com/problems/permutations/solution/", source: "LeetCode" }
      ]
    },
    solution: {
      approach: "Backtracking",
      timeComplexity: "O(n * n!)",
      spaceComplexity: "O(n)"
    },
    metadata: { frequency: 8.8, acceptanceRate: 74.5 }
  },

  // 7. Dynamic Programming
  {
    title: "House Robber",
    slug: "house-robber",
    difficulty: "Medium",
    topics: ["Dynamic Programming", "Arrays"],
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    description: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected - if two adjacent houses are broken into, it will alert the police. Given an array representing money at each house, return the maximum amount you can rob without alerting police.",
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
    examples: [
      { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 1 (1) and house 3 (3) = 4" },
      { input: "nums = [2,7,9,3,1]", output: "12", explanation: "Rob house 1 (2) + house 3 (9) + house 5 (1) = 12" }
    ],
    hints: ["Think about the decision at each house", "dp[i] = max(dp[i-1], dp[i-2] + nums[i])", "Can optimize space to O(1)"],
    learningResources: {
      videos: [
        { title: "House Robber - DP", url: "https://www.youtube.com/watch?v=73r3KWiEvyk", channel: "NeetCode", duration: "9:30" }
      ],
      articles: [
        { title: "House Robber Solution", url: "https://leetcode.com/problems/house-robber/solution/", source: "LeetCode" }
      ]
    },
    solution: {
      approach: "Dynamic Programming",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    metadata: { frequency: 8.7, acceptanceRate: 48.5 }
  },

  // 8. Dynamic Programming
  {
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    difficulty: "Easy",
    topics: ["Dynamic Programming", "Math"],
    companies: ["Google", "Amazon", "Microsoft", "Apple", "Adobe"],
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    constraints: ["1 <= n <= 45"],
    examples: [
      { input: "n = 2", output: "2", explanation: "1+1 or 2" },
      { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, or 2+1" }
    ],
    hints: ["This is essentially Fibonacci sequence", "dp[n] = dp[n-1] + dp[n-2]", "Base cases: dp[1]=1, dp[2]=2"],
    learningResources: {
      videos: [
        { title: "Climbing Stairs - DP", url: "https://www.youtube.com/watch?v=Y0lT9Fck7qI", channel: "NeetCode", duration: "7:15" }
      ],
      articles: [
        { title: "Climbing Stairs Solution", url: "https://leetcode.com/problems/climbing-stairs/solution/", source: "LeetCode" }
      ]
    },
    solution: {
      approach: "Dynamic Programming",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    metadata: { frequency: 8.0, acceptanceRate: 51.2 }
  },

  // 9. Graph - BFS
  {
    title: "Rotting Oranges",
    slug: "rotting-oranges",
    difficulty: "Medium",
    topics: ["BFS", "Graph", "Matrix"],
    companies: ["Amazon", "Microsoft", "Google", "Meta"],
    description: "You are given an m x n grid where each cell can have one of three values: 0 (empty), 1 (fresh orange), or 2 (rotten orange). Every minute, any fresh orange adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If impossible, return -1.",
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 10"],
    examples: [
      { input: "grid = [[2,1,1],[1,1,0],[0,1,1]]", output: "4", explanation: "Takes 4 minutes for all oranges to rot" }
    ],
    hints: ["Use multi-source BFS", "Start BFS from all rotten oranges simultaneously", "Track time as BFS levels"],
    learningResources: {
      videos: [
        { title: "Rotting Oranges - BFS", url: "https://www.youtube.com/watch?v=y704fEOx0s0", channel: "NeetCode", duration: "13:20" }
      ],
      articles: [
        { title: "Rotting Oranges Solution", url: "https://leetcode.com/problems/rotting-oranges/solution/", source: "LeetCode" }
      ]
    },
    solution: {
      approach: "Multi-source BFS",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m*n)"
    },
    metadata: { frequency: 8.5, acceptanceRate: 52.8 }
  },

  // 10. Graph - DFS
  {
    title: "Pacific Atlantic Water Flow",
    slug: "pacific-atlantic-water-flow",
    difficulty: "Medium",
    topics: ["DFS", "BFS", "Graph", "Matrix"],
    companies: ["Google", "Amazon", "Meta"],
    description: "There is an m x n rectangular island that borders both the Pacific and Atlantic Ocean. Water can flow from a cell to adjacent cells with equal or lower height. Return a list of grid coordinates where water can flow to both oceans.",
    constraints: ["m == heights.length", "n == heights[r].length", "1 <= m, n <= 200"],
    examples: [
      { input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]", explanation: "Cells that can reach both oceans" }
    ],
    hints: ["Start DFS from ocean borders", "Track cells reachable from Pacific and Atlantic separately", "Return intersection"],
    learningResources: {
      videos: [
        { title: "Pacific Atlantic Water Flow", url: "https://www.youtube.com/watch?v=s-VkcjHqkGI", channel: "NeetCode", duration: "16:30" }
      ],
      articles: [
        { title: "Water Flow Solution", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/solution/", source: "LeetCode" }
      ]
    },
    solution: {
      approach: "DFS from borders",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m*n)"
    },
    metadata: { frequency: 7.8, acceptanceRate: 53.1 }
  },

  // 11. Trie
  {
    title: "Implement Trie (Prefix Tree)",
    slug: "implement-trie-prefix-tree",
    difficulty: "Medium",
    topics: ["Trie", "Design", "String"],
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    description: "Implement a trie with insert, search, and startsWith methods. A trie is a tree-like data structure for efficient storage and retrieval of strings.",
    constraints: ["1 <= word.length, prefix.length <= 2000", "word and prefix consist only of lowercase English letters"],
    examples: [
      { input: "['Trie', 'insert', 'search', 'search', 'startsWith', 'insert', 'search']\n[[], ['apple'], ['apple'], ['app'], ['app'], ['app'], ['app']]", output: "[null, null, true, false, true, null, true]", explanation: "Trie operations" }
    ],
    hints: ["Use a TrieNode class with children map and isEnd flag", "Insert: traverse or create nodes for each character", "Search: traverse and check isEnd"],
    learningResources: {
      videos: [
        { title: "Implement Trie", url: "https://www.youtube.com/watch?v=oobqoCJlHA0", channel: "NeetCode", duration: "14:50" }
      ],
      articles: [
        { title: "Trie Data Structure", url: "https://leetcode.com/problems/implement-trie-prefix-tree/solution/", source: "LeetCode" }
      ]
    },
    solution: {
      approach: "Trie Implementation",
      timeComplexity: "O(m) per operation",
      spaceComplexity: "O(n*m)"
    },
    metadata: { frequency: 8.2, acceptanceRate: 62.5 }
  },

  // 12. Union Find
  {
    title: "Number of Connected Components",
    slug: "number-of-connected-components",
    difficulty: "Medium",
    topics: ["Union Find", "Graph", "DFS"],
    companies: ["Google", "Amazon", "Meta", "LinkedIn"],
    description: "You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates there is an edge between ai and bi. Return the number of connected components in the graph.",
    constraints: ["1 <= n <= 2000", "1 <= edges.length <= 5000"],
    examples: [
      { input: "n = 5, edges = [[0,1],[1,2],[3,4]]", output: "2", explanation: "Two components: {0,1,2} and {3,4}" }
    ],
    hints: ["Use Union-Find with path compression", "Alternative: DFS/BFS from each unvisited node", "Count unique roots in Union-Find"],
    learningResources: {
      videos: [
        { title: "Union Find Explained", url: "https://www.youtube.com/watch?v=8f1XPm4WOUc", channel: "NeetCode", duration: "18:20" }
      ],
      articles: [
        { title: "Union Find Algorithm", url: "https://www.geeksforgeeks.org/union-find/", source: "GeeksforGeeks" }
      ]
    },
    solution: {
      approach: "Union Find",
      timeComplexity: "O(n + e * α(n))",
      spaceComplexity: "O(n)"
    },
    metadata: { frequency: 7.5, acceptanceRate: 61.2 }
  },

  // 13. Bit Manipulation
  {
    title: "Single Number",
    slug: "single-number",
    difficulty: "Easy",
    topics: ["Bit Manipulation", "Arrays"],
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with linear runtime complexity and use only constant extra space.",
    constraints: ["1 <= nums.length <= 3 * 10^4", "-3 * 10^4 <= nums[i] <= 3 * 10^4"],
    examples: [
      { input: "nums = [2,2,1]", output: "1", explanation: "1 appears only once" },
      { input: "nums = [4,1,2,1,2]", output: "4", explanation: "4 appears only once" }
    ],
    hints: ["XOR of a number with itself is 0", "XOR of a number with 0 is the number", "XOR all numbers together"],
    learningResources: {
      videos: [
        { title: "Single Number - XOR", url: "https://www.youtube.com/watch?v=qMPX1AOa83k", channel: "NeetCode", duration: "5:30" }
      ],
      articles: [
        { title: "Single Number Solution", url: "https://leetcode.com/problems/single-number/solution/", source: "LeetCode" }
      ]
    },
    solution: {
      approach: "XOR",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    metadata: { frequency: 7.8, acceptanceRate: 69.8 }
  },

  // 14. Matrix
  {
    title: "Spiral Matrix",
    slug: "spiral-matrix",
    difficulty: "Medium",
    topics: ["Matrix", "Arrays", "Simulation"],
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
    description: "Given an m x n matrix, return all elements of the matrix in spiral order.",
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 10"],
    examples: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]", explanation: "Spiral order traversal" }
    ],
    hints: ["Maintain four boundaries: top, bottom, left, right", "Process one layer at a time", "Shrink boundaries after processing each direction"],
    learningResources: {
      videos: [
        { title: "Spiral Matrix", url: "https://www.youtube.com/watch?v=BJnMZNwUk1M", channel: "NeetCode", duration: "11:45" }
      ],
      articles: [
        { title: "Spiral Matrix Solution", url: "https://leetcode.com/problems/spiral-matrix/solution/", source: "LeetCode" }
      ]
    },
    solution: {
      approach: "Layer by Layer",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(1)"
    },
    metadata: { frequency: 8.3, acceptanceRate: 45.2 }
  },

  // 15. Hard - Sliding Window
  {
    title: "Minimum Window Substring",
    slug: "minimum-window-substring",
    difficulty: "Hard",
    topics: ["Sliding Window", "Hash Table", "String"],
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple"],
    description: "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return empty string.",
    constraints: ["m == s.length", "n == t.length", "1 <= m, n <= 10^5"],
    examples: [
      { input: "s = 'ADOBECODEBANC', t = 'ABC'", output: "'BANC'", explanation: "The minimum window containing all characters of t" }
    ],
    hints: ["Use two pointers for sliding window", "Expand right to include characters", "Shrink left to minimize window"],
    learningResources: {
      videos: [
        { title: "Minimum Window Substring", url: "https://www.youtube.com/watch?v=jSto0O4AJbM", channel: "NeetCode", duration: "18:40" }
      ],
      articles: [
        { title: "Minimum Window Substring", url: "https://leetcode.com/problems/minimum-window-substring/solution/", source: "LeetCode" }
      ]
    },
    solution: {
      approach: "Sliding Window",
      timeComplexity: "O(m + n)",
      spaceComplexity: "O(m + n)"
    },
    metadata: { frequency: 9.0, acceptanceRate: 40.5 }
  },

  // 16. Hard - DP
  {
    title: "Edit Distance",
    slug: "edit-distance",
    difficulty: "Hard",
    topics: ["Dynamic Programming", "String"],
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    description: "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have three operations: insert a character, delete a character, replace a character.",
    constraints: ["0 <= word1.length, word2.length <= 500", "word1 and word2 consist of lowercase English letters"],
    examples: [
      { input: "word1 = 'horse', word2 = 'ros'", output: "3", explanation: "horse -> rorse -> rose -> ros" }
    ],
    hints: ["Use 2D DP table", "dp[i][j] = min operations for word1[0..i-1] to word2[0..j-1]", "Consider insert, delete, replace operations"],
    learningResources: {
      videos: [
        { title: "Edit Distance - DP", url: "https://www.youtube.com/watch?v=XYi2-LPrwm4", channel: "NeetCode", duration: "16:30" }
      ],
      articles: [
        { title: "Edit Distance Solution", url: "https://leetcode.com/problems/edit-distance/solution/", source: "LeetCode" }
      ]
    },
    solution: {
      approach: "Dynamic Programming",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m*n)"
    },
    metadata: { frequency: 8.5, acceptanceRate: 53.2 }
  },

  // 17. Hard - Graph
  {
    title: "Alien Dictionary",
    slug: "alien-dictionary",
    difficulty: "Hard",
    topics: ["Graph", "Topological Sort", "BFS"],
    companies: ["Google", "Amazon", "Meta", "Airbnb"],
    description: "There is a new alien language that uses the English alphabet. The order of letters is unknown. Given a list of strings words from the alien language's dictionary sorted lexicographically, derive the order of letters in this alien language.",
    constraints: ["1 <= words.length <= 100", "1 <= words[i].length <= 100"],
    examples: [
      { input: "words = ['wrt','wrf','er','ett','rftt']", output: "'wertf'", explanation: "The order is: w -> e -> r -> t -> f" }
    ],
    hints: ["Build a graph from adjacent word comparisons", "Use topological sort", "Detect cycles for invalid input"],
    learningResources: {
      videos: [
        { title: "Alien Dictionary", url: "https://www.youtube.com/watch?v=6kTZYvNNyps", channel: "NeetCode", duration: "20:15" }
      ],
      articles: [
        { title: "Alien Dictionary Solution", url: "https://www.geeksforgeeks.org/given-sorted-dictionary-find-precedence-characters/", source: "GeeksforGeeks" }
      ]
    },
    solution: {
      approach: "Topological Sort",
      timeComplexity: "O(C)",
      spaceComplexity: "O(1)"
    },
    metadata: { frequency: 8.0, acceptanceRate: 35.8 }
  },

  // 18. Hard - Heap
  {
    title: "Merge K Sorted Lists",
    slug: "merge-k-sorted-lists",
    difficulty: "Hard",
    topics: ["Linked List", "Heap", "Divide and Conquer"],
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple"],
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    constraints: ["k == lists.length", "0 <= k <= 10^4", "0 <= lists[i].length <= 500"],
    examples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]", explanation: "Merged sorted list" }
    ],
    hints: ["Use a min-heap to track smallest elements", "Divide and conquer approach also works", "Compare heads of all lists"],
    learningResources: {
      videos: [
        { title: "Merge K Sorted Lists", url: "https://www.youtube.com/watch?v=q5a5OiGbT6Q", channel: "NeetCode", duration: "14:20" }
      ],
      articles: [
        { title: "Merge K Sorted Lists", url: "https://leetcode.com/problems/merge-k-sorted-lists/solution/", source: "LeetCode" }
      ]
    },
    solution: {
      approach: "Min Heap",
      timeComplexity: "O(N log k)",
      spaceComplexity: "O(k)"
    },
    metadata: { frequency: 9.2, acceptanceRate: 50.1 }
  },

  // 19. Interval
  {
    title: "Non-overlapping Intervals",
    slug: "non-overlapping-intervals",
    difficulty: "Medium",
    topics: ["Arrays", "Greedy", "Sorting"],
    companies: ["Google", "Amazon", "Meta"],
    description: "Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
    constraints: ["1 <= intervals.length <= 10^5", "intervals[i].length == 2"],
    examples: [
      { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1", explanation: "Remove [1,3] to make rest non-overlapping" }
    ],
    hints: ["Sort intervals by end time", "Greedily keep intervals that end earliest", "Count overlapping intervals to remove"],
    learningResources: {
      videos: [
        { title: "Non-overlapping Intervals", url: "https://www.youtube.com/watch?v=nONCGxWoUfM", channel: "NeetCode", duration: "12:30" }
      ],
      articles: [
        { title: "Non-overlapping Intervals", url: "https://leetcode.com/problems/non-overlapping-intervals/solution/", source: "LeetCode" }
      ]
    },
    solution: {
      approach: "Greedy",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1)"
    },
    metadata: { frequency: 7.8, acceptanceRate: 51.5 }
  },

  // 20. Tree
  {
    title: "Binary Tree Level Order Traversal",
    slug: "binary-tree-level-order-traversal",
    difficulty: "Medium",
    topics: ["Tree", "BFS", "Binary Tree"],
    companies: ["Google", "Amazon", "Meta", "Microsoft"],
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    constraints: ["The number of nodes in the tree is in the range [0, 2000]", "-1000 <= Node.val <= 1000"],
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]", explanation: "Level by level traversal" }
    ],
    hints: ["Use BFS with a queue", "Process all nodes at current level before moving to next", "Track level sizes"],
    learningResources: {
      videos: [
        { title: "Level Order Traversal", url: "https://www.youtube.com/watch?v=6ZnyEApgFYg", channel: "NeetCode", duration: "8:45" }
      ],
      articles: [
        { title: "Level Order Traversal", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/solution/", source: "LeetCode" }
      ]
    },
    solution: {
      approach: "BFS",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)"
    },
    metadata: { frequency: 8.5, acceptanceRate: 63.8 }
  }
];

// Function to add a single problem
const addSingleProblem = async (index) => {
  try {
    await connectDB();
    
    if (index < 0 || index >= dsaProblems.length) {
      console.log(`❌ Invalid index. Please choose between 0 and ${dsaProblems.length - 1}`);
      console.log('\nAvailable problems:');
      dsaProblems.forEach((p, i) => console.log(`  ${i}. ${p.title} (${p.difficulty})`));
      process.exit(1);
    }
    
    const problemData = dsaProblems[index];
    const existingProblem = await Problem.findOne({ slug: problemData.slug });
    
    if (existingProblem) {
      console.log(`⏭️  Problem "${problemData.title}" already exists!`);
    } else {
      const problem = new Problem(problemData);
      await problem.save();
      console.log(`✅ Added: ${problemData.title} (${problemData.difficulty})`);
    }
    
    const totalProblems = await Problem.countDocuments();
    console.log(`📊 Total problems in database: ${totalProblems}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

// Function to list all available problems
const listProblems = () => {
  console.log('\n📋 Available DSA Problems to Add:\n');
  dsaProblems.forEach((p, i) => {
    console.log(`  ${i}. ${p.title} (${p.difficulty}) - Topics: ${p.topics.join(', ')}`);
  });
  console.log(`\n💡 Usage: node add-dsa-problems.js <index>`);
  console.log(`   Example: node add-dsa-problems.js 0`);
  console.log(`   To add all: node add-dsa-problems.js all\n`);
};

// Function to add all problems
const addAllProblems = async () => {
  try {
    await connectDB();
    
    console.log(`\n🚀 Adding ${dsaProblems.length} DSA problems...\n`);
    let added = 0, skipped = 0;
    
    for (const problemData of dsaProblems) {
      const existingProblem = await Problem.findOne({ slug: problemData.slug });
      
      if (existingProblem) {
        console.log(`⏭️  Skipping: ${problemData.title} (already exists)`);
        skipped++;
      } else {
        const problem = new Problem(problemData);
        await problem.save();
        console.log(`✅ Added: ${problemData.title} (${problemData.difficulty})`);
        added++;
      }
    }
    
    const totalProblems = await Problem.countDocuments();
    console.log(`\n🎉 Done! Added: ${added}, Skipped: ${skipped}`);
    console.log(`📊 Total problems in database: ${totalProblems}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

// Main execution
const arg = process.argv[2];

if (!arg) {
  listProblems();
} else if (arg === 'all') {
  addAllProblems();
} else if (arg === 'list') {
  listProblems();
} else {
  const index = parseInt(arg);
  if (isNaN(index)) {
    console.log('❌ Please provide a valid number or "all"');
    listProblems();
  } else {
    addSingleProblem(index);
  }
}
