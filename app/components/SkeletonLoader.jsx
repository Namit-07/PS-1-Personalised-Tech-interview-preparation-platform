'use client';

import { motion } from 'framer-motion';

// Reusable skeleton components with animations
export function SkeletonCard({ className = "" }) {
  return (
    <motion.div
      className={`bg-gray-900/50 rounded-2xl overflow-hidden ${className}`}
      animate={{
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="h-full w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-[length:200%_100%] animate-shimmer" />
    </motion.div>
  );
}

export function SkeletonText({ className = "", lines = 1 }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-gray-800 rounded"
          style={{ width: i === lines - 1 ? '70%' : '100%' }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1
          }}
        />
      ))}
    </div>
  );
}

export function SkeletonCircle({ className = "" }) {
  return (
    <motion.div
      className={`bg-gray-800 rounded-full ${className}`}
      animate={{
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

// Dashboard specific skeleton
export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navbar skeleton */}
      <div className="border-b border-gray-800 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <SkeletonText className="w-48" />
          <div className="flex gap-4">
            <SkeletonCircle className="w-10 h-10" />
            <SkeletonCircle className="w-10 h-10" />
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-12">
        {/* Hero skeleton */}
        <div className="mb-24">
          <SkeletonCard className="w-40 h-10 mb-8" />
          <div className="space-y-4 mb-6">
            <SkeletonCard className="w-64 h-12" />
            <SkeletonCard className="w-96 h-20" />
          </div>
          <SkeletonText lines={2} className="max-w-3xl" />
        </div>

        {/* Stats cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} className="h-64" />
          ))}
        </div>

        {/* Module cards skeleton */}
        <div className="mb-16">
          <SkeletonCard className="w-64 h-12 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} className="h-48" />
            ))}
          </div>
        </div>

        {/* Quick actions skeleton */}
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <SkeletonCard key={i} className="h-64" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Problems page skeleton
export function ProblemsPageSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navbar skeleton */}
      <div className="border-b border-gray-800 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <SkeletonText className="w-48" />
          <div className="flex gap-4">
            <SkeletonCircle className="w-10 h-10" />
            <SkeletonCircle className="w-10 h-10" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header skeleton */}
        <div className="mb-12">
          <SkeletonCard className="w-96 h-16 mb-4" />
          <SkeletonText lines={2} className="max-w-2xl" />
        </div>

        {/* Filters skeleton */}
        <div className="flex gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} className="w-32 h-12" />
          ))}
        </div>

        {/* Problems list skeleton */}
        <div className="space-y-4">
          {[...Array(10)].map((_, i) => (
            <SkeletonCard key={i} className="h-24" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Problem detail skeleton
export function ProblemDetailSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navbar skeleton */}
      <div className="border-b border-gray-800 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <SkeletonText className="w-48" />
          <div className="flex gap-4">
            <SkeletonCircle className="w-10 h-10" />
            <SkeletonCircle className="w-10 h-10" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left side - Problem */}
          <div>
            <SkeletonCard className="w-full h-12 mb-4" />
            <div className="flex gap-2 mb-6">
              <SkeletonCard className="w-20 h-8" />
              <SkeletonCard className="w-24 h-8" />
            </div>
            <SkeletonText lines={8} className="mb-6" />
            <SkeletonCard className="w-full h-64" />
          </div>

          {/* Right side - Code editor */}
          <div>
            <SkeletonCard className="w-full h-12 mb-4" />
            <SkeletonCard className="w-full h-96 mb-4" />
            <div className="flex gap-4">
              <SkeletonCard className="w-32 h-12" />
              <SkeletonCard className="w-32 h-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Module page skeleton
export function ModulePageSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navbar skeleton */}
      <div className="border-b border-gray-800 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <SkeletonText className="w-48" />
          <div className="flex gap-4">
            <SkeletonCircle className="w-10 h-10" />
            <SkeletonCircle className="w-10 h-10" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero skeleton */}
        <div className="mb-16">
          <SkeletonCard className="w-96 h-20 mb-6" />
          <SkeletonText lines={3} className="max-w-3xl mb-8" />
          <div className="flex gap-4">
            <SkeletonCard className="w-40 h-12" />
            <SkeletonCard className="w-40 h-12" />
          </div>
        </div>

        {/* Content cards skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} className="h-64" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Progress page skeleton
export function ProgressPageSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navbar skeleton */}
      <div className="border-b border-gray-800 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <SkeletonText className="w-48" />
          <div className="flex gap-4">
            <SkeletonCircle className="w-10 h-10" />
            <SkeletonCircle className="w-10 h-10" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header skeleton */}
        <div className="mb-12">
          <SkeletonCard className="w-64 h-16 mb-4" />
          <SkeletonText lines={1} className="max-w-xl" />
        </div>

        {/* Stats overview skeleton */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} className="h-40" />
          ))}
        </div>

        {/* Chart skeleton */}
        <SkeletonCard className="w-full h-96 mb-12" />

        {/* Topic proficiency skeleton */}
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} className="h-20" />
          ))}
        </div>
      </div>
    </div>
  );
}
