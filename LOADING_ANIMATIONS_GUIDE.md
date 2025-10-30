# Loading Animations & Toast Notifications

## 🎨 Skeleton Loaders

Smooth skeleton loaders have been added to all major pages for professional polish.

### Usage:

Import the skeleton component you need:

```jsx
import { 
  DashboardSkeleton, 
  ProblemsPageSkeleton, 
  ProblemDetailSkeleton,
  ModulePageSkeleton,
  ProgressPageSkeleton 
} from '../components/SkeletonLoader';
```

Example in a page component:

```jsx
export default function MyPage() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    // Your page content
  );
}
```

### Implemented In:
- ✅ Dashboard (`/dashboard`)
- ✅ Problems List (`/problems`)
- ✅ Problem Detail (`/problems/[slug]`)
- ✅ Progress Page (`/progress`)

## 🎉 Toast Notifications

Beautiful animated toast notifications for user feedback.

### Usage:

```jsx
'use client';

import { useState } from 'react';
import { ToastContainer } from '../components/Toast';

export default function MyComponent() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration: 3000 }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleSuccess = () => {
    addToast('Problem solved successfully! 🎉', 'success');
  };

  const handleError = () => {
    addToast('Oops! Something went wrong', 'error');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
      
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
```

### Toast Types:
- **success** - Green with ✓ icon
- **error** - Red with ✕ icon  
- **warning** - Orange with ⚠ icon
- **info** - Blue with ℹ icon

### Features:
- 🎭 Smooth animations with Framer Motion
- 🎨 Gradient backgrounds with blur effects
- ⏱️ Auto-dismiss after 3 seconds (customizable)
- 📚 Stackable - multiple toasts display nicely
- 🖱️ Manual close button
- 🎯 Top-right positioning

## 🚀 Quick Example - Add to Problem Submission:

```jsx
// In app/problems/[slug]/page.jsx

const handleSubmit = async () => {
  try {
    setSubmitting(true);
    const response = await problemsAPI.submit(problem._id, code, language);
    
    if (response.success) {
      addToast('Solution submitted successfully! 🎉', 'success');
      setResult({ success: true, message: 'All test cases passed!' });
    } else {
      addToast('Some test cases failed. Try again!', 'error');
      setResult({ success: false, message: response.message });
    }
  } catch (error) {
    addToast('Failed to submit solution', 'error');
  } finally {
    setSubmitting(false);
  }
};
```

## 🎬 What This Adds:

1. **Professional Loading States**
   - No more blank screens
   - Users see animated placeholders
   - Smooth content appearance

2. **Better User Feedback**
   - Clear success/error messages
   - Beautiful animations
   - Non-intrusive notifications

3. **Polish & UX**
   - Makes the app feel more complete
   - Reduces perceived loading time
   - Improves user confidence
