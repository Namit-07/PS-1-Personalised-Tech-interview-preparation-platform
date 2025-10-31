# 🧪 **TESTING INSTRUCTIONS**

## ✅ Current Status:
- ✅ Backend running on port 5000
- ✅ Frontend running on port 3000  
- ⚠️ Need to test signup

---

## 🎯 **Manual Testing (Open Browser)**

### **Step 1: Test Backend Directly**
Open browser and go to:
```
http://localhost:5000
```
You should see: `{"message":"🚀 Tech Interview Prep API is running!"}`

---

### **Step 2: Test Signup Flow**

1. **Open**: `http://localhost:3000`
2. **Click**: "Start Free Today 🚀"
3. **Fill form**:
   - Name: Test User
   - Email: test@example.com  
   - Password: test123
   - Confirm: test123
4. **Click**: Sign Up
5. **Expected**: Redirect to dashboard

---

## 🐛 **If Signup Fails:**

### **Check Browser Console** (F12 → Console tab)
Look for errors like:
- ❌ `Network Error` → Backend not running
- ❌ `CORS Error` → CORS misconfigured
- ❌ `400/500 Error` → Backend validation/server error

### **Common Issues:**

#### **1. CORS Error**
**Error**: `Access to XMLHttpRequest blocked by CORS policy`
**Fix**: Already fixed in `backend/server.js`

#### **2. Connection Refused**
**Error**: `ERR_CONNECTION_REFUSED`
**Fix**: Make sure backend is running (`node server.js` in backend folder)

#### **3. MongoDB Not Running**
**Error**: `MongoServerError` or `Connection failed`
**Fix**: 
```bash
# Check if MongoDB is installed
mongod --version

# Start MongoDB service (Windows)
net start MongoDB

# OR start manually
mongod
```

---

## 🔍 **Debugging Steps:**

### **1. Check Backend Status**
```bash
# Terminal 1 - Should show server running
cd backend
node server.js
```
Output should be:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### **2. Check Frontend Status**  
```bash
# Terminal 2 - Should show Next.js running
npm run dev
```
Output should be:
```
▲ Next.js 16.0.1
- Local: http://localhost:3000
✓ Ready in X ms
```

### **3. Test Backend Health**
Open browser:
```
http://localhost:5000
```
Should return JSON: `{"message":"🚀 Tech Interview Prep API is running!"}`

### **4. Test Signup API Directly**
Use browser console (F12) and paste:
```javascript
fetch('http://localhost:5000/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test' + Date.now() + '@example.com',
    password: 'test123'
  })
})
.then(res => res.json())
.then(data => console.log('✅ Success:', data))
.catch(err => console.error('❌ Error:', err));
```

---

## 📝 **Expected Responses:**

### **Successful Signup**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "id": "672345abcd...",
    "name": "Test User",
    "email": "test@example.com",
    "onboardingComplete": false
  }
}
```

### **User Already Exists**
```json
{
  "error": "User already exists",
  "message": "An account with this email already exists"
}
```

### **Validation Error**
```json
{
  "error": "Validation error",
  "message": "\"password\" length must be at least 6 characters long"
}
```

---

## 🚀 **Quick Fix Commands:**

### **Restart Everything:**
```bash
# Kill all node processes
taskkill /F /IM node.exe

# Restart backend
cd backend
node server.js

# Restart frontend (in new terminal)
cd ..
npm run dev
```

### **Clear Browser Cache:**
- Press `Ctrl + Shift + Delete`
- Clear cache and cookies
- Hard refresh: `Ctrl + F5`

---

## ✅ **Once Working:**

You should be able to:
1. ✅ Sign up with new account
2. ✅ See dashboard with stats (all zeros initially)
3. ✅ Logout and login again
4. ✅ See your name in dashboard

---

## 🎯 **Next Steps After Signup Works:**

1. **Add Problems** - Seed database with coding problems
2. **Build Problem List** - Create problems page
3. **Build Problem Solver** - Individual problem page
4. **Add AI Chat** - Integrate OpenAI

---

**🔴 Important**: Make sure BOTH servers are running:
- Backend: `http://localhost:5000` 
- Frontend: `http://localhost:3000`

Check browser console (F12) for any errors!
