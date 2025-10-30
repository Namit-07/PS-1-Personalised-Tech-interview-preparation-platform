# 🚀 Personalized Tech Interview Preparation Platform

> **Built for 36-Hour Hackathon** | An AI-powered interview prep platform that adapts to YOUR goals

## 🎯 The Problem

Traditional "SDE Sheets" give everyone the same problems regardless of their:
- Target company (Google vs startup)
- Experience level (fresher vs 5 years)
- Current skill gaps (weak in DP? Strong in arrays?)

**Result**: Inefficient prep, low success rates, wasted time.

## 💡 Our Solution

An **intelligent interview prep platform** that:
- ✅ Creates personalized learning paths based on target company & role
- ✅ Uses AI to provide hints, explanations, and code reviews
- ✅ Calculates real-time "success probability" as you progress
- ✅ Recommends next problems based on your weak topics
- ✅ Tracks topic-wise proficiency (Graphs: 3/10, Arrays: 8/10)

---

## 🏆 Key Features

### 🤖 AI-Powered Doubt Assistant
- Progressive hints (never spoils the solution!)
- Concept explanations
- Code review with improvement suggestions
- Context-aware based on your skill level

### 📊 Dynamic Success Probability
- Real-time calculation: "You have 72% chance of cracking Google L4"
- Updates after each problem you solve
- Shows exactly what to improve

### 🎯 Smart Recommendations
- Analyzes your weak topics
- Suggests problems from target company
- Adapts difficulty as you improve
- Spaced repetition for review

### 📈 Progress Tracking
- Topic-wise proficiency scores
- Solved problems dashboard
- Streak tracking
- Visual analytics

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 16 (React 19)
- Tailwind CSS 4
- Recharts (data visualization)
- Axios

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- OpenAI API (AI assistant)

**Deployment:**
- Vercel (Frontend)
- Railway/Render (Backend)
- MongoDB Atlas (Database)

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- OpenAI API key (optional for AI features)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in the root:
```env
# Backend
PORT=5000
MONGODB_URI=mongodb://localhost:27017/techprep
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development

# AI (Optional)
OPENAI_API_KEY=your_openai_api_key
```

### 3. Run Backend
```bash
cd backend
node server.js
```

### 4. Run Frontend
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📂 Project Structure

```
├── app/                    # Next.js frontend
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── problems/          # Problem list & solver
│   └── components/        # Reusable components
├── backend/               # Express backend
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   └── server.js         # Main server file
├── HACKATHON_PLAN.md     # 36-hour execution plan
├── ARCHITECTURE.md       # System architecture
└── FEATURES.md           # Feature specifications
```

---

## 🎪 Demo Flow (3 Minutes)

1. **Onboarding**: Select "Google" as target → L4 role → 2-3 years experience
2. **Dashboard**: Shows "72% success probability" + weak topics
3. **Problem Solving**: Pick a DP problem → Get stuck → AI gives progressive hints
4. **Progress Update**: Success probability increases to 74%
5. **Recommendations**: "Next, solve these problems in Graphs (your weak area)"

---

## 📅 36-Hour Development Timeline

### Hours 0-6: Foundation
- ✅ Backend setup + MongoDB
- ✅ User authentication (signup/login)
- ✅ Frontend auth pages

### Hours 6-12: Core Features
- ✅ Problem database (30+ problems)
- ✅ Problem list UI
- ✅ Problem solver page
- ✅ Progress tracking

### Hours 12-18: Smart Features
- ✅ AI assistant integration
- ✅ Recommendation algorithm
- ✅ Success probability calculator
- ✅ Dashboard with stats

### Hours 18-24: Polish
- ✅ UI/UX improvements
- ✅ Dark mode
- ✅ Company-specific features
- ✅ Bug fixes

### Hours 24-30: Demo Prep
- ✅ Landing page
- ✅ Demo video
- ✅ Test flows

### Hours 30-36: Deployment
- ✅ Deploy to production
- ✅ Documentation
- ✅ Final testing

---

## 🎯 Unique Selling Points

1. **True Personalization**: Not just filtered lists - actual AI-driven path generation
2. **Progressive AI Hints**: Helps without spoiling (3-level hint system)
3. **Dynamic Success Metric**: Real-time probability based on actual progress
4. **Company Intelligence**: Learns from company-specific interview patterns

---

## 🚀 Deployment

### Deploy Frontend (Vercel)
```bash
vercel deploy
```

### Deploy Backend (Railway)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Database (MongoDB Atlas)
1. Create free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Get connection string
3. Update `MONGODB_URI` in environment variables

---

## 📊 API Endpoints

### Authentication
```
POST /api/auth/signup    - Register new user
POST /api/auth/login     - Login user
GET  /api/auth/me        - Get current user
```

### Problems
```
GET  /api/problems              - Get all problems (with filters)
GET  /api/problems/:id          - Get single problem
POST /api/problems/submit       - Submit solution
GET  /api/problems/recommended  - Get AI recommendations
```

### AI
```
POST /api/ai/chat       - Chat with AI assistant
POST /api/ai/hint       - Get progressive hint
POST /api/ai/review     - Get code review
```

### Progress
```
GET  /api/progress        - Get user progress
GET  /api/progress/stats  - Get statistics
```

---

## 🎨 Screenshots

*(Add screenshots after building)*
- Dashboard
- Problem solver
- AI chat
- Analytics

---

## 🤝 Contributing

This is a hackathon project built in 36 hours. Future improvements:
- [ ] Code execution engine
- [ ] More problem modules (System Design, LLD)
- [ ] Gamification (badges, leaderboards)
- [ ] Mobile app
- [ ] Community features

---

## 📝 License

MIT License - feel free to use and modify!

---

## 👥 Team

Built with ❤️ for Programming Pathshala Hackathon

---

## 🙏 Acknowledgments

- Programming Pathshala for the inspiration
- OpenAI for AI capabilities
- Next.js & Vercel teams for amazing tools

---

**⭐ If you find this useful, please star the repo!**
