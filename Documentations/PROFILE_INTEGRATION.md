# 🔗 LinkedIn Profile Integration

## Overview
Users can now import their professional profile from LinkedIn into the platform. This feature enriches their profile and helps personalize their interview preparation experience.

## Features Implemented

### 1. **Profile Page** (`/profile`)
- Complete profile management interface
- Edit all professional information
- Social links (LinkedIn, GitHub, Portfolio)
- Skills management
- Professional headline and summary

### 2. **Profile Fields**
- ✅ Full Name
- ✅ Email (read-only)
- ✅ Professional Headline
- ✅ Summary/Bio
- ✅ Location
- ✅ Current Company
- ✅ Current Position
- ✅ Years of Experience
- ✅ Skills (comma-separated)
- ✅ LinkedIn Profile URL
- ✅ GitHub Profile URL
- ✅ Portfolio Website URL

### 3. **Backend API**
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/linkedin` - Import LinkedIn data
- User model extended with profile fields

### 4. **Database Schema**
Updated User model with:
```javascript
{
  headline: String,
  summary: String,
  location: String,
  company: String,
  position: String,
  experience: String,
  skills: [String],
  linkedin: String,
  github: String,
  portfolio: String,
  linkedinId: String (unique)
}
```

## How to Use

### For Users:

1. **Navigate to Profile**
   - Click "Profile" in the navbar
   - Or visit `/profile`

2. **Edit Profile Manually**
   - Click "Edit Profile" button
   - Fill in your information
   - Click "Save Changes"

3. **LinkedIn Import** (Coming Soon)
   - Click "Connect LinkedIn" button
   - Authorize the app
   - Profile data auto-fills

### For Developers:

#### Manual Profile Update
```javascript
// Frontend
const handleSubmit = async () => {
  const response = await fetch('/api/auth/profile', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
};
```

#### LinkedIn OAuth Setup (Optional)
To enable LinkedIn import:

1. **Register LinkedIn App**
   - Go to https://www.linkedin.com/developers/
   - Create new app
   - Get Client ID and Client Secret

2. **Add Environment Variables**
   ```env
   LINKEDIN_CLIENT_ID=your_client_id
   LINKEDIN_CLIENT_SECRET=your_client_secret
   LINKEDIN_REDIRECT_URI=http://localhost:3000/api/linkedin/callback
   ```

3. **OAuth Flow**
   ```
   User clicks "Connect LinkedIn"
   → Redirect to LinkedIn OAuth
   → User authorizes
   → LinkedIn redirects back with code
   → Exchange code for access token
   → Fetch profile data
   → Update user in database
   ```

## UI Features

### 🎨 Design
- Futuristic black theme
- Gradient accents (blue/purple/pink)
- Glassmorphism cards
- Smooth animations with Framer Motion

### 💼 LinkedIn Import Card
- Prominent call-to-action
- LinkedIn blue branding (#0077B5)
- One-click import button
- Clear instructions

### 📝 Form Sections
1. Basic Info (name, email)
2. Professional Details (headline, summary)
3. Current Role (location, company, position, experience)
4. Skills (comma-separated input)
5. Social Links (LinkedIn, GitHub, portfolio)

### ✏️ Edit Mode
- Toggle edit mode with button
- Disabled state when not editing
- Visual feedback
- Save button appears in edit mode

## Benefits

### 👤 For Users
- ✅ Quick profile setup
- ✅ Professional presentation
- ✅ Centralized information
- ✅ Easy updates
- ✅ LinkedIn integration (future)

### 🎯 For Platform
- ✅ Better user insights
- ✅ Personalized recommendations
- ✅ Enhanced user profiles
- ✅ Professional credibility
- ✅ Social proof

## Future Enhancements

### Phase 1 ✅ (DONE)
- Profile page UI
- Manual profile editing
- Backend API endpoints
- Database schema

### Phase 2 (Next)
- LinkedIn OAuth integration
- Auto-import profile data
- Profile picture upload
- Resume/CV upload

### Phase 3 (Future)
- GitHub contributions import
- LeetCode stats integration
- HackerRank profile sync
- Codeforces rating import

### Phase 4 (Advanced)
- Public profile pages
- Profile sharing
- QR code for profile
- Profile completeness score
- Achievement badges on profile

## Testing

1. **Start servers**
   ```bash
   npm run dev
   cd backend && node server.js
   ```

2. **Navigate to Profile**
   - Go to http://localhost:3001/profile

3. **Edit Profile**
   - Click "Edit Profile"
   - Fill in fields
   - Click "Save Changes"

4. **Verify Update**
   - Check navbar (name updates)
   - Refresh page (data persists)
   - Check database (MongoDB)

## API Documentation

### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "headline": "Full Stack Developer",
  "summary": "Passionate about building...",
  "location": "San Francisco, CA",
  "company": "Google",
  "position": "Senior Software Engineer",
  "experience": "5 years",
  "skills": ["JavaScript", "React", "Node.js"],
  "linkedin": "https://linkedin.com/in/johndoe",
  "github": "https://github.com/johndoe",
  "portfolio": "https://johndoe.com"
}
```

Response:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { ...updatedUserData }
}
```

### Import LinkedIn (Future)
```http
POST /api/auth/linkedin
Authorization: Bearer <token>
Content-Type: application/json

{
  "linkedinData": {
    "firstName": "John",
    "lastName": "Doe",
    "headline": "Software Engineer",
    "summary": "...",
    "location": { "name": "San Francisco" },
    "positions": [...],
    "skills": [...]
  }
}
```

## Notes

- Profile is private by default
- Email cannot be changed (security)
- Skills are stored as array
- URLs are validated on frontend
- All fields are optional except email
- Profile completeness affects recommendations

---

**Your professional profile is now ready to showcase your experience! 💼✨**
