# 🔗 LinkedIn OAuth Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create LinkedIn App
1. Go to https://www.linkedin.com/developers/apps
2. Click **"Create app"**
3. Fill in:
   - App name: `TechPrep Interview Platform`
   - LinkedIn Page: Your company page (or create one)
   - App logo: Upload any logo
   - Check "I have read and agree to the terms"
4. Click **"Create app"**

### Step 2: Get Credentials
1. Go to **"Auth"** tab
2. Copy:
   - **Client ID**
   - **Client Secret**
3. Add **Redirect URLs**:
   ```
   http://localhost:3000/api/linkedin/callback
   http://localhost:5000/api/linkedin/callback
   ```

### Step 3: Request API Access
1. Go to **"Products"** tab
2. Request access to:
   - ✅ **Sign In with LinkedIn using OpenID Connect**
   - ✅ **Share on LinkedIn** (optional)
3. Wait for approval (usually instant)

### Step 4: Add Environment Variables

Create `.env` file in **backend** folder:
```env
LINKEDIN_CLIENT_ID=your_client_id_here
LINKEDIN_CLIENT_SECRET=your_client_secret_here
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/linkedin/callback
```

Create `.env.local` file in **root** folder (frontend):
```env
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/api/linkedin/callback
```

### Step 5: Restart Servers
```bash
# Stop all servers
Ctrl+C (in both terminals)

# Restart backend
cd backend
node server.js

# Restart frontend (in new terminal)
npm run dev
```

## How It Works

### OAuth Flow:
```
1. User clicks "Connect LinkedIn"
   ↓
2. Redirects to LinkedIn authorization page
   ↓
3. User approves access
   ↓
4. LinkedIn redirects back with authorization code
   ↓
5. Backend exchanges code for access token
   ↓
6. Backend fetches profile data from LinkedIn API
   ↓
7. Profile auto-fills with:
   - Name
   - Headline
   - Summary
   - Location
   - Current position & company
   - Skills
   - Profile URL
   ↓
8. User reviews and saves
```

## What Gets Imported

### ✅ Automatic Import:
- Full Name (firstName + lastName)
- Professional Headline
- Profile Summary/About
- Location (city, country)
- Current Company
- Current Position/Title
- Skills (all listed skills)
- LinkedIn Profile URL
- Profile Picture URL

### API Endpoints Created:

#### 1. **GET /api/linkedin/auth**
Initiates OAuth flow, redirects to LinkedIn

#### 2. **GET /api/linkedin/callback**
Handles OAuth callback, exchanges code for token

#### 3. **GET /api/linkedin/profile**
Fetches profile data using access token

## Testing

### With Real LinkedIn OAuth:
1. Register app on LinkedIn
2. Add credentials to `.env`
3. Click "Connect LinkedIn"
4. Approve on LinkedIn
5. Watch auto-import! ✨

### Without OAuth (Current):
- Uses simplified URL extraction
- User fills details manually
- Still functional, just manual

## LinkedIn API Scopes

Required scopes for profile import:
```javascript
scope: 'openid profile email'
```

### What Each Scope Provides:
- `openid`: Basic authentication
- `profile`: Name, headline, location, photo
- `email`: Email address

## Security Notes

✅ **Best Practices:**
- Client Secret stored in backend only
- Never expose secrets in frontend
- Access tokens expire automatically
- User can revoke access anytime from LinkedIn
- HTTPS required in production

## Troubleshooting

### "Invalid redirect_uri"
- Make sure URL matches exactly in LinkedIn app settings
- Include http:// or https://
- No trailing slashes

### "Insufficient permissions"
- Request "Sign In with LinkedIn" product
- Wait for approval (usually instant)
- Check app is not in restricted mode

### "Invalid client_id"
- Double-check .env file
- Restart backend server after adding .env
- Client ID should be visible in LinkedIn app

### Data not importing
- Check browser console for errors
- Verify access token is valid
- Ensure user approved all scopes
- LinkedIn profile must be public or semi-public

## Production Deployment

### Update Redirect URLs:
```env
LINKEDIN_REDIRECT_URI=https://your-domain.com/api/linkedin/callback
NEXT_PUBLIC_REDIRECT_URI=https://your-domain.com/api/linkedin/callback
```

### Update LinkedIn App:
1. Go to LinkedIn app settings
2. Add production redirect URL
3. Verify domain ownership
4. Update environment variables

## Cost

- ✅ **FREE** for basic profile import
- No API usage limits for authentication
- 100% free LinkedIn API access

## Benefits

### For Users:
- ⚡ One-click profile import
- ✅ Auto-fill all fields
- 🔒 Secure OAuth flow
- 📱 Works on mobile too

### For Platform:
- 🎯 Higher onboarding completion
- ✨ Professional profiles
- 🔗 LinkedIn integration badge
- 📊 Better user data quality

## Files Modified

- ✅ `backend/routes/auth.js` - OAuth endpoints
- ✅ `backend/.env` - LinkedIn credentials
- ✅ `app/profile/page.jsx` - OAuth button
- ✅ `.env.local` - Frontend client ID
- ✅ `app/api/linkedin/callback/route.js` - Next.js API route

## Next Steps

1. **Register LinkedIn App** (5 min)
2. **Add credentials to .env** (1 min)
3. **Restart servers** (30 sec)
4. **Test OAuth flow** (1 min)
5. **Enjoy automatic imports!** 🎉

---

**Once configured, users can import their entire LinkedIn profile in just 2 clicks!** 🚀💼
