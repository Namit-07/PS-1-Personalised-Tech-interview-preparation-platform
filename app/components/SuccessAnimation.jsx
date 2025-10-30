'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SuccessAnimation({ show, onComplete }) {
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    if (show) {
      setShowFireworks(true);
      const timer = setTimeout(() => {
        setShowFireworks(false);
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {showFireworks && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          {/* Success Message */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", damping: 15 }}
            className="relative z-10"
          >
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-12 py-8 rounded-3xl shadow-2xl border-4 border-white/20">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-7xl mb-4">🎉</div>
                <h2 className="text-4xl font-black mb-2">Great Job!</h2>
                <p className="text-xl font-medium opacity-90">
                  Your streak is updated! 🔥
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Confetti Effect */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                scale: 0,
                opacity: 1,
              }}
              animate={{
                x: window.innerWidth / 2 + (Math.random() - 0.5) * 600,
                y: window.innerHeight / 2 + (Math.random() - 0.5) * 600,
                scale: Math.random() * 2 + 1,
                opacity: 0,
              }}
              transition={{
                duration: Math.random() * 1 + 0.5,
                ease: "easeOut",
              }}
              className="absolute w-4 h-4 rounded-full"
              style={{
                backgroundColor: [
                  '#22c55e', '#10b981', '#14b8a6', '#06b6d4',
                  '#3b82f6', '#8b5cf6', '#a855f7', '#ec4899',
                  '#f43f5e', '#f59e0b', '#eab308', '#84cc16'
                ][i % 12],
              }}
            />
          ))}

          {/* Ring Pulse Effect */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-64 h-64 rounded-full border-8 border-green-400" />
          </motion.div>

          <motion.div
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-64 h-64 rounded-full border-8 border-emerald-400" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
