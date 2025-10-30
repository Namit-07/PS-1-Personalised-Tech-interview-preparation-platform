# 🚀 Alternative: Deploy to Render (Easier than Railway)

**⏱️ Time: 10 minutes**  
**💰 Cost: $0 (Free tier)**  
**Why Render**: Simpler setup, no "invalid service name" issues

---

## Step 1: Sign Up for Render

```
1. Go to https://render.com/
2. Click "Get Started"
3. Sign up with GitHub (recommended)
4. Authorize Render to access your repositories
```

---

## Step 2: Create Web Service

### 2.1 New Web Service
```
1. From Render dashboard, click "New +"
2. Select "Web Service"
3. Connect your GitHub repository if not already connected
4. Select: PS-1-Personalised-Tech-interview-preparation-platform
5. Click "Connect"
```

### 2.2 Configure Service
```
Name: techprep-backend
Region: Oregon (US West) or closest to you
Branch: master
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: node server.js
```

**IMPORTANT for Next.js Frontend on Render:**
- If deploying the frontend (not just backend), you MUST add this environment variable:
  - Key: `TURBOPACK`
  - Value: `0`
  - This disables Turbopack which is incompatible with Tailwind v4 native binaries

### 2.3 Select Plan
```
1. Select "Free" plan (scroll down to find it)
2. Free tier includes:
   - 512 MB RAM
   - Shared CPU
   - Auto-deploy from Git
   - Free SSL
```

---

## Step 3: Add Environment Variables

Click "Advanced" → Add each environment variable:

```
PORT = 5000
NODE_ENV = production
MONGODB_URI = your_mongodb_atlas_connection_string
JWT_SECRET = your_jwt_secret_minimum_32_characters
GEMINI_API_KEY = your_gemini_api_key
```

**Replace with your actual values!**

---

## Step 4: Deploy

```
1. Click "Create Web Service"
2. Render will:
   - Clone your repo
   - Run npm install
   - Start your server
3. Watch the deploy logs in real-time
4. Wait 3-5 minutes for first deployment
5. You'll see "Your service is live" when ready
```

---

## Step 5: Get Your URL

```
1. At the top of the page, you'll see your service URL
2. Format: https://techprep-backend.onrender.com
3. Copy this URL - you need it for:
   - Vercel frontend deployment
   - LinkedIn OAuth redirect URI
```

---

## Step 6: Seed Database

### Option A: Local with Production URI
```powershell
# In your backend folder
# Temporarily update .env with production MONGODB_URI
node seed.js
# Revert .env back
```

### Option B: Render Shell
```
1. In Render dashboard, click your service
2. Go to "Shell" tab (top menu)
3. Click "Launch Shell"
4. Run: node seed.js
5. Should see "Seeded 30 problems"
```

---

## Step 7: Verify Backend

```
1. Open: https://your-render-url.onrender.com/api/problems
2. Should see JSON array of problems
3. If error, check Render logs tab
```

---

## 🎯 Render vs Railway

**Render Advantages:**
- ✅ No "invalid service name" errors
- ✅ Simpler UI and setup
- ✅ Built-in shell access
- ✅ Better free tier (750 hours/month)
- ✅ Automatic HTTPS
- ✅ Easy to use

**Railway Advantages:**
- ⚡ Faster cold starts
- 🔄 Better for frequent deploys
- 💾 Persistent storage options

**For Hackathon: Render is easier and more reliable!**

---

## 📝 Next: Deploy Frontend to Vercel

After your Render backend is live:

```
1. Go to vercel.com
2. Import your repo
3. Add environment variables:
   NEXT_PUBLIC_API_URL = https://your-render-url.onrender.com/api
   TURBOPACK = 0
4. Deploy
5. Done! ✅
```

**Note:** `TURBOPACK=0` disables Turbopack to ensure Tailwind v4 builds correctly.

---

## 🐛 Render Troubleshooting

### Build fails
```
Problem: npm install errors
Solution:
- Check Render logs for specific error
- Verify package.json exists in backend folder
- Ensure Node version is compatible (18+)
```

### Service won't start
```
Problem: "Application failed to respond"
Solution:
- Check Start Command is: node server.js
- Verify PORT environment variable is set
- Check Render logs for startup errors
```

### Database connection fails
```
Problem: Can't connect to MongoDB
Solution:
- Verify MONGODB_URI is correct
- Check MongoDB Atlas IP whitelist (0.0.0.0/0)
- Test connection string format
```

---

## 💡 Pro Tips

1. **Cold Start**: Free tier sleeps after 15 min of inactivity
   - First request after sleep takes ~30 seconds
   - Keep it awake: Use UptimeRobot to ping every 14 minutes

2. **Logs**: Always check logs tab if something fails

3. **Manual Deploy**: You can trigger redeploy anytime from Render dashboard

4. **Environment Variables**: Can update anytime without redeploying

---

**Try Render - it's much simpler than Railway for hackathons! 🚀**
