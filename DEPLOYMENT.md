# 🚀 Hackathon Deployment Guide

**⏱️ Total Time: 15-20 minutes**  
**💰 Cost: $0 (Free tiers)**  
**Stack: Vercel + Railway + MongoDB Atlas**

---

## 📋 Prerequisites

- [ ] GitHub account
- [ ] Vercel account (sign up with GitHub at [vercel.com](https://vercel.com))
- [ ] Railway account (sign up with GitHub at [railway.app](https://railway.app))
- [ ] MongoDB Atlas account (sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas))
- [ ] Google Gemini API key (get from [ai.google.dev](https://ai.google.dev))

---

## Step 1: Set Up MongoDB Atlas (5 minutes)

### 1.1 Create Cluster
```
1. Go to https://cloud.mongodb.com/
2. Click "Build a Database" → Choose FREE "M0" tier
3. Select cloud provider (AWS recommended) and region (closest to you)
4. Cluster name: "techprep" or keep default
5. Click "Create"
```

### 1.2 Create Database User
```
1. Security → Database Access → Add New Database User
2. Username: techprep_user
3. Password: Generate secure password (SAVE THIS!)
4. Database User Privileges: "Read and write to any database"
5. Click "Add User"
```

### 1.3 Whitelist IP Addresses
```
1. Security → Network Access → Add IP Address
2. Click "Allow Access from Anywhere" (0.0.0.0/0)
3. Confirm
```

### 1.4 Get Connection String
```
1. Database → Connect → Drivers → Node.js
2. Copy connection string: mongodb+srv://techprep_user:<password>@cluster0.xxxxx.mongodb.net/
3. Replace <password> with your actual password
4. Add database name at the end: mongodb+srv://techprep_user:pass@cluster0.xxxxx.mongodb.net/techprep
5. SAVE THIS - you'll need it for Railway
```

---

## Step 2: Deploy Backend to Railway (5 minutes)

### 2.1 Push Changes to GitHub First
**IMPORTANT**: Before deploying to Railway, commit and push the new files:

```bash
# In your project root
git add backend/package.json backend/railway.json
git commit -m "Add Railway deployment configuration"
git push origin master
```

### 2.2 Create New Project
```
1. Go to https://railway.app/
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub (if first time)
5. Select repository: PS-1-Personalised-Tech-interview-preparation-platform
6. Click "Deploy Now"
```

### 2.3 Configure Root Directory
**CRITICAL STEP** - Railway needs to know where your backend code is:

```
1. After project is created, click on your service
2. Go to "Settings" tab
3. Find "Root Directory" field
4. Enter: backend
5. Click outside the field to save (it auto-saves)
```

### 2.5 Generate Domain & Deploy
```
1. Go to "Settings" tab
2. Scroll to "Networking" section
3. Click "Generate Domain" - Railway will create a public URL
4. Copy the domain: something like techprep-production-xxxx.up.railway.app
5. SAVE THIS URL - you'll need it for:
   - Frontend environment variable
   - LinkedIn redirect URI (if using OAuth)
```

### 2.6 Add LinkedIn Redirect URI (Optional)
If using LinkedIn OAuth, add this variable now that you have the domain:
```
Go back to Variables tab:
LINKEDIN_REDIRECT_URI=https://YOUR-RAILWAY-DOMAIN.up.railway.app/api/linkedin/callback
```

### 2.7 Trigger Deploy
```
1. Railway should auto-deploy after you set variables
2. If not, go to "Deployments" tab → Click "Deploy"
3. Watch the build logs (click on the deployment)
4. Wait 2-3 minutes for build to complete
5. Status should show "Success" with green checkmark
```

### 2.8 Seed Database
Go to "Variables" tab and click "New Variable" for each:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://techprep_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/techprep
JWT_SECRET=hackathon_jwt_secret_2025_minimum_32_characters_long
GEMINI_API_KEY=your_gemini_api_key_here
LINKEDIN_CLIENT_ID=your_linkedin_client_id_optional
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret_optional
```

**Important**: 
- Replace `YOUR_PASSWORD` with your MongoDB Atlas password
- Replace `YOUR_PASSWORD@cluster0.xxxxx` with your actual cluster details
- Add your Gemini API key
- LinkedIn variables are optional (skip if not using OAuth)

### 2.5 Generate Domain & Deploy
```
1. Click "Deploy"
2. Wait 2-3 minutes for build
3. Once deployed, click on the service
4. Copy your Railway URL: https://YOUR_APP.up.railway.app
5. SAVE THIS URL - needed for frontend
```

### 2.8 Seed Database
```
Option A - Local with Production URI (Recommended):
1. Copy your MONGODB_URI from Railway variables
2. Temporarily update backend/.env with production MONGODB_URI
3. Run: cd backend && npm install && node seed.js
4. Revert .env back to local MongoDB URI
5. Should see "✅ Seeded 30 problems successfully"

Option B - Railway CLI:
1. Install Railway CLI: npm install -g @railway/cli
2. Link project: railway link
3. Run: railway run node seed.js
```

### 2.9 Verify Backend
```
1. Open your Railway domain in browser: https://your-domain.up.railway.app/api/problems
2. Should see JSON array of problems (if seeded)
3. If you see a response, backend is working! ✅
4. If error 404 or 500, check Railway deployment logs
```

---

## Step 3: Deploy Frontend to Vercel (5 minutes)

### 3.1 Import Project
```
1. Go to https://vercel.com/
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select: PS-1-Personalised-Tech-interview-preparation-platform
```

### 3.2 Configure Build
```
Framework Preset: Next.js (auto-detected)
Root Directory: ./ (leave as root)
Build Command: npm run build (default)
Output Directory: .next (default)
Install Command: npm install (default)
```

### 3.3 Add Environment Variable
```
1. Click "Environment Variables"
2. Add:
   Key: NEXT_PUBLIC_API_URL
   Value: https://YOUR_RAILWAY_URL.up.railway.app/api
3. Select all environments (Production, Preview, Development)
```

**Replace `YOUR_RAILWAY_URL` with your actual Railway backend URL**

### 3.4 Deploy
```
1. Click "Deploy"
2. Wait 2-3 minutes for build
3. Vercel will give you a URL: https://your-app.vercel.app
```

### 3.5 Update CORS (if needed)
If you get CORS errors:
```
1. Go back to Railway → Your backend service → Variables
2. Add: FRONTEND_URL=https://your-app.vercel.app
3. Backend will need this for CORS (may need code update)
```

---

## Step 4: Test Your Deployment (2 minutes)

### 4.1 Open Your App
```
1. Go to: https://your-app.vercel.app
2. Should see landing page
```

### 4.2 Test Signup/Login
```
1. Click "Sign Up"
2. Create account → Select role → Complete onboarding
3. Should redirect to dashboard
```

### 4.3 Test Problem Solving
```
1. Navigate to any module (DSA, System Design, etc.)
2. Open a problem
3. Test AI chat: type /hint
4. Submit a solution
5. Check if stats update
```

### 4.4 Test Leaderboard (Recruiter)
```
1. Logout → Login with recruiter account
2. Should see leaderboard
3. Click on a student profile
```

---

## 🎯 Quick Reference URLs

After deployment, save these:

```
Frontend (Vercel): https://your-app.vercel.app
Backend (Railway): https://your-backend.up.railway.app
Database (Atlas): mongodb+srv://...

Vercel Dashboard: https://vercel.com/dashboard
Railway Dashboard: https://railway.app/dashboard
Atlas Dashboard: https://cloud.mongodb.com/
```

---

## 🐛 Troubleshooting

### Frontend can't connect to backend
```
Problem: "Failed to fetch" or CORS errors
Solution:
1. Check NEXT_PUBLIC_API_URL in Vercel environment variables
2. Verify Railway backend is running (check logs)
3. Test backend directly: https://your-railway-url.up.railway.app/api/problems
4. Update backend CORS settings if needed
```

### Backend won't start
```
Problem: Railway deployment failed
Solution:
1. Check Railway logs for errors
2. Verify all environment variables are set
3. Check MONGODB_URI is correct (test connection)
4. Ensure Node version compatibility (Railway uses latest)
```

### Database connection failed
```
Problem: "MongoServerError: Authentication failed"
Solution:
1. Verify MongoDB Atlas password in MONGODB_URI
2. Check IP whitelist (should be 0.0.0.0/0)
3. Verify database user has read/write permissions
4. Test connection string format: mongodb+srv://user:pass@cluster.mongodb.net/dbname
```

### LinkedIn OAuth not working
```
Problem: Redirect fails or invalid credentials
Solution:
1. Update LinkedIn app redirect URI to match Railway URL
2. Set LINKEDIN_REDIRECT_URI in Railway variables
3. Verify CLIENT_ID and CLIENT_SECRET are correct
```

### AI chat not responding
```
Problem: /hint or other commands don't work
Solution:
1. Verify GEMINI_API_KEY is set in Railway
2. Check Railway logs for API errors
3. Ensure API key has correct permissions
4. Check Gemini API quotas/billing
```

### Problems not loading
```
Problem: Empty problem list
Solution:
1. Database needs seeding
2. Run: node seed.js from Railway console or locally with Atlas URI
3. Verify problems collection exists in MongoDB Atlas dashboard
```

---

## 🎤 Demo Day Checklist

Before presenting to judges:

- [ ] Test all user flows (signup → solve problem → check leaderboard)
- [ ] Test on mobile and desktop
- [ ] Clear browser cache and test fresh signup
- [ ] Prepare 2-3 test accounts (student + recruiter)
- [ ] Check all AI commands work (/hint, /explain, /review, /testcases)
- [ ] Verify activity heatmap shows data
- [ ] Test LinkedIn import (if using)
- [ ] Have backend logs open in Railway (in case of issues)
- [ ] Have backup localhost running (just in case)
- [ ] Share URLs in private window to verify public access

---

## 📊 Monitor During Hackathon

### Vercel Analytics
```
1. Go to Vercel dashboard → Your project → Analytics
2. See real-time visitors and page views
3. Check for errors in Functions tab
```

### Railway Logs
```
1. Go to Railway dashboard → Your service → Deployments
2. Click active deployment → View Logs
3. Monitor for errors or crashes
```

### MongoDB Atlas Monitoring
```
1. Go to Atlas dashboard → Cluster → Metrics
2. Check connection count and operations
3. Monitor slow queries
```

---

## 🔥 Quick Redeploy (if needed)

### Frontend (Vercel)
```
1. Push to GitHub main branch → Auto-deploys
2. Or: Vercel dashboard → Deployments → Redeploy
```

### Backend (Railway)
```
1. Push to GitHub main branch → Auto-deploys
2. Or: Railway dashboard → Deployments → Redeploy
```

### Instant Rollback
```
Vercel: Deployments → Previous deployment → Promote to Production
Railway: Deployments → Previous deployment → Redeploy
```

---

## 💡 Pro Tips for Hackathon

1. **Deploy Early**: Deploy on day 1, not last hour
2. **Use Preview Deployments**: Test features on Vercel preview URLs before merging
3. **Monitor Logs**: Keep Railway logs open during demo
4. **Have Backup**: Keep localhost running in case of deployment issues
5. **Test Everything**: Test all features 1 hour before demo
6. **Cache Demo Data**: Pre-seed with demo users and solved problems
7. **Prepare Accounts**: Have 2-3 test accounts ready with different states
8. **Mobile Matters**: Test on phone - judges often check mobile
9. **Share Early**: Share URL with team for continuous testing
10. **Document Issues**: If something breaks, have explanation ready

---

## 🎯 Success Metrics

Your deployment is successful when:
- ✅ Frontend loads on Vercel URL
- ✅ Can signup and login
- ✅ Problems load from database
- ✅ AI chat responds to commands
- ✅ Code submission works
- ✅ Dashboard shows stats
- ✅ Leaderboard shows rankings
- ✅ Activity heatmap renders
- ✅ Profile updates save
- ✅ No CORS errors in console

---

## 🆘 Emergency Contacts

If deployment fails during hackathon:

**Vercel Support**: https://vercel.com/support  
**Railway Support**: https://railway.app/help  
**Atlas Support**: https://www.mongodb.com/support

**Quick fix commands**:
```bash
# Reset and redeploy
git add . && git commit -m "fix: deployment" && git push origin main

# Check Railway logs
railway logs

# Local test with production env
npm run build && npm start
```

---

**🎉 Good luck with your hackathon! You've got this! 🚀**
