'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ActivityContext = createContext();

export function ActivityProvider({ children, useMockData = false }) {
  const [activityData, setActivityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch activity data from API
  const fetchActivityData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // No token = new user, start with empty calendar
        setActivityData([]);
        setIsLoading(false);
        return;
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/progress/activity`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setActivityData(data);
      } else {
        // If API fails, start with empty data instead of mock
        setActivityData([]);
      }
    } catch (error) {
      console.error('Error fetching activity data:', error);
      // Start with empty calendar on error
      setActivityData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Update activity when a problem is solved
  const updateActivity = async (problemsSolved = 1) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Optimistic update - immediately update UI
    setActivityData(prevData => {
      const existingIndex = prevData.findIndex(item => item.date === today);
      
      if (existingIndex !== -1) {
        // Update existing day
        const newData = [...prevData];
        newData[existingIndex] = {
          ...newData[existingIndex],
          count: newData[existingIndex].count + problemsSolved
        };
        return newData;
      } else {
        // Add new day
        return [...prevData, { date: today, count: problemsSolved }];
      }
    });

    // Send to backend
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        await fetch(`${API_URL}/progress/activity`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ 
            date: today,
            problemsSolved 
          })
        });
      }
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  // Generate mock data for demo/fallback
  const generateMockActivityData = () => {
    const data = [];
    const today = new Date();

    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const isActive = Math.random() > (i < 30 ? 0.3 : i < 90 ? 0.5 : 0.7);

      if (isActive) {
        data.push({
          date: date.toISOString().split('T')[0],
          count: Math.floor(Math.random() * 12) + 1
        });
      }
    }

    return data;
  };

  useEffect(() => {
    if (useMockData) {
      // Use mock data for demo/testing
      setActivityData(generateMockActivityData());
      setIsLoading(false);
    } else {
      // Fetch real data from backend
      const token = localStorage.getItem('token');
      if (token) {
        fetchActivityData();
      } else {
        setActivityData([]);
        setIsLoading(false);
      }
    }
  }, [useMockData]); // Note: We intentionally don't add dependencies to avoid infinite loops

  // Refresh activity data when user logs in/out
  useEffect(() => {
    const handleUserLogin = () => {
      const token = localStorage.getItem('token');
      if (token && !useMockData) {
        setIsLoading(true);
        fetchActivityData();
      }
    };

    const handleUserLogout = () => {
      setActivityData([]);
      setIsLoading(false);
    };

    // Listen for custom login/logout events
    window.addEventListener('userLogin', handleUserLogin);
    window.addEventListener('userLogout', handleUserLogout);

    return () => {
      window.removeEventListener('userLogin', handleUserLogin);
      window.removeEventListener('userLogout', handleUserLogout);
    };
  }, [useMockData]);

  return (
    <ActivityContext.Provider value={{ 
      activityData, 
      isLoading, 
      updateActivity,
      refreshActivity: fetchActivityData 
    }}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within ActivityProvider');
  }
  return context;
}
