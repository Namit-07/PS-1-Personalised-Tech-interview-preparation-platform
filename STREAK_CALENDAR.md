# 🔥 Streak Calendar Feature

## Overview
GitHub-style contribution calendar showing daily problem-solving activity. Gamifies learning with visual feedback and streak tracking.

## Features

### 📊 Visual Heatmap
- **365-day view** - Full year of activity at a glance
- **Color intensity** - More problems = darker green
- **Hover tooltips** - See exact count per day
- **Interactive** - Click on days for details

### 🎯 Streak Tracking
1. **Current Streak** 🔥
   - Days in a row with activity
   - Updates in real-time
   - Orange/red gradient display

2. **Longest Streak** ⭐
   - Personal best record
   - Yellow/amber gradient
   - Motivation to beat your record

3. **Total Active Days** 📅
   - Count of all days with activity
   - Blue/purple gradient
   - Shows consistency

### 🎨 Color Scale
- **No activity** - Dark gray
- **1-2 problems** - Light green (30%)
- **3-5 problems** - Medium green (50%)
- **6-8 problems** - Darker green (70%)
- **9+ problems** - Full green (95%)

### 💬 Motivational Messages
- **7+ day streak**: "Amazing! You're on fire! 🚀"
- **3-6 day streak**: "Great job! Don't break the chain! 💪"
- **1-2 day streak**: "You're building momentum! ⚡"
- **0 days**: "Start your streak today! 🎯"

## Implementation

### Component Location
```
app/components/StreakCalendar.jsx
```

### Usage in Dashboard
```jsx
import StreakCalendar from '../components/StreakCalendar';

<StreakCalendar activityData={activityData} />
```

### Data Format
```javascript
const activityData = [
  {
    date: '2024-10-30',  // YYYY-MM-DD format
    count: 5             // Number of problems solved
  },
  {
    date: '2024-10-29',
    count: 3
  },
  // ... more entries
];
```

## Backend Integration (TODO)

### API Endpoint
```javascript
// GET /api/progress/activity
// Returns last 365 days of activity

Response:
{
  success: true,
  data: [
    { date: '2024-10-30', count: 5 },
    { date: '2024-10-29', count: 3 },
    // ...
  ]
}
```

### Database Schema
```javascript
// UserProgress model - add activity tracking
{
  userId: ObjectId,
  date: Date,
  problemsSolved: Number,
  timeSpent: Number (optional),
  topics: [String] (optional)
}
```

### Update Logic
When a user solves a problem:
```javascript
// In problem submission handler
const today = new Date().toISOString().split('T')[0];

await UserActivity.findOneAndUpdate(
  { userId: user._id, date: today },
  { $inc: { problemsSolved: 1 } },
  { upsert: true, new: true }
);
```

## Benefits

### For Users
- **Visual feedback** - See progress immediately
- **Motivation** - Maintain streaks, beat records
- **Gamification** - Makes practice addictive
- **Consistency** - Encourages daily practice

### For Platform
- **Engagement** - Users return daily
- **Retention** - Streaks keep users coming back
- **Social proof** - Share streak achievements
- **Analytics** - Track user activity patterns

## Future Enhancements

### Phase 2
- [ ] Share streak on social media
- [ ] Compete with friends
- [ ] Streak recovery (1 freeze per week)
- [ ] Streak milestones (7, 30, 100 days)

### Phase 3
- [ ] Month/year views
- [ ] Filter by topic
- [ ] Time-based heatmap (not just count)
- [ ] Difficulty-weighted activity

### Phase 4
- [ ] Leaderboard integration
- [ ] Achievement badges
- [ ] Streak notifications
- [ ] Email reminders to maintain streak

## Dependencies
- `react-calendar-heatmap` - Heatmap visualization
- `framer-motion` - Smooth animations
- `react` - Core framework

## Styling
Custom CSS in component handles:
- Dark theme colors (green shades)
- Hover effects
- Grid layout
- Responsive design

## Notes
- Currently using mock data (365 days)
- Real data needs backend integration
- Streak calculation is client-side
- Works with date ranges (start/end)
- Timezone-aware (uses local time)

## Testing
View on dashboard at: `http://localhost:3001/dashboard`
