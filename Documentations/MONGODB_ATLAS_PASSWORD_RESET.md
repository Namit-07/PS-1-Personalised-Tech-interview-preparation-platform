# 🔐 How to Reset MongoDB Atlas Password

## Step-by-Step Visual Guide

### 1. Go to MongoDB Atlas
Open: **https://cloud.mongodb.com/**

### 2. Find Database Access

Look at the **LEFT SIDEBAR** - it should have these options:
```
📊 Overview
🗄️ Database          <- You might be here
🔐 Database Access   <- CLICK THIS ONE
🌐 Network Access
🔔 Alerts
...
```

**If you don't see "Database Access":**
- You might need to select your organization/project first
- Look for a dropdown at the top that says "Select a Project"
- Click on your project name (might be "Project 0" or "techprep")

### 3. Look for Your User

Once you're in **Database Access**, you should see:
```
┌─────────────────────────────────────────────┐
│ MongoDB Users                                │
├─────────────────────────────────────────────┤
│ Username         Built-in Role    Actions   │
│ techprep_user    readWrite...     [EDIT]    │
└─────────────────────────────────────────────┘
```

**If you DON'T see `techprep_user`:**
- You might not have created a user yet!
- Click **+ ADD NEW DATABASE USER** button (top right)

### 4. Create User if Needed

If you need to create the user:

1. Click **+ ADD NEW DATABASE USER**
2. Choose **Password** authentication method
3. Set username: `techprep_user`
4. Click **Autogenerate Secure Password**
5. **COPY THE PASSWORD IMMEDIATELY** (you won't see it again!)
6. Under "Database User Privileges", select: **Read and write to any database**
7. Click **Add User**

### 5. Edit Existing User (If Found)

If you found `techprep_user`:

1. Click **EDIT** button on the right
2. Scroll down to "Password" section
3. Click **Edit Password**
4. Click **Autogenerate Secure Password** (or type a simple one like `TestPass123`)
5. **COPY THE PASSWORD** - Save it in Notepad!
6. Click **Update User** at the bottom

---

## 🌐 Network Access Setup

While you're there, make sure any IP can connect:

1. Click **Network Access** in the left sidebar
2. Look for IP addresses listed
3. If you don't see `0.0.0.0/0` (allow all):
   - Click **+ ADD IP ADDRESS**
   - Click **ALLOW ACCESS FROM ANYWHERE**
   - Click **Confirm**

---

## 📝 Get Your Connection String

After resetting password:

1. Go back to **Database** (left sidebar)
2. Click **Connect** button on your cluster
3. Choose **Connect your application**
4. Select **Driver: Node.js** and **Version: 6.x or later**
5. Copy the connection string - looks like:
   ```
   mongodb+srv://techprep_user:<password>@techprep.jemxx0a.mongodb.net/?retryWrites=true&w=majority
   ```

6. Replace `<password>` with the password you just copied
7. Add `/techprep` before the `?`:
   ```
   mongodb+srv://techprep_user:YOUR_PASSWORD@techprep.jemxx0a.mongodb.net/techprep?retryWrites=true&w=majority
   ```

---

## 🚀 Alternative: Create New Cluster from Scratch

If you're really stuck, here's how to start fresh:

### 1. Create Free Cluster
1. Go to https://cloud.mongodb.com/
2. Click **+ Create** (top right)
3. Choose **FREE** tier (M0)
4. Select a region close to you
5. Click **Create Deployment**

### 2. Create Database User
1. Choose **Username and Password** auth
2. Username: `techprep_user`
3. Click **Autogenerate Secure Password**
4. **COPY THE PASSWORD!**
5. Click **Create Database User**

### 3. Allow Network Access
1. Choose **My Local Environment**
2. Click **Add My Current IP Address**
3. Or click **Allow Access from Anywhere** for easier testing

### 4. Get Connection String
1. Click **Connect**
2. Choose **Drivers**
3. Copy the connection string
4. Replace `<password>` with your password
5. Add `/techprep` database name

---

## ❓ Still Stuck?

**Tell me which of these you see:**

A) "I don't see Database Access in the sidebar"
   → You might be on the wrong screen or need to select a project

B) "I see Database Access but no users"
   → You need to create a new user first

C) "I found techprep_user but can't edit password"
   → You might not have permission, or need to scroll down in the edit screen

D) "I reset the password but still getting auth error"
   → The new password might not have propagated yet (wait 1-2 minutes)

**Let me know which situation you're in!**
