require('dotenv').config();
const mongoose = require('mongoose');
const Problem = require('./models/Problem');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/techprep';

// Learning resources for common topics
const resourcesByTopic = {
  'Arrays': {
    videos: [
      {
        title: 'Arrays Data Structure Tutorial',
        url: 'https://www.youtube.com/watch?v=55l-aZ7_F24',
        channel: 'CS Dojo',
        duration: '10:23'
      },
      {
        title: 'Array Problem Solving Techniques',
        url: 'https://www.youtube.com/watch?v=Peq4GCPNC5c',
        channel: 'NeetCode',
        duration: '15:45'
      }
    ],
    articles: [
      {
        title: 'Arrays in JavaScript - Complete Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
        source: 'MDN Web Docs'
      },
      {
        title: 'Master Array Problems',
        url: 'https://leetcode.com/explore/learn/card/array-and-string/',
        source: 'LeetCode'
      }
    ],
    documentation: [
      {
        title: 'Array Methods Reference',
        url: 'https://javascript.info/array-methods',
        description: 'Complete guide to array manipulation in JavaScript'
      }
    ]
  },
  'Strings': {
    videos: [
      {
        title: 'String Manipulation Masterclass',
        url: 'https://www.youtube.com/watch?v=Wl3EBGkhHd',
        channel: 'freeCodeCamp',
        duration: '20:15'
      },
      {
        title: 'String Algorithm Patterns',
        url: 'https://www.youtube.com/watch?v=V5-7GzOfADQ',
        channel: 'NeetCode',
        duration: '18:30'
      }
    ],
    articles: [
      {
        title: 'String Processing Techniques',
        url: 'https://www.geeksforgeeks.org/string-data-structure/',
        source: 'GeeksforGeeks'
      }
    ]
  },
  'Two Pointers': {
    videos: [
      {
        title: 'Two Pointers Technique Explained',
        url: 'https://www.youtube.com/watch?v=On03HWe2tZM',
        channel: 'NeetCode',
        duration: '12:40'
      }
    ],
    articles: [
      {
        title: 'Master Two Pointer Problems',
        url: 'https://leetcode.com/articles/two-pointer-technique/',
        source: 'LeetCode'
      }
    ]
  },
  'Dynamic Programming': {
    videos: [
      {
        title: 'Dynamic Programming - Learn to Solve Problems',
        url: 'https://www.youtube.com/watch?v=oBt53YbR9Kk',
        channel: 'freeCodeCamp',
        duration: '5:13:08'
      },
      {
        title: 'DP Patterns You Must Know',
        url: 'https://www.youtube.com/watch?v=OQ5jsbhAv_M',
        channel: 'NeetCode',
        duration: '25:30'
      }
    ],
    articles: [
      {
        title: 'Dynamic Programming Complete Guide',
        url: 'https://www.geeksforgeeks.org/dynamic-programming/',
        source: 'GeeksforGeeks'
      }
    ],
    documentation: [
      {
        title: 'DP Pattern Recognition Guide',
        url: 'https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns',
        description: 'Learn to recognize common DP patterns'
      }
    ]
  },
  'Trees': {
    videos: [
      {
        title: 'Tree Data Structure Crash Course',
        url: 'https://www.youtube.com/watch?v=qH6yxkw0u78',
        channel: 'freeCodeCamp',
        duration: '45:22'
      }
    ],
    articles: [
      {
        title: 'Binary Trees Guide',
        url: 'https://www.geeksforgeeks.org/binary-tree-data-structure/',
        source: 'GeeksforGeeks'
      }
    ]
  },
  'Graphs': {
    videos: [
      {
        title: 'Graph Algorithms for Beginners',
        url: 'https://www.youtube.com/watch?v=tWVWeAqZ0WU',
        channel: 'freeCodeCamp',
        duration: '2:30:45'
      }
    ],
    articles: [
      {
        title: 'Graph Theory Complete Guide',
        url: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/',
        source: 'GeeksforGeeks'
      }
    ]
  }
};

async function addLearningResources() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const problems = await Problem.find({});
    console.log(`📚 Found ${problems.length} problems`);

    let updated = 0;

    for (const problem of problems) {
      // Find matching resources based on problem topics
      let resources = {
        videos: [],
        articles: [],
        documentation: []
      };

      for (const topic of problem.topics) {
        // Check for exact match or partial match
        const matchingKey = Object.keys(resourcesByTopic).find(key => 
          topic.toLowerCase().includes(key.toLowerCase()) || 
          key.toLowerCase().includes(topic.toLowerCase())
        );

        if (matchingKey && resourcesByTopic[matchingKey]) {
          const topicResources = resourcesByTopic[matchingKey];
          
          // Add resources (avoid duplicates)
          if (topicResources.videos) {
            resources.videos.push(...topicResources.videos.filter(v => 
              !resources.videos.some(existing => existing.url === v.url)
            ));
          }
          if (topicResources.articles) {
            resources.articles.push(...topicResources.articles.filter(a => 
              !resources.articles.some(existing => existing.url === a.url)
            ));
          }
          if (topicResources.documentation) {
            resources.documentation.push(...topicResources.documentation.filter(d => 
              !resources.documentation.some(existing => existing.url === d.url)
            ));
          }
        }
      }

      // Add problem-specific NeetCode video if available
      resources.videos.unshift({
        title: `${problem.title} - Solution Explained`,
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(problem.title + ' neetcode')}`,
        channel: 'Search Results',
        duration: 'Varies'
      });

      // Update problem with resources
      if (resources.videos.length > 0 || resources.articles.length > 0 || resources.documentation.length > 0) {
        problem.learningResources = resources;
        await problem.save();
        updated++;
        console.log(`✅ Updated: ${problem.title} (${resources.videos.length} videos, ${resources.articles.length} articles)`);
      }
    }

    console.log(`\n🎉 Successfully updated ${updated} problems with learning resources!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addLearningResources();
