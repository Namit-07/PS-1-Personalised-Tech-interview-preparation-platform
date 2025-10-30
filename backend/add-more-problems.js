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

const newProblems = [
  // Arrays & Hashing
  {
    title: "Product of Array Except Self",
    slug: "product-of-array-except-self",
    difficulty: "Medium",
    topics: ["Arrays", "Prefix Sum"],
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
    constraints: "2 <= nums.length <= 10^5, -30 <= nums[i] <= 30",
    examples: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" }
    ],
    learningResources: {
      videos: [
        { title: "Product of Array Except Self - NeetCode", url: "https://www.youtube.com/watch?v=bNvIQI2wAjk", channel: "NeetCode", duration: "10:32" },
        { title: "Array Product Trick Explained", url: "https://www.youtube.com/watch?v=tSRFtR3pv74", channel: "Kevin Naughton Jr.", duration: "8:45" }
      ],
      articles: [
        { title: "Product of Array Except Self Solution", url: "https://leetcode.com/problems/product-of-array-except-self/solution/", source: "LeetCode" },
        { title: "Prefix and Suffix Products", url: "https://www.geeksforgeeks.org/product-array-puzzle-set-2-o1-space/", source: "GeeksforGeeks" }
      ],
      documentation: [
        { title: "Array Methods", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array", description: "MDN Array documentation" }
      ]
    }
  },
  {
    title: "Longest Consecutive Sequence",
    slug: "longest-consecutive-sequence",
    difficulty: "Medium",
    topics: ["Arrays", "Hash Table"],
    companies: ["Google", "Amazon", "Meta"],
    description: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",
    constraints: "0 <= nums.length <= 10^5, -10^9 <= nums[i] <= 10^9",
    examples: [
      { input: "nums = [100,4,200,1,3,2]", output: "4" },
      { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" }
    ],
    learningResources: {
      videos: [
        { title: "Longest Consecutive Sequence - NeetCode", url: "https://www.youtube.com/watch?v=P6RZZMu_maU", channel: "NeetCode", duration: "9:54" }
      ],
      articles: [
        { title: "Longest Consecutive Sequence", url: "https://leetcode.com/problems/longest-consecutive-sequence/solution/", source: "LeetCode" }
      ],
      documentation: [
        { title: "Set in JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set", description: "Using Sets for O(1) lookups" }
      ]
    }
  },

  // Linked Lists
  {
    title: "Add Two Numbers",
    slug: "add-two-numbers",
    difficulty: "Medium",
    topics: ["Linked List", "Math"],
    companies: ["Amazon", "Microsoft", "Apple"],
    description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    constraints: "1 <= list length <= 100, 0 <= Node.val <= 9",
    examples: [
      { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]" }
    ],
    learningResources: {
      videos: [
        { title: "Add Two Numbers - NeetCode", url: "https://www.youtube.com/watch?v=wgFPrzTjm7s", channel: "NeetCode", duration: "11:20" }
      ],
      articles: [
        { title: "Add Two Numbers Solution", url: "https://leetcode.com/problems/add-two-numbers/solution/", source: "LeetCode" }
      ],
      documentation: [
        { title: "Linked List Operations", url: "https://www.geeksforgeeks.org/data-structures/linked-list/", description: "Complete linked list guide" }
      ]
    }
  },
  {
    title: "Copy List with Random Pointer",
    slug: "copy-list-with-random-pointer",
    difficulty: "Medium",
    topics: ["Linked List", "Hash Table"],
    companies: ["Meta", "Amazon", "Microsoft"],
    description: "A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null. Construct a deep copy of the list.",
    constraints: "0 <= n <= 1000, -10^4 <= Node.val <= 10^4",
    examples: [
      { input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]", output: "[[7,null],[13,0],[11,4],[10,2],[1,0]]" }
    ],
    learningResources: {
      videos: [
        { title: "Copy List with Random Pointer - NeetCode", url: "https://www.youtube.com/watch?v=5Y2EiZST97Y", channel: "NeetCode", duration: "12:15" }
      ],
      articles: [
        { title: "Deep Copy with Random Pointers", url: "https://leetcode.com/problems/copy-list-with-random-pointer/solution/", source: "LeetCode" }
      ],
      documentation: [
        { title: "HashMap for Node Mapping", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map", description: "Using Map for deep copy" }
      ]
    }
  },

  // Binary Search
  {
    title: "Find Minimum in Rotated Sorted Array",
    slug: "find-minimum-in-rotated-sorted-array",
    difficulty: "Medium",
    topics: ["Binary Search", "Arrays"],
    companies: ["Amazon", "Microsoft", "Apple"],
    description: "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array.",
    constraints: "n == nums.length, 1 <= n <= 5000",
    examples: [
      { input: "nums = [3,4,5,1,2]", output: "1" },
      { input: "nums = [4,5,6,7,0,1,2]", output: "0" }
    ],
    learningResources: {
      videos: [
        { title: "Find Minimum in Rotated Sorted Array - NeetCode", url: "https://www.youtube.com/watch?v=nIVW4P8b1VA", channel: "NeetCode", duration: "9:30" }
      ],
      articles: [
        { title: "Binary Search in Rotated Array", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/solution/", source: "LeetCode" }
      ],
      documentation: [
        { title: "Binary Search Algorithm", url: "https://www.geeksforgeeks.org/binary-search/", description: "Complete binary search guide" }
      ]
    }
  },
  {
    title: "Search in Rotated Sorted Array",
    slug: "search-in-rotated-sorted-array",
    difficulty: "Medium",
    topics: ["Binary Search", "Arrays"],
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    description: "There is an integer array nums sorted in ascending order (with distinct values). Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",
    constraints: "1 <= nums.length <= 5000, -10^4 <= nums[i] <= 10^4",
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" }
    ],
    learningResources: {
      videos: [
        { title: "Search in Rotated Sorted Array - NeetCode", url: "https://www.youtube.com/watch?v=U8XENwh8Oyw", channel: "NeetCode", duration: "12:40" }
      ],
      articles: [
        { title: "Search in Rotated Array Solution", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/solution/", source: "LeetCode" }
      ],
      documentation: [
        { title: "Modified Binary Search", url: "https://www.geeksforgeeks.org/search-an-element-in-a-rotated-sorted-array/", description: "Binary search variations" }
      ]
    }
  },

  // Trees
  {
    title: "Kth Smallest Element in a BST",
    slug: "kth-smallest-element-in-bst",
    difficulty: "Medium",
    topics: ["Trees", "Binary Search Tree"],
    companies: ["Google", "Amazon", "Meta"],
    description: "Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.",
    constraints: "1 <= k <= number of nodes <= 10^4",
    examples: [
      { input: "root = [3,1,4,null,2], k = 1", output: "1" }
    ],
    learningResources: {
      videos: [
        { title: "Kth Smallest in BST - NeetCode", url: "https://www.youtube.com/watch?v=5LUXSvjmGCw", channel: "NeetCode", duration: "8:25" }
      ],
      articles: [
        { title: "Inorder Traversal for Kth Smallest", url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/solution/", source: "LeetCode" }
      ],
      documentation: [
        { title: "BST Properties", url: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/", description: "Understanding BST" }
      ]
    }
  },
  {
    title: "Lowest Common Ancestor of a Binary Tree",
    slug: "lowest-common-ancestor-binary-tree",
    difficulty: "Medium",
    topics: ["Trees", "Recursion"],
    companies: ["Amazon", "Microsoft", "Meta"],
    description: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.",
    constraints: "2 <= number of nodes <= 10^5",
    examples: [
      { input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1", output: "3" }
    ],
    learningResources: {
      videos: [
        { title: "Lowest Common Ancestor - NeetCode", url: "https://www.youtube.com/watch?v=gs2LMfuOR9k", channel: "NeetCode", duration: "11:15" }
      ],
      articles: [
        { title: "LCA in Binary Tree", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/solution/", source: "LeetCode" }
      ],
      documentation: [
        { title: "Tree Recursion Patterns", url: "https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/", description: "Tree traversal methods" }
      ]
    }
  },

  // Dynamic Programming
  {
    title: "Coin Change",
    slug: "coin-change",
    difficulty: "Medium",
    topics: ["Dynamic Programming"],
    companies: ["Amazon", "Google", "Meta"],
    description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount.",
    constraints: "1 <= coins.length <= 12, 1 <= coins[i] <= 2^31 - 1, 0 <= amount <= 10^4",
    examples: [
      { input: "coins = [1,2,5], amount = 11", output: "3" }
    ],
    learningResources: {
      videos: [
        { title: "Coin Change - Dynamic Programming - NeetCode", url: "https://www.youtube.com/watch?v=H9bfqozjoqs", channel: "NeetCode", duration: "13:12" }
      ],
      articles: [
        { title: "Coin Change Problem", url: "https://leetcode.com/problems/coin-change/solution/", source: "LeetCode" }
      ],
      documentation: [
        { title: "Dynamic Programming Patterns", url: "https://www.geeksforgeeks.org/dynamic-programming/", description: "DP fundamentals" }
      ]
    }
  },
  {
    title: "Longest Increasing Subsequence",
    slug: "longest-increasing-subsequence",
    difficulty: "Medium",
    topics: ["Dynamic Programming", "Binary Search"],
    companies: ["Google", "Amazon", "Microsoft"],
    description: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    constraints: "1 <= nums.length <= 2500, -10^4 <= nums[i] <= 10^4",
    examples: [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4" }
    ],
    learningResources: {
      videos: [
        { title: "Longest Increasing Subsequence - NeetCode", url: "https://www.youtube.com/watch?v=cjWnW0hdF1Y", channel: "NeetCode", duration: "14:30" }
      ],
      articles: [
        { title: "LIS Solution", url: "https://leetcode.com/problems/longest-increasing-subsequence/solution/", source: "LeetCode" }
      ],
      documentation: [
        { title: "DP with Binary Search", url: "https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/", description: "Optimized LIS" }
      ]
    }
  },

  // Graphs
  {
    title: "Course Schedule",
    slug: "course-schedule",
    difficulty: "Medium",
    topics: ["Graphs", "Topological Sort"],
    companies: ["Amazon", "Microsoft", "Meta"],
    description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses.",
    constraints: "1 <= numCourses <= 2000, 0 <= prerequisites.length <= 5000",
    examples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" }
    ],
    learningResources: {
      videos: [
        { title: "Course Schedule - Graph Cycle Detection - NeetCode", url: "https://www.youtube.com/watch?v=EgI5nU9etnU", channel: "NeetCode", duration: "14:45" }
      ],
      articles: [
        { title: "Topological Sort for Course Schedule", url: "https://leetcode.com/problems/course-schedule/solution/", source: "LeetCode" }
      ],
      documentation: [
        { title: "Graph Algorithms", url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/", description: "Complete graph guide" }
      ]
    }
  },
  {
    title: "Number of Islands",
    slug: "number-of-islands",
    difficulty: "Medium",
    topics: ["Graphs", "DFS", "BFS"],
    companies: ["Amazon", "Google", "Meta"],
    description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    constraints: "m == grid.length, n == grid[i].length, 1 <= m, n <= 300",
    examples: [
      { input: "grid = [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]", output: "3" }
    ],
    learningResources: {
      videos: [
        { title: "Number of Islands - DFS Solution - NeetCode", url: "https://www.youtube.com/watch?v=pV2kpPD66nE", channel: "NeetCode", duration: "10:20" }
      ],
      articles: [
        { title: "Number of Islands Solution", url: "https://leetcode.com/problems/number-of-islands/solution/", source: "LeetCode" }
      ],
      documentation: [
        { title: "DFS and BFS", url: "https://www.geeksforgeeks.org/difference-between-bfs-and-dfs/", description: "Graph traversal methods" }
      ]
    }
  },

  // Strings
  {
    title: "Longest Palindromic Substring",
    slug: "longest-palindromic-substring",
    difficulty: "Medium",
    topics: ["Strings", "Dynamic Programming"],
    companies: ["Amazon", "Microsoft", "Apple"],
    description: "Given a string s, return the longest palindromic substring in s.",
    constraints: "1 <= s.length <= 1000",
    examples: [
      { input: "s = 'babad'", output: "'bab' or 'aba'" }
    ],
    learningResources: {
      videos: [
        { title: "Longest Palindromic Substring - NeetCode", url: "https://www.youtube.com/watch?v=XYQecbcd6_c", channel: "NeetCode", duration: "13:25" }
      ],
      articles: [
        { title: "Palindrome Substring Solution", url: "https://leetcode.com/problems/longest-palindromic-substring/solution/", source: "LeetCode" }
      ],
      documentation: [
        { title: "String Methods", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String", description: "JavaScript string methods" }
      ]
    }
  },
  {
    title: "Group Anagrams",
    slug: "group-anagrams",
    difficulty: "Medium",
    topics: ["Strings", "Hash Table"],
    companies: ["Amazon", "Google", "Meta"],
    description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
    constraints: "1 <= strs.length <= 10^4, 0 <= strs[i].length <= 100",
    examples: [
      { input: "strs = ['eat','tea','tan','ate','nat','bat']", output: "[['bat'],['nat','tan'],['ate','eat','tea']]" }
    ],
    learningResources: {
      videos: [
        { title: "Group Anagrams - Hash Map Solution - NeetCode", url: "https://www.youtube.com/watch?v=vzdNOK2oB2E", channel: "NeetCode", duration: "8:50" }
      ],
      articles: [
        { title: "Group Anagrams Solution", url: "https://leetcode.com/problems/group-anagrams/solution/", source: "LeetCode" }
      ],
      documentation: [
        { title: "HashMap in JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map", description: "Using Map for grouping" }
      ]
    }
  },

  // Intervals
  {
    title: "Merge Intervals",
    slug: "merge-intervals",
    difficulty: "Medium",
    topics: ["Arrays", "Sorting"],
    companies: ["Google", "Amazon", "Meta"],
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    constraints: "1 <= intervals.length <= 10^4",
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" }
    ],
    learningResources: {
      videos: [
        { title: "Merge Intervals - NeetCode", url: "https://www.youtube.com/watch?v=44H3cEC2fFM", channel: "NeetCode", duration: "9:15" }
      ],
      articles: [
        { title: "Merge Intervals Solution", url: "https://leetcode.com/problems/merge-intervals/solution/", source: "LeetCode" }
      ],
      documentation: [
        { title: "Sorting in JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort", description: "Array sorting methods" }
      ]
    }
  },
  {
    title: "Insert Interval",
    slug: "insert-interval",
    difficulty: "Medium",
    topics: ["Arrays", "Intervals"],
    companies: ["Google", "Amazon", "Meta"],
    description: "You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval. Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).",
    constraints: "0 <= intervals.length <= 10^4",
    examples: [
      { input: "intervals = [[1,3],[6,9]], newInterval = [2,5]", output: "[[1,5],[6,9]]" }
    ],
    learningResources: {
      videos: [
        { title: "Insert Interval - NeetCode", url: "https://www.youtube.com/watch?v=A8NUOmlwOlM", channel: "NeetCode", duration: "11:30" }
      ],
      articles: [
        { title: "Insert Interval Solution", url: "https://leetcode.com/problems/insert-interval/solution/", source: "LeetCode" }
      ],
      documentation: [
        { title: "Array Manipulation", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array", description: "Working with arrays" }
      ]
    }
  },

  // Hard Problems
  {
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    difficulty: "Hard",
    topics: ["Arrays", "Two Pointers"],
    companies: ["Google", "Amazon", "Meta"],
    description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    constraints: "n == height.length, 1 <= n <= 2 * 10^4",
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }
    ],
    learningResources: {
      videos: [
        { title: "Trapping Rain Water - NeetCode", url: "https://www.youtube.com/watch?v=ZI2z5pq0TqA", channel: "NeetCode", duration: "13:40" }
      ],
      articles: [
        { title: "Trapping Rain Water Solution", url: "https://leetcode.com/problems/trapping-rain-water/solution/", source: "LeetCode" }
      ],
      documentation: [
        { title: "Two Pointer Technique", url: "https://www.geeksforgeeks.org/two-pointers-technique/", description: "Advanced pointer techniques" }
      ]
    }
  },
  {
    title: "Median of Two Sorted Arrays",
    slug: "median-of-two-sorted-arrays",
    difficulty: "Hard",
    topics: ["Binary Search", "Arrays"],
    companies: ["Google", "Amazon", "Microsoft"],
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    constraints: "nums1.length == m, nums2.length == n, 0 <= m <= 1000",
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000" }
    ],
    learningResources: {
      videos: [
        { title: "Median of Two Sorted Arrays - NeetCode", url: "https://www.youtube.com/watch?v=q6IEA26hvXc", channel: "NeetCode", duration: "19:45" }
      ],
      articles: [
        { title: "Median of Two Sorted Arrays", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/solution/", source: "LeetCode" }
      ],
      documentation: [
        { title: "Advanced Binary Search", url: "https://www.geeksforgeeks.org/binary-search/", description: "Binary search on answer" }
      ]
    }
  },
  {
    title: "Word Ladder",
    slug: "word-ladder",
    difficulty: "Hard",
    topics: ["Graphs", "BFS"],
    companies: ["Amazon", "Google", "Meta"],
    description: "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that every adjacent pair of words differs by a single letter. Return the length of the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.",
    constraints: "1 <= beginWord.length <= 10, endWord.length == beginWord.length",
    examples: [
      { input: "beginWord = 'hit', endWord = 'cog', wordList = ['hot','dot','dog','lot','log','cog']", output: "5" }
    ],
    learningResources: {
      videos: [
        { title: "Word Ladder - BFS Solution - NeetCode", url: "https://www.youtube.com/watch?v=h9iTnkgv05E", channel: "NeetCode", duration: "17:20" }
      ],
      articles: [
        { title: "Word Ladder Solution", url: "https://leetcode.com/problems/word-ladder/solution/", source: "LeetCode" }
      ],
      documentation: [
        { title: "BFS for Shortest Path", url: "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/", description: "BFS algorithm" }
      ]
    }
  }
];

const addProblems = async () => {
  try {
    await connectDB();
    
    console.log(`\n🚀 Adding ${newProblems.length} new problems...\n`);
    
    for (const problemData of newProblems) {
      const existingProblem = await Problem.findOne({ slug: problemData.slug });
      
      if (existingProblem) {
        console.log(`⏭️  Skipping: ${problemData.title} (already exists)`);
        continue;
      }
      
      const problem = new Problem(problemData);
      await problem.save();
      console.log(`✅ Added: ${problemData.title} (${problemData.difficulty})`);
    }
    
    const totalProblems = await Problem.countDocuments();
    console.log(`\n🎉 Done! Total problems in database: ${totalProblems}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding problems:', error);
    process.exit(1);
  }
};

addProblems();
