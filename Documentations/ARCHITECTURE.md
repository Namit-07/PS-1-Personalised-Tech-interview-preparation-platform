# 🏗️ System Architecture & Technology Stack

## 📐 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                        │
│                         (Next.js 16)                        │
├─────────────────────────────────────────────────────────────┤
│  Landing  │  Auth  │  Dashboard  │  Problems  │  Progress  │
│   Page    │ Pages  │             │   Solver   │  Analytics │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ REST API (HTTPS)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                       │
│                   (Express.js Middleware)                   │
├─────────────────────────────────────────────────────────────┤
│  Auth   │  Rate    │  CORS   │  Validation  │  Error       │
│  JWT    │  Limit   │         │  (Joi)       │  Handler     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                         │
│                   (Business Logic / Controllers)            │
├───────────────┬──────────────┬──────────────┬──────────────┤
│  Auth         │  Problem     │  Progress    │  AI Agent    │
│  Controller   │  Controller  │  Controller  │  Controller  │
├───────────────┼──────────────┼──────────────┼──────────────┤
│ • Signup      │ • Get List   │ • Track      │ • Chat       │
│ • Login       │ • Get Detail │ • Calculate  │ • Hints      │
│ • Profile     │ • Submit     │ • Analytics  │ • Review     │
└───────────────┴──────────────┴──────────────┴──────────────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│   DATA LAYER (MongoDB)   │  │   AI SERVICES LAYER      │
├──────────────────────────┤  ├──────────────────────────┤
│ • Users Collection       │  │ • OpenAI GPT-4 API       │
│ • Problems Collection    │  │ • Google Gemini API      │
│ • UserProgress          │  │ • Prompt Engineering     │
│ • TopicProficiency      │  │ • Context Management     │
│ • LearningPaths         │  │ • Response Caching       │
└──────────────────────────┘  └──────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   RECOMMENDATION ENGINE                      │
│                  (Custom ML Algorithm)                       │
├─────────────────────────────────────────────────────────────┤
│  • Analyze user proficiency                                 │
│  • Match with target company requirements                   │
│  • Apply spaced repetition                                  │
│  • Calculate success probability                            │
│  • Generate personalized learning path                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### **Frontend Stack**

| Technology | Purpose | Why? |
|------------|---------|------|
| **Next.js 16** | React Framework | • SSR/SSG support<br>• Built-in routing<br>• API routes<br>• Best for SEO |
| **React 19** | UI Library | • Component-based<br>• Large ecosystem<br>• Fast rendering |
| **Tailwind CSS 4** | Styling | • Utility-first<br>• Rapid development<br>• Consistent design |
| **Recharts** | Data Visualization | • Easy to use<br>• Responsive charts<br>• Good documentation |
| **Monaco Editor** | Code Editor | • VS Code editor<br>• Syntax highlighting<br>• Multi-language |
| **Axios** | HTTP Client | • Promise-based<br>• Interceptors<br>• Request/response transform |
| **Zustand** | State Management | • Lightweight<br>• Simple API<br>• No boilerplate |
| **React Hot Toast** | Notifications | • Beautiful UI<br>• Customizable<br>• Promise support |

### **Backend Stack**

| Technology | Purpose | Why? |
|------------|---------|------|
| **Node.js** | Runtime | • JavaScript everywhere<br>• NPM ecosystem<br>• Fast I/O |
| **Express.js** | Web Framework | • Minimalist<br>• Flexible<br>• Large middleware support |
| **MongoDB** | Database | • Flexible schema<br>• JSON-like documents<br>• Scalable |
| **Mongoose** | ODM | • Schema validation<br>• Query building<br>• Middleware support |
| **JWT** | Authentication | • Stateless<br>• Secure<br>• Standard |
| **Bcrypt** | Password Hashing | • Secure<br>• Industry standard<br>• Salt rounds |
| **Joi** | Validation | • Schema-based<br>• Comprehensive<br>• Easy syntax |

### **AI/ML Stack**

| Technology | Purpose | Why? |
|------------|---------|------|
| **OpenAI GPT-4** | AI Agent | • Best quality<br>• Function calling<br>• Code understanding |
| **Google Gemini** | Alternative AI | • Free tier<br>• Good performance<br>• Multimodal |
| **Custom Algorithm** | Recommendations | • Full control<br>• No API costs<br>• Privacy |

### **DevOps & Tools**

| Technology | Purpose | Why? |
|------------|---------|------|
| **Git** | Version Control | • Industry standard<br>• Collaboration<br>• History tracking |
| **Vercel** | Frontend Hosting | • Next.js optimized<br>• Auto-deploy<br>• CDN |
| **Railway/Render** | Backend Hosting | • Easy setup<br>• Free tier<br>• Auto-scaling |
| **MongoDB Atlas** | Database Hosting | • Cloud MongoDB<br>• Free tier<br>• Backups |
| **Biome** | Linting/Formatting | • Fast<br>• All-in-one<br>• TypeScript support |

---

## 🗄️ Database Schema Design

### **1. Users Collection**
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  email: "john@example.com",
  password: "$2b$10$...", // hashed
  targetCompany: "Google",
  targetRole: "Software Engineer",
  experienceLevel: "2-3 years",
  onboardingComplete: true,
  preferences: {
    dailyGoal: 3, // problems per day
    reminderTime: "09:00",
    difficulty: ["Medium", "Hard"]
  },
  stats: {
    totalProblemsSolved: 145,
    currentStreak: 23,
    longestStreak: 45,
    successProbability: 72.5,
    xp: 3850,
    level: 18
  },
  createdAt: ISODate("2025-01-15T10:30:00Z"),
  lastActive: ISODate("2025-10-30T08:15:00Z")
}
```

### **2. Problems Collection**
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  title: "Two Sum",
  slug: "two-sum",
  description: "Given an array of integers nums and an integer target...",
  difficulty: "Easy", // Easy, Medium, Hard
  topics: ["Array", "Hash Table"],
  companies: ["Google", "Amazon", "Microsoft", "Facebook"],
  isPremium: false,
  metadata: {
    frequency: 8.5, // 0-10 scale
    acceptanceRate: 47.3,
    likes: 28456,
    dislikes: 1234
  },
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9"
  ],
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9"
    }
  ],
  testCases: [
    {
      input: [[2,7,11,15], 9],
      output: [0,1],
      isHidden: false
    },
    {
      input: [[3,2,4], 6],
      output: [1,2],
      isHidden: true // For final submission only
    }
  ],
  hints: [
    "Think about how you can lookup values efficiently",
    "Can you use a hash map?",
    "Store complements as you iterate"
  ],
  solution: {
    approach: "Hash Map",
    code: "function twoSum(nums, target) {...}",
    complexity: {
      time: "O(n)",
      space: "O(n)"
    }
  },
  relatedProblems: [
    ObjectId("507f1f77bcf86cd799439013"),
    ObjectId("507f1f77bcf86cd799439014")
  ],
  createdAt: ISODate("2025-01-10T00:00:00Z")
}
```

### **3. UserProgress Collection**
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439015"),
  userId: ObjectId("507f1f77bcf86cd799439011"),
  problemId: ObjectId("507f1f77bcf86cd799439012"),
  status: "Solved", // Attempted, Solved, Reviewed
  attempts: [
    {
      code: "function twoSum(nums, target) {...}",
      language: "javascript",
      passed: false,
      testCasesPassed: 3,
      testCasesTotal: 5,
      runtime: 85, // ms
      memory: 42.5, // MB
      submittedAt: ISODate("2025-10-25T14:30:00Z")
    },
    {
      code: "function twoSum(nums, target) {...}",
      language: "javascript",
      passed: true,
      testCasesPassed: 5,
      testCasesTotal: 5,
      runtime: 68,
      memory: 41.2,
      submittedAt: ISODate("2025-10-25T14:45:00Z")
    }
  ],
  firstSolvedAt: ISODate("2025-10-25T14:45:00Z"),
  lastAttemptAt: ISODate("2025-10-25T14:45:00Z"),
  timeSpent: 900, // seconds (15 minutes)
  hintsUsed: 1,
  notes: "Used hash map approach. Remember to check edge cases!",
  difficulty: "Easy",
  xpEarned: 10
}
```

### **4. TopicProficiency Collection**
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439016"),
  userId: ObjectId("507f1f77bcf86cd799439011"),
  topic: "Dynamic Programming",
  proficiencyScore: 7.2, // 0-10
  problemsSolved: 28,
  problemsTotal: 150, // Total available in this topic
  breakdown: {
    easy: { solved: 12, total: 50 },
    medium: { solved: 14, total: 75 },
    hard: { solved: 2, total: 25 }
  },
  averageTimePerProblem: 1800, // seconds
  successRate: 68.5, // percentage
  lastPracticedAt: ISODate("2025-10-29T16:20:00Z"),
  needsReview: false,
  nextReviewDate: ISODate("2025-11-05T00:00:00Z")
}
```

### **5. LearningPath Collection**
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439017"),
  userId: ObjectId("507f1f77bcf86cd799439011"),
  targetCompany: "Google",
  targetRole: "Software Engineer L4",
  experienceLevel: "2-3 years",
  currentPhase: "Intermediate",
  modules: [
    {
      name: "Data Structures & Algorithms",
      status: "In Progress", // Not Started, In Progress, Completed
      topics: [
        {
          name: "Array",
          status: "Completed",
          proficiency: 8.5,
          problemsSolved: 45,
          problemsRequired: 40
        },
        {
          name: "Dynamic Programming",
          status: "In Progress",
          proficiency: 7.2,
          problemsSolved: 28,
          problemsRequired: 50
        }
      ],
      completionPercentage: 68.5
    },
    {
      name: "System Design",
      status: "Not Started",
      topics: ["HLD Concepts", "Database Design", "Scalability"],
      completionPercentage: 0
    }
  ],
  successProbability: 72.5,
  estimatedCompletionDate: ISODate("2025-12-15T00:00:00Z"),
  generatedAt: ISODate("2025-01-15T10:45:00Z"),
  lastUpdated: ISODate("2025-10-30T08:15:00Z")
}
```

### **6. AIConversations Collection**
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439018"),
  userId: ObjectId("507f1f77bcf86cd799439011"),
  problemId: ObjectId("507f1f77bcf86cd799439012"), // optional
  messages: [
    {
      role: "user",
      content: "Can you explain how dynamic programming works?",
      timestamp: ISODate("2025-10-30T10:15:00Z")
    },
    {
      role: "assistant",
      content: "Dynamic programming is a method for solving...",
      timestamp: ISODate("2025-10-30T10:15:05Z")
    }
  ],
  context: {
    topic: "Dynamic Programming",
    userProficiency: 7.2,
    relatedProblems: [ObjectId("...")]
  },
  createdAt: ISODate("2025-10-30T10:15:00Z"),
  lastMessageAt: ISODate("2025-10-30T10:20:00Z")
}
```

---

## 🔐 Security Implementation

### Authentication Flow
```
1. User submits credentials
   ↓
2. Backend validates (Joi schema)
   ↓
3. Check user in database
   ↓
4. Verify password (bcrypt.compare)
   ↓
5. Generate JWT token
   ↓
6. Send token to client
   ↓
7. Client stores in localStorage/cookie
   ↓
8. Include token in Authorization header
   ↓
9. Backend verifies JWT on protected routes
   ↓
10. Grant/deny access
```

### Security Best Practices
- ✅ Hash passwords with bcrypt (10 salt rounds)
- ✅ Use HTTPS in production
- ✅ Implement rate limiting (100 req/15min)
- ✅ Validate all inputs with Joi
- ✅ Sanitize user inputs
- ✅ Use HTTP-only cookies for tokens
- ✅ Implement CORS properly
- ✅ Add helmet middleware
- ✅ Use environment variables for secrets
- ✅ Implement refresh tokens

---

## 📊 Recommendation Algorithm

### Success Probability Formula
```javascript
function calculateSuccessProbability(user, learningPath) {
  // 1. Topic Coverage Score (30%)
  const topicCoverage = (
    topicsSolved / topicsRequired
  ) * 30;

  // 2. Problems Solved Score (25%)
  const problemsSolvedScore = Math.min(
    (totalProblemsSolved / requiredForTarget) * 25,
    25
  );

  // 3. Difficulty Progression (20%)
  const difficultyRatio = (
    (mediumSolved * 2 + hardSolved * 3) /
    (easySolved + mediumSolved * 2 + hardSolved * 3)
  ) * 20;

  // 4. Company-Specific Prep (15%)
  const companySpecificScore = (
    companyTaggedSolved / companyTaggedTotal
  ) * 15;

  // 5. Consistency Score (10%)
  const consistencyScore = Math.min(
    (currentStreak / 30) * 10,
    10
  );

  return Math.min(
    topicCoverage +
    problemsSolvedScore +
    difficultyRatio +
    companySpecificScore +
    consistencyScore,
    100
  );
}
```

### Next Problem Recommendation
```javascript
function recommendNextProblems(userId) {
  // Get user data
  const user = getUserProfile(userId);
  const proficiencies = getTopicProficiencies(userId);
  const solvedProblems = getSolvedProblems(userId);

  // Find weak topics (score < 5)
  const weakTopics = proficiencies.filter(p => p.score < 5);

  // Get target company requirements
  const targetRequirements = getCompanyRequirements(
    user.targetCompany
  );

  // Recommendation weights
  const recommendations = [];

  // 40% - Focus on weak topics
  weakTopics.forEach(topic => {
    const problems = getProblemsForTopic(topic.name);
    const unsolved = problems.filter(p =>
      !solvedProblems.includes(p._id)
    );
    recommendations.push(...unsolved.slice(0, 5));
  });

  // 30% - Company-specific problems
  const companyProblems = getProblemsForCompany(
    user.targetCompany
  );
  recommendations.push(...companyProblems.slice(0, 3));

  // 20% - Difficulty progression
  const nextDifficulty = determineNextDifficulty(user);
  const difficultyProblems = getProblemsByDifficulty(
    nextDifficulty
  );
  recommendations.push(...difficultyProblems.slice(0, 2));

  // 10% - Spaced repetition (review old problems)
  const reviewProblems = getProblemsForReview(userId);
  recommendations.push(...reviewProblems);

  // Remove duplicates and return top 10
  return [...new Set(recommendations)].slice(0, 10);
}
```

---

## 🔄 API Endpoints

### Authentication
```
POST   /api/auth/signup          - Register new user
POST   /api/auth/login           - Login user
GET    /api/auth/me              - Get current user (protected)
PUT    /api/auth/profile         - Update profile (protected)
POST   /api/auth/forgot-password - Request password reset
POST   /api/auth/reset-password  - Reset password
```

### Problems
```
GET    /api/problems             - Get all problems (with filters)
GET    /api/problems/:id         - Get problem by ID
POST   /api/problems/submit      - Submit solution (protected)
GET    /api/problems/recommended - Get recommended problems (protected)
GET    /api/problems/search      - Search problems
```

### Progress
```
GET    /api/progress             - Get user progress (protected)
GET    /api/progress/stats       - Get statistics (protected)
GET    /api/progress/topics      - Get topic proficiencies (protected)
POST   /api/progress/track       - Track problem attempt (protected)
```

### AI
```
POST   /api/ai/chat              - Chat with AI agent (protected)
POST   /api/ai/hint              - Get hint for problem (protected)
POST   /api/ai/review            - Get code review (protected)
GET    /api/ai/explain/:topic    - Get topic explanation (protected)
```

### Learning Path
```
GET    /api/learning-path        - Get user's learning path (protected)
POST   /api/learning-path/generate - Generate new path (protected)
PUT    /api/learning-path/update  - Update progress (protected)
```

---

## 🎨 Component Architecture

```
components/
├── ui/                    ← Basic UI components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   ├── Modal.jsx
│   ├── Badge.jsx
│   └── Tooltip.jsx
├── layout/               ← Layout components
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── Footer.jsx
│   └── PageContainer.jsx
├── dashboard/            ← Dashboard-specific
│   ├── StatsCard.jsx
│   ├── ProgressChart.jsx
│   ├── TopicRadar.jsx
│   └── ActivityHeatmap.jsx
├── problems/             ← Problem-related
│   ├── ProblemCard.jsx
│   ├── ProblemList.jsx
│   ├── ProblemFilter.jsx
│   ├── CodeEditor.jsx
│   └── TestCaseRunner.jsx
├── ai/                   ← AI features
│   ├── ChatInterface.jsx
│   ├── HintSystem.jsx
│   └── CodeReviewer.jsx
└── shared/               ← Shared utilities
    ├── ProtectedRoute.jsx
    ├── LoadingSpinner.jsx
    └── ErrorBoundary.jsx
```

---

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────┐
│         Users (Web Browsers)            │
└─────────────────────────────────────────┘
                    │
                    │ HTTPS
                    ▼
┌─────────────────────────────────────────┐
│         Vercel (Frontend CDN)           │
│         Next.js Application             │
└─────────────────────────────────────────┘
                    │
                    │ API Calls
                    ▼
┌─────────────────────────────────────────┐
│     Railway/Render (Backend API)        │
│         Express.js Server               │
└─────────────────────────────────────────┘
         │                      │
         │                      │
         ▼                      ▼
┌──────────────────┐  ┌──────────────────┐
│  MongoDB Atlas   │  │   OpenAI API     │
│    (Database)    │  │  (AI Services)   │
└──────────────────┘  └──────────────────┘
```

---

**This architecture is designed to be:**
- ✅ **Scalable**: Can handle thousands of users
- ✅ **Maintainable**: Clean separation of concerns
- ✅ **Secure**: Multiple layers of security
- ✅ **Performant**: Optimized for speed
- ✅ **Cost-effective**: Uses free tiers initially
