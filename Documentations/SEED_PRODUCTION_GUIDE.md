# 🌱 How to Seed Production Database

## Option 1: Automated Script (Recommended)

Run this PowerShell script from your project root:

```powershell
.\seed-production.ps1
```

The script will:
1. ✅ Backup your current `.env` file
2. 📝 Ask for your MongoDB Atlas URI
3. 🔄 Temporarily update `.env` with production URI
4. 🌱 Run the seed script to add 30+ problems
5. ♻️ Restore your original `.env` file

**Safe and automatic!**

---

## Option 2: Manual Steps

### Step 1: Get Your MongoDB Atlas URI

1. Go to https://cloud.mongodb.com/
2. Click on your cluster → **Connect** → **Connect your application**
3. Copy the connection string
4. Should look like: `mongodb+srv://techprep_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/techprep`

**Important:** 
- Replace `<password>` with your actual MongoDB password
- Add `/techprep` at the end (database name)

Example:
```
mongodb+srv://techprep_user:MyPass123@cluster0.abcde.mongodb.net/techprep
```

---

### Step 2: Backup Your .env File

```powershell
# From project root
Copy-Item backend\.env backend\.env.backup
```

---

### Step 3: Update backend/.env

Open `backend/.env` and find this line:
```
MONGODB_URI=mongodb://localhost:27017/techprep
```

Replace it with your Atlas URI:
```
MONGODB_URI=mongodb+srv://techprep_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/techprep
```

**Save the file!**

---

### Step 4: Run Seed Script

```powershell
cd backend
node seed.js
```

You should see output like:
```
🗑️  Cleared existing problems
✅ Seeded 30 problems successfully!
📊 Easy: 10 | Medium: 15 | Hard: 5
✨ Database seeded successfully
```

---

### Step 5: Restore Original .env

```powershell
# From backend folder
cd ..
Copy-Item backend\.env.backup backend\.env
Remove-Item backend\.env.backup
```

Your local MongoDB URI is restored!

---

## Option 3: One-Line Command (Advanced)

If you want to do it in one command without modifying files:

```powershell
cd backend; $env:MONGODB_URI="mongodb+srv://techprep_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/techprep"; node seed.js
```

**Replace** `YOUR_PASSWORD` and cluster details with your actual values.

---

## ✅ Verify Seeding Was Successful

### Check in MongoDB Atlas:
1. Go to https://cloud.mongodb.com/
2. Click **Database** → **Browse Collections**
3. Select **techprep** database → **problems** collection
4. Should see 30+ documents with problem data

### Check via API:
Open your Render backend URL in browser:
```
https://your-backend.onrender.com/api/problems
```

Should return JSON array with 30+ problems.

---

## 🐛 Troubleshooting

### "Authentication failed"
```
Problem: Wrong password or username in MongoDB URI
Solution:
- Double-check password in Atlas dashboard
- Make sure username is correct (techprep_user)
- Verify connection string format
```

### "Could not connect to server"
```
Problem: Network access not configured
Solution:
- Go to Atlas → Network Access
- Add IP: 0.0.0.0/0 (allow from anywhere)
- Wait 1-2 minutes for changes to apply
```

### "Database not specified"
```
Problem: Missing /techprep at end of URI
Solution: Add /techprep to the end of connection string
Example: ...mongodb.net/techprep
```

### Already seeded?
```
The seed script clears existing problems first, so it's safe to run multiple times.
If you see "Cleared existing problems", it's working!
```

---

## 📋 Quick Reference

**Your MongoDB Atlas URI format:**
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/techprep
```

**Environment variable in .env:**
```
MONGODB_URI=mongodb+srv://techprep_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/techprep
```

**Seed command:**
```powershell
cd backend
node seed.js
```

---

## 🎯 After Seeding

Once seeding is successful:
- ✅ Your Atlas database has 30+ problems
- ✅ Your backend can fetch problems from Atlas
- ✅ Your local .env is restored to localhost
- ✅ Ready to deploy frontend to Vercel!

---

**Need help? Just ask!** 🚀
