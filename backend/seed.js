const mongoose = require('mongoose');
const Problem = require('./models/Problem');
require('dotenv').config();

const problems = [
  // EASY PROBLEMS (10)
  {
    title: "Two Sum",
    slug: "two-sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    difficulty: "Easy",
    topics: ["Array", "Hash Table"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: ""
      }
    ],
    hints: [
      "Think about how you can lookup values efficiently",
      "A hash map can store complements as you iterate",
      "For each number, check if target - number exists in the hash map"
    ],
    solution: {
      approach: "Hash Map",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)"
    },
    metadata: {
      frequency: 9.5,
      acceptanceRate: 47.3,
      likes: 28456,
      dislikes: 934
    }
  },
  {
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    difficulty: "Easy",
    topics: ["String", "Stack"],
    companies: ["Google", "Amazon", "Microsoft", "Bloomberg"],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    examples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: ""
      },
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: ""
      },
      {
        input: 's = "(]"',
        output: "false",
        explanation: ""
      }
    ],
    hints: [
      "Use a stack data structure",
      "Push opening brackets onto the stack",
      "When you see a closing bracket, check if it matches the top of the stack"
    ],
    solution: {
      approach: "Stack",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)"
    },
    metadata: {
      frequency: 8.7,
      acceptanceRate: 40.2,
      likes: 15234,
      dislikes: 654
    }
  },
  {
    title: "Merge Two Sorted Lists",
    slug: "merge-two-sorted-lists",
    description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
    difficulty: "Easy",
    topics: ["Linked List", "Recursion"],
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order."
    ],
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
        explanation: ""
      }
    ],
    hints: [
      "Use a dummy node to simplify edge cases",
      "Compare values from both lists and add the smaller one",
      "Handle remaining nodes after one list is exhausted"
    ],
    solution: {
      approach: "Two Pointers",
      timeComplexity: "O(n + m)",
      spaceComplexity: "O(1)"
    },
    metadata: {
      frequency: 7.8,
      acceptanceRate: 61.5,
      likes: 12456,
      dislikes: 432
    }
  },
  {
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    difficulty: "Easy",
    topics: ["Array", "Dynamic Programming"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
      }
    ],
    hints: [
      "Track the minimum price seen so far",
      "Calculate profit at each step",
      "Keep track of maximum profit"
    ],
    solution: {
      approach: "Single Pass",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    metadata: {
      frequency: 8.9,
      acceptanceRate: 52.1,
      likes: 18234,
      dislikes: 567
    }
  },
  {
    title: "Valid Anagram",
    slug: "valid-anagram",
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    difficulty: "Easy",
    topics: ["Hash Table", "String", "Sorting"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook"],
    constraints: [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters."
    ],
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: "true",
        explanation: ""
      },
      {
        input: 's = "rat", t = "car"',
        output: "false",
        explanation: ""
      }
    ],
    hints: [
      "Count the frequency of each character",
      "Compare the frequency maps",
      "Alternative: Sort both strings and compare"
    ],
    solution: {
      approach: "Hash Map",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    metadata: {
      frequency: 7.5,
      acceptanceRate: 61.8,
      likes: 8234,
      dislikes: 234
    }
  },
  {
    title: "Binary Search",
    slug: "binary-search",
    description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.`,
    difficulty: "Easy",
    topics: ["Array", "Binary Search"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook"],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4"
      }
    ],
    hints: [
      "Divide the search space in half each iteration",
      "Compare target with middle element",
      "Adjust left or right pointer based on comparison"
    ],
    solution: {
      approach: "Binary Search",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)"
    },
    metadata: {
      frequency: 8.2,
      acceptanceRate: 55.3,
      likes: 6789,
      dislikes: 123
    }
  },
  {
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    difficulty: "Easy",
    topics: ["Linked List", "Recursion"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
        explanation: ""
      }
    ],
    hints: [
      "Use three pointers: prev, current, next",
      "Reverse the links one by one",
      "Can also be solved recursively"
    ],
    solution: {
      approach: "Iterative",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    metadata: {
      frequency: 9.1,
      acceptanceRate: 71.2,
      likes: 15678,
      dislikes: 234
    }
  },
  {
    title: "Contains Duplicate",
    slug: "contains-duplicate",
    description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`,
    difficulty: "Easy",
    topics: ["Array", "Hash Table", "Sorting"],
    companies: ["Google", "Amazon", "Microsoft"],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "true",
        explanation: ""
      },
      {
        input: "nums = [1,2,3,4]",
        output: "false",
        explanation: ""
      }
    ],
    hints: [
      "Use a hash set to track seen numbers",
      "If you encounter a number already in the set, return true",
      "Alternative: Sort the array and check adjacent elements"
    ],
    solution: {
      approach: "Hash Set",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)"
    },
    metadata: {
      frequency: 7.3,
      acceptanceRate: 60.5,
      likes: 5678,
      dislikes: 987
    }
  },
  {
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.`,
    difficulty: "Easy",
    topics: ["Array", "Dynamic Programming", "Divide and Conquer"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "LinkedIn"],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6."
      }
    ],
    hints: [
      "Use Kadane's algorithm",
      "Track current sum and maximum sum",
      "Reset current sum if it becomes negative"
    ],
    solution: {
      approach: "Kadane's Algorithm",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    metadata: {
      frequency: 8.6,
      acceptanceRate: 49.7,
      likes: 21234,
      dislikes: 876
    }
  },
  {
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    difficulty: "Easy",
    topics: ["Math", "Dynamic Programming", "Memoization"],
    companies: ["Google", "Amazon", "Adobe"],
    constraints: [
      "1 <= n <= 45"
    ],
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps"
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "There are three ways: 1. 1+1+1, 2. 1+2, 3. 2+1"
      }
    ],
    hints: [
      "This is a Fibonacci sequence problem",
      "ways(n) = ways(n-1) + ways(n-2)",
      "Can be solved with DP or recursion with memoization"
    ],
    solution: {
      approach: "Dynamic Programming",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    metadata: {
      frequency: 7.9,
      acceptanceRate: 51.2,
      likes: 14567,
      dislikes: 432
    }
  },

  // MEDIUM PROBLEMS (15)
  {
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    difficulty: "Medium",
    topics: ["Hash Table", "String", "Sliding Window"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with the length of 3.'
      }
    ],
    hints: [
      "Use sliding window technique",
      "Use a hash map to store character positions",
      "Move the left pointer when a duplicate is found"
    ],
    solution: {
      approach: "Sliding Window",
      timeComplexity: "O(n)",
      spaceComplexity: "O(min(m,n))"
    },
    metadata: {
      frequency: 9.2,
      acceptanceRate: 33.8,
      likes: 32456,
      dislikes: 1234
    }
  },
  {
    title: "3Sum",
    slug: "3sum",
    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.`,
    difficulty: "Medium",
    topics: ["Array", "Two Pointers", "Sorting"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "Adobe"],
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation: ""
      }
    ],
    hints: [
      "Sort the array first",
      "Fix one element and use two pointers for the remaining two",
      "Skip duplicates to avoid duplicate triplets"
    ],
    solution: {
      approach: "Two Pointers",
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)"
    },
    metadata: {
      frequency: 8.5,
      acceptanceRate: 31.2,
      likes: 19876,
      dislikes: 1876
    }
  },
  {
    title: "Container With Most Water",
    slug: "container-with-most-water",
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.`,
    difficulty: "Medium",
    topics: ["Array", "Two Pointers", "Greedy"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook"],
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation: "The vertical lines are at indices 1 and 8, which form a container with area 7 * 7 = 49."
      }
    ],
    hints: [
      "Use two pointers at the beginning and end",
      "Move the pointer with the smaller height",
      "Calculate area at each step and track maximum"
    ],
    solution: {
      approach: "Two Pointers",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    metadata: {
      frequency: 8.1,
      acceptanceRate: 54.3,
      likes: 21345,
      dislikes: 1234
    }
  },
  {
    title: "Product of Array Except Self",
    slug: "product-of-array-except-self",
    description: `Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.`,
    difficulty: "Medium",
    topics: ["Array", "Prefix Sum"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
    constraints: [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30",
      "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer."
    ],
    examples: [
      {
        input: "nums = [1,2,3,4]",
        output: "[24,12,8,6]",
        explanation: ""
      }
    ],
    hints: [
      "Calculate prefix products from left to right",
      "Calculate suffix products from right to left",
      "Multiply prefix and suffix for each position"
    ],
    solution: {
      approach: "Prefix and Suffix Products",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    metadata: {
      frequency: 8.7,
      acceptanceRate: 65.2,
      likes: 16789,
      dislikes: 876
    }
  },
  {
    title: "Group Anagrams",
    slug: "group-anagrams",
    description: `Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    difficulty: "Medium",
    topics: ["Array", "Hash Table", "String", "Sorting"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "Uber"],
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters."
    ],
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
        explanation: ""
      }
    ],
    hints: [
      "Use a hash map with sorted string as key",
      "Group strings with the same sorted version",
      "Alternative: Use character frequency as key"
    ],
    solution: {
      approach: "Hash Map with Sorting",
      timeComplexity: "O(n * k log k)",
      spaceComplexity: "O(n * k)"
    },
    metadata: {
      frequency: 8.3,
      acceptanceRate: 64.7,
      likes: 14567,
      dislikes: 456
    }
  },
  {
    title: "Longest Palindromic Substring",
    slug: "longest-palindromic-substring",
    description: `Given a string s, return the longest palindromic substring in s.`,
    difficulty: "Medium",
    topics: ["String", "Dynamic Programming"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook"],
    constraints: [
      "1 <= s.length <= 1000",
      "s consist of only digits and English letters."
    ],
    examples: [
      {
        input: 's = "babad"',
        output: '"bab" or "aba"',
        explanation: "Both are valid answers."
      }
    ],
    hints: [
      "Expand around center for each character",
      "Check both odd and even length palindromes",
      "Can also use Dynamic Programming"
    ],
    solution: {
      approach: "Expand Around Center",
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)"
    },
    metadata: {
      frequency: 8.9,
      acceptanceRate: 32.5,
      likes: 23456,
      dislikes: 1345
    }
  },
  {
    title: "Merge Intervals",
    slug: "merge-intervals",
    description: `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    difficulty: "Medium",
    topics: ["Array", "Sorting"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "Bloomberg"],
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= starti <= endi <= 10^4"
    ],
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "Intervals [1,3] and [2,6] overlap, so merge them into [1,6]."
      }
    ],
    hints: [
      "Sort intervals by start time",
      "Iterate and merge if current overlaps with previous",
      "Otherwise, add current to result"
    ],
    solution: {
      approach: "Sorting",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)"
    },
    metadata: {
      frequency: 8.6,
      acceptanceRate: 45.8,
      likes: 17890,
      dislikes: 678
    }
  },
  {
    title: "Rotate Image",
    slug: "rotate-image",
    description: `You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.`,
    difficulty: "Medium",
    topics: ["Array", "Math", "Matrix"],
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    constraints: [
      "n == matrix.length == matrix[i].length",
      "1 <= n <= 20",
      "-1000 <= matrix[i][j] <= 1000"
    ],
    examples: [
      {
        input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        output: "[[7,4,1],[8,5,2],[9,6,3]]",
        explanation: ""
      }
    ],
    hints: [
      "Transpose the matrix (swap matrix[i][j] with matrix[j][i])",
      "Reverse each row",
      "Can also rotate layer by layer"
    ],
    solution: {
      approach: "Transpose and Reverse",
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)"
    },
    metadata: {
      frequency: 7.4,
      acceptanceRate: 68.9,
      likes: 12345,
      dislikes: 567
    }
  },
  {
    title: "Spiral Matrix",
    slug: "spiral-matrix",
    description: `Given an m x n matrix, return all elements of the matrix in spiral order.`,
    difficulty: "Medium",
    topics: ["Array", "Matrix", "Simulation"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook"],
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 10",
      "-100 <= matrix[i][j] <= 100"
    ],
    examples: [
      {
        input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        output: "[1,2,3,6,9,8,7,4,5]",
        explanation: ""
      }
    ],
    hints: [
      "Use four boundaries: top, bottom, left, right",
      "Move right, down, left, up in that order",
      "Shrink boundaries after each direction"
    ],
    solution: {
      approach: "Simulation",
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(1)"
    },
    metadata: {
      frequency: 7.2,
      acceptanceRate: 42.3,
      likes: 10234,
      dislikes: 987
    }
  },
  {
    title: "Jump Game",
    slug: "jump-game",
    description: `You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.`,
    difficulty: "Medium",
    topics: ["Array", "Dynamic Programming", "Greedy"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook"],
    constraints: [
      "1 <= nums.length <= 10^4",
      "0 <= nums[i] <= 10^5"
    ],
    examples: [
      {
        input: "nums = [2,3,1,1,4]",
        output: "true",
        explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index."
      }
    ],
    hints: [
      "Track the maximum reachable index",
      "If current index > max reachable, return false",
      "Greedy approach works well"
    ],
    solution: {
      approach: "Greedy",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    metadata: {
      frequency: 7.8,
      acceptanceRate: 38.6,
      likes: 14567,
      dislikes: 876
    }
  },
  {
    title: "Unique Paths",
    slug: "unique-paths",
    description: `There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.`,
    difficulty: "Medium",
    topics: ["Math", "Dynamic Programming", "Combinatorics"],
    companies: ["Google", "Amazon", "Microsoft", "Bloomberg"],
    constraints: [
      "1 <= m, n <= 100"
    ],
    examples: [
      {
        input: "m = 3, n = 7",
        output: "28",
        explanation: ""
      }
    ],
    hints: [
      "Use Dynamic Programming",
      "paths[i][j] = paths[i-1][j] + paths[i][j-1]",
      "Can optimize space to O(n)"
    ],
    solution: {
      approach: "Dynamic Programming",
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(n)"
    },
    metadata: {
      frequency: 7.6,
      acceptanceRate: 62.4,
      likes: 11234,
      dislikes: 345
    }
  },
  {
    title: "Coin Change",
    slug: "coin-change",
    description: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.`,
    difficulty: "Medium",
    topics: ["Array", "Dynamic Programming", "Breadth-First Search"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "Uber"],
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4"
    ],
    examples: [
      {
        input: "coins = [1,2,5], amount = 11",
        output: "3",
        explanation: "11 = 5 + 5 + 1"
      }
    ],
    hints: [
      "Use Dynamic Programming",
      "dp[i] = minimum coins needed for amount i",
      "dp[i] = min(dp[i], dp[i - coin] + 1) for each coin"
    ],
    solution: {
      approach: "Dynamic Programming",
      timeComplexity: "O(amount * n)",
      spaceComplexity: "O(amount)"
    },
    metadata: {
      frequency: 8.4,
      acceptanceRate: 41.2,
      likes: 16789,
      dislikes: 456
    }
  },
  {
    title: "Word Search",
    slug: "word-search",
    description: `Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.`,
    difficulty: "Medium",
    topics: ["Array", "Backtracking", "Matrix"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
    constraints: [
      "m == board.length",
      "n = board[i].length",
      "1 <= m, n <= 6",
      "1 <= word.length <= 15",
      "board and word consists of only lowercase and uppercase English letters."
    ],
    examples: [
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        output: "true",
        explanation: ""
      }
    ],
    hints: [
      "Use backtracking/DFS",
      "Mark cells as visited during search",
      "Unmark when backtracking"
    ],
    solution: {
      approach: "Backtracking",
      timeComplexity: "O(m * n * 4^L)",
      spaceComplexity: "O(L)"
    },
    metadata: {
      frequency: 8.0,
      acceptanceRate: 39.7,
      likes: 12345,
      dislikes: 456
    }
  },
  {
    title: "Course Schedule",
    slug: "course-schedule",
    description: `There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

Return true if you can finish all courses. Otherwise, return false.`,
    difficulty: "Medium",
    topics: ["Depth-First Search", "Breadth-First Search", "Graph", "Topological Sort"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "Uber"],
    constraints: [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= 5000",
      "prerequisites[i].length == 2",
      "0 <= ai, bi < numCourses",
      "All the pairs prerequisites[i] are unique."
    ],
    examples: [
      {
        input: "numCourses = 2, prerequisites = [[1,0]]",
        output: "true",
        explanation: "Take course 0 first, then course 1."
      }
    ],
    hints: [
      "This is a cycle detection problem in directed graph",
      "Use DFS or BFS (Topological Sort)",
      "If there's a cycle, courses cannot be completed"
    ],
    solution: {
      approach: "DFS Cycle Detection",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V + E)"
    },
    metadata: {
      frequency: 8.3,
      acceptanceRate: 46.8,
      likes: 13456,
      dislikes: 567
    }
  },
  {
    title: "Number of Islands",
    slug: "number-of-islands",
    description: `Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    difficulty: "Medium",
    topics: ["Array", "Depth-First Search", "Breadth-First Search", "Union Find", "Matrix"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'."
    ],
    examples: [
      {
        input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: "1",
        explanation: ""
      }
    ],
    hints: [
      "Use DFS or BFS to explore each island",
      "Mark visited cells to avoid counting twice",
      "Increment counter for each new island found"
    ],
    solution: {
      approach: "DFS",
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(m * n)"
    },
    metadata: {
      frequency: 9.0,
      acceptanceRate: 55.3,
      likes: 19876,
      dislikes: 456
    }
  },

  // HARD PROBLEMS (5)
  {
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
    difficulty: "Hard",
    topics: ["Array", "Two Pointers", "Dynamic Programming", "Stack", "Monotonic Stack"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "The elevation map traps 6 units of rain water."
      }
    ],
    hints: [
      "Water level at each position = min(max_left, max_right) - height[i]",
      "Can use two pointers or dynamic programming",
      "Or use a stack to track decreasing heights"
    ],
    solution: {
      approach: "Two Pointers",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    metadata: {
      frequency: 8.8,
      acceptanceRate: 58.3,
      likes: 25678,
      dislikes: 345
    }
  },
  {
    title: "Median of Two Sorted Arrays",
    slug: "median-of-two-sorted-arrays",
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).`,
    difficulty: "Hard",
    topics: ["Array", "Binary Search", "Divide and Conquer"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook"],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6"
    ],
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2."
      }
    ],
    hints: [
      "Use binary search on the smaller array",
      "Partition both arrays such that left half <= right half",
      "Median is based on the partition elements"
    ],
    solution: {
      approach: "Binary Search",
      timeComplexity: "O(log(min(m,n)))",
      spaceComplexity: "O(1)"
    },
    metadata: {
      frequency: 7.9,
      acceptanceRate: 35.8,
      likes: 22345,
      dislikes: 2345
    }
  },
  {
    title: "Merge k Sorted Lists",
    slug: "merge-k-sorted-lists",
    description: `You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.`,
    difficulty: "Hard",
    topics: ["Linked List", "Divide and Conquer", "Heap (Priority Queue)", "Merge Sort"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
    constraints: [
      "k == lists.length",
      "0 <= k <= 10^4",
      "0 <= lists[i].length <= 500",
      "-10^4 <= lists[i][j] <= 10^4",
      "lists[i] is sorted in ascending order.",
      "The sum of lists[i].length will not exceed 10^4."
    ],
    examples: [
      {
        input: "lists = [[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,3,4,4,5,6]",
        explanation: ""
      }
    ],
    hints: [
      "Use a min-heap to track the smallest element",
      "Or use divide and conquer (merge two at a time)",
      "Priority queue is efficient for this problem"
    ],
    solution: {
      approach: "Min-Heap",
      timeComplexity: "O(N log k)",
      spaceComplexity: "O(k)"
    },
    metadata: {
      frequency: 8.2,
      acceptanceRate: 49.2,
      likes: 16789,
      dislikes: 567
    }
  },
  {
    title: "Longest Valid Parentheses",
    slug: "longest-valid-parentheses",
    description: `Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring.`,
    difficulty: "Hard",
    topics: ["String", "Dynamic Programming", "Stack"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook"],
    constraints: [
      "0 <= s.length <= 3 * 10^4",
      "s[i] is '(', or ')'."
    ],
    examples: [
      {
        input: 's = "(()"',
        output: "2",
        explanation: 'The longest valid parentheses substring is "()".'
      },
      {
        input: 's = ")()())"',
        output: "4",
        explanation: 'The longest valid parentheses substring is "()()".'
      }
    ],
    hints: [
      "Use a stack to track indices of unmatched parentheses",
      "Or use DP: dp[i] = length of longest valid ending at i",
      "Two-pass approach (left-to-right, right-to-left) also works"
    ],
    solution: {
      approach: "Stack",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)"
    },
    metadata: {
      frequency: 7.1,
      acceptanceRate: 32.4,
      likes: 10234,
      dislikes: 345
    }
  },
  {
    title: "Word Ladder",
    slug: "word-ladder",
    description: `A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:
- Every adjacent pair of words differs by a single letter.
- Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
- sk == endWord

Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.`,
    difficulty: "Hard",
    topics: ["Hash Table", "String", "Breadth-First Search"],
    companies: ["Google", "Amazon", "Microsoft", "Facebook", "LinkedIn"],
    constraints: [
      "1 <= beginWord.length <= 10",
      "endWord.length == beginWord.length",
      "1 <= wordList.length <= 5000",
      "wordList[i].length == beginWord.length",
      "beginWord, endWord, and wordList[i] consist of lowercase English letters.",
      "beginWord != endWord",
      "All the words in wordList are unique."
    ],
    examples: [
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        output: "5",
        explanation: '"hit" -> "hot" -> "dot" -> "dog" -> "cog"'
      }
    ],
    hints: [
      "Use BFS to find shortest path",
      "For each word, try changing each character",
      "Use a set for O(1) lookup of valid words"
    ],
    solution: {
      approach: "BFS",
      timeComplexity: "O(M^2 * N)",
      spaceComplexity: "O(M^2 * N)"
    },
    metadata: {
      frequency: 7.5,
      acceptanceRate: 37.6,
      likes: 10789,
      dislikes: 1789
    }
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techprep')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    return seedProblems();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

async function seedProblems() {
  try {
    // Clear existing problems
    await Problem.deleteMany({});
    console.log('🗑️  Cleared existing problems');

    // Insert new problems
    const result = await Problem.insertMany(problems);
    console.log(`✅ Successfully seeded ${result.length} problems!`);
    
    // Show summary
    const easyCount = problems.filter(p => p.difficulty === 'Easy').length;
    const mediumCount = problems.filter(p => p.difficulty === 'Medium').length;
    const hardCount = problems.filter(p => p.difficulty === 'Hard').length;
    
    console.log('\n📊 Summary:');
    console.log(`   Easy: ${easyCount} problems`);
    console.log(`   Medium: ${mediumCount} problems`);
    console.log(`   Hard: ${hardCount} problems`);
    console.log(`   Total: ${problems.length} problems`);
    
    // Show some sample problems
    console.log('\n📝 Sample problems:');
    result.slice(0, 5).forEach(p => {
      console.log(`   - ${p.title} (${p.difficulty}) - ${p.topics.join(', ')}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding problems:', error);
    process.exit(1);
  }
}
