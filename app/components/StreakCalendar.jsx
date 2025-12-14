'use client';

import { useState, useMemo, useEffect } from 'react';

export default function StreakCalendar({ activityData = [] }) {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  // GitHub uses exactly 53 weeks
  const weeks = 53;
  const cellSize = 14;
  const cellGap = 4;
  const dayLabelWidth = 36;
  const headerHeight = 24;

  // Generate calendar data for the last 53 weeks
  const calendarData = useMemo(() => {
    const today = new Date();
    const data = [];
    
    // Create a map for quick lookup of activity data
    const activityMap = new Map();
    activityData.forEach(item => {
      const dateKey = new Date(item.date).toISOString().split('T')[0];
      activityMap.set(dateKey, item.count || 0);
    });

    // Calculate start date (53 weeks ago, starting from Sunday)
    const endDate = new Date(today);
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - (weeks * 7) + (7 - today.getDay()));

    // Generate all days
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateKey = currentDate.toISOString().split('T')[0];
      data.push({
        date: new Date(currentDate),
        dateKey,
        count: activityMap.get(dateKey) || 0,
        dayOfWeek: currentDate.getDay(),
        weekIndex: Math.floor((currentDate - startDate) / (7 * 24 * 60 * 60 * 1000))
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return data;
  }, [activityData]);

  // Get month labels
  const monthLabels = useMemo(() => {
    const labels = [];
    let currentMonth = -1;
    
    calendarData.forEach((day) => {
      const month = day.date.getMonth();
      if (month !== currentMonth && day.dayOfWeek === 0) {
        labels.push({
          month: day.date.toLocaleDateString('en-US', { month: 'short' }),
          weekIndex: day.weekIndex
        });
        currentMonth = month;
      }
    });

    return labels;
  }, [calendarData]);

  // Calculate streak stats
  const stats = useMemo(() => {
    const sortedData = [...activityData]
      .filter(d => d.count > 0)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    // Current streak
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedData.length; i++) {
      const activityDate = new Date(sortedData[i].date);
      activityDate.setHours(0, 0, 0, 0);
      
      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);
      expectedDate.setHours(0, 0, 0, 0);

      if (activityDate.getTime() === expectedDate.getTime()) {
        currentStreak++;
      } else if (i === 0 && activityDate.getTime() === expectedDate.getTime() - 86400000) {
        expectedDate.setDate(expectedDate.getDate() - 1);
        if (activityDate.getTime() === expectedDate.getTime()) {
          currentStreak++;
        } else {
          break;
        }
      } else {
        break;
      }
    }

    // Longest streak
    let longestStreak = 0;
    let tempStreak = 0;
    const chronological = [...activityData]
      .filter(d => d.count > 0)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    for (let i = 0; i < chronological.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prevDate = new Date(chronological[i - 1].date);
        const currDate = new Date(chronological[i].date);
        const diffDays = Math.round((currDate - prevDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          tempStreak++;
        } else {
          tempStreak = 1;
        }
      }
      longestStreak = Math.max(longestStreak, tempStreak);
    }

    // Total contributions
    const totalContributions = activityData.reduce((sum, d) => sum + (d.count || 0), 0);

    return { currentStreak, longestStreak, totalContributions };
  }, [activityData]);

  // Get GitHub-style color based on contribution count
  const getContributionColor = (count) => {
    if (count === 0) {
      return isDarkMode ? '#161b22' : '#ebedf0';
    }
    if (isDarkMode) {
      if (count <= 2) return '#0e4429';
      if (count <= 5) return '#006d32';
      if (count <= 8) return '#26a641';
      return '#39d353';
    } else {
      if (count <= 2) return '#9be9a8';
      if (count <= 5) return '#40c463';
      if (count <= 8) return '#30a14e';
      return '#216e39';
    }
  };

  const handleMouseEnter = (day, event) => {
    const rect = event.target.getBoundingClientRect();
    const containerRect = event.target.closest('.contribution-graph').getBoundingClientRect();
    setTooltipPosition({
      x: rect.left - containerRect.left + cellSize / 2,
      y: rect.top - containerRect.top - 10
    });
    setHoveredDay(day);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const svgWidth = dayLabelWidth + (weeks * (cellSize + cellGap));
  const svgHeight = headerHeight + (7 * (cellSize + cellGap));

  return (
    <div className="bg-white dark:bg-[#0d1117] rounded-lg border border-slate-200 dark:border-[#30363d] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-200 dark:border-[#30363d] flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-800 dark:text-[#c9d1d9]">
          {stats.totalContributions} contributions in the last year
        </h3>
      </div>

      {/* Contribution Graph */}
      <div className="p-5 overflow-x-auto">
        <div className="contribution-graph relative" style={{ minWidth: svgWidth }}>
          {/* Tooltip */}
          {hoveredDay && (
            <div
              className="absolute z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full"
              style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
            >
              <div className="bg-[#24292f] dark:bg-[#6e7681] text-white text-xs py-2 px-3 rounded-md shadow-lg whitespace-nowrap">
                <strong>
                  {hoveredDay.count === 0 
                    ? 'No contributions' 
                    : `${hoveredDay.count} contribution${hoveredDay.count !== 1 ? 's' : ''}`}
                </strong>
                <span className="text-slate-300 dark:text-slate-200"> on {formatDate(hoveredDay.date)}</span>
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full">
                  <div className="border-4 border-transparent border-t-[#24292f] dark:border-t-[#6e7681]"></div>
                </div>
              </div>
            </div>
          )}

          <svg width={svgWidth} height={svgHeight} className="block">
            {/* Month labels */}
            <g>
              {monthLabels.map((label, i) => (
                <text
                  key={i}
                  x={dayLabelWidth + (label.weekIndex * (cellSize + cellGap)) + cellSize / 2}
                  y={14}
                  className="fill-slate-500 dark:fill-[#8b949e]"
                  fontSize="12"
                  textAnchor="start"
                >
                  {label.month}
                </text>
              ))}
            </g>

            {/* Day labels */}
            <g>
              {[1, 3, 5].map((dayIndex) => (
                <text
                  key={dayIndex}
                  x={0}
                  y={headerHeight + (dayIndex * (cellSize + cellGap)) + cellSize - 1}
                  className="fill-slate-500 dark:fill-[#8b949e]"
                  fontSize="12"
                >
                  {dayLabels[dayIndex]}
                </text>
              ))}
            </g>

            {/* Contribution cells */}
            <g>
              {calendarData.map((day) => (
                <rect
                  key={day.dateKey}
                  x={dayLabelWidth + (day.weekIndex * (cellSize + cellGap))}
                  y={headerHeight + (day.dayOfWeek * (cellSize + cellGap))}
                  width={cellSize}
                  height={cellSize}
                  rx={3}
                  ry={3}
                  className="cursor-pointer"
                  fill={getContributionColor(day.count)}
                  onMouseEnter={(e) => handleMouseEnter(day, e)}
                  onMouseLeave={() => setHoveredDay(null)}
                  style={{
                    outline: hoveredDay?.dateKey === day.dateKey ? '2px solid #1f6feb' : 'none',
                    outlineOffset: '-1px'
                  }}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>

      {/* Footer with legend and stats */}
      <div className="px-5 py-4 border-t border-slate-200 dark:border-[#30363d] flex flex-wrap items-center justify-between gap-4">
        {/* Legend */}
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-[#8b949e]">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-[14px] h-[14px] rounded bg-[#ebedf0] dark:bg-[#161b22]"></div>
            <div className="w-[14px] h-[14px] rounded bg-[#9be9a8] dark:bg-[#0e4429]"></div>
            <div className="w-[14px] h-[14px] rounded bg-[#40c463] dark:bg-[#006d32]"></div>
            <div className="w-[14px] h-[14px] rounded bg-[#30a14e] dark:bg-[#26a641]"></div>
            <div className="w-[14px] h-[14px] rounded bg-[#216e39] dark:bg-[#39d353]"></div>
          </div>
          <span>More</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-500">🔥</span>
            <span className="text-slate-600 dark:text-[#8b949e]">Current streak:</span>
            <span className="font-semibold text-slate-800 dark:text-[#c9d1d9]">{stats.currentStreak} days</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-500">⭐</span>
            <span className="text-slate-600 dark:text-[#8b949e]">Longest streak:</span>
            <span className="font-semibold text-slate-800 dark:text-[#c9d1d9]">{stats.longestStreak} days</span>
          </div>
        </div>
      </div>
    </div>
  );
}