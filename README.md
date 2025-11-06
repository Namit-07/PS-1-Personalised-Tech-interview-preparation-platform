# 🚀 SkillForge.AI



## 🎯 The Problem

Traditional interview prep platforms are one-size-fits-all:
- Same problems for everyone regardless of goals
- No personalization based on target company or role
- No real-time feedback or AI assistance
- Limited recruiter tools for candidate evaluation

## 💡 Our Solution

An **intelligent interview prep platform** that:
- ✅ **Dual Role System**: Separate experiences for students and recruiters
- ✅ **AI-Powered Coaching**: Real-time hints, explanations, and code reviews with Gemini AI
- ✅ **Smart Commands**: `/hint`, `/explain`, `/review`, `/testcases` for instant help
- ✅ **GitHub-Style Activity Tracking**: Visual heatmap showing daily progress
- ✅ **LinkedIn Integration**: Import professional profiles with OAuth
- ✅ **Interactive Leaderboard**: Real-time rankings with detailed candidate insights
- ✅ **Topic-Wise Proficiency**: Track skills across 8+ modules (DSA, System Design, MERN, etc.)
- ✅ **Multi-Language Support**: Code in Python, JavaScript, Java, or C++

---

## 🏆 Key Features

### 👥 Dual Role System
**Students:**
- 📚 Access 30+ curated coding problems across multiple difficulty levels
- 🎯 Module-based learning (DSA, System Design, LLD, MERN, Java Spring Boot, etc.)
- 📊 Personal dashboard with stats and progress tracking
- 🔥 Streak calendar showing daily activity
- 🤖 AI chat assistant for instant help

**Recruiters:**
- 🏅 Interactive leaderboard with real-time rankings
- 👤 Detailed candidate profiles with LinkedIn data
- 📈 View candidate progress, proficiency, and activity
- 🔍 Filter and search top performers
- 💼 Make data-driven hiring decisions

### 🤖 AI-Powered Assistant (Gemini)
**Smart Commands:**
- `/hint` - Get progressive hints without spoiling the solution
- `/explain [concept]` - Get detailed explanations of algorithms and concepts
- `/review` - Submit your code for AI review with improvement suggestions
- `/testcases` - Get sample test cases to validate your solution
- Natural conversation - Ask anything about the problem or approach

**Context-Aware:**
- Understands the current problem you're solving
- Adapts difficulty of hints based on problem complexity
- Provides personalized feedback based on your code

### 📊 GitHub-Style Activity Heatmap
- Visual calendar showing daily coding activity
- Contribution graph with color-coded intensity (1-4+ problems/day)
- Track your consistency and maintain streaks
- Activity persists across sessions
- Real-time updates as you solve problems

### 🔗 LinkedIn Integration
- OAuth 2.0 authentication for seamless profile import
- Automatically populate profile with professional details
- Import headline, summary, experience, education, and skills
- One-click profile setup for students
- Enhanced recruiter view with LinkedIn data

### 🏅 Interactive Leaderboard
- Real-time rankings based on problems solved and streak multiplier
- Score calculation: `problems_solved + (streak × 5)`
- Click on any user to view detailed profile
- See top performers' proficiency across all topics
- GitHub-style activity visualization for each user
- Filter by rank and performance metrics

### 📈 Comprehensive Progress Tracking
**Personal Dashboard:**
- Total problems solved counter
- Current streak and longest streak
- Topic-wise proficiency bars (Easy/Medium/Hard breakdown)
- Recent activity feed
- Level progression system

**Module-Based Learning:**
- 📦 **DSA** - Data Structures & Algorithms (Arrays, Trees, Graphs, etc.)
- 🏗️ **System Design** - Scalability, Load Balancing, Caching
- 🎨 **LLD** - Low-Level Design patterns and principles
- ⚛️ **MERN Stack** - MongoDB, Express, React, Node.js
- ☕ **Java Spring Boot** - Enterprise Java development
- 🎯 **OOPs** - Object-Oriented Programming concepts
- 💻 **CS Fundamentals** - OS, Networks, DBMS
- 🤖 **AI Engineering** - ML, NLP, Deep Learning

### 💻 Advanced Code Editor
- Multi-language support: Python, JavaScript, Java, C++
- Syntax highlighting with Monaco Editor
- Code execution with real-time output
- Test case validation
- Submit solutions and track accepted submissions
- Dark theme optimized for coding

### 🎨 Modern UI/UX
- Sleek dark theme with gradient accents
- Smooth animations and transitions
- Glassmorphic design elements
- Responsive layout for all devices
- Loading animations and skeleton loaders
- Toast notifications for user feedback
- Animated success celebrations on problem solve

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 16.0.1 (React 19) with Turbopack
- Tailwind CSS 4 (with modern `bg-linear-to-*` utilities)
- Recharts for data visualization
- Monaco Editor for code editing
- React Hooks for state management
- Context API for global state

**Backend:**
- Node.js + Express 5.1.0
- MongoDB + Mongoose for database
- JWT Authentication with bcryptjs
- express-rate-limit for API protection
- Google Gemini AI API for intelligent assistance
- LinkedIn OAuth 2.0 integration

**Database Schema:**
- User model with role-based access (student/recruiter)
- Problem collection with 30+ coding challenges
- UserProgress tracking with topic proficiency
- UserActivity for GitHub-style heatmap
- TopicProficiency with Easy/Medium/Hard breakdown

**Security & Performance:**
- Rate limiting (1000 requests/minute for development)
- JWT token authentication with 7-day expiration
- Password hashing with bcryptjs
- Environment variable configuration
- CORS enabled for cross-origin requests
- Mongoose indexes for optimized queries

---

## ⚡ Quick Start

> **🚀 For Hackathon Deployment**: See [DEPLOYMENT.md](DEPLOYMENT.md) for complete Vercel + Railway + MongoDB Atlas setup (15-20 minutes, 100% free)

### Prerequisites
- Node.js 18+ installed
- MongoDB running (local or Atlas)
- Google Gemini API key (for AI features)
- LinkedIn App credentials (optional, for OAuth)

### 1. Clone Repository
```bash
git clone https://github.com/Namit-07/PS-1-Personalised-Tech-interview-preparation-platform.git
cd PS-1-Personalised-Tech-interview-preparation-platform
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### 3. Set Up Environment Variables

**Backend** - Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/techprep
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development

# AI Features
GEMINI_API_KEY=your_gemini_api_key_here

# LinkedIn OAuth (Optional)
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_REDIRECT_URI=http://localhost:5000/api/linkedin/callback
```

**Frontend** - Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Seed Database with Problems
```bash
cd backend
node seed.js
```

### 5. Start Servers

**Option A: Use PowerShell Script (Windows)**
```powershell
.\start.ps1
```

**Option B: Manual Start**
```bash
# Terminal 1 - Backend
cd backend
node server.js

# Terminal 2 - Frontend
npm run dev
```

### 6. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **MongoDB**: mongodb://localhost:27017/techprep

### 7. Test Accounts
```
Student Account:
Email: demo@example.com
Password: password123

Recruiter Account:
Email: recruiter@example.com
Password: password123
```

---

## 🎮 User Guide

### For Students

1. **Sign Up**: Create account → Select "Student" role → Complete onboarding
2. **Dashboard**: View your stats, streak, and progress across topics
3. **Browse Problems**: Navigate to any module (DSA, System Design, etc.)
4. **Solve Problems**: 
   - Read problem description
   - Write code in Monaco editor
   - Use AI commands: `/hint`, `/explain`, `/review`, `/testcases`
   - Submit solution
   - Celebrate with success animation! 🎉
5. **Track Progress**: Check leaderboard rank and activity heatmap
6. **LinkedIn Import**: Go to Profile → Import from LinkedIn

### For Recruiters

1. **Sign Up**: Create account → Select "Recruiter" role
2. **View Leaderboard**: See all students ranked by performance
3. **Analyze Candidates**: 
   - Click on any student to view detailed profile
   - See topic-wise proficiency
   - View activity heatmap
   - Check LinkedIn data if available
4. **Make Decisions**: Use data to identify top performers

---

## 📂 Project Structure

```
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/               # Login page with gradient theme
│   │   └── signup/              # Signup page with onboarding
│   ├── components/              # Reusable components
│   │   ├── AIChat.jsx          # AI assistant with smart commands
│   │   ├── StreakCalendar.jsx  # GitHub-style activity heatmap
│   │   ├── Navbar.jsx          # Role-based navigation
│   │   ├── ProgressChart.jsx   # Topic proficiency visualization
│   │   ├── SuccessAnimation.jsx # Celebration animation
│   │   ├── OnboardingWizard.jsx # First-time user setup
│   │   ├── Toast.jsx           # Notification system
│   │   └── SkeletonLoader.jsx  # Loading states
│   ├── dashboard/              # Student dashboard
│   ├── leaderboard/            # Recruiter leaderboard view
│   ├── problems/               # Problem list and solver
│   │   ├── page.jsx           # All problems grid
│   │   └── [slug]/            # Individual problem solver
│   ├── profile/                # User profile with LinkedIn import
│   ├── progress/               # Detailed progress analytics
│   ├── modules/                # Topic-wise problem modules
│   │   ├── dsa/
│   │   ├── system-design/
│   │   ├── lld/
│   │   ├── mern-stack/
│   │   ├── java-spring-boot/
│   │   ├── oops/
│   │   ├── cs-fundamentals/
│   │   └── ai-engineering/
│   ├── lib/                    # Context and utilities
│   │   ├── AuthContext.js     # Authentication state
│   │   ├── ActivityContext.js # Activity tracking
│   │   ├── ThemeContext.js    # Theme management
│   │   └── api.js             # API utilities
│   ├── globals.css            # Global styles with animations
│   └── layout.js              # Root layout with providers
│
├── backend/                    # Express.js Backend
│   ├── models/                # Mongoose schemas
│   │   ├── User.js           # User model with role-based fields
│   │   ├── Problem.js        # Problem schema with test cases
│   │   ├── UserProgress.js   # Progress tracking
│   │   ├── UserActivity.js   # Activity heatmap data
│   │   └── TopicProficiency.js # Topic-wise skills
│   ├── routes/               # API routes
│   │   ├── auth.js          # Authentication & onboarding
│   │   ├── problems.js      # Problem CRUD and submission
│   │   ├── progress.js      # Progress and activity tracking
│   │   ├── ai.js            # Gemini AI chat integration
│   │   ├── leaderboard.js   # Leaderboard rankings
│   │   └── linkedin.js      # LinkedIn OAuth flow
│   ├── middleware/           # Express middleware
│   │   └── auth.js          # JWT verification
│   ├── config/               # Configuration
│   │   └── db.js            # MongoDB connection
│   ├── seed.js              # Seed 30+ problems
│   ├── seed-demo-users.js   # Create demo accounts
│   ├── reset-password.js    # Password reset utility
│   ├── create-user.js       # User creation utility
│   └── server.js            # Main Express server
│
├── public/                   # Static assets
├── start.ps1                # PowerShell startup script
├── package.json             # Dependencies
├── next.config.mjs          # Next.js configuration
├── tailwind.config.js       # Tailwind CSS config
├── biome.json              # Biome linter config
│
├── ARCHITECTURE.md          # System architecture docs
├── FEATURES.md             # Feature specifications
├── HACKATHON_PLAN.md       # 36-hour execution plan
├── LINKEDIN_OAUTH_SETUP.md # LinkedIn integration guide
├── PROFILE_INTEGRATION.md  # Profile feature docs
├── REAL_TIME_ACTIVITY.md   # Activity tracking docs
├── RECRUITER_FEATURES.md   # Recruiter role docs
├── STREAK_CALENDAR.md      # Calendar implementation
├── LOADING_ANIMATIONS_GUIDE.md # Animation guide
└── README.md               # This file
```

---

## 🎪 Demo Scenarios

### Scenario 1: Student Journey (5 minutes)
1. **Signup**: Create account → Select "Student" role → Choose topics of interest
2. **Explore**: Browse 30+ problems across 8 modules
3. **Solve Problem**: 
   - Pick "Two Sum" from DSA
   - Type `/hint` in AI chat → Get progressive hint
   - Write solution in Monaco editor
   - Type `/review` → Get AI code review
   - Submit → See success animation 🎉
4. **Track Progress**: Check dashboard → See updated proficiency → View activity heatmap
5. **Leaderboard**: Check ranking among peers

### Scenario 2: Recruiter Journey (3 minutes)
1. **Signup**: Create account → Select "Recruiter" role
2. **Leaderboard**: View all students ranked by performance
3. **Candidate Analysis**:
   - Click on top-ranked student
   - View detailed profile with stats
   - See topic-wise proficiency (Strong in DSA, Learning System Design)
   - Check GitHub-style activity (Consistent daily practice)
   - View LinkedIn data if available
4. **Decision Making**: Shortlist candidates based on data

### Scenario 3: AI Assistant Demo (2 minutes)
1. Open any problem (e.g., "Longest Palindromic Substring")
2. Chat with AI:
   - Type: "I don't understand the problem" → Get explanation
   - Type: `/hint` → Get first hint without spoiler
   - Type: `/hint` again → Get second level hint
   - Type: `/explain dynamic programming` → Get concept explanation
   - Write buggy code → Type `/review` → Get feedback with improvements
   - Type: `/testcases` → Get sample inputs/outputs to test

### Scenario 4: LinkedIn Integration (1 minute)
1. Go to Profile page
2. Click "Import from LinkedIn"
3. Authorize app → Profile auto-populated with:
   - Professional headline
   - Work experience
   - Education details
   - Skills list
4. Edit and save profile

---

## 📅 Development Timeline (36 Hours)

### Phase 1: Foundation (Hours 0-8)
- ✅ Backend setup with Express + MongoDB
- ✅ User authentication system (JWT, bcryptjs)
- ✅ Frontend setup with Next.js 16 + Tailwind
- ✅ Login/Signup pages with gradient theme
- ✅ Basic navigation and routing

### Phase 2: Core Features (Hours 8-16)
- ✅ Problem database (30+ problems seeded)
- ✅ Problem list UI with filtering
- ✅ Monaco code editor integration
- ✅ Code submission and validation
- ✅ Progress tracking models
- ✅ Dashboard with stats

### Phase 3: Smart Features (Hours 16-24)
- ✅ Gemini AI integration
- ✅ Smart command system (`/hint`, `/explain`, `/review`, `/testcases`)
- ✅ Activity tracking with GitHub-style heatmap
- ✅ Streak calendar implementation
- ✅ Topic proficiency tracking
- ✅ Success animations

### Phase 4: Role-Based System (Hours 24-30)
- ✅ Dual role architecture (student/recruiter)
- ✅ Role selection and onboarding wizard
- ✅ Recruiter leaderboard with rankings
- ✅ Detailed candidate profiles
- ✅ LinkedIn OAuth integration
- ✅ Profile import functionality

### Phase 5: Polish & Testing (Hours 30-36)
- ✅ UI/UX improvements and animations
- ✅ Loading states and skeleton loaders
- ✅ Toast notifications system
- ✅ Error handling and validation
- ✅ Bug fixes (login, profile persistence, rate limiting)
- ✅ Code cleanup (removed console.logs, hardcoded URLs)
- ✅ Environment variable configuration
- ✅ Documentation and README updates
- ✅ Tailwind CSS modernization (`bg-linear-to-*`)

---

## 🐛 Bug Fixes & Improvements

### Authentication
- Fixed login redirects based on user role
- Resolved password reset functionality
- Implemented proper JWT token refresh
- Added rate limiting (1000 req/min for development)
- Fixed 429 Too Many Requests error

### Profile & Data Persistence
- Fixed profile data not persisting after logout
- Implemented backend fetch on profile page mount
- Added localStorage sync with backend data
- Fixed LinkedIn import functionality

### UI/UX
- Applied consistent theme across login/signup pages
- Fixed Tailwind CSS warnings (gradient → linear)
- Removed 16+ debug console.log statements
- Improved error handling (UI display vs alerts)
- Added success animations for problem completion

### API & Performance
- Replaced hardcoded URLs with environment variables
- Optimized MongoDB queries with indexes
- Added proper error responses
- Implemented CORS configuration
- Enhanced rate limiting for production

---

## 🎯 Unique Selling Points

1. **Dual Role Architecture**: Separate optimized experiences for students and recruiters - not just filtered views
2. **Intelligent AI Commands**: Context-aware `/hint`, `/explain`, `/review`, `/testcases` system powered by Gemini
3. **GitHub-Style Activity Tracking**: Visual contribution graph showing daily progress and streak maintenance
4. **LinkedIn OAuth Integration**: One-click professional profile import with OAuth 2.0
5. **Real-Time Leaderboard**: Dynamic rankings with detailed candidate insights for recruiters
6. **Module-Based Learning**: 8 comprehensive modules covering full-stack to system design
7. **Monaco Code Editor**: Professional-grade coding experience with multi-language support
8. **Persistent Progress**: Activity and proficiency data saved across sessions
9. **Celebration Animations**: Gamified experience with success animations and streak tracking
10. **Production-Ready**: Rate limiting, JWT auth, environment configs, and error handling

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy --prod
```

**Environment Variables (Vercel Dashboard):**
- `NEXT_PUBLIC_API_URL` = Your backend URL

### Backend (Railway/Render/Heroku)

**Railway:**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

**Render:**
1. Connect GitHub repository
2. Select `backend` directory as root
3. Build command: `npm install`
4. Start command: `node server.js`

**Environment Variables (Deployment Platform):**
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/techprep
JWT_SECRET=your_production_jwt_secret_min_32_chars
NODE_ENV=production
GEMINI_API_KEY=your_gemini_api_key
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_REDIRECT_URI=https://your-backend.com/api/linkedin/callback
```

### Database (MongoDB Atlas)
1. Create free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create database user with password
3. Whitelist IP addresses (0.0.0.0/0 for development)
4. Get connection string
5. Update `MONGODB_URI` in backend environment variables
6. Run seed script to populate problems:
   ```bash
   node backend/seed.js
   ```

### LinkedIn OAuth Setup
1. Create app at [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Add redirect URI: `https://your-backend.com/api/linkedin/callback`
3. Get Client ID and Client Secret
4. Update environment variables

### Post-Deployment Checklist
- [ ] Both frontend and backend are running
- [ ] Environment variables are set correctly
- [ ] MongoDB Atlas is connected and seeded
- [ ] CORS is configured for frontend URL
- [ ] Rate limiting is adjusted for production (reduce to 200 req/min)
- [ ] LinkedIn OAuth redirect URIs match deployment URLs
- [ ] Test login/signup flow
- [ ] Test problem submission
- [ ] Test AI chat functionality
- [ ] Test leaderboard visibility

---

## 📊 API Endpoints

### Authentication
```
POST /api/auth/signup           - Register new user
POST /api/auth/login            - Login user  
GET  /api/auth/me               - Get current user profile
POST /api/auth/onboarding       - Complete onboarding wizard
PUT  /api/auth/profile          - Update user profile
```

### Problems
```
GET  /api/problems              - Get all problems (with filters)
GET  /api/problems/:slug        - Get problem by slug
POST /api/problems/:id/submit   - Submit solution
GET  /api/problems/user/solved  - Get user's solved problems
```

### Progress & Activity
```
GET  /api/progress              - Get user progress overview
GET  /api/progress/activity     - Get GitHub-style activity data
POST /api/progress/activity     - Update activity (problem solved)
GET  /api/progress/stats        - Get detailed statistics
PUT  /api/progress/proficiency  - Update topic proficiency
```

### AI Assistant
```
POST /api/ai/chat               - Chat with Gemini AI
     Body: { message, problemContext, conversationHistory }
     Supports: /hint, /explain, /review, /testcases commands
```

### Leaderboard
```
GET  /api/leaderboard           - Get top users ranked
GET  /api/leaderboard/user/:id  - Get user profile for recruiters
```

### LinkedIn OAuth
```
GET  /api/linkedin/auth         - Initiate OAuth flow
GET  /api/linkedin/callback     - Handle OAuth callback
POST /api/linkedin/import       - Import LinkedIn data to profile
```

---

## 🎨 Screenshots

### Landing Page
Beautiful gradient hero with animated orbs and mesh grid background

### Student Dashboard
- Problems solved counter with animated numbers
- Streak calendar with GitHub-style heatmap
- Topic proficiency bars with Easy/Medium/Hard breakdown
- Level progression system

### Problem Solver
- Monaco editor with syntax highlighting
- AI chat panel with smart commands
- Test case validation
- Multi-language support (Python, JavaScript, Java, C++)
- Success animation on problem completion

### AI Assistant
- Natural language conversation
- `/hint` - Progressive hints without spoilers
- `/explain` - Concept explanations
- `/review` - Code review with suggestions
- `/testcases` - Sample test cases

### Leaderboard (Recruiter View)
- Real-time rankings with scores
- Click to view detailed candidate profiles
- GitHub-style activity heatmaps
- Topic-wise proficiency visualization
- LinkedIn data integration

### Profile Page
- LinkedIn import with OAuth
- Edit professional details
- View personal stats and achievements
- Activity history

---

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth with 7-day expiration
- **Password Hashing**: bcryptjs with salt rounds
- **Rate Limiting**: Protection against brute force attacks
- **Environment Variables**: Sensitive data stored securely
- **CORS Configuration**: Controlled cross-origin requests
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: MongoDB parameterized queries
- **XSS Protection**: React's built-in XSS prevention
- **HTTPS Ready**: Production deployment with SSL

---

## 📈 Performance Optimizations

- **Code Splitting**: Next.js automatic code splitting
- **Lazy Loading**: Components loaded on demand
- **MongoDB Indexes**: Optimized queries with indexes on slug, email
- **Caching**: Context API for global state management
- **Debouncing**: AI chat input debounced to reduce API calls
- **Skeleton Loaders**: Improved perceived performance
- **Image Optimization**: Next.js Image component
- **Turbopack**: Fast development builds with Turbopack

---

## 🧪 Testing

### Manual Testing Checklist
- [x] User signup with validation
- [x] User login with role-based redirect
- [x] Password reset functionality
- [x] Problem list filtering and search
- [x] Code editor syntax highlighting
- [x] Code submission and validation
- [x] AI chat with all commands
- [x] Activity tracking and heatmap
- [x] Streak calculation
- [x] Leaderboard rankings
- [x] Profile CRUD operations
- [x] LinkedIn OAuth flow
- [x] Rate limiting behavior
- [x] Error handling and recovery
- [x] Mobile responsiveness

### Test Accounts
```
Student: demo@example.com / password123
Recruiter: recruiter@example.com / password123
```

---

## 🤝 Contributing

This project was built for a hackathon, but we welcome contributions! Here's how you can help:

### Future Enhancements
- [ ] **Code Execution Engine**: Real-time code compilation and execution
- [ ] **Test Case Generation**: AI-powered test case creation
- [ ] **Video Solutions**: Upload/link video explanations for problems
- [ ] **Discussion Forum**: Community discussion for each problem
- [ ] **Mock Interviews**: AI-powered mock interview sessions
- [ ] **Company Tags**: Tag problems by companies that asked them
- [ ] **Difficulty Rating**: User voting on difficulty accuracy
- [ ] **Solution Gallery**: View multiple approaches by top users
- [ ] **Badges & Achievements**: Gamification with unlockable badges
- [ ] **Daily Challenges**: Time-bound daily problem challenges
- [ ] **Contest Mode**: Timed contests with leaderboards
- [ ] **Mobile App**: React Native mobile application
- [ ] **VS Code Extension**: Solve problems directly in VS Code
- [ ] **Chrome Extension**: Quick access to problems and streak
- [ ] **Email Notifications**: Daily problem recommendations
- [ ] **Referral System**: Invite friends and earn rewards
- [ ] **Premium Tier**: Advanced AI features and analytics

### How to Contribute
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and structure
- Add comments for complex logic
- Test thoroughly before submitting PR
- Update documentation if adding new features
- Keep commits atomic and meaningful

---

## 📝 License

MIT License - feel free to use and modify!

Copyright (c) 2025 Namit Tickoo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

---

## 👥 Team

**Developer**: Namit Tickoo ([@Namit-07](https://github.com/Namit-07))

Built with ❤️ for Community

---

## 🙏 Acknowledgments

- **Google Gemini AI** for intelligent assistance capabilities
- **Next.js & Vercel** teams for amazing React framework
- **MongoDB** for flexible document database
- **Monaco Editor** for professional code editing experience
- **LinkedIn** for OAuth integration
- **Tailwind CSS** for rapid UI development
- **Open Source Community** for inspiration and tools

---

## 📞 Contact & Support

- **GitHub**: [@Namit-07](https://github.com/Namit-07)
- **Email**: namittickoo2006@gmail.com
- **Repository**: [PS-1-Personalised-Tech-interview-preparation-platform](https://github.com/Namit-07/PS-1-Personalised-Tech-interview-preparation-platform)

### Reporting Issues
Found a bug? Have a suggestion? Please open an issue on GitHub!

### Getting Help
- Check the [ARCHITECTURE.md](ARCHITECTURE.md) for system design
- Read [FEATURES.md](FEATURES.md) for detailed feature specs
- See [HACKATHON_PLAN.md](HACKATHON_PLAN.md) for development timeline
- Review [LINKEDIN_OAUTH_SETUP.md](LINKEDIN_OAUTH_SETUP.md) for OAuth setup

---

## 📊 Project Stats

- **Lines of Code**: 10,000+
- **Components**: 15+ React components
- **API Endpoints**: 20+ routes
- **Problems**: 30+ coding challenges
- **Modules**: 8 learning modules
- **Development Time**: 36 hours
- **Technologies**: 15+ tools and frameworks

---

## 🌟 Show Your Support

If you found this project helpful or interesting:

⭐ **Star this repository** on GitHub  
🔄 **Share** with friends preparing for interviews  
🐛 **Report bugs** to help improve the platform  
💡 **Suggest features** for future enhancements  
🤝 **Contribute** with pull requests

---

**Happy Coding! May your interview prep be efficient and your offers be plenty! 🚀**
