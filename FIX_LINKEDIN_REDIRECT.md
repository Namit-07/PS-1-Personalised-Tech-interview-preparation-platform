# Fix LinkedIn OAuth Errors

## Error 1: "The redirect_uri does not match"
Your LinkedIn app doesn't have the correct redirect URI registered.

## Error 2: "In five seconds, you will be redirected to: localhost"
This means LinkedIn is rejecting your OAuth request. Common causes:
1. Missing required product access
2. Invalid client credentials
3. App not properly configured

## Quick Fix (2 minutes)

### Step 1: Go to LinkedIn Developers
1. Visit: https://www.linkedin.com/developers/apps
2. Click on your app (the one with Client ID: `86sozqm5vuktmw`)

### Step 2: Add Redirect URLs
1. In your app settings, find **"OAuth 2.0 settings"** section
2. Look for **"Redirect URLs"** 
3. Click **"Add redirect URL"**
4. Add this EXACT URL:
   ```
   http://localhost:3000/api/linkedin/callback
   ```
5. Click **"Update"** or **"Save"**

### Step 3: Verify Products
Make sure you have requested access to:
- ✅ **Sign In with LinkedIn using OpenID Connect** ← CRITICAL!

**How to check:**
1. In your LinkedIn app, go to the "Products" tab
2. Look for "Sign In with LinkedIn using OpenID Connect"
3. If it says "Request access" - click it and wait for approval (usually instant)
4. If it says "Added" - you're good!

**Important:** Without this product, LinkedIn will reject all OAuth requests with the "localhost" error!

### Step 4: Test Again
1. Go back to http://localhost:3000/profile
2. Click "Connect LinkedIn"
3. Should redirect successfully now! 🎉

## Troubleshooting

### Still getting the error?
- Make sure the URL is **EXACTLY** `http://localhost:3000/api/linkedin/callback` (no trailing slash)
- Check that you saved the changes in LinkedIn app settings
- Wait 30 seconds after saving (sometimes LinkedIn needs a moment)
- Try opening profile page in an incognito/private window

### Wrong app settings?
If you can't find the redirect URLs section:
1. Go to "Auth" tab in your LinkedIn app
2. Scroll down to "OAuth 2.0 settings"
3. You should see "Redirect URLs" there

## Why This Happens
LinkedIn requires you to explicitly whitelist every redirect URL for security. The URL we're using (`http://localhost:3000/api/linkedin/callback`) must be registered in your LinkedIn app settings.

## For Production Later
When you deploy to production, you'll need to add your production URL too:
```
https://yourdomain.com/api/linkedin/callback
```
