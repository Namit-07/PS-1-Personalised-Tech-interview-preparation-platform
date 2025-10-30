'use client';

import { motion } from 'framer-motion';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { useState } from 'react';

export default function StreakCalendar({ activityData = [] }) {
  const [tooltipData, setTooltipData] = useState(null);

  // Calculate date range (last 365 days)
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  // Calculate current streak
  const calculateStreak = () => {
    const sortedData = [...activityData].sort((a, b) => new Date(b.date) - new Date(a.date));
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedData.length; i++) {
      const activityDate = new Date(sortedData[i].date);
      activityDate.setHours(0, 0, 0, 0);
      
      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);
      expectedDate.setHours(0, 0, 0, 0);

      if (activityDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  // Calculate longest streak
  const calculateLongestStreak = () => {
    if (activityData.length === 0) return 0;
    
    const sortedData = [...activityData].sort((a, b) => new Date(a.date) - new Date(b.date));
    let maxStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < sortedData.length; i++) {
      const prevDate = new Date(sortedData[i - 1].date);
      const currDate = new Date(sortedData[i].date);
      const diffDays = Math.floor((currDate - prevDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }
    return maxStreak;
  };

  // Get color based on activity count
  const getColor = (value) => {
    if (!value || value.count === 0) return 'color-empty';
    if (value.count <= 2) return 'color-scale-1';
    if (value.count <= 5) return 'color-scale-2';
    if (value.count <= 8) return 'color-scale-3';
    return 'color-scale-4';
  };

  const currentStreak = calculateStreak();
  const longestStreak = calculateLongestStreak();
  const totalDays = activityData.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-800"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🔥</span>
            <div>
              <p className="text-gray-400 text-sm">Current Streak</p>
              <p className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-400 text-transparent bg-clip-text">
                {currentStreak}
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">days in a row</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-800"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">⭐</span>
            <div>
              <p className="text-gray-400 text-sm">Longest Streak</p>
              <p className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-amber-400 text-transparent bg-clip-text">
                {longestStreak}
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">days record</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-800"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">📅</span>
            <div>
              <p className="text-gray-400 text-sm">Total Active Days</p>
              <p className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                {totalDays}
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">this year</p>
        </motion.div>
      </div>

      {/* Calendar Heatmap */}
      <div className="bg-[#0d1117] rounded-2xl p-8 border border-gray-800">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>📊</span> Activity Heatmap
        </h3>
        
        <div className="calendar-container">
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={activityData}
            classForValue={getColor}
            tooltipDataAttrs={(value) => {
              if (!value || !value.date) {
                return { 'data-tip': 'No activity' };
              }
              return {
                'data-tip': `${value.count} problems on ${new Date(value.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}`
              };
            }}
            showWeekdayLabels
            onClick={(value) => {
              if (value) {
                setTooltipData(value);
              }
            }}
          />
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-3 mt-6 text-sm text-gray-400">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-[#1c1f26] border border-gray-700"></div>
            <div className="w-3 h-3 rounded-sm bg-[#0e4429]"></div>
            <div className="w-3 h-3 rounded-sm bg-[#006d32]"></div>
            <div className="w-3 h-3 rounded-sm bg-[#26a641]"></div>
            <div className="w-3 h-3 rounded-sm bg-[#39d353]"></div>
          </div>
          <span>More</span>
        </div>

        {/* Motivational Message */}
        {currentStreak > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30"
          >
            <p className="text-orange-400 font-medium flex items-center gap-2">
              <span>🔥</span>
              {currentStreak >= 7 ? (
                <span>Amazing! You're on fire! Keep this {currentStreak}-day streak going! 🚀</span>
              ) : currentStreak >= 3 ? (
                <span>Great job! {currentStreak} days in a row! Don't break the chain! 💪</span>
              ) : (
                <span>You're building momentum! {currentStreak} day streak - keep it up! ⚡</span>
              )}
            </p>
          </motion.div>
        )}

        {currentStreak === 0 && totalDays > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30"
          >
            <p className="text-blue-400 font-medium flex items-center gap-2">
              <span>💡</span>
              <span>Start your streak today! Solve at least one problem to get started! 🎯</span>
            </p>
          </motion.div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .calendar-container {
          font-size: 12px;
        }

        .react-calendar-heatmap {
          width: 100%;
        }

        .react-calendar-heatmap text {
          fill: #9ca3af;
          font-size: 10px;
        }

      .react-calendar-heatmap .color-empty {
        fill: #1c1f26;
        stroke: #0d1117;
        stroke-width: 3px;
        rx: 3;
      }

      .react-calendar-heatmap .color-scale-1 {
        fill: #0e4429;
        stroke: #0d1117;
        stroke-width: 3px;
        rx: 3;
      }

      .react-calendar-heatmap .color-scale-2 {
        fill: #006d32;
        stroke: #0d1117;
        stroke-width: 3px;
        rx: 3;
      }

      .react-calendar-heatmap .color-scale-3 {
        fill: #26a641;
        stroke: #0d1117;
        stroke-width: 3px;
        rx: 3;
      }

      .react-calendar-heatmap .color-scale-4 {
        fill: #39d353;
        stroke: #0d1117;
        stroke-width: 3px;
        rx: 3;
      }        .react-calendar-heatmap rect:hover {
          stroke: #ffffff;
          stroke-width: 2px;
          opacity: 1;
          cursor: pointer;
        }

        .react-calendar-heatmap .react-calendar-heatmap-month-label {
          fill: #d1d5db;
          font-size: 12px;
          font-weight: 500;
        }

        .react-calendar-heatmap .react-calendar-heatmap-weekday-label {
          fill: #9ca3af;
          font-size: 11px;
        }

        .react-calendar-heatmap rect {
          rx: 2;
          ry: 2;
        }

        .react-calendar-heatmap svg {
          overflow: visible;
        }
      `}</style>
    </motion.div>
  );
}
