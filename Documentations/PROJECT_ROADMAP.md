# 🚀 Personalised Tech Interview Preparation Platform - Execution Roadmap

## 📊 Project Overview
**Goal**: Build an AI-powered, adaptive interview preparation platform that personalizes learning paths based on target company, role, and current skill level.

**Timeline**: 12 weeks
**Tech Stack**: Next.js 16, Node.js, Express, MongoDB, AI APIs (OpenAI/Gemini)

---

## 🎯 Phase 1: Foundation (Week 1-2)

### Week 1: Backend Setup & Database Design

#### Day 1-2: Project Setup
- [x] Initialize Next.js project
- [ ] Set up Express backend server
- [ ] Configure MongoDB connection
- [ ] Set up environment variables
- [ ] Configure CORS and middleware

#### Day 3-4: Database Schema Design
**Collections to Create:**

1. **Users Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  targetCompany: String,
  targetRole: String,
  experienceLevel: String,
  createdAt: Date,
  lastActive: Date
}
```

2. **Problems Collection**
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  difficulty: String, // Easy/Medium/Hard
  topics: [String], // Array, Graphs, DP, etc.
  companies: [String], // Google, Amazon, etc.
  solution: String,
  hints: [String],
  testCases: [{input, output}],
  acceptanceRate: Number,
  frequency: Number
}
```

3. **UserProgress Collection**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  problemId: ObjectId,
  status: String, // Attempted/Solved/Reviewed
  attempts: Number,
  timeTaken: Number,
  code: String,
  solvedAt: Date,
  difficulty: String
}
```

4. **TopicProficiency Collection**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  topic: String,
  proficiencyScore: Number, // 0-10
  problemsSolved: Number,
  problemsTotal: Number,
  lastUpdated: Date
}
```

5. **LearningPath Collection**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  targetCompany: String,
  currentPhase: String,
  modules: [{
    name: String,
    status: String,
    topics: [String],
    completionPercentage: Number
  }],
  successProbability: Number,
  generatedAt: Date
}
```

#### Day 5-7: Authentication System
- [ ] Implement JWT-based authentication
- [ ] Create signup/login APIs
- [ ] Password hashing with bcrypt
- [ ] Protected route middleware
- [ ] Session management

### Week 2: Frontend Foundation

#### Day 1-3: UI Components
- [ ] Create reusable UI components
  - [ ] Button, Input, Card, Modal
  - [ ] Navbar with auth state
  - [ ] Sidebar navigation
  - [ ] Loading states
  - [ ] Toast notifications

#### Day 4-5: Authentication Pages
- [ ] Login page with validation
- [ ] Signup page with multi-step form
- [ ] Protected route wrapper
- [ ] Auth context/state management

#### Day 6-7: Onboarding Flow
- [ ] Step 1: Personal information
- [ ] Step 2: Target company & role selection
- [ ] Step 3: Experience level assessment
- [ ] Step 4: Initial skill assessment quiz
- [ ] Step 5: Generate personalized path

---

## 🎯 Phase 2: Core Features (Week 3-5)

### Week 3: Problem Bank & Display

#### Day 1-3: Problem Management
- [ ] Seed database with 100+ DSA problems
- [ ] Create problem filtering system
- [ ] Implement search functionality
- [ ] Topic-based categorization
- [ ] Company-specific filtering

#### Day 4-5: Problem Solver Interface
- [ ] Integrate code editor (Monaco Editor)
- [ ] Multi-language support (Python, JavaScript, Java, C++)
- [ ] Run test cases functionality
- [ ] Submit solution endpoint
- [ ] Display results and feedback

#### Day 6-7: Problem Detail Page
- [ ] Problem statement display
- [ ] Difficulty indicator
- [ ] Topic tags
- [ ] Company tags
- [ ] Related problems section
- [ ] Discussion/notes section

### Week 4: Recommendation Engine

#### Day 1-3: Algorithm Development
**Recommendation Logic:**
```javascript
function recommendNextProblems(userId) {
  1. Get user's topic proficiency scores
  2. Identify weak topics (score < 5/10)
  3. Get target company requirements
  4. Filter problems by:
     - Low proficiency topics (40%)
     - Company frequency (30%)
     - Difficulty progression (20%)
     - Unsolved problems (10%)
  5. Apply spaced repetition for revision
  6. Return top 10 recommendations
}
```

- [ ] Implement recommendation algorithm
- [ ] Create API endpoint for recommendations
- [ ] Test with sample user data
- [ ] Optimize performance

#### Day 4-5: Topic Proficiency Tracking
- [ ] Calculate proficiency after each problem
- [ ] Update formula:
  ```javascript
  proficiency = (
    (problemsSolved / totalProblems) * 0.5 +
    (avgDifficulty / 3) * 0.3 +
    (successRate) * 0.2
  ) * 10
  ```
- [ ] Create update logic after problem submission
- [ ] Display topic-wise breakdown

#### Day 6-7: Adaptive Learning Path
- [ ] Generate initial path based on assessment
- [ ] Update path dynamically based on progress
- [ ] Phase-based learning (Beginner → Intermediate → Advanced)
- [ ] Milestone tracking

### Week 5: Dashboard & Progress Tracking

#### Day 1-3: Main Dashboard
- [ ] Overview statistics cards
  - Total problems solved
  - Current streak
  - Success probability
  - Hours spent
- [ ] Progress chart (problems over time)
- [ ] Topic proficiency radar chart
- [ ] Recommended problems widget
- [ ] Activity heatmap

#### Day 4-5: Success Probability Calculator
**Formula:**
```javascript
successProbability = (
  topicCoverage * 0.3 +        // Topics covered vs required
  problemsSolvedScore * 0.25 +  // Problems solved vs target
  difficultyProgression * 0.2 + // Easy → Medium → Hard ratio
  companySpecificPrep * 0.15 +  // Company-tagged problems
  consistencyScore * 0.10        // Daily activity streak
) * 100
```

- [ ] Implement calculation logic
- [ ] Update in real-time after each problem
- [ ] Display with visual meter
- [ ] Show improvement suggestions

#### Day 6-7: Progress Analytics
- [ ] Time spent per topic
- [ ] Daily/weekly/monthly activity
- [ ] Problem difficulty distribution
- [ ] Success rate trends
- [ ] Export progress report

---

## 🎯 Phase 3: AI Integration (Week 6-7)

### Week 6: AI Doubt Resolution Agent

#### Day 1-2: AI Service Setup
- [ ] Choose AI provider (OpenAI GPT-4 / Google Gemini)
- [ ] Set up API integration
- [ ] Create prompt templates
- [ ] Implement context management
- [ ] Add rate limiting

#### Day 3-4: Chat Interface
- [ ] Build chat UI component
- [ ] Message history
- [ ] Code snippet formatting
- [ ] Typing indicators
- [ ] Persistent chat storage

#### Day 5-7: AI Features
**Capabilities:**
1. **Concept Explanation**: Explain any DSA/CS topic
2. **Hint System**: Provide progressive hints without full solution
3. **Code Review**: Analyze submitted code and suggest improvements
4. **Similar Problems**: Recommend related problems
5. **Interview Prep**: Mock interview questions

- [ ] Implement concept explanation
- [ ] Create hint generation system
- [ ] Build code review functionality
- [ ] Add problem similarity search
- [ ] Test all AI features

### Week 7: Smart Assistance Features

#### Day 1-3: Contextual Help
- [ ] Problem-specific context to AI
- [ ] User progress context
- [ ] Topic proficiency context
- [ ] Personalized responses

#### Day 4-5: Code Execution & Testing
- [ ] Integrate code execution API (Judge0 / Sphere Engine)
- [ ] Run test cases
- [ ] Display execution results
- [ ] Performance metrics (time, memory)

#### Day 6-7: Learning Resources Integration
- [ ] YouTube video recommendations
- [ ] Article links (GeeksforGeeks, LeetCode)
- [ ] Topic-wise resource library
- [ ] Bookmark functionality

---

## 🎯 Phase 4: Multi-Domain Modules (Week 8-10)

### Week 8: Beyond DSA - Module Creation

#### Day 1-2: Low-Level Design (LLD)
- [ ] OOP concepts questions
- [ ] Design patterns problems
- [ ] SOLID principles examples
- [ ] Real-world system design (Parking Lot, Library System)
- [ ] UML diagrams integration

#### Day 3-4: System Design (HLD)
- [ ] System design case studies
  - Design WhatsApp
  - Design Netflix
  - Design Uber
  - Design URL Shortener
- [ ] Component diagrams
- [ ] Scalability concepts
- [ ] Database design problems

#### Day 5-7: MERN Stack & Backend
- [ ] React interview questions
- [ ] Node.js/Express questions
- [ ] MongoDB queries
- [ ] REST API design problems
- [ ] Mini project challenges

### Week 9: CS Fundamentals & Specializations

#### Day 1-2: CS Fundamentals
**Operating Systems:**
- Process management questions
- Memory management
- Deadlock scenarios
- Scheduling algorithms

**DBMS:**
- SQL queries practice
- Normalization problems
- Transaction management
- Indexing concepts

**Computer Networks:**
- Protocol questions
- TCP/IP concepts
- HTTP/HTTPS
- Network security

#### Day 3-4: Java Spring Boot Module
- [ ] Spring Boot interview questions
- [ ] Dependency injection
- [ ] REST controller problems
- [ ] JPA/Hibernate questions
- [ ] Microservices concepts

#### Day 5-7: AI Engineering Module
- [ ] ML basics questions
- [ ] Prompt engineering practice
- [ ] LLM concepts
- [ ] RAG implementation questions
- [ ] AI ethics scenarios

### Week 10: Module Integration

#### Day 1-3: Unified Learning Path
- [ ] Combine all modules into single path
- [ ] Module-wise progress tracking
- [ ] Cross-module recommendations
- [ ] Prerequisite management

#### Day 4-5: Module-Specific Dashboards
- [ ] Separate dashboard for each module
- [ ] Module completion percentage
- [ ] Strengths/weaknesses per module
- [ ] Next steps recommendations

#### Day 6-7: Assessment System
- [ ] Module-wise assessments
- [ ] Skill certification
- [ ] Performance reports
- [ ] Improvement suggestions

---

## 🎯 Phase 5: Gamification & Bonus Features (Week 11-12)

### Week 11: Gamification

#### Day 1-2: Points & Levels System
- [ ] XP points for each activity
  - Solve Easy: 10 XP
  - Solve Medium: 25 XP
  - Solve Hard: 50 XP
  - Daily streak: 5 XP
  - Module completion: 100 XP
- [ ] Level progression (1-100)
- [ ] Visual level badges

#### Day 3-4: Achievements & Badges
**Badge Categories:**
- Topic Mastery: "Recursion Master", "Graph Guru"
- Milestone: "First 50 Problems", "100 Day Streak"
- Speed: "Speed Demon" (solve in < 10 min)
- Difficulty: "Hard Problem Crusher"
- Module: "System Design Expert"

- [ ] Badge system implementation
- [ ] Achievement tracking
- [ ] Badge showcase on profile
- [ ] Shareable badges

#### Day 5-7: Leaderboards
- [ ] Global leaderboard
- [ ] Friends leaderboard
- [ ] Company-specific leaderboard
- [ ] Weekly/monthly rankings
- [ ] Topic-wise rankings

### Week 12: Advanced Features

#### Day 1-2: Peer Benchmarking
- [ ] Find peers with same target company
- [ ] Anonymous performance comparison
- [ ] Peer study groups
- [ ] Collaborative problem solving
- [ ] Discussion forums

#### Day 3-4: Mock Interview System
- [ ] Timed coding challenges
- [ ] Random problem selection based on company
- [ ] Mock interview scheduler
- [ ] Performance analysis
- [ ] Interview feedback report

#### Day 5-7: Advanced Analytics
**Smart Features:**
- [ ] Optimal study hours recommendation
- [ ] Burnout prevention alerts
- [ ] Personalized study schedule
- [ ] Weekly performance email
- [ ] Predictive success modeling

---

## 🛠️ Technical Implementation Checklist

### Backend (Node.js + Express)
- [ ] RESTful API endpoints
- [ ] Authentication middleware
- [ ] Error handling
- [ ] Input validation
- [ ] Rate limiting
- [ ] Logging system
- [ ] API documentation (Swagger)

### Frontend (Next.js)
- [ ] Responsive design (mobile-first)
- [ ] Dark mode support
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Error boundaries
- [ ] Loading states
- [ ] Accessibility (a11y)

### Database (MongoDB)
- [ ] Indexes for performance
- [ ] Data validation schemas
- [ ] Aggregation pipelines
- [ ] Backup strategy
- [ ] Migration scripts

### AI Integration
- [ ] API key management
- [ ] Context optimization
- [ ] Prompt engineering
- [ ] Response caching
- [ ] Cost monitoring

### DevOps
- [ ] Environment setup (.env files)
- [ ] Git workflow
- [ ] CI/CD pipeline
- [ ] Deployment (Vercel + Railway/Render)
- [ ] Monitoring & logging
- [ ] Performance testing

---

## 📦 Dependencies to Install

### Backend
```bash
npm install express mongoose dotenv bcryptjs jsonwebtoken cors helmet express-rate-limit joi
```

### AI Integration
```bash
npm install openai @google/generative-ai
```

### Frontend (additional)
```bash
npm install axios recharts react-hot-toast date-fns monaco-editor @monaco-editor/react react-markdown
```

---

## 🎨 UI/UX Design Priorities

### Design System
- **Colors**: Primary (Blue), Success (Green), Warning (Yellow), Error (Red)
- **Typography**: Inter/Poppins for headings, system fonts for body
- **Spacing**: 4px base unit (4, 8, 16, 24, 32, 48, 64)
- **Components**: Shadcn/ui or custom Tailwind components

### Key Pages
1. **Landing Page**: Value proposition, features, CTA
2. **Dashboard**: Central hub with all stats
3. **Problem List**: Filterable, searchable grid
4. **Problem Solver**: Full-screen code editor
5. **Progress**: Detailed analytics
6. **Profile**: User settings, achievements
7. **AI Chat**: Floating/sidebar chat interface

---

## 🚀 Launch Strategy

### MVP (Week 12)
- Core features: Auth, Problems, Dashboard, Recommendations, AI Chat
- 200+ DSA problems
- 3 modules (DSA, LLD, System Design)
- Basic gamification

### Post-Launch (Week 13+)
- User feedback collection
- Bug fixes & optimization
- Additional problems & modules
- Mobile app development
- Community features
- Premium features

---

## 🎯 Success Metrics

### User Engagement
- Daily active users
- Average session duration
- Problems solved per user
- AI chat interactions
- Feature adoption rate

### Learning Outcomes
- Success probability improvement
- Topic proficiency growth
- Module completion rate
- Interview success rate (user surveys)

---

## 📝 Notes & Resources

### Problem Sources
- LeetCode (Top Interview Questions)
- GeeksforGeeks (Company-specific)
- HackerRank
- Codeforces
- InterviewBit

### Learning Resources
- YouTube: TakeUforward, Striver, Abdul Bari
- Blogs: Tech Interview Handbook
- Books: Cracking the Coding Interview, System Design Interview

### Community
- Discord server for users
- Weekly problem discussion
- Success stories showcase
- Feedback channels

---

## 🏁 Current Status

**Phase**: Foundation
**Week**: 1
**Next Tasks**: 
1. Set up Express backend
2. Configure MongoDB connection
3. Create database schemas
4. Implement authentication

---

**Last Updated**: October 30, 2025
**Maintained By**: Namit
**Version**: 1.0
